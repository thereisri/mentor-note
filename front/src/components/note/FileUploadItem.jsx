// components/note/FileUploadItem.jsx
// 필수사항 섹션의 파일 업로드 행 컴포넌트
// 텍스트 설명 + 우측 업로드 버튼

import styles from './FileUploadItem.module.css';

// 업로드 아이콘 SVG
function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FileUploadItem({
  description,
  fileName = null,
  onUpload,
  readonly = false,
}) {
  const handleClick = () => {
    if (readonly) return;
    // ※ API 연결 포인트: 실제 파일 업로드 핸들러로 교체
    onUpload?.();
  };

  return (
    <div className={styles.item}>
      <span className={styles.description}>{description}</span>
      {!readonly && (
        <button
          className={styles.uploadBtn}
          onClick={handleClick}
          aria-label={`${description} 파일 업로드`}
          title="파일 업로드"
        >
          <UploadIcon />
        </button>
      )}
      {fileName && (
        <span className={styles.fileName} title={fileName}>
          {fileName}
        </span>
      )}
    </div>
  );
}
