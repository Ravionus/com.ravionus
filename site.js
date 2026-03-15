/**
 * site.js — shared nav & footer injected into every page.
 * Loaded as the first script inside <body> on every page.
 * Uses absolute paths so it works regardless of page depth.
 */
(function () {
  'use strict';

  // ── CSS ─────────────────────────────────────────────────────────────────────
  var css = [
    /* Reset scope */
    '.site-nav *,.site-nav *::before,.site-nav *::after{box-sizing:border-box;margin:0;padding:0}',

    /* Nav bar */
    '.site-nav{position:sticky;top:0;z-index:200;border-bottom:1px solid #2e2e48;background:rgba(10,10,15,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}',
    '.site-nav::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.25),rgba(34,211,238,0.25),transparent)}',
    '.site-nav .nav-inner{max-width:1100px;margin:0 auto;padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between}',

    /* Logo */
    '.site-nav .nav-logo{font-size:1.15rem;font-weight:800;text-decoration:none;letter-spacing:-0.03em;background:linear-gradient(135deg,#a855f7,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',

    /* Right group */
    '.site-nav .nav-right{display:flex;align-items:center;gap:12px}',

    /* Section links */
    '.site-nav .nav-links{display:flex;gap:6px}',
    '.site-nav .nav-link{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;font-size:0.875rem;font-weight:500;text-decoration:none;color:#a0a0c0;transition:color .2s,background .2s}',
    '.site-nav .nav-link:hover{color:#e2e2f0;background:#1a1a2e}',
    '.site-nav .nav-link.primary{background:linear-gradient(135deg,#7c3aed,#0e7490);color:#fff;font-weight:700}',
    '.site-nav .nav-link.primary:hover{opacity:.88;background:linear-gradient(135deg,#7c3aed,#0e7490)}',
    '.site-nav .nav-link:focus-visible,.site-nav .nav-logo:focus-visible,.site-nav .nav-hamburger:focus-visible,.site-nav .btn-signin:focus-visible,.site-nav .btn-signout:focus-visible{outline:2px solid #22d3ee;outline-offset:2px}',

    /* Auth area */
    '.site-nav .nav-auth{display:flex;align-items:center;gap:8px}',
    '.site-nav .btn-signin{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:8px;font-size:0.875rem;font-weight:500;cursor:pointer;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.05);color:#e2e2f0;transition:background .2s,border-color .2s;white-space:nowrap}',
    '.site-nav .btn-signin:hover{background:rgba(255,255,255,0.09);border-color:rgba(255,255,255,0.2)}',
    '.site-nav .user-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.05);padding:4px 4px 4px 12px;border-radius:99px;border:1px solid rgba(255,255,255,0.1)}',
    '.site-nav .user-chip.hidden,.site-nav .hidden{display:none!important}',
    '.site-nav .user-avatar{width:28px;height:28px;border-radius:50%;object-fit:cover;background:#1e1e2e}',
    '.site-nav .user-name{font-size:0.875rem;color:#e2e2f0;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.site-nav .btn-signout{background:transparent;border:none;color:#7878a0;font-size:0.75rem;cursor:pointer;padding:4px 10px;border-radius:99px;transition:all .2s}',
    '.site-nav .btn-signout:hover{background:rgba(239,68,68,0.12);color:#ef4444}',

    /* Breadcrumb bar (sub-pages) */
    '.page-breadcrumb{width:100%;box-sizing:border-box;padding:10px 24px;font-size:0.82rem;color:#7878a0;display:flex;align-items:center;gap:6px}',
    '.page-breadcrumb a{color:#7878a0;text-decoration:none;transition:color .15s}',
    '.page-breadcrumb a:hover{color:#e2e2f0}',
    '.page-breadcrumb .sep{opacity:.4}',
    '.page-breadcrumb .crumb-current{color:#e2e2f0;font-weight:500}',

    /* Back bar (learn/topic.html) */
    '.page-back-bar{max-width:1200px;margin:0 auto;padding:8px 24px}',
    '.page-back{display:inline-flex;align-items:center;gap:6px;color:#9090a8;text-decoration:none;font-size:0.875rem;font-weight:500;padding:6px 12px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);transition:color .2s,background .2s}',
    '.page-back:hover{color:#f0f0f8;background:rgba(255,255,255,0.07)}',

    /* Footer */
    '.site-footer{border-top:1px solid #1e1e2e;padding:32px 24px;text-align:center;color:#7878a0;font-size:0.85rem}',
    '.site-footer a{color:#a855f7;text-decoration:none}',
    '.site-footer a:hover{text-decoration:underline}',

    /* Hamburger button */
    '.site-nav .nav-hamburger{display:none;background:none;border:1px solid rgba(255,255,255,0.1);color:#a0a0c0;font-size:1.3rem;cursor:pointer;padding:5px 10px;border-radius:8px;line-height:1;transition:color .2s,background .2s}',
    '.site-nav .nav-hamburger:hover{color:#e2e2f0;background:#1a1a2e}',

    /* Responsive */
    '@media(max-width:640px){' +
      '.site-nav .nav-hamburger{display:flex;align-items:center;justify-content:center}' +
      '.site-nav .nav-links{display:none}' +
      '.site-nav.nav-open .nav-links{display:flex;flex-direction:column;position:absolute;top:60px;left:0;right:0;z-index:199;background:rgba(10,10,15,.97);border-bottom:1px solid #2e2e48;padding:8px 16px 14px;gap:4px}' +
      '.site-nav.nav-open .nav-link{width:100%;justify-content:flex-start;padding:10px 14px}' +
      '.site-nav .btn-signin .btn-signin-label{display:none}' +
    '}',


    /* Skip-to-main link (accessibility) */
    '.skip-to-main{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:9999}',
    '.skip-to-main:focus{position:fixed;top:0;left:0;width:auto;height:auto;overflow:visible;padding:12px 20px;background:#0a0a0f;color:#a855f7;font-size:0.875rem;font-weight:600;border:2px solid #a855f7;text-decoration:none;border-radius:0 0 8px 0}'
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.id = 'site-shared-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // Inject manifest link for PWA install support
  if (!document.querySelector('link[rel="manifest"]')) {
    var manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);
  }

  // ── Active-section detection ─────────────────────────────────────────────
  var p = location.pathname;
  function isActive(section) {
    return p === '/' + section + '/' || p.indexOf('/' + section + '/') === 0;
  }
  function navLink(href, label, section) {
    return '<a href="' + href + '" class="nav-link' + (isActive(section) ? ' primary' : '') + '">' + label + '</a>';
  }

  // ── Google icon SVG ──────────────────────────────────────────────────────
  var googleSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>' +
    '<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>' +
    '<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>' +
    '<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>' +
    '</svg>';

  // ── Build & inject nav ───────────────────────────────────────────────────
  var nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Site navigation');

  // Auth area only on learn pages (actual Firebase auth lives in learn/app.js)
  var authHtml = isActive('learn')
    ? '<div class="nav-auth" id="navAuth">' +
        '<button class="btn-signin" id="signInBtn">' +
          googleSvg +
          ' <span class="btn-signin-label">Sign in</span>' +
        '</button>' +
        '<div class="user-chip hidden" id="userChip">' +
          '<img class="user-avatar" id="userAvatar" src="" alt="avatar">' +
          '<span class="user-name" id="userName"></span>' +
          '<button class="btn-signout" id="signOutBtn">Sign out</button>' +
        '</div>' +
      '</div>'
    : '';

  nav.innerHTML =
    '<div class="nav-inner">' +
      '<a href="/" class="nav-logo" aria-label="Ravionus – go to homepage">Ravionus</a>' +
      '<div class="nav-right">' +
        '<div class="nav-links" id="navLinks">' +
          navLink('/learn/', '✨ Learn', 'learn') +
          navLink('/tools/', '🛠️ Dev Tools', 'tools') +
          navLink('/playground/', '🧪 Playgrounds', 'playground') +
        '</div>' +
        authHtml +
        '<button class="nav-hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="navLinks">&#9776;</button>' +
      '</div>' +
    '</div>';

  document.body.prepend(nav);

  // Hamburger toggle
  var hamburger = nav.querySelector('.nav-hamburger');
  if (hamburger) {
    function closeMenu() {
      nav.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open navigation menu');
      hamburger.innerHTML = '&#9776;';
    }
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = nav.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) closeMenu();
    });
  }

  // Skip link — inserted before nav so it is the first focusable element
  var skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-to-main';
  skipLink.textContent = 'Skip to main content';
  nav.insertAdjacentElement('beforebegin', skipLink);

  // ── Build & inject footer ────────────────────────────────────────────────
  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = 'Crafted by <a href="/">Ravionus</a> &nbsp;&middot;&nbsp; &copy; ' + new Date().getFullYear() + ' Raviprasad';

  document.addEventListener('DOMContentLoaded', function () {
    // Wrap page content in <main> if one doesn't already exist
    if (!document.querySelector('main')) {
      var mainEl = document.createElement('main');
      mainEl.id = 'main-content';
      mainEl.setAttribute('tabindex', '-1');
      var toMove = [];
      var node = nav.nextElementSibling;
      while (node) { toMove.push(node); node = node.nextElementSibling; }
      toMove.forEach(function (el) { mainEl.appendChild(el); });
      nav.insertAdjacentElement('afterend', mainEl);
    } else if (!document.getElementById('main-content')) {
      var existingMain = document.querySelector('main');
      existingMain.id = 'main-content';
      existingMain.setAttribute('tabindex', '-1');
    }
    document.body.appendChild(footer);
  });
}());
