import React from 'react';
import { SubjectCategory, SubjectPreferences } from '../types';
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
  Pin, 
  EyeOff, 
  RefreshCw, 
  UserPlus, 
  Check, 
  Sparkles,
  Users
} from 'lucide-react';

interface SubjectFilterProps {
  preferences: SubjectPreferences;
  onTogglePin: (category: SubjectCategory) => void;
  onToggleExclude: (category: SubjectCategory) => void;
  onReset: () => void;
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

const CATEGORY_HANDLES: Record<SubjectCategory, string> = {
  'Physics': 'physics_edu',
  'Chemistry': 'chem_lab',
  'Biology': 'bio_sphere',
  'Math': 'math_theory',
  'Computer Science': 'comp_sci',
  'Astronomy': 'cosmos_wiki',
  'History': 'history_line',
  'Philosophy': 'phil_thought',
  'Economics': 'market_logic',
  'Literature': 'lit_classic',
  'Earth Sciences': 'earth_science',
  'Engineering': 'engineer_tech',
};

const CATEGORY_COLORS: Record<SubjectCategory, string> = {
  'Physics': 'text-blue-400',
  'Chemistry': 'text-emerald-400',
  'Biology': 'text-green-400',
  'Math': 'text-amber-400',
  'Computer Science': 'text-cyan-400',
  'Astronomy': 'text-violet-400',
  'History': 'text-orange-400',
  'Philosophy': 'text-rose-400',
  'Economics': 'text-teal-400',
  'Literature': 'text-fuchsia-400',
  'Earth Sciences': 'text-lime-400',
  'Engineering': 'text-sky-400',
};

export default function SubjectFilter({
  preferences,
  onTogglePin,
  onToggleExclude,
  onReset
}: SubjectFilterProps) {
  const categories = Object.keys(preferences) as SubjectCategory[];

  return (
    <div className="w-full bg-x-secondary border border-x-border rounded-2xl flex flex-col overflow-hidden text-x-text select-none">
      
      {/* Header Styled like "Who to follow" */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-x-border">
        <div className="flex items-center space-x-2">
          <Users size={16} className="text-x-blue" />
          <h3 className="font-extrabold text-[17px] tracking-tight">
            Curriculum Categories
          </h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-x-blue hover:underline font-bold flex items-center space-x-1"
          title="Reset weights to default neutral values"
        >
          <RefreshCw size={11} />
          <span>Reset Weights</span>
        </button>
      </div>

      {/* Categories list */}
      <div className="divide-y divide-x-border max-h-[380px] overflow-y-auto">
        {categories.map((cat) => {
          const pref = preferences[cat];
          const Icon = CATEGORY_ICONS[cat] || BookOpen;
          const handle = CATEGORY_HANDLES[cat] || 'edu_branch';
          const iconColor = CATEGORY_COLORS[cat] || 'text-x-blue';

          return (
            <div 
              key={cat} 
              className={`px-4 py-3 hover:bg-x-text/[0.015] transition-colors duration-150 flex items-center justify-between space-x-3 ${
                pref.excluded ? 'opacity-50' : ''
              }`}
            >
              {/* Profile Avatar & Info */}
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className={`w-9 h-9 rounded-full bg-x-bg border border-x-border flex items-center justify-center shrink-0 ${iconColor}`}>
                  <Icon size={16} />
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="font-bold text-[14px] text-x-text hover:underline truncate flex items-center space-x-1">
                    <span>{cat}</span>
                    {pref.pinned && (
                      <Sparkles size={11} className="text-amber-500 fill-current shrink-0" />
                    )}
                  </div>
                  <div className="text-[12px] text-x-muted truncate">
                    @{handle}
                  </div>
                </div>
              </div>

              {/* Pin & Mute Action Buttons */}
              <div className="flex items-center space-x-1.5 shrink-0">
                {/* Pin Button - Styled like Follow/Following */}
                <button
                  onClick={() => onTogglePin(cat)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-150 cursor-pointer ${
                    pref.pinned
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-x-text text-x-bg hover:opacity-90'
                  }`}
                  title={pref.pinned ? 'Unpin from feed priorities' : 'Pin to prioritize in study feed'}
                >
                  {pref.pinned ? 'Pinned' : 'Pin'}
                </button>

                {/* Mute Button - Styled like circle icon */}
                <button
                  onClick={() => onToggleExclude(cat)}
                  className={`p-1.5 rounded-full border border-x-border transition-colors duration-150 cursor-pointer ${
                    pref.excluded
                      ? 'bg-rose-500/15 border-rose-500/35 text-rose-500'
                      : 'text-x-muted hover:text-rose-500 hover:bg-rose-500/10'
                  }`}
                  title={pref.excluded ? 'Unmute from feed' : 'Mute from study feed'}
                >
                  <EyeOff size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer descriptor */}
      <div className="px-4 py-2.5 bg-x-text/[0.005] border-t border-x-border text-[11px] text-x-muted text-center leading-normal">
        Pinning increases recommendation weight. Muting filters content completely from the timeline.
      </div>

    </div>
  );
}
