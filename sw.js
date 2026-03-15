/**
 * sw.js — minimal service worker for Ravionus PWA offline support.
 *
 * Strategy: cache-first for same-origin requests (HTML, JS, CSS, images,
 * fonts cached lazily on first fetch).  CDN requests are not intercepted —
 * tools that depend on CDN libs (e.g. syntax/, code-formatter/) need a
 * network connection for full functionality, but their page shells load
 * from cache.
 *
 * Shell files are pre-cached on install so the homepage, tool index, and
 * playground index are instantly available offline.
 */
'use strict';

var CACHE = 'rv-v1';

var PRECACHE = [
  '/',
  '/index.html',
  '/site.js',
  '/listing-search.js',
  '/favicon.svg',
  '/manifest.json',
  '/og-image.png',
  '/404.html',
  '/tools/',
  '/tools/index.html',
  '/playground/',
  '/playground/index.html',
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // Ignore individual failures so a missing resource doesn't block install
      return Promise.all(
        PRECACHE.map(function (url) {
          return cache.add(url).catch(function () {});
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
            .map(function (k)   { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  // Only intercept GET requests for same-origin resources
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(e.request).then(function (cached) {
        var fresh = fetch(e.request).then(function (resp) {
          if (resp.ok) cache.put(e.request, resp.clone());
          return resp;
        }).catch(function () { return cached; });
        // Serve cached copy immediately; update cache in background
        return cached || fresh;
      });
    })
  );
});
