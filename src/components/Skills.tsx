import React from 'react';
import { motion } from 'motion/react';
import { Image, PenTool, Video, Sliders, Play, Palette, ExternalLink, Zap } from 'lucide-react';
import { Language, AppConfig } from '../types';
import { SKILLS_ITEMS } from '../data';

interface SkillsProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
}

export default function Skills({ currentLang, config, accentColors }: SkillsProps) {
  
  // Custom mapping to get proper icons for software & creative categories
  const getSkillIcon = (iconName: string, glowColor: string) => {
    switch (iconName) {
      case 'photoshop':
        return <Image className="w-5 h-5" style={{ color: glowColor }} />;
      case 'illustrator':
        return <PenTool className="w-5 h-5" style={{ color: glowColor }} />;
      case 'premiere':
        return <Video className="w-5 h-5" style={{ color: glowColor }} />;
      case 'aftereffects':
        return <Sliders className="w-5 h-5" style={{ color: glowColor }} />;
      case 'capcut':
        return <Play className="w-5 h-5 animate-pulse" style={{ color: glowColor }} />;
      case 'branding':
        return <Palette className="w-5 h-5" style={{ color: glowColor }} />;
      case 'social':
        return <Zap className="w-5 h-5" style={{ color: glowColor }} />;
      case 'motion':
        return <ExternalLink className="w-5 h-5" style={{ color: glowColor }} />;
      default:
        return <Image className="w-5 h-5" style={{ color: glowColor }} />;
    }
  };

  const currentAccent = accentColors[config.themeColor];

  // Load skills dynamically from config
  const skillsList = config.skills && config.skills.length > 0 ? config.skills : SKILLS_ITEMS;

  // Separate Software Skills vs Creative Competencies
  const softwareSkills = skillsList.filter(s => s.category === 'software');
  const creativeSkills = skillsList.filter(s => s.category === 'creative');

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 bg-stone-950 dark:bg-[#080808] light:bg-[#fbfbf9] transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Understated Title Section */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-[#a1887f] dark:text-amber-500/80 uppercase block mb-2" style={{ color: currentAccent.glowHex }}>
            {currentLang === 'en' ? '02 // Technical Armory' : '٠٢ // ترسانة الأدوات والمهارات'}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-neutral-900 dark:text-white tracking-tight">
            {currentLang === 'en' ? 'Core Capabilities' : 'القدرات الإبداعية الأساسية'}
          </h2>
        </div>

        {/* Layout with Two Sub-Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Section 1: Creative Competencies */}
          <div className="space-y-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <span className="w-6 h-0.5" style={{ backgroundColor: currentAccent.glowHex }}></span>
              {currentLang === 'en' ? 'Artistic Competencies' : 'التخصصات الإبداعية الفنية'}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light mb-8">
              {currentLang === 'en' 
                ? 'Design styles rooted in cinematic theory, layout balance, and highly strategic social mechanics.' 
                : 'قواعد وأساليب تصميم متأصلة في نظريات التناسق البصري، وترتيب الكتل، وميكانيكيات الانتشار الرقمي.'}
            </p>

            <div className="grid grid-cols-1 gap-5">
              {creativeSkills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-900 bg-neutral-100/50 dark:bg-black/35 backdrop-blur-md glow-card relative overflow-hidden"
                  style={{
                    '--glow-color-rgba': currentAccent.glow,
                    '--glow-border': currentAccent.glowHex,
                  } as React.CSSProperties}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-neutral-200/50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        {getSkillIcon(skill.iconName, currentAccent.glowHex)}
                      </div>
                      <span className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-200 uppercase tracking-wide">
                        {skill.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Elegant Filling Level Bar */}
                  <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: currentAccent.glowHex }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Software Expertises */}
          <div className="space-y-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <span className="w-6 h-0.5" style={{ backgroundColor: currentAccent.glowHex }}></span>
              {currentLang === 'en' ? 'Productivity Powerhouses' : 'الأدوات والبرمجيات الاحترافية'}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light mb-8">
              {currentLang === 'en'
                ? 'Absolute control over the elite industry-standard applications for static and motion design.'
                : 'التحكم المطلق والاحترافي بتطبيقات ومعايير الصناعة لخدمة التصاميم الثابتة والمتحركة.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {softwareSkills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-900 bg-neutral-100/50 dark:bg-black/35 backdrop-blur-md glow-card flex flex-col justify-between"
                  style={{
                    '--glow-color-rgba': currentAccent.glow,
                    '--glow-border': currentAccent.glowHex,
                  } as React.CSSProperties}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-xl bg-neutral-200/50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      {getSkillIcon(skill.iconName, currentAccent.glowHex)}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#a1887f]" style={{ color: currentAccent.glowHex }}>
                      {skill.level}%
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-neutral-800 dark:text-neutral-100 uppercase tracking-wide mb-2">
                      {skill.name}
                    </h4>
                    
                    {/* Minimalist mini level line */}
                    <div className="w-full h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.15 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: currentAccent.glowHex }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
