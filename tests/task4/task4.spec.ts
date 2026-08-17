import { test, expect } from '@playwright/test';

test('Read env file', async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}`);
  await page.getByRole('button', { name: '✕' }).click();
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).click();
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).fill('ipho');
  await page.getByRole('link', { name: 'iphone 17 in Mobiles' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Bestseller Apple iPhone 17 (Black, 256 GB) Add to Compare Apple iPhone 17 (' }).click();
  const page1 = await page1Promise;
  const termsCheckbox = page.getByRole('link', { name: 'Bestseller Apple iPhone 17 (Black, 256 GB) Add to Compare Apple iPhone 17 (' });
  await expect(termsCheckbox).toBeVisible();

  });
  