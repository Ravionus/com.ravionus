const BasePage = require('./BasePage');

/**
 * FinanceCataloguePage.js — Page object for the finance catalogue page
 * Handles finance section elements: feature cards, filtering
 */
class FinanceCataloguePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.sectionTitle = '.section-title';
    this.featureCard = 'a.card';
    this.interestCalcCard = 'a.card[data-feature="finance/interest-calculator"]';
    this.emiCard = 'a.card[data-feature="finance/home-loan-emi"]';
    this.visibleCards = 'a.card:not([data-killed])';
    this.killedCards = 'a.card[data-killed="true"]';
    this.sectionContainer = '.section';
  }

  /**
   * Navigate to finance catalogue page
   */
  async goto() {
    await super.goto('/finance/');
  }

  /**
   * Get total number of feature cards
   * @returns {number}
   */
  async getTotalCardCount() {
    return await this.getElement(this.featureCard).count();
  }

  /**
   * Get number of visible cards
   * @returns {number}
   */
  async getVisibleCardCount() {
    return await this.getElement(this.visibleCards).count();
  }

  /**
   * Get number of killed (hidden) cards
   * @returns {number}
   */
  async getKilledCardCount() {
    return await this.getElement(this.killedCards).count();
  }

  /**
   * Check if interest calculator card is visible
   * @returns {boolean}
   */
  async isInterestCalcCardVisible() {
    return await this.getElement(this.interestCalcCard).isVisible();
  }

  /**
   * Check if interest calculator card is hidden
   * @returns {boolean}
   */
  async isInterestCalcCardHidden() {
    return await this.getElement(this.interestCalcCard).isHidden();
  }

  /**
   * Check if EMI card is visible
   * @returns {boolean}
   */
  async isEmiCardVisible() {
    return await this.getElement(this.emiCard).isVisible();
  }

  /**
   * Check if EMI card is hidden
   * @returns {boolean}
   */
  async isEmiCardHidden() {
    return await this.getElement(this.emiCard).isHidden();
  }

  /**
   * Click on interest calculator card
   */
  async clickInterestCalcCard() {
    await this.getElement(this.interestCalcCard).click();
  }

  /**
   * Click on EMI card
   */
  async clickEmiCard() {
    await this.getElement(this.emiCard).click();
  }

  /**
   * Check if section container is visible
   * @returns {boolean}
   */
  async isSectionContainerVisible() {
    return await this.getElement(this.sectionContainer).isVisible().catch(() => false);
  }

  /**
   * Get section container count
   * @returns {number}
   */
  async getSectionContainerCount() {
    return await this.getElement(this.sectionContainer).count();
  }

  /**
   * Verify interest calc card is not marked as killed
   * @returns {boolean}
   */
  async isInterestCalcKilled() {
    return await this.getElement(this.interestCalcCard)
      .evaluate((el) => el.getAttribute('data-killed') === 'true')
      .catch(() => false);
  }

  /**
   * Verify EMI card is marked as killed
   * @returns {boolean}
   */
  async isEmiKilled() {
    return await this.getElement(this.emiCard)
      .evaluate((el) => el.getAttribute('data-killed') === 'true')
      .catch(() => false);
  }
}

module.exports = FinanceCataloguePage;
