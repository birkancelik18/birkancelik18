// ============================================
// PORTFOLIO DATA
// ============================================
// This file contains all the content for your portfolio.
// To add new content, simply add objects to the arrays below.
// No HTML editing required!

// ============================================
// ABOUT SECTION
// ============================================
const aboutData = {
    name: "Birkan Celik",
    title: "Computer Engineering Master's Student",
    tagline: "AI systems, designed around people.",
    location: "Politecnico di Milano · Milan, Italy",
    bio: "I’m pursuing a master’s degree in Computer Science & Engineering at Politecnico di Milano. I build AI systems at the intersection of human-computer interaction and biomedical signals. My work connects research with practical tools for the people who use them.",
    profileImage: "images/birkan_furhat_selfie.jpg",
};

// ============================================
// DIMENSIONS
// ============================================
const dimensionsData = {
    hci: {
        id: "hci",
        title: "HCI",
        subtitle: "Human-Computer Interaction",
        summary: "Sketch recognition, tangible interfaces, and accessible learning tools.",
        description: "Previously researched and developed sketch recognition models by integrating human perception principles at Koc University Intelligent User Interfaces Laboratory. Worked on accessible e-learning interfaces and tangible computing to improve human-computer interaction.",
        icon: "", // Removed emoji for elegant design
        color: "#B8B8B3",
        pageContent: {
            overview: "My work in Human-Computer Interaction focuses on creating more intuitive and accessible interfaces that bridge the gap between human cognition and digital systems. Through previous research at Koc University's Intelligent User Interfaces Laboratory, I explored how we can make technology more natural and inclusive.",
            highlights: [
                "Sketch recognition using deep learning and human perception principles",
                "Accessible e-learning interfaces for diverse learners",
                "Tangible computing for improved interaction paradigms",
                "Research presented at international conferences"
            ],
            researchAreas: [
                "Sketch Recognition & Understanding",
                "Accessible Interface Design",
                "Tangible User Interfaces",
                "Human Perception in Computing"
            ]
        }
    },
    startup: {
        id: "startup",
        title: "Products & Prototypes",
        subtitle: "Personal Projects & Innovation",
        summary: "AI applications and prototypes that turn an idea into a practical tool.",
        description: "Projects I work on in my free time alongside my studies and research. These include intelligent web applications and other innovative solutions that combine technical expertise with practical applications.",
        icon: "", // Removed emoji for elegant design
        color: "#B8B8B3",
        pageContent: {
            overview: "My startup ideas represent a space for experimentation and innovation. These initiatives allow me to explore new technologies, solve interesting problems, and build solutions that combine my technical skills with creative thinking.",
            highlights: [
                "AI-powered applications",
                "Innovative problem-solving approaches",
                "Full-stack development projects"
            ],
            researchAreas: [
                "Autonomous Systems",
                "AI Applications",
                "Full-Stack Development",
                "Innovation & Prototyping"
            ]
        }
    },
    biomedical: {
        id: "biomedical",
        title: "Healthcare & AI",
        subtitle: "Healthcare Technology",
        summary: "EEG signal processing, neural interfaces, and assistive communication.",
        description: "Researching brain-computer interfaces and neural engineering at University of Essex. Preprocessing EEG data through spectral analysis and engineering deep learning models for mental state classification to improve healthcare outcomes.",
        icon: "", // Removed emoji for elegant design
        color: "#B8B8B3",
        pageContent: {
            overview: "My research in biomedical signals focuses on understanding and interpreting neural data to create assistive technologies and improve healthcare outcomes. Working with EEG data and brain-computer interfaces, I develop deep learning models that can decode mental states and neural patterns.",
            highlights: [
                "EEG signal preprocessing and spectral analysis",
                "Deep learning models for mental state classification",
                "Brain-computer interface development",
                "Neural signal to text conversion"
            ],
            researchAreas: [
                "Brain-Computer Interfaces (BCI)",
                "EEG Signal Processing",
                "Neural Engineering",
                "Assistive Technologies"
            ]
        }
    }
};

// ============================================
// PROJECTS
// ============================================
// To add a new project, copy the structure below and add it to the array
// Add detailed content in the 'details' field for the project page
const projectsData = [
    {
        id: 10,
        title: "PAIR LEGAL: AI-Powered Contract Copilot",
        cardTitle: "PAIR LEGAL",
        cardSummary: "AI contract review inside Microsoft Word, with clause analysis, precedent search, and document Q&A.",
        description: "A Microsoft Word add-in that automates first-pass contract review, helps legal teams spot risks, and keeps language consistent — all without leaving Word.",
        image: "images/Pair/how_pair_legal_initiates.png",
        techStack: ["React", "Office.js", "Fluent UI", "Azure Functions", "Node.js", "OpenAI", "RAG"],
        dimensions: ["startup"],
        links: {},
        date: "2024-2025",
        details: {
            overview: "PAIR LEGAL is a contract review assistant that lives inside Microsoft Word. The idea is simple: instead of bouncing between Word, a separate AI tool, and email threads, a lawyer does the whole review in one place. It reviews a full contract automatically, explains any clause you select, searches your past contracts for similar language, and answers plain-English questions about a document. Each of those features knows the contract's context — its type, the parties, and which side you're on — so the suggestions are about your deal rather than generic boilerplate. And it does all of this without disturbing Word's formatting or track changes.",
            problem: "Contract review eats hours. A lawyer reads each clause by hand, jumps to an external AI tool to sanity-check something, then back to Word, then to an email thread — and in all that switching, real risks slip through and clauses get missed. Language drifts from one contract to the next because there is no easy way to reuse what already worked. The tools meant to help often make it worse: they mangle Word's formatting, ignore track changes, or simply don't work for teams that operate in more than one language. Reviews get slower, risk goes up, and the firm's own accumulated contract knowledge sits unused.",
            solution: "PAIR LEGAL pulls all of that back into Word. It reviews the whole document automatically and flags risks and missing clauses. Select any passage and it analyzes that clause on the spot. It searches your contract library for language you have used before, so similar deals stay consistent. And you can ask it questions about a document in plain English. Because every feature reads the same contract context and writes through Word's native track changes, nothing breaks and nothing has to leave the document.",
            methodology: [
                "Built an onboarding step that captures the contract's context — type, parties, and the side you represent — and feeds it into every later suggestion.",
                "Wrote the automatic review to scan a whole contract in seconds and return grouped suggestions, risk flags, and missing-clause alerts, each with a before/after comparison.",
                "Made every suggestion one-click: accept or reject it, and the change lands in Word as a tracked edit you can still see and undo.",
                "Added clause-level analysis that fires the moment you select text, returning a risk read, a summary, and concrete fixes through a chat-style panel.",
                "Implemented similarity search over a firm's private contract library, so lawyers can pull proven language from past deals instead of rewriting it.",
                "Added document Q&A that takes plain-English questions, including ones that span several contracts at once.",
                "Shipped full Turkish/English support with a remembered preference, so international teams aren't stuck in one language."
            ],
            results: [
                "The whole review now happens in one window, so there is no switching between tools and fewer errors from things falling through the cracks.",
                "Automatic analysis surfaces risks, missing clauses, and suggested fixes for lawyer review.",
                "Lawyers get a risk read and suggestions for any clause the instant they select it, which speeds up the call on whether to flag it.",
                "Precedent language is searchable, so contracts stay consistent with the firm's standards instead of drifting deal to deal.",
                "Finding a specific term is now a question, not a manual hunt through the document.",
                "Every edit goes through Word's own track changes, so nothing the tool does is hidden from review.",
                "Full Turkish/English support takes the language barrier off the table for international teams."
            ],
            collaborators: [
                { name: "Erge Çevik", role: "Legal Advisor", linkedin: "https://www.linkedin.com/in/erge-%C3%A7evik/" }
            ],
            gallery: [
                { src: "images/Pair/contract_pair_start_screen.png", caption: "PAIR LEGAL's main interface provides easy access to all contract review features directly in Word." },
                { src: "images/Pair/starting_form_before_initializing_the_analysis.png", caption: "Quick onboarding captures contract context to personalize AI suggestions and recommendations." },
                { src: "images/Pair/autosuggest_feature_after_listing_suggestions.png", caption: "Automatic review provides organized suggestions grouped by category for easy navigation." },
                { src: "images/Pair/autosuggest_feature_during_review.png", caption: "Review suggestions with clear before/after comparisons and one-click accept/reject controls." },
                { src: "images/Pair/select_text_and_start_chatting_with_it.png", caption: "Select any clause to get instant AI-powered analysis, risk assessment, and improvement suggestions." },
                { src: "images/Pair/find_similars_feature.png", caption: "Search your contract library to find similar clauses and ensure consistency with precedent documents." },
                { src: "images/Pair/ask_to_document.png", caption: "Ask questions about contracts in natural language and get intelligent answers from your document library." }
            ],
            subpages: [
                {
                    id: "auto-review",
                    title: "Automatic Document Review",
                    content: "Manual analysis is where most of the review time goes. Automatic Document Review takes that part and does it in seconds.\n\nYou fill in the contract's basics — type, parties, your position — and hit Start Review. The AI reads every clause, points out risks, suggests improvements, and tells you which standard clauses are missing. The results come back grouped by category, each with the original text next to the suggested version so you can see exactly what would change.\n\nNothing happens without you. You go through the suggestions one by one and accept or reject each with a single click, and every accepted change is written as a tracked edit in Word — visible and reversible. For missing clauses, you get sample text ready to drop in, so gaps get filled fast and in your firm's approved wording.",
                    videos: [
                        { url: "https://youtu.be/SgipTgVORs0", title: "Auto Suggest Demo" },
                        { url: "https://youtu.be/z0qE0xZ5os8", title: "Auto Review Demo" }
                    ]
                },
                {
                    id: "select-and-suggest",
                    title: "Select & Suggest: Instant Clause Analysis",
                    content: "Often you just need to understand one clause — what it risks, what it obligates, what it really means — without running a full review or opening another tab. Select & Suggest answers that on the spot.\n\nHighlight any text and the AI analyzes it right away. Ask it 'What are the risks in this clause?' or 'Summarize the payment obligations,' and it answers using both the selected text and what it knows about your contract.\n\nA few sample prompts get you moving: summarize a clause, flag its risks, weigh payment obligations, or draft a risk-assessment email. Each selection keeps its own conversation, so you can dig into one clause without losing the thread — and selecting new text starts a fresh conversation, so things stay organized.",
                    videos: [
                        { url: "https://youtu.be/6M5UQpYsKBE", title: "Select & Get Suggestion Demo" }
                    ]
                },
                {
                    id: "find-similars",
                    title: "Find Similar Clauses: Ensure Consistency",
                    content: "Consistency is one of the hardest parts of managing contracts. Similar agreements should read in similar language, but with no way to search what you have already signed, every contract starts from a blank page.\n\nFind Similar Clauses makes the whole library searchable. Upload your precedent documents, select a clause in the contract you are working on, and it pulls up the closest matches from past contracts.\n\nThat does two things. You reuse language that has already worked instead of reinventing it, and you put the organization's accumulated experience to use — if a clause held up well before, you can lean on it with confidence. It reads several document formats and lets you pick which files to search, so you can narrow it to the precedents that actually matter."
                },
                {
                    id: "ask-document",
                    title: "Ask Document: Natural Language Q&A",
                    content: "Mid-review, you are usually hunting for one specific thing — a payment term, a termination clause, a deadline. Instead of scrolling through long documents, you can just ask.\n\nUpload your contracts as Word, PDF, or text files, choose which ones to query, and ask in plain English: 'What are the payment obligations?' 'Compare the termination clauses across these contracts.' 'Summarize the key risks here.' The answers come from the actual content of the documents, not a guess.\n\nThis earns its keep in diligence work and anywhere you are comparing agreements. Because you can query several documents at once, spotting patterns or differences across a portfolio is straightforward, and conversation history lets you keep asking follow-ups to go deeper."
                },
                {
                    id: "supporting-features",
                    title: "Seamless Integration & User Experience",
                    content: "PAIR LEGAL is built to fit the way lawyers already work rather than ask them to change it.\n\nThe contract details you enter at the start carry through every feature, so the AI always has your context when it makes a suggestion. When it spots a missing clause, it hands you sample text ready to paste, so the gap closes quickly.\n\nIt stays inside Word's own behavior: formatting holds, track changes work as they should, and you can jump straight to the relevant section. The interface is fully bilingual (Turkish/English) and remembers which language you prefer.\n\nYour work also follows you between features. Accepted suggestions, uploaded libraries, and chat histories all stay put, so you can start a review, break off to analyze a clause, search for similar language, and come back without losing your place."
                }
            ]
        }
    },
    {
        id: 3,
        title: "Sketch Recognition Models",
        cardTitle: "Sketch Recognition",
        cardSummary: "Deep learning shaped by human perception, supported by crowdsourced data and in-person experiments.",
        description: "Sketch recognition models built around how people actually perceive drawings, developed at Koç University's Intelligent User Interfaces Laboratory (Nov 2018 – June 2024). The work combined deep learning with real-time databases and a large dataset gathered three ways: web scraping, Amazon MTurk crowdsourcing, and in-person experiments.",
        image: "images/sketch_recognition.png",
        techStack: ["Python", "Deep Learning", "TensorFlow", "PyTorch"],
        dimensions: ["hci"],
        links: {},
        date: "2018 - 2024",
        details: {
            overview: "This project develops sketch recognition models that borrow from how people read drawings. A line sketch is ambiguous on its own; what makes it legible is the perceptual shortcuts a human viewer brings to it. Building those same priors into the model produces recognition that is both more accurate and closer to how a person would label the sketch themselves.",
            problem: "Most sketch recognition systems miss the subtle cues people rely on when they look at a drawing. Without that perceptual grounding, they stumble on exactly the cases a person would find obvious.",
            solution: "I built deep learning models that fold in those perceptual principles and trained them on data gathered from several sources — web scraping for scale, Amazon MTurk for crowdsourced labels, and face-to-face experiments for controlled, high-quality samples.",
            methodology: [
                "Collected data from three complementary sources: web scraping, Amazon MTurk, and in-person experiments.",
                "Built human perception principles directly into the model architecture rather than bolting them on afterward.",
                "Developed the models in TensorFlow and PyTorch.",
                "Wired in a real-time database to keep data processing efficient as the set grew.",
                "Refined the models continuously based on user feedback."
            ],
            results: [
                "Recognition accuracy improved once perceptual principles were part of the model.",
                "Assembled a large-scale dataset spanning all three collection channels.",
                "Presented the research at the 2022 SIU Conference.",
                "Carried out as a collaboration with Koç University's Intelligent User Interfaces Laboratory (Nov 2018 – June 2024)."
            ],
            subpages: [
                {
                    id: "data-collection",
                    title: "Data Collection Methods",
                    content: "Data came from three methods, each doing a different job. Web scraping gave breadth and volume. Amazon MTurk supplied crowdsourced annotations at scale. Face-to-face experiments filled in controlled samples where specific parameters had to be held fixed."
                },
                {
                    id: "model-architecture",
                    title: "Model Architecture",
                    content: "The models were designed around human perception principles, pairing convolutional neural networks with attention mechanisms so they could read a sketch's structure and meaning rather than just its pixels."
                }
            ]
        }
    },
    {
        id: 4,
        title: "EEG Mental State Classification",
        cardTitle: "EEG Mental States",
        cardSummary: "Signal processing and deep learning to investigate workload, math anxiety, fatigue, and attention.",
        description: "I contributed to an EEG study of the cognitive states people move through while solving math problems, run at the University of Essex Brain-Computer Interfaces & Neural Engineering Laboratory. My part was preprocessing the raw EEG through spectral analysis and building deep learning models for mental state classification, which fed into the team's identification of distinct neural patterns for Mental Workload, Math Anxiety, Fatigue, and Attention across participants with high and low math anxiety.",
        image: "images/mental_state.png",
        techStack: ["MATLAB", "Python", "Deep Learning", "PyTorch", "TensorFlow", "EEG", "Signal Processing", "Spectral Analysis", "EEGLAB", "Independent Component Analysis"],
        dimensions: ["biomedical"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "2023",
        details: {
            overview: "At the University of Essex Brain-Computer Interfaces & Neural Engineering Laboratory, I contributed to a study asking a specific question: what cognitive states do students pass through as they learn to solve math problems presented as computer puzzles, and do those states differ between students with and without math anxiety? The longer-term goal was groundwork for neuroadaptive Brain-Computer Interface (BCI) learning environments — systems that adapt their content to a learner's cognitive load. The team recorded EEG from 10 participants (5 with High Math Anxiety, 5 with Low Math Anxiety) as they worked through puzzles of increasing difficulty, then looked for neural signatures of Mental Workload, Math Anxiety, Fatigue, and Attention. The work was published at the 2023 IEEE MetroXRAINE Conference.",
            problem: "Learning isn't something you can read off a single cognitive or affective state, yet many BCIs are trained to recognize just one — and that narrowness leads them astray. Picture a system that bumps up difficulty whenever Mental Workload reads as 'low,' on the assumption the learner is bored. If that 'low' reading is actually frustration or fatigue, the system does exactly the wrong thing. Math anxiety complicates the picture further: it shapes how well many students can learn math at all, so its neural correlates matter for any adaptive system. And underneath all of it, raw EEG is noisy and full of artifacts that have to be cleaned up before any of it means anything.",
            solution: "The research team conducted a comprehensive experiment investigating multiple cognitive states simultaneously during a novel puzzle-solving task. Participants were divided into High Math Anxiety (HMA) and Low Math Anxiety (LMA) groups based on the Math Anxiety Scale. The team recorded EEG from 62 electrodes while participants solved three blocks of 20 puzzles each, with increasing difficulty (Easy: 4-5x5, Medium: 6-7x7, Hard: 9-10x10). I contributed to preprocessing the data using advanced techniques including Independent Component Analysis (ICA) for artifact removal, spectral analysis across five frequency bands (δ: 2-4 Hz, θ: 5-7 Hz, α: 8-12 Hz, β: 14-28 Hz, γ: 30-59 Hz), and band power calculations. Additionally, I developed deep learning models for classifying mental states using the preprocessed EEG data, combining signal processing techniques with neural network architectures to automatically detect and classify different cognitive states. The research identified distinct EEG patterns for each cognitive state of interest.",
            methodology: [
                "Participant selection: From a pool of 30, the team recruited 10 University of Essex students (6 female) based on their Math Anxiety Scale responses. Five fell into the High Math Anxiety (HMA) group and five into Low Math Anxiety (LMA), drawn from those reporting 'much' and 'very much' anxiety.",
                "EEG recording setup: The team recorded from 62 electrodes placed by the international 10-20 system on a Biosemi ActiveTwo. Signals were band-pass filtered (1-60 Hz, notch at 50 Hz), digitized at 2000 Hz, and electrode impedance was held below 15 kOhm. Horizontal eye movements, GSR, and ECG were recorded alongside.",
                "Experimental paradigm: After a set of questionnaires (PHQ-4, the Curiosity and Exploration Inventory, and State Anxiety), the team recorded two minutes of resting-state EEG, then ran three blocks of 20 puzzles in increasing difficulty. Each block was followed by the NASA Task Load Index questionnaire and 15 seconds of rest. The puzzles asked participants to click white cells green to match target numbers for each row and column.",
                "Data preprocessing (my contribution): I handled the preprocessing — downsampling the recordings to 256 Hz, applying a 1-60 Hz band-pass filter, and stripping line noise with EEGLAB's Cleanline plugin. I inspected the recordings by eye, cut noisy segments, and reduced the montage to the 30 channels relevant to the cognitive states of interest (Mental Workload, Attention, Fatigue, Math Anxiety). Finally I ran Independent Component Analysis (ICA) to remove artifacts and re-referenced the data to a common average reference (CAR).",
                "Spectral analysis (my contribution): Using MATLAB's designfilt, I built five band-pass filters for the δ (2-4 Hz), θ (5-7 Hz), α (8-12 Hz), β (14-28 Hz), and γ (30-59 Hz) bands, then computed average band power in each band across seven segments of the experiment: initial rest, easy puzzles, post-block 1 rest, medium puzzles, post-block 2 rest, hard puzzles, and post-block 3 rest.",
                "Deep learning classification (my contribution): Beyond the core analysis, I built deep learning models to classify mental states automatically from the preprocessed data. The networks learned to tell the cognitive states apart (Mental Workload, Math Anxiety, Fatigue, Attention) from the spectral features and band-power values, and were designed in PyTorch/TensorFlow to capture both temporal and spatial structure in the signals. I trained them to separate states across conditions (rest vs task) and groups (HMA vs LMA), giving the project an automated route to mental state detection that could later sit inside a real-time BCI.",
                "Statistical analysis: The team used Wilcoxon signed-rank tests to compare band power between conditions (rest vs task) and between groups (HMA vs LMA), and analyzed behavioral measures including time on task (TOT) and number of mouse clicks.",
                "Cognitive state identification: The analysis surfaced a neural marker for each state — Mental Workload (frontal θ increase, parietal α decrease), Fatigue (frontal and posterior θ increase), Attention (frontal δ increase), and Math Anxiety (frontal β increase during anticipation, occipital γ increase during task solving)."
            ],
            results: [
                "Behavioral findings: Time on task differed significantly for medium (p=0.004) and hard (p=0.012) puzzles, with HMA participants solving faster than LMA — in line with research suggesting anxious people rush through math tasks to cut the discomfort short.",
                "Mental Workload: Showed up as rising frontal θ bandpower (Fz) and falling parietal α (Pz) during tasks versus rest (p=0.051), pointing to working-memory engagement.",
                "Fatigue: Appeared as increased frontal (Fz) and posterior (Pz) θ bandpower during tasks (p=0.057), tracking a build-up of cognitive fatigue across the blocks.",
                "Attention: Marked by increased frontal δ bandpower (Fz) during task blocks (p=0.051); as attention rose, drowsiness fell away as a drop in central α (Cz, C3, C4, Pz).",
                "Math Anxiety: For HMA participants, frontal β bandpower (Fz, F3, F4) rose while they anticipated a problem, and occipital γ (Oz, O1, O2) rose while they solved it (p=0.047) — possibly a signature of threat perception.",
                "Frontal asymmetry: HMA participants showed stronger α bandpower in the right (AF4) than the left (AF3) prefrontal cortex compared to LMA, consistent with task avoidance — though this difference was not statistically significant (p=0.4).",
                "Overall contribution: The project showed that several cognitive states can be monitored at once from EEG, a more holistic basis for neuroadaptive learning systems. The results were published at the 2023 IEEE MetroXRAINE Conference.",
                "My contribution: My work on preprocessing, spectral analysis, and deep learning classification built the data pipeline that made these patterns findable. Clean, artifact-free data was the precondition for the spectral analysis, and the classification models added an automated way to detect and label cognitive states that could later run inside a real-time neuroadaptive BCI."
            ],
            subpages: [
                {
                    id: "experimental-design",
                    title: "Experimental Design and Puzzle Task",
                    content: "The experiment took its cue from Malone's idea of an 'educational video game': something intrinsically motivating because it sets clear goals that ramp up in complexity, gives clear feedback, and keeps outcomes uncertain enough to feed curiosity. From that, the team built a series of puzzles that lean on counting, spatial reasoning, and working memory. Each puzzle was a square grid (4-10 rows/columns) where participants clicked white cells green to match target numbers for every row and column. Grid size set the difficulty: Easy (4-5x5), Medium (6-7x7), and Hard (9-10x10). The puzzles ran in three blocks of 20, ordered from easy to hard. After each block, participants filled out the NASA Task Load Index to rate their perceived workload, then rested for 15 seconds. The session opened with a 2-minute resting-state EEG recording and closed with a repeat of the questionnaires (NASA, State Anxiety, Math Anxiety Scale)."
                },
                {
                    id: "signal-preprocessing",
                    title: "Signal Preprocessing Pipeline (My Contribution)",
                    content: "The preprocessing pipeline was mine to build, and it was what made meaningful neural patterns recoverable from the raw recordings. I started by downsampling from 2000 Hz to 256 Hz — light enough on compute, but still preserving the frequencies that matter. A 1-60 Hz band-pass filter removed low-frequency drift and high-frequency noise, a 50 Hz notch filter killed powerline interference, and EEGLAB's Cleanline plugin took care of the remaining line noise. I went through the recordings by eye to drop noisy segments and bad channels, then narrowed the 62 electrodes down to 30 chosen for the cognitive states of interest: Mental Workload (Fpz, F3, Fz, F4, AF3, AF4, C4, Cz, C3, P3, Pz, P4, POz, O1, Oz, O2), Attention (F3, Fz, Cz, C3, C4, Pz), Fatigue (Fz, Pz, F3, F4, F7, F8, Cz), and Math Anxiety (Fpz, Fp1, Fp2, AF4, AF3, Fz, F3, F4, F7, F8, T7, T8, C3, Cz, C4, P7, P3, Pz, P4, P8, O1, O2). Independent Component Analysis (ICA) cleared artifacts like eye blinks, eye movements, and muscle activity, and a final re-reference to common average reference (CAR) damped down localized noise."
                },
                {
                    id: "spectral-analysis",
                    title: "Spectral Analysis and Frequency Bands (My Contribution)",
                    content: "Next I pulled frequency-domain features out of the cleaned data. Using MATLAB's designfilt, I built five band-pass filters, one per band: Delta δ (2-4 Hz), Theta θ (5-7 Hz), Alpha α (8-12 Hz), Beta β (14-28 Hz), and Gamma γ (30-59 Hz). Each band tends to track a different process — Delta with deep sleep and attention, Theta with working memory and fatigue, Alpha with relaxation and drowsiness, Beta with active thinking and anxiety, and Gamma with cognitive binding and threat perception. After filtering, I computed average band power in each band over seven segments of the session: (1) the initial 120-second rest, (2) the first block of 20 easy puzzles, (3) post-block 1 rest (NASA questionnaire + 20 seconds), (4) the second block of 20 medium puzzles, (5) post-block 2 rest, (6) the third block of 20 hard puzzles, and (7) post-block 3 rest (NASA and MAS questionnaires). Band power came from squaring and averaging the relevant channels within each segment independently, giving the team quantitative measures of neural activity to base their pattern analysis on."
                },
                {
                    id: "deep-learning-classification",
                    title: "Deep Learning Models for Mental State Classification (My Contribution)",
                    content: "On top of the core analysis, I developed deep learning models that classify mental states automatically from the preprocessed data. The architectures learned to separate Mental Workload, Math Anxiety, Fatigue, and Attention using the spectral features and band-power values produced in the earlier steps, and were built in PyTorch/TensorFlow to capture both temporal and spatial structure in the signals. I trained them across conditions (rest vs task blocks) and groups (High Math Anxiety vs Low Math Anxiety). The point was to lay a foundation for real-time BCIs that can read a learner's state and adapt to it. Where the team's statistical analysis explains the patterns, these models offer an automated, scalable way to detect them — picking up non-linear relationships that classical statistics can miss, which could sharpen classification and make real-time adaptation of learning content possible."
                },
                {
                    id: "cognitive-states",
                    title: "Identified Cognitive States and Neural Patterns",
                    content: "From the cleaned and analyzed data, the team pinned down a distinct EEG pattern for each of four cognitive states. Mental Workload (MWL) showed as rising frontal θ bandpower (Fz) and falling parietal α (Pz) during tasks versus rest (p=0.051) — the prefrontal cortex working to hold and manipulate information in working memory. Fatigue appeared as rising frontal (Fz) and posterior (Pz) θ bandpower during tasks (p=0.057), a progressive tiring over time. Attention tracked an increase in frontal δ bandpower (Fz) during task blocks (p=0.051), with drowsiness reading as the opposite — a drop in central α (Cz, C3, C4, Pz) as attention climbed. Math Anxiety, for HMA participants, came through as rising frontal β bandpower (Fz, F3, F4) in the moments before a puzzle appeared and rising occipital γ (Oz, O1, O2) while solving (p=0.047), possibly tied to threat perception. On top of that, a frontal asymmetry — stronger right (AF4) than left (AF3) prefrontal α in HMA versus LMA — hinted at avoidance motivation, though it wasn't statistically significant (p=0.4)."
                },
                {
                    id: "math-anxiety-findings",
                    title: "Math Anxiety Group Differences",
                    content: "Participants were split into High Math Anxiety (HMA) and Low Math Anxiety (LMA) groups by their Math Anxiety Scale scores. Behaviorally, the HMA group was significantly faster on the medium (p=0.004) and hard (p=0.012) puzzles than the LMA group — which fits the literature's picture of anxious people rushing through math to escape the discomfort, something that need not hurt performance as long as working memory isn't overloaded. The EEG told a consistent story: compared to LMA, HMA participants showed more frontal β-band power (Fz, F3, F4) while anticipating an arithmetic problem and more occipital γ-band power (Oz, O1, O2) while solving it. The β rise during anticipation reads as anxiety-related activity; the γ rise during solving may reflect threat perception and heightened vigilance. These are exactly the kind of markers a real-time BCI could watch for, then adjust the learning content in response."
                },
                {
                    id: "neuroadaptive-applications",
                    title: "Applications for Neuroadaptive Learning Systems",
                    content: "All of this feeds toward neuroadaptive Brain-Computer Interface (BCI) learning environments — systems that tune their content to a learner's cognitive state. The real step forward is watching several states at once instead of just one, which gives a much fuller read on what's going on. A system can now tell 'low workload because bored' (turn the difficulty up) apart from 'low workload because frustrated' (ease off, or offer support). The neural markers the team identified can train classifiers to detect Mental Workload, Fatigue, Attention, and Math Anxiety in real time, and the deep learning models I built turn that into an automated, scalable detector you could drop into an adaptive tutor. Such a tutor could raise puzzle difficulty when workload is low, hand out a break when fatigue creeps in, re-engage a learner whose attention is slipping, and offer reassurance or anxiety-reduction strategies when math anxiety spikes. This matters most in online learning, where a teacher can't see the small behavioral signs of a struggling student — something the COVID-19 pandemic made painfully clear. EEG is safe, portable, and relatively affordable, which makes it realistic for actual classrooms, and my work across preprocessing, spectral analysis, and classification was what let these patterns be both identified and detected automatically."
                }
            ]
        }
    },
    {
        id: 5,
        title: "KART-ON Kodlama Oyunları: Accessible Programming Education",
        cardTitle: "KART-ON",
        cardSummary: "Physical programming cards, everyday objects, and a smartphone make learning to code more accessible.",
        description: "KART-ON Coding Games, built at TÜBİTAK/Koç University, lets children program games by arranging physical cards that a camera reads. Built with p5.js and Teachable Machine, it brings early coding within reach without a computer — a smartphone and some everyday objects stand in for the programming blocks.",
        image: "images/karton.png",
        techStack: ["JavaScript", "p5.js", "Teachable Machine", "Computer Vision", "Mobile Development", "Tangible Interfaces"],
        dimensions: ["hci"],
        links: {},
        date: "Jan - July 2021",
        details: {
            overview: "KART-ON Kodlama Oyunları (KART-ON Coding Games) teaches children to program by building games out of physical cards. A camera reads the cards with computer vision, so there's no need for a computer — a smartphone or tablet is enough. I built the platform during the TUBITAK 2247-C Stajyer Araştırmacı Burs Programı (Research Intern Scholarship Program) at Koç University, supervised by Prof. Dr. Tevfik Metin Sezgin. The aim throughout was early programming education that reaches disadvantaged groups and narrows the opportunity gap, using tools cheap enough that almost any classroom can afford them.",
            problem: "Teaching programming usually means computers and equipment, and that price tag shuts out disadvantaged groups and schools on tight budgets. Yet picking up coding early is one of the things that helps level the playing field — so the cost barrier hits exactly the students who would benefit most. The budget gap between private and public schools only widens the divide, and the tangible programming interfaces already described in the literature tend to be expensive in their own right.",
            solution: "KART-ON removes the computer from the equation, using a smartphone and everyday objects as the programming blocks. Teachable Machine handles card recognition and p5.js runs the games. A child codes by laying out physical cards; the camera reads them, and a custom compiler interprets the sequence and plays it out. The platform ships with a clone of Google's Dinosaur game and supports a range of programming scenarios. Because it costs so little to run, schools with small budgets can use it too — which is the whole point, closing the gap between the institutions that can afford coding equipment and the ones that can't.",
            methodology: [
                "Added a clone of Google's Dinosaur game so children could code and play within the platform.",
                "Designed a set of example programming cards — a tangible interface that maps physical objects to programming concepts.",
                "Integrated Teachable Machine for card recognition, using transfer learning to identify the cards from the camera feed.",
                "Wrote a custom compiler that interprets a card sequence and runs every possible programming scenario behind the scenes.",
                "Built the platform on the p5.js library, using instance mode so a game can be reconfigured on the fly.",
                "Added in-app educational pages and guidance cues so the platform can be used without an instructor present.",
                "Designed the interface around three panels: the camera feed, the recognized card sequence, and the game output.",
                "Created cards for concepts like 'when touch screen,' 'when hit cactus,' 'jump,' and 'run,' which teach if/else structures and basic programming logic."
            ],
            results: [
                "Delivered a working platform where children code games by arranging physical cards.",
                "Took the computer out of early programming education — a smartphone or tablet is all it needs.",
                "Cut costs sharply by using everyday objects as programming blocks instead of specialized equipment.",
                "Let children learn programming logic (if/else, event handling) without first learning a language like Python or Java.",
                "Encouraged algorithmic thinking and creativity by letting children design their own scenarios beyond the built-in game.",
                "Made the experience self-guided through built-in lessons and instructions.",
                "Showed that programming education can be both affordable and accessible, a small push toward equal opportunity.",
                "Fed into Koç University's research on early programming education and accessible e-learning interfaces."
            ],
            subpages: [
                {
                    id: "platform-architecture",
                    title: "Platform Architecture and Technology",
                    content: "KART-ON is built on p5.js, a JavaScript library for creative coding. It runs in instance mode, which lets a child reshuffle the cards and reconfigure a game without restarting the whole thing. Card recognition comes from Google's Teachable Machine, which uses transfer learning to identify cards from the camera feed — how well it works depends on how well the model is trained, so the platform links out to material explaining how to train it. A custom compiler reads the card sequence and runs through every possible scenario, handling the various game states and interactions. The interface keeps three things visible at once — the camera feed, the recognized cards, and the game output — so the child always sees what the system is reading and doing."
                },
                {
                    id: "dinosaur-game",
                    title: "Dinosaur Game Implementation",
                    content: "I brought Google's Dinosaur game into the platform as a coding exercise. Open the Dino game and you get the camera feed (top left), the recognized cards beneath it, a triangular play button, and the game output on the right. The child arranges the cards in front of the camera, the system reads them, and pressing play runs the game from that sequence. A guide at the bottom spells out the commands needed to recreate the standard game, but nothing stops a child from inventing their own rules — making the Dino jump every time it hits a cactus, say, or bumping the score up on each screen touch. That openness lets them both learn the original logic and play with their own ideas."
                },
                {
                    id: "programming-concepts",
                    title: "Teaching Programming Concepts",
                    content: "The platform gets across the basics of programming without a single line of code. If/else logic lives in the event cards — 'when touch screen,' 'when hit cactus,' 'when pass cactus,' 'when game starts' — which children pair with action cards like 'jump' to build behavior. Put 'when touch screen' next to 'jump' and you've taught event-driven programming. Everything is broken into the smallest possible steps: first you call the Dino onto the screen, then you teach it to run, building up the logic one piece at a time. For a child who has never touched Python or Java, that's a way into algorithmic thinking that actually makes sense."
                },
                {
                    id: "accessibility-impact",
                    title: "Accessibility and Educational Impact",
                    content: "Accessibility is where KART-ON makes its biggest difference. All it needs is a camera — already in every smartphone and tablet — so the computer requirement, and the cost that comes with it, simply disappears for schools and families with little to spend. Using everyday objects as the programming blocks shaves the cost down further than even specialized tangible interfaces manage. That low cost speaks directly to the budget gap between private and public schools, and to the goal of equal opportunity: early programming education becomes something a child can reach regardless of background. The self-guided lessons mean no instructor is required, widening access again, and handling physical cards suits learners who take to things better by doing than by reading, making the concepts tangible for young children."
                },
                {
                    id: "challenges-solutions",
                    title: "Technical Challenges and Solutions",
                    content: "The build threw up a few real challenges. Letting children rearrange cards and reconfigure a game without restarting it meant implementing everything in p5.js instance mode, which took careful architecture. Card recognition leaned on Teachable Machine with transfer learning — solid, but only as good as its training, so I added resources explaining how to train the model well. The hardest part by far was the custom compiler. It had to interpret any card sequence a child might lay down and handle every resulting scenario, because the audience is beginners who should never be confronted with an error message. Covering all those cases meant the compiler grew more complex the more scenarios it had to anticipate, and it took a lot of testing to make sure none slipped through."
                }
            ]
        }
    },
    {
        id: 7,
        title: "Health Big Data: Fetal Biosignals Integration Pipeline",
        cardTitle: "Health Big Data",
        cardSummary: "An integration pipeline connecting fetal biosignals and clinical records through the OMOP data model.",
        description: "An end-to-end pipeline for biosignal and clinical data from pregnant women and their fetuses, collected across several hospitals in Italy. It profiles, cleans, integrates, and migrates fetal heart rate (FHR), uterine contraction (TOCO), and clinical metadata into a relational SQLite database mapped to the OMOP Common Data Model — with a FastAPI service and a graphical interface on top for clinicians and researchers.",
        image: "images/hbd.png",
        techStack: ["Python", "FastAPI", "SQLite", "Pandas", "SciPy", "OMOP CDM", "Data Integration", "Signal Processing", "Data Cleaning", "API Development", "Web Interface"],
        dimensions: ["biomedical"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "2024-2025",
        details: {
            overview: "This project built an end-to-end pipeline for biosignal and clinical data gathered from pregnant women and their fetuses across several Italian hospitals. The data covers fetal heart rate (FHR), uterine contraction (TOCO), and fetal movement perception (FMP) signals, plus the clinical metadata around them. The sources were heterogeneous and messy, so we profiled, cleaned, and integrated them carefully — chasing down missing values, outliers, duplicates, and identifiers that didn't line up. The cleaned data went into a 17GB relational SQLite database whose schema we mapped to the OMOP Common Data Model for interoperability. On top sits a FastAPI REST API for structured access and a graphical interface that lets clinicians and researchers browse patient records, examinations, and processed CTG signals.",
            problem: "Pulling healthcare data together from many hospitals is hard: it's heterogeneous, full of gaps, inconsistently identified, and rarely interoperable. The stakes are real — about 15% of pregnancies count as high-risk and call for continuous electronic FHR monitoring during labor — yet most existing CTG datasets come from a single site, leave out the raw signals, or aren't public. On top of that, CTG signals pick up artifacts whenever a sensor shifts or the mother moves, leaving noise, false spikes, and missing values that have to be dealt with before the data can tell you anything.",
            solution: "We built a pipeline that takes those problems on through systematic profiling, cleaning, and harmonization. It profiles each source database to understand its structure and quality; processes the FHR and TOCO signals with interpolation and spike detection; assigns globally unique identifiers to resolve patient and examination IDs that overlap across databases; migrates everything into a standardized SQLite database mapped to the OMOP CDM; exposes the result through a FastAPI REST API; and wraps it all in a graphical interface for clinical exploration and visualization.",
            methodology: [
                "Data profiling: Examined structure, missing values, outliers, duplicates, and distributions across the REGISTRY_PCC, EXAMINATION_CTG, EVENTS_CTG, TRACES_CTG, and VARIABLES_CTG tables drawn from several Microsoft Access databases.",
                "Data cleaning: Dropped invalid dates, handled missing values (removing columns with over 90% missingness), corrected implausible gestational ages, and deduplicated across databases.",
                "Signal processing: Wrote process_fhr_signal and process_toco_signal in SciPy to flag invalid samples (<50 or >200 bpm), interpolate gaps shorter than 15 seconds linearly, and correct spikes with cubic spline interpolation.",
                "Data integration: Minted globally unique identifiers for patients and examinations across the source databases, lifting uniqueness from 22.9% to 100% for patients and 29.8% to 100% for examinations.",
                "Database design: Laid out a relational schema (REGISTRY_PCC, EXAMINATION_CTG, TRACES_CTG, EVENTS_CTG, PARAMETERS_CTG) that preserves referential integrity and keeps traceability through source_file fields.",
                "OMOP mapping: Translated the Italian table and column names into English and mapped the key clinical concepts (patient identifiers, birth dates, examination types, gestational metrics) to OMOP Common Data Model concepts and concept IDs.",
                "API development: Built a FastAPI REST API with endpoints for listing tables, retrieving data (JSON/CSV), filtering by patient or examination, accessing raw or processed traces, and pulling parameters, events, and OMOP mapping information.",
                "User interface: Built a dashboard for patient search and examination listing, CTG visualization with zoom and pan, an examination-details panel, computed-parameter display, and CSV/JSON export with configurable formats."
            ],
            results: [
                "Merged data from 7 source databases into one 17GB SQLite database.",
                "Cleaned the CTG traces down to 81,531 records, 39% fewer than the original 133,919 after deduplication and validation.",
                "Brought patient and examination identifiers to 100% uniqueness, up from 22.9% and 29.8%.",
                "Shipped a FastAPI service with 10+ endpoints covering JSON/CSV export, filtering, and OMOP-compliant access.",
                "Built an interactive web interface for searching patients, viewing examinations, panning and zooming CTG traces, and exporting in multiple formats.",
                "Mapped the schema to the OMOP Common Data Model so it interoperates with standardized healthcare data models.",
                "Backed the pipeline with 19 validation test cases, hitting 100% coverage on the critical ones.",
                "Built signal processing that handles artifacts, missing values, and spikes in FHR and TOCO using 15-second interpolation windows.",
                "Documented the privacy considerations and re-identification risks that come with anonymized health data."
            ],
            subpages: [
                {
                    id: "data-management",
                    title: "Data Management Pipeline",
                    content: "Profiling, cleaning, and integration were the heart of the data work. We started from 7 separate Microsoft Access databases holding patient registries, CTG examinations, events, traces, and parameters. Profiling surfaced plenty of trouble: impossible dates (1070, 2991), columns almost entirely empty (up to 99.8% missing for the Province column), patient numbers that were mostly duplicates (only 13,368 unique out of 58,399 entries), and gestational ages as high as 320 weeks. Cleaning removed the invalid entries, dropped columns with over 90% missingness, deduplicated across databases, and recomputed gestational ages from last-menstruation dates. Integration then assigned globally unique identifiers, taking patient uniqueness from 22.9% to 100% and examination uniqueness from 29.8% to 100%. What came out the other side holds roughly 33,000 unique patients, 80,000 examinations, and 81,531 processed traces."
                },
                {
                    id: "signal-processing",
                    title: "Signal Processing Techniques",
                    content: "Because CTG signals come laced with artifacts, signal processing carried a lot of weight. The process_fhr_signal routine flags invalid samples (<50 bpm, >200 bpm, or NaN), fills contiguous invalid runs shorter than 15 seconds with linear interpolation, and catches spikes wherever adjacent samples jump by more than 25 bpm — correcting spike runs under 15 seconds with a natural cubic spline. The process_toco_signal routine does much the same for uterine contraction signals, including missing or zero values. Both rely on SciPy's interp1d for linear interpolation and CubicSpline for spikes. The 15-second cutoff came from the literature: long enough to smooth a brief dropout, short enough not to invent data that isn't there. Anything longer is left raw, so the trace stays continuous and any useful TOCO or FMP data survives for later analysis."
                },
                {
                    id: "omop-mapping",
                    title: "OMOP Common Data Model Mapping",
                    content: "To make the data shareable and aligned with international research standards, we standardized both its structure and its meaning. The original Italian table names (ANAGRAFE_PCC, ESAME_CTG, and so on) became English ones (REGISTRY_PCC, EXAMINATION_CTG, etc.), and the key clinical concepts were mapped to OMOP Common Data Model concepts and concept IDs: patient identifiers (OMOP ID 4086934), birth dates (3022007), examination types (44804305), gestational age (4210896), and last menstrual period (4072438). That alignment sharpens the semantics and lets the dataset slot in alongside other OMOP-compliant data and tools, which is what large-scale observational research and population health analytics need. We focused the mapping on the clinically meaningful variables, so the elements that matter most are standardized for future collaborations."
                },
                {
                    id: "api-interface",
                    title: "API and User Interface",
                    content: "The FastAPI REST API opens up the curated dataset through more than ten endpoints — /tables to list the tables, /data/{table_name} for JSON, /patients and /examinations for filtered queries, /traces/{examination_id} for raw or processed CTG data, /parameters and /events for derived values, and /mapping for OMOP metadata. You can filter by location, date range, or patient ID, and Swagger documentation is generated automatically. The interface itself has two main pages. The first is a dashboard for searching patients, with advanced filtering, an examination list, and an OMOP compatibility check. The second is an examination-detail page with interactive CTG visualization (zoom and pan), a toggle between raw and processed signals, computed parameters, examination metadata, and CSV/JSON export with configurable formats and sampling rates. Together they let a clinician move quickly through patient records and CTG signals for both care and research."
                },
                {
                    id: "privacy-considerations",
                    title: "Privacy and Ethical Considerations",
                    content: "The datasets arrived anonymized, but anonymization isn't the end of the privacy story. Quasi-identifiers — age, gender, location, the dates of medical visits — can re-identify someone when combined with outside knowledge, and the risk climbs in small towns or regions with few healthcare facilities. We also couldn't fully judge how robust the anonymization was, since the methods behind it weren't disclosed. And because the data came from several institutions that may follow different standards (GDPR, HIPAA), the regulatory picture is fragmented. Future work should lock down access control on the APIs and interfaces, be transparent about anonymization methods, weigh re-identification risk against population size and local context, and align with the relevant data-protection rules and consent frameworks."
                }
            ]
        }
    },
    {
        id: 8,
        title: "Thought2Text: Brain Computer Interface using P300 Signals to Generate Text",
        cardTitle: "Thought2Text",
        cardSummary: "A P300 brain-computer interface that turns EEG responses into text for assistive communication.",
        description: "A P300-based brain-computer interface (BCI) that lets people type using brain activity alone. Built to help individuals with severe motor disabilities, it reaches 90% accuracy and an 11 bits/min information transfer rate with an 8-channel g.tec EEG device and the classic row-column paradigm.",
        image: "images/thought2text.png",
        techStack: ["Python", "MATLAB", "EEG", "Signal Processing", "Machine Learning", "BCI", "LDA", "XDAWN", "MNE-Python", "Lab Streaming Layer"],
        dimensions: ["biomedical"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "2024",
        details: {
            teamPhoto: "images/thought2text_team.png",
            team: "Arda Gürsul (72728) & Birkan Çelik (68813)",
            advisors: "Beren Semiz & Hakan Ürey",
            overview: "Thought2Text is a BCI that turns P300 brain signals into text, built first and foremost for people with severe motor disabilities — ALS, spinal cord injuries, neuromuscular disorders. It runs on an 8-channel g.tec g.Nautilus Research EEG device, with electrodes placed around the parietal and occipital lobes. Using the row-column paradigm Farwell and Donchin introduced, it reaches 90% accuracy and an 11 bits/min information transfer rate, which works out to one letter every 4.5 seconds — on par with the state of the art.",
            problem: "Roughly 5.4 million people worldwide live with paralysis, and 72.1% of them are under 65. Stroke is the leading cause at 33.7%, followed by multiple sclerosis, spinal cord injury, and cerebral palsy. When paralysis takes away the ability to communicate, ordinary interfaces — keyboards, touchscreens, even eye-trackers — stop being an option. BCIs are the promising way forward, but in practice they tend to struggle with data quality, signal-to-noise ratio, and holding up reliably in real time.",
            solution: "We built Thought2Text as a P300 speller running on a non-invasive 8-channel g.tec g.Nautilus Research EEG device. The user looks at a 6x6 matrix and focuses on the letter or number they want while rows and columns flash in random order. When the row or column containing that character lights up, the brain produces a P300 — a positive deflection about 300ms after the stimulus — and the system uses that response to work out which character the user meant and display it. Behind the interface sit the full signal processing pipeline, XDAWN spatial filtering, and a Linear Discriminant Analysis (LDA) classifier that together make the detection reliable.",
            methodology: [
                "EEG device setup: We landed on the 8-channel g.tec g.Nautilus Research device after first trying the Emotiv EPOC+ (14-channel) and Biopac (4-channel). The g.tec gave 35% better accuracy and steadier results, even though it needs electro-gel.",
                "Lab Streaming Layer (LSL): We used LSL middleware to stream and synchronize data from multiple sources, which kept the system modular and made swapping hardware or software components painless.",
                "EEG recording and stimulation: The 6x6 matrix flashes each row and column for 50ms with 25ms between flashes, running 5 cycles of 12 flashes (6 rows + 6 columns) per letter, with every target and non-target stimulus marked for later analysis.",
                "Signal processing: A 50Hz notch filter removes powerline noise and a 4th-order Butterworth bandpass (1-20Hz) isolates the P300 frequency range. We then trained XDAWN spatial filters to raise the signal-to-signal-plus-noise ratio (SSNR) by emphasizing the channels most likely to carry the P300.",
                "Classifier training: The classifier draws a binary line between target segments (the focused letter's row or column) and non-target ones, with data segments averaged to bring out the P300. We compared Linear Discriminant Analysis (LDA), Support Vector Machine (SVM), and Multi-Layer Perceptron (MLP); LDA won. Since only 2 of every 12 flashes are targets, we handled the class imbalance with weighted loss functions.",
                "Real-time text generation: The real-time pipeline turns brain signals into letters. Calibration takes about 20 minutes per new user, after which they can type at 4.5 seconds per letter."
            ],
            results: [
                "90% accuracy in typing experiments — 9 of every 10 letters identified correctly.",
                "An 11 bits/min information transfer rate, right alongside the state-of-the-art 12 bits/min.",
                "A typing speed of 4.5 seconds per letter.",
                "Better behavior under fatigue: 60% accuracy tired, versus 50% for state-of-the-art models.",
                "82% accuracy on average across multiple users in single-session train/test runs.",
                "A 35% accuracy jump after moving from the Emotiv EPOC+ to the g.tec g.Nautilus.",
                "A working implementation of Farwell and Donchin's row-column paradigm with modern signal processing.",
                "Consistent offline results confirming the system is stable."
            ],
            subpages: [
                {
                    id: "p300-signals",
                    title: "P300 Signals and Row-Column Paradigm",
                    content: "A P300 is a positive deflection in the EEG that appears about 300 milliseconds after a stimulus that's rare but expected. The row-column paradigm, introduced by Farwell and Donchin in 1988, builds on this: a 6x6 matrix flashes its rows and columns at random, and when the row or column holding the letter you're focused on lights up, your brain fires a P300. Our system keeps that classic paradigm but pairs it with modern signal processing. Each row and column flashes for 50 milliseconds with 25 milliseconds in between, and we run 5 cycles — 60 flashes in total — per letter, which is enough to tell the P300 responses apart from ordinary EEG."
                },
                {
                    id: "signal-processing",
                    title: "Signal Processing Pipeline",
                    content: "The pipeline runs in stages. First a 50Hz notch filter clears powerline noise. Then a 4th-order Butterworth bandpass (1-20Hz) pulls out the P300 frequency range, trading off passband smoothness against roll-off sharpness. Finally, XDAWN spatial filtering lifts the signal-to-signal-plus-noise ratio: trained on each user's own data, it leans on the channels most likely to carry a P300 and quiets the ones that don't. Mechanically, XDAWN runs singular value decomposition on the sensor inputs and keeps the first 2 singular vectors — the largest singular values — to estimate the underlying sources and weight the most informative channels. This step makes a real difference to classification accuracy."
                },
                {
                    id: "classification",
                    title: "Classification and Model Selection",
                    content: "The classification is binary: target segments (the focused letter's row and column) versus non-target ones, with the segments averaged first to bring out the P300. We tried three classifiers — Linear Discriminant Analysis (LDA), Support Vector Machine (SVM), and Multi-Layer Perceptron (MLP) — and LDA performed best on our data. The big obstacle was class imbalance: of every 12 flashes, only 2 are targets (the row and column of the intended letter) and 10 are not. We countered it with weighted loss functions that punish mistakes on the small target class more heavily, which mattered most when training the neural networks. The final model, 08-01-05, hit 90% accuracy and 11 bits/min."
                },
                {
                    id: "system-architecture",
                    title: "System Architecture and Hardware",
                    content: "The architecture comes together in five parts: the 8-channel g.tec g.Nautilus Research EEG device, electrodes around the parietal and occipital lobes, sampling at 512Hz; Lab Streaming Layer (LSL) middleware synchronizing data from the EEG device and the stimulus presentation; a real-time signal processing pipeline applying the filters and XDAWN spatial filters; the trained LDA classifier separating target from non-target; and a letter-prediction step that picks the most likely row and column from the P300 responses. We tested the Emotiv EPOC+ (14-channel) and Biopac (4-channel) first, but the g.tec delivered clearly better data quality and 35% higher accuracy, which made it the obvious choice despite the electro-gel."
                },
                {
                    id: "performance-evaluation",
                    title: "Performance Evaluation and Results",
                    content: "We put the system through several experiments. Ten back-to-back runs of 10 letters each landed at 90% accuracy (9 of 10 correct). The information transfer rate measured 11 bits/min, against a state-of-the-art 12. Typing speed held at 4.5 seconds per letter. A fatigue test showed 60% accuracy when tired versus 50% for state-of-the-art models — a gain we put down to training on fatigued-user data. And multi-user testing with single train/test sessions averaged 82% accuracy, a sign the system is stable. In short, it beats the state of the art under fatigue and matches it in normal conditions, which validates the whole data collection and processing pipeline."
                },
                {
                    id: "applications",
                    title: "Real-World Applications and Impact",
                    content: "Thought2Text is aimed squarely at people with severe motor disabilities — ALS patients, spinal cord injury survivors, those with neuromuscular disorders — who have little or no muscle control. For them, a way to communicate is a way to express themselves and reclaim some independence. The P300 speller asks for nothing but the ability to focus attention: type with brain signals alone. Calibration runs about 20 minutes for a new user, and after that the typing is real-time. The approach has clear promise as an assistive communication device, and it could be extended with other stimulus types — faces, audio, touch — for users with visual impairments or other specific needs."
                },
                {
                    id: "literature-comparison",
                    title: "State-of-the-Art Comparison",
                    content: "Our system reaches state-of-the-art performance using the Farwell-Donchin (FD) row-column paradigm. Across the literature, the classifiers vary — LDA and its variants, support vector machines, random forests — but the biggest performance gaps come from how the stimuli are created, not from the classifier. Because a P300 is stronger for more striking or unexpected events, researchers have tried human faces (which draw bigger responses for evolutionary reasons), single-display paradigms that flash each letter on its own, and non-visual stimuli like audio or touch for visually impaired users. What our implementation shows is that with careful data collection and processing, the plain FD paradigm can get within a hair of the best results (11 vs 12 bits/min) — a solid base to build on."
                }
            ]
        }
    },
    {
        id: 11,
        title: "Socrates AI: Real-Time Clinical Mentorship",
        cardTitle: "Socrates AI",
        cardSummary: "A clinical mentorship prototype that asks better questions to support a physician’s reasoning.",
        description: "Socrates AI, built at the HSIL Hackathon (Harvard Health Systems Innovation Lab), is a clinical mentorship tool that listens in on a consultation and prompts the physician with sharper questions instead of handing over a diagnosis. The hackathon — a two-day event run simultaneously in 30+ countries under the theme 'Building High-Value Health Systems: Leveraging AI' — came to Milan on April 10–11, 2026, at MIND – Milano Innovation District, the first time Italy hosted it.",
        image: "images/socrates_demo.png",
        techStack: ["Healthcare AI", "Clinical Decision Support", "Real-time NLP", "Mentorship Design", "LLM"],
        dimensions: ["hci", "biomedical"],
        links: {},
        date: "2026",
        details: {
            overview: "The HSIL Hackathon, run by Harvard's Health Systems Innovation Lab, is one of the largest healthcare innovation events in the world — held simultaneously across 30+ countries with 500+ teams, and built around going from idea to working prototype in two days. The 2026 theme was 'Building High-Value Health Systems: Leveraging AI'.\n\nThe Milan edition (April 10–11, 2026) was a first for Italy. It ran at MIND – Milano Innovation District (Fondazione Triulza), with interdisciplinary teams pulled from the University of Milan, Politecnico di Milano, and Human Technopole, alongside partners including Federated Innovation @MIND and the Italian Society for AI in Medicine.\n\nIt was a genuinely inspiring room — engineers, clinicians, designers, and entrepreneurs all circling one urgent question: how can AI improve patient care, efficiency, and the sustainability of the system without hollowing out the people at its center?\n\nThat question is what led us to Socrates AI. AI is going to end up in clinicians' daily workflows no matter what, and the risk we kept coming back to is what that does to training — whether we end up with physicians who lean on AI so heavily they never build the instincts that come from working cases themselves. University hospitals, where the next generation of doctors is formed, are where this hits first and hardest, and they're exactly where AI integration most needs to be done right. Socrates AI is designed for them: a training tool that embeds mentorship directly into the residency experience.",
            problem: "AI is going to land in clinicians' daily workflows whether we plan for it or not, and that brings a problem that's easy to miss. Lean on it too hard and you can end up training physicians who struggle with even routine diagnoses, because the skill was never theirs to begin with. Diagnosis is learned actively — through practice, repetition, and the hard work of thinking a case through. If AI quietly removes those reps, especially for residents, the underlying skill never forms. The long-term risk is a generation of doctors who look capable on paper but haven't earned the depth that experience builds.",
            solution: "Socrates AI doesn't try to replace the clinician — it trains one. Built for university hospitals, where residents are formed, it listens to the conversation between patient and physician during a consultation and, rather than offering a diagnosis, suggests sharper questions to ask. Those prompts nudge the resident to think more broadly and surface angles they might have missed — the kind of question an experienced consultant would raise in a later review, except now it arrives in the moment. Dropped into a residency program, Socrates puts expert-level guidance inside every consultation, turning everyday clinical work into continuous mentorship.",
            methodology: [
                "Pinned down the core tension at the hackathon: most healthcare AI optimizes for how fast it produces an answer, not for the quality of the clinician's own reasoning.",
                "Settled on a Socratic interaction model — the system guides thinking through pointed questions instead of handing over a diagnosis.",
                "Designed the listening to be passive and real-time, living on the resident's screen without interrupting or taking over the consultation.",
                "Built a continuous dialogue analysis loop that watches for gaps — unexplored symptoms, unasked differentials, missing red flags — and raises them as prompts.",
                "Wrote each prompt as a mentor-level question, the kind a senior consultant would ask in a ward review, now present in every consultation.",
                "Made the difficulty adaptive: as the resident gets better, Socrates raises the sophistication of its cues.",
                "Aimed it at university hospitals and teaching institutions, where residents learn through supervised practice.",
                "Pitched the concept to the HSIL panel, showing it addresses a real long-term risk in how medicine is taught under AI."
            ],
            results: [
                "A human-centered AI framework that sharpens clinical judgment instead of going around it.",
                "Real-time mentorship at scale — expert-level guidance for every resident in every consultation at a university hospital.",
                "An adaptive learning loop that tunes the difficulty of its prompts to the clinician's current skill.",
                "A clear principle for adopting AI responsibly in healthcare: it should enhance us, not replace us.",
                "A template for bringing AI into other high-stakes fields where professional skill still has to be built, not bypassed.",
                "A reminder that although this tension will show up wherever AI lands, healthcare is where it starts — and how we handle it here will set the precedent everywhere else."
            ],
            subpages: [
                {
                    id: "the-problem-with-ai-in-medicine",
                    title: "The Risk Nobody Is Talking About",
                    content: "AI is going to become part of how healthcare professionals work every day. That's not a prediction so much as a given — and it comes with a problem we don't talk about enough.\n\nLean on it hard enough and, over time, you train physicians who can't confidently work through even a simple case, because the diagnostic muscle was never theirs to build. Learning is active. It takes practice, repetition, and the discomfort of thinking a problem through without the answer in front of you. Take those moments away from residents and the skill underneath them quietly fails to form.\n\nThat's the long-term risk: not a sudden failure, but a slow erosion — a future with fewer doctors who carry real depth, because they were never given the chance to earn it.\n\nThis will surface in plenty of fields as they adopt AI. But healthcare is where it begins, and how we choose to handle it here will set the pattern for everywhere it goes next."
                },
                {
                    id: "how-socrates-works",
                    title: "How Socrates AI Works",
                    content: "Picture an ordinary consultation. A patient sits down with a resident, who starts asking about symptoms and working toward a diagnosis.\n\nSocrates AI is there in the background, listening in real time. It's wired into the resident's system and shows up on their screen, but it never interrupts or takes over the conversation.\n\nAs the consultation unfolds, it keeps analyzing the dialogue. When it spots a gap — something important left unexplored, or a question that could sharpen the diagnosis — it drops a quiet prompt onto the monitor. The prompts are never answers; they're carefully framed questions meant to push the resident's own thinking.\n\nThat's the whole point: the resident has to think harder and wider rather than just receive a conclusion. They stay in the driver's seat of the diagnosis, with guidance arriving exactly where it helps.\n\nDo this across enough patients and a learning loop takes hold. The resident gets better — better questions, sharper pattern recognition, more depth on each case — and Socrates keeps pace, raising the sophistication of its prompts as their competence grows.",
                    videos: [
                        { url: "https://youtu.be/vjRRTCLOyP8", title: "Socrates AI Demo" }
                    ]
                },
                {
                    id: "mentorship-at-scale",
                    title: "Mentorship at Scale",
                    quote: "Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them.",
                    quoteAttribution: "Frank Herbert, Dune (1965)",
                    content: "At its core, Socrates is personalized mentorship. It carries the perspective of an experienced physician into every consultation, so a resident always has good guidance within reach.\n\nIts natural home is the university hospital — the teaching institution where residents rotate through departments, see real patients, and build the clinical reasoning that will shape their careers. Senior physicians can't sit in on every consultation; Socrates closes that gap with consistent, expert-level guidance in each one.\n\nThis isn't about replacing clinical judgment. It's about strengthening it. By weaving continuous, context-aware learning into daily practice, Socrates turns each patient interaction into a chance to grow.\n\nThis, to us, is how AI belongs in healthcare — not as a substitute for human expertise, but as a training tool that sharpens and lifts it.\n\nAI will not replace us; it will enhance us."
                },
                {
                    id: "visit-simulation",
                    title: "Visit Simulation: Practice Before the Real Thing",
                    image: "images/socrates_as_case_simulation_tool.png",
                    content: "Socrates has a second mode that's a different beast entirely: a visit simulation.\n\nThis isn't an AI offering hints from the sidelines. It's a full clinical encounter — the resident sits down with a simulated patient, asks questions, takes a history, and works toward a diagnosis exactly as they would in a real consultation room. The patient responds naturally, describes symptoms, voices worries, and reacts to how the conversation goes.\n\nThe resident runs the whole thing: which questions to ask, in what order, how to read the answers. Nothing is handed over. Every diagnostic hypothesis has to be earned through the quality of the encounter itself.\n\nWhen it's done, Socrates gives a structured debrief — what was asked, what was missed, which red flags got explored and which slipped by, and how the reasoning lines up against the expected pathway for that case.\n\nThis is deliberate practice at its most realistic. A resident can face a rare presentation, a high-stakes scenario, or just run common cases over and over until the pattern recognition turns into instinct — none of it risking a real patient.\n\nThe simulation isn't a feature bolted on. It's a separate experience built on the same conviction: the best way to prepare a physician is to make them think, not to think for them."
                },
                {
                    id: "aperetivo",
                    title: "L'Aperitivo",
                    image: "images/aperetivo.jpg",
                    plain: true,
                    content: "At the end of the first day, we didn't go back to our laptops. We went to aperetivo.\n\nIf this hackathon had been in another country, we would probably have been coding nonstop for 48 hours. But this is Italy. And that made all the difference.\n\nWe sat together - participants, organizers, people from all kinds of backgrounds - and just talked. I met great people, heard so many different stories, and shared ideas I wouldn't have found time for otherwise. That was the moment I said to myself: I already won this hackathon. I felt I had to write this down, so these moments could live somewhere beyond memory.\n\nI am so glad I got to meet every single person at that table."
                }
            ]
        }
    },
    {
        id: 9,
        title: "ATLAS: Your Intelligent Travel Assistant",
        cardTitle: "ATLAS",
        cardSummary: "A conversational travel assistant for personalized flight search, route tracking, and notifications.",
        description: "A mobile travel assistant that personalizes flight recommendations from real-time flight data. Built with Flutter, Python FastAPI, and Firebase, with an LLM agent powered by OpenAI GPT-4 Turbo. It does personalized flight search, route tracking, push notifications, and a conversational interface you can just talk to.",
        image: "images/atlas.png",
        techStack: ["Flutter", "Python", "FastAPI", "Firebase", "LangChain", "OpenAI GPT-4", "Kiwi Tequila API", "Dart", "Cloud Functions"],
        dimensions: ["startup"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "Spring 2024",
        details: {
            teamPhoto: "images/atlas_2.png",
            overview: "ATLAS is a mobile travel assistant that takes the grind out of planning a trip: it learns what you care about and suggests flights in real time. Flight data comes from the Kiwi Tequila API, and personalization algorithms filter it against a traveler persona — business, budget-conscious, eco-friendly, family, and so on. The point of difference is that the assistant keeps working in the background once it knows your preferences, pinging you when a flight you'd actually want turns up. We built it as a team at Koç University.",
            problem: "Planning travel is slow and overwhelming, mostly because of information overload. Ordinary flight sites make you filter through endless options by hand, and most of them forget those filters the next time you search, so you start over again and again. There's little real personalization in the recommendations, and keeping an eye on price changes is left entirely to you.",
            solution: "ATLAS answers all of that with an assistant that works in the background. At signup it builds a persona using session-based recommendation, then filters every later result against it automatically. It tracks specific flights and routes and pushes a notification when a price drops or a better deal appears. And the built-in LLM agent lets you search and track flights through plain conversation — much like talking to someone at a travel agency.",
            methodology: [
                "Built the Flutter app for iOS and Android with a clean, approachable interface.",
                "Wrote the personalization with content-based filtering and session-based recommendation.",
                "Created a persona system (adventurous, budget-conscious, business, eco-friendly, family) seeded from signup preferences.",
                "Stood up FastAPI backend services for flight search and for talking to the LLM agent.",
                "Pulled real-time flight data from the Kiwi Tequila API.",
                "Used Firebase for authentication, Cloud Firestore for user data, and Cloud Functions for background jobs.",
                "Built the LLM service on LangChain with OpenAI's GPT-4 Turbo.",
                "Gave the agent custom tools for flight search, route tracking, time checks, and airport-code lookup via a FAISS vector database.",
                "Added push notifications for price alerts and flight reminders.",
                "Built flight tracking with price-history graphs and alternative-date suggestions."
            ],
            results: [
                "Shipped a working app with the full feature set.",
                "Personalization that filters flights to a user's preferences without being asked.",
                "A conversational LLM agent that steers a conversation to gather what it needs, and does it in a natural, human way.",
                "Background tracking that watches flight prices and notifies users at the right moment.",
                "A 4-5 second average response time for the LLM agent.",
                "A modular microservice architecture that scales and adapts easily to other apps.",
                "User testing came back positive, especially on the tracking features and the LLM interface.",
                "Voice interaction that makes the app usable for visually impaired travelers."
            ],
            subpages: [
                {
                    id: "personalization",
                    title: "Personalization Algorithms",
                    content: "Personalization blends content-based filtering with session-based recommendation. At signup, you answer a handful of yes/no questions — do you travel alone, backpack or not, prefer eco-friendly flights, comfort or budget, new destinations, weekday departures, and so on. Your answers sort you into a persona: adventurous, budget-conscious, business, eco-friendly, or family. From there the app shapes results to match — a business traveler sees direct flights first, while a budget traveler gets the cheaper options that come with a stop or two."
                },
                {
                    id: "llm-agent",
                    title: "LLM Agent Service",
                    content: "The agent runs on LangChain with OpenAI's GPT-4 Turbo. Where a typical chatbot marches through scripted questions, ATLAS lets you talk freely. It keeps memory of the conversation, so it can handle something like 'I want to fly two weeks later than today' without losing the thread. Under the hood it calls custom tools — the flight search API, route tracking, time checks, and airport-code lookup through a FAISS vector database. It reads what you actually mean and steers the conversation to collect what it needs, which feels a lot like talking to a real travel agent."
                },
                {
                    id: "push-notifications",
                    title: "Push Notifications & Tracking",
                    content: "ATLAS runs three background services: flight tracking, route tracking, and flight reminders. Track a specific flight and it watches the price, nudging you when it drops. Track a route and it checks every flight on that route twice a day, suggesting alternative dates when something cheaper shows up. Flight reminders hold on to your old searches and tell you when results change. To avoid becoming a nuisance, an aging algorithm caps the noise: after 3 notifications on a search with no purchase, it goes quiet. All of this runs on Google Cloud Functions, independent of your phone."
                },
                {
                    id: "system-architecture",
                    title: "System Architecture",
                    content: "ATLAS is built as modular microservices. The frontend is Flutter, so one codebase covers both platforms. The backend is Python and FastAPI — REST endpoints for most things, WebSocket for the LLM agent. Firebase handles authentication, Cloud Firestore stores data, and Cloud Functions run the background jobs. A flight search service sits between the app and the Kiwi Tequila API, translating data formats, while the LLM service talks to OpenAI and uses FAISS to store airport codes as vectors. Because the pieces are independent, each one can be developed on its own and reused in other apps."
                }
            ]
        }
    },
    {
        id: 12,
        title: "Adaptive Prevention of Computer Vision Syndrome with Edge-Based Camera-Only Smart Glasses",
        cardTitle: "Vision Care Glasses",
        cardSummary: "Camera-only smart glasses that recognize screen use on-device and prompt regular visual breaks.",
        description: "Camera-only smart glasses that fight Computer Vision Syndrome (CVS) by enforcing the 20-20-20 rule on their own. A front-facing micro-camera feeds an on-device edge AI model (MobileNetV1) that tells active screen use apart from ordinary near-work in real time, and once you've looked at a screen for 20 unbroken minutes, a soft haptic buzz reminds you to look away. Everything runs on an ESP32 microcontroller — no cloud, so privacy and battery both stay intact.",
        image: "images/smart_glass_image_cvs.jpg",
        techStack: ["MobileNetV1", "Edge Impulse", "TensorFlow", "Computer Vision", "Edge AI", "ESP32 / ESP-EYE", "int8 Quantization", "Haptic Feedback", "SolidWorks", "3D Printing"],
        dimensions: ["hci", "biomedical"],
        links: {
            github: "https://github.com/birkancelik18",
            pdf: "docs/reports/Adaptive%20Prevention%20of%20Computer%20Vision%20Syndrome%20with%20Edge-Based%20Camera-Only%20Smart%20Glasses.pdf"
        },
        date: "2025 - 2026",
        details: {
            teamPhoto: "images/group_photo_cvs_helper.jpg",
            team: "Andrea Florian, Birkan Çelik, Edoardo Meschi, Matteo Maiani & Mattia Rocco",
            overview: "Developed at Politecnico di Milano, this is a camera-only pair of smart glasses built to mitigate Computer Vision Syndrome (CVS) — the strain that comes from long stretches of near-vision screen use — without any help from the wearer. It's not a static timer. A front-facing micro-camera and an edge processor running a local AI model read the wearer's first-person view in real time, telling active, light-emitting screen use apart from ordinary near-work, and deliver a discreet haptic buzz once screen time crosses an unbroken threshold. Because all the vision runs on-device, the wearer's privacy is never at risk, and the design sidesteps the latency, battery drain, and bulky multi-sensor rigs that weigh down other wearables. The takeaway is that you can put a genuinely demanding vision task directly on a wearable edge device — a private, low-power approach to CVS that would scale across all kinds of screens.",
            problem: "As screens have become inescapable, Computer Vision Syndrome (CVS) has risen with them — recent meta-analyses put the pooled global prevalence at 66% among device users, climbing as high as 94.5% in university cohorts. Long, unbroken near-vision work suppresses the blink reflex and brings on visual exhaustion, tension headaches, dry eyes, and worse sleep. The clinically endorsed 20-20-20 rule — every 20 minutes, look at something 20 feet away for 20 seconds — is a proven counter, but actually sticking to it is the hard part. The existing fixes each fall down somewhere: software timers are blind to context and interrupt you mid-focus until you start ignoring them; external webcams are tied to one spot and raise privacy worries; multi-sensor wearables (RGB + IMU + LiDAR) are bulky, run hot, and drain fast; and egocentric-vision systems that stream video to the cloud throw away privacy and flatten the battery in minutes.",
            solution: "The glasses rely on nothing but the feed from an embedded forward-facing micro-camera, and they run every bit of inference locally on an ESP32 microcontroller. A lightweight MobileNetV1 classifier samples the wearer's field of view at 1 FPS and returns the probability that an active, light-emitting screen is in view. A rolling timer adds up continuous screen time, and once it hits an unbroken 20 minutes, the microprocessor fires a haptic motor — a discreet buzz, no flashing alerts or sounds — to prompt the wearer to look away. It then counts down a 20-second break, and it's adaptive: any natural pause of 20 or more screen-free seconds resets the main timer, so it never nags you when you've already rested your eyes. To keep the model honest in the real world, confounders like bright windows and reflective surfaces were folded into the screen-absent class, widening the classifier's decision boundary.",
            methodology: [
                "Custom egocentric dataset: Built a purpose-made dataset of about 982 annotated frames of first-person, head-mounted footage, specifically to close the gap between public third-person datasets and what the glasses actually see — their field of view, lens distortion, and screen glare. Two binary classes: screen-active (looking at a screen) and screen-absent (looking away). The training set held 686 images (370 screen-active, 316 screen-absent).",
                "Dataset diversity and confounders: Captured a range of screen types (monitors, laptops, smartphones), lighting (daylight, fluorescent, low-light), and the viewing distances and head tilts typical of CVS posture. Bright windows, glossy reflective surfaces, and external TVs and projectors went in deliberately as negatives, so the model learns what actually makes a screen emissive instead of jumping at anything bright.",
                "Edge ML architecture: Used transfer learning on a pre-trained MobileNetV1 (96x96 input, width multiplier alpha=0.1, 27,648 input features), whose depthwise separable convolutions are what make real-time inference on a microcontroller possible. The original dense head was swapped for a custom 8-neuron layer with 0.1 dropout and a 2-node output for the binary screen vs. no-screen decision.",
                "Training: Ran 40 epochs on the Edge Impulse platform at a 0.0005 learning rate with GPU acceleration, data augmentation on for variance and better generalization, and images resized to 96x96 in 'fit shortest' mode.",
                "Adaptive 20-20-20 logic and haptic feedback: A rolling exposure timer triggers a haptic micro-vibration after 20 continuous minutes of detected screen use, counts down a 20-second break, and resets itself whenever a natural 20+ second screen-free break occurs — so the wearer is never interrupted needlessly.",
                "Edge deployment and optimization: Compiled the model into an Arduino library with the Edge Impulse EON Compiler, which cut RAM by 18% and Flash by 34% with no loss of accuracy, targeting an Espressif ESP-EYE (ESP32 @ 240MHz). The int8 quantized model needs just 194.9 KB RAM and 182.1 KB Flash, with a total inference latency of 934 ms per image (15 ms DSP + 919 ms neural network).",
                "Physical prototype: Modeled the wearable in SolidWorks around the ESP32 camera module's dimensions and 3D-printed it, with a frontal camera for the egocentric viewpoint and a dedicated housing for the haptic motor wired to the processing unit."
            ],
            results: [
                "94.87% accuracy (int8) and 95.51% (float32) on a completely unseen hold-out test set (N=156), with a macro-average F1 holding at 0.95 for both — the model spots a screen's presence and absence equally well, with no bias either way.",
                "Quantizing to int8 cost almost nothing in accuracy while cutting the compute load, which is the whole proof that demanding computer vision can live directly on-device.",
                "On-device inference in the sub-second class (934 ms per image) on an ESP32, with a tiny memory footprint (194.9 KB RAM, 182.1 KB Flash).",
                "The EON Compiler trimmed RAM by 18% and Flash by 34% with no accuracy lost.",
                "A working 3D-printed prototype with the ESP32 camera board and haptic motor, proving the interaction is physically feasible.",
                "No cloud at all — the visual stream is processed locally, which protects privacy and avoids streaming latency and fast battery drain.",
                "Folding real-world confounders (bright windows, reflective surfaces, external displays) into the negative class made the classifier more robust and cut false alarms."
            ],
            subpages: [
                {
                    id: "20-20-20-rule",
                    title: "The 20-20-20 Rule and Adaptive Logic",
                    content: "The clinically endorsed 20-20-20 rule says that for every 20 minutes of screen use you should look at something about 20 feet away (optical infinity) for 20 seconds, which restores tear-film stability and releases the muscular tension inside the eye. Ordinary timer apps enforce it with rigid, context-blind countdowns that go off even when you're already resting — so you learn to ignore them. This system applies the rule dynamically instead. The camera samples the field of view at a low 1 FPS to save battery, and a rolling timer counts only continuous screen time. At an unbroken 20 minutes, the microprocessor sends a discreet haptic cue to look away, counts down a 20-second break, and buzzes again when the break is up. The important part: if the camera sees no active screen for at least 20 continuous seconds during that 20-minute window, the main timer resets on its own — it assumes you've already taken a real break, so it never interrupts you for no reason."
                },
                {
                    id: "egocentric-dataset",
                    title: "Custom Egocentric Dataset and Confounders",
                    content: "The biggest obstacle to robust on-device inference is a domain gap: public image datasets are overwhelmingly third-person, but a head-mounted micro-camera sees the world first-person (egocentric), with its own angles, lens distortions, and screen glare. To bridge that, a custom egocentric dataset of roughly 982 annotated frames was built with a micro-camera module matching the final glasses, mounted on a frame so it naturally captured head movement and CVS posture. Each frame was labelled screen-active (looking at a screen) or screen-absent (looking away, which satisfies the rest condition), and the training set held 686 images (370 screen-active, 316 screen-absent). To stop the model from tripping on anything merely bright, confounders — bright windows, glossy reflective surfaces, and TVs or projectors outside the working context — were deliberately added to the screen-absent class. That taught it the features that actually mark an emissive working screen, extending its decision boundary to real conditions without needing extra label categories."
                },
                {
                    id: "edge-ml-model",
                    title: "Edge ML Model and Quantization",
                    content: "To detect screen exposure on hardware this limited, the system uses transfer learning on MobileNetV1 — a family of highly efficient convolutional networks made for mobile and embedded vision. MobileNetV1 swaps standard convolutions for depthwise separable ones, splitting each operation into a depthwise stage (one filter per input channel) and a pointwise stage that linearly combines the results, which slashes both compute and model size. The variant here is MobileNetV1 96x96 at width multiplier alpha=0.1 (a 27,648-feature input layer for the RGB channels), scaling down the filters per layer for an extremely compact backbone. The pre-trained dense head was removed and replaced with a custom 8-neuron dense layer (0.1 dropout) and a 2-node output for the binary screen vs. no-screen task. Training ran 40 epochs on Edge Impulse (learning rate 0.0005, augmentation on). On the unseen test set it hit 95.51% accuracy (float32) and 94.87% (int8), with a steady 0.95 macro-F1. The key result was how little int8 quantization cost: the quantized model shed compute with negligible accuracy loss — confirming that complex on-device vision is realistic for wearables where privacy, power, and real-time response all matter."
                },
                {
                    id: "hardware-prototype",
                    title: "Hardware and 3D-Printed Prototype",
                    content: "The model had to run cleanly on a microcontroller, so it was compiled into a standard Arduino library with the Edge Impulse EON Compiler, which cut RAM by 18% and Flash (ROM) by 34% without giving up accuracy. Profiling targeted an Espressif ESP-EYE (ESP32 at 240MHz): the int8 model needs only 194.9 KB of RAM and 182.1 KB of Flash, with a total inference latency of 934 ms per image (15 ms for signal processing, 919 ms for the network). To check the physical side, a working prototype was modeled in SolidWorks around the ESP32 camera module's dimensions and 3D-printed for fast iteration and ergonomic testing. The frame carries a front-facing camera for the egocentric viewpoint and a dedicated housing for the haptic motor wired to the processing unit. It's a proof of concept — it shows the interaction and proves the thing works; a production version would miniaturize the electronics to fit inside commercially viable glasses."
                },
                {
                    id: "privacy-future-work",
                    title: "Privacy, Impact, and Future Work",
                    content: "Where egocentric-vision systems stream video to the cloud — sacrificing privacy, adding latency, and draining batteries in minutes — this one analyzes the visual stream entirely locally and in real time. Nothing leaves the device, which gives the absolute privacy earlier models lacked while cutting out needless hardware and latency. The single-camera, edge-only design is also what makes it wearable day to day: none of the thickness, overheating, or power draw of multi-sensor fusion rigs (RGB + IMU + LiDAR), and the silent haptic buzz enforces the 20-20-20 rule without yanking you out of your work. The result is an unobtrusive interaction that balances accuracy, physical invisibility, and long-term computational sustainability. Three directions remain for future work: test the prototype in the real world with enough participants to measure its actual effect on eye health; widen detection by growing the dataset to cover more screens, like smartphones and tablets; and push accuracy higher by feeding the network far more reference images across varied environments, reflections, and lighting."
                }
            ]
        }
    }
];

// ============================================
// EXPERIENCE / TIMELINE
// ============================================
// Minimal "highlight reel": one line per role. `sort` (YYYYMM start) drives the
// newest-first order; `period` is the short label shown on the right.
const experienceData = [
    { id: 1, sort: 202502, period: "2025 — Now", title: "M.Sc. Computer Science & Engineering", organization: "Politecnico di Milano", type: "education" },
    { id: 2, sort: 202401, period: "2024 — 25",  title: "Applied AI Engineer",                  organization: "Novus",                  type: "work" },
    { id: 3, sort: 202309, period: "2023",       title: "Research Intern",                      organization: "University of Essex · BCI Lab", type: "work" },
    { id: 4, sort: 202305, period: "2023",       title: "Machine Learning Fellow",              organization: "Google ML Bootcamp",     type: "work" },
    { id: 5, sort: 202206, period: "2022",       title: "Robotics & Autonomous Driving Intern", organization: "Delivers.AI",            type: "work" },
    { id: 7, sort: 202101, period: "2021",       title: "STAR Research Intern",                 organization: "TÜBİTAK",                type: "work" },
    { id: 6, sort: 201811, period: "2018 — 24",  title: "Undergraduate Researcher",             organization: "Koç University · IUI Lab", type: "work" },
    { id: 8, sort: 201909, period: "2019 — 24",  title: "B.Sc. Electrical & Computer Engineering", organization: "Koç University",      type: "education" }
];

// ============================================
// CONTACT INFORMATION
// ============================================
const contactData = {
    email: "birkancelik18@hotmail.com",
    alternateEmail: "birkan.celik@mail.polimi.it",
    phone: "",
    location: "Milano, Italy",
    socialLinks: {
        github: "https://github.com/birkancelik18",
        linkedin: "", // Add your LinkedIn if available
        twitter: "" // Optional
    }
};

