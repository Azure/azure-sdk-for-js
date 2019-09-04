# Changelog

## 2019.09 10.5.0

* Updated Azure Storage Service API version to 2019-02-02.
* A new API `ServiceURL.submitBatch()` supports Blob Batch operation which allows multiple requests to be sent within a single request body.
* Added support for customer provided encryption key.
* Added support for rehydrate priority with additional option to methods `BlobURL.startCopyFromURL()` and `BlobURL.setTier()`.
* APIs `BlobURL.startCopyFromURL()`, `BlockBlobURL.upload()`, `BlockBlobURL.commitBlockList()` and `PageBlobURL.create()` now support set the blob tier within the API call.
* Responses for all APIs now return x-ms-client-request-id through `clientRequestId` that was passed in on the request from client-side.
* Exposed options to accept CRC64 as a transactional data integrity mechanism for data transfer APIs.

## 2019.08 10.4.1

* Added overloads of `generateBlobSASQueryParameters` functions to generate user delegation SAS.
* `expiry` and `start` in `AccessPolicy` are now optional in `ContainerURL.setAccessPolicy` and `ContainerURL.getAccessPolicy`.

## 2019.07 10.4.0

* Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/en-us/rest/api/storageservices/version-2018-11-09).
* Improved comments for `BlockBlobURL.upload()`.
* Exported `HttpRequestBody` type for who wants to implement a customized HTTP client.
* Fixed a bug of `downloadBlobToBuffer()` and `downloadAzureFileToBuffer()` when provided offset is not 0.
* Fixed a bug that `Aborter` cannot work during retry interval.
* Fixed a bug that `Aborter` throws timeout error even though it succeeds of `BlockBlobUrl.download()`.
* Fixed a bug that "err.code.toUpperCase is not a function" when retries in browser.
* Export `RetryPolicyType`.
* `Aborter` doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.
* Service SAS generation now supports snapshot access control from 2018-11-09 in `generateBlobSASQueryParameters()`.
* Service SAS generation now supports snapshot access control from API version 2018-11-09 in `generateBlobSASQueryParameters()`.
* A new API `PageBlobURL.uploadPagesFromURL()` allows pages in a page blob to be written using a range of another blob as a source. This permits synchronous server-side copies to be orchestrated for page blobs of any size.
* A new API `AppendBlobURL.appendBlockFromURL()` commits a new block of data to the end of an append blob. Method uses a range of another blob as a source. This permits synchronous server-side copies to be orchestrated for append blobs of any size.
* A new API `BlobURL.syncCopyFromURL()` allows a block blob to be copied synchronously using a URL as a source. This API has a maximum size of 256 MB and preserves metadata and block list.
* A new API `ServiceURL.getUserDelegationKey()` added to get a key that can be used to generate a user delegation SAS (shared access signature).
* Updated HTTP client from axios to node-fetch in Node.js runtime.
* A new option `keepAliveOptions` added to parameter of `StorageURL.newPipeline()` which controls keep-alive configurations. Keep-alive is enabled by default.

## 2018.12 10.3.0

* [Breaking] Updated convenience layer methods enum type parameters into typescript union types, this will help reducing bundle footprint.
* [Breaking] Updated URL encoding strategy for `url` parameters of `new XXXURL(url, pipeline)` methods, such as `new BlobURL(url, pipeline)`.
  * URL will accept both encoded or non-encoded URL string. It will escape non-escaped special characters, like Chinese characters. However, if blob name includes `?` or `%`, `url` must be encoded manually.
* [Breaking] `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
* [Breaking] IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
* Updated dependency `ms-rest-js` to `@azure/ms-rest-js`.
* Fixed `Aborter.timeout()` misleading scale description.
* Added option `maxSingleShotSize` to customize concurrency upload threshold in bytes for highlevel uploading APIs, like `uploadBrowserDataToBlockBlob` or `uploadFileToBlockBlob`.
* Removed default 60s server timeout value for retry options `tryTimeoutInMs` to avoid large blob download stream unexcepted ending.
* Fixed an issue that when body is string with special characters, `BlockBlobULR.upload` will fail to upload.

## 2018.11 10.2.0-preview

* [Breaking] Updated names of exported interfaces `IHTTPPipelineLogger` & `IHTTPClient` to `IHttpPipelineLogger` & `IHttpClient`.
* [Breaking] For `setMetadata()` and `setHTTPHeaders()`, `metadata` and `blobHTTPHeaders` are moved from `options` into top level parameter list.
* Fixed bugs and typos in samples.
* Fixed a bug during generateAccountSASQueryParameters() that generated signature is not valid.
* Fixed a bug during generateBlobSASQueryParameters() that cache-control, content-type, content-disposition, content-encoding and content-language are not supported.
* Fixed a bug in SAS generation that start and expiry time format is not correct.
* Removed `File` from `uploadBrowserDataToBlockBlob` parameter type list, because `File` extends `Blob` which is already in the list.
* Fixed typos in `IRange` comments.
* Removed useless `marker` field from option of `ServiceURL.listContainersSegment` method.
* Fixed a bug that `timeout` parameter should use second as unit instead of millisecond.
* Added stream retry when `BlobURL.download` response stream unexcepted ends.

## 2018.09 10.1.0-preview

* Fixed sharedkey authentication error when blob names have spaces.
* Updated samples in readme and sample folder to fix undefined headers.
* Updated readme samples to make it runnable as copy/paste.
* More documentation around ACCOUNT_SAS and CORS in readme.md and contributing.md.
* Size of browser bundle is reduced from 229KB to 175KB (minified version). Thanks Brian Terlson & Rikki Gibson!
* Set `sideEffects` option to `true` in package.json, which helps webpack4 for tree shaking.
* Updated `browser` and `module` option in package.json, webpack will try to load ES6 module.
* Added prettier config file.
* Fixed typos and unused imports.
* [Breaking] Dropped built-in polyfills for `String`, and following polyfills need to be loaded external for IE11 now:
  * `Promise`
  * `String.prototype.startsWith`
  * `String.prototype.endsWith`
  * `String.prototype.repeat`
  * `String.prototype.includes`
* [Breaking] `Aborter.None` is renamed to `Aborter.none` for JavaScript naming conventions.

## 2018.09 Version 10.0.0-preview

* Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
