// pages/FlowNoteEditPage.jsx
// 라우트: /projects/:projectId/edit
// 플로우 노트 편집 — 카드 상태 변경, 노트 추가, 저장

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import FlowBoard from '../components/flow/FlowBoard';
import { getProjectById, getFlowNotes } from '../data/dummy';
import styles from './FlowNotePage.module.css';

const FALLBACK_NOTES = [
  { id: 'f1', title: '고객사\n요구사항', status: 'done'        },
  { id: 'f2', title: 'WBS 작성',        status: 'todo'        },
  { id: 'f3', title: '개발',            status: 'in_progress' },
  { id: 'f4', title: '테스트',          status: 'todo'        },
  { id: 'f5', title: 'OPEN',            status: 'todo'        },
];

export default function FlowNoteEditPage() {
  const { projectId } = useParams();
  const navigate      = useNavigate();

  const project = getProjectById(projectId);
  const initial = getFlowNotes(projectId).length > 0
    ? getFlowNotes(projectId)
    : FALLBACK_NOTES;

  const [notes, setNotes] = useState(initial);

  const handleStatusChange = (noteId, newStatus) => {
    setNotes((p) => p.map((n) => n.id === noteId ? { ...n, status: newStatus } : n));
  };

  const handleAddNote = () => {
    setNotes((p) => [...p, {
      id: `note-${Date.now()}`,
      title: '새 노트',
      status: 'todo',
    }]);
  };

  const handleSave = () => {
    // ※ API 연결 포인트: projectService.updateFlow(projectId, notes)
    navigate(`/projects/${projectId}`);
  };

  return (
    <Layout activeProjectId={projectId}>
      <div className={styles.page}>
        {/* 헤더 */}
        <header className={styles.header}>
          <div className={styles.titleRow}>
            <svg width="22" height="24" viewBox="0 0 100 110" fill="none" aria-hidden="true">
              <rect x="8" y="4" width="78" height="90" rx="6" stroke="#1a1a1a" strokeWidth="5" fill="white" />
              <path d="M8 88 Q8 104 22 104 L78 104 Q92 104 92 88" stroke="#1a1a1a" strokeWidth="5" fill="white" strokeLinecap="round" />
              <line x1="8" y1="88" x2="92" y2="88" stroke="#1a1a1a" strokeWidth="3.5" />
            </svg>
            <h1 className={styles.projectTitle}>
              {project?.title ?? '사내 인트라넷 개선'}
            </h1>
            <button className={styles.saveBtn} onClick={handleSave}>저장</button>
          </div>
        </header>

        {/* 플로우 보드 (편집 모드) */}
        <FlowBoard
          notes={notes}
          editMode={true}
          onStatusChange={handleStatusChange}
          onAddNote={handleAddNote}
        />
      </div>
    </Layout>
  );
}
