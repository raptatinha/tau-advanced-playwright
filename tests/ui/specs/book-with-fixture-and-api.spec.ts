import { test } from '../fixtures/books-fixture';
import { APIRequestContext, Page } from '@playwright/test';
import baseAPIUrl from '../../utils/environmentBaseUrl';
import deleteBookAPIRequest from '../../api/requests/delete-books-collection';
import userData from '../../data/user-data';

test.describe.configure({ mode: 'serial' });

let apiContext: APIRequestContext;
const env = process.env.ENV!;
const password = process.env.PASSWORD!;
const userId = process.env.USERID!;
const userName = process.env.USERNAME!;

test.beforeAll(async ({ playwright }) => {
    // apiContext = await playwright.request.newContext({ storageState: 'storageState.json' });
    apiContext = await playwright.request.newContext({
        baseURL: baseAPIUrl[env].api,
        extraHTTPHeaders: {
            // Authorization: `Basic ${apiToken}`,
            Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
            // Authorization: `Basic ${env}`,
            Accept: 'application/json',
        },
    });
});

test.describe('Books - Fixture & API', () => {
    // The scope of use is file or describe
    test.use({ isDupe: false });
    test('Add brand new book', async ({ page, bookPage }) => { //first thing that will happen is to call the fixture automatically. whenever the fixture has a "use" it goes back to the test and then go back to the fixture again when the test is done and execute any remaining commands
        await cleanBooks(userId, page);
        await bookPage.goto(userData.books.new);
    });
});

async function cleanBooks(userId: string, page: Page) {
    await deleteBookAPIRequest.deleteAllBooksByUser(apiContext, userId);
    // await page.reload();
};

/**
 * 1. import the fixture file instead of the @playwright/test
 * 2. as soon as you use "bookPage" as a param of the test, 
 *  the fixture will be called 
 * 3. In the fixture file, will create the POM
 * 4. Next step in the fixture is the function "use",
 *  so it goes back to the test file
 * 5. In the test file, it will execute all the commands,
 *  (cleanBooks and bookPage.goto)
 * 6. As the test ends, it goes back to the fixture
 *  and executes the first intruction after the "use"
 * 7. In the fixture file, executes "bookPage.addToYourCollection",
 *  passing the param definde in the describe 
 * (test.use({ isDupe: false });)
*/