const BasePage = require('./BasePage');

/**
 * HomeLoanEMIPage.js — Page object for the home loan EMI calculator
 * Handles EMI calculator specific elements and actions
 */
class HomeLoanEMIPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Selectors
    this.title = 'h1';
    this.loanAmountInput = '#loanAmountInput';
    this.interestRateInput = '#interestRateInput';
    this.tenureYearsInput = '#tenureYearsInput';
    this.statEmi = '#statEmi';
    this.amortTableBody = '#amortTableBody';
    this.maintenanceBanner = '#maintenanceBanner';
  }

  /**
   * Navigate to home loan EMI calculator page
   */
  async goto() {
    await super.goto('/finance/home-loan-emi/');
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
   * Check if loan amount input is visible
   * @returns {boolean}
   */
  async isLoanAmountInputVisible() {
    return await this.getElement(this.loanAmountInput).isVisible();
  }

  /**
   * Fill loan amount input
   * @param {string|number} value
   */
  async fillLoanAmount(value) {
    await this.getElement(this.loanAmountInput).fill(String(value));
  }

  /**
   * Fill interest rate input
   * @param {string|number} value
   */
  async fillInterestRate(value) {
    await this.getElement(this.interestRateInput).fill(String(value));
  }

  /**
   * Fill tenure (years) input
   * @param {string|number} value
   */
  async fillTenure(value) {
    await this.getElement(this.tenureYearsInput).fill(String(value));
  }

  /**
   * Fill all inputs at once
   * @param {number} loanAmount
   * @param {number} interestRate
   * @param {number} tenureYears
   */
  async fillAllInputs(loanAmount, interestRate, tenureYears) {
    await this.fillLoanAmount(loanAmount);
    await this.fillInterestRate(interestRate);
    await this.fillTenure(tenureYears);
  }

  /**
   * Get EMI value
   * @returns {string}
   */
  async getEMI() {
    return await this.getElement(this.statEmi).textContent();
  }

  /**
   * Check if EMI is calculated (not $0)
   * @returns {boolean}
   */
  async isEMICalculated() {
    const emi = await this.getEMI();
    return emi !== '$0' && emi.length > 0;
  }

  /**
   * Get number of rows in amortisation table
   * @returns {number}
   */
  async getAmortTableRowCount() {
    return await this.getElement(`${this.amortTableBody} tr`).count();
  }

  /**
   * Get loan amount input value
   * @returns {string}
   */
  async getLoanAmountValue() {
    return await this.getElement(this.loanAmountInput).inputValue();
  }

  /**
   * Get interest rate input value
   * @returns {string}
   */
  async getInterestRateValue() {
    return await this.getElement(this.interestRateInput).inputValue();
  }

  /**
   * Get tenure input value
   * @returns {string}
   */
  async getTenureValue() {
    return await this.getElement(this.tenureYearsInput).inputValue();
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

module.exports = HomeLoanEMIPage;
