export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface Stat {
  label: string;
  value: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'linkedin' | 'github' | 'twitter' | 'email';
}

export interface AboutSection {
  title: string;
  items: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  headshot: string;
  linkedinUrl: string;
  githubUrl?: string;
  email?: string;
  stats: Stat[];
  about: {
    summary: string;
    experience: AboutSection;
    skills: AboutSection;
    education: AboutSection;
  };
}
