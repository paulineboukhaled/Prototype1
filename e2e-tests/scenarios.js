'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /cvForm when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/cvForm");
  });


  describe('cvForm', function() {

    beforeEach(function() {
      browser.get('index.html#/cvForm');
    });


    it('should render cvForm when user navigates to /cvForm', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('positionForm', function() {

    beforeEach(function() {
      browser.get('index.html#/positionForm');
    });


    it('should render positionForm when user navigates to /positionForm', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
