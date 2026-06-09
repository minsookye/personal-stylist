import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Gender, UserInput } from '../types';

interface Props {
  onSubmit: (input: UserInput) => void;
}

const GENDERS: { value: Gender; label: string }[] = [
  { value: 'female', label: '여성' },
  { value: 'male', label: '남성' },
  { value: 'unisex', label: '공용' },
];

export default function InputForm({ onSubmit }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [height, setHeight] = useState(168);
  const [weight, setWeight] = useState(60);
  const [gender, setGender] = useState<Gender>('female');

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ photoUrl, heightCm: height, weightKg: weight, gender });
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <label className="photo-zone">
        {photoUrl ? (
          <img src={photoUrl} alt="미리보기" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">
            <span className="photo-icon">📷</span>
            <span>사진 업로드</span>
            <small>클릭해서 전신 사진을 올려주세요</small>
          </div>
        )}
        <input type="file" accept="image/*" hidden onChange={handleFile} />
      </label>

      <div className="field">
        <div className="field-head">
          <label htmlFor="height">키</label>
          <span className="field-value">{height} <em>cm</em></span>
        </div>
        <input
          id="height"
          type="range"
          min={140}
          max={210}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <div className="field-head">
          <label htmlFor="weight">몸무게</label>
          <span className="field-value">{weight} <em>kg</em></span>
        </div>
        <input
          id="weight"
          type="range"
          min={40}
          max={130}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </div>

      <div className="field">
        <span className="field-label">성별</span>
        <div className="segment">
          {GENDERS.map((g) => (
            <button
              type="button"
              key={g.value}
              className={`segment-btn ${gender === g.value ? 'active' : ''}`}
              onClick={() => setGender(g.value)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary">✨ 스타일 추천받기</button>
    </form>
  );
}
