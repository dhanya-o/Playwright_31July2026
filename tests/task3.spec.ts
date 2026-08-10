import { test, expect } from '@playwright/test';

test('Test1: Scenario', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/?');
    const radioButtons = page.locator('input[type="radio"][name="radioButton"]');
    await page.locator('label').filter({ hasText: 'Radio1' }).getByRole('radio').check();
    await page.locator('label').filter({ hasText: 'Radio2' }).getByRole('radio').check();
   // Verify only one radio button is checked
    await expect(
    page.locator('input[type="radio"][name="radioButton"]:checked')).toHaveCount(1);
});

test('Test 2 Scenario', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/?');
  await page.locator('#dropdown-class-example').selectOption('option2');
// Verify dropdown selection functionality.-- Selected option should match the chosen value. 
  await expect(page.locator('#dropdown-class-example option:checked')).toHaveText('Option2');
  
});

test('Test 3 Scenario', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/?');

    const checkbox1 = page.locator('#checkBoxOption1');
    const checkbox2 = page.locator('#checkBoxOption2');
    const checkbox3 = page.locator('#checkBoxOption3');
    // Select multiple checkboxes
    await checkbox1.check();
    await checkbox2.check();

    // Verify both are selected independently
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();

    // Verify third checkbox remains unselected
    await expect(checkbox3).not.toBeChecked();

    // Uncheck only the first checkbox
    await checkbox1.uncheck();

    // Verify first is unchecked but second remains checked
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();
});
  
  //Switch Window -- Verify switching between the parent and child windows.
  test('Test 4 Scenario', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/?');
    // Verify parent window
  await expect(page).toHaveTitle('Practice Page');
  //listen for popup event and store the promise in a variable if pending/rejected/fulfilled
  const childPage = page.waitForEvent('popup');
  //Kwnoledge need to be given to the user that the child window will open in a new tab and the user needs to switch to that tab to perform actions on it.
  await page.getByRole('button', { name: 'Open Window' }).click();
  const page1 = await childPage; // Verify child window
    // Perform an action in the child window
  await expect(page1).toHaveTitle('QAClick Academy - A Testing Academy to Learn, Earn and Shine'); 

  await page1.getByText('Expert teachers who have').click(); 
  await page.bringToFront();
    // Verify parent window is active
  await expect(page).toHaveTitle('Practice Page');
 

});

//Switch Tab--- Verify switching between browser tabs. -- Tab navigation should work correctly. 

test('Test 5 Scenario', async ({ page,context}) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/?');
    // Store the parent tab
  const parentTab = page;
   // Click the link that opens a new tab until the promise is fulfilled. -- Use Promise.all to wait for the new tab to open and the click action to complete.
  const [childTab] = await Promise.all([
    context.waitForEvent('page'),   
    parentTab.getByRole('link', { name: 'Open Tab' }).click()   

  ]);
   await childTab.waitForLoadState();
 
  await expect(childTab).toHaveTitle('QAClick Academy - A Testing Academy to Learn, Earn and Shine'); 
  await childTab.getByRole('heading', { name: 'Upskill to grow in your' }).click();
    // Switch back to parent tab
  await page.bringToFront();
  // Verify parent tab
  await expect(page).toHaveURL('https://rahulshettyacademy.com/AutomationPractice/?');
});

 
 // Alert Handling-- Verify JavaScript alert handling. --- Alert text should contain the entered name. 
 test('Test 6 Scenario', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/?');
  await page.getByRole('textbox', { name: 'Enter Your Name' }).click();
  const name = 'Dhanya test';
  await page.getByRole('textbox', { name: 'Enter Your Name' }).fill(name);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    // Verify alert text contains entered name
    expect(dialog.message()).toContain(name);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Alert' }).click();
});

  //Confirmation Alert-- Verify confirmation popup  should close successfully. 
  test('Test 7 Scenario', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/?');
  await page.getByRole('textbox', { name: 'Enter Your Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Name' }).fill('Test abc');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('Hello Test abc, Are you sure you want to confirm?');
    dialog.dismiss().catch(() => {});
    
  });
  await page.getByRole('button', { name: 'Confirm' }).click();

  // Confirm dialog is handled successfully
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
});

//  Test 8 Scenario    
  // Mouse Hover--- Hover menu should appear, and the selected option should function correctly.
  test('Test 8 Scenario', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // Locate the Mouse Hover button
  const mouseHover = page.getByRole('button', { name: 'Mouse Hover' });;

  // Hover over the button
  await mouseHover.hover();

  // Verify hover menu is visible
  const hoverMenu = await page.getByRole('link', { name: 'Top' });

  await expect(hoverMenu).toBeVisible();

  // Verify menu options are displayed
  await expect(hoverMenu.getByText('Top')).toBeVisible();
  //await expect(hoverMenu.getByText('Reload')).toBeVisible();
  // Select "Top" option
  await hoverMenu.getByText('Top').click();

  // Verify selected option functions correctly
  await expect(page).toHaveURL('https://rahulshettyacademy.com/AutomationPractice/#top');
   
});

//Test 9 Scenario    
 // iFrame Handling  -- Verify interaction inside iframe.

test('Test 9 Scenario', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.locator('iframe[name="iframe-name"]').contentFrame().getByRole('link', { name: 'Courses', exact: true }).click();
  const iframeElement = await page.locator('iframe[name="iframe-name"]').contentFrame();
  await expect(iframeElement.getByRole('searchbox', { name: 'Search product names' })).toBeVisible();
  await page.pause(); 

});




