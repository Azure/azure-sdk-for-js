# Changelog

* Fixed a bug that `Aborter` cannot work during retry interval.
* Export `RetryPolicyType`.
* Aborter doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.

2019.1 Version 10.1.0

* [Breaking] Updated convenience layer methods enum type parameters into typescript union types, this will help to reduce bundle footprint.
* [Breaking] `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
* [Breaking] IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
* Updated dependency `ms-rest-js` to `@azure/ms-rest-js`.
* Updated server timeout value for retry options `tryTimeoutInMs` to 30 seconds.
* Fixed `Aborter.timeout()` misleading scale description.
* Fixed an issue that enqueue/dequeue/peek fail to work with some utf8 characters.
* Exported HttpRequestBody type for who wants to implement a customized HTTP client.  

2018.12 Version 10.0.0-preview

* Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
