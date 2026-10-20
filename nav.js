document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!navbar || !toggle || !menu) return;

    const closeMenu = () => {
        navbar.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    };

    toggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    menu.addEventListener('click', event => {
        if (event.target instanceof Element && event.target.closest('.nav-item')) {
            closeMenu();
        }
    });

    document.addEventListener('click', event => {
        if (event.target instanceof Node && !navbar.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navbar.classList.contains('nav-open')) {
            closeMenu();
            toggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 600) closeMenu();
    });
});
