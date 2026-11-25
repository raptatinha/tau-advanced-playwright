import { test as setup } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import uiPages from '../utils/uiPages';

const authFile = 'storageState.json';

setup('authenticate', async ({ page }) => {
  const user = process.env.USERNAME!;
  const password = process.env.PASSWORD!;
  const loginPage = new LoginPage(page);

  await page.goto(uiPages.login);
  await loginPage.doLogin(user, password);
  await loginPage.checkLoggedIn();
  await page.context().storageState({ path: authFile });
});

// https://playwright.dev/docs/test-global-setup-teardown#option-1-project-dependencies
