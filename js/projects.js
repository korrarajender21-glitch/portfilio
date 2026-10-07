// Add project-specific repository or demo URLs here when they are available.
const portfolioProjects = [
  {
    number: "01",
    glyph: "{ }",
    title: "Random Password Generator",
    technology: ["Python"],
    description: "A Python-based tool that generates strong, secure, and random passwords instantly.",
    features: ["Strong random passwords", "Customizable password length", "Letters, numbers and symbols", "Fast and easy to use"],
    repositoryUrl: "",
    demoUrl: ""
  },
  {
    number: "02",
    glyph: "ATM",
    title: "Mini ATM",
    technology: ["Java", "HTML", "CSS"],
    description: "A mini ATM system that simulates secure banking transactions and basic account management.",
    features: ["User login and PIN authentication", "Balance inquiry", "Cash withdrawal and deposit", "Account balance management"],
    repositoryUrl: "",
    demoUrl: ""
  },
  {
    number: "03",
    glyph: "DB",
    title: "Student Management System",
    technology: ["HTML", "CSS", "JavaScript", "MySQL"],
    description: "A web-based system for managing student records, attendance, marks, and academic information.",
    features: ["Student registration and login", "Add, update and delete records", "Attendance management", "Marks and grade management"],
    repositoryUrl: "",
    demoUrl: ""
  }
];

let showingAllProjects = false;
let activeProjectFilter = "all";

const projectFilters = {
  all: [],
  python: ["python"],
  java: ["java"],
  web: ["html", "css", "javascript", "react.js", "mysql", "sql", "mongodb"]
};

function renderProjects(projects = portfolioProjects) {
  const projectGrid = document.querySelector("#project-grid");
  if (!projectGrid) return;

  const githubProfile = "https://github.com/korrarajender21-glitch";
  const matchingProjects = projects.filter((project) => {
    const technologies = project.technology.map((technology) => technology.toLowerCase());
    return activeProjectFilter === "all" || projectFilters[activeProjectFilter].some((technology) => technologies.includes(technology));
  });
  const visibleProjects = showingAllProjects ? matchingProjects : matchingProjects.slice(0, 3);
  projectGrid.innerHTML = visibleProjects.map((project) => {
    const technologies = project.technology.map((technology) => `<span>${technology}</span>`).join("");
    const features = project.features.map((feature) => `<li>${feature}</li>`).join("");
    const repositoryLink = project.repositoryUrl
      ? `<a href="${project.repositoryUrl}" target="_blank" rel="noreferrer">GitHub ↗</a>`
      : `<a href="${githubProfile}" target="_blank" rel="noreferrer" aria-label="Open Korra Rajender's GitHub profile">GitHub profile ↗</a>`;
    const demoLink = project.demoUrl
      ? `<a href="${project.demoUrl}" target="_blank" rel="noreferrer">View project ↗</a>`
      : `<a href="#contact" data-project-title="${project.title}">Discuss project ↗</a>`;

    return `<article class="project-card reveal">
      <div class="project-meta"><span>PROJECT / ${project.number}</span><span class="project-glyph" aria-hidden="true">${project.glyph}</span></div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <ul class="project-features">${features}</ul>
      <div class="project-footer"><div class="project-tech" aria-label="Technologies">${technologies}</div><div class="project-actions">${repositoryLink}${demoLink}</div></div>
    </article>`;
  }).join("");

  const viewAllButton = document.querySelector("#view-projects");
  if (viewAllButton) {
    viewAllButton.hidden = matchingProjects.length <= 3;
    viewAllButton.innerHTML = `${showingAllProjects ? "Show fewer projects" : "View all projects"} <span aria-hidden="true">↗</span>`;
  }
  if (window.observeReveals) window.observeReveals(projectGrid);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  document.querySelectorAll("[data-project-filter]").forEach((button) => button.addEventListener("click", () => {
    activeProjectFilter = button.dataset.projectFilter;
    showingAllProjects = false;
    document.querySelectorAll("[data-project-filter]").forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    renderProjects();
  }));
  document.querySelector("#view-projects")?.addEventListener("click", () => {
    showingAllProjects = !showingAllProjects;
    renderProjects();
  });
});