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
    bio: "I am a passionate computer engineering master's student at Politecnico di Milano with diverse interests spanning Human-Computer Interaction, side projects, and biomedical signal processing. Through my work, I explore the intersection of technology and human experience, building AI systems, conducting research, and developing innovative solutions.",
    profileImage: "images/birkan_furhat_selfie.jpg", // Add your profile image to the images folder
    skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "JavaScript",
        "React",
        "Node.js",
        "Machine Learning",
        "Deep Learning",
        "Java",
        "C",
        "SQL",
        "MATLAB",
        "Docker",
        "AWS",
        "Azure"
    ]
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
        icon: "👥", // You can replace with an image path if preferred
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
        title: "Side Projects",
        subtitle: "Personal Projects & Innovation",
        description: "Projects I work on in my free time alongside my studies and research. These include intelligent web applications and other innovative solutions that combine technical expertise with practical applications.",
        icon: "🚀",
        color: "#50C878",
        pageContent: {
            overview: "My side projects represent a space for experimentation and innovation. These personal initiatives allow me to explore new technologies, solve interesting problems, and build solutions that combine my technical skills with creative thinking.",
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
        title: "Biomedical Signals",
        subtitle: "Healthcare Technology",
        description: "Researching brain-computer interfaces and neural engineering at University of Essex. Preprocessing EEG data through spectral analysis and engineering deep learning models for mental state classification to improve healthcare outcomes.",
        icon: "🏥",
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
        id: 3,
        title: "Sketch Recognition Models",
        description: "Developed sketch recognition models by integrating human perception principles at Koc University Intelligent User Interfaces Laboratory (Nov 2018 - June 2024). Utilized deep learning, real-time databases, and extensive data collection from web scraping, crowdsourcing (Amazon MTurk), and face-to-face experiments.",
        image: "images/project3.jpg",
        techStack: ["Python", "Deep Learning", "TensorFlow", "PyTorch"],
        dimensions: ["hci"],
        links: {
            github: "https://github.com/birkancelik18"
        },
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
        description: "Preprocessed raw electroencephalogram (EEG) data through spectral analysis and engineered deep learning models for the classification of mental states at University of Essex Brain-Computer Interfaces & Neural Engineering Laboratory.",
        image: "images/project4.jpg",
        techStack: ["Python", "Deep Learning", "Signal Processing", "EEG"],
        dimensions: ["biomedical"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "2023",
        details: {
            overview: "This research project focused on preprocessing raw EEG data and developing deep learning models to classify mental states, contributing to the field of brain-computer interfaces and neural engineering.",
            problem: "Raw EEG data contains significant noise and artifacts that must be processed before meaningful classification can occur. Additionally, mental state classification requires sophisticated models that can capture subtle neural patterns.",
            solution: "I implemented comprehensive preprocessing pipelines using spectral analysis techniques and developed deep learning models specifically designed for EEG signal classification.",
            methodology: [
                "Raw EEG data preprocessing and artifact removal",
                "Spectral analysis for feature extraction",
                "Deep learning model development for classification",
                "Validation and testing with real EEG datasets",
                "Collaboration with University of Essex BCI Laboratory"
            ],
            results: [
                "Successfully preprocessed raw EEG data with improved signal quality",
                "Developed accurate mental state classification models",
                "Contributed to ongoing research at University of Essex",
                "Gained expertise in neural signal processing"
            ],
            subpages: [
                {
                    id: "preprocessing",
                    title: "Signal Preprocessing",
                    content: "The preprocessing pipeline involved artifact removal, noise filtering, and spectral analysis to extract meaningful features from raw EEG signals. This was crucial for improving classification accuracy."
                },
                {
                    id: "classification",
                    title: "Classification Models",
                    content: "Deep learning models were engineered specifically for EEG signal classification, utilizing architectures that can capture temporal and spatial patterns in neural data."
                }
            ]
        }
    },
    {
        id: 5,
        title: "Kart-ON: Accessible e-Learning Interfaces",
        description: "Contributed to the development of Kart-ON at TUBITAK, utilizing AI-powered mobile applications and tangible interfaces, as well as community workshop guides to improve the delivery of high-quality, accessible programming education to diverse learners.",
        image: "images/project5.jpg",
        techStack: ["AI", "Mobile Development", "Tangible Interfaces", "Accessibility"],
        dimensions: ["hci"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "2021",
        details: {
            overview: "Kart-ON is an accessible e-learning platform designed to make programming education more inclusive. The project combines AI-powered mobile applications with tangible interfaces to create engaging learning experiences.",
            problem: "Traditional programming education often excludes learners with different learning styles or accessibility needs. There was a need for more inclusive educational tools.",
            solution: "I contributed to developing Kart-ON, which uses AI-powered mobile applications and tangible interfaces to create accessible programming education experiences, along with community workshop guides.",
            methodology: [
                "AI-powered mobile application development",
                "Tangible interface design and implementation",
                "Community workshop guide creation",
                "Accessibility testing and refinement",
                "User-centered design approach"
            ],
            results: [
                "Improved accessibility in programming education",
                "Successful deployment of tangible interfaces",
                "Community engagement through workshops",
                "Contribution to TUBITAK research initiatives"
            ],
            subpages: [
                {
                    id: "tangible-interfaces",
                    title: "Tangible Interfaces",
                    content: "The project utilized tangible interfaces to make programming concepts more accessible through physical interaction, allowing learners to manipulate physical objects to understand abstract programming concepts."
                },
                {
                    id: "ai-mobile",
                    title: "AI-Powered Mobile App",
                    content: "The mobile application leveraged AI to provide personalized learning experiences, adapting to individual learner needs and providing intelligent feedback and guidance."
                }
            ]
        }
    },
    {
        id: 7,
        title: "Health Big Data: Fetal Biosignals Integration Pipeline",
        description: "Developed an end-to-end data integration pipeline for managing biosignal and clinical data from pregnant women and their fetuses across multiple hospitals in Italy. The project includes fetal heart rate (FHR), uterine contraction (TOCO), and clinical metadata processing, with data profiling, cleaning, integration, and migration into a relational SQLite database mapped to OMOP Common Data Model. Built a FastAPI-based API and graphical user interface for clinicians and researchers.",
        image: "images/project7.jpg",
        techStack: ["Python", "FastAPI", "SQLite", "Pandas", "SciPy", "OMOP CDM", "Data Integration", "Signal Processing", "Data Cleaning", "API Development", "Web Interface"],
        dimensions: ["biomedical"],
        links: {
            github: "https://github.com/birkancelik18",
            pdf: "data/Politecnico_di_Milano___HBD___Report.pdf"
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
        title: "Thought2Text: Brain Signal to Text Conversion",
        description: "A brain-computer interface (BCI) project focused on converting neural signals and brain activity patterns into text output. This project involves preprocessing EEG/neural signals, feature extraction, and implementing machine learning models for classification and translation of brain signals into readable text, advancing assistive communication technologies.",
        image: "images/project8.jpg",
        techStack: ["Python", "EEG", "Signal Processing", "Machine Learning", "BCI", "Deep Learning"],
        dimensions: ["biomedical"],
        links: {
            github: "https://github.com/birkancelik18",
            pdf: "data/thought2text.pdf"
        },
        date: "2024",
        details: {
            overview: "Thought2Text is a brain-computer interface project that converts neural signals into text, advancing assistive communication technologies for individuals with communication disabilities.",
            problem: "Individuals with severe communication disabilities need alternative methods to express themselves. Traditional interfaces may not be accessible to everyone.",
            solution: "I developed a BCI system that processes EEG/neural signals, extracts features, and uses machine learning models to translate brain activity patterns into readable text output.",
            methodology: [
                "EEG/neural signal preprocessing",
                "Feature extraction from brain signals",
                "Machine learning model development for classification",
                "Text generation from neural patterns",
                "System integration and testing"
            ],
            results: [
                "Successfully converted brain signals to text",
                "Advanced assistive communication technology",
                "Demonstrated potential for real-world applications",
                "Published research findings"
            ],
            subpages: [
                {
                    id: "signal-processing",
                    title: "Neural Signal Processing",
                    content: "The system processes raw EEG signals through sophisticated preprocessing pipelines, removing artifacts and extracting meaningful features that represent neural activity patterns."
                },
                {
                    id: "text-generation",
                    title: "Text Generation",
                    content: "Machine learning models classify neural patterns and translate them into text output, enabling communication through brain signals alone."
                },
                {
                    id: "applications",
                    title: "Real-World Applications",
                    content: "This technology has significant potential for assistive communication devices, helping individuals with communication disabilities express themselves more effectively."
                }
            ]
        }
    },
    {
        id: 9,
        title: "ATLAS: Your Intelligent Travel Assistant",
        description: "Developed an intelligent mobile travel assistant that personalizes flight recommendations using AI and real-time flight data. Built with Flutter, Python FastAPI, Firebase, and integrated LLM agent powered by OpenAI GPT-4 Turbo. Features include personalized flight search, route tracking, push notifications, and conversational AI interface.",
        image: "images/project9.jpg",
        techStack: ["Flutter", "Python", "FastAPI", "Firebase", "LangChain", "OpenAI GPT-4", "Kiwi Tequila API", "Dart", "Cloud Functions"],
        dimensions: ["startup"],
        links: {
            github: "https://github.com/birkancelik18",
            pdf: "data/Atlas - FinalReport.pdf"
        },
        date: "Spring 2024",
        details: {
            overview: "ATLAS is an intelligent travel assistant mobile application that streamlines the travel planning process by understanding user preferences and suggesting appropriate flights in real-time. The application leverages Kiwi Tequila API for flight data and uses personalization algorithms to filter results based on user personas such as business travelers, budget-conscious travelers, eco-friendly travelers, and family travelers. The unique value proposition is having an intelligent assistant that knows your preferences and applies them in the background, sending push notifications when it finds flights you might be interested in.",
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
    }
    // Add more projects here by copying the structure above
    // Remember to include a 'details' object with overview, problem, solution, methodology, results, and subpages
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

