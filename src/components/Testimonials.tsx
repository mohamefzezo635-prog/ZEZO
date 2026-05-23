import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Heart } from 'lucide-react';
import { Language, AppConfig } from '../types';
import { TESTIMONIALS_ITEMS } from '../data';

interface TestimonialsProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
}

export default function Testimonials({ currentLang, config, accentColors }: TestimonialsProps) {
  
  const currentAccent = accentColors[config.themeColor];

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-black dark:bg-[#050505] light:bg-[#fbfbf9] transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background radial glowing light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-white/[0.01] to-transparent pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-widest text-[#a1887f] dark:text-amber-500/80 uppercase block mb-2" style={{ color: currentAccent.glowHex }}>
            {currentLang === 'en' ? '05 // Client Testaments' : '٠٥ // شهادات ورؤى العملاء الشركاء'}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-neutral-900 dark:text-white tracking-tight">
            {currentLang === 'en' ? 'Credibility Circles' : 'ماذا يقول شركاء النجاح عن تجربتهم'}
          </h2>
        </div>

        {/* Responsive Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(config.testimonials || TESTIMONIALS_ITEMS).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 pb-10 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-100/30 dark:bg-black/35 backdrop-blur-md relative overflow-hidden flex flex-col justify-between glow-card"
              style={{
                '--glow-color-rgba': currentAccent.glow,
                '--glow-border': currentAccent.glowHex,
              } as React.CSSProperties}
            >
              {/* Backing Quote Sign */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-neutral-200/[0.02] dark:text-white/[0.01] pointer-events-none" />

              <div>
                {/* Visual Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Primary testimonial quotation */}
                <p className="text-neutral-600 dark:text-neutral-300 font-light leading-relaxed text-sm italic mb-8">
                  &ldquo;{currentLang === 'en' ? item.textEn : item.textAr}&rdquo;
                </p>
              </div>

              {/* Client Profile details */}
              <div className="flex items-center gap-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
                <img
                  src={item.avatar}
                  alt={item.nameEn}
                  className="w-11 h-11 rounded-full object-cover border border-neutral-300 dark:border-neutral-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div>
                  <h4 className="font-display font-semibold text-sm text-neutral-800 dark:text-neutral-100 uppercase tracking-wide">
                    {currentLang === 'en' ? item.nameEn : item.nameAr}
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mt-0.5">
                    {currentLang === 'en' ? item.roleEn : item.roleAr}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
