import type {
  BmiCategory,
  ColorSwatch,
  Gender,
  StyleRecommendation,
} from '../types';

interface CategoryData {
  category: BmiCategory;
  label: string;
  emoji: string;
  headline: string;
  keywords: string[];
  colors: ColorSwatch[];
  fitTips: string[];
  items: Record<Gender, string[]>;
  avoid: string[];
}

const DATA: CategoryData[] = [
  {
    category: 'low',
    label: '슬림 체형',
    emoji: '🌿',
    headline: '레이어드로 볼륨감을 더한 산뜻한 스타일',
    keywords: ['레이어드', '볼륨감', '밝은톤'],
    colors: [
      { name: '살구', hex: '#f4a261' },
      { name: '머스타드', hex: '#e9c46a' },
      { name: '민트그린', hex: '#2a9d8f' },
      { name: '딥네이비', hex: '#264653' },
    ],
    fitTips: [
      '셔츠+니트처럼 겹쳐 입는 레이어드로 볼륨감을 연출하세요.',
      '오버핏·와이드 핏으로 여유로운 실루엣이 잘 어울려요.',
      '가로 줄무늬와 밝은 색이 몸을 입체적으로 보이게 해요.',
    ],
    items: {
      female: ['볼륨 니트', '플레어 스커트', '레이어드 가디건', '메리제인 슈즈'],
      male: ['오버핏 니트', '와이드 슬랙스', '레이어드 셔츠', '청키 스니커즈'],
      unisex: ['오버핏 후디', '와이드 데님', '레이어드 셔츠', '청키 스니커즈'],
    },
    avoid: ['몸에 딱 붙는 스키니 핏', '어두운 단색만으로 구성한 코디'],
  },
  {
    category: 'normal',
    label: '표준 체형',
    emoji: '✨',
    headline: '뭐든 잘 어울리는 균형 잡힌 베이직 스타일',
    keywords: ['베이직', '정핏', '깔끔'],
    colors: [
      { name: '네이비', hex: '#3d5a80' },
      { name: '스카이', hex: '#98c1d9' },
      { name: '코랄', hex: '#ee6c4d' },
      { name: '차콜', hex: '#293241' },
    ],
    fitTips: [
      '정사이즈 핏이 가장 잘 어울리는 체형이에요.',
      '상하의 비율을 5:5 또는 7:3으로 조절해 보세요.',
      '포인트 아이템 하나로 개성을 살리면 완성도가 올라가요.',
    ],
    items: {
      female: ['세미오버 셔츠', '스트레이트 데님', '니트 베스트', '로퍼'],
      male: ['레귤러핏 셔츠', '슬림 치노팬츠', '크루넥 니트', '미니멀 스니커즈'],
      unisex: ['베이직 티셔츠', '스트레이트 데님', '크루넥 니트', '미니멀 스니커즈'],
    },
    avoid: ['체형을 가리기만 하는 과한 오버핏'],
  },
  {
    category: 'slightlyHigh',
    label: '약간 통통',
    emoji: '🍃',
    headline: '세로 라인을 강조해 길어 보이는 스타일',
    keywords: ['세로라인', 'V넥', '톤온톤'],
    colors: [
      { name: '다크네이비', hex: '#22223b' },
      { name: '그레이퍼플', hex: '#4a4e69' },
      { name: '모브', hex: '#9a8c98' },
      { name: '딥그린', hex: '#22333b' },
    ],
    fitTips: [
      '세로 줄무늬와 V넥으로 시선을 세로로 유도하세요.',
      '상의는 적당한 핏, 하의는 일자·세미와이드가 좋아요.',
      '톤온톤(같은 계열 색)으로 통일하면 더 길어 보여요.',
    ],
    items: {
      female: ['V넥 블라우스', '하이웨이스트 슬랙스', '롱 가디건', '포인티드 플랫'],
      male: ['세로 스트라이프 셔츠', '일자 슬랙스', 'V넥 니트', '롱 코트'],
      unisex: ['V넥 니트', '일자 슬랙스', '롱 가디건', '심플 스니커즈'],
    },
    avoid: ['굵은 가로 줄무늬', '크롭처럼 짧은 기장 상의'],
  },
  {
    category: 'high',
    label: '통통 체형',
    emoji: '🌙',
    headline: '톤온톤과 구조감으로 완성하는 세련된 실루엣',
    keywords: ['톤온톤', '구조감', '롱라인'],
    colors: [
      { name: '올리브', hex: '#283618' },
      { name: '카키', hex: '#606c38' },
      { name: '인디고', hex: '#3d405b' },
      { name: '블랙', hex: '#1d1d1d' },
    ],
    fitTips: [
      '상하의를 같은 계열 색으로 맞춰 길어 보이게 하세요.',
      '어깨 라인이 살아있는 구조감 있는 자켓이 잘 어울려요.',
      '하의는 일자핏, 발목이 살짝 보이는 기장이 좋아요.',
    ],
    items: {
      female: ['롱 자켓', '와이드 슬랙스', '셔츠 원피스', '앵클 부츠'],
      male: ['구조감 블레이저', '다크 데님', '솔리드 셔츠', '첼시 부츠'],
      unisex: ['구조감 블레이저', '다크 데님', '솔리드 셔츠', '첼시 부츠'],
    },
    avoid: ['몸에 달라붙는 얇은 니트', '광택이 강한 소재'],
  },
  {
    category: 'veryHigh',
    label: '듬직 체형',
    emoji: '🔥',
    headline: '편안하면서 멋스러운 롱 라인 코디',
    keywords: ['롱코트', '다크톤', '편안한핏'],
    colors: [
      { name: '미드나잇', hex: '#0b132b' },
      { name: '네이비', hex: '#1c2541' },
      { name: '블루그레이', hex: '#3a506b' },
      { name: '틸', hex: '#5bc0be' },
    ],
    fitTips: [
      '길이감 있는 아우터로 세로 라인을 강조하세요.',
      '신축성 좋은 소재로 편안함과 핏을 모두 잡으세요.',
      '하의는 일자·어두운 톤으로 통일하면 깔끔해요.',
    ],
    items: {
      female: ['롱 트렌치', '스트레이트 팬츠', '튜닉 블라우스', '롱 부츠'],
      male: ['롱 코트', '스트레치 슬랙스', '오픈카라 셔츠', '미니멀 스니커즈'],
      unisex: ['롱 코트', '스트레치 슬랙스', '오픈카라 셔츠', '미니멀 스니커즈'],
    },
    avoid: ['짧은 기장의 아우터', '밝은 색 하의'],
  },
];

export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return 'low';
  if (bmi < 23) return 'normal';
  if (bmi < 25) return 'slightlyHigh';
  if (bmi < 30) return 'high';
  return 'veryHigh';
}

export function recommendStyle(
  heightCm: number,
  weightKg: number,
  gender: Gender,
): StyleRecommendation {
  const h = heightCm / 100;
  const bmi = Math.round((weightKg / (h * h)) * 10) / 10;
  const category = getBmiCategory(bmi);
  const data = DATA.find((d) => d.category === category) ?? DATA[1];

  return {
    bmi,
    category,
    categoryLabel: data.label,
    emoji: data.emoji,
    headline: data.headline,
    keywords: data.keywords,
    colors: data.colors,
    fitTips: data.fitTips,
    items: data.items[gender],
    avoid: data.avoid,
  };
}
