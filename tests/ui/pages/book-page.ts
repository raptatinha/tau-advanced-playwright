import { type Page, type Locator , expect } from '@playwright/test';
import { buildUrl } from '../../utils/uiUrlBuilder';
import messages from '../../utils/messages';
import pages from '../../utils/pages';

class BookPage {
  readonly page: Page;
  readonly addToYourCollectionButton: Locator;
  readonly backToBookStoreButton: Locator;
  readonly isbnLabel: Locator;
  readonly speakingJSBook: Locator;
  readonly speakingJSBookIsbnLabel: Locator;
  readonly titleLabel: Locator;
 
  constructor(page: Page) {
    this.page = page;
    this.addToYourCollectionButton = page.getByText('Add To Your Collection', { exact: true });
    this.backToBookStoreButton = page.getByText('Back To Book Store', { exact: true });
    this.isbnLabel = page.locator('#ISBN-wrapper').nth(1);
    this.speakingJSBook = page.getByText('Speaking JavaScript', { exact: true });
    this.speakingJSBookIsbnLabel = page.getByText('9781449365035', { exact: true });
    this.titleLabel = page.locator('#title-wrapper').locator('#userName-value');
  }

  async goto(isbn: string) {
    const params = { book: isbn };
    const url = buildUrl(pages.bookStorePage, params);
    await this.page.goto(url);
  }

  async addToYourCollection(isDupe?: boolean) {
    if (isDupe) {
      let dialogMessage: string;
  
      this.page.on('dialog', async (dialog) => {
          dialogMessage = dialog.message();
          expect(dialogMessage).toBe(messages.book.duplicate);
          await dialog.accept();
        });
    }
    await this.addToYourCollectionButton.click();
  }

  async checkSpeakingJSIsbn() {
    await expect (this.speakingJSBookIsbnLabel).toBeVisible();
  }

  async checkTitle(title: string) {
  }

  async checkAddedToYourCollection(isDupe: boolean) {
  }

  async clickAtSpeakingJSBook() {
    await this.speakingJSBook.click();
  }

  async initiateListenerWhenAddToYourCollection(){
    let dialogMessage: string;
    let expectedDialogMessage: string;

    this.page.on('dialog', async (dialog) => {
        dialogMessage = dialog.message();
        expectedDialogMessage = messages.book.duplicate;
        expect(dialogMessage).toBe(expectedDialogMessage);
        await dialog.accept();
    });
  }
}

export default BookPage;
