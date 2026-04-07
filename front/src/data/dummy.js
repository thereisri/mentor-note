// =============================================
// m-note Dummy Data — v3
// 실제 API 연결 시 src/services/ 레이어로 교체
// =============================================

export const CURRENT_USER = {
  id: 'user-001',
  name: '김민지',
  role: 'Frontend Developer',
  avatar: null,
};

// ─── 상태 상수 ───────────────────────────────
export const PROJECT_STATUS = {
  TODO:        'todo',
  IN_PROGRESS: 'in_progress',
  REVIEW:      'review',
  DONE:        'done',
  ON_HOLD:     'on_hold',
};

export const STATUS_LABEL = {
  todo:        '예정',
  in_progress: '진행중',
  review:      '검토중',
  done:        '완료',
  on_hold:     '보류',
};

// note-view2 리본용: project status → ribbon variant
export const STATUS_TO_RIBBON = {
  done:        'done',
  in_progress: 'run',
  todo:        'wait',
  review:      'wait',
  on_hold:     'wait',
};

// ─── 표준 프로세스 스텝 ───────────────────────
export const PROCESS_STEPS = [
  { id: 'step-1', label: '요구사항\n분석', order: 1 },
  { id: 'step-2', label: '설계',          order: 2 },
  { id: 'step-3', label: '개발',          order: 3 },
  { id: 'step-4', label: '테스트',        order: 4 },
  { id: 'step-5', label: '배포',          order: 5 },
];

// ─── 프로젝트 목록 ────────────────────────────
export const PROJECTS = [
  {
    id: 'proj-001',
    title: '사내 인트라넷 리뉴얼',
    description: '기존 인트라넷 시스템을 React 기반으로 전면 개편. 성능 개선 및 UI/UX 현대화.',
    status: PROJECT_STATUS.IN_PROGRESS,
    currentStep: 3,
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    members: ['김민지', '박서준', '이하은'],
    tags: ['React', 'UI/UX', '리뉴얼'],
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-04-10T14:30:00Z',
  },
  {
    id: 'proj-002',
    title: '모바일 앱 v2.0 출시',
    description: '기존 앱의 성능 이슈 해결 및 신규 기능(푸시 알림, 다크모드) 추가.',
    status: PROJECT_STATUS.REVIEW,
    currentStep: 4,
    startDate: '2024-02-15',
    endDate: '2024-05-15',
    members: ['박서준', '최동현'],
    tags: ['Mobile', 'React Native'],
    createdAt: '2024-02-15T09:00:00Z',
    updatedAt: '2024-04-08T11:00:00Z',
  },
  {
    id: 'proj-003',
    title: 'API 서버 마이그레이션',
    description: 'REST API를 GraphQL로 전환. 기존 클라이언트 호환성 유지.',
    status: PROJECT_STATUS.TODO,
    currentStep: 1,
    startDate: '2024-05-01',
    endDate: '2024-07-31',
    members: ['이하은', '정유진'],
    tags: ['Backend', 'GraphQL', 'Node.js'],
    createdAt: '2024-04-01T09:00:00Z',
    updatedAt: '2024-04-01T09:00:00Z',
  },
  {
    id: 'proj-004',
    title: '대시보드 성능 최적화',
    description: '데이터 로딩 속도 개선 및 렌더링 최적화. Lighthouse 점수 90점 이상 목표.',
    status: PROJECT_STATUS.DONE,
    currentStep: 5,
    startDate: '2024-01-10',
    endDate: '2024-03-10',
    members: ['김민지'],
    tags: ['성능최적화', 'React'],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-03-10T17:00:00Z',
  },
  {
    id: 'proj-005',
    title: 'CS 포털 구축',
    description: '고객 지원 포털 신규 구축. FAQ, 티켓 시스템, 채팅 연동.',
    status: PROJECT_STATUS.ON_HOLD,
    currentStep: 2,
    startDate: '2024-04-01',
    endDate: '2024-09-30',
    members: ['정유진', '김민지', '박서준', '이하은'],
    tags: ['신규', 'CS', 'Portal'],
    createdAt: '2024-04-01T09:00:00Z',
    updatedAt: '2024-04-02T09:00:00Z',
  },
];

// ─── 플로우 노트 (프로젝트별) ─────────────────
export const PROJECT_FLOW_NOTES = {
  'proj-001': [
    { id: 'fn-001-1', title: '고객사\n요구사항', status: 'done'        },
    { id: 'fn-001-2', title: 'WBS 작성',        status: 'todo'        },
    { id: 'fn-001-3', title: '개발',            status: 'in_progress' },
    { id: 'fn-001-4', title: '테스트',          status: 'todo'        },
    { id: 'fn-001-5', title: 'OPEN',            status: 'todo'        },
  ],
  'proj-002': [
    { id: 'fn-002-1', title: '요구사항',  status: 'done'        },
    { id: 'fn-002-2', title: '설계',      status: 'done'        },
    { id: 'fn-002-3', title: '개발',      status: 'done'        },
    { id: 'fn-002-4', title: '테스트',    status: 'in_progress' },
    { id: 'fn-002-5', title: '배포',      status: 'todo'        },
  ],
};

// ─── 노트 상세 ────────────────────────────────
export const NOTES = [
  {
    id: 'note-001',
    projectId: 'proj-001',
    flowNoteId: 'fn-001-1',
    title: '고객사 요구사항',
    targetDate: '2026년 4월 28일까지',
    background:
      '기존 레거시 시스템은 jQuery 기반으로 유지보수가 어렵고 성능이 저하되어 있음. 직원 만족도 조사에서 UI/UX 개선 요청이 1위를 차지.',
    currentStatus:
      '컴포넌트 설계 완료 후 개발 단계 진입. Header, Sidebar, Dashboard 컴포넌트 구현 완료.',
    description:
      '고객사와의 커뮤니케이션을 통해서\n요구사항을 아래와 같은 엑셀파일 템플릿에 적용해\n작성 및 고객사 확인을 받고있습니다.',
    processStep: 3,
    essentials: [
      { id: 'ess-1', description: '고객사_요구사항_리스트를 아래와 같은 엑셀 첨부', fileName: null },
      { id: 'ess-2', description: '요구사항 고객사 측 메일 또는 메세지 확인 캡쳐',  fileName: null },
    ],
    revisions: [
      { id: 'rev-001', date: '2024-04-10', author: '김민지', content: '사이드바 네비게이션 구조 변경. 2depth → 1depth로 단순화.', type: 'ui' },
      { id: 'rev-002', date: '2024-04-08', author: '박서준', content: 'API 엔드포인트 명세 수정. /api/v1/users → /api/v2/users.', type: 'api' },
      { id: 'rev-003', date: '2024-04-05', author: '이하은', content: '색상 시스템 재정의. 피그마 디자인 시스템 적용.', type: 'design' },
    ],
    checklist: [
      { id: 'chk-1', label: '회의록전달',           done: true  },
      { id: 'chk-2', label: '고객사 이메일 확인',    done: true  },
      { id: 'chk-3', label: '고객사의 마감기한 확인', done: true  },
      { id: 'chk-4', label: '회의실 장소 예약',      done: true  },
      { id: 'chk-5', label: '미팅 녹음 확인',        done: true  },
      { id: 'chk-6', label: '기한 확인',             done: true  },
    ],
    testResults: [
      { id: 'test-1', item: 'Chrome 최신',  result: 'pass'    },
      { id: 'test-2', item: 'Firefox 최신', result: 'pass'    },
      { id: 'test-3', item: 'Safari 17',    result: 'fail'    },
      { id: 'test-4', item: 'Edge 최신',    result: 'pass'    },
      { id: 'test-5', item: 'Mobile Chrome',result: 'pending' },
    ],
    memo: '사파리에서 CSS Grid gap 속성 버그 확인. polyfill 적용 필요.',
    extra: { recommendation: '', checklist: [], tags: ['React', '요구사항'], essential: '', custom: '' },
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-04-10T14:30:00Z',
  },
];

// ─── 알림 ─────────────────────────────────────
export const NOTIFICATIONS = [
  { id: 'notif-001', message: '박서준님이 "사내 인트라넷 리뉴얼"에 수정 내역을 추가했습니다.', isRead: false, createdAt: '2024-04-10T14:30:00Z' },
  { id: 'notif-002', message: '"모바일 앱 v2.0" 프로젝트가 검토 단계로 이동했습니다.',           isRead: false, createdAt: '2024-04-08T11:00:00Z' },
  { id: 'notif-003', message: '이하은님이 체크리스트 항목을 완료 처리했습니다.',                  isRead: true,  createdAt: '2024-04-05T16:00:00Z' },
];

// ─── 헬퍼 함수 ───────────────────────────────
export const getNoteByFlowId = (flowNoteId) =>
  NOTES.find((n) => n.flowNoteId === flowNoteId) ?? null;

export const getNotesByProject = (projectId) =>
  NOTES.filter((n) => n.projectId === projectId);

export const getProjectById = (id) =>
  PROJECTS.find((p) => p.id === id) ?? null;

export const getFlowNotes = (projectId) =>
  PROJECT_FLOW_NOTES[projectId] ?? [];
