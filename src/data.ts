import { AppConfig, SkillItem, ServiceItem, TestimonialItem, StatItem } from './types';

export const INITIAL_CONFIG: AppConfig = {
  themeColor: 'brown',
  logoText: 'ZGC',
  heroTitleEn: 'Turning Ideas Into Visual Stories.',
  heroTitleAr: 'تحويل الأفكار إلى قصص بصرية ملموسة',
  heroSubtitleEn: 'We craft elite cinematic motion graphics, luxury brand identity & high-impact social media campaigns that command attention.',
  heroSubtitleAr: 'نحن نصمم أرقى الرسومات المتحركة السينمائية، والهويات البصرية الفاخرة، والحملات الإعلانية المؤثرة التي تجذب الانتباه.',
  taglineEn: 'ZGC — PREMIUM CINEMATIC AGENCY',
  taglineAr: 'ZGC — وكالة سينمائية رائدة ومميزة',
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  aboutTitleEn: 'The Architect of Modern Aesthetics',
  aboutTitleAr: 'مهندس الجماليات البصرية الحديثة',
  aboutTextEn: 'At ZGC Studio, we believe that design is not just about aesthetics—it is a powerful tool to tell visual stories, build deep credibility, and create long-lasting emotional connections. Guided by luxury minimal principles and a cinematic touch, we redefine online presence for creators, premium brands, and agencies worldwide.',
  aboutTextAr: 'في استوديو ZGC، نؤمن بأن التصميم ليس مجرد جماليات عادية — بل هو أداة قوية لرواية القصص البصرية، وبناء مصداقية عاطفية عميقة، وخلق روابط تدوم طويلاً. مسترشدين بمبادئ البساطة الفاخرة واللمسة السينمائية الراقية، نعيد تعريف الحضور الرقمي للمبدعين والشركات الكبرى.',
  philosophyEn: '“Simplicity is the ultimate sophistication. Every pixel must carry weight, intention, and elegant light.”',
  philosophyAr: '“البساطة هي ذروة الفخامة. كل بكسل يجب أن يحمل أهمية، نية واضحة، وإضاءة أنيقة.”',
  socials: {
    whatsapp: 'https://wa.me/201012345678',
    instagram: 'https://instagram.com/zgc.studio',
    behance: 'https://behance.net/zgc_studio',
    email: 'mailto:zgc.creator@gmail.com',
    tiktok: 'https://tiktok.com/@zgc.studio',
    facebook: 'https://facebook.com/zgc.studio',
    pinterest: 'https://pinterest.com/zgc_studio'
  },
  projects: [
    {
      id: 'proj-1',
      titleEn: 'KAF Specialty Cafe Identity',
      titleAr: 'الهوية البصرية لقهوة كاف المختصة',
      categoryEn: 'Cafe Campaigns',
      categoryAr: 'حملات المقاهي',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      descriptionEn: 'Luxury minimalist packaging design and cozy, cinematic social campaign layout leveraging natural sand colors and premium gold foil typography.',
      descriptionAr: 'تصميم العبوات البسيط والفاخر وتخطيط الحملات الاجتماعية السينمائية الدافئة مع استخدام ألوان الرمل الطبيعية والخطوط الذهبية الأنيقة.',
      likes: 124,
      comments: [
        { id: 'c1', user: 'Faisal Al-Otaibi', text: 'This design speaks luxury! Extremely clean.', timestamp: '2 mins ago' }
      ]
    },
    {
      id: 'proj-2',
      titleEn: 'Noir Premium Cosmetics Branding',
      titleAr: 'العلامة التجارية المستحضرات التجميل نوير',
      categoryEn: 'Branding',
      categoryAr: 'العلامات التجارية',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
      descriptionEn: 'High-end branding style system built on dark matte finishes, structured glass reflection mockups, and bold luxury editorial editorial structure.',
      descriptionAr: 'نظام تصميم متميز مبني على اللمسات النهائية الداكنة، والزجاج المنعكس المصقول، والتنظيم التحريري الجريء والفاخر.',
      likes: 98,
      comments: []
    },
    {
      id: 'proj-3',
      titleEn: 'Cyberpunk Motion Poster',
      titleAr: 'بوستر متحرك سايبربانك',
      categoryEn: 'Motion Graphics',
      categoryAr: 'رسوم متحركة جرافيكس',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41710-large.mp4',
      descriptionEn: 'Dynamic looped motion graphics element featuring interactive glass refractions, futuristic neon glow overlays, and heavy rhythmic beats.',
      descriptionAr: 'عنصر حركة جرافيك مستمر يتميز بانكسارات زجاجية تفاعلية وتراكبات نيون مستقبلية متوهجة وإيقاع بصري جذاب.',
      likes: 247,
      comments: [
        { id: 'c2', user: 'ZGC Fanatic', text: 'Stunning frame transition cycles. Super clean motion pacing.', timestamp: '1 hour ago' }
      ]
    },
    {
      id: 'proj-4',
      titleEn: 'The Obsidian Minimal Villa',
      titleAr: 'فيلا أوبسيديان البسيطة والحديثة',
      categoryEn: 'Real Estate Ads',
      categoryAr: 'إعلانات العقارات فريدة',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      descriptionEn: 'Cinematic layout for luxury real estate, utilizing structured negative spaces, soft cinematic shadows, and elegant typography to entice high-net-worth buyers.',
      descriptionAr: 'عرض سينمائي للعقارات الفاخرة، يعتمد على المساحات الفارغة المدروسة، والظلال الناعمة، والخطوط الفاخرة لجذب مشتري النخبة.',
      likes: 85,
      comments: []
    },
    {
      id: 'proj-5',
      titleEn: 'Amalfi Fine Dining Social Grid',
      titleAr: 'شبكة التواصل الاجتماعي لمطعم أمالفي',
      categoryEn: 'Restaurant Design',
      categoryAr: 'تصميم المطاعم المعاصرة',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      descriptionEn: 'Premium high-contrast social grid featuring deep olive greens, warm candlelight highlights, and exquisite culinary layout plates.',
      descriptionAr: 'ترتيب مميز لوسائل التواصل الاجتماعي يتميز باللون الأخضر الزيتوني والشموع الدافئة والأطباق الفاخرة.',
      likes: 110,
      comments: []
    },
    {
      id: 'proj-6',
      titleEn: 'Artisanal Clay Posters Series',
      titleAr: 'سلسلة الملصقات الفنية للفخار الطيني',
      categoryEn: 'Posters',
      categoryAr: 'الملصقات والبوسترات',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-spiral-of-colored-particles-revolving-around-34226-large.mp4',
      descriptionEn: 'A set of conceptual posters blending 3D liquid textures, warm lighting, and a neutral luxury Minimal palette.',
      descriptionAr: 'مجموعة من الملصقات المفاهيمية التي تمزج بين القوام السائل ثلاثي الأبعاد والضوء الدافئ والألوان الفاخرة المحايدة.',
      likes: 193,
      comments: []
    }
  ],
  bgMusicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  bgMusicTitle: 'ZGC Cinematic Dreamscape',
  bgMusicEnabled: false,
  skills: [
    { id: 'sk-1', name: 'Adobe Photoshop', level: 98, category: 'software', iconName: 'photoshop' },
    { id: 'sk-2', name: 'Adobe Illustrator', level: 95, category: 'software', iconName: 'illustrator' },
    { id: 'sk-3', name: 'Adobe Premiere Pro', level: 92, category: 'software', iconName: 'premiere' },
    { id: 'sk-4', name: 'Adobe After Effects', level: 90, category: 'software', iconName: 'aftereffects' },
    { id: 'sk-5', name: 'CapCut Premium', level: 96, category: 'software', iconName: 'capcut' },
    { id: 'sk-6', name: 'Branding & Identity', level: 95, category: 'creative', iconName: 'branding' },
    { id: 'sk-7', name: 'Social Media Design', level: 99, category: 'creative', iconName: 'social' },
    { id: 'sk-8', name: 'Motion Graphics', level: 93, category: 'creative', iconName: 'motion' }
  ],
  sectionOrder: ['hero', 'profile', 'skills', 'projects', 'services', 'stats', 'testimonials', 'contact']
};

export const SKILLS_ITEMS: SkillItem[] = [
  { name: 'Adobe Photoshop', level: 98, category: 'software', iconName: 'photoshop' },
  { name: 'Adobe Illustrator', level: 95, category: 'software', iconName: 'illustrator' },
  { name: 'Adobe Premiere Pro', level: 92, category: 'software', iconName: 'premiere' },
  { name: 'Adobe After Effects', level: 90, category: 'software', iconName: 'aftereffects' },
  { name: 'CapCut Premium', level: 96, category: 'software', iconName: 'capcut' },
  { name: 'Branding & Identity', level: 95, category: 'creative', iconName: 'branding' },
  { name: 'Social Media Design', level: 99, category: 'creative', iconName: 'social' },
  { name: 'Motion Graphics', level: 93, category: 'creative', iconName: 'motion' }
];

export const SERVICES_ITEMS: ServiceItem[] = [
  {
    id: 'ser-1',
    titleEn: 'Social Media Design',
    titleAr: 'تصميم وسائل التواصل الاجتماعي',
    descEn: 'High-end bespoke Instagram grids, Facebook templates, and cinematic carousels with strategic, attention-grabbing layouts.',
    descAr: 'شبكات إنستغرام مخصصة وراقية، قوالب فيسبوك، وبوستات دوارة سينمائية مع تصميم مدروس لجذب انتباه الجمهور.',
    iconName: 'LayoutGrid'
  },
  {
    id: 'ser-2',
    titleEn: 'Brand Identity Design',
    titleAr: 'تصميم الهوية التجارية الكاملة',
    descEn: 'Premium logotypes, bespoke typography rules, strict brand color systems, and modern luxury packaging.',
    descAr: 'لوغوهات متميزة، قواعد طباعة مخصصة، أنظمة ألوان صارمة للعلامة التجارية، وتغليف حديث ومبتكر.',
    iconName: 'Sparkles'
  },
  {
    id: 'ser-3',
    titleEn: 'Cinematic Poster Art',
    titleAr: 'ملصقات وبوسترات سينمائية',
    descEn: 'Bespoke high-contrast concept art, movie posters, events covers, and creative print materials with unique light direction.',
    descAr: 'فن مفاهيمي مخصص عالي التباين، وبوسترات أفلام، وأغطية فعاليات ومواد مطبوعة فريدة بتوجيه ضوئي خلاب.',
    iconName: 'Image'
  },
  {
    id: 'ser-4',
    titleEn: 'Motion Graphics & Video',
    titleAr: 'رسومات متحركة وتحرير فيديو',
    descEn: 'Premium commercial animations, luxury logo intros, dynamic Reels, and clean aesthetic TikTok advertisements.',
    descAr: 'رسوم متحركة تجارية راقية، إنتروهات فاخرة للشعار، فيديوهات ريلز ديناميكية، وإعلانات تيك توك بجمالية جذابة.',
    iconName: 'Play'
  },
  {
    id: 'ser-5',
    titleEn: 'Print & Editorial Design',
    titleAr: 'تصميم المطبوعات والكتالوجات والكتب',
    descEn: 'Elegant books layouts, luxury business cards, high-end cafe menus, and minimalist packaging mockups.',
    descAr: 'تخطيطات كتب أنيقة، بطاقات عمل فاخرة، قوائم طعام راقية للمقاهي، ونماذج تغليف مبسطة متناهية الصغر.',
    iconName: 'BookOpen'
  },
  {
    id: 'ser-6',
    titleEn: 'Marketing Visual Ads',
    titleAr: 'الإعلانات المرئية التسويقية',
    descEn: 'Optimized high-conversion social media ads, real estate campaign imagery, and localized seasonal greetings.',
    descAr: 'إعلانات وسائل التواصل الاجتماعي المحسّنة للغاية، وصور هادفة للحملات العقارية، والتبريكات الموسمية الموجهة.',
    iconName: 'TrendingUp'
  }
];

export const STATISTICS_ITEMS: StatItem[] = [
  { id: 'stat-1', value: '50+', numberValue: 50, labelEn: 'Completed Projects', labelAr: 'مشاريع مكتملة', suffixEn: '+', suffixAr: '+' },
  { id: 'stat-2', value: '20+', numberValue: 20, labelEn: 'Premium Clients', labelAr: 'عميل متميز', suffixEn: '+', suffixAr: '+' },
  { id: 'stat-3', value: '2M+', numberValue: 2, labelEn: 'Content Views', labelAr: 'مشاهدة للمحتوى', suffixEn: 'M+', suffixAr: 'مليون+' },
  { id: 'stat-4', value: '100%', numberValue: 100, labelEn: 'Creativity Guaranteed', labelAr: 'إبداع مضمون', suffixEn: '%', suffixAr: '%' }
];

export const TESTIMONIALS_ITEMS: TestimonialItem[] = [
  {
    id: 'test-1',
    nameEn: 'Karim Al-Masri',
    nameAr: 'كريم المصري',
    roleEn: 'Founder, KAF Cafe',
    roleAr: 'مؤسس قهوة كاف المختصة',
    textEn: 'ZGC Studio was a game-changer for our cafe brand. The attention to detail in our luxury minimal coffee packaging and digital campaigns elevated us above all local competitors. Absolute genius!',
    textAr: 'كان استوديو ZGC نقطة تحول لعلامة كاف التجارية للقهوة المختصة. الاهتمام الشديد بتفاصيل تغليف القهوة وتصميم الحملات الرقمية جعلنا نتفوق بشكل لافت على المنافسين.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    rating: 5
  },
  {
    id: 'test-2',
    nameEn: 'Sarah Westwood',
    nameAr: 'سارة ويستود',
    roleEn: 'Creative Director, Noir Luxury',
    roleAr: 'المدير الإبداعي لوكالة نوير للجمال',
    textEn: 'The absolute premium rendering, cinematic glow layouts, and outstanding motion posters were perfect. Zizo truly turns conceptual thoughts into unforgettable visual masterpieces.',
    textAr: 'كانت العروض ثلاثية الأبعاد، وتخطيطات الإضاءة السينمائية، والملصقات المتحركة الرائعة ممتازة للغاية. زيزو يحول الأفكار والمفاهيم البسيطة لروائع حقيقية لا تُنسى.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5
  },
  {
    id: 'test-3',
    nameEn: 'Abdulrahman Al-Farsi',
    nameAr: 'عبد الرحمن الفارسي',
    roleEn: 'CMO, Al-Farsi Real Estate',
    roleAr: 'مدير التسويق لمجموعة الفارسي للتطوير العقاري',
    textEn: 'The motion graphics ads for our luxury villa complex brought in high-quality leads in the first week. The premium color palette and Apple-like smoothness of the animations are phenomenal.',
    textAr: 'الحملة الإعلانية السينمائية المصممة لمجمع الفلل الفخمة جلبت لنا عملاء نخبويين في أول أسبوع. تناسق الألوان وسلاسة الأنيميشن الشبيهة بآبل كانت خارقة.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    rating: 5
  }
];

export const BRAND_KEYWORDS = [
  'ZGC STUDIO',
  'CREATIVE DESIGN',
  'PREMIUM VISUALS',
  'MOTION GRAPHICS',
  'BRANDING',
  'LUXURY MINIMAL',
  'CINEMATIC UI',
  'ZIZO GRAPHIC CREATIVE',
  'ARTISTIC INTEGRITY'
];

export const THEME_COLORS = {
  brown: {
    name: 'Warm Brown Accent',
    primary: 'from-[#3e2723] to-[#1a0e0b]',
    glow: 'rgba(93, 64, 55, 0.4)',
    glowHex: '#5d4037',
    border: 'border-[#5d4037]/30 hover:border-[#5d4037]/70',
    text: 'text-[#d7ccc8]',
    button: 'bg-[#5d4037] hover:bg-[#4e342e] text-[#fbe9e7]',
    highlight: 'text-[#a1887f]',
    badge: 'bg-[#3e2723]/60 text-[#d7ccc8] border-[#5d4037]/40',
  },
  gold: {
    name: 'Royal Gold Accent',
    primary: 'from-[#ffb300]/10 to-transparent',
    glow: 'rgba(212, 175, 55, 0.35)',
    glowHex: '#d4af37',
    border: 'border-[#d4af37]/30 hover:border-[#d4af37]/70',
    text: 'text-[#f3e5f5]',
    button: 'bg-[#b8860b] hover:bg-[#996515] text-[#f7f5f0]',
    highlight: 'text-[#d4af37]',
    badge: 'bg-[#d4af37]/15 text-[#d4af37] border-[#d4af37]/40',
  },
  emerald: {
    name: 'Luxury Emerald Accent',
    primary: 'from-[#065f46]/10 to-transparent',
    glow: 'rgba(16, 185, 129, 0.35)',
    glowHex: '#10b981',
    border: 'border-[#047857]/30 hover:border-[#34d399]/60',
    text: 'text-[#e6f4ea]',
    button: 'bg-[#047857] hover:bg-[#065f46] text-[#e6f4ea]',
    highlight: 'text-[#34d399]',
    badge: 'bg-[#047857]/15 text-[#34d399] border-[#047857]/40',
  },
  cyan: {
    name: 'Electric Cyan Accent',
    primary: 'from-[#0891b2]/10 to-transparent',
    glow: 'rgba(6, 182, 212, 0.35)',
    glowHex: '#06b6d4',
    border: 'border-[#0891b2]/30 hover:border-[#22d3ee]/60',
    text: 'text-[#e0f7fa]',
    button: 'bg-[#0891b2] hover:bg-[#0e7490] text-white',
    highlight: 'text-[#22d3ee]',
    badge: 'bg-[#0891b2]/15 text-[#22d3ee] border-[#0891b2]/40',
  },
  rose: {
    name: 'Deep Rose Accent',
    primary: 'from-[#9f1239]/10 to-transparent',
    glow: 'rgba(244, 63, 94, 0.35)',
    glowHex: '#f43f5e',
    border: 'border-[#be123c]/30 hover:border-[#fb7185]/60',
    text: 'text-[#fff1f2]',
    button: 'bg-[#be123c] hover:bg-[#9f1239] text-white',
    highlight: 'text-[#fb7185]',
    badge: 'bg-[#be123c]/15 text-[#fb7185] border-[#be123c]/40',
  }
};
