# Portfolio — Setup & Customisation Guide

A dark, editorial brand & UI/UX design portfolio. Built in pure HTML/CSS/JS, ready to deploy on GitHub Pages.

---

## 🚀 Quick Deploy to GitHub Pages

### ⚠️ IMPORTANT: Upload files, NOT the folder

When you unzip, you'll see these files directly (no wrapping folder):
```
index.html
work.html
about.html
assets/
...
```

**Upload THESE files to the root of your GitHub repo.** Do NOT create a `portfolio/` subfolder inside the repo — that will break the CSS.

### Steps:
1. Unzip the archive
2. Open your GitHub repo (`dsezionov/myportfolio`)
3. Drag-and-drop **all files and the `assets/` folder** directly into the repo root
   — OR use `git`: `cd` into the unzipped folder, then `git init`, `git add .`, `git push`
4. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
5. Wait ~60 seconds → your site is live at `https://dsezionov.github.io/myportfolio/`

### Via terminal (fastest):
```bash
cd path/to/unzipped/folder   # index.html should be HERE
git init
git remote add origin https://github.com/dsezionov/myportfolio.git
git add .
git commit -m "Portfolio launch"
git push -u origin main
```

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Homepage
├── work.html           ← All projects grid
├── about.html          ← About & experience
├── case-brand-1.html   ← Brand case study template
├── case-uiux-1.html    ← UI/UX case study template
└── assets/
    ├── css/
    │   └── style.css   ← All styles (edit colours/fonts here)
    ├── js/
    │   └── main.js     ← Animations & interactions
    └── img/            ← Put your images here
        ├── brand-1/
        ├── uiux-1/
        └── ...
```

---

## ✏️ Customisation Checklist

### 1. Your Name & Info
Find and replace `Your Name` and `YourName` across all HTML files with your actual name.

### 2. Email
Replace `your@email.com` everywhere with your actual email.

### 3. Social Links
In `index.html` footer, update the href values for LinkedIn, Behance, Dribbble.

### 4. Stats (Homepage)
Edit the `data-target` values in `.hero-stats` on `index.html`:
```html
<span class="stat-num" data-target="5" data-suffix="+">5+</span>
```

### 5. Experience (index.html + about.html)
Update the company names, roles, and dates in both files.

---

## 🖼️ Adding Case Studies

### Adding a New Case (copy method)
1. Duplicate `case-brand-1.html` or `case-uiux-1.html`
2. Rename it (e.g. `case-brand-2.html`)
3. Fill in your content where you see `<!-- REPLACE ... -->` comments
4. Add your card to `work.html` grid and `index.html` selected work section

### Adding Images
1. Create a folder: `assets/img/your-case-name/`
2. Add your images there
3. In the case file, replace `<div class="case-cover-placeholder">` with:
   ```html
   <img src="assets/img/your-case-name/cover.jpg" alt="Description">
   ```
4. Replace `<div class="case-img-item">Image 01</div>` with:
   ```html
   <img src="assets/img/your-case-name/screen-01.jpg" alt="Screen 1">
   ```

---

## 🎨 Changing the Accent Colour

Open `assets/css/style.css` and find the `:root` block at the top:
```css
--accent: #C9B88A;   /* golden warm — change this */
```
All accent usage will update automatically.

---

## 📋 Pages Included

| File | Purpose |
|------|---------|
| `index.html` | Landing page with hero, selected work (5 cases), about strip, services |
| `work.html` | Full portfolio grid with category filters |
| `about.html` | Bio, skills, tools, full experience table |
| `case-brand-1.html` | Brand identity case study template |
| `case-uiux-1.html` | UI/UX case study template |

### To create more case pages, duplicate the templates:
- Brand cases: copy `case-brand-1.html` → `case-brand-2.html`, etc.
- UI/UX cases: copy `case-uiux-1.html` → `case-uiux-2.html`, etc.
- Graphic Design cases: use either template as a base

---

## 🔤 Fonts Used
- **Cormorant Garamond** — display/editorial headings
- **Syne** — UI, navigation, body
- **Syne Mono** — labels, tags, metadata

Loaded from Google Fonts (internet required to render). For offline use,
download and host locally via [google-webfonts-helper.herokuapp.com](https://gwfh.madebyisobar.com).

---

## 💡 Tips

- **Images**: use `.webp` format for best performance. Recommended sizes:
  - Cover: 1600×700px
  - Case thumbnails: 1200×750px
  - Detail images: 1200×900px

- **Performance**: add `loading="lazy"` to all images below the fold

- **SEO**: update the `<title>` and `<meta name="description">` in each file

- **Favicon**: currently uses an inline SVG emoji (✦). Replace with your own `.ico` or `.png`
