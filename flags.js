/**
 * flags.js — Ravionus Feature Flag & Killswitch Engine
 * Loads feature flag configuration from /flags-config.json for real-time admin control.
 * Falls back to embedded defaults if fetch fails (offline/error).
 * 
 * Admin usage: Edit flags-config.json in GitHub and commit. Changes live in ~30-60 seconds.
 * Test usage: Tests automatically adapt to current flag configuration.
 */
(function (root) {
  'use strict';

  // Default embedded config (used if flags-config.json fetch fails)
  var defaultConfig = {
    sections: {
      learn: true,
      tools: true,
      playground: true,
      finance: true
    },
    features: {
      'finance/interest-calculator': true,
      'finance/home-loan-emi': true,
      'tools/base64': true,
      'tools/case': true,
      'tools/color': true,
      'tools/cron': true,
      'tools/csv': true,
      'tools/diff': true,
      'tools/formatter': true,
      'tools/hash': true,
      'tools/html-entity': true,
      'tools/json': true,
      'tools/jwt': true,
      'tools/lorem': true,
      'tools/minifier': true,
      'tools/password': true,
      'tools/qr': true,
      'tools/regex': true,
      'tools/syntax': true,
      'tools/text-stats': true,
      'tools/url': true,
      'tools/uuid': true,
      'tools/yaml': true,
      'playground/api-builder': true,
      'playground/base-converter': true,
      'playground/code-formatter': true,
      'playground/color-palette': true,
      'playground/css-layout': true,
      'playground/datetime': true,
      'playground/git-sim': true,
      'playground/json-explorer': true,
      'playground/markdown': true,
      'playground/password-gen': true,
      'playground/repl': true
    }
  };

  // Start with defaults, will be updated when config loads
  var config = JSON.parse(JSON.stringify(defaultConfig));
  var configLoaded = false;

  var RavionusFlags = {
    sections: config.sections,
    features: config.features,
    configReady: false,

    /**
     * Check if a section is enabled.
     * @param {string} sectionKey - e.g. "finance", "tools", "playground", "learn"
     * @returns {boolean}
     */
    isSectionEnabled: function (sectionKey) {
      if (!sectionKey) return true;
      var override = root.__RAVIONUS_FLAGS_OVERRIDE__;
      if (override && override.sections && override.sections[sectionKey] !== undefined) {
        return Boolean(override.sections[sectionKey]);
      }
      if (this.sections[sectionKey] === false) {
        return false;
      }
      return true;
    },

    /**
     * Reload configuration from flags-config.json (useful for testing or admin changes).
     * @returns {Promise} Resolves when config is loaded
     */
    reloadConfig: function () {
      var self = this;
      return fetch('/flags-config.json')
        .then(function (res) {
          if (!res.ok) throw new Error('Failed to fetch flags config');
          return res.json();
        })
        .then(function (data) {
          if (data.sections) self.sections = data.sections;
          if (data.features) self.features = data.features;
          self.configReady = true;
          return data;
        })
        .catch(function (err) {
          // Silently fail and keep using current config
          console.warn('Killswitch: Could not load flags-config.json, using defaults', err);
          return null;
        });
    },

    /**
     * Wait for config to be loaded (useful for tests and initialization).
     * @returns {Promise} Resolves when config is ready
     */
    waitForConfig: function () {
      var self = this;
      if (this.configReady) {
        return Promise.resolve();
      }
      return this.reloadConfig();
    },

    /**
     * Check if a feature is enabled.
     * Checks section-level killswitch first, then feature-level flag.
     * @param {string} featurePath - e.g. "finance/interest-calculator" or "tools/base64"
     * @returns {boolean}
     */
    isFeatureEnabled: function (featurePath) {
      if (!featurePath) return true;
      
      // Remove leading/trailing slashes
      var path = featurePath.replace(/^\/+|\/+$/g, '');
      var parts = path.split('/');
      var sectionKey = parts[0];

      // 1. Parent section killswitch check
      if (!this.isSectionEnabled(sectionKey)) {
        return false;
      }

      // 2. Single segment path (just a section check)
      if (parts.length === 1) {
        return true;
      }

      // 3. Granular feature flag check
      var key = parts[0] + '/' + parts[1];
      var override = root.__RAVIONUS_FLAGS_OVERRIDE__;
      if (override && override.features && override.features[key] !== undefined) {
        return Boolean(override.features[key]);
      }
      if (this.features[key] === false) {
        return false;
      }

      return true;
    },

    /**
     * Apply killswitch rules to catalogue card listings on the page.
     * Hides cards whose data-feature or href targets a disabled section/feature.
     */
    applyListingFilters: function () {
      var self = this;
      var cards = document.querySelectorAll('a.card');
      cards.forEach(function (card) {
        var featurePath = card.getAttribute('data-feature');
        if (!featurePath) {
          // Fallback: derive feature path from card href (e.g. "./interest-calculator/" or "/finance/interest-calculator/")
          var href = card.getAttribute('href') || '';
          var path = location.pathname.replace(/^\/+|\/+$/g, '');
          var section = path.split('/')[0];
          
          if (href.indexOf('./') === 0) {
            featurePath = section + '/' + href.replace('./', '').replace(/\/$/, '');
          } else if (href.indexOf('/') === 0) {
            featurePath = href.replace(/^\/+|\/+$/g, '');
          }
        }

        if (featurePath && !self.isFeatureEnabled(featurePath)) {
          card.style.display = 'none';
          card.setAttribute('data-killed', 'true');
        }
      });

      // Hide section containers if all cards within them are hidden.
      // Check data-killed attribute (set above) to ensure accurate detection
      // regardless of whether hiding is done via inline styles or CSS classes.
      document.querySelectorAll('.section').forEach(function (section) {
        var sectionCards = section.querySelectorAll('a.card');
        if (sectionCards.length === 0) return;
        
        var anyVisible = false;
        sectionCards.forEach(function (c) {
          // Use data-killed attribute for reliable detection of hidden cards
          // (more robust than checking inline style.display)
          if (c.getAttribute('data-killed') !== 'true') {
            anyVisible = true;
          }
        });
        
        if (!anyVisible) {
          section.style.display = 'none';
        }
      });
    }
  };

  // Automatically load config on script load (async, non-blocking)
  if (typeof fetch !== 'undefined') {
    RavionusFlags.reloadConfig().catch(function () {
      // Silent fail - already logged in reloadConfig
    });
  }

  root.RavionusFlags = RavionusFlags;

})(typeof window !== 'undefined' ? window : this);
