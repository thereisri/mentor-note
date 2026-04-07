// components/home/HeroSection.jsx
// 메인 랜딩 히어로 섹션
// - 좌측: 팀워크 일러스트
// - 우측: 헤드카피 + CTA 버튼

import HeroIllustration from './HeroIllustration';
import Button from '../common/Button';
import styles from './HeroSection.module.css';

export default function HeroSection({ onCreateNote }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* 배경 장식 */}
      <div className={styles.bgDecor1} aria-hidden="true" />
      <div className={styles.bgDecor2} aria-hidden="true" />

      {/* 좌측 일러스트 */}
      <div className={styles.illustrationCol}>
        <HeroIllustration />
      </div>

      {/* 우측 텍스트 + CTA */}
      <div className={styles.contentCol}>
        <h1 id="hero-heading" className={styles.heading}>
          <span className={styles.headingLine}>우리팀</span>
          <span className={styles.headingLineAccent}>같은 프로세스로</span>
          <span className={styles.headingLine}>일 하자</span>
        </h1>

        <p className={styles.subtext}>
          업무 흐름, 수정 내역, 체크리스트를
          <br />
          한 곳에서 팀과 함께 정리해요.
        </p>

        <div className={styles.ctaGroup}>
          <Button
            variant="primary"
            size="lg"
            onClick={onCreateNote}
            className={styles.ctaButton}
          >
            새 노트 생성 하기
          </Button>
          <Button variant="ghost" size="lg" className={styles.learnBtn}>
            더 알아보기 →
          </Button>
        </div>
      </div>
    </section>
  );
}
