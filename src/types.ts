export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'ar';

export interface AppConfig {
  themeColor: 'brown' | 'gold' | 'emerald' | 'cyan' | 'rose';
  logoText: string;
  heroTitleEn: string;
  heroTitleAr: string;
  heroSubtitleEn: string;
  heroSubtitleAr: string;
  taglineEn: string;
  taglineAr: string;
  profileImage: string;
  aboutTitleEn: string;
  aboutTitleAr: string;
  aboutTextEn: string;
  aboutTextAr: string;
  philosophyEn: string;
  philosophyAr: string;
  socials: {
    whatsapp: string;
    instagram: string;
    behance: string;
    email: string;
    tiktok: string;
    facebook?: string;
    pinterest?: string;
  };
  projects: ProjectItem[];
  bgMusicUrl?: string;
  bgMusicTitle?: string;
  bgMusicEnabled?: boolean;
  skills?: SkillItem[];
  sectionOrder?: string[];
  testimonials?: TestimonialItem[];
  socialsOrder?: string[];
}

export interface ProjectComment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export interface ProjectItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  image: string;
  videoUrl?: string; // Video streaming link
  descriptionEn: string;
  descriptionAr: string;
  likes?: number;
  comments?: ProjectComment[];
}

export interface SkillItem {
  id?: string; // Optional unique id for CRUD operations in Settings
  name: string;
  level: number; // 0-100
  category: 'software' | 'creative';
  iconName: string;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  textEn: string;
  textAr: string;
  avatar: string;
  rating: number;
}

export interface StatItem {
  id: string;
  value: string;
  numberValue: number;
  labelEn: string;
  labelAr: string;
  suffixEn: string;
  suffixAr: string;
}
