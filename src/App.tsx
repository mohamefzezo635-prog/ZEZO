import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';

// Core Types
import { Language, ThemeMode, AppConfig } from './types';

// Constants and Default content
import { INITIAL_CONFIG, THEME_COLORS } from './data';

// Custom modular components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import InfiniteBanner from './components/InfiniteBanner';
import Contact from './components/Contact';
import CreatorPanel from './components/CreatorPanel';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);
  const [creatorOpen, setCreatorOpen] = useState(false);

  // 1. Initial State Load & Local Storage sync
  useEffect(() => {
    const savedConfig = localStorage.getItem('zgc_studio_config_temp');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (err) {
        console.error('Failed to parse cached configuration, keeping defaults.', err);
      }
    }

    const savedLang = localStorage.getItem('zgc_studio_lang');
    if (savedLang === 'en' || savedLang === 'ar') {
      setLang(savedLang);
    }

    const savedTheme = localStorage.getItem('zgc_studio_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }

    // Short loading sequence delay
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(loaderTimer);
  }, []);

  // 2. Multi-lingual RTL alignment handler
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('zgc_studio_lang', lang);
  }, [lang]);

  // 3. Theme application class handler
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('zgc_studio_theme', theme);
  }, [theme]);

  // Save config session updates
  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem('zgc_studio_config_temp', JSON.stringify(newConfig));
  };

  // Reset to static defaults
  const handleResetConfig = () => {
    if (window.confirm(lang === 'en' ? 'Reset to initial ZGC default content?' : 'هل تود استعادة الهوية الفنية الأساسية؟')) {
      setConfig(INITIAL_CONFIG);
      localStorage.removeItem('zgc_studio_config_temp');
    }
  };

  const currentAccent = THEME_COLORS[config.themeColor];

  return (
    <div
      className="min-h-screen bg-black dark:bg-[#030303] light:bg-[#fbfbf9] text-neutral-800 dark:text-neutral-200 transition-colors duration-500 overflow-x-hidden"
      style={{
        '--glow-color': currentAccent.glow,
        '--glow-color-rgba': currentAccent.glow,
        '--glow-border': currentAccent.glowHex,
      } as React.CSSProperties}
    >
      <AnimatePresence mode="wait">
        {/* CINEMATIC INTRO LOADING SCREEN */}
        {loading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#0d0d0c] flex flex-col items-center justify-center text-white"
          >
            {/* Background cinematic glow backdrop */}
            <div className="absolute w-[350px] h-[350px] bg-[#5d4037]/20 filter blur-[80px] rounded-full animate-pulse-glow" />

            <div className="text-center relative z-10 space-y-6 px-6">
              {/* Animated Icon badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="inline-flex p-4 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md mb-2"
              >
                <Compass className="w-8 h-8 animate-spin-slow text-amber-500" style={{ color: currentAccent.glowHex }} />
              </motion.div>

              {/* Centered Brand Title */}
              <div className="space-y-1">
                <motion.h1
                  initial={{ letterSpacing: '0.2em', opacity: 0 }}
                  animate={{ letterSpacing: '0.4em', opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="font-display text-4xl sm:text-5xl font-black uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400 pl-[0.4em]"
                >
                  ZGC
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="font-mono text-[9px] sm:text-xs tracking-widest text-[#a1887f] uppercase"
                  style={{ color: currentAccent.glowHex }}
                >
                  Elite Creative Vision
                </motion.p>
              </div>

              {/* Rhythmic progress ticker */}
              <div className="pt-8 max-w-xs mx-auto">
                <div className="w-32 h-0.5 rounded-full bg-neutral-900 mx-auto overflow-hidden relative">
                  <motion.div
                    initial={{ left: '-100%' }}
                    animate={{ left: '100%' }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 bottom-0 w-1/2 rounded-full"
                    style={{ backgroundColor: currentAccent.glowHex }}
                  />
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 font-mono text-[9px] uppercase tracking-widest text-neutral-600">
              Elite Master Blueprint Experience // Activated
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPLETED PORTFOLIO ECOSYSTEM */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 1. Global Navigation Frame */}
          <Navbar
            currentLang={lang}
            setLang={setLang}
            currentTheme={theme}
            toggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            config={config}
            onOpenCreator={() => setCreatorOpen(true)}
            accentColors={THEME_COLORS}
          />

          {/* Dynamic re-orderable sections */}
          {(config.sectionOrder || ['hero', 'profile', 'skills', 'projects', 'services', 'stats', 'testimonials', 'contact']).map((secId) => {
            switch (secId) {
              case 'hero':
                return (
                  <React.Fragment key="hero">
                    <Hero currentLang={lang} config={config} accentColors={THEME_COLORS} />
                  </React.Fragment>
                );
              case 'profile':
                return (
                  <React.Fragment key="profile">
                    <Profile currentLang={lang} config={config} accentColors={THEME_COLORS} />
                  </React.Fragment>
                );
              case 'skills':
                return (
                  <React.Fragment key="skills">
                    <Skills currentLang={lang} config={config} accentColors={THEME_COLORS} />
                  </React.Fragment>
                );
              case 'projects':
                return (
                  <React.Fragment key="projects">
                    <Projects
                      currentLang={lang}
                      config={config}
                      accentColors={THEME_COLORS}
                      onSaveConfig={handleSaveConfig}
                    />
                    <InfiniteBanner currentLang={lang} config={config} accentColors={THEME_COLORS} />
                  </React.Fragment>
                );
              case 'services':
                return (
                  <React.Fragment key="services">
                    <Services currentLang={lang} config={config} accentColors={THEME_COLORS} />
                  </React.Fragment>
                );
              case 'stats':
                return (
                  <React.Fragment key="stats">
                    <Stats currentLang={lang} config={config} accentColors={THEME_COLORS} />
                  </React.Fragment>
                );
              case 'testimonials':
                return (
                  <React.Fragment key="testimonials">
                    <Testimonials currentLang={lang} config={config} accentColors={THEME_COLORS} />
                  </React.Fragment>
                );
              case 'contact':
                return (
                  <React.Fragment key="contact">
                    <Contact currentLang={lang} config={config} accentColors={THEME_COLORS} />
                  </React.Fragment>
                );
              default:
                return null;
            }
          })}

          {/* Background Ambient Audio Player (Password Protected: 2607) */}
          <MusicPlayer
            currentLang={lang}
            config={config}
            accentColors={THEME_COLORS}
          />

          {/* 11. Custom Visual Customizer Sidebar CMS */}
          <CreatorPanel
            isOpen={creatorOpen}
            onClose={() => setCreatorOpen(false)}
            config={config}
            onSaveConfig={handleSaveConfig}
            onReset={handleResetConfig}
            currentLang={lang}
            accentColors={THEME_COLORS}
          />
        </motion.div>
      )}
    </div>
  );
}
