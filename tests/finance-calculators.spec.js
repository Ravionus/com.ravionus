const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

test.describe('Interest Calculator — smoke', () => {
    test('Page loads without errors and shows title and controls', async ({ page }) => {
        await page.goto(`${BASE_URL}/finance/interest-calculator/`);
        await expect(page.locator('h1')).toContainText('Simple & Compound Interest Calculator');
        await expect(page.locator('#principalInput')).toBeVisible();
        await expect(page.locator('#rateInput')).toBeVisible();
        await expect(page.locator('#statBalance')).toBeVisible();
    });
});

test.describe('Interest Calculator — features', () => {
    test('Calculates compound interest correctly with default parameters', async ({ page }) => {
        await page.goto(`${BASE_URL}/finance/interest-calculator/`);

        await page.fill('#principalInput', '10000');
        await page.fill('#rateInput', '7');
        await page.fill('#yearsInput', '10');
        await page.fill('#monthlyContribInput', '200');

        const balanceText = await page.locator('#statBalance').textContent();
        expect(balanceText).not.toBe('$0');
        
        // Year 10 row in table
        const tableRows = page.locator('#scheduleTableBody tr');
        await expect(tableRows).toHaveCount(10);
    });

    test('Toggles simple interest mode correctly', async ({ page }) => {
        await page.goto(`${BASE_URL}/finance/interest-calculator/`);

        const simpleBtn = page.locator('button[data-type="simple"]');
        await simpleBtn.click();
        await expect(simpleBtn).toHaveClass(/active/);

        const freqGroup = page.locator('#compoundingFreqGroup');
        await expect(freqGroup).toBeHidden();
    });

    test('State persists in localStorage across page reload', async ({ page }) => {
        await page.goto(`${BASE_URL}/finance/interest-calculator/`);
        await page.fill('#principalInput', '25000');
        await page.fill('#rateInput', '8.5');

        await page.reload();

        await expect(page.locator('#principalInput')).toHaveValue('25000');
        await expect(page.locator('#rateInput')).toHaveValue('8.5');
    });
});

test.describe('Home Loan EMI Calculator — smoke', () => {
    test('Page loads correctly with header and inputs', async ({ page }) => {
        await page.goto(`${BASE_URL}/finance/home-loan-emi/`);
        await expect(page.locator('h1')).toContainText('Home Loan EMI Calculator');
        await expect(page.locator('#loanAmountInput')).toBeVisible();
        await expect(page.locator('#statEmi')).toBeVisible();
    });
});

test.describe('Home Loan EMI Calculator — features', () => {
    test('Calculates EMI and renders amortisation schedule', async ({ page }) => {
        await page.goto(`${BASE_URL}/finance/home-loan-emi/`);

        await page.fill('#loanAmountInput', '200000');
        await page.fill('#interestRateInput', '6');
        await page.fill('#tenureYearsInput', '15');

        const emiText = await page.locator('#statEmi').textContent();
        expect(emiText).not.toBe('$0');

        // 15 years = 180 monthly rows in schedule table
        const rows = page.locator('#amortTableBody tr');
        await expect(rows).toHaveCount(180);
    });

    test('EMI state persists in localStorage across reload', async ({ page }) => {
        await page.goto(`${BASE_URL}/finance/home-loan-emi/`);
        await page.fill('#loanAmountInput', '450000');

        await page.reload();

        await expect(page.locator('#loanAmountInput')).toHaveValue('450000');
    });
});
