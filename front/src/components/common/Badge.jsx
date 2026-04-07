// components/common/Badge.jsx
// 상태 배지 공통 컴포넌트
// props: variant(상태값), label(텍스트), size

import { STATUS_LABEL, PROJECT_STATUS } from '../../data/dummy';
import styles from './Badge.module.css';

const VARIANT_MAP = {
  [PROJECT_STATUS.TODO]: 'todo',
  [PROJECT_STATUS.IN_PROGRESS]: 'inProgress',
  [PROJECT_STATUS.REVIEW]: 'review',
  [PROJECT_STATUS.DONE]: 'done',
  [PROJECT_STATUS.ON_HOLD]: 'onHold',
};

export default function Badge({ variant, label, size = 'md' }) {
  const variantClass = VARIANT_MAP[variant] ?? 'todo';
  const displayLabel = label ?? STATUS_LABEL[variant] ?? variant;

  return (
    <span
      className={`${styles.badge} ${styles[variantClass]} ${styles[size]}`}
      role="status"
    >
      {displayLabel}
    </span>
  );
}
