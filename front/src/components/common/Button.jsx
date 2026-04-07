// components/common/Button.jsx
// 공통 버튼 컴포넌트
// props: variant(primary/secondary/ghost), size, onClick, disabled, children

import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
