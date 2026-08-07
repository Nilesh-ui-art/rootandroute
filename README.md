<div align="center">

# 🧭 Root & Route

**A field guide to IT & cybersecurity for people just starting out.**

Live at **[rootandroute.online](https://rootandroute.online)**

*Plain-language explanations of IT fundamentals, networking, security, and cloud —
written for career switchers, students, and first-line engineers who are tired of
tutorials that assume you already know the thing they're teaching.*

</div>

---

## 🥾 What is this?

Most IT content is written by people who forgot what it felt like not to know.
Root & Route follows one rule: **if a beginner has to already know five other
things to understand an explanation, the explanation has failed — not the beginner.**

Instead of vague "beginner / intermediate / advanced" labels, every post is graded
by **trail difficulty**:

| Badge | Meaning |
|---|---|
| 🟢 **Basecamp** | No prior knowledge needed |
| 🟩 **Trailhead** | The basics, applied |
| 🟠 **Ridge** | Connecting concepts across topics |
| 🟤 **Summit** | Practitioner-level depth |

Content is organised into four **waypoints**:

1. **IT Fundamentals** — networking, hardware, and operating systems
2. **Cybersecurity Basics** — the concepts in every job posting, minus the acronym soup
3. **Cloud & Infrastructure** — what "the cloud" physically is and how to practise for free
4. **Career Trail** — landing the first role and surviving the first ninety days

## ✨ Features

- 🌗 **Dark mode** ("night hike") — remembers your choice, respects system preference, no flash on load
- 🔎 **Live search + topic filters** on the post index
- 📊 **Reading progress bar** on every article
- 🎞️ **Scroll-reveal animations** — automatically disabled for reduced-motion users
- ♿ **Accessible by design** — skip links, keyboard focus states, semantic HTML, ARIA labels
- 🚀 **SEO-complete** — canonical URLs, Open Graph & Twitter cards, JSON-LD structured data (WebSite, Blog, BlogPosting, BreadcrumbList), sitemap & robots.txt
- 📱 **Fully responsive** — designed mobile-first with a topographic "field guide" aesthetic

## 🛠️ Tech stack

There isn't one — and that's the point.

**Pure HTML, CSS, and vanilla JavaScript.** No frameworks, no build step,
no dependencies, no `npm install`. One CSS file, one JS file. The whole site
weighs almost nothing, loads fast, and can be deployed by dragging a folder
onto any static host.

```
├── index.html              # Homepage
├── trail-log.html          # All posts, searchable & filterable
├── about.html              # About the site
├── 404.html                # Custom "off the trail" page
├── posts/                  # One HTML file per article
├── assets/
│   ├── css/style.css       # Design system (light + dark themes)
│   ├── js/main.js          # Theme, search, filters, progress, animations
│   └── img/                # Favicon + Open Graph share card
├── CNAME                   # Custom domain for GitHub Pages
├── .nojekyll               # Skip Jekyll processing on GitHub Pages
├── sitemap.xml             # Search engine sitemap
└── robots.txt              # Crawler directives
```

## 🚀 Run it locally

No tooling needed — just open `index.html` in a browser. For a proper local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 📡 Deployment

Hosted free on **GitHub Pages** with the custom domain managed at GoDaddy:

1. GitHub Pages serves from the `main` branch root (Settings → Pages)
2. The `CNAME` file binds the site to `rootandroute.online`
3. GoDaddy DNS points four `A` records at GitHub Pages' IPs
   (`185.199.108–111.153`) plus a `www` CNAME
4. HTTPS is enforced via GitHub's free automatic certificate

Every commit to `main` auto-deploys in under a minute.

## ✍️ Adding a post

1. Duplicate any file in `/posts/` as a template
2. Update the title, meta description, canonical URL, JSON-LD block, difficulty badge, and content
3. Add its row to `trail-log.html` (and optionally feature it on `index.html`)
4. Add a `<url>` entry to `sitemap.xml`
5. Commit — the site redeploys automatically

## 🧑‍💻 Author

Written by a working **Cloud & Infrastructure Engineer** (identity & access
management, endpoint management, networking, Azure) who still remembers exactly
which concepts didn't click the first, second, or fifth time they were explained.

## 📄 License

Code (HTML/CSS/JS) is free to reuse. Article content © Root & Route — please
link back rather than republishing.

---

<div align="center">
<em>Written by someone who's still on the trail too.</em>
</div>
