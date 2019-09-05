# Changelog

## 2019.09 10.3.0

* Updated Azure Storage Service API version to 2019-02-02.
* Added a new API `ShareURL.createPermission()` which allows for the creation of a security descriptor at the Azure File share level. This descriptor can be used for files and directories in the share.
* Added a new API `ShareURL.getPermission()` which allows for the retrieval of the security descriptor set on a share.
* Added APIs `DirectoryURL.setProperties()` and `FileURL.setProperties()`, and updated APIs `DirectoryURL.create()` and `FileURL.create()` for setting file permission, attributes, creation time, and last write time.
* Added a new API `FileURL.uploadRangeFromURL()` which allows range in a file to be written using a range of another file as a source. This permits synchronous server-side copies to be orchestrated for files of any size.

## 2019.06 10.2.0

* Fixed a bug of `downloadBlobToBuffer()` and `downloadAzureFileToBuffer()` when provided offset is not 0.
* Fixed a bug that `Aborter` cannot work during retry interval.
* Fixed a bug that `Aborter` throws timeout error even though it succeeds of `FileURL.download()`.
* Fixed a bug that "err.code.toUpperCase is not a function" when retries in browser.
* `Aborter` doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.
* Export `RetryPolicyType`.
* Updated HTTP client from axios to node-fetch in Node.js runtime.
* A new option `keepAliveOptions` added to parameter of `StorageURL.newPipeline()` which controls keep-alive configurations. Keep-alive is enabled by default.
* Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/en-us/rest/api/storageservices/version-2018-11-09).
* The `ShareURL.getStatistics()` now returns the approximate size in bytes with `shareUsageBytes`.
* Added `DirectoryURL.listHandlesSegment()` and `FileURL.listHandlesSegment()` to returns a list of open handles on a directory or a file.
* Added `DirectoryURL.forceCloseHandlesSegment()`, `FileURL.forceCloseHandlesSegment()`, `DirectoryURL.forceCloseHandle()` and `FileURL.forceCloseHandle()` to close handles.
* Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/en-us/rest/api/storageservices/version-2018-11-09).

## 2019.01 10.1.0

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

## 2018.12 Version 10.0.0-preview

* Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
