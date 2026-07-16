import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Sparkles,
  Flame,
  BookOpen,
  Bookmark,
  TrendingUp,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  RotateCcw,
  PlusCircle,
  Wifi,
  WifiOff,
  Github,
  Search,
  SlidersHorizontal,
  X,
  User,
  Sliders,
  Award,
  Filter,
  CheckCircle2
} from 'lucide-react';

import { Article, SubjectCategory, SubjectPreferences, StudyStats } from './types';
import { RecommendationEngine } from './utils/recommendation';
import { fetchWikiArticle } from './utils/wikiApi';
import FeedCard from './components/FeedCard';
import SubjectFilter from './components/SubjectFilter';
import StatsPanel from './components/StatsPanel';
import DatasetInfo from './components/DatasetInfo';

type TabType = 'feed' | 'stats' | 'bookmarks' | 'pipeline';

export default function App() {
  // Initialize Recommendation Engine
  const engineRef = useRef<RecommendationEngine | null>(null);
  if (!engineRef.current) {
    engineRef.current = new RecommendationEngine();
  }
  const engine = engineRef.current;

  // React states mirrored from local storage database
  const [preferences, setPreferences] = useState<SubjectPreferences>(() => engine.getPreferences());
  const [stats, setStats] = useState<StudyStats>(() => engine.getStats());
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => engine.getBookmarks());
  const [customCount, setCustomCount] = useState<number>(() => engine.getCustomArticles().length);

  // Layout and Feed States
  const [feedArticles, setFeedArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [feedFilter, setFeedFilter] = useState<'for-you' | 'latest'>('for-you');
  const [isFetchingWiki, setIsFetchingWiki] = useState(false);
  const isFetchingRef = useRef(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Custom states for Twitter/X layout enhancements
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Theme state ('light' | 'dark') - default to dark as requested by user
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('doomschooler_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Dark is default
  });

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Theme effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('doomschooler_theme', theme);
  }, [theme]);

  // Initial feed load (get first batch of recommended articles)
  useEffect(() => {
    const initialBatch = engine.getNextBatch(5);
    setFeedArticles(initialBatch);
  }, []);

  // Force scroll event listener for infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (activeTab !== 'feed') return;
      
      const threshold = 350; // px from bottom
      const totalHeight = document.documentElement.offsetHeight;
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;

      if (totalHeight - scrollPosition < threshold && !isFetchingWiki) {
        appendMoreArticles();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [feedArticles, activeTab, isFetchingWiki]);

  // Helper: Append more articles (mix of local recommended and dynamic Wiki fetch)
  const appendMoreArticles = async () => {
    if (isFetchingWiki || isFetchingRef.current) return;
    isFetchingRef.current = true;
    
    // Get list of currently loaded article IDs to prevent immediate duplicates
    const loadedIds = new Set([
      ...feedArticles.map((a) => a.id),
      ...engine.getCustomArticles().map((a) => a.id)
    ]);

    // Get next recommended batch from offline pool
    const nextLocalBatch = engine.getNextBatch(4, loadedIds);

    // If online, attempt to fetch a fresh academic article from Simple Wikipedia
    if (isOnline) {
      setIsFetchingWiki(true);
      try {
        // Pick a highly weighted active category to query
        const activeCategories = (Object.keys(preferences) as SubjectCategory[]).filter(
          (cat) => !preferences[cat].excluded
        );
        const targetCategory = activeCategories.length > 0
          ? activeCategories[Math.floor(Math.random() * activeCategories.length)]
          : 'Physics';

        // Update loadedIds to include the newly recommended offline batch
        nextLocalBatch.forEach((a) => loadedIds.add(a.id));

        const wikiArticle = await fetchWikiArticle(targetCategory, loadedIds);
        
        // Cache in local storage under custom articles
        engine.addCustomArticle(wikiArticle);
        setCustomCount(engine.getCustomArticles().length);

        // Append both local recommended and the newly fetched wiki article
        setFeedArticles((prev) => {
          const combined = [...prev, ...nextLocalBatch, wikiArticle];
          const unique: Article[] = [];
          const seen = new Set<string>();
          combined.forEach((art) => {
            if (!seen.has(art.id)) {
              seen.add(art.id);
              unique.push(art);
            }
          });
          return unique;
        });
      } catch (err) {
        console.warn('Fallback to local offline articles on wiki fetch error:', err);
        setFeedArticles((prev) => {
          const combined = [...prev, ...nextLocalBatch];
          const unique: Article[] = [];
          const seen = new Set<string>();
          combined.forEach((art) => {
            if (!seen.has(art.id)) {
              seen.add(art.id);
              unique.push(art);
            }
          });
          return unique;
        });
      } finally {
        setIsFetchingWiki(false);
        isFetchingRef.current = false;
      }
    } else {
      setFeedArticles((prev) => {
        const combined = [...prev, ...nextLocalBatch];
        const unique: Article[] = [];
        const seen = new Set<string>();
        combined.forEach((art) => {
          if (!seen.has(art.id)) {
            seen.add(art.id);
            unique.push(art);
          }
        });
        return unique;
      });
      isFetchingRef.current = false;
    }
  };

  // Callback: Log interactions to recommendation engine and refresh states
  const handleInteraction = (
    articleId: string,
    category: SubjectCategory,
    action: {
      expanded?: boolean;
      bookmarked?: boolean;
      liked?: boolean;
      disliked?: boolean;
      lingerTimeMs?: number;
      quizSolved?: boolean;
      quizCorrect?: boolean;
    }
  ) => {
    engine.logInteraction({
      articleId,
      category,
      expanded: action.expanded ?? false,
      bookmarked: action.bookmarked ?? false,
      liked: action.liked ?? false,
      disliked: action.disliked ?? false,
      lingerTimeMs: action.lingerTimeMs ?? 0,
      quizSolved: action.quizSolved,
      quizCorrect: action.quizCorrect,
    });

    // Sync state triggers for UI
    setPreferences({ ...engine.getPreferences() });
    setStats({ ...engine.getStats() });
  };

  // Callback: Solve a card quiz
  const handleQuizSolved = (articleId: string, category: SubjectCategory, correct: boolean) => {
    engine.logQuizAttempt(articleId, category, correct);
    setStats({ ...engine.getStats() });
  };

  // Callback: Bookmark action
  const handleToggleBookmark = (articleId: string) => {
    engine.toggleBookmark(articleId);
    setBookmarks(new Set(engine.getBookmarks()));
  };

  // Callback: Pin subject manually
  const handleTogglePin = (category: SubjectCategory) => {
    engine.toggleCategoryPin(category);
    setPreferences({ ...engine.getPreferences() });
  };

  // Callback: Exclude subject manually
  const handleToggleExclude = (category: SubjectCategory) => {
    engine.toggleCategoryExclude(category);
    setPreferences({ ...engine.getPreferences() });
  };

  // Callback: Reset dynamic curriculum weights
  const handleResetPreferences = () => {
    engine.resetAllPreferences();
    setPreferences({ ...engine.getPreferences() });
    setFeedArticles(engine.getNextBatch(5));
  };

  // Callback: Clear custom imported articles
  const handleClearCustomArticles = () => {
    engine.resetAllStats();
    setPreferences({ ...engine.getPreferences() });
    setStats({ ...engine.getStats() });
    setBookmarks(new Set());
    setCustomCount(0);
    setFeedArticles(engine.getNextBatch(5));
  };

  // Callback: Custom JSON Article Importer
  const handleImportArticles = (articles: Article[]) => {
    articles.forEach((art) => engine.addCustomArticle(art));
    setCustomCount(engine.getCustomArticles().length);
    setFeedArticles((prev) => [...articles, ...prev]);
  };

  // Bookmark articles list filtered for viewing
  const bookmarkedArticlesList = useMemo(() => {
    const all = engine.getAllAvailableArticles();
    return all.filter((a) => bookmarks.has(a.id));
  }, [bookmarks, customCount]);

  // Search Filter: Algorithmic Recommended Feed
  const filteredFeedArticles = useMemo(() => {
    let result = feedArticles;
    
    // If Latest mode is selected, render chronologically (new custom/loaded articles first)
    if (feedFilter === 'latest') {
      result = [...feedArticles].sort((a, b) => b.id.localeCompare(a.id));
    }

    if (!searchQuery.trim()) return result;
    const q = searchQuery.toLowerCase();
    return result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [feedArticles, feedFilter, searchQuery]);

  // Search Filter: Saved/Bookmarked
  const filteredBookmarkedArticles = useMemo(() => {
    const list = bookmarkedArticlesList;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [bookmarkedArticlesList, searchQuery]);

  // Sidebar left menu definitions
  const sidebarNavItems = [
    { id: 'feed', label: 'Timeline', icon: BookOpen },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, badge: bookmarks.size },
    { id: 'stats', label: 'Report Card', icon: TrendingUp },
    { id: 'pipeline', label: 'Curriculum & Import', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-x-bg text-x-text font-sans antialiased selection:bg-x-blue/30 flex justify-center pb-20 md:pb-0">
      
      {/* Centered Content Row Container */}
      <div className="w-full max-w-[1250px] px-0 md:px-4 flex relative">
        
        {/* ==================================================================== */}
        {/* LEFT COLUMN: Twitter-styled Sidebar (Sticky, Fixed) */}
        {/* ==================================================================== */}
        <aside className="w-[70px] xl:w-[275px] shrink-0 h-screen sticky top-0 hidden md:flex flex-col justify-between p-3 border-r border-x-border select-none z-30">
          <div className="flex flex-col items-center xl:items-start space-y-4">
            
            {/* Minimal App Emblem */}
            <div 
              onClick={() => { setActiveTab('feed'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="p-3 hover:bg-x-text/10 rounded-full transition-colors duration-200 cursor-pointer text-x-text xl:ml-2 flex items-center space-x-3.5"
            >
              <GraduationCap size={32} className="text-x-blue" />
              <span className="hidden xl:inline font-black text-2xl tracking-tighter text-x-text">
                Doomschool
              </span>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-1.5 w-full">
              {sidebarNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as TabType);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center space-x-5 p-3 rounded-full hover:bg-x-text/[0.08] transition-all duration-150 w-full group text-left relative cursor-pointer`}
                  >
                    <div className="relative">
                      <Icon 
                        size={25} 
                        className={`shrink-0 transition-transform duration-150 group-hover:scale-105 ${
                          isActive ? 'text-x-blue stroke-[2.5px]' : 'text-x-text'
                        }`} 
                      />
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-x-blue text-white text-[9.5px] font-black rounded-full h-4.5 w-4.5 flex items-center justify-center border border-x-bg">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className={`hidden xl:inline text-[19px] tracking-wide leading-none ${
                      isActive ? 'font-black text-x-text' : 'font-normal text-x-text'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Large Theme Switcher Pill */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden xl:flex items-center justify-center space-x-2 py-3 px-8 bg-x-blue hover:bg-x-blue-hover text-white rounded-full font-bold w-11/12 transition-all duration-200 shadow-sm text-[15px] cursor-pointer mt-4"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {/* Small circle theme switcher for medium screen */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex xl:hidden items-center justify-center p-3 hover:bg-x-text/10 rounded-full transition-colors duration-200 text-x-text cursor-pointer"
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>

          </div>

          {/* Scholars Profile Module */}
          <div className="flex items-center space-x-3 p-2.5 rounded-full hover:bg-x-text/[0.08] transition-colors duration-150 cursor-pointer xl:ml-1 mb-2">
            <div className="w-10 h-10 rounded-full bg-x-blue text-white flex items-center justify-center font-black text-sm shrink-0 border border-x-border">
              SD
            </div>
            <div className="hidden xl:flex flex-col leading-tight min-w-0 flex-1">
              <span className="font-bold text-[14px] text-x-text truncate">sdbtg24</span>
              <span className="text-[12.5px] text-x-muted truncate">@sdbtg24_edu</span>
            </div>
          </div>
        </aside>

        {/* ==================================================================== */}
        {/* CENTER COLUMN: Feed & Active Main Views (Max-width 600px) */}
        {/* ==================================================================== */}
        <main className="flex-1 max-w-[600px] min-h-screen border-r border-x-border flex flex-col relative w-full">
          
          {/* STICKY TOP HEADER */}
          <div className="sticky top-0 bg-x-bg/85 backdrop-blur-md z-40 border-b border-x-border flex flex-col">
            
            {/* Header top: View details */}
            <div className="px-4 h-14 flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="font-extrabold text-[18px] tracking-tight text-x-text leading-tight">
                  {activeTab === 'feed' ? 'Timeline' : sidebarNavItems.find(i => i.id === activeTab)?.label}
                </h1>
              </div>

              {/* Mobile indicators / toggles */}
              <div className="flex items-center space-x-3 md:hidden">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-full hover:bg-x-text/10 text-x-text shrink-0"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setMobileDrawerOpen(true)}
                  className="p-2 bg-x-secondary border border-x-border rounded-full text-x-text hover:bg-x-text/5 shrink-0"
                  title="Curriculum categories and cognitive metrics"
                >
                  <SlidersHorizontal size={18} className="text-x-blue" />
                </button>
              </div>
            </div>

            {/* STICKY SUB-TABS (Only when activeTab is feed) */}
            {activeTab === 'feed' && (
              <div className="flex border-t border-x-border/40 select-none text-center">
                <button
                  onClick={() => setFeedFilter('for-you')}
                  className="flex-1 py-3 text-[15px] font-bold relative hover:bg-x-text/[0.03] transition-colors duration-150 cursor-pointer"
                >
                  <span className={feedFilter === 'for-you' ? 'text-x-text font-extrabold' : 'text-x-muted'}>
                    For You
                  </span>
                  {feedFilter === 'for-you' && (
                    <motion.div
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-[35%] right-[35%] h-[4px] bg-x-blue rounded-full"
                    />
                  )}
                </button>
                <button
                  onClick={() => setFeedFilter('latest')}
                  className="flex-1 py-3 text-[15px] font-bold relative hover:bg-x-text/[0.03] transition-colors duration-150 cursor-pointer"
                >
                  <span className={feedFilter === 'latest' ? 'text-x-text font-extrabold' : 'text-x-muted'}>
                    Latest
                  </span>
                  {feedFilter === 'latest' && (
                    <motion.div
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-[35%] right-[35%] h-[4px] bg-x-blue rounded-full"
                    />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ACTIVE TAB CONTENTS */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              
              {/* ==================================== */}
              {/* VIEW 1: Endless Timeline Feed */}
              {/* ==================================== */}
              {activeTab === 'feed' && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="divide-y divide-x-border"
                >
                  {/* Search query tag helper */}
                  {searchQuery && (
                    <div className="px-4 py-2.5 bg-x-blue/10 text-x-blue text-xs font-bold flex items-center justify-between border-b border-x-border">
                      <span>Filtering feed for keyword: "{searchQuery}"</span>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="p-1 hover:bg-x-blue/20 rounded-full font-black"
                      >
                        Clear Filter
                      </button>
                    </div>
                  )}

                  {/* Empty state feed */}
                  {filteredFeedArticles.length === 0 ? (
                    <div className="p-10 text-center text-x-muted space-y-3 flex flex-col items-center">
                      <HelpCircle size={32} className="text-x-muted/65" />
                      <h4 className="font-bold text-sm text-x-text">No articles found</h4>
                      <p className="text-xs max-w-xs leading-normal">
                        No articles match "{searchQuery}". Try editing your keyword search filter.
                      </p>
                    </div>
                  ) : (
                    filteredFeedArticles.map((article) => (
                      <FeedCard
                        key={article.id}
                        article={article}
                        isBookmarked={bookmarks.has(article.id)}
                        onInteraction={handleInteraction}
                        onQuizSolved={handleQuizSolved}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))
                  )}

                  {/* Endless scrolling loading status block */}
                  <div className="flex flex-col items-center justify-center py-10 text-center px-4 border-t border-x-border">
                    {isFetchingWiki ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-5 bg-x-secondary border border-x-border rounded-2xl w-full space-y-3.5"
                      >
                        <div className="flex items-center justify-center space-x-2 text-x-muted">
                          <RotateCcw className="animate-spin text-x-blue" size={16} />
                          <span className="text-xs font-bold uppercase tracking-widest text-x-blue">
                            Sourcing Wikipedia Dump...
                          </span>
                        </div>
                        <div className="space-y-2 text-left">
                          <div className="h-4 bg-x-border/80 rounded w-3/4 animate-pulse" />
                          <div className="h-3 bg-x-border/80 rounded w-5/6 animate-pulse" />
                        </div>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-xs text-x-muted font-medium">
                          Scroll down to trigger dynamic Wikipedia ingestion weights.
                        </p>
                        <button
                          onClick={appendMoreArticles}
                          className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-x-blue text-white hover:bg-x-blue-hover shadow-sm flex items-center space-x-2 transition-all mx-auto cursor-pointer"
                        >
                          <PlusCircle size={15} />
                          <span>Fetch More Studies</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ==================================== */}
              {/* VIEW 2: Report Card (Mobile stats fallback) */}
              {/* ==================================== */}
              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 space-y-4"
                >
                  <div className="p-4 bg-x-secondary rounded-2xl border border-x-border">
                    <h3 className="font-extrabold text-[16px]">Cognitive Diagnostics Dashboard</h3>
                    <p className="text-xs text-x-muted mt-0.5">
                      This diagnostic sheet monitors your active attention, biases, and comprehension performance in real-time.
                    </p>
                  </div>

                  <StatsPanel
                    stats={stats}
                    preferences={preferences}
                    onResetStats={handleClearCustomArticles}
                  />
                </motion.div>
              )}

              {/* ==================================== */}
              {/* VIEW 3: Bookmarks Tab Collection */}
              {/* ==================================== */}
              {activeTab === 'bookmarks' && (
                <motion.div
                  key="bookmarks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="divide-y divide-x-border"
                >
                  <div className="p-4 bg-x-secondary border-b border-x-border">
                    <h3 className="font-black text-[16px] tracking-tight">Saved Studies</h3>
                    <p className="text-xs text-x-muted">
                      Review all bookmarked Wikipedia cards. These materials are preserved locally for high-density reading.
                    </p>
                  </div>

                  {filteredBookmarkedArticles.length > 0 ? (
                    filteredBookmarkedArticles.map((article) => (
                      <FeedCard
                        key={article.id}
                        article={article}
                        isBookmarked={true}
                        onInteraction={handleInteraction}
                        onQuizSolved={handleQuizSolved}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))
                  ) : (
                    <div className="p-12 text-center text-x-muted flex flex-col items-center justify-center space-y-3">
                      <Bookmark size={32} className="text-x-muted/60" />
                      <p className="font-bold text-sm text-x-text">No Saved Studies</p>
                      <p className="text-xs max-w-xs leading-normal">
                        Save academic cards on your feed. Bookmarked materials will populate here.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ==================================== */}
              {/* VIEW 4: JSON Pipeline & Import Settings */}
              {/* ==================================== */}
              {activeTab === 'pipeline' && (
                <motion.div
                  key="pipeline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4"
                >
                  <DatasetInfo
                    onImportArticles={handleImportArticles}
                    onClearCustom={handleClearCustomArticles}
                    customCount={customCount}
                    preferences={preferences}
                    onToggleExclude={handleToggleExclude}
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* MINIMAL FOOTER FOR CENTER TIMELINE */}
          <footer className="border-t border-x-border py-8 px-4 flex flex-col items-center space-y-3.5 text-center text-[12px] text-x-muted bg-x-bg">
            <p className="max-w-md leading-relaxed">
              Doomschooler empowers digital mindfulness by converting conventional scrolling habits into structured academic reading.
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-mono bg-x-secondary px-3 py-1 rounded-full border border-x-border">
              <span>Client-Side Data Storage Only</span>
              <span>·</span>
              <a
                href="https://github.com/rebane2001/xikipedia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-x-blue hover:underline inline-flex items-center space-x-1"
              >
                <Github size={11} />
                <span>Inspired by Xikipedia</span>
              </a>
            </div>
          </footer>

        </main>

        {/* ==================================================================== */}
        {/* RIGHT COLUMN: Search, Trends (Stats), Who to Follow (Filters) */}
        {/* ==================================================================== */}
        <aside className="w-[350px] shrink-0 sticky top-0 h-screen hidden lg:flex flex-col p-4 space-y-4 overflow-y-auto select-none border-l border-x-border z-30">
          
          {/* SEARCH INPUT PILL */}
          <div className="relative flex items-center bg-x-secondary rounded-full border border-transparent focus-within:border-x-blue focus-within:bg-x-bg px-4.5 py-2.5 transition-colors duration-150 group">
            <Search size={16} className="text-x-muted group-focus-within:text-x-blue shrink-0 mr-3" />
            <input
              type="text"
              placeholder="Search curriculum / keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-x-text placeholder-x-muted text-[14.5px] outline-none w-full font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-x-text/10 rounded-full text-x-muted cursor-pointer"
                title="Clear Search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* WHO TO FOLLOW: Subject Curriculum filter */}
          <SubjectFilter
            preferences={preferences}
            onTogglePin={handleTogglePin}
            onToggleExclude={handleToggleExclude}
            onReset={handleResetPreferences}
          />

          {/* WHAT'S HAPPENING: Real-time Stats Panel */}
          <StatsPanel
            stats={stats}
            preferences={preferences}
            onResetStats={handleClearCustomArticles}
          />

          {/* FOOTER */}
          <div className="px-4 text-[12.5px] text-x-muted leading-relaxed space-y-1">
            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
              <span className="hover:underline cursor-pointer">Terms of Service</span>
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Cookie Policy</span>
              <span className="hover:underline cursor-pointer">More options</span>
            </div>
            <p className="font-mono text-[11px]">© 2026 Doomschooler Corp. · v1.2.0</p>
          </div>
        </aside>

      </div>

      {/* ==================================================================== */}
      {/* MOBILE BOTTOM NAVIGATION BAR (Sticky at bottom of narrow screens) */}
      {/* ==================================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-x-bg/95 border-t border-x-border z-40 flex justify-around py-2.5 backdrop-blur-md select-none">
        {sidebarNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as TabType);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2 rounded-full text-x-text relative cursor-pointer active:scale-95 transition-transform"
            >
              <Icon size={24} className={isActive ? 'text-x-blue stroke-[2.5px]' : 'text-x-text/80'} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute top-1 right-1 bg-x-blue text-white text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* MOBILE DRAWER: Curriculum Filter and Cognitive Stats Drawer */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-11/12 max-w-[360px] bg-x-bg h-full border-l border-x-border p-4 flex flex-col space-y-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-x-border pb-3">
                <h2 className="font-extrabold text-lg text-x-text">Study Curriculums</h2>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-x-secondary text-x-text cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Subject Filter */}
              <SubjectFilter
                preferences={preferences}
                onTogglePin={handleTogglePin}
                onToggleExclude={handleToggleExclude}
                onReset={handleResetPreferences}
              />

              {/* Stats Panel */}
              <StatsPanel
                stats={stats}
                preferences={preferences}
                onResetStats={handleClearCustomArticles}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
