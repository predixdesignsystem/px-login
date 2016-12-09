px-login [![Build Status](https://travis-ci.org/PredixDev/px-login.svg?branch=master)](https://travis-ci.org/PredixDev/px-login)
-----------------------------------------------

[![px-login demo](px-login.png?raw=true)](https://predixdev.github.io/px-login)

## Overview

px-login is a Predix UI component


## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

### Getting Started

First, install the component via bower on the command line.

```
bower install https://github.com/PredixDev/px-login.git --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-login/px-login.html"/>
```

Finally, use the component in your application:

```
<px-login menu-items='[{"icon": "fa-gear", "url":"/user-settings.html", "label": "Setting Item 1"}, {"icon": "fa-gear", "label": "Setting Item 2", "url":"/user-settings.html"}]' logout-url="logged_out.html" user-info-url="userInfo.js"></px-login>
```

## documentation

Read the full API and view the demo [here](https://predixdev.github.io/px-login/).


### Local Development
From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

### API and examples

From the component's directory

```
$ gulp serve
```

Starts a local server. Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.


### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-login/issues) to submit any bugs you might find.
