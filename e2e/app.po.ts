import { defineSupportCode, } from 'cucumber';
import { browser, by, element } from 'protractor';
export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getParagraphText() {
        return element(by.css('app-root h2')).getText();
    }

    getCitySearch(text: string) {
        browser.waitForAngularEnabled();
        var input = element(by.css('md-input-container input#citySearchText'));
        //element(by.id('citySearchText'));

        //input = element(by.css('md-input-container input#citySearchText'));
        //input.isElementPresent('.md-input-container').then((val) => { console.log('test Log'+val); });
        //input = element(by.tagName('.md-card.app-city-search.form.md-input-container.div.div.div.input'));

        input.sendKeys(text);

        browser.sleep(1000);

        element(by.css('.mat-autocomplete-visible')).all(by.tagName('md-option')).each((o, i) => {
            o.click();
            browser.waitForAngular(); // wait for the renderings to take effect

        });


        //element(by.cssContainingText('.mat-input-hint-wrapper mat-form-field-hint-wrapper', text)).click()

        //expect(input.getAttribute('value')).toBe('repalle, in');

        return element(by.css('app-root h2')).getText();

    }
}
