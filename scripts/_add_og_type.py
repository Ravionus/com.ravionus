"""One-time script: add og:image:type meta after each og:image meta tag."""
import pathlib
import re

root = pathlib.Path(__file__).parent.parent
changed = 0
for f in root.rglob("*.html"):
    text = f.read_text(encoding="utf-8")
    if 'og:image"' in text and "og:image:type" not in text:
        new = re.sub(
            r'(<meta property="og:image" content="[^"]+">)',
            r'\1\n    <meta property="og:image:type" content="image/png">',
            text,
        )
        if new != text:
            f.write_text(new, encoding="utf-8")
            changed += 1
            print(f"  {f.relative_to(root)}")
print(f"Total: {changed} files updated")
