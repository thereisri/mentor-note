// components/note/RevisionHistory.jsx
// 수정 내역 타임라인 컴포넌트

import styles from './RevisionHistory.module.css';

const TYPE_LABEL = {
  ui: 'UI',
  api: 'API',
  design: '디자인',
  logic: '로직',
  test: '테스트',
  docs: '문서',
};

const TYPE_COLOR = {
  ui:     'typeUi',
  api:    'typeApi',
  design: 'typeDesign',
  logic:  'typeLogic',
  test:   'typeTest',
  docs:   'typeDocs',
};

function RevisionItem({ revision }) {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'short', day: 'numeric',
    });

  return (
    <li className={styles.revisionItem}>
      {/* 타임라인 도트 */}
      <div className={styles.timelineDot} aria-hidden="true" />

      {/* 내용 */}
      <div className={styles.revisionContent}>
        <div className={styles.revisionMeta}>
          <span className={`${styles.typeTag} ${styles[TYPE_COLOR[revision.type] ?? 'typeUi']}`}>
            {TYPE_LABEL[revision.type] ?? revision.type}
          </span>
          <span className={styles.revisionAuthor}>{revision.author}</span>
          <time className={styles.revisionDate} dateTime={revision.date}>
            {formatDate(revision.date)}
          </time>
        </div>
        <p className={styles.revisionText}>{revision.content}</p>
      </div>
    </li>
  );
}

export default function RevisionHistory({ revisions }) {
  if (!revisions?.length) {
    return (
      <section className={styles.revisionSection}>
        <h3 className={styles.sectionTitle}>수정 내역</h3>
        <p className={styles.empty}>아직 수정 내역이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className={styles.revisionSection} aria-labelledby="revision-title">
      <h3 id="revision-title" className={styles.sectionTitle}>
        수정 내역
        <span className={styles.revisionCount}>{revisions.length}건</span>
      </h3>

      <ul className={styles.timeline}>
        {revisions.map((rev) => (
          <RevisionItem key={rev.id} revision={rev} />
        ))}
      </ul>
    </section>
  );
}
