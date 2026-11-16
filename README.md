# Aryaman Srimali Jain — AI & Machine Learning Engineer Portfolio

An executive, high-performance personal portfolio website built with a modern dark-mode aesthetic (with seamless light-mode support), subtle glassmorphism, responsive architecture, and interactive simulation engines for flagship research projects.

---

## 🌟 Highlights & Key Features

- **Executive Aesthetic**: Modern Obsidian & Midnight Slate theme with electric indigo, cyan, and emerald glowing accents.
- **Interactive Vision Simulator (MVTec LOCO AD)**:
  - Live simulation of an unsupervised PatchCore (WideResNet-50) anomaly detector.
  - Interactive selection of 5 industrial categories (*Breakfast Box*, *Juice Bottle*, *Pushpins*, *Screw Bag*, *Splicing Connectors*).
  - Toggle between Pristine, Structural Defect, and Logical Anomaly states with real-time bounding box annotations and statistical threshold sliders ($\mu + n\sigma$).
- **FloodBot Telemetry Simulator (IEEE ICCSP 2025)**:
  - Live 72-hour geospatial inundation radar with interactive sliders for Precipitation telemetry, Soil moisture saturation, and Digital Elevation Model (DEM) risk indexing.
  - Radial risk gauge with dynamic status triggers.
- **Curated Professional Portfolio**:
  - **Hero Terminal**: Live simulation of FastAPI PyTorch inference pipeline and real-world metrics (0.896 ROC-AUC, 99.1% Precision, <200ms latency).
  - **Projects Showcase**: Filterable portfolio tabs (All, Computer Vision & Anomaly Detection, Deep Learning & GIS, Ensemble & Analytics).
  - **Work History Timeline**: Interactive cards covering roles at Giniminds, Wissen Technology, SuperLeap CRM, Aditya Birla Management Corp, PwC AC, and PES University CDSAML.
  - **Academic Publications**: Direct DOI links and one-click BibTeX copy for IEEE research papers.
  - **Education & Honors**: Highlighting NUS-ISS M.Tech in AI Systems tracks, PES University B.Tech (top 10% cohort, DAC & ICICI Merit Scholarships), and 12+ cloud/AI industry certifications.
  - **One-Click Actions**: Quick email copy toast notification, interactive contact form with instant validation, direct telephone/WhatsApp links, and LinkedIn/GitHub shortcuts.
  - **Print / PDF Friendly**: Built-in `@media print` styling that formats the site into a clean, distraction-free executive resume.

---

## 🚀 Quick Start / Local Preview

You don't need any complex frameworks, node modules, or build steps — it works straight out of the box!

### Option 1: Double-click
Simply navigate to:
```
C:\Users\Aryaman\.gemini\antigravity\scratch\aryaman-portfolio\index.html
```
and double-click to open in Chrome, Edge, Safari, or Firefox.

### Option 2: Run a Local Dev Server (Python)
From your terminal:
```bash
cd "C:\Users\Aryaman\.gemini\antigravity\scratch\aryaman-portfolio"
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🌐 Free 1-Click Deployment Options

### Deploy to GitHub Pages (Recommended for `github.com/aryamancsk`)
1. Create a GitHub repository named `aryamancsk.github.io` (or `portfolio`).
2. Push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of classy AI portfolio"
   git branch -M main
   git remote add origin https://github.com/aryamancsk/aryamancsk.github.io.git
   git push -u origin main
   ```
3. Your site will immediately be live worldwide at: `https://aryamancsk.github.io`!

### Deploy to Vercel or Netlify
- Drag and drop the `aryaman-portfolio` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop) or import from GitHub on [vercel.com](https://vercel.com).
