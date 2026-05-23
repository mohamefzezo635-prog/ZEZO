import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, Sparkles, Image, Play, BookOpen, TrendingUp } from 'lucide-react';
import { Language, AppConfig } from '../types';
import { SERVICES_ITEMS } from '../data';

interface ServicesProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
}

export default function Services({ currentLang, config, accentColors }: ServicesProps) {
  
  const getServiceIcon = (iconName: string, iconColor: string) => {
    switch (iconName) {
      case 'LayoutGrid':
        return <LayoutGrid className="w-6 h-6" style={{ color: iconColor }} />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" style={{ color: iconColor }} />;
      case 'Image':
        return <Image className="w-6 h-6" style={{ color: iconColor }} />;
      case 'Play':
        return <Play className="w-6 h-6" style={{ color: iconColor }} />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" style={{ color: iconColor }} />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" style={{ color: iconColor }} />;
      default:
        return <Sparkles className="w-6 h-6" style={{ color: iconColor }} />;
    }
  };

  const currentAccent = accentColors[config.themeColor];

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-stone-950 dark:bg-[#080808] light:bg-[#fbfbf9] transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-[#a1887f] dark:text-amber-500/80 uppercase block mb-2" style={{ color: currentAccent.glowHex }}>
            {currentLang === 'en' ? '04 // Specializations' : '٠٤ // التخصصات والخدمات الإبداعية'}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-neutral-900 dark:text-white tracking-tight">
            {currentLang === 'en' ? 'Agency Actions' : 'الخدمات التي نتميز برفع جودتها اليوم'}
          </h2>
        </div>

        {/* Cinematic Bento-Style Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_ITEMS.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 pb-10 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-100/30 dark:bg-black/30 backdrop-blur-md relative overflow-hidden flex flex-col justify-between glow-card group"
              style={{
                '--glow-color-rgba': currentAccent.glow,
                '--glow-border': currentAccent.glowHex,
              } as React.CSSProperties}
            >
              {/* Corner decorative lights */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-white/[0.02] to-transparent pointer-events-none"></div>

              {/* Upper Section */}
              <div className="space-y-6">
                <div className="inline-flex p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-transform duration-500 group-hover:scale-110">
                  {getServiceIcon(service.iconName, currentAccent.glowHex)}
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-medium text-lg sm:text-xl text-neutral-800 dark:text-neutral-100 uppercase tracking-wide">
                    {currentLang === 'en' ? service.titleEn : service.titleAr}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                    {currentLang === 'en' ? service.descEn : service.descAr}
                  </p>
                </div>
              </div>

              {/* Understated bottom accent dot */}
              <div className="mt-8 pt-4 border-t border-neutral-200/40 dark:border-neutral-800/40 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-[#a1887f] uppercase" style={{ color: currentAccent.glowHex }}>
                  {currentLang === 'en' ? 'Premium Tier' : 'فئة النخبة'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentAccent.glowHex }}></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
