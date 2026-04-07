// pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import ProjectCard from '../components/project/ProjectCard';
import { PROJECTS, PROJECT_STATUS } from '../data/dummy';
import styles from './HomePage.module.css';

const FEATURES = [
  { id: 'f1', icon: '📋', title: '업무 노트',     desc: '프로젝트 배경, 현황, 수정 내역을 한 곳에 정리' },
  { id: 'f2', icon: '✅', title: '체크리스트',    desc: '누락 없이 항목별로 완료 여부를 관리' },
  { id: 'f3', icon: '🔄', title: '표준 프로세스', desc: '요구사항 → 설계 → 개발 → 테스트 → 배포 단계 추적' },
  { id: 'f4', icon: '👥', title: '팀 공유',       desc: '같은 프로세스로 팀 전체 품질을 균일하게' },
];

export default function HomePage() {
  const navigate = useNavigate();

  const activeProjects = PROJECTS.filter(
    (p) => p.status === PROJECT_STATUS.IN_PROGRESS || p.status === PROJECT_STATUS.REVIEW
  );

  return (
    <Layout>
      <HeroSection onCreateNote={() => navigate('/projects/new')} />

      {/* 진행 중인 프로젝트 */}
      <section className={styles.projectsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>진행 중인 프로젝트</h2>
          </div>
          <div className={styles.cardGrid}>
            {activeProjects.map((project, i) => (
              <div key={project.id} className={styles.cardWrapper} style={{ animationDelay: `${i * 0.08}s` }}>
                <ProjectCard
                  project={project}
                  onClick={() => navigate(`/projects/${project.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 피처 배너 */}
      <section className={styles.featureBanner}>
        <div className={styles.sectionInner}>
          <h2 className={styles.bannerTitle}>표준 프로세스로 팀 품질을 높여요</h2>
          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <div key={f.id} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureCardTitle}>{f.title}</h3>
                <p className={styles.featureCardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
