// components/note/NoteFlowBoard.jsx
// 새 노트 생성 Step 2
// 노트 카드들이 화살표로 연결된 플로우차트 보드
// 카드 클릭 시 해당 노트 열기, 마지막 카드 우측에 + 버튼으로 새 노트 추가

import { useState } from 'react';
import NoteBookIcon from '../common/NoteBookIcon';
import styles from './NoteFlowBoard.module.css';

// 화살표 SVG
function ArrowRight() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="10" x2="32" y2="10" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      <path d="M26 4 L36 10 L26 16" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// 노트 카드 단일 아이템
function NoteCard({ note, isActive, onClick }) {
  return (
    <button
      className={`${styles.noteCard} ${isActive ? styles.noteCardActive : ''}`}
      onClick={() => onClick(note.id)}
      aria-label={`${note.title} 노트 열기`}
      aria-pressed={isActive}
    >
      <NoteBookIcon
        size={72}
        strokeColor={isActive ? 'var(--color-primary)' : '#1a1a1a'}
        label={note.title}
      />
    </button>
  );
}

// + 새 노트 추가 버튼
function AddNoteButton({ onClick }) {
  return (
    <button className={styles.addCard} onClick={onClick} aria-label="새 노트 추가">
      <span className={styles.addIcon} aria-hidden="true">+</span>
      <span className={styles.addLabel}>새 노트</span>
    </button>
  );
}

export default function NoteFlowBoard({ notes, onNoteSelect, onAddNote }) {
  const [activeId, setActiveId] = useState(null);

  const handleSelect = (id) => {
    setActiveId(id);
    onNoteSelect?.(id);
  };

  return (
    <div className={styles.boardWrapper}>
      {/* 보드 외곽 (피그마의 회색 rounded 컨테이너) */}
      <div className={styles.board} role="region" aria-label="노트 플로우">
        <div className={styles.flowRow}>
          {notes.map((note, index) => (
            <div key={note.id} className={styles.flowItem}>
              {/* 화살표 (첫 번째 제외) */}
              {index > 0 && <ArrowRight />}

              <NoteCard
                note={note}
                isActive={note.id === activeId}
                onClick={handleSelect}
              />
            </div>
          ))}

          {/* 마지막에 + 새 노트 */}
          <div className={styles.flowItem}>
            <ArrowRight />
            <AddNoteButton onClick={onAddNote} />
          </div>
        </div>
      </div>

      {/* 하단 안내 텍스트 */}
      <p className={styles.hint}>
        노트를 클릭해서 작성하거나, <strong>새 노트</strong>를 추가해보세요.
      </p>
    </div>
  );
}
