// @ts-check
'use strict';

/**
 * Attaches `pageerror` and console-error listeners to the page and returns
 * the shared errors array.  Call before page.goto() so that errors from
 * navigation are captured.
 *
 * @param {import('@playwright/test').Page} page
 * @returns {string[]}
 */
function attachErrorListeners(page) {
    const errors = /** @type {string[]} */ ([]);
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    return errors;
}

/**
 * Filters known-benign browser noise from an error list.
 *
 * Removed by default:
 *   - `favicon`          — 404 for missing favicons
 *   - `net::ERR`         — generic network / DNS errors (test env noise)
 *   - `ERR_FILE_NOT_FOUND` — local file-not-found (test env noise)
 *
 * Pass extra substrings in `extras` to suppress additional patterns
 * (e.g. `['CSP', 'CORS', 'NetworkError', 'Failed to fetch']`).
 *
 * @param {string[]} errors
 * @param {string[]} [extras]
 * @returns {string[]}
 */
function filterBenignErrors(errors, extras = []) {
    const patterns = ['favicon', 'net::ERR', 'ERR_FILE_NOT_FOUND', ...extras];
    return errors.filter(e => !patterns.some(p => e.includes(p)));
}

module.exports = { attachErrorListeners, filterBenignErrors };
