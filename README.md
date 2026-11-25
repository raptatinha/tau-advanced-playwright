[![Playwright Tests](https://github.com/raptatinha/tau-advanced-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/raptatinha/tau-advanced-playwright/actions/workflows/playwright.yml)

# Advanced Playwright

Hi 👋🏽!

Welcome to the course "Advanced Playwright" by [Renata Andrade](https://testingwithrenata.com/) for the [Test Automation University](https://testautomationu.applitools.com/).
If you are new to Playwright, I invite you to a look at the [Introduction to Playwright](https://testautomationu.applitools.com/instructors/renata_andrade.html) course.

## Watching the videos? Read this first

The videos were recorded in 2023. The code in this repository was updated in 2026, and the website we test changed too, so a few things look different. Before each chapter, take a minute to read its update notes:

[Chapter 1](course-updates/chapter1.MD) | [Chapter 2](course-updates/chapter2.MD) | [Chapter 3](course-updates/chapter3.MD) | [Chapter 4](course-updates/chapter4.MD) | [Chapter 5](course-updates/chapter5.MD) | [Chapter 6](course-updates/chapter6.MD)

All the code is under `main`. The tests are examples for each chapter, so run the one you are watching.

## Requirements
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download) v24 (Playwright requires v20 or newer)
- [VS Code](https://code.visualstudio.com/docs/getstarted/getting-started)
- Any terminal. On Windows, we suggest Git Bash, which comes with Git.

The packages used here are Playwright v1.65.1, Applitools Eyes for Playwright v1.53.1 and dotenv v18.0.10. `npm ci` installs these exact versions, so there is no need to update them.

## Fork and clone the project

1. Fork the project following the [GitHub instructions](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
1. Clone your fork, replacing `<your-user>`: `git clone https://github.com/<your-user>/tau-advanced-playwright.git`
1. Access the project: `cd tau-advanced-playwright`

> **Forked it before this update?** [Sync your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) and copy the new `.env.example`.

## Install the project
On your terminal, inside the project folder, type:

1. `npm ci`
1. `npx playwright install`
1. `cp .env.example .env`

## Use your own user
The tests use https://demoqa.com/, and the users in `.env.example` are shared by all students. They work, but a test can fail when someone else is using the same user. To avoid that:

1. Create your user at https://demoqa.com/register.
1. In `.env`, change `USERNAME` and `PASSWORD`.
1. Change `USERID` too. [Here is how to find it](TROUBLESHOOTING.md#user-id-not-correct).

`USERNAME_ADMIN` and `USERNAME_USER` use the same `PASSWORD`. If you change it, create these two users with the same password, and [add their books](TROUBLESHOOTING.md#understanding-ecmascript-6-or-eloquent-javascript-second-edition-is-not-found).

`APPLITOOLS_API_KEY` is only for Chapter 5. Git ignores the `.env` file. Never share it.

## Run the project
Take a look at the [package.json](package.json) - scripts for more details.

- `npm run test-ui-c` runs all tests on chromium (except the auth)
- `npm run test-ui-setup` runs the same tests with a setup project instead of the global setup
- `npm run test-ui-auth-admin` runs profile-stored-auth-multi-role-admin.spec.ts
- `npm run test-ui-auth-user` runs profile-stored-auth-multi-role-user.spec.ts
- `npm run test-ui-auth` runs profile-stored-auth-multi-role-example.spec.ts
- `npm run test-vrt` runs visual-regression.spec.ts - visual regression testing with applitools. It is skipped until you follow the [Chapter 5 notes](course-updates/chapter5.MD)

You can add options after `--`, for example:

- `npm run test-ui-c -- --ui` opens the UI Mode
- `npm run test-ui-c -- --headed` shows the browser
- `npm run test-ui-c -- --grep "Check logged in"` runs the tests with this name

Don't use only `npx playwright test`: it mixes tests that need different configs.

## Where do I start?
The code is ready, so you don't write it from the beginning. Make sure the first command below passes, then watch each chapter with its files open.

| Chapter | Files to open | Run |
|---|---|---|
| 1.1 | `login.spec.ts`, `profile-stored-authentication.spec.ts`, `global-setup.ts` | `npx playwright test login.spec.ts --project=chromium` |
| 1.2 | `specs-auth` folder, `auth-setup.ts` | `npm run test-ui-auth-admin` |
| 2 | `profile-with-dynamic-pom.spec.ts`, `book-with-fixture-and-api.spec.ts`, `hooks.ts`, `books-fixture.ts` | `npx playwright test dynamic-pom --project=chromium` |
| 3 | `book-with-fixture-and-api.spec.ts`, `api` folder, `apiRequestUtils.ts` | `npx playwright test book-with-fixture --project=chromium` |
| 4 | `profile-api-interception.spec.ts`, `data` folder | `npx playwright test interception --project=chromium` |
| 5 | `visual-regression.spec.ts` | `npm run test-vrt` |
| 6 | `.github/workflows/playwright.yml` | n/a |

## Need help?
Take a look at [Troubleshooting](TROUBLESHOOTING.md) first. It has the answers to the most common questions.

## Course Content:
### Chapter 1: Optimizing authentication
- Regular authentication with page objects;
- Stored authentication with global-setup via UI;
- Stored authentication with Setup Projects (update notes);
- Stored authentication for multi users;
- Advanced - auth via API request;
### Chapter 2: Dynamic Page Objects & Fixtures
- Hooks file for reusable page object creation
- URL builder for dynamic url creation
- Fixtures file for reusable flows
### Chapter 3: Interacting with APIs
- The APIRequestContext
- HTTP methods, request options, request URL
- How to identify an API call and use the swagger
- Execute request dynamic
- Error handling
- Reusability
### Chapter 4: Data Management
- Via .env files
- Via JSON
- Via API
- Via mock data
- Via CSV - https://playwright.dev/docs/test-parameterize#create-tests-via-a-csv-file
### Chapter 5: Visual Regression with Applitools
- Implementing a visual regression test
- Using different check settings
- Interpreting the results
### Chapter 6: Continuous Integration & Observability
- Github Actions
- The yml file
- Slack Integration
- Parallelization strategy & Sharding

___

💡 Share on LinkedIn something interesting you've learned! Don't forget to tag me [Renata Andrade](https://www.linkedin.com/in/raptatinha/).

💜 If you have questions, feel free to post them on [github](https://github.com/raptatinha/tau-advanced-playwright/issues).

Happy Testing 🎭
