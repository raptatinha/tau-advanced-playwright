# Chapter 4 - What changed since the video

The video was recorded in 2023. Last reviewed: November 2026.

- **Books list:** the list is now a normal HTML table, so `gridRow1` and `gridRow2` use `tbody tr` locators.
- **Interception:** the test calls `response.finished()` instead of `response.json()`, because the page reload could discard the response body.
- **`.env`:** copy the new `.env.example`, because one of the values changed.

Found something else? [Open an issue](https://github.com/raptatinha/tau-advanced-playwright/issues).

Happy Testing 🎭!
