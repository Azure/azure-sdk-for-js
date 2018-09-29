# Changelog

2018.09 10.1.0-preview

* Size of browser bundle is reduced to 175KB (minified version).
* Set `sideEffects` option to `true` in package.json, which helps webpack4 for tree shaking.
* Updated `browser` and `module` option in package.json, webpack will try to load ES6 module.
* Dropped built-in polyfills for `String`, and following polyfills need to be loaded external for IE11 now:
  * `Promise`
  * `String.prototype.startsWith`
  * `String.prototype.endsWith`
  * `String.prototype.repeat`
  * `String.prototype.includes`

2018.09 Version 10.0.0-preview

* Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
