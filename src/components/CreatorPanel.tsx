import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Save, RefreshCw, Plus, Trash, CheckCircle2, Copy, Download, Layers, 
  Edit2, Music, Lock, Unlock, KeyRound, Bookmark, Facebook, Mail, MessageSquare, 
  Instagram, Film, Grid, Sparkles, Sliders, Upload, ChevronUp, ChevronDown, ListOrdered,
  Star, UserCheck
} from 'lucide-react';
import { Language, AppConfig, ProjectItem, SkillItem } from '../types';
import { SKILLS_ITEMS, TESTIMONIALS_ITEMS } from '../data';

interface CreatorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSaveConfig: (newConfig: AppConfig) => void;
  onReset: () => void;
  currentLang: Language;
  accentColors: any;
}

const PRESET_PORTRAITS = [
  { name: 'Cinematic Elegant', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { name: 'Minimal Creative', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Artistic Dual-Lighting', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Studio Silhouette', url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80' }
];

const PRESET_PROJECTS_IMAGES = [
  { name: 'Liquid 3D Fluid', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
  { name: 'Foil Packaging', url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Retro Light Lines', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Clean Modern Architecture', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fine Plated Food', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Specialty Coffee Craft', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' }
];

const PRESET_TRACKS = [
  { name: 'ZGC Cinematic Dreamscape', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Warm Lo-fi Coffee Shop', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { name: 'Tech Modern Synthwave', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];

export default function CreatorPanel({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onReset,
  currentLang,
  accentColors
}: CreatorPanelProps) {
  // Global password lock (2607) for whole settings
  const [panelUnlockPass, setPanelUnlockPass] = useState('');
  const [panelPassError, setPanelPassError] = useState(false);
  const [isPanelUnlocked, setIsPanelUnlocked] = useState(
    () => localStorage.getItem('zgc_panel_unlocked_master') === 'true'
  );

  const [activeTab, setActiveTab] = useState<'branding' | 'text' | 'projects' | 'skills' | 'music' | 'socials' | 'layout' | 'testimonials'>('branding');

  // Helper function to swap sections in live customizer
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const defaultSections = ['hero', 'profile', 'skills', 'projects', 'services', 'stats', 'testimonials', 'contact'];
    const currentOrder = [...(editedConfig.sectionOrder && editedConfig.sectionOrder.length > 0 ? editedConfig.sectionOrder : defaultSections)];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;
    
    // Swap items in order
    const temp = currentOrder[index];
    currentOrder[index] = currentOrder[targetIndex];
    currentOrder[targetIndex] = temp;
    
    handleUpdateField('sectionOrder', currentOrder);
    triggerTemporaryStatus();
  };

  const handleMoveSocialIcon = (index: number, direction: 'up' | 'down') => {
    const defaultSocials = ['instagram', 'facebook', 'behance', 'tiktok', 'pinterest'];
    const currentOrder = [...(editedConfig.socialsOrder && editedConfig.socialsOrder.length > 0 ? editedConfig.socialsOrder : defaultSocials)];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;
    
    const temp = currentOrder[index];
    currentOrder[index] = currentOrder[targetIndex];
    currentOrder[targetIndex] = temp;
    
    handleUpdateField('socialsOrder', currentOrder);
    triggerTemporaryStatus();
  };
  
  // Local editable states synchronized with parent configurations
  const [editedConfig, setEditedConfig] = useState<AppConfig>({ ...config });
  const [showStatus, setShowStatus] = useState(false);

  // Synchronize state when sidebar opens
  useEffect(() => {
    if (isOpen) {
      setEditedConfig({
        ...config,
        skills: config.skills && config.skills.length > 0 ? config.skills : [...SKILLS_ITEMS],
        testimonials: config.testimonials && config.testimonials.length > 0 ? config.testimonials : [...TESTIMONIALS_ITEMS],
        socialsOrder: config.socialsOrder && config.socialsOrder.length > 0 ? config.socialsOrder : ['instagram', 'facebook', 'behance', 'tiktok', 'pinterest']
      });
    }
  }, [isOpen, config]);

  // New/Edited Project forms
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [newProjTitleEn, setNewProjTitleEn] = useState('');
  const [newProjTitleAr, setNewProjTitleAr] = useState('');
  const [newProjCatEn, setNewProjCatEn] = useState('Branding');
  const [newProjCatAr, setNewProjCatAr] = useState('العلامات التجارية');
  const [newProjImage, setNewProjImage] = useState(PRESET_PROJECTS_IMAGES[0].url);
  const [newProjVideoUrl, setNewProjVideoUrl] = useState('');
  const [newProjDescEn, setNewProjDescEn] = useState('');
  const [newProjDescAr, setNewProjDescAr] = useState('');

  // Skills CMS form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(90);
  const [newSkillCategory, setNewSkillCategory] = useState<'software' | 'creative'>('software');
  const [newSkillIconName, setNewSkillIconName] = useState('photoshop');

  // Testimonial CMS states
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [newTestNameEn, setNewTestNameEn] = useState('');
  const [newTestNameAr, setNewTestNameAr] = useState('');
  const [newTestRoleEn, setNewTestRoleEn] = useState('');
  const [newTestRoleAr, setNewTestRoleAr] = useState('');
  const [newTestTextEn, setNewTestTextEn] = useState('');
  const [newTestTextAr, setNewTestTextAr] = useState('');
  const [newTestAvatar, setNewTestAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
  const [newTestRating, setNewTestRating] = useState(5);

  const currentAccent = accentColors[editedConfig.themeColor];

  const handleUpdateField = (key: keyof AppConfig, value: any) => {
    setEditedConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleUpdateSocial = (platform: string, value: string) => {
    setEditedConfig(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  // Submit master passcode (2607)
  const handleMasterUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (panelUnlockPass === '2607') {
      setIsPanelUnlocked(true);
      setPanelPassError(false);
      localStorage.setItem('zgc_panel_unlocked_master', 'true');
    } else {
      setPanelPassError(true);
      setPanelUnlockPass('');
    }
  };

  // Lock panel manually
  const handleLockPanel = () => {
    setIsPanelUnlocked(false);
    localStorage.removeItem('zgc_panel_unlocked_master');
  };

  // Start project editing
  const handleStartEditProject = (proj: ProjectItem) => {
    setEditingProjId(proj.id);
    setNewProjTitleEn(proj.titleEn);
    setNewProjTitleAr(proj.titleAr);
    setNewProjCatEn(proj.categoryEn);
    setNewProjCatAr(proj.categoryAr);
    setNewProjImage(proj.image);
    setNewProjVideoUrl(proj.videoUrl || '');
    setNewProjDescEn(proj.descriptionEn || '');
    setNewProjDescAr(proj.descriptionAr || '');
  };

  const handleUpdateProject = () => {
    if (!editingProjId) return;
    const updatedProjects = editedConfig.projects.map(proj => {
      if (proj.id === editingProjId) {
        return {
          ...proj,
          titleEn: newProjTitleEn,
          titleAr: newProjTitleAr,
          categoryEn: newProjCatEn,
          categoryAr: newProjCatAr,
          image: newProjImage,
          videoUrl: newProjVideoUrl ? newProjVideoUrl : undefined,
          descriptionEn: newProjDescEn || 'Bespoke design, crafted flawlessly with advanced color grids.',
          descriptionAr: newProjDescAr || 'تصميم مخصص مركب بامتياز مع نظم ألوان متقدمة.'
        };
      }
      return proj;
    });

    handleUpdateField('projects', updatedProjects);
    
    // Reset Form
    setEditingProjId(null);
    setNewProjTitleEn('');
    setNewProjTitleAr('');
    setNewProjVideoUrl('');
    setNewProjDescEn('');
    setNewProjDescAr('');
    triggerTemporaryStatus();
  };

  const handleCancelEditProject = () => {
    setEditingProjId(null);
    setNewProjTitleEn('');
    setNewProjTitleAr('');
    setNewProjVideoUrl('');
    setNewProjDescEn('');
    setNewProjDescAr('');
  };

  const handleAddProject = () => {
    if (!newProjTitleEn || !newProjTitleAr) {
      alert(currentLang === 'en' ? 'Please provide titles in both languages!' : 'الرجاء كتابة العناوين باللغتين معاً!');
      return;
    }

    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      titleEn: newProjTitleEn,
      titleAr: newProjTitleAr,
      categoryEn: newProjCatEn,
      categoryAr: newProjCatAr,
      image: newProjImage,
      videoUrl: newProjVideoUrl ? newProjVideoUrl : undefined,
      descriptionEn: newProjDescEn || 'Bespoke design, crafted flawlessly with advanced color grids.',
      descriptionAr: newProjDescAr || 'تصميم مخصص مركب بامتياز مع نظم ألوان متقدمة.',
      likes: 0,
      comments: []
    };

    const updatedProjects = [newItem, ...editedConfig.projects];
    handleUpdateField('projects', updatedProjects);

    // Reset Form
    setNewProjTitleEn('');
    setNewProjTitleAr('');
    setNewProjVideoUrl('');
    setNewProjDescEn('');
    setNewProjDescAr('');
    triggerTemporaryStatus();
  };

  const handleDeleteProject = (id: string) => {
    const updated = editedConfig.projects.filter(p => p.id !== id);
    handleUpdateField('projects', updated);
    triggerTemporaryStatus();
  };

  // SKILLS CMS ACTIONS
  const handleAddSkill = () => {
    if (!newSkillName.trim()) {
      alert(currentLang === 'en' ? 'Provide a skill name!' : 'برجاء تدوين اسم المهارة!');
      return;
    }

    const list = editedConfig.skills || [];
    const newSkill: SkillItem = {
      id: 'sk-' + Date.now(),
      name: newSkillName.trim(),
      level: Number(newSkillLevel),
      category: newSkillCategory,
      iconName: newSkillIconName
    };

    handleUpdateField('skills', [...list, newSkill]);
    setNewSkillName('');
    triggerTemporaryStatus();
  };

  const handleDeleteSkill = (id: string | undefined, index: number) => {
    const list = editedConfig.skills || [];
    const updated = id 
      ? list.filter(sk => sk.id !== id) 
      : list.filter((_, idx) => idx !== index);

    handleUpdateField('skills', updated);
    triggerTemporaryStatus();
  };

  const handleUpdateSkillLevel = (index: number, lvl: number) => {
    const list = [...(editedConfig.skills || [])];
    if (list[index]) {
      list[index].level = lvl;
      handleUpdateField('skills', list);
    }
  };

  // TESTIMONIALS CMS ACTIONS
  const handleAddOrUpdateTestimonial = () => {
    if (!newTestNameEn.trim() && !newTestNameAr.trim()) {
      alert(currentLang === 'en' ? 'Provide a client name!' : 'برجاء كتابة اسم العميل!');
      return;
    }

    const currentList = editedConfig.testimonials || [...TESTIMONIALS_ITEMS];

    if (editingTestId) {
      const updated = currentList.map(t => {
        if (t.id === editingTestId) {
          return {
            ...t,
            nameEn: newTestNameEn.trim() || t.nameEn,
            nameAr: newTestNameAr.trim() || t.nameAr,
            roleEn: newTestRoleEn.trim() || t.roleEn,
            roleAr: newTestRoleAr.trim() || t.roleAr,
            textEn: newTestTextEn.trim() || t.textEn,
            textAr: newTestTextAr.trim() || t.textAr,
            avatar: newTestAvatar,
            rating: Number(newTestRating)
          };
        }
        return t;
      });
      handleUpdateField('testimonials', updated);
      setEditingTestId(null);
    } else {
      const newItem = {
        id: 'test-' + Date.now(),
        nameEn: newTestNameEn.trim() || 'Custom Client',
        nameAr: newTestNameAr.trim() || 'عميل مخصص',
        roleEn: newTestRoleEn.trim() || 'Partner',
        roleAr: newTestRoleAr.trim() || 'شريك نجاح',
        textEn: newTestTextEn.trim() || 'Outstanding visual services!',
        textAr: newTestTextAr.trim() || 'خدمات بصرية متميزة جداً!',
        avatar: newTestAvatar,
        rating: Number(newTestRating)
      };
      handleUpdateField('testimonials', [...currentList, newItem]);
    }

    setNewTestNameEn('');
    setNewTestNameAr('');
    setNewTestRoleEn('');
    setNewTestRoleAr('');
    setNewTestTextEn('');
    setNewTestTextAr('');
    setNewTestAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
    setNewTestRating(5);
    triggerTemporaryStatus();
  };

  const handleEditTestimonial = (item: any) => {
    setEditingTestId(item.id);
    setNewTestNameEn(item.nameEn);
    setNewTestNameAr(item.nameAr);
    setNewTestRoleEn(item.roleEn);
    setNewTestRoleAr(item.roleAr);
    setNewTestTextEn(item.textEn);
    setNewTestTextAr(item.textAr);
    setNewTestAvatar(item.avatar);
    setNewTestRating(item.rating);
  };

  const handleDeleteTestimonial = (id: string) => {
    const list = editedConfig.testimonials || [...TESTIMONIALS_ITEMS];
    const updated = list.filter(t => t.id !== id);
    handleUpdateField('testimonials', updated);
    triggerTemporaryStatus();
  };

  const triggerTemporaryStatus = () => {
    setShowStatus(true);
    setTimeout(() => {
      setShowStatus(false);
    }, 2800);
  };

  const handleSaveAndSync = () => {
    onSaveConfig(editedConfig);
    triggerTemporaryStatus();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(editedConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'zgc-config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(editedConfig, null, 2));
    alert(currentLang === 'en' 
      ? 'Config JSON copied! Paste this in data.ts to make changes permanent.' 
      : 'تم نسخ ملف الإعدادات المخصصة بالكامل! يمكنك لصقه في ملف data.ts لحفظه بشكل نهائي.');
  };

  const handleShareLink = () => {
    const cleanShareUrl = `${window.location.origin}${window.location.pathname}?view=client`;
    navigator.clipboard.writeText(cleanShareUrl);
    alert(
      currentLang === 'en'
        ? 'Client Share Link copied to clipboard! The Creator Studio button will be completely hidden for guests opening this link.'
        : 'تم نسخ رابط المشاركة المخصص للعملاء! عند الضغط عليه، ستختفي أزرار استوديو التعديل وأيقونات الإعدادات تلقائياً ليظهر موقعك كعرض بورتفوليو فاخر بدون لوحة تحكم.'
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-45"
          />

          {/* Master Studio Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-stone-950 text-white z-50 shadow-2xl overflow-y-auto border-l border-white/5 flex flex-col justify-between font-sans"
          >
            {/* 1. Header segment */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" style={{ color: currentAccent?.glowHex }} />
                <div>
                  <h3 className="font-display font-black text-base uppercase tracking-wider text-white">
                    {currentLang === 'en' ? 'ZGC Creator Studio' : 'استوديو التعديل ZGC'}
                  </h3>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase">
                    {currentLang === 'en' ? 'Master Customizer Console' : 'منصة التحكم الكاملة للمالك'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isPanelUnlocked && (
                  <button
                    onClick={handleLockPanel}
                    className="p-1.5 rounded-full hover:bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title={currentLang === 'en' ? 'Lock panel' : 'إعادة قفل اللوحة'}
                  >
                    <Lock className="w-4 h-4 text-amber-500" />
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* SCREEN LOCK CONTROL FOR MASTER PASSWORD (2607) */}
            {!isPanelUnlocked ? (
              <div className="p-8 flex-1 flex flex-col items-center justify-center space-y-6 text-center bg-stone-950">
                <div className="w-14 h-14 rounded-2xl bg-amber-950/40 border border-amber-600/30 flex items-center justify-center text-amber-500">
                  <KeyRound className="w-7 h-7 animate-pulse" style={{ color: currentAccent?.glowHex }} />
                </div>
                
                <div className="space-y-2 max-w-sm">
                  <h4 className="font-display font-black text-lg uppercase tracking-wider text-white">
                    {currentLang === 'en' ? 'Console Locked' : 'النظام مغلق وبأمان'}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {currentLang === 'en' 
                      ? 'Accessing settings requires the credential. Enter password 2607 to adjust texts, skills, and music.' 
                      : 'التعديل ومراجعة المهارات والأعمال يتطلب تأكيد كود الحماية. أدخل الرقم السري 2607 للمتابعة.'}
                  </p>
                </div>

                <form onSubmit={handleMasterUnlockSubmit} className="space-y-3 w-full max-w-xs">
                  <input
                    type="password"
                    placeholder="••••"
                    required
                    maxLength={4}
                    className={`w-full bg-neutral-900 border ${
                      panelPassError ? 'border-red-500 ring-2 ring-red-500/20' : 'border-neutral-800'
                    } rounded-xl px-4 py-3 text-center font-bold tracking-[0.5em] text-white outline-none focus:border-neutral-500 text-lg`}
                    value={panelUnlockPass}
                    onChange={(e) => {
                      setPanelUnlockPass(e.target.value);
                      if (panelPassError) setPanelPassError(false);
                    }}
                  />
                  
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-neutral-100 hover:bg-white text-stone-950 font-bold rounded-xl text-xs uppercase cursor-pointer tracking-widest transition-all active:scale-95"
                  >
                    {currentLang === 'en' ? 'Unlock Control Console' : 'تأكيد وفتح لوحة التحكم'}
                  </button>
                </form>

                {panelPassError && (
                  <span className="text-xs text-red-500 font-mono">
                    {currentLang === 'en' ? 'Error: Access Code Denied.' : 'خطأ: الرقم السري غير صحيح.'}
                  </span>
                )}
              </div>
            ) : (
              <>
                {/* 2. Success Status toast sync indicator */}
                {showStatus && (
                  <div className="mx-6 mt-4 p-3 rounded-xl bg-green-950/30 border border-green-500/30 text-green-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <span>
                      {currentLang === 'en'
                        ? 'Studio synced! Preview contains current changes.'
                        : 'تمت مزامنة التغييرات وعرضها على الموقع فوراً!'}
                    </span>
                  </div>
                )}

                {/* 3. Tab headers container layout */}
                <div className="px-6 pt-4 flex gap-2 border-b border-white/5 bg-stone-950 overflow-x-auto scrollbar-none">
                  {(['branding', 'text', 'projects', 'skills', 'music', 'socials', 'layout', 'testimonials'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors shrink-0 ${
                        activeTab === tab
                          ? 'border-white text-white'
                          : 'border-transparent text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {currentLang === 'en' ? (tab === 'layout' ? 'Layout Order' : tab) : {
                        branding: 'الهوية والتوهج',
                        text: 'تعديل النصوص',
                        projects: 'المشاريع',
                        skills: 'المهارات',
                        music: 'الموسيقى',
                        socials: 'التواصل',
                        layout: 'ترتيب الأقسام',
                        testimonials: 'أراء العملاء'
                      }[tab]}
                    </button>
                  ))}
                </div>

                {/* 4. Interactive tab layout contents */}
                <div className="p-6 flex-1 space-y-8 overflow-y-auto bg-stone-900/40">
                  
                  {/* TAB 1: BRANDING & ACCENTS */}
                  {activeTab === 'branding' && (
                    <div className="space-y-6">
                      {/* Brand accents */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                          {currentLang === 'en' ? 'Color Accent Themes' : 'اختر السمة اللونية للتوهج'}
                        </label>
                        <div className="flex gap-3">
                          {Object.entries(accentColors).map(([key, item]: [string, any]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => handleUpdateField('themeColor', key as any)}
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                editedConfig.themeColor === key
                                  ? 'scale-110 ring-2 ring-white border-2 border-stone-950'
                                  : 'hover:scale-105'
                              }`}
                              style={{ backgroundColor: item.glowHex }}
                              title={item.name}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Brand static logo */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-neutral-400 uppercase block">
                          {currentLang === 'en' ? 'Site Trademark Logo Text' : 'اسم الموقع (شعار الكتابة)'}
                        </label>
                        <input
                          type="text"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white outline-none focus:border-neutral-600"
                          value={editedConfig.logoText}
                          onChange={(e) => handleUpdateField('logoText', e.target.value)}
                        />
                      </div>

                      {/* Photo Portrait customization */}
                      <div className="space-y-3 border-t border-white/5 pt-5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-mono text-neutral-400 uppercase block">
                            {currentLang === 'en' ? 'Studio Avatar Portrait' : 'الصورة الشخصية للبروفايل'}
                          </label>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {currentLang === 'en' ? 'Upload or paste link' : 'ارفع ملف أو ضَع رابط'}
                          </span>
                        </div>

                        <div className="flex gap-4 items-center bg-stone-950 p-3 rounded-xl border border-white/5">
                          <img
                            src={editedConfig.profileImage}
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 bg-neutral-900"
                            referrerPolicy="no-referrer"
                            alt="Avatar Preview"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <input
                              type="text"
                              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white outline-none focus:border-neutral-600 font-mono truncate"
                              placeholder={currentLang === 'en' ? 'Paste image URL...' : 'رابط مباشر...'}
                              value={editedConfig.profileImage}
                              onChange={(e) => handleUpdateField('profileImage', e.target.value)}
                            />
                            
                            {/* File Upload Trigger */}
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-[10px] font-mono font-bold cursor-pointer transition-colors border border-neutral-700">
                              <Upload className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                              <span>{currentLang === 'en' ? 'Upload Local Image' : 'اضغط لرفع صورة من جهازك'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      if (typeof reader.result === 'string') {
                                        handleUpdateField('profileImage', reader.result);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-neutral-500 block">
                            {currentLang === 'en' ? 'Or pick premium portfolio bases:' : 'أو اختر صوراً سينمائية جاهزة:'}
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {PRESET_PORTRAITS.map((p) => (
                              <button
                                key={p.name}
                                type="button"
                                onClick={() => handleUpdateField('profileImage', p.url)}
                                className="bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-[10px] hover:border-neutral-700 cursor-pointer flex gap-1.5 items-center min-w-0"
                              >
                                <img src={p.url} className="w-5 h-5 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                                <span className="truncate text-left text-neutral-400 hover:text-white">{p.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: RICH DYNAMIC TEXT CMS */}
                  {activeTab === 'text' && (
                    <div className="space-y-6">
                      {/* Hero Taglines */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block">Hero Tagline (EN)</span>
                          <input
                            type="text"
                            className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white"
                            value={editedConfig.taglineEn}
                            onChange={(e) => handleUpdateField('taglineEn', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-[10px] font-mono text-neutral-400 block">العنوان الصغير (AR)</span>
                          <input
                            type="text"
                            dir="rtl"
                            className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white"
                            value={editedConfig.taglineAr}
                            onChange={(e) => handleUpdateField('taglineAr', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Main Titles */}
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block">Main Title (EN)</span>
                          <input
                            type="text"
                            className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white"
                            value={editedConfig.heroTitleEn}
                            onChange={(e) => handleUpdateField('heroTitleEn', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block text-right">العنوان الرئيسي للموقع (AR)</span>
                          <input
                            type="text"
                            dir="rtl"
                            className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white"
                            value={editedConfig.heroTitleAr}
                            onChange={(e) => handleUpdateField('heroTitleAr', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Introduction descriptions */}
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block">Intro Subtitle (EN)</span>
                          <textarea
                            className="w-full h-16 bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white resize-none"
                            value={editedConfig.heroSubtitleEn}
                            onChange={(e) => handleUpdateField('heroSubtitleEn', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block text-right">الوصف الترحيبي (AR)</span>
                          <textarea
                            dir="rtl"
                            className="w-full h-16 bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white resize-none"
                            value={editedConfig.heroSubtitleAr}
                            onChange={(e) => handleUpdateField('heroSubtitleAr', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* About Title & About Main text */}
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-neutral-400 block font-bold">About Section Title En</span>
                            <input
                              type="text"
                              className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white"
                              value={editedConfig.aboutTitleEn}
                              onChange={(e) => handleUpdateField('aboutTitleEn', e.target.value)}
                            />
                          </div>
                          <div className="space-y-1 text-right">
                            <span className="text-[10px] font-mono text-neutral-400 block font-bold">عنوان جزء من أنا Ar</span>
                            <input
                              type="text"
                              dir="rtl"
                              className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white"
                              value={editedConfig.aboutTitleAr}
                              onChange={(e) => handleUpdateField('aboutTitleAr', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block">About Paragraph Story (EN)</span>
                          <textarea
                            className="w-full h-20 bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                            value={editedConfig.aboutTextEn}
                            onChange={(e) => handleUpdateField('aboutTextEn', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block text-right">موضوع من أنا بالفلسفة البصرية (AR)</span>
                          <textarea
                            dir="rtl"
                            className="w-full h-20 bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                            value={editedConfig.aboutTextAr}
                            onChange={(e) => handleUpdateField('aboutTextAr', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Philosophy Quote */}
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block">Philosophy Block (EN)</span>
                          <input
                            type="text"
                            className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white"
                            value={editedConfig.philosophyEn}
                            onChange={(e) => handleUpdateField('philosophyEn', e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block text-right">مقولتي وفلسفتي المأثورة (AR)</span>
                          <input
                            type="text"
                            dir="rtl"
                            className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white"
                            value={editedConfig.philosophyAr}
                            onChange={(e) => handleUpdateField('philosophyAr', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PROJECTS DYNAMIC CMS WITH MULTI-MODAL VIDEOS SUPPORT */}
                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                      {/* Projects CMS form */}
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 space-y-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5">
                          {editingProjId ? (
                            <>
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>{currentLang === 'en' ? 'Edit Showcase Video/Image' : 'تعديل هذا المشروع وتفعيله للفيديوهات'}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 text-green-500" />
                              <span className="text-green-550">{currentLang === 'en' ? 'Add Video or Image Project' : 'إضافة فيديو أو صورة لمشروع جديد'}</span>
                            </>
                          )}
                        </h4>

                        {/* Joint text fields */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500">Project Title (EN)</span>
                            <input
                              type="text"
                              className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                              value={newProjTitleEn}
                              onChange={(e) => setNewProjTitleEn(e.target.value)}
                              placeholder="e.g. Noir Motion Poster"
                            />
                          </div>
                          <div className="space-y-1 text-right">
                            <span className="text-[9px] font-mono text-neutral-500">عنوان المشروع (AR)</span>
                            <input
                              type="text"
                              dir="rtl"
                              className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                              value={newProjTitleAr}
                              onChange={(e) => setNewProjTitleAr(e.target.value)}
                              placeholder="مثال: بوستر نوير السينمائي"
                            />
                          </div>
                        </div>

                        {/* Interactive Project categories selection mapping */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500">Tier Category EN</span>
                            <select
                              className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                              value={newProjCatEn}
                              onChange={(e) => {
                                setNewProjCatEn(e.target.value);
                                const mapping: any = {
                                  'Cafe Campaigns': 'حملات المقاهي',
                                  'Branding': 'العلامات التجارية',
                                  'Motion Graphics': 'رسوم جرافيك متحركة',
                                  'Real Estate Ads': 'إعلانات العقارات',
                                  'Restaurant Design': 'تصاميم المطاعم',
                                  'Posters': 'الملصقات والبوسترات'
                                };
                                setNewProjCatAr(mapping[e.target.value] || 'العلامات التجارية');
                              }}
                            >
                              <option value="Cafe Campaigns">Cafe Campaigns</option>
                              <option value="Branding">Branding</option>
                              <option value="Motion Graphics">Motion Graphics</option>
                              <option value="Real Estate Ads">Real Estate Ads</option>
                              <option value="Restaurant Design">Restaurant Design</option>
                              <option value="Posters">Posters</option>
                            </select>
                          </div>
                          <div className="space-y-1 text-right">
                            <span className="text-[9px] font-mono text-neutral-500">الفئة بالعربية AR (تلقائي)</span>
                            <input
                              type="text"
                              dir="rtl"
                              readOnly
                              className="w-full bg-neutral-900/60 border border-neutral-850 rounded-lg p-2 text-xs text-neutral-400 cursor-not-allowed"
                              value={newProjCatAr}
                            />
                          </div>
                        </div>

                        {/* Frame Image url plus presets */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-neutral-500 block">Poster Backdrop Image Link</span>
                          <input
                            type="text"
                            className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white font-mono"
                            value={newProjImage}
                            onChange={(e) => setNewProjImage(e.target.value)}
                          />
                          <div className="grid grid-cols-6 gap-1 pt-1 opacity-70 hover:opacity-100 transition-opacity">
                            {PRESET_PROJECTS_IMAGES.map((img) => (
                              <button
                                key={img.name}
                                type="button"
                                onClick={() => setNewProjImage(img.url)}
                                className={`p-0.5 rounded border ${
                                  newProjImage === img.url ? 'border-amber-500' : 'border-neutral-850 hover:border-neutral-700'
                                }`}
                              >
                                <img src={img.url} className="w-full h-5 object-cover rounded" referrerPolicy="no-referrer" />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* VIDEO STREAMS INPUT LINK - DYNAMIC IMPLEMENTATION */}
                        <div className="space-y-1.5 border-t border-white/5 pt-3">
                          <span className="text-[9px] font-mono text-amber-400 block font-bold uppercase tracking-wider flex items-center gap-1">
                            <Film className="w-3.5 h-3.5" />
                            {currentLang === 'en' ? 'Direct MP4 Video Stream Link (Optional)' : 'رابط فيديو MP4 مباشر للتشغيل السريع (اختياري)'}
                          </span>
                          <input
                            type="text"
                            className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white font-mono"
                            placeholder="e.g. https://assets.mixkit.co/videos/...mp4"
                            value={newProjVideoUrl}
                            onChange={(e) => setNewProjVideoUrl(e.target.value)}
                          />
                          <span className="text-[9px] text-neutral-500 block">
                            {currentLang === 'en' 
                              ? 'If provided, a premium responsive video player allows loops in detail modal!' 
                              : 'في حال إضافته، سيتم استخدام مشغل فيديو تفاعلي بمؤثرات سينمائية عند النقر على المشروع.'}
                          </span>
                        </div>

                        {/* Description labels */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-neutral-500">Eng Description</span>
                          <input
                            type="text"
                            className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                            value={newProjDescEn}
                            onChange={(e) => setNewProjDescEn(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-[9px] font-mono text-neutral-500">تفاصيل السرد الجرافي AR</span>
                          <input
                            type="text"
                            dir="rtl"
                            className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                            value={newProjDescAr}
                            onChange={(e) => setNewProjDescAr(e.target.value)}
                          />
                        </div>

                        {/* Interactive edit actions buttons */}
                        {editingProjId ? (
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <button
                              type="button"
                              onClick={handleUpdateProject}
                              className="py-2 bg-amber-600 hover:bg-amber-500 font-bold rounded-lg text-xs uppercase cursor-pointer text-white flex items-center justify-center gap-1.5"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>{currentLang === 'en' ? 'Apply changes' : 'تطبيق وحفظ التعديل'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEditProject}
                              className="py-2 bg-neutral-800 hover:bg-neutral-750 font-bold rounded-lg text-xs uppercase cursor-pointer text-neutral-400"
                            >
                              {currentLang === 'en' ? 'Cancel' : 'إلغاء'}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleAddProject}
                            className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 font-bold rounded-lg text-xs uppercase cursor-pointer text-white flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{currentLang === 'en' ? 'Inject project to grid' : 'إدراج هذا المشروع للموقع'}</span>
                          </button>
                        )}
                      </div>

                      {/* Display projects management stream */}
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
                          {currentLang === 'en' ? 'Review & Edit Showcase' : 'قائمة المشاريع الحالية'}
                        </label>

                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                          {editedConfig.projects.map((proj) => (
                            <div
                              key={proj.id}
                              className={`p-3 rounded-xl border flex justify-between items-center gap-3 text-xs transition-colors ${
                                editingProjId === proj.id 
                                  ? 'bg-amber-950/20 border-amber-500/50' 
                                  : 'bg-neutral-950 border-neutral-900 hover:border-neutral-800'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <img src={proj.image} className="w-8 h-8 rounded object-cover shrink-0" referrerPolicy="no-referrer" />
                                <div className="truncate">
                                  <h5 className="font-bold truncate text-neutral-200">
                                    {currentLang === 'en' ? proj.titleEn : proj.titleAr}
                                  </h5>
                                  <span className="font-mono text-[9px] text-[#a1887f] uppercase font-bold flex items-center gap-1">
                                    {proj.videoUrl && <Film className="w-2.5 h-2.5 text-amber-500" />}
                                    {proj.categoryEn}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleStartEditProject(proj)}
                                  className="text-neutral-400 hover:text-white hover:bg-neutral-900 p-1.5 rounded-full cursor-pointer transition-colors"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProject(proj.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-950/20 p-1.5 rounded-full cursor-pointer transition-colors"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: NEW CORE DYNAMIC SKILLS CMS CAPABILITY */}
                  {activeTab === 'skills' && (
                    <div className="space-y-6">
                      {/* Add new Skill widgets Form */}
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 space-y-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-amber-500" />
                          <span>{currentLang === 'en' ? 'Add Creative or Tech Skill' : 'إضافة مهارة أو أداة جديدة'}</span>
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500">Skill Name (En/Ar)</span>
                            <input
                              type="text"
                              className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                              value={newSkillName}
                              onChange={(e) => setNewSkillName(e.target.value)}
                              placeholder="e.g. Adobe After Effects"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500">Type / Category</span>
                            <select
                              className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                              value={newSkillCategory}
                              onChange={(e) => setNewSkillCategory(e.target.value as any)}
                            >
                              <option value="software">Productivity Software (برجيات)</option>
                              <option value="creative">Artistic Domain (تخصص فني)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500">Skill Icon Representation</span>
                            <select
                              className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2 text-xs text-white"
                              value={newSkillIconName}
                              onChange={(e) => setNewSkillIconName(e.target.value)}
                            >
                              <option value="photoshop">Photoshop (Image)</option>
                              <option value="illustrator">Illustrator (Pen Tool)</option>
                              <option value="premiere">Premiere Pro (Video)</option>
                              <option value="aftereffects">After Effects (Sliders)</option>
                              <option value="capcut">CapCut Pro (Play)</option>
                              <option value="branding">Branding (Palette)</option>
                              <option value="social">Social Graphics (Zap)</option>
                              <option value="motion">Motion Art (External Link)</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] font-mono text-neutral-500">Proficiency</span>
                              <span className="text-[9px] font-mono text-amber-500 font-bold">{newSkillLevel}%</span>
                            </div>
                            <input
                              type="range"
                              min={1}
                              max={100}
                              className="w-full accent-amber-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer mt-3"
                              value={newSkillLevel}
                              onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 font-bold rounded-lg text-xs uppercase cursor-pointer text-white flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{currentLang === 'en' ? 'Add skill' : 'إضافة المهارة للمجموعة'}</span>
                        </button>
                      </div>

                      {/* Display current skills to edit / delete */}
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                          {currentLang === 'en' ? 'Manage Configured Skills' : 'مراجعة المهارات والنسب الفنية'}
                        </span>

                        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                          {(!editedConfig.skills || editedConfig.skills.length === 0) ? (
                            <span className="text-[10px] text-neutral-500 block text-center py-4 font-mono">No Skills logged.</span>
                          ) : (
                            editedConfig.skills.map((sk, idx) => (
                              <div key={sk.name + '-' + idx} className="p-3 bg-neutral-950 border border-neutral-950 hover:border-neutral-850 rounded-xl flex items-center justify-between gap-4 text-xs">
                                <div className="flex-1 truncate">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-neutral-200 truncate pr-1">
                                      {sk.name} <span className="text-[8px] opacity-40 uppercase font-mono">({sk.category})</span>
                                    </span>
                                    <span className="text-[10px] font-mono text-[#a1887f] font-bold shrink-0">{sk.level}%</span>
                                  </div>

                                  {/* Fast adjustable level line */}
                                  <input
                                    type="range"
                                    min={1}
                                    max={100}
                                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-ew-resize accent-stone-300"
                                    value={sk.level}
                                    onChange={(e) => handleUpdateSkillLevel(idx, Number(e.target.value))}
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteSkill(sk.id, idx)}
                                  className="p-2 text-red-400 hover:bg-red-950/20 rounded-lg cursor-pointer shrink-0 transition-colors"
                                  title="Remove"
                                >
                                  <Trash className="w-4 h-4" />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: AUDIO SOUNDS MANAGER */}
                  {activeTab === 'music' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 border border-neutral-900">
                        <div className="flex items-center gap-2">
                          <Music className="w-4 h-4 text-amber-500 animate-pulse" />
                          <div>
                            <span className="text-xs font-bold block">
                              {currentLang === 'en' ? 'Cinematic Intro Music' : 'تفعيل تشغيل الموسيقى بالموقع'}
                            </span>
                            <span className="text-[9px] font-mono text-neutral-500">
                              {currentLang === 'en' ? 'Allow background soundtrack stream' : 'التحكم باللحن التلقائي في الخلفية'}
                            </span>
                          </div>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editedConfig.bgMusicEnabled ?? false}
                            onChange={(e) => handleUpdateField('bgMusicEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600 peer-checked:after:bg-white" />
                        </label>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Audio MP3 Direct URL Link</span>
                        <input
                          type="text"
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-3 text-xs text-white text-left font-mono outline-none"
                          value={editedConfig.bgMusicUrl || ''}
                          onChange={(e) => handleUpdateField('bgMusicUrl', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Track Title label</span>
                        <input
                          type="text"
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-3 text-xs text-white"
                          value={editedConfig.bgMusicTitle || ''}
                          onChange={(e) => handleUpdateField('bgMusicTitle', e.target.value)}
                        />
                      </div>

                      {/* Tracks presets shortcuts */}
                      <div className="space-y-2 pt-4 border-t border-white/5">
                        <span className="text-[10px] font-mono text-neutral-500 block">Or select presets audio streams:</span>
                        <div className="space-y-2">
                          {PRESET_TRACKS.map((track) => (
                            <button
                              key={track.name}
                              type="button"
                              onClick={() => {
                                handleUpdateField('bgMusicUrl', track.url);
                                handleUpdateField('bgMusicTitle', track.name);
                              }}
                              className={`w-full p-3 rounded-lg border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                editedConfig.bgMusicUrl === track.url
                                  ? 'bg-amber-950/20 border-amber-500/50'
                                  : 'bg-neutral-950 border-neutral-900 hover:border-neutral-800'
                              }`}
                            >
                              <span className="truncate pr-1 text-neutral-300">{track.name}</span>
                              <span className="text-[9px] font-mono text-neutral-500 shrink-0">Select</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: SOCIAL NETWORKS AND ALL ICON LINKS */}
                  {activeTab === 'socials' && (
                    <div className="space-y-5">
                      <div className="p-1 px-3 rounded-xl bg-amber-950/20 border border-amber-600/20 text-xs text-amber-400 flex items-center gap-2">
                        <Grid className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>
                          {currentLang === 'en' 
                            ? 'Adjust direct links below to align with Part 1 & Part 2 Contact segments!' 
                            : 'قم بتحديث الروابط أدناه لتتم مزامنتها مع القسم الأول والثاني في اتصل بنا!'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-green-500" />
                          <span>WhatsApp Direct chat (e.g. https://wa.me/...)</span>
                        </span>
                        <input
                          type="text"
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white font-mono"
                          value={editedConfig.socials.whatsapp}
                          onChange={(e) => handleUpdateSocial('whatsapp', e.target.value)}
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-amber-500" />
                          <span>Official Email address (mailto:)</span>
                        </span>
                        <input
                          type="text"
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white font-mono"
                          value={editedConfig.socials.email}
                          onChange={(e) => handleUpdateSocial('email', e.target.value)}
                        />
                      </div>

                      <div className="space-y-1 border-t border-white/5 pt-4">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                          <Instagram className="w-3.5 h-3.5 text-pink-500" />
                          <span>Instagram URL</span>
                        </span>
                        <input
                          type="text"
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white font-mono"
                          value={editedConfig.socials.instagram}
                          onChange={(e) => handleUpdateSocial('instagram', e.target.value)}
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                          <Facebook className="w-3.5 h-3.5 text-blue-500" />
                          <span>Facebook URL (New)</span>
                        </span>
                        <input
                          type="text"
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white font-mono"
                          value={editedConfig.socials.facebook || ''}
                          onChange={(e) => handleUpdateSocial('facebook', e.target.value)}
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-sky-400" />
                          <span>Behance Portfolio URL</span>
                        </span>
                        <input
                          type="text"
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white font-mono"
                          value={editedConfig.socials.behance}
                          onChange={(e) => handleUpdateSocial('behance', e.target.value)}
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                          <Film className="w-3.5 h-3.5 text-stone-300" />
                          <span>TikTok Channel URL</span>
                        </span>
                        <input
                          type="text"
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white font-mono"
                          value={editedConfig.socials.tiktok}
                          onChange={(e) => handleUpdateSocial('tiktok', e.target.value)}
                        />
                      </div>

                      <div className="space-y-1 font-sans">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                          <Bookmark className="w-3.5 h-3.5 text-red-500" />
                          <span>Pinterest Board URL (New)</span>
                        </span>
                        <input
                          type="text"
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2.5 text-xs text-white font-mono"
                          value={editedConfig.socials.pinterest || ''}
                          onChange={(e) => handleUpdateSocial('pinterest', e.target.value)}
                        />
                      </div>

                      {/* Visual ordering of social media icons */}
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                          {currentLang === 'en' ? 'Rearrange Social Accounts Display Icon Order' : 'التحكم في ترتيب أيقونات حسابات التواصل الاجتماعي'}
                        </span>
                        
                        <div className="space-y-1.5 font-sans">
                          {(editedConfig.socialsOrder && editedConfig.socialsOrder.length > 0
                            ? editedConfig.socialsOrder
                            : ['instagram', 'facebook', 'behance', 'tiktok', 'pinterest']
                          ).map((socialKey, index, arr) => {
                            const nameMap: Record<string, { en: string; ar: string }> = {
                              instagram: { en: 'Instagram Media', ar: 'إنستجرام' },
                              facebook: { en: 'Facebook Page', ar: 'فيسبوك' },
                              behance: { en: 'Behance Workspace', ar: 'بيهانس' },
                              tiktok: { en: 'TikTok Stream', ar: 'تيك توك' },
                              pinterest: { en: 'Pinterest Board', ar: 'بنترست' }
                            };
                            const meta = nameMap[socialKey] || { en: socialKey, ar: socialKey };
                            return (
                              <div
                                key={socialKey}
                                className="p-3 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-between gap-3"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="font-mono text-xs text-amber-500 font-bold bg-neutral-900 border border-neutral-800 rounded-lg w-5 h-5 flex items-center justify-center shrink-0">
                                    {index + 1}
                                  </span>
                                  <div>
                                    <span className="text-xs text-neutral-200 font-bold block">
                                      {currentLang === 'en' ? meta.en : meta.ar}
                                    </span>
                                    <span className="text-[9px] font-mono text-neutral-500 uppercase">
                                      {socialKey.toUpperCase()}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex gap-1 shrink-0">
                                  <button
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => handleMoveSocialIcon(index, 'up')}
                                    className={`p-1 rounded-lg border transition-colors ${
                                      index === 0 
                                        ? 'bg-neutral-950/30 border-neutral-900 text-neutral-700 cursor-not-allowed'
                                        : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700 text-neutral-300 hover:text-white cursor-pointer active:scale-95'
                                    }`}
                                  >
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    type="button"
                                    disabled={index === arr.length - 1}
                                    onClick={() => handleMoveSocialIcon(index, 'down')}
                                    className={`p-1 rounded-lg border transition-colors ${
                                      index === arr.length - 1 
                                        ? 'bg-neutral-950/30 border-neutral-900 text-neutral-700 cursor-not-allowed'
                                        : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700 text-neutral-300 hover:text-white cursor-pointer active:scale-95'
                                    }`}
                                  >
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 7: HOMEPAGE SECTIONS LAYOUT ARRANGEMENT CMS */}
                  {activeTab === 'layout' && (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-600/20 text-xs text-amber-400 flex items-center gap-2 mb-2">
                        <ListOrdered className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>
                          {currentLang === 'en' 
                            ? 'Incorporate custom ordering hierarchies here! Change lists visually to arrange parts of the page.' 
                            : 'تحكم في ترتيب ظهور الأقسام على الصفحة الرئيسية بضغطة زر عن طريق الأسهم!'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {(editedConfig.sectionOrder && editedConfig.sectionOrder.length > 0 
                          ? editedConfig.sectionOrder 
                          : ['hero', 'profile', 'skills', 'projects', 'services', 'stats', 'testimonials', 'contact']
                        ).map((sectionId, index, arr) => {
                          const nameMap: Record<string, { en: string; ar: string }> = {
                            hero: { en: 'Interactive Hero Stage', ar: 'شاشة الترحيب والبداية' },
                            profile: { en: 'About Me & Portrait Card', ar: 'عني وبطاقة الهوية الفنية' },
                            skills: { en: 'Technical & Creative Skills', ar: 'المهارات الفنية والأدوات' },
                            projects: { en: 'Projects Portfolio Showcase', ar: 'معرض الأعمال والمشاريع المميزة' },
                            services: { en: 'Offered Creative Services', ar: 'الخدمات الإبداعية المقدمة' },
                            stats: { en: 'Achievements & High Scores', ar: 'الأرقام والإنجازات القياسية' },
                            testimonials: { en: 'Client Endorsements & Reviews', ar: 'آراء وشهادات العملاء النخبة' },
                            contact: { en: 'Contact Channels & Footer', ar: 'قنوات التواصل السريعة وذيل الصفحة' }
                          };
                          
                          const meta = nameMap[sectionId] || { en: sectionId, ar: sectionId };

                          return (
                            <motion.div
                              layout
                              key={sectionId}
                              className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-850 hover:border-neutral-750 flex items-center justify-between transition-all group duration-350"
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-amber-500 font-bold text-xs bg-neutral-900 border border-neutral-850 rounded-lg w-7 h-7 flex items-center justify-center shrink-0">
                                  {index + 1}
                                </span>
                                <div>
                                  <span className="text-xs text-neutral-200 font-bold block">
                                    {currentLang === 'en' ? meta.en : meta.ar}
                                  </span>
                                  <span className="text-[9px] font-mono text-neutral-500 uppercase">
                                    {sectionId.toUpperCase()} KEY
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-1.5 shrink-0">
                                {/* Move Up Button */}
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => handleMoveSection(index, 'up')}
                                  className={`p-1.5 rounded-lg border transition-colors ${
                                    index === 0 
                                      ? 'bg-neutral-950/30 border-neutral-900 text-neutral-700 cursor-not-allowed'
                                      : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700 text-neutral-300 hover:text-white cursor-pointer active:scale-95'
                                  }`}
                                >
                                  <ChevronUp className="w-4 h-4" />
                                </button>

                                {/* Move Down Button */}
                                <button
                                  type="button"
                                  disabled={index === arr.length - 1}
                                  onClick={() => handleMoveSection(index, 'down')}
                                  className={`p-1.5 rounded-lg border transition-colors ${
                                    index === arr.length - 1 
                                      ? 'bg-neutral-950/30 border-neutral-900 text-neutral-700 cursor-not-allowed'
                                      : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700 text-neutral-300 hover:text-white cursor-pointer active:scale-95'
                                  }`}
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 8: CUSTOMIZABLE TESTIMONIALS CMS (WITH LOCAL IMAGE UPLOAD FILE READER) */}
                  {activeTab === 'testimonials' && (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 space-y-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-amber-500" />
                          <span>
                            {editingTestId 
                              ? (currentLang === 'en' ? 'Edit Testimonial' : 'تعديل رأي العميل المختار') 
                              : (currentLang === 'en' ? 'Add Client Testimonial' : 'إضافة رأي عميل جديد')}
                          </span>
                        </h4>

                        {/* Localized Name Inputs */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-neutral-400 block">Client Name (EN)</span>
                            <input
                              type="text"
                              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-neutral-600"
                              value={newTestNameEn}
                              onChange={(e) => setNewTestNameEn(e.target.value)}
                              placeholder="e.g. Aly Al-Habash"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-neutral-400 block">اسم العميل (عربي)</span>
                            <input
                              type="text"
                              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white text-right outline-none focus:border-neutral-600"
                              value={newTestNameAr}
                              onChange={(e) => setNewTestNameAr(e.target.value)}
                              placeholder="مثال: علي الحبش"
                            />
                          </div>
                        </div>

                        {/* Localized Role Inputs */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-neutral-400 block">Position/Company (EN)</span>
                            <input
                              type="text"
                              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-neutral-600"
                              value={newTestRoleEn}
                              onChange={(e) => setNewTestRoleEn(e.target.value)}
                              placeholder="e.g. CEO, Habash Studio"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-neutral-400 block">المنصب/الشركة (عربي)</span>
                            <input
                              type="text"
                              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-xs text-white text-right outline-none focus:border-neutral-600"
                              value={newTestRoleAr}
                              onChange={(e) => setNewTestRoleAr(e.target.value)}
                              placeholder="مثال: رئيس مجلس إدارة استوديو الحبش"
                            />
                          </div>
                        </div>

                        {/* Rating Stars Selection */}
                        <div className="space-y-2 pt-1">
                          <span className="text-[10px] font-mono text-neutral-400 block">
                            {currentLang === 'en' ? 'Client Star Rating (1-5)' : 'تقييم النجوم (من ١ إلى ٥)'}
                          </span>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((starVal) => (
                              <button
                                key={starVal}
                                type="button"
                                onClick={() => setNewTestRating(starVal)}
                                className={`p-1 px-3 rounded-lg border transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
                                  newTestRating >= starVal 
                                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' 
                                    : 'bg-neutral-950 border-neutral-850 text-neutral-600 hover:text-neutral-400'
                                }`}
                              >
                                <Star className={`w-3.5 h-3.5 ${newTestRating >= starVal ? 'fill-amber-400' : ''}`} />
                                <span className="font-mono text-[10px]">{starVal}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Client Avatar Direct Input & Upload */}
                        <div className="space-y-2 pt-1">
                          <span className="text-[10px] font-mono text-neutral-400 block">
                            {currentLang === 'en' ? 'Client Photo (Direct URL or Local Upload File)' : 'صورة العميل الشخصية (رابط مباشر أو ارفع ملف)'}
                          </span>
                          <div className="flex gap-4 items-center bg-stone-900/60 p-3 rounded-xl border border-white/5">
                            <img
                              src={newTestAvatar}
                              className="w-12 h-12 rounded-full object-cover border border-white/10 bg-neutral-900 shrink-0"
                              referrerPolicy="no-referrer"
                              alt="Client Preview"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                              }}
                            />
                            <div className="flex-1 space-y-1.5 min-w-0">
                              <input
                                type="text"
                                className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-white font-mono outline-none focus:border-neutral-700 truncate"
                                placeholder={currentLang === 'en' ? 'Direct photo link...' : 'رابط مباشر لصورة العميل...'}
                                value={newTestAvatar}
                                onChange={(e) => setNewTestAvatar(e.target.value)}
                              />
                              <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-[10px] font-mono font-bold cursor-pointer transition-colors border border-neutral-700">
                                <Upload className="w-3.5 h-3.5 text-amber-500" />
                                <span>{currentLang === 'en' ? 'Upload Client Photo' : 'تحميل صورة من جهازك'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        if (typeof reader.result === 'string') {
                                          setNewTestAvatar(reader.result);
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Testimonial Quote Texts */}
                        <div className="space-y-3 pt-1">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-neutral-400 block">Feedback / Quote (EN)</span>
                            <textarea
                              rows={3}
                              className="w-full bg-neutral-900 border border-neutral-805 rounded-lg p-2 text-xs text-white resize-none outline-none focus:border-neutral-600"
                              placeholder="Amazing, the design was highly cinematic..."
                              value={newTestTextEn}
                              onChange={(e) => setNewTestTextEn(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-neutral-400 block">كلام العميل والشهادة (عربي)</span>
                            <textarea
                              rows={3}
                              className="w-full bg-neutral-900 border border-neutral-805 rounded-lg p-2 text-xs text-white text-right resize-none outline-none focus:border-neutral-600"
                              placeholder="كانت التجربة استثنائية جداً والتصاميم غاية في الرقي..."
                              value={newTestTextAr}
                              onChange={(e) => setNewTestTextAr(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 justify-end pt-2 border-t border-white/5">
                          {editingTestId && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingTestId(null);
                                setNewTestNameEn('');
                                setNewTestNameAr('');
                                setNewTestRoleEn('');
                                setNewTestRoleAr('');
                                setNewTestTextEn('');
                                setNewTestTextAr('');
                                setNewTestAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
                                setNewTestRating(5);
                              }}
                              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                            >
                              {currentLang === 'en' ? 'Cancel' : 'إلغاء'}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={handleAddOrUpdateTestimonial}
                            className="px-5 py-2 hover:opacity-90 rounded-xl text-xs text-black font-bold bg-amber-500 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>
                              {editingTestId 
                                ? (currentLang === 'en' ? 'Update Testimonial' : 'تحديث البيانات') 
                                : (currentLang === 'en' ? 'Add Testimonial' : 'إضافة الشهادة للقسم')}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Listing testimonials */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                          {currentLang === 'en' ? 'Active Reviews List' : 'قائمة الآراء النشطة في الموقع'}
                        </span>

                        <div className="space-y-2">
                          {(editedConfig.testimonials || [...TESTIMONIALS_ITEMS]).map((item) => (
                            <div
                              key={item.id}
                              className="p-3 bg-neutral-950/80 border border-neutral-850 rounded-xl flex items-center justify-between gap-3 group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={item.avatar}
                                  className="w-10 h-10 rounded-full object-cover border border-white/10 bg-neutral-900 shrink-0"
                                  referrerPolicy="no-referrer"
                                  alt="Avatar"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                                  }}
                                />
                                <div className="min-w-0">
                                  <span className="text-xs text-white font-bold block truncate">
                                    {currentLang === 'en' ? item.nameEn : item.nameAr}
                                  </span>
                                  <span className="text-[10px] font-mono text-neutral-400 block truncate">
                                    {currentLang === 'en' ? item.roleEn : item.roleAr}
                                  </span>
                                  <div className="flex gap-0.5 mt-0.5">
                                    {[...Array(item.rating)].map((_, sIdx) => (
                                      <Star key={sIdx} className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleEditTestimonial(item)}
                                  className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white cursor-pointer transition-colors active:scale-95"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTestimonial(item.id)}
                                  className="p-1.5 rounded-lg bg-red-950/20 border border-red-900/40 hover:border-red-600 text-red-400 hover:text-red-300 cursor-pointer transition-colors active:scale-95"
                                  title="Delete"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* 5. Custom panel actions bottom Segment */}
                <div className="p-6 border-t border-white/5 bg-stone-950 space-y-4">
                  {/* Share link for Clients */}
                  <button
                    type="button"
                    onClick={handleShareLink}
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all text-black bg-amber-500 hover:bg-amber-400 active:scale-95 border-b-2 border-amber-600"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{currentLang === 'en' ? 'Copy Client Shareable Link' : 'نسخ رابط البورتفوليو مخصص للعملاء'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleSaveAndSync}
                      className="py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-all text-white bg-green-700 hover:bg-green-600 active:scale-95"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{currentLang === 'en' ? 'Sync Live Changes' : 'حفظ ومزامنة التغييرات'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={onReset}
                      className="py-3 rounded-xl font-semibold border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{currentLang === 'en' ? 'Factory Settings' : 'الهوية الاصلية'}</span>
                    </button>
                  </div>

                  {/* Code backup helper actions */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <span className="text-[9px] font-mono text-neutral-500 block uppercase tracking-wider text-center">
                      {currentLang === 'en' ? 'Backup / Export layout blueprint config' : 'نسخ احتياطي وتصدير هيكلية المخطط بالكامل'}
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold">
                      <button
                        type="button"
                        onClick={handleDownloadJSON}
                        className="py-2.5 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-750 hover:bg-neutral-850 text-neutral-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3 h-3 text-[#a1887f]" style={{ color: currentAccent?.glowHex }} />
                        <span>Download JSON</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyConfig}
                        className="py-2.5 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-750 hover:bg-neutral-850 text-neutral-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-3 h-3 text-[#a1887f]" style={{ color: currentAccent?.glowHex }} />
                        <span>Copy Code Config</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
