import type { SkillGroup } from '@/types'

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    iconName: 'Code2',
    skills: [
      { name: 'React', iconName: 'Atom' },
      { name: 'TypeScript', iconName: 'FileCode2' },
      { name: 'Vite', iconName: 'Zap' },
      { name: 'Material UI', iconName: 'Palette' },
      { name: 'Tailwind CSS', iconName: 'Paintbrush' },
      { name: 'React Native', iconName: 'Smartphone' },
      { name: 'Expo', iconName: 'package' },
    ],
  },
  {
    title: 'Backend',
    iconName: 'Server',
    skills: [
      { name: 'Node.js', iconName: 'Server' },
      { name: 'Express', iconName: 'Route' },
      { name: 'Go', iconName: 'Binary' },
      { name: 'Gin', iconName: 'Route' },
      { name: 'Python', iconName: 'Terminal' },
      { name: 'Socket.IO', iconName: 'Radio' },
    ],
  },
  {
    title: 'Databases',
    iconName: 'Database',
    skills: [
      { name: 'MariaDB', iconName: 'Database' },
      { name: 'MySQL', iconName: 'Database' },
      { name: 'SQL Server', iconName: 'Database' },
      { name: 'MongoDB', iconName: 'Leaf' },
      { name: 'Redis', iconName: 'Zap' },
    ],
  },
  {
    title: 'DevOps & Infrastructure',
    iconName: 'Cloud',
    skills: [
      { name: 'Docker', iconName: 'Container' },
      { name: 'Docker Compose', iconName: 'Layers' },
      { name: 'Traefik', iconName: 'Shield' },
      { name: 'Nginx', iconName: 'Globe' },
      { name: 'Apache', iconName: 'Globe' },
      { name: 'Coolify', iconName: 'Rocket' },
    ],
  },
  {
    title: 'Mobile',
    iconName: 'Smartphone',
    skills: [
      { name: 'React Native', iconName: 'Smartphone' },
      { name: 'Expo', iconName: 'package' },
    ],
  },
  {
    title: 'Automation & Tools',
    iconName: 'Workflow',
    skills: [
      { name: 'n8n', iconName: 'Workflow' },
      { name: 'GitHub / GitLab', iconName: 'GitBranch' },
      { name: 'MinIO', iconName: 'HardDrive' },
      { name: 'Checkmk', iconName: 'Activity' },
      { name: 'Uptime Kuma', iconName: 'HeartPulse' },
    ],
  },
]
