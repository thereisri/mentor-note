// components/note/NoteFlowCard.jsx
// 리본 배지가 달린 노트 플로우 카드
// note-view2의 카드 디자인 구현
// - 상단 리본: 완료/대기/진행 상태
// - 노트북 아이콘 SVG
// - 제목 텍스트

import StatusRibbon from '../common/StatusRibbon';
import styles from './NoteFlowCard.module.css';

// 노트 상태값 → 리본 variant 매핑
const STATUS_TO_RIBBON = {
  done:        'done',
  in_progress: 'run',
  todo:        'wait',
  review:      'wait',
  on_hold:     'wait',
};

// 미니 노트북 아이콘 SVG (카드 내부용)
function MiniNoteIcon({ isActive }) {
  const stroke = isActive ? 'var(--color-primary)' : '#1a1a1a';
  return (
    <svg
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.noteIcon}
      aria-hidden="true"
    >
      <rect x="8" y="4" width="78" height="90" rx="6" stroke={stroke} strokeWidth="5" fill="white" />
      <path d="M8 88 Q8 104 22 104 L78 104 Q92 104 92 88" stroke={stroke} strokeWidth="5" fill="white" strokeLinecap="round" />
      <line x1="8"  y1="88" x2="92" y2="88" stroke={stroke} strokeWidth="3.5" />
      <line x1="22" y1="32" x2="72" y2="32" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" opacity="0.35" />
      <line x1="22" y1="46" x2="60" y2="46" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

export default function NoteFlowCard({ note, isActive = false, onClick }) {
  const ribbonVariant = STATUS_TO_RIBBON[note.status] ?? 'wait';

  return (
    <button
      className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
      onClick={() => onClick?.(note.id)}
      aria-label={`${note.title} 노트 — ${ribbonVariant === 'done' ? '완료' : ribbonVariant === 'run' ? '진행중' : '대기'}`}
      aria-pressed={isActive}
    >
      {/* 상단 리본 배지 */}
      <div className={styles.ribbonRow}>
        <StatusRibbon variant={ribbonVariant} />
      </div>

      {/* 카드 본체 */}
      <div className={styles.cardBody}>
        <MiniNoteIcon isActive={isActive} />
        <span className={styles.cardTitle}>{note.title}</span>
      </div>
    </button>
  );
}
