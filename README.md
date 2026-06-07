# Super Sensors — supersensors.ai

Marketing website for Super Sensors, hosted on GitHub Pages.

## Structure
Static HTML/CSS/JS site. No build step required.

## Local development
Open any `.html` file directly in a browser, or use a local server:
```
python3 -m http.server 8000
```

## Deployment
Push to `main` branch. GitHub Pages serves automatically from repo root.

## Contact form setup
See setup instructions in the comment block at the top of `contact.html`.
Requires a free Formspree account at https://formspree.io.

## Updating content
Each page is a self-contained `.html` file. Nav and footer are duplicated across pages —
update all pages when changing navigation or footer content.
