import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { projects, shortcuts, type AppId } from '@/data/royeros'
import { Icon } from './icons'
import './desktop.css'

const labels: Record<string, string> = {
  about: 'Sobre mí', projects: 'Proyectos', skills: 'Skills', terminal: 'Terminal',
  contact: 'Contacto', resume: 'Mi CV', github: 'GitHub', trash: 'Papelera',
}
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

interface Props {
  refreshPulse: boolean
  openApp: (id: AppId) => void
  openProject: (id: string) => void
  openExternal: (url: string) => void
}

export default function DesktopWorkspace({ refreshPulse, openApp, openProject, openExternal }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
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
    const onSearch = () => { setQuery(''); setSearchOpen(true) }
    window.addEventListener('royeros-search', onSearch)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('royeros-search', onSearch)
    }
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
      <motion.main className="windows-desktop" aria-label="Escritorio" onClick={() => setSelectedId(null)} animate={refreshPulse ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}>
        <div className="windows-icons">
          {shortcuts.map((app) => <button key={app.id} type="button" className="windows-shortcut" aria-pressed={selectedId === app.id} onClick={(event) => { event.stopPropagation(); setSelectedId(app.id); if (event.detail === 0 || window.matchMedia('(pointer: coarse)').matches) launchApp(app) }} onDoubleClick={() => launchApp(app)} title={labels[app.id]}>
            <span className={'windows-icon icon-' + app.id}><Icon name={app.iconName} size={35} /></span><span>{labels[app.id]}</span>
          </button>)}
          {projects.map((project) => <button key={project.id} type="button" className="windows-shortcut" aria-pressed={selectedId === project.id} onClick={(event) => { event.stopPropagation(); setSelectedId(project.id); if (event.detail === 0 || window.matchMedia('(pointer: coarse)').matches) openProject(project.id) }} onDoubleClick={() => openProject(project.id)} title={project.name}>
            <span className="windows-folder"><Icon name="FolderOpen" size={43} />{project.screenshots[0] && <img src={project.screenshots[0].src} alt="" loading="lazy" />}</span><span>{project.name}</span>
          </button>)}
        </div>
        <div className="windows-signature"><span className="windows-mark" aria-hidden="true"><i /><i /><i /><i /></span><h1>RoyerOS</h1><p>El escritorio de Royer Merchán</p></div>
        <div className="windows-desktop-hint"><Icon name="MousePointerClick" size={14} />Doble clic para abrir · Clic derecho para personalizar</div>
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
