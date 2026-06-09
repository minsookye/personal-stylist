import { useRef, useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import { recommendStyle } from './lib/recommend';
import type { StyleRecommendation, UserInput } from './types';

function App() {
  const [result, setResult] = useState<StyleRecommendation | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function handleSubmit(input: UserInput) {
    const rec = recommendStyle(input.heightCm, input.weightKg, input.gender);
    setPhotoUrl(input.photoUrl);
    setResult(rec);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  function handleReset() {
    setResult(null);
  }

  return (
    <div className="app">
      <header className="hero">
        <span className="hero-badge">✨ PERSONAL STYLE GUIDE</span>
        <h1>Personal <span className="grad">Stylist</span></h1>
        <p className="hero-sub">
          사진과 키·몸무게를 입력하면 체형에 어울리는 스타일을 추천해 드려요.
        </p>
      </header>

      <main className="content">
        <InputForm onSubmit={handleSubmit} />
        <div ref={resultRef}>
          {result && (
            <ResultCard
              recommendation={result}
              photoUrl={photoUrl}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <footer className="foot">made with React + TypeScript · Personal Stylist</footer>
    </div>
  );
}

export default App;
