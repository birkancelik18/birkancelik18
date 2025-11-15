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
    initContactForm();
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
                <div class="dimension-icon" style="background-color: ${dim.color}20; color: ${dim.color}">
                    ${dim.icon}
                </div>
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
                ${project.links.pdf ? `<a href="${project.links.pdf}" target="_blank" rel="noopener noreferrer" class="project-link">View PDF</a>` : ''}
            </div>
        ` : '';

        const techStackHTML = project.techStack.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Get key highlight from details if available
        const keyHighlight = project.details?.results?.[0] || project.details?.overview?.substring(0, 100) + '...' || '';
        const hasSubpages = project.details?.subpages && project.details.subpages.length > 0;
        
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
                    <p class="project-description">${project.description}</p>
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
        
        // Reinitialize slider after projects are rendered
        if (typeof initProjectsSlider === 'function') {
            initProjectsSlider();
        }
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
        </form>
    `;
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
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
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
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
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

        // Show success message
        alert('Thank you for your message! Your email client should open now.');
        contactForm.reset();
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
        window.history.pushState({ type: 'home' }, '', '#');
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
                <div class="dimension-page-icon" style="background-color: ${dimension.color}20; color: ${dimension.color}">
                    ${dimension.icon}
                </div>
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

    const dimension = dimensionsData[project.dimensions[0]];
    const dimensionColor = dimension ? dimension.color : '#6366F1';

    const subpagesHTML = project.details.subpages && project.details.subpages.length > 0 ? `
        <div class="project-subpages">
            <h3>Learn More</h3>
            <div class="subpages-grid">
                ${project.details.subpages.map(subpage => `
                    <div class="subpage-card" data-subpage-id="${subpage.id}">
                        <h4>${subpage.title}</h4>
                        <p>${subpage.content.substring(0, 150)}...</p>
                        <span class="subpage-link">Read more →</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    const linksHTML = project.links ? `
        <div class="project-detail-links">
            ${project.links.live ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="project-detail-link">Live Demo</a>` : ''}
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-detail-link">GitHub</a>` : ''}
            ${project.links.pdf ? `<a href="${project.links.pdf}" target="_blank" rel="noopener noreferrer" class="project-detail-link">View PDF</a>` : ''}
        </div>
    ` : '';

    // Create quick summary box
    const quickSummary = `
        <div class="project-quick-summary" style="border-left: 4px solid ${dimensionColor}">
            <div class="summary-item">
                <span class="summary-label">Problem</span>
                <span class="summary-text">${project.details.problem.substring(0, 120)}${project.details.problem.length > 120 ? '...' : ''}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Solution</span>
                <span class="summary-text">${project.details.solution.substring(0, 120)}${project.details.solution.length > 120 ? '...' : ''}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Key Results</span>
                <div class="summary-results">
                    ${project.details.results.slice(0, 3).map(r => `<span class="summary-result-badge">${r.substring(0, 60)}${r.length > 60 ? '...' : ''}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    const primaryDimension = dimensionsData[project.dimensions[0]];
    
    pageContent.innerHTML = `
        <div class="project-detail-page">
            <div class="project-breadcrumb">
                <a href="#" class="breadcrumb-link" data-action="home">Home</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#" class="breadcrumb-link" data-dimension="${project.dimensions[0]}">${primaryDimension?.title || project.dimensions[0]}</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${project.title}</span>
            </div>
            <div class="project-detail-header" style="border-left: 4px solid ${dimensionColor}">
                <div class="project-detail-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%230F0E0D%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23FAFAF9%22 font-family=%22Arial%22 font-size=%2218%22%3EProject Image%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="project-detail-title-section">
                    <div class="project-detail-dimensions">
                        ${project.dimensions.map(dim => `<span class="project-dimension-tag" style="background-color: ${dimensionsData[dim]?.color}20; color: ${dimensionsData[dim]?.color}">${dimensionsData[dim]?.title || dim}</span>`).join('')}
                    </div>
                    <h1 class="project-detail-title">${project.title}</h1>
                    <div class="project-detail-meta">
                        <span class="project-detail-date">${project.date}</span>
                        <div class="project-detail-tech">
                            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    ${linksHTML}
                </div>
            </div>
            ${quickSummary}
            <div class="project-detail-content">
                <div class="project-detail-section">
                    <h3>Overview</h3>
                    <p>${project.details.overview}</p>
                </div>
                <div class="project-detail-section">
                    <h3>The Problem</h3>
                    <p>${project.details.problem}</p>
                </div>
                <div class="project-detail-section">
                    <h3>The Solution</h3>
                    <p>${project.details.solution}</p>
                </div>
                <div class="project-detail-section">
                    <h3>Methodology</h3>
                    <ul class="methodology-list">
                        ${project.details.methodology.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-detail-section">
                    <h3>Results</h3>
                    <ul class="results-list">
                        ${project.details.results.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                ${subpagesHTML}
            </div>
        </div>
    `;

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
    const dimensionColor = dimension ? dimension.color : '#6366F1';
    const primaryDimension = dimension;
    
    pageContent.innerHTML = `
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
            <div class="subpage-header" style="border-left: 4px solid ${dimensionColor}">
                <h1 class="subpage-title">${subpage.title}</h1>
                <div class="subpage-project-info">
                    <span class="subpage-project-name">From: ${project.title}</span>
                </div>
            </div>
            <div class="subpage-content">
                <div class="subpage-text">
                    ${subpage.content.split('\n').map(p => `<p>${p}</p>`).join('')}
                </div>
            </div>
        </div>
    `;

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

    if (updateHistory) {
        window.history.pushState({ type: 'subpage', projectId: projectId, subpageId: subpageId }, '', `#project/${projectId}/${subpageId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

