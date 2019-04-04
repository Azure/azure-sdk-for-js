# Breaking Changes

2018.01 Version 10.1.0

* Updated convenience layer methods enum type parameters into typescript union types, this will help reducing bundle footprint.
* Updated URL encoding strategy for `url` parameters of `new XXXURL(url, pipeline)` methods, such as `new FileURL(url, pipeline)`.
* URL will accept both encoded or non-encoded URL string. It will escape non-escaped special characters, like Chinese characters. However, if directory/file name includes `%`, `url` must be encoded manually.
* `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
* IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.