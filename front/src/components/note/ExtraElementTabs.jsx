// components/note/ExtraElementTabs.jsx
// 노트 작성 폼의 "추가 요소" 탭 컴포넌트
// 권고사항 / 체크리스트 / 태그 / 필수사항 / 직접입력
// 각 탭 선택 시 해당 입력 영역 표시

import { useState } from 'react';
import styles from './ExtraElementTabs.module.css';

// 탭 정의
const TABS = [
  { id: 'recommendation', label: '권고사항' },
  { id: 'checklist',      label: '체크리스트' },
  { id: 'tag',            label: '태그' },
  { id: 'essential',      label: '필수사항' },
  { id: 'custom',         label: '직접입력' },
];

// 탭별 입력 패널
function TabPanel({ tabId, data, onChange }) {
  switch (tabId) {
    case 'recommendation':
      return (
        <div className={styles.panel}>
          <label className={styles.panelLabel}>권고사항</label>
          <textarea
            className={styles.textarea}
            placeholder="권고 내용을 입력하세요..."
            value={data.recommendation ?? ''}
            onChange={(e) => onChange({ recommendation: e.target.value })}
            rows={4}
          />
        </div>
      );

    case 'checklist':
      return (
        <div className={styles.panel}>
          <label className={styles.panelLabel}>체크리스트 항목</label>
          <ChecklistInput
            items={data.checklist ?? []}
            onChange={(items) => onChange({ checklist: items })}
          />
        </div>
      );

    case 'tag':
      return (
        <div className={styles.panel}>
          <label className={styles.panelLabel}>태그</label>
          <TagInput
            tags={data.tags ?? []}
            onChange={(tags) => onChange({ tags })}
          />
        </div>
      );

    case 'essential':
      return (
        <div className={styles.panel}>
          <label className={styles.panelLabel}>필수사항</label>
          <textarea
            className={styles.textarea}
            placeholder="반드시 확인해야 할 항목을 입력하세요..."
            value={data.essential ?? ''}
            onChange={(e) => onChange({ essential: e.target.value })}
            rows={4}
          />
        </div>
      );

    case 'custom':
      return (
        <div className={styles.panel}>
          <label className={styles.panelLabel}>직접 입력</label>
          <textarea
            className={styles.textarea}
            placeholder="자유 형식으로 내용을 입력하세요..."
            value={data.custom ?? ''}
            onChange={(e) => onChange({ custom: e.target.value })}
            rows={4}
          />
        </div>
      );

    default:
      return null;
  }
}

// 체크리스트 입력
function ChecklistInput({ items, onChange }) {
  const [inputVal, setInputVal] = useState('');

  const handleAdd = () => {
    if (!inputVal.trim()) return;
    onChange([...items, { id: `item-${Date.now()}`, label: inputVal.trim(), done: false }]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }
  };

  const handleRemove = (id) => onChange(items.filter((i) => i.id !== id));

  return (
    <div className={styles.checklistInput}>
      <div className={styles.checklistAddRow}>
        <input
          type="text"
          className={styles.inlineInput}
          placeholder="항목 입력 후 Enter"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="체크리스트 항목 입력"
        />
        <button className={styles.addBtn} onClick={handleAdd} type="button">추가</button>
      </div>
      {items.length > 0 && (
        <ul className={styles.checklistItems}>
          {items.map((item) => (
            <li key={item.id} className={styles.checklistItem}>
              <span className={styles.checkDot} aria-hidden="true" />
              <span className={styles.checkLabel}>{item.label}</span>
              <button
                className={styles.removeBtn}
                onClick={() => handleRemove(item.id)}
                aria-label={`${item.label} 삭제`}
                type="button"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 태그 입력
function TagInput({ tags, onChange }) {
  const [inputVal, setInputVal] = useState('');

  const handleAdd = () => {
    const trimmed = inputVal.trim().replace(/^#/, '');
    if (!trimmed || tags.includes(trimmed)) return;
    onChange([...tags, trimmed]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); handleAdd(); }
  };

  const handleRemove = (tag) => onChange(tags.filter((t) => t !== tag));

  return (
    <div className={styles.tagInput}>
      <div className={styles.tagAddRow}>
        <input
          type="text"
          className={styles.inlineInput}
          placeholder="태그 입력 (Enter로 추가)"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="태그 입력"
        />
        <button className={styles.addBtn} onClick={handleAdd} type="button">추가</button>
      </div>
      {tags.length > 0 && (
        <div className={styles.tagList} aria-label="추가된 태그 목록">
          {tags.map((tag) => (
            <span key={tag} className={styles.tagChip}>
              #{tag}
              <button
                className={styles.tagRemove}
                onClick={() => handleRemove(tag)}
                aria-label={`#${tag} 태그 삭제`}
                type="button"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// 메인 ExtraElementTabs 컴포넌트
export default function ExtraElementTabs({ extraData, onExtraChange }) {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tabId) => {
    // 같은 탭 클릭 시 닫기 (토글)
    setActiveTab((prev) => (prev === tabId ? null : tabId));
  };

  return (
    <section className={styles.section} aria-labelledby="extra-title">
      <h3 id="extra-title" className={styles.sectionTitle}>추가 요소</h3>

      {/* 탭 버튼 목록 */}
      <div className={styles.tabList} role="tablist" aria-label="추가 요소 종류">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 활성 탭 패널 */}
      {activeTab && (
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className={styles.panelWrapper}
        >
          <TabPanel
            tabId={activeTab}
            data={extraData}
            onChange={(partial) => onExtraChange?.({ ...extraData, ...partial })}
          />
        </div>
      )}
    </section>
  );
}
