import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';
import mock from '../../utils/mockLogin';
import pages from '../../utils/pages';
import userData from '../../data/user-data';

const userName = process.env.USERNAME!;
const password = process.env.PASSWORD!;
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session

test.beforeEach(async ({ page, context }) => {
  await mock.mockLogin(context, userName, password);
  await page.goto(pages.loginPage);
  loginPage = new LoginPage(page);
});

test.describe('Book Store - Mocked login', () => {
  test('successfull login', async () => {
    await loginPage.doLogin(userName, password);
    await loginPage.checkLoggedIn();
  });

  test('failing login - invalid username', async () => {
    await loginPage.doLogin(userData.invalidUsername, password);
    await loginPage.checkInvalidCredentials();
  });

  test('failing login - invalid password', async () => {
    await loginPage.doLogin(userName, userData.invalidPassword);
    await loginPage.checkInvalidCredentials();
  });
});
