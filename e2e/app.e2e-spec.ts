import { TestRagzzaPage } from './app.po';

describe('test-ragzza App', () => {
  let page: TestRagzzaPage;

  beforeEach(() => {
    page = new TestRagzzaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
