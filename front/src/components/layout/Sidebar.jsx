// components/layout/Sidebar.jsx
import { useNavigate } from 'react-router-dom';
import { PROJECTS, STATUS_LABEL, PROJECT_STATUS } from '../../data/dummy';
import styles from './Sidebar.module.css';

const STATUS_COLOR = {
  [PROJECT_STATUS.TODO]:        'statusTodo',
  [PROJECT_STATUS.IN_PROGRESS]: 'statusProgress',
  [PROJECT_STATUS.REVIEW]:      'statusReview',
  [PROJECT_STATUS.DONE]:        'statusDone',
  [PROJECT_STATUS.ON_HOLD]:     'statusHold',
};

function ProjectItem({ project, isActive, onClick }) {
  return (
    <li>
      <button
        className={`${styles.projectItem} ${isActive ? styles.projectItemActive : ''}`}
        onClick={() => onClick(project.id)}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className={styles.projectTitle}>{project.title}</span>
        <span className={`${styles.statusDot} ${styles[STATUS_COLOR[project.status]]}`} />
      </button>
    </li>
  );
}

export default function Sidebar({ isOpen, activeProjectId, onProjectSelect, onNewNote, onClose }) {
  const inProgress = PROJECTS.filter((p) => p.status === PROJECT_STATUS.IN_PROGRESS);

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
      aria-label="프로젝트 내비게이션"
      aria-hidden={!isOpen}
    >
      <div className={styles.sidebarTop}>
        <button className={styles.newNoteBtn} onClick={onNewNote}>
          <span className={styles.plusIcon} aria-hidden="true">+</span>
          새 노트 생성
        </button>
      </div>

      <nav className={styles.nav}>
        {inProgress.length > 0 && (
          <section className={styles.navSection}>
            <h2 className={styles.navSectionTitle}>진행 중인 프로젝트</h2>
            <ul className={styles.projectList}>
              {inProgress.map((p) => (
                <ProjectItem
                  key={p.id} project={p}
                  isActive={p.id === activeProjectId}
                  onClick={onProjectSelect}
                />
              ))}
            </ul>
          </section>
        )}

        <section className={styles.navSection}>
          <h2 className={styles.navSectionTitle}>전체 프로젝트</h2>
          <ul className={styles.projectList}>
            {PROJECTS.map((p) => (
              <ProjectItem
                key={p.id} project={p}
                isActive={p.id === activeProjectId}
                onClick={onProjectSelect}
              />
            ))}
          </ul>
        </section>
      </nav>

      <div className={styles.legend}>
        {Object.entries(STATUS_LABEL).map(([key, label]) => (
          <div key={key} className={styles.legendItem}>
            <span className={`${styles.statusDot} ${styles[STATUS_COLOR[key]]}`} />
            <span className={styles.legendLabel}>{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
