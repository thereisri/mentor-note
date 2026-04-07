// components/note/Checklist.jsx
// 체크리스트 컴포넌트
// - 항목 체크/언체크
// - 완료율 표시
// - 항목 추가

import { useState } from 'react';
import styles from './Checklist.module.css';

export default function Checklist({ items, onChange, readonly = false }) {
  const [newItemText, setNewItemText] = useState('');

  const doneCount = items.filter((i) => i.done).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const handleToggle = (id) => {
    if (readonly) return;
    const updated = items.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    onChange?.(updated);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem = {
      id: `chk-${Date.now()}`,
      label: newItemText.trim(),
      done: false,
    };
    onChange?.([...items, newItem]);
    setNewItemText('');
  };

  return (
    <section className={styles.checklist} aria-labelledby="checklist-title">
      {/* 헤더 */}
      <div className={styles.checklistHeader}>
        <h3 id="checklist-title" className={styles.checklistTitle}>체크리스트</h3>
        <div className={styles.progressInfo} aria-live="polite">
          <span className={styles.progressText}>{doneCount} / {totalCount}</span>
          <div
            className={styles.progressBar}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`진행률 ${progress}%`}
          >
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressPct}>{progress}%</span>
        </div>
      </div>

      {/* 항목 목록 */}
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <label className={`${styles.itemLabel} ${item.done ? styles.itemDone : ''}`}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => handleToggle(item.id)}
                disabled={readonly}
                className={styles.checkbox}
                aria-label={item.label}
              />
              <span className={styles.checkmark} aria-hidden="true">
                {item.done && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={styles.itemText}>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* 항목 추가 (편집 모드) */}
      {!readonly && (
        <form className={styles.addForm} onSubmit={handleAddItem}>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="항목 추가..."
            className={styles.addInput}
            aria-label="새 체크리스트 항목 입력"
          />
          <button
            type="submit"
            className={styles.addBtn}
            disabled={!newItemText.trim()}
            aria-label="항목 추가"
          >
            추가
          </button>
        </form>
      )}
    </section>
  );
}
