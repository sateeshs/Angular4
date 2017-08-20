import { AppPage } from './app.po';
import { DashboardPage } from './PageObjects/DashboardPage';
import { browser } from 'protractor'
import { } from 'protractor-cucumber-framework';

//https://coryrylan.com/blog/introduction-to-e2e-testing-with-the-angular-cli-and-protractor
describe('weather-app App', () => {
  let page: AppPage;

  beforeEach(() => {
      page = new AppPage();
      //page = new Dashboard();
  });

  it('should display dashborad page', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Northville, US');
  });

  it('search for repalle', () => {
      page.getCitySearch('repalle');
  });
});
