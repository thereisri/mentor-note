// components/flow/FlowBoard.jsx
// 플로우 보드 공통 컴포넌트
// view / edit / new 세 페이지 모두에서 재사용
// editMode=true 일 때: 카드 상태 변경 가능, + 버튼 표시

import FlowCard from './FlowCard';
import FlowArrow from './FlowArrow';
import styles from './FlowBoard.module.css';

function AddCardButton({ onClick }) {
  return (
    <div className={styles.addWrapper}>
      <FlowArrow />
      <button className={styles.addCard} onClick={onClick} aria-label="노트 추가">
        <span className={styles.addIcon}>+</span>
        <span className={styles.addLabel}>노트 추가</span>
      </button>
    </div>
  );
}

export default function FlowBoard({
  notes,
  activeNoteId,
  editMode = false,
  onNoteClick,
  onStatusChange,
  onAddNote,
}) {
  return (
    <div className={styles.boardOuter}>
      <div className={styles.board}>
        <div className={styles.flowRow}>
          {notes.map((note, i) => (
            <div key={note.id} className={styles.flowItem}>
              {i > 0 && <FlowArrow />}
              <FlowCard
                note={note}
                isActive={note.id === activeNoteId}
                editMode={editMode}
                onClick={onNoteClick}
                onStatusChange={onStatusChange}
              />
            </div>
          ))}

          {/* edit 모드에서만 + 버튼 */}
          {editMode && <AddCardButton onClick={onAddNote} />}
        </div>
      </div>
    </div>
  );
}
