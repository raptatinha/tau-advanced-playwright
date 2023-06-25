import { test } from '@playwright/test';
import MenuPage from '../pages/menu-page';
import ProfilePage from '../pages/profile-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
  } from '@applitools/eyes-playwright';

export const USE_ULTRAFAST_GRID: boolean = true;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
let profilePage: ProfilePage;
let menuPage: MenuPage;

test.beforeAll(async() => {
    Runner = new VisualGridRunner({ testConcurrency: 5 });
    const runnerName = 'Ultrafast Grid';
    Batch = new BatchInfo({name: `Book Store - New Tab - ${runnerName}`});
    
    Config = new Configuration();
    
    Config.setBatch(Batch);
    Config.addBrowser(800, 600, BrowserType.CHROME);
    Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
});


test.beforeEach(async ({page, context}) => {
    eyes = new Eyes(Runner, Config);
    await eyes.open(
      page,
      'Book Store App',
      test.info().title,
      { width: 1024, height: 768 }
    );

    profilePage = await hooks.beforeEach(page, ProfilePage, pages.profile);
    menuPage = new MenuPage(page, context);
});

test.afterEach(async () => {
    await eyes.close();
});

test.afterAll(async() => {
  const results = await Runner.getAllTestResults();
  console.log('Visual test results', results);
});

test.describe.skip('Visual Regression', () => {

    test('Profile Page and Swagger Page', async () => {
        await profilePage.checkLoggedIn();
        // Layout: Check only the layout and ignore actual text and graphics.
        // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
        await eyes.check('Profile page', Target.window().fully().layout());

        await menuPage.openSwaggerAndCheck();
        await eyes.check('Swagger page', Target.window().fully());
    });
});