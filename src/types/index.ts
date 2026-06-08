export interface Skill {
  name: string
  iconName: string
}

export interface SkillGroup {
  title: string
  iconName: string
  skills: Skill[]
}

export interface Project {
  title: string
  description: string
  problem?: string
  techs: string[]
  type: string
  status: 'completed' | 'in-progress' | 'maintained'
  links?: { url: string; label: string }[]
  highlights: string[]
  iconName: string
  image?: string
}

export interface Experience {
  period: string
  area: string
  achievements: string[]
  iconName: string
}

export interface Social {
  name: string
  url: string
  iconName: string
  label: string
}

export interface Service {
  title: string
  description: string
  iconName: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  iconName: string
}

export interface NavLink {
  label: string
  href: string
}
