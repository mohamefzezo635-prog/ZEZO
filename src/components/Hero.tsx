import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, FileText, Sparkles } from 'lucide-react';
import { Language, AppConfig } from '../types';

interface HeroProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
}

export default function Hero({ currentLang, config, accentColors }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for interactive glow parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const currentAccent = accentColors[config.themeColor];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6 bg-radial from-neutral-900 via-neutral-950 to-black dark:from-neutral-950 dark:to-black light:from-stone-50 light:to-white transition-colors duration-500"
    >
      {/* Cinematic Glowing Background Lights */}
      <motion.div
        animate={{
          x: mousePosition.x * 60,
          y: mousePosition.y * 60,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute w-[450px] h-[450px] rounded-full filter blur-[100px] opacity-40 mix-blend-screen pointer-events-none"
        style={{
          top: '20%',
          left: '20%',
          backgroundColor: currentAccent.glowHex,
        }}
      />
      
      <motion.div
        animate={{
          x: mousePosition.x * -80,
          y: mousePosition.y * -80,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="absolute w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-35 mix-blend-screen pointer-events-none"
        style={{
          bottom: '15%',
          right: '15%',
          backgroundColor: currentAccent.glowHex,
        }}
      />

      {/* Floating Interactive Geometric Particles */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none opacity-20 dark:opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 dark:bg-white/10 rounded-full"
            style={{
              width: i % 2 === 0 ? '6px' : '4px',
              height: i % 2 === 0 ? '6px' : '4px',
              top: `${20 + i * 12}%`,
              left: `${10 + (i * 25) % 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Animated Brand Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200/40 dark:border-neutral-800/40 bg-white/5 dark:bg-black/40 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-500" style={{ color: currentAccent.glowHex }} />
          <span className="text-xs font-semibold tracking-widest text-neutral-600 dark:text-neutral-300 uppercase font-mono">
            {currentLang === 'en' ? config.taglineEn : config.taglineAr}
          </span>
        </motion.div>

        {/* Cinematic Golden Gradient Heading */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-600 tracking-tight leading-[1] text-glow select-none"
            style={{ '--glow-color': currentAccent.glow } as React.CSSProperties}
          >
            {currentLang === 'en' ? config.heroTitleEn : config.heroTitleAr}
          </motion.h1>
        </div>

        {/* Minimal luxury body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-12"
        >
          {currentLang === 'en' ? config.heroSubtitleEn : config.heroSubtitleAr}
        </motion.p>

        {/* High-end Framer-style Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6"
        >
          {/* View Projects CTA */}
          <button
            onClick={scrollToProjects}
            className={`group flex items-center gap-2 cursor-pointer transition-all duration-300 relative px-8 py-4 rounded-full font-semibold overflow-hidden shadow-2xl ${currentAccent.button}`}
          >
            <span>{currentLang === 'en' ? 'View Elite Projects' : 'تصفح المشاريع المتميزة'}</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </button>

          {/* Download Interactive CV Button */}
          <button
            onClick={() => {
              // Create an interactive, stylish custom resume notice or instant PDF mock download
              const cvText = currentLang === 'en' 
                ? 'Thank you for downloading ZGC Studio Creative CV Resume.\nThis file would contain detailed commercial projects and agency expertise.'
                : 'شكراً لتحميل السيرة الذاتية الإبداعية لـ ZGC Studio.\nالملف يحتوي على تفاصيل المشاريع التجارية والخبرات الفنية.';
              alert(cvText);
            }}
            className="group flex items-center gap-2 cursor-pointer transition-all duration-300 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-white border border-neutral-200 dark:border-neutral-800 px-8 py-4 rounded-full font-semibold"
          >
            <FileText className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'Download CV' : 'تحميل السيرة الذاتية'}</span>
          </button>
        </motion.div>
      </div>

      {/* Floating downward scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400 pointer-events-none flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">
          {currentLang === 'en' ? 'Scroll to explore' : 'اسحب للإستكشاف'}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1.5 h-6 rounded-full bg-neutral-300 dark:bg-neutral-800 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1/2 rounded-full" style={{ backgroundColor: currentAccent.glowHex }}></div>
        </motion.div>
      </div>
    </section>
  );
}
