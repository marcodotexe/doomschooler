import React from 'react';
import { StudyStats, SubjectPreferences, SubjectCategory } from '../types';
import { Award, GraduationCap, Flame, Target, Sparkles, BookOpen, Clock, RotateCcw, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsPanelProps {
  stats: StudyStats;
  preferences: SubjectPreferences;
  onResetStats: () => void;
  compact?: boolean;
}

export default function StatsPanel({
  stats,
  preferences,
  onResetStats,
  compact = false
}: StatsPanelProps) {
  const categories = Object.keys(preferences) as SubjectCategory[];
  
  // Find favorite subject (highest preference weight)
  let favoriteSubject: SubjectCategory = 'Physics';
  let maxWeight = -1;
  categories.forEach((cat) => {
    if (preferences[cat].weight > maxWeight) {
      maxWeight = preferences[cat].weight;
      favoriteSubject = cat;
    }
  });

  // Calculate total study time
  const totalSeconds = Math.floor(stats.totalLingerTimeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeString = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  // Calculate quiz accuracy
  const accuracy = stats.quizzesAttempted > 0 
    ? Math.round((stats.quizzesCorrect / stats.quizzesAttempted) * 100) 
    : 0;

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="w-full bg-x-secondary border border-x-border rounded-2xl flex flex-col overflow-hidden text-x-text select-none">
      
      {/* Header Styled like X's "What's happening" title */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-x-border">
        <div className="flex items-center space-x-2">
          <TrendingUp size={16} className="text-x-blue" />
          <h3 className="font-extrabold text-[17px] tracking-tight text-x-text">
            What's Happening
          </h3>
        </div>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all of your statistics and training weights? This cannot be undone.')) {
              onResetStats();
            }
          }}
          className="text-xs text-x-muted hover:text-x-pink transition-colors flex items-center space-x-1"
          title="Reset study statistics"
        >
          <RotateCcw size={12} />
          <span className="font-medium">Reset</span>
        </button>
      </div>

      {/* Metrics List Styled like Trends */}
      <div className="divide-y divide-x-border">
        
        {/* Metric 1: Brains Gained */}
        <div className="px-4 py-3 hover:bg-x-text/[0.015] transition-colors duration-200 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[12px] text-x-muted flex items-center space-x-1 font-medium">
              <Sparkles size={11} className="text-amber-500" />
              <span>Cognitive Score · Trending</span>
            </span>
            <div className="font-bold text-[15px] text-x-text">
              {stats.brainsGained} points
            </div>
            <span className="text-[11px] text-x-muted font-medium">
              Brains points accumulated in learning feed
            </span>
          </div>
          <div className="p-2 rounded-full bg-amber-500/10 text-amber-500">
            <Sparkles size={16} />
          </div>
        </div>

        {/* Metric 2: Linger Time */}
        <div className="px-4 py-3 hover:bg-x-text/[0.015] transition-colors duration-200 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[12px] text-x-muted flex items-center space-x-1 font-medium">
              <Clock size={11} className="text-x-blue" />
              <span>Active Attention · Live</span>
            </span>
            <div className="font-bold text-[15px] text-x-text">
              {timeString}
            </div>
            <span className="text-[11px] text-x-muted font-medium">
              Time spent actively reading coursework
            </span>
          </div>
          <div className="p-2 rounded-full bg-x-blue/10 text-x-blue">
            <Clock size={16} />
          </div>
        </div>

        {/* Metric 3: Scrolled Posts */}
        <div className="px-4 py-3 hover:bg-x-text/[0.015] transition-colors duration-200 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[12px] text-x-muted flex items-center space-x-1 font-medium">
              <BookOpen size={11} className="text-x-green" />
              <span>Academic Exposure</span>
            </span>
            <div className="font-bold text-[15px] text-x-text">
              {stats.totalScrolled} articles fed
            </div>
            <span className="text-[11px] text-x-muted font-medium">
              Articles ingested during infinite doomscroll
            </span>
          </div>
          <div className="p-2 rounded-full bg-x-green/10 text-x-green">
            <BookOpen size={16} />
          </div>
        </div>

        {/* Metric 4: Streak */}
        <div className="px-4 py-3 hover:bg-x-text/[0.015] transition-colors duration-200 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[12px] text-x-muted flex items-center space-x-1 font-medium">
              <Flame size={11} className="text-orange-500" />
              <span>Ingestion Habit</span>
            </span>
            <div className="font-bold text-[15px] text-x-text">
              {stats.streak} day streak
            </div>
            <span className="text-[11px] text-x-muted font-medium">
              Consecutive days of scholarly engagement
            </span>
          </div>
          <div className="p-2 rounded-full bg-orange-500/10 text-orange-500">
            <Flame size={16} className="fill-current" />
          </div>
        </div>

        {/* Comprehension Quiz Metrics */}
        <div className="px-4 py-3.5 hover:bg-x-text/[0.015] transition-colors duration-200">
          <span className="text-[12px] text-x-muted flex items-center space-x-1 font-medium mb-2.5">
            <Target size={11} className="text-x-pink" />
            <span>Comprehension Accuracy</span>
          </span>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r={radius}
                  className="stroke-x-border"
                  strokeWidth="5"
                  fill="transparent"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r={radius}
                  className="stroke-x-blue"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-x-text">{accuracy}%</span>
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-x-text">
                {stats.quizzesCorrect} of {stats.quizzesAttempted} Quizzes Correct
              </div>
              <p className="text-[11px] text-x-muted leading-tight">
                Accurate comprehension check solutions signal cognitive retention.
              </p>
            </div>
          </div>
        </div>

        {/* Academic Diet Breakdown Progress Bars */}
        <div className="px-4 py-3.5">
          <span className="text-[12px] text-x-muted flex items-center space-x-1 font-medium mb-3">
            <GraduationCap size={11} className="text-purple-400" />
            <span>Academic Diet Breakdown</span>
          </span>
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {categories.map((cat) => {
              const weight = preferences[cat].weight;
              const percentage = Math.round((weight / 5.0) * 100);
              const count = stats.categoryCounts[cat] || 0;

              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-x-text">
                    <span className="font-semibold">{cat}</span>
                    <span className="text-[10px] text-x-muted">
                      Bias: {weight.toFixed(1)}x · Sighted: {count}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-x-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-x-blue rounded-full transition-all duration-500" 
                      style={{ width: `${Math.max(4, percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Insight */}
        <div className="px-4 py-3 bg-x-text/[0.01] text-[12px] text-x-muted leading-normal">
          <div className="flex items-start space-x-2 text-x-text font-bold mb-0.5">
            <Award size={14} className="text-x-blue shrink-0 mt-0.5" />
            <span>Study Insight Profile</span>
          </div>
          <p className="text-[11.5px] leading-relaxed text-x-muted">
            You are displaying the strongest interest bias in <span className="font-bold text-x-text">{favoriteSubject}</span>. 
            The recommendation engine prioritizes this sector.
          </p>
        </div>

      </div>
    </div>
  );
}
