const projects = [
    { key: 'arthur', title: 'Arthur', year: '2022', image: 'content/Arthur.png', alt: 'Arthur identity' },
    { key: 'sra', title: 'SRA', year: '2026', image: 'content/Sentinel Risk Assurance.png', alt: 'Sentinel Risk Assurance identity' },
    { key: 'wingtach', title: 'Wingtach', year: '2026', image: 'content/Wingtach.png', alt: 'Wingtach identity' },
    { key: 'av', title: 'A&V', year: '2026', image: 'content/A&V logo.png', alt: 'A&V identity' },
    { key: 'fc', title: 'FC', year: '2026', image: 'content/FC.png', alt: 'FC identity' },
    { key: 'bangpost', title: 'Bangpost', year: '2026', image: 'content/Bangpost.png', alt: 'Bangpost identity' },
    { key: 'bdt', title: 'BDT', year: '2026', image: 'content/BDT.png', alt: 'BDT identity' },
    { key: '84th KU', title: '(Contest) 84th Kasetsart University', year: '2026', image: 'content/84th KU English Primary.png', alt: '84th KU visual identity' },
    { key: 'd-digital', title: 'D Digital', year: '2026', image: 'content/D Digital.png', alt: 'D Digital identity' },
    { key: 'mass-com', title: 'Mass Com', year: '2026', image: 'content/Mass Com.png', alt: 'Mass Com identity' },
    { key: 'crown', title: 'Crown Street', year: '2026', image: 'content/Crown-streetLogo.png', alt: 'Crown Street logo' },
    { key: 'kia', title: 'KIA', year: '2025', image: 'content/KIALogo-2.png', alt: 'KIA logo' },
    { key: 'maneesawang', title: 'Maneesawang', year: '2025', image: 'content/Maneesawang.webp', alt: 'Maneesawang identity' },
    { key: 'sf', title: 'SF', year: '2026', image: 'content/SF.webp', alt: 'SF identity' },
    { key: 'a', title: 'A', year: '2026', image: 'content/A.webp', alt: 'A visual identity' },
    { key: 's', title: 'S', year: '2025', image: 'content/S.webp', alt: 'S visual identity' },
];

window.MSNWProjects = projects;

const projectCard = (project, isGalleryCard) => {
    const link = document.createElement('a');
    link.className = isGalleryCard ? 'work-card gallery-card__link' : 'work-card';
    link.href = `project-detail.html?project=${encodeURIComponent(project.key)}`;
    link.setAttribute('aria-label', `View ${project.title}, ${project.year}`);

    const imageFrame = document.createElement('span');
    imageFrame.className = 'work-card__image';

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = isGalleryCard ? project.alt : '';
    image.loading = 'lazy';
    image.decoding = 'async';
    imageFrame.append(image);

    const caption = document.createElement('span');
    caption.className = 'work-card__caption';

    const title = document.createElement('span');
    title.textContent = project.title;

    const year = document.createElement('span');
    year.textContent = project.year;

    caption.append(title, year);
    link.append(imageFrame, caption);

    if (!isGalleryCard) return link;

    const article = document.createElement('article');
    article.className = 'gallery-card';
    article.append(link);
    return article;
};

const featuredWork = document.querySelector('[data-featured-work]');
if (featuredWork) {
    projects.slice(1, 4).forEach((project) => featuredWork.append(projectCard(project, false)));
}

const allWork = document.querySelector('[data-all-work]');
if (allWork) {
    projects.forEach((project) => allWork.append(projectCard(project, true)));
}
