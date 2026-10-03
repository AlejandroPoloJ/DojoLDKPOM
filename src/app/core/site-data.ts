export interface Program {
  readonly id: string;
  readonly title: string;
  readonly audience: string;
  readonly description: string;
  readonly age: string;
  readonly schedule: string;
  readonly icon: 'child' | 'youth' | 'adult' | 'combat' | 'kata' | 'competition';
  readonly featured?: boolean;
}

export interface Coach {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly rank: string;
  readonly bio: string;
  readonly initials: string;
}

export interface ScheduleItem {
  readonly day: string;
  readonly sessions: readonly { time: string; program: string; coach: string }[];
}

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly relation: string;
}

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface ValueItem {
  readonly title: string;
  readonly description: string;
  readonly icon: 'shield' | 'heart' | 'target' | 'medal';
}

export type GalleryCategory = 'clases' | 'competencia' | 'examenes' | 'eventos';

export interface GalleryPhoto {
  readonly id: string;
  /** Remote or local URL. New photos are added here by a developer. */
  readonly src: string;
  readonly alt: string;
  readonly category: GalleryCategory;
}

export type EventKind = 'competencia' | 'examen' | 'seminario' | 'torneo' | 'social';

export interface DojoEvent {
  readonly id: string;
  readonly title: string;
  readonly kind: EventKind;
  /** ISO date `YYYY-MM-DD`. */
  readonly date: string;
  readonly time: string;
  readonly location: string;
  readonly description: string;
  readonly ctaLabel?: string;
  readonly ctaHref?: string;
  readonly featured?: boolean;
  readonly published?: boolean;
}

export const DOJO = {
  name: 'Dojo LDKPOM',
  style: 'Karate Shotokan',
  tagline: 'Donde el carácter se forja',
  founded: 2022,
  phone: '+51 960 105 319',
  whatsapp: '+51 960105319',
  email: 'javier.rvc99@gmail.com',
  address: 'Av. José de San Martín #25, Pomalca',
  emailHref: 'mailto:javier.rvc99@gmail.com',
  phoneHref: 'tel:+51960105319',
} as const;

export const STATS: readonly Stat[] = [
  { value: '4', label: 'Años formando karatekas' },
  { value: '90+', label: 'Alumnos activos' },
  { value: '57', label: 'Medallas en torneos' },
  { value: '1', label: 'Instructor certificado' },
];

export const VALUES: readonly ValueItem[] = [
  {
    title: 'Disciplina',
    description:
      'El respeto, la puntualidad y la constancia se entrenan tanto como el cuerpo. Cada clase empieza y termina con un propósito.',
    icon: 'shield',
  },
  {
    title: 'Confianza',
    description:
      'Aprendes a defenderte con técnica y criterio. La seguridad no viene de la fuerza bruta, sino del control y la repetición.',
    icon: 'heart',
  },
  {
    title: 'Enfoque',
    description:
      'La concentración del dojo se traduce en la escuela, el trabajo y la vida diaria. Mente clara, decisiones firmes.',
    icon: 'target',
  },
  {
    title: 'Tradición',
    description:
      'Honramos el linaje Shotokan con un método probado durante décadas, adaptado a cada generación de alumnos.',
    icon: 'medal',
  },
];

export const PROGRAMS: readonly Program[] = [
  {
    id: 'infantil',
    title: 'Karate Infantil',
    audience: 'Niñas y niños',
    description:
      'Juego, coordinación y valores. Un espacio seguro donde los más chicos ganan confianza y aprenden a trabajar en equipo.',
    age: '6 a 12 años',
    schedule: 'Lun · Mié · Vie',
    icon: 'child',
  },
  {
    id: 'juvenil',
    title: 'Juvenil',
    audience: 'Adolescentes',
    description:
      'Técnica, condición física y defensa personal. Ideal para canalizar energía, ganar disciplina y construir carácter.',
    age: '13 a 17 años',
    schedule: 'Mar · Jue · Sáb',
    icon: 'youth',
    featured: true,
  },
  {
    id: 'adultos',
    title: 'Adultos',
    audience: 'A partir de 18 años',
    description:
      'Karate para todos los niveles, desde cero. Mejorá tu postura, resistencia y manejo del estrés entrenando marcialmente.',
    age: '18 años en adelante',
    schedule: 'Lun a Vie',
    icon: 'adult',
  },
  {
    id: 'defensa',
    title: 'Defensa Personal',
    audience: 'Mujeres y adultos',
    description:
      'Situaciones reales, respuestas simples y efectivas. Un taller práctico enfocado en la seguridad cotidiana.',
    age: '18 años en adelante',
    schedule: 'Sábados',
    icon: 'combat',
  },
  {
    id: 'kata',
    title: 'Kata & Formas',
    audience: 'Intermedio y avanzado',
    description:
      'El corazón del Shotokan. Perfeccionamiento de formas, respiración, equilibrio y precisión técnica milimétrica.',
    age: 'Cinturón verde en adelante',
    schedule: 'Mar · Jue',
    icon: 'kata',
  },
  {
    id: 'competencia',
    title: 'Equipo de Competencia',
    audience: 'Alto rendimiento',
    description:
      'Para quienes buscan representar al dojo en torneos. Kata y kumite con preparación física y táctica específica.',
    age: 'Cinturón naranja en adelante',
    schedule: 'Lun · Mié · Vie · Sáb',
    icon: 'competition',
  },
];

export const COACHES: readonly Coach[] = [
  {
    id: 'sensei-1',
    name: 'Renato Vásquez',
    role: 'Director Técnico · Sensei',
    rank: '5º Dan · JKA Certified',
    bio: 'Fundador del Dojo LDKPOM. Más de 10 años sobre el tatami y una vocación intacta por transmitir el Shotokan clásico.',
    initials: 'RV',
  },
  {
    id: 'sensei-2',
    name: 'Mariana Ponte',
    role: 'Instructora Juvenil',
    rank: '3º Dan · Entrenadora Nacional',
    bio: 'Ex competidora de kumite y formadora de niños. Especialista en pedagogía marcial y desarrollo motriz.',
    initials: 'MP',
  },
  {
    id: 'sensei-3',
    name: 'Olivia Mercedes',
    role: 'Kata & Defensa Personal',
    rank: '4º Dan · Árbitra Provincial',
    bio: 'Referente en técnicas de kata y defensa personal femenina. Lleva el detalle técnico a otro nivel.',
    initials: 'OM',
  },
];

export const SCHEDULE: readonly ScheduleItem[] = [
  {
    day: 'Lunes',
    sessions: [
      { time: '17:00', program: 'Infantil', coach: 'Renato' },
      { time: '19:00', program: 'Adultos', coach: 'Renato' },
      { time: '20:30', program: 'Competencia', coach: 'Renato' },
    ],
  },
  {
    day: 'Martes',
    sessions: [
      { time: '18:00', program: 'Juvenil', coach: 'Renato' },
      { time: '19:30', program: 'Kata & Formas', coach: 'Renato' },
    ],
  },
  {
    day: 'Miércoles',
    sessions: [
      { time: '17:00', program: 'Infantil', coach: 'Renato' },
      { time: '19:00', program: 'Adultos', coach: 'Renato' },
      { time: '20:30', program: 'Competencia', coach: 'Renato' },
    ],
  },
  {
    day: 'Jueves',
    sessions: [
      { time: '18:00', program: 'Juvenil', coach: 'Renato' },
      { time: '19:30', program: 'Kata & Formas', coach: 'Renato' },
    ],
  },
  {
    day: 'Viernes',
    sessions: [
      { time: '17:00', program: 'Infantil', coach: 'Renato' },
      { time: '19:00', program: 'Adultos', coach: 'Renato' },
      { time: '20:30', program: 'Competencia', coach: 'Renato' },
    ],
  },
  {
    day: 'Sábado',
    sessions: [
      { time: '10:00', program: 'Competencia', coach: 'Renato' },
      { time: '11:30', program: 'Defensa Personal', coach: 'Renato' },
    ],
  },
];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 't1',
    quote:
      'Mi hijo llegó tímido y hoy es cinturón naranja con una seguridad enorme. El dojo es su segunda casa y los profesores un ejemplo.',
    author: 'Carla Giménez',
    relation: 'Mamá de alumno',
  },
  {
    id: 't2',
    quote:
      'Empecé a los 41 sin experiencia. En seis meses cambié mi postura, mi energía y mi forma de manejar el estrés. Recomendadísimo.',
    author: 'Diego Ferreyra',
    relation: 'Alumno adultos',
  },
  {
    id: 't3',
    quote:
      'La preparación para torneos es de otro nivel. Llegué al podio nacional gracias al equipo y a la exigencia del dojo.',
    author: 'Sofía Ramírez',
    relation: 'Equipo de competencia',
  },
];

export const FAQS: readonly FaqItem[] = [
  {
    id: 'f1',
    question: '¿Necesito experiencia previa para empezar?',
    answer:
      'No. La mayoría de nuestros alumnos comenzó desde cero. Las clases están divididas por edad y nivel, y cada persona avanza a su propio ritmo con seguimiento personalizado.',
  },
  {
    id: 'f2',
    question: '¿Qué ropa o equipo necesito para la primera clase?',
    answer:
      'Solo ropa deportiva cómoda. El karategi (uniforme) y las protecciones no son necesarios para empezar: te asesoramos antes de comprar cualquier equipo.',
  },
  {
    id: 'f3',
    question: '¿Puedo hacer una clase de prueba gratuita?',
    answer:
      'Sí, ofrecemos una clase de prueba sin cargo. Coordinamos el horario que mejor te quede, presenciás una clase completa y resolvemos todas tus dudas antes de inscribirte.',
  },
  {
    id: 'f4',
    question: '¿A partir de qué edad se puede entrenar?',
    answer:
      'Recibimos alumnos desde los 6 años. Para los más chicos el enfoque es lúdico y motriz; a medida que crecen se incorpora la técnica y la preparación física progresiva.',
  },
  {
    id: 'f5',
    question: '¿Los exámenes de grado tienen costo adicional?',
    answer:
      'La cuota mensual incluye el entrenamiento. Los exámenes de cinturón se rinden ante tribunal dos veces al año y tienen un arancel aparte que se detalla al momento de la inscripción.',
  },
  {
    id: 'f6',
    question: '¿Qué días y horarios hay disponibles?',
    answer:
      'Tenemos turnos de tarde y sábados por la mañana según cada programa. En la sección de horarios encontrarás la grilla completa, y por WhatsApp confirmamos el cupo para tu grupo.',
  },
];

export const NAV_LINKS: readonly { label: string; href: string }[] = [
  { label: 'El Dojo', href: '#dojo' },
  { label: 'Programas', href: '#programas' },
  { label: 'Horarios', href: '#horarios' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'FAQ', href: '#faq' },
];

/** Seed gallery photos (Lorem Picsum — a developer replaces them with real dojo photos). */
export const GALLERY_CATEGORIES: readonly { id: GalleryCategory | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'clases', label: 'Clases' },
  { id: 'competencia', label: 'Competencias' },
  { id: 'examenes', label: 'Exámenes' },
  { id: 'eventos', label: 'Eventos' },
];

export const GALLERY: readonly GalleryPhoto[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1555597408-26bc8e548a46?q=80&w=1223&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Alumnos entrenando kata sobre el tatami principal',
    category: 'clases',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1656653424873-8491cd7bf5f8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Ejecución de una forma de kata en clase',
    category: 'clases',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1656653399674-446838d45998?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Competidores en el podio de un torneo provincial',
    category: 'competencia',
  },
  {
    id: 'g4',
    src: 'https://plus.unsplash.com/premium_photo-1713251454153-8b913826482f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Equipo del dojo celebrando una medalla',
    category: 'competencia',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1616447285364-f1461103ee36?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Examen de grado frente al tribunal',
    category: 'examenes',
  },
  {
    id: 'g6',
    src: 'https://plus.unsplash.com/premium_photo-1663076205303-d6cd83269893?q=80&w=1341&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Ceremonia de entrega de cinturones',
    category: 'examenes',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1603210185246-b1662978ea37?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Seminario técnico con invitados de otros dojos',
    category: 'eventos',
  },
  {
    id: 'g8',
    src: 'https://plus.unsplash.com/premium_photo-1663126246796-999a49ec8736?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0',
    alt: 'Encuentro familiar de fin de año del dojo',
    category: 'eventos',
  },
  {
    id: 'g9',
    src: 'https://plus.unsplash.com/premium_photo-1663126473034-a3367fd5598e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Clase infantil de karate en grupo',
    category: 'clases',
  },
];

/** Seed events (competencias, exámenes y seminarios). */
export const EVENTS: readonly DojoEvent[] = [
  {
    id: 'e1',
    title: 'Copa Metropolitana de Karate',
    kind: 'competencia',
    date: '2026-11-14',
    time: '09:00 a 18:00',
    location: 'Polideportivo Central, Chiclayo',
    description:
      'Torneo abierto de kata y kumite para todas las categorías. El equipo del dojo participará con 18 competidores. ¡Ven a alentar!',
    ctaLabel: 'Inscribirme al torneo',
    ctaHref: '#contacto',
    featured: true,
    published: true,
  },
  {
    id: 'e2',
    title: 'Examen de Grado — Fin de año',
    kind: 'examen',
    date: '2026-12-05',
    time: '15:00',
    location: 'Dojo LDKPOM — Tatami principal',
    description:
      'Rendición de exámenes ante tribunal examinador de la asociación. Incluye pasaje de kyu para infantiles, juveniles y adultos.',
    ctaLabel: 'Consultar requisitos',
    ctaHref: '#contacto',
    published: true,
  },
  {
    id: 'e3',
    title: 'Seminario de Kata Avanzado',
    kind: 'seminario',
    date: '2027-02-21',
    time: '10:00 a 13:00',
    location: 'Dojo LDKPOM — Tatami principal',
    description:
      'Taller intensivo de formas Heian y Tekki con sensei invitado 6º Dan. Cupos limitados a 30 alumnos de cinturón verde en adelante.',
    ctaLabel: 'Reservar mi lugar',
    ctaHref: '#contacto',
    published: true,
  },
  {
    id: 'e4',
    title: 'Torneo Interno de Kumite',
    kind: 'torneo',
    date: '2027-03-15',
    time: '11:00',
    location: 'Dojo LDKPOM — Tatami principal',
    description:
      'Competencia amistosa entre alumnos del dojo para medir progreso y foguearse antes de los torneos oficiales.',
    published: true,
  },
  {
    id: 'e5',
    title: 'Encuentro Anual de Familias',
    kind: 'social',
    date: '2027-3-28',
    time: '12:00',
    location: 'Predio recreativo del dojo',
    description:
      'Jornada abierta para alumnos y familias: demostraciones, juegos marciales y almuerzo compartido para cerrar el ciclo.',
    published: true,
  },
];
