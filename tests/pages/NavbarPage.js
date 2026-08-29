const BasePage = require('./BasePage');

/**
 * NavbarPage.js — Page object for the navigation bar
 * Handles navbar elements: logo, links, auth
 */
class NavbarPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.navbar = '.site-nav';
    this.navLink = '.nav-link';
    this.navLinkByText = (text) => `.nav-link:has-text("${text}")`;
    this.navLinkLearn = '.nav-link:has-text("✨ Learn")';
    this.navLinkTools = '.nav-link:has-text("🛠️ Dev Tools")';
    this.navLinkPlayground = '.nav-link:has-text("🧪 Playgrounds")';
    this.navLinkFinance = '.nav-link:has-text("💰 Personal Finance")';
    this.navLogo = '.site-nav .nav-logo';
    this.hamburgerBtn = '.site-nav .nav-hamburger';
  }

  /**
   * Check if navbar is visible
   * @returns {boolean}
   */
  async isNavbarVisible() {
    return await this.getElement(this.navbar).isVisible();
  }

  /**
   * Get number of nav links
   * @returns {number}
   */
  async getNavLinkCount() {
    return await this.getElement(this.navLink).count();
  }

  /**
   * Check if specific nav link is visible
   * @param {string} text - Link text to search for
   * @returns {boolean}
   */
  async isNavLinkVisible(text) {
    const link = this.getElement(this.navLinkByText(text));
    return await link.isVisible().catch(() => false);
  }

  /**
   * Check if specific nav link is hidden
   * @param {string} text - Link text to search for
   * @returns {boolean}
   */
  async isNavLinkHidden(text) {
    const link = this.getElement(this.navLinkByText(text));
    return await link.isHidden().catch(() => true);
  }

  /**
   * Check if Finance nav link exists
   * @returns {number} Count of Finance nav links (should be 0 or 1)
   */
  async getFinanceNavLinkCount() {
    return await this.getElement(this.navLinkFinance).count();
  }

  /**
   * Check if Finance nav link is present
   * @returns {boolean}
   */
  async hasFinanceNavLink() {
    const count = await this.getFinanceNavLinkCount();
    return count > 0;
  }

  /**
   * Click on nav link
   * @param {string} text - Link text
   */
  async clickNavLink(text) {
    await this.getElement(this.navLinkByText(text)).click();
  }

  /**
   * Get nav logo text
   * @returns {string}
   */
  async getLogoText() {
    return await this.getElement(this.navLogo).textContent();
  }

  /**
   * Check if nav logo is visible
   * @returns {boolean}
   */
  async isLogoVisible() {
    return await this.getElement(this.navLogo).isVisible();
  }

  /**
   * Toggle hamburger menu (mobile)
   */
  async toggleHamburger() {
    await this.getElement(this.hamburgerBtn).click();
  }

  /**
   * Check if hamburger is visible (mobile)
   * @returns {boolean}
   */
  async isHamburgerVisible() {
    return await this.getElement(this.hamburgerBtn).isVisible().catch(() => false);
  }
}

module.exports = NavbarPage;
