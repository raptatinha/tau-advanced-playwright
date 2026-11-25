import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './tests/utils/environmentBaseUrl';

require('dotenv').config({ override: true, quiet: true });

// Same as playwright-setup-projects.config.ts, with a mocked login. Use it when demoqa rejects the login
export default defineConfig({
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
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
      name: 'mocked-setup', 
      testMatch: /login-mocked-setup\.ts/ 
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth/mocked.json',
      },
      dependencies: ['mocked-setup'],
    },
  ],
});
