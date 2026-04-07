// components/common/Card.jsx
// 공통 카드 컴포넌트
// 프로젝트 카드, 노트 카드 등에 재사용

import styles from './Card.module.css';

export default function Card({ children, className = '', onClick, hoverable = false, ...rest }) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      className={`${styles.card} ${hoverable || onClick ? styles.hoverable : ''} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Tag>
  );
}
