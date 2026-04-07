// pages/FlowNotePage.jsx
// 라우트: /projects/:projectId
// 플로우 노트 보기 — 카드 클릭 시 디테일 노트로, 편집 버튼 클릭 시 edit 페이지로

import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import FlowBoard from '../components/flow/FlowBoard';
import { getProjectById, getFlowNotes } from '../data/dummy';
import styles from './FlowNotePage.module.css';

// 편집 아이콘 SVG
function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 기본 플로우 더미 (projectId에 데이터 없을 때)
const FALLBACK_NOTES = [
  { id: 'f1', title: '고객사\n요구사항', status: 'done'        },
  { id: 'f2', title: 'WBS 작성',        status: 'todo'        },
  { id: 'f3', title: '개발',            status: 'in_progress' },
  { id: 'f4', title: '테스트',          status: 'todo'        },
  { id: 'f5', title: 'OPEN',            status: 'todo'        },
];

export default function FlowNotePage() {
  const { projectId } = useParams();
  const navigate      = useNavigate();

  const project   = getProjectById(projectId);
  const flowNotes = getFlowNotes(projectId).length > 0
    ? getFlowNotes(projectId)
    : FALLBACK_NOTES;

  const handleNoteClick = (noteId) => {
    navigate(`/projects/${projectId}/notes/${noteId}`);
  };

  return (
    <Layout activeProjectId={projectId}>
      <div className={styles.page}>
        {/* 프로젝트 제목 + 편집 버튼 */}
        <header className={styles.header}>
          <div className={styles.titleRow}>
            {/* 노트 아이콘 */}
            <svg width="22" height="24" viewBox="0 0 100 110" fill="none" aria-hidden="true">
              <rect x="8" y="4" width="78" height="90" rx="6" stroke="#1a1a1a" strokeWidth="5" fill="white" />
              <path d="M8 88 Q8 104 22 104 L78 104 Q92 104 92 88" stroke="#1a1a1a" strokeWidth="5" fill="white" strokeLinecap="round" />
              <line x1="8" y1="88" x2="92" y2="88" stroke="#1a1a1a" strokeWidth="3.5" />
            </svg>
            <h1 className={styles.projectTitle}>
              {project?.title ?? '사내 인트라넷 개선'}
            </h1>
            {/* 편집 링크 버튼 */}
            <Link
              to={`/projects/${projectId}/edit`}
              className={styles.editBtn}
              aria-label="플로우 편집"
            >
              <EditIcon />
            </Link>
          </div>
        </header>

        {/* 플로우 보드 (보기 모드) */}
        <FlowBoard
          notes={flowNotes}
          editMode={false}
          onNoteClick={handleNoteClick}
        />
      </div>
    </Layout>
  );
}
