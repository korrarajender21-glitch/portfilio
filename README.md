# Korra Rajender | Portfolio

A responsive, single-page personal portfolio built with HTML, CSS, and vanilla JavaScript. No package installation or build step is required.

## Run locally

Open this folder in VS Code, install the **Live Server** extension if needed, then right-click `index.html` and choose **Open with Live Server**. The site will open at a local address such as `http://127.0.0.1:5500`.

Alternatively, run this command from the project folder in the VS Code terminal:

```powershell
python -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

## Personalize

- Profile image: replace `assets/images/profile.jpg` with the preferred photo. The supplied `Rajen.jpeg` was copied there.
- Resume: the Download CV buttons currently create a text resume using the supplied details. To use a PDF, update the CV handler in `js/script.js` to link to `assets/resume/Korra-Rajender-CV.pdf`, then put the PDF in `assets/resume/`.
- Project links: set `repositoryUrl` and `demoUrl` in `js/projects.js` for each project. Empty values intentionally fall back to the supplied GitHub profile and a contact link, rather than inventing project URLs.
- Certificate links: update the five `Request link` anchors in `index.html` when verification URLs are available. Until then, they open a pre-addressed email request.
- Social links and contact details: edit the matching anchors and text in `index.html`.

The contact form validates fields in the browser and displays a clear demo-only confirmation. It does not send or store messages; use the email link unless a backend or form service is configured.