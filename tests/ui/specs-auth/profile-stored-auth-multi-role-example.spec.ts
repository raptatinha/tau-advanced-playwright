import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    await page.goto(pages.profile);
});

test.describe('Book Store Application - Profile - Admin', () => {
    test('admin and user', async ({ browser }) => {
        const adminContext = await browser.newContext({ storageState: '.auth/admin.json' });
        const adminPage = await adminContext.newPage();
        profilePage = new ProfilePage(adminPage);
        await profilePage.checkLoggedInAdmin();
        
        const userContext = await browser.newContext({ storageState: '.auth/user.json' });
        const userPage = await userContext.newPage();
        profilePage = new ProfilePage(userPage);
        await profilePage.checkLoggedInUser();
        
        await adminContext.close();
        await userContext.close();
    });
});
