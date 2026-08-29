const BasePage = require('./BasePage');

/**
 * HomePage.js — Page object for the home page
 * Handles homepage elements: catalogue cards, navigation
 */
class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.sectionTitle = '.section-title';
    this.catalogueCard = 'a.card';
    this.catalogueCardByFeature = (feature) => `a.card[data-feature="${feature}"]`;
    this.learnCard = 'a.card[data-feature="learn"]';
    this.toolsCard = 'a.card[data-feature="tools"]';
    this.playgroundCard = 'a.card[data-feature="playground"]';
    this.financeCard = 'a.card[data-feature="finance"]';
    this.visibleCards = 'a.card:not([data-killed])';
    this.killedCards = 'a.card[data-killed="true"]';
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await super.goto('/');
  }

  /**
   * Get total number of visible cards
   * @returns {number}
   */
  async getVisibleCardCount() {
    return await this.getElement(this.visibleCards).count();
  }

  /**
   * Get total number of killed (hidden) cards
   * @returns {number}
   */
  async getKilledCardCount() {
    return await this.getElement(this.killedCards).count();
  }

  /**
   * Get all cards
   * @returns {number}
   */
  async getAllCardCount() {
    return await this.getElement(this.catalogueCard).count();
  }

  /**
   * Check if specific card is visible
   * @param {string} feature - Feature name (learn, tools, playground, finance)
   * @returns {boolean}
   */
  async isCardVisible(feature) {
    const card = this.getElement(this.catalogueCardByFeature(feature));
    return await card.isVisible().catch(() => false);
  }

  /**
   * Check if specific card is hidden
   * @param {string} feature - Feature name
   * @returns {boolean}
   */
  async isCardHidden(feature) {
    const card = this.getElement(this.catalogueCardByFeature(feature));
    return await card.isHidden().catch(() => true);
  }

  /**
   * Get cards with data-killed attribute
   * @returns {number}
   */
  async getKilledCardsCount() {
    const cards = this.getElement('a.card[data-killed="true"]');
    return await cards.count();
  }

  /**
   * Click on a card to navigate to its page
   * @param {string} feature - Feature name
   */
  async clickCard(feature) {
    await this.getElement(this.catalogueCardByFeature(feature)).click();
  }

  /**
   * Get card href value
   * @param {string} feature - Feature name
   * @returns {string|null}
   */
  async getCardHref(feature) {
    return await this.getElement(this.catalogueCardByFeature(feature))
      .getAttribute('href')
      .catch(() => null);
  }

  /**
   * Verify section title is visible
   * @returns {boolean}
   */
  async isSectionTitleVisible() {
    return await this.getElement(this.sectionTitle).isVisible();
  }
}

module.exports = HomePage;
