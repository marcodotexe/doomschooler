import React, { useState } from 'react';
import { BookOpen, HelpCircle, Code, FileCode2, Copy, Check, Upload, ArrowRight, Download, RefreshCw, Eye, Atom, FlaskConical, Dna, Calculator, Cpu, Orbit, Scroll, Brain, Coins, Globe2, Wrench, Settings2 } from 'lucide-react';
import { Article, SubjectCategory, SubjectPreferences } from '../types';

interface DatasetInfoProps {
  onImportArticles: (articles: Article[]) => void;
  onClearCustom: () => void;
  customCount: number;
  preferences: SubjectPreferences;
  onToggleExclude: (category: SubjectCategory) => void;
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

const CATEGORY_COLORS: Record<SubjectCategory, string> = {
  'Physics': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Chemistry': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'Biology': 'bg-green-500/10 text-green-500 border-green-500/20',
  'Math': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'Computer Science': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  'Astronomy': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'History': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'Philosophy': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  'Economics': 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  'Literature': 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20',
  'Earth Sciences': 'bg-lime-500/10 text-lime-500 border-lime-500/20',
  'Engineering': 'bg-sky-500/10 text-sky-500 border-sky-500/20',
};

export default function DatasetInfo({
  onImportArticles,
  onClearCustom,
  customCount,
  preferences,
  onToggleExclude
}: DatasetInfoProps) {
  const categories = Object.keys(preferences) as SubjectCategory[];
  const [copiedScript, setCopiedScript] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  const pythonScript = `import json
import xml.etree.ElementTree as ET
import re

# process_data.py
# A script to process a Simple Wikipedia XML dump and filter it to academic subjects.
# Download the dump from: https://dumps.wikimedia.org/simplewiki/latest/simplewiki-latest-pages-articles.xml.bz2

ACADEMIC_CATEGORIES = {
    "Physics", "Chemistry", "Biology", "Math", "Computer Science", 
    "Astronomy", "History", "Philosophy", "Economics", "Literature", 
    "Earth Sciences", "Engineering"
}

def clean_wiki_text(text):
    # Remove markup, templates, and brackets
    text = re.sub(r'\\{\\{.*?\\}\\}', '', text, flags=re.DOTALL)
    text = re.sub(r'\\[\\[(.*?)\\]\\]', lambda m: m.group(1).split('|')[-1], text)
    text = re.sub(r"'''?", '', text)
    text = re.sub(r'<.*?>', '', text)
    return text.strip()

def process_wikipedia_dump(xml_path, output_json_path):
    print("Parsing Wikipedia Dump...")
    context = ET.iterparse(xml_path, events=('end',))
    articles = []
    
    for event, elem in context:
        # Check for page tags
        if elem.tag.endswith('page'):
            title_elem = elem.find('.//{*}title')
            text_elem = elem.find('.//{*}text')
            
            if title_elem is not None and text_elem is not None:
                title = title_elem.text
                text = text_elem.text or ""
                
                # Exclude administrative pages, redirects, user pages
                if ":" in title or "Redirect" in text:
                    continue
                
                # Check for academic keywords in text
                matched_category = None
                for category in ACADEMIC_CATEGORIES:
                    if re.search(r'\\b' + re.escape(category) + r'\\b', text, re.IGNORECASE):
                        matched_category = category
                        break
                
                if matched_category:
                    # Clean the body text
                    cleaned = clean_wiki_text(text)
                    if len(cleaned) > 200:
                        excerpt = cleaned[:180] + "..."
                        
                        # Build standard Doomschooler post
                        article = {
                            "id": f"import_{elem.find('.//{*}id').text}",
                            "title": title,
                            "category": matched_category,
                            "excerpt": excerpt,
                            "fullText": cleaned[:1200],  # keep file size optimized
                            "wikiUrl": f"https://simple.wikipedia.org/wiki/{title.replace(' ', '_')}",
                            "estimatedReadTime": max(1, len(cleaned.split()) // 200),
                            "keyTakeaways": [
                                f"Explore the foundational academic principles of {title}.",
                                f"Understand its significance in the field of {matched_category}."
                            ],
                            "funFact": f"This article on {title} was extracted from Wikipedia's {matched_category} branch.",
                            "quiz": {
                                "question": f"Which field of study is the article about '{title}' primarily classified under?",
                                "options": [matched_category, "Other Studies", "Unrelated Theme", "General Culture"],
                                "correctIndex": 0,
                                "explanation": f"'{title}' is categorized under the educational field of {matched_category}."
                            }
                        }
                        articles.append(article)
            elem.clear()
            
    # Save the output
    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)
    
    print(f"Completed! Saved {len(articles)} academic articles.")

# To run:
# process_wikipedia_dump('simplewiki-latest-pages-articles.xml', 'academic_feed.json')
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonScript).then(() => {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    });
  };

  const handleJsonImport = () => {
    setImportError(null);
    setImportSuccess(null);
    try {
      if (!jsonInput.trim()) {
        setImportError('Please paste some JSON content first.');
        return;
      }

      const parsed = JSON.parse(jsonInput);
      
      // Validate that it is an array
      if (!Array.isArray(parsed)) {
        setImportError('Invalid JSON structure. Content must be an array of articles.');
        return;
      }

      // Validate required fields for at least the first item to catch typos
      if (parsed.length > 0) {
        const item = parsed[0];
        if (!item.title || !item.category || !item.excerpt || !item.fullText) {
          setImportError('Article structure missing required fields (title, category, excerpt, fullText).');
          return;
        }
      }

      onImportArticles(parsed);
      setImportSuccess(`Successfully imported ${parsed.length} custom articles into your endless feed!`);
      setJsonInput('');
    } catch (e: any) {
      setImportError(`JSON Parsing Error: ${e.message}`);
    }
  };

  // Pre-load a small copyable sample JSON
  const sampleJson = `[
  {
    "id": "custom_magna_carta",
    "title": "Magna Carta",
    "category": "History",
    "excerpt": "Magna Carta is a royal charter of rights agreed to by King John of England in 1215.",
    "fullText": "Magna Carta, meaning 'Great Charter', is one of the most famous documents in history. It established the principle that everyone, including the king, is subject to the law, and guarantees the rights of individuals, the right to justice and the right to a fair trial.",
    "wikiUrl": "https://simple.wikipedia.org/wiki/Magna_Carta",
    "estimatedReadTime": 2,
    "keyTakeaways": [
      "Agreed to by King John of England at Runnymede in 1215.",
      "Established that the sovereign is subject to the rule of law.",
      "Fostered early ideas of constitutional democracy and jury trials."
    ],
    "funFact": "Only four original copies of the 1215 Magna Carta survive today, kept in Salisbury Cathedral, Lincoln Cathedral, and the British Library.",
    "quiz": {
      "question": "Which English monarch signed the Magna Carta in 1215?",
      "options": ["King John", "King Henry VIII", "Queen Elizabeth I", "King Richard the Lionheart"],
      "correctIndex": 0,
      "explanation": "King John of England was forced by rebel barons to seal the Magna Carta at Runnymede in June 1215."
    }
  }
]`;

  const handleLoadSample = () => {
    setJsonInput(sampleJson);
  };

  return (
    <div className="w-full bg-x-bg border border-x-border rounded-2xl p-6 shadow-sm flex flex-col space-y-6 text-x-text">
      
      {/* Header */}
      <div className="flex items-center space-x-2.5 text-x-text border-b border-x-border pb-4">
        <BookOpen size={20} className="text-x-text/80" />
        <div>
          <h3 className="font-bold text-base tracking-tight">Academic Dataset Pipeline</h3>
          <p className="text-xs text-x-muted">How Doomschooler curates knowledge</p>
        </div>
      </div>

      {/* Info Overview */}
      <div className="space-y-3 text-x-text/90 text-sm leading-relaxed">
        <p>
          Doomschooler runs entirely in your browser using a pre-filtered list of academic articles across STEM, humanities, and social sciences. 
          To filter out pop culture, entertainment, celebrities, and trivia, we utilize a <strong>whitelist of academic category trees</strong>.
        </p>
        <p>
          This is exactly inspired by the Xikipedia approach, separating educational content from the noisy main Wikipedia namespace so that your doomscroll has 100% academic utility.
        </p>
      </div>

      {/* Topic Preferences Settings (Enable/Disable toggles) */}
      <div className="bg-x-secondary border border-x-border rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-x-border pb-3 gap-2">
          <div className="flex items-center space-x-2">
            <Settings2 size={18} className="text-x-blue" />
            <div>
              <h4 className="text-sm font-bold text-x-text">Topic Subscription Settings</h4>
              <p className="text-xs text-x-muted">Toggle curriculum topics on and off so that only enabled topics show on your feed.</p>
            </div>
          </div>
          <div className="flex space-x-2 self-start sm:self-auto">
            <button
              onClick={() => {
                categories.forEach(cat => {
                  if (preferences[cat].excluded) onToggleExclude(cat);
                });
              }}
              className="px-2.5 py-1 text-[11px] font-bold bg-x-bg hover:bg-x-secondary text-x-text border border-x-border rounded transition-colors cursor-pointer"
            >
              Enable All
            </button>
            <button
              onClick={() => {
                categories.forEach(cat => {
                  if (!preferences[cat].excluded) onToggleExclude(cat);
                });
              }}
              className="px-2.5 py-1 text-[11px] font-bold bg-x-bg hover:bg-x-secondary text-x-text border border-x-border rounded transition-colors cursor-pointer"
            >
              Disable All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {categories.map((cat) => {
            const pref = preferences[cat];
            const isEnabled = !pref.excluded;
            const IconComponent = CATEGORY_ICONS[cat] || BookOpen;
            const styleColor = CATEGORY_COLORS[cat] || 'bg-zinc-500/10 text-zinc-500';

            return (
              <div
                key={cat}
                className={`flex items-start p-4 rounded-xl border transition-all duration-200 ${
                  isEnabled
                    ? 'bg-x-bg border-x-border shadow-sm'
                    : 'bg-x-secondary/40 border-x-border/40 opacity-60'
                }`}
              >
                {/* Icon on the left */}
                <div className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 mr-3 mt-0.5 ${styleColor}`}>
                  <IconComponent size={15} />
                </div>

                {/* Content on the right */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  {/* Topic name spans full width of this block */}
                  <span className="font-extrabold text-[14px] text-x-text block truncate" title={cat}>
                    {cat}
                  </span>

                  {/* Status & Toggle switch placed underneath */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-x-border">
                    <span className="text-[10px] text-x-muted font-bold uppercase tracking-wider">
                      {isEnabled ? 'Enabled' : 'Disabled'}
                    </span>

                    {/* Switch Toggle */}
                    <button
                      onClick={() => onToggleExclude(cat)}
                      className={`relative inline-flex h-4.5 w-8.5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isEnabled ? 'bg-x-blue' : 'bg-x-secondary border-x-border'
                      }`}
                      aria-label={`Toggle ${cat}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Pipeline Interactive Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        
        {/* Left Side: Pipeline Custom Import */}
        <div className="space-y-4 bg-x-secondary p-5 border border-x-border rounded-xl">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-x-muted flex items-center space-x-1.5">
              <Upload size={14} />
              <span>Import Custom JSON Dataset</span>
            </h4>
            <button
              onClick={handleLoadSample}
              className="text-[11px] text-x-blue hover:underline"
            >
              Load Sample
            </button>
          </div>
          <p className="text-xs text-x-muted">
            Paste a custom JSON array of academic posts to supplement or replace the feed. 
            All imported articles are saved to your offline-capable browser database.
          </p>

          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Paste your JSON array of articles here...'
            className="w-full h-36 p-3 text-xs font-mono bg-x-bg border border-x-border rounded-lg focus:outline-none focus:ring-1 focus:ring-x-blue text-x-text placeholder:text-x-muted/50"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={handleJsonImport}
              className="px-4 py-2 text-xs font-bold bg-x-blue hover:bg-x-blue-hover text-white rounded-lg flex items-center space-x-1 shadow transition-all"
            >
              <span>Import Dataset</span>
              <ArrowRight size={13} />
            </button>

            {customCount > 0 && (
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-x-muted">{customCount} Custom Sourced</span>
                <button
                  onClick={onClearCustom}
                  className="text-red-500 hover:underline"
                >
                  Clear Sourced
                </button>
              </div>
            )}
          </div>

          {importError && (
            <div className="p-3 bg-red-55/10 dark:bg-red-950/15 border border-red-500/20 text-xs text-red-600 dark:text-red-400 rounded-lg">
              {importError}
            </div>
          )}

          {importSuccess && (
            <div className="p-3 bg-emerald-55/10 dark:bg-emerald-950/15 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 rounded-lg">
              {importSuccess}
            </div>
          )}
        </div>

        {/* Right Side: process_data.py Guide */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-x-muted flex items-center space-x-1.5">
              <FileCode2 size={14} />
              <span>Offline Pipeline Script</span>
            </h4>
            <button
              onClick={copyToClipboard}
              className="text-xs text-x-muted hover:text-x-text flex items-center space-x-1"
            >
              {copiedScript ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
              <span>{copiedScript ? 'Copied' : 'Copy Python Code'}</span>
            </button>
          </div>
          <p className="text-xs text-x-muted">
            Use this Python 3 script locally to parse Wikipedia XML dumps and automatically compile an educational, high-density JSON file:
          </p>
          <div className="bg-x-secondary p-4 border border-x-border rounded-xl overflow-x-auto max-h-56 font-mono text-[10px] leading-relaxed text-x-muted">
            <pre>{pythonScript}</pre>
          </div>
        </div>

      </div>

    </div>
  );
}
