import { AngularSidenavPage } from './app.po';

describe('angular-sidenav App', () => {
  let page: AngularSidenavPage;

  beforeEach(() => {
    page = new AngularSidenavPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
