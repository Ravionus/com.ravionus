# Ravionus

Developer tools, interactive learning, and code playgrounds — all client-side, no backend, no sign-up required. Live at [ravionus.com](https://ravionus.com).

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Tools Catalogue](#tools-catalogue)
4. [Playgrounds Catalogue](#playgrounds-catalogue)
5. [Learn Platform](#learn-platform)
6. [Shared Infrastructure](#shared-infrastructure)
7. [CI / CD Pipeline](#ci--cd-pipeline)
8. [Test Suite](#test-suite)
9. [Design System](#design-system)
10. [Adding a New Tool or Playground](#adding-a-new-tool-or-playground)
11. [Adding a New Learn Topic](#adding-a-new-learn-topic)
12. [Running Locally](#running-locally)
13. [Utility Scripts](#utility-scripts)

---

## Architecture Overview

Every page is a **self-contained static HTML file** with inline CSS and a single `<script>` IIFE (Immediately Invoked Function Expression). There is:

- **No build step** — no webpack, no bundler, no transpiler.
- **No server-side code** — deploys directly to GitHub Pages.
- **No runtime dependencies** — CDNs are used only when absolutely necessary (e.g. Highlight.js for `syntax/`, Prettier for `code-formatter/`). All other tools run with vanilla JS.
- **No authentication required** for tools or playgrounds. The `learn/` section optionally supports Google Sign-In via Firebase for cloud progress sync; all features work without signing in.

State that needs to persist across page reloads uses `localStorage`. Each page uses its own namespaced key: `ravionus_tool_<slug>` or `ravionus_playground_<slug>`.

---

## Project Structure

```
ravionus.com/
│
├── index.html                  ← Landing page (hero + section links)
├── site.js                     ← Shared nav bar & footer injected into every sub-page
├── favicon.svg
├── sitemap.xml
├── robots.txt
├── CNAME                       ← ravionus.com (GitHub Pages custom domain)
│
├── tools/                      ← Developer utility tools (22 tools)
│   ├── index.html              ← Tools catalogue / listing page
│   └── <slug>/index.html       ← One self-contained page per tool
│
├── playground/                 ← Interactive playgrounds (11 playgrounds)
│   ├── index.html              ← Playgrounds listing page
│   └── <slug>/index.html       ← One self-contained page per playground
│
├── learn/                      ← Interactive learning platform
│   ├── index.html              ← Topic catalogue
│   ├── topic.html              ← Lesson reader + quiz engine shell
│   ├── app.js                  ← Quiz engine, progress tracking, Firebase sync
│   ├── content.js              ← All course content (single source of truth)
│   ├── certificate.js          ← Canvas-based completion certificate generator
│   ├── firebase.js             ← Firebase Auth + Firestore sync adapter
│   ├── style.css               ← Learn-specific design tokens & components
│   └── auth-test.html          ← Minimal Firebase auth smoke-test page
│
├── tests/                      ← Playwright end-to-end test suite
│   ├── playwright.config.js    ← Config: Chromium only, retries: 2, localhost:3000
│   ├── jsconfig.json
│   ├── package.json
│   └── *.spec.js               ← One spec file per tool / playground / section
│
├── scripts/                    ← One-off bulk transformation utilities (Python)
│   ├── _add_tooltips.py        ← Adds title= tooltip attributes to tab buttons
│   └── _transform_subpages.py  ← Migrates pages to shared site.js nav pattern
│
└── .github/
    └── workflows/
        └── ci.yml              ← Path-filtered CI + GitHub Pages deploy
```

---

## Tools Catalogue

All tools live at `tools/<slug>/index.html`. Each is fully self-contained.

| Slug | Title | Description |
|---|---|---|
| `base64` | Base64 Encoder / Decoder | Encode / decode text or files to Base64 |
| `case` | Case Converter | Convert text between camelCase, snake_case, PascalCase, kebab-case, etc. |
| `color` | Color Converter | Convert between HEX, RGB, HSL, OKLCH; generate tints/shades |
| `cron` | Cron Expression Parser | Parse cron expressions to plain-English + next N run times |
| `csv` | CSV ↔ JSON Converter | Convert between CSV and JSON; preview as table |
| `diff` | Text Diff | Side-by-side character/word/line diff with change stats |
| `formatter` | Code Formatter (inline) | Format JSON / JS / HTML / CSS inline (in-place) |
| `hash` | Hash Generator | MD5, SHA-1, SHA-256, SHA-384, SHA-512 |
| `html-entity` | HTML Entity Encoder / Decoder | Encode/decode HTML entities — named, decimal, hex styles |
| `json` | JSON Formatter & Validator | Format, validate, and explore JSON with tree view |
| `jwt` | JWT Decoder | Decode and inspect JWT header, payload, signature |
| `lorem` | Lorem Ipsum Generator | Generate placeholder text (words / sentences / paragraphs) |
| `minifier` | Code Minifier | Minify HTML, CSS, and JavaScript |
| `password` | Password Strength Checker | Analyse password strength with entropy score |
| `qr` | QR Code Generator | Generate QR codes from any text or URL |
| `regex` | Regex Tester | Test regular expressions with live match highlighting |
| `syntax` | Syntax Highlighter | Highlight source code (20+ languages via Highlight.js) |
| `text-stats` | Text Stats | Word count, character count, reading time, frequency analysis |
| `url` | URL Encoder / Decoder & Parser | Encode/decode URLs; parse components |
| `uuid` | UUID Generator | Generate UUIDs (v4) in bulk |
| `yaml` | YAML Validator & Converter | Validate YAML and convert to/from JSON |

---

## Playgrounds Catalogue

All playgrounds live at `playground/<slug>/index.html`.

| Slug | Title | Description |
|---|---|---|
| `api-builder` | API Request Builder | Compose and send HTTP requests; view response, headers, code snippets (fetch / curl / axios) |
| `base-converter` | Base Converter | Convert numbers between binary, octal, decimal, hex |
| `code-formatter` | Code Formatter | Format JSON, JS, HTML, CSS, SQL with auto-detect; side-by-side diff view (uses Prettier via CDN) |
| `color-palette` | Color Palette Generator | Generate harmonious palettes; copy HEX / RGB / HSL values |
| `css-layout` | CSS Layout Playground | Live preview of flexbox/grid with controls |
| `datetime` | Date & Time Tools | Convert timestamps, calculate date differences, format dates |
| `git-sim` | Git Simulator | Visual interactive Git branch/commit simulator |
| `json-explorer` | JSON Explorer | Interactive tree explorer for large JSON structures |
| `markdown` | Markdown Preview | Live Markdown editor with rendered HTML preview |
| `password-gen` | Password Generator | Generate secure passwords with custom rules |
| `repl` | JavaScript REPL | In-browser JS REPL with console output capture |

---

## Learn Platform

`learn/` is a multi-topic interactive learning system.

**Key files:**

| File | Role |
|---|---|
| `content.js` | **Single source of truth for all content.** Add a new `TOPICS` object here to publish a new topic — no other file changes needed. |
| `app.js` | Quiz engine, progress tracking, section navigation, certificate trigger, Firebase sync |
| `firebase.js` | Firebase Auth (Google Sign-In) + Firestore cloud sync adapter. Auth is optional — all content is accessible without signing in. |
| `certificate.js` | Generates a Canvas-based completion certificate when all sections (lessons + quizzes) are completed |
| `topic.html` | Shell page that `app.js` renders into. URL format: `topic.html?id=<topic-id>` |

**Topic content structure** (one entry in `TOPICS` array in `content.js`):
```js
{
  id: "git-basics",          // URL slug for topic.html?id=git-basics
  title: "Git Basics",
  icon: "🔀",
  color: "#7c3aed",
  description: "...",
  difficulty: "Beginner",    // Beginner | Intermediate | Advanced
  estimatedTime: "25 min",
  tags: ["DevOps", "Tools"],
  sections: [
    { type: "lesson", title: "...", content: `<html>` },
    { type: "quiz",   title: "...", questions: [ { q, options, answer, explanation } ] }
  ]
}
```

---

## Shared Infrastructure

### `site.js`
Injected as the first `<script>` inside `<body>` on every sub-page. Injects:
- Sticky top nav bar (Logo, Learn / Tools / Playgrounds links, Google Sign-In button, user chip)
- Page breadcrumb bar (`.page-breadcrumb` div)  
- Footer

The active nav link is highlighted based on `window.location.pathname`. All paths are absolute so the script works correctly regardless of page nesting depth.

### Page anatomy (every tool/playground page follows this layout)
```
<nav>              ← injected by site.js
.page-breadcrumb   ← injected by site.js
header.page-header ← h1 + short description
.options-row       ← mode/style/scope toggles (if applicable)
.toolbar           ← primary action buttons (left) + utility buttons (right)
#errorBanner       ← hidden by default; shown on validation failure
#successBanner     ← hidden by default; shown after successful action
.editor-layout     ← split-pane: #inputPane + .pane-divider + #outputPane
.status-bar        ← live stats (char counts, mode, entity count, etc.)
.mobile-tabs       ← #tabInput / #tabOutput (visible only on narrow screens)
#toast             ← ephemeral 2.5 s notification (Copy, Download feedback)
<script>IIFE</script>
```

### Design tokens (CSS custom properties — used in every page)
```css
--bg: #0a0a0f          /* page background */
--surface: #12121a     /* card / panel background */
--surface2: #0e0e16    /* pane header background */
--border: #1e1e2e
--border2: #2a2a3e
--text: #e2e2f0
--muted: #7878a0
--purple: #a855f7
--cyan: #22d3ee
--green: #22c55e
--red: #ef4444
--accent-g: linear-gradient(135deg, #a855f7, #22d3ee)
--font-mono: 'JetBrains Mono', 'Fira Code', monospace
```

### Content Security Policy
Every tool/playground page sets a `<meta http-equiv="Content-Security-Policy">` header:
```
default-src 'self';
script-src 'self' 'unsafe-inline' [cdn-hosts if needed];
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'none';   ← tightened to specific origins for api-builder
```

---

## CI / CD Pipeline

Two workflow files live in `.github/workflows/`:

| File | Trigger | Purpose |
|---|---|---|
| `ci.yml` | Every push / PR | Path-filtered per-tool tests + GitHub Pages deploy |
| `scheduled.yml` | Cron + manual dispatch | Smoke daily, full regression weekly |

### `ci.yml` — push-triggered

- **Job 0 (`changes`)** — uses `dorny/paths-filter` to detect which source areas changed.
- **Jobs 1–40** — one test job per tool/playground/section. Each job runs only when its source files (`tools/<slug>/**` or `playground/<slug>/**`) or its spec file changed, **or** on every push to `main` (pre-deploy gate).
- **Job 41 (`deploy`)** — GitHub Pages deploy. Only runs after all test jobs succeed or are skipped. Uses `actions/deploy-pages`.
- **Caching** — all jobs use `actions/setup-node` npm cache + `actions/cache` for Playwright browser binaries (`~/.cache/ms-playwright`), keyed on `package-lock.json` hash. Reduces per-job overhead from ~3 min to ~1 min.

### `scheduled.yml` — time-triggered

| Job | Cron | When | Runs | Filter |
|---|---|---|---|---|
| `smoke_daily` | `0 2 * * 1-6` | Mon–Sat 02:00 UTC | ~130 tests | `--grep "smoke"` |
| `regression` | `0 2 * * 0` | Sunday 02:00 UTC | ~1,370 tests | _(full suite)_ |

Both jobs can also be triggered manually from the **Actions** tab → `Scheduled Tests` → `Run workflow`, with a `suite` input (`smoke` or `regression`).

Failure artifacts (screenshots + videos) are uploaded for 7 days on any failure.

### Test tiers

Tests in every spec file follow a two-tier `describe` naming convention:

| Tier | Describe block | Count | When it runs |
|---|---|---|---|
| **Smoke** | `— smoke` | ~130 tests | Every push to main + daily schedule |
| **Features / Functional** | `— features` | ~1,240 tests | Every push to main (path-filtered) |
| **Regression** | full suite | ~1,370 tests | Weekly (Sunday) schedule |

### Adding a new tool to CI (checklist)
When adding a new tool/playground with slug `my_tool`:

1. **`outputs` block** — add: `my_tool: ${{ steps.filter.outputs.my_tool }}`
2. **`filters` block** — add:
   ```yaml
   my_tool:
     - 'tools/my-tool/**'
     - 'tests/my-tool.spec.js'
   ```
3. **New test job** — copy an existing job block, change name/slug, update `needs.changes.outputs.my_tool`.
4. **`deploy.needs` array** — append `test_my_tool`.
5. **`deploy.if` condition** — add `(needs.test_my_tool.result == 'success' || needs.test_my_tool.result == 'skipped')`.

---

## Test Suite

- Framework: **Playwright** (Chromium + Firefox)
- Location: `tests/`
- Config: `tests/playwright.config.js`
  - `retries: 2` — each test retried twice before marked failed
  - `webServer`: starts `python -m http.server 3000` from repo root
  - Screenshots + video captured on failure only
- **~22 tests per tool** (4 smoke + ~18 feature tests)
- Total: **~1,370+ tests** across the full suite (doubled across two browsers)

### Coverage by spec

Generated from `tests/test-map.csv` (run `python scripts/generate_test_map.py` to refresh).

| Spec | Feature | Area | Smoke | Feature | Total |
|---|---|---|---:|---:|---:|
| catalog.spec.js | Catalog page | learn | 0 | 13 | **13** |
| topic.spec.js | Topic page | learn | 0 | 16 | **16** |
| api-builder.spec.js | API Request Builder | playground | 4 | 25 | **29** |
| base-converter.spec.js | Base Converter | playground | 9 | 56 | **65** |
| code-formatter.spec.js | Code Formatter | playground | 4 | 16 | **20** |
| color-palette.spec.js | Color Palette Generator | playground | 7 | 78 | **85** |
| css-layout.spec.js | CSS Layout Playground | playground | 4 | 50 | **54** |
| datetime.spec.js | Date/Time Utilities | playground | 8 | 73 | **81** |
| git-sim.spec.js | Git Simulator | playground | 5 | 75 | **80** |
| json-explorer.spec.js | JSON Explorer | playground | 5 | 45 | **50** |
| markdown.spec.js | Markdown Preview | playground | 3 | 21 | **24** |
| password-gen.spec.js | Password Generator (Playground) | playground | 11 | 71 | **82** |
| repl.spec.js | JavaScript REPL | playground | 4 | 39 | **43** |
| base64.spec.js | Base64 Encoder/Decoder | tool | 3 | 20 | **23** |
| case.spec.js | Case Converter | tool | 4 | 29 | **33** |
| color.spec.js | Color Converter | tool | 4 | 22 | **26** |
| cron.spec.js | Cron Expression Parser | tool | 14 | 59 | **73** |
| csv.spec.js | CSV Tool | tool | 3 | 29 | **32** |
| diff.spec.js | Diff Checker | tool | 4 | 14 | **18** |
| formatter.spec.js | Code Formatter | tool | 4 | 35 | **39** |
| hash.spec.js | Hash Generator | tool | 6 | 37 | **43** |
| homepage.spec.js | Homepage | tool | 0 | 10 | **10** |
| html-entity.spec.js | HTML Entity Encoder/Decoder | tool | 4 | 18 | **22** |
| json.spec.js | JSON Formatter | tool | 3 | 23 | **26** |
| jwt.spec.js | JWT Decoder | tool | 12 | 46 | **58** |
| lorem.spec.js | Lorem Ipsum Generator | tool | 4 | 23 | **27** |
| minifier.spec.js | Minifier | tool | 4 | 32 | **36** |
| password.spec.js | Password Generator | tool | 4 | 20 | **24** |
| qr.spec.js | QR Code Generator | tool | 4 | 25 | **29** |
| regex.spec.js | Regex Tester | tool | 3 | 36 | **39** |
| syntax.spec.js | Syntax Highlighter | tool | 4 | 34 | **38** |
| text-stats.spec.js | Text Statistics | tool | 10 | 54 | **64** |
| url.spec.js | URL Encoder/Decoder | tool | 3 | 23 | **26** |
| uuid.spec.js | UUID Generator | tool | 4 | 18 | **22** |
| yaml.spec.js | YAML Tool | tool | 3 | 31 | **34** |
| | **35 specs** | | **168** | **1,216** | **1,384** |

### Test anatomy (per spec file)
```
describe('… — smoke')
  ✓ page loads without JS or CSP errors
  ✓ nav bar + breadcrumb visible
  ✓ primary action buttons visible
  ✓ input/output textareas visible

describe('… — features')
  ✓ core encode/decode/format/convert logic
  ✓ option toggles (style, scope, mode)
  ✓ empty input → error banner (no alert())
  ✓ Sample button populates input
  ✓ Copy → toast visible
  ✓ Clear → both areas empty
  ✓ localStorage round-trip (state persists across reload)
  ✓ keyboard shortcut (Ctrl+Enter triggers primary action)
  ✓ status bar updates with stats
  ✓ mobile tab switching (#tabOutput click → output visible)
```

### Run individual spec
```bash
cd tests
npx playwright test html-entity.spec.js --reporter=line
```

### Run full suite
```bash
cd tests
npx playwright test
```

---

## Design System

All pages use the same dark theme. Typography is loaded from Google Fonts:
- **Inter** (400, 500, 600, 700, 800) — body and UI
- **JetBrains Mono** (400, 500) — code / monospace areas (`--font-mono`)

**Button conventions:**
- `.primary` — purple gradient, main action (e.g. Encode, Format)
- `.secondary` — muted border, secondary action (e.g. Decode)
- `.danger` — red tint, destructive action (Clear)
- `[data-style]` / `[data-scope]` — toggle button groups (use `aria-pressed`)

**Banner conventions:**
- `#errorBanner .error-banner` — red; shown via `.visible` class; `role="alert"`
- `#successBanner .success-banner` — green; shown via `.visible` class; `aria-live="polite"`
- `#toast` — floating 2.5 s notification; shown via `.show` class; `aria-live="polite"`

---

## Adding a New Tool or Playground

### 1. Create the page
Copy the closest existing tool as a starting point:
- Plain text in/out with options → copy `tools/html-entity/index.html`
- Code in/out → copy `tools/formatter/index.html`
- Playground with live preview → copy `playground/markdown/index.html`

Change:
- `<title>`, `<meta name="description">`, `<link rel="canonical">`
- `STORAGE_KEY` → `'ravionus_tool_<slug>'`
- All element IDs, labels, placeholder text
- Core JS logic

### 2. Add to the listing page
`tools/index.html` or `playground/index.html` — add a `<a href="./<slug>/" class="card">` block in the appropriate section:
```html
<a href="./my-tool/" class="card">
    <div class="card-icon">🔧</div>
    <div class="card-title">My Tool</div>
    <div class="card-desc">Short description of what it does.</div>
    <div class="card-badge live">⚡ Live</div>
</a>
```

### 3. Write tests
Create `tests/my-tool.spec.js`. Follow the standard anatomy (smoke + features). Use `BASE = 'http://localhost:3000'` and `URL = \`${BASE}/tools/my-tool/\``.

### 4. Update CI
See [Adding a new tool to CI](#adding-a-new-tool-to-ci-checklist) above.

### 5. Update sitemap
Add to `sitemap.xml` before `</urlset>`:
```xml
<url>
    <loc>https://ravionus.com/tools/my-tool/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
```

---

## Adding a New Learn Topic

Edit **only** `learn/content.js`. Append a new object to the `TOPICS` array:

```js
{
  id: "my-topic",           // used in URL: topic.html?id=my-topic
  title: "My Topic",
  icon: "⚡",
  color: "#0e7490",
  description: "One-line description shown on the catalogue card.",
  difficulty: "Beginner",   // Beginner | Intermediate | Advanced
  estimatedTime: "20 min",
  tags: ["Category"],
  sections: [
    {
      type: "lesson",
      title: "Lesson Title",
      content: `<p>HTML content for the lesson body.</p>`
    },
    {
      type: "quiz",
      title: "⚡ Quick Check",
      questions: [
        {
          q: "Question text?",
          options: ["Option A", "Option B", "Option C", "Option D"],
          answer: 0,    // 0-based index of correct option
          explanation: "Why this answer is correct."
        }
      ]
    }
  ]
}
```

No other file needs to change. The catalogue page and topic reader pick up the new entry automatically.

---

## Running Locally

```bash
# Serve from repo root (Python 3)
python -m http.server 3000

# OR with Node.js npx serve
npx serve -l 3000 .

# Then open http://localhost:3000
```

Run tests (requires Node.js + Playwright installed):
```bash
cd tests
npm install          # first time only
npx playwright install chromium firefox   # first time only
npx playwright test  # run all tests
npx playwright test html-entity.spec.js --reporter=line  # run one spec
```

---

## Utility Scripts

Located in `scripts/`. These are bulk maintenance and generation scripts — not part of the live site.

| Script | Purpose | Idempotent? |
|---|---|---|
| `generate_sitemap.py` | Scans all `index.html` files and writes `sitemap.xml` with per-file `git log` lastmod dates. Run automatically in CI before deploy. | ✅ Safe to re-run |
| `generate_og_image.js` | Uses Playwright (chromium) to render `og-image.svg` into a 1200×630 `og-image.png`. Re-run if the SVG changes. Run from repo root: `node scripts/generate_og_image.js` | ✅ Overwrites PNG |
| `_add_og_image.py` | Inserts `og:image`, `og:image:alt`, and `twitter:image` meta tags into pages that have `og:url` but no `og:image`. Skips pages that already have the tags. | ✅ Skip-if-present |
| `_fix_og_meta.py` | One-time migration: SVG→PNG for og:image URLs, adds `og:site_name`, adds `og:image:alt`. Already run — safe to re-run, will no-op on up-to-date pages. | ✅ Skip-if-present |
| `_add_tooltips.py` | Adds `title=` tooltip attributes to tab/toolbar buttons across all pages. Safe to re-run — skips buttons that already have a `title`. | ✅ Skip-if-present |
| `_transform_subpages.py` | One-time migration: replaced legacy per-page nav bars with the shared `site.js` pattern. Already applied to all pages. | ✅ No-op if already migrated |
| `_normalize_breadcrumbs.py` | Normalises breadcrumb markup to the standard `.page-breadcrumb` structure. | ✅ Skip-if-present |

Run from the repo root:
```bash
python scripts/generate_sitemap.py
node scripts/generate_og_image.js
python scripts/_add_og_image.py
```

---

## Deployed via

GitHub Pages (branch: `main`) + Dynadot custom domain (`ravionus.com`).  
Deploy is triggered automatically by CI after all test jobs pass.

---

## License

**Code** (everything outside `learn/`) — [MIT License](LICENSE)  
You are free to use, copy, modify, and distribute the source code.

**Learn content** (`learn/` directory) — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)  
You may share and adapt the course materials for non-commercial purposes with attribution.

© 2026 Raviprasad
