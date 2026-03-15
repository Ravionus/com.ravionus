"""
_fix_og_meta.py — one-shot migration:
  1. og:image / twitter:image  svg → png
  2. add og:site_name           (if missing)
  3. add og:image:alt           (if missing)
"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {'tests', 'playwright-report', 'test-results', '_site',
             '.git', 'node_modules', 'scripts'}
ALT = 'Ravionus — developer tools, interactive playgrounds, and bite-sized learning.'
count = 0

for dirpath, dirs, files in os.walk(ROOT):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for f in files:
        if not f.endswith('.html') or 'auth-test' in f:
            continue
        filepath = os.path.join(dirpath, f)
        with open(filepath, 'r', encoding='utf-8') as fh:
            txt = fh.read()
        orig = txt

        # 1. svg → png
        txt = txt.replace('og-image.svg', 'og-image.png')

        # 2. og:site_name after og:type
        if 'og:site_name' not in txt and 'og:type' in txt:
            txt = re.sub(
                r'(<meta property="og:type"[^>]+>)',
                r'\1\n    <meta property="og:site_name" content="Ravionus">',
                txt,
                count=1
            )

        # 3. og:image:alt after og:image:height
        if 'og:image:alt' not in txt and 'og:image:height' in txt:
            txt = re.sub(
                r'(<meta property="og:image:height"[^>]+>)',
                r'\1\n    <meta property="og:image:alt" content="' + ALT + '">',
                txt,
                count=1
            )

        if txt != orig:
            with open(filepath, 'w', encoding='utf-8') as fh:
                fh.write(txt)
            count += 1
            print('Updated:', os.path.relpath(filepath, ROOT))

print(f'\nTotal updated: {count}')
