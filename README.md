# Doomschooler 🎓📱

Doomschooler is an endless, scrollable, social-media-style feed designed for micro-learning and academic discovery. It transforms educational content from Simple Wikipedia into an engaging, Twitter-like social media timeline, pairing modern micro-learning mechanics with interactive quizzes, topic preferences, and personal learning statistics.

Rather than "doomscrolling" through negative news, users can "doomschool" through bite-sized, fascinating encyclopedic knowledge from various domains.

---

## 🚀 Key Features

- **Micro-Learning Feed**: An endless, scrollable timeline resembling modern social media feeds. Each card presents high-value facts, extracts, and images curated from Simple Wikipedia.
- **Interactive Quizzes**: Embedded, interactive multi-option quizzes on educational cards to instantly test your reading comprehension, complete with explanations and live stats tracking.
- **Dynamic Wikipedia Sourcing**: seamless blending of rich pre-selected static educational topics and live Wikipedia API ingestion when scrolling for endless learning.
- **Smart Engagement Metrics**: Twitter/X-style engagement counters (comments, retweets, likes, bookmarks) with simulated seed-based social metrics designed with proportional logic (ensuring likes always remain the dominant metric).
- **Tailored Topic Settings**: Fully customizable interest/topic preferences. Toggle topics such as Physics, Chemistry, Biology, History, Computer Science, Literature, and more, allowing you to fine-tune your feed's recommendation weights.
- **Personal Learning Stats**: View insights, streaks, active reading duration, bookmarks, and quiz success ratios in a centralized dashboard.
- **Clean Responsive Design**: Tailored visual layouts optimized for both compact mobile interfaces and large desktop monitors, equipped with beautiful system styling, dark mode support, and micro-interactions powered by `motion`.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: React 19 + TypeScript (TSX)
- **Bundler & Build Tool**: Vite 6+
- **Styling**: Tailwind CSS v4 for elegant typography, spatial density, and responsive alignments
- **Animations**: `motion` (formerly Framer Motion) for rich micro-interactions and page transitions
- **Icons**: `lucide-react` for clean, modular vector iconography
- **Environment**: ESM-first Node.js execution

---

## 📁 Project Structure

```text
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── DatasetInfo.tsx    # Topic management & preference toggles
│   │   ├── FeedCard.tsx       # Timeline post card with dynamic actions, quizzes, & metrics
│   │   ├── StatsPanel.tsx     # Student dashboard, streak trackers, & analytics charts
│   │   └── SubjectFilter.tsx  # Horizontal/vertical quick topic filters
│   ├── data/                  # Curated seed educational articles & JSON assets
│   ├── utils/                 # Utilities and integrations
│   │   ├── recommendation.ts  # Client-side feedback loop & content selection algorithms
│   │   └── wikiApi.ts         # Simple Wikipedia API parser & fetch client
│   ├── App.tsx                # Main application wrapper and state container
│   ├── index.css              # Global styles, typography imports, and custom Tailwind configurations
│   ├── main.tsx               # Client entry point
│   └── types.ts               # Global TypeScript definitions & interfaces
├── index.html                 # HTML application frame
├── metadata.json              # Platform configuration parameters
├── package.json               # Package dependencies & npm commands
└── tsconfig.json              # TypeScript compilation rules
```

---

## 🏁 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 1. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 2. Run the Development Server

Start the local development server on port `3000`:

```bash
npm run dev
```

Your app will be available to preview at `http://localhost:3000`.

### 3. Build for Production

Compile the production assets into the `dist/` folder:

```bash
npm run build
```

---

## 📊 Client-Side Recommendation Logic

The application leverages a feedback-aware selection mechanism located in `src/utils/recommendation.ts`:
1. **User Feedback Scoring**: Tracks clicks, bookmark status, like events, quiz correctness, and scrolling dwell/linger time (e.g. tracking visible focus of at least 800ms via `IntersectionObserver`).
2. **Category Weight Tuning**: Dynamic score tables for each category shift as you engage with topics. Positive interactions boost category weight, while custom excluded topics in the Settings screen are blocked entirely.
3. **Selection Mixing**: Merges top-recommended articles, category-balanced entries, and a small percentage of randomized exploratory content to prevent user-bubble traps while retaining strong personalization.
