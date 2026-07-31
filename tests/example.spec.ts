import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  //await page.goto('https://playwright.dev/');
   await page.goto('https://dhanya1.casting.t.jamargig.com/login?redirect=/projects');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Dhanya One Agency | Jamargig | Casting/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
