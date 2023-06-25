import { test } from '../fixtures/books-fixture';
import { APIRequestContext } from '@playwright/test';
import LoginPage from '../pages/login-page';
import baseAPIUrl from '../../utils/environmentBaseUrl';
import createBookAPIRequest from '../../api/requests/create-books-collection';
import deleteBookAPIRequest from '../../api/requests/delete-books-collection';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';
import userData from '../../data/user-data';

const env = process.env.ENV!;
const password = process.env.PASSWORD!;
const userId = process.env.USERID!;
const userName = process.env.USERNAME!;

let apiContext: APIRequestContext;
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
      baseURL: baseAPIUrl[env].api,
      extraHTTPHeaders: {
          Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
          Accept: 'application/json',
      },
  });
});

test.beforeEach(async ({ page }) => {
  loginPage = await hooks.beforeEach(page, LoginPage, pages.loginPage);
  await loginPage.doLogin(userName, password);
  await loginPage.checkLoggedIn();
});

test.describe('Book - Fixture & API with isolated auth', () => {
  test.use({ isDupe: true });

  test('Add duplicate book', async ({ bookPage }) => {
      await addBooks(userId, userData.books.duplicate);
      await bookPage.goto(userData.books.duplicate);
  });
});

async function addBooks(userId: string, isbn: string) {
  await deleteBookAPIRequest.deleteAllBooksByUser(apiContext, userId);
  await createBookAPIRequest.addBookToCollection(apiContext, userId, isbn);
};
