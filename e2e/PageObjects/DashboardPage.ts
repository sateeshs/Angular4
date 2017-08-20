import { $, by, element, ElementFinder,browser } from 'protractor';
import { defineSupportCode } from 'cucumber';
//import { browser, by, element } from 'protractor';
export  class DashboardPage {

    public first_operand: ElementFinder;
    public second_operand: ElementFinder;
    public operator: any;
    public go_button: ElementFinder;
    public result: ElementFinder;

    navigateTo() {
        return browser.get('/');
    }
    constructor() {
    }

    getCitySearch() {
        return element(by.tagName('app-city-search')).sendKeys('repalle');
    }
}

