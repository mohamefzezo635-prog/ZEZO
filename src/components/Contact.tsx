import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Instagram, Mail, ArrowUpRight, Copyright, Facebook, Share2 } from 'lucide-react';
import { Language, AppConfig } from '../types';

// Premium high-fidelity outline SVG icons matching Lucide styling (2px stroke width, rounded edges)
const BehanceIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 12c1.7 0 3-1.3 3-3s-1.3-3-3-3H4v12h8c1.7 0 3-1.3 3-3s-1.3-3-3-3H4" />
    <path d="M17 6h6" />
    <path d="M16 11.5a3.5 3.5 0 0 1 7 0" />
    <path d="M16 11.5h7" />
  </svg>
);

const TiktokIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const PinterestIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 22c.1-.8.2-1.7.5-2.5L10.3 12c-.5-1-.5-2.2-.1-3.2.7-1.8 2.7-2.6 4.5-1.9 1.4.6 2.1 2.1 1.7 3.6-.4 1.5-1.3 3.8-1.5 5.3-.2 1.2.5 2.3 1.7 2.4 2.8.2 5.1-1.9 5.3-4.7.2-3.8-2.6-7-6.4-7.2-4.3-.2-8 3.1-8.2 7.4-.1 1.5.4 3 1.4 4c.3.3.4.7.3 1.1l-.5 1.7c-.1.3-.3.4-.6.3-2.8-1.3-4.3-4.5-3.8-7.6C5.5 6.6 9.5 3 14 3c5 0 9 4 9 9 0 4.8-3.6 8.8-8.3 9.1-1.6.1-3.1-.4-4.1-1.5-.4-.4-.8-.4-1.1-.1l-1.5 1.1" />
  </svg>
);

interface ContactProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
}

export default function Contact({ currentLang, config, accentColors }: ContactProps) {
  const currentAccent = accentColors[config.themeColor];

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Part 1: Direct Active Communication Channels
  const directChannels = [
    {
      name: currentLang === 'en' ? 'WhatsApp Direct' : 'واتساب مباشر للعمل',
      url: config.socials.whatsapp || 'https://wa.me/201012345678',
      icon: <MessageSquare className="w-6 h-6" />,
      tagEn: 'Instant reply loop',
      tagAr: 'رد فوري ومباشر',
      color: 'hover:bg-green-600/10 hover:border-green-500/40 text-green-500'
    },
    {
      name: currentLang === 'en' ? 'Email Address' : 'البريد الإلكتروني للعمل',
      url: config.socials.email || 'mailto:zgc.creator@gmail.com',
      icon: <Mail className="w-6 h-6" />,
      tagEn: 'Official business bids',
      tagAr: 'العروض والمعاملات الرسمية',
      color: 'hover:bg-amber-600/10 hover:border-amber-500/40 text-amber-500'
    }
  ];

  // Part 2: Other Creative Portfolios and Social Links
  const channelsMap: Record<string, {
    name: string;
    url: string;
    icon: React.ReactNode;
    tagEn: string;
    tagAr: string;
    color: string;
  }> = {
    instagram: {
      name: 'Instagram',
      url: config.socials.instagram || 'https://instagram.com/zgc.studio',
      icon: <Instagram className="w-5 h-5" />,
      tagEn: 'Visual grid',
      tagAr: 'الشبكة الفنية',
      color: 'hover:bg-pink-600/10 hover:border-pink-500/40 text-pink-500'
    },
    facebook: {
      name: 'Facebook',
      url: config.socials.facebook || 'https://facebook.com/zgc.studio',
      icon: <Facebook className="w-5 h-5" />,
      tagEn: 'Core community',
      tagAr: 'الحساب الرسمي',
      color: 'hover:bg-blue-600/10 hover:border-blue-500/40 text-blue-500'
    },
    behance: {
      name: 'Behance',
      url: config.socials.behance || 'https://behance.net/zgc_studio',
      icon: <BehanceIcon className="w-5 h-5" />,
      tagEn: 'Full portfolios',
      tagAr: 'معارض الأعمال',
      color: 'hover:bg-sky-600/10 hover:border-sky-500/40 text-sky-400'
    },
    tiktok: {
      name: 'TikTok',
      url: config.socials.tiktok || 'https://tiktok.com/@zgc.studio',
      icon: <TiktokIcon className="w-5 h-5" />,
      tagEn: 'Motion showcase',
      tagAr: 'فيديوهات الحركة',
      color: 'hover:bg-stone-800/20 hover:border-white/20 text-white'
    },
    pinterest: {
      name: 'Pinterest',
      url: config.socials.pinterest || 'https://pinterest.com/zgc_studio',
      icon: <PinterestIcon className="w-5 h-5" />,
      tagEn: 'Mood cues',
      tagAr: 'لوحات الإلهام',
      color: 'hover:bg-red-600/10 hover:border-red-500/40 text-red-500'
    }
  };

  const defaultOrder = ['instagram', 'facebook', 'behance', 'tiktok', 'pinterest'];
  const activeOrder = config.socialsOrder && config.socialsOrder.length > 0
    ? config.socialsOrder
    : defaultOrder;

  const socialChannels = activeOrder
    .map(key => channelsMap[key])
    .filter(Boolean);

  return (
    <footer
      id="contact"
      className="bg-black dark:bg-[#030303] light:bg-[#f3f2eb] border-t border-neutral-200/50 dark:border-neutral-900 transition-colors duration-500 relative overflow-hidden font-sans"
    >
      {/* Background Soft Glow Orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full filter blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: currentAccent.glowHex }}></div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 relative z-10">
        
        {/* Core CTA Box card */}
        <div
          className="p-8 sm:p-12 md:p-16 rounded-3xl glass-panel text-center max-w-5xl mx-auto mb-20 border"
          style={{ borderColor: `${currentAccent.glowHex}25` }}
        >
          <span className="font-mono text-xs tracking-widest text-[#a1887f] uppercase block mb-3" style={{ color: currentAccent.glowHex }}>
            {currentLang === 'en' ? 'Get In Touch' : 'بوابة التواصل والتنسيق'}
          </span>
          
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase text-neutral-900 dark:text-white mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
            {currentLang === 'en' ? 'Ready to Start your Project?' : 'جاهز للمباشرة بمشروعك الإبداعي الجديد؟'}
          </h2>
          
          <p className="max-w-2xl mx-auto text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mb-12 text-sm sm:text-base">
            {currentLang === 'en'
              ? 'Connect directly through our formal quick channels or explore our verified social portfolios and aesthetic design boards.'
              : 'تواصل معنا مباشرة عبر قنوات الاتصال الرسمية السريعة لمعالجة العروض، أو تصفح معارضنا وحساباتنا الاجتماعية.'}
          </p>

          {/* PART 1: Direct Quick Communication Channels (WhatsApp & Email) */}
          <div className="mb-14">
            <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-500 mb-6 text-center font-bold">
              {currentLang === 'en' ? '— PART 1: DIRECT QUICK CHANNELS —' : '— القسم الأول: التواصل الفوري السريع —'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {directChannels.map((chan) => (
                <a
                  key={chan.name}
                  href={chan.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-100/40 dark:bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-sm group relative ${chan.color}`}
                >
                  <div className="p-3.5 rounded-full bg-neutral-200/50 dark:bg-neutral-950 border border-neutral-200 dark:border-white/5 mb-3 group-hover:scale-110 transition-transform">
                    {chan.icon}
                  </div>
                  <h4 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider text-neutral-800 dark:text-white mb-1.5">
                    {chan.name}
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {currentLang === 'en' ? chan.tagEn : chan.tagAr}
                  </span>

                  {/* Micro floating arrow decoration */}
                  <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-400">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* PART 2: Other Social Communities and Portfolio Streams (Behance, Instagram, Pinterest, Facebook, TikTok) */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-500 mb-6 text-center font-bold">
              {currentLang === 'en' ? '— PART 2: CREATIVE & SOCIAL ECOSYSTEM —' : '— القسم الثاني: الحسابات الإبداعية وملفاتنا الاجتماعية —'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {socialChannels.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-900 bg-neutral-100/30 dark:bg-black/30 backdrop-blur-md flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-sm group relative ${social.color}`}
                >
                  <div className="p-2.5 rounded-full bg-neutral-200/50 dark:bg-neutral-950 border border-neutral-200 dark:border-white/5 mb-2.5 group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-0.5">
                    {social.name}
                  </h4>
                  <span className="text-[9px] font-mono opacity-50 block">
                    {currentLang === 'en' ? social.tagEn : social.tagAr}
                  </span>

                  {/* Micro floating arrow decoration */}
                  <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neutral-400">
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Traditional Footer Base */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-neutral-200/30 dark:border-neutral-900 text-sm gap-6 mt-12">
          
          {/* Brand Copyright */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-400 text-center md:text-left">
            <Copyright className="w-3.5 h-3.5" />
            <span>{new Date().getFullYear()} {config.logoText}. {currentLang === 'en' ? 'All Architectural Visuals Guarded.' : 'جميع الحقوق البصرية محفوظة.'}</span>
          </div>

          {/* Mini jump navigation link rails */}
          <div className="flex gap-6 text-xs text-neutral-500 font-medium">
            <button onClick={() => handleScrollTop()} className="hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer transition-colors font-mono">
              [ {currentLang === 'en' ? 'BACK TO ASCENT' : 'العودة للأعلى'} ]
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
