const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

test.describe('Killswitch & Feature Flag Engine — config loading', () => {
    test('Configuration loads from flags-config.json on page load', async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
        
        // Wait for config to be loaded
        const configLoaded = await page.evaluate(() => {
            return new Promise((resolve) => {
                const checkConfig = () => {
                    if (window.RavionusFlags && window.RavionusFlags.configReady) {
                        resolve(true);
                    } else if (window.RavionusFlags) {
                        // Wait a bit more for async config load
                        setTimeout(checkConfig, 100);
                    } else {
                        setTimeout(checkConfig, 100);
                    }
                };
                checkConfig();
            });
        });
        
        expect(configLoaded).toBe(true);
    });

    test('Current flag state reflects flags-config.json values', async ({ page }) => {
        // Fetch current config from flags-config.json
        const currentConfig = await page.evaluate(() => {
            return fetch('/flags-config.json')
                .then(res => res.json())
                .catch(() => null);
        });

        expect(currentConfig).not.toBeNull();
        expect(currentConfig.sections).toBeDefined();
        expect(currentConfig.features).toBeDefined();

        await page.goto(`${BASE_URL}/`);

        // Verify flags match config
        const flagsMatch = await page.evaluate((config) => {
            return new Promise((resolve) => {
                const checkMatch = () => {
                    if (window.RavionusFlags && window.RavionusFlags.configReady) {
                        const match = 
                            JSON.stringify(window.RavionusFlags.sections) === JSON.stringify(config.sections) &&
                            JSON.stringify(window.RavionusFlags.features) === JSON.stringify(config.features);
                        resolve(match);
                    } else if (window.RavionusFlags) {
                        setTimeout(checkMatch, 100);
                    } else {
                        setTimeout(checkMatch, 100);
                    }
                };
                checkMatch();
            });
        }, currentConfig);

        expect(flagsMatch).toBe(true);
    });

    test('Finance feature tests are driven by current flag state', async ({ page }) => {
        // Get current flag state
        const financeEnabled = await page.evaluate(() => {
            return fetch('/flags-config.json')
                .then(res => res.json())
                .then(config => config.features['finance/interest-calculator'] === true);
        });

        await page.goto(`${BASE_URL}/finance/interest-calculator/`);

        if (financeEnabled) {
            // If enabled, page should load normally
            const title = await page.locator('h1').first();
            await expect(title).toBeVisible();
        } else {
            // If disabled, maintenance banner should show
            const banner = page.locator('#maintenanceBanner');
            await expect(banner).toBeVisible();
        }
    });
});

test.describe('Killswitch & Feature Flag Engine — smoke', () => {
    test('RavionusFlags global engine is loaded and initialized', async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
        const isLoaded = await page.evaluate(() => {
            return typeof window.RavionusFlags !== 'undefined' && typeof window.RavionusFlags.isFeatureEnabled === 'function';
        });
        expect(isLoaded).toBe(true);

        // Also verify config methods exist
        const hasConfigMethods = await page.evaluate(() => {
            return typeof window.RavionusFlags.reloadConfig === 'function' &&
                   typeof window.RavionusFlags.waitForConfig === 'function';
        });
        expect(hasConfigMethods).toBe(true);
    });

    test('Section killswitch evaluates correctly based on current config', async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
        
        // Wait for config to load
        await page.evaluate(() => {
            return window.RavionusFlags.waitForConfig();
        });

        const result = await page.evaluate(() => {
            return window.RavionusFlags.isSectionEnabled('finance');
        });

        // Result should match current config state
        const financeEnabledInConfig = await page.evaluate(() => {
            return fetch('/flags-config.json')
                .then(res => res.json())
                .then(config => config.sections.finance);
        });

        expect(result).toBe(financeEnabledInConfig);
    });
});

test.describe('Killswitch & Feature Flag Engine — features', () => {
    test('Disabling section hides section link from top navbar', async ({ page }) => {
        await page.addInitScript(() => {
            window.__RAVIONUS_FLAGS_OVERRIDE__ = {
                sections: { finance: false }
            };
        });

        await page.goto(`${BASE_URL}/`);
        
        // Wait for config and killswitch to run
        await page.evaluate(() => window.RavionusFlags.waitForConfig());
        await page.waitForTimeout(100);

        const financeNavLink = page.locator('.nav-link:has-text("Personal Finance")');
        await expect(financeNavLink).toHaveCount(0);
    });

    test('Disabling feature hides feature card from catalogue page', async ({ page }) => {
        await page.addInitScript(() => {
            window.__RAVIONUS_FLAGS_OVERRIDE__ = {
                features: { 'finance/home-loan-emi': false }
            };
        });

        await page.goto(`${BASE_URL}/finance/`);

        const interestCard = page.locator('a.card[data-feature="finance/interest-calculator"]');
        const emiCard = page.locator('a.card[data-feature="finance/home-loan-emi"]');

        await expect(interestCard).toBeVisible();
        await expect(emiCard).toBeHidden();
    });

    test('Direct URL access to disabled feature displays maintenance banner', async ({ page }) => {
        await page.addInitScript(() => {
            window.__RAVIONUS_FLAGS_OVERRIDE__ = {
                features: { 'finance/home-loan-emi': false }
            };
        });

        await page.goto(`${BASE_URL}/finance/home-loan-emi/`);

        const banner = page.locator('#maintenanceBanner');
        await expect(banner).toBeVisible();
        await expect(banner).toContainText('Tool Temporarily Disabled');
    });

    test('Parent section killswitch automatically disables child feature even if feature flag is true', async ({ page }) => {
        await page.addInitScript(() => {
            window.__RAVIONUS_FLAGS_OVERRIDE__ = {
                sections: { finance: false },
                features: { 'finance/interest-calculator': true }
            };
        });

        await page.goto(`${BASE_URL}/finance/interest-calculator/`);

        const banner = page.locator('#maintenanceBanner');
        await expect(banner).toBeVisible();
        await expect(banner).toContainText('Section Temporarily Disabled');
    });

    test('Catalogue displays only enabled feature cards (mixed state)', async ({ page }) => {
        await page.addInitScript(() => {
            window.__RAVIONUS_FLAGS_OVERRIDE__ = {
                features: { 
                    'finance/home-loan-emi': false,
                    'finance/interest-calculator': true
                }
            };
        });

        await page.goto(`${BASE_URL}/finance/`);

        const interestCard = page.locator('a.card[data-feature="finance/interest-calculator"]');
        const emiCard = page.locator('a.card[data-feature="finance/home-loan-emi"]');
        
        await expect(interestCard).toBeVisible();
        await expect(emiCard).toBeHidden();
        
        // Verify only enabled card is in the DOM with proper visibility
        const visibleCards = page.locator('a.card:not([data-killed])');
        await expect(visibleCards).toHaveCount(1);
    });

    test('Multiple features disabled in same section hides all disabled cards', async ({ page }) => {
        await page.addInitScript(() => {
            window.__RAVIONUS_FLAGS_OVERRIDE__ = {
                features: { 
                    'finance/home-loan-emi': false,
                    'finance/interest-calculator': false
                }
            };
        });

        await page.goto(`${BASE_URL}/finance/`);

        const disabledCards = page.locator('a.card[data-killed="true"]');
        const visibleCards = page.locator('a.card:not([data-killed="true"])');
        
        await expect(disabledCards).toHaveCount(2);
        await expect(visibleCards).toHaveCount(0);
    });

    test('All features disabled in section hides section container', async ({ page }) => {
        await page.addInitScript(() => {
            window.__RAVIONUS_FLAGS_OVERRIDE__ = {
                features: { 
                    'finance/home-loan-emi': false,
                    'finance/interest-calculator': false
                }
            };
        });

        await page.goto(`${BASE_URL}/finance/`);

        // Finance section should be hidden when all its features are disabled
        const financeSection = page.locator('.section');
        await expect(financeSection).toHaveCount(0);
    });
});
