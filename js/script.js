// ============================================
// PORTFOLIO SCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSectionFocus();
    initDynamicContent();
    initScrollAnimations();
    // initContactForm() is now called from renderContact()
    initRouting();
    setCurrentYear();
});

// ============================================
// NAVIGATION
// ============================================
function motionBehavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function initNavigation() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    if (!toggle || !menu || !navbar) return;
    const mobile = window.matchMedia('(max-width: 768px)');
    let open = false;

    const setOpen = (next, restoreFocus = false) => {
        open = mobile.matches && next;
        menu.classList.toggle('active', open);
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        menu.inert = mobile.matches && !open;
        if (menu.inert) menu.setAttribute('aria-hidden', 'true');
        else menu.removeAttribute('aria-hidden');
        document.body.classList.toggle('nav-open', open);
        document.documentElement.classList.toggle('nav-open', open);
        if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(!open));
    mobile.addEventListener('change', () => setOpen(false));
    setOpen(false);

    document.addEventListener('keydown', event => {
        if (!open) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            setOpen(false, true);
        } else if (event.key === 'Tab') {
            const targets = [toggle, ...menu.querySelectorAll('a')];
            const first = targets[0];
            const last = targets[targets.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
            }
        }
    });

    document.addEventListener('click', event => {
        const link = event.target.closest('.nav-link, .nav-logo, [data-scroll-target]');
        if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#') || href.includes('/')) return;
        const section = document.getElementById(href.slice(1));
        if (!section) return;
        event.preventDefault();
        setOpen(false);
        navigateToHome(true, section.id);
    });
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
}

// ============================================
// HOME SECTION SCROLLING
// ============================================
function initSectionFocus() {
    const updateEditingState = () => {
        const active = document.activeElement;
        const editing = active?.matches('input, textarea, select, [contenteditable="true"]') && active.closest('.contact-form');
        document.documentElement.classList.toggle('editing-contact', Boolean(editing));
    };
    document.addEventListener('focusin', updateEditingState);
    document.addEventListener('focusout', () => requestAnimationFrame(updateEditingState));
}

function setHomeView(isHome) {
    document.documentElement.classList.toggle('home-view', isHome);
    if (!isHome) document.documentElement.classList.remove('editing-contact');
}

function scrollToHomeSection(section, behavior = motionBehavior()) {
    window.scrollTo({ top: Math.max(0, section.getBoundingClientRect().top + window.scrollY), behavior });
}

// ============================================
// DYNAMIC CONTENT
// ============================================

function initDynamicContent() {
    renderAbout();
    renderDimensions();
    renderProjects();
    initProjectCarousel();
    initProjectFiltering();
    renderExperience();
    renderContact();
}

function renderAbout() {
    const aboutContent = document.getElementById('aboutContent');
    if (!aboutContent || !aboutData) return;
    aboutContent.innerHTML = `
        <div class="about-text">
            <p class="hero-eyebrow">Engineering · Research · Human experience</p>
            <h1 class="about-name">${aboutData.name}</h1>
            <p class="about-tagline">${aboutData.tagline}</p>
            <p class="about-bio">${aboutData.bio}</p>
            <div class="about-actions">
                <a class="about-action-primary" href="#projects" data-scroll-target>Explore my work <span aria-hidden="true">↗</span></a>
                <a class="about-action-secondary" href="#contact" data-scroll-target>Get in touch <span aria-hidden="true">→</span></a>
            </div>
        </div>
        <figure class="about-image-container">
            <img src="${aboutData.profileImage}" alt="Birkan with Furhat, a social robot" class="about-image" width="512" height="512" loading="eager" decoding="async" fetchpriority="high">
            <figcaption>Exploring the human side of technology.</figcaption>
        </figure>
    `;
}

function renderDimensions() {
    const grid = document.getElementById('dimensionsGrid');
    if (!grid || !dimensionsData) return;
    grid.innerHTML = Object.values(dimensionsData).map((dimension, index) => `
        <a href="#dimension/${dimension.id}" class="dimension-card" data-dimension="${dimension.id}" aria-label="Explore ${dimension.title}">
            <span class="dimension-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
            <div class="dimension-card-content">
                <h3 class="dimension-title">${dimension.title}</h3>
                <p class="dimension-subtitle">${dimension.subtitle}</p>
                <p class="dimension-summary">${dimension.summary || dimension.pageContent.highlights[0]}</p>
            </div>
            <span class="dimension-arrow" aria-hidden="true">↗</span>
        </a>
    `).join('');
    grid.querySelectorAll('.dimension-card').forEach(link => {
        link.addEventListener('click', event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            navigateToDimension(link.dataset.dimension);
        });
    });
}

function renderProjects() {
    const track = document.getElementById('projectsGrid');
    if (!track || !projectsData) return;
    // Cross-listed projects appear once, in their highest-priority category.
    const categoryPriority = { biomedical: 0, hci: 1, startup: 2 };
    const categoryRank = project => Math.min(3, ...project.dimensions.map(id => categoryPriority[id] ?? 3));
    // Date ranges use their latest year; equal dates keep their existing order.
    const latestYear = project => Math.max(0, ...(String(project.date || '').match(/\b(?:19|20)\d{2}\b/g) || []).map(Number));
    const sortedProjects = [...projectsData].sort((a, b) => categoryRank(a) - categoryRank(b) || latestYear(b) - latestYear(a));
    track.innerHTML = sortedProjects.map((project, index) => {
        const title = project.cardTitle || project.title;
        const summary = project.cardSummary || project.description;
        const categories = [...project.dimensions].sort((a, b) => (categoryPriority[a] ?? 3) - (categoryPriority[b] ?? 3)).map(id => dimensionsData[id]?.title || id).join(' / ');
        return `
            <article class="project-card" data-dimensions="${project.dimensions.join(',')}" data-project-id="${project.id}" aria-roledescription="slide" aria-label="${index + 1} of ${sortedProjects.length}">
                <a href="#project/${project.id}" class="project-card-link" data-project-id="${project.id}" aria-labelledby="project-title-${project.id}">
                    <div class="project-card-media">
                        <img src="${project.image}" alt="" class="project-image" width="960" height="600" loading="lazy" decoding="async" onerror="this.hidden=true">
                    </div>
                    <div class="project-card-content">
                        <div class="project-card-meta"><p class="project-category">${categories}</p><span class="project-card-date">${project.date}</span></div>
                        <h3 class="project-title" id="project-title-${project.id}">${title}</h3>
                        <p class="project-description">${summary}</p>
                        <div class="project-card-footer"><span>Details</span><span aria-hidden="true">↗</span></div>
                    </div>
                </a>
            </article>
        `;
    }).join('');
    track.querySelectorAll('.project-card-link').forEach(link => {
        link.addEventListener('click', event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            navigateToProject(Number(link.dataset.projectId));
        });
    });
}

let syncProjectGallery = () => {};

function initProjectCarousel() {
    const track = document.getElementById('projectsGrid');
    const previous = document.getElementById('projectsPrev');
    const next = document.getElementById('projectsNext');
    const position = document.getElementById('projectPosition');
    if (!track || !previous || !next || !position) return;
    const slides = () => [...track.querySelectorAll('.project-card')].filter(card => !card.hidden);
    const nearestIndex = cards => {
        const origin = track.getBoundingClientRect().left;
        let nearest = 0;
        cards.forEach((card, index) => {
            if (Math.abs(card.getBoundingClientRect().left - origin) < Math.abs(cards[nearest].getBoundingClientRect().left - origin)) nearest = index;
        });
        return nearest;
    };
    const update = () => {
        const cards = slides();
        const frame = track.getBoundingClientRect();
        const inView = cards.map((card, index) => ({ bounds: card.getBoundingClientRect(), index }))
            .filter(({ bounds }) => Math.min(bounds.right, frame.right) - Math.max(bounds.left, frame.left) >= bounds.width * 0.5);
        const first = inView.length ? inView[0].index + 1 : (cards.length ? nearestIndex(cards) + 1 : 0);
        const last = inView.length ? inView[inView.length - 1].index + 1 : first;
        const range = first === last ? String(first).padStart(2, '0') : `${String(first).padStart(2, '0')}–${String(last).padStart(2, '0')}`;
        position.textContent = `${range} / ${String(cards.length).padStart(2, '0')}`;
        previous.disabled = !cards.length || track.scrollLeft <= 2;
        next.disabled = !cards.length || track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    };
    const goTo = index => {
        const cards = slides();
        if (!cards.length) return;
        const card = cards[Math.max(0, Math.min(index, cards.length - 1))];
        const left = track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left;
        track.scrollTo({ left, behavior: motionBehavior() });
        requestAnimationFrame(update);
    };
    previous.addEventListener('click', () => goTo(nearestIndex(slides()) - 1));
    next.addEventListener('click', () => goTo(nearestIndex(slides()) + 1));
    track.addEventListener('keydown', event => {
        if (event.target !== track) return;
        const index = nearestIndex(slides());
        if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(index - 1); }
        else if (event.key === 'ArrowRight') { event.preventDefault(); goTo(index + 1); }
        else if (event.key === 'Home') { event.preventDefault(); goTo(0); }
        else if (event.key === 'End') { event.preventDefault(); goTo(slides().length - 1); }
    });
    let queued = false;
    track.addEventListener('scroll', () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => { queued = false; update(); });
    }, { passive: true });
    window.addEventListener('resize', update);
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
    syncProjectGallery = (reset = false) => {
        if (reset) track.scrollTo({ left: 0, behavior: 'auto' });
        requestAnimationFrame(update);
    };
    update();
}

function renderExperience() {
    const timeline = document.getElementById('timeline');
    if (!timeline || !experienceData) return;
    const sorted = [...experienceData].sort((a, b) => b.sort - a.sort);
    const groups = [
        { id: 'workExperienceHeading', label: 'Work & research', items: sorted.filter(item => item.type !== 'education') },
        { id: 'educationHeading', label: 'Education', items: sorted.filter(item => item.type === 'education') }
    ];
    timeline.innerHTML = `<div class="experience-groups">${groups.map(group => `
        <section class="experience-group" aria-labelledby="${group.id}">
            <h3 class="experience-group-label" id="${group.id}">${group.label}</h3>
            <div class="exp-list">${group.items.map(item => `
                <div class="exp-row">
                    <div class="exp-row-main"><h4 class="exp-row-title">${item.title}</h4><span class="exp-row-org">${item.organization}</span></div>
                    <span class="exp-row-period">${item.period}</span>
                </div>
            `).join('')}</div>
        </section>
    `).join('')}</div>`;
}

function renderContact() {
    const contactContent = document.getElementById('contactContent');
    if (!contactContent || !contactData) return;

    const socialLinksHTML = Object.entries(contactData.socialLinks)
        .filter(([key, value]) => value) // Only show if link exists
        .map(([platform, url]) => {
            const label = platform.charAt(0).toUpperCase() + platform.slice(1);
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${label}">
                ${label}
            </a>`;
        }).join('');

    const phoneHTML = contactData.phone ? `<div class="contact-detail"><span class="contact-detail-label">Phone</span><span>${contactData.phone}</span></div>` : '';

    contactContent.innerHTML = `
        <div class="contact-info">
            <div class="contact-details-card">
                <div class="contact-primary">
                    <span class="contact-detail-label">Primary email</span>
                    <button type="button" class="contact-copy-email" data-copy-email="${contactData.email}" aria-label="Copy ${contactData.email}">${contactData.email}</button>
                    <span class="contact-copy-status" role="status" aria-live="polite"></span>
                </div>
                <div class="contact-details-secondary">
                    ${contactData.alternateEmail ? `<div class="contact-detail"><span class="contact-detail-label">University email</span><button type="button" class="contact-copy-email" data-copy-email="${contactData.alternateEmail}" aria-label="Copy ${contactData.alternateEmail}">${contactData.alternateEmail}</button><span class="contact-copy-status" role="status" aria-live="polite"></span></div>` : ''}
                    ${contactData.location ? `<div class="contact-detail"><span class="contact-detail-label">Based in</span><span>${contactData.location}</span></div>` : ''}
                    ${phoneHTML}
                </div>
            </div>
            <p class="contact-copy-hint">Click an email address to copy it.</p>
            <div class="social-links">${socialLinksHTML}</div>
        </div>
        <form class="contact-form" id="contactForm" aria-label="Prepare an email">
            <div class="contact-form-row">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" autocomplete="name" placeholder="Your name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" autocomplete="email" placeholder="you@example.com" required>
                </div>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="3" placeholder="Tell me what you have in mind." required></textarea>
            </div>
            <div class="contact-form-footer">
                <button type="submit" class="submit-btn">Compose email <span aria-hidden="true">↗</span></button>
                <p class="form-note">Opens a draft in your email app.</p>
            </div>
        </form>
    `;

    contactContent.querySelectorAll('.contact-copy-email').forEach(copyEmailLink => {
        const copyEmailStatus = copyEmailLink.closest('.contact-primary, .contact-detail')?.querySelector('.contact-copy-status');
        copyEmailLink.addEventListener('click', async (event) => {
            event.preventDefault();
            const email = copyEmailLink.dataset.copyEmail;
            let copied = false;
            try {
                if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(email);
                    copied = true;
                }
            } catch (_) {}
            if (!copied) {
                const field = document.createElement('textarea');
                field.value = email;
                field.setAttribute('readonly', '');
                field.style.position = 'fixed';
                field.style.opacity = '0';
                document.body.appendChild(field);
                field.select();
                try { copied = document.execCommand('copy'); } catch (_) {}
                field.remove();
                copyEmailLink.focus({ preventScroll: true });
            }
            if (copyEmailStatus) copyEmailStatus.textContent = copied ? 'Email copied to clipboard.' : 'Copy failed. Select the address to copy it.';
        });
    });

    // Initialize form after it's rendered
    initContactForm();
}

// ============================================
// PROJECT FILTERING
// ============================================
function initProjectFiltering() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#projectsGrid .project-card');
    const status = document.getElementById('projectFilterStatus');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(item => {
                const active = item === button;
                item.classList.toggle('active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            let count = 0;
            cards.forEach(card => {
                const show = button.dataset.filter === 'all' || card.dataset.dimensions.split(',').includes(button.dataset.filter);
                card.hidden = !show;
                if (show) count++;
            });
            [...cards].filter(card => !card.hidden).forEach((card, index) => card.setAttribute('aria-label', `${index + 1} of ${count}`));
            syncProjectGallery(true);
            if (status) status.textContent = `${count} ${count === 1 ? 'project' : 'projects'} in ${button.textContent.trim()}.`;
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.section').forEach(section => section.classList.add('fade-in-visible'));
        initScrollProgress();
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section').forEach(section => observer.observe(section));

    initScrollSpy();
    initScrollProgress();
}

function initScrollSpy() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
    if (!navLinks.length) return;

    const linkBySection = new Map();
    navLinks.forEach(link => {
        const id = link.getAttribute('href').slice(1);
        const section = document.getElementById(id);
        if (section) linkBySection.set(section, link);
    });
    if (!linkBySection.size) return;

    const setActive = (link) => {
        navLinks.forEach(l => {
            if (l === link) {
                l.setAttribute('aria-current', 'page');
                l.classList.add('active');
            } else {
                l.removeAttribute('aria-current');
                l.classList.remove('active');
            }
        });
    };

    const spy = new IntersectionObserver((entries) => {
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const link = linkBySection.get(visible.target);
        if (link) setActive(link);
    }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    linkBySection.forEach((_, section) => spy.observe(section));
}

function initScrollProgress() {
    let bar = document.getElementById('scrollProgress');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'scrollProgress';
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);
    }
    const update = () => {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        bar.style.transform = `scaleX(${pct / 100})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
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

        const subject = encodeURIComponent('Contact from portfolio');
        const body = encodeURIComponent(`Name: ${name}
Email: ${email}

${message}`);
        window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
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
let homeReturnFocus = null;
let homeReturnY = 0;

function rememberHomePosition() {
    if (!document.getElementById('pageContainer')?.classList.contains('hidden')) return;
    homeReturnY = window.scrollY;
    homeReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    window.history.replaceState({ type: 'home' }, '', window.location.href);
}

function focusDetailPage() {
    const heading = document.querySelector('#pageContent h1');
    if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        document.title = `${heading.textContent} | Birkan Celik`;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
}

function initRouting() {
    document.getElementById('backButton')?.addEventListener('click', () => navigateToHome());
    window.addEventListener('popstate', event => {
        const state = event.state;
        if (state?.type === 'dimension') navigateToDimension(state.id, false);
        else if (state?.type === 'project') navigateToProject(state.id, false);
        else if (state?.type === 'subpage') navigateToSubpage(state.projectId, state.subpageId, false);
        else navigateToHome(false, state?.sectionId || null);
    });
    handleInitialRoute();
}

function handleInitialRoute() {
    const parts = window.location.hash.slice(1).split('/');
    if (parts[0] === 'dimension' && dimensionsData[parts[1]]) {
        window.history.replaceState({ type: 'dimension', id: parts[1] }, '', window.location.href);
        navigateToDimension(parts[1], false);
    } else if (parts[0] === 'project' && projectsData.some(project => project.id === Number(parts[1]))) {
        const projectId = Number(parts[1]);
        const project = projectsData.find(item => item.id === projectId);
        const subpage = project.details?.subpages?.find(item => item.id === parts[2]);
        if (subpage) {
            window.history.replaceState({ type: 'subpage', projectId, subpageId: subpage.id }, '', window.location.href);
            navigateToSubpage(projectId, subpage.id, false);
        } else {
            window.history.replaceState({ type: 'project', id: projectId }, '', window.location.href);
            navigateToProject(projectId, false);
        }
    } else {
        const section = document.getElementById(parts[0]);
        const sectionId = section?.classList.contains('section') ? section.id : 'about';
        window.history.replaceState({ type: 'home', sectionId }, '', `#${sectionId}`);
        setHomeView(true);
        if (sectionId !== 'about') navigateToHome(false, sectionId);
    }
}

function navigateToHome(updateHistory = true, sectionId = null) {
    setHomeView(true);
    const page = document.getElementById('pageContainer');
    const wasDetail = page && !page.classList.contains('hidden');
    page?.classList.add('hidden');
    document.querySelectorAll('.section, .footer').forEach(section => { section.style.display = ''; });
    document.title = 'Birkan Celik — Engineering, Research & AI';
    if (updateHistory) {
        const state = { type: 'home', ...(sectionId ? { sectionId } : {}) };
        const hash = sectionId ? `#${sectionId}` : '#projects';
        if (wasDetail) window.history.pushState(state, '', hash);
        else window.history.replaceState(state, '', hash);
    }
    syncProjectGallery();
    if (sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const heading = section.querySelector('h1, h2');
        heading?.setAttribute('tabindex', '-1');
        heading?.focus({ preventScroll: true });
        scrollToHomeSection(section);
    } else if (homeReturnFocus?.isConnected && homeReturnFocus !== document.body) {
        window.scrollTo({ top: homeReturnY, behavior: 'auto' });
        homeReturnFocus.focus({ preventScroll: true });
    } else {
        const projects = document.getElementById('projects');
        const heading = document.getElementById('projectsHeading');
        heading?.setAttribute('tabindex', '-1');
        heading?.focus({ preventScroll: true });
        if (projects) scrollToHomeSection(projects, 'auto');
    }
}

function navigateToDimension(dimensionId, updateHistory = true) {
    const dimension = dimensionsData[dimensionId];
    if (!dimension) return;

    const pageContainer = document.getElementById('pageContainer');
    const pageContent = document.getElementById('pageContent');
    const mainSections = document.querySelectorAll('.section, .footer');

    if (!pageContainer || !pageContent) return;
    if (updateHistory) rememberHomePosition();
    setHomeView(false);

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
        <a href="#project/${project.id}" class="dimension-project-card ${hasDetails}" data-project-id="${project.id}">
            <div class="dimension-project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%230F0E0D%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23FAFAF9%22 font-family=%22Arial%22 font-size=%2218%22%3EProject Image%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="dimension-project-content">
                <div class="dimension-project-header">
                    <h3 class="dimension-project-title">${project.title}</h3>
                    ${project.details ? '<span class="project-details-badge">View project ↗</span>' : ''}
                </div>
                <p class="dimension-project-description">${project.description}</p>
                <div class="dimension-project-footer">
                    <div class="dimension-project-tech">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="dimension-project-date">${project.date}</div>
                </div>
            </div>
        </a>
    `;
    }).join('');

    pageContent.innerHTML = `
        <div class="dimension-page">
            <div class="dimension-breadcrumb">
                <a href="#projects" class="breadcrumb-link" data-action="home">Portfolio</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${dimension.title}</span>
            </div>
            <div class="dimension-page-header">
                <div class="dimension-page-title-section">
                    <span class="detail-eyebrow">Areas of practice</span>
                    <h1 class="dimension-page-title">${dimension.title}</h1>
                    <p class="dimension-page-subtitle">${dimension.subtitle}</p>
                </div>
            </div>
            <div class="dimension-projects-section-top">
                <h2 class="dimension-projects-title">Selected projects</h2>
                <div class="dimension-projects-list">
                    ${projectsHTML}
                </div>
            </div>
            <div class="dimension-page-content">
                <div class="dimension-overview">
                    <h2>Overview</h2>
                    <p>${dimension.pageContent.overview}</p>
                </div>
                <div class="dimension-research-areas">
                    <h2>Research areas</h2>
                    <div class="research-areas-grid">
                        ${dimension.pageContent.researchAreas.map(area => `<span class="research-area-tag">${area}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelectorAll('.dimension-project-card').forEach(card => {
        card.addEventListener('click', function(event) {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            const projectId = parseInt(this.dataset.projectId);
            const project = projectsData.find(p => p.id === projectId);
            if (project && project.details) {
                navigateToProject(projectId);
            }
        });
    });

    const breadcrumbLink = document.querySelector('.dimension-breadcrumb .breadcrumb-link');
    if (breadcrumbLink) {
        breadcrumbLink.addEventListener('click', function(e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            navigateToHome();
        });
    }

    if (updateHistory) {
        window.history.pushState({ type: 'dimension', id: dimensionId }, '', `#dimension/${dimensionId}`);
    }

    focusDetailPage();
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
    if (updateHistory) rememberHomePosition();
    setHomeView(false);

    // Hide main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show page container
    pageContainer.classList.remove('hidden');

    const subpagesHTML = project.details.subpages && project.details.subpages.length > 0 ? `
        <div class="project-subpages">
            <h2>Explore the project</h2>
            <div class="subpages-grid">
                ${project.details.subpages.map((subpage, index) => {
                    // Get first sentence or first 120 chars as preview
                    const firstSentence = subpage.content.split(/\.\s+/)[0] + '.';
                    const preview = firstSentence.length > 150 ? subpage.content.substring(0, 147) + '...' : firstSentence;
                    
                    return `
                    <a href="#project/${project.id}/${subpage.id}" class="subpage-card" data-subpage-id="${subpage.id}">
                        <div class="subpage-card-header">
                            <span class="subpage-card-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
                            <h3>${subpage.title}</h3>
                        </div>
                        <p class="subpage-card-preview">${preview}</p>
                        <div class="subpage-card-footer">
                            <span class="subpage-link">Read more</span>
                        </div>
                    </a>
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
                                <img src="${item.src}" alt="${item.caption || `${project.title} feature ${index + 1}`}" loading="lazy" decoding="async" onerror="this.style.display='none'">
                            </div>
                            <div class="feature-card-body">
                                <span class="feature-card-index">Feature ${index + 1}</span>
                                ${item.caption ? `<p>${item.caption}</p>` : ''}
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
            <div class="feature-slider-dots" aria-label="Feature slides"></div>
        </section>
    ` : '';

    const primaryDimension = dimensionsData[project.dimensions[0]];
    const readingMinutes = estimateReadingTime(getProjectFullText(project));
    const leadOutcome = project.details?.results?.[0];

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
                <a href="#projects" class="breadcrumb-link" data-action="home">Portfolio</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#dimension/${project.dimensions[0]}" class="breadcrumb-link" data-dimension="${project.dimensions[0]}">${primaryDimension?.title || project.dimensions[0]}</a>
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
                        ${leadOutcome ? `<p class="project-lead-outcome"><span>At a glance</span>${leadOutcome}</p>` : ''}
                    </div>
                </div>
                <div class="project-detail-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" onerror="this.parentElement.style.display='none'">
                </div>
            </div>
            
            ${galleryHTML}
            <div class="project-detail-content-wrapper">
                ${tocHTML}
                <div class="project-detail-content">
                    <div class="project-detail-section" id="section-overview">
                        <h2>Overview</h2>
                        <p>${project.details.overview}</p>
                        ${project.details.teamPhoto ? `
                            <div class="project-team-photo">
                                <img src="${project.details.teamPhoto}" alt="${project.title} Team" loading="lazy" decoding="async" onerror="this.style.display='none'">
                                <p>The ${project.title} team</p>
                            </div>
                        ` : ''}
                    </div>
                    <div class="project-detail-section" id="section-problem">
                        <h2>The problem</h2>
                        <p>${project.details.problem}</p>
                    </div>
                    <div class="project-detail-section" id="section-solution">
                        <h2>The solution</h2>
                        <p>${project.details.solution}</p>
                    </div>
                    <div class="project-detail-section" id="section-methodology">
                        <h2>Methodology</h2>
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
                        <h2>Results</h2>
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
                        <h2>Collaborators</h2>
                        <ul class="collaborators-list">
                            ${project.details.collaborators.map(c => `
                            <li class="collaborator-item">
                                <span class="collaborator-name">${c.name}</span>
                                <span class="collaborator-role">${c.role}</span>
                                ${c.linkedin ? `<a href="${c.linkedin}" target="_blank" rel="noopener noreferrer" class="collaborator-linkedin">LinkedIn</a>` : ''}
                            </li>`).join('')}
                        </ul>
                    </div>` : ''}
                    ${subpagesHTML ? `<div id="section-explore" class="project-detail-section">${subpagesHTML}</div>` : ''}
                </div>
            </div>
        </div>
    `;

    initFeatureSliders();
    
    // Initialize reading progress indicator
    initReadingProgress();

    // Initialize TOC scroll-spy and click handlers
    initTocScrollSpy();

    if (project.details.subpages && project.details.subpages.length > 0) {
        document.querySelectorAll('.subpage-card').forEach(card => {
            card.addEventListener('click', function(event) {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                const subpageId = this.dataset.subpageId;
                navigateToSubpage(projectId, subpageId);
            });
        });
    }

    document.querySelectorAll('.project-breadcrumb .breadcrumb-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
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

    if (updateHistory) {
        window.history.pushState({ type: 'project', id: projectId }, '', `#project/${projectId}`);
    }

    focusDetailPage();
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
    if (updateHistory) rememberHomePosition();
    setHomeView(false);

    // Hide main sections
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show page container
    pageContainer.classList.remove('hidden');

    const dimension = dimensionsData[project.dimensions[0]];
    const primaryDimension = dimension;

    const contentParagraphs = subpage.content.split('\n\n').filter(p => p.trim());
    const leadParagraph = contentParagraphs[0] || '';
    const bodyParagraphs = contentParagraphs.slice(1);

    const featuredImageSrc = subpage.image || project.image;
    const featuredImageHTML = featuredImageSrc ? `
        <div class="subpage-featured-image">
            <img src="${featuredImageSrc}" alt="${subpage.title}" loading="lazy" decoding="async" onerror="this.parentElement.style.display='none'">
        </div>
    ` : '';

    const leadHTML = leadParagraph ? `
        <div class="subpage-lead">
            <p>${leadParagraph}</p>
        </div>
    ` : '';

    const externalQuoteHTML = subpage.quote ? `
        <blockquote class="subpage-external-quote">
            <p class="subpage-external-quote-text">${subpage.quote}</p>
            ${subpage.quoteAttribution ? `<cite class="subpage-external-quote-attribution">- ${subpage.quoteAttribution}</cite>` : ''}
        </blockquote>
    ` : '';

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
                            ${thumb ? `<img src="${thumb}" alt="${video.title}" loading="lazy" decoding="async" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">` : ''}
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

    const articles = project.details.subpages || [];
    const articleIndex = articles.findIndex(item => item.id === subpageId);
    const articleLink = (item, direction) => item ? `
        <a href="#project/${projectId}/${item.id}" class="article-step article-step-${direction}" data-subpage-id="${item.id}">
            <span class="article-step-label">${direction === 'previous' ? '← Previous article' : 'Next article →'}</span>
            <span class="article-step-title">${item.title}</span>
        </a>
    ` : '';
    const articleNavigationHTML = articles.length > 1 ? `
        <nav class="article-pagination" aria-label="Project articles">
            ${articleLink(articles[articleIndex - 1], 'previous')}
            ${articleLink(articles[articleIndex + 1], 'next')}
        </nav>
    ` : '';

    const ctaHTML = `
        <div class="subpage-cta">
            <span class="detail-eyebrow">Full case study</span>
            <h2 class="subpage-cta-title">${project.cardTitle || project.title}</h2>
            <p class="subpage-cta-text">Explore the methods, results, and project resources.</p>
            <a href="#project/${projectId}" class="subpage-cta-button" data-project-id="${projectId}">View project <span aria-hidden="true">↗</span></a>
        </div>
    `;
    
    pageContent.innerHTML = `
        <div class="reading-progress">
            <div class="reading-progress-bar" id="readingProgressBar"></div>
        </div>
        <div class="subpage-detail-page">
            <div class="subpage-breadcrumb">
                <a href="#projects" class="breadcrumb-link" data-action="home">Portfolio</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#dimension/${project.dimensions[0]}" class="breadcrumb-link" data-dimension="${project.dimensions[0]}">${primaryDimension?.title || project.dimensions[0]}</a>
                <span class="breadcrumb-separator">/</span>
                <a href="#project/${projectId}" class="breadcrumb-link" data-project-id="${projectId}">${project.title}</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${subpage.title}</span>
            </div>
            
            <div class="subpage-hero">
                <div class="subpage-header">
                    <span class="detail-eyebrow">Project notes</span>
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
                ${sectionsHTML}
                ${videosHTML}
                ${articleNavigationHTML}
                ${ctaHTML}
            </div>
        </div>
    `;

    setupSubpageBreadcrumbs(projectId);
    pageContent.querySelectorAll('.article-step').forEach(link => {
        link.addEventListener('click', event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            navigateToSubpage(projectId, link.dataset.subpageId);
        });
    });

    const ctaButton = document.querySelector('.subpage-cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            navigateToProject(projectId);
        });
    }
    
    // Setup reading progress indicator
    initReadingProgress();

    if (updateHistory) {
        window.history.pushState({ type: 'subpage', projectId: projectId, subpageId: subpageId }, '', `#project/${projectId}/${subpageId}`);
    }

    focusDetailPage();
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
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            const targetId = this.dataset.section;
            const target = document.getElementById(targetId);
            if (target) {
                const offset = target.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: offset, behavior: motionBehavior() });
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

function setupSubpageBreadcrumbs(projectId) {
    document.querySelectorAll('.subpage-breadcrumb .breadcrumb-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
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
                if (idx === currentIndex) {
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.removeAttribute('aria-current');
                }
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
