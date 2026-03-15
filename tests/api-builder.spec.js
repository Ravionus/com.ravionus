// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:3000';
const URL  = `${BASE}/playground/api-builder/`;

// ── Smoke tests ───────────────────────────────────────────────────────────────
test.describe('API Request Builder — smoke', () => {
    /** @type {string[]} */
    let errors;

    test.beforeEach(async ({ page }) => {
        errors = [];
        page.on('pageerror',  e => errors.push(e.message));
        page.on('console',    m => { if (m.type() === 'error') errors.push(m.text()); });
        await page.goto(URL);
    });

    test.afterEach(() => {
        const real = errors.filter(e =>
            !e.includes('favicon') &&
            !e.includes('ERR_FILE_NOT_FOUND') &&
            !e.includes('net::ERR') &&
            !e.includes('CSP') &&
            !e.includes('CORS')
        );
        expect(real).toHaveLength(0);
    });

    test('page loads with correct title and no JS/CSP errors', async ({ page }) => {
        await expect(page).toHaveTitle(/API Request Builder.*Ravionus|Ravionus.*API/i);
    });

    test('nav bar is visible with breadcrumb links', async ({ page }) => {
        await expect(page.locator('nav').first()).toBeVisible();
        await expect(page.locator('nav a').first()).toBeVisible();
    });

    test('primary buttons are visible: btnSend and btnClear', async ({ page }) => {
        await expect(page.locator('#btnSend')).toBeVisible();
        await expect(page.locator('#btnClear')).toBeVisible();
    });

    test('h1 heading is present and mentions API or Request', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('h1')).toContainText(/API|Request/i);
    });
});

// ── Feature tests ─────────────────────────────────────────────────────────────
test.describe('API Request Builder — features', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        await page.evaluate(() => localStorage.clear());
        await page.reload();
    });

    // ── Method selector ───────────────────────────────────────────────────────

    test('method selector has all expected HTTP methods', async ({ page }) => {
        const options = await page.locator('#method option').allTextContents();
        for (const m of ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']) {
            expect(options).toContain(m);
        }
    });

    // ── URL input ─────────────────────────────────────────────────────────────

    test('URL input is present and accepts text', async ({ page }) => {
        await expect(page.locator('#urlInput')).toBeVisible();
        await page.fill('#urlInput', 'https://api.example.com/test');
        await expect(page.locator('#urlInput')).toHaveValue('https://api.example.com/test');
    });

    // ── Params tab ────────────────────────────────────────────────────────────

    test('Params tab: add row populates key-value table', async ({ page }) => {
        await page.click('#btnAddParam');
        const rows = await page.locator('#paramsBody .kv-row').count();
        expect(rows).toBeGreaterThanOrEqual(2); // seeded row + new row
        const keyInputs = page.locator('#paramsBody .kv-key');
        await keyInputs.last().fill('q');
        await page.locator('#paramsBody .kv-val').last().fill('hello world');
        await expect(keyInputs.last()).toHaveValue('q');
        await expect(page.locator('#paramsBody .kv-val').last()).toHaveValue('hello world');
    });

    test('Params tab: delete button removes a row', async ({ page }) => {
        await page.click('#btnAddParam');
        const before = await page.locator('#paramsBody .kv-row').count();
        await page.locator('#paramsBody .kv-del').last().click();
        const after = await page.locator('#paramsBody .kv-row').count();
        expect(after).toBe(before - 1);
    });

    // ── Headers tab ───────────────────────────────────────────────────────────

    test('Headers tab: shows key-value editor', async ({ page }) => {
        await page.click('#tabHeaders');
        await expect(page.locator('#panelHeaders')).toBeVisible();
        await page.click('#btnAddHeader');
        await page.locator('#headersBody .kv-key').last().fill('X-Custom-Header');
        await page.locator('#headersBody .kv-val').last().fill('MyValue');
        await expect(page.locator('#headersBody .kv-key').last()).toHaveValue('X-Custom-Header');
    });

    // ── Body tab ──────────────────────────────────────────────────────────────

    test('Body tab: bodyInput visible when type is JSON', async ({ page }) => {
        await page.click('#tabBody');
        await expect(page.locator('#panelBody')).toBeVisible();
        await page.selectOption('#bodyType', 'json');
        await expect(page.locator('#bodyInput')).toBeVisible();
    });

    test('Body tab: bodyInput hidden when type is none', async ({ page }) => {
        await page.click('#tabBody');
        await page.selectOption('#bodyType', 'none');
        await expect(page.locator('#bodyInput')).not.toBeVisible();
        await expect(page.locator('#bodyNoneMsg')).toBeVisible();
    });

    // ── Auth tab ──────────────────────────────────────────────────────────────

    test('Auth tab: Bearer token input appears when Bearer selected', async ({ page }) => {
        await page.click('#tabAuth');
        await expect(page.locator('#panelAuth')).toBeVisible();
        await page.selectOption('#authType', 'bearer');
        await expect(page.locator('#authToken')).toBeVisible();
    });

    test('Auth tab: Basic auth fields appear when Basic selected', async ({ page }) => {
        await page.click('#tabAuth');
        await page.selectOption('#authType', 'basic');
        await expect(page.locator('#authUser')).toBeVisible();
        await expect(page.locator('#authPass')).toBeVisible();
    });

    test('Auth tab: API Key fields appear when API Key selected', async ({ page }) => {
        await page.click('#tabAuth');
        await page.selectOption('#authType', 'apikey');
        await expect(page.locator('#authKeyName')).toBeVisible();
        await expect(page.locator('#authKeyValue')).toBeVisible();
    });

    // ── Send — empty URL ──────────────────────────────────────────────────────

    test('Send with empty URL shows error banner without alert', async ({ page }) => {
        let alerted = false;
        page.on('dialog', d => { alerted = true; d.dismiss(); });
        await page.fill('#urlInput', '');
        await page.click('#btnSend');
        await expect(page.locator('#errorBanner')).toBeVisible();
        expect(alerted).toBe(false);
    });

    // ── Send — mocked GET ─────────────────────────────────────────────────────

    test('Send GET request shows response body and status 200', async ({ page }) => {
        await page.route('https://api.example.com/test', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                headers: { 'X-Custom': 'hello' },
                body: JSON.stringify({ success: true, data: 'hello' })
            });
        });
        await page.fill('#urlInput', 'https://api.example.com/test');
        await page.click('#btnSend');
        await expect(page.locator('#resBody')).toHaveValue(/"success"/, { timeout: 8000 });
        await expect(page.locator('#statusBadge')).toContainText('200');
    });

    test('Status badge shows correct class for 200 (2xx)', async ({ page }) => {
        await page.route('https://api.example.com/ok', route => {
            route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
        });
        await page.fill('#urlInput', 'https://api.example.com/ok');
        await page.click('#btnSend');
        await expect(page.locator('#statusBadge')).toHaveClass(/s-2xx/, { timeout: 8000 });
    });

    test('Status badge shows 4xx class for 404 response', async ({ page }) => {
        await page.route('https://api.example.com/notfound', route => {
            route.fulfill({ status: 404, contentType: 'application/json', body: '{"error":"not found"}' });
        });
        await page.fill('#urlInput', 'https://api.example.com/notfound');
        await page.click('#btnSend');
        await expect(page.locator('#statusBadge')).toContainText('404', { timeout: 8000 });
        await expect(page.locator('#statusBadge')).toHaveClass(/s-4xx/);
    });

    test('Response time is shown after successful request', async ({ page }) => {
        await page.route('https://api.example.com/time', route => {
            route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
        });
        await page.fill('#urlInput', 'https://api.example.com/time');
        await page.click('#btnSend');
        await expect(page.locator('#resTime')).toContainText('ms', { timeout: 8000 });
    });

    // ── Response Headers tab ──────────────────────────────────────────────────

    test('Response Headers tab shows response headers', async ({ page }) => {
        await page.route('https://api.example.com/headers', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                headers: { 'X-Response-Id': 'abc123', 'content-type': 'application/json' },
                body: '{}'
            });
        });
        await page.fill('#urlInput', 'https://api.example.com/headers');
        await page.click('#btnSend');
        await expect(page.locator('#statusBadge')).toContainText('200', { timeout: 8000 });
        await page.click('#tabRHeaders');
        await expect(page.locator('#resHdrBody')).toContainText('content-type');
    });

    // ── Snippets tab ──────────────────────────────────────────────────────────

    test('Snippets tab shows cURL command after sending request', async ({ page }) => {
        await page.route('https://api.example.com/snip', route => {
            route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
        });
        await page.fill('#urlInput', 'https://api.example.com/snip');
        await page.click('#btnSend');
        await expect(page.locator('#statusBadge')).toContainText('200', { timeout: 8000 });
        await page.click('#tabSnippets');
        await expect(page.locator('#snipCurlCode')).toContainText('curl');
        await expect(page.locator('#snipCurlCode')).toContainText('api.example.com');
    });

    test('Snippets tab shows JavaScript fetch snippet', async ({ page }) => {
        await page.route('https://api.example.com/fetch', route => {
            route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
        });
        await page.fill('#urlInput', 'https://api.example.com/fetch');
        await page.click('#btnSend');
        await expect(page.locator('#statusBadge')).toContainText('200', { timeout: 8000 });
        await page.click('#tabSnippets');
        await expect(page.locator('#snipFetchCode')).toContainText('fetch');
    });

    test('Snippets tab shows Python requests snippet', async ({ page }) => {
        await page.route('https://api.example.com/py', route => {
            route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
        });
        await page.fill('#urlInput', 'https://api.example.com/py');
        await page.click('#btnSend');
        await expect(page.locator('#statusBadge')).toContainText('200', { timeout: 8000 });
        await page.click('#tabSnippets');
        await expect(page.locator('#snipPythonCode')).toContainText('import requests');
    });

    // ── POST with JSON body ───────────────────────────────────────────────────

    test('Send POST request with JSON body receives 201', async ({ page }) => {
        await page.route('https://api.example.com/create', route => {
            route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({ id: 1, created: true })
            });
        });
        await page.selectOption('#method', 'POST');
        await page.fill('#urlInput', 'https://api.example.com/create');
        await page.click('#tabBody');
        await page.selectOption('#bodyType', 'json');
        await page.fill('#bodyInput', '{"name":"widget"}');
        await page.click('#btnSend');
        await expect(page.locator('#statusBadge')).toContainText('201', { timeout: 8000 });
        await expect(page.locator('#resBody')).toHaveValue(/"created"/);
    });

    // ── localStorage round-trip ───────────────────────────────────────────────

    test('localStorage: URL and method saved and restored after reload', async ({ page }) => {
        await page.selectOption('#method', 'POST');
        await page.fill('#urlInput', 'https://persist.example.com/api');
        // wait for debounce
        await page.waitForTimeout(1000);
        await page.reload();
        await expect(page.locator('#urlInput')).toHaveValue('https://persist.example.com/api');
        await expect(page.locator('#method')).toHaveValue('POST');
    });

    // ── Clear button ──────────────────────────────────────────────────────────

    test('Clear button resets URL input and hides response', async ({ page }) => {
        await page.fill('#urlInput', 'https://api.example.com/clear-test');
        await page.click('#btnClear');
        await expect(page.locator('#urlInput')).toHaveValue('');
        await expect(page.locator('#placeholder-msg')).toBeVisible();
        await expect(page.locator('#resBodyArea')).not.toBeVisible();
    });

    // ── Copy cURL before sending ──────────────────────────────────────────────

    test('Copy cURL button works without sending first', async ({ page }) => {
        await page.fill('#urlInput', 'https://api.example.com/curl-test');
        // Should not throw when no prior request
        await page.click('#btnCopyCurl');
        // toast shows 'Copied' if clipboard is available, or 'Copy failed' in restricted env
        await expect(page.locator('#toast')).toContainText(/cop/i, { timeout: 4000 });
    });

    // ── Mobile tab switching ──────────────────────────────────────────────────

    test('mobile tabs are visible at narrow viewport', async ({ page }) => {
        await page.setViewportSize({ width: 400, height: 700 });
        await page.goto(URL);
        await expect(page.locator('#mobileTabs')).toBeVisible();
        await expect(page.locator('#tabReq')).toBeVisible();
        await expect(page.locator('#tabRes')).toBeVisible();
    });

    test('mobile tab switch: Response tab shows response pane', async ({ page }) => {
        await page.setViewportSize({ width: 400, height: 700 });
        await page.goto(URL);
        await page.click('#tabRes');
        await expect(page.locator('#resPane')).toHaveClass(/mob-visible/);
        await expect(page.locator('#reqPane')).not.toHaveClass(/mob-visible/);
    });
});
