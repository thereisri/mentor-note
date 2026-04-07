// components/home/HeroIllustration.jsx
// 메인 히어로 일러스트 (팀워크 SVG 인라인 컴포넌트)
// 피그마 원본 SVG를 React 컴포넌트로 변환

import styles from './HeroIllustration.module.css';

export default function HeroIllustration() {
  return (
    <div className={styles.illustrationWrapper} aria-hidden="true">
      {/* 외곽 다이아몬드 프레임 */}
      <svg
        className={styles.outerFrame}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 다이아몬드 경로 */}
        <path
          d="M200 30 L370 200 L200 370 L30 200 Z"
          stroke="#ac7341"
          strokeWidth="2.5"
          strokeDasharray="8 4"
          fill="none"
          opacity="0.35"
        />
        {/* 모서리 원 */}
        <circle cx="200" cy="30"  r="10" fill="#ac7341" opacity="0.5" />
        <circle cx="370" cy="200" r="10" fill="#ac7341" opacity="0.5" />
        <circle cx="200" cy="370" r="10" fill="#ac7341" opacity="0.5" />
        <circle cx="30"  cy="200" r="10" fill="#ac7341" opacity="0.5" />
        {/* 중앙 원 */}
        <circle cx="200" cy="200" r="18" fill="#ac7341" opacity="0.12" />
        <circle cx="200" cy="200" r="10" fill="#ac7341" opacity="0.3" />
        {/* 연결선 */}
        <line x1="30"  y1="200" x2="182" y2="200" stroke="#ac7341" strokeWidth="1.5" opacity="0.25" />
        <line x1="218" y1="200" x2="370" y2="200" stroke="#ac7341" strokeWidth="1.5" opacity="0.25" />
        <line x1="200" y1="30"  x2="200" y2="182" stroke="#ac7341" strokeWidth="1.5" opacity="0.25" />
        <line x1="200" y1="218" x2="200" y2="370" stroke="#ac7341" strokeWidth="1.5" opacity="0.25" />
      </svg>

      {/* 인물 일러스트 (간략화 SVG) */}
      <svg
        className={styles.character}
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 치마/드레스 */}
        <path
          d="M50 120 Q40 160 30 200 L130 200 Q120 160 110 120 Z"
          fill="#f5c27a"
          opacity="0.9"
        />
        {/* 원피스 상단 */}
        <rect x="52" y="85" width="56" height="40" rx="8" fill="#ac7341" opacity="0.85" />
        {/* 목 */}
        <rect x="74" y="68" width="12" height="20" rx="6" fill="#f5c9a0" />
        {/* 머리 */}
        <ellipse cx="80" cy="55" rx="28" ry="26" fill="#f5c9a0" />
        {/* 머리카락 */}
        <path
          d="M52 48 Q55 20 80 18 Q105 20 108 48 Q100 30 80 30 Q60 30 52 48Z"
          fill="#5c3d1e"
        />
        <path d="M52 48 Q46 60 50 72" stroke="#5c3d1e" strokeWidth="8" strokeLinecap="round" />
        <path d="M108 48 Q114 60 110 72" stroke="#5c3d1e" strokeWidth="8" strokeLinecap="round" />
        {/* 눈 */}
        <ellipse cx="70" cy="56" rx="3.5" ry="4" fill="#3a2010" />
        <ellipse cx="90" cy="56" rx="3.5" ry="4" fill="#3a2010" />
        <circle cx="71.5" cy="54.5" r="1.2" fill="white" />
        <circle cx="91.5" cy="54.5" r="1.2" fill="white" />
        {/* 볼터치 */}
        <ellipse cx="63" cy="62" rx="6" ry="3.5" fill="#f09090" opacity="0.35" />
        <ellipse cx="97" cy="62" rx="6" ry="3.5" fill="#f09090" opacity="0.35" />
        {/* 입 */}
        <path d="M74 67 Q80 72 86 67" stroke="#c07060" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* 팔 */}
        <path d="M52 90 Q35 105 30 125" stroke="#f5c9a0" strokeWidth="10" strokeLinecap="round" />
        <path d="M108 90 Q125 105 130 125" stroke="#f5c9a0" strokeWidth="10" strokeLinecap="round" />
        {/* 손 */}
        <circle cx="28" cy="128" r="8" fill="#f5c9a0" />
        <circle cx="132" cy="128" r="8" fill="#f5c9a0" />
        {/* 다리 */}
        <rect x="62" y="195" width="14" height="22" rx="7" fill="#f5c9a0" />
        <rect x="84" y="195" width="14" height="22" rx="7" fill="#f5c9a0" />
        {/* 신발 */}
        <ellipse cx="69" cy="218" rx="11" ry="5" fill="#5c3d1e" />
        <ellipse cx="91" cy="218" rx="11" ry="5" fill="#5c3d1e" />
        {/* 반짝이 장식 */}
        <text x="20" y="45" fontSize="14" fill="#ac7341" opacity="0.6">✦</text>
        <text x="128" y="50" fontSize="10" fill="#ac7341" opacity="0.5">✦</text>
        <text x="135" y="90" fontSize="8"  fill="#ac7341" opacity="0.4">✦</text>
      </svg>
    </div>
  );
}
