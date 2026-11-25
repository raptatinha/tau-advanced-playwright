import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './tests/utils/environmentBaseUrl';

require('dotenv').config({ override: true, quiet: true });

// Same as playwright.config.ts, using a setup project instead of the global setup
export default defineConfig({
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1, // demoqa rejects logins of the same user at the same time
  reporter: 'html',
  use: {
    trace: 'on',
    baseURL: process.env.ENV === 'production' 
      ? baseEnvUrl.production.home
      : process.env.ENV === 'staging' 
        ? baseEnvUrl.staging.home
        : baseEnvUrl.local.home
  },

  projects: [
    { 
      name: 'setup', 
      testMatch: /login-setup\.ts/ 
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
      },
      dependencies: ['setup'],
    },
  ],
});
