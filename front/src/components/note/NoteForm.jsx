// components/note/NoteForm.jsx
// 디테일 노트 작성/수정 폼 공통 컴포넌트
// /projects/:projectId/notes/new 와 /projects/:projectId/notes/:noteId/edit 에서 재사용

import { useState } from 'react';
import styles from './NoteForm.module.css';

// 추가 요소 탭 정의
const EXTRA_TABS = [
  { id: 'recommendation', label: '권고사항' },
  { id: 'checklist',      label: '체크리스트' },
  { id: 'tag',            label: '태그' },
  { id: 'essential',      label: '필수사항' },
  { id: 'custom',         label: '직접입력' },
];

// 노트 아이콘 SVG
function NoteIcon() {
  return (
    <svg width="26" height="30" viewBox="0 0 100 110" fill="none" aria-hidden="true">
      <rect x="8" y="4" width="78" height="90" rx="6" stroke="#1a1a1a" strokeWidth="5" fill="white" />
      <path d="M8 88 Q8 104 22 104 L78 104 Q92 104 92 88" stroke="#1a1a1a" strokeWidth="5" fill="white" strokeLinecap="round" />
      <line x1="8" y1="88" x2="92" y2="88" stroke="#1a1a1a" strokeWidth="3.5" />
      <line x1="22" y1="32" x2="72" y2="32" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <line x1="22" y1="46" x2="60" y2="46" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

export default function NoteForm({ initialData = {}, onSave, onDelete }) {
  const [form, setForm] = useState({
    title:       initialData.title       ?? '',
    targetDate:  initialData.targetDate  ?? '',
    description: initialData.description ?? '',
    extra:       initialData.extra       ?? {},
  });
  const [activeTab, setActiveTab] = useState(null);
  const [errors, setErrors]       = useState({});

  const setField = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: '' }));
  };

  const handleSave = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = '제목을 입력해주세요.';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave?.(form);
  };

  return (
    <div className={styles.wrapper}>
      {/* 페이지 헤더 */}
      <div className={styles.pageHeader}>
        <NoteIcon />
        <h1 className={styles.pageTitle}>노트 작성</h1>
      </div>

      {/* 제목 + 목표날짜 */}
      <div className={styles.twoCol}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="note-title">제목</label>
          <input
            id="note-title"
            className={`${styles.input} ${errors.title ? styles.inputErr : ''}`}
            placeholder="title"
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
          />
          {errors.title && <span className={styles.errMsg}>{errors.title}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="note-date">목표날짜</label>
          <input
            id="note-date"
            type="date"
            className={styles.input}
            placeholder="yyyy.mm.dd"
            value={form.targetDate}
            onChange={(e) => setField('targetDate', e.target.value)}
          />
        </div>
      </div>

      {/* 설명 */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="note-desc">설명</label>
        <textarea
          id="note-desc"
          className={styles.textarea}
          placeholder="information"
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          rows={8}
        />
      </div>

      {/* 추가 요소 탭 */}
      <div className={styles.extraSection}>
        <p className={styles.extraTitle}>추가 요소</p>
        <div className={styles.tabList}>
          {EXTRA_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab((p) => p === tab.id ? null : tab.id)}
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 패널 */}
        {activeTab && (
          <div className={styles.tabPanel}>
            <textarea
              className={styles.textarea}
              placeholder={`${EXTRA_TABS.find(t => t.id === activeTab)?.label} 내용을 입력하세요...`}
              value={form.extra[activeTab] ?? ''}
              onChange={(e) => setField('extra', { ...form.extra, [activeTab]: e.target.value })}
              rows={4}
            />
          </div>
        )}
      </div>

      {/* 액션 버튼 */}
      <div className={styles.actions}>
        {onDelete && (
          <button className={styles.deleteBtn} onClick={onDelete}>삭제</button>
        )}
        <button className={styles.saveBtn} onClick={handleSave}>저장</button>
      </div>
    </div>
  );
}
