// pages/NewFlowNotePage.jsx
// 라우트: /projects/new
// Step 1: 빈 캔버스 + 중앙 노트 아이콘 클릭
// Step 2: 빈 노트들 플로우 + 이름 입력 안내

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import FlowArrow from '../components/flow/FlowArrow';
import styles from './NewFlowNotePage.module.css';

// 노트 아이콘 SVG
function NoteBookSVG({ size = 90 }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none" aria-hidden="true">
      <rect x="8" y="4" width="78" height="90" rx="6" stroke="#1a1a1a" strokeWidth="5" fill="white" />
      <path d="M8 88 Q8 104 22 104 L78 104 Q92 104 92 88" stroke="#1a1a1a" strokeWidth="5" fill="white" strokeLinecap="round" />
      <line x1="8" y1="88" x2="92" y2="88" stroke="#1a1a1a" strokeWidth="3.5" />
      <line x1="22" y1="32" x2="72" y2="32" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <line x1="22" y1="46" x2="60" y2="46" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

// Step 1 — 빈 캔버스
function StepOne({ onNext }) {
  return (
    <div className={styles.canvasWrapper}>
      <button className={styles.createBtn} onClick={onNext} aria-label="새 노트 생성 시작">
        <NoteBookSVG size={90} />
        <span className={styles.createLabel}>새 노트 생성</span>
      </button>
    </div>
  );
}

// Step 2 — 빈 노트 플로우 + 이름 입력
function StepTwo({ notes, onNoteNameChange, onConfirm }) {
  return (
    <div className={styles.step2Wrapper}>
      {/* 안내 문구 */}
      <div className={styles.step2Header}>
        <NoteBookSVG size={26} />
        <p className={styles.step2Hint}>노트 이름을 작성해주세요</p>
      </div>

      {/* 플로우 보드 */}
      <div className={styles.flowBoard}>
        <div className={styles.flowRow}>
          {notes.map((note, i) => (
            <div key={note.id} className={styles.flowItem}>
              {i > 0 && <FlowArrow />}
              <div className={styles.emptyCard}>
                <NoteBookSVG size={52} />
                <input
                  className={styles.noteNameInput}
                  value={note.title}
                  onChange={(e) => onNoteNameChange(note.id, e.target.value)}
                  placeholder={`노트 ${i + 1}`}
                  aria-label={`${i + 1}번째 노트 이름`}
                />
              </div>
            </div>
          ))}

          {/* + 노트 추가 */}
          <div className={styles.flowItem}>
            <FlowArrow />
            <button
              className={styles.addCard}
              onClick={() => onNoteNameChange('__add__', '')}
              aria-label="노트 추가"
            >
              <span className={styles.addIcon}>+</span>
            </button>
          </div>
        </div>
      </div>

      <button className={styles.confirmBtn} onClick={onConfirm}>
        완료
      </button>
    </div>
  );
}

// 기본 빈 노트 5개
const makeDefaultNotes = () =>
  Array.from({ length: 5 }, (_, i) => ({
    id: `new-${i + 1}`,
    title: '',
    status: 'todo',
  }));

export default function NewFlowNotePage() {
  const navigate = useNavigate();
  const [step, setStep]   = useState(1);
  const [notes, setNotes] = useState(makeDefaultNotes());

  const handleNoteNameChange = (id, value) => {
    if (id === '__add__') {
      setNotes((p) => [...p, { id: `new-${Date.now()}`, title: '', status: 'todo' }]);
      return;
    }
    setNotes((p) => p.map((n) => n.id === id ? { ...n, title: value } : n));
  };

  const handleConfirm = () => {
    // ※ API 연결 포인트: projectService.create({ notes })
    // 생성 후 해당 프로젝트 플로우 페이지로 이동
    const newProjectId = 'proj-new-' + Date.now();
    navigate(`/projects/${newProjectId}`);
  };

  return (
    <Layout>
      {step === 1
        ? <StepOne onNext={() => setStep(2)} />
        : <StepTwo
            notes={notes}
            onNoteNameChange={handleNoteNameChange}
            onConfirm={handleConfirm}
          />
      }
    </Layout>
  );
}
