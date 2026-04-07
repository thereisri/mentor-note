// components/note/EmptyNoteCanvas.jsx
// 새 노트 생성 Step 1
// 빈 캔버스 중앙에 노트 아이콘 + "새 노트 생성" 텍스트
// 클릭하면 onCreateClick 호출 → Step 2로 전환

import NoteBookIcon from '../common/NoteBookIcon';
import styles from './EmptyNoteCanvas.module.css';

export default function EmptyNoteCanvas({ onCreateClick }) {
  return (
    <div className={styles.canvas} aria-label="새 노트 생성 영역">
      {/* 외곽 점선 테두리 */}
      <div className={styles.canvasBorder}>
        <button
          className={styles.createButton}
          onClick={onCreateClick}
          aria-label="새 노트 생성하기"
        >
          <NoteBookIcon size={90} strokeColor="#1a1a1a" />
          <span className={styles.createLabel}>새 노트 생성</span>
        </button>
      </div>
    </div>
  );
}
