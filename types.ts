export enum SkillCategory {
  COMMERCIAL = 'Commercial & Contracts',
  SOFTWARE = 'Software & Tools',
  DATA = 'Data & Analytics',
  ENGINEERING = 'Engineering & Drafting'
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  title: string;
  role: string;
  description: string;
  technologies: string[];
  period?: string;
  client?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  year?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}