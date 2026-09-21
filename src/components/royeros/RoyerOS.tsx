import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import {
  FormEvent,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  appTitles,
  findProject,
  profile,
  projects,
  shortcuts,
  skillGroups,
  type AppId,
  type ProjectCase,
  type ProjectCategory,
} from '@/data/royeros'
import { Icon } from './icons'
import { RoyerWindow, useWindowManager } from './useWindowManager'

type SystemState = 'booting' | 'desktop' | 'shutdown'
type WallpaperId = 'grid' | 'midnight' | 'gradient'

interface NotificationItem {
  id: string
  title: string
  message: string
}

const wallpapers: { id: WallpaperId; label: string }[] = [
  { id: 'grid', label: 'Dark Grid' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'gradient', label: 'Gradient' },
]

const categories: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Apps' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'experiment', label: 'Experiments' },
]

const projectIcons: Record<string, string> = {
  sportapp: 'Trophy',
  'torneo-system': 'Trophy',
  'colegio-system': 'School',
  'finanzas-ve': 'WalletCards',
  'gochito-system': 'ShoppingCart',
  omstore: 'Store',
  'emily-portfolio': 'BookOpen',
  'invsystem-pro': 'Boxes',
  'restaurant-system': 'UtensilsCrossed',
  spotibad: 'Music2',
  'canvas-game': 'Gamepad2',
  knotchange: 'MessageCircle',
  'portfolio-experiments': 'Monitor',
}

const installedProjectIds = new Set([
  'sportapp',
  'torneo-system',
  'colegio-system',
  'finanzas-ve',
  'gochito-system',
  'omstore',
  'emily-portfolio',
  'invsystem-pro',
  'restaurant-system',
  'spotibad',
  'knotchange',
  'canvas-game',
  'portfolio-experiments',
])

const installedProjects = projects.filter((project) => installedProjectIds.has(project.id))

function getProjectIconName(projectId: string) {
  return projectIcons[projectId] ?? 'FolderOpen'
}

function getProjectCover(project: ProjectCase) {
  return project.screenshots[0]?.src
}

function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return now
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

function getStoredWallpaper(): WallpaperId {
  if (typeof window === 'undefined') return 'grid'
  const stored = window.localStorage.getItem('royeros-wallpaper') as WallpaperId | null
  return wallpapers.some((item) => item.id === stored) ? stored! : 'grid'
}

function getStoredTaskbarState() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem('royeros-taskbar-collapsed') === 'true'
}

export default function RoyerOS() {
  const [systemState, setSystemState] = useState<SystemState>('booting')
  const [wallpaper, setWallpaper] = useState<WallpaperId>(getStoredWallpaper)
  const [startOpen, setStartOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [refreshPulse, setRefreshPulse] = useState(false)
  const [taskbarCollapsed, setTaskbarCollapsed] = useState(getStoredTaskbarState)
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 760px)')
  const manager = useWindowManager()

  const notify = useCallback((title: string, message: string) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setNotifications((current) => [...current, { id, title, message }])
    window.setTimeout(() => {
      setNotifications((current) => current.filter((item) => item.id !== id))
    }, 4200)
  }, [])

  const openExternal = useCallback((url: string) => {
    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      window.location.href = url
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  const openApp = useCallback(
    (appId: AppId) => {
      manager.openApp(appId)
      setStartOpen(false)
      setContextMenu(null)
    },
    [manager],
  )

  const openProject = useCallback(
    (projectId: string) => {
      const project = findProject(projectId)
      if (!project) return
      manager.openProject(project.id, project.name)
      setStartOpen(false)
      setContextMenu(null)
    },
    [manager],
  )

  const cycleWallpaper = useCallback(() => {
    setWallpaper((current) => {
      const index = wallpapers.findIndex((item) => item.id === current)
      const next = wallpapers[(index + 1) % wallpapers.length].id
      window.localStorage.setItem('royeros-wallpaper', next)
      notify('Wallpaper changed', wallpapers.find((item) => item.id === next)?.label ?? next)
      return next
    })
    setContextMenu(null)
  }, [notify])

  const refreshDesktop = useCallback(() => {
    setRefreshPulse(true)
    window.setTimeout(() => setRefreshPulse(false), 420)
    notify('Desktop refreshed', 'Icons re-indexed without reloading the page.')
    setContextMenu(null)
  }, [notify])

  const shutdown = useCallback(() => {
    setStartOpen(false)
    notify('RoyerOS', 'Shutting down RoyerOS...')
    window.setTimeout(() => setSystemState('shutdown'), 700)
  }, [notify])

  const restart = useCallback(() => {
    setSystemState('booting')
    window.localStorage.removeItem('royeros-has-booted')
  }, [])

  const toggleTaskbar = useCallback(() => {
    setTaskbarCollapsed((current) => {
      const next = !current
      window.localStorage.setItem('royeros-taskbar-collapsed', String(next))
      return next
    })
    setStartOpen(false)
  }, [])

  useEffect(() => {
    if (systemState !== 'booting') return
    const hasBooted = window.localStorage.getItem('royeros-has-booted') === 'true'
    const delay = hasBooted || prefersReducedMotion ? 180 : 1100

    const timer = window.setTimeout(() => {
      window.localStorage.setItem('royeros-has-booted', 'true')
      setSystemState('desktop')
      if (!isMobile) {
        notify('Welcome to RoyerOS', 'Explore my work, skills and experiments.')
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [isMobile, notify, prefersReducedMotion, systemState])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === '`') {
        event.preventDefault()
        openApp('terminal')
      }

      if (event.key === 'Escape') {
        setStartOpen(false)
        setContextMenu(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openApp])

  if (systemState === 'booting') {
    return <BootScreen reduced={Boolean(prefersReducedMotion)} />
  }

  if (systemState === 'shutdown') {
    return <ShutdownScreen onRestart={restart} />
  }

  return (
    <div
      className={`royer-os wallpaper-${wallpaper}`}
      onClick={() => {
        setContextMenu(null)
        setStartOpen(false)
      }}
      onContextMenu={(event) => {
        if (isMobile) return
        event.preventDefault()
        setStartOpen(false)
        setContextMenu({ x: event.clientX, y: event.clientY })
      }}
    >
      {isMobile ? (
        <MobileHome
          openApp={openApp}
          openProject={openProject}
          openExternal={openExternal}
        />
      ) : (
        <DesktopLayer
          refreshPulse={refreshPulse}
          openApp={openApp}
          openProject={openProject}
          openExternal={openExternal}
        />
      )}

      <AnimatePresence>
        {manager.visibleWindows.map((item) => (
          <WindowFrame
            key={item.id}
            item={item}
            isMobile={isMobile}
            taskbarCollapsed={taskbarCollapsed}
            focusWindow={manager.focusWindow}
            closeWindow={manager.closeWindow}
            minimizeWindow={manager.minimizeWindow}
            toggleMaximize={manager.toggleMaximize}
            moveWindow={manager.moveWindow}
          >
            <WindowContent
              item={item}
              openApp={openApp}
              openProject={openProject}
              openExternal={openExternal}
              notify={notify}
            />
          </WindowFrame>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {startOpen && (
          <StartMenu
            openApp={openApp}
            openExternal={openExternal}
            shutdown={shutdown}
            onClose={() => setStartOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            openApp={openApp}
            refreshDesktop={refreshDesktop}
            cycleWallpaper={cycleWallpaper}
          />
        )}
      </AnimatePresence>

      {!isMobile && (
        <Taskbar
          windows={manager.windows}
          startOpen={startOpen}
          setStartOpen={setStartOpen}
          openApp={openApp}
          openExternal={openExternal}
          restoreWindow={manager.restoreWindow}
          collapsed={taskbarCollapsed}
          onToggleCollapse={toggleTaskbar}
        />
      )}

      <NotificationStack notifications={notifications} />
    </div>
  )
}

function BootScreen({ reduced }: { reduced: boolean }) {
  const lines = ['Initializing portfolio...', 'Loading projects...', 'Loading skills...', 'Welcome.']

  return (
    <main className="flex min-h-svh items-center justify-center bg-black text-white">
      <motion.div
        className="w-full max-w-md px-8"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-8 flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/8 text-xl font-black">
            RM
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-normal">RoyerOS</h1>
            <p className="text-sm text-zinc-400">Build. Ship. Repeat.</p>
          </div>
        </div>
        <div className="space-y-2 font-mono text-sm text-zinc-300">
          {lines.map((line, index) => (
            <motion.p
              key={line}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : index * 0.28 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-cyan-300"
            initial={{ width: '8%' }}
            animate={{ width: '100%' }}
            transition={{ duration: reduced ? 0.1 : 1.8, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </main>
  )
}

function ShutdownScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <main className="grid min-h-svh place-items-center bg-black px-6 text-center text-white">
      <div>
        <p className="mb-5 font-mono text-sm text-zinc-500">Shutting down RoyerOS...</p>
        <h1 className="text-3xl font-black tracking-normal">It is now safe to close this tab.</h1>
        <button
          type="button"
          onClick={onRestart}
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/14"
        >
          <Icon name="Power" className="size-4" />
          Start RoyerOS
        </button>
      </div>
    </main>
  )
}

function MobileHome({
  openApp,
  openProject,
  openExternal,
}: {
  openApp: (appId: AppId) => void
  openProject: (projectId: string) => void
  openExternal: (url: string) => void
}) {
  const now = useClock()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const launchShortcut = (shortcut: (typeof shortcuts)[number]) => {
    if (shortcut.kind === 'external' && shortcut.externalUrl) {
      openExternal(shortcut.externalUrl)
      return
    }
    if (shortcut.appId) openApp(shortcut.appId)
  }

  return (
    <main className="mobile-home absolute inset-0 flex flex-col overflow-hidden text-white">
      <div className="mobile-status-bar flex shrink-0 items-center justify-between px-5 text-xs font-bold">
        <span>{time}</span>
        <div className="flex items-center gap-2" aria-label="Connection and battery status">
          <Icon name="Wifi" className="size-4" />
          <Icon name="BatteryMedium" className="size-5" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28 pt-3">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">RoyerOS Mobile</p>
            <h1 className="mt-1 text-2xl font-black tracking-normal">Hola, soy Royer.</h1>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              openApp('about')
            }}
            className="grid size-12 place-items-center rounded-2xl bg-cyan-300 text-base font-black text-zinc-950 shadow-[0_6px_8px_rgba(0,0,0,0.28)] active:scale-95"
            aria-label="Open profile"
          >
            RM
          </button>
        </header>

        <section className="mb-8 border-y border-white/12 py-5">
          <p className="max-w-[28rem] text-xl font-bold leading-7 text-white">
            Full Stack Developer enfocado en sistemas reales, APIs e interfaces claras.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-200">
            <span className="size-2 rounded-full bg-emerald-300" />
            Disponible para nuevos proyectos
          </div>
        </section>

        <section aria-label="Applications">
          <div className="grid grid-cols-4 gap-x-3 gap-y-6">
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut.id}
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  launchShortcut(shortcut)
                }}
                className="group flex min-w-0 flex-col items-center gap-2 text-center outline-none active:scale-95"
              >
                <span
                  className={`grid size-14 place-items-center rounded-2xl shadow-[0_6px_8px_rgba(0,0,0,0.28)] ${mobileAppTone(shortcut.id)}`}
                >
                  <Icon name={shortcut.iconName} className="size-6" />
                </span>
                <span className="w-full truncate text-[11px] font-semibold text-white">
                  {shortcut.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-9" aria-label="Project applications">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-black tracking-normal text-white">Project apps</h2>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-bold text-zinc-300">
              {installedProjects.length}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-x-3 gap-y-6">
            {installedProjects.map((project) => (
              <MobileProjectIcon
                key={project.id}
                project={project}
                onOpen={() => openProject(project.id)}
              />
            ))}
          </div>
        </section>
      </div>

      <nav className="mobile-dock absolute inset-x-4 bottom-3 flex h-[72px] items-center justify-around px-3" aria-label="Favorite apps">
        <MobileDockButton icon="UserRound" label="About" onClick={() => openApp('about')} />
        <MobileDockButton icon="FolderKanban" label="Projects" onClick={() => openApp('projects')} />
        <MobileDockButton icon="Mail" label="Contact" onClick={() => openApp('contact')} />
        <MobileDockButton icon="Github" label="GitHub" onClick={() => openExternal(profile.github)} />
      </nav>
    </main>
  )
}

function mobileAppTone(shortcutId: string) {
  const tones: Record<string, string> = {
    about: 'bg-cyan-300 text-zinc-950',
    projects: 'bg-emerald-300 text-zinc-950',
    skills: 'bg-violet-400 text-white',
    terminal: 'bg-zinc-900 text-cyan-200 ring-1 ring-white/15',
    contact: 'bg-blue-500 text-white',
    resume: 'bg-amber-300 text-zinc-950',
    github: 'bg-white text-zinc-950',
    trash: 'bg-zinc-700 text-zinc-100',
  }
  return tones[shortcutId] ?? 'bg-zinc-800 text-white'
}

function MobileDockButton({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      className="grid size-12 place-items-center rounded-2xl bg-white/10 text-white outline-none transition active:scale-95 active:bg-white/20"
      aria-label={label}
    >
      <Icon name={icon} className="size-5" />
    </button>
  )
}

function DesktopLayer({
  refreshPulse,
  openApp,
  openProject,
  openExternal,
}: {
  refreshPulse: boolean
  openApp: (appId: AppId) => void
  openProject: (projectId: string) => void
  openExternal: (url: string) => void
}) {
  return (
    <div className="absolute inset-0 overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
      <div className="pointer-events-none absolute right-5 top-5 hidden max-w-sm text-right sm:block">
        <p className="text-sm font-semibold text-white">RoyerOS</p>
        <p className="text-xs text-zinc-400">Personal developer workstation</p>
      </div>
      <motion.div
        className="absolute inset-0"
        animate={refreshPulse ? { scale: [1, 0.97, 1], opacity: [1, 0.72, 1] } : undefined}
        transition={{ duration: 0.36, ease: 'easeOut' }}
      >
        <div className="absolute left-4 top-5 grid w-fit grid-cols-3 gap-x-3 gap-y-4 sm:left-6 sm:top-6 sm:grid-cols-1 sm:gap-y-5">
          {shortcuts.map((shortcut) => (
            <DesktopIcon
              key={shortcut.id}
              label={shortcut.label}
              iconName={shortcut.iconName}
              onOpen={() => {
                if (shortcut.kind === 'external' && shortcut.externalUrl) {
                  openExternal(shortcut.externalUrl)
                  return
                }
                if (shortcut.appId) openApp(shortcut.appId)
              }}
            />
          ))}
        </div>

        <section className="absolute bottom-24 left-4 right-4 top-[19rem] sm:left-32 sm:right-6 sm:top-[5.5rem]">
          <div className="mb-4 flex items-center gap-3 text-white">
            <span className="grid size-9 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
              <Icon name="FolderKanban" className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-black tracking-normal">Project apps</p>
              <p className="text-xs text-zinc-400">{installedProjects.length} project cases available</p>
            </div>
          </div>
          <div className="grid max-h-full grid-cols-[repeat(auto-fill,minmax(92px,92px))] content-start gap-x-4 gap-y-5 overflow-hidden pb-2">
            {installedProjects.map((project) => (
              <DesktopProjectIcon
                key={project.id}
                project={project}
                onOpen={() => openProject(project.id)}
              />
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  )
}

function DesktopIcon({
  label,
  iconName,
  onOpen,
}: {
  label: string
  iconName: string
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onOpen()
      }}
      className="group flex w-[88px] flex-col items-center gap-2 rounded-xl p-2 text-center outline-none transition hover:bg-white/10 focus-visible:bg-white/12 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      title={`Open ${label}`}
    >
      <span className="grid size-12 place-items-center rounded-2xl border border-white/12 bg-zinc-950/70 text-cyan-200 shadow-[0_8px_18px_rgba(0,0,0,0.22)] transition group-hover:-translate-y-0.5 group-hover:border-cyan-200/45 group-hover:bg-cyan-300/10">
        <Icon name={iconName} className="size-6" />
      </span>
      <span className="max-w-full rounded-md px-1 text-[11px] font-semibold leading-tight text-white drop-shadow">
        {label}
      </span>
    </button>
  )
}

function DesktopProjectIcon({
  project,
  onOpen,
}: {
  project: ProjectCase
  onOpen: () => void
}) {
  const cover = getProjectCover(project)

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onOpen()
      }}
      className="group flex h-[100px] w-[92px] flex-col items-center gap-2 rounded-xl p-2 text-center outline-none transition hover:bg-white/10 focus-visible:bg-white/12 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      title={`Open ${project.name}`}
    >
      <span className="relative grid size-14 place-items-center overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/74 text-cyan-100 shadow-[0_8px_18px_rgba(0,0,0,0.22)] transition group-hover:-translate-y-0.5 group-hover:border-cyan-200/45">
        {cover && (
          <img
            src={cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-300 group-hover:scale-105 group-hover:opacity-90"
            loading="lazy"
          />
        )}
        <span className="relative grid size-8 place-items-center rounded-xl border border-white/14 bg-black/45 text-white backdrop-blur-sm">
          <ProjectIcon projectId={project.id} />
        </span>
        <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.55)]" />
      </span>
      <span className="line-clamp-2 max-w-full rounded-md px-1 text-[11px] font-semibold leading-tight text-white drop-shadow">
        {project.name}
      </span>
    </button>
  )
}

function MobileProjectIcon({
  project,
  onOpen,
}: {
  project: ProjectCase
  onOpen: () => void
}) {
  const cover = getProjectCover(project)

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onOpen()
      }}
      className="group flex min-w-0 flex-col items-center gap-2 text-center outline-none active:scale-95"
    >
      <span className="relative grid size-14 place-items-center overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/78 text-cyan-100 shadow-[0_6px_8px_rgba(0,0,0,0.28)]">
        {cover && (
          <img
            src={cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-75"
            loading="lazy"
          />
        )}
        <span className="relative grid size-8 place-items-center rounded-xl border border-white/12 bg-black/45 text-white backdrop-blur-sm">
          <ProjectIcon projectId={project.id} />
        </span>
      </span>
      <span className="line-clamp-2 w-full text-[11px] font-semibold leading-tight text-white">
        {project.name}
      </span>
    </button>
  )
}

function WindowFrame({
  item,
  isMobile,
  taskbarCollapsed,
  children,
  focusWindow,
  closeWindow,
  minimizeWindow,
  toggleMaximize,
  moveWindow,
}: {
  item: RoyerWindow
  isMobile: boolean
  taskbarCollapsed: boolean
  children: React.ReactNode
  focusWindow: (windowId: string) => void
  closeWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  toggleMaximize: (windowId: string) => void
  moveWindow: (windowId: string, x: number, y: number) => void
}) {
  const dragOffset = useRef({ x: 0, y: 0 })
  const canDrag = !item.maximized && !isMobile

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    focusWindow(item.id)
    if (!canDrag || event.button !== 0) return

    dragOffset.current = {
      x: event.clientX - item.position.x,
      y: event.clientY - item.position.y,
    }

    const handleMove = (moveEvent: PointerEvent) => {
      moveWindow(
        item.id,
        moveEvent.clientX - dragOffset.current.x,
        moveEvent.clientY - dragOffset.current.y,
      )
    }

    const handleUp = () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

  const fixedStyle = isMobile
    ? { inset: 0, width: 'auto', height: 'auto' }
    : item.maximized
      ? {
          inset: taskbarCollapsed ? '14px' : '14px 14px 86px',
          width: 'auto',
          height: 'auto',
        }
      : {
          left: item.position.x,
          top: item.position.y,
          width: item.size.width,
          height: item.size.height,
        }

  return (
    <motion.section
      className={
        isMobile
          ? 'mobile-window fixed flex min-h-0 flex-col overflow-hidden bg-zinc-950 text-white'
          : 'fixed flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/88 text-white shadow-[0_20px_44px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
      }
      style={{ ...fixedStyle, zIndex: item.zIndex }}
      initial={isMobile ? { opacity: 0, x: 18 } : { opacity: 0, scale: 0.98, y: 10 }}
      animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, scale: 1, y: 0 }}
      exit={isMobile ? { opacity: 0, x: 18 } : { opacity: 0, scale: 0.98, y: 10 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      onMouseDown={() => focusWindow(item.id)}
      role="dialog"
      aria-label={item.title}
    >
      {isMobile ? (
        <div className="mobile-app-header relative flex shrink-0 items-end justify-between border-b border-white/10 px-2 pb-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              closeWindow(item.id)
            }}
            className="flex min-h-11 min-w-11 items-center gap-1 rounded-xl px-2 text-sm font-semibold text-cyan-200 transition active:bg-white/10"
            aria-label={`Close ${item.title}`}
          >
            <Icon name="ChevronLeft" className="size-5" />
            Atrás
          </button>
          <p className="pointer-events-none absolute inset-x-20 bottom-5 truncate text-center text-sm font-bold text-white">
            {item.title}
          </p>
          <span className="size-11" aria-hidden="true" />
        </div>
      ) : (
        <div
          className={`flex h-11 shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.045] px-3 ${
            canDrag ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
          onPointerDown={handlePointerDown}
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  closeWindow(item.id)
                }}
                className="grid size-3.5 place-items-center rounded-full bg-red-400/90 text-transparent outline-none transition hover:text-red-950 focus-visible:ring-2 focus-visible:ring-red-200"
                aria-label="Close window"
              >
                <Icon name="X" className="size-2.5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  minimizeWindow(item.id)
                }}
                className="grid size-3.5 place-items-center rounded-full bg-amber-300/90 text-transparent outline-none transition hover:text-amber-950 focus-visible:ring-2 focus-visible:ring-amber-100"
                aria-label="Minimize window"
              >
                <Icon name="Minus" className="size-2.5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  toggleMaximize(item.id)
                }}
                className="grid size-3.5 place-items-center rounded-full bg-emerald-400/90 text-transparent outline-none transition hover:text-emerald-950 focus-visible:ring-2 focus-visible:ring-emerald-100"
                aria-label="Maximize window"
              >
                <Icon name={item.maximized ? 'Minimize2' : 'Maximize2'} className="size-2.5" />
              </button>
            </div>
            <p className="truncate pl-2 text-xs font-semibold text-zinc-300">{item.title}</p>
          </div>
          <p className="font-mono text-[10px] text-zinc-500">RoyerOS</p>
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </motion.section>
  )
}

function WindowContent({
  item,
  openApp,
  openProject,
  openExternal,
  notify,
}: {
  item: RoyerWindow
  openApp: (appId: AppId) => void
  openProject: (projectId: string) => void
  openExternal: (url: string) => void
  notify: (title: string, message: string) => void
}) {
  if (item.kind === 'project' && item.projectId) {
    const project = findProject(item.projectId)
    return project ? (
      <ProjectCaseApp project={project} openExternal={openExternal} />
    ) : (
      <EmptyState title="Project not found" />
    )
  }

  switch (item.appId) {
    case 'about':
      return <AboutApp openApp={openApp} openExternal={openExternal} />
    case 'projects':
      return <ProjectsApp openProject={openProject} />
    case 'skills':
      return <SkillsApp />
    case 'terminal':
      return (
        <TerminalApp
          openApp={openApp}
          openProject={openProject}
          openExternal={openExternal}
          notify={notify}
        />
      )
    case 'contact':
      return <ContactApp openExternal={openExternal} notify={notify} />
    case 'resume':
      return <ResumeApp notify={notify} />
    case 'trash':
      return <TrashApp />
    default:
      return <EmptyState title="App not available" />
  }
}

function AboutApp({
  openApp,
  openExternal,
}: {
  openApp: (appId: AppId) => void
  openExternal: (url: string) => void
}) {
  return (
    <div className="grid min-h-full gap-6 p-5 md:grid-cols-[240px_1fr] md:p-6">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/7">
          <img
            src="/about-merchan.jpg"
            alt="Royer Merchan"
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/8 p-4">
          <p className="text-xs font-bold text-emerald-200">CURRENT STATUS</p>
          <p className="mt-2 text-sm text-zinc-100">Available for opportunities.</p>
        </div>
      </div>

      <div className="min-w-0 space-y-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-cyan-200">About.exe</p>
          <h2 className="text-3xl font-black tracking-normal md:text-5xl">{profile.name}</h2>
          <p className="mt-2 text-lg font-semibold text-zinc-300">{profile.role}</p>
        </div>
        <p className="max-w-2xl text-pretty text-base leading-7 text-zinc-300">
          Full stack developer focused on real systems: dashboards, admin panels,
          APIs, databases, Docker environments and interfaces that people can use
          without fighting the software.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {['Frontend Development', 'Backend Development', 'Database Design', 'UI Development'].map(
            (item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
                <Icon name="ShieldCheck" className="mb-3 size-5 text-cyan-200" />
                <p className="font-semibold">{item}</p>
              </div>
            ),
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <ActionButton icon="Mail" onClick={() => openApp('contact')}>
            Contact Me
          </ActionButton>
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/14"
          >
            <Icon name="Download" className="size-4" />
            Download Resume
          </a>
          <ActionButton icon="Github" variant="ghost" onClick={() => openExternal(profile.github)}>
            GitHub
          </ActionButton>
          <ActionButton icon="Linkedin" variant="ghost" onClick={() => openExternal(profile.linkedin)}>
            LinkedIn
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

function ProjectsApp({ openProject }: { openProject: (projectId: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects
    return projects.filter((project) => project.category.includes(activeCategory))
  }, [activeCategory])

  return (
    <div className="grid min-h-full md:grid-cols-[210px_1fr]">
      <aside className="border-b border-white/10 bg-white/[0.035] p-4 md:border-b-0 md:border-r">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold">
          <Icon name="FolderKanban" className="size-4 text-cyan-200" />
          Projects/
        </div>
        <div className="flex gap-2 overflow-x-auto md:block md:space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap rounded-xl px-3 py-2 text-left text-sm transition md:w-full ${
                activeCategory === category.id
                  ? 'bg-cyan-300/14 text-cyan-100'
                  : 'text-zinc-400 hover:bg-white/8 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </aside>
      <main className="p-4 md:p-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-normal">Project File Explorer</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Select a project to open its case study.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 font-mono text-xs text-zinc-400">
            {filteredProjects.length} objects
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => openProject(project.id)}
              className="group min-h-[168px] rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left outline-none transition hover:border-cyan-200/35 hover:bg-white/8 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
                  <ProjectIcon projectId={project.id} />
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-zinc-300">
                  {project.status}
                </span>
              </div>
              <p className="font-bold text-white">{project.folderName}</p>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
                {project.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cyan-200 opacity-0 transition group-hover:opacity-100">
                Open case study <Icon name="ChevronRight" className="size-3.5" />
              </p>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

function ProjectIcon({ projectId }: { projectId: string }) {
  return <Icon name={getProjectIconName(projectId)} className="size-5" />
}

function ProjectCaseApp({
  project,
  openExternal,
}: {
  project: ProjectCase
  openExternal: (url: string) => void
}) {
  return (
    <article className="min-h-full p-5 md:p-6">
      <div className="mb-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
              {project.type}
            </span>
            <span className="rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-100">
              {project.status}
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-normal md:text-5xl">{project.name}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs font-semibold text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <ProjectPreview project={project} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CasePanel title="Problem" icon="Search">
          {project.problem}
        </CasePanel>
        <CasePanel title="Solution" icon="ShieldCheck">
          {project.solution}
        </CasePanel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <h3 className="mb-4 text-lg font-black tracking-normal">Core features</h3>
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-6 text-zinc-300">
                <Icon name="ChevronRight" className="mt-1 size-4 shrink-0 text-cyan-200" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <h3 className="mb-4 text-lg font-black tracking-normal">Architecture notes</h3>
          <ul className="space-y-3">
            {project.architecture.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
                <Icon name="Server" className="mt-1 size-4 shrink-0 text-emerald-200" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {project.screenshots.length > 0 && (
        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-black tracking-normal">Screenshots and assets</h3>
            <p className="text-xs text-zinc-500">Real project files used when available</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {project.screenshots.map((screenshot) => (
              <figure
                key={`${project.id}-${screenshot.src}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60"
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.title}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="space-y-1 p-3">
                  <p className="text-sm font-bold">{screenshot.title}</p>
                  <p className="text-xs leading-5 text-zinc-400">{screenshot.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {project.github && (
          <ActionButton icon="Github" onClick={() => openExternal(project.github!)}>
            GitHub
          </ActionButton>
        )}
        {project.demo && (
          <ActionButton icon="ExternalLink" variant="ghost" onClick={() => openExternal(project.demo!)}>
            Live Demo
          </ActionButton>
        )}
      </div>
    </article>
  )
}

function ProjectPreview({ project }: { project: ProjectCase }) {
  const projectStats: Record<string, string[]> = {
    'colegio-system': ['65 models', '25 permission modules', 'PDF / Excel'],
    'torneo-system': ['Live score', 'Prisma schema', 'Socket.IO'],
    'finanzas-ve': ['28 tables', '147 tests', 'Offline sync'],
    'gochito-system': ['Dual currency', 'POS realtime', 'PDF / Excel'],
    omstore: ['POS + cash', 'Stock ledger', 'Layaways'],
    'emily-portfolio': ['Page folding', 'Touch gestures', 'Next.js 15'],
    'invsystem-pro': ['3 forecast models', 'FastAPI', 'Redis cache'],
    'restaurant-system': ['REST API', 'Kitchen realtime', 'MySQL'],
    spotibad: ['Spotify API', 'JWT auth', 'Playlists'],
  }
  const stats = projectStats[project.id] ?? ['Responsive UI', 'Typed flow', 'Clean modules']
  const preview = project.screenshots[0]

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/72">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-red-400" />
          <span className="size-3 rounded-full bg-amber-300" />
          <span className="size-3 rounded-full bg-emerald-400" />
        </div>
        <p className="font-mono text-[11px] text-zinc-500">{project.folderName}</p>
      </div>

      {preview ? (
        <figure className="relative aspect-video overflow-hidden border-b border-white/10 bg-black">
          <img
            src={preview.src}
            alt={preview.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/82 to-transparent px-4 pb-3 pt-10">
            <p className="text-sm font-black tracking-normal text-white">{preview.title}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-300">{preview.caption}</p>
          </figcaption>
        </figure>
      ) : (
        <div className="grid aspect-video place-items-center border-b border-white/10 bg-cyan-300/6">
          <div className="grid size-20 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100">
            <Icon name={getProjectIconName(project.id)} className="size-9" />
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat} className="border-t border-white/10 pt-3">
              <p className="text-[11px] font-bold text-cyan-200">MODULE</p>
              <p className="mt-2 text-sm font-semibold">{stat}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2">
          {project.features.slice(0, 4).map((feature, index) => (
            <div key={feature} className="flex items-center gap-3">
              <span className="grid size-6 place-items-center rounded-lg bg-cyan-300/10 font-mono text-[11px] text-cyan-100">
                {index + 1}
              </span>
              <div className="h-2 flex-1 rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-cyan-300/70"
                  style={{ width: `${78 - index * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CasePanel({
  title,
  icon,
  children,
}: {
  title: string
  icon: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon name={icon} className="size-4 text-cyan-200" />
        <h3 className="font-black tracking-normal">{title}</h3>
      </div>
      <p className="text-sm leading-6 text-zinc-300">{children}</p>
    </section>
  )
}

function SkillsApp() {
  return (
    <div className="min-h-full p-5 md:p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold text-cyan-200">System Monitor</p>
          <h2 className="text-3xl font-black tracking-normal">Skill processes</h2>
        </div>
        <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/8 px-3 py-2 text-xs font-bold text-emerald-100">
          STATUS: AVAILABLE
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {skillGroups.map((group) => (
          <section key={group.name} className="rounded-2xl border border-white/10 bg-white/[0.045]">
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Icon name="Cpu" className="size-4 text-cyan-200" />
                <h3 className="font-black tracking-normal">{group.name}</h3>
              </div>
              <span className="font-mono text-[11px] text-zinc-500">{group.processes.length} modules</span>
            </header>
            <div className="divide-y divide-white/8">
              {group.processes.map((process) => (
                <div
                  key={process.name}
                  className="grid gap-2 px-4 py-3 text-sm sm:grid-cols-[1fr_120px_1fr]"
                >
                  <div>
                    <p className="font-bold text-white">{process.name}</p>
                    <p className="font-mono text-[11px] text-zinc-500">{process.type}</p>
                  </div>
                  <StatusPill status={process.status} />
                  <p className="text-zinc-400 sm:text-right">{process.load}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === 'ACTIVE'
      ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100'
      : status === 'STABLE'
        ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100'
        : 'border-white/10 bg-white/[0.055] text-zinc-300'

  return (
    <span className={`w-fit rounded-full border px-2.5 py-1 text-[11px] font-black ${tone}`}>
      {status}
    </span>
  )
}

interface TerminalEntry {
  id: string
  kind: 'command' | 'output'
  content: string[]
}

function TerminalApp({
  openApp,
  openProject,
  openExternal,
  notify,
}: {
  openApp: (appId: AppId) => void
  openProject: (projectId: string) => void
  openExternal: (url: string) => void
  notify: (title: string, message: string) => void
}) {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: 'hello',
      kind: 'output',
      content: ['RoyerOS terminal ready. Type "help" to list commands.'],
    },
  ])
  const [command, setCommand] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const writeOutput = useCallback((content: string[]) => {
    setEntries((current) => [
      ...current,
      { id: `${Date.now()}-${Math.random()}`, kind: 'output', content },
    ])
  }, [])

  const executeCommand = useCallback(
    (rawCommand: string) => {
      const normalized = rawCommand.trim().toLowerCase()
      if (!normalized) return

      setEntries((current) => [
        ...current,
        { id: `${Date.now()}-cmd`, kind: 'command', content: [rawCommand] },
      ])

      if (normalized === 'clear') {
        setEntries([])
        return
      }

      if (normalized === 'help') {
        writeOutput([
          'help, whoami, about, projects, skills, contact',
          'github, linkedin, resume, date, neofetch, ls, clear',
          'open torneo | colegio | finanzas | gochito | omstore',
          'open inventario | restaurante | spotibad | emily',
          'open sportapp | knotchange | canvas',
          'easter egg: sudo hire royer',
        ])
        return
      }

      if (normalized === 'whoami' || normalized === 'about') {
        writeOutput([
          'Royer Merchan',
          'Full Stack Developer',
          'Building modern web experiences and production-ready systems.',
        ])
        if (normalized === 'about') openApp('about')
        return
      }

      if (normalized === 'projects' || normalized === 'ls') {
        writeOutput(projects.map((project, index) => `${String(index + 1).padStart(2, '0')}  ${project.name}`))
        return
      }

      if (normalized === 'skills') {
        writeOutput(skillGroups.map((group) => `${group.name}: ${group.processes.map((item) => item.name).join(', ')}`))
        openApp('skills')
        return
      }

      if (normalized === 'contact') {
        writeOutput(['Opening Contact.exe...'])
        openApp('contact')
        return
      }

      if (normalized === 'github') {
        writeOutput(['Opening GitHub in a new tab...'])
        openExternal(profile.github)
        return
      }

      if (normalized === 'linkedin') {
        writeOutput(['Opening LinkedIn in a new tab...'])
        openExternal(profile.linkedin)
        return
      }

      if (normalized === 'resume') {
        writeOutput(['Opening Resume.pdf...'])
        openApp('resume')
        return
      }

      if (normalized === 'date') {
        writeOutput([new Date().toString()])
        return
      }

      if (normalized === 'neofetch') {
        writeOutput([
          'RRRRR    ROYER OS',
          'R   R    User: Royer Merchan',
          'RRRR     Role: Full Stack Developer',
          'R  R     Stack: React / Vue / Node',
          'R   R    Status: Available',
        ])
        return
      }

      if (normalized === 'sudo hire royer') {
        writeOutput(['Permission granted.', 'Excellent decision.', 'Opening Contact.exe...'])
        notify('Permission granted', 'Excellent decision. Opening Contact.exe...')
        openApp('contact')
        return
      }

      if (normalized.startsWith('open ')) {
        const target = normalized.replace('open ', '').trim()
        const aliases: Record<string, string> = {
          sportapp: 'sportapp',
          sport: 'sportapp',
          torneo: 'torneo-system',
          'torneo-system': 'torneo-system',
          colegio: 'colegio-system',
          golegio: 'colegio-system',
          school: 'colegio-system',
          finanzas: 'finanzas-ve',
          finance: 'finanzas-ve',
          appcrash: 'finanzas-ve',
          gochito: 'gochito-system',
          gochitosystem: 'gochito-system',
          omstore: 'omstore',
          emily: 'emily-portfolio',
          'emily-portfolio': 'emily-portfolio',
          inventario: 'invsystem-pro',
          invsystem: 'invsystem-pro',
          'invsystem-pro': 'invsystem-pro',
          restaurante: 'restaurant-system',
          restaurant: 'restaurant-system',
          spotibad: 'spotibad',
          spotify: 'spotibad',
          knotchange: 'knotchange',
          canvas: 'canvas-game',
          portfolio: 'portfolio-experiments',
        }
        const projectId = aliases[target]
        if (projectId) {
          const project = findProject(projectId)
          writeOutput([`Opening ${project?.name ?? projectId}...`])
          openProject(projectId)
          return
        }
      }

      writeOutput([
        `Command not found: ${rawCommand}`,
        'Try "help" or the classic "sudo hire royer".',
      ])
    },
    [notify, openApp, openExternal, openProject, writeOutput],
  )

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [entries])

  return (
    <div
      className="flex h-full flex-col bg-black/45 p-4 font-mono text-sm text-zinc-200"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto pr-2">
        {entries.map((entry) => (
          <div key={entry.id} className="mb-3">
            {entry.kind === 'command' ? (
              <p>
                <span className="text-cyan-200">royer@RoyerOS</span>
                <span className="text-zinc-500">:~$ </span>
                <span>{entry.content[0]}</span>
              </p>
            ) : (
              entry.content.map((line) => (
                <p key={`${entry.id}-${line}`} className="whitespace-pre-wrap text-zinc-300">
                  {line}
                </p>
              ))
            )}
          </div>
        ))}
      </div>
      <form
        className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3"
        onSubmit={(event) => {
          event.preventDefault()
          executeCommand(command)
          setCommand('')
        }}
      >
        <span className="shrink-0 text-cyan-200">royer@RoyerOS:~$</span>
        <input
          ref={inputRef}
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-zinc-100 outline-none placeholder:text-zinc-600"
          placeholder="type a command"
          autoFocus
        />
      </form>
    </div>
  )
}

function ContactApp({
  openExternal,
  notify,
}: {
  openExternal: (url: string) => void
  notify: (title: string, message: string) => void
}) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const senderEmail = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
    )

    openExternal(`mailto:${profile.email}?subject=${subject}&body=${body}`)
    notify('Email draft opened', 'Review the message in your email app and press Send.')
  }

  return (
    <div className="grid min-h-full gap-6 p-5 md:grid-cols-[1fr_280px] md:p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-cyan-200">Contact.exe</p>
          <h2 className="text-3xl font-black tracking-normal">Let us build something together.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            Tell me what you are building, what is broken, or what needs to ship.
          </p>
        </div>
        <Field label="Name" name="name" />
        <Field label="Email" name="email" type="email" />
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-300">Message</span>
          <textarea
            name="message"
            required
            rows={6}
            className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.055] px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-200/55 focus:ring-2 focus:ring-cyan-300/20"
            placeholder="Project context, timeline, goals..."
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-black text-zinc-950 transition hover:bg-cyan-200"
        >
          <Icon name="Send" className="size-4" />
          SEND MESSAGE
        </button>
      </form>
      <aside className="space-y-3">
        <ContactLink icon="Github" label="GitHub" value="RoyerMerchan" onClick={() => openExternal(profile.github)} />
        <ContactLink icon="Linkedin" label="LinkedIn" value="Royer Merchan" onClick={() => openExternal(profile.linkedin)} />
        <ContactLink icon="Mail" label="Email" value={profile.email} onClick={() => openExternal(`mailto:${profile.email}`)} />
        <ContactLink icon="MessageCircle" label="WhatsApp" value={profile.phone} onClick={() => openExternal(profile.whatsapp)} />
      </aside>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
}: {
  label: string
  name: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-zinc-300">{label}</span>
      <input
        name={name}
        type={type}
        required
        className="w-full rounded-xl border border-white/12 bg-white/[0.055] px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-200/55 focus:ring-2 focus:ring-cyan-300/20"
        placeholder={label}
      />
    </label>
  )
}

function ContactLink({
  icon,
  label,
  value,
  onClick,
}: {
  icon: string
  label: string
  value: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left transition hover:bg-white/8"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-cyan-300/10 text-cyan-100">
        <Icon name={icon} className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold">{label}</span>
        <span className="block truncate text-xs text-zinc-400">{value}</span>
      </span>
    </button>
  )
}

function ResumeApp({ notify }: { notify: (title: string, message: string) => void }) {
  return (
    <div className="flex min-h-full flex-col p-5 md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-normal">Resume.pdf</h2>
          <p className="mt-1 text-sm text-zinc-400">Royer Merchan - Full Stack Developer</p>
        </div>
        <a
          href={profile.resume}
          download
          onClick={() => notify('Resume downloaded', 'The PDF download has started.')}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-black text-zinc-950 transition hover:bg-cyan-200"
        >
          <Icon name="Download" className="size-4" />
          Download
        </a>
      </div>
      <iframe
        title="Royer Merchan resume"
        src={profile.resume}
        className="min-h-[420px] flex-1 rounded-2xl border border-white/10 bg-white"
      />
    </div>
  )
}

function TrashApp() {
  return (
    <EmptyState
      title="Trash is empty"
      message="No deleted ideas here. Only shipped work, drafts and a suspicious amount of caffeine."
    />
  )
}

function EmptyState({
  title,
  message = 'Nothing to display.',
}: {
  title: string
  message?: string
}) {
  return (
    <div className="grid min-h-full place-items-center p-8 text-center">
      <div>
        <Icon name="Trash2" className="mx-auto mb-4 size-10 text-zinc-600" />
        <h2 className="text-2xl font-black tracking-normal">{title}</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">{message}</p>
      </div>
    </div>
  )
}

function StartMenu({
  openApp,
  openExternal,
  shutdown,
  onClose,
}: {
  openApp: (appId: AppId) => void
  openExternal: (url: string) => void
  shutdown: () => void
  onClose: () => void
}) {
  return (
    <motion.div
      className="fixed bottom-20 left-4 z-[130] w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-white/12 bg-zinc-950/90 p-4 text-white shadow-[0_22px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:left-6"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.98 }}
      transition={{ duration: 0.16 }}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-cyan-300 text-lg font-black text-zinc-950">
          RM
        </div>
        <div>
          <p className="font-black tracking-normal">{profile.name}</p>
          <p className="text-sm text-zinc-400">{profile.role}</p>
        </div>
      </div>
      <p className="mb-2 text-xs font-black text-zinc-500">APPLICATIONS</p>
      <div className="grid grid-cols-2 gap-2">
        {(['about', 'projects', 'skills', 'terminal', 'contact', 'resume'] as AppId[]).map(
          (appId) => (
            <button
              key={appId}
              type="button"
              onClick={() => openApp(appId)}
              className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-left text-sm font-semibold transition hover:bg-white/9"
            >
              {appTitles[appId]}
            </button>
          ),
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={() => openExternal(profile.github)}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/8 hover:text-white"
        >
          <Icon name="Github" className="size-4" />
          GitHub
        </button>
        <button
          type="button"
          onClick={() => openExternal(profile.linkedin)}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/8 hover:text-white"
        >
          <Icon name="Linkedin" className="size-4" />
          LinkedIn
        </button>
        <button
          type="button"
          onClick={shutdown}
          className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm font-black text-red-100 transition hover:bg-red-400/16"
        >
          <Icon name="Power" className="size-4" />
          Shut Down
        </button>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-3 w-full rounded-xl px-3 py-2 text-sm font-semibold text-zinc-500 transition hover:bg-white/8 hover:text-zinc-200"
      >
        Close menu
      </button>
    </motion.div>
  )
}

function ContextMenu({
  x,
  y,
  openApp,
  refreshDesktop,
  cycleWallpaper,
}: {
  x: number
  y: number
  openApp: (appId: AppId) => void
  refreshDesktop: () => void
  cycleWallpaper: () => void
}) {
  return (
    <motion.div
      className="fixed z-[140] w-56 rounded-2xl border border-white/12 bg-zinc-950/92 p-2 text-sm text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      style={{ left: Math.min(x, window.innerWidth - 240), top: Math.min(y, window.innerHeight - 260) }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      onClick={(event) => event.stopPropagation()}
    >
      <MenuAction icon="Image" label="View" onClick={() => undefined} />
      <MenuAction icon="RefreshCw" label="Refresh" onClick={refreshDesktop} />
      <MenuAction icon="SquareTerminal" label="Terminal" onClick={() => openApp('terminal')} />
      <MenuAction icon="UserRound" label="About RoyerOS" onClick={() => openApp('about')} />
      <MenuAction icon="Monitor" label="Change Wallpaper" onClick={cycleWallpaper} />
    </motion.div>
  )
}

function MenuAction({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-zinc-300 transition hover:bg-white/9 hover:text-white"
    >
      <Icon name={icon} className="size-4" />
      {label}
    </button>
  )
}

function Taskbar({
  windows,
  startOpen,
  setStartOpen,
  openApp,
  openExternal,
  restoreWindow,
  collapsed,
  onToggleCollapse,
}: {
  windows: RoyerWindow[]
  startOpen: boolean
  setStartOpen: (value: boolean | ((value: boolean) => boolean)) => void
  openApp: (appId: AppId) => void
  openExternal: (url: string) => void
  restoreWindow: (windowId: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}) {
  const now = useClock()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString([], { month: 'short', day: 'numeric' })

  if (collapsed) {
    return (
      <footer className="pointer-events-none fixed bottom-3 right-3 z-[120]">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onToggleCollapse()
          }}
          className="pointer-events-auto grid size-11 place-items-center rounded-xl border border-white/12 bg-zinc-950/88 text-zinc-200 shadow-[0_6px_8px_rgba(0,0,0,0.36)] transition hover:bg-zinc-900 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          title="Expand taskbar"
          aria-label="Expand taskbar"
        >
          <Icon name="ChevronUp" className="size-5" />
        </button>
      </footer>
    )
  }

  return (
    <footer className="fixed inset-x-0 bottom-0 z-[120] flex justify-center px-3 pb-3 pointer-events-none">
      <div
        className="pointer-events-auto flex h-16 w-full max-w-5xl items-center gap-2 overflow-hidden rounded-2xl border border-white/12 bg-zinc-950/76 px-3 shadow-[0_14px_40px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setStartOpen((value) => !value)
          }}
          className={`grid size-11 shrink-0 place-items-center rounded-xl font-black transition ${
            startOpen ? 'bg-cyan-300 text-zinc-950' : 'bg-white/8 text-white hover:bg-white/14'
          }`}
          title="Open RoyerOS launcher"
        >
          RM
        </button>
        <TaskbarButton icon="SquareTerminal" label="Terminal" onClick={() => openApp('terminal')} />
        <TaskbarButton icon="FolderKanban" label="Projects" onClick={() => openApp('projects')} />
        <TaskbarButton icon="Mail" label="Contact" onClick={() => openApp('contact')} />
        <TaskbarButton icon="Github" label="GitHub" onClick={() => openExternal(profile.github)} />

        <div className="mx-1 h-8 w-px shrink-0 bg-white/10" />

        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          {windows.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => restoreWindow(item.id)}
              className={`relative max-w-[180px] shrink-0 truncate rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                item.minimized
                  ? 'border-white/8 bg-white/[0.035] text-zinc-500'
                  : 'border-cyan-200/20 bg-cyan-300/10 text-cyan-100'
              }`}
              title={item.title}
            >
              {item.title}
              {!item.minimized && (
                <span className="absolute inset-x-4 -bottom-px h-px rounded-full bg-cyan-200" />
              )}
            </button>
          ))}
        </div>

        <div className="shrink-0 text-right leading-tight">
          <p className="text-sm font-bold text-white">{time}</p>
          <p className="text-[11px] text-zinc-500">{date}</p>
        </div>
        <TaskbarButton
          icon="ChevronDown"
          label="Collapse taskbar"
          onClick={onToggleCollapse}
        />
      </div>
    </footer>
  )
}

function TaskbarButton({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/7 text-zinc-300 transition hover:bg-white/13 hover:text-white"
      title={label}
    >
      <Icon name={icon} className="size-5" />
    </button>
  )
}

function NotificationStack({ notifications }: { notifications: NotificationItem[] }) {
  return (
    <div className="fixed right-3 top-3 z-[150] flex w-[min(360px,calc(100vw-1.5rem))] flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            className="rounded-2xl border border-white/12 bg-zinc-950/86 p-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-100">
                <Icon name="Bell" className="size-4" />
              </span>
              <div>
                <p className="text-sm font-black tracking-normal">{notification.title}</p>
                <p className="mt-1 text-sm leading-5 text-zinc-400">{notification.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function ActionButton({
  icon,
  children,
  onClick,
  variant = 'primary',
}: {
  icon: string
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'ghost'
}) {
  const className =
    variant === 'primary'
      ? 'bg-cyan-300 text-zinc-950 hover:bg-cyan-200'
      : 'border border-white/12 bg-white/8 text-white hover:bg-white/14'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition ${className}`}
    >
      <Icon name={icon} className="size-4" />
      {children}
    </button>
  )
}
