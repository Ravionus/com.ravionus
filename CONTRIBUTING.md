# Contributing to Ravionus

Thank you for your interest in contributing! Ravionus is a collection of client-side developer tools, interactive playgrounds, and a learn platform — all with no backend and no sign-up required.

---

## Getting Started

1. **Fork** the repository and clone your fork locally.
2. **Run locally** — no build step needed. Open any `index.html` directly in a browser, or use a local server:
   ```bash
   npx serve .
   ```
3. **Run the tests** before making changes to confirm a clean baseline:
   ```bash
   cd tests
   npm ci
   npx playwright install --with-deps chromium
   npm test -- --project=chromium
   ```

---

## Types of Contributions

| Type | Welcome? |
|------|----------|
| Bug fixes | ✅ Always |
| New tools / playgrounds | ✅ Open an issue first to discuss |
| New learn topics | ✅ Open an issue first |
| Improving existing tool logic | ✅ |
| UI/UX improvements | ✅ |
| Dependency additions | ⚠️ Discuss first — project is intentionally zero-dependency |
| Unrelated refactors | ❌ Please keep PRs focused |

---

## Code Style

- **Vanilla JS** — no frameworks, no bundlers.
- Match the style of the file you're editing (indentation, quote style, etc.).
- Keep tool logic self-contained in the tool's own `index.html`.
- Shared site-wide logic lives in `site.js`.

---

## Adding a New Tool

1. Create `tools/<tool-name>/index.html` following the structure of an existing tool.
2. Add an entry to the tools catalogue in `tools/index.html` and `index.html`.
3. Add a Playwright spec in `tests/<tool-name>.spec.js`.
4. Add a path-filtered job in `.github/workflows/ci.yml`.
5. Run `python scripts/generate_test_map.py` to update `tests/test-map.csv`.

---

## Submitting a Pull Request

1. Create a branch: `git checkout -b fix/short-description`.
2. Make your changes and add/update tests.
3. Verify all tests pass: `npm test -- --project=chromium` (from `tests/`).
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   - `fix(tool-name): ...`
   - `feat(tool-name): ...`
   - `ci: ...`
   - `refactor(tests): ...`
5. Open a PR against `main` and fill in the pull request template.

---

## Reporting Bugs

Use the **Bug report** issue template. Include the exact input that reproduces the issue and the browser/version you observed it in.

---

## Questions

Open a [Discussion](../../discussions) or file an issue with the `question` label.
