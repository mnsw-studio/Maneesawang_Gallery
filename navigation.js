const siteNav = document.querySelector('.site-nav');
const menuToggle = siteNav?.querySelector('.menu-toggle');
const navMenu = siteNav?.querySelector('.site-nav__menu');

if (siteNav && menuToggle && navMenu) {
    const setMenuOpen = (isOpen) => {
        siteNav.classList.toggle('menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        menuToggle.textContent = isOpen ? '×' : '☰';
    };

    menuToggle.addEventListener('click', () => {
        setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    navMenu.addEventListener('click', (event) => {
        if (event.target instanceof HTMLAnchorElement) setMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
        if (!siteNav.contains(event.target)) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 640) setMenuOpen(false);
    });
}

const motionItems = document.querySelectorAll('.work-card, .about-fact, .about-note, .project-detail__art');

if (motionItems.length) {
    const itemIndexes = new Map();

    motionItems.forEach((item) => {
        const group = item.closest('.home-hero__work, .home-archive__grid, .gallery-grid, .about-facts, .project-detail__stage') || item.parentElement;
        const index = itemIndexes.get(group) || 0;
        itemIndexes.set(group, index + 1);
        item.classList.add('motion-reveal');
        item.style.setProperty('--motion-delay', `${Math.min(index * 70, 280)}ms`);
    });

    document.documentElement.classList.add('motion-ready');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        motionItems.forEach((item) => item.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        motionItems.forEach((item) => observer.observe(item));
    }
}
