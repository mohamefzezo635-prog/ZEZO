import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, Volume2, VolumeX, Lock, Unlock, KeyRound, Radio } from 'lucide-react';
import { Language, AppConfig } from '../types';

interface MusicPlayerProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
}

export default function MusicPlayer({ currentLang, config, accentColors }: MusicPlayerProps) {
  const audioUrl = config.bgMusicUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const audioTitle = config.bgMusicTitle || 'ZGC Cinematic Dreamscape';

  const [unlocked, setUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAccent = accentColors[config.themeColor || 'brown'];

  // Sync background audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
    } else {
      audioRef.current.src = audioUrl;
    }

    // Attempt autoplay if enabled and already unlocked
    if (isPlaying && unlocked) {
      audioRef.current.play().catch((err) => {
        console.log('Autoplay caught by browser policy, waiting for user action.', err);
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl]);

  // Handle Play / Pause change
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying && unlocked) {
      setLoadingAudio(true);
      audioRef.current.play()
        .then(() => setLoadingAudio(false))
        .catch(() => {
          setIsPlaying(false);
          setLoadingAudio(false);
        });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, unlocked]);

  // Handle Volume change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Check cached unlock state so returning users don't have to re-auth
  useEffect(() => {
    const isCached = localStorage.getItem('zgc_studio_music_unlocked') === 'true';
    if (isCached) {
      setUnlocked(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '2607') {
      setUnlocked(true);
      setShowPasswordModal(false);
      setPasswordError(false);
      localStorage.setItem('zgc_studio_music_unlocked', 'true');
      setIsPlaying(true); // Auto-start playing music once unlocked!
    } else {
      setPasswordError(true);
      setPasswordInput('');
      // Shake animation trigger can be standard style
    }
  };

  const handleResetLock = () => {
    setUnlocked(false);
    setIsPlaying(false);
    localStorage.removeItem('zgc_studio_music_unlocked');
  };

  return (
    <>
      {/* Dynamic Soundwave Anchor Widget */}
      <div className="fixed bottom-6 left-6 z-40 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex items-center gap-3 p-3 rounded-2xl bg-[#090909]/90 border border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden group"
          style={{
            boxShadow: isPlaying 
              ? `0 10px 30px -10px ${currentAccent.glowHex}40, 0 1px 1px 0 rgba(255,255,255,0.02) inset` 
              : 'none'
          }}
        >
          {/* Unlocked active player panel */}
          {unlocked ? (
            <div className="flex items-center gap-3">
              {/* Play / Pause toggle with subtle rotating glow */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-white/[0.03] hover:bg-white/[0.08] active:scale-95 border border-white/10"
                style={{
                  color: currentAccent.glowHex,
                  boxShadow: isPlaying ? `0 0 12px ${currentAccent.glowHex}30` : 'none'
                }}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-0.5" />}
              </button>

              {/* Soundtrack Status and Wave Visualizer */}
              <div className="flex flex-col max-w-[150px] sm:max-w-[200px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse text-green-500 shrink-0" />
                    {currentLang === 'en' ? 'SOUNDTRACK' : 'الخلفية الصوتية'}
                  </span>
                </div>
                <span className="text-xs font-medium text-white/95 truncate block">
                  {audioTitle}
                </span>

                {/* Simulated live audio spectrum wave */}
                <div className="h-3 flex items-end gap-[2px] mt-1.5 overflow-hidden">
                  {[...Array(14)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[2px] rounded-t bg-stone-500"
                      style={{ backgroundColor: currentAccent.glowHex }}
                      animate={isPlaying ? {
                        height: ['4px', '12px', '6px', '14px', '2px', '10px', '4px'][i % 7]
                      } : { height: '3px' }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.5 + (i % 5) * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Mute & Volume Bar Controls */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/5 py-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-neutral-400 hover:text-white transition-colors p-1 rounded-md"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  style={{ accentColor: currentAccent.glowHex }}
                />

                {/* Locker switch tab to relock */}
                <button
                  onClick={handleResetLock}
                  className="text-neutral-600 hover:text-neutral-400 p-1 rounded transition-colors"
                  title={currentLang === 'en' ? 'Lock Music Access' : 'قفل إعدادات الموسيقى'}
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            // Locked Launcher trigger mode
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2.5 px-3 py-1 bg-stone-950/40 rounded-xl hover:bg-stone-900/60 transition-all border border-stone-800 text-stone-300 hover:text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400 animate-pulse">
                <Music className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-left py-0.5">
                <div className="text-[9px] font-mono tracking-widest text-[#a1887f] font-bold flex items-center gap-1" style={{ color: currentAccent.glowHex }}>
                  <Lock className="w-3 h-3 text-[#a1887f]" style={{ color: currentAccent.glowHex }} />
                  {currentLang === 'en' ? 'MUSIC SECURED' : 'الموسيقى محمية'}
                </div>
                <div className="text-[11px] font-medium text-stone-400">
                  {currentLang === 'en' ? 'Click to Unlock (Code)' : 'انقر لفتح الصوت بالرمز'}
                </div>
              </div>
            </button>
          )}
        </motion.div>
      </div>

      {/* PASSWORD CHALLENGE MODAL DIALOG */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm rounded-3xl bg-neutral-950 border border-white/10 p-6 sm:p-7 text-white shadow-3xl text-center relative"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError(false);
                    setPasswordInput('');
                  }}
                  className="p-1 rounded-full hover:bg-stone-900 text-neutral-400 hover:text-white transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Locked Icon Badge */}
              <div className="mx-auto w-12 h-12 rounded-2xl bg-[#5d4037]/20 border border-[#5d4037]/40 flex items-center justify-center mb-4" style={{ backgroundColor: `${currentAccent.glowHex}20`, borderColor: currentAccent.glowHex }}>
                <KeyRound className="w-6 h-6 text-amber-500" style={{ color: currentAccent.glowHex }} />
              </div>

              <h3 className="font-display font-bold text-lg leading-tight uppercase tracking-wider text-stone-200">
                {currentLang === 'en' ? 'Enter Pass Code' : 'أدخل رمز المرور لفتح الصوت'}
              </h3>
              <p className="text-xs text-stone-500 font-mono mt-1">
                {currentLang === 'en' ? 'Requires master access passcode: 2607' : 'مطلوب الرمز السري الحصري: 2607'}
              </p>

              <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
                <input
                  type="password"
                  placeholder="••••"
                  autoFocus
                  required
                  className={`w-full bg-stone-900/60 border rounded-xl px-4 py-3 text-center text-xl font-bold tracking-[0.6em] text-white placeholder-stone-700 outline-none transition-all ${
                    passwordError 
                      ? 'border-red-600 ring-2 ring-red-600/20 animate-shake' 
                      : 'border-white/10 focus:border-stone-400 focus:bg-stone-900'
                  }`}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (passwordError) setPasswordError(false);
                  }}
                />

                {passwordError && (
                  <p className="text-xs text-red-400 font-bold block animate-pulse">
                    {currentLang === 'en' ? 'Incorrect code. Access Denied.' : 'الرمز المدخل غير صحيح! تم رفض الوصول.'}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase cursor-pointer text-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  style={{ backgroundColor: currentAccent.glowHex, color: '#fff' }}
                >
                  <Unlock className="w-4 h-4" />
                  <span>{currentLang === 'en' ? 'Authenticate System' : 'تأكيد الرمز السري'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// Simple helper local Close Icon component
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
