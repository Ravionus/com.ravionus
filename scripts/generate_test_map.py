#!/usr/bin/env python3
"""
generate_test_map.py — Generate a CSV test-mapping / traceability matrix
from all Playwright spec files in tests/*.spec.js.

Usage:
    python scripts/generate_test_map.py
    python scripts/generate_test_map.py --out path/to/output.csv

Output columns:
    spec_file      — filename, e.g. json.spec.js
    feature        — human-readable feature name, e.g. JSON Formatter
    area_type      — tool | playground | learn
    describe_group — full describe() name, e.g. JSON Formatter — smoke
    tier           — smoke | features
    test_count     — number of test() calls in that describe block
"""

import csv
import re
import sys
from pathlib import Path

# ── Paths ────────────────────────────────────────────────────────────────────
REPO_ROOT = Path(__file__).resolve().parent.parent
TESTS_DIR  = REPO_ROOT / "tests"
DEFAULT_OUT = TESTS_DIR / "test-map.csv"

# ── Area classification ───────────────────────────────────────────────────────
# Spec file stems that are NOT tools (defaults to "tool" if not listed here)
_PLAYGROUNDS = {
    "api-builder", "base-converter", "code-formatter", "color-palette",
    "css-layout", "datetime", "git-sim", "json-explorer",
    "markdown", "password-gen", "repl",
}
_LEARN = {"catalog", "topic"}

def area_type(stem: str) -> str:
    if stem in _PLAYGROUNDS:
        return "playground"
    if stem in _LEARN:
        return "learn"
    return "tool"

# ── Tier detection ────────────────────────────────────────────────────────────
def classify_tier(describe_name: str) -> str:
    """smoke if name contains 'smoke' (case-insensitive), otherwise features."""
    return "smoke" if "smoke" in describe_name.lower() else "features"

# ── Feature name extraction ───────────────────────────────────────────────────
_SEP_RE = re.compile(r"\s+[—–-]\s+")   # em-dash, en-dash, or hyphen + spaces

def extract_feature(describe_name: str) -> str:
    """
    'JSON Formatter — smoke'   → 'JSON Formatter'
    'JSON Formatter — features'→ 'JSON Formatter'
    'Smoke'                    → describe_name as-is (jwt-style flat names)
    """
    m = _SEP_RE.search(describe_name)
    return describe_name[: m.start()].strip() if m else describe_name.strip()

# ── Spec parser ───────────────────────────────────────────────────────────────
_DESCRIBE_RE = re.compile(r"""test\.describe\s*\(\s*['"`]([^'"`]+)['"`]""")
_TEST_LINE_RE = re.compile(r"""^\s+test(?:\.skip)?\s*\(""")

def parse_spec(path: Path) -> list[dict]:
    """
    Walk the file line by line using brace-depth tracking to find each
    test.describe() block and count test() calls inside it.
    """
    lines = path.read_text(encoding="utf-8").splitlines()
    stem  = path.name.removesuffix(".spec.js")    # e.g. "json"
    atype = area_type(stem)

    rows: list[dict] = []
    i = 0
    while i < len(lines):
        line = lines[i]
        dm = _DESCRIBE_RE.search(line)
        if dm:
            describe_name = dm.group(1)
            feature       = extract_feature(describe_name)
            tier          = classify_tier(describe_name)

            # Track brace depth from this line onward to find the block end.
            # Start depth with the net braces on THIS line so that the opening
            # '{' of the describe callback is already counted.
            depth      = line.count("{") - line.count("}")
            test_count = 0
            i += 1

            while i < len(lines) and depth > 0:
                l = lines[i]
                depth += l.count("{") - l.count("}")
                if _TEST_LINE_RE.match(l):
                    test_count += 1
                i += 1

            rows.append({
                "spec_file":     path.name,
                "feature":       feature,
                "area_type":     atype,
                "describe_group": describe_name,
                "tier":          tier,
                "test_count":    test_count,
            })
        else:
            i += 1

    return rows

# ── Main ──────────────────────────────────────────────────────────────────────
def main() -> None:
    # Optional --out flag
    if "--out" in sys.argv:
        out_path = Path(sys.argv[sys.argv.index("--out") + 1])
    else:
        out_path = DEFAULT_OUT

    spec_files = sorted(TESTS_DIR.glob("*.spec.js"))
    if not spec_files:
        print(f"No *.spec.js files found in {TESTS_DIR}", file=sys.stderr)
        sys.exit(1)

    all_rows: list[dict] = []
    for spec in spec_files:
        all_rows.extend(parse_spec(spec))

    total_tests  = sum(r["test_count"] for r in all_rows)
    smoke_tests  = sum(r["test_count"] for r in all_rows if r["tier"] == "smoke")
    feat_tests   = total_tests - smoke_tests
    total_groups = len(all_rows)

    fieldnames = ["spec_file", "feature", "area_type", "describe_group", "tier", "test_count"]

    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_rows)
        # Summary row at the bottom
        writer.writerow({
            "spec_file":      "TOTAL",
            "feature":        "",
            "area_type":      "",
            "describe_group": f"{len(spec_files)} spec files, {total_groups} groups",
            "tier":           f"smoke={smoke_tests} / features={feat_tests}",
            "test_count":     total_tests,
        })

    print(f"Test map written → {out_path}")
    print(f"  Spec files : {len(spec_files)}")
    print(f"  Groups     : {total_groups}")
    print(f"  Tests      : {total_tests}  (smoke={smoke_tests}, features={feat_tests})")


if __name__ == "__main__":
    main()
