import { test } from '@playwright/test';
import BookPage from '../pages/book-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

let bookPage: BookPage;

test.beforeEach(async ({ page }) => {
    bookPage = await hooks.beforeEach(page, BookPage, pages.bookStorePage);
});
  
test.describe('Books - Dynamic Page Object Model', () => {
    test('Add brand new book', async () => { 
        await bookPage.clickAtSpeakingJSBook();
        await bookPage.checkSpeakingJSIsbn();
    });
});
