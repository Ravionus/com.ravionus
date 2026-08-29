const { test, expect } = require('@playwright/test');
const FlagsPage = require('./pages/FlagsPage');
const HomePage = require('./pages/HomePage');
const NavbarPage = require('./pages/NavbarPage');
const FinanceCataloguePage = require('./pages/FinanceCataloguePage');
const InterestCalculatorPage = require('./pages/InterestCalculatorPage');

test.describe('Killswitch & Feature Flag Engine — config loading', () => {
    test('Configuration loads from flags-config.json on page load', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        await flagsPage.goto();
        
        const configLoaded = await flagsPage.isConfigLoaded();
        expect(configLoaded).toBe(true);
    });

    test('Current flag state reflects flags-config.json values', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        const configMatches = await flagsPage.flagsMatchConfig();
        expect(configMatches).toBe(true);
    });

    test('Finance feature tests are driven by current flag state', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        const calculator = new InterestCalculatorPage(page);

        const financeEnabled = await flagsPage.getFeatureStatusFromConfig('finance/interest-calculator');
        await calculator.goto();

        if (financeEnabled) {
            const titleVisible = await calculator.isTitleVisible();
            expect(titleVisible).toBe(true);
        } else {
            const bannerVisible = await calculator.isMaintenanceBannerVisible();
            expect(bannerVisible).toBe(true);
        }
    });
});

test.describe('Killswitch & Feature Flag Engine — smoke', () => {
    test('RavionusFlags global engine is loaded and initialized', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        await flagsPage.goto();

        const isLoaded = await flagsPage.isFlagsEngineLoaded();
        expect(isLoaded).toBe(true);
    });

    test('Section killswitch evaluates correctly based on current config', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        await flagsPage.goto();
        await flagsPage.waitForConfig();

        const financeEnabled = await flagsPage.isSectionEnabled('finance');
        const financeEnabledInConfig = await flagsPage.getSectionStatusFromConfig('finance');

        expect(financeEnabled).toBe(financeEnabledInConfig);
    });
});

test.describe('Killswitch & Feature Flag Engine — features', () => {
    test('Disabling section hides section link from top navbar', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        const navbar = new NavbarPage(page);

        await flagsPage.setOverrideAndGoto({ sections: { finance: false } });

        const financeNavLinkCount = await navbar.getFinanceNavLinkCount();
        expect(financeNavLinkCount).toBe(0);
    });

    test('Disabling feature hides feature card from catalogue page', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        const catalogue = new FinanceCataloguePage(page);

        await flagsPage.setOverrideAndGoto(
            { features: { 'finance/home-loan-emi': false } },
            '/finance/'
        );
        await flagsPage.waitForConfig();

        const interestVisible = await catalogue.isInterestCalcCardVisible();
        const emiHidden = await catalogue.isEmiCardHidden();

        expect(interestVisible).toBe(true);
        expect(emiHidden).toBe(true);
    });

    test('Direct URL access to disabled feature displays maintenance banner', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        const calculator = new InterestCalculatorPage(page);

        await flagsPage.setOverrideAndGoto(
            { features: { 'finance/home-loan-emi': false } },
            '/finance/home-loan-emi/'
        );

        const bannerVisible = await calculator.isMaintenanceBannerVisible();
        const bannerText = await calculator.getMaintenanceBannerText();

        expect(bannerVisible).toBe(true);
        expect(bannerText).toContain('Tool Temporarily Disabled');
    });

    test('Parent section killswitch automatically disables child feature even if feature flag is true', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        const calculator = new InterestCalculatorPage(page);

        await flagsPage.setOverrideAndGoto(
            {
                sections: { finance: false },
                features: { 'finance/interest-calculator': true }
            },
            '/finance/interest-calculator/'
        );

        const bannerVisible = await calculator.isMaintenanceBannerVisible();
        const bannerText = await calculator.getMaintenanceBannerText();

        expect(bannerVisible).toBe(true);
        expect(bannerText).toContain('Section Temporarily Disabled');
    });

    test('Catalogue displays only enabled feature cards (mixed state)', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        const catalogue = new FinanceCataloguePage(page);

        await flagsPage.setOverrideAndGoto(
            {
                features: {
                    'finance/home-loan-emi': false,
                    'finance/interest-calculator': true
                }
            },
            '/finance/'
        );
        await flagsPage.waitForConfig();

        const interestVisible = await catalogue.isInterestCalcCardVisible();
        const emiHidden = await catalogue.isEmiCardHidden();
        const visibleCount = await catalogue.getVisibleCardCount();

        expect(interestVisible).toBe(true);
        expect(emiHidden).toBe(true);
        expect(visibleCount).toBe(1);
    });

    test('Multiple features disabled in same section hides all disabled cards', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        const catalogue = new FinanceCataloguePage(page);

        await flagsPage.setOverrideAndGoto(
            {
                features: {
                    'finance/home-loan-emi': false,
                    'finance/interest-calculator': false
                }
            },
            '/finance/'
        );
        await flagsPage.waitForConfig();

        const killedCount = await catalogue.getKilledCardCount();
        const visibleCount = await catalogue.getVisibleCardCount();

        expect(killedCount).toBe(2);
        expect(visibleCount).toBe(0);
    });

    test('All features disabled in section hides section container', async ({ page }) => {
        const flagsPage = new FlagsPage(page);
        const catalogue = new FinanceCataloguePage(page);

        await flagsPage.setOverrideAndGoto(
            {
                features: {
                    'finance/home-loan-emi': false,
                    'finance/interest-calculator': false
                }
            },
            '/finance/'
        );
        await flagsPage.waitForConfig();

        const sectionCount = await catalogue.getSectionContainerCount();
        expect(sectionCount).toBe(0);
    });
});
