// components/note/NoteReadChecklist.jsx
// 노트 상세 뷰의 체크리스트 (읽기 전용 + 토글 가능)
// 피그마 디자인: 체크박스 항목들이 테두리 박스 안에 표시

import { useState } from 'react';
import styles from './NoteReadChecklist.module.css';

function CheckItem({ item, onToggle }) {
  return (
    <li className={styles.item}>
      <label className={styles.itemLabel}>
        <input
          type="checkbox"
          className={styles.hiddenCheckbox}
          checked={item.done}
          onChange={() => onToggle(item.id)}
          aria-label={item.label}
        />
        {/* 커스텀 체크박스 */}
        <span className={`${styles.checkBox} ${item.done ? styles.checkBoxDone : ''}`} aria-hidden="true">
          {item.done && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className={`${styles.itemText} ${item.done ? styles.itemTextDone : ''}`}>
          {item.label}
        </span>
      </label>
    </li>
  );
}

export default function NoteReadChecklist({ items: initialItems }) {
  const [items, setItems] = useState(initialItems);

  const handleToggle = (id) => {
    setItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, done: !item.done } : item)
    );
  };

  const doneCount = items.filter((i) => i.done).length;

  return (
    <section className={styles.section} aria-labelledby="read-checklist-title">
      <div className={styles.titleRow}>
        <h3 id="read-checklist-title" className={styles.title}>체크리스트</h3>
        <span className={styles.progress}>{doneCount}/{items.length}</span>
      </div>

      <div className={styles.listBox}>
        {/* 새 항목 입력란 (빈 input — 피그마 디자인 반영) */}
        <div className={styles.newItemRow}>
          <span className={`${styles.checkBox} ${styles.checkBoxEmpty}`} aria-hidden="true" />
          <input
            type="text"
            className={styles.newItemInput}
            placeholder="새 항목 추가..."
            aria-label="체크리스트 항목 추가"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                setItems((prev) => [
                  ...prev,
                  { id: `chk-${Date.now()}`, label: e.target.value.trim(), done: false },
                ]);
                e.target.value = '';
              }
            }}
          />
        </div>

        <ul className={styles.list}>
          {items.map((item) => (
            <CheckItem key={item.id} item={item} onToggle={handleToggle} />
          ))}
        </ul>
      </div>
    </section>
  );
}
