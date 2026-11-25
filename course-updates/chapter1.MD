# Chapter 1 - What changed since the video

The video was recorded in 2023. Last reviewed: November 2026.

- **Page title:** demoqa.com is now "demosite", so `checkLoggedIn()` checks that.
- **One worker:** the configs now have `workers: 1`. The video uses serial mode, but it only works inside one file. demoqa can answer "Invalid username or password!" to the right password when the same user logs in several times at once.
- **demoqa's login can be unstable:** sometimes it rejects the right password for a few minutes, even one test at a time. Wait and run again, or use the mocked login below.
- **Newest session only:** when a user logs in again, demoqa no longer accepts the previous session for adding books.
- **`.env`:** `override: true` makes the values in `.env` win over the ones in your computer. On Windows, `USERNAME` already exists.
- **1.2, configs:** the `test-ui-auth` scripts now use [playwright-auth.config.ts](../playwright-auth.config.ts), so you don't need to remove the global setup by hand.
- **1.2, two users in one test:** the video says the site doesn't support it. It does: the test was missing one `goto` for each new page.

## Setup Projects

The global setup in video 1.1 still works. Playwright now recommends [Setup Projects](https://playwright.dev/docs/test-global-setup-teardown#option-1-project-dependencies), which show the login in the report, with its trace. It is the same idea as `auth-setup` in video 1.2. Compare:

| | Global setup | Setup Projects |
|---|---|---|
| Login | [global-setup.ts](../tests/setup/global-setup.ts) | [login-setup.ts](../tests/setup/login-setup.ts) |
| Config | [playwright.config.ts](../playwright.config.ts) | [playwright-setup-projects.config.ts](../playwright-setup-projects.config.ts) |
| Run | `npm run test-ui-c` | `npm run test-ui-setup` |

## Mocked login (alternative)

Use it when demoqa's login is unavailable. It needs no real user:

`npm run test-ui-mocked`

It is the Setup Projects example plus one line: [login-mocked-setup.ts](../tests/setup/login-mocked-setup.ts) calls `mockLogin()` before opening the login page. [mockLogin.ts](../tests/utils/mockLogin.ts) answers the login requests in the browser, the same way as the interception in the Chapter 4 video.

| Works with the mocked login | Needs the real login |
|---|---|
| [login-mocked.spec.ts](../tests/ui/specs-mocked/login-mocked.spec.ts), stored sign in, dynamic page objects, API interception | `login.spec.ts`, `specs-auth`, fixture and API tests (Chapters 1.2 and 3), visual regression |

The website itself still needs to be available. And be careful: a mocked login doesn't check that the real one works, so in your project keep at least one test with the real login.

## Authentication via API

demoqa's API returns a token and no cookies, so saving the state right after the request gives you an empty file. Add the cookies first:

```ts
const credentials = { userName: process.env.USERNAME!, password: process.env.PASSWORD! };
await request.post('/Account/v1/GenerateToken', { data: credentials });
const response = await request.post('/Account/v1/Login', { data: credentials });
const user = await response.json();

await page.context().addCookies([
  { name: 'token', value: user.token, url: 'https://demoqa.com' },
  { name: 'expires', value: user.expires, url: 'https://demoqa.com' },
  { name: 'userID', value: user.userId, url: 'https://demoqa.com' },
  { name: 'userName', value: user.username, url: 'https://demoqa.com' },
]);
await page.context().storageState({ path: '.auth/api.json' });
```

Found something else? [Open an issue](https://github.com/raptatinha/tau-advanced-playwright/issues).

Happy Testing 🎭!
