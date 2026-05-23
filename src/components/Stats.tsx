import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Language, AppConfig } from '../types';
import { STATISTICS_ITEMS } from '../data';

interface StatsProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
}

function StatCounter({ targetValue, duration = 2000, trigger }: { targetValue: number; duration?: number; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = targetValue;
    if (start === end) return;

    const totalMiliseconds = duration;
    // calculate step increment based on the number
    const increment = end / (totalMiliseconds / 16); 
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetValue, duration, trigger]);

  return <span>{count}</span>;
}

export default function Stats({ currentLang, config, accentColors }: StatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const currentAccent = accentColors[config.themeColor];

  return (
    <section
      id="stats"
      ref={ref}
      className="py-20 sm:py-24 bg-black dark:bg-[#050505] light:bg-[#fbfbf9] transition-colors duration-500 relative overflow-hidden border-y border-neutral-200/5 dark:border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATISTICS_ITEMS.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center p-6 rounded-2xl bg-white/[0.01] dark:bg-black/20 border border-neutral-200/30 dark:border-neutral-950 glow-card"
              style={{
                '--glow-color-rgba': currentAccent.glow,
                '--glow-border': currentAccent.glowHex,
              } as React.CSSProperties}
            >
              <div
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 dark:from-white dark:to-neutral-400 mb-2 font-mono flex items-center justify-center text-glow"
                style={{ '--glow-color': currentAccent.glow } as React.CSSProperties}
              >
                {/* Dynamically animate values */}
                <StatCounter targetValue={stat.numberValue} trigger={isInView} />
                <span className="text-[#a1887f]" style={{ color: currentAccent.glowHex }}>
                  {currentLang === 'en' ? stat.suffixEn : stat.suffixAr}
                </span>
              </div>

              <span className="font-sans text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
                {currentLang === 'en' ? stat.labelEn : stat.labelAr}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
