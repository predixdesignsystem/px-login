# px-login [![Build Status](https://travis-ci.org/PredixDev/px-login.svg?branch=master)](https://travis-ci.org/PredixDev/px-login)

## Overview

`Px-login` is a Predix UI component which provides a login/logout button that integrates nicely with Cloud Foundry's UAA.

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm, and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line:

```
bower install px-login --save
```

Second, import the component in your application with the following tag in your head:

```
<link rel="import" href="/bower_components/px-login/px-login.html"/>
```

Finally, use the component in your application:

    <px-login
      login-url="/login"
      logout-url="/logout"
      user-info-url="/userinfo"
      fetch-user-info-on-load="true"
      popover-location="bottom"
      menu-items='[{"url":"#settings","label":"Settings"},{"url":"#account","label":"My Account"}]'
      language="en">
    </px-login>

<br />
<hr />

## Documentation

Read the full API and view the demo [here](https://predixdev.github.io/px-login).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-login/issues) to submit any bugs you might find.
