export interface Badge {
  label: string;
  link?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  badges: Badge[];
  mainLink?: string;
  linkLabel?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: string; // Used to determine icon from lucide-react
}

export interface SkillCategory {
  category: string;
  iconName: string; // Used to reference Lucide icon component name
  skills: string[];
}
