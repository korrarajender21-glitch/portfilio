document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const form = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const copyEmailButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("#copy-status");
  const cursorGlow = document.querySelector(".cursor-glow");
  const scrollProgress = document.querySelector(".scroll-progress span");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hideLoader = () => loader?.classList.add("is-hidden");
  if (document.readyState === "complete") window.setTimeout(hideLoader, reducedMotion ? 0 : 300);
  else window.addEventListener("load", () => window.setTimeout(hideLoader, reducedMotion ? 0 : 300), { once: true });
  window.setTimeout(hideLoader, 1800);

  const updateScrollState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    if (scrollProgress) scrollProgress.style.transform = `scaleX(${Math.min(progress, 1)})`;
  };
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const closeMenu = () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
    navMenu?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navMenu?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Replace this generated text download with your own PDF URL when your resume is ready.
  document.querySelectorAll("[data-download-cv]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    const resumeText = [
      "KORRA RAJENDER",
      "Computer Science Engineering Student",
      "Software Development | Artificial Intelligence | Machine Learning",
      "",
      "CONTACT",
      "Email: korrarajender21@gmail.com",
      "Location: Kothagudem, Mahabubabad, Telangana",
      "LinkedIn: linkedin.com/in/rajender-korra-04566a34a",
      "GitHub: github.com/korrarajender21-glitch",
      "",
      "EDUCATION",
      "B.Tech, Computer Science Engineering | Kakatiya Institute of Technology & Science (KITS), Warangal | 2024-2028 | CGPA: 7.9",
      "Intermediate | SR Junior College, Karimnagar | 2022-2024 | Marks: 974",
      "SSC | Govt. TWAHS (Boys), Seethanagaram | 2022 | GPA: 9.3",
      "",
      "TECHNICAL SKILLS",
      "C, Java, Python, HTML, CSS, JavaScript, React.js, MySQL, SQL, MongoDB, Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks, VS Code, Git, GitHub, Google Colab",
      "",
      "PROJECTS",
      "Random Password Generator | Python",
      "Mini ATM | Java, HTML, CSS",
      "Student Management System | HTML, CSS, JavaScript, MySQL",
      "",
      "INTERNSHIP & TRAINING",
      "Java Programming Internship - KODBUD | Developer | 1 Month",
      "Digital Transformation Essentials - Data + AI + Cloud | Learner | 1 Month",
      "",
      "CERTIFICATIONS",
      "Networking Basics - Cisco (2026)",
      "Oracle Certified Foundations Associate - Oracle (2026)",
      "Generative AI: Elevate Your Data Science - IBM (2026)",
      "Cybersecurity - Tech Mahindra (2026)",
      "GenAI-Powered Data Analytics Job Simulation - Tata (Forage) (2026)",
      "",
      "ACHIEVEMENTS",
      "Amazon ML Challenge 2026 - Hackathon",
      "Web Rush 2026 - Hackathon",
      "GFC 160 - 160 Days of Problem Solving"
    ].join("\n");
    const downloadUrl = URL.createObjectURL(new Blob([resumeText], { type: "text/plain;charset=utf-8" }));
    const download = document.createElement("a");
    download.href = downloadUrl;
    download.download = "Korra-Rajender-CV.txt";
    document.body.append(download);
    download.click();
    download.remove();
    URL.revokeObjectURL(downloadUrl);
  }));

  document.querySelectorAll("[data-project-title]").forEach((link) => link.addEventListener("click", () => {
    const message = document.querySelector("#contact-message");
    if (message) message.value = `I would like to know more about the ${link.dataset.projectTitle}.`;
  }));

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "";
    if (!form.reportValidity()) {
      formStatus.textContent = "Please complete each field with valid details.";
      formStatus.classList.add("is-error");
      return;
    }
    formStatus.classList.remove("is-error");
    formStatus.textContent = "Thanks for reaching out. This demo form did not send your message; please use the email link to contact me.";
    form.reset();
  });

  copyEmailButton?.addEventListener("click", async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard access is unavailable.");
      await navigator.clipboard.writeText("korrarajender21@gmail.com");
      copyStatus.textContent = "Email copied to clipboard.";
      copyEmailButton.classList.add("is-copied");
      window.setTimeout(() => copyEmailButton.classList.remove("is-copied"), 1400);
    } catch {
      copyStatus.textContent = "Clipboard access is unavailable. Select the email address above to copy it.";
    }
  });

  if (cursorGlow && !reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
      cursorGlow.classList.add("is-visible");
    }, { passive: true });
    document.addEventListener("pointerover", (event) => {
      cursorGlow.classList.toggle("is-interactive", Boolean(event.target.closest("a, button, .project-card")));
    });
    document.addEventListener("pointerout", (event) => {
      if (!event.relatedTarget?.closest("a, button, .project-card")) cursorGlow.classList.remove("is-interactive");
      const card = event.target.closest(".project-card");
      if (card && !card.contains(event.relatedTarget)) {
        card.classList.remove("is-tilting");
        card.style.removeProperty("--card-tilt-x");
        card.style.removeProperty("--card-tilt-y");
      }
    });
    document.addEventListener("pointermove", (event) => {
      const card = event.target.closest(".project-card");
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
      const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--card-tilt-x", `${horizontal * 4}deg`);
      card.style.setProperty("--card-tilt-y", `${vertical * -4}deg`);
      card.classList.add("is-tilting");
    });
    document.addEventListener("pointerleave", () => cursorGlow.classList.remove("is-visible"));
  }
});