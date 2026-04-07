// components/layout/Header.jsx
// 공통 헤더 컴포넌트
// - 좌측: 햄버거 메뉴
// - 중앙: 로고
// - 우측: 알림 버튼

import { useState } from 'react';
import { NOTIFICATIONS } from '../../data/dummy';
import styles from './Header.module.css';

// 햄버거 아이콘 (SVG 인라인)
function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M0 0V2.85714H20V0H0ZM0 8.57143V11.4286H20V8.57143H0ZM0 17.1429V20H20V17.1429H0Z" fill="white" />
    </svg>
  );
}

// 벨 아이콘 (SVG 인라인)
function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 25 25" fill="none" aria-hidden="true">
      <path
        d="M14.3021 21.875C14.1189 22.1907 13.8561 22.4528 13.5398 22.6349C13.2236 22.8171 12.865 22.913 12.5 22.913C12.135 22.913 11.7764 22.8171 11.4602 22.6349C11.1439 22.4528 10.8811 22.1907 10.6979 21.875M18.75 8.33333C18.75 6.67573 18.0915 5.08602 16.9194 3.91392C15.7473 2.74181 14.1576 2.08333 12.5 2.08333C10.8424 2.08333 9.25268 2.74181 8.08058 3.91392C6.90848 5.08602 6.25 6.67573 6.25 8.33333C6.25 15.625 3.125 17.7083 3.125 17.7083H21.875C21.875 17.7083 18.75 15.625 18.75 8.33333Z"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 알림 드롭다운
function NotificationDropdown({ notifications, onClose }) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={styles.notifDropdown} role="dialog" aria-label="알림 목록">
      <div className={styles.notifHeader}>
        <span>알림</span>
        {unreadCount > 0 && (
          <span className={styles.notifBadge}>{unreadCount}개 미읽음</span>
        )}
      </div>
      <ul className={styles.notifList}>
        {notifications.length === 0 ? (
          <li className={styles.notifEmpty}>새 알림이 없습니다.</li>
        ) : (
          notifications.map((n) => (
            <li key={n.id} className={`${styles.notifItem} ${!n.isRead ? styles.notifUnread : ''}`}>
              <span className={styles.notifDot} aria-hidden="true" />
              <p>{n.message}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

// 메인 Header 컴포넌트
export default function Header({ onMenuToggle, isSidebarOpen }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => !n.isRead).length;

  const handleNotifToggle = () => setIsNotifOpen((prev) => !prev);
  const handleNotifClose = () => setIsNotifOpen(false);

  return (
    <header className={styles.header} role="banner">
      {/* 좌측: 햄버거 메뉴 */}
      <div className={styles.left}>
        <button
          className={styles.menuButton}
          onClick={onMenuToggle}
          aria-label={isSidebarOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isSidebarOpen}
        >
          <HamburgerIcon />
          <span className={styles.menuLabel}>메뉴 열기</span>
        </button>
      </div>

      {/* 중앙: 로고 */}
      <div className={styles.logo} aria-label="m-note 홈">
        m-note
      </div>

      {/* 우측: 알림 */}
      <div className={styles.right}>
        <div className={styles.notifWrapper}>
          <button
            className={styles.notifButton}
            onClick={handleNotifToggle}
            aria-label={`알림 ${unreadCount > 0 ? `(미읽음 ${unreadCount}개)` : ''}`}
            aria-haspopup="true"
            aria-expanded={isNotifOpen}
          >
            <span className={styles.notifLabel}>알림</span>
            <span className={styles.notifIconWrapper}>
              <BellIcon />
              {unreadCount > 0 && (
                <span className={styles.notifCount} aria-hidden="true">
                  {unreadCount}
                </span>
              )}
            </span>
          </button>

          {isNotifOpen && (
            <>
              <div className={styles.notifOverlay} onClick={handleNotifClose} aria-hidden="true" />
              <NotificationDropdown notifications={NOTIFICATIONS} onClose={handleNotifClose} />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
