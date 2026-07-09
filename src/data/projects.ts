import type { Project } from '@/types'

export const projects: Project[] = [
  {
    title: 'SportApp',
    description:
      'Plataforma web integral para la gestión y digitalización de eventos deportivos universitarios. Permite registrar equipos, jugadores, torneos, jornadas, resultados y estadísticas en tiempo real.',
    problem:
      'Las universidades manejaban torneos deportivos con hojas de cálculo y papel, generando retrasos, errores y falta de acceso a la información.',
    techs: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
    type: 'Sistema de Gestión',
    status: 'completed',
    highlights: [
      'Gestión completa de torneos, equipos y jugadores',
      'Generación automática de jornadas y resultados',
      'Panel administrativo con estadísticas',
      'Interfaz responsive para móviles',
    ],
    iconName: 'Trophy',
    image: '/sportapp.png',
  },
  {
    title: 'Dashboard de Inventario',
    description:
      'Panel de control para la gestión y monitoreo de inventario empresarial en tiempo real. Incluye alertas de stock bajo, movimientos y trazabilidad de productos.',
    problem:
      'Empresas sin visibilidad en tiempo real de su inventario, generando pérdidas por stock no controlado y decisiones sin datos.',
    techs: ['React', 'TypeScript', 'Node.js', 'SQL Server', 'Docker'],
    type: 'Dashboard',
    status: 'completed',
    highlights: [
      'Dashboard interactivo con métricas en tiempo real',
      'Alertas automáticas de stock crítico',
      'Trazabilidad completa de movimientos',
      'Exportación de reportes',
    ],
    iconName: 'LayoutDashboard',
  },
  {
    title: 'Sistema de Torneos',
    description:
      'Plataforma para la creación y gestión de torneos deportivos con generación automática de brackets, fixture, resultados y tabla de posiciones.',
    problem:
      'Organizar torneos deportivos requería procesos manuales complejos para generar llaves, programar partidos y mantener resultados actualizados.',
    techs: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.IO'],
    type: 'Sistema de Gestión',
    status: 'completed',
    highlights: [
      'Generación automática de brackets y fixtures',
      'Soporte para múltiples formatos de torneo',
      'Resultados y estadísticas en tiempo real',
      'Interfaz optimizada para administradores y participantes',
    ],
    iconName: 'Swords',
  },
  {
    title: 'SaaS Venta de Zapatos de Fútbol',
    description:
      'Plataforma SaaS para la venta especializada de calzado deportivo. Incluye catálogo, carrito de compras, pasarela de pago y panel de administración.',
    problem:
      'Tiendas de calzado deportivo sin presencia digital moderna, perdiendo ventas frente a competidores con e-commerce integrado.',
    techs: ['React', 'Node.js', 'Express', 'MySQL', 'Docker'],
    type: 'E-commerce SaaS',
    status: 'in-progress',
    links: [
      { url: '#', label: 'Demo' },
    ],
    highlights: [
      'Catálogo inteligente con filtros por talla, marca y tipo',
      'Carrito de compras con sesión persistente',
      'Panel de administración de productos y pedidos',
      'Infraestructura Docker para escalabilidad',
    ],
    iconName: 'ShoppingCart',
  },
  {
    title: 'Landing Pages para Emprendimientos',
    description:
      'Colección de landing pages profesionales para emprendimientos y startups. Diseñadas con enfoque en conversión, velocidad y experiencia de usuario.',
    problem:
      'Emprendedores sin presencia web profesional pierden credibilidad y oportunidades de negocio.',
    techs: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    type: 'Web Development',
    status: 'completed',
    highlights: [
      'Diseño optimizado para conversión',
      'Rendimiento perfecto en Lighthouse',
      'Animaciones sutiles que mejoran la experiencia',
      'Responsive y accesible',
    ],
    iconName: 'LayoutTemplate',
  },
  {
    title: 'KnotChange — WhatsApp Clone',
    description:
      'Clon funcional de WhatsApp con mensajería en tiempo real, lista de Contáctame!s, chats individuales e interfaz responsive.',
    problem:
      'Proyecto personal para explorar sistemas de mensajería en tiempo real con WebSockets y UX de apps de mensajería.',
    techs: ['React', 'Node.js', 'Express', 'Socket.IO', 'MongoDB'],
    type: 'Proyecto Personal',
    status: 'completed',
    links: [
      { url: 'https://github.com/RoyerMerchan', label: 'GitHub' },
    ],
    highlights: [
      'Mensajería instantánea con Socket.IO',
      'Interfaz similar a WhatsApp Web',
      'Soporte para múltiples conversaciones',
      'Diseño responsive mobile-first',
    ],
    iconName: 'MessageCircle',
    image: '/knot.jpg',
  },
  {
    title: 'SpotiBad — Spotify Clone',
    description:
      'Clon de Spotify con reproductor de música, listas de reproducción, búsqueda y una interfaz moderna similar al servicio original.',
    problem:
      'Proyecto para practicar diseño de interfaces de streaming y lógica de reproducción musical.',
    techs: ['React', 'JavaScript', 'CSS', 'HTML5'],
    type: 'Proyecto Personal',
    status: 'completed',
    highlights: [
      'Reproductor de música funcional',
      'Creación y gestión de playlists',
      'Búsqueda de canciones y artistas',
      'UI inspirada en Spotify',
    ],
    iconName: 'Music',
    image: '/clon-spotify.png',
  },
  {
    title: 'Videojuego 2D Canvas',
    description:
      'Videojuego 2D desarrollado con HTML5 Canvas y JavaScript puro. Implementa detección de colisiones, animaciones, bucles de juego y control de personajes.',
    problem:
      'Proyecto académico para dominar los fundamentos de game development, animaciones y rendimiento gráfico.',
    techs: ['JavaScript', 'HTML5 Canvas', 'CSS'],
    type: 'Proyecto Académico',
    status: 'completed',
    highlights: [
      'Motor de juego desde cero con Canvas API',
      'Detección de colisiones precisa',
      'Ciclo de juego optimizado (requestAnimationFrame)',
      'Controles intuitivos de teclado',
    ],
    iconName: 'Gamepad2',
    image: '/juego-2d.png',
  },
  {
    title: 'Virus — Simulación Educativa',
    description:
      'Simulación educativa de un virus informático con fines de aprendizaje en ciberseguridad. Muestra patrones de comportamiento de malware sin causar daño real.',
    problem:
      'Falta de herramientas educativas visuales para entender el comportamiento del malware en sistemas.',
    techs: ['JavaScript', 'HTML', 'CSS'],
    type: 'Proyecto Educativo',
    status: 'completed',
    highlights: [
      'Simulación segura de patrones de malware',
      'Visualización de propagación en red',
      'Recurso educativo para ciberseguridad',
      'Conceptos de ingeniería inversa',
    ],
    iconName: 'ShieldAlert',
    image: '/virus-pc.webp',
  },
]
