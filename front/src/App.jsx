// App.jsx — React Router v6
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage           from './pages/HomePage';
import NewFlowNotePage    from './pages/NewFlowNotePage';
import FlowNotePage       from './pages/FlowNotePage';
import FlowNoteEditPage   from './pages/FlowNoteEditPage';
import NewDetailNotePage  from './pages/NewDetailNotePage';
import DetailNotePage     from './pages/DetailNotePage';
import DetailNoteEditPage from './pages/DetailNoteEditPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomePage />} />

        {/* 플로우 노트 */}
        <Route path="/projects/new"         element={<NewFlowNotePage />} />
        <Route path="/projects/:projectId"       element={<FlowNotePage />} />
        <Route path="/projects/:projectId/edit"  element={<FlowNoteEditPage />} />

        {/* 디테일 노트 */}
        <Route path="/projects/:projectId/notes/new"              element={<NewDetailNotePage />} />
        <Route path="/projects/:projectId/notes/:noteId"          element={<DetailNotePage />} />
        <Route path="/projects/:projectId/notes/:noteId/edit"     element={<DetailNoteEditPage />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
