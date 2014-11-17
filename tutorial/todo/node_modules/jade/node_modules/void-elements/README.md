void-elements
==============

### Array of "void elements" defined by the HTML specification

Exports an Array of "void element" node names as defined by the HTML spec.

The list is programatically generated from [SPEC](http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements).

[![Build Status](https://img.shields.io/travis/hemanth/void-elements/master.svg)](https://travis-ci.org/hemanth/void-elements)
[![Dependency Status](https://img.shields.io/gemnasium/hemanth/void-elements.svg)](https://gemnasium.com/hemanth/void-elements)
[![NPM version](https://img.shields.io/npm/v/void-elements.svg)](https://www.npmjs.org/package/void-elements)

Usage
-----

```js
var voidElements = require('void-elements');

assert(voidElements.indexOf('span') === -1, '<span> is not a void element');
assert(voidElements.indexOf('img') !== -1, '<img> is a void element');
```

License
-------

MIT
