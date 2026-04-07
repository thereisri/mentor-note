// pages/DetailNotePage.jsx
// 라우트: /projects/:projectId/notes/:noteId
// 디테일 노트 보기
// - 상태 셀렉트 드롭다운 (진행/대기/완료)
// - 설명 / 필수사항 / 체크리스트
// - 수정 / 다음단계 버튼

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { NOTES, getProjectById } from '../data/dummy';
import styles from './DetailNotePage.module.css';

// 상태 옵션
const STATUS_OPTIONS = [
  { value: 'todo',        label: '대기' },
  { value: 'in_progress', label: '진행' },
  { value: 'done',        label: '완료' },
];

// 노트 아이콘
function NoteIcon() {
  return (
    <svg width="28" height="32" viewBox="0 0 100 110" fill="none" aria-hidden="true">
      <rect x="8" y="4" width="78" height="90" rx="6" stroke="#1a1a1a" strokeWidth="5" fill="white" />
      <path d="M8 88 Q8 104 22 104 L78 104 Q92 104 92 88" stroke="#1a1a1a" strokeWidth="5" fill="white" strokeLinecap="round" />
      <line x1="8" y1="88" x2="92" y2="88" stroke="#1a1a1a" strokeWidth="3.5" />
      <line x1="22" y1="32" x2="72" y2="32" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <line x1="22" y1="46" x2="60" y2="46" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

// 업로드 아이콘
function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 체크 아이콘
function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 6L4.5 9L10.5 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 더미 노트 (noteId로 찾거나 fallback)
const FALLBACK_NOTE = NOTES[0];

export default function DetailNotePage() {
  const { projectId, noteId } = useParams();
  const navigate = useNavigate();

  const note = NOTES.find((n) => n.id === noteId) ?? FALLBACK_NOTE;

  const [status,    setStatus]    = useState('in_progress');
  const [checklist, setChecklist] = useState(note.checklist ?? []);

  const toggleCheck = (id) =>
    setChecklist((p) => p.map((c) => c.id === id ? { ...c, done: !c.done } : c));

  const doneCount = checklist.filter((c) => c.done).length;

  return (
    <Layout activeProjectId={projectId}>
      <div className={styles.page}>

        {/* ── 노트 헤더 ── */}
        <header className={styles.noteHeader}>
          <div className={styles.noteTitleRow}>
            <NoteIcon />
            <div>
              <h1 className={styles.noteTitle}>{note.title}</h1>
              <time className={styles.noteDate}>{note.targetDate}</time>
            </div>
          </div>

          {/* 상태 셀렉트 */}
          <div className={styles.statusWrapper}>
            <select
              className={styles.statusSelect}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="노트 상태"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {/* 드롭다운 화살표 */}
            <svg className={styles.chevron} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </header>

        {/* ── 2컬럼 본문 ── */}
        <div className={styles.body}>

          {/* 좌측: 설명 */}
          <section className={styles.leftCol}>
            <h2 className={styles.sectionTitle}>설명</h2>
            <div className={styles.descBox}>
              <p className={styles.descText}>{note.description}</p>
            </div>
          </section>

          {/* 우측: 필수사항 + 체크리스트 */}
          <section className={styles.rightCol}>

            {/* 필수사항 */}
            <div className={styles.rightBlock}>
              <h2 className={styles.sectionTitle}>필수사항</h2>
              <div className={styles.essentialList}>
                {(note.essentials ?? []).map((ess) => (
                  <div key={ess.id} className={styles.essentialItem}>
                    <span className={styles.essentialText}>{ess.description}</span>
                    <button className={styles.uploadBtn} aria-label="파일 업로드">
                      <UploadIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 체크리스트 */}
            <div className={styles.rightBlock}>
              <div className={styles.checklistHeader}>
                <h2 className={styles.sectionTitle}>체크리스트</h2>
                <span className={styles.checkCount}>{doneCount}/{checklist.length}</span>
              </div>
              <div className={styles.checklistBox}>
                <ul>
                  {checklist.map((item) => (
                    <li key={item.id}>
                      <label className={`${styles.checkRow} ${item.done ? styles.checkRowDone : ''}`}>
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleCheck(item.id)}
                          className={styles.hiddenCb}
                          aria-label={item.label}
                        />
                        <span className={`${styles.customCb} ${item.done ? styles.customCbChecked : ''}`}>
                          {item.done && <CheckIcon />}
                        </span>
                        <span className={styles.checkLabel}>{item.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </section>
        </div>

        {/* ── 하단 버튼 ── */}
        <footer className={styles.footer}>
          <Link
            to={`/projects/${projectId}/notes/${noteId}/edit`}
            className={styles.editBtn}
          >
            수정
          </Link>
          <button
            className={styles.nextBtn}
            onClick={() => navigate(`/projects/${projectId}`)}
          >
            다음단계
          </button>
        </footer>

      </div>
    </Layout>
  );
}
