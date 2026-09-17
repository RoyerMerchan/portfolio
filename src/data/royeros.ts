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
  email: 'royermerchan@email.com',
  github: 'https://github.com/RoyerMerchan',
  linkedin: 'https://www.linkedin.com/in/royer-merchan-399741385',
  whatsapp: 'https://wa.me/573001234567',
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
