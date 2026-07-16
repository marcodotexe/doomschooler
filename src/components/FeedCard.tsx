import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Atom, 
  FlaskConical, 
  Dna, 
  Calculator, 
  Cpu, 
  Orbit, 
  Scroll, 
  Brain, 
  Coins, 
  BookOpen, 
  Globe2, 
  Wrench, 
  Heart, 
  Bookmark, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  EyeOff, 
  ExternalLink, 
  HelpCircle, 
  Sparkles, 
  Check, 
  X, 
  Repeat2, 
  MessageSquare,
  BookmarkCheck,
  Award
} from 'lucide-react';
import { Article, SubjectCategory } from '../types';

interface FeedCardProps {
  key?: string | number;
  article: Article;
  isBookmarked: boolean;
  onInteraction: (articleId: string, category: SubjectCategory, action: {
    expanded?: boolean;
    bookmarked?: boolean;
    liked?: boolean;
    disliked?: boolean;
    lingerTimeMs?: number;
    quizSolved?: boolean;
    quizCorrect?: boolean;
  }) => void;
  onQuizSolved: (articleId: string, category: SubjectCategory, correct: boolean) => void;
  onToggleBookmark: (articleId: string) => void;
}

const CATEGORY_ICONS: Record<SubjectCategory, React.ComponentType<any>> = {
  'Physics': Atom,
  'Chemistry': FlaskConical,
  'Biology': Dna,
  'Math': Calculator,
  'Computer Science': Cpu,
  'Astronomy': Orbit,
  'History': Scroll,
  'Philosophy': Brain,
  'Economics': Coins,
  'Literature': BookOpen,
  'Earth Sciences': Globe2,
  'Engineering': Wrench,
};

const CATEGORY_DETAILS: Record<SubjectCategory, { gradient: string; accent: string; handle: string }> = {
  'Physics': { gradient: 'from-blue-600 to-indigo-950', accent: '#1D9BF0', handle: 'physics_edu' },
  'Chemistry': { gradient: 'from-emerald-600 to-teal-950', accent: '#00BA7C', handle: 'chem_lab' },
  'Biology': { gradient: 'from-green-600 to-emerald-950', accent: '#10B981', handle: 'bio_sphere' },
  'Math': { gradient: 'from-amber-500 to-orange-950', accent: '#F59E0B', handle: 'math_theory' },
  'Computer Science': { gradient: 'from-cyan-500 to-blue-950', accent: '#06B6D4', handle: 'comp_sci' },
  'Astronomy': { gradient: 'from-violet-600 to-fuchsia-950', accent: '#8B5CF6', handle: 'cosmos_wiki' },
  'History': { gradient: 'from-orange-500 to-red-950', accent: '#F97316', handle: 'history_line' },
  'Philosophy': { gradient: 'from-rose-500 to-red-950', accent: '#F43F5E', handle: 'phil_thought' },
  'Economics': { gradient: 'from-teal-500 to-emerald-950', accent: '#14B8A6', handle: 'market_logic' },
  'Literature': { gradient: 'from-fuchsia-500 to-purple-950', accent: '#D946EF', handle: 'lit_classic' },
  'Earth Sciences': { gradient: 'from-lime-500 to-green-950', accent: '#84CC16', handle: 'earth_science' },
  'Engineering': { gradient: 'from-blue-500 to-sky-950', accent: '#3B82F6', handle: 'engineer_tech' },
};

export default function FeedCard({
  article,
  isBookmarked,
  onInteraction,
  onQuizSolved,
  onToggleBookmark
}: FeedCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const visibleStartTime = useRef<number | null>(null);

  // Keep a stable seed-based metric object to avoid re-generating on every render while maintaining state across tabs
  const metrics = useRef<{
    comments: number;
    retweets: number;
    likes: number;
    bookmarks: number;
    quizVotes: number;
  } | null>(null);

  if (!metrics.current) {
    let hash = 0;
    const str = article.id || '';
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const seed = Math.abs(hash);
    
    // likes ranges from 600 to 10000
    const likes = ((seed + 333) % 9400) + 600;
    // retweets ranges from 40% to 75% of likes, guaranteed less than likes
    const retweets = Math.min(likes - 10, Math.max(100, Math.floor(likes * (0.4 + (seed % 35) / 100))));
    // bookmarks/favorites ranges from 20% to 45% of likes
    const bookmarks = Math.min(retweets - 10, Math.max(100, Math.floor(likes * (0.2 + (seed % 25) / 100))));
    // comments ranges from 10% to 25% of likes
    const comments = Math.min(bookmarks - 10, Math.max(100, Math.floor(likes * (0.1 + (seed % 15) / 100))));
    
    metrics.current = {
      comments,
      retweets,
      likes,
      bookmarks,
      quizVotes: likes + ((seed % 5000) + 1000), // quiz votes scaled relative to likes
    };
  }

  const formatMetric = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  // Keep a mutable ref of onInteraction callback to avoid stale closures in the IntersectionObserver
  const onInteractionRef = useRef(onInteraction);
  useEffect(() => {
    onInteractionRef.current = onInteraction;
  }, [onInteraction]);

  // Linger tracking using IntersectionObserver
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleStartTime.current = Date.now();
          } else {
            if (visibleStartTime.current !== null) {
              const lingerTime = Date.now() - visibleStartTime.current;
              if (lingerTime > 800) {
                onInteractionRef.current(article.id, article.category, { lingerTimeMs: lingerTime });
              }
              visibleStartTime.current = null;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(cardRef.current);

    return () => {
      if (visibleStartTime.current !== null) {
        const lingerTime = Date.now() - visibleStartTime.current;
        if (lingerTime > 800) {
          onInteractionRef.current(article.id, article.category, { lingerTimeMs: lingerTime });
        }
      }
      observer.disconnect();
    };
  }, [article.id, article.category]);

  const handleToggleExpand = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);
    if (nextState) {
      onInteraction(article.id, article.category, { expanded: true });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (feedback === 'liked') {
      setFeedback(null);
    } else {
      setFeedback('liked');
      onInteraction(article.id, article.category, { liked: true });
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (feedback === 'disliked') {
      setFeedback(null);
    } else {
      setFeedback('disliked');
      onInteraction(article.id, article.category, { disliked: true });
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(article.id);
    onInteraction(article.id, article.category, { bookmarked: !isBookmarked });
  };

  const handleSelectQuizOption = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (quizSubmitted) return;
    setSelectedQuizOption(idx);
  };

  const handleSubmitQuiz = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedQuizOption === null || quizSubmitted || !article.quiz) return;
    setQuizSubmitted(true);
    const isCorrect = selectedQuizOption === article.quiz.correctIndex;
    onQuizSolved(article.id, article.category, isCorrect);
    onInteraction(article.id, article.category, {
      quizSolved: true,
      quizCorrect: isCorrect
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `📚 Doomschooler - Learning something new while doomscrolling!\n\n"${article.title}" (${article.category}):\n${article.excerpt}\n\nRead more on Doomschooler!`;
    navigator.clipboard.writeText(shareText).then(() => {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    });
  };

  const IconComponent = CATEGORY_ICONS[article.category] || BookOpen;
  const catDetail = CATEGORY_DETAILS[article.category] || { gradient: 'from-zinc-600 to-zinc-950', accent: '#1D9BF0', handle: 'study_feed' };

  return (
    <motion.div
      id={`card-${article.id}`}
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleToggleExpand}
      className="w-full bg-x-bg border-b border-x-border p-4 text-x-text flex space-x-3 text-left hover:bg-x-text/[0.015] transition-colors duration-200 cursor-pointer"
    >
      {/* Left side: Category Avatar */}
      <div className="flex-shrink-0">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center bg-x-secondary border border-x-border"
          style={{ color: catDetail.accent }}
        >
          <IconComponent size={18} />
        </div>
      </div>

      {/* Right side: Tweet Card Content */}
      <div className="flex-1 min-w-0">
        {/* User Handle & Meta Row */}
        <div className="flex items-center justify-between text-[15px]">
          <div className="flex items-center space-x-1.5 truncate">
            <span className="font-bold text-x-text hover:underline truncate">
              {article.title}
            </span>
            <span className="text-x-muted truncate">
              @{catDetail.handle}
            </span>
            <span className="text-x-muted">·</span>
            <span className="text-xs text-x-muted font-medium bg-x-secondary px-1.5 py-0.5 rounded border border-x-border/60">
              {article.category}
            </span>
            {article.isCustom && (
              <>
                <span className="text-x-muted">·</span>
                <span className="text-[10px] text-x-blue font-semibold uppercase tracking-wider bg-x-blue/10 px-1 py-0.2 rounded">
                  Live
                </span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-x-muted whitespace-nowrap">
            <span>{article.estimatedReadTime} min read</span>
          </div>
        </div>

        {/* Tweet Excerpt Body */}
        <p className="text-[15px] font-normal leading-normal text-x-text mt-1.5 break-words whitespace-pre-wrap">
          {article.excerpt}
        </p>

        {/* Media / Study Card Attachment Container */}
        <div 
          onClick={(e) => { e.stopPropagation(); handleToggleExpand(); }}
          className="mt-3 border border-x-border rounded-2xl overflow-hidden bg-x-secondary hover:bg-x-secondary/90 transition-colors duration-200 flex flex-col"
        >
          {/* Stunning linear gradient display image representative of category */}
          <div className={`w-full h-[150px] bg-gradient-to-br ${catDetail.gradient} relative p-4 flex flex-col justify-between overflow-hidden`}>
            {/* Soft blurred vector background icon for depth */}
            <div className="absolute right-[-10px] bottom-[-20px] opacity-15 text-white pointer-events-none transform rotate-12 scale-[3.5]">
              <IconComponent size={80} />
            </div>

            <div className="flex items-start justify-between z-10">
              <span className="text-[10px] font-bold tracking-widest text-white/85 uppercase bg-black/35 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10 flex items-center space-x-1">
                <Sparkles size={10} className="text-amber-400" />
                <span>Wiki Coursework</span>
              </span>
              <span className="text-[10px] font-medium text-white/70 bg-black/20 px-2 py-0.5 rounded">
                Simple Wikipedia dump
              </span>
            </div>

            <div className="z-10 text-white">
              <h3 className="font-extrabold text-xl leading-tight drop-shadow-md tracking-tight">
                {article.title}
              </h3>
              <p className="text-xs text-white/80 mt-1 line-clamp-1">
                Foundational overview of {article.category} principles.
              </p>
            </div>
          </div>

          {/* Expanded Thread details / notes / takeaways */}
          <AnimatePresence initial={false}>
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden bg-x-bg border-t border-x-border"
              >
                <div className="p-4 space-y-4 text-x-text text-[15px]">
                  {/* Full body */}
                  <div className="leading-relaxed text-x-text space-y-3 whitespace-pre-wrap">
                    {article.fullText}
                  </div>

                  {/* Highlights / Key Takeaways styled as list */}
                  <div className="p-3.5 bg-x-secondary rounded-xl border border-x-border">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-x-muted mb-2 flex items-center space-x-1.5">
                      <BookOpen size={14} style={{ color: catDetail.accent }} />
                      <span>Key Takeaways</span>
                    </h4>
                    <ul className="space-y-2">
                      {article.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="text-[14px] flex items-start space-x-2">
                          <span 
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: catDetail.accent }}
                          />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Community Note container (Fun Fact) */}
                  <div className="p-4 bg-x-secondary/80 border-l-4 rounded-r-xl border-x-blue text-left space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-x-blue font-bold text-xs uppercase tracking-wider">
                      <Award size={14} />
                      <span>Community Note • Fun Fact Context</span>
                    </div>
                    <p className="text-[13.5px] italic leading-relaxed text-x-text">
                      {article.funFact}
                    </p>
                    <div className="text-[11px] text-x-muted border-t border-x-border/30 pt-2 flex items-center justify-between">
                      <span>Readers added context they thought you might want to know.</span>
                      <div className="flex items-center space-x-1">
                        <span>Helpful?</span>
                        <span className="text-x-blue font-medium hover:underline cursor-pointer">Yes</span>
                        <span>·</span>
                        <span className="text-x-blue font-medium hover:underline cursor-pointer">No</span>
                      </div>
                    </div>
                  </div>

                  {/* Quiz styled like an interactive Twitter Poll */}
                  {article.quiz && (
                    <div className="p-4 bg-x-secondary/50 border border-x-border rounded-xl space-y-3">
                      <div className="flex items-center space-x-1.5 text-x-text mb-1">
                        <HelpCircle size={16} className="text-x-blue" />
                        <h4 className="font-bold text-sm">Comprehension Poll Quiz</h4>
                      </div>

                      <p className="text-[14px] text-x-text font-semibold">
                        {article.quiz.question}
                      </p>

                      <div className="space-y-2">
                        {article.quiz.options.map((option, idx) => {
                          const isCorrectOption = idx === article.quiz?.correctIndex;
                          const isSelected = selectedQuizOption === idx;

                          // Poll calculations for progress bar
                          let percentage = 23; // default fallback visual
                          if (isCorrectOption) percentage = 68;
                          if (isSelected && !isCorrectOption) percentage = 32;

                          return (
                            <button
                              key={idx}
                              disabled={quizSubmitted}
                              onClick={(e) => handleSelectQuizOption(idx, e)}
                              className="relative w-full overflow-hidden text-left p-3 rounded-xl border border-x-border/80 text-[13.5px] font-medium transition-all duration-200 flex items-center justify-between group active:scale-[0.99]"
                            >
                              {/* Background progress fill when submitted */}
                              {quizSubmitted && (
                                <div 
                                  className={`absolute left-0 top-0 bottom-0 transition-all duration-1000 ${
                                    isCorrectOption 
                                      ? 'bg-x-green/15 border-r border-x-green/30' 
                                      : isSelected 
                                      ? 'bg-x-pink/15 border-r border-x-pink/30' 
                                      : 'bg-x-muted/10'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              )}

                              <span className="relative z-10 flex items-center space-x-2">
                                {quizSubmitted && isCorrectOption && (
                                  <Check size={14} className="text-x-green flex-shrink-0" />
                                )}
                                {quizSubmitted && isSelected && !isCorrectOption && (
                                  <X size={14} className="text-x-pink flex-shrink-0" />
                                )}
                                <span className={quizSubmitted && isCorrectOption ? 'text-x-green font-bold' : ''}>
                                  {option}
                                </span>
                              </span>

                              {quizSubmitted && (
                                <span className="relative z-10 font-mono text-[11px] text-x-muted">
                                  {percentage}%
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {!quizSubmitted ? (
                        <button
                          onClick={handleSubmitQuiz}
                          disabled={selectedQuizOption === null}
                          className="px-4 py-2 text-xs font-bold bg-x-blue text-white rounded-full hover:bg-x-blue-hover disabled:opacity-40 transition-all cursor-pointer shadow-sm flex items-center space-x-1"
                        >
                          <span>Vote Answer</span>
                        </button>
                      ) : (
                        <div className="text-[12px] text-x-muted pt-1 flex flex-col space-y-1">
                          <div className="flex items-center space-x-1">
                            <span className="font-bold text-x-text">
                              {selectedQuizOption === article.quiz.correctIndex ? '🎉 Solved Correctly!' : '❌ Incorrect.'}
                            </span>
                            <span>· {metrics.current?.quizVotes.toLocaleString()} votes · Final results</span>
                          </div>
                          <p className="leading-relaxed bg-x-bg p-2.5 rounded-lg border border-x-border text-x-text mt-1 text-[12.5px]">
                            {article.quiz.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* External Source Link */}
                  <div className="flex justify-end pt-1">
                    <a
                      href={article.wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1.5 text-xs font-semibold text-x-blue hover:underline"
                    >
                      <span>Read on Simple Wikipedia</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="px-4 py-2.5 border-t border-x-border flex items-center justify-between text-xs text-x-muted">
                <span className="truncate pr-4">
                  {article.excerpt.slice(0, 75)}...
                </span>
                <span className="font-semibold text-x-blue hover:underline whitespace-nowrap shrink-0 flex items-center space-x-0.5">
                  <span>Show thread</span>
                  <ChevronDown size={12} />
                </span>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Flat Tweet Engagement Action Buttons Bar */}
        <div className="flex items-center justify-between text-x-muted mt-3 max-w-md">
          {/* Reply / Expand Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleExpand();
            }}
            className="flex items-center space-x-1 text-sm group text-x-muted hover:text-x-blue transition-colors duration-200"
            title={isExpanded ? "Collapse study" : "Expand study"}
          >
            <div className="p-2 rounded-full group-hover:bg-x-blue/10 transition-colors duration-150">
              <MessageSquare size={16} />
            </div>
            <span className="text-xs">
              {metrics.current ? formatMetric(metrics.current.comments + (isExpanded ? 1 : 0)) : '0'}
            </span>
          </button>

          {/* Repost / Share Info */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-sm group text-x-muted hover:text-x-green transition-colors duration-200"
            title="Share Study Card"
          >
            <div className="p-2 rounded-full group-hover:bg-x-green/10 transition-colors duration-150">
              <Repeat2 size={16} className={copiedShare ? 'animate-spin' : ''} />
            </div>
            <span className="text-xs">
              {copiedShare ? 'Copied' : (metrics.current ? formatMetric(metrics.current.retweets) : '0')}
            </span>
          </button>

          {/* Like / Heart (Boost) */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-sm group transition-colors duration-200 ${
              feedback === 'liked' ? 'text-x-pink' : 'text-x-muted hover:text-x-pink'
            }`}
            title="Like (Boost algorithm weight)"
          >
            <div className="p-2 rounded-full group-hover:bg-x-pink/10 transition-colors duration-150">
              <Heart size={16} fill={feedback === 'liked' ? 'currentColor' : 'none'} />
            </div>
            <span className="text-xs">
              {metrics.current ? formatMetric(metrics.current.likes + (feedback === 'liked' ? 1 : 0)) : '0'}
            </span>
          </button>

          {/* Save / Bookmark */}
          <button
            onClick={handleBookmark}
            className={`flex items-center space-x-1 text-sm group transition-colors duration-200 ${
              isBookmarked ? 'text-x-blue' : 'text-x-muted hover:text-x-blue'
            }`}
            title="Bookmark Article"
          >
            <div className="p-2 rounded-full group-hover:bg-x-blue/10 transition-colors duration-150">
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            </div>
            <span className="text-xs">
              {metrics.current ? formatMetric(metrics.current.bookmarks + (isBookmarked ? 1 : 0)) : '0'}
            </span>
          </button>

          {/* Dislike / Not Interested */}
          <button
            onClick={handleDislike}
            className={`flex items-center space-x-1 text-sm group transition-colors duration-200 ${
              feedback === 'disliked' ? 'text-rose-500' : 'text-x-muted hover:text-rose-500'
            }`}
            title="Not Interested (Mute/Downvote category)"
          >
            <div className="p-2 rounded-full group-hover:bg-rose-500/10 transition-colors duration-150">
              <EyeOff size={16} />
            </div>
            <span className="text-xs">{feedback === 'disliked' ? 'Muted' : ''}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
