import { Page } from '@playwright/test';
import { buildUrl } from './uiUrlBuilder';
import BookPage from '../ui/pages/book-page';
import LoginPage from '../ui/pages/login-page';
import ProfilePage from '../ui/pages/profile-page';

async function beforeEach<T extends LoginPage|BookPage|ProfilePage>(
  page: Page,
  PageObjectParam: new (page: Page) => T,
  targetPage: string,
  params?: Record<any, any>
) {
  await page.goto(buildUrl(targetPage, params));
  const pageObject = new PageObjectParam(page);
  return pageObject;
}

export default { beforeEach };
