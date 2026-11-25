# Chapter 2 - What changed since the video

The video was recorded in 2023. Last reviewed: November 2026.

- **Book URL:** it is now `/books?search=<isbn>` instead of `/books?book=<isbn>`, so `goto()` in `book-page.ts` passes `search`.
- **`hooks.ts`:** the second parameter is now `PageObjectParam: new (page: Page) => T`. The red underlines you see in the video are gone, and the tests call it the same way.
- **`addToYourCollection()`:** it now waits for the message and checks it, for new and duplicate books. Before, the test ended before the message opened.
- **Isolated auth test:** it saves the new session after logging in, because demoqa only accepts the newest one.

## Organizing many fixtures

When you have many page objects and different kinds of users, split the fixtures by what they do:

1. **One file per subject** (pages, data, sign in), instead of one big file.
1. **Options for what changes** between projects, such as the country. Set the value in the config, so you don't need one file per country.
1. **[mergeTests](https://playwright.dev/docs/test-fixtures#combine-custom-fixtures-from-multiple-modules)** to use them together.

```ts
// tests/ui/fixtures/shop-fixture.ts
import { test as base } from '@playwright/test';

export type ShopOptions = { country: 'EU' | 'US' };

export const test = base.extend<ShopOptions & { countryCookie: void }>({
  country: ['EU', { option: true }],

  countryCookie: [async ({ context, country }, use) => {
    await context.addCookies([{ name: 'country', value: country, url: 'https://demoqa.com' }]);
    await use();
  }, { auto: true }],
});
```

```ts
// tests/ui/fixtures/index.ts
import { mergeTests } from '@playwright/test';
import { test as books } from './books-fixture';
import { test as shop } from './shop-fixture';

export const test = mergeTests(books, shop);
```

```ts
// in a spec file, or in a describe
test.use({ country: 'US' });
test.use({ storageState: { cookies: [], origins: [] } }); // guest: no stored sign in
```

Found something else? [Open an issue](https://github.com/raptatinha/tau-advanced-playwright/issues).

Happy Testing 🎭!
