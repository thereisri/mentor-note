// components/note/FileAttachItem.jsx
// 필수사항 섹션의 파일 첨부 행 컴포넌트
// - 설명 텍스트 + 업로드 버튼
// - 파일 첨부 후 파일명 표시

import { useRef, useState } from 'react';
import styles from './FileAttachItem.module.css';

// 업로드 아이콘 SVG
function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FileAttachItem({ description, readonly = false }) {
  const [attachedFile, setAttachedFile] = useState(null);
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    if (!readonly) inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
  };

  const handleRemoveFile = () => setAttachedFile(null);

  return (
    <div className={styles.attachRow}>
      {/* 설명 + 업로드 버튼 */}
      <div className={styles.attachMain}>
        <span className={styles.attachDesc}>{description}</span>
        {!readonly && (
          <button
            type="button"
            className={styles.uploadBtn}
            onClick={handleUploadClick}
            aria-label={`${description} 파일 업로드`}
          >
            <UploadIcon />
          </button>
        )}
      </div>

      {/* 숨긴 파일 input */}
      {!readonly && (
        <input
          ref={inputRef}
          type="file"
          className={styles.hiddenInput}
          onChange={handleFileChange}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* 첨부된 파일명 */}
      {attachedFile && (
        <div className={styles.attachedFile}>
          <span className={styles.fileName}>{attachedFile.name}</span>
          {!readonly && (
            <button
              type="button"
              className={styles.removeFile}
              onClick={handleRemoveFile}
              aria-label="파일 삭제"
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  );
}
