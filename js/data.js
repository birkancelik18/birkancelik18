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
    profileImage: "images/profile.jpg", // Add your profile image to the images folder
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
        description: "Researching and developing sketch recognition models by integrating human perception principles at Koc University Intelligent User Interfaces Laboratory. Working on accessible e-learning interfaces and tangible computing to improve human-computer interaction.",
        icon: "👥", // You can replace with an image path if preferred
        color: "#4A90E2"
    },
    startup: {
        id: "startup",
        title: "Side Projects",
        subtitle: "Personal Projects & Innovation",
        description: "Projects I work on in my free time alongside my studies and research. These include autonomous robotics systems, AI applications, and other innovative solutions that combine technical expertise with practical applications.",
        icon: "🚀",
        color: "#50C878"
    },
    biomedical: {
        id: "biomedical",
        title: "Biomedical Signals",
        subtitle: "Healthcare Technology",
        description: "Researching brain-computer interfaces and neural engineering at University of Essex. Preprocessing EEG data through spectral analysis and engineering deep learning models for mental state classification to improve healthcare outcomes.",
        icon: "🏥",
        color: "#E74C3C"
    }
};

// ============================================
// PROJECTS
// ============================================
// To add a new project, copy the structure below and add it to the array
const projectsData = [
    {
        id: 3,
        title: "Sketch Recognition Models",
        description: "Developed sketch recognition models by integrating human perception principles at Koc University Intelligent User Interfaces Laboratory. Utilized deep learning, real-time databases, and extensive data collection from web scraping, crowdsourcing (Amazon MTurk), and face-to-face experiments.",
        image: "images/project3.jpg",
        techStack: ["Python", "Deep Learning", "TensorFlow", "PyTorch"],
        dimensions: ["hci"],
        links: {
            github: "https://github.com/birkancelik18"
        },
        date: "2018 - Present"
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
        date: "2023"
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
        date: "2021"
    },
    {
        id: 7,
        title: "HBD Report - Politecnico di Milano",
        description: "Research project and report completed at Politecnico di Milano. The project focuses on biomedical signals and healthcare technology research, demonstrating expertise in signal processing and biomedical data analysis.",
        image: "images/project7.jpg",
        techStack: ["Research", "Biomedical Signals", "Signal Processing"],
        dimensions: ["biomedical"],
        links: {
            github: "https://github.com/birkancelik18",
            pdf: "Politecnico_di_Milano___HBD___Report.pdf"
        },
        date: "2025"
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
            pdf: "thought2text.pdf"
        },
        date: "2024"
    }
    // Add more projects here by copying the structure above
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
        date: "Nov 2018 - Present",
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

