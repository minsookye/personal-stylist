import type { StyleRecommendation } from '../types';

interface Props {
  recommendation: StyleRecommendation;
  photoUrl: string | null;
  aiLoading: boolean;
  onReset: () => void;
}

export default function ResultCard({ recommendation, photoUrl, aiLoading, onReset }: Props) {
  const r = recommendation;

  return (
    <section className="card result-card">
      <header className="result-top">
        <div className="result-photo">
          {photoUrl ? (
            <img src={photoUrl} alt="내 사진" />
          ) : (
            <div className="result-photo-ph">👤</div>
          )}
        </div>
        <div className="result-meta">
          <span className="result-badge">{r.emoji} {r.categoryLabel}</span>
          <div className="bmi">
            <span className="bmi-num">{r.bmi}</span>
            <span className="bmi-unit">BMI</span>
          </div>
          <p className="headline">{r.headline}</p>
        </div>
      </header>

      <div className="keywords">
        {r.keywords.map((k) => (
          <span key={k} className="chip">#{k}</span>
        ))}
      </div>

      <div className="section ai-advice-section">
        <h3>🤖 AI 스타일리스트 조언</h3>
        {aiLoading ? (
          <p className="ai-loading">✨ AI가 맞춤 스타일 조언을 생성하고 있어요...</p>
        ) : r.aiAdvice ? (
          <p className="ai-advice-text">{r.aiAdvice}</p>
        ) : (
          <p className="ai-advice-error">AI 조언을 불러오지 못했어요.</p>
        )}
      </div>

      <div className="section">
        <h3>🎨 추천 컬러</h3>
        <div className="colors">
          {r.colors.map((c) => (
            <div key={c.hex} className="color">
              <span className="swatch" style={{ background: c.hex }} />
              <small>{c.name}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>📐 핏 가이드</h3>
        <ul className="tips">
          {r.fitTips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>🛍️ 추천 아이템</h3>
        <div className="items">
          {r.items.map((it) => (
            <span key={it} className="item">{it}</span>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>🚫 피하면 좋아요</h3>
        <ul className="tips avoid">
          {r.avoid.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      <button className="btn-ghost" onClick={onReset}>↺ 다시 추천받기</button>
      <p className="disclaimer">
        ※ 재미로 즐기는 BMI 기반 스타일 가이드예요. 정답은 본인의 취향입니다 😊
      </p>
    </section>
  );
}
