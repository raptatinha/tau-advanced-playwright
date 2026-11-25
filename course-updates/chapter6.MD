# Chapter 6 - What changed since the video

The video was recorded in 2023. Last reviewed: November 2026.

- **Workflow:** `playwright.yml` uses current versions of the actions, Node 24 and 26, and runs every Monday too.
- **Browsers:** it installs the browsers of the Playwright version in `package.json`.
- **One run at a time:** `max-parallel` and `concurrency` prevent the same user from logging in twice at once.
- **Reports:** the artifacts have the Node version in the name, because each name must be unique.
- **Slack:** the config path is now correct. The step runs only if you add the `SLACK_WEBHOOK_URL` secret, with your own webhook.
- **Forks:** GitHub doesn't share secrets with pull requests from forks, so the tests are skipped there. In your fork, add the secrets of the Chapter 4 video and enable Actions.

Found something else? [Open an issue](https://github.com/raptatinha/tau-advanced-playwright/issues).

Happy Testing 🎭!
