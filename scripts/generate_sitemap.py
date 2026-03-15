#!/usr/bin/env python3
"""
generate_sitemap.py — auto-generate sitemap.xml from the repo's HTML pages.

Run:
    python scripts/generate_sitemap.py

- Discovers every index.html under the repo root (excluding tests, _site,
  auth-test.html, learn/topic.html, and 404.html).
- Derives the canonical URL from the file path.
- Uses `git log` to set <lastmod> to the file's last-commit date (ISO 8601).
  Falls back to today's date if the file isn't tracked yet.
- Writes sitemap.xml to the repo root.
"""

import os
import subprocess
from datetime import date, timezone

BASE_URL  = 'https://ravionus.com'
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_FILE  = os.path.join(REPO_ROOT, 'sitemap.xml')

# Files/dirs to skip entirely
SKIP_DIRS  = {'tests', 'playwright-report', 'test-results', '_site',
              '.git', 'node_modules', 'scripts'}
SKIP_FILES = {'auth-test.html', 'topic.html'}  # dynamic or dev-only


def git_lastmod(filepath):
    """Return the ISO-8601 date of the file's last git commit, or today."""
    try:
        out = subprocess.check_output(
            ['git', 'log', '--format=%ai', '-1', '--', filepath],
            cwd=REPO_ROOT, stderr=subprocess.DEVNULL
        ).decode().strip()
        if out:
            return out[:10]   # 'YYYY-MM-DD'
    except Exception:
        pass
    return date.today().isoformat()


def url_for(relpath):
    """Convert a relative file path to its canonical URL path."""
    parts = relpath.replace('\\', '/').split('/')
    # Strip trailing 'index.html'
    if parts[-1] == 'index.html':
        parts = parts[:-1]
    path = '/'.join(parts)
    return BASE_URL + ('/' + path + '/' if path else '/')


def priority_and_freq(relpath):
    parts = relpath.replace('\\', '/').split('/')
    depth = len([p for p in parts if p not in ('', 'index.html')])
    if depth == 0:
        return '1.0', 'monthly'        # homepage
    if depth == 1:
        freq = 'weekly' if parts[0] == 'learn' else 'monthly'
        return '0.9', freq             # section index
    return '0.8', 'monthly'            # individual tool/playground


def discover_pages():
    pages = []
    for dirpath, dirs, files in os.walk(REPO_ROOT):
        dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS)
        for fname in sorted(files):
            if fname not in ('index.html',):
                continue
            filepath = os.path.join(dirpath, fname)
            relpath  = os.path.relpath(filepath, REPO_ROOT)
            if any(s in relpath for s in SKIP_FILES):
                continue
            pages.append(relpath)
    return pages


def build_sitemap(pages):
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for relpath in pages:
        loc      = url_for(relpath)
        lastmod  = git_lastmod(relpath)
        pri, freq = priority_and_freq(relpath)
        lines.append(
            f'  <url>'
            f'<loc>{loc}</loc>'
            f'<lastmod>{lastmod}</lastmod>'
            f'<changefreq>{freq}</changefreq>'
            f'<priority>{pri}</priority>'
            f'</url>'
        )
    lines.append('</urlset>')
    return '\n'.join(lines) + '\n'


def main():
    pages = discover_pages()
    xml   = build_sitemap(pages)
    with open(OUT_FILE, 'w', encoding='utf-8', newline='\n') as f:
        f.write(xml)
    print(f'sitemap.xml written — {len(pages)} URLs')
    for p in pages:
        print(f'  {url_for(p)}')


if __name__ == '__main__':
    main()
