# Chapter 5 - What changed since the video

The video was recorded in 2023. Last reviewed: November 2026.

- **API key:** fill in `APPLITOOLS_API_KEY` in your `.env`. Without it the test is skipped.
- **Line added:** `test.skip(!process.env.APPLITOOLS_API_KEY, ...)` is not in the video. To run the test, also remove `.skip` from `test.describe.skip`.
- **Waits added:** the test waits for the books and for the Swagger content. Without them, the Swagger screenshot could be an empty page, and an empty page always matches an empty baseline.
- **Ads blocked:** in the video the test runs with ads. Today they can change the layout, so the test blocks everything that isn't from demoqa.com.
- **Your baseline:** if you have an old one, accept the new images once.
- **Dashboard:** the Applitools website and the results page may look different from the video.

## New in Applitools (optional)

The video uses what Applitools now calls the [standard SDK](https://applitools.com/docs/eyes/sdks/playwright-ts-standard/quickstart). There is also a newer [fixture](https://applitools.com/docs/eyes/playwright), where you call `eyes.check()` without writing `eyes.open()` and `eyes.close()`.

Found something else? [Open an issue](https://github.com/raptatinha/tau-advanced-playwright/issues).

Happy Testing 🎭!
