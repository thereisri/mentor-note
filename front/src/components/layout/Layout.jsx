// components/layout/Layout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

export default function Layout({ children, activeProjectId }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const close = () => setIsSidebarOpen(false);

  return (
    <div className={styles.appWrapper}>
      <Header
        onMenuToggle={() => setIsSidebarOpen((p) => !p)}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        activeProjectId={activeProjectId}
        onProjectSelect={(id) => { navigate(`/projects/${id}`); close(); }}
        onNewNote={() => { navigate('/projects/new'); close(); }}
        onClose={close}
      />
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={close} aria-hidden="true" />
      )}
      <main className={`${styles.main} ${isSidebarOpen ? styles.mainShifted : ''}`}>
        {children}
      </main>
    </div>
  );
}
