// @ts-check
const { test, expect } = require('@playwright/test');
const { attachErrorListeners, filterBenignErrors } = require('./helpers');

const BASE = 'http://localhost:3000';
const URL  = `${BASE}/playground/code-formatter/`;

// ── Helpers ───────────────────────────────────────────────────────────────────

async function waitForReady(page) {
    await page.waitForSelector('body[data-ready="true"]', { timeout: 10_000 });
}

// ── Smoke tests ───────────────────────────────────────────────────────────────

test.describe('Code Formatter — smoke', () => {
    /** @type {string[]} */
    let errors;

    test.beforeEach(async ({ page }) => {
        errors = attachErrorListeners(page);
        await page.goto(URL);
    });

    test('page loads without JS or CSP errors', async ({ page }) => {
        // Allow only benign CDN 404 / network warnings, not real JS errors
        const real = filterBenignErrors(errors, ['NetworkError', 'Failed to fetch']);
        expect(real, 'Unexpected errors: ' + real.join('\n')).toHaveLength(0);
    });

    test('nav bar is visible and breadcrumb contains Playgrounds link', async ({ page }) => {
        await expect(page.locator('nav')).toBeVisible();
        const crumb = page.locator('.page-breadcrumb');
        await expect(crumb).toBeVisible();
        await expect(crumb.locator('a', { hasText: /playgrounds/i })).toBeVisible();
    });

    test('primary toolbar buttons are visible', async ({ page }) => {
        await expect(page.locator('#btnFormat')).toBeVisible();
        await expect(page.locator('#btnCopy')).toBeVisible();
        await expect(page.locator('#btnClear')).toBeVisible();
    });

    test('CDN scripts load and set body[data-ready="true"]', async ({ page }) => {
        await waitForReady(page);
        const ready = await page.evaluate(() => document.body.dataset.ready);
        expect(ready).toBe('true');
    });
});

// ── Feature tests ─────────────────────────────────────────────────────────────

test.describe('Code Formatter — features', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    // ── Language UI ──

    test('Auto tab is active by default', async ({ page }) => {
        const autoBtn = page.locator('[data-lang="auto"]');
        await expect(autoBtn).toHaveClass(/active/);
    });

    test('all six language tabs are present and clickable', async ({ page }) => {
        const langs = ['auto', 'json', 'js', 'html', 'css', 'sql'];
        for (const l of langs) {
            await expect(page.locator(`[data-lang="${l}"]`), `${l} tab missing`).toBeVisible();
        }
        // Click SQL and verify it becomes active
        await page.locator('[data-lang="sql"]').click();
        await expect(page.locator('[data-lang="sql"]')).toHaveClass(/active/);
        await expect(page.locator('[data-lang="auto"]')).not.toHaveClass(/active/);
    });

    // ── JSON formatting ──

    test('formats valid JSON and shows success banner', async ({ page }) => {
        const input = '{"name":"Alice","age":30,"hobbies":["reading","coding"]}';
        await page.locator('#inputArea').fill(input);
        await page.locator('#btnFormat').click();
        const output = await page.locator('#outputArea').inputValue();
        expect(output).toContain('"name": "Alice"');
        expect(output).toContain('"hobbies"');
        await expect(page.locator('#successBanner')).toHaveClass(/visible/);
    });

    test('invalid JSON shows error banner without triggering alert', async ({ page }) => {
        let alertFired = false;
        page.on('dialog', d => { alertFired = true; d.dismiss(); });
        await page.locator('[data-lang="json"]').click();
        await page.locator('#inputArea').fill('{broken: json,}');
        await page.locator('#btnFormat').click();
        await expect(page.locator('#errorBanner')).toHaveClass(/visible/);
        expect(alertFired).toBe(false);
    });

    // ── CDN-dependent formatting ──

    test('formats JavaScript after CDN loads', async ({ page }) => {
        await waitForReady(page);
        const input = 'function add(a,b){return a+b;}const square=x=>x*x;';
        await page.locator('[data-lang="js"]').click();
        await page.locator('#inputArea').fill(input);
        await page.locator('#btnFormat').click();
        const output = await page.locator('#outputArea').inputValue();
        expect(output).toContain('function');
        expect(output.split('\n').length).toBeGreaterThan(1);
    });

    test('formats HTML after CDN loads', async ({ page }) => {
        await waitForReady(page);
        const input = '<!DOCTYPE html><html><head><title>T</title></head><body><h1>Hello</h1></body></html>';
        await page.locator('[data-lang="html"]').click();
        await page.locator('#inputArea').fill(input);
        await page.locator('#btnFormat').click();
        const output = await page.locator('#outputArea').inputValue();
        expect(output).toContain('<title>');
        expect(output.split('\n').length).toBeGreaterThan(3);
    });

    test('formats CSS after CDN loads', async ({ page }) => {
        await waitForReady(page);
        const input = '.card{background:#fff;border-radius:8px;padding:20px;margin:0 auto;}';
        await page.locator('[data-lang="css"]').click();
        await page.locator('#inputArea').fill(input);
        await page.locator('#btnFormat').click();
        const output = await page.locator('#outputArea').inputValue();
        expect(output).toContain('background');
        expect(output.split('\n').length).toBeGreaterThan(2);
    });

    // ── SQL formatting (no CDN needed) ──

    test('formats SQL: uppercases keywords and adds newlines', async ({ page }) => {
        const input = 'select id, name from users where active = 1 group by id order by name limit 10';
        await page.locator('[data-lang="sql"]').click();
        await page.locator('#inputArea').fill(input);
        await page.locator('#btnFormat').click();
        const output = await page.locator('#outputArea').inputValue();
        expect(output).toContain('SELECT');
        expect(output).toContain('FROM');
        expect(output).toContain('WHERE');
        expect(output.split('\n').length).toBeGreaterThan(1);
    });

    // ── Edge cases ──

    test('empty input shows error banner', async ({ page }) => {
        await page.locator('#inputArea').fill('');
        await page.locator('#btnFormat').click();
        await expect(page.locator('#errorBanner')).toHaveClass(/visible/);
    });

    // ── Sample button ──

    test('Sample button populates input area', async ({ page }) => {
        await page.locator('#btnSample').click();
        const val = await page.locator('#inputArea').inputValue();
        expect(val.trim().length).toBeGreaterThan(0);
    });

    test('Sample+Format JSON roundtrip produces valid JSON output', async ({ page }) => {
        await page.locator('[data-lang="json"]').click();
        await page.locator('#btnSample').click();
        await page.locator('#btnFormat').click();
        const output = await page.locator('#outputArea').inputValue();
        expect(() => JSON.parse(output)).not.toThrow();
        expect(output).toContain('"name"');
    });

    // ── Copy ──

    test('Copy output shows a toast containing "cop" (handles clipboard permission)', async ({ page }) => {
        // Format JSON first so there is content to copy
        await page.locator('#inputArea').fill('{"x":1}');
        await page.locator('#btnFormat').click();
        await page.locator('#btnCopy').click();
        // Toast text should contain "cop" from "Copied" or "copy" in error message
        await expect(page.locator('#toast')).toHaveClass(/show/);
        const toastText = await page.locator('#toast').textContent();
        expect(toastText.toLowerCase()).toMatch(/cop/);
    });

    // ── Clear ──

    test('Clear button resets both input and output areas', async ({ page }) => {
        await page.locator('#inputArea').fill('{"test":true}');
        await page.locator('#btnFormat').click();
        // Verify there is output
        const before = await page.locator('#outputArea').inputValue();
        expect(before.length).toBeGreaterThan(0);
        // Now clear
        await page.locator('#btnClear').click();
        await expect(page.locator('#inputArea')).toHaveValue('');
        await expect(page.locator('#outputArea')).toHaveValue('');
    });

    // ── Download ──

    test('Download button shows toast after formatting', async ({ page }) => {
        await page.locator('#inputArea').fill('{"download":true}');
        await page.locator('#btnFormat').click();
        // Set up download handler to prevent file system dialog from hanging
        const [download] = await Promise.all([
            page.waitForEvent('download').catch(() => null),
            page.locator('#btnDownload').click()
        ]);
        // Either a download was triggered or a toast appeared
        const toastText = await page.locator('#toast').textContent().catch(() => '');
        const hasToast  = /download|format/i.test(toastText);
        expect(download !== null || hasToast).toBe(true);
    });

    // ── localStorage ──

    test('localStorage saves and restores input after reload', async ({ page }) => {
        const testInput = '{"persist":"yes","value":42}';
        await page.locator('#inputArea').fill(testInput);
        // Wait for debounced save (800 ms)
        await page.waitForTimeout(1000);
        await page.reload();
        await expect(page.locator('#inputArea')).toHaveValue(testInput);
    });

    // ── Mobile tabs ──

    test('mobile: output tab click shows output pane', async ({ page }) => {
        await page.setViewportSize({ width: 400, height: 700 });
        await page.reload();
        // Input tab should be active by default; output pane hidden
        await expect(page.locator('#outputPane')).not.toHaveClass(/mob-visible/);
        await page.locator('#tabOutput').click();
        await expect(page.locator('#outputPane')).toHaveClass(/mob-visible/);
        await expect(page.locator('#inputPane')).not.toHaveClass(/mob-visible/);
    });
});
