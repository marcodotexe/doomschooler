import { Article, SubjectCategory, QuizQuestion } from '../types';

// Subject keywords mapping for Simple Wikipedia search
const CATEGORY_KEYWORDS: Record<SubjectCategory, string[]> = {
  'Physics': ['Quantum mechanics', 'Thermodynamics', 'Special relativity', 'Gravity', 'Electromagnetism', 'Nuclear physics', 'Particle physics', 'Kinetic energy'],
  'Chemistry': ['Chemical element', 'Periodic table', 'Chemical reaction', 'Molecule', 'Organic chemistry', 'Acid', 'Catalysis', 'Electrochemistry'],
  'Biology': ['Cell biology', 'Evolutionary biology', 'Genetics', 'Photosynthesis', 'Ecology', 'Mitochondria', 'DNA replication', 'Protein synthesis'],
  'Math': ['Calculus', 'Prime number', 'Fibonacci number', 'Geometry', 'Algebra', 'Trigonometry', 'Probability theory', 'Linear algebra'],
  'Computer Science': ['Turing machine', 'Sorting algorithm', 'Computer network', 'Cryptography', 'Artificial intelligence', 'Operating system', 'Data structure', 'Database'],
  'Astronomy': ['Big Bang', 'Supernova', 'Black hole', 'Cosmology', 'Exoplanet', 'Galaxy', 'Solar System', 'Neutron star'],
  'History': ['Rosetta Stone', 'Silk Road', 'Industrial Revolution', 'Ancient Egypt', 'Renaissance', 'Magna Carta', 'Middle Ages', 'French Revolution'],
  'Philosophy': ['Stoicism', 'Epistemology', 'Utilitarianism', 'Socratic method', 'Metaphysics', 'Existentialism', 'Logic', 'Rationalism'],
  'Economics': ['Supply and demand', 'Inflation', 'Game theory', 'Opportunity cost', 'Microeconomics', 'Macroeconomics', 'Gross Domestic Product', 'Monopoly'],
  'Literature': ['Odyssey', 'Shakespearean sonnet', 'Epic poetry', 'Haiku', 'Magical realism', 'Novel', 'Drama', 'Renaissance literature'],
  'Earth Sciences': ['Plate tectonics', 'Water cycle', 'Atmosphere of Earth', 'Ice age', 'Volcano', 'Geology', 'Meteorology', 'Oceanography'],
  'Engineering': ['Semiconductor', 'Steam engine', 'Nanotechnology', 'Suspension bridge', 'Thermodynamics', 'Aerodynamics', 'Robot', 'Civil engineering']
};

// Simple list of generic distractors per subject in case keyword-extraction fails
const GENERIC_DISTRACTORS: Record<SubjectCategory, string[]> = {
  'Physics': ['Quantum Gravity', 'Absolute Zero', 'Kinetic Theory', 'Centripetal Force', 'Cosmic Microwave Background'],
  'Chemistry': ['Valence Electron', 'Covalent Bond', 'Endothermic Reaction', 'Enthalpy Change', 'Noble Gas'],
  'Biology': ['Homeostasis', 'Natural Selection', 'Symbiosis', 'Mitosis Division', 'Photosynthetic Cycle'],
  'Math': ['Golden Ratio', 'Euler Number', 'Pythagorean Theorem', 'Irrational Number', 'Infinity Limit'],
  'Computer Science': ['Binary Search', 'Recursive Function', 'Relational Database', 'Object-Oriented Programming', 'Machine Learning'],
  'Astronomy': ['Red Giant', 'Light Year', 'Singularity', 'Nebula Cloud', 'Kepler Laws'],
  'History': ['Archaeological Record', 'Feudalism System', 'Mercantilism', 'Imperial Decree', 'Cuneiform Writing'],
  'Philosophy': ['Categorical Imperative', 'Dualism Theory', 'Empiricism', 'Virtue Ethics', 'Nihilismism'],
  'Economics': ['Keynesian Model', 'Laissez-faire', 'Consumer Surplus', 'Comparative Advantage', 'Capital Liquidity'],
  'Literature': ['Protagonist Arc', 'Alliteration', 'Onomatopoeia', 'Tragic Flaw', 'Unreliable Narrator'],
  'Earth Sciences': ['Seismic Waves', 'Mantle Convection', 'Saturated Zone', 'Glacial Retreat', 'Stratosphere Layer'],
  'Engineering': ['Tensile Strength', 'Aerodynamic Drag', 'Load Distribution', 'Integrated Circuit', 'Resonance Frequency']
};

/**
 * Searches and fetches a random academic article from Simple Wikipedia
 */
export async function fetchWikiArticle(category: SubjectCategory, existingIds: Set<string>): Promise<Article> {
  // 1. Pick a random keyword from the list for this category
  const keywords = CATEGORY_KEYWORDS[category];
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];

  try {
    // 2. Perform search on Simple Wikipedia
    const searchUrl = `https://simple.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(keyword)}&utf8=1&format=json&origin=*&srlimit=8`;
    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      throw new Error(`Search request failed for keyword ${keyword}`);
    }
    
    const searchData = await searchResponse.json();
    const results = searchData?.query?.search || [];
    
    if (results.length === 0) {
      throw new Error(`No search results found for ${keyword}`);
    }

    // Filter results to find one that isn't already in existingIds
    const availableResults = results.filter((r: any) => !existingIds.has(`wiki_${r.pageid}`));
    const chosenResult = availableResults.length > 0 
      ? availableResults[Math.floor(Math.random() * availableResults.length)]
      : results[Math.floor(Math.random() * results.length)]; // fallback

    if (!chosenResult) {
      throw new Error(`Failed to extract a valid result for keyword ${keyword}`);
    }

    const pageId = chosenResult.pageid;
    const title = chosenResult.title;

    // 3. Fetch intro extract and full wiki URL for the chosen page ID
    const extractUrl = `https://simple.wikipedia.org/w/api.php?action=query&prop=extracts|info&exintro=1&explaintext=1&pageids=${pageId}&inprop=url&format=json&origin=*`;
    const extractResponse = await fetch(extractUrl);

    if (!extractResponse.ok) {
      throw new Error(`Extract request failed for page id ${pageId}`);
    }

    const extractData = await extractResponse.json();
    const pageData = extractData?.query?.pages?.[pageId];

    if (!pageData || !pageData.extract) {
      throw new Error(`No extract content returned for page ${title}`);
    }

    const fullExtract = pageData.extract.trim();
    
    // Ensure the extract has sufficient text, if not, fallback
    if (fullExtract.length < 100) {
      throw new Error(`Extract is too short for page ${title}`);
    }

    // 4. Parse/Generate the fields for our Article
    // Create an excerpt (first 2-3 sentences, up to 180 chars)
    const sentences = fullExtract.split(/(?<=[.!?])\s+/);
    const excerpt = sentences[0] + (sentences[1] ? ' ' + sentences[1] : '');
    const cleanExcerpt = excerpt.length > 200 ? excerpt.slice(0, 197) + '...' : excerpt;

    // Generate Key Takeaways by taking interesting sentences from the text
    const keyTakeaways: string[] = [];
    // Skip the first sentence since it usually repeats the excerpt
    const bodySentences = sentences.slice(1).filter(s => s.length > 30 && s.length < 150);
    
    if (bodySentences.length >= 2) {
      keyTakeaways.push(bodySentences[0]);
      keyTakeaways.push(bodySentences[1]);
    } else {
      keyTakeaways.push(`Learn more about the fundamentals of ${title}.`);
      keyTakeaways.push(`Discover the historical context and scientific principles of ${title}.`);
    }
    // Add custom concluding takeaway
    keyTakeaways.push(`Understand how ${title} impacts modern academic theories and research.`);

    // Fun fact generation (either use a sentence, or make a general fun fact based on category)
    let funFact = `This article about ${title} was dynamically sourced from Simple Wikipedia under the educational category tree of ${category}.`;
    const longerSentences = sentences.filter(s => s.includes('first') || s.includes('famous') || s.includes('discover') || s.includes('popular') || s.includes('known for') || s.includes('called'));
    if (longerSentences.length > 0) {
      funFact = longerSentences[0];
    } else if (sentences[2]) {
      funFact = sentences[2];
    }

    // 5. Generate interactive Quiz Question client-side!
    const quiz = generateDynamicQuiz(title, category, fullExtract);

    const article: Article = {
      id: `wiki_${pageId}`,
      title: title,
      category: category,
      excerpt: cleanExcerpt,
      fullText: fullExtract,
      wikiUrl: pageData.fullurl || `https://simple.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      estimatedReadTime: Math.max(1, Math.ceil(fullExtract.split(/\s+/).length / 200)),
      keyTakeaways: keyTakeaways,
      funFact: funFact,
      quiz: quiz,
      isCustom: true
    };

    return article;
  } catch (error) {
    console.warn(`Wiki fetch failed for ${category} with keyword ${keyword}:`, error);
    throw error;
  }
}

/**
 * Generates an interactive multiple-choice quiz question based on article title, text, and category
 */
function generateDynamicQuiz(title: string, category: SubjectCategory, text: string): QuizQuestion {
  const words = text.split(/\s+/).map(w => w.replace(/[^a-zA-Z]/g, '')).filter(w => w.length > 5);
  
  // Find a good, prominent word in the text to blank out (e.g. 6+ chars, isn't the title itself)
  const lowerTitle = title.toLowerCase();
  const validWords = words.filter(w => {
    const lw = w.toLowerCase();
    return !lowerTitle.includes(lw) && lw !== 'wikipedia' && lw !== 'article' && lw !== 'simple';
  });

  let targetWord = 'principle';
  if (validWords.length > 0) {
    // Pick one of the top frequent long words or a random one
    targetWord = validWords[Math.floor(Math.random() * Math.min(validWords.length, 15))];
  }

  // Find a sentence containing the target word to use as the question
  const sentences = text.split(/(?<=[.!?])\s+/);
  let containingSentence = '';
  for (const s of sentences) {
    if (s.toLowerCase().includes(targetWord.toLowerCase()) && s.length > 40 && s.length < 180) {
      containingSentence = s;
      break;
    }
  }

  // If no good short sentence, construct a conceptual fill-in-the-blank
  let questionText = '';
  let correctIdx = 0;
  let options: string[] = [];

  if (containingSentence) {
    // Replace the word with a blank
    const regex = new RegExp(`\\b${targetWord}\\b`, 'gi');
    questionText = containingSentence.replace(regex, '__________');
    
    // Choose distractors
    const distractors = GENERIC_DISTRACTORS[category] || ['Option A', 'Option B', 'Option C'];
    options = [
      targetWord.charAt(0).toUpperCase() + targetWord.slice(1).toLowerCase(),
      distractors[0],
      distractors[1],
      distractors[2]
    ];
    // Shuffle options
    correctIdx = shuffleArray(options, targetWord);
  } else {
    // Fallback general question about the article
    questionText = `What is the primary academic field or subject matter explored in the Wikipedia article "${title}"?`;
    options = [
      category,
      category === 'Physics' ? 'History' : 'Physics',
      category === 'Literature' ? 'Biology' : 'Literature',
      category === 'Math' ? 'Philosophy' : 'Math'
    ];
    // Filter duplicates
    options = Array.from(new Set(options));
    while (options.length < 4) {
      options.push('General Studies');
    }
    correctIdx = shuffleArray(options, category);
  }

  return {
    question: questionText,
    options: options,
    correctIndex: correctIdx,
    explanation: `Based on the academic article about "${title}", the correct answer is "${options[correctIdx]}".`
  };
}

// Utility to shuffle options and return new index of target
function shuffleArray(arr: string[], target: string): number {
  const targetLower = target.toLowerCase();
  
  // Clean up options
  const formattedTarget = target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
  
  // Ensure target is in array and formatted
  const cleanArr = arr.map(item => {
    if (item.toLowerCase() === targetLower) {
      return formattedTarget;
    }
    return item;
  });

  // Fisher-Yates shuffle
  for (let i = cleanArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cleanArr[i], cleanArr[j]] = [cleanArr[j], cleanArr[i]];
  }

  // Find index of target
  let index = cleanArr.findIndex(item => item.toLowerCase() === targetLower);
  if (index === -1) {
    // force it to 0 if not found
    cleanArr[0] = formattedTarget;
    index = 0;
  }

  // Update array in-place
  for (let i = 0; i < arr.length; i++) {
    arr[i] = cleanArr[i];
  }

  return index;
}
