interface Env {
  PWCAI_API_KEY: string;
  PWCAI_BASE_URL: string;
  PWCAI_MODEL: string;
}

interface RequestBody {
  bmi: number;
  categoryLabel: string;
  keywords: string[];
  heightCm: number;
  weightKg: number;
  gender: string;
  imageBase64: string | null;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const body = await context.request.json() as RequestBody;
  const { PWCAI_API_KEY, PWCAI_BASE_URL, PWCAI_MODEL } = context.env;

  const genderLabel = body.gender === 'female' ? '여성' : body.gender === 'male' ? '남성' : '중성';

  const textPrompt = `다음 고객 정보를 바탕으로 개성 있고 구체적인 스타일 조언을 2~3문장으로 작성해주세요.

- 키: ${body.heightCm}cm, 몸무게: ${body.weightKg}kg, BMI: ${body.bmi}
- 성별: ${genderLabel}
- 체형 분류: ${body.categoryLabel}
- 추천 키워드: ${body.keywords.join(', ')}${body.imageBase64 ? '\n- 첨부 사진: 고객의 전신 사진이 포함되어 있습니다. 사진 속 체형과 분위기도 참고해서 조언해주세요.' : ''}

친근한 말투로, 구체적인 착장 팁을 포함해서 작성해주세요.`;

  // 사진이 있으면 vision 형식, 없으면 텍스트만
  const userContent = body.imageBase64
    ? [
        { type: 'text', text: textPrompt },
        { type: 'image_url', image_url: { url: body.imageBase64 } },
      ]
    : textPrompt;

  // ⚠️ TODO: 실제 PwC GenAI API 엔드포인트 확인 후 아래 URL 수정
  const apiUrl = `${PWCAI_BASE_URL}/v1/chat/completions`;

  const llmResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PWCAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: PWCAI_MODEL ?? 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '당신은 친근하고 전문적인 패션 스타일리스트입니다. 고객의 체형과 특성에 맞는 따뜻하고 실용적인 스타일 조언을 해주세요.',
        },
        {
          role: 'user',
          content: userContent,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!llmResponse.ok) {
    const errText = await llmResponse.text();
    return new Response(
      JSON.stringify({ error: `LLM API error: ${llmResponse.status}`, detail: errText }),
      { status: 502, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
    );
  }

  const data = await llmResponse.json() as { choices?: { message?: { content?: string } }[] };
  const advice = data.choices?.[0]?.message?.content?.trim() ?? '';

  return new Response(JSON.stringify({ advice }), {
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
};
