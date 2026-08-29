const BasePage = require('./BasePage');

/**
 * InterestCalculatorPage.js — Page object for the interest calculator
 * Handles interest calculator specific elements and actions
 */
class InterestCalculatorPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.title = 'h1';
    this.principalInput = '#principalInput';
    this.rateInput = '#rateInput';
    this.yearsInput = '#yearsInput';
    this.monthlyContribInput = '#monthlyContribInput';
    this.statBalance = '#statBalance';
    this.scheduleTableBody = '#scheduleTableBody';
    this.simpleBtn = 'button[data-type="simple"]';
    this.compoundBtn = 'button[data-type="compound"]';
    this.compoundingFreqGroup = '#compoundingFreqGroup';
    this.maintenanceBanner = '#maintenanceBanner';
  }

  /**
   * Navigate to interest calculator page
   */
  async goto() {
    await super.goto('/finance/interest-calculator/');
  }

  /**
   * Check if page title is visible
   * @returns {boolean}
   */
  async isTitleVisible() {
    const title = this.getElement(this.title);
    return await title.isVisible();
  }

  /**
   * Get page title text
   * @returns {string}
   */
  async getTitleText() {
    return await this.getElement(this.title).textContent();
  }

  /**
   * Check if principal input is visible
   * @returns {boolean}
   */
  async isPrincipalInputVisible() {
    return await this.getElement(this.principalInput).isVisible();
  }

  /**
   * Fill principal input
   * @param {string|number} value
   */
  async fillPrincipal(value) {
    await this.getElement(this.principalInput).fill(String(value));
  }

  /**
   * Fill interest rate input
   * @param {string|number} value
   */
  async fillRate(value) {
    await this.getElement(this.rateInput).fill(String(value));
  }

  /**
   * Fill years input
   * @param {string|number} value
   */
  async fillYears(value) {
    await this.getElement(this.yearsInput).fill(String(value));
  }

  /**
   * Fill monthly contribution input
   * @param {string|number} value
   */
  async fillMonthlyContrib(value) {
    await this.getElement(this.monthlyContribInput).fill(String(value));
  }

  /**
   * Fill all inputs at once
   * @param {number} principal
   * @param {number} rate
   * @param {number} years
   * @param {number} monthly
   */
  async fillAllInputs(principal, rate, years, monthly) {
    await this.fillPrincipal(principal);
    await this.fillRate(rate);
    await this.fillYears(years);
    await this.fillMonthlyContrib(monthly);
  }

  /**
   * Get balance value
   * @returns {string}
   */
  async getBalance() {
    return await this.getElement(this.statBalance).textContent();
  }

  /**
   * Check if balance is displayed (not $0)
   * @returns {boolean}
   */
  async isBalanceCalculated() {
    const balance = await this.getBalance();
    return balance !== '$0' && balance.length > 0;
  }

  /**
   * Get number of rows in schedule table
   * @returns {number}
   */
  async getScheduleRowCount() {
    return await this.getElement(`${this.scheduleTableBody} tr`).count();
  }

  /**
   * Click simple interest mode button
   */
  async clickSimpleMode() {
    await this.getElement(this.simpleBtn).click();
  }

  /**
   * Click compound interest mode button
   */
  async clickCompoundMode() {
    await this.getElement(this.compoundBtn).click();
  }

  /**
   * Check if simple button is active
   * @returns {boolean}
   */
  async isSimpleModeActive() {
    return await this.getElement(this.simpleBtn).evaluate((el) => {
      return el.classList.contains('active');
    }).catch(() => false);
  }

  /**
   * Check if compounding frequency group is visible
   * @returns {boolean}
   */
  async isCompoundingFreqVisible() {
    return await this.getElement(this.compoundingFreqGroup).isVisible();
  }

  /**
   * Check if compounding frequency group is hidden
   * @returns {boolean}
   */
  async isCompoundingFreqHidden() {
    return await this.getElement(this.compoundingFreqGroup).isHidden();
  }

  /**
   * Get principal input value
   * @returns {string}
   */
  async getPrincipalValue() {
    return await this.getElement(this.principalInput).inputValue();
  }

  /**
   * Get rate input value
   * @returns {string}
   */
  async getRateValue() {
    return await this.getElement(this.rateInput).inputValue();
  }

  /**
   * Check if maintenance banner is visible (feature disabled)
   * @returns {boolean}
   */
  async isMaintenanceBannerVisible() {
    return await this.getElement(this.maintenanceBanner).isVisible().catch(() => false);
  }

  /**
   * Get maintenance banner text
   * @returns {string}
   */
  async getMaintenanceBannerText() {
    return await this.getElement(this.maintenanceBanner).textContent();
  }
}

module.exports = InterestCalculatorPage;
