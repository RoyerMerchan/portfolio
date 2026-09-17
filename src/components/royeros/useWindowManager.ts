import { useCallback, useMemo, useState } from 'react'
import { appTitles, type AppId } from '@/data/royeros'

export type WindowKind = 'app' | 'project'

export interface RoyerWindow {
  id: string
  appId: AppId | 'project'
  kind: WindowKind
  title: string
  projectId?: string
  minimized: boolean
  maximized: boolean
  zIndex: number
  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
}

const defaultSizes: Record<AppId | 'project', { width: number; height: number }> = {
  about: { width: 760, height: 560 },
  projects: { width: 980, height: 660 },
  skills: { width: 860, height: 620 },
  terminal: { width: 820, height: 520 },
  contact: { width: 760, height: 560 },
  resume: { width: 760, height: 560 },
  trash: { width: 560, height: 420 },
  project: { width: 980, height: 680 },
}

function nextPosition(index: number) {
  return {
    x: 96 + (index % 5) * 34,
    y: 76 + (index % 4) * 30,
  }
}

export function useWindowManager() {
  const [windows, setWindows] = useState<RoyerWindow[]>([])
  const [zCursor, setZCursor] = useState(40)

  const bumpZ = useCallback(() => {
    let next = 0
    setZCursor((current) => {
      next = current + 1
      return next
    })
    return next
  }, [])

  const focusWindow = useCallback(
    (windowId: string) => {
      const nextZ = bumpZ()
      setWindows((current) =>
        current.map((item) =>
          item.id === windowId ? { ...item, zIndex: nextZ, minimized: false } : item,
        ),
      )
    },
    [bumpZ],
  )

  const openApp = useCallback(
    (appId: AppId) => {
      const existing = windows.find((item) => item.id === appId)
      if (existing) {
        focusWindow(existing.id)
        return existing.id
      }

      const nextZ = bumpZ()
      const createdIndex = windows.length
      const newWindow: RoyerWindow = {
        id: appId,
        appId,
        kind: 'app',
        title: appTitles[appId],
        minimized: false,
        maximized: false,
        zIndex: nextZ,
        position: nextPosition(createdIndex),
        size: defaultSizes[appId],
      }

      setWindows((current) => [...current, newWindow])
      return newWindow.id
    },
    [bumpZ, focusWindow, windows],
  )

  const openProject = useCallback(
    (projectId: string, projectName: string) => {
      const windowId = `project-${projectId}`
      const existing = windows.find((item) => item.id === windowId)
      if (existing) {
        focusWindow(existing.id)
        return existing.id
      }

      const nextZ = bumpZ()
      const createdIndex = windows.length
      const newWindow: RoyerWindow = {
        id: windowId,
        appId: 'project',
        kind: 'project',
        title: `${projectName}.case`,
        projectId,
        minimized: false,
        maximized: false,
        zIndex: nextZ,
        position: nextPosition(createdIndex),
        size: defaultSizes.project,
      }

      setWindows((current) => [...current, newWindow])
      return newWindow.id
    },
    [bumpZ, focusWindow, windows],
  )

  const closeWindow = useCallback((windowId: string) => {
    setWindows((current) => current.filter((item) => item.id !== windowId))
  }, [])

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((current) =>
      current.map((item) => (item.id === windowId ? { ...item, minimized: true } : item)),
    )
  }, [])

  const toggleMaximize = useCallback(
    (windowId: string) => {
      const nextZ = bumpZ()
      setWindows((current) =>
        current.map((item) =>
          item.id === windowId
            ? { ...item, maximized: !item.maximized, minimized: false, zIndex: nextZ }
            : item,
        ),
      )
    },
    [bumpZ],
  )

  const moveWindow = useCallback((windowId: string, x: number, y: number) => {
    setWindows((current) =>
      current.map((item) =>
        item.id === windowId
          ? {
              ...item,
              position: { x: Math.max(12, x), y: Math.max(12, y) },
            }
          : item,
      ),
    )
  }, [])

  const restoreWindow = useCallback(
    (windowId: string) => {
      const nextZ = bumpZ()
      setWindows((current) =>
        current.map((item) =>
          item.id === windowId ? { ...item, minimized: false, zIndex: nextZ } : item,
        ),
      )
    },
    [bumpZ],
  )

  const visibleWindows = useMemo(
    () => windows.filter((item) => !item.minimized).sort((a, b) => a.zIndex - b.zIndex),
    [windows],
  )

  return {
    windows,
    visibleWindows,
    openApp,
    openProject,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    moveWindow,
    restoreWindow,
  }
}
