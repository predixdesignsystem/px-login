// This is the wrapper for custom tests, called upon web components ready state
var runCustomTests = function() {
  // Place any setup steps like variable declaration and initialization here
  var server;
  var fakeUserInfo = '{"user_name": "FromServer"}';

  setup(function() {
    server = sinon.fakeServer.create();
    server.respondWith('GET', '/userinfo', [200, {"Content-Type": "application/json"}, fakeUserInfo]);
    server.autoRespond = true;
  });

  teardown(function() {
    server.restore();
  });

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-login', function() {
    setup(function() {
      var loginEl = Polymer.dom(document).querySelector('px-login');
      loginEl.userName = null;
      loginEl.userInfo = null;
    });

    test('Sign in button shows by default', function(done) {
      var loginEl = Polymer.dom(document).querySelector('px-login'),
          loginButton = Polymer.dom(loginEl.root).querySelector('#loginButton');
      setTimeout(function() {
        assert.include(loginButton.textContent, 'Sign In');
        done();
      }, 500);
    });

    test('Username shows when set', function(done) {
      var loginEl = Polymer.dom(document).querySelector('px-login'),
          userNameButton;
      loginEl.userName = 'Greg S';
      userNameButton = Polymer.dom(loginEl.root).querySelector('#userNameButton');
      assert.include(userNameButton.textContent, 'Greg S');
      done();
    });

    test('Clicking username shows popover', function(done) {
      var loginEl = Polymer.dom(document).querySelector('px-login'),
          userNameButton,
          popoverWrapper = document.querySelector('#popoverWrapper');

      loginEl.userName = 'Greg S';
      userNameButton = Polymer.dom(loginEl.root).querySelector('#userNameButton');
      expect(popoverWrapper.classList.contains('fadeFromHidden')).to.equal(false);
      userNameButton.click();
      flush(function() {
        popoverWrapper = document.querySelector('#popoverWrapper');
        expect(popoverWrapper.classList.contains('fadeFromHidden')).to.equal(true);
        done();
      });
    });

    test('Clicking login changes window.location to loginUrl', function(done) {
      var loginEl = Polymer.dom(document).querySelector('px-login'),
          loginButton = Polymer.dom(loginEl.root).querySelector('#loginButton');
      loginEl.loginUrl = '#login';
      loginButton.click();
      flush(function() {
        assert.equal('#login', window.location.hash);
        done();
      });
    });

    test('Userinfo from server is stored in properties', function(done) {
      var loginEl = Polymer.dom(document).querySelector('px-login'),
        userInfoAjax = Polymer.dom(loginEl.root).querySelector('#userInfoAjax');
      loginEl.userName = null;
      var request = userInfoAjax.generateRequest();
      server.respond();

      flush(function() {
        assert.equal(loginEl.userName, JSON.parse(fakeUserInfo).user_name);
        assert.deepEqual(loginEl.userInfo, JSON.parse(fakeUserInfo));
        done();
      });
    });

    test('Clicking logout clears properties, and changes window.location to logoutUrl', function(done) {
      var loginEl = Polymer.dom(document).querySelector('px-login'),
          userNameButton,
          logoutButton,
          popoverWrapper = document.querySelector('#popoverWrapper');

      loginEl.userName = 'Greg S';
      loginEl.logoutUrl = '#logout';
      userNameButton = Polymer.dom(loginEl.root).querySelector('#userNameButton');
      userNameButton.click();
      flush(function() {
        popoverWrapper = document.querySelector('#popoverWrapper');
        logoutButton = document.querySelector('#logoutButton');
        logoutButton.click();
      });

      flush(function() {
        assert.isNull(loginEl.userName);
        assert.isNull(loginEl.userInfo);
        assert.equal('#logout', window.location.hash);
        // let loginButton = Polymer.dom(loginEl.root).querySelector('#loginButton');
        // assert.equal(loginButton.hidden, true);
        done();
      });
    });

    test('Custom menu items are displayed in popover', function() {
      var loginEl = Polymer.dom(document).querySelector('px-login'),
          userNameButton, popoverWrapper, listItems;

      loginEl.menuItems = [{label: "test label", url: "/foo"}];
      loginEl.userName = 'Greg S';
      userNameButton = Polymer.dom(loginEl.root).querySelector('#userNameButton');
      userNameButton.click();
      flush(function() {
        popoverWrapper = document.querySelector('#popoverWrapper');
        expect(popoverWrapper.classList.contains('fadeFromHidden')).to.equal(true);
        listItems = document.querySelectorAll('#popover li');
        expect(listItems.length).to.equal(2);
        expect(listItems[0].textContent).to.equal("test label");
        done();
      });
    });

  });
}
