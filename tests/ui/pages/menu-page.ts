import { type Page, type Locator , type BrowserContext, expect } from '@playwright/test';
import uiPages from '../../utils/uiPages';

class MenuPage {
  readonly page: Page;
  readonly bookStoreAPI: Locator;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.bookStoreAPI = page.getByText('Book Store API', { exact: true });
  }

  async openSwaggerAndCheck() {
    await this.page.goto(uiPages.bookStore);
    await this.bookStoreAPI.click();
    await expect(this.page).toHaveURL(/.*swagger/);
  }
}

export default MenuPage;
