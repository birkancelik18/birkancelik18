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
    tagline: "HCI, biomedical signal processing, and AI systems.",
    location: "Politecnico di Milano · Milan, Italy",
    bio: "I am a passionate computer engineering master's student at Politecnico di Milano with diverse interests spanning Human-Computer Interaction, and Biomedical Signal Processing. Through my work, I explore the intersection of technology and human experience, building AI systems, conducting research, and developing innovative solutions.",
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
        description: "Previously researched and developed sketch recognition models by integrating human perception principles at Koc University Intelligent User Interfaces Laboratory. Worked on accessible e-learning interfaces and tangible computing to improve human-computer interaction.",
        icon: "", // Removed emoji for elegant design
        color: "#4A90E2",
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
        title: "Startup Ideas",
        subtitle: "Personal Projects & Innovation",
        description: "Projects I work on in my free time alongside my studies and research. These include intelligent web applications and other innovative solutions that combine technical expertise with practical applications.",
        icon: "", // Removed emoji for elegant design
        color: "#50C878",
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
        description: "Researching brain-computer interfaces and neural engineering at University of Essex. Preprocessing EEG data through spectral analysis and engineering deep learning models for mental state classification to improve healthcare outcomes.",
        icon: "", // Removed emoji for elegant design
        color: "#E74C3C",
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
        description: "An AI-powered Microsoft Word add-in that transforms contract review from hours of manual work into minutes of intelligent analysis. PAIR LEGAL helps legal teams catch risks, ensure consistency, and review contracts 70% faster-all without leaving Word.",
        image: "images/Pair/how_pair_legal_initiates.png",
        techStack: ["React", "Office.js", "Fluent UI", "Azure Functions", "Node.js", "OpenAI", "RAG"],
        dimensions: ["startup"],
        links: {},
        date: "2024-2025",
        details: {
            overview: "PAIR LEGAL is an AI-powered contract review assistant built directly into Microsoft Word. It solves the biggest pain points in contract review: time-consuming manual analysis, missed risks, inconsistent language, and fragmented workflows. The tool provides automatic document review, instant clause analysis, similarity search across your contract library, and natural language document Q&A-all while preserving Word's formatting and track changes. Every feature understands your contract context (type, parties, your position) to deliver relevant, actionable insights.",
            problem: "Legal professionals waste hours on manual contract review, switching between Word, external AI tools, and email threads. Critical risks get missed, important clauses are overlooked, and teams struggle with inconsistent language across contracts. Existing tools break formatting, ignore track changes, or don't support multilingual teams. The result? Slower reviews, higher risk, and frustrated legal teams who can't leverage their own contract knowledge.",
            solution: "PAIR LEGAL brings everything into Word: automatic AI-powered document review that catches risks and missing clauses, instant clause analysis when you select text, similarity search across your contract library to ensure consistency, and natural language Q&A to find information instantly. All features work together seamlessly, understand your contract context, and respect Word's native formatting and track changes. No context switching, no broken formatting, no lost time.",
            methodology: [
                "Designed an intuitive onboarding flow that captures contract context (type, parties, position) to personalize all AI suggestions and recommendations.",
                "Built automatic document review that analyzes entire contracts in seconds, providing categorized suggestions, risk flags, and missing clause alerts with clear visual comparisons.",
                "Created an interactive suggestion management system where users can review, accept, or reject recommendations with one click, with all changes tracked transparently in Word.",
                "Developed real-time clause analysis that activates when users select text, providing instant risk assessments, summaries, and improvement suggestions through a conversational interface.",
                "Engineered similarity search across private contract libraries, allowing teams to find and reuse proven language from past contracts to ensure consistency.",
                "Built natural language document Q&A that lets lawyers ask questions about contracts in plain English, supporting multi-document queries and complex comparisons.",
                "Implemented full bilingual support (Turkish/English) with persistent preferences, making the tool accessible for international legal teams."
            ],
            results: [
                "Eliminated context switching by unifying the entire contract workflow inside Word, saving time and reducing errors from tool fragmentation.",
                "Reduced contract review time by up to 70% through automatic AI analysis that identifies risks, missing clauses, and improvement opportunities in minutes.",
                "Enabled instant clause analysis with real-time risk assessments and suggestions when lawyers select any text, speeding up decision-making.",
                "Ensured consistency across contracts by making precedent language searchable and accessible, helping teams maintain firm standards.",
                "Empowered natural language queries about contracts, allowing lawyers to find information instantly instead of manually searching through documents.",
                "Protected document integrity with native Word track changes integration, ensuring all modifications are transparent and reviewable.",
                "Supported multilingual teams with full Turkish/English interface, removing language barriers for international legal operations."
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
                    content: "The biggest time drain in contract review is manual analysis. PAIR LEGAL's Automatic Document Review solves this by analyzing entire contracts in seconds, not hours.\n\nSimply fill in your contract information (type, parties, your position) and click Start Review. The AI examines every clause, identifies potential risks, suggests improvements, and flags missing clauses that should be included. All suggestions are organized in clear categories with visual comparisons showing original vs. suggested text.\n\nYou maintain complete control: review each suggestion, see exactly what would change, and accept or reject with one click. Every change is applied with Word's track changes enabled, so nothing is hidden and everything is reviewable. Missing clauses come with sample text ready to copy, helping you patch gaps quickly while maintaining your firm's approved language.",
                    videos: [
                        { url: "https://youtu.be/SgipTgVORs0", title: "Auto Suggest Demo" },
                        { url: "https://youtu.be/z0qE0xZ5os8", title: "Auto Review Demo" }
                    ]
                },
                {
                    id: "select-and-suggest",
                    title: "Select & Suggest: Instant Clause Analysis",
                    content: "When reviewing contracts, you often need to understand specific clauses quickly-their risks, obligations, or implications. Instead of researching externally or waiting for full document review, PAIR LEGAL's Select & Suggest gives you instant answers.\n\nJust select any text in your document, and the AI immediately provides analysis. Ask questions like 'What are the risks in this clause?' or 'Summarize the payment obligations.' The system understands context and provides relevant insights based on the selected text and your contract information.\n\nSample prompts help you get started quickly: summarize clauses, identify risks, assess payment obligations, or generate risk assessment emails. The conversation history is maintained per selection, so you can dive deep into any clause. When you select different text, a new conversation starts, keeping your analysis organized and focused.",
                    videos: [
                        { url: "https://youtu.be/6M5UQpYsKBE", title: "Select & Get Suggestion Demo" }
                    ]
                },
                {
                    id: "find-similars",
                    title: "Find Similar Clauses: Ensure Consistency",
                    content: "One of the biggest challenges in contract management is maintaining consistency. Similar contracts should use similar language, but without a way to search your contract library, you're starting from scratch each time.\n\nPAIR LEGAL's Find Similar Clauses feature solves this by making your entire contract library searchable. Upload your precedent documents, select any clause in your current contract, and the system finds similar language from your past contracts.\n\nThis helps you in two ways: first, you can ensure consistency by reusing proven language from successful contracts. Second, you can leverage your organization's knowledge-if a similar clause worked well in the past, you can use it with confidence. The feature supports multiple document formats and lets you choose which documents to search, so you can focus on the most relevant precedents."
                },
                {
                    id: "ask-document",
                    title: "Ask Document: Natural Language Q&A",
                    content: "During contract review, you need to find specific information quickly-payment terms, termination clauses, obligations, deadlines. Instead of manually searching through lengthy documents, PAIR LEGAL lets you ask questions in plain English.\n\nUpload your contracts (Word, PDF, or text files), select which documents to query, and ask anything: 'What are the payment obligations?' 'Compare termination clauses across these contracts.' 'Summarize the key risks in these agreements.' The AI understands your questions and provides accurate answers based on the actual document content.\n\nThis is especially powerful for diligence work, comparing multiple contracts, or extracting specific information from complex agreements. You can query across multiple documents simultaneously, making it easy to compare terms or find patterns across your contract portfolio. Sample prompts help you get started, and conversation history lets you ask follow-up questions to dive deeper."
                },
                {
                    id: "supporting-features",
                    title: "Seamless Integration & User Experience",
                    content: "PAIR LEGAL is designed to work the way you work, without disrupting your existing workflow.\n\nThe contract information you provide at the start flows through every feature, so the AI understands your context and provides relevant suggestions. Missing clause detection identifies gaps in your contracts and provides sample text ready to copy, helping you patch issues quickly.\n\nEverything respects Word's native functionality: formatting stays intact, track changes work perfectly, and you can navigate directly to relevant sections. The interface is fully bilingual (Turkish/English) with persistent preferences, making it accessible for international teams.\n\nYour work is preserved as you switch between features: accepted suggestions, uploaded document libraries, and chat histories all remain available. This means you can start a review, switch to analyze a specific clause, search for similar language, and come back to your review without losing any context or progress."
                }
            ]
        }
    },
    {
        id: 3,
        title: "Sketch Recognition Models",
        description: "Developed sketch recognition models by integrating human perception principles at Koc University Intelligent User Interfaces Laboratory (Nov 2018 - June 2024). Utilized deep learning, real-time databases, and extensive data collection from web scraping, crowdsourcing (Amazon MTurk), and face-to-face experiments.",
        image: "images/sketch_recognition.png",
        techStack: ["Python", "Deep Learning", "TensorFlow", "PyTorch"],
        dimensions: ["hci"],
        links: {},
        date: "2018 - 2024",
        details: {
            overview: "This project focuses on developing sketch recognition models that integrate principles of human perception. By understanding how humans interpret sketches, we can create more accurate and intuitive recognition systems.",
            problem: "Traditional sketch recognition systems often fail to capture the nuanced ways humans understand and interpret sketches. They lack the perceptual understanding that makes human recognition so effective.",
            solution: "I developed deep learning models that incorporate human perception principles, trained on extensive datasets collected through multiple channels including web scraping, Amazon MTurk crowdsourcing, and face-to-face experiments.",
            methodology: [
                "Data collection from diverse sources (web scraping, MTurk, face-to-face experiments)",
                "Integration of human perception principles into model architecture",
                "Deep learning model development using TensorFlow and PyTorch",
                "Real-time database integration for efficient data processing",
                "Continuous model refinement based on user feedback"
            ],
            results: [
                "Improved recognition accuracy by incorporating perceptual principles",
                "Large-scale dataset collection from multiple sources",
                "Research presented at 2022 SIU Conference",
                "Collaborated with Koc University Intelligent User Interfaces Laboratory (Nov 2018 - June 2024)"
            ],
            subpages: [
                {
                    id: "data-collection",
                    title: "Data Collection Methods",
                    content: "The project utilized three primary data collection methods: web scraping for large-scale data gathering, Amazon MTurk for crowdsourced annotations, and face-to-face experiments for controlled data collection with specific parameters."
                },
                {
                    id: "model-architecture",
                    title: "Model Architecture",
                    content: "The deep learning models were designed to incorporate human perception principles, using convolutional neural networks and attention mechanisms to better understand sketch structure and meaning."
                }
            ]
        }
    },
    {
        id: 4,
        title: "EEG Mental State Classification",
        description: "Contributed to research investigating cognitive states during mathematical problem-solving using electroencephalography (EEG) at University of Essex Brain-Computer Interfaces & Neural Engineering Laboratory. Preprocessed raw EEG data through spectral analysis, engineered deep learning models for mental state classification, and contributed to identifying distinct neural patterns for Mental Workload, Math Anxiety, Fatigue, and Attention states in participants with High and Low Math Anxiety.",
        image: "images/mental_state.png",
        techStack: ["MATLAB", "Python", "Deep Learning", "PyTorch", "TensorFlow", "EEG", "Signal Processing", "Spectral Analysis", "EEGLAB", "Independent Component Analysis"],
        dimensions: ["biomedical"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "2023",
        details: {
            overview: "I contributed to a research project at the University of Essex Brain-Computer Interfaces & Neural Engineering Laboratory that investigated what cognitive states occur when students with and without Math Anxiety learn to solve mathematical problems presented as computer puzzles. The research goal was to develop a foundation for neuroadaptive Brain-Computer Interface (BCI) learning environments that can optimize learning outcomes by adapting content according to the learner's cognitive load. The research team recorded EEG data from 10 participants (5 with High Math Anxiety, 5 with Low Math Anxiety) while they solved puzzles of increasing difficulty, and analyzed neural patterns across multiple cognitive states including Mental Workload, Math Anxiety, Fatigue, and Attention. The research was published at the 2023 IEEE MetroXRAINE Conference.",
            problem: "Learning is a complex phenomenon that cannot be explained by monitoring a single cognitive or affective state. Traditional BCIs trained to recognize only one cognitive state can misinterpret the learner's actual condition. For example, a system might increase difficulty when Mental Workload is classified as 'low' to avoid boredom, but this 'low' workload may actually be caused by frustration or fatigue. Additionally, Math Anxiety affects many students' ability to learn mathematics effectively, and understanding its neural correlates is crucial for developing adaptive learning systems. Raw EEG data also contains significant noise and artifacts that must be processed before meaningful analysis can occur.",
            solution: "The research team conducted a comprehensive experiment investigating multiple cognitive states simultaneously during a novel puzzle-solving task. Participants were divided into High Math Anxiety (HMA) and Low Math Anxiety (LMA) groups based on the Math Anxiety Scale. The team recorded EEG from 62 electrodes while participants solved three blocks of 20 puzzles each, with increasing difficulty (Easy: 4-5x5, Medium: 6-7x7, Hard: 9-10x10). I contributed to preprocessing the data using advanced techniques including Independent Component Analysis (ICA) for artifact removal, spectral analysis across five frequency bands (δ: 2-4 Hz, θ: 5-7 Hz, α: 8-12 Hz, β: 14-28 Hz, γ: 30-59 Hz), and band power calculations. Additionally, I developed deep learning models for classifying mental states using the preprocessed EEG data, combining signal processing techniques with neural network architectures to automatically detect and classify different cognitive states. The research identified distinct EEG patterns for each cognitive state of interest.",
            methodology: [
                "Participant Selection: The research team recruited 10 University of Essex students (6 females), selected from a pool of 30 based on Math Anxiety Scale responses. Five participants were classified as High Math Anxiety (HMA) and five as Low Math Anxiety (LMA) based on responses indicating 'much' and 'very much' anxiety levels.",
                "EEG Recording Setup: The research team recorded EEG from 62 electrodes placed according to the international 10-20 system using Biosemi ActiveTwo system. Signals were band-pass filtered (1-60 Hz, notch at 50 Hz) and digitized at 2000 Hz. Electrode impedance was kept below 15 kOhm. The team simultaneously recorded horizontal eye movements, GSR, and ECG.",
                "Experimental Paradigm: After questionnaires (PHQ-4, Curiosity and Exploration Inventory, State Anxiety), the research team recorded 2-minute resting-state EEG. The team then presented three blocks of 20 puzzles each in increasing difficulty order. After each block, participants completed NASA Task Load Index questionnaire followed by 15 seconds of rest. Puzzles required clicking white cells to color them green, matching target numbers for rows and columns.",
                "Data Preprocessing (My Contribution): I worked on preprocessing the raw EEG data, which involved downsampling recordings to 256 Hz, applying band-pass filter (1-60 Hz), and removing line noise using Cleanline plugin from EEGLAB. I visually inspected recordings, removed noisy segments, and reduced electrodes to 30 channels relevant for cognitive states of interest (Mental Workload, Attention, Fatigue, Math Anxiety). I applied Independent Component Analysis (ICA) for artifact removal and re-referenced data to common average reference (CAR).",
                "Spectral Analysis (My Contribution): I designed five band-pass filters for frequency bands δ (2-4 Hz), θ (5-7 Hz), α (8-12 Hz), β (14-28 Hz), and γ (30-59 Hz) using MATLAB designfilt function. I calculated average band power for each frequency band over seven experimental segments: initial rest, easy puzzles, post-block 1 rest, medium puzzles, post-block 2 rest, hard puzzles, and post-block 3 rest.",
                "Deep Learning Classification (My Contribution): As an addition to the research, I developed deep learning models for automatic classification of mental states using the preprocessed EEG data. I engineered neural network architectures that could learn to distinguish between different cognitive states (Mental Workload, Math Anxiety, Fatigue, Attention) from the spectral features and band power data. I implemented models using deep learning frameworks (PyTorch/TensorFlow) that could capture both temporal and spatial patterns in the EEG signals. The models were trained to classify cognitive states across different experimental conditions (rest vs task) and participant groups (HMA vs LMA), providing an automated approach to mental state detection that could be integrated into real-time BCI systems.",
                "Statistical Analysis: The research team performed Wilcoxon signed-rank sum tests to compare band power between conditions (rest vs task) and between groups (HMA vs LMA). Analyzed behavioral data including time on task (TOT) and number of mouse clicks.",
                "Cognitive State Identification: The research identified neural markers for Mental Workload (frontal θ increase, parietal α decrease), Fatigue (frontal and posterior θ increase), Attention (frontal δ increase), and Math Anxiety (frontal β increase during anticipation, occipital γ increase during task solving)."
            ],
            results: [
                "Behavioral Findings: The research found significant differences in time spent on medium (p=0.004) and hard (p=0.012) puzzles, with HMA participants solving puzzles faster than LMA participants, consistent with literature suggesting anxious individuals rush to complete math tasks to avoid discomfort.",
                "Mental Workload Patterns: The research identified workload through increase in frontal θ bandpower (Fz) and decrease in parietal α (Pz) during task conditions compared to resting conditions (p=0.051), indicating engagement of working memory resources.",
                "Fatigue Indicators: The research detected fatigue as increase in frontal θ bandpower (Fz) and posterior θ bandpower (Pz) during task conditions (p=0.057), showing progressive cognitive fatigue over puzzle-solving blocks.",
                "Attention Markers: The research found attention indicated by increase in frontal δ bandpower (Fz) during task blocks (p=0.051), while drowsiness appeared as decrease in central α bandpower (Cz, C3, C4, Pz) when attention increased.",
                "Math Anxiety Neural Correlates: The research identified Math Anxiety through increase in frontal β bandpower (Fz, F3, F4) during anticipation periods for HMA participants, and increase in occipital γ bandpower (Oz, O1, O2) while solving tasks (p=0.047), possibly related to threat perception.",
                "Frontal Asymmetry: The research observed stronger α bandpower in Right (AF4) vs Left (AF3) Prefrontal Cortex for HMA compared to LMA participants, reflecting avoidance towards the task, though differences were not statistically significant (p=0.4).",
                "Research Contribution: The project demonstrated that multiple cognitive states can be simultaneously monitored using EEG, providing a holistic approach for neuroadaptive learning systems. Results were published at 2023 IEEE MetroXRAINE Conference.",
                "My Contribution: Through my work on preprocessing, spectral analysis, and deep learning classification, I contributed to the data pipeline that enabled identification of these cognitive state patterns. My preprocessing work ensured clean, artifact-free data suitable for spectral analysis and pattern identification. Additionally, I developed deep learning models for automatic mental state classification, providing an automated approach to detect and classify cognitive states that could be integrated into real-time neuroadaptive BCI systems."
            ],
            subpages: [
                {
                    id: "experimental-design",
                    title: "Experimental Design and Puzzle Task",
                    content: "The research team designed the experiment based on Malone's definition of 'educational video games' - intrinsically motivating when including clear goals of progressively increasing complexity, clear feedback on performance, and uncertain outcomes that entertain curiosity. The team created a series of puzzles combining skills such as counting, spatial reasoning, and working memory. Each puzzle consisted of a square grid (4-10 rows/columns) where participants clicked white cells to color them green, matching target numbers for each row and column. Puzzle difficulty was defined by grid size: Easy (4-5x5), Medium (6-7x7), and Hard (9-10x10). Three blocks of 20 puzzles each were presented in increasing difficulty order. After each block, participants completed the NASA Task Load Index questionnaire to assess perceived workload, followed by 15 seconds of rest. The experiment began with a 2-minute resting-state EEG recording and ended with repeated questionnaires (NASA, State Anxiety, Math Anxiety Scale)."
                },
                {
                    id: "signal-preprocessing",
                    title: "Signal Preprocessing Pipeline (My Contribution)",
                    content: "I worked on developing the preprocessing pipeline, which was critical for extracting meaningful neural patterns from raw EEG data. I downsampled recordings from 2000 Hz to 256 Hz to reduce computational load while preserving relevant frequency content. I applied band-pass filtering (1-60 Hz) to remove low-frequency drift and high-frequency noise, with a notch filter at 50 Hz to eliminate powerline interference. I used the Cleanline plugin from EEGLAB for additional line noise removal. Through visual inspection, I identified and removed noisy segments and bad channels. I reduced the electrode count from 62 to 30 channels strategically selected to capture cognitive states of interest: Mental Workload (Fpz, F3, Fz, F4, AF3, AF4, C4, Cz, C3, P3, Pz, P4, POz, O1, Oz, O2), Attention (F3, Fz, Cz, C3, C4, Pz), Fatigue (Fz, Pz, F3, F4, F7, F8, Cz), and Math Anxiety (Fpz, Fp1, Fp2, AF4, AF3, Fz, F3, F4, F7, F8, T7, T8, C3, Cz, C4, P7, P3, Pz, P4, P8, O1, O2). I applied Independent Component Analysis (ICA) to remove artifacts such as eye blinks, eye movements, and muscle activity. Finally, I re-referenced the data to common average reference (CAR) to reduce the effect of localized noise."
                },
                {
                    id: "spectral-analysis",
                    title: "Spectral Analysis and Frequency Bands (My Contribution)",
                    content: "I performed spectral analysis to extract frequency-domain features from the preprocessed EEG data. I designed five band-pass filters using MATLAB's designfilt function for distinct frequency bands: Delta δ (2-4 Hz), Theta θ (5-7 Hz), Alpha α (8-12 Hz), Beta β (14-28 Hz), and Gamma γ (30-59 Hz). Each frequency band is associated with different cognitive processes: Delta with deep sleep and attention, Theta with working memory and fatigue, Alpha with relaxation and drowsiness, Beta with active thinking and anxiety, and Gamma with cognitive binding and threat perception. After filtering the data in each frequency band, I calculated the average band power for each band over seven experimental segments: (1) Initial 120-second resting period, (2) First block of 20 easy puzzles, (3) Post-block 1 rest (NASA questionnaire + 20 seconds), (4) Second block of 20 medium puzzles, (5) Post-block 2 rest, (6) Third block of 20 hard puzzles, and (7) Post-block 3 rest (NASA and MAS questionnaires). I calculated band power by squaring and averaging data from all relevant channels in each segment independently, providing quantitative measures of neural activity across different cognitive states that the research team used for pattern identification."
                },
                {
                    id: "deep-learning-classification",
                    title: "Deep Learning Models for Mental State Classification (My Contribution)",
                    content: "As an addition to the research work, I developed deep learning models for automatic classification of mental states using the preprocessed EEG data. I engineered neural network architectures that could learn to distinguish between different cognitive states (Mental Workload, Math Anxiety, Fatigue, Attention) from the spectral features and band power data extracted during preprocessing and spectral analysis. I implemented models using deep learning frameworks (PyTorch/TensorFlow) that were designed to capture both temporal and spatial patterns in the EEG signals. The models were trained to classify cognitive states across different experimental conditions (rest vs task blocks) and participant groups (High Math Anxiety vs Low Math Anxiety). This automated classification approach provides a foundation for real-time BCI systems that can detect and adapt to the learner's cognitive state. The deep learning models complement the statistical analysis performed by the research team, offering an automated, scalable solution for mental state detection that could be integrated into neuroadaptive learning environments. The models learn complex non-linear relationships in the EEG data that may not be captured by traditional statistical methods, potentially improving classification accuracy and enabling real-time adaptation of learning content."
                },
                {
                    id: "cognitive-states",
                    title: "Identified Cognitive States and Neural Patterns",
                    content: "The research team successfully identified distinct EEG patterns for four key cognitive states using the preprocessed and analyzed data: (1) Mental Workload (MWL): Indicated by increase in frontal θ bandpower (Fz) and decrease in parietal α (Pz) during task conditions compared to rest (p=0.051). This reflects engagement of working memory resources, as the prefrontal cortex controls attention and manipulates information in working memory. (2) Fatigue: Shown as increase in frontal θ bandpower (Fz) and posterior θ bandpower (Pz) during task conditions (p=0.057), indicating progressive cognitive fatigue over time. (3) Attention: Indicated by increase in frontal δ bandpower (Fz) during task blocks (p=0.051), while drowsiness appeared as decrease in central α bandpower (Cz, C3, C4, Pz) when attention increased. (4) Math Anxiety: Identified through increase in frontal β bandpower (Fz, F3, F4) during anticipation periods (right before puzzles appeared) for HMA participants, and increase in occipital γ bandpower (Oz, O1, O2) while solving tasks (p=0.047), possibly related to threat perception. Additionally, frontal asymmetry showed stronger α bandpower in Right (AF4) vs Left (AF3) Prefrontal Cortex for HMA compared to LMA, reflecting avoidance motivation, though not statistically significant (p=0.4)."
                },
                {
                    id: "math-anxiety-findings",
                    title: "Math Anxiety Group Differences",
                    content: "The research team divided participants into High Math Anxiety (HMA) and Low Math Anxiety (LMA) groups based on Math Anxiety Scale responses. Behavioral analysis revealed that HMA participants were significantly faster at solving medium (p=0.004) and hard (p=0.012) puzzles compared to LMA participants. This finding aligns with literature suggesting that individuals with Math Anxiety rush to complete math-related tasks to avoid discomfort, though this doesn't necessarily cause performance decrease if working memory isn't overloaded. EEG analysis using the preprocessed data showed distinct neural patterns for Math Anxiety: HMA participants exhibited greater β-band power in frontal regions (Fz, F3, F4) while anticipating arithmetic problems, and greater γ-band power activity in occipital regions (Oz, O1, O2) while solving the arithmetic problems compared to LMA participants. The β-band increase during anticipation reflects anxiety-related neural activity, while the γ-band increase during task solving may be related to threat perception and heightened vigilance. These findings support the development of BCIs that can detect Math Anxiety in real-time and adapt learning content accordingly."
                },
                {
                    id: "neuroadaptive-applications",
                    title: "Applications for Neuroadaptive Learning Systems",
                    content: "This research contributes to the development of neuroadaptive Brain-Computer Interface (BCI) learning environments that can optimize learning outcomes by adapting content according to the learner's cognitive state. The key innovation is monitoring multiple cognitive states simultaneously rather than focusing on a single state, providing a holistic view of the learner's condition. For example, a system can now distinguish between 'low workload due to boredom' (requiring increased difficulty) and 'low workload due to frustration' (requiring decreased difficulty or emotional support). The identified neural markers can be used to train classifiers that detect Mental Workload, Fatigue, Attention, and Math Anxiety in real-time. The deep learning models I developed provide an automated, scalable solution for real-time mental state detection that can be integrated into adaptive tutoring systems. This enables systems that: (1) Adjust puzzle difficulty based on Mental Workload levels, (2) Provide breaks when Fatigue is detected, (3) Re-engage learners when Attention decreases, and (4) Offer emotional support or anxiety-reduction strategies when Math Anxiety is detected. Such systems are particularly valuable for online learning environments where teachers cannot observe students' behavioral signals of discomfort, as demonstrated during the COVID-19 pandemic. The research demonstrates that EEG is a safe, portable, and relatively affordable system suitable for real-world educational applications. My contributions to the preprocessing, spectral analysis, and deep learning classification pipeline were essential for enabling the identification and automated detection of these cognitive state patterns."
                }
            ]
        }
    },
    {
        id: 5,
        title: "KART-ON Kodlama Oyunları: Accessible Programming Education",
        description: "Developed KART-ON Coding Games platform at TUBITAK/Koç University, enabling children to code games using physical programming cards recognized by camera. Built with p5.js and Teachable Machine, the platform makes early programming education accessible without computers, using only smartphones and everyday objects as programming blocks.",
        image: "images/karton.png",
        techStack: ["JavaScript", "p5.js", "Teachable Machine", "Computer Vision", "Mobile Development", "Tangible Interfaces"],
        dimensions: ["hci"],
        links: {},
        date: "Jan - July 2021",
        details: {
            overview: "KART-ON Kodlama Oyunları (KART-ON Coding Games) is an innovative platform that enables children to learn programming concepts by coding games using physical programming cards. The platform uses computer vision to recognize cards through a camera, eliminating the need for computers and making programming education accessible with just smartphones or tablets. I developed this platform as part of the TUBITAK 2247-C Stajyer Araştırmacı Burs Programı (Research Intern Scholarship Program) at Koç University under the supervision of Prof. Dr. Tevfik Metin Sezgin. The project focuses on early programming education, supporting disadvantaged groups and promoting equal opportunities in education through low-cost, accessible solutions.",
            problem: "Traditional programming education requires computers and expensive equipment, creating barriers for disadvantaged groups and schools with limited budgets. Research shows that early acquisition of coding skills is crucial for supporting disadvantaged groups and ensuring equal opportunities. The gap between private and public school budgets further exacerbates educational inequality. Additionally, existing tangible programming interfaces in the literature are often expensive and less accessible.",
            solution: "I developed KART-ON Coding Games, a platform that enables programming education without computers, using only smartphones and everyday objects as programming blocks. The platform uses Teachable Machine for card recognition and p5.js for game development. Users can code games by arranging physical programming cards, which are recognized by the camera and interpreted by a custom compiler. The platform includes the Dinosaur game (a copy of Google's Dinosaur game) and supports various programming scenarios. The low-cost approach makes programming education accessible to schools with limited budgets, reducing the opportunity gap between different educational institutions.",
            methodology: [
                "Added Google's Dinosaur game to the KART-ON Coding Games platform, allowing children to code and play games",
                "Designed example programming cards for coding the game, creating a tangible interface for programming concepts",
                "Integrated Teachable Machine service for card recognition, using transfer learning to recognize programming cards through camera input",
                "Developed a custom compiler to interpret card sequences and execute all possible programming scenarios in the background",
                "Built the platform using p5.js JavaScript library, implementing instance mode for flexible game reconfiguration",
                "Created educational pages and guidance indicators within the platform, enabling use without requiring an instructor",
                "Implemented user-friendly interface with camera input display, card sequence visualization, and game output panel",
                "Designed programming cards representing concepts like 'when touch screen', 'when hit cactus', 'jump', 'run', etc., teaching if/else structures and basic programming logic"
            ],
            results: [
                "Successfully created a functional platform where users can code games using physical programming cards",
                "Eliminated the need for computers in early programming education, making it accessible with only smartphones/tablets",
                "Reduced costs significantly by using everyday objects as programming blocks instead of expensive specialized equipment",
                "Enabled children to learn programming logic (if/else structures, event handling) without needing to learn programming languages like Python or Java",
                "Supported algorithmic thinking and creativity by allowing users to design custom game scenarios beyond the standard game",
                "Created a self-guided learning experience with built-in educational pages and instructions",
                "Demonstrated that programming education can be made accessible and affordable, contributing to equal opportunity in education",
                "Contributed to research on early programming education and accessible e-learning interfaces at Koç University"
            ],
            subpages: [
                {
                    id: "platform-architecture",
                    title: "Platform Architecture and Technology",
                    content: "The KART-ON platform is built using p5.js, a JavaScript library for creative coding. The platform uses instance mode to allow users to reconfigure games by changing card positions without re-initializing the entire game. For card recognition, I integrated Google's Teachable Machine service, which uses transfer learning to recognize programming cards through camera input. The recognition quality depends on how well the model is trained, and the platform includes educational links explaining how to train the model. A custom compiler interprets the card sequences and executes all possible programming scenarios, handling various game states and user interactions. The platform interface displays camera input, recognized card sequences, and game output in separate panels, providing clear visual feedback to users."
                },
                {
                    id: "dinosaur-game",
                    title: "Dinosaur Game Implementation",
                    content: "I added Google's Dinosaur game to the platform as a coding exercise. When users select the Dino game, they see an interface with camera input (top left), recognized programming cards (below camera), a play button (triangle shape), and the game output (right panel). Users arrange physical programming cards in front of the camera, and the system recognizes them. After pressing play, the game executes based on the card sequence. The platform includes guidance at the bottom explaining the command sequence needed to code the standard game, but users can also create custom scenarios. For example, users can make the Dino jump every time it hits a cactus, or increase the score with each screen touch. This flexibility supports both learning the standard game logic and encouraging creative problem-solving."
                },
                {
                    id: "programming-concepts",
                    title: "Teaching Programming Concepts",
                    content: "The platform effectively teaches basic programming concepts without requiring knowledge of programming languages. If/else structures are taught through cards like 'when touch screen', 'when hit cactus', 'when pass cactus', and 'when game starts'. Users learn to combine these event cards with action cards (like 'jump') to create program logic. For instance, placing 'when touch screen' followed by 'jump' teaches the concept of event-driven programming. The platform breaks down programming into the smallest steps - users learn to call the Dino and then teach it to run, understanding programming logic step by step. This approach makes programming concepts accessible to children who haven't learned computer programming or languages like Python or Java, while building algorithmic thinking skills."
                },
                {
                    id: "accessibility-impact",
                    title: "Accessibility and Educational Impact",
                    content: "The KART-ON platform significantly improves accessibility in programming education. Since it only requires a camera (available on smartphones and tablets), it eliminates the need for computers, making programming education accessible to schools and families with limited resources. The use of everyday objects as programming blocks further reduces costs compared to specialized tangible programming interfaces. This low-cost approach addresses the budget gap between private and public schools, contributing to equal opportunity in education. The platform supports disadvantaged groups by making early programming education accessible regardless of socioeconomic status. Additionally, the self-guided design with educational pages and instructions enables use without requiring an instructor, further increasing accessibility. The physical interaction with cards also supports different learning styles, making programming concepts more tangible and understandable for young learners."
                },
                {
                    id: "challenges-solutions",
                    title: "Technical Challenges and Solutions",
                    content: "Several technical challenges were encountered during development. To allow users to reconfigure games by changing card positions without re-initializing, I had to implement the game using p5.js instance mode, which required careful architecture design. For card recognition, I used Teachable Machine with transfer learning, which provides good performance but requires proper model training. The recognition quality varies based on training, so I included educational resources explaining the training process. The most challenging aspect was developing a custom compiler that could interpret all possible card sequences and handle every programming scenario. This compiler needed to evaluate all scenarios comprehensively to prevent errors when users code, which was particularly important since the target audience includes beginners who shouldn't encounter error messages. The compiler's complexity grew with the number of possible scenarios, requiring thorough testing and scenario coverage."
                }
            ]
        }
    },
    {
        id: 7,
        title: "Health Big Data: Fetal Biosignals Integration Pipeline",
        description: "Developed an end-to-end data integration pipeline for managing biosignal and clinical data from pregnant women and their fetuses across multiple hospitals in Italy. The project includes fetal heart rate (FHR), uterine contraction (TOCO), and clinical metadata processing, with data profiling, cleaning, integration, and migration into a relational SQLite database mapped to OMOP Common Data Model. Built a FastAPI-based API and graphical user interface for clinicians and researchers.",
        image: "images/hbd.png",
        techStack: ["Python", "FastAPI", "SQLite", "Pandas", "SciPy", "OMOP CDM", "Data Integration", "Signal Processing", "Data Cleaning", "API Development", "Web Interface"],
        dimensions: ["biomedical"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "2024-2025",
        details: {
            overview: "This project developed a comprehensive end-to-end data integration pipeline for managing biosignal and clinical data collected from pregnant women and their fetuses across multiple hospitals in Italy. The dataset includes fetal heart rate (FHR), uterine contraction (TOCO), and fetal movement perception (FMP) signals, along with accompanying clinical metadata. We applied rigorous data profiling, cleaning, and integration procedures to handle heterogeneous data sources, addressing missing values, outliers, duplicates, and inconsistent identifiers. The cleaned data was migrated into a relational SQLite database (17GB), whose schema was mapped to the OMOP Common Data Model to facilitate interoperability. A FastAPI-based REST API was built to provide structured access to the data, and a graphical user interface was developed to allow clinicians and researchers to explore patient records, examinations, and processed CTG signals.",
            problem: "Healthcare data from multiple hospitals presents significant challenges including data heterogeneity, missing information, inconsistent identifiers, and lack of interoperability. Approximately 15% of pregnancies are considered high-risk, requiring continuous electronic FHR monitoring during labor. However, existing CTG datasets are often limited to single clinical sites, lack raw signal data, or are not publicly accessible. Additionally, CTG signals are frequently contaminated with artifacts due to sensor displacement or maternal movement, leading to noise, erroneous spikes, or missing values that must be processed before meaningful analysis can occur.",
            solution: "We developed a comprehensive data integration pipeline that addresses these challenges through systematic data profiling, cleaning, and harmonization. The solution includes: (1) Data profiling to understand structure and quality across multiple source databases, (2) Advanced signal processing techniques for FHR and TOCO signals using interpolation and spike detection, (3) Data integration with globally unique identifiers to resolve overlapping patient and examination IDs across databases, (4) Migration to a standardized SQLite database with OMOP CDM mapping for interoperability, (5) FastAPI-based REST API for programmatic data access, and (6) A user-friendly graphical interface for clinical exploration and visualization.",
            methodology: [
                "Data Profiling: Analyzed data structure, missing values, outliers, duplicates, and distributions across REGISTRY_PCC, EXAMINATION_CTG, EVENTS_CTG, TRACES_CTG, and VARIABLES_CTG tables from multiple Microsoft Access databases",
                "Data Cleaning: Removed invalid dates, handled missing values (dropped columns with >90% missingness), corrected implausible gestational ages, and performed cross-database deduplication",
                "Signal Processing: Implemented process_fhr_signal and process_toco_signal routines using SciPy for invalid sample detection (<50 or >200 bpm), linear interpolation for gaps <15 seconds, and cubic spline interpolation for spike correction",
                "Data Integration: Created globally unique identifiers for patients and examinations across multiple source databases, improving uniqueness from 22.9% to 100% for patients and 29.8% to 100% for examinations",
                "Database Design: Designed relational schema with REGISTRY_PCC, EXAMINATION_CTG, TRACES_CTG, EVENTS_CTG, and PARAMETERS_CTG tables, maintaining referential integrity and traceability via source_file fields",
                "OMOP Mapping: Translated Italian table and column names to English and mapped key clinical concepts (patient identifiers, birth dates, examination types, gestational metrics) to OMOP Common Data Model concepts and concept IDs",
                "API Development: Built FastAPI REST API with endpoints for table listing, data retrieval (JSON/CSV), patient/examination filtering, trace access (raw/processed), parameter retrieval, event access, and OMOP mapping information",
                "User Interface: Developed dashboard for patient search and examination listing, CTG visualization with zoom/pan capabilities, examination details panel, computed parameter display, and data export functionality (CSV/JSON with configurable formats)"
            ],
            results: [
                "Successfully integrated data from 7 different source databases into a unified 17GB SQLite database",
                "Processed and cleaned 81,531 CTG trace records (reduced from 133,919 by 39% after deduplication and validation)",
                "Achieved 100% uniqueness for patient and examination identifiers after integration (from 22.9% and 29.8% respectively)",
                "Built comprehensive FastAPI with 10+ endpoints supporting JSON/CSV export, filtering, and OMOP-compliant data access",
                "Developed interactive web interface enabling clinicians to search patients, view examinations, visualize CTG traces with zoom/pan, and export data in multiple formats",
                "Mapped database schema to OMOP Common Data Model, facilitating interoperability with standardized healthcare data models",
                "Implemented robust data validation pipeline with 19 test cases achieving 100% coverage on critical tests",
                "Created signal processing pipeline handling artifacts, missing values, and spikes in FHR and TOCO signals with 15-second interpolation windows",
                "Documented comprehensive privacy considerations and re-identification risks in anonymized health datasets"
            ],
            subpages: [
                {
                    id: "data-management",
                    title: "Data Management Pipeline",
                    content: "The data management pipeline involved comprehensive profiling, cleaning, and integration of heterogeneous data sources. We analyzed data from 7 different Microsoft Access databases containing patient registries, CTG examinations, events, traces, and parameters. Data profiling revealed significant issues including invalid dates (e.g., 1070, 2991), high missingness rates (up to 99.8% for Province column), duplicate patient numbers (only 13,368 unique out of 58,399 entries), and implausible gestational ages (up to 320 weeks). Our cleaning process removed invalid entries, handled missing values strategically (dropping columns with >90% missingness), performed cross-database deduplication, and corrected gestational ages using last menstruation dates. The integration step created globally unique identifiers, improving patient uniqueness from 22.9% to 100% and examination uniqueness from 29.8% to 100%. The final database contains approximately 33,000 unique patients, 80,000 examinations, and 81,531 processed traces."
                },
                {
                    id: "signal-processing",
                    title: "Signal Processing Techniques",
                    content: "Signal processing was critical for handling CTG signals contaminated with artifacts. The process_fhr_signal routine flags invalid samples (<50 bpm, >200 bpm, or NaN), interpolates contiguous invalid runs shorter than 15 seconds using linear interpolation, and detects spikes where adjacent samples differ by >25 bpm. Spike runs shorter than 15 seconds are corrected using natural cubic spline interpolation. The process_toco_signal routine applies similar techniques for uterine contraction signals, handling missing or zero values. Both routines use SciPy's interp1d for linear interpolation and CubicSpline for spike correction. The 15-second threshold was chosen based on literature review, as it's long enough to smooth brief dropouts but short enough to preserve data integrity. Longer invalid segments are retained in raw form to maintain trace continuity and preserve important TOCO or FMP data that could be useful for analysis."
                },
                {
                    id: "omop-mapping",
                    title: "OMOP Common Data Model Mapping",
                    content: "To facilitate data sharing and interoperability with international research standards, we standardized the dataset structure and semantics. Original Italian table names (ANAGRAFE_PCC, ESAME_CTG, etc.) were translated to English (REGISTRY_PCC, EXAMINATION_CTG, etc.). Key clinical concepts were mapped to OMOP Common Data Model concepts and concept IDs, including patient identifiers (OMOP ID: 4086934), birth dates (3022007), examination types (44804305), gestational age (4210896), and last menstrual period (4072438). This alignment enhances semantic clarity and enables integration with other OMOP-compliant datasets and tools, supporting large-scale observational research and population health analytics. The mapping process prioritized clinically relevant variables, ensuring that the most important data elements are standardized for future research collaborations."
                },
                {
                    id: "api-interface",
                    title: "API and User Interface",
                    content: "The FastAPI-based REST API provides structured access to the curated dataset through 10+ endpoints. Key endpoints include /tables for listing database tables, /data/{table_name} for JSON retrieval, /patients and /examinations for filtered queries, /traces/{examination_id} for raw/processed CTG data, /parameters and /events for derived data, and /mapping for OMOP metadata. The API supports filtering by geographic location, date ranges, and patient IDs, with automatic Swagger documentation. The graphical user interface consists of two main pages: (1) A dashboard for patient search with advanced filtering, examination listing, and OMOP compatibility checking, and (2) An examination details page with interactive CTG visualization (zoom/pan), toggle between raw/processed signals, computed parameter display, examination metadata, and data export functionality (CSV/JSON with configurable formats and sampling rates). The interface enables clinicians to efficiently explore patient records and CTG signals for clinical analysis and research purposes."
                },
                {
                    id: "privacy-considerations",
                    title: "Privacy and Ethical Considerations",
                    content: "While the datasets were provided in anonymized format, several privacy concerns remain. Re-identification risks exist through quasi-identifiers such as age, gender, geographic location, and medical visit dates, especially when combined with external knowledge. This risk is particularly relevant for smaller towns or regions with limited healthcare facilities. The effectiveness of anonymization depends on implementation details that were not disclosed, limiting our ability to assess robustness. Additionally, datasets originated from multiple institutions potentially following different privacy standards (GDPR, HIPAA), creating regulatory fragmentation. Future efforts should implement adequate access control for APIs and interfaces, ensure transparency regarding anonymization methods, evaluate re-identification risks considering population size and local context, and align with relevant data protection regulations with appropriate consent frameworks."
                }
            ]
        }
    },
    {
        id: 8,
        title: "Thought2Text: Brain Computer Interface using P300 Signals to Generate Text",
        description: "A state-of-the-art brain-computer interface (BCI) system using P300 signals to enable text generation through brain activity. Designed to assist individuals with severe motor disabilities, the system achieves 90% accuracy and 11 bits/min information transfer rate using an 8-channel g.tec EEG device and the row-column paradigm.",
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
            overview: "Thought2Text is a Brain Computer Interface (BCI) system that uses P300 signals to generate text, primarily designed to assist individuals with severe motor disabilities such as amyotrophic lateral sclerosis (ALS), spinal cord injuries, or neuromuscular disorders. The system employs an 8-channel g.tec g.Nautilus Research EEG device with electrodes strategically placed around the parietal and occipital lobes. Using the row-column paradigm introduced by Farwell and Donchin, the system achieves state-of-the-art performance with 90% accuracy and 11 bits/min information transfer rate, allowing users to type a letter in 4.5 seconds.",
            problem: "Approximately 5.4 million individuals worldwide face paralysis, with 72.1% under 65 years old. Stroke (33.7%) is the most prevalent cause, followed by multiple sclerosis, spinal cord injury, and cerebral palsy. For those whose paralysis affects communication, traditional interfaces are not accessible. Brain-Computer Interfaces (BCIs) emerge as a cutting-edge solution, but existing systems often struggle with data quality, signal-to-noise ratio, and achieving reliable real-time performance.",
            solution: "We developed Thought2Text, a P300-based BCI speller system using an 8-channel non-invasive g.tec g.Nautilus Research EEG device. The system implements a 6x6 matrix interface that prompts users to focus on a letter or number, with rows and columns randomly illuminating. When the desired character's row or column is lit, a P300 signal (positive deflection around 300ms after the stimulus) is triggered, allowing the interface to identify and display the intended letter. The system includes comprehensive signal processing pipelines, XDAWN spatial filtering, and Linear Discriminant Analysis (LDA) classification to achieve robust performance.",
            methodology: [
                "EEG Device Setup: Selected and configured the 8-channel g.tec g.Nautilus Research EEG device after initial testing with Emotiv EPOC+ (14-channel) and Biopac (4-channel) devices. The g.tec device provided 35% better accuracy and more stable results despite requiring electro-gel injection.",
                "Lab Streaming Layer (LSL): Implemented LSL middleware for data streaming and synchronization from multiple sources, enabling easy hardware/software component swapping and maintaining system modularity.",
                "EEG Recording and Stimulations: Designed a 6x6 matrix interface with 50ms flash duration and 25ms inter-stimulus intervals. Implemented 5 cycles of 12 flashes (6 rows + 6 columns) per letter, with proper event marking for target and non-target stimuli.",
                "Signal Processing: Applied notch filter (50Hz) for powerline noise removal and 4th-order Butterworth bandpass filter (1-20Hz) for P300 frequency range extraction. Trained XDAWN spatial filters to increase signal-to-signal-plus-noise ratio (SSNR) by intensifying channels most likely to detect P300 signals.",
                "Classifier Training: Implemented binary classification distinguishing target (focused letter's row/column) from non-target segments. Averaged data segments to enhance P300 responses. Evaluated Linear Discriminant Analysis (LDA), Support Vector Machine (SVM), and Multi-Layer Perceptron (MLP), with LDA achieving best performance. Addressed class imbalance (2 targets vs 10 non-targets) using weighted loss functions.",
                "Real-Time Text Generation: Developed real-time processing pipeline converting brain signals to letters. System calibration takes ~20 minutes per new user, after which users can type with 4.5 seconds per letter."
            ],
            results: [
                "Achieved 90% accuracy in typing experiments (9 out of 10 letters correctly identified)",
                "Reached 11 bits/min information transfer rate, matching state-of-the-art performance (12 bits/min)",
                "Typing speed of 4.5 seconds per letter",
                "Superior fatigue performance: 60% accuracy under fatigue vs 50% for state-of-the-art models",
                "Average 82% accuracy across multiple users in single-session train/test scenarios",
                "35% accuracy improvement after switching from Emotiv EPOC+ to g.tec g.Nautilus device",
                "Successfully implemented Farwell and Donchin's row-column paradigm with modern signal processing techniques",
                "Validated system stability through consistent offline experiment results"
            ],
            subpages: [
                {
                    id: "p300-signals",
                    title: "P300 Signals and Row-Column Paradigm",
                    content: "P300 signals are positive deflections in EEG waves occurring around 300 milliseconds after specific, infrequent, yet expected stimuli. The row-column paradigm, introduced by Farwell and Donchin in 1988, uses a 6x6 matrix where rows and columns flash randomly. When a user focuses on a specific letter, the P300 response is triggered when that letter's row or column is illuminated. Our implementation follows this classic paradigm while incorporating modern signal processing techniques. The system flashes each row and column for 50 milliseconds with 25 milliseconds between flashes, performing 5 cycles (60 total flashes) per letter to robustly discriminate P300 responses from normal EEG data."
                },
                {
                    id: "signal-processing",
                    title: "Signal Processing Pipeline",
                    content: "The signal processing pipeline consists of multiple stages: (1) Notch filtering at 50Hz to eliminate powerline noise, (2) 4th-order Butterworth bandpass filtering (1-20Hz) to extract the P300 frequency range while balancing passband smoothness and roll-off sharpness, (3) XDAWN spatial filtering to enhance signal-to-signal-plus-noise ratio by training on user-specific data to intensify channels most likely to detect P300 signals while reducing noise from less informative channels. XDAWN performs singular value decomposition on sensor inputs, selecting the first 2 singular vectors corresponding to the largest singular values to estimate vector sources and weight channels with more P300 information. This preprocessing significantly improves classification accuracy."
                },
                {
                    id: "classification",
                    title: "Classification and Model Selection",
                    content: "We implemented binary classification to distinguish target (focused letter's row/column) from non-target segments. Data segments were averaged to enhance P300 responses. We evaluated three classifiers: Linear Discriminant Analysis (LDA), Support Vector Machine (SVM), and Multi-Layer Perceptron (MLP). LDA achieved the best performance with our dataset. A major challenge was class imbalance - only 2 out of 12 flashes are targets (the row and column containing the intended letter), while 10 are non-targets. We addressed this using weighted loss functions that give higher punishment to small class (target) classification mistakes, particularly when training neural networks. The final model (Model 08-01-05) achieved 90% accuracy and 11 bits/min performance."
                },
                {
                    id: "system-architecture",
                    title: "System Architecture and Hardware",
                    content: "The system architecture includes: (1) 8-channel g.tec g.Nautilus Research EEG device with electrodes placed around parietal and occipital lobes, sampling at 512Hz, (2) Lab Streaming Layer (LSL) middleware for synchronized data streaming from EEG device and stimulus presentation system, (3) Real-time signal processing pipeline applying filters and XDAWN spatial filters, (4) Trained LDA classifier for target/non-target discrimination, (5) Letter prediction algorithm that identifies the most likely row and column based on P300 responses. The system was initially tested with Emotiv EPOC+ (14-channel) and Biopac (4-channel) devices, but the g.tec device provided significantly better data quality and 35% higher accuracy, making it the clear choice despite requiring electro-gel injection."
                },
                {
                    id: "performance-evaluation",
                    title: "Performance Evaluation and Results",
                    content: "Performance was evaluated through multiple experiments: (1) Ten back-to-back experiments requiring subjects to write 10 letters each, achieving 90% accuracy (9 out of 10 letters correct), (2) Information transfer rate measurement of 11 bits/min (state-of-the-art is 12 bits/min), (3) Typing speed of 4.5 seconds per letter, (4) Fatigue testing showing 60% accuracy under fatigue vs 50% for state-of-the-art models, attributed to training on fatigued user data, (5) Multi-user testing with single train/test sessions achieving average 82% accuracy, demonstrating system stability. The system outperforms state-of-the-art in fatigue conditions and matches performance in normal conditions, validating the data collection and processing pipeline."
                },
                {
                    id: "applications",
                    title: "Real-World Applications and Impact",
                    content: "Thought2Text is primarily designed to assist individuals with severe motor disabilities, particularly those with limited or no muscle control such as ALS patients, spinal cord injury survivors, or individuals with neuromuscular disorders. The system provides a lifeline for communication, offering independent expression and regaining control over their lives. The P300 speller system enables typing through brain signals alone, requiring only the ability to focus attention. While the system requires ~20 minutes of calibration per new user, it enables real-time typing after training. The technology demonstrates significant potential for assistive communication devices and could be extended with additional stimulus paradigms (visual faces, audio, tactile) for users with visual impairments or other specific needs."
                },
                {
                    id: "literature-comparison",
                    title: "State-of-the-Art Comparison",
                    content: "Our implementation achieves state-of-the-art performance with the Farwell-Donchin (FD) row-column paradigm. When compared to other approaches in the literature, we see that classifiers vary among Linear Discriminant Analysis and its variations, Support Vector Machines, and Random Forest models. However, the major performance differences stem from stimulus creation methodologies rather than classifiers. Since P300 responses are stronger for more stimulating or unexpected events, researchers have used human faces (which create larger responses due to evolutionary brain responses), single-display paradigms (flashing each letter separately), and non-visual stimuli (audio, tactile) for visually impaired users. Our implementation proves that with correct data collection and processing, the FD paradigm can achieve near state-of-the-art performance (11 vs 12 bits/min), providing a solid foundation for future enhancements."
                }
            ]
        }
    },
    {
        id: 11,
        title: "Socrates AI: Real-Time Clinical Mentorship",
        description: "Participated in the HSIL Hackathon (Harvard Health Systems Innovation Lab) - a global 2-day event held simultaneously in 30+ countries under the theme 'Building High-Value Health Systems: Leveraging AI'. The Milan edition took place on April 10–11, 2026, at MIND – Milano Innovation District, making it the first time Italy hosted this event.",
        image: "images/socrates_demo.png",
        techStack: ["Healthcare AI", "Clinical Decision Support", "Real-time NLP", "Mentorship Design", "LLM"],
        dimensions: ["hci", "biomedical"],
        links: {},
        date: "2026",
        details: {
            overview: "The HSIL Hackathon, organized by Harvard's Health Systems Innovation Lab, is one of the world's largest healthcare innovation events - held simultaneously across 30+ countries with 500+ teams competing globally. The 2026 edition centered on the theme 'Building High-Value Health Systems: Leveraging AI', challenging participants to go from idea to working prototype in just two days.\n\nThe Milan edition (April 10–11, 2026) was historic: the first time Italy hosted this event. It took place at MIND – Milano Innovation District (Fondazione Triulza), with interdisciplinary teams drawn from across the city's top institutions - University of Milan, Politecnico di Milano, and Human Technopole - alongside partners including Federated Innovation @MIND and the Italian Society for AI in Medicine.\n\nParticipating in this environment was genuinely inspiring. It brought together engineers, clinicians, designers, and entrepreneurs around a single urgent question: how can AI be used to improve patient care, healthcare efficiency, and system sustainability without compromising the people at its core?\n\nAI will inevitably become part of the daily workflows of healthcare professionals - but it will also introduce new problems. Over time, we may find ourselves training a generation of physicians who struggle to diagnose even simple cases because they have become overly dependent on AI systems. Learning is inherently an active process - it requires practice, repetition, and critical thinking. If AI removes these opportunities, particularly for residents, it may weaken the development of essential clinical skills.\n\nThis creates a long-term risk. If residents are not given the opportunity to develop their skills through experience, then in the future we may face a shortage of deeply knowledgeable and capable physicians.\n\nUniversity hospitals - where the next generation of doctors is trained - are where this problem will hit first and hardest. These are the institutions that must get AI integration right, because what residents learn (or fail to learn) during their training defines the quality of care for decades to come.\n\nThis is where our concept, Socrates AI, comes in. It is designed as a training-purpose tool for university hospitals and teaching institutions, embedding mentorship directly into the residency experience.",
            problem: "AI will inevitably become part of the daily workflows of healthcare professionals - but it will also introduce new problems. Over time, we may find ourselves training a generation of physicians who struggle to diagnose even simple cases because they have become overly dependent on AI systems. Learning is inherently an active process - it requires practice, repetition, and critical thinking. If AI removes these opportunities, particularly for residents, it may weaken the development of essential clinical skills. This creates a long-term risk: if residents are not given the opportunity to develop their skills through experience, we may face a future shortage of deeply knowledgeable and capable physicians.",
            solution: "Rather than replacing clinicians, Socrates AI is designed as a clinical training tool for university hospitals - the environments where residents are formed. It listens to the conversation between a patient and a physician during a consultation and, instead of providing direct diagnoses, it supports the physician by suggesting better, more insightful questions. By prompting clinicians to think more deeply and broadly, Socrates introduces perspectives they may not have initially considered - the kinds of questions an experienced physician or consultant might typically raise during a later review. Deployed within residency programs at teaching hospitals, Socrates brings expert-level guidance into the consultation in real time, effectively embedding continuous mentorship into everyday clinical training.",
            methodology: [
                "Identified the core tension at the HSIL hackathon: most healthcare AI tools optimize for output speed, not for the quality of the clinician's reasoning process.",
                "Defined a Socratic interaction model: the system guides clinical thought through targeted questions rather than delivering diagnoses directly.",
                "Designed passive real-time listening so Socrates AI integrates into the resident's screen without interrupting or taking control of the patient consultation.",
                "Built a continuous dialogue analysis loop that detects gaps - unexplored symptoms, unasked differentials, missing red flags - and surfaces them as prompts.",
                "Framed each prompt as a mentor-level question: the kind an experienced consultant would raise in a ward review, now available in every consultation.",
                "Designed an adaptive difficulty model: as the resident's competence grows, Socrates introduces increasingly sophisticated clinical cues.",
                "Positioned Socrates as a training-purpose tool for university hospitals and teaching institutions, where residents learn through supervised clinical practice.",
                "Validated the concept with the HSIL hackathon panel, demonstrating that the approach addresses a genuine long-term risk in medical education under AI adoption."
            ],
            results: [
                "Established a human-centered AI framework that strengthens clinical judgment rather than bypassing it.",
                "Demonstrated real-time mentorship at scale: every resident in every consultation at a university hospital has access to expert-level guidance.",
                "Designed an adaptive learning loop that personalizes prompt sophistication to the clinician's current skill level.",
                "Proposed a responsible AI adoption principle for healthcare: AI will not replace us - it will enhance us.",
                "Outlined a precedent for AI integration in other high-stakes domains where professional skill development must be preserved.",
                "While this challenge will emerge across many fields adopting AI, healthcare is where this transformation begins - and the way we choose to implement AI here will set the precedent for its adoption in other domains."
            ],
            subpages: [
                {
                    id: "the-problem-with-ai-in-medicine",
                    title: "The Risk Nobody Is Talking About",
                    content: "AI will inevitably become part of the daily workflows of healthcare professionals - but it will also introduce new problems.\n\nOver time, we may find ourselves training a generation of physicians who struggle to diagnose even simple cases because they have become overly dependent on AI systems. Learning is inherently an active process - it requires practice, repetition, and critical thinking. If AI removes these opportunities, particularly for residents, it may weaken the development of essential clinical skills.\n\nThis creates a long-term risk. If residents are not given the opportunity to develop their skills through experience, then in the future we may face a shortage of deeply knowledgeable and capable physicians.\n\nWhile this challenge will emerge across many fields adopting AI, healthcare is where this transformation begins. The way we choose to implement AI here will set the precedent for its adoption in other domains."
                },
                {
                    id: "how-socrates-works",
                    title: "How Socrates AI Works",
                    content: "Imagine a real clinical consultation. A patient sits with a resident physician, who begins asking questions to understand the symptoms and work toward a diagnosis.\n\nIn the background, Socrates AI is present - quietly listening to the conversation in real time. It is integrated into the resident's system and connected to their screen, but it does not interrupt or take control of the interaction.\n\nAs the consultation progresses, Socrates continuously analyzes the dialogue. When it detects gaps - important areas not yet explored or questions that could lead to a more accurate diagnosis - it provides subtle, real-time prompts on the resident's monitor. These prompts are not answers, but carefully crafted questions designed to guide the resident's thinking.\n\nThis approach challenges the practitioner to think more critically and broadly. Instead of passively receiving conclusions, the resident actively engages in the diagnostic process, supported by targeted guidance.\n\nOver time, this creates a powerful learning loop. With each patient interaction, the resident improves - learning how to ask better questions, recognize patterns, and approach cases with greater depth. At the same time, Socrates adapts, introducing increasingly sophisticated prompts as the resident's competence grows.",
                    videos: [
                        { url: "https://youtu.be/vjRRTCLOyP8", title: "Socrates AI Demo" }
                    ]
                },
                {
                    id: "mentorship-at-scale",
                    title: "Mentorship at Scale",
                    quote: "Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them.",
                    quoteAttribution: "Frank Herbert, Dune (1965)",
                    content: "In essence, Socrates delivers a personalized mentorship experience. It brings the perspective of an experienced physician into every consultation, ensuring that each resident has access to high-quality guidance at all times.\n\nThe natural home for Socrates is the university hospital - the teaching institution where residents rotate through departments, see real patients, and build the clinical reasoning that will define their careers. In these environments, senior physicians cannot be present for every consultation; Socrates fills that gap by providing consistent, expert-level guidance during every patient interaction.\n\nThis is not about replacing clinical judgment - it is about strengthening it. By embedding continuous, context-aware learning into daily clinical training, Socrates helps transform every patient interaction into an opportunity for growth.\n\nWe believe this is how AI should be integrated into healthcare - not as a replacement for human expertise, but as a training tool that strengthens and elevates it.\n\nAI will not replace us; it will enhance us."
                },
                {
                    id: "visit-simulation",
                    title: "Visit Simulation: Practice Before the Real Thing",
                    image: "images/socrates_as_case_simulation_tool.png",
                    content: "Beyond real-time mentorship, Socrates offers an entirely different kind of experience: a visit simulation.\n\nThis is not an AI agent offering hints from the sidelines. It is a full, immersive clinical encounter - a resident sits down with a simulated patient, asks questions, gathers history, and works toward a diagnosis, exactly as they would in a real consultation room. The patient responds naturally, describes symptoms, expresses concerns, and reacts to how the conversation unfolds.\n\nThe resident must drive the entire interaction: deciding which questions to ask, in what order, and how to interpret the answers. Nothing is handed to them. Every diagnostic hypothesis has to be earned through the quality of the clinical encounter itself.\n\nAt the end of the simulation, Socrates provides a structured debrief - what was asked, what was missed, which red flags were explored and which were overlooked, and how the diagnostic reasoning compares to the expected clinical pathway for that case.\n\nThis is deliberate practice at its most realistic. Residents can face rare presentations, high-stakes scenarios, or simply repeat common cases until the pattern recognition becomes instinct - all without any risk to a real patient.\n\nThe simulation is not a feature. It is a completely different experience built on the same belief: that the best way to prepare a physician is to make them think, not to think for them."
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
        description: "Developed an intelligent mobile travel assistant that personalizes flight recommendations using AI and real-time flight data. Built with Flutter, Python FastAPI, Firebase, and integrated LLM agent powered by OpenAI GPT-4 Turbo. Features include personalized flight search, route tracking, push notifications, and conversational AI interface.",
        image: "images/atlas.png",
        techStack: ["Flutter", "Python", "FastAPI", "Firebase", "LangChain", "OpenAI GPT-4", "Kiwi Tequila API", "Dart", "Cloud Functions"],
        dimensions: ["startup"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "Spring 2024",
        details: {
            teamPhoto: "images/atlas_2.png",
            overview: "ATLAS is an intelligent travel assistant mobile application that streamlines the travel planning process by understanding user preferences and suggesting appropriate flights in real-time. The application leverages Kiwi Tequila API for flight data and uses personalization algorithms to filter results based on user personas such as business travelers, budget-conscious travelers, eco-friendly travelers, and family travelers. The unique value proposition is having an intelligent assistant that knows your preferences and applies them in the background, sending push notifications when it finds flights you might be interested in. This project was developed collaboratively by our team at Koç University.",
            problem: "The travel planning process is time-consuming and overwhelming due to information overload. Traditional flight search platforms require users to manually filter through numerous options, and most websites reset filtered options during different searches, making the process repetitive and frustrating. Additionally, there's a lack of personalization in real-time flight recommendations, and users need to constantly check for price changes manually.",
            solution: "ATLAS solves these problems by providing a personalized, intelligent travel assistant that works in the background. The application uses session-based recommendation systems to create user personas during signup, then automatically filters flight results based on these preferences. It tracks flights and routes, sending push notifications when prices change or better deals are found. The integrated LLM agent allows users to search and track flights through natural conversation, similar to talking with a travel agency personnel.",
            methodology: [
                "Developed Flutter mobile application for iOS and Android with user-friendly interface",
                "Implemented personalization algorithms using content-based filtering and session-based recommendation systems",
                "Created user persona system (adventurous, budget-conscious, business, eco-friendly, family) based on signup preferences",
                "Built FastAPI backend services for flight search and LLM agent communication",
                "Integrated Kiwi Tequila API for real-time flight data aggregation",
                "Implemented Firebase Authentication, Cloud Firestore for user data, and Cloud Functions for background tasks",
                "Developed LLM service using LangChain framework with OpenAI GPT-4 Turbo model",
                "Created custom tools for flight search, route tracking, time checking, and airport code resolution using FAISS vector database",
                "Implemented push notification system for price alerts and flight reminders",
                "Built flight tracking system with price history graphs and alternative date suggestions"
            ],
            results: [
                "Successfully delivered a functional mobile application with comprehensive features",
                "Implemented intelligent personalization that filters flights based on user preferences automatically",
                "Created conversational LLM agent that successfully leads conversations to gather required inputs in a human-like manner",
                "Developed background tracking system that monitors flight prices and sends timely notifications",
                "Achieved 4-5 second average response time for LLM agent interactions",
                "Built scalable architecture with modular microservices that can be easily adapted to other applications",
                "Validated with user experience tests showing positive feedback on tracking features and LLM interface",
                "Demonstrated accessibility features through voice interaction for visually impaired users"
            ],
            subpages: [
                {
                    id: "personalization",
                    title: "Personalization Algorithms",
                    content: "ATLAS uses a combination of content-based filtering and session-based recommendation systems. During signup, users answer yes/no questions about their travel preferences (traveling alone, using backpack, eco-friendly flights, comfort vs budget, new destinations, weekday flights, etc.). Based on these responses, users are assigned to traveler personas such as adventurous, budget-conscious, business, eco-friendly, or family. The application then customizes flight search results accordingly - for example, business travelers see direct flights prioritized, while budget travelers see cheaper options with stops."
                },
                {
                    id: "llm-agent",
                    title: "LLM Agent Service",
                    content: "The LLM agent is built using LangChain framework with OpenAI GPT-4 Turbo model. Unlike traditional chatbots that ask predefined questions, ATLAS allows users to have free-form conversations. The agent has memory to maintain conversation context and can handle complex requests like 'I want to fly 2 weeks later than today.' It uses custom tools including flight search API, route tracking, time checking, and airport code resolution via FAISS vector database. The agent successfully interprets user intent and guides conversations to gather required information naturally, creating an experience similar to talking with actual travel agency personnel."
                },
                {
                    id: "push-notifications",
                    title: "Push Notifications & Tracking",
                    content: "ATLAS provides three types of background services: flight tracking, route tracking, and flight reminders. When a user tracks a specific flight, ATLAS monitors price changes and sends notifications when prices decrease. For route tracking, the system checks all flights on a specific route twice daily and suggests alternative dates if cheaper options are found. Flight reminders remember old searches and notify users about updated results. The system uses an aging algorithm to prevent spam - if more than 3 notifications are sent for a search without purchase, notifications stop. All background operations run on Google Cloud Functions independently of the user's device."
                },
                {
                    id: "system-architecture",
                    title: "System Architecture",
                    content: "ATLAS follows a modular microservices architecture. The frontend is built with Flutter for cross-platform mobile development. The backend uses Python with FastAPI for REST endpoints and WebSocket for LLM agent communication. Firebase provides authentication, Cloud Firestore for data storage, and Cloud Functions for background tasks. The flight search service acts as a middle layer between the app and Kiwi Tequila API, converting data formats. The LLM service integrates with OpenAI and uses FAISS for vector storage of airport codes. This modular approach allows each component to be developed independently and easily adapted to other applications."
                }
            ]
        }
    },
    {
        id: 10,
        title: "Adaptive Prevention of Computer Vision Syndrome with Edge-Based Camera-Only Smart Glasses",
        description: "Designed a camera-only smart glasses system that autonomously mitigates Computer Vision Syndrome (CVS) by operationalizing the 20-20-20 rule. A front-facing micro-camera and an on-device edge AI agent (MobileNetV1) discriminate active screen use from non-digital near-work in real time, triggering unobtrusive haptic micro-vibrations once 20 continuous minutes of screen viewing are accumulated. Runs entirely on an ESP32 microcontroller, preserving privacy and battery without any cloud processing.",
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
            overview: "This project, developed at Politecnico di Milano, presents a camera-only smart glasses system engineered to autonomously mitigate Computer Vision Syndrome (CVS) caused by prolonged near-vision use of digital screens. Rather than functioning as a static timer, the system operates as a dynamic, adaptive mechanism that adjusts in real time to user behavior: a front-facing micro-camera and an edge computing processor running a local AI agent analyze the egocentric visual stream to discriminate active, light-emitting screen use from non-digital near-work, and trigger unobtrusive haptic micro-vibrations once an unbroken screen-viewing threshold is accumulated. By processing the visual stream entirely on-device, the system guarantees user privacy while avoiding the latency, battery drain, and bulky multi-sensor arrays of existing wearable approaches. The work demonstrates that embedding complex vision tasks directly onto wearable edge devices is feasible, offering a privacy-preserving, low-power solution for CVS mitigation that is scalable to diverse digital platforms.",
            problem: "The pervasive use of digital screens has catalyzed a global rise in Computer Vision Syndrome (CVS), with recent meta-analyses establishing a pooled global prevalence of 66% among device users, surging as high as 94.5% in university cohorts. Prolonged, uninterrupted near-vision work suppresses the blink reflex and leads to visual exhaustion, tension headaches, dry eyes, and degraded sleep. The clinically endorsed 20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds) is an effective countermeasure, but enforcing it is hard. Existing solutions fall short: software timers are 'blind' to real context and brutally interrupt focus, causing habituation; external webcams are location-bound and raise privacy concerns; multi-sensor wearables (RGB + IMU + LiDAR) are bulky, overheat, and drain quickly; and egocentric-vision systems that stream video to the cloud negate privacy and exhaust batteries in minutes.",
            solution: "We developed a smart glasses system that relies strictly on the visual stream from an embedded forward-facing micro-camera to detect digital screen exposure in real time, performing all inference locally on an ESP32 microcontroller. A lightweight MobileNetV1 classifier samples the egocentric field of view at 1 FPS and outputs a probability that an active, light-emitting screen is present. A rolling exposure timer accumulates continuous screen time; once an unbroken 20-minute threshold is reached, the microprocessor drives a haptic motor to deliver a discreet vibration cue, prompting the user to look away without disruptive visual or auditory alerts. The system then runs a 20-second break countdown, and adaptively resets the main timer whenever a natural break of 20+ continuous screen-free seconds is detected, ensuring the workflow is never interrupted unnecessarily. To make the model robust, confounding elements such as bright windows and reflective surfaces were folded into the screen-absent class, extending the classifier's decision boundary to real-world conditions.",
            methodology: [
                "Custom Egocentric Dataset: Constructed a purpose-built dataset (~982 annotated frames) of first-person, head-mounted footage to close the domain gap between public third-person datasets and the real glasses' field of view, lens distortion, and screen-glare dynamics. Two binary classes were defined: screen-active (looking at a screen) and screen-absent (looking away). The training set comprised 686 images (370 screen-active, 316 screen-absent).",
                "Dataset Diversity & Confounders: Recorded multiple screen types (monitors, laptops, smartphones), lighting conditions (daylight, fluorescent, low-light), and natural viewing distances/head tilts characteristic of CVS postures. Bright windows, reflective/glossy surfaces, and external TVs/projectors were deliberately incorporated as negative samples so the model learns the discriminative features of an emissive screen rather than raising false alarms.",
                "Edge ML Architecture: Employed transfer learning on a pre-trained MobileNetV1 (96x96 input, width multiplier alpha=0.1, 27,648 input features) whose depthwise separable convolutions make real-time inference feasible on microcontrollers. The final dense layer was replaced with a custom 8-neuron layer + 0.1 dropout, followed by a 2-node output layer for the binary screen vs. no-screen task.",
                "Training: Trained on the Edge Impulse platform over 40 epochs with a learning rate of 0.0005 and GPU acceleration. Data augmentation was enabled to increase variance and improve generalization. Images were resized to 96x96 using a 'fit shortest' scaling mode.",
                "Adaptive 20-20-20 Logic & Haptic Feedback: Implemented a rolling exposure timer that triggers a haptic micro-vibration after 20 continuous minutes of detected screen use, runs a 20-second break countdown, and automatically resets the main timer when a natural 20+ second screen-free break is detected, so users are never interrupted needlessly.",
                "Edge Deployment & Optimization: Compiled the trained model into an Arduino library using the Edge Impulse EON Compiler, which reduced RAM usage by 18% and Flash usage by 34% without sacrificing accuracy. Targeted an Espressif ESP-EYE (ESP32 @ 240MHz). The int8 quantized model requires only 194.9 KB RAM and 182.1 KB Flash, with total inference latency of 934 ms per image (15 ms DSP + 919 ms neural network).",
                "Physical Prototype: Modeled the wearable in SolidWorks around the dimensional constraints of the ESP32 camera module and fabricated it via additive manufacturing (3D printing), integrating a frontal camera for an egocentric viewpoint and a dedicated housing for the haptic motor connected to the embedded processing unit."
            ],
            results: [
                "Achieved 94.87% accuracy (int8) and 95.51% accuracy (float32) on a completely unseen hold-out test set (N=156), with a macro-average F1-score stable at 0.95 across both data types — indicating the model identifies the presence and absence of a screen equally well, without bias toward either class.",
                "Demonstrated negligible accuracy degradation from int8 quantization while dropping computational load, validating the feasibility of embedding complex computer vision directly on-device.",
                "Reached sub-second-class on-device inference (934 ms per image) on an ESP32 microcontroller, with a minimal memory footprint (194.9 KB RAM, 182.1 KB Flash).",
                "Cut RAM usage by 18% and Flash usage by 34% via the EON Compiler, with no loss of accuracy.",
                "Delivered a functional 3D-printed wearable prototype integrating the ESP32 camera board and a haptic motor, proving the physical feasibility of the designed interaction.",
                "Eliminated cloud dependency entirely, processing the visual stream locally to guarantee user privacy and avoid streaming latency and rapid battery drain.",
                "Extended the classifier's robustness to real-world confounders (bright windows, reflective surfaces, external displays) by incorporating them into the negative class, reducing false alarms."
            ],
            subpages: [
                {
                    id: "20-20-20-rule",
                    title: "The 20-20-20 Rule and Adaptive Logic",
                    content: "The clinically endorsed 20-20-20 rule recommends that for every 20 minutes of screen use, a person looks at an object roughly 20 feet (optical infinity) away for 20 seconds, restoring tear film stability and releasing intraocular muscular tension. Conventional timer apps enforce this with rigid, context-blind countdowns that fire even when the user is already resting, causing habituation and disruption. Our system instead operationalizes the rule dynamically. The camera samples the field of view at a low 1 FPS to preserve battery, and a rolling exposure timer accumulates only continuous screen time. When an unbroken 20-minute threshold is reached, the microprocessor triggers a discreet haptic vibration cue prompting the user to look away; the system then runs a 20-second break countdown and notifies the user with a second haptic cue when the break is complete. Crucially, if the camera stops detecting an active screen for at least 20 continuous seconds during the 20-minute window, the main timer resets automatically — the system assumes a sufficient natural break was already taken, ensuring the user's workflow is never interrupted unnecessarily."
                },
                {
                    id: "egocentric-dataset",
                    title: "Custom Egocentric Dataset and Confounders",
                    content: "A central challenge for robust on-device inference is the domain gap between publicly available image datasets — which predominantly feature third-person viewpoints — and the actual first-person (egocentric) perspective of a head-mounted micro-camera, with its unique angles, lens distortions, and screen-glare dynamics. To address this, a custom egocentric dataset of approximately 982 annotated frames was constructed using a micro-camera module matching the final glasses' specifications, mounted on a wearable frame to naturally simulate head movements and CVS postures. Frames were labelled into two binary classes: screen-active (the user is looking at a screen) and screen-absent (the user is looking away, satisfying the rest condition). The training set held 686 images (370 screen-active, 316 screen-absent). To prevent false positives from visually similar high-luminance stimuli, confounding samples — bright windows, reflective and glossy surfaces, and televisions or projectors outside the user's primary working context — were deliberately incorporated into the screen-absent class. This taught the model to learn the discriminative features that distinguish an emissive working screen from other bright or reflective stimuli, extending its decision boundary to real-world conditions without needing additional label categories."
                },
                {
                    id: "edge-ml-model",
                    title: "Edge ML Model and Quantization",
                    content: "To accurately detect screen exposure on computationally limited hardware, the system uses transfer learning built on MobileNetV1, a class of highly efficient convolutional neural networks designed for mobile and embedded vision. MobileNetV1 replaces standard convolutions with depthwise separable convolutions, factorizing each operation into a depthwise stage (one filter per input channel) and a pointwise stage that linearly combines the outputs — drastically reducing both computational cost and model size. The specific variant is MobileNetV1 96x96 with width multiplier alpha=0.1 (input layer of 27,648 features for the RGB channels), uniformly scaling down the number of filters per layer for an extremely compact backbone. The pre-trained dense head was removed and replaced with a custom 8-neuron dense layer with 0.1 dropout, followed by a 2-node output layer for the binary screen vs. no-screen task. Training ran for 40 epochs on the Edge Impulse platform (learning rate 0.0005, data augmentation enabled). On the unseen test set the model reached 95.51% accuracy (float32) and 94.87% (int8) with a stable 0.95 macro-F1. A key finding was the minimal impact of int8 quantization on predictive power: the quantized model dropped computational load with negligible accuracy degradation, confirming that complex on-device vision is feasible for smart wearables where privacy, power efficiency, and real-time processing are paramount."
                },
                {
                    id: "hardware-prototype",
                    title: "Hardware and 3D-Printed Prototype",
                    content: "A critical requirement was seamless deployment on a microcontroller. The trained model was compiled into a standard Arduino library using the Edge Impulse EON Compiler, which reduced RAM usage by 18% and Flash (ROM) usage by 34% without sacrificing accuracy. Performance profiling targeted an Espressif ESP-EYE (ESP32 running at 240MHz): the quantized int8 model requires only 194.9 KB of RAM and 182.1 KB of Flash, with a total inference latency of 934 ms per image (15 ms for digital signal processing and 919 ms for the neural network). To validate physical feasibility, a functional wearable prototype was modeled in SolidWorks and engineered around the dimensional constraints of the ESP32 camera module, then fabricated through additive manufacturing (3D printing) for rapid iteration and ergonomic evaluation. The frame integrates a frontally positioned camera to capture an egocentric viewpoint corresponding to the user's natural perspective, alongside a dedicated housing for the haptic motor connected to the embedded processing unit. The current prototype serves as a proof-of-concept demonstrating the interaction experience and operational feasibility; future industrial design work would miniaturize the electronics for integration within the dimensions of commercially viable smart glasses."
                },
                {
                    id: "privacy-future-work",
                    title: "Privacy, Impact, and Future Work",
                    content: "Unlike egocentric-vision systems that stream video to the cloud — negating privacy, introducing latency, and draining batteries in minutes — this system analyzes the visual data stream entirely locally and in real time. This circumvents external data transmission, guaranteeing the absolute user privacy lacking in prior models while eliminating unnecessary hardware overhead and latency. The single-camera, edge-only architecture also answers the demand for seamless daily integration, avoiding the thickness, overheating, and power consumption of multi-sensor fusion arrays (RGB + IMU + LiDAR), and the silent haptic micro-vibrations enforce the 20-20-20 rule without abruptly interrupting the user's workflow. This creates an unobtrusive interaction model balancing functional precision, physical invisibility, and long-term computational sustainability. Future work focuses on three directions: (1) testing the prototype in real-world contexts with an adequate sample of individuals to scientifically measure its tangible effectiveness on ocular well-being; (2) broadening detection by expanding the custom dataset to recognize additional pervasive screens such as smartphones and tablets; and (3) maximizing model accuracy by significantly increasing the volume of reference images, exposing the network to a wider variety of real-world environments, reflections, and complex lighting conditions."
                }
            ]
        }
    }
];

// ============================================
// EXPERIENCE / TIMELINE
// ============================================
// To add new experience, copy the structure below
const experienceData = [
    {
        id: 1,
        date: "Feb 2025 - Present",
        title: "Master of Science, Computer Science and Engineering",
        organization: "Politecnico di Milano",
        description: "Pursuing advanced studies in Computer Science and Engineering with focus on HCI, biomedical signals, and AI systems.",
        type: "education"
    },
    {
        id: 2,
        date: "Jan 2024 - Jan 2025",
        title: "Applied AI Engineer",
        organization: "Novus, Istanbul, Turkey",
        description: "Built and deployed production-grade RAG pipelines, improving query response accuracy. Engineered intelligent agent orchestration frameworks, automating 50+ complex tasks. Developed conversational AI chatbots using fine-tuned LLMs. Mentored 4+ junior engineers on AI pipeline development.",
        type: "work"
    },
    {
        id: 3,
        date: "Sep - Oct 2023",
        title: "Research Internship",
        organization: "University of Essex, Brain-Computer Interfaces & Neural Engineering Laboratory, Colchester, England",
        description: "Preprocessed raw EEG data through spectral analysis. Engineered deep learning models for the classification of mental states. Supervised by Prof. Reinhold Scherer.",
        type: "work"
    },
    {
        id: 4,
        date: "May - Nov 2023",
        title: "Participant",
        organization: "Google Developers Machine Learning Bootcamp, Remote",
        description: "Completed Google Machine Learning Bootcamp, earning TensorFlow Developer Certificate and finishing the Deep Learning Specialization on Coursera. Competed in 2 Kaggle challenges.",
        type: "work"
    },
    {
        id: 5,
        date: "June - Sep 2022",
        title: "Robotics System and Autonomous Driving Engineering Intern",
        organization: "Delivers.AI, Istanbul, Turkey",
        description: "Implemented deep learning-based data labeling automation, increasing labeling speed 10x and improving accuracy by 50%. Researched and integrated low-cost camera solutions, decreasing hardware expenses by 80% while maintaining performance benchmarks.",
        type: "work"
    },
    {
        id: 6,
        date: "Nov 2018 - June 2024",
        title: "Undergraduate Researcher",
        organization: "Koc University Intelligent User Interfaces Laboratory, Istanbul, Turkey",
        description: "Developed sketch recognition models by integrating human perception principles, utilizing deep learning, real-time databases, and extensive data collection. Presented research at 2022 SIU Conference. Supervised by Prof. Dr. T. Metin Sezgin.",
        type: "work"
    },
    {
        id: 7,
        date: "Jan - July 2021",
        title: "STAR Research Intern",
        organization: "The Scientific and Technological Research Council of Turkey (TUBITAK), Istanbul, Turkey",
        description: "Contributed to the development of Kart-ON (Accessible e-Learning Interfaces), utilizing AI-powered mobile applications and tangible interfaces. Designed an AI-powered game utilizing tangibles to effectively teach programming concepts.",
        type: "work"
    },
    {
        id: 8,
        date: "2019 - 2024",
        title: "Bachelor of Science in Electrical and Electronics Engineering, Double Major in Computer Engineering",
        organization: "Koc University, College of Engineering, 100% Scholarship",
        description: "CGPA: 3.59 out of 4.0. Full-merit undergraduate scholarship recipient.",
        type: "education"
    }
];

// ============================================
// CONTACT INFORMATION
// ============================================
const contactData = {
    email: "birkan.celik@mail.polimi.it",
    phone: "",
    location: "Milano, Italy",
    socialLinks: {
        github: "https://github.com/birkancelik18",
        linkedin: "", // Add your LinkedIn if available
        twitter: "" // Optional
    }
};

