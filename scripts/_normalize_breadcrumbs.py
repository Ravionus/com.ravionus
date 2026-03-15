#!/usr/bin/env python3
"""
_normalize_breadcrumbs.py — Normalise every page-breadcrumb div to a
canonical, consistent form:

    <div class="page-breadcrumb">
        <a href="/">Ravionus</a>
        <span class="sep">›</span>
        <a href="/tools/">Dev Tools</a>   (or /playground/ / Playgrounds)
        <span class="sep">›</span>
        <span class="crumb-current">TOOL NAME</span>
    </div>

Fixes:
  – Separator character standardised to › (chevron)
  – Separator always wrapped in <span class="sep">
  – Last crumb always has class="crumb-current"
  – Parent href always absolute (/tools/ or /playground/)
  – Indentation normalised (4-space, hanging under the div)

Usage:
    python scripts/_normalize_breadcrumbs.py [--dry-run]
"""

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DRY_RUN   = '--dry-run' in sys.argv

# Regex: capture the full breadcrumb div (non-greedy, handles multi-line)
_BC_RE = re.compile(
    r'(<div\s+class="page-breadcrumb">)(.*?)(</div>)',
    re.DOTALL
)

# Extract all <a href="...">text</a> from an HTML fragment
_A_RE  = re.compile(r'<a\b[^>]*href="([^"]*)"[^>]*>(.*?)</a>', re.DOTALL)

# Get the text content of the LAST <span ...> or bare text node after the last </a>
_LAST_SPAN_RE = re.compile(r'<span[^>]*>(.*?)</span>', re.DOTALL)

def inner_text(html: str) -> str:
    """Strip all tags and return plain text."""
    return re.sub(r'<[^>]+>', '', html).strip()


def canonical_crumb_name(file_path: Path) -> str | None:
    """
    Try to extract the current-page label from an existing breadcrumb block in
    the file, falling back to None if not parseable.
    """
    text = file_path.read_text(encoding='utf-8')
    m = _BC_RE.search(text)
    if not m:
        return None
    inner = m.group(2)
    # All <span> texts found
    spans = [inner_text(s) for s in _LAST_SPAN_RE.findall(inner)]
    # The current-page label is the LAST non-empty span (or last anchor text if no spans)
    for s in reversed(spans):
        if s:
            return s
    # Fallback: text after last </a>
    after_last_a = re.split(r'</a>', inner)[-1]
    cleaned = inner_text(after_last_a)
    return cleaned if cleaned else None


def build_canonical(parent_href: str, parent_label: str, crumb_name: str) -> str:
    return (
        '<div class="page-breadcrumb">\n'
        '    <a href="/">Ravionus</a>\n'
        '    <span class="sep">›</span>\n'
        f'    <a href="{parent_href}">{parent_label}</a>\n'
        '    <span class="sep">›</span>\n'
        f'    <span class="crumb-current">{crumb_name}</span>\n'
        '</div>'
    )


def needs_fix(inner: str, parent_href: str, parent_label: str, crumb_name: str) -> bool:
    """Return True if the existing inner HTML differs from canonical."""
    canonical_inner = (
        f'\n    <a href="/">Ravionus</a>\n'
        f'    <span class="sep">›</span>\n'
        f'    <a href="{parent_href}">{parent_label}</a>\n'
        f'    <span class="sep">›</span>\n'
        f'    <span class="crumb-current">{crumb_name}</span>\n'
    )
    return inner.strip() != canonical_inner.strip()


def process_file(path: Path, parent_href: str, parent_label: str) -> bool:
    """Fix the breadcrumb in a single file. Returns True if a change was made."""
    text = path.read_text(encoding='utf-8')
    m = _BC_RE.search(text)
    if not m:
        print(f'  SKIP (no breadcrumb found): {path.relative_to(REPO_ROOT)}')
        return False

    crumb_name = canonical_crumb_name(path)
    if not crumb_name:
        print(f'  SKIP (cannot detect crumb name): {path.relative_to(REPO_ROOT)}')
        return False

    canonical = build_canonical(parent_href, parent_label, crumb_name)

    if not needs_fix(m.group(2), parent_href, parent_label, crumb_name):
        print(f'  OK  (already canonical): {path.relative_to(REPO_ROOT)}')
        return False

    new_text = text[:m.start()] + canonical + text[m.end():]

    rel = path.relative_to(REPO_ROOT)
    if DRY_RUN:
        print(f'  DRY {rel}  →  crumb="{crumb_name}"')
    else:
        path.write_text(new_text, encoding='utf-8')
        print(f'  FIX {rel}  →  crumb="{crumb_name}"')

    return True


def main():
    changed = 0

    # ── Tools (/tools/*/index.html) ──────────────────────────────────────────
    print('\n── Tools ──')
    for path in sorted((REPO_ROOT / 'tools').glob('*/index.html')):
        if process_file(path, '/tools/', 'Dev Tools'):
            changed += 1

    # ── Playgrounds (/playground/*/index.html) ───────────────────────────────
    print('\n── Playgrounds ──')
    for path in sorted((REPO_ROOT / 'playground').glob('*/index.html')):
        if process_file(path, '/playground/', 'Playgrounds'):
            changed += 1

    print(f'\n{"DRY-RUN: " if DRY_RUN else ""}Fixed {changed} file(s).')


if __name__ == '__main__':
    main()
