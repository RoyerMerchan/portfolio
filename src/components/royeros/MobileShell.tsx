import { useEffect, useRef, useState, type ReactNode } from 'react'
import { profile, shortcuts, type AppId, type ProjectCase } from '@/data/royeros'
import type { RoyerWindow } from './useWindowManager'
import { Icon } from './icons'

const appLabels: Record<string, string> = {
  about: 'Sobre mí', projects: 'Proyectos', skills: 'Skills', terminal: 'Terminal',
  contact: 'Contacto', resume: 'Mi CV', github: 'GitHub', trash: 'Papelera',
}

export function mobileWindowTitle(item: RoyerWindow) {
  return item.kind === 'project' ? item.title.replace(/\.case$/, '') : appLabels[item.appId] ?? item.title
}

function usePhoneClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return now
}

export function MobileStatusBar() {
  const now = usePhoneClock()
  return (
    <div className="phone-status" aria-label="RoyerOS Mobile">
      <time dateTime={now.toISOString()}>{now.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', hour12: false })}</time>
      <span className="phone-status-brand">RoyerOS <span>mobile</span></span>
      <span className="phone-status-icons" aria-hidden="true">
        <span className="phone-signal"><i /><i /><i /><i /></span>
        <Icon name="Wifi" size={15} />
        <Icon name="BatteryMedium" size={20} />
      </span>
    </div>
  )
}

function PhoneDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])
  return (
    <dialog ref={ref} className="phone-dialog" aria-label={title} onCancel={onClose} onKeyDown={(event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onClose()
      }
    }} onClick={(event) => {
      event.stopPropagation()
      if (event.target === event.currentTarget) onClose()
    }}>
      <div className="phone-sheet">
        <div className="phone-sheet-handle" aria-hidden="true" />
        <header className="phone-sheet-header">
          <h2>{title}</h2>
          <button type="button" className="phone-icon-button" aria-label="Cerrar panel" onClick={onClose}><Icon name="X" size={20} /></button>
        </header>
        {children}
      </div>
    </dialog>
  )
}

export function MobileHome({ projects, openApp, openProject, openExternal, onWallpaper, hidden }: {
  projects: ProjectCase[]
  openApp: (id: AppId) => void
  openProject: (id: string) => void
  openExternal: (url: string) => void
  onWallpaper: () => void
  hidden: boolean
}) {
  const now = usePhoneClock()
  const pager = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLocaleLowerCase()
  const matches = projects.filter((project) => `${project.name} ${project.stack.join(' ')}`.toLocaleLowerCase().includes(normalized))
  const matchingApps = shortcuts.filter((app) => `${appLabels[app.id]} ${app.label}`.toLocaleLowerCase().includes(normalized))

  const launchShortcut = (shortcut: (typeof shortcuts)[number]) => {
    setSearchOpen(false)
    if (shortcut.kind === 'external' && shortcut.externalUrl) openExternal(shortcut.externalUrl)
    else if (shortcut.appId) openApp(shortcut.appId)
  }
  const goToPage = (index: number) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    pager.current?.scrollTo({ left: index * pager.current.clientWidth, behavior: reduced ? 'instant' : 'smooth' })
  }

  return (
    <main className="phone-home" inert={hidden} aria-hidden={hidden || undefined}>
      <div className="phone-pager" ref={pager} onScroll={(event) => {
        const target = event.currentTarget
        setPage(Math.round(target.scrollLeft / target.clientWidth))
      }}>
        <section className="phone-page" aria-label="Pantalla de inicio" inert={page !== 0}>
          <div className="phone-clock-widget">
            <p className="phone-date">{now.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <time className="phone-clock" dateTime={now.toISOString()}>{now.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', hour12: false })}</time>
            <span className="phone-clock-caption">Un vistazo a mi mundo.</span>
          </div>

          <button className="phone-profile-widget" type="button" onClick={() => openApp('about')}>
            <img src="/about-merchan.jpg" alt="" width="52" height="52" />
            <span className="phone-profile-copy">
              <span className="phone-availability"><span /> Disponible para proyectos</span>
              <h1>Hola, soy Royer.</h1>
              <span className="phone-profile-role">Full Stack Developer</span>
            </span>
            <Icon name="ChevronRight" size={19} />
          </button>

          <div className="phone-app-grid" aria-label="Aplicaciones">
            {shortcuts.map((shortcut) => (
              <button type="button" className="phone-app" key={shortcut.id} onClick={() => launchShortcut(shortcut)}>
                <span className={`phone-app-icon phone-tone-${shortcut.id}`}><Icon name={shortcut.iconName} size={25} /></span>
                <span className="phone-app-label">{appLabels[shortcut.id]}</span>
              </button>
            ))}
          </div>
          <button className="phone-explore" type="button" onClick={() => goToPage(1)}>
            <span><Icon name="FolderKanban" size={16} /> {projects.length} proyectos para explorar</span><Icon name="ChevronRight" size={16} />
          </button>
        </section>

        <section className="phone-page phone-project-page" aria-label="Pantalla de proyectos" inert={page !== 1}>
          <header className="phone-project-heading"><span>Hecho por mí</span><h2>Mis proyectos</h2><p>Abre una app y descubre cómo la construí.</p></header>
          <div className="phone-app-grid">
            {projects.map((project) => (
              <button type="button" className="phone-app" key={project.id} onClick={() => openProject(project.id)} aria-label={project.name}>
                <span className="phone-app-icon phone-project-icon">
                  {project.screenshots[0] ? <img src={project.screenshots[0].src} alt="" loading="lazy" /> : <Icon name="Code2" size={26} />}
                </span>
                <span className="phone-app-label">{project.name}</span>
              </button>
            ))}
          </div>
          <button type="button" className="phone-explore" onClick={() => openApp('projects')}><span>Ver todos los detalles</span><Icon name="ChevronRight" size={16} /></button>
        </section>
      </div>

      <div className="phone-home-tools">
        <button type="button" className="phone-icon-button" aria-label="Cambiar fondo de pantalla" onClick={onWallpaper}><Icon name="Image" size={18} /></button>
        <div className="phone-page-indicators" aria-label="Páginas de inicio">
          {['Inicio', 'Proyectos'].map((label, index) => <button key={label} type="button" aria-label={`Página ${label}`} aria-current={page === index ? 'page' : undefined} onClick={() => goToPage(index)}><span /></button>)}
        </div>
        <button className="phone-search-trigger" type="button" onClick={() => { setQuery(''); setSearchOpen(true) }}><Icon name="Search" size={15} />Buscar</button>
      </div>
      <nav className="phone-dock" aria-label="Accesos rápidos">
        {[
          { icon: 'MessageCircle', label: 'WhatsApp', tone: 'whatsapp', action: () => openExternal(profile.whatsapp) },
          { icon: 'FolderKanban', label: 'Proyectos', tone: 'projects', action: () => openApp('projects') },
          { icon: 'Mail', label: 'Contacto', tone: 'contact', action: () => openApp('contact') },
          { icon: 'Github', label: 'GitHub', tone: 'github', action: () => openExternal(profile.github) },
        ].map((item) => <button type="button" className="phone-app" key={item.label} onClick={item.action}><span className={`phone-app-icon phone-tone-${item.tone}`}><Icon name={item.icon} size={23} /></span><span className="phone-app-label">{item.label}</span></button>)}
      </nav>

      {searchOpen && <PhoneDialog title="Buscar en RoyerOS" onClose={() => setSearchOpen(false)}>
        <label className="phone-search-field"><Icon name="Search" size={19} /><input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Apps, proyectos o tecnologías" aria-label="Buscar apps, proyectos o tecnologías" /></label>
        <div className="phone-search-results" aria-live="polite">
          {matchingApps.length > 0 && <><h3>Aplicaciones</h3>{matchingApps.map((app) => <button type="button" className="phone-result" key={app.id} onClick={() => launchShortcut(app)}><Icon name={app.iconName} size={20} /><span>{appLabels[app.id]}</span><Icon name="ChevronRight" size={16} /></button>)}</>}
          {matches.length > 0 && <><h3>Proyectos · {matches.length}</h3>{matches.map((project) => <button type="button" className="phone-result" key={project.id} onClick={() => { setSearchOpen(false); openProject(project.id) }}><Icon name="FolderKanban" size={20} /><span>{project.name}<small>{project.stack.slice(0, 3).join(' · ')}</small></span><Icon name="ChevronRight" size={16} /></button>)}</>}
          {!matches.length && !matchingApps.length && <p className="phone-empty">No hay resultados para “{query}”. Prueba con React, API o el nombre de un proyecto.</p>}
        </div>
      </PhoneDialog>}
    </main>
  )
}

export function MobileNavigation({ windows, activeWindow, onHome, onBack, onRestore, onClose }: {
  windows: RoyerWindow[]
  activeWindow?: RoyerWindow
  onHome: () => void
  onBack: () => void
  onRestore: (id: string) => void
  onClose: (id: string) => void
}) {
  const [recentsOpen, setRecentsOpen] = useState(false)
  return (
    <>
      <nav className="phone-navigation" aria-label="Navegación del teléfono">
        <button type="button" disabled={!activeWindow} onClick={onBack}><Icon name="ChevronLeft" size={21} /><span>Atrás</span></button>
        <button type="button" aria-current={!activeWindow ? 'page' : undefined} onClick={onHome}><Icon name="Home" size={20} /><span>Inicio</span></button>
        <button type="button" onClick={() => setRecentsOpen(true)} aria-haspopup="dialog"><Icon name="PanelBottom" size={20} /><span>Recientes{windows.length > 0 ? ` · ${windows.length}` : ''}</span></button>
      </nav>
      {recentsOpen && <PhoneDialog title="Apps recientes" onClose={() => setRecentsOpen(false)}>
        <p className="phone-sheet-description">Retoma lo que estabas explorando.</p>
        <div className="phone-recents">
          {[...windows].sort((a, b) => b.zIndex - a.zIndex).map((item) => <div key={item.id} className="phone-recent-row">
            <button type="button" className="phone-result" onClick={() => { onRestore(item.id); setRecentsOpen(false) }}><Icon name={item.kind === 'project' ? 'FolderKanban' : shortcuts.find((app) => app.id === item.appId)?.iconName ?? 'Monitor'} size={23} /><span>{mobileWindowTitle(item)}<small>{item.id === activeWindow?.id ? 'En primer plano' : 'Toca para continuar'}</small></span></button>
            <button type="button" className="phone-icon-button" aria-label={`Cerrar ${mobileWindowTitle(item)}`} onClick={() => onClose(item.id)}><Icon name="X" size={18} /></button>
          </div>)}
          {!windows.length && <div className="phone-empty"><Icon name="PanelBottom" size={32} /><p>Todavía no hay apps abiertas.</p><p>Explora tus accesos desde Inicio.</p></div>}
        </div>
        <button type="button" className="phone-sheet-action" onClick={() => { onHome(); setRecentsOpen(false) }}>Ir al inicio<Icon name="Home" size={17} /></button>
      </PhoneDialog>}
    </>
  )
}
