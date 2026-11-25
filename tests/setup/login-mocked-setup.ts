import { test as setup } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import mock from '../utils/mockLogin';
import uiPages from '../utils/uiPages';

const authFile = '.auth/mocked.json';

setup('authenticate with a mocked login', async ({ page, context }) => {
  const user = process.env.USERNAME!;
  const password = process.env.PASSWORD!;
  const loginPage = new LoginPage(page);

  await mock.mockLogin(context, user, password);
  await page.goto(uiPages.login);
  await loginPage.doLogin(user, password);
  await loginPage.checkLoggedIn();
  await context.storageState({ path: authFile });
});
