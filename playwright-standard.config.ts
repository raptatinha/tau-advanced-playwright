import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './tests/utils/environmentBaseUrl';

require('dotenv').config({ override: true, quiet: true });

export default defineConfig({
  globalSetup: require.resolve('./tests/setup/global-setup'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1, // demoqa rejects logins of the same user at the same time
  reporter: 'html',
  use: {
    storageState: 'storageState.json',
    trace: 'on',
    baseURL: process.env.ENV === 'production' 
      ? baseEnvUrl.production.home
      : process.env.ENV === 'staging' 
        ? baseEnvUrl.staging.home
        : baseEnvUrl.local.home
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
