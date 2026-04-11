// @ts-check
const { test, expect } = require('@playwright/test');
const { attachErrorListeners, filterBenignErrors } = require('./helpers');

const BASE = 'http://localhost:3000';
const URL  = `${BASE}/tools/html-entity/`;

// ── Smoke tests ───────────────────────────────────────────────────────────────

test.describe('HTML Entity Encoder/Decoder — smoke', () => {
    /** @type {string[]} */
    let errors;

    test.beforeEach(async ({ page }) => {
        errors = attachErrorListeners(page);
        await page.goto(URL);
    });

    test('page loads without JS or CSP errors', async ({ page }) => {
        const real = filterBenignErrors(errors);
        expect(real, 'Unexpected errors: ' + real.join('\n')).toHaveLength(0);
    });

    test('nav bar is visible with breadcrumb containing Dev Tools link', async ({ page }) => {
        await expect(page.locator('nav')).toBeVisible();
        const crumb = page.locator('.page-breadcrumb');
        await expect(crumb).toBeVisible();
        await expect(crumb.locator('a', { hasText: /dev tools/i })).toBeVisible();
    });

    test('Encode and Decode buttons are visible', async ({ page }) => {
        await expect(page.locator('#btnEncode')).toBeVisible();
        await expect(page.locator('#btnDecode')).toBeVisible();
    });

    test('both textareas are visible', async ({ page }) => {
        await expect(page.locator('#inputArea')).toBeVisible();
        // outputPane may be hidden on mobile; check the textarea itself
        const output = page.locator('#outputArea');
        // On desktop the output is shown
        if (await page.evaluate(() => window.innerWidth) > 700) {
            await expect(output).toBeVisible();
        }
    });
});

// ── Feature tests ─────────────────────────────────────────────────────────────

test.describe('HTML Entity Encoder/Decoder — features', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    // ── Named encoding (default style + essential scope) ──

    test('encodes < > & \" \' to named entities by default', async ({ page }) => {
        await page.locator('#inputArea').fill('<script>alert("Hello & \'World\'")</script>');
        await page.locator('#btnEncode').click();
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toContain('&lt;');
        expect(out).toContain('&gt;');
        expect(out).toContain('&amp;');
        expect(out).toContain('&quot;');
        expect(out).toContain('&apos;');
        await expect(page.locator('#successBanner')).toHaveClass(/visible/);
    });

    // ── Decimal encoding ──

    test('decimal style encodes < as &#60;', async ({ page }) => {
        await page.locator('[data-style="decimal"]').click();
        await page.locator('#inputArea').fill('<b>Bold</b>');
        await page.locator('#btnEncode').click();
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toContain('&#60;');
        expect(out).toContain('&#62;');
    });

    // ── Hex encoding ──

    test('hex style encodes < as &#x3C; and > as &#x3E;', async ({ page }) => {
        await page.locator('[data-style="hex"]').click();
        await page.locator('#inputArea').fill('<div>');
        await page.locator('#btnEncode').click();
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toContain('&#x3C;');
        expect(out).toContain('&#x3E;');
    });

    // ── Named entities for special chars ──

    test('named style encodes © as &copy; and ™ as &trade;', async ({ page }) => {
        await page.locator('[data-scope="all"]').click();
        await page.locator('#inputArea').fill('© 2025 Ravionus™');
        await page.locator('#btnEncode').click();
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toContain('&copy;');
        expect(out).toContain('&trade;');
    });

    // ── All non-ASCII scope ──

    test('All non-ASCII scope encodes characters above 127', async ({ page }) => {
        await page.locator('[data-scope="all"]').click();
        await page.locator('#inputArea').fill('café');
        await page.locator('#btnEncode').click();
        const out = await page.locator('#outputArea').inputValue();
        // 'é' (U+00E9) should be encoded; 'caf' should remain plain
        expect(out).toMatch(/&eacute;|&#233;|&#xE9;/i);
        expect(out).toContain('caf');
    });

    // ── Essential scope leaves normal text unchanged ──

    test('Essential scope leaves normal ASCII letters unchanged', async ({ page }) => {
        await page.locator('#inputArea').fill('Hello World 2025');
        await page.locator('#btnEncode').click();
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toBe('Hello World 2025');
    });

    // ── Decoding ──

    test('decodes named entities: &lt;&gt;&amp;&quot;&apos;', async ({ page }) => {
        await page.locator('#inputArea').fill('&lt;script&gt;alert(&quot;XSS &amp; &#39;danger&#39;&quot;)&lt;/script&gt;');
        await page.locator('#btnDecode').click();
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toContain('<script>');
        expect(out).toContain('XSS &');
        await expect(page.locator('#successBanner')).toHaveClass(/visible/);
    });

    test('decodes decimal entities: &#60; &#62;', async ({ page }) => {
        await page.locator('#inputArea').fill('&#60;div&#62;Hello&#60;/div&#62;');
        await page.locator('#btnDecode').click();
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toContain('<div>');
        expect(out).toContain('</div>');
    });

    test('decodes hex entities: &#x3C; &#x3E;', async ({ page }) => {
        await page.locator('#inputArea').fill('&#x3C;em&#x3E;italic&#x3C;/em&#x3E;');
        await page.locator('#btnDecode').click();
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toContain('<em>');
        expect(out).toContain('</em>');
    });

    test('decodes mixed entity types in one pass', async ({ page }) => {
        await page.locator('#inputArea').fill('&lt;!-- &#169; &#x2013; &mdash; --&gt;');
        await page.locator('#btnDecode').click();
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toContain('<!--');
        expect(out).toContain('©');
    });

    // ── Empty input ──

    test('empty input shows error banner without alert/dialog', async ({ page }) => {
        let alertFired = false;
        page.on('dialog', d => { alertFired = true; d.dismiss(); });
        await page.locator('#inputArea').fill('');
        await page.locator('#btnEncode').click();
        await expect(page.locator('#errorBanner')).toHaveClass(/visible/);
        expect(alertFired).toBe(false);
    });

    // ── Sample button ──

    test('Sample button populates input area', async ({ page }) => {
        await page.locator('#btnSample').click();
        const val = await page.locator('#inputArea').inputValue();
        expect(val.trim().length).toBeGreaterThan(0);
    });

    // ── Copy output ──

    test('Copy button shows a toast after encoding', async ({ page }) => {
        await page.locator('#inputArea').fill('<test>');
        await page.locator('#btnEncode').click();
        await page.locator('#btnCopy').click();
        await expect(page.locator('#toast')).toHaveClass(/show/);
        const text = await page.locator('#toast').textContent();
        expect(text.toLowerCase()).toMatch(/cop/);
    });

    // ── Clear ──

    test('Clear button resets both input and output', async ({ page }) => {
        await page.locator('#inputArea').fill('<b>Hello</b>');
        await page.locator('#btnEncode').click();
        const before = await page.locator('#outputArea').inputValue();
        expect(before.length).toBeGreaterThan(0);
        await page.locator('#btnClear').click();
        await expect(page.locator('#inputArea')).toHaveValue('');
        await expect(page.locator('#outputArea')).toHaveValue('');
    });

    // ── localStorage round-trip ──

    test('localStorage saves and restores input after reload', async ({ page }) => {
        const input = '<div class="card">Save me</div>';
        await page.locator('#inputArea').fill(input);
        await page.waitForTimeout(1000);
        await page.reload();
        await expect(page.locator('#inputArea')).toHaveValue(input);
    });

    // ── Mobile tab switching ──

    test('mobile: output tab shows output pane', async ({ page }) => {
        await page.setViewportSize({ width: 400, height: 700 });
        await page.reload();
        await expect(page.locator('#outputPane')).not.toHaveClass(/mob-visible/);
        await page.locator('#tabOutput').click();
        await expect(page.locator('#outputPane')).toHaveClass(/mob-visible/);
        await expect(page.locator('#inputPane')).not.toHaveClass(/mob-visible/);
    });

    // ── Keyboard shortcut ──

    test('Ctrl+Enter triggers encode', async ({ page }) => {
        await page.locator('#inputArea').fill('<kbd>Ctrl+Enter</kbd>');
        await page.locator('#inputArea').press('Control+Enter');
        const out = await page.locator('#outputArea').inputValue();
        expect(out).toContain('&lt;');
    });

    // ── Status bar ──

    test('status bar updates with entity count after encode', async ({ page }) => {
        await page.locator('#inputArea').fill('<b>Test & check</b>');
        await page.locator('#btnEncode').click();
        const count = await page.locator('#statCount').textContent();
        expect(parseInt(count, 10)).toBeGreaterThan(0);
    });
});
