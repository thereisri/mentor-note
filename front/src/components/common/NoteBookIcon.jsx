// components/common/NoteBookIcon.jsx
// 노트북 아이콘 SVG 컴포넌트
// 피그마 디자인의 노트 아이콘을 React 컴포넌트로 구현
// size, color props로 재사용 가능

import styles from './NoteBookIcon.module.css';

export default function NoteBookIcon({
  size = 80,
  strokeColor = '#1a1a1a',
  label = '',
  className = '',
}) {
  return (
    <figure
      className={`${styles.wrapper} ${className}`}
      style={{ width: size, height: size * 1.1 }}
      aria-label={label || '노트'}
      role={label ? 'img' : undefined}
    >
      <svg
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        {/* 노트 본체 */}
        <rect
          x="8"
          y="4"
          width="78"
          height="90"
          rx="6"
          ry="6"
          stroke={strokeColor}
          strokeWidth="4.5"
          fill="white"
        />
        {/* 하단 둥근 바인딩 */}
        <path
          d="M8 88 Q8 104 22 104 L78 104 Q92 104 92 88"
          stroke={strokeColor}
          strokeWidth="4.5"
          fill="white"
          strokeLinecap="round"
        />
        {/* 바인딩 구분선 */}
        <line
          x1="8"
          y1="88"
          x2="92"
          y2="88"
          stroke={strokeColor}
          strokeWidth="3"
        />
        {/* 노트 라인 1 */}
        <line x1="22" y1="32" x2="72" y2="32" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
        {/* 노트 라인 2 */}
        <line x1="22" y1="46" x2="60" y2="46" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" opacity="0.25" />
      </svg>

      {/* 라벨 텍스트 */}
      {label && <figcaption className={styles.label}>{label}</figcaption>}
    </figure>
  );
}
