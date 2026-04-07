// components/note/ProjectFlowBoard.jsx
// 노트 생성 완료 후 보여지는 프로젝트 플로우 보드 (note-view2)
// 각 노트 카드에 상태 리본(완료/대기/진행)이 붙어있는 완성형 플로우차트
// NoteFlowBoard(생성 단계)와 달리 읽기전용 + 리본 배지 포함

import NoteFlowCard from './NoteFlowCard';
import styles from './ProjectFlowBoard.module.css';

// 화살표 SVG
function FlowArrow() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 44 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="10" x2="34" y2="10" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M28 4 L38 10 L28 16"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function ProjectFlowBoard({ notes, activeNoteId, onNoteClick }) {
  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board} role="region" aria-label="프로젝트 노트 플로우">
        <div className={styles.flowRow}>
          {notes.map((note, index) => (
            <div key={note.id} className={styles.flowItem}>
              {index > 0 && <FlowArrow />}
              <NoteFlowCard
                note={note}
                isActive={note.id === activeNoteId}
                onClick={onNoteClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
