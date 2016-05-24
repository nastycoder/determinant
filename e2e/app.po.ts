export class DeterminantPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('determinant-app h1')).getText();
  }
}
