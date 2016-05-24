import { DeterminantPage } from './app.po';

describe('determinant App', function() {
  let page: DeterminantPage;

  beforeEach(() => {
    page = new DeterminantPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('determinant works!');
  });
});
