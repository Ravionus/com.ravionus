# Security Policy

## Supported Versions

Only the latest version on the `main` branch is actively maintained and receives security fixes.

| Version | Supported |
| ------- | --------- |
| main    | ✅        |

## Scope

Ravionus is a fully client-side application (vanilla JS, no backend). The relevant attack surface includes:

- **XSS** via tool inputs (e.g. user-supplied text rendered into the DOM)
- **Firestore security rules** (`firestore.rules`) — controls access to the Learn platform's progress data
- **localStorage usage** — user preferences and non-sensitive UI state only; no credentials or generated secrets are persisted

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, use one of the following:

1. **GitHub Private Vulnerability Reporting** (preferred): Go to the [Security tab](../../security/advisories/new) of this repository and click "Report a vulnerability".
2. **Direct contact**: Reach out to the maintainer via GitHub ([@raviprasadchowdhary](https://github.com/raviprasadchowdhary)).

Include as much detail as possible:

- A description of the vulnerability and its potential impact
- Steps to reproduce or a proof-of-concept
- The URL of the affected page (e.g. `https://ravionus.com/tools/jwt/`)
- Browser and OS if relevant

You can expect an acknowledgement within **5 business days** and a resolution timeline will be communicated once the report is triaged.
