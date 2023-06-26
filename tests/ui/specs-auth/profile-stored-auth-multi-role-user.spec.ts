import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

// test.use({ storageState: '.auth/user.json' });

test.beforeEach(async ({ page }) => {
    await page.goto(pages.profile);
});

test.describe('Book Store Application - Profile', () => {
    test.use({ storageState: '.auth/user.json' });
    test('Sort books - user', async ( { page } ) => { 
        profilePage = new ProfilePage(page);
        await profilePage.checkLoggedInUser();
    });
});
