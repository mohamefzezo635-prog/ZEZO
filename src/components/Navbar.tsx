import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Globe, Settings, ArrowLeft } from 'lucide-react';
import { Language, ThemeMode, AppConfig } from '../types';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  currentTheme: ThemeMode;
  toggleTheme: () => void;
  config: AppConfig;
  onOpenCreator: () => void;
  accentColors: any;
}

export default function Navbar({
  currentLang,
  setLang,
  currentTheme,
  toggleTheme,
  config,
  onOpenCreator,
  accentColors
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active link calculation based on position
      const sections = ['home', 'about', 'skills', 'projects', 'services', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', en: 'Home', ar: 'الرئيسية' },
    { id: 'about', en: 'About', ar: 'نبذة عني' },
    { id: 'skills', en: 'Skills', ar: 'المهارات' },
    { id: 'projects', en: 'Projects', ar: 'المشاريع' },
    { id: 'services', en: 'Services', ar: 'خدماتنا' },
    { id: 'testimonials', en: 'Testimonials', ar: 'آراء العملاء' },
    { id: 'contact', en: 'Contact', ar: 'اتصل بنا' }
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const currentAccent = accentColors[config.themeColor];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'glass-navbar py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" style={{ backgroundColor: currentAccent.glowHex }}></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600" style={{ backgroundColor: currentAccent.glowHex }}></span>
          </span>
          <span className={`font-display text-xl sm:text-2xl font-bold tracking-wider text-neutral-900 dark:text-neutral-100 transition-colors uppercase`}>
            {config.logoText}
          </span>
        </button>

        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm tracking-wide font-medium cursor-pointer relative py-1 transition-colors ${
                activeSection === item.id
                  ? 'text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
              }`}
            >
              {currentLang === 'en' ? item.en : item.ar}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: currentAccent.glowHex }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Global Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={() => setLang(currentLang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-300 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer transition-all"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-mono uppercase">{currentLang === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Theme Mode Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer transition-all"
            title="Toggle Theme Mode"
          >
            {currentTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>

          {/* Live Studio Customize CMS button */}
          {!(typeof window !== 'undefined' && (window.location.search.includes('view=client') || window.location.search.includes('visitor=true'))) && (
            <button
              onClick={onOpenCreator}
              className={`flex items-center gap-1.5 text-xs font-semibold uppercase px-4 py-2 rounded-full cursor-pointer transition-all ${currentAccent.button}`}
            >
              <Settings className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{currentLang === 'en' ? 'Creator Studio' : 'استوديو التعديل'}</span>
            </button>
          )}
        </div>

        {/* Mobile controls & Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Studio Toggle for Mobile */}
          {!(typeof window !== 'undefined' && (window.location.search.includes('view=client') || window.location.search.includes('visitor=true'))) && (
            <button
              onClick={onOpenCreator}
              className={`p-2 rounded-full cursor-pointer transition-all ${currentAccent.button}`}
              title="Creator Studio"
            >
              <Settings className="w-4 h-4 animate-spin-slow" />
            </button>
          )}

          <button
            onClick={() => setLang(currentLang === 'en' ? 'ar' : 'en')}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 cursor-pointer"
          >
            <Globe className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 cursor-pointer"
          >
            {currentTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-800 dark:text-neutral-200 cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full glass-navbar border-t border-neutral-200 dark:border-neutral-800 shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-lg text-left tracking-wide font-medium cursor-pointer py-1 block ${
                    currentLang === 'ar' ? 'text-right' : 'text-left'
                  } ${
                    activeSection === item.id
                      ? currentAccent.highlight
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {currentLang === 'en' ? item.en : item.ar}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
