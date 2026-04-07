// pages/NewDetailNotePage.jsx
// 라우트: /projects/:projectId/notes/new

import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NoteForm from '../components/note/NoteForm';

export default function NewDetailNotePage() {
  const { projectId } = useParams();
  const navigate      = useNavigate();

  const handleSave = (formData) => {
    // ※ API 연결 포인트: noteService.create({ projectId, ...formData })
    const newNoteId = 'note-' + Date.now();
    navigate(`/projects/${projectId}/notes/${newNoteId}`);
  };

  return (
    <Layout activeProjectId={projectId}>
      <NoteForm onSave={handleSave} />
    </Layout>
  );
}
