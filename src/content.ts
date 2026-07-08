import { NavItem, Skill, Experience } from './types';

export const navItems: NavItem[] = [
  { id: 'about', label: { en: 'About', fr: 'À Propos' }, href: '#about' },
  { id: 'skills', label: { en: 'Skills', fr: 'Compétences' }, href: '#skills' },
  { id: 'experience', label: { en: 'Experience', fr: 'Expérience' }, href: '#experience' },
  { id: 'contact', label: { en: 'Contact', fr: 'Contact' }, href: '#contact' },
];

export const heroData = {
  name: 'Joy Anurika Ozurumba',
  tag: { en: 'Bilingual Expert', fr: 'Experte Bilingue' },
  headline: {
    en: 'Joy Anurika Ozurumba',
    fr: 'Joy Anurika Ozurumba',
  },
  title: {
    en: 'Bilingual Professional | French & International Studies Specialist | Administrative Leader',
    fr: 'Professionnelle Bilingue | Spécialiste du Français & des Études Internationales | Leader Administrative',
  },
  ctaPrimary: { en: 'View My Experience', fr: 'Voir Mon Expérience' },
  ctaSecondary: { en: 'Contact Me', fr: 'Me Contacter' },
  profileImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0ud027C4I8yWRRejaXK3EQIbOap8uUQGj9FnE8pk2Mq7JWsdQrjF_wgIA63E3GM7F9D0nPUnTUb_HW5fIiS8uenEOD3Wuzq00POhQGL8OljEBEkp4_TAkFyH1ymq_iHuSdlvTWoJVmB4ZY0z0sfGkJZYQF4hnXz4_1Hqk5dEsyT2hQmoe9S_1L4epCLDSqMFLxa9VaGlqZ6l4vKpsKP6o6Vn8muh8OucpuJALd5203yY5nFqqotcguBC41NVRSVsz3RY',
};

export const aboutData = {
  title: { en: 'About Me', fr: 'À Propos de Moi' },
  subtitle: { en: 'EXECUTIVE SUPPORT SPECIALIST', fr: 'SPÉCIALISTE DU SUPPORT EXÉCUTIF' },
  quote: {
    en: 'Dedicated and bilingual (French and English) professional with over 7 years of progressive experience in administrative, leadership, and executive support roles across academic, non-profit, and student governance environments.',
    fr: 'Professionnelle dévouée et bilingue (français et anglais) avec plus de 7 ans d\'expérience progressive dans des rôles administratifs, de leadership et de soutien de direction au sein d\'environnements universitaires, associatifs et de gouvernance étudiante.',
  },
  features: [
    {
      id: 'admin',
      title: { en: 'Administrative Focus', fr: 'Focus Administratif' },
      desc: {
        en: 'Fostering a culture of respect, efficiency, and a detail-oriented approach in every task.',
        fr: 'Favoriser une culture de respect, d\'efficacité et une approche méticuleuse dans chaque tâche.',
      },
      icon: 'Briefcase',
    },
    {
      id: 'tech',
      title: { en: 'Tech-Savvy Strategy', fr: 'Stratégie Technologique' },
      desc: {
        en: 'Leveraging advanced digital tools to streamline operations and enhance organizational output.',
        fr: 'Exploiter des outils numériques avancés pour optimiser les opérations et accroître la performance organisationnelle.',
      },
      icon: 'Cpu',
    },
  ],
};

export const skillsData: Skill[] = [
  {
    id: 'bilingual',
    title: { en: 'Bilingual Fluency', fr: 'Fluidité Bilingue' },
    desc: {
      en: 'Native-level proficiency in French & English with international studies background.',
      fr: 'Maîtrise de niveau natif en français et en anglais avec un parcours en études internationales.',
    },
    icon: 'Languages',
    tags: ['French Native', 'English Professional'],
  },
  {
    id: 'exec-support',
    title: { en: 'Executive Support', fr: 'Soutien Exécutif' },
    desc: {
      en: 'Comprehensive administrative support for high-level officials and university registries.',
      fr: 'Soutien administratif complet pour les hauts responsables et les registres universitaires.',
    },
    icon: 'ShieldCheck',
    tags: ['Calendar Mgmt', 'Confidential Handling', 'Registry Support'],
  },
  {
    id: 'strategy',
    title: { en: 'Strategic Planning', fr: 'Planification' },
    desc: {
      en: 'Leadership roles in student governance and academic affairs directing policy.',
      fr: 'Rôles de leadership dans la gouvernance étudiante et les affaires académiques orientant les politiques.',
    },
    icon: 'BarChart3',
    tags: ['Policy Directing', 'Student Governance', 'Academic Affairs'],
  },
  {
    id: 'tech-prof',
    title: { en: 'Tech Proficiency', fr: 'Maîtrise Technique' },
    desc: {
      en: 'Advanced Google Workspace, Office 365, and Zoom coordination.',
      fr: 'Maîtrise avancée de Google Workspace, de MS Office 365 et de la coordination de réunions Zoom.',
    },
    icon: 'Laptop',
    tags: ['Google Workspace', 'Office 365', 'Zoom Coordination'],
  },
];

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    role: { en: 'National Director of Academic Affairs', fr: 'Directrice Nationale des Affaires Académiques' },
    org: { en: 'CSI - COFSCI', fr: 'CSI - COFSCI' },
    period: { en: 'March 2025 - Present', fr: 'Mars 2025 - Présent' },
    desc: {
      en: 'Directing academic strategies and fostering excellence across national platforms through leadership and policy oversight.',
      fr: 'Direction des stratégies académiques et promotion de l\'excellence à travers des plateformes nationales via le leadership et la supervision des politiques.',
    },
    icon: 'Briefcase',
    skills: ['Policy Making', 'Academic Leadership', 'Strategic Direction', 'Stakeholder Liaison'],
  },
  {
    id: 'exp-2',
    role: { en: 'Administrative Officer', fr: 'Responsable Administrative' },
    org: { en: 'University of Benin', fr: 'Université du Bénin' },
    period: { en: 'May 2025 - July 2025', fr: 'Mai 2025 - Juillet 2025' },
    desc: {
      en: 'Streamlining administrative workflows and providing essential operational support within the university structure.',
      fr: 'Optimisation des flux de travail administratifs et fourniture d\'un soutien opérationnel essentiel au sein de la structure de l\'université.',
    },
    icon: 'GraduationCap',
    skills: ['Workflow Streamlining', 'Academic Registries', 'Database Management', 'Inter-departmental liaison'],
  },
  {
    id: 'exp-3',
    role: { en: 'Acting Secretary to the Deputy Registrar', fr: 'Secrétaire par Intérim du Registraire Adjoint' },
    org: { en: 'University of Benin', fr: 'Université du Bénin' },
    period: { en: 'July 2025 - March 2026', fr: 'Juillet 2025 - Mars 2026' },
    desc: {
      en: 'Direct executive support, managing sensitive communications, calendars, and high-stakes administrative coordination.',
      fr: 'Soutien exécutif direct, gestion des communications confidentielles, d\'agendas complexes et de coordinations administratives à forts enjeux.',
    },
    icon: 'FileText',
    skills: ['Executive Scheduling', 'Minute Taking', 'Confidential correspondence', 'Registry Protocols'],
  },
  {
    id: 'exp-4',
    role: { en: 'State/Campus Pioneer President', fr: 'Présidente Pionnière d\'État / de Campus' },
    org: { en: 'CSI', fr: 'CSI' },
    period: { en: 'June 2024 - Sept 2024', fr: 'Juin 2024 - Sept 2024' },
    desc: {
      en: 'Leading institutional establishment and pioneering student-led initiatives with a focus on governance and organizational structure.',
      fr: 'Direction de l\'établissement institutionnel et initiation de projets étudiants axés sur la gouvernance, la structure et la mobilisation.',
    },
    icon: 'Award',
    skills: ['Community Mobilization', 'Constitutional Writing', 'Strategic Alignment', 'Institutional Setup'],
  },
];

export const contactDetails = {
  title: { en: "Let's Connect", fr: 'Contactez-Moi' },
  desc: {
    en: 'I am always open to discussing new opportunities in administrative leadership, bilingual support, and academic excellence.',
    fr: 'Je suis toujours ouverte à la discussion d\'opportunités dans le leadership administratif, le soutien bilingue et l\'excellence académique.',
  },
  email: 'jozurumba4@gmail.com',
  phone: '+2349012572225',
  linkedin: 'Joy Anurika Ozurumba',
};
