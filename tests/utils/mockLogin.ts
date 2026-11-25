import { BrowserContext } from '@playwright/test';
import apiPaths from './apiPaths';

const userId = '00000000-0000-0000-0000-000000000000';
const token = 'mocked-token';
const expires = '2099-12-31T00:00:00.000Z';

// Answers the login and profile requests in the browser, so demoqa doesn't check the user
async function mockLogin(context: BrowserContext, userName: string, password: string) {
  await context.route(/Account\/v1\/GenerateToken/, (route) => {
    const data = route.request().postDataJSON();
    const isValid = data.userName === userName && data.password === password;

    return route.fulfill({
      json: isValid
        ? { token, expires, status: 'Success', result: 'User authorized successfully.' }
        : { token: null, expires: null, status: 'Failed', result: 'User authorization failed.' },
    });
  });

  await context.route(/Account\/v1\/Login/, (route) => route.fulfill({
    json: { userId, username: userName, password, token, expires, created_date: expires, isActive: true },
  }));

  await context.route(new RegExp(`${apiPaths.account}/`), (route) => route.fulfill({
    json: { userId, username: userName, books: [] },
  }));
}

export default { mockLogin };
