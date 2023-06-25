import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.use({ storageState: '.auth/admin.json' });

test.beforeEach(async ({ page }) => {
    await page.goto(pages.profile);
});

test.describe('Book Store Application - Profile - Admin', () => {
    // test.use({ storageState: '.auth/admin.json' });
    test('Sort books - admin', async ( { page } ) => { 
        profilePage = new ProfilePage(page);
        await profilePage.checkLoggedInAdmin();
    });
});
