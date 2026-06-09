import { defineConfig, loadEnv } from 'vite'
import type { Connect, Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'

interface RecommendBody {
  bmi?: number
  categoryLabel?: string
  keywords?: string[]
  heightCm?: number
  weightKg?: number
  gender?: string
}

function readBody(req: IncomingMessage): Promise<RecommendBody> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => {
      try {
        resolve(data ? (JSON.parse(data) as RecommendBody) : {})
      } catch (err) {
        reject(err as Error)
      }
    })
    req.on('error', reject)
  })
}

async function callGenAI(
  env: Record<string, string>,
  body: RecommendBody,
): Promise<string> {
  const baseUrl =
    env.GENAI_BASE_URL || 'https://genai-sharedservice-americas.pwcinternal.com'
  const apiKey = env.PwC_LLM_API_KEY || ''
  const model = env.PwC_LLM_MODEL || 'bedrock.anthropic.claude-sonnet-4-6'
  if (!apiKey || apiKey === 'your-api-key-here') {
    throw new Error('PwC_LLM_API_KEY가 .env에 설정되지 않았습니다.')
  }

  const genderKo =
    body.gender === 'female' ? '여성' : body.gender === 'male' ? '남성' : '공용'
  const prompt = [
    '당신은 따뜻하고 전문적인 퍼스널 스타일리스트입니다.',
    '아래 정보를 가진 사람에게 한국어로 3~4문장의 격려가 담긴 실용적인 스타일 조언을 해주세요.',
    `- 키: ${body.heightCm}cm, 몸무게: ${body.weightKg}kg`,
    `- BMI: ${body.bmi} (${body.categoryLabel})`,
    `- 성별: ${genderKo}`,
    `- 추천 키워드: ${(body.keywords ?? []).join(', ')}`,
    '체형을 비하하지 말고 긍정적으로, 구체적인 코디 팁을 포함해 주세요.',
  ].join('\n')

  const resp = await fetch(`${baseUrl}/v1/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 400,
    }),
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`GenAI ${resp.status}: ${text.slice(0, 200)}`)
  }

  const data = (await resp.json()) as {
    output?: { content?: { text?: string }[] }[]
    choices?: { message?: { content?: string } }[]
  }
  return (
    data.output?.[0]?.content?.[0]?.text ??
    data.choices?.[0]?.message?.content ??
    ''
  )
}

// 개발 서버 전용: /api/recommend 엔드포인트 (키는 서버 측에만, 클라이언트 번들에 노출되지 않음)
function genaiApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'genai-api-dev',
    configureServer(server) {
      server.middlewares.use(
        '/api/recommend',
        (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
          if (req.method !== 'POST') return next()
          void (async () => {
            res.setHeader('Content-Type', 'application/json')
            try {
              const body = await readBody(req)
              const advice = await callGenAI(env, body)
              res.end(JSON.stringify({ advice }))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: (err as Error).message }))
            }
          })()
        },
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 모든 환경변수 로드 (VITE_ 접두사 없는 키도 서버 미들웨어에서 사용)
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // GitHub Pages 하위 경로(/personal-stylist/)에서도 동작하도록 상대 경로 사용
    base: './',
    plugins: [react(), genaiApiPlugin(env)],
  }
})
