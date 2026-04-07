// components/flow/FlowCard.jsx
// 플로우 보드의 개별 노트 카드
// view 모드: 클릭 → 디테일 노트로 이동
// edit 모드: 상태 변경 가능

import styles from './FlowCard.module.css';

const RIBBON_CONFIG = {
  done:        { label: '완료', color: '#6a8c69' },
  in_progress: { label: '진행', color: '#c4915e' },
  todo:        { label: '대기', color: '#b0a090' },
};

function NoteBookSVG({ active }) {
  const stroke = active ? '#ac7341' : '#1a1a1a';
  return (
    <svg viewBox="0 0 100 110" fill="none" className={styles.noteIcon} aria-hidden="true">
      <rect x="8" y="4" width="78" height="90" rx="6" stroke={stroke} strokeWidth="5" fill="white" />
      <path d="M8 88 Q8 104 22 104 L78 104 Q92 104 92 88" stroke={stroke} strokeWidth="5" fill="white" strokeLinecap="round" />
      <line x1="8"  y1="88" x2="92" y2="88" stroke={stroke} strokeWidth="3.5" />
      <line x1="22" y1="32" x2="72" y2="32" stroke={stroke} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <line x1="22" y1="46" x2="60" y2="46" stroke={stroke} strokeWidth="3" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

function StatusRibbon({ status }) {
  const config = RIBBON_CONFIG[status] ?? RIBBON_CONFIG.todo;
  return (
    <div
      className={styles.ribbon}
      style={{ background: config.color }}
      aria-label={`상태: ${config.label}`}
    >
      {config.label}
    </div>
  );
}

export default function FlowCard({ note, isActive = false, onClick, editMode = false, onStatusChange }) {
  const statuses = ['done', 'in_progress', 'todo'];

  return (
    <div className={`${styles.card} ${isActive ? styles.cardActive : ''}`}>
      {/* 리본 배지 */}
      {editMode ? (
        <select
          className={styles.statusSelect}
          value={note.status}
          onChange={(e) => onStatusChange?.(note.id, e.target.value)}
          aria-label="상태 변경"
          style={{ background: RIBBON_CONFIG[note.status]?.color ?? '#b0a090' }}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{RIBBON_CONFIG[s].label}</option>
          ))}
        </select>
      ) : (
        <StatusRibbon status={note.status} />
      )}

      {/* 카드 본체 */}
      <button
        className={styles.cardBody}
        onClick={() => !editMode && onClick?.(note.id)}
        disabled={editMode}
        aria-label={`${note.title} 노트`}
      >
        <NoteBookSVG active={isActive} />
        <span className={styles.cardTitle}>{note.title}</span>
      </button>
    </div>
  );
}
