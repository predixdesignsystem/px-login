suite('Custom Automation Tests for px-login', function() {
  let fakeUserInfo, server, loginEl;

  setup(function(done) {
    fakeUserInfo = '{"user_name": "FromServer"}';
    server = sinon.fakeServer.create();
    server.respondWith('GET', '/userinfo', [200, {"Content-Type": "application/json"}, fakeUserInfo]);
    server.autoRespond = true;
    loginEl = fixture('px_login_1');
    loginEl.userName = null;
    loginEl.userInfo = null;
    flush(()=>{
      done();
    });
  });

  teardown(function() {
    server.restore();
  });

  test('Sign in button shows by default', function(done) {
    var loginButton = Polymer.dom(loginEl.root).querySelector('#loginButton');
    setTimeout(function() {
      assert.include(loginButton.textContent.trim(), 'Sign In');
      done();
    }, 500);
  });

  test('Username shows when set', function(done) {
    var userNameButton;
    loginEl.userName = 'Greg S';
    userNameButton = Polymer.dom(loginEl.root).querySelector('#userNameButton');
    assert.include(userNameButton.textContent.trim(), 'Greg S');
    done();
  });

  test('Clicking username shows popover', function(done) {
    var userNameButton,
        popover = Polymer.dom(loginEl.root).querySelector('px-popover');

    loginEl.userName = 'Greg S';
    userNameButton = Polymer.dom(loginEl.root).querySelector('#userNameButton');
    expect(popover._isShowing).to.equal(false);
    userNameButton.click();
    flush(function() {
      popover = Polymer.dom(loginEl.root).querySelector('px-popover');
      expect(popover._isShowing).to.equal(true);
      done();
    });
  });

  test('Clicking login changes window.location to loginUrl', function(done) {
    var loginButton = Polymer.dom(loginEl.root).querySelector('#loginButton');
    loginEl.loginUrl = '#login';
    loginButton.click();
    flush(function() {
      assert.equal('#login', window.location.hash);
      done();
    });
  });

  test('Userinfo from server is stored in properties', function(done) {
    var userInfoAjax = Polymer.dom(loginEl.root).querySelector('#userInfoAjax');
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
    var userNameButton, logoutButton;

    loginEl.userName = 'Greg S';
    loginEl.logoutUrl = '#logout';
    userNameButton = Polymer.dom(loginEl.root).querySelector('#userNameButton');
    userNameButton.click();
    flush(function() {
      logoutButton = Polymer.dom(loginEl.root).querySelector('#logoutButton');
      logoutButton.click();
    });

    flush(function() {
      assert.isNull(loginEl.userName);
      assert.isNull(loginEl.userInfo);
      assert.equal('#logout', window.location.hash);
      done();
    });
  });

  test('Custom menu items are displayed in popover', function(done) {
    var userNameButton, popoverWrapper, listItems;

    loginEl.menuItems = [{label: "test label", url: "/foo"}];
    loginEl.userName = 'Greg S';
    userNameButton = Polymer.dom(loginEl.root).querySelector('#userNameButton');
    userNameButton.click();
    flush(function() {
      listItems = Polymer.dom(loginEl.root).querySelectorAll('.login-menu--item');
      expect(listItems.length).to.equal(1);
      expect(listItems[0].textContent).to.equal("test label");
      done();
    });
  });

});
