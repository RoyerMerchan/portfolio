import type { LucideIcon } from 'lucide-react'
import {
  Code2,
  Server,
  Database,
  Cloud,
  Rocket,
  Shield,
  Cpu,
  Terminal,
  Layers,
  Boxes,
  GitBranch,
  MonitorCheck,
  Smartphone,
  Activity,
  Workflow,
  Zap,
  Globe,
  Mail,
  ExternalLink,
  Download,
  ArrowRight,
  CheckCircle2,
  Trophy,
  ListOrdered,
  LayoutDashboard,
  Swords,
  ShoppingCart,
  LayoutTemplate,
  MessageCircle,
  Music,
  Gamepad2,
  ShieldAlert,
  Container,
  Palette,
  Paintbrush,
  FileCode2,
  Atom,
  Route,
  Binary,
  Radio,
  Leaf,
  HardDrive,
  HeartPulse,
  GraduationCap,
  Calendar,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Quote,
  Sparkles,
  Bot,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function ArrowUpIcon({ className }: { className?: string }) {
  return <ChevronDown className={`rotate-180 ${className || ''}`} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const iconMap: Record<string, any> = {
  Code2,
  Server,
  Database,
  Cloud,
  Rocket,
  Shield,
  Cpu,
  Terminal,
  Layers,
  Boxes,
  GitBranch,
  MonitorCheck,
  Smartphone,
  Activity,
  Workflow,
  Zap,
  Globe,
  Mail,
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  ExternalLink,
  Download,
  ArrowRight,
  CheckCircle2,
  Trophy,
  ListOrdered,
  LayoutDashboard,
  Swords,
  ShoppingCart,
  LayoutTemplate,
  MessageCircle,
  Music,
  Gamepad2,
  ShieldAlert,
  Container,
  Palette,
  Paintbrush,
  FileCode2,
  Atom,
  Route,
  Binary,
  Radio,
  Leaf,
  HardDrive,
  HeartPulse,
  GraduationCap,
  Calendar,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Quote,
  Sparkles,
  Bot,
  ArrowUp: ArrowUpIcon,
  package: Boxes,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getIcon(name: string): any {
  return iconMap[name] || Code2
}
