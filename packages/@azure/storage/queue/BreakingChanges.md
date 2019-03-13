# Breaking Changes

2019.1 Version 10.1.0
* Updated convenience layer methods enum type parameters into typescript union types, this will help to reduce bundle footprint.
* `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
* IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.