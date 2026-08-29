const BasePage = require('./BasePage');

/**
 * FlagsPage.js — Utilities for managing feature flags and configuration
 * Handles flag overrides, config loading, and validation
 */
class FlagsPage extends BasePage {
  /**
   * Get current configuration from flags-config.json
   * @returns {Object} Config object with sections and features
   */
  async getCurrentConfig() {
    return await this.page.evaluate(() => {
      return fetch('/flags-config.json')
        .then(res => res.json())
        .catch(() => null);
    });
  }

  /**
   * Get all sections from current config
   * @returns {Object} Sections object
   */
  async getSections() {
    const config = await this.getCurrentConfig();
    return config?.sections || {};
  }

  /**
   * Get all features from current config
   * @returns {Object} Features object
   */
  async getFeatures() {
    const config = await this.getCurrentConfig();
    return config?.features || {};
  }

  /**
   * Verify that flags match current config
   * @returns {boolean} True if flags match config
   */
  async flagsMatchConfig() {
    const config = await this.getCurrentConfig();
    if (!config) return false;

    return await this.page.evaluate((cfg) => {
      return new Promise((resolve) => {
        const checkMatch = () => {
          if (window.RavionusFlags && window.RavionusFlags.configReady) {
            const match =
              JSON.stringify(window.RavionusFlags.sections) === JSON.stringify(cfg.sections) &&
              JSON.stringify(window.RavionusFlags.features) === JSON.stringify(cfg.features);
            resolve(match);
          } else if (window.RavionusFlags) {
            setTimeout(checkMatch, 100);
          } else {
            setTimeout(checkMatch, 100);
          }
        };
        checkMatch();
      });
    }, config);
  }

  /**
   * Check if config loaded successfully
   * @returns {boolean}
   */
  async isConfigLoaded() {
    return await this.page.evaluate(() => {
      return window.RavionusFlags && window.RavionusFlags.configReady === true;
    });
  }

  /**
   * Check if feature flag exists in config
   * @param {string} featurePath - Feature path (e.g., 'finance/interest-calculator')
   * @returns {boolean}
   */
  async featureExistsInConfig(featurePath) {
    const features = await this.getFeatures();
    return featurePath in features;
  }

  /**
   * Get specific feature status from config
   * @param {string} featurePath - Feature path
   * @returns {boolean|null}
   */
  async getFeatureStatusFromConfig(featurePath) {
    const features = await this.getFeatures();
    return features[featurePath] ?? null;
  }

  /**
   * Get specific section status from config
   * @param {string} section - Section name
   * @returns {boolean|null}
   */
  async getSectionStatusFromConfig(section) {
    const sections = await this.getSections();
    return sections[section] ?? null;
  }

  /**
   * Reload configuration from flags-config.json
   * @returns {boolean} True if successful
   */
  async reloadConfiguration() {
    return await this.page.evaluate(() => {
      return window.RavionusFlags.reloadConfig()
        .then(() => true)
        .catch(() => false);
    });
  }

  /**
   * Set flag overrides (for testing disabled features)
   * @param {Object} overrides - Override object {sections: {...}, features: {...}}
   */
  async setFlagOverride(overrides) {
    await this.page.addInitScript((overrideObj) => {
      window.__RAVIONUS_FLAGS_OVERRIDE__ = overrideObj;
    }, overrides);
  }

  /**
   * Set flag overrides and navigate to URL
   * @param {Object} overrides - Override object
   * @param {string} path - Path to navigate to
   */
  async setOverrideAndGoto(overrides, path = '/') {
    await this.setFlagOverride(overrides);
    await this.goto(path);
    await this.wait(100); // Allow killswitch to run
  }
}

module.exports = FlagsPage;
