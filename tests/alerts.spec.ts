import { test, expect } from '@playwright/test';

test('1.Handling alert', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
 //Adding event listener to handle the alert before the action is performed that triggers the alert
  page.once('dialog', dialog => {
    dialog.accept();
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('I am a JS Alert');     
  });

  await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  expect(page.getByText('You successfully clicked an alert')).toBeVisible();
});

test('2.Handling Prompt', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
 
  page.once('dialog', dialog => {
    dialog.accept();
      expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('I am a JS Confirm');
     expect(page.getByText('You clicked: Ok')).toBeVisible();
  });
  
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

});
test('3.Handling Prompt', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
 
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toBe('I am a JS prompt');
    
    await dialog.accept('Dhanya');
  });
  
  await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
      //explicitly wait for a short duration to ensure the dialog is handled before proceeding with the next steps
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the dialog is handled  
  await expect(page.getByText('You entered: Dhanya')).toBeVisible();
});

