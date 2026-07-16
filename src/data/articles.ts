import { Article } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  // --- PHYSICS ---
  {
    id: 'phys_relativity',
    title: 'Special Relativity',
    category: 'Physics',
    excerpt: 'Special relativity is a theory proposed by Albert Einstein in 1905. It explains how speed affects mass, time, and space.',
    fullText: 'Albert Einstein’s theory of Special Relativity is based on two main ideas: first, that the laws of physics are the exact same for all observers moving at a constant speed, and second, that the speed of light in a vacuum is always constant (about 300,000 kilometers per second), no matter how fast you or the light source are moving.\n\nFrom these simple rules, Einstein discovered amazing things: as you travel closer to the speed of light, time slows down for you compared to people standing still (this is called Time Dilation). In addition, your physical length gets shorter in the direction you are traveling (Length Contraction), and your mass increases, requiring infinitely more energy to go faster. This relationship led to the famous equation E=mc², meaning energy and mass are two forms of the same thing.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Special_relativity',
    estimatedReadTime: 3,
    keyTakeaways: [
      'The speed of light is the absolute speed limit of the universe.',
      'Time dilation means moving clocks run slower than stationary ones.',
      'Mass increases and length contracts at extreme relativistic speeds.',
      'E=mc² proves that mass can be converted into massive amounts of energy.'
    ],
    funFact: 'Because of time dilation, astronauts on the International Space Station age slightly slower than humans on Earth—about 0.007 seconds slower every six months!',
    quiz: {
      question: 'What happens to time for an object traveling close to the speed of light relative to a stationary observer?',
      options: [
        'Time speeds up',
        'Time slows down',
        'Time stops completely at any speed',
        'Time flows backwards'
      ],
      correctIndex: 1,
      explanation: 'Time dilation means that as an object moves faster through space, it moves slower through time compared to a stationary observer.'
    }
  },
  {
    id: 'phys_superposition',
    title: 'Quantum Superposition',
    category: 'Physics',
    excerpt: 'Superposition is a core principle of quantum mechanics where a particle can exist in multiple states at the exact same time.',
    fullText: 'In classical physics, a light switch is either ON or OFF. However, in the quantum world (the study of subatomic particles like electrons), a system can be in multiple states at once until it is measured. This is called superposition.\n\nA famous analogy is Schrödinger’s Cat—a thought experiment where a cat in a sealed box is both alive and dead at the same time until someone opens the box. In physics, when we actually measure or observe a quantum particle, its superposition "collapses" into a single, definite state. Superposition is the fundamental basis of quantum computing, where qubits can represent both a 0 and a 1 simultaneously, enabling incredibly fast calculations.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Superposition_principle',
    estimatedReadTime: 2,
    keyTakeaways: [
      'Subatomic particles can exist in multiple states simultaneously.',
      'Measurement forces a quantum system to choose a single definite state.',
      'The math uses wave functions to describe the probabilities of different states.',
      'Quantum computers use qubits in superposition to process vast amounts of data.'
    ],
    funFact: 'The transition from quantum superposition to classical reality is called "decoherence," caused by the particle colliding with random molecules or photons.',
    quiz: {
      question: 'How does quantum superposition differ from classical physics?',
      options: [
        'Quantum objects are larger and move faster',
        'Quantum objects can exist in multiple states simultaneously until measured',
        'Quantum objects do not have any mass',
        'Quantum objects exist only in vacuum tubes'
      ],
      correctIndex: 1,
      explanation: 'Unlike classical objects which must have definite states, quantum particles exist in a combination (superposition) of potential states until an observation collapses their wavefunction.'
    }
  },
  {
    id: 'phys_entropy',
    title: 'Entropy and Thermodynamics',
    category: 'Physics',
    excerpt: 'Entropy is a measure of disorder or randomness in a closed system, showing why time only moves forward.',
    fullText: 'The Second Law of Thermodynamics states that the total entropy (disorder) of an isolated system always increases over time. Think of a clean bedroom: without active energy put into tidying it, it naturally gets messy over time. Similarly, heat flows naturally from warm objects to colder ones, never the reverse.\n\nEntropy explains the "Arrow of Time"—why you can see an egg break, but never see it un-break itself. At the grand scale of the cosmos, entropy suggests the universe is heading toward a state of maximum disorder where all energy is evenly spread out, a theoretical end state known as the Heat Death of the Universe.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Entropy',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Entropy measures the degree of randomness or disorder in a system.',
      'The Second Law of Thermodynamics dictates that entropy must always increase.',
      'Entropy gives the universe a clear direction of time (the arrow of time).',
      'The eventual "Heat Death" is a state where no useful energy can do work.'
    ],
    funFact: 'Even when you clean your room, reducing its local entropy, you release heat and carbon dioxide, increasing the total entropy of the universe as a whole!',
    quiz: {
      question: 'What does the Second Law of Thermodynamics say about the entropy of an isolated system?',
      options: [
        'It always decreases',
        'It stays perfectly constant forever',
        'It always increases or remains constant',
        'It fluctuates randomly without a pattern'
      ],
      correctIndex: 2,
      explanation: 'The Second Law states that in any isolated system, entropy (disorder) naturally tends to increase over time.'
    }
  },

  // --- CHEMISTRY ---
  {
    id: 'chem_bonds',
    title: 'Chemical Bonding',
    category: 'Chemistry',
    excerpt: 'Chemical bonds are the forces holding atoms together to form molecules and compounds, primarily through electrons.',
    fullText: 'Atoms want to be stable, and they achieve stability by filling their outer shell of electrons (often needing 8 electrons, known as the Octet Rule). To do this, they form chemical bonds with other atoms in three main ways:\n\n1. Covalent Bonds: Atoms share pairs of electrons (like two hydrogen atoms sharing electrons with an oxygen atom to form water H₂O).\n2. Ionic Bonds: One atom steals an electron from another. This creates charged atoms (ions)—one positive and one negative—which magnetically stick together (like sodium Na+ giving an electron to chlorine Cl- to form table salt NaCl).\n3. Metallic Bonds: Electrons flow freely in a shared "sea" around metal nuclei, which explains why metals conduct electricity and are easy to bend.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Chemical_bond',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Chemical bonds form so atoms can reach a stable electron configuration.',
      'Covalent bonds share electrons; ionic bonds transfer electrons.',
      'The Octet Rule states that atoms are happiest with 8 valence electrons.',
      'Metallic bonds feature a shared pool of free-flowing electrons.'
    ],
    funFact: 'Water has a high boiling point because its covalent bonds are highly polar, creating secondary hydrogen bonds between neighboring water molecules!',
    quiz: {
      question: 'What type of chemical bond is formed when atoms share electrons?',
      options: [
        'Ionic Bond',
        'Covalent Bond',
        'Metallic Bond',
        'Magnetic Bond'
      ],
      correctIndex: 1,
      explanation: 'Covalent bonds are defined by the sharing of electron pairs between atoms, usually non-metals.'
    }
  },
  {
    id: 'chem_catalysts',
    title: 'Catalysts and Enzymes',
    category: 'Chemistry',
    excerpt: 'A catalyst is a substance that speeds up a chemical reaction without being consumed or permanently altered in the process.',
    fullText: 'Chemical reactions require a certain amount of start-up energy to get going, known as the Activation Energy. A catalyst works by providing an alternative pathway with a much lower activation energy, allowing the reaction to happen much faster and under lower temperatures.\n\nIn living organisms, biological catalysts are called Enzymes. Most enzymes are specialized proteins. They have a specific shape (active site) that fits target molecules (substrates) like a lock and key. Without enzymes, the essential chemical reactions in your body—like breaking down food or copying DNA—would happen too slowly to sustain life.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Catalyst',
    estimatedReadTime: 2,
    keyTakeaways: [
      'Catalysts speed up reactions by lowering the activation energy barrier.',
      'Catalysts are not consumed by the chemical reactions they assist.',
      'Enzymes are specialized protein catalysts crucial for biological life.',
      'The lock-and-key model describes how enzymes selectively bind substrates.'
    ],
    funFact: 'Catalytic converters in cars use rare metals like platinum and palladium to catalyze toxic carbon monoxide into harmless carbon dioxide!',
    quiz: {
      question: 'How does a catalyst speed up a chemical reaction?',
      options: [
        'By increasing the temperature of the mixture',
        'By lowering the activation energy needed for the reaction',
        'By adding extra atoms to the final product',
        'By absorbing excess oxygen from the environment'
      ],
      correctIndex: 1,
      explanation: 'Catalysts work by lowering the activation energy, which is the energy threshold required for a chemical reaction to occur.'
    }
  },

  // --- BIOLOGY ---
  {
    id: 'bio_dna',
    title: 'DNA: The Code of Life',
    category: 'Biology',
    excerpt: 'DNA, or deoxyribonucleic acid, is the molecule that carries genetic instructions for all living things.',
    fullText: 'DNA is shaped like a twisted ladder, famously called a Double Helix. The sides of the ladder are made of sugars and phosphates, while the rungs are made of four chemical bases: Adenine (A), Thymine (T), Cytosine (C), and Guanine (G).\n\nThese four bases act like letters in a recipe book. The specific order of these bases tells cells how to build proteins, which in turn build your body, control your eye color, and regulate your organs. Every human has about 3 billion base pairs of DNA, and 99.9% of that code is identical to every other human on Earth. The remaining 0.1% accounts for all our individual differences.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/DNA',
    estimatedReadTime: 3,
    keyTakeaways: [
      'DNA is a double-helix molecule carrying hereditary instructions.',
      'The four base chemical letters are A, T, C, and G.',
      'A always pairs with T, and C always pairs with G.',
      'Genes are segments of DNA that contain instructions for making proteins.'
    ],
    funFact: 'If you uncoiled and stretched out all the DNA molecules in a single one of your body’s cells, it would measure about 2 meters long!',
    quiz: {
      question: 'Which of the following is the correct pairing of DNA chemical bases?',
      options: [
        'A with C, T with G',
        'A with G, C with T',
        'A with T, C with G',
        'A with A, C with C'
      ],
      correctIndex: 2,
      explanation: 'In DNA base pairing, Adenine (A) always bonds with Thymine (T), and Cytosine (C) always bonds with Guanine (G).'
    }
  },
  {
    id: 'bio_photosynthesis',
    title: 'Photosynthesis',
    category: 'Biology',
    excerpt: 'Photosynthesis is the process plants use to convert sunlight, water, and carbon dioxide into sugars and oxygen.',
    fullText: 'Photosynthesis is how plants, algae, and some bacteria feed themselves. It takes place in tiny cellular organs called Chloroplasts, which contain a green pigment called Chlorophyll. Chlorophyll absorbs solar energy, primarily from red and blue light.\n\nUsing this light energy, the plant breaks apart molecules of water (H₂O) absorbed by its roots and carbon dioxide (CO₂) absorbed from the air. It reorganizes these atoms into glucose (C₆H₁₂O₆)—a simple sugar used for growth and energy—and releases oxygen (O₂) back into the air as a waste product. The chemical equation is: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Photosynthesis',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Photosynthesis turns solar energy into stable chemical energy (glucose).',
      'It takes place in chloroplasts using green chlorophyll pigments.',
      'Water and carbon dioxide are reactants; glucose and oxygen are products.',
      'Practically all oxygen in Earth’s atmosphere was produced by photosynthesis.'
    ],
    funFact: 'While plants produce oxygen during the day, they actually consume small amounts of oxygen at night to burn glucose for energy, just like animals!',
    quiz: {
      question: 'What are the primary raw inputs (reactants) required for photosynthesis?',
      options: [
        'Oxygen and Glucose',
        'Carbon Dioxide, Water, and Light Energy',
        'Nitrogen, Oxygen, and Soil Nutrients',
        'Carbon Monoxide, Sugar, and Heat'
      ],
      correctIndex: 1,
      explanation: 'Plants use light energy to combine carbon dioxide (CO₂) from the air and water (H₂O) from the soil to synthesize glucose and release oxygen.'
    }
  },

  // --- MATH ---
  {
    id: 'math_fibonacci',
    title: 'The Fibonacci Sequence',
    category: 'Math',
    excerpt: 'The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, appearing frequently in nature.',
    fullText: 'Starting with 0 and 1, the Fibonacci sequence goes: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, and so on. It was introduced to Western Europe by Italian mathematician Leonardo Fibonacci in 1202.\n\nWhat makes this sequence incredible is its relationship to the Golden Ratio (approximately 1.618). If you divide any Fibonacci number by the one before it (like 55/34), you get closer and closer to 1.618 the further you go. When mapped geometrically, it forms a logarithmic spiral (the Golden Spiral). This exact spiral appears throughout the natural world: in the seed arrangement of sunflowers, the curves of pinecones, the shells of nautiluses, and even the spirals of hurricanes.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Fibonacci_number',
    estimatedReadTime: 2,
    keyTakeaways: [
      'Each Fibonacci number is the sum of the previous two numbers.',
      'The ratio of successive Fibonacci numbers approaches the Golden Ratio (1.618).',
      'This ratio allows plants to pack leaves and seeds with maximum efficiency.',
      'The sequence appears in art, architecture, and stock market analysis.'
    ],
    funFact: 'Many flowers have a Fibonacci number of petals! Lilies have 3, buttercups have 5, marigolds have 13, and daisies often have 34 or 55.',
    quiz: {
      question: 'What is the next number in this Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13...?',
      options: [
        '18',
        '20',
        '21',
        '25'
      ],
      correctIndex: 2,
      explanation: 'Since 8 + 13 = 21, the next number in the Fibonacci sequence after 13 is 21.'
    }
  },
  {
    id: 'math_calculus',
    title: 'The Concept of Calculus',
    category: 'Math',
    excerpt: 'Calculus is the mathematical study of continuous change, split into differential and integral calculus.',
    fullText: 'Invented independently in the late 17th century by Isaac Newton and Gottfried Wilhelm Leibniz, Calculus solved a massive problem: how to calculate things that change dynamically over time, like the speed of a falling apple or the orbit of planets.\n\nCalculus is split into two main branches:\n1. Differential Calculus: Measures rates of change (derivatives). Think of it as finding your speedometer reading at one exact millisecond.\n2. Integral Calculus: Calculates accumulation (integrals), such as finding the area under a curved line or the total distance traveled over a trip with changing speeds.\nThese two branches are linked by the Fundamental Theorem of Calculus, which proves that differentiation and integration are reverse operations of each other.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Calculus',
    estimatedReadTime: 3,
    keyTakeaways: [
      'Calculus is the mathematics of change, motion, and accumulation.',
      'Differential calculus finds instantaneous rates of change (slopes).',
      'Integral calculus finds total accumulated quantities (areas under curves).',
      'Newton used it to model gravitational laws and orbital motion.'
    ],
    funFact: 'Isaac Newton invented calculus when he was just 23 years old, during a quarantine break from college when the Great Plague hit London!',
    quiz: {
      question: 'What are the two primary branches of calculus?',
      options: [
        'Algebra and Geometry',
        'Probability and Statistics',
        'Differential and Integral',
        'Arithmetic and Trigonometry'
      ],
      correctIndex: 2,
      explanation: 'Calculus is fundamentally divided into differential calculus (rates of change) and integral calculus (accumulation of quantities).'
    }
  },

  // --- COMPUTER SCIENCE ---
  {
    id: 'cs_turing',
    title: 'Turing Machines',
    category: 'Math', // CS can overlap or CS
    excerpt: 'A Turing machine is a mathematical model of computation that defines what a computer can and cannot do.',
    fullText: 'Invented by Alan Turing in 1936, a Turing machine is not a physical machine, but a thought experiment. It consists of an infinitely long paper tape divided into squares, a tape head that can read and write symbols on the tape, and a set of instructions.\n\nDespite its simple design, Turing proved that this machine could simulate any computer algorithm ever written. This concept gave birth to modern computer science. It also helped define the limits of computing: Turing showed that some problems can never be solved by a computer, such as the "Halting Problem"—the question of whether a computer program will eventually finish running or run forever in an infinite loop.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Turing_machine',
    estimatedReadTime: 3,
    keyTakeaways: [
      'A Turing machine is a theoretical model that defines computability.',
      'It consists of an infinite tape, a scanner head, and a state register.',
      'Any computer algorithm can be computed by a Universal Turing Machine.',
      'The Halting Problem proves there are mathematical problems computers can never solve.'
    ],
    funFact: 'Turing’s theories on computability directly led to the cracking of the German Enigma code during World War II, shortening the war by an estimated two years!',
    quiz: {
      question: 'What did Alan Turing prove with the Halting Problem?',
      options: [
        'All computer programs will eventually halt',
        'There are some computational problems that no computer program can ever solve',
        'Turing machines can run without electricity',
        'Computers will eventually gain human consciousness'
      ],
      correctIndex: 1,
      explanation: 'The Halting Problem is a classic proof showing that it is mathematically impossible to write a general algorithm that can determine whether any arbitrary program will halt or run forever.'
    }
  },
  {
    id: 'cs_sorting',
    title: 'Sorting Algorithms',
    category: 'Computer Science',
    excerpt: 'Sorting algorithms are step-by-step instructions that put elements of a list in a specific order (like alphabetical or numerical).',
    fullText: 'Sorting is one of the most common tasks in computer science. Different algorithms use different strategies to organize data, and they are measured by their time efficiency (using "Big O Notation").\n\n- Bubble Sort: A simple but slow algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It is O(n²) efficiency.\n- Merge Sort: A fast "divide and conquer" algorithm. It splits the list in half, recursively sorts the halves, and merges them back together. It has O(n log n) efficiency, making it highly effective for massive datasets.\n- Quick Sort: Chooses a "pivot" element, partitions the list around the pivot, and sorts. It is highly efficient in practice.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Sorting_algorithm',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Sorting algorithms organize unordered data arrays.',
      'Efficiency is analyzed using Big O notation to measure computation growth.',
      'Simple sorts (Bubble, Insertion) are easy but scale poorly on large datasets.',
      'Divide-and-conquer sorts (Merge, Quick) split data to achieve optimal speeds.'
    ],
    funFact: 'If you were to sort a deck of cards using Bubble Sort, you would compare adjacent cards and swap them over and over—taking up to 1,326 comparisons!',
    quiz: {
      question: 'Which of the following describes the strategy used by Merge Sort?',
      options: [
        'Swapping adjacent elements repeatedly',
        'Divide and conquer (splitting, sorting, and merging)',
        'Picking random elements and throwing out wrong ones',
        'Sorting only the first and last elements'
      ],
      correctIndex: 1,
      explanation: 'Merge Sort uses a "divide and conquer" strategy, splitting lists into smaller sublists until they are 1-element large, then merging them back in sorted order.'
    }
  },

  // --- ASTRONOMY ---
  {
    id: 'astro_bigbang',
    title: 'The Big Bang Theory',
    category: 'Astronomy',
    excerpt: 'The Big Bang is the leading scientific explanation for how our universe began, starting from an infinitely dense point.',
    fullText: 'About 13.8 billion years ago, all space, time, matter, and energy in the universe were compressed into an infinitely hot, infinitely dense point called a Singularity. The Big Bang was not an explosion of matter into pre-existing space; rather, it was the rapid expansion of space itself.\n\nAs the universe expanded, it cooled down, allowing subatomic particles to form, then simple atoms (hydrogen and helium), and eventually stars and galaxies. The key evidence for this theory includes cosmic expansion (discovered by Edwin Hubble, who noticed galaxies are flying away from us) and the Cosmic Microwave Background (CMB)—the lingering heat glow left over from the early universe.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Big_Bang',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'The universe originated 13.8 billion years ago from a singularity.',
      'The Big Bang describes the expansion of space itself, not a typical explosion.',
      'Galaxies moving away from us proves the universe is still expanding.',
      'Cosmic Microwave Background (CMB) is the thermal echo of the early hot universe.'
    ],
    funFact: 'If you tune an old-fashioned analog TV between stations, about 1% of the black-and-white static fuzz you see on the screen is caused by interference from the CMB radiation of the Big Bang!',
    quiz: {
      question: 'What is the "Cosmic Microwave Background" (CMB)?',
      options: [
        'Radiation from kitchen appliances',
        'The sound of black holes colliding',
        'The leftover heat radiation from the early universe',
        'The light emitted by the nearest star system'
      ],
      correctIndex: 2,
      explanation: 'The Cosmic Microwave Background is the electromagnetic radiation left over from the early stage of the universe, acting as a crucial snapshot of the Big Bang.'
    }
  },
  {
    id: 'astro_supernova',
    title: 'Supernovae',
    category: 'Astronomy',
    excerpt: 'A supernova is a colossal stellar explosion that occurs at the end of a massive star’s life cycle.',
    fullText: 'Stars are in a constant tug-of-war: gravity tries to crush them, while the outward energy from nuclear fusion in their cores resists. When a massive star (at least 8 times the size of our sun) runs out of fuel, nuclear fusion stops. Gravity wins instantly, causing the star to collapse in on itself in a fraction of a second.\n\nThis rapid collapse creates a massive shockwave that blows the star’s outer layers into space in an explosion so bright it can briefly outshine an entire galaxy of billions of stars. The remaining core is crushed into either a hyper-dense Neutron Star or, if the star was heavy enough, a Black Hole.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Supernova',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Supernovae occur when massive stars run out of nuclear fuel.',
      'The collapse of the core causes a massive shockwave explosion.',
      'Heavy chemical elements like gold, iron, and uranium are forged in supernovae.',
      'The collapse leaves behind a neutron star or a black hole.'
    ],
    funFact: 'Almost all the heavy elements in your body—like the iron in your blood and the calcium in your bones—were forged inside stars and blown into space by ancient supernovae. You are literally made of stardust!',
    quiz: {
      question: 'What celestial objects can be left behind after a massive star goes supernova?',
      options: [
        'A red giant or white dwarf',
        'A neutron star or black hole',
        'An asteroid belt or comet tail',
        'A new terrestrial planet'
      ],
      correctIndex: 1,
      explanation: 'Depending on the remaining mass of the star’s collapsed core, it will either compress into an ultra-dense neutron star or collapse completely into a black hole.'
    }
  },

  // --- HISTORY ---
  {
    id: 'hist_rosetta',
    title: 'The Rosetta Stone',
    category: 'History',
    excerpt: 'The Rosetta Stone is an ancient Egyptian artifact that allowed modern scholars to finally decipher Egyptian hieroglyphs.',
    fullText: 'Discovered by French soldiers in Egypt in 1799, the Rosetta Stone is a dark granodiorite slab containing a decree issued in 196 BC. The decree is written in three different scripts: Ancient Egyptian hieroglyphs (used by priests), Demotic script (used for daily writing), and Ancient Greek (used by the government).\n\nBecause scholars could read Greek, they used it as a translation key. By comparing the Greek names and phrases to the symbols in the Egyptian sections, French scholar Jean-François Champollion deciphered the hieroglyphs in 1822. This breakthrough unlocked thousands of years of recorded Egyptian history that had been unreadable for over a millennium.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Rosetta_Stone',
    estimatedReadTime: 2,
    keyTakeaways: [
      'The Rosetta Stone has a decree written in three different scripts.',
      'Scholars used Ancient Greek to translate the unknown Egyptian Hieroglyphs.',
      'It was discovered during Napoleon’s military campaign in Egypt in 1799.',
      'It is currently housed in the British Museum in London, a subject of custody debates.'
    ],
    funFact: 'Before its historical value was recognized, the Rosetta Stone was being used as ordinary building material to construct a wall in a French fort near Rashid (Rosetta)!',
    quiz: {
      question: 'Why was the Rosetta Stone so critical for understanding Egyptian history?',
      options: [
        'It contained a map to the hidden tomb of Tutankhamun',
        'It was the first written record of the invention of paper',
        'It provided a parallel text in Greek, allowing hieroglyphs to be translated',
        'It proved that Egyptians had traded with ancient Rome'
      ],
      correctIndex: 2,
      explanation: 'Because the decree was carved in three writing systems including Ancient Greek, translators were able to use Greek as a guide to decode the phonetic and symbolic language of Egyptian hieroglyphs.'
    }
  },
  {
    id: 'hist_silkroad',
    title: 'The Silk Road',
    category: 'History',
    excerpt: 'The Silk Road was an ancient network of trade routes connecting China and the Far East with Europe and the Mediterranean.',
    fullText: 'Active from around 130 BC to the mid-15th century, the Silk Road stretched over 6,400 kilometers. It was not a single paved highway, but a vast network of land and sea routes. While silk from China was highly valued, many other goods traveled along these routes: spices, glass, porcelain, paper, gunpowder, and precious metals.\n\nMore importantly, the Silk Road was a conduit for cultural exchange. Religions (Buddhism, Islam, Christianity), technologies (printing, papermaking), languages, and ideas spread across continents. However, it also carried diseases—it is believed the Bubonic Plague (Black Death) traveled from Central Asia to Europe along these active trade paths.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Silk_Road',
    estimatedReadTime: 3,
    keyTakeaways: [
      'The Silk Road linked China and the Mediterranean from 130 BC onwards.',
      'It facilitated the exchange of goods, ideas, science, and cultures.',
      'It played a major role in spreading paper-making, gunpowder, and printing.',
      'It also acted as a pathway for major pandemics, like the Black Death.'
    ],
    funFact: 'Travelers rarely crossed the entire Silk Road themselves. Instead, goods were traded in stages through a series of middle-men, merchants, and remote trading posts!',
    quiz: {
      question: 'What was the historical significance of the Silk Road beyond the trading of physical goods?',
      options: [
        'It established a single global currency',
        'It spread cultures, technologies, and religions across Europe and Asia',
        'It was the first route navigated by steamships',
        'It resulted in the conquest of China by the Roman Empire'
      ],
      correctIndex: 1,
      explanation: 'The Silk Road’s greatest impact was cultural and technological diffusion, spreading philosophy, printing, paper, mathematics, and major world religions across continents.'
    }
  },

  // --- PHILOSOPHY ---
  {
    id: 'phil_cave',
    title: 'Plato’s Allegory of the Cave',
    category: 'Philosophy',
    excerpt: 'The Allegory of the Cave is a philosophical metaphor about the nature of reality, belief, and human perception.',
    fullText: 'Presented by Plato in his book *The Republic*, the allegory describes prisoners chained inside a dark cave since childhood. They face a blank wall and cannot turn their heads. Behind them, a fire burns, and puppeteers carry objects, casting shadows on the wall. To the prisoners, these shadows are the absolute truth of reality.\n\nIf one prisoner is freed and dragged outside into the sunlight, the bright light initially hurts his eyes. Gradually, he adjusts and sees the real world—the trees, the sun, and the sky. He realizes the cave shadows were just illusions. If he returns to the cave to free the others, they might think he has gone crazy because his eyes can no longer see the dark shadows well, and they may resist or kill him. Plato used this to describe how philosophers seek true knowledge, while most of society remains content believing superficial appearances.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Allegory_of_the_Cave',
    estimatedReadTime: 3,
    keyTakeaways: [
      'The cave shadows represent illusions or unexamined beliefs.',
      'The journey out of the cave symbolizes the painful path to education and truth.',
      'The sun represents the ultimate form of Goodness and Truth.',
      'Societies often resist new, challenging ideas that contradict comfortable beliefs.'
    ],
    funFact: 'This 2,400-year-old allegory is the conceptual inspiration behind famous modern sci-fi movies like *The Matrix*!',
    quiz: {
      question: 'In Plato’s Allegory of the Cave, what do the shadows on the wall represent?',
      options: [
        'The true forms of nature',
        'Superficial appearances and unexamined beliefs',
        'The ghosts of ancient ancestors',
        'Scientific theories proven by math'
      ],
      correctIndex: 1,
      explanation: 'The shadows represent the lowest level of cognitive awareness—empirical appearances and societal illusions that people mistake for absolute reality.'
    }
  },
  {
    id: 'phil_stoicism',
    title: 'The Philosophy of Stoicism',
    category: 'Philosophy',
    excerpt: 'Stoicism is an ancient Greek philosophy that teaches how to find peace of mind by focusing only on what is in your control.',
    fullText: 'Founded in Athens by Zeno of Citium around 300 BC, Stoicism became highly popular in Rome, practiced by both a slave (Epictetus) and an Emperor (Marcus Aurelius). At its core, Stoicism teaches that we cannot control external events, but we have absolute control over how we react to them.\n\nStoics divide things into two categories: things in our control (our thoughts, desires, actions, character) and things out of our control (weather, traffic, other people’s opinions, death). By letting go of worry about external things and practicing four cardinal virtues—Wisdom, Courage, Justice, and Temperance—a person can achieve *ataraxia* (tranquility and freedom from distress).',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Stoicism',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Stoicism focuses on the distinction between internal control and external factors.',
      'Suffering comes not from events, but from our judgments about those events.',
      'The four key virtues are Wisdom, Courage, Justice, and Temperance (Self-control).',
      'Stoics practice reflecting on worst-case scenarios to reduce anxiety.'
    ],
    funFact: 'Marcus Aurelius’ famous book *Meditations* was never meant to be published! It was his private personal journal written to himself while fighting military campaigns.',
    quiz: {
      question: 'According to Stoicism, what is the primary source of human suffering?',
      options: [
        'Bad weather and economic disasters',
        'Our internal judgments and reactions to external events',
        'Having too few physical possessions',
        'A lack of formal political power'
      ],
      correctIndex: 1,
      explanation: 'Stoics argue that external events are morally neutral; our distress arises entirely from our internal judgments and resistance to things we cannot control.'
    }
  },

  // --- ECONOMICS ---
  {
    id: 'econ_supplydemand',
    title: 'Supply and Demand',
    category: 'Economics',
    excerpt: 'Supply and demand is an economic model that explains how prices are determined in a free market.',
    fullText: 'The relationship between supply and demand governs the cost of almost everything you buy:\n\n- The Law of Demand: As the price of an item goes up, people want to buy less of it. If price drops, demand goes up.\n- The Law of Supply: As the price of an item goes up, businesses want to produce more of it to make a profit. If price drops, supply drops.\n\nThe point where the supply curve and demand curve cross is called the Equilibrium Price. At this price, the amount of goods sellers want to sell is exactly equal to the amount buyers want to buy, stabilizing the market.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Supply_and_demand',
    estimatedReadTime: 2,
    keyTakeaways: [
      'Demand drops when prices rise; supply increases when prices rise.',
      'Market forces naturally push prices toward equilibrium.',
      'Shortages occur when demand exceeds supply; surpluses occur when supply exceeds demand.',
      'Government price controls (like rent caps) can disrupt this natural balance.'
    ],
    funFact: 'During the COVID-19 pandemic, a sudden surge in demand for toilet paper combined with rigid supply lines caused global shortages and massive price spikes!',
    quiz: {
      question: 'What is the "equilibrium price" in economics?',
      options: [
        'The highest price a seller can legally charge',
        'The price where the quantity demanded equals the quantity supplied',
        'The cost of producing a single item',
        'The average price of goods across a country'
      ],
      correctIndex: 1,
      explanation: 'Equilibrium is the stable point where market demand matches market supply, meaning there are no active shortages or surpluses.'
    }
  },
  {
    id: 'econ_gametheory',
    title: 'Game Theory & Prisoner’s Dilemma',
    category: 'Economics',
    excerpt: 'Game theory is the mathematical study of strategic decision-making between competitive players.',
    fullText: 'Used extensively in economics, biology, and military strategy, Game Theory analyzes situations where your success depends on the choices of others. A classic example is the Prisoner’s Dilemma:\n\nTwo criminals are arrested. The police lock them in separate rooms. If both stay silent, they both get 1 year in jail. If one betrays the other while the partner stays silent, the betrayer goes free while the partner gets 10 years. If both betray each other, both get 5 years.\n\nMathematically, the "rational" choice for each individual is to betray the other, leading to a worse outcome for both (5 years) than if they had co-operated (1 year). This stable state where no player can improve their outcome by changing strategy alone is called a Nash Equilibrium.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Game_theory',
    estimatedReadTime: 3,
    keyTakeaways: [
      'Game theory models strategic interactions where outcomes depend on multiple players.',
      'The Prisoner’s Dilemma shows why cooperation is difficult even when beneficial.',
      'A Nash Equilibrium is a state where no player has an incentive to deviate.',
      'It is used to understand price wars, nuclear deterrence, and animal behaviors.'
    ],
    funFact: 'The mathematician who discovered Nash Equilibrium, John Nash, was the subject of the Oscar-winning biography movie *A Beautiful Mind*!',
    quiz: {
      question: 'In the Prisoner’s Dilemma, why do rational players often fail to achieve the optimal cooperative outcome?',
      options: [
        'They are physically blocked from speaking',
        'Individual self-interest drives them to betray each other to avoid the worst-case scenario',
        'They do not understand the rules of the game',
        'The police force them to write down confessions'
      ],
      correctIndex: 1,
      explanation: 'Because neither player can guarantee the other will cooperate, the fear of getting the worst outcome (10 years) drives both to rationally betray, resulting in a suboptimal mutual punishment.'
    }
  },

  // --- LITERATURE ---
  {
    id: 'lit_odyssey',
    title: 'Homer’s Odyssey',
    category: 'Literature',
    excerpt: 'The Odyssey is an ancient Greek epic poem attributed to Homer, chronicling the 10-year journey of Odysseus returning home from the Trojan War.',
    fullText: 'Composed around the 8th century BC, *The Odyssey* is one of the oldest and most influential works of Western literature. It follows Odysseus, King of Ithaca, as he tries to sail home after the fall of Troy.\n\nHis journey takes a decade because he angers Poseidon, god of the sea. Odysseus must face terrifying obstacles: the Cyclops Polyphemus, the seductive Sirens who lure sailors to their deaths with music, the six-headed monster Scylla, and the witch Circe who turns his crew into pigs. Meanwhile, back in Ithaca, his faithful wife Penelope must fend off aggressive suitors trying to steal his throne, believing Odysseus is dead. The epic explores themes of loyalty, hospitality (*xenia*), cleverness over physical strength, and fate.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Odyssey',
    estimatedReadTime: 3,
    keyTakeaways: [
      'The Odyssey is a classical Greek epic poem about a hero’s journey home.',
      'Odysseus wins conflicts through cunning and wit (like the Trojan Horse).',
      'The poem establishes structural tropes for modern storytelling (the Hero’s Journey).',
      'It emphasizes "xenia" (hospitality), a vital sacred duty in ancient Greece.'
    ],
    funFact: 'The English word "odyssey," meaning a long, adventurous journey full of spiritual growth, comes directly from the title of this epic poem!',
    quiz: {
      question: 'How long does it take Odysseus to return to Ithaca after the Trojan War ends?',
      options: [
        'One year',
        'Five years',
        'Ten years',
        'Twenty years'
      ],
      correctIndex: 2,
      explanation: 'The Trojan War itself lasted 10 years, and Odysseus wandered the seas for an additional 10 years before finally reaching home, making it 20 years away in total.'
    }
  },

  // --- EARTH SCIENCES ---
  {
    id: 'earth_tectonics',
    title: 'Plate Tectonics',
    category: 'Earth Sciences',
    excerpt: 'Plate tectonics is the scientific theory explaining how Earth’s outer crust is divided into massive sliding plates, forming mountains and causing earthquakes.',
    fullText: 'Earth’s outer layer, the lithosphere, is not a solid sphere like a billiard ball. Instead, it is broken into about 15 large and small puzzle pieces called Tectonic Plates. These plates float on a semi-liquid layer of hot rock called the asthenosphere, moving extremely slowly (about 2 to 10 centimeters per year, the speed at which fingernails grow).\n\nWhere these plates meet, major geological events happen:\n- Divergent Boundaries: Plates pull apart, allowing magma to rise and create new crust (like the Mid-Atlantic Ridge).\n- Convergent Boundaries: Plates crash together, pushing up colossal mountain ranges (like the Himalayas, where India is colliding with Asia).\n- Transform Boundaries: Plates slide sideways past each other, getting stuck and then suddenly releasing energy, causing earthquakes (like the San Andreas Fault in California).',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Plate_tectonics',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Earth’s crust is broken into moving tectonic plates.',
      'Plates slide on the mantle driven by convection heat currents inside the Earth.',
      'Mountain building, volcanic arcs, and ocean trenches form at plate boundaries.',
      'Earthquakes are primarily caused by friction at transform plate faults.'
    ],
    funFact: 'Because of plate tectonics, Mount Everest is still growing taller by about 4 millimeters every single year!',
    quiz: {
      question: 'What geological feature is formed when two continental tectonic plates crash directly into each other?',
      options: [
        'A deep ocean trench',
        'A mountain range',
        'A desert plain',
        'A perfectly circular lake'
      ],
      correctIndex: 1,
      explanation: 'When two thick continental plates collide, neither can easily sink. Instead, they crumple and buckle upwards, creating massive mountain chains like the Himalayas.'
    }
  },

  // --- ENGINEERING ---
  {
    id: 'eng_semiconductors',
    title: 'Semiconductors',
    category: 'Engineering',
    excerpt: 'Semiconductors are materials that conduct electricity better than insulators but worse than conductors, acting as the brain of modern electronics.',
    fullText: 'A standard conductor (like copper) lets electricity flow easily, while an insulator (like rubber) blocks it. A semiconductor (usually Silicon) is special because its electrical conductivity can be precisely controlled by adding impurities (a process called "Doping") or applying voltage.\n\nBy layering positive (P-type) and negative (N-type) doped silicon, engineers created the Transistor—a tiny electrical switch with no moving parts. By turning this switch ON or OFF, it represents binary data (1s and 0s). Today, microchips the size of a fingernail contain billions of these microscopic transistors, forming the fundamental building blocks of all computers, smartphones, and digital devices.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Semiconductor',
    estimatedReadTime: 3,
    keyTakeaways: [
      'Semiconductors have electrical conductivity between conductors and insulators.',
      'Silicon is the most commonly used semiconductor element.',
      'Doping is the deliberate addition of impurities to alter electrical traits.',
      'Transistors made of semiconductors act as microscopic digital binary switches.'
    ],
    funFact: 'The famous "Silicon Valley" in California got its name from the high concentration of semiconductor and computer businesses that started there in the 20th century!',
    quiz: {
      question: 'What is the primary material used to manufacture most modern semiconductor microchips?',
      options: [
        'Copper',
        'Gold',
        'Silicon',
        'Plastic'
      ],
      correctIndex: 2,
      explanation: 'Silicon is an abundant, highly stable metalloid element that serves as the foundation for almost all modern computer chips and semiconductor transistors.'
    }
  },

  // --- MORE ARTICLES FOR INIFINITY AND DIVERSITY ---
  {
    id: 'phys_blackholes',
    title: 'Black Holes',
    category: 'Physics',
    excerpt: 'A black hole is a region of space where gravity is so strong that absolutely nothing—not even light—can escape.',
    fullText: 'Black holes are created when extremely massive stars collapse under their own gravity at the end of their lives. Inside a black hole, matter is squeezed into an infinitely small, infinitely dense point called a Gravitational Singularity.\n\nThe boundary of a black hole is called the Event Horizon. Once any object crosses this boundary, the escape velocity required exceeds the speed of light, making escape mathematically impossible. Because gravity is so intense near a black hole, it warps the fabric of space and time. According to relativity, an outside observer would see an astronaut falling toward a black hole slow down and freeze at the event horizon, while the astronaut’s clock would tick normally from their own perspective.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Black_hole',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Black holes form from the gravitational collapse of massive stars.',
      'The Event Horizon is the point of no return where escape velocity exceeds light speed.',
      'A singularity at the center holds infinite density and zero volume.',
      'Time dilates dramatically near strong gravitational fields.'
    ],
    funFact: 'If you fell into a black hole, gravity would pull much harder on your feet than your head, stretching you out like a noodle in a real physics process called "Spaghettification"!',
    quiz: {
      question: 'What is the "Event Horizon" of a black hole?',
      options: [
        'The physical solid surface of the core',
        'The boundary of no return, where even light cannot escape',
        'The outer ring of gas and dust orbiting the black hole',
        'The portal to another dimension'
      ],
      correctIndex: 1,
      explanation: 'The event horizon is the theoretical boundary around a black hole where the gravitational pull becomes so strong that escape is impossible, even for light.'
    }
  },
  {
    id: 'bio_mitochondria',
    title: 'Mitochondria & ATP',
    category: 'Biology',
    excerpt: 'Mitochondria are the powerhouses of cells, generating chemical energy called ATP that fuels life.',
    fullText: 'Mitochondria are rod-shaped organelles found in almost all eukaryotic cells (cells with a nucleus). Their primary job is to perform Cellular Respiration: they take nutrients from food (like glucose) and oxygen, and convert them into Adenosine Triphosphate (ATP).\n\nATP is the universal energy currency of life. Every movement of your muscles, heartbeat, thought in your brain, and chemical reaction in your body uses up ATP. Mitochondria are unique because they have their own separate DNA, which is inherited entirely from your mother. This has led scientists to believe that mitochondria started as independent ancient bacteria that were swallowed by another cell billions of years ago and formed a cooperative partnership (Endosymbiotic Theory).',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Mitochondrion',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Mitochondria generate ATP, the chemical fuel cells use for action.',
      'They perform cellular respiration using glucose and oxygen.',
      'Mitochondria contain their own distinct circular DNA, separate from cell nuclear DNA.',
      'The Endosymbiotic Theory explains their evolutionary origin as ancient bacteria.'
    ],
    funFact: 'Active cells require much more energy! A single human heart muscle cell can contain up to 5,000 individual mitochondria to sustain continuous beating!',
    quiz: {
      question: 'According to the Endosymbiotic Theory, what were mitochondria originally billions of years ago?',
      options: [
        'Viruses',
        'Independent single-celled bacteria',
        'Tiny plants',
        'Shed pieces of nuclear DNA'
      ],
      correctIndex: 1,
      explanation: 'The Endosymbiotic Theory suggests mitochondria descended from ancient oxygen-breathing bacteria that entered into a symbiotic relationship inside larger host cells.'
    }
  },
  {
    id: 'hist_industrial',
    title: 'The Industrial Revolution',
    category: 'History',
    excerpt: 'The Industrial Revolution was the transition to new manufacturing processes, starting in Great Britain in the 18th century.',
    fullText: 'Beginning around 1760, the Industrial Revolution transformed humanity from agrarian, hand-craft societies into urban, machine-industrial economies. It was powered by key innovations:\n\n1. Steam Engine: James Watt’s improvements allowed coal to generate mechanical work, freeing factories from needing water wheels.\n2. Mechanized Textiles: The Spinning Jenny and power loom allowed fabrics to be made at 100x speed.\n3. Iron smelting: Using coal instead of wood allowed massive production of iron for machines, bridges, and railways.\n\nWhile it created immense wealth and built the modern world, it also caused massive social disruption, forcing families into overcrowded, polluted cities with harsh factory working conditions, sparking the rise of labor unions and new political philosophies.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Industrial_Revolution',
    estimatedReadTime: 3,
    keyTakeaways: [
      'The Industrial Revolution began in Great Britain in the mid-1700s.',
      'Coal and steam replaced human, animal, and water-wheel power.',
      'Transportation was revolutionized by steam locomotives and steamships.',
      'It led to rapid urbanization, changing social structures, and labor laws.'
    ],
    funFact: 'Before the Industrial Revolution, almost everyone lived in rural areas. Today, for the first time in human history, more than 55% of the world’s population lives in cities!',
    quiz: {
      question: 'Which energy resource was the primary driver of the early Industrial Revolution?',
      options: [
        'Solar Power',
        'Petroleum Oil',
        'Coal (to power Steam Engines)',
        'Nuclear Fission'
      ],
      correctIndex: 2,
      explanation: 'Coal was the vital natural resource that fueled the newly invented steam engines, heating water to produce high-pressure steam that drove mechanical machinery.'
    }
  },
  {
    id: 'phil_utilitarianism',
    title: 'Utilitarianism',
    category: 'Philosophy',
    excerpt: 'Utilitarianism is an ethical theory which states that the best action is the one that maximizes overall happiness and reduces suffering.',
    fullText: 'Developed by English philosophers Jeremy Bentham and John Stuart Mill in the 18th and 19th centuries, Utilitarianism is a consequentialist theory—meaning it judges whether an action is right or wrong based entirely on its results.\n\nIts main rule is the "Greatest Happiness Principle": always act to produce the greatest amount of good for the greatest number of people. In utilitarian math, all individuals’ happiness is counted equally. This makes it a highly practical guide for public policy, law, and economics, but it faces famous ethical challenges. For instance, is it moral to sacrifice one healthy person’s organs to save five dying patients? While it maximizes net lives saved, it conflicts with individual human rights.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Utilitarianism',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Utilitarianism judges morality based on consequences, not rules or duties.',
      'The goal is to maximize pleasure/utility and minimize pain/suffering.',
      'JS Mill refined it to differentiate "higher" intellectual pleasures from "lower" physical ones.',
      'It can sometimes conflict with classical theories of individual human rights.'
    ],
    funFact: 'Jeremy Bentham was so dedicated to utilitarianism that he donated his own body to science! His skeleton, dressed in his actual clothes and topped with a wax head, is still kept on display at University College London.',
    quiz: {
      question: 'What is the core principle of Utilitarian ethics?',
      options: [
        'Always follow religious commandments',
        'Act only according to duties that can be universal laws',
        'Do whatever produces the greatest happiness for the greatest number of people',
        'Prioritize your own survival above all other concerns'
      ],
      correctIndex: 2,
      explanation: 'Utilitarianism’s foundational tenet is the Greatest Happiness Principle, which evaluates actions based on their utility in maximizing overall societal well-being and minimizing pain.'
    }
  },
  {
    id: 'math_prime_numbers',
    title: 'Prime Numbers and Cryptography',
    category: 'Math',
    excerpt: 'Prime numbers are numbers greater than 1 divisible only by 1 and themselves, serving as the locks for modern digital security.',
    fullText: 'A prime number is a building block of arithmetic: 2, 3, 5, 7, 11, 13, 17, and so on. Every whole number can be factored uniquely into prime numbers (the Fundamental Theorem of Arithmetic). For example, 60 = 2 × 2 × 3 × 5.\n\nWhile prime numbers seem like abstract pure math, they are the secret protectors of your credit card transactions. Modern cryptography algorithms like RSA use a simple mathematical asymmetry: it is incredibly easy for a computer to multiply two giant prime numbers together (e.g., a 300-digit number), but it is virtually impossible for even a supercomputer to do the reverse (factoring a giant composite number back into its original primes) without the key. This "one-way door" forms the basis of secure encryption on the internet.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Prime_number',
    estimatedReadTime: 2.5,
    keyTakeaways: [
      'Primes are numbers divisible only by 1 and themselves.',
      'Every positive integer can be represented as a unique product of primes.',
      'RSA encryption relies on the extreme computational difficulty of factoring large numbers.',
      'The search for massive primes is ongoing, using global computing grids.'
    ],
    funFact: 'The largest known prime number (found in 2024) is over 41 million digits long! If you tried to print it out, it would fill a stack of books as tall as a house!',
    quiz: {
      question: 'Why are prime numbers so important to internet security and encryption?',
      options: [
        'They are harder to type than normal numbers',
        'It is very easy to multiply two massive primes, but extremely difficult to factor the result back into primes',
        'They represent the electrical pulses in computer wires',
        'They prevent physical theft of laptops'
      ],
      correctIndex: 1,
      explanation: 'Modern encryption algorithms rely on mathematical trapdoor functions. Factoring the product of two huge prime numbers is a computationally heavy, slow task, keeping data secure against unauthorized decoding.'
    }
  },
  {
    id: 'econ_opportunity_cost',
    title: 'Opportunity Cost',
    category: 'Economics',
    excerpt: 'Opportunity cost is the value of the next best alternative you must give up to make a decision.',
    fullText: 'In economics, resources (time, money, labor) are always scarce. When you make a choice, you automatically choose *not* to do something else. The value of that lost second-best choice is your "opportunity cost."\n\nFor example, if you spend $10 and 2 hours watching a movie, your opportunity cost is not just the $10; it is also the 2 hours you could have spent studying, sleeping, or working a job that pays $15/hour. By understanding opportunity cost, individuals and businesses can make better, more rational decisions, recognizing that the "cost" of any action includes all the potential benefits they are actively forfeiting.',
    wikiUrl: 'https://simple.wikipedia.org/wiki/Opportunity_cost',
    estimatedReadTime: 2,
    keyTakeaways: [
      'All decisions involve trade-offs because resources are finite.',
      'Opportunity cost is the value of the foregone next-best option.',
      'It includes both explicit costs (money) and implicit costs (time, effort).',
      'It helps explain international trade and the law of comparative advantage.'
    ],
    funFact: 'Going to college has a massive opportunity cost! Beyond tuition fees, you are giving up four full years of full-time salary you could have earned by working immediately.',
    quiz: {
      question: 'Which of the following best defines "Opportunity Cost"?',
      options: [
        'The monetary tax charged by governments on investments',
        'The total cost of raw materials in manufacturing',
        'The value of the next-best alternative you sacrifice when making a choice',
        'The discount received when buying bulk products'
      ],
      correctIndex: 2,
      explanation: 'Opportunity cost measures what you give up in order to get something else—the benefits of the next best alternative that was not selected.'
    }
  }
];
