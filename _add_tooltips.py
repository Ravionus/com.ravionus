#!/usr/bin/env python3
"""
_add_tooltips.py – Add title tooltip attributes to tab buttons across the portal.

Targets:
  • mob-tab buttons          – add title="Switch to [Panel Name]"
  • lang-tab buttons         – (minifier) add title="Minify [Language]"
  • tb-btn lang buttons      – (formatter) add title="Format [Language]"
  • util-tab buttons         – (datetime, password-gen) add descriptive titles
  • ed-tab buttons           – (css-layout) add matching title to aria-label
"""

import re, pathlib, sys

ROOT = pathlib.Path(__file__).parent.resolve()

# ──────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────

def strip_emoji(text: str) -> str:
    """Remove leading emoji and whitespace from button label."""
    # Remove common emoji prefix patterns like 📥, ✏️, etc.
    cleaned = re.sub(
        r'^[\U0001F300-\U0001FFFF\u2600-\u26FF\u2700-\u27BF\u00A9\u00AE'
        r'\uFE0F\u20D0-\u20FF]+\s*', '', text.strip())
    return cleaned.strip()


def add_title_if_missing(tag: str, title: str) -> str:
    """Add title="..." to a button tag if it doesn't already have one."""
    if 'title=' in tag:
        return tag
    # Insert title before the closing >
    return tag.rstrip('>').rstrip() + f' title="{title}">'


def patch_buttons_in_html(html: str, patches: list[tuple[str, str]]) -> tuple[str, int]:
    """
    patches: list of (old_fragment, new_fragment) string replacements.
    Returns (new_html, change_count).
    """
    count = 0
    for old, new in patches:
        if old in html:
            html = html.replace(old, new, 1)
            count += 1
        else:
            print(f"    [WARN] fragment not found:\n      {old!r}", file=sys.stderr)
    return html, count


# ──────────────────────────────────────────────────────────────
# Per-file patch definitions
# Each entry: (relative_path, list_of_(old, new)_pairs)
# ──────────────────────────────────────────────────────────────

PATCHES: list[tuple[str, list[tuple[str, str]]]] = []

# ── tools/minifier ──────────────────────────────────────────
PATCHES.append((
    "tools/minifier/index.html",
    [
        # lang-tabs
        ('<button class="lang-tab active" data-lang="json"  id="tabJson">JSON</button>',
         '<button class="lang-tab active" data-lang="json"  id="tabJson" title="Minify JSON">JSON</button>'),
        ('<button class="lang-tab"        data-lang="css"   id="tabCss">CSS</button>',
         '<button class="lang-tab"        data-lang="css"   id="tabCss" title="Minify CSS">CSS</button>'),
        ('<button class="lang-tab"        data-lang="html"  id="tabHtml">HTML</button>',
         '<button class="lang-tab"        data-lang="html"  id="tabHtml" title="Minify HTML">HTML</button>'),
        ('<button class="lang-tab"        data-lang="js"    id="tabJs">JS</button>',
         '<button class="lang-tab"        data-lang="js"    id="tabJs" title="Minify JavaScript">JS</button>'),
        # action buttons
        ('<button class="tb-btn primary" id="btnMinify">⚡ Minify</button>',
         '<button class="tb-btn primary" id="btnMinify" title="Minify the code">⚡ Minify</button>'),
        ('<button class="tb-btn secondary" id="btnSample">📄 Sample</button>',
         '<button class="tb-btn secondary" id="btnSample" title="Load a sample snippet">📄 Sample</button>'),
        ('<button class="tb-btn secondary" id="btnCopy">📋 Copy</button>',
         '<button class="tb-btn secondary" id="btnCopy" title="Copy minified output to clipboard">📋 Copy</button>'),
        ('<button class="tb-btn secondary" id="btnDownload">💾 Download</button>',
         '<button class="tb-btn secondary" id="btnDownload" title="Download the minified output">💾 Download</button>'),
        # mob-tabs
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Input panel">📥 Input</button>'),
        ('<button class="mob-tab"        id="tabOutput">📤 Output</button>',
         '<button class="mob-tab"        id="tabOutput" title="Switch to Output panel">📤 Output</button>'),
    ]
))

# ── tools/formatter ──────────────────────────────────────────
PATCHES.append((
    "tools/formatter/index.html",
    [
        # language buttons
        ('<button class="tb-btn lang active" data-lang="js">JS</button>',
         '<button class="tb-btn lang active" data-lang="js" title="Format JavaScript">JS</button>'),
        ('<button class="tb-btn lang" data-lang="html">HTML</button>',
         '<button class="tb-btn lang" data-lang="html" title="Format HTML">HTML</button>'),
        ('<button class="tb-btn lang" data-lang="css">CSS</button>',
         '<button class="tb-btn lang" data-lang="css" title="Format CSS">CSS</button>'),
        # action buttons
        ('<button class="tb-btn primary" id="btnFormat">⚡ Format</button>',
         '<button class="tb-btn primary" id="btnFormat" title="Format / pretty-print the code">⚡ Format</button>'),
        ('<button class="tb-btn" id="btnSample">📋 Sample</button>',
         '<button class="tb-btn" id="btnSample" title="Load a sample code snippet">📋 Sample</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download the formatted output">⬇ Download</button>'),
        ('<button class="tb-btn" id="btnCopy">📄 Copy</button>',
         '<button class="tb-btn" id="btnCopy" title="Copy formatted output to clipboard">📄 Copy</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear input and output">✕ Clear</button>'),
        # mob-tabs
        ('<button class="mob-tab active" id="tabInput">📥 Source</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Source editor">📥 Source</button>'),
        ('<button class="mob-tab" id="tabOutput">✨ Formatted</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Formatted output">✨ Formatted</button>'),
    ]
))

# ── tools/base64 ─────────────────────────────────────────────
PATCHES.append((
    "tools/base64/index.html",
    [
        ('<button class="tb-btn primary" id="btnEncode">⬆ Encode</button>',
         '<button class="tb-btn primary" id="btnEncode" title="Encode text as Base64">⬆ Encode</button>'),
        ('<button class="tb-btn" id="btnDecode">⬇ Decode</button>',
         '<button class="tb-btn" id="btnDecode" title="Decode Base64 to text">⬇ Decode</button>'),
        ('<button class="tb-btn" id="btnSample">📋 Sample</button>',
         '<button class="tb-btn" id="btnSample" title="Load a sample value">📋 Sample</button>'),
        ('<button class="tb-btn" id="btnSwap">⇄ Swap</button>',
         '<button class="tb-btn" id="btnSwap" title="Swap input and output">⇄ Swap</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download the result">⬇ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear all fields">✕ Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Input panel">📥 Input</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Output panel">📤 Output</button>'),
    ]
))

# ── tools/case ───────────────────────────────────────────────
PATCHES.append((
    "tools/case/index.html",
    [
        ('<button class="tb-btn primary" id="btnCopyAll">📋 Copy All</button>',
         '<button class="tb-btn primary" id="btnCopyAll" title="Copy all converted text to clipboard">📋 Copy All</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇️ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download all formats as a text file">⬇️ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">🗑 Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear the input">🗑 Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Input panel">📥 Input</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Output panel">📤 Output</button>'),
    ]
))

# ── tools/color ──────────────────────────────────────────────
PATCHES.append((
    "tools/color/index.html",
    [
        ('<button class="tb-btn primary" id="btnRandom">🎲 Random Color</button>',
         '<button class="tb-btn primary" id="btnRandom" title="Generate a random color">🎲 Random Color</button>'),
        ('<button class="tb-btn" id="btnCopyAll">📋 Copy All</button>',
         '<button class="tb-btn" id="btnCopyAll" title="Copy all color formats to clipboard">📋 Copy All</button>'),
        ('<button class="tb-btn danger" id="btnClear">🗑 Reset</button>',
         '<button class="tb-btn danger" id="btnClear" title="Reset to default color">🗑 Reset</button>'),
        ('<button class="mob-tab active" id="tabInput">🎨 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Color input">🎨 Input</button>'),
        ('<button class="mob-tab" id="tabOutput">👁 Preview</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Color preview">👁 Preview</button>'),
    ]
))

# ── tools/cron ───────────────────────────────────────────────
PATCHES.append((
    "tools/cron/index.html",
    [
        ('<button class="tb-btn primary" id="btnParse">▶ Parse</button>',
         '<button class="tb-btn primary" id="btnParse" title="Parse the cron expression and show schedule">▶ Parse</button>'),
        ('<button class="tb-btn" id="btnCopy">📋 Copy</button>',
         '<button class="tb-btn" id="btnCopy" title="Copy the cron expression to clipboard">📋 Copy</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear input and results">✕ Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Input panel">📥 Input</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Output panel">📤 Output</button>'),
    ]
))

# ── tools/csv ────────────────────────────────────────────────
PATCHES.append((
    "tools/csv/index.html",
    [
        ('<button class="tb-btn primary" id="btnCsvToJson">📊 CSV → JSON</button>',
         '<button class="tb-btn primary" id="btnCsvToJson" title="Convert CSV to JSON">📊 CSV → JSON</button>'),
        ('<button class="tb-btn" id="btnJsonToCsv">📄 JSON → CSV</button>',
         '<button class="tb-btn" id="btnJsonToCsv" title="Convert JSON to CSV">📄 JSON → CSV</button>'),
        ('<button class="tb-btn" id="btnSample">📋 Sample</button>',
         '<button class="tb-btn" id="btnSample" title="Load a sample CSV">📋 Sample</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download the conversion result">⬇ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear input and output">✕ Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Input panel">📥 Input</button>'),
        ('<button class="mob-tab" id="tabTable">📊 Table</button>',
         '<button class="mob-tab" id="tabTable" title="Switch to Table view">📊 Table</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Output panel">📤 Output</button>'),
    ]
))

# ── tools/diff ───────────────────────────────────────────────
PATCHES.append((
    "tools/diff/index.html",
    [
        ('<button class="tb-btn primary" id="btnCompare">⚡ Compare</button>',
         '<button class="tb-btn primary" id="btnCompare" title="Compare texts and show differences">⚡ Compare</button>'),
        ('<button class="tb-btn" id="btnSwap">⇄ Swap</button>',
         '<button class="tb-btn" id="btnSwap" title="Swap original and modified text">⇄ Swap</button>'),
        ('<button class="tb-btn" id="btnSample">📋 Sample</button>',
         '<button class="tb-btn" id="btnSample" title="Load sample texts for comparison">📋 Sample</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download the diff result">⬇ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear both text panels">✕ Clear</button>'),
        ('<button class="mob-tab active" id="tabOriginal">📝 Original</button>',
         '<button class="mob-tab active" id="tabOriginal" title="Switch to Original text panel">📝 Original</button>'),
        ('<button class="mob-tab" id="tabModified">📝 Modified</button>',
         '<button class="mob-tab" id="tabModified" title="Switch to Modified text panel">📝 Modified</button>'),
        ('<button class="mob-tab" id="tabDiff">🔍 Diff</button>',
         '<button class="mob-tab" id="tabDiff" title="Switch to Diff result panel">🔍 Diff</button>'),
    ]
))

# ── tools/hash ───────────────────────────────────────────────
PATCHES.append((
    "tools/hash/index.html",
    [
        ('<button class="tb-btn primary" id="btnHash">🔒 Generate Hashes</button>',
         '<button class="tb-btn primary" id="btnHash" title="Generate cryptographic hashes for the input text">🔒 Generate Hashes</button>'),
        ('<button class="tb-btn active" id="btnHex" data-fmt="hex">hex</button>',
         '<button class="tb-btn active" id="btnHex" data-fmt="hex" title="Display hashes in hexadecimal format">hex</button>'),
        ('<button class="tb-btn" id="btnBase64" data-fmt="base64">base64</button>',
         '<button class="tb-btn" id="btnBase64" data-fmt="base64" title="Display hashes in Base64 format">base64</button>'),
        ('<button class="tb-btn" id="btnSample">💡 Sample</button>',
         '<button class="tb-btn" id="btnSample" title="Load a sample input string">💡 Sample</button>'),
        ('<button class="tb-btn" id="btnCopyAll">📋 Copy All</button>',
         '<button class="tb-btn" id="btnCopyAll" title="Copy all hash values to clipboard">📋 Copy All</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download hash values as a text file">⬇ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear input and results">✕ Clear</button>'),
    ]
))

# ── tools/json ───────────────────────────────────────────────
PATCHES.append((
    "tools/json/index.html",
    [
        ('<button class="tb-btn primary" id="btnFormat">⚡ Format</button>',
         '<button class="tb-btn primary" id="btnFormat" title="Format / pretty-print the JSON">⚡ Format</button>'),
        ('<button class="tb-btn" id="btnMinify">⬜ Minify</button>',
         '<button class="tb-btn" id="btnMinify" title="Minify / compact the JSON">⬜ Minify</button>'),
        ('<button class="tb-btn success" id="btnValidate">✓ Validate</button>',
         '<button class="tb-btn success" id="btnValidate" title="Validate JSON syntax">✓ Validate</button>'),
        ('<button class="tb-btn" id="btnSample">📋 Sample</button>',
         '<button class="tb-btn" id="btnSample" title="Load a sample JSON">📋 Sample</button>'),
        ('<button class="tb-btn" id="btnSortKeys">⇅ Sort Keys</button>',
         '<button class="tb-btn" id="btnSortKeys" title="Sort object keys alphabetically">⇅ Sort Keys</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download the formatted JSON">⬇ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear input and output">✕ Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Input panel">📥 Input</button>'),
        ('<button class="mob-tab" id="tabTree">🌳 Tree</button>',
         '<button class="mob-tab" id="tabTree" title="Switch to Tree view">🌳 Tree</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Output panel">📤 Output</button>'),
    ]
))

# ── tools/jwt ────────────────────────────────────────────────
PATCHES.append((
    "tools/jwt/index.html",
    [
        ('<button id="btnDecode" class="tb-btn primary">⚡ Decode</button>',
         '<button id="btnDecode" class="tb-btn primary" title="Decode and display the JWT payload">⚡ Decode</button>'),
        ('<button id="btnCopyPayload" class="tb-btn">📋 Copy Payload</button>',
         '<button id="btnCopyPayload" class="tb-btn" title="Copy the decoded payload to clipboard">📋 Copy Payload</button>'),
        ('<button id="btnSample" class="tb-btn">🧪 Sample</button>',
         '<button id="btnSample" class="tb-btn" title="Load a sample JWT token">🧪 Sample</button>'),
        ('<button id="btnClear" class="tb-btn danger">🗑 Clear</button>',
         '<button id="btnClear" class="tb-btn danger" title="Clear input and results">🗑 Clear</button>'),
    ]
))

# ── tools/lorem ──────────────────────────────────────────────
PATCHES.append((
    "tools/lorem/index.html",
    [
        ('<button class="tb-btn primary" id="btnGenerate">⚡ Generate</button>',
         '<button class="tb-btn primary" id="btnGenerate" title="Generate lorem ipsum text">⚡ Generate</button>'),
        ('<button class="tb-btn" id="btnCopy">📋 Copy</button>',
         '<button class="tb-btn" id="btnCopy" title="Copy generated text to clipboard">📋 Copy</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇️ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download the generated text">⬇️ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">🗑 Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear the output">🗑 Clear</button>'),
        ('<button class="mob-tab active" id="tabSettings">⚙️ Settings</button>',
         '<button class="mob-tab active" id="tabSettings" title="Switch to Generation settings">⚙️ Settings</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Generated text">📤 Output</button>'),
    ]
))

# ── tools/password ───────────────────────────────────────────
PATCHES.append((
    "tools/password/index.html",
    [
        ('<button class="tb-btn primary" id="btnGenerate">⚡ Generate</button>',
         '<button class="tb-btn primary" id="btnGenerate" title="Generate passwords with the selected settings">⚡ Generate</button>'),
        ('<button class="tb-btn" id="btnCopyAll">📋 Copy All</button>',
         '<button class="tb-btn" id="btnCopyAll" title="Copy all generated passwords to clipboard">📋 Copy All</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇️ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download passwords as a text file">⬇️ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">🗑 Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear the generated passwords">🗑 Clear</button>'),
        ('<button class="mob-tab active" id="tabSettings">⚙️ Settings</button>',
         '<button class="mob-tab active" id="tabSettings" title="Switch to Password settings">⚙️ Settings</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Generated passwords">📤 Output</button>'),
    ]
))

# ── tools/qr ─────────────────────────────────────────────────
PATCHES.append((
    "tools/qr/index.html",
    [
        ('<button class="tb-btn primary" id="btnGenerate">⚡ Generate</button>',
         '<button class="tb-btn primary" id="btnGenerate" title="Generate QR code from the input text">⚡ Generate</button>'),
        ('<button class="tb-btn secondary" id="btnDownloadPng">💾 PNG</button>',
         '<button class="tb-btn secondary" id="btnDownloadPng" title="Download QR code as PNG image">💾 PNG</button>'),
        ('<button class="tb-btn secondary" id="btnDownloadSvg">💾 SVG</button>',
         '<button class="tb-btn secondary" id="btnDownloadSvg" title="Download QR code as SVG image">💾 SVG</button>'),
        ('<button class="tb-btn secondary" id="btnCopyPng">📋 Copy Image</button>',
         '<button class="tb-btn secondary" id="btnCopyPng" title="Copy QR code image to clipboard">📋 Copy Image</button>'),
    ]
))

# ── tools/regex ──────────────────────────────────────────────
PATCHES.append((
    "tools/regex/index.html",
    [
        ('<button class="tb-btn primary" id="btnTest">⚡ Test</button>',
         '<button class="tb-btn primary" id="btnTest" title="Test the regex against the input string">⚡ Test</button>'),
        ('<button class="tb-btn" id="btnSample">📋 Sample</button>',
         '<button class="tb-btn" id="btnSample" title="Load a sample regex and test string">📋 Sample</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download the test results">⬇ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear all fields">✕ Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Test String</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Test string input">📥 Test String</button>'),
        ('<button class="mob-tab" id="tabResults">🎯 Matches</button>',
         '<button class="mob-tab" id="tabResults" title="Switch to Match results">🎯 Matches</button>'),
    ]
))

# ── tools/syntax ─────────────────────────────────────────────
PATCHES.append((
    "tools/syntax/index.html",
    [
        ('<button id="btnHighlight" class="tb-btn primary">⚡ Highlight</button>',
         '<button id="btnHighlight" class="tb-btn primary" title="Apply syntax highlighting to the code">⚡ Highlight</button>'),
        ('<button id="btnCopyHtml" class="tb-btn">📋 Copy HTML</button>',
         '<button id="btnCopyHtml" class="tb-btn" title="Copy highlighted HTML to clipboard">📋 Copy HTML</button>'),
        ('<button id="btnCopyText" class="tb-btn">📄 Copy Text</button>',
         '<button id="btnCopyText" class="tb-btn" title="Copy plain text to clipboard">📄 Copy Text</button>'),
        ('<button id="btnClear" class="tb-btn danger">🗑 Clear</button>',
         '<button id="btnClear" class="tb-btn danger" title="Clear input and output">🗑 Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Code input">📥 Input</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Highlighted output">📤 Output</button>'),
    ]
))

# ── tools/text-stats ─────────────────────────────────────────
PATCHES.append((
    "tools/text-stats/index.html",
    [
        ('<button id="btnSample" class="tb-btn primary">🧪 Sample</button>',
         '<button id="btnSample" class="tb-btn primary" title="Load a sample text for analysis">🧪 Sample</button>'),
        ('<button id="btnCopyStats" class="tb-btn">📋 Copy Stats</button>',
         '<button id="btnCopyStats" class="tb-btn" title="Copy statistics to clipboard">📋 Copy Stats</button>'),
        ('<button id="btnClear" class="tb-btn danger">🗑 Clear</button>',
         '<button id="btnClear" class="tb-btn danger" title="Clear the input text">🗑 Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Input text">📥 Input</button>'),
        ('<button class="mob-tab" id="tabOutput">📊 Stats</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Text statistics">📊 Stats</button>'),
    ]
))

# ── tools/url ────────────────────────────────────────────────
PATCHES.append((
    "tools/url/index.html",
    [
        ('<button class="tb-btn primary" id="btnEncode">⬆ Encode</button>',
         '<button class="tb-btn primary" id="btnEncode" title="URL-encode the input text">⬆ Encode</button>'),
        ('<button class="tb-btn" id="btnDecode">⬇ Decode</button>',
         '<button class="tb-btn" id="btnDecode" title="URL-decode the input text">⬇ Decode</button>'),
        ('<button class="tb-btn" id="btnParse">🔍 Parse URL</button>',
         '<button class="tb-btn" id="btnParse" title="Parse and analyze URL components">🔍 Parse URL</button>'),
        ('<button class="tb-btn" id="btnSample">📋 Sample</button>',
         '<button class="tb-btn" id="btnSample" title="Load a sample URL">📋 Sample</button>'),
        ('<button class="tb-btn" id="btnSwap">⇄ Swap</button>',
         '<button class="tb-btn" id="btnSwap" title="Swap input and output">⇄ Swap</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download the result">⬇ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear all fields">✕ Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Input panel">📥 Input</button>'),
        ('<button class="mob-tab" id="tabParsed">🔍 Parsed</button>',
         '<button class="mob-tab" id="tabParsed" title="Switch to Parsed URL view">🔍 Parsed</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Output panel">📤 Output</button>'),
    ]
))

# ── tools/uuid ───────────────────────────────────────────────
PATCHES.append((
    "tools/uuid/index.html",
    [
        ('<button class="tb-btn primary" id="btnGenerate">⚡ Generate</button>',
         '<button class="tb-btn primary" id="btnGenerate" title="Generate UUID(s)">⚡ Generate</button>'),
        ('<button class="tb-btn" id="btnCopyAll">📋 Copy All</button>',
         '<button class="tb-btn" id="btnCopyAll" title="Copy all UUIDs to clipboard">📋 Copy All</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇️ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download UUIDs as a text file">⬇️ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">🗑 Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear the generated UUIDs">🗑 Clear</button>'),
        ('<button class="mob-tab active" id="tabSettings">⚙️ Settings</button>',
         '<button class="mob-tab active" id="tabSettings" title="Switch to UUID settings">⚙️ Settings</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Generated UUIDs">📤 Output</button>'),
    ]
))

# ── tools/yaml ───────────────────────────────────────────────
PATCHES.append((
    "tools/yaml/index.html",
    [
        ('<button class="tb-btn" id="btnSample">📋 Sample</button>',
         '<button class="tb-btn" id="btnSample" title="Load a sample YAML">📋 Sample</button>'),
        ('<button class="tb-btn" id="btnDownload">⬇ Download</button>',
         '<button class="tb-btn" id="btnDownload" title="Download the YAML/JSON output">⬇ Download</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear input and output">✕ Clear</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Input panel">📥 Input</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Output panel">📤 Output</button>'),
    ]
))

# ── playground/base-converter ────────────────────────────────
PATCHES.append((
    "playground/base-converter/index.html",
    [
        ('<button class="tb-btn primary" id="btnConvert">⇄ Convert</button>',
         '<button class="tb-btn primary" id="btnConvert" title="Convert the number to all bases">⇄ Convert</button>'),
        ('<button class="tb-btn" id="btnCopy">📋 Copy Decimal</button>',
         '<button class="tb-btn" id="btnCopy" title="Copy the decimal value to clipboard">📋 Copy Decimal</button>'),
        ('<button class="tb-btn" id="btnSample">🎲 Random</button>',
         '<button class="tb-btn" id="btnSample" title="Generate a random number to convert">🎲 Random</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear all fields">✕ Clear</button>'),
        ('<button class="tb-btn primary" id="btnConvert2" style="margin-bottom:0">⇄ Convert</button>',
         '<button class="tb-btn primary" id="btnConvert2" style="margin-bottom:0" title="Convert with step-by-step breakdown">⇄ Convert</button>'),
        ('<button class="tb-btn" id="btnCustom">Convert</button>',
         '<button class="tb-btn" id="btnCustom" title="Convert with custom base options">Convert</button>'),
    ]
))

# ── playground/color-palette ─────────────────────────────────
PATCHES.append((
    "playground/color-palette/index.html",
    [
        ('<button class="mob-tab active" id="tabInput">⚙️ Settings</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Palette settings">⚙️ Settings</button>'),
        ('<button class="mob-tab"        id="tabOutput">🎨 Palette</button>',
         '<button class="mob-tab"        id="tabOutput" title="Switch to Generated palette">🎨 Palette</button>'),
    ]
))

# ── playground/css-layout ────────────────────────────────────
PATCHES.append((
    "playground/css-layout/index.html",
    [
        ('<button class="mob-tab active" id="tabInput">📥 Editor</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Code editor">📥 Editor</button>'),
        ('<button class="mob-tab" id="tabPreview">📤 Preview</button>',
         '<button class="mob-tab" id="tabPreview" title="Switch to Preview">📤 Preview</button>'),
        # ed-tabs already have aria-label; add matching title
        ('<button class="ed-tab active" id="tabHtml" aria-label="Switch to HTML editor">HTML</button>',
         '<button class="ed-tab active" id="tabHtml" aria-label="Switch to HTML editor" title="Switch to HTML editor">HTML</button>'),
        ('<button class="ed-tab" id="tabCss" aria-label="Switch to CSS editor">CSS</button>',
         '<button class="ed-tab" id="tabCss" aria-label="Switch to CSS editor" title="Switch to CSS editor">CSS</button>'),
    ]
))

# ── playground/datetime ──────────────────────────────────────
PATCHES.append((
    "playground/datetime/index.html",
    [
        ('<button class="tb-btn primary" id="btnNow">📅 Fill Now</button>',
         '<button class="tb-btn primary" id="btnNow" title="Fill all fields with current date and time">📅 Fill Now</button>'),
        ('<button class="tb-btn" id="btnCopyResult">📋 Copy Result</button>',
         '<button class="tb-btn" id="btnCopyResult" title="Copy the result to clipboard">📋 Copy Result</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear all inputs">✕ Clear</button>'),
        # util-tabs
        ('<button class="util-tab active" id="tabTimestamp" role="tab" aria-selected="true"  aria-controls="panelTimestamp">⏱ Timestamp</button>',
         '<button class="util-tab active" id="tabTimestamp" role="tab" aria-selected="true"  aria-controls="panelTimestamp" title="Convert between Unix timestamps and human-readable dates">⏱ Timestamp</button>'),
        ('<button class="util-tab"        id="tabCalculator" role="tab" aria-selected="false" aria-controls="panelCalculator">🧮 Calculator</button>',
         '<button class="util-tab"        id="tabCalculator" role="tab" aria-selected="false" aria-controls="panelCalculator" title="Calculate duration between two dates">🧮 Calculator</button>'),
        ('<button class="util-tab"        id="tabTimezone"   role="tab" aria-selected="false" aria-controls="panelTimezone">🌍 Timezone</button>',
         '<button class="util-tab"        id="tabTimezone"   role="tab" aria-selected="false" aria-controls="panelTimezone" title="Convert time across different time zones">🌍 Timezone</button>'),
        ('<button class="util-tab"        id="tabFormats"    role="tab" aria-selected="false" aria-controls="panelFormats">📋 Formats</button>',
         '<button class="util-tab"        id="tabFormats"    role="tab" aria-selected="false" aria-controls="panelFormats" title="Display date in various common formats">📋 Formats</button>'),
    ]
))

# ── playground/git-sim ───────────────────────────────────────
PATCHES.append((
    "playground/git-sim/index.html",
    [
        ('<button class="mob-tab active" id="tabInput">📥 Terminal</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Terminal input">📥 Terminal</button>'),
        ('<button class="mob-tab"        id="tabOutput">📤 Graph</button>',
         '<button class="mob-tab"        id="tabOutput" title="Switch to Repository graph">📤 Graph</button>'),
    ]
))

# ── playground/json-explorer ─────────────────────────────────
PATCHES.append((
    "playground/json-explorer/index.html",
    [
        ('<button class="mob-tab active" id="tabInput">📥 Input</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to JSON input">📥 Input</button>'),
        ('<button class="mob-tab"        id="tabOutput">📤 Tree</button>',
         '<button class="mob-tab"        id="tabOutput" title="Switch to Tree explorer">📤 Tree</button>'),
    ]
))

# ── playground/markdown ──────────────────────────────────────
PATCHES.append((
    "playground/markdown/index.html",
    [
        ('<button class="mob-tab active" id="tabEdit">✏️ Edit</button>',
         '<button class="mob-tab active" id="tabEdit" title="Switch to Markdown editor">✏️ Edit</button>'),
        ('<button class="mob-tab" id="tabPreview">👁 Preview</button>',
         '<button class="mob-tab" id="tabPreview" title="Switch to Rendered preview">👁 Preview</button>'),
    ]
))

# ── playground/password-gen ──────────────────────────────────
PATCHES.append((
    "playground/password-gen/index.html",
    [
        ('<button class="tb-btn primary" id="btnGenerate">⚡ Generate</button>',
         '<button class="tb-btn primary" id="btnGenerate" title="Generate passwords with the selected settings">⚡ Generate</button>'),
        ('<button class="tb-btn" id="btnCopy">📋 Copy All</button>',
         '<button class="tb-btn" id="btnCopy" title="Copy all passwords to clipboard">📋 Copy All</button>'),
        ('<button class="tb-btn danger" id="btnClear">✕ Clear</button>',
         '<button class="tb-btn danger" id="btnClear" title="Clear the generated passwords">✕ Clear</button>'),
        # util-tabs
        ('<button class="util-tab active" id="tabClassic"    role="tab" aria-selected="true"  aria-controls="panelClassic">🔑 Classic</button>',
         '<button class="util-tab active" id="tabClassic"    role="tab" aria-selected="true"  aria-controls="panelClassic" title="Generate passwords with custom character sets">🔑 Classic</button>'),
        ('<button class="util-tab"        id="tabPassphrase" role="tab" aria-selected="false" aria-controls="panelPassphrase">📝 Passphrase</button>',
         '<button class="util-tab"        id="tabPassphrase" role="tab" aria-selected="false" aria-controls="panelPassphrase" title="Generate memorable word-based passphrases">📝 Passphrase</button>'),
        ('<button class="util-tab"        id="tabPin"        role="tab" aria-selected="false" aria-controls="panelPin">🔢 PIN</button>',
         '<button class="util-tab"        id="tabPin"        role="tab" aria-selected="false" aria-controls="panelPin" title="Generate numeric PIN codes">🔢 PIN</button>'),
    ]
))

# ── playground/repl ──────────────────────────────────────────
PATCHES.append((
    "playground/repl/index.html",
    [
        ('<button id="btnRun" class="tb-btn primary">▶ Run</button>',
         '<button id="btnRun" class="tb-btn primary" title="Run the JavaScript code">▶ Run</button>'),
        ('<button id="btnCopyCode" class="tb-btn">📋 Copy Code</button>',
         '<button id="btnCopyCode" class="tb-btn" title="Copy the code to clipboard">📋 Copy Code</button>'),
        ('<button id="btnClearOutput" class="tb-btn">🗑 Clear Output</button>',
         '<button id="btnClearOutput" class="tb-btn" title="Clear the output panel">🗑 Clear Output</button>'),
        ('<button id="btnClearAll" class="tb-btn danger">✕ Clear All</button>',
         '<button id="btnClearAll" class="tb-btn danger" title="Clear both code and output">✕ Clear All</button>'),
        ('<button class="mob-tab active" id="tabInput">📥 Editor</button>',
         '<button class="mob-tab active" id="tabInput" title="Switch to Code editor">📥 Editor</button>'),
        ('<button class="mob-tab" id="tabOutput">📤 Output</button>',
         '<button class="mob-tab" id="tabOutput" title="Switch to Output panel">📤 Output</button>'),
    ]
))


# ──────────────────────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────────────────────

def main():
    total_files = 0
    total_changes = 0

    for rel_path, patches_list in PATCHES:
        file_path = ROOT / rel_path
        if not file_path.exists():
            print(f"[SKIP] {rel_path} not found")
            continue

        html = file_path.read_text(encoding='utf-8')
        new_html, count = patch_buttons_in_html(html, patches_list)

        if count > 0:
            file_path.write_text(new_html, encoding='utf-8')
            print(f"[OK]   {rel_path}  ({count} patches applied)")
            total_files += 1
            total_changes += count
        else:
            print(f"[----] {rel_path}  (no changes)")

    print(f"\nDone. {total_changes} patches applied across {total_files} files.")


if __name__ == '__main__':
    main()
