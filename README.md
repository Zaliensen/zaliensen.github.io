# Zachary Halaby — portfolio

Public portfolio source for Zachary Halaby, designed for GitHub Pages at the repository root on `main`.

The site presents classroom workflow design, technical work, research and a synthetic reporting example. Project notes distinguish preserved implementations, reduced demonstrations, reconstructed interfaces and documentation-only references. Classroom projects credit Zachary Halaby as creator and workflow designer, developed and iterated with AI coding assistance.

- [Primary GitHub profile](https://github.com/Zaliensen)
- [Classroom source collection](https://github.com/Zaliensen/classroom-workflows)

The primary reading path is Literacy Instruction and Response Tracking, Interactive Learning and Task Sequencing, then Synthetic Operational Reporting. Other work stays grouped as supporting demonstrations, source notes or work-in-progress prototypes. The classroom setting is Smartboard touch use; keyboard interaction is a backup.

## Hosting and local preview

This is plain HTML, CSS and JavaScript. No dependency install or build step is required. GitHub Pages should serve the root of `main`; `.nojekyll` preserves the static files as supplied.

With an existing Python 3 installation:

```text
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. Use HTTP for the PDF.js module and worker; other demos also work from a static server.

## Contents and attribution

Only reviewed website files, explicit demo assets and rendered project notes are included. The spreadsheet download contains invented values. No private career documents, resumes, original classroom archives, learner records, recordings, recovery inventories or credentials are included.

Third-party PDF.js files and their Apache-2.0 notice remain in `demos/pdf-slideshow-clicker/vendor/`. Project-specific source and license-status notes remain applicable; this repository does not assert a blanket license for all work. The portfolio makes no educational-effectiveness, deployment-scale or accessibility-certification claim.

## Verification

The companion source repository documents `node scripts/verify.mjs --site ../zaliensen.github.io` for runtime-file synchronization and site links, alongside its project checks. Browser touch/pointer checks are reported separately from physical Smartboard testing.
