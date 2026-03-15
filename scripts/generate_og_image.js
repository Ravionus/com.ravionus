/**
 * generate_og_image.js — render og-image.svg → og-image.png (1200×630)
 *
 * Run from the tests/ directory so @playwright/test is resolvable:
 *   cd tests && node ../scripts/generate_og_image.js
 */
const path = require('path');
const fs   = require('fs');

// Resolve Playwright from tests/node_modules regardless of CWD
const { chromium } = require(
  path.join(__dirname, '..', 'tests', 'node_modules', '@playwright', 'test')
);

(async () => {
  const repoRoot  = path.join(__dirname, '..');
  const svgPath   = path.join(repoRoot, 'og-image.svg');
  const pngPath   = path.join(repoRoot, 'og-image.png');
  const svgSource = fs.readFileSync(svgPath, 'utf8');

  const browser = await chromium.launch();
  const page    = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });

  // Embed SVG inline to guarantee pixel-perfect 1200×630 render
  await page.setContent(`<!DOCTYPE html>
<html>
<head><style>*{margin:0;padding:0}html,body{width:1200px;height:630px;overflow:hidden}</style></head>
<body>${svgSource}</body>
</html>`);

  await page.screenshot({ path: pngPath, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();

  const kb = (fs.statSync(pngPath).size / 1024).toFixed(1);
  console.log(`Generated og-image.png — 1200×630 (${kb} KB)`);
})().catch(err => { console.error(err); process.exit(1); });
