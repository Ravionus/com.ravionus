from pathlib import Path

tests = Path(__file__).parent.parent / "tests"

old1 = "await context.grantPermissions(['clipboard-read', 'clipboard-write']);"
new1 = "try { await context.grantPermissions(['clipboard-read', 'clipboard-write']); } catch (_) {} // Firefox: clipboard-read not a recognised permission"
old2 = "await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);"
new2 = "try { await page.context().grantPermissions(['clipboard-read', 'clipboard-write']); } catch (_) {} // Firefox: clipboard-read not a recognised permission"

changed = 0
for f in tests.glob("*.spec.js"):
    text = f.read_text(encoding="utf-8")
    n = text.replace(old1, new1).replace(old2, new2)
    if n != text:
        f.write_text(n, encoding="utf-8")
        replaced = text.count(old1) + text.count(old2)
        print(f"  {f.name}: {replaced} occurrence(s)")
        changed += 1
print(f"Done – {changed} files updated")
