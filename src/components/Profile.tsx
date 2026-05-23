import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Quote, ShieldCheck, Heart, User } from 'lucide-react';
import { Language, AppConfig } from '../types';

interface ProfileProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
}

export default function Profile({ currentLang, config, accentColors }: ProfileProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation angles based on limits (-15 to 15 deg)
    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = (((y / rect.height) - 0.5) * -20);
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const currentAccent = accentColors[config.themeColor];

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-black dark:bg-black light:bg-stone-100/40 relative overflow-hidden transition-colors duration-500"
    >
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] opacity-15 pointer-events-none" style={{ backgroundColor: currentAccent.glowHex }}></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Understated Section Title */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-[#a1887f] dark:text-amber-500/80 uppercase block mb-2" style={{ color: currentAccent.glowHex }}>
            {currentLang === 'en' ? '01 // Brand Profile' : '٠١ // ملف الهوية الإبداعية'}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-neutral-900 dark:text-white tracking-tight">
            {currentLang === 'en' ? config.aboutTitleEn : config.aboutTitleAr}
          </h2>
        </div>

        {/* Dual Split Screen Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Column 1: Awwwards-Style 3D Hover Interactive Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: 1000,
              }}
              className="relative w-full max-w-[360px] aspect-[4/5] cursor-pointer group"
            >
              <motion.div
                animate={{
                  rotateX: rotate.x,
                  rotateY: rotate.y,
                  transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full h-full rounded-2xl p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-900/10 dark:bg-transparent backdrop-blur-xl relative overflow-hidden flex items-center justify-center glow-card"
                style={{
                  '--glow-color-rgba': currentAccent.glow,
                  '--glow-border': currentAccent.glowHex,
                } as React.CSSProperties}
              >
                {/* Embedded Glow Borders and Lights inside card */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                {/* Main Profile Portrait Frame */}
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={config.profileImage}
                    alt="ZGC Creative Designer Portrait"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // fallback to standard placeholder if url breaks
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Dark transparent luxury vignette layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                  {/* Absolute Info Ribbon inside card */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col">
                    <span className="font-display font-bold text-lg tracking-wider text-white uppercase">{config.logoText}</span>
                    <span className="font-mono text-[10px] tracking-widest text-[#a1887f] uppercase" style={{ color: currentAccent.glowHex }}>
                      {currentLang === 'en' ? 'CHIEF CREATIVE' : 'كبير المصممين'}
                    </span>
                  </div>
                </div>

                {/* Outer Cinematic Corner Highlights */}
                <span className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20"></span>
                <span className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20"></span>
                <span className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20"></span>
                <span className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20"></span>
              </motion.div>
            </div>
          </div>

          {/* Column 2: Personal Narrative Content and Design Philosophy */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                {currentLang === 'en' ? config.aboutTextEn : config.aboutTextAr}
              </p>

              {/* Decorative High-End Philosophy Quote Container */}
              <div
                className="p-6 sm:p-8 rounded-2xl glass-panel relative border"
                style={{ borderColor: `${currentAccent.glowHex}25` }}
              >
                <Quote className="absolute top-4 right-4 w-10 h-10 text-neutral-200/5 rotate-180" />
                <p className="font-display font-medium text-lg italic text-neutral-800 dark:text-neutral-200 leading-normal relative z-10">
                  {currentLang === 'en' ? config.philosophyEn : config.philosophyAr}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-6 h-0.5" style={{ backgroundColor: currentAccent.glowHex }}></div>
                  <span className="font-mono text-xs text-[#a1887f] uppercase" style={{ color: currentAccent.glowHex }}>
                    {currentLang === 'en' ? 'Master Blueprint Strategy' : 'استراتيجية المخطط العام'}
                  </span>
                </div>
              </div>
            </div>

            {/* Structured Value Props List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <ShieldCheck className="w-5 h-5" style={{ color: currentAccent.glowHex }} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-neutral-800 dark:text-neutral-200 text-sm tracking-wide uppercase">
                    {currentLang === 'en' ? 'Professionalism' : 'الاحترافية المطلقة'}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {currentLang === 'en' ? 'Bespoke precision tailored exactly to your guidelines.' : 'دقة متناهية مخصصة وعمل احترافي يناسب رغبتك.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <Heart className="w-5 h-5" style={{ color: currentAccent.glowHex }} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-neutral-800 dark:text-neutral-200 text-sm tracking-wide uppercase">
                    {currentLang === 'en' ? 'Creative Identity' : 'الهوية البصرية الفريدة'}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {currentLang === 'en' ? 'Crafting unforgettable assets to break the mold.' : 'صناعة تراكيب مرئية لا تُنسى لكسر النماذج التقليدية.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
