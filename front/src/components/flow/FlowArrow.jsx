// components/flow/FlowArrow.jsx
export default function FlowArrow() {
  return (
    <svg
      width="44" height="20" viewBox="0 0 44 20"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0, margin: '0 2px' }}
    >
      <line x1="0" y1="10" x2="34" y2="10" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 4L38 10L28 16" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
