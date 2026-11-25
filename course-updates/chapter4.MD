# Chapter 4 - What changed since the video

The video was recorded in 2023. Last reviewed: November 2026.

- **Books list:** the list is now a normal HTML table, so `gridRow1` and `gridRow2` use `tbody tr` locators.
- **Interception:** the test calls `response.finished()` instead of `response.json()`, because the page reload could discard the response body.
- **`.env`:** copy the new `.env.example`, because one of the values changed.

## Another mock example

[mockLogin.ts](../tests/utils/mockLogin.ts) mocks the login with `context.route()`, as in the interception test. See "Mocked login" in the [Chapter 1 notes](chapter1.MD).

## Different data for each environment

Create one file per environment and choose it with `ENV`. With normal imports, the editor still suggests the fields. `typeof local` makes TypeScript tell you when an environment has a missing or extra field.

```ts
// tests/data/index.ts
import local from './local/user-data';
import staging from './staging/user-data';

const data: Record<string, typeof local> = { local, staging };
const env = process.env.ENV ?? 'local';

if (!data[env]) {
  throw new Error(`There is no test data for "${env}"`);
}

export default data[env];
```

```ts
// in a spec file
import userData from '../../data';

userData.books.new;
```

Found something else? [Open an issue](https://github.com/raptatinha/tau-advanced-playwright/issues).

Happy Testing 🎭!
