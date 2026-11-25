# Chapter 2 - What changed since the video

The video was recorded in 2023. Last reviewed: November 2026.

- **Book URL:** it is now `/books?search=<isbn>` instead of `/books?book=<isbn>`, so `goto()` in `book-page.ts` passes `search`.
- **`hooks.ts`:** the second parameter is now `PageObjectParam: new (page: Page) => T`. The red underlines you see in the video are gone, and the tests call it the same way.
- **`addToYourCollection()`:** it now waits for the message and checks it, for new and duplicate books. Before, the test ended before the message opened.
- **Isolated auth test:** it saves the new session after logging in, because demoqa only accepts the newest one.

Found something else? [Open an issue](https://github.com/raptatinha/tau-advanced-playwright/issues).

Happy Testing 🎭!
