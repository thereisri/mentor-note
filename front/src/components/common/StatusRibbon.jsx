// components/common/StatusRibbon.jsx
// 노트 카드 상단에 붙는 북마크 리본 형태의 상태 배지
// 피그마의 icon-bookmark + status-name 조합을 컴포넌트화
// variant: 'done' | 'wait' | 'run'

import styles from './StatusRibbon.module.css';

const VARIANT_CONFIG = {
  done: { label: '완료', className: 'ribbonDone' },
  wait: { label: '대기', className: 'ribbonWait' },
  run:  { label: '진행', className: 'ribbonRun'  },
};

export default function StatusRibbon({ variant = 'wait', className = '' }) {
  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.wait;

  return (
    <div
      className={`${styles.ribbon} ${styles[config.className]} ${className}`}
      role="status"
      aria-label={`상태: ${config.label}`}
    >
      <svg
        className={styles.ribbonIcon}
        viewBox="0 0 14 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1 1H13V16.5L7 13L1 16.5V1Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.ribbonLabel}>{config.label}</span>
    </div>
  );
}
