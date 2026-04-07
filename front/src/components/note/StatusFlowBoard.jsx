// components/note/StatusFlowBoard.jsx
// 노트 생성 완료 화면의 플로우차트
// 각 노트 카드에 상태 리본(완료/진행/대기) 표시
// note-view2.html 기반

import NoteBookIcon from '../common/NoteBookIcon';
import StatusRibbon, { RIBBON_STATUS } from '../common/StatusRibbon';
import styles from './StatusFlowBoard.module.css';

// 화살표
function ArrowRight() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 48 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="10" x2="38" y2="10" stroke="#555" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M32 4 L42 10 L32 16"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// 개별 노트 카드 (리본 배지 포함)
function FlowNoteCard({ note, onClick }) {
  const isActive = note.status === RIBBON_STATUS.IN_PROGRESS;

  return (
    <button
      className={`${styles.noteCard} ${isActive ? styles.noteCardActive : ''}`}
      onClick={() => onClick?.(note.id)}
      aria-label={`${note.title} - ${note.statusLabel} 노트 열기`}
    >
      {/* 리본 배지 */}
      <StatusRibbon status={note.status} />

      {/* 노트 아이콘 + 타이틀 */}
      <NoteBookIcon
        size={64}
        strokeColor={isActive ? 'var(--color-primary)' : '#2a2a2a'}
        label={note.title}
      />
    </button>
  );
}

export default function StatusFlowBoard({ notes, onNoteClick, title }) {
  return (
    <div className={styles.boardWrapper}>
      {title && <h2 className={styles.boardTitle}>{title}</h2>}

      <div className={styles.board}>
        <div className={styles.flowRow} role="list" aria-label="프로젝트 진행 플로우">
          {notes.map((note, index) => (
            <div key={note.id} className={styles.flowItem} role="listitem">
              {/* 화살표 (첫 번째 제외) */}
              {index > 0 && <ArrowRight />}
              <FlowNoteCard note={note} onClick={onNoteClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
