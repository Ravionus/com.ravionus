// ============================================================
//  homepage.spec.js — Smoke tests for the root landing page (/)
//  Runs on every push via GitHub Actions.
// ============================================================

const { test, expect } = require('@playwright/test');

test.describe('Homepage — /', () => {

  // ── Page load ────────────────────────────────────────────

  test('loads without JavaScript errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors, `JS errors on homepage: ${errors.join(', ')}`).toHaveLength(0);
  });

  // ── Nav ──────────────────────────────────────────────────

  test('nav bar is present and visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.site-nav')).toBeVisible();
  });

  test('nav logo links to /', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav-logo')).toBeVisible();
    await expect(page.locator('.nav-logo')).toHaveAttribute('href', '/');
  });

  test('nav links include Learn, Dev Tools, and Playgrounds', async ({ page }) => {
    await page.goto('/');
    const linksText = await page.locator('.nav-links').textContent();
    expect(linksText).toContain('Learn');
    expect(linksText).toContain('Dev Tools');
    expect(linksText).toContain('Playgrounds');
  });

  test('nav links are visible (contrast check — no link should be hidden)', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('.nav-links .nav-link');
    await expect(links).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(links.nth(i)).toBeVisible();
    }
  });

  test('Sign In button is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#signInBtn')).toBeVisible();
  });

  // ── Hero ─────────────────────────────────────────────────

  test('hero heading is visible', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('.hero h1');
    await expect(h1).toBeVisible();
    const text = await h1.textContent();
    expect(text.length).toBeGreaterThan(0);
  });

  test('hero CTA buttons link to learn and explore sections', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('.hero-cta a');
    const hrefs = await cta.evaluateAll(els => els.map(e => e.getAttribute('href')));
    expect(hrefs.some(h => h?.includes('learn'))).toBe(true);
    expect(hrefs.some(h => h?.includes('#') || h?.includes('learn'))).toBe(true);
  });

  // ── Cards ────────────────────────────────────────────────

  test('renders section cards for Tools and Playgrounds', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  // ── Footer ───────────────────────────────────────────────

  test('footer is injected and visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.site-footer')).toBeVisible();
  });

});
