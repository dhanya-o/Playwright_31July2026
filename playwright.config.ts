/**
 * @see https://playwright.dev/docs/test-configuration
 */

import { defineConfig,devices} from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
//dotenv.config({ path: path.resolve(__dirname, '.env') });
const browser = process.env.BROWSER as 'chromium' | 'firefox' | 'webkit';
const config =({
  
  testDir: './tests', //test directory path
  timeout: 40 * 1000, //milli seconds
  
  expect: {
    timeout: 50 * 1000, //milli seconds assertions timeout
  },
  
  
  reporter: 'html',
  
  use: {  
    browserName: browser,
    headless:false
  },
   /* Configure projects for major browsers */
/*   projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ] */
});
dotenv.config({ path: process.env.BASE_URL || '.env' });
 
module.exports = config;