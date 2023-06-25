import { test, type Page, type BrowserContext } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import apiPaths from '../../utils/apiPaths';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    await page.goto(pages.profile);
    profilePage = new ProfilePage(page);
});

test.describe('Profile - API Interception', () => {
    test('Sort books', async ({ page, context }) => { 
        await watchAPICallAndMockResponse(page, context);
        await profilePage.checkBooksList();
        await profilePage.sortBooksList();
        await profilePage.checkSort();
    });
});

async function watchAPICallAndMockResponse(page: Page, context: BrowserContext) {
    await profilePage.mockBooksListResponse(context);
    const [response] = await Promise.all([
        page.waitForResponse(new RegExp(apiPaths.account)),
        await page.reload(),
    ]);
    await response.json();
}
