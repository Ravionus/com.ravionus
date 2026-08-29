const { test, expect } = require('@playwright/test');
const InterestCalculatorPage = require('./pages/InterestCalculatorPage');
const HomeLoanEMIPage = require('./pages/HomeLoanEMIPage');

test.describe('Interest Calculator — smoke', () => {
    test('Page loads without errors and shows title and controls', async ({ page }) => {
        const calculator = new InterestCalculatorPage(page);
        await calculator.goto();

        expect(await calculator.isTitleVisible()).toBe(true);
        expect(await calculator.isPrincipalInputVisible()).toBe(true);
        
        const title = await calculator.getTitleText();
        expect(title).toContain('Simple & Compound Interest Calculator');
    });
});

test.describe('Interest Calculator — features', () => {
    test('Calculates compound interest correctly with default parameters', async ({ page }) => {
        const calculator = new InterestCalculatorPage(page);
        await calculator.goto();

        await calculator.fillAllInputs(10000, 7, 10, 200);
        
        const isCalculated = await calculator.isBalanceCalculated();
        expect(isCalculated).toBe(true);

        const rowCount = await calculator.getScheduleRowCount();
        expect(rowCount).toBe(10);
    });

    test('Toggles simple interest mode correctly', async ({ page }) => {
        const calculator = new InterestCalculatorPage(page);
        await calculator.goto();

        await calculator.clickSimpleMode();
        
        const isActive = await calculator.isSimpleModeActive();
        expect(isActive).toBe(true);

        const freqHidden = await calculator.isCompoundingFreqHidden();
        expect(freqHidden).toBe(true);
    });

    test('State persists in localStorage across page reload', async ({ page }) => {
        const calculator = new InterestCalculatorPage(page);
        await calculator.goto();

        await calculator.fillPrincipal('25000');
        await calculator.fillRate('8.5');

        await calculator.reloadAndWait();

        const principal = await calculator.getPrincipalValue();
        const rate = await calculator.getRateValue();

        expect(principal).toBe('25000');
        expect(rate).toBe('8.5');
    });
});

test.describe('Home Loan EMI Calculator — smoke', () => {
    test('Page loads correctly with header and inputs', async ({ page }) => {
        const emiCalculator = new HomeLoanEMIPage(page);
        await emiCalculator.goto();

        expect(await emiCalculator.isTitleVisible()).toBe(true);
        expect(await emiCalculator.isLoanAmountInputVisible()).toBe(true);

        const title = await emiCalculator.getTitleText();
        expect(title).toContain('Home Loan EMI Calculator');
    });
});

test.describe('Home Loan EMI Calculator — features', () => {
    test('Calculates EMI and renders amortisation schedule', async ({ page }) => {
        const emiCalculator = new HomeLoanEMIPage(page);
        await emiCalculator.goto();

        await emiCalculator.fillAllInputs(200000, 6, 15);

        const isCalculated = await emiCalculator.isEMICalculated();
        expect(isCalculated).toBe(true);

        // 15 years = 180 monthly rows in schedule table
        const rowCount = await emiCalculator.getAmortTableRowCount();
        expect(rowCount).toBe(180);
    });

    test('EMI state persists in localStorage across reload', async ({ page }) => {
        const emiCalculator = new HomeLoanEMIPage(page);
        await emiCalculator.goto();

        await emiCalculator.fillLoanAmount('450000');

        await emiCalculator.reloadAndWait();

        const loanAmount = await emiCalculator.getLoanAmountValue();
        expect(loanAmount).toBe('450000');
    });
});
