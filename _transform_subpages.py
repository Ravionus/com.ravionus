"""
Transform sub-page nav elements to use site.js shared navigation.

For each tools/*/index.html and playground/*/index.html:
  1. Add <script src="/site.js"></script> after <body>
  2. Transform <nav>...</nav> to <div class="page-breadcrumb">...</div>
     - Handles 4 nav formats (Format A/B/C/D)
     - Removes <div class="nav-links">
     - Unwraps containers (nav-inner, nav-left, breadcrumb div, nav-breadcrumb span)
  3. Normalize class names (nav-sep->sep, current->crumb-current)
  4. Remove nav CSS block from <style>
  5. Remove nav-active <script> block
"""
import re
import os

BASE = r'c:\Raviprasad-Work\Git\com.ravionus'


def strip_outer_div(s, class_name):
    """If s is exactly <div class="class_name">...</div>, return inner content stripped.
    Returns original string unchanged if pattern not found."""
    s_stripped = s.strip()
    pattern = r'^<div class="' + re.escape(class_name) + r'"[^>]*>\s*([\s\S]*?)\s*</div>\s*$'
    m = re.match(pattern, s_stripped, re.DOTALL)
    if m:
        return m.group(1).strip()
    return s


def transform_nav_content(nav_inner):
    """Transform inner content of <nav>...</nav> into clean breadcrumb HTML.
    nav_inner: full content between <nav> and </nav>, after nav-links removed.
    """
    s = nav_inner.strip()

    # Unwrap nav-inner (Format C, D)
    s = strip_outer_div(s, 'nav-inner')
    # After unwrapping nav-inner, may have nav-left (Format D)
    s = strip_outer_div(s, 'nav-left')
    # Unwrap breadcrumb div (Format B, C)
    s = strip_outer_div(s, 'breadcrumb')

    # Unwrap nav-breadcrumb span (Format D: it's inline, not outermost element).
    # Remove just its opening and closing span tags; keep the inner content.
    if 'class="nav-breadcrumb"' in s:
        # Remove the opening <span class="nav-breadcrumb"> tag
        s = re.sub(r'<span class="nav-breadcrumb">\s*', '', s)
        # Remove the closing </span> that ends the nav-breadcrumb content.
        # It's the last </span> in the string (the nav-breadcrumb span wraps until end).
        s = s.rstrip()
        if s.endswith('</span>'):
            s = s[:-len('</span>')].rstrip()

    # Normalize class names
    s = s.replace('"nav-sep"', '"sep"')
    s = s.replace('"current"', '"crumb-current"')
    s = re.sub(r' class="nav-logo"', '', s)
    s = re.sub(r' class="nav-link"', '', s)

    return s


def transform(content):
    # ── 1. Add site.js after <body> ─────────────────────────────────────────
    if '<script src="/site.js"></script>' in content:
        return content, False  # already done

    content = re.sub(
        r'(<body[^>]*>)',
        r'\1\n    <script src="/site.js"></script>',
        content, count=1
    )

    # ── 2. Find and transform the first <nav>...</nav> in the body ───────────
    def replace_nav(m):
        nav_inner = m.group(1)
        # Remove nav-links div (not greedy, stops at first </div>)
        nav_inner = re.sub(
            r'\s*<div class="nav-links"[^>]*>[\s\S]*?</div>',
            '',
            nav_inner
        )
        crumb = transform_nav_content(nav_inner)
        # Indent each non-empty line at 4 spaces
        lines = crumb.split('\n')
        indented = '\n'.join('    ' + l for l in lines if l.strip())
        return '<div class="page-breadcrumb">\n' + indented + '\n</div>'

    content = re.sub(
        r'<nav[^>]*>([\s\S]*?)</nav>',
        replace_nav,
        content,
        count=1
    )

    # ── 3. Remove /* -- Nav -- */ CSS block from <style> ─────────────────────
    content = re.sub(
        r'[ \t]*/\* ── Nav ── \*/[\s\S]*?(?=[ \t]*/\* ── )',
        '        ',
        content
    )

    # ── 4. Remove nav-active <script> block ──────────────────────────────────
    content = re.sub(
        r'\n?<script>\n/\* nav-active \*/\n[\s\S]*?</script>\n',
        '\n',
        content
    )

    return content, True


# ── Process all sub-pages ────────────────────────────────────────────────────
results = []
for section in ['tools', 'playground']:
    section_path = os.path.join(BASE, section)
    for subdir in sorted(os.listdir(section_path)):
        filepath = os.path.join(section_path, subdir, 'index.html')
        if not os.path.isfile(filepath):
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            original = f.read()
        transformed, changed = transform(original)
        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(transformed)
        tag = 'changed' if changed else 'skipped'
        results.append(f'{tag}  {section}/{subdir}')

for r in results:
    print(r)
print(f'\nDone. {sum(1 for r in results if "changed" in r)} files changed.')
