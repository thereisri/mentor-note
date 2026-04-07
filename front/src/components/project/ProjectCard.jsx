// components/project/ProjectCard.jsx
// 프로젝트 목록에서 사용되는 카드 컴포넌트
// props: project 객체, onClick 핸들러

import Badge from '../common/Badge';
import Card from '../common/Card';
import { PROCESS_STEPS } from '../../data/dummy';
import styles from './ProjectCard.module.css';

// 진행 스텝 미니 인디케이터
function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className={styles.stepIndicator} aria-label={`진행 단계: ${currentStep} / ${totalSteps}`}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <span
          key={i}
          className={`${styles.stepDot} ${i < currentStep ? styles.stepDotDone : ''} ${i === currentStep - 1 ? styles.stepDotCurrent : ''}`}
        />
      ))}
    </div>
  );
}

// 팀원 아바타 그룹
function MemberAvatars({ members }) {
  const visible = members.slice(0, 3);
  const rest = members.length - 3;

  return (
    <div className={styles.avatars} aria-label={`팀원: ${members.join(', ')}`}>
      {visible.map((name, i) => (
        <span key={i} className={styles.avatar} title={name}>
          {name[0]}
        </span>
      ))}
      {rest > 0 && (
        <span className={`${styles.avatar} ${styles.avatarMore}`}>+{rest}</span>
      )}
    </div>
  );
}

export default function ProjectCard({ project, onClick }) {
  const totalSteps = PROCESS_STEPS.length;

  // 날짜 포맷
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });

  return (
    <Card hoverable onClick={onClick} className={styles.card}>
      {/* 상단: 제목 + 배지 */}
      <div className={styles.cardTop}>
        <h3 className={styles.title}>{project.title}</h3>
        <Badge variant={project.status} />
      </div>

      {/* 설명 */}
      <p className={styles.description}>{project.description}</p>

      {/* 진행 단계 */}
      <div className={styles.progressRow}>
        <span className={styles.stepLabel}>
          Step {project.currentStep} / {totalSteps}
        </span>
        <StepIndicator currentStep={project.currentStep} totalSteps={totalSteps} />
      </div>

      {/* 태그 */}
      {project.tags?.length > 0 && (
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}

      {/* 하단: 팀원 + 날짜 */}
      <div className={styles.cardBottom}>
        <MemberAvatars members={project.members} />
        <span className={styles.date}>
          {formatDate(project.startDate)} – {formatDate(project.endDate)}
        </span>
      </div>
    </Card>
  );
}
