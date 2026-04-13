// ============================================
// PORTFOLIO SCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initDynamicContent();
    initScrollAnimations();
    initProjectFiltering();
    initProjectsSlider();
    // initContactForm() is now called from renderContact()
    initRouting();
    setCurrentYear();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// DYNAMIC CONTENT RENDERING
// ============================================
function initDynamicContent() {
    renderAbout();
    renderDimensions();
    renderProjects();
    renderExperience();
    renderContact();
}

function renderAbout() {
    const aboutContent = document.getElementById('aboutContent');
    if (!aboutContent || !aboutData) return;

    aboutContent.innerHTML = `
        <div class="about-image-container">
            <img src="${aboutData.profileImage}" alt="${aboutData.name}" class="about-image" onerror="this.style.display='none'">
        </div>
        <div class="about-text">
            <h2 class="about-title">${aboutData.title}</h2>
            <p class="about-bio">${aboutData.bio}</p>
        </div>
    `;
}

function renderDimensions() {
    const dimensionsGrid = document.getElementById('dimensionsGrid');
    if (!dimensionsGrid || !dimensionsData) return;

    const dimensions = [dimensionsData.hci, dimensionsData.startup, dimensionsData.biomedical];
    
    dimensionsGrid.innerHTML = dimensions.map(dim => {
        // Get first highlight for quick preview
        const quickHighlight = dim.pageContent?.highlights?.[0] || dim.description.substring(0, 80) + '...';
        
        return `
        <div class="dimension-card" data-dimension="${dim.id}">
            <div class="dimension-card-header">
                <div class="dimension-accent" style="background-color: ${dim.color}"></div>
            </div>
            <div class="dimension-card-content">
                <h3 class="dimension-title">${dim.title}</h3>
                <h4 class="dimension-subtitle">${dim.subtitle}</h4>
                <div class="dimension-quick-highlight">
                    <span>${quickHighlight}</span>
                </div>
            </div>
        </div>
    `;
    }).join('');

    // Add click interaction to navigate to dimension page
    document.querySelectorAll('.dimension-card').forEach(card => {
        card.addEventListener('click', function() {
            const dimension = this.dataset.dimension;
            navigateToDimension(dimension);
        });
    });
}

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid || !projectsData) return;

    // Clear existing content
    projectsGrid.innerHTML = '';

    projectsGrid.innerHTML = projectsData.map(project => {
        const dimensionsHTML = project.dimensions.map(dim => 
            `<span class="project-dimension" data-dimension="${dim}">${dimensionsData[dim]?.title || dim}</span>`
        ).join('');

        const linksHTML = project.links ? `
            <div class="project-links">
                ${project.links.live ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>` : ''}
                ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>` : ''}
                ${project.links.pdf ? `<a href="${project.links.pdf}" target="_blank" rel="noopener noreferrer" class="project-link">${project.links.pdfLabel || 'View PDF'}</a>` : ''}
            </div>
        ` : '';

        const techStackHTML = project.techStack.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Get key highlight from details if available - make it concise
        const keyHighlight = project.details?.results?.[0] 
            ? (project.details.results[0].length > 120 ? project.details.results[0].substring(0, 120) + '...' : project.details.results[0])
            : (project.details?.overview ? (project.details.overview.length > 120 ? project.details.overview.substring(0, 120) + '...' : project.details.overview) : '');
        const hasSubpages = project.details?.subpages && project.details.subpages.length > 0;
        
        // Truncate description to be more concise (max 150 characters)
        const truncatedDescription = project.description && project.description.length > 150 
            ? project.description.substring(0, 150).trim() + '...'
            : project.description;
        
        return `
            <div class="project-card" data-dimensions="${project.dimensions.join(',')}" data-project-id="${project.id}">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%230F0E0D%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23FAFAF9%22 font-family=%22Arial%22 font-size=%2218%22%3EProject Image%3C/text%3E%3C/svg%3E'">
                    <div class="project-overlay">
                        ${linksHTML}
                    </div>
                    ${hasSubpages ? '<div class="project-subpages-badge">Details</div>' : ''}
                </div>
                <div class="project-content">
                    <div class="project-header-row">
                        <div class="project-dimensions">${dimensionsHTML}</div>
                        <div class="project-date-badge">${project.date}</div>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    ${keyHighlight ? `<div class="project-key-result">
                        <span class="result-text">${keyHighlight}</span>
                    </div>` : ''}
                    <p class="project-description">${truncatedDescription}</p>
                    <div class="project-tech">${techStackHTML}</div>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers to project cards
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't navigate if clicking on links
                if (e.target.closest('.project-link')) return;
                
                const projectId = parseInt(this.dataset.projectId);
                navigateToProject(projectId);
            });
        });
        
    }, 100);
}

function renderExperience() {
    const timeline = document.getElementById('timeline');
    if (!timeline || !experienceData) return;

    timeline.innerHTML = experienceData.map(exp => `
        <div class="timeline-item ${exp.type}">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-date">${exp.date}</div>
                <h3 class="timeline-title">${exp.title}</h3>
                <h4 class="timeline-organization">${exp.organization}</h4>
                <p class="timeline-description">${exp.description}</p>
            </div>
        </div>
    `).join('');
}

function renderContact() {
    const contactContent = document.getElementById('contactContent');
    if (!contactContent || !contactData) return;

    const socialLinksHTML = Object.entries(contactData.socialLinks)
        .filter(([key, value]) => value) // Only show if link exists
        .map(([platform, url]) => 
            `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${platform}">
                ${platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>`
        ).join('');

    const phoneHTML = contactData.phone ? `<p class="contact-phone"><strong>Phone:</strong> ${contactData.phone}</p>` : '';
    const locationHTML = contactData.location ? `<p class="contact-location"><strong>Location:</strong> ${contactData.location}</p>` : '';

    contactContent.innerHTML = `
        <div class="contact-info">
            <p class="contact-email">
                <strong>Email:</strong> 
                <a href="mailto:${contactData.email}">${contactData.email}</a>
            </p>
            ${phoneHTML}
            ${locationHTML}
            <div class="social-links">
                ${socialLinksHTML}
            </div>
        </div>
        <form class="contact-form" id="contactForm">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-btn">Send Message</button>
            <p class="form-note">Clicking send will open your email client to deliver the message.</p>
        </form>
    `;
    
    // Initialize form after it's rendered
    initContactForm();
}

// ============================================
// PROJECT SLIDER STATE
// ============================================
let sliderState = {
    currentIndex: 0,
    visibleProjects: [],
    filteredProjects: []
};

// ============================================
// PROJECT FILTERING
// ============================================
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Filter projects
            const visibleCards = [];
            projectCards.forEach((card, index) => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                    visibleCards.push(index);
                } else {
                    const dimensions = card.dataset.dimensions.split(',');
                    if (dimensions.includes(filter)) {
                        card.style.display = 'flex';
                        visibleCards.push(index);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });

            // Update slider state
            sliderState.filteredProjects = visibleCards;
            sliderState.currentIndex = 0;
            
            // Update slider and dots
            if (typeof window.updateSlider === 'function') {
                window.updateSlider();
            }
            if (typeof window.updateSliderDots === 'function') {
                window.updateSliderDots();
            }
        });
    });
}

// ============================================
// PROJECTS SLIDER
// ============================================
function initProjectsSlider() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slider = document.querySelector('.projects-slider');
    const projectCards = document.querySelectorAll('.project-card');

    if (!slider || !prevBtn || !nextBtn) return;

    // Initialize visible projects (all projects initially)
    sliderState.filteredProjects = Array.from({ length: projectCards.length }, (_, i) => i);
    sliderState.visibleProjects = projectCards;

    // Calculate items per view based on screen size
    // Since cards are now horizontal (image left, content right), show 1 at a time
    function getItemsPerView() {
        return 1; // Always show one project card at a time
    }

    function updateSlider() {
        const itemsPerView = getItemsPerView();
        const visibleCount = sliderState.filteredProjects.length;
        const maxIndex = Math.max(0, visibleCount - itemsPerView);
        sliderState.currentIndex = Math.min(sliderState.currentIndex, maxIndex);

        if (visibleCount === 0) {
            slider.style.transform = 'translateX(0px)';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        // Get the first visible card width
        const firstVisibleIndex = sliderState.filteredProjects[0];
        const firstCard = projectCards[firstVisibleIndex];
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth || 0;
        const gap = parseInt(getComputedStyle(slider).gap) || 16;
        const translateX = -(sliderState.currentIndex * (cardWidth + gap));

        slider.style.transform = `translateX(${translateX}px)`;

        // Update button states
        prevBtn.disabled = sliderState.currentIndex === 0;
        nextBtn.disabled = sliderState.currentIndex >= maxIndex || visibleCount <= itemsPerView;
    }

    function slideNext() {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, sliderState.filteredProjects.length - itemsPerView);
        if (sliderState.currentIndex < maxIndex) {
            sliderState.currentIndex++;
            updateSlider();
            updateSliderDots();
        }
    }

    function slidePrev() {
        if (sliderState.currentIndex > 0) {
            sliderState.currentIndex--;
            updateSlider();
            updateSliderDots();
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection && isElementInViewport(projectsSection)) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                slidePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                slideNext();
            }
        }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlider();
            updateSliderDots();
        }, 250);
    });

    // Initialize slider
    updateSlider();
    updateSliderDots();

    // Make updateSlider and updateSliderDots available globally for filtering
    window.updateSlider = updateSlider;
    window.updateSliderDots = updateSliderDots;
}

function updateSliderDots() {
    const dotsContainer = document.getElementById('sliderDots');
    if (!dotsContainer) return;

    const itemsPerView = 1; // Always show one project at a time
    const visibleCount = sliderState.filteredProjects.length;
    const totalSlides = Math.ceil(visibleCount / itemsPerView);

    dotsContainer.innerHTML = '';

    // Only show dots if there are more items than can fit in one view
    if (totalSlides <= 1) {
        return;
    }

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${i === Math.floor(sliderState.currentIndex / itemsPerView) ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
            sliderState.currentIndex = i * itemsPerView;
            if (typeof window.updateSlider === 'function') {
                window.updateSlider();
            }
            updateSliderDots();
        });
        dotsContainer.appendChild(dot);
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    return rect.top < viewHeight && rect.bottom > 0 && rect.left < viewWidth && rect.right > 0;
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Check if already initialized to prevent duplicate listeners
    if (form.dataset.initialized === 'true') return;
    form.dataset.initialized = 'true';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // In a real implementation, you would send this to a server
        // For now, we'll use mailto as a fallback
        const mailtoLink = `mailto:${contactData.email}?subject=Contact from Portfolio&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage: ${message}`;
        window.location.href = mailtoLink;

        form.reset();
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function estimateReadingTime(text) {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 230));
    return minutes;
}

function getProjectFullText(project) {
    const parts = [
        project.description,
        project.details?.overview,
        project.details?.problem,
        project.details?.solution,
        ...(project.details?.methodology || []),
        ...(project.details?.results || []),
        ...(project.details?.subpages || []).map(sp => sp.content)
    ];
    return parts.filter(Boolean).join(' ');
}

// ============================================
// ROUTING SYSTEM
// ============================================
function initRouting() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            navigateToHome();
        });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state) {
            if (e.state.type === 'dimension') {
                navigateToDimension(e.state.id, false);
            } else if (e.state.type === 'project') {
                navigateToProject(e.state.id, false);
            } else if (e.state.type === 'subpage') {
                navigateToSubpage(e.state.projectId, e.state.subpageId, false);
            }
        } else {
            navigateToHome(false);
        }
    });

    // Check initial hash
    handleInitialRoute();
}

function handleInitialRoute() {
    const hash = window.location.hash;
    if (hash) {
        const parts = hash.substring(1).split('/');
        if (parts[0] === 'dimension' && parts[1]) {
            navigateToDimension(parts[1], false);
        } else if (parts[0] === 'project' && parts[1]) {
            const projectId = parseInt(parts[1]);
            if (parts[2]) {
                navigateToSubpage(projectId, parts[2], false);
            } else {
                navigateToProject(projectId, false);
            }
        }
    }
}

function navigateToHome(updateHistory = true) {
    const pageContainer = document.getElementById('pageContainer');
    const mainSections = document.querySelectorAll('.section, .footer');
    
    if (pageContainer) {
        pageContainer.classList.add('hidden');
    }
    
    mainSections.forEach(section => {
        section.style.display = '';
    });
    
    if (updateHistory) {
        window.history.replaceState({ type: 'home' }, '', '#');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToDimension(dimensionId, updateHistory = true) {
    const dimension = dimensionsData[dimensionId];
    if (!dimension) return;

    const pageContainer = document.getElementById('pageContainer');
    const pageContent = document.getElementById('pageContent');
    const mainSections = document.querySelectorAll('.section, .footer');

    if (!pageContainer || !pageContent) return;

    // Hide main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show page container
    pageContainer.classList.remove('hidden');

    // Get projects for this dimension
    const dimensionProjects = projectsData.filter(p => p.dimensions.includes(dimensionId));

    // Render dimension page - projects listed one after another
    const projectsHTML = dimensionProjects.map(project => {
        const hasDetails = project.details ? 'has-details' : 'no-details';
        return `
        <div class="dimension-project-card ${hasDetails}" data-project-id="${project.id}">
            <div class="dimension-project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%230F0E0D%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23FAFAF9%22 font-family=%22Arial%22 font-size=%2218%22%3EProject Image%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="dimension-project-content">
                <div class="dimension-project-header">
                    <h3 class="dimension-project-title">${project.title}</h3>
                    ${project.details ? '<span class="project-details-badge">View Details →</span>' : ''}
                </div>
                <p class="dimension-project-description">${project.description}</p>
                <div class="dimension-project-footer">
                    <div class="dimension-project-tech">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="dimension-project-date">${project.date}</div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    pageContent.innerHTML = `
        <div class="dimension-page">
            <div class="dimension-breadcrumb">
                <a href="#" class="breadcrumb-link" data-action="home">Home</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${dimension.title}</span>
            </div>
            <div class="dimension-page-header" style="border-left: 4px solid ${dimension.color}">
                <div class="dimension-page-title-section">
                    <h1 class="dimension-page-title">${dimension.title}</h1>
                    <h2 class="dimension-page-subtitle">${dimension.subtitle}</h2>
                </div>
            </div>
            <div class="dimension-projects-section-top">
                <h3 class="dimension-projects-title">Projects</h3>
                <div class="dimension-projects-list">
                    ${projectsHTML}
                </div>
            </div>
            <div class="dimension-page-content">
                <div class="dimension-overview">
                    <h3>Overview</h3>
                    <p>${dimension.pageContent.overview}</p>
                </div>
                <div class="dimension-research-areas">
                    <h3>Research Areas</h3>
                    <div class="research-areas-grid">
                        ${dimension.pageContent.researchAreas.map(area => `<span class="research-area-tag">${area}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add click handlers to project cards
    setTimeout(() => {
        document.querySelectorAll('.dimension-project-card').forEach(card => {
            card.addEventListener('click', function() {
                const projectId = parseInt(this.dataset.projectId);
                const project = projectsData.find(p => p.id === projectId);
                if (project && project.details) {
                    navigateToProject(projectId);
                }
            });
        });
        
        // Add breadcrumb home link
        const breadcrumbLink = document.querySelector('.dimension-breadcrumb .breadcrumb-link');
        if (breadcrumbLink) {
            breadcrumbLink.addEventListener('click', function(e) {
                e.preventDefault();
                navigateToHome();
            });
        }
    }, 50);

    if (updateHistory) {
        window.history.pushState({ type: 'dimension', id: dimensionId }, '', `#dimension/${dimensionId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToProject(projectId, updateHistory = true) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !project.details) {
        // If no details, navigate to dimension instead
        if (project && project.dimensions.length > 0) {
            navigateToDimension(project.dimensions[0]);
        }
        return;
    }

    const pageContainer = document.getElementById('pageContainer');
    const pageContent = document.getElementById('pageContent');
    const mainSections = document.querySelectorAll('.section, .footer');

    if (!pageContainer || !pageContent) return;

    // Hide main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show page container
    pageContainer.classList.remove('hidden');

    const subpagesHTML = project.details.subpages && project.details.subpages.length > 0 ? `
        <div class="project-subpages">
            <h3>Explore Components</h3>
            <div class="subpages-grid">
                ${project.details.subpages.map((subpage, index) => {
                    // Get first sentence or first 120 chars as preview
                    const firstSentence = subpage.content.split(/\.\s+/)[0] + '.';
                    const preview = firstSentence.length > 150 ? subpage.content.substring(0, 147) + '...' : firstSentence;
                    
                    return `
                    <div class="subpage-card" data-subpage-id="${subpage.id}">
                        <div class="subpage-card-header">
                            <div class="subpage-card-number">${index + 1}</div>
                            <h4>${subpage.title}</h4>
                        </div>
                        <p class="subpage-card-preview">${preview}</p>
                        <div class="subpage-card-footer">
                            <span class="subpage-link">Read more</span>
                        </div>
                    </div>
                `;
                }).join('')}
            </div>
        </div>
    ` : '';

    const linksHTML = project.links ? `
        <div class="project-detail-links">
            ${project.links.live ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="project-detail-link">Live Demo</a>` : ''}
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-detail-link">GitHub</a>` : ''}
            ${project.links.pdf ? `<a href="${project.links.pdf}" target="_blank" rel="noopener noreferrer" class="project-detail-link">${project.links.pdfLabel || 'View PDF'}</a>` : ''}
        </div>
    ` : '';

    const galleryHTML = project.details.gallery && project.details.gallery.length > 0 ? `
        <section class="project-gallery">
            <div class="project-gallery-header">
                <div>
                    <p class="project-gallery-eyebrow">Feature walkthrough</p>
                    <h3>See ${project.title} in action</h3>
                    <p class="project-gallery-subtitle">Slide through every feature without leaving this page.</p>
                </div>
                <div class="project-gallery-counter" aria-live="polite">
                    <span class="current-index">1</span>
                    <span class="separator">/</span>
                    <span class="total-count">${project.details.gallery.length}</span>
                </div>
            </div>
            <div class="project-feature-slider" data-total="${project.details.gallery.length}">
                <button class="feature-slider-btn prev" data-direction="prev" aria-label="Previous feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <div class="project-feature-track">
                    ${project.details.gallery.map((item, index) => `
                        <article class="project-feature-card" data-index="${index}">
                            <div class="feature-card-media">
                                <img src="${item.src}" alt="${item.caption || `PAIR LEGAL feature ${index + 1}`}" loading="lazy" onerror="this.style.display='none'">
                            </div>
                            <div class="feature-card-body">
                                <span class="feature-card-index">Feature ${index + 1}</span>
                                <h4>${item.title || 'Workflow highlight'}</h4>
                                <p>${item.caption || ''}</p>
                            </div>
                        </article>
                    `).join('')}
                </div>
                <button class="feature-slider-btn next" data-direction="next" aria-label="Next feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 6l6 6-6 6"/>
                    </svg>
                </button>
            </div>
            <div class="feature-slider-dots" role="tablist" aria-label="Feature slides"></div>
        </section>
    ` : '';

    // Create quick summary box
    const quickSummary = `
        <div class="project-quick-summary">
            <div class="summary-item">
                <span class="summary-label">The Problem</span>
                <p class="summary-text">${project.details.problem}</p>
            </div>
            <div class="summary-item">
                <span class="summary-label">The Solution</span>
                <p class="summary-text">${project.details.solution}</p>
            </div>
            <div class="summary-item">
                <span class="summary-label">Key Results</span>
                <div class="summary-results">
                    ${project.details.results.slice(0, 4).map(r => `<div class="summary-result-badge">${r}</div>`).join('')}
                </div>
            </div>
        </div>
    `;

    const primaryDimension = dimensionsData[project.dimensions[0]];
    const readingMinutes = estimateReadingTime(getProjectFullText(project));

    // Build TOC entries from sections
    const tocSections = [
        { id: 'section-overview', label: 'Overview' },
        { id: 'section-problem', label: 'Problem' },
        { id: 'section-solution', label: 'Solution' },
        { id: 'section-methodology', label: 'Methodology' },
        { id: 'section-results', label: 'Results' }
    ];
    if (project.details.collaborators && project.details.collaborators.length > 0) {
        tocSections.push({ id: 'section-collaborators', label: 'Collaborators' });
    }
    if (project.details.subpages && project.details.subpages.length > 0) {
        tocSections.push({ id: 'section-explore', label: 'Explore' });
    }

    const tocHTML = `
        <nav class="project-toc" id="projectToc" aria-label="Table of contents">
            <div class="toc-label">Contents</div>
            <ul class="toc-list">
                ${tocSections.map(s => `<li><a href="#${s.id}" class="toc-link" data-section="${s.id}">${s.label}</a></li>`).join('')}
            </ul>
        </nav>
    `;

    pageContent.innerHTML = `
        <div class="reading-progress">
            <div class="reading-progress-bar" id="readingProgressBar"></div>
        </div>
        <div class="project-detail-page">
            <div class="project-breadcrumb">
                <a href="#" class="breadcrumb-link" data-action="home">Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#" class="breadcrumb-link" data-dimension="${project.dimensions[0]}">${primaryDimension?.title || project.dimensions[0]}</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${project.title}</span>
            </div>
            
            <div class="project-detail-hero">
                <div class="project-detail-header">
                    <div class="project-detail-title-section">
                        <div class="project-detail-dimensions">
                            ${project.dimensions.map(dim => `<span class="project-dimension-tag">${dimensionsData[dim]?.title || dim}</span>`).join('')}
                        </div>
                        <h1 class="project-detail-title">${project.title}</h1>
                        <p class="project-detail-description">${project.description}</p>
                        <div class="project-detail-meta">
                            <span class="project-detail-date">${project.date}</span>
                            <span class="project-reading-time">${readingMinutes} min read</span>
                            <div class="project-detail-tech">
                                ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                            ${linksHTML}
                        </div>
                    </div>
                </div>
                <div class="project-detail-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.parentElement.style.display='none'">
                </div>
            </div>
            
            ${quickSummary}
            ${galleryHTML}
            <div class="project-detail-content-wrapper">
                ${tocHTML}
                <div class="project-detail-content">
                    <div class="project-detail-section" id="section-overview">
                        <div class="section-anchor-label">Overview</div>
                        <h3>Overview</h3>
                        <p>${project.details.overview}</p>
                        ${project.details.teamPhoto ? `
                            <div style="margin-top: var(--spacing-md); text-align: center;">
                                <img src="${project.details.teamPhoto}" alt="${project.title} Team" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid rgba(250, 250, 249, 0.2);" onerror="this.style.display='none'">
                                <p style="margin-top: var(--spacing-xs); color: rgba(255, 255, 255, 0.7); font-size: var(--font-size-sm);">The ${project.title} team</p>
                            </div>
                        ` : ''}
                    </div>
                    <div class="project-detail-section" id="section-problem">
                        <div class="section-anchor-label">Problem</div>
                        <h3>The Problem</h3>
                        <p>${project.details.problem}</p>
                    </div>
                    <div class="project-detail-section" id="section-solution">
                        <div class="section-anchor-label">Solution</div>
                        <h3>The Solution</h3>
                        <p>${project.details.solution}</p>
                    </div>
                    <div class="project-detail-section" id="section-methodology">
                        <div class="section-anchor-label">Methodology</div>
                        <h3>Methodology</h3>
                        <div class="methodology-steps">
                            ${project.details.methodology.map((item, idx) => `
                                <div class="methodology-step">
                                    <div class="step-indicator">
                                        <div class="step-number">${String(idx + 1).padStart(2, '0')}</div>
                                        ${idx < project.details.methodology.length - 1 ? '<div class="step-line"></div>' : ''}
                                    </div>
                                    <div class="step-content">
                                        <p>${item}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="project-detail-section" id="section-results">
                        <div class="section-anchor-label">Results</div>
                        <h3>Results</h3>
                        <div class="results-grid">
                            ${project.details.results.map(item => {
                                const colonIdx = item.indexOf(':');
                                const hasLabel = colonIdx > 0 && colonIdx < 60;
                                const label = hasLabel ? item.substring(0, colonIdx) : null;
                                const text = hasLabel ? item.substring(colonIdx + 1).trim() : item;
                                return `
                                    <div class="result-card">
                                        ${label ? `<div class="result-card-label">${label}</div>` : ''}
                                        <div class="result-card-text">${text}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    ${project.details.collaborators && project.details.collaborators.length > 0 ? `
                    <div class="project-detail-section" id="section-collaborators">
                        <div class="section-anchor-label">Collaborators</div>
                        <h3>Collaborators</h3>
                        <ul class="collaborators-list">
                            ${project.details.collaborators.map(c => `
                            <li class="collaborator-item">
                                <span class="collaborator-name">${c.name}</span>
                                <span class="collaborator-role">${c.role}</span>
                                ${c.linkedin ? `<a href="${c.linkedin}" target="_blank" rel="noopener noreferrer" class="collaborator-linkedin">LinkedIn</a>` : ''}
                            </li>`).join('')}
                        </ul>
                    </div>` : ''}
                    ${subpagesHTML ? `<div id="section-explore">${subpagesHTML}</div>` : ''}
                </div>
            </div>
        </div>
    `;

    initFeatureSliders();
    
    // Initialize reading progress indicator
    initReadingProgress();

    // Initialize TOC scroll-spy and click handlers
    initTocScrollSpy();

    // Add click handlers to subpage cards
    if (project.details.subpages && project.details.subpages.length > 0) {
        setTimeout(() => {
            document.querySelectorAll('.subpage-card').forEach(card => {
                card.addEventListener('click', function() {
                    const subpageId = this.dataset.subpageId;
                    navigateToSubpage(projectId, subpageId);
                });
            });
        }, 50);
    }
    
    // Add breadcrumb navigation
    setTimeout(() => {
        const breadcrumbLinks = document.querySelectorAll('.project-breadcrumb .breadcrumb-link');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.dataset.action;
                const dimensionId = this.dataset.dimension;
                
                if (action === 'home') {
                    navigateToHome();
                } else if (dimensionId) {
                    navigateToDimension(dimensionId);
                }
            });
        });
    }, 50);

    if (updateHistory) {
        window.history.pushState({ type: 'project', id: projectId }, '', `#project/${projectId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToSubpage(projectId, subpageId, updateHistory = true) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !project.details) return;

    const subpage = project.details.subpages?.find(sp => sp.id === subpageId);
    if (!subpage) return;

    const pageContainer = document.getElementById('pageContainer');
    const pageContent = document.getElementById('pageContent');
    const mainSections = document.querySelectorAll('.section, .footer');

    if (!pageContainer || !pageContent) return;

    // Hide main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show page container
    pageContainer.classList.remove('hidden');

    const dimension = dimensionsData[project.dimensions[0]];
    const primaryDimension = dimension;
    
    // Parse content with better structure
    const contentParagraphs = subpage.content.split('\n\n').filter(p => p.trim());
    const allContent = contentParagraphs.join(' ');
    
    // Lead paragraph (first paragraph in larger font)
    const leadParagraph = contentParagraphs[0] || '';
    
    // Remaining content
    const bodyParagraphs = contentParagraphs.slice(1);
    
    // Generate a clear, impactful value proposition
    const valueProposition = subpage.valueProposition || generateValueProposition(subpage.title, allContent);

    // Extract key sentence for pull quote (find sentence with "enables", "allows", or longest sentence)
    const pullQuote = extractPullQuote(allContent);

    // Generate key points from content
    const keyPoints = subpage.keyPoints || extractKeyPoints(subpage.title, allContent);
    
    // Featured image if available
    const featuredImageSrc = subpage.image || project.image;
    const featuredImageHTML = featuredImageSrc ? `
        <div class="subpage-featured-image">
            <img src="${featuredImageSrc}" alt="${subpage.title}" onerror="this.parentElement.style.display='none'">
        </div>
    ` : '';
    
    const valuePropHTML = `
        <div class="subpage-value-proposition">
            <div class="value-prop-label">Key Insight</div>
            <div class="value-prop-text">${valueProposition}</div>
        </div>
    `;
    
    const leadHTML = leadParagraph ? `
        <div class="subpage-lead">
            <p>${leadParagraph}</p>
        </div>
    ` : '';
    
    const pullQuoteHTML = pullQuote ? `
        <div class="subpage-pullquote">
            <div class="subpage-pullquote-text">${pullQuote}</div>
        </div>
    ` : '';

    const externalQuoteHTML = subpage.quote ? `
        <blockquote class="subpage-external-quote">
            <p class="subpage-external-quote-text">${subpage.quote}</p>
            ${subpage.quoteAttribution ? `<cite class="subpage-external-quote-attribution">— ${subpage.quoteAttribution}</cite>` : ''}
        </blockquote>
    ` : '';
    
    const keyPointsHTML = keyPoints.length > 0 ? `
        <div class="subpage-key-points">
            ${keyPoints.map((point, idx) => `
                <div class="key-point-item">
                    <span class="key-point-icon">${getKeyPointIcon(idx)}</span>
                    <div class="key-point-title">${point.title}</div>
                    <div class="key-point-description">${point.description}</div>
                </div>
            `).join('')}
        </div>
    ` : '';
    
    // Split body into sections for better readability
    const sectionsHTML = bodyParagraphs.length > 0 ? `
        <div class="subpage-sections">
            ${bodyParagraphs.map((para, idx) => {
                // Add dividers between sections
                const divider = idx > 0 && idx % 3 === 0 ? '<div class="subpage-divider"></div>' : '';
                return `
                    ${divider}
                    <div class="subpage-section">
                        <div class="subpage-text">
                            <p>${para.trim()}</p>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    ` : '';
    
    // Demo videos if available
    const videosHTML = subpage.videos && subpage.videos.length > 0 ? (() => {
        const getYouTubeId = url => {
            const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/);
            return m ? m[1] : null;
        };
        return `
        <div class="subpage-videos">
            <h3 class="subpage-videos-title">Feature Demo${subpage.videos.length > 1 ? 's' : ''}</h3>
            <div class="subpage-videos-grid">
                ${subpage.videos.map(video => {
                    const videoId = getYouTubeId(video.url);
                    const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
                    return `
                    <a class="subpage-video-item" href="${video.url}" target="_blank" rel="noopener noreferrer">
                        <div class="subpage-video-label">${video.title}</div>
                        <div class="subpage-video-thumb">
                            ${thumb ? `<img src="${thumb}" alt="${video.title}" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">` : ''}
                            <div class="subpage-video-play">
                                <svg viewBox="0 0 68 48" width="68" height="48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00"/>
                                    <path d="M45 24 27 14v20" fill="#fff"/>
                                </svg>
                            </div>
                            <div class="subpage-video-overlay">Watch on YouTube</div>
                        </div>
                    </a>
                    `;
                }).join('')}
            </div>
        </div>
        `;
    })() : '';

    // CTA to return to project
    const ctaHTML = `
        <div class="subpage-cta">
            <div class="subpage-cta-title">Explore More About ${project.title}</div>
            <div class="subpage-cta-text">Discover the full project details, methodology, and results.</div>
            <a href="#" class="subpage-cta-button" data-project-id="${projectId}">View Full Project</a>
        </div>
    `;
    
    pageContent.innerHTML = `
        <div class="reading-progress">
            <div class="reading-progress-bar" id="readingProgressBar"></div>
        </div>
        <div class="subpage-detail-page">
            <div class="subpage-breadcrumb">
                <a href="#" class="breadcrumb-link" data-action="home">Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#" class="breadcrumb-link" data-dimension="${project.dimensions[0]}">${primaryDimension?.title || project.dimensions[0]}</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#" class="breadcrumb-link" data-project-id="${projectId}">${project.title}</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${subpage.title}</span>
            </div>
            
            <div class="subpage-hero">
                <div class="subpage-header">
                    <h1 class="subpage-title">${subpage.title}</h1>
                    <div class="subpage-meta-row">
                        <div class="subpage-project-info">
                            Part of <span class="subpage-project-name">${project.title}</span>
                        </div>
                        <span class="subpage-reading-time">${estimateReadingTime(subpage.content)} min read</span>
                    </div>
                </div>
                ${featuredImageHTML}
            </div>
            
            <div class="subpage-content">
                ${leadHTML}
                ${externalQuoteHTML}
                ${valuePropHTML}
                ${pullQuoteHTML}
                ${sectionsHTML}
                ${videosHTML}
                ${ctaHTML}
            </div>
        </div>
    `;

    // Setup breadcrumb navigation
    setupSubpageBreadcrumbs(projectId);
    
    // Setup CTA button click
    setTimeout(() => {
        const ctaButton = document.querySelector('.subpage-cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToProject(projectId);
            });
        }
    }, 50);
    
    // Setup reading progress indicator
    initReadingProgress();

    if (updateHistory) {
        window.history.pushState({ type: 'subpage', projectId: projectId, subpageId: subpageId }, '', `#project/${projectId}/${subpageId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Helper function to extract a pull quote
function extractPullQuote(content) {
    const sentences = content.split(/\.\s+/).filter(s => s.trim().length > 20);
    
    // Look for impactful sentences with keywords
    const keywords = ['enables', 'allows', 'provides', 'delivers', 'ensures', 'transforms', 'creates'];
    for (const sentence of sentences) {
        const lower = sentence.toLowerCase();
        for (const keyword of keywords) {
            if (lower.includes(keyword) && sentence.length > 50 && sentence.length < 200) {
                return sentence.trim() + '.';
            }
        }
    }
    
    // Fall back to longest meaningful sentence
    const meaningfulSentences = sentences.filter(s => s.length > 60 && s.length < 200);
    if (meaningfulSentences.length > 0) {
        return meaningfulSentences[0].trim() + '.';
    }
    
    return null;
}

// Helper function to extract key points
function extractKeyPoints(title, content) {
    const keyPoints = [];
    const lowerContent = content.toLowerCase();
    const lowerTitle = title.toLowerCase();
    
    // Identify what this feature does based on title
    if (lowerTitle.includes('review') || lowerTitle.includes('analysis')) {
        keyPoints.push({
            title: 'Automated Analysis',
            description: 'Instantly processes and evaluates content'
        });
        keyPoints.push({
            title: 'Smart Insights',
            description: 'Provides actionable recommendations'
        });
    } else if (lowerTitle.includes('chat') || lowerTitle.includes('conversation')) {
        keyPoints.push({
            title: 'Interactive Dialog',
            description: 'Natural conversation interface'
        });
        keyPoints.push({
            title: 'Context Aware',
            description: 'Understands your specific needs'
        });
    } else if (lowerTitle.includes('search') || lowerTitle.includes('find')) {
        keyPoints.push({
            title: 'Fast Discovery',
            description: 'Finds relevant information instantly'
        });
        keyPoints.push({
            title: 'Smart Matching',
            description: 'Understands context and intent'
        });
    } else if (lowerTitle.includes('workflow') || lowerTitle.includes('pipeline')) {
        keyPoints.push({
            title: 'Streamlined Process',
            description: 'Simplifies complex workflows'
        });
        keyPoints.push({
            title: 'Efficient Execution',
            description: 'Saves time and reduces errors'
        });
    }
    
    // Add generic benefits
    if (keyPoints.length < 3) {
        keyPoints.push({
            title: 'User Friendly',
            description: 'Intuitive interface and experience'
        });
    }
    if (keyPoints.length < 3 && lowerContent.includes('ai')) {
        keyPoints.push({
            title: 'AI Powered',
            description: 'Leverages advanced machine learning'
        });
    }
    
    return keyPoints.slice(0, 3); // Return max 3 key points
}

// Helper function to get icon for key points
function getKeyPointIcon(index) {
    const icons = ['⚡', '🎯', '💡', '🚀', '✨', '🔧'];
    return icons[index % icons.length];
}

// Initialize reading progress indicator
let _readingProgressHandler = null;

function initReadingProgress() {
    const progressBar = document.getElementById('readingProgressBar');
    if (!progressBar) return;

    if (_readingProgressHandler) {
        window.removeEventListener('scroll', _readingProgressHandler);
    }

    _readingProgressHandler = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    };

    window.addEventListener('scroll', _readingProgressHandler);
    _readingProgressHandler();
}

// ============================================
// TOC SCROLL-SPY
// ============================================
let _tocScrollHandler = null;

function initTocScrollSpy() {
    const tocLinks = document.querySelectorAll('.toc-link');
    if (tocLinks.length === 0) return;

    // Smooth-scroll on click
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.section;
            const target = document.getElementById(targetId);
            if (target) {
                const offset = target.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    if (_tocScrollHandler) {
        window.removeEventListener('scroll', _tocScrollHandler);
    }

    _tocScrollHandler = () => {
        const sections = document.querySelectorAll('.project-detail-section[id]');
        let currentId = '';
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < 160) {
                currentId = section.id;
            }
        });
        tocLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === currentId);
        });
    };

    window.addEventListener('scroll', _tocScrollHandler);
    _tocScrollHandler();
}

// Helper function to generate a value proposition
function generateValueProposition(title, content) {
    // Extract the essence of what this feature/component delivers
    const lowerTitle = title.toLowerCase();
    const lowerContent = content.toLowerCase();
    
    // Look for key action verbs in the first 2 sentences
    const firstSentences = content.split(/\.\s+/).slice(0, 2).join('. ');
    const lowerFirst = firstSentences.toLowerCase();
    
    // Extract value from common patterns
    if (lowerFirst.includes('enables') || lowerFirst.includes('allows')) {
        const match = firstSentences.match(/(?:enables|allows)[^.]+\./i);
        if (match) {
            let value = match[0].trim();
            // Clean up the sentence to focus on the value
            value = value.replace(/^(The\s+\w+\s+)?(enables|allows)\s+/i, '');
            value = value.charAt(0).toUpperCase() + value.slice(1);
            return value;
        }
    }
    
    if (lowerFirst.includes('provides')) {
        const match = firstSentences.match(/provides[^.]+\./i);
        if (match) {
            let value = match[0].trim();
            value = value.replace(/^(The\s+\w+\s+)?provides\s+/i, '');
            value = value.charAt(0).toUpperCase() + value.slice(1);
            return value;
        }
    }
    
    // Extract main action from the content
    const actionMatch = content.match(/(?:orchestrates|implements|delivers|manages|handles|processes|creates|builds)[^.]+\./i);
    if (actionMatch) {
        return actionMatch[0].trim();
    }
    
    // Generate based on title patterns - make it more direct and benefit-focused
    if (lowerTitle.includes('review') || lowerTitle.includes('analysis')) {
        return 'Automates review processes to save time and ensure consistency.';
    } else if (lowerTitle.includes('chat') || lowerTitle.includes('conversation')) {
        return 'Provides instant, context-aware assistance for faster decision-making.';
    } else if (lowerTitle.includes('search') || lowerTitle.includes('find')) {
        return 'Finds relevant information instantly across your entire document library.';
    } else if (lowerTitle.includes('workflow') || lowerTitle.includes('pipeline')) {
        return 'Streamlines complex processes into a simple, efficient workflow.';
    } else if (lowerTitle.includes('processing') || lowerTitle.includes('data')) {
        return 'Processes data accurately and efficiently with built-in validation.';
    } else if (lowerTitle.includes('interface') || lowerTitle.includes('ui') || lowerTitle.includes('ux')) {
        return 'Makes complex tasks simple with an intuitive, user-friendly interface.';
    }
    
    // Default - extract first meaningful sentence
    const firstSentence = content.split(/\.\s+/)[0] + '.';
    if (firstSentence.length < 150) {
        return firstSentence;
    }
    
    return `Delivers ${title.toLowerCase()} with reliability and ease of use.`;
}

function setupSubpageBreadcrumbs(projectId) {
    // Add click handlers to breadcrumb
    setTimeout(() => {
        const breadcrumbLinks = document.querySelectorAll('.subpage-breadcrumb .breadcrumb-link');
        breadcrumbLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.dataset.action;
                const dimensionId = this.dataset.dimension;
                const projectIdAttr = this.dataset.projectId;
                
                if (action === 'home') {
                    navigateToHome();
                } else if (dimensionId) {
                    navigateToDimension(dimensionId);
                } else if (projectIdAttr) {
                    navigateToProject(parseInt(projectIdAttr));
                }
            });
        });
    }, 50);
}

// ============================================
// PROJECT FEATURE SLIDERS
// ============================================
function initFeatureSliders() {
    const sliders = document.querySelectorAll('.project-feature-slider');
    sliders.forEach(slider => {
        const track = slider.querySelector('.project-feature-track');
        const cards = slider.querySelectorAll('.project-feature-card');
        const prevBtn = slider.querySelector('[data-direction="prev"]');
        const nextBtn = slider.querySelector('[data-direction="next"]');
        const dotsContainer = slider.nextElementSibling;
        const headerCounter = slider.previousElementSibling?.querySelector('.project-gallery-counter');
        if (!track || cards.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

        let currentIndex = 0;

        const update = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === cards.length - 1;

            const dots = dotsContainer.querySelectorAll('.feature-slider-dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
                dot.setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
            });

            if (headerCounter) {
                const current = headerCounter.querySelector('.current-index');
                if (current) current.textContent = String(currentIndex + 1);
            }
        };

        // Create dots only once
        if (!dotsContainer.hasChildNodes()) {
            cards.forEach((_, idx) => {
                const dot = document.createElement('button');
                dot.className = 'feature-slider-dot';
                dot.type = 'button';
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', `Go to feature ${idx + 1}`);
                dot.addEventListener('click', () => {
                    currentIndex = idx;
                    update();
                });
                dotsContainer.appendChild(dot);
            });
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                update();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                update();
            }
        });

        // Keyboard support
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextBtn.click();
            }
        });

        // Initialize
        update();
    });
}

// ============================================
// MARKDOWN DOCUMENT VIEWER
// ============================================
function markdownToHtml(md) {
    let html = md
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^---+$/gm, '<hr>');

    // Wrap consecutive list items in <ul>
    html = html.replace(/((?:^- .+\n?)+)/gm, (match) => {
        const items = match.trim().split('\n').map(line =>
            `<li>${line.replace(/^- /, '')}</li>`
        ).join('');
        return `<ul>${items}</ul>`;
    });

    // Wrap plain text lines in <p>
    html = html.replace(/^(?!<[hup\/<]|<hr)(.+)$/gm, '<p>$1</p>');

    return html;
}

function navigateToMarkdownDoc(url, label) {
    const pageContainer = document.getElementById('pageContainer');
    const pageContent = document.getElementById('pageContent');
    const mainSections = document.querySelectorAll('.section, .footer');

    if (!pageContainer || !pageContent) return;

    pageContent.innerHTML = '<div class="markdown-doc-loading">Loading...</div>';
    mainSections.forEach(section => { section.style.display = 'none'; });
    pageContainer.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetch(url)
        .then(r => r.text())
        .then(text => {
            pageContent.innerHTML = `
                <div class="markdown-doc">
                    <div class="markdown-doc-body">${markdownToHtml(text)}</div>
                </div>
            `;
        })
        .catch(() => {
            pageContent.innerHTML = '<div class="markdown-doc-loading">Failed to load document.</div>';
        });
}

document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href$=".txt"]');
    if (!link) return;
    e.preventDefault();
    const label = link.textContent.trim();
    navigateToMarkdownDoc(link.getAttribute('href'), label);
});

