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

    const skillsHTML = aboutData.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');

    aboutContent.innerHTML = `
        <div class="about-image-container">
            <img src="${aboutData.profileImage}" alt="${aboutData.name}" class="about-image" onerror="this.style.display='none'">
        </div>
        <div class="about-text">
            <h1 class="about-name">${aboutData.name}</h1>
            <h2 class="about-title">${aboutData.title}</h2>
            <p class="about-bio">${aboutData.bio}</p>
            <div class="skills-container">
                ${skillsHTML}
            </div>
        </div>
    `;
}

function renderDimensions() {
    const dimensionsGrid = document.getElementById('dimensionsGrid');
    if (!dimensionsGrid || !dimensionsData) return;

    const dimensions = [dimensionsData.hci, dimensionsData.startup, dimensionsData.biomedical];
    
    dimensionsGrid.innerHTML = dimensions.map(dim => `
        <div class="dimension-card" data-dimension="${dim.id}">
            <div class="dimension-icon" style="background-color: ${dim.color}20; color: ${dim.color}">
                ${dim.icon}
            </div>
            <h3 class="dimension-title">${dim.title}</h3>
            <h4 class="dimension-subtitle">${dim.subtitle}</h4>
            <p class="dimension-description">${dim.description}</p>
        </div>
    `).join('');

    // Add click interaction to filter projects
    document.querySelectorAll('.dimension-card').forEach(card => {
        card.addEventListener('click', function() {
            const dimension = this.dataset.dimension;
            const filterBtn = document.querySelector(`[data-filter="${dimension}"]`);
            if (filterBtn) {
                // Trigger filter button click
                filterBtn.click();
                // Scroll to projects section
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    window.scrollTo({
                        top: projectsSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
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

        return `
            <div class="project-card" data-dimensions="${project.dimensions.join(',')}">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22Arial%22 font-size=%2218%22%3EProject Image%3C/text%3E%3C/svg%3E'">
                    <div class="project-overlay">
                        ${linksHTML}
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-dimensions">${dimensionsHTML}</div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">${techStackHTML}</div>
                    <div class="project-date">${project.date}</div>
                </div>
            </div>
        `;
    }).join('');

    // Reinitialize slider after projects are rendered
    setTimeout(() => {
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
    function getItemsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
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

    const itemsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
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

