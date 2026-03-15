"""Replace all Playwright install lines in CI YAML to install both chromium and firefox."""
import re

path = r'c:\Raviprasad-Work\Git\com.ravionus\.github\workflows\ci.yml'
old = 'npx playwright install --with-deps chromium'
new = 'npx playwright install --with-deps chromium firefox'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

count = content.count(old)
content = content.replace(old, new)

with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print(f'Replaced {count} occurrences')
