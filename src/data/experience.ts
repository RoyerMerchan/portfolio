import type { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    period: '2026 — Presente',
    area: 'Desarrollador Fullstack',
    achievements: [
      'Diseño y desarrollo de sistemas empresariales para gestión empresarial',
      'Implementación de APIs RESTful con Node.js, Express y Go',
      'Despliegue y administración de infraestructura moderna',
      'Desarrollo de soluciones SaaS y plataformas web escalables',
    ],
    iconName: 'Code2',
  },
  {
    period: '2024 — 2025',
    area: 'Infraestructura y DevOps',
    achievements: [
      'Configuración de entornos Docker multi-servicio con redes y volúmenes',
      'Implementación de reverse proxy con SSL automático',
      'Automatización de despliegues continuos',
      'Monitoreo de servidores y servicios con alertas configurables',
    ],
    iconName: 'Cloud',
  },
  {
    period: '2023 — 2024',
    area: 'Aplicaciones Móviles',
    achievements: [
      'Desarrollo de aplicaciones móviles con React Native y Expo',
      'Integración de APIs y servicios en tiempo real',
      'Optimización de rendimiento para dispositivos móviles',
      'Publicación y mantenimiento en stores',
    ],
    iconName: 'Smartphone',
  },
  {
    period: '2023',
    area: 'Bases de Datos y Backend',
    achievements: [
      'Administración de bases de datos: MariaDB, MySQL, SQL Server, MongoDB',
      'Diseño de esquemas normalizados para sistemas transaccionales',
      'Optimización de consultas y rendimiento de bases de datos',
      'Implementación de caching con Redis para mejora de velocidad',
    ],
    iconName: 'Database',
  },
]
