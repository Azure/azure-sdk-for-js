# Changelog

* Fixed a bug of `downloadBlobToBuffer()` and `downloadAzureFileToBuffer()` when provided offset is not 0.

2018.01 Version 10.1.0

* [Breaking] Updated convenience layer methods enum type parameters into typescript union types, this will help reducing bundle footprint.
* [Breaking] Updated URL encoding strategy for `url` parameters of `new XXXURL(url, pipeline)` methods, such as `new FileURL(url, pipeline)`.
  * URL will accept both encoded or non-encoded URL string. It will escape non-escaped special characters, like Chinese characters. However, if directory/file name includes `%`, `url` must be encoded manually.
* [Breaking] `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
* [Breaking] IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
* Updated dependency `ms-rest-js` to `@azure/ms-rest-js`.
* Fixed `Aborter.timeout()` misleading scale description.
* Removed default 60s server timeout value for retry options `tryTimeoutInMs` to avoid large blob download stream unexpected ending.
* Fixed an issue that when body is string with special characters, `FileURL.uploadRange` will fail to upload.
* Exported `HttpRequestBody` type for who wants to implement a customized HTTP client.

2018.12 Version 10.0.0-preview

* Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
