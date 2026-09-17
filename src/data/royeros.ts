export type AppId =
  | 'about'
  | 'projects'
  | 'skills'
  | 'terminal'
  | 'contact'
  | 'resume'
  | 'trash'

export type ProjectCategory = 'featured' | 'web' | 'frontend' | 'backend' | 'experiment'

export interface ProjectScreenshot {
  src: string
  title: string
  caption: string
}

export interface ProjectCase {
  id: string
  name: string
  folderName: string
  category: ProjectCategory[]
  status: 'Production-ready' | 'Completed' | 'In progress'
  type: string
  description: string
  problem: string
  solution: string
  stack: string[]
  features: string[]
  architecture: string[]
  screenshots: ProjectScreenshot[]
  github?: string
  demo?: string
}

export interface DesktopShortcut {
  id: string
  label: string
  iconName: string
  kind: 'app' | 'external' | 'action'
  appId?: AppId
  externalUrl?: string
}

export interface SkillProcess {
  name: string
  type: string
  status: 'ACTIVE' | 'STABLE' | 'LEARNING' | 'SUPPORT'
  load: string
}

export interface SkillGroup {
  name: string
  processes: SkillProcess[]
}

export const profile = {
  name: 'Royer Merchan',
  role: 'Full Stack Developer',
  tagline: 'Build. Ship. Repeat.',
  location: 'Colombia / LatAm',
  email: 'alejandomerchanserrano@gmail.com',
  phone: '+58 414-7367490',
  github: 'https://github.com/RoyerMerchan',
  linkedin: 'https://www.linkedin.com/in/royer-merchan-399741385',
  whatsapp: 'https://wa.me/584147367490',
  resume: '/RoyerMerchan.pdf',
}

export const shortcuts: DesktopShortcut[] = [
  { id: 'about', label: 'About Me', iconName: 'UserRound', kind: 'app', appId: 'about' },
  { id: 'projects', label: 'Projects', iconName: 'FolderKanban', kind: 'app', appId: 'projects' },
  { id: 'skills', label: 'Skills', iconName: 'Activity', kind: 'app', appId: 'skills' },
  { id: 'terminal', label: 'Terminal', iconName: 'TerminalSquare', kind: 'app', appId: 'terminal' },
  { id: 'contact', label: 'Contact', iconName: 'Mail', kind: 'app', appId: 'contact' },
  { id: 'resume', label: 'Resume', iconName: 'FileText', kind: 'app', appId: 'resume' },
  { id: 'github', label: 'GitHub', iconName: 'Github', kind: 'external', externalUrl: profile.github },
  { id: 'trash', label: 'Trash', iconName: 'Trash2', kind: 'app', appId: 'trash' },
]

export const projects: ProjectCase[] = [
  {
    id: 'sportapp',
    name: 'SportApp',
    folderName: 'SportApp.app',
    category: ['featured', 'web', 'backend'],
    status: 'Completed',
    type: 'University sports platform',
    description:
      'Web application designed for the organization, promotion and management of university sports.',
    problem:
      'University tournaments were managed with spreadsheets, chats and paper. That slowed results, duplicated data and made statistics hard to trust.',
    solution:
      'A centralized platform for tournaments, teams, players, match days, news and authenticated roles.',
    stack: ['Vue.js', 'Node.js', 'PostgreSQL', 'PrimeVue', 'Tailwind CSS'],
    features: [
      'Tournament management',
      'Team and player registration',
      'Match management',
      'Sports statistics',
      'News and content publishing',
      'Authentication and user roles',
    ],
    architecture: [
      'Role-based access around tournament operations',
      'Relational schema for teams, players, fixtures and results',
      'Responsive public views for participants and admins',
    ],
    screenshots: [
      {
        src: '/sportapp.png',
        title: 'SportApp interface',
        caption: 'Original project screenshot used as portfolio evidence.',
      },
    ],
    github: profile.github,
  },
  {
    id: 'torneo-system',
    name: 'Torneo System',
    folderName: 'torneo-system/',
    category: ['featured', 'web', 'backend'],
    status: 'Production-ready',
    type: 'Football tournament operating system',
    description:
      'Dockerized tournament system for Liga Lago Futsal with public results, admin tools, teams, players, fixtures, live match sync and audit trails.',
    problem:
      'The league needed one official source for fixtures, results, standings, player eligibility and match events instead of scattered WhatsApp updates.',
    solution:
      'A full-stack monorepo with public mobile-first views, admin modules, real-time scoring, Prisma/PostgreSQL, MinIO assets and Socket.IO updates.',
    stack: [
      'React',
      'TypeScript',
      'MUI',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Socket.IO',
      'MinIO',
      'Docker',
    ],
    features: [
      'Editions, categories and competitions',
      'League divisions with promotion and relegation workflows',
      'Groups plus knockout brackets',
      'Player eligibility by age and admin approval',
      'Live match events and standings',
      'Advertisements and media uploads',
      'Admin audit module',
    ],
    architecture: [
      'Monorepo with shared TypeScript types',
      'REST API plus Socket.IO for live score propagation',
      'Prisma schema with migrations and seeded admin data',
      'Docker Compose for frontend, backend, PostgreSQL, Adminer and MinIO',
    ],
    screenshots: [
      {
        src: '/torneo-hero-cancha.jpg',
        title: 'LLF visual system',
        caption: 'Hero court asset from the real Torneo frontend.',
      },
      {
        src: '/torneo-llf-logo.png',
        title: 'Liga Lago Futsal',
        caption: 'Brand asset used by the public product.',
      },
      {
        src: '/torneo-balon-joma.png',
        title: 'Sponsor asset',
        caption: 'A real uploaded tournament visual asset.',
      },
    ],
    github: profile.github,
  },
  {
    id: 'colegio-system',
    name: 'Colegio System',
    folderName: 'ColegioSystem/',
    category: ['featured', 'web', 'backend'],
    status: 'Production-ready',
    type: 'School management platform',
    description:
      'Complete Spanish-language school administration platform with academic, admissions, communications, portal and finance modules.',
    problem:
      'A school needs to coordinate staff, students, guardians, payments, report cards and admissions without losing traceability or role control.',
    solution:
      'A Next.js + Express monorepo with granular permissions, JWT auth, Prisma/PostgreSQL, PDF/Excel generation and a parent/student portal.',
    stack: [
      'Next.js 15',
      'React 19',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'PDFKit',
      'ExcelJS',
      'Turborepo',
    ],
    features: [
      'Staff panel and student/guardian portal',
      'Academic years, periods, subjects, sections and schedules',
      'Configurable qualitative or quantitative grading',
      'Report cards, receipts and ID cards in PDF',
      'Admissions and QR credential verification',
      'Financial module with fees, scholarships, arrears and reports',
      'Granular role permissions and audit logs',
    ],
    architecture: [
      'pnpm workspaces with API, web and shared database package',
      '65 Prisma models and 40 enums across school domains',
      'JWT access and refresh flow with optional TOTP',
      'S3-compatible storage or local storage for files',
    ],
    screenshots: [
      {
        src: '/colegio-logotipo.png',
        title: 'School brand',
        caption: 'Logo asset from the ColegioSystem public package.',
      },
      {
        src: '/colegio-escudo.png',
        title: 'School shield',
        caption: 'Icon asset used by the school application.',
      },
    ],
    github: profile.github,
  },
  {
    id: 'finanzas-ve',
    name: 'Finanzas VE',
    folderName: 'AppCrash/finanzas-ve',
    category: ['featured', 'web', 'backend'],
    status: 'Production-ready',
    type: 'Bimonetary personal finance platform',
    description:
      'Multi-user personal finance application for Venezuela with USD/Bs accounting, historical exchange rates, product-level purchases and offline synchronization.',
    problem:
      'Generic expense trackers lose accuracy in a bimonetary economy, recalculate old transactions with current rates and cannot explain how each product affects personal inflation.',
    solution:
      'A finance monorepo that freezes the applied exchange rate per movement, keeps decimal-safe accounting, separates every user dataset and synchronizes offline entries idempotently.',
    stack: [
      'Next.js 15',
      'TypeScript',
      'Auth.js',
      'Drizzle ORM',
      'PostgreSQL',
      'IndexedDB',
      'Zod',
      'Docker',
    ],
    features: [
      'USD and bolivar accounting with frozen historical rates',
      'Product-level purchase and price history',
      'Personal inflation basket',
      'Budgets, accounts, debts and amortization',
      'Offline queue with idempotent synchronization',
      'Excel, CSV and JSON exports',
      'Strict multi-user data isolation',
    ],
    architecture: [
      'Workspace packages for domain logic, database, validators and UI',
      '28 PostgreSQL tables with user-scoped business data',
      'Decimal.js and NUMERIC columns instead of floating-point money',
      '147 unit tests around the reusable finance domain',
    ],
    screenshots: [
      {
        src: '/finanzas-ve-icon.svg',
        title: 'Finanzas VE application',
        caption: 'Official application icon from the production web package.',
      },
    ],
    github: profile.github,
  },
  {
    id: 'gochito-system',
    name: 'GochitoSystem',
    folderName: 'gochitosystem/',
    category: ['featured', 'web', 'backend'],
    status: 'Production-ready',
    type: 'Bimonetary minimarket POS',
    description:
      'Complete operating system for Mini Market Los Gochitos: POS, cash register, inventory, credit sales and reports in USD and bolivars.',
    problem:
      'A Venezuelan minimarket needs to sell with mixed payments, preserve exchange-rate and cost snapshots, manage customer credit and reconcile two currencies without accounting drift.',
    solution:
      'A React and Express platform with transactional sales, mixed USD/Bs payments, FIFO credit allocation, realtime updates and exportable business reports.',
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Node.js',
      'Express 5',
      'PostgreSQL',
      'Prisma',
      'Socket.IO',
      'Docker',
    ],
    features: [
      'POS with barcode scanning and suspended sales',
      'Mixed USD/Bs payments and change calculation',
      'Cash opening, closing and dual-currency reconciliation',
      'Inventory ledger and weighted average cost',
      'Customer credit with FIFO payments and late fees',
      'Thermal tickets plus Excel and PDF reports',
      'Realtime business updates',
    ],
    architecture: [
      'Modular REST API with authentication, permissions and Zod validation',
      'Transactional monetary operations with historical rate and cost snapshots',
      'React Query and Zustand frontend state with Socket.IO synchronization',
      'Containerized production deployment with database migrations',
    ],
    screenshots: [
      {
        src: '/gochito-icon.svg',
        title: 'GochitoSystem identity',
        caption: 'Application asset from the production frontend.',
      },
    ],
    github: profile.github,
  },
  {
    id: 'omstore',
    name: 'OmStore',
    folderName: 'OmStoreApp/',
    category: ['featured', 'web', 'backend'],
    status: 'Production-ready',
    type: 'Footwear retail and POS platform',
    description:
      'Administrative retail platform for a shoe store with product variants, inventory, purchases, POS sales, cash control, layaways and business reports.',
    problem:
      'Footwear retail combines size and color variants, reserved stock, layaway payments and cash operations that are difficult to keep consistent in separate spreadsheets.',
    solution:
      'A full-stack monorepo that centralizes the catalog, stock ledger, purchasing, checkout and reporting with transactional rules for every critical operation.',
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Node.js',
      'Express',
      'Prisma',
      'MySQL',
      'Zustand',
      'Docker',
    ],
    features: [
      'Products with size and color variants',
      'POS checkout with mixed payments',
      'Inventory movements and low-stock alerts',
      'Purchases and supplier management',
      'Layaways with reservations and installment payments',
      'Cash register opening, closing and adjustments',
      'Sales, profit and inventory reports',
    ],
    architecture: [
      'pnpm monorepo with API, admin, store, database and shared packages',
      'Prisma transactions protect stock, sales and layaway operations',
      'Role-based access for administrators, managers, cashiers and sellers',
      'Docker Compose environment for the full application stack',
    ],
    screenshots: [
      {
        src: '/omstore-logo.png',
        title: 'OmStore brand',
        caption: 'Official logo used by the store and administration applications.',
      },
    ],
    github: profile.github,
  },
  {
    id: 'emily-portfolio',
    name: 'Emily Portfolio',
    folderName: 'Emilyportfolio.book',
    category: ['web', 'frontend', 'experiment'],
    status: 'Completed',
    type: 'Interactive book portfolio',
    description:
      'Responsive portfolio presented as a physical book with a rigid cover, foldable pages, touch gestures and an editable catalog of handmade school projects.',
    problem:
      'A standard gallery could display the work, but it would not communicate the tactile and handmade character of posters, models, lapbooks and teaching materials.',
    solution:
      'A custom page-folding experience built with clip paths and reflection matrices, adapted from a two-page desktop book to a single-page mobile interaction.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'CSS Modules', 'Pointer Events'],
    features: [
      'Rigid animated book cover',
      'Drag-driven paper fold geometry',
      'Desktop spread and mobile single-page modes',
      'Keyboard and touch navigation',
      'Editable portfolio data and work categories',
      'Responsive image galleries',
    ],
    architecture: [
      'Custom fold engine without turn.js or jQuery',
      'Frame-by-frame clip-path and reflection matrix calculations',
      'Content registry separated from rendering components',
      'Input handling that distinguishes drag gestures from clicks',
    ],
    screenshots: [
      {
        src: '/emily-logo.png',
        title: 'Emily Portfolio mark',
        caption: 'Brand asset used by the interactive portfolio.',
      },
      {
        src: '/emily-portfolio.jpg',
        title: 'Portfolio identity',
        caption: 'Original image asset from the About page of the project.',
      },
    ],
    github: profile.github,
  },
  {
    id: 'invsystem-pro',
    name: 'InvSystem Pro',
    folderName: 'invsystem-pro/',
    category: ['featured', 'web', 'backend'],
    status: 'Production-ready',
    type: 'Predictive inventory platform',
    description:
      'Enterprise inventory system with stock control, realtime alerts, QR workflows, executive reports and demand forecasting through statistical time-series models.',
    problem:
      'Traditional inventory tools report what already happened but give teams little help anticipating stockouts, seasonal demand or the right replenishment quantity.',
    solution:
      'A containerized React and FastAPI platform that combines operational inventory tracking with automatic model comparison across Holt-Winters, ARIMA and Prophet forecasts.',
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'FastAPI',
      'PostgreSQL 16',
      'Redis 7',
      'Statsmodels',
      'Prophet',
      'Docker',
    ],
    features: [
      'Products, movements and current stock control',
      'Automatic low-stock alerts',
      'QR scanner for fast warehouse operations',
      'Demand forecasts with confidence intervals',
      'Automatic model selection using MAPE',
      'Recommended replenishment and stockout date',
      'Executive Excel and PDF reports',
    ],
    architecture: [
      'FastAPI service with async SQLAlchemy and Alembic migrations',
      'PostgreSQL persistence plus Redis cache',
      'Forecasting service for Holt-Winters, ARIMA and Prophet',
      'Nginx reverse proxy and Docker Compose deployment',
    ],
    screenshots: [
      {
        src: '/invsystem-pro.png',
        title: 'InvSystem Pro access portal',
        caption: 'Live production interface captured from the deployed application.',
      },
    ],
    github: 'https://github.com/RoyerMerchan/invsystem-pro',
    demo: 'https://invsystem-pro.vercel.app',
  },
  {
    id: 'restaurant-system',
    name: 'Sistema de Restaurante para Tienda',
    folderName: 'sistema-de-restaurante-para-tienda/',
    category: ['web', 'backend'],
    status: 'In progress',
    type: 'Restaurant ordering and kitchen system',
    description:
      'Restaurant operations backend for customers, table zones, menus, specifications, orders and realtime kitchen dispatch.',
    problem:
      'Restaurant orders must preserve customer, table, menu and customization data while reaching the kitchen immediately and keeping their preparation status synchronized.',
    solution:
      'A modular Express and MySQL API that models the ordering flow and broadcasts new orders to connected kitchen clients through WebSockets.',
    stack: [
      'TypeScript',
      'Node.js',
      'Express 5',
      'MySQL',
      'WebSocket',
      'Socket.IO',
      'Morgan',
    ],
    features: [
      'Customer registration',
      'Menu items with configurable specifications',
      'Table and restaurant zone management',
      'Order rows with totals and status tracking',
      'Realtime delivery of new orders to the kitchen',
      'REST endpoints for operational modules',
    ],
    architecture: [
      'Controller, model and route separation in TypeScript',
      'Relational MySQL models for customers, tables, menus and orders',
      'Dedicated WebSocket channel for kitchen events',
      'CORS, structured HTTP logging and environment configuration',
    ],
    screenshots: [],
    github: 'https://github.com/RoyerMerchan/sistema-de-restaurante-para-tienda',
  },
  {
    id: 'spotibad',
    name: 'SpotiBad',
    folderName: 'SpotiBad.music',
    category: ['web', 'frontend', 'backend'],
    status: 'Completed',
    type: 'Music streaming application',
    description:
      'Spotify-inspired music application with playback-oriented UI, search, artists, songs and playlist management.',
    problem:
      'Music streaming interfaces combine media browsing, authentication, playlist state and external catalog integration in one interaction-heavy product.',
    solution:
      'A responsive streaming clone backed by Express and MongoDB, with JWT authentication, Firebase services and Spotify API integration.',
    stack: [
      'React',
      'JavaScript',
      'Express',
      'MongoDB',
      'Mongoose',
      'Firebase',
      'JWT',
      'Spotify API',
    ],
    features: [
      'Music player interface',
      'Song and artist search',
      'Playlist creation and management',
      'User registration and authentication',
      'Media uploads with Multer',
      'Spotify catalog integration',
    ],
    architecture: [
      'Express controllers and routes by domain',
      'MongoDB models for users, artists, songs and playlists',
      'JWT middleware for protected operations',
      'Swagger API documentation and Firebase integration',
    ],
    screenshots: [
      {
        src: '/clon-spotify.png',
        title: 'SpotiBad player',
        caption: 'Original interface screenshot from the previous portfolio.',
      },
    ],
    github: 'https://github.com/RoyerMerchan/backend-spotibad',
  },
  {
    id: 'knotchange',
    name: 'KnotChange',
    folderName: 'KnotChange.chat',
    category: ['web', 'frontend', 'backend'],
    status: 'Completed',
    type: 'Realtime messaging experiment',
    description:
      'WhatsApp-style messaging interface built to explore realtime chat interactions and responsive app UI.',
    problem:
      'Realtime messaging requires careful state, event delivery and a UI that keeps conversations readable under constant updates.',
    solution:
      'A focused chat clone with conversations, message lists and Socket.IO-driven realtime behavior.',
    stack: ['React', 'Node.js', 'Express', 'Socket.IO', 'MongoDB'],
    features: [
      'Realtime messages',
      'Conversation list',
      'Responsive layout',
      'Chat-style interaction patterns',
    ],
    architecture: [
      'Socket event flow for message delivery',
      'MongoDB persistence for conversations',
      'Separated server and client responsibilities',
    ],
    screenshots: [
      {
        src: '/knot.jpg',
        title: 'KnotChange UI',
        caption: 'Original WhatsApp-style interface screenshot.',
      },
    ],
    github: profile.github,
  },
  {
    id: 'canvas-game',
    name: 'Canvas Game',
    folderName: 'canvas-game.exe',
    category: ['frontend', 'experiment'],
    status: 'Completed',
    type: '2D browser game',
    description:
      'HTML5 Canvas game built with JavaScript to practice rendering loops, collisions and input control.',
    problem:
      'Game logic exposes timing, rendering and collision problems that normal UI work rarely forces you to solve.',
    solution:
      'A small engine from scratch using requestAnimationFrame, keyboard controls and manual collision checks.',
    stack: ['JavaScript', 'HTML5 Canvas', 'CSS'],
    features: [
      'Custom render loop',
      'Keyboard input',
      'Collision detection',
      'Sprite movement',
    ],
    architecture: [
      'Canvas API rendering',
      'Frame-based state updates',
      'Input handling isolated from drawing logic',
    ],
    screenshots: [
      {
        src: '/juego-2d.png',
        title: 'Game scene',
        caption: 'Canvas project screenshot.',
      },
    ],
    github: profile.github,
  },
  {
    id: 'portfolio-experiments',
    name: 'Portfolio Experiments',
    folderName: 'RoyerOS.lab',
    category: ['frontend', 'experiment'],
    status: 'In progress',
    type: 'Interactive portfolio shell',
    description:
      'This portfolio itself: a desktop-like UI that demonstrates state management, windows, commands, motion and responsive adaptation.',
    problem:
      'A traditional portfolio can list skills, but it does not prove interaction design or frontend architecture.',
    solution:
      'RoyerOS turns the site into a small operating system with apps, windows, terminal commands and project case studies.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    features: [
      'Boot sequence',
      'Draggable windows',
      'Terminal command parser',
      'Start menu and taskbar',
      'Notifications',
      'Responsive mobile shell',
    ],
    architecture: [
      'Central window manager hook',
      'Data-driven app and project registry',
      'Shared window frame for every internal app',
      'LocalStorage for boot and wallpaper preferences',
    ],
    screenshots: [
      {
        src: '/background-merchan.png',
        title: 'Portfolio visual base',
        caption: 'Existing Royer visual asset reused as part of the OS identity.',
      },
    ],
    github: profile.github,
  },
]

export const skillGroups: SkillGroup[] = [
  {
    name: 'FRONTEND',
    processes: [
      { name: 'React', type: 'UI RUNTIME', status: 'ACTIVE', load: 'Production interfaces' },
      { name: 'Vue.js', type: 'UI RUNTIME', status: 'STABLE', load: 'SportApp stack' },
      { name: 'TypeScript', type: 'LANGUAGE', status: 'ACTIVE', load: 'Typed apps and APIs' },
      { name: 'Tailwind CSS', type: 'STYLE ENGINE', status: 'ACTIVE', load: 'Design systems' },
      { name: 'PrimeVue', type: 'COMPONENT KIT', status: 'SUPPORT', load: 'Admin interfaces' },
      { name: 'MUI', type: 'COMPONENT KIT', status: 'SUPPORT', load: 'Torneo System' },
    ],
  },
  {
    name: 'BACKEND',
    processes: [
      { name: 'Node.js', type: 'SERVER RUNTIME', status: 'ACTIVE', load: 'REST APIs' },
      { name: 'Express', type: 'API LAYER', status: 'ACTIVE', load: 'Modular services' },
      { name: 'Socket.IO', type: 'REALTIME BUS', status: 'ACTIVE', load: 'Live matches / chat' },
      { name: 'Zod', type: 'VALIDATION', status: 'ACTIVE', load: 'Request schemas' },
    ],
  },
  {
    name: 'DATABASE',
    processes: [
      { name: 'PostgreSQL', type: 'RELATIONAL DB', status: 'ACTIVE', load: 'Prisma systems' },
      { name: 'Prisma', type: 'ORM', status: 'ACTIVE', load: 'Migrations and models' },
      { name: 'MongoDB', type: 'DOCUMENT DB', status: 'SUPPORT', load: 'Realtime experiments' },
      { name: 'MinIO / S3', type: 'OBJECT STORAGE', status: 'SUPPORT', load: 'Files and media' },
    ],
  },
  {
    name: 'TOOLS',
    processes: [
      { name: 'Git / GitHub', type: 'VERSION CONTROL', status: 'ACTIVE', load: 'Delivery flow' },
      { name: 'Docker', type: 'CONTAINERS', status: 'ACTIVE', load: 'Local infra' },
      { name: 'Turborepo', type: 'MONOREPO', status: 'SUPPORT', load: 'Colegio System' },
      { name: 'REST APIs', type: 'CONTRACT', status: 'ACTIVE', load: 'Frontend/backend bridge' },
    ],
  },
]

export const appTitles: Record<AppId, string> = {
  about: 'About.exe',
  projects: 'Projects/',
  skills: 'System Monitor',
  terminal: 'Terminal',
  contact: 'Contact.exe',
  resume: 'Resume.pdf',
  trash: 'Trash',
}

export function findProject(projectId: string) {
  return projects.find((project) => project.id === projectId)
}
