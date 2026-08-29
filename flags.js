/**
 * flags.js — Ravionus Feature Flag & Killswitch Engine
 * Global declarative configuration for enabling/disabling sections and features.
 * Works synchronously client-side with zero build dependencies.
 */
(function (root) {
  'use strict';

  var RavionusFlags = {
    /**
     * Section-level killswitches.
     * Setting a section to false disables all features within that section.
     */
    sections: {
      learn: true,
      tools: true,
      playground: true,
      finance: true
    },

    /**
     * Granular feature-level killswitches.
     * Format: "section/feature-slug"
     */
    features: {
      // Personal Finance features
      'finance/interest-calculator': true,
      'finance/home-loan-emi': true,

      // Dev Tools features (examples)
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

      // Playgrounds features
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
    },

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

  root.RavionusFlags = RavionusFlags;

})(typeof window !== 'undefined' ? window : this);
