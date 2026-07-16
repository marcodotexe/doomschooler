import { Article, SubjectCategory, SubjectPreferences, StudyStats, UserInteraction } from '../types';
import { INITIAL_ARTICLES } from '../data/articles';

// Local storage keys
const PREFS_KEY = 'doomschooler_preferences';
const STATS_KEY = 'doomschooler_stats';
const SEEN_KEY = 'doomschooler_seen_articles';
const BOOKMARKS_KEY = 'doomschooler_bookmarks';
const INTER_KEY = 'doomschooler_interactions';
const CUSTOM_ART_KEY = 'doomschooler_custom_articles';

// Default preferences
export const DEFAULT_PREFERENCES: SubjectPreferences = {
  'Physics': { weight: 1.0, pinned: false, excluded: false },
  'Chemistry': { weight: 1.0, pinned: false, excluded: false },
  'Biology': { weight: 1.0, pinned: false, excluded: false },
  'Math': { weight: 1.0, pinned: false, excluded: false },
  'Computer Science': { weight: 1.0, pinned: false, excluded: false },
  'Astronomy': { weight: 1.0, pinned: false, excluded: false },
  'History': { weight: 1.0, pinned: false, excluded: false },
  'Philosophy': { weight: 1.0, pinned: false, excluded: false },
  'Economics': { weight: 1.0, pinned: false, excluded: false },
  'Literature': { weight: 1.0, pinned: false, excluded: false },
  'Earth Sciences': { weight: 1.0, pinned: false, excluded: false },
  'Engineering': { weight: 1.0, pinned: false, excluded: false },
};

// Default stats
export const DEFAULT_STATS: StudyStats = {
  totalScrolled: 0,
  totalExpanded: 0,
  totalLingerTimeMs: 0,
  streak: 1,
  brainsGained: 0,
  quizzesAttempted: 0,
  quizzesCorrect: 0,
  categoryCounts: {},
};

export class RecommendationEngine {
  private preferences: SubjectPreferences = { ...DEFAULT_PREFERENCES };
  private stats: StudyStats = { ...DEFAULT_STATS };
  private seenArticles: Set<string> = new Set();
  private bookmarkedArticles: Set<string> = new Set();
  private interactions: UserInteraction[] = [];
  private customArticles: Article[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const prefsStr = localStorage.getItem(PREFS_KEY);
      if (prefsStr) {
        this.preferences = JSON.parse(prefsStr);
        // Ensure any newly added categories are initialized
        Object.keys(DEFAULT_PREFERENCES).forEach((cat) => {
          if (!this.preferences[cat]) {
            this.preferences[cat] = { ...DEFAULT_PREFERENCES[cat] };
          }
        });
      }

      const statsStr = localStorage.getItem(STATS_KEY);
      if (statsStr) {
        this.stats = JSON.parse(statsStr);
      }

      const seenStr = localStorage.getItem(SEEN_KEY);
      if (seenStr) {
        const arr = JSON.parse(seenStr);
        this.seenArticles = new Set(arr);
      }

      const bookmarksStr = localStorage.getItem(BOOKMARKS_KEY);
      if (bookmarksStr) {
        const arr = JSON.parse(bookmarksStr);
        this.bookmarkedArticles = new Set(arr);
      }

      const interStr = localStorage.getItem(INTER_KEY);
      if (interStr) {
        this.interactions = JSON.parse(interStr);
      }

      const customStr = localStorage.getItem(CUSTOM_ART_KEY);
      if (customStr) {
        this.customArticles = JSON.parse(customStr);
      }
    } catch (e) {
      console.error('Error loading data from local storage', e);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(this.preferences));
      localStorage.setItem(STATS_KEY, JSON.stringify(this.stats));
      localStorage.setItem(SEEN_KEY, JSON.stringify(Array.from(this.seenArticles)));
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(this.bookmarkedArticles)));
      localStorage.setItem(INTER_KEY, JSON.stringify(this.interactions));
      localStorage.setItem(CUSTOM_ART_KEY, JSON.stringify(this.customArticles));
    } catch (e) {
      console.error('Error saving data to local storage', e);
    }
  }

  // Get current preferences
  getPreferences(): SubjectPreferences {
    return this.preferences;
  }

  // Get current stats
  getStats(): StudyStats {
    return this.stats;
  }

  // Get bookmarks list
  getBookmarks(): Set<string> {
    return this.bookmarkedArticles;
  }

  // Get custom/downloaded articles list
  getCustomArticles(): Article[] {
    return this.customArticles;
  }

  // Update preferences manually (e.g. from the top filter bar)
  toggleCategoryPin(category: SubjectCategory) {
    if (this.preferences[category]) {
      this.preferences[category].pinned = !this.preferences[category].pinned;
      if (this.preferences[category].pinned) {
        this.preferences[category].excluded = false; // can't be pinned and excluded
      }
      this.saveToStorage();
    }
  }

  toggleCategoryExclude(category: SubjectCategory) {
    if (this.preferences[category]) {
      this.preferences[category].excluded = !this.preferences[category].excluded;
      if (this.preferences[category].excluded) {
        this.preferences[category].pinned = false; // can't be pinned and excluded
      }
      this.saveToStorage();
    }
  }

  resetAllPreferences() {
    this.preferences = JSON.parse(JSON.stringify(DEFAULT_PREFERENCES));
    this.saveToStorage();
  }

  // Log a user interaction and adjust weights dynamically
  logInteraction(interaction: Omit<UserInteraction, 'viewedAt'>) {
    const fullInteraction: UserInteraction = {
      ...interaction,
      viewedAt: Date.now(),
    };

    this.interactions.push(fullInteraction);
    if (this.interactions.length > 500) {
      this.interactions.shift(); // Keep logs clean
    }

    // Dynamic preference adjustment based on action
    const category = interaction.category;
    if (this.preferences[category]) {
      let weightDelta = 0;

      if (interaction.disliked) {
        // Slashing interest if marked "Not Interested"
        weightDelta = -0.6;
      } else {
        // Boost for positive interaction triggers
        if (interaction.liked) weightDelta += 0.5;
        if (interaction.expanded) weightDelta += 0.3;
        if (interaction.bookmarked) weightDelta += 0.4;
        if (interaction.quizSolved) {
          weightDelta += 0.4;
          if (interaction.quizCorrect) {
            weightDelta += 0.2;
          }
        }

        // Linger time bonus (scrolling past is 0, lingering > 3s is positive)
        if (interaction.lingerTimeMs > 4000) {
          const lingerSeconds = Math.min(interaction.lingerTimeMs / 1000, 20); // cap at 20 seconds
          weightDelta += 0.05 * (lingerSeconds - 4); // linear bonus for lingering longer
        }
      }

      // Apply the delta with bounds [0.1, 5.0] to prevent starvation or monopoly
      const currentWeight = this.preferences[category].weight;
      this.preferences[category].weight = Math.max(0.1, Math.min(5.0, currentWeight + weightDelta));
    }

    // Mark as seen
    this.seenArticles.add(interaction.articleId);

    // Update stats counters
    this.stats.totalScrolled++;
    if (interaction.expanded) this.stats.totalExpanded++;
    this.stats.totalLingerTimeMs += interaction.lingerTimeMs;

    // Track total views per category
    if (!this.stats.categoryCounts[category]) {
      this.stats.categoryCounts[category] = 0;
    }
    this.stats.categoryCounts[category] = (this.stats.categoryCounts[category] || 0) + 1;

    // Brains Gained Points System!
    let points = 5; // standard read/scroll
    if (interaction.expanded) points += 15;
    if (interaction.bookmarked) points += 10;
    if (interaction.liked) points += 10;
    if (interaction.quizSolved) {
      points += 20;
      if (interaction.quizCorrect) points += 30;
    }
    this.stats.brainsGained += points;

    this.saveToStorage();
  }

  // Complete a quiz from feed card
  logQuizAttempt(articleId: string, category: SubjectCategory, correct: boolean) {
    this.stats.quizzesAttempted++;
    if (correct) {
      this.stats.quizzesCorrect++;
      this.stats.brainsGained += 50; // extra bonus for solving quiz correctly
    } else {
      this.stats.brainsGained += 10; // pity points for trying
    }

    // Find last interaction for this article or log a new one
    const idx = this.interactions.findIndex((i) => i.articleId === articleId);
    if (idx !== -1) {
      this.interactions[idx].quizSolved = true;
      this.interactions[idx].quizCorrect = correct;
    }

    this.saveToStorage();
  }

  // Toggle bookmarked status
  toggleBookmark(articleId: string) {
    if (this.bookmarkedArticles.has(articleId)) {
      this.bookmarkedArticles.delete(articleId);
    } else {
      this.bookmarkedArticles.add(articleId);
    }
    this.saveToStorage();
    return this.bookmarkedArticles.has(articleId);
  }

  // Clear seen history so user can see posts again
  clearHistory() {
    this.seenArticles.clear();
    this.saveToStorage();
  }

  // Clear all metrics and reset app
  resetAllStats() {
    this.stats = { ...DEFAULT_STATS };
    this.seenArticles.clear();
    this.bookmarkedArticles.clear();
    this.interactions = [];
    this.customArticles = [];
    this.preferences = JSON.parse(JSON.stringify(DEFAULT_PREFERENCES));
    this.saveToStorage();
  }

  // Save dynamically downloaded article to custom list
  addCustomArticle(article: Article) {
    // Avoid duplicates
    if (!this.customArticles.some((a) => a.id === article.id) && !INITIAL_ARTICLES.some((a) => a.id === article.id)) {
      this.customArticles.push(article);
      this.saveToStorage();
    }
  }

  // Fetch candidate pool: combined initial + custom downloaded articles
  getAllAvailableArticles(): Article[] {
    return [...INITIAL_ARTICLES, ...this.customArticles];
  }

  // Select the next N recommended articles for the scroll queue
  getNextBatch(count: number = 5, excludeIds: Set<string> | string[] = new Set()): Article[] {
    const allArticles = this.getAllAvailableArticles();
    const excludeSet = excludeIds instanceof Set ? excludeIds : new Set(excludeIds);

    // Filter out excluded categories completely
    const filteredArticles = allArticles.filter((article) => {
      const pref = this.preferences[article.category];
      if (pref && pref.excluded) {
        return false;
      }
      return true;
    });

    if (filteredArticles.length === 0) {
      // Fallback in case user excluded everything
      return allArticles.filter(a => !excludeSet.has(a.id)).slice(0, count);
    }

    // Separate unseen and seen articles, also filtering out already excluded IDs
    const unseen = filteredArticles.filter((a) => !this.seenArticles.has(a.id) && !excludeSet.has(a.id));
    let pool = unseen;
    if (pool.length === 0) {
      pool = filteredArticles.filter((a) => !excludeSet.has(a.id));
    }
    if (pool.length === 0) {
      pool = filteredArticles; // Complete fallback
    }

    // Score each article in the pool
    const scored = pool.map((article) => {
      const pref = this.preferences[article.category] || { weight: 1.0, pinned: false };
      
      // Calculate multiplier base
      let baseWeight = pref.weight;

      // Pinned category gets massive priority
      if (pref.pinned) {
        baseWeight *= 4.0;
      }

      // Add a random factor to maintain serendipity (important for endless scrolling feeds)
      const randomFactor = 0.6 + Math.random() * 0.8; // [0.6, 1.4]
      const score = baseWeight * randomFactor;

      return { article, score };
    });

    // Sort by score descending and take top N
    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, count).map((item) => item.article);
  }
}
