# Troubleshooting

If your question isn't here, [open an issue](https://github.com/raptatinha/tau-advanced-playwright/issues/new/choose) with the command you ran, the full error, your operating system and your Node version (`node -v`). Please remove passwords and tokens.

## Login

### `expect(page).toHaveTitle` fails with "demosite"
Your code is from before the 2026 update. [Sync your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork), or make a new one.

### The test stays on the login page, or shows `Invalid username or password!`
1. Try the same user and password at https://demoqa.com/login.
1. Check that the file is called `.env` and is in the same folder as `package.json`.
1. Keep `workers: 1`. demoqa can reject the right password when the same user logs in several times at once.
1. Use your own user. Other students may be using the shared one right now.
1. On Windows, `USERNAME` already exists. Check that your config has `config({ override: true, quiet: true })`.

### `locator.fill: value: expected string, got undefined`
The `.env` file is missing, or has another name, such as `.env.example` or `.env.txt`.

### `User not authorized!`
demoqa only accepts the newest session of a user. Log out of the website in your browser, and run the tests again.

## API

### `User Id not correct!`
`USERID` needs to be the id of the user in `USERNAME`. To find yours, log in at https://demoqa.com/login, open the developer tools of your browser (F12), and look for the `userID` cookie (in Chrome: Application > Cookies > https://demoqa.com).

### `storageState` is empty after authenticating via API
See "Authentication via API" in the [Chapter 1 notes](course-updates/chapter1.MD).

## Running tests

### `Executable doesn't exist`
Run `npx playwright install`.

### The tests in `specs-auth` fail with `npx playwright test`
They need another config. Use the `test-ui-auth` scripts in [package.json](package.json).

### "Understanding ECMAScript 6" or "Eloquent JavaScript, Second Edition" is not found
With your own users, add the first book to the user in `USERNAME_USER` and the second one to the user in `USERNAME_ADMIN`.

### The book page is blank
Use `/books?search=<isbn>`. The website changed it from `/books?book=<isbn>`.

### `This expression is not constructable` in `hooks.ts`
It's fixed. See the [Chapter 2 notes](course-updates/chapter2.MD).

### `Playwright Test did not expect test.beforeEach() (or beforeAll) to be called here`
This usually means that two versions of Playwright are installed. Delete the `node_modules` folder, then run `npm ci` and `npx playwright install`.

### `npm audit` shows vulnerabilities
It doesn't stop you from taking the course. Don't run `npm audit fix --force`: it can install versions that don't match the course.

## Applitools

### The test is skipped
It needs your API key, and you need to remove `.skip` from `test.describe.skip`. See the [Chapter 5 notes](course-updates/chapter5.MD).
