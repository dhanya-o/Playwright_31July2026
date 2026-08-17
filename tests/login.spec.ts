import { test, expect } from '@playwright/test';

 /*test('1.Verify login page loads successfully', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');
  await expect(page).toHaveTitle(/Dhanya|Agency/i);
  //await expect(page.locator('.section-header-title')).toHaveText 
  //await expect(page.getByPlaceholder('Please Input')).toBeVisible();

});
test('2.Verify login text', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');
  
  await expect(page.locator('.section-header-title')).toHaveText 

}); 
 test('3.Verify default "Please Input"', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');
  
  await expect(page.getByPlaceholder('Please Input')).toBeVisible();

}); 

 test('4.Verify email textbox is displayed and is editable', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');
  
  await expect(page.getByPlaceholder('Please Input')).toBeVisible();
   const email = page.getByPlaceholder('Please Input');
    await expect(email).toBeVisible();
  await expect(email).toBeEditable();
}); 

test('5.Verify Login button is visible', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  const loginBtn = page.getByRole('button', { name: 'Login' });

  await expect(loginBtn).toBeVisible();
  await expect(loginBtn).toBeEnabled();
});

test('6.Enter invalid email', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await page.getByPlaceholder('Please Input').fill('abcd');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.locator('text=/Value is not a valid email address/i')
  ).toBeVisible();
});
test('7.Submit valid email', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await page.getByPlaceholder('Please Input')
      .fill('dhanya@example.com');

  await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByPlaceholder('Please Input')).toBeVisible();
   const password = page.getByPlaceholder('Please Input');
    await expect(password).toBeVisible();
  await expect(password).toBeEditable();

  await page.getByTestId('login-password-input').click();
  await page.getByTestId('login-password-input').fill('Password@123');
  await page.getByTestId('login-submit-button').click();
  await page.getByTestId('project-list-filters-trigger-button').click();

  // Example validation
 // await expect(page).toHaveURL(/otp|verify|dashboard|login/);
});

test('8.Email accepts valid characters', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  const email = page.getByPlaceholder('Please Input');

  await email.fill('john.doe123@test-domain.com');

  await expect(email).toHaveValue(
    'john.doe123@test-domain.com'
  );
});
test('9.Leading and trailing spaces are trimmed', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await page    .getByPlaceholder('Please Input')
    .fill('   test@gmail.com   ');

  await page.getByRole('button', { name: 'Login' }).click();

     const password = page.getByPlaceholder('Please Input');
    await expect(password).toBeVisible();
  await expect(password).toBeEditable();
});

test('10.Login using Enter key', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await page.getByPlaceholder('Please Input')
      .fill('test@gmail.com');

  await page.keyboard.press('Enter');
     const password = page.getByPlaceholder('Please Input');
    await expect(password).toBeVisible();
  await expect(password).toBeEditable();
});
test('11.Logo should be visible', async ({ page }) => {
   await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  const logo = page.locator('img').first();

  await expect(logo).toBeVisible();
}); 

test('12.Background image is displayed', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  const image = page.locator('img').nth(1);

  await expect(image).toBeVisible();
});

test('13.Refresh page retains login screen', async ({ page }) => {
   await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await page.reload();


  await expect(page.locator('.section-header-title')).toHaveText('Login');
});
test('Responsive on mobile', async ({ page }) => {
  await page.setViewportSize({
    width: 390,
    height: 844,
  });

await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
});
test('15.Email textbox is accessible', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');
  await expect(page.getByPlaceholder('Please Input')).toBeVisible();
   const email = page.getByPlaceholder('Please Input');

  await expect(email).toBeVisible();
  await expect(email).toBeEditable();
});
test('16.Login button disabled after click', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await page.getByPlaceholder('Please Input')
      .fill('test@gmail.com');

  const loginBtn = page.getByRole('button', {
    name: 'Login',
  });

  await loginBtn.click();

  await expect(loginBtn).toBeDisabled();
});
test('17.Login API returns success', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await page.getByPlaceholder('Please Input')
      .fill('test@gmail.com');

  const responsePromise = page.waitForResponse(
    response =>
      response.url().includes('/login') &&
      response.status() === 200
  );

  await page.getByRole('button', { name: 'Login' }).click();

  const response = await responsePromise;

  expect(response.ok()).toBeTruthy();
});  

test('18.Paste email into textbox', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await page.evaluate(() =>
    navigator.clipboard.writeText('test@gmail.com')
  );

  await page.getByPlaceholder('Please Input').click();

  await page.keyboard.press('Control+V');

  await expect(
    page.getByPlaceholder('Please Input')
  ).toHaveValue('test@gmail.com');
});

test('19.Keyboard tab navigation', async ({ page }) => {
  await page.goto('https://dhanya1.casting.t.jamargig.com/login');

  await page.keyboard.press('Tab');

  await expect(page.getByPlaceholder('Please Input'))
      .toBeFocused();

  await page.keyboard.press('Tab');

  await expect(
    page.getByRole('button', { name: 'Login' })
  ).toBeFocused();
});*/
 
test('20.Locator test sample', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');

 
});


