// pages/DetailNoteEditPage.jsx
// 라우트: /projects/:projectId/notes/:noteId/edit
// NoteForm 재사용 — 기존 데이터로 초기화

import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import NoteForm from '../components/note/NoteForm';
import { NOTES } from '../data/dummy';

export default function DetailNoteEditPage() {
  const { projectId, noteId } = useParams();
  const navigate = useNavigate();

  const note = NOTES.find((n) => n.id === noteId) ?? NOTES[0];

  const handleSave = (formData) => {
    // ※ API 연결 포인트: noteService.update(noteId, formData)
    navigate(`/projects/${projectId}/notes/${noteId}`);
  };

  const handleDelete = () => {
    if (window.confirm('노트를 삭제하시겠습니까?')) {
      // ※ API 연결 포인트: noteService.delete(noteId)
      navigate(`/projects/${projectId}`);
    }
  };

  return (
    <Layout activeProjectId={projectId}>
      <NoteForm
        initialData={note}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </Layout>
  );
}
