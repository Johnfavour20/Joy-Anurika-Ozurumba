export interface NavItem {
  id: string;
  label: { en: string; fr: string };
  href: string;
}

export interface Skill {
  id: string;
  title: { en: string; fr: string };
  desc: { en: string; fr: string };
  icon: string;
  tags?: string[];
}

export interface Experience {
  id: string;
  role: { en: string; fr: string };
  org: { en: string; fr: string };
  period: { en: string; fr: string };
  desc: { en: string; fr: string };
  icon: string;
  skills: string[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
  reply?: string;
}
