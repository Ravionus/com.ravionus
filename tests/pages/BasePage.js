/**
 * BasePage.js — Base class for all page objects
 * Provides common functionality shared across all pages
 */
class BasePage {
  constructor(page) {
    this.page = page;
    this.BASE_URL = 'http://localhost:3000';
  }

  /**
   * Navigate to a specific URL
   * @param {string} path - Relative path (e.g., '/', '/finance/')
   */
  async goto(path = '/') {
    await this.page.goto(`${this.BASE_URL}${path}`);
  }

  /**
   * Wait for RavionusFlags to be loaded and config to be ready
   */
  async waitForFlagsReady() {
    await this.page.evaluate(() => {
      return new Promise((resolve) => {
        const checkFlags = () => {
          if (window.RavionusFlags && window.RavionusFlags.configReady) {
            resolve(true);
          } else if (window.RavionusFlags) {
            setTimeout(checkFlags, 100);
          } else {
            setTimeout(checkFlags, 100);
          }
        };
        checkFlags();
      });
    });
  }

  /**
   * Wait for config to load via RavionusFlags.waitForConfig()
   */
  async waitForConfig() {
    await this.page.evaluate(() => {
      return window.RavionusFlags.waitForConfig();
    });
  }

  /**
   * Check if RavionusFlags engine is loaded
   * @returns {boolean}
   */
  async isFlagsEngineLoaded() {
    return await this.page.evaluate(() => {
      return typeof window.RavionusFlags !== 'undefined' &&
             typeof window.RavionusFlags.isFeatureEnabled === 'function';
    });
  }

  /**
   * Get current section flag status
   * @param {string} section - Section name (finance, tools, etc)
   * @returns {boolean}
   */
  async isSectionEnabled(section) {
    return await this.page.evaluate((sec) => {
      return window.RavionusFlags.isSectionEnabled(sec);
    }, section);
  }

  /**
   * Get current feature flag status
   * @param {string} featurePath - Feature path (e.g., 'finance/interest-calculator')
   * @returns {boolean}
   */
  async isFeatureEnabled(featurePath) {
    return await this.page.evaluate((path) => {
      return window.RavionusFlags.isFeatureEnabled(path);
    }, featurePath);
  }

  /**
   * Reload page and wait for flags to be ready
   */
  async reloadAndWait() {
    await this.page.reload();
    await this.waitForFlagsReady();
  }

  /**
   * Get element by locator
   * @param {string} selector - CSS selector or locator
   * @returns {Locator}
   */
  getElement(selector) {
    return this.page.locator(selector);
  }

  /**
   * Wait for timeout (useful for allowing async operations)
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms = 100) {
    await this.page.waitForTimeout(ms);
  }
}

module.exports = BasePage;
