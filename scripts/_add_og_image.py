import os, re

INSERT = (
    '\n    <meta property="og:image" content="https://ravionus.com/og-image.svg">'
    '\n    <meta property="og:image:width" content="1200">'
    '\n    <meta property="og:image:height" content="630">'
    '\n    <meta name="twitter:card" content="summary_large_image">'
    '\n    <meta name="twitter:image" content="https://ravionus.com/og-image.svg">'
)

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP_DIRS = {'tests', 'playwright-report', 'test-results', '_site', '.git', 'node_modules', 'scripts'}
count = 0

for dirpath, dirs, files in os.walk(ROOT):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for f in files:
        if not f.endswith('.html'):
            continue
        path = os.path.join(dirpath, f)
        if 'auth-test' in f:
            continue
        with open(path, 'r', encoding='utf-8') as fh:
            txt = fh.read()
        if 'og:url' not in txt or 'og:image' in txt:
            continue
        txt2 = re.sub(r'(<meta property="og:url"[^>]+>)', r'\1' + INSERT, txt)
        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(txt2)
        count += 1
        print('Updated:', os.path.relpath(path, ROOT))

print(f'\nTotal updated: {count}')
