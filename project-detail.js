const projectList = window.MSNWProjects || [];
const projectByKey = new Map(projectList.map((item) => [item.key, item]));
const projectKey = new URLSearchParams(window.location.search).get('project');
const project = projectByKey.get(projectKey);
const projectTitle = document.querySelector('[data-project-title]');
const projectImage = document.querySelector('[data-project-image]');
const projectYear = document.querySelector('[data-project-year]');
const nextProjectLink = document.querySelector('[data-next-project]');
const projectStage = document.querySelector('.project-detail__stage');
const projectError = document.querySelector('[data-project-error]');

if (project && projectTitle && projectImage && projectYear && nextProjectLink && projectStage && projectError) {
    projectTitle.textContent = project.title;
    projectImage.src = project.image;
    projectImage.alt = project.alt;
    projectYear.textContent = project.year;
    document.title = `${project.title} — MSNW Studio`;

    const projectIndex = projectList.findIndex((item) => item.key === projectKey);
    const next = projectList[(projectIndex + 1) % projectList.length];
    nextProjectLink.href = `project-detail.html?project=${encodeURIComponent(next.key)}`;
    nextProjectLink.setAttribute('aria-label', `View next project: ${next.title}`);
} else if (projectStage && projectError) {
    projectStage.hidden = true;
    projectError.hidden = false;
    document.title = 'Project not found — MSNW Studio';
}
