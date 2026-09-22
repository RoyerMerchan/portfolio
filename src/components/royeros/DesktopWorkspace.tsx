import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, projects, shortcuts, type AppId, type ProjectCategory } from '@/data/royeros'
import { Icon } from './icons'
import './desktop.css'

const labels: Record<string, string> = {
  about: 'Sobre mí', projects: 'Proyectos', skills: 'Skills', terminal: 'Terminal',
  contact: 'Contacto', resume: 'Mi CV', github: 'GitHub', trash: 'Papelera',
}
const filters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Todos' }, { id: 'web', label: 'Aplicaciones' },
  { id: 'backend', label: 'Backend' }, { id: 'experiment', label: 'Experimentos' },
]
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

interface Props {
  refreshPulse: boolean
  openApp: (id: AppId) => void
  openProject: (id: string) => void
  openExternal: (url: string) => void
  onWallpaper: () => void
  onShowDesktop: () => void
}

export default function DesktopWorkspace({ refreshPulse, openApp, openProject, openExternal, onWallpaper, onShowDesktop }: Props) {
  const [category, setCategory] = useState<'all' | ProjectCategory>('all')
  const [selectedId, setSelectedId] = useState('torneo-system')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const libraryRef = useRef<HTMLElement>(null)
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0]
  const visibleProjects = projects.filter((project) => category === 'all' || project.category.includes(category))
  const matchedProjects = projects.filter((project) => normalize(`${project.name} ${project.stack.join(' ')}`).includes(normalize(query.trim())))
  const matchedApps = shortcuts.filter((app) => normalize(`${labels[app.id]} ${app.label}`).includes(normalize(query.trim())))

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      dialog.current?.showModal()
      searchRef.current?.focus()
    } else dialog.current?.close()
  }, [searchOpen])

  function launchApp(app: (typeof shortcuts)[number]) {
    setSearchOpen(false)
    if (app.appId) openApp(app.appId)
    else if (app.externalUrl) openExternal(app.externalUrl)
  }

  return (
    <div className="workspace">
      <header className="workspace-menubar">
        <button className="workspace-brand" type="button" onClick={onShowDesktop} aria-label="Mostrar escritorio"><span>R</span>RoyerOS <small>Workspace</small></button>
        <div className="workspace-location"><Icon name="Home" size={14} /><span>Personal</span><Icon name="ChevronRight" size={12} /><strong>Escritorio</strong></div>
        <button className="workspace-search" type="button" onClick={() => { setQuery(''); setSearchOpen(true) }}><Icon name="Search" size={15} /><span>Busca algo, descubre más</span><kbd>Ctrl / ⌘ K</kbd></button>
        <span className="workspace-online"><i />Disponible para proyectos</span>
      </header>

      <nav className="workspace-rail" aria-label="Aplicaciones del escritorio">
        {shortcuts.map((app) => <button key={app.id} type="button" onClick={() => launchApp(app)} title={labels[app.id]}><span className={`workspace-app-symbol symbol-${app.id}`}><Icon name={app.iconName} size={21} /></span><span>{labels[app.id]}</span></button>)}
        <button className="workspace-wallpaper" type="button" onClick={onWallpaper} title="Cambiar fondo de pantalla"><Icon name="Image" size={20} /><span>Ambiente</span></button>
      </nav>

      <motion.main className="workspace-content" animate={refreshPulse ? { opacity: [1, 0.65, 1] } : { opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="workspace-intro">
          <div><p>Tu próxima idea empieza aquí.</p><h1>Bienvenido a mi <em>workspace.</em></h1></div>
          <button type="button" className="workspace-text-button" onClick={() => openApp('about')}>Conoce a Royer<Icon name="ChevronRight" size={16} /></button>
        </div>

        <div className="workspace-stage">
          <section className="workspace-feature" aria-label="Proyecto destacado">
            <div className="workspace-feature-bar"><span><i />En el escritorio</span><span>{selected.stack[0]}<span className="workspace-separator">/</span>{selected.type}</span><Icon name="FolderOpen" size={16} /></div>
            <div className="workspace-feature-body">
              <div className="workspace-feature-copy">
                <p className="workspace-project-state"><span />{selected.status === 'Production-ready' ? 'Listo para producción' : selected.status === 'Completed' ? 'Proyecto completado' : 'En desarrollo'}</p>
                <h2>{selected.name}</h2>
                <p className="workspace-project-description">{selected.description}</p>
                <div className="workspace-tech">{selected.stack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
                <button className="workspace-primary" type="button" onClick={() => openProject(selected.id)}>Explorar proyecto<Icon name="ChevronRight" size={17} /></button>
              </div>
              <button className="workspace-project-preview" type="button" onClick={() => openProject(selected.id)} aria-label={`Abrir proyecto ${selected.name}`}>
                {selected.screenshots[0] ? <img key={selected.id} src={selected.screenshots[0].src} alt={`Vista previa de ${selected.name}`} /> : <div className="workspace-code-preview"><Icon name="Server" size={48} /><strong>{selected.name}</strong><span>{selected.stack.join(' · ')}</span></div>}
                <span className="workspace-preview-caption"><Icon name="Maximize2" size={15} />Ver caso de estudio</span>
              </button>
            </div>
            <div className="workspace-feature-footer"><span>Construido para resolver problemas reales.</span><button type="button" onClick={() => libraryRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })}>Explorar biblioteca<Icon name="ChevronDown" size={14} /></button></div>
          </section>

          <aside className="workspace-personal" aria-label="Sobre Royer">
            <div className="workspace-profile"><img src="/about-merchan.jpg" alt="Royer Merchán" width="64" height="64" /><span className="workspace-profile-status">Abierto a oportunidades</span><h2>Royer Merchán<span>Full Stack Developer</span></h2><p>De una buena idea a un sistema que funciona. Interfaces, APIs e infraestructura, de principio a fin.</p><button type="button" onClick={() => openApp('contact')}>Hablemos de tu proyecto<Icon name="MessageCircle" size={17} /></button></div>
            <div className="workspace-quicklinks"><a href={profile.resume} download><Icon name="Download" size={17} /><span>Mi currículum<small>Experiencia y trayectoria</small></span><Icon name="ChevronRight" size={14} /></a><button type="button" onClick={() => openExternal(profile.github)}><Icon name="Github" size={17} /><span>El código, abierto<small>Explora mi GitHub</small></span><Icon name="ExternalLink" size={14} /></button></div>
          </aside>
        </div>

        <section className="workspace-library" ref={libraryRef} aria-label="Biblioteca de proyectos">
          <div className="workspace-library-heading"><div><h2>Ideas convertidas en software<span>{projects.length}</span></h2><p>Selecciona un proyecto para verlo en el escritorio.</p></div><div className="workspace-filters" aria-label="Filtrar proyectos">{filters.map((filter) => <button key={filter.id} type="button" aria-pressed={category === filter.id} onClick={() => setCategory(filter.id)}>{filter.label}</button>)}</div></div>
          <div className="workspace-projects">
            {visibleProjects.map((project) => <button className="workspace-project" key={project.id} type="button" aria-pressed={selected.id === project.id} onClick={() => { setSelectedId(project.id); document.querySelector('.workspace-content')?.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }}>
              <span className="workspace-thumbnail">{project.screenshots[0] ? <img src={project.screenshots[0].src} alt="" loading="lazy" /> : <Icon name="Server" size={30} />}<span className="workspace-thumbnail-tag">{project.category.includes('experiment') ? 'Lab' : 'App'}</span></span>
              <span className="workspace-project-name">{project.name}<Icon name="ChevronRight" size={15} /></span><span className="workspace-project-meta">{project.stack.slice(0, 2).join(' · ')}</span>
            </button>)}
          </div>
          <div className="workspace-bottom-note"><span><Icon name="MousePointerClick" size={14} />Un portafolio para explorar, no solo para mirar.</span><button type="button" onClick={() => openApp('terminal')}><Icon name="SquareTerminal" size={15} />¿Prefieres la terminal?<kbd>Ctrl + `</kbd></button></div>
        </section>
      </motion.main>

      <dialog className="workspace-command" ref={dialog} aria-label="Buscar en el workspace" onCancel={() => setSearchOpen(false)} onClick={(event) => { event.stopPropagation(); if (event.target === event.currentTarget) setSearchOpen(false) }} onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); setSearchOpen(false) } }}>
        <div className="workspace-command-inner"><header><Icon name="Search" size={21} /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca proyectos, apps o tecnologías…" aria-label="Buscar proyectos, apps o tecnologías" /><button type="button" onClick={() => setSearchOpen(false)} aria-label="Cerrar buscador"><Icon name="X" size={20} /></button></header>
          <div className="workspace-command-results"><h2>Aplicaciones y accesos</h2>{matchedApps.map((app) => <button key={app.id} type="button" onClick={() => launchApp(app)}><Icon name={app.iconName} size={18} /><span>{labels[app.id]}</span><Icon name="ChevronRight" size={14} /></button>)}<h2>Proyectos · {matchedProjects.length}</h2>{matchedProjects.map((project) => <button key={project.id} type="button" onClick={() => { setSearchOpen(false); openProject(project.id) }}><Icon name="FolderKanban" size={18} /><span>{project.name}<small>{project.stack.slice(0, 3).join(' · ')}</small></span><Icon name="ChevronRight" size={14} /></button>)}{!matchedApps.length && !matchedProjects.length && <p className="workspace-empty">No encontramos “{query}”. Prueba con React, API o un nombre de proyecto.</p>}</div>
          <footer><span>Todo tu workspace, a una búsqueda.</span><span><kbd>Esc</kbd> para cerrar</span></footer>
        </div>
      </dialog>
    </div>
  )
}
