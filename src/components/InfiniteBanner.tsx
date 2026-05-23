import { BRAND_KEYWORDS } from '../data';
import { Language, AppConfig } from '../types';

interface InfiniteBannerProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
}

export default function InfiniteBanner({ currentLang, config, accentColors }: InfiniteBannerProps) {
  const currentAccent = accentColors[config.themeColor];

  // We duplicate the keywords list to ensure it spans sufficiently for a seamless, continuous scroll
  const marqueeItems = [...BRAND_KEYWORDS, ...BRAND_KEYWORDS, ...BRAND_KEYWORDS, ...BRAND_KEYWORDS];

  return (
    <section
      className="py-6 sm:py-8 bg-neutral-900/40 dark:bg-[#070707] light:bg-[#eae6df] border-y border-neutral-200/50 dark:border-neutral-900 overflow-hidden relative"
      aria-label="Infinite brand scroll banner"
    >
      {/* Absolute left & right fading vignette overlays for cinematic gradient edge fading */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black dark:from-black light:from-[#fbfbf9] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black dark:from-black light:from-[#fbfbf9] to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max flex-nowrap shrink-0 overflow-hidden select-none">
        <div className="animate-infinite-scroll flex items-center gap-12 sm:gap-16 whitespace-nowrap">
          {marqueeItems.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center gap-4 sm:gap-6 font-display font-black text-xl sm:text-3xl tracking-widest text-[#a1887f] uppercase dark:text-neutral-500/30 font-display select-none transition-colors"
            >
              <span className="hover:text-amber-500 dark:hover:text-white transition-colors duration-300">
                {keyword}
              </span>
              <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: currentAccent.glowHex }}></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
