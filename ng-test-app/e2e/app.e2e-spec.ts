import { NgTestAppPage } from './app.po';

describe('ng-test-app App', () => {
  let page: NgTestAppPage;

  beforeEach(() => {
    page = new NgTestAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
