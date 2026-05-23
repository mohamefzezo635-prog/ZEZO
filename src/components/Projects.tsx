import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Eye, X, Play, Calendar, Tag, Heart, MessageSquare, Send, Film, ThumbsUp, User } from 'lucide-react';
import { Language, ProjectItem, AppConfig } from '../types';

interface ProjectsProps {
  currentLang: Language;
  config: AppConfig;
  accentColors: any;
  onSaveConfig: (newConfig: AppConfig) => void;
}

export default function Projects({ currentLang, config, accentColors, onSaveConfig }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Comments state
  const [commentUser, setCommentUser] = useState('');
  const [commentText, setCommentText] = useState('');

  const categoriesEn = [
    { id: 'all', label: 'All Projects' },
    { id: 'Cafe Campaigns', label: 'Cafe Campaigns' },
    { id: 'Branding', label: 'Branding' },
    { id: 'Motion Graphics', label: 'Motion Graphics' },
    { id: 'Real Estate Ads', label: 'Real Estate Ads' },
    { id: 'Restaurant Design', label: 'Restaurant Design' },
    { id: 'Posters', label: 'Posters' }
  ];

  const categoriesAr = [
    { id: 'all', label: 'جميع المشاريع' },
    { id: 'Cafe Campaigns', label: 'حملات المقاهي' },
    { id: 'Branding', label: 'العلامات التجارية' },
    { id: 'Motion Graphics', label: 'رسوم جرافيك متحركة' },
    { id: 'Real Estate Ads', label: 'إعلانات العقارات' },
    { id: 'Restaurant Design', label: 'تصاميم المطاعم' },
    { id: 'Posters', label: 'الملصقات والبوسترات' }
  ];

  const categories = currentLang === 'en' ? categoriesEn : categoriesAr;

  // Filter project items based on categories
  const filteredProjects = selectedCategory === 'all'
    ? config.projects
    : config.projects.filter(project => project.categoryEn === selectedCategory);

  const currentAccent = accentColors[config.themeColor];

  // Increase likes interactively
  const handleLikeProject = (e: React.MouseEvent, projId: string) => {
    e.stopPropagation(); // Avoid opening modal
    const updatedProjects = config.projects.map(p => {
      if (p.id === projId) {
        const nextLikes = (p.likes || 0) + 1;
        return { ...p, likes: nextLikes };
      }
      return p;
    });

    onSaveConfig({
      ...config,
      projects: updatedProjects
    });

    // If modal is currently showing the same project, sync it
    if (activeProject && activeProject.id === projId) {
      setActiveProject({
        ...activeProject,
        likes: (activeProject.likes || 0) + 1
      });
    }
  };

  // Submit project comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || !commentUser.trim() || !commentText.trim()) return;

    const newComment = {
      id: 'comment-' + Date.now(),
      user: commentUser.trim(),
      text: commentText.trim(),
      timestamp: currentLang === 'en' ? 'Just now' : 'الآن'
    };

    const updatedComments = [...(activeProject.comments || []), newComment];
    
    const updatedProjects = config.projects.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          comments: updatedComments
        };
      }
      return p;
    });

    onSaveConfig({
      ...config,
      projects: updatedProjects
    });

    // Sync active project state
    setActiveProject({
      ...activeProject,
      comments: updatedComments
    });

    // Reset writing text
    setCommentText('');
  };

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 bg-black dark:bg-[#050505] light:bg-[#fbfbf9] transition-colors duration-500 relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#a1887f] dark:text-amber-500/80 uppercase block mb-2" style={{ color: currentAccent.glowHex }}>
              {currentLang === 'en' ? '03 // Elite Showcase' : '٠٣ // معرض الأعمال الرقمية'}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-neutral-900 dark:text-white tracking-tight">
              {currentLang === 'en' ? 'Selected Labors' : 'المشاريع الإبداعية المختارة'}
            </h2>
          </div>

          {/* Minimal Quick Category Filter List */}
          <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-2 scrollbar-none">
            {categories.map((catString) => (
              <button
                key={catString.id}
                onClick={() => setSelectedCategory(catString.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === catString.id
                    ? `${currentAccent.button} scale-105 shadow-md`
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {catString.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Showcase Grid Layout with highly interactive 3D elements and floating badges */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                onClick={() => {
                  setActiveProject(project);
                  setCommentText('');
                }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-105 dark:bg-black/30 aspect-[4/3] shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                style={{
                  boxShadow: `0 0 0px transparent, inset 0 1px 1px 0 rgba(255,255,255,0.02)`
                }}
              >
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={project.image}
                    alt={project.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Subtle cinema dark filter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-all duration-300 z-10" />
                </div>

                {/* Video Indicator corner decoration */}
                {project.videoUrl && (
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[9px] font-mono font-bold tracking-wider text-amber-400">
                    <Film className="w-3 h-3 text-amber-400 animate-pulse" />
                    <span>VIDEO // MOTION</span>
                  </div>
                )}

                {/* Hover Showcase Details */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-7 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-mono text-[10px] sm:text-xs tracking-widest font-bold uppercase mb-1" style={{ color: currentAccent.glowHex }}>
                    {currentLang === 'en' ? project.categoryEn : project.categoryAr}
                  </span>
                  
                  <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-wider mb-2 group-hover:text-neutral-100">
                    {currentLang === 'en' ? project.titleEn : project.titleAr}
                  </h3>

                  {/* Summary of interaction stats */}
                  <div className="flex items-center gap-3.5 mt-2 pt-3 border-t border-white/10 opacity-60 group-hover:opacity-100 transition-opacity">
                    {/* Likes Action */}
                    <button
                      onClick={(e) => handleLikeProject(e, project.id)}
                      className="flex items-center gap-1.5 text-xs text-white hover:text-red-400 font-mono transition-colors"
                      title={currentLang === 'en' ? 'Click to Like' : 'انقر للإعجاب'}
                    >
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 scale-100 hover:scale-125 transition-transform" />
                      <span>{project.likes || 0}</span>
                    </button>

                    {/* Comments Indicator */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-300 font-mono">
                      <MessageSquare className="w-3.5 h-3.5 text-sky-400 fill-sky-450/10" />
                      <span>{project.comments?.length || 0}</span>
                    </div>

                    <div className="mr-auto ml-0 rtl:ml-auto rtl:mr-0 flex items-center gap-1 text-[11px] text-white/80">
                      <span>{currentLang === 'en' ? 'View' : 'تفاصيل'}</span>
                      <Eye className="w-3.5 h-3.5" style={{ color: currentAccent.glowHex }} />
                    </div>
                  </div>
                </div>

                {/* Ambient dynamic radial glow backdrops on hover */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(ellipse at bottom, ${currentAccent.glowHex}40, transparent 70%)`
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fallback space when empty */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 rounded-2xl border border-dashed border-neutral-850">
            <h3 className="text-lg font-bold text-neutral-400">
              {currentLang === 'en' ? 'No items found in this tier.' : 'لا توجد مشاريع مجهّزة في هذه الفئة حالياً.'}
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              {currentLang === 'en' ? 'Use the Creator Studio toggle in the corner to add elements!' : 'استخدم استوديو التعديل في الزاوية لإضافة مشاريع جديدة!'}
            </p>
          </div>
        )}
      </div>

      {/* IMMERSIVE LIGHTBOX MODAL WITH FULL VIDEOS, INTERACTIVE LIKES AND LIVE REAL-TIME COMMENTS */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            {/* Dark background dismiss space closer click */}
            <div className="absolute inset-0" onClick={() => setActiveProject(null)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 220, damping: 25 }}
              className="relative w-full max-w-5xl bg-neutral-950 border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] z-10"
            >
              {/* Corner Close trigger */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-30 bg-neutral-900/80 hover:bg-neutral-900 text-white p-2 rounded-full cursor-pointer transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* SECTION A: MEDIA ELEMENT DISPLAY (Standard Image OR Loop Video) */}
              <div className="w-full md:w-[55%] bg-black relative flex items-center justify-center min-h-[250px] md:min-h-0">
                {activeProject.videoUrl ? (
                  <div className="w-full h-full relative">
                    <video
                      key={activeProject.id}
                      src={activeProject.videoUrl}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      style={{ height: '100%' }}
                    />
                    <div className="absolute top-4 left-4 z-20 bg-amber-600 text-black font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                      Motion Video Experience
                    </div>
                  </div>
                ) : (
                  <img
                    src={activeProject.image}
                    alt={activeProject.titleEn}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                )}
              </div>

              {/* SECTION B: RICH COMMENTS & INFORMATION SEGMENT */}
              <div className="w-full md:w-[45%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#0b0b0a] border-l border-white/5 rtl:border-r rtl:border-l-0">
                
                {/* Information Header Block */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900 text-[10px] font-semibold text-neutral-300 uppercase tracking-wider">
                      <Tag className="w-3 h-3 text-neutral-400" />
                      {currentLang === 'en' ? activeProject.categoryEn : activeProject.categoryAr}
                    </span>

                    {activeProject.videoUrl && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-600/30 text-[9px] font-bold text-amber-500 font-mono tracking-widest uppercase flex items-center gap-1">
                        <Film className="w-3 h-3 text-amber-500 animate-pulse" />
                        {currentLang === 'en' ? 'Active video' : 'فيديو نشط'}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase tracking-wide text-white">
                    {currentLang === 'en' ? activeProject.titleEn : activeProject.titleAr}
                  </h3>

                  <p className="text-neutral-400 font-light leading-relaxed text-sm">
                    {currentLang === 'en' ? activeProject.descriptionEn : activeProject.descriptionAr}
                  </p>
                </div>

                {/* INTERACTIVE LIKE ACCENT PANEL */}
                <div className="py-4 border-t border-b border-white/5 my-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 font-mono uppercase block">{currentLang === 'en' ? 'Community Appraisal' : 'انطباع مجتمع التقييم'}</span>
                    <span className="text-lg font-bold text-neutral-200 mt-0.5 block">{activeProject.likes || 0} {currentLang === 'en' ? 'Likes' : 'إعجاب'}</span>
                  </div>

                  <button
                    onClick={(e) => handleLikeProject(e, activeProject.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-950/20 hover:bg-rose-950/50 border border-rose-500/25 rounded-2xl text-rose-400 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                    <span>{currentLang === 'en' ? 'Give Love' : 'إضافة إعجاب'}</span>
                  </button>
                </div>

                {/* LIVE DYNAMIC COMMENTS BOARD */}
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" style={{ color: currentAccent.glowHex }} />
                      <span>
                        {currentLang === 'en' ? 'Feedback Log' : 'سجل تعليقات وآراء الزوار'} ({activeProject.comments?.length || 0})
                      </span>
                    </h4>

                    {/* Comment items stream container */}
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 mb-4 scrollbar-thin">
                      {(!activeProject.comments || activeProject.comments.length === 0) ? (
                        <div className="text-center py-6 rounded-xl bg-neutral-900/30 border border-neutral-900 text-neutral-500 text-[11px] font-mono uppercase">
                          {currentLang === 'en' ? 'No remarks logged. Be the first!' : 'لا توجد تعليقات بعد. شارك رأيك الأول!'}
                        </div>
                      ) : (
                        activeProject.comments.map((comment) => (
                          <div key={comment.id} className="p-3 rounded-xl bg-stone-900/60 border border-white/5 space-y-1 text-xs">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="font-bold text-stone-300 flex items-center gap-1">
                                <User className="w-3 h-3 text-[#a1887f]" style={{ color: currentAccent.glowHex }} />
                                {comment.user}
                              </span>
                              <span className="text-stone-600 font-mono text-[9px]">{comment.timestamp}</span>
                            </div>
                            <p className="text-stone-400 font-light pl-4 rtl:pl-0 rtl:pr-4">{comment.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Comment submit form */}
                  <form onSubmit={handleAddComment} className="space-y-2.5 pt-3 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder={currentLang === 'en' ? 'Your Name' : 'اسمك الكريم'}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-lg p-2.5 text-white outline-none focus:border-neutral-600"
                        value={commentUser}
                        onChange={(e) => setCommentUser(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder={currentLang === 'en' ? 'Awesome design style!' : 'تعبير رائع عن الفن...'}
                        required
                        className="w-full bg-neutral-900 border border-neutral-800 text-xs rounded-lg p-2.5 text-white outline-none focus:border-neutral-600"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-neutral-100 hover:bg-white text-stone-950 font-bold rounded-lg text-xs uppercase cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <Send className="w-3 h-3" />
                      <span>{currentLang === 'en' ? 'File Feedback' : 'إرسال التعليق'}</span>
                    </button>
                  </form>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="w-full py-2.5 text-neutral-500 hover:text-white text-xs font-mono uppercase text-center transition-colors"
                  >
                    {currentLang === 'en' ? '[ Close Presentation ]' : '[ إغلاق شاشة العرض ]'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
