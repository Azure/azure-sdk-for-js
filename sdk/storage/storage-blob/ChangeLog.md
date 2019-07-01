# Changelog

2019.07 Version 12.0.0-preview.1

- [Breaking] Client types are renamed from *URL to *Client.
  BlobURL, BlockBlobURL, ContainerURL, ServiceURL, StorageURL to BlobClient, BlockBlobClient, ContainerClient, BlobServiceClient, StorageClient respectively.
- [Breaking] Aborter parameters are now moved into option bags.
  - `abortSignal` attrubute(optional) in the option-bag of respective module has to be utitlized for the `Aborter.timeout(<milliseconds>)` functionality.
  - `Aborter.none` is the default value.
- [Breaking] I- prefixes are removed from interface names
  - Example- `IBlobDownloadOptions` is updated to `BlobDownloadOptions`, the new names must to be used.
- [Breaking] The static methods to create client types are removed. The functionality is moved into new instance methods added to the parent clients.
- [Breaking] The telemetry strings have been updated.
  - `Azure-Storage/${SDK_VERSION}` is updated to `azsdk-js-storagefile/${SDK_VERSION}`.
- [Breaking]  withPipeline method is removed.
- Async iterators with pagination support are added for listing methods
  - `listContainers()`, `listBlobsFlat()` and `listBlobsByHierarchy()`
  - Please refer to the samples for async iterators in the `samples` folder.
- [Breaking]  Methods that list segments(`listBlobFlatSegment()` and `listContainersSegment()`) are no longer exposed in public api.
- [Breaking]  High level convenience functions are moved into clients as their instance member function.
	- `uploadFileToBlockBlob()`, `uploadStreamToBlockBlob()` and `uploadBrowserDataToBlockBlob()` -> `BlockBlobClient.uploadFile()`, `BlockBlobClient.uploadStream()` and  `BlockBlobClient.uploadBrowserData()` respectively
  - `downloadBlobToBuffer()` -> `BlobClient.downloadToBuffer()`
- [Breaking] `StorageClient` is no longer exposed. `StorageClient.newPipeline()` static method is moved to the top level exported function `newPipeline()`.
- [Breaking] `TokenCredential` has been renamed to `RawTokenCredential` to make way for the new `@azure/identity` library's `TokenCredential` interface.
- [Breaking] Blob/Container member methods that manage leases are removed. A new type `LeaseClient` is added to manage leases.
- Updated dependency `@azure/ms-rest-js` to `@azure/core-http`.
- Constructor overloads added into client types so they can be constructed from a url and a pipeline/credential and connection string.
  - Constructors with overloads - `AppendBlobClient`, `BlobClient`, `BlobServiceClient`, `BlockBlobClient`, `ContainerClient` and `PageBlocbClient`
  - Connection string method is supported only in Node.js (not browsers).
- Creation/Deletion of child resources are duplicated to parent client type.
- HTTP proxy support is added (Node.js only).
  - Please refer to the `proxyAuth.ts` sample in the `samples/typescript` folder.
- Request and response headers are now logged at INFO level, with sensitive data redacted.
- `downloadToFile()` is added to `BlobClient`.
- Exported `HttpRequestBody` type to allow implementation of a customized HTTP client.

For release notes and more information please visit https://aka.ms/azure-sdk-preview1-js

2018.12 10.3.0

- [Breaking] Updated convenience layer methods enum type parameters into typescript union types, this will help reducing bundle footprint.
- [Breaking] Updated URL encoding strategy for `url` parameters of `new XXXURL(url, pipeline)` methods, such as `new BlobURL(url, pipeline)`.
  - URL will accept both encoded or non-encoded URL string. It will escape non-escaped special characters, like Chinese characters. However, if blob name includes `?` or `%`, `url` must be encoded manually.
- [Breaking] `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
- [Breaking] IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
- Updated dependency `ms-rest-js` to `@azure/ms-rest-js`.
- Fixed `Aborter.timeout()` misleading scale description.
- Added option `maxSingleShotSize` to customize concurrency upload threshold in bytes for highlevel uploading APIs, like `uploadBrowserDataToBlockBlob` or `uploadFileToBlockBlob`.
- Removed default 60s server timeout value for retry options `tryTimeoutInMs` to avoid large blob download stream unexcepted ending.
- Fixed an issue that when body is string with special characters, `BlockBlobULR.upload` will fail to upload.

2018.11 10.2.0-preview

- [Breaking] Updated names of exported interfaces `IHTTPPipelineLogger` & `IHTTPClient` to `IHttpPipelineLogger` & `IHttpClient`.
- [Breaking] For `setMetadata()` and `setHTTPHeaders()`, `metadata` and `blobHTTPHeaders` are moved from `options` into top level parameter list.
- Fixed bugs and typos in samples.
- Fixed a bug during generateAccountSASQueryParameters() that generated signature is not valid.
- Fixed a bug during generateBlobSASQueryParameters() that cache-control, content-type, content-disposition, content-encoding and content-language are not supported.
- Fixed a bug in SAS generation that start and expiry time format is not correct.
- Removed `File` from `uploadBrowserDataToBlockBlob` parameter type list, because `File` extends `Blob` which is already in the list.
- Fixed typos in `IRange` comments.
- Removed useless `marker` field from option of `ServiceURL.listContainersSegment` method.
- Fixed a bug that `timeout` parameter should use second as unit instead of millisecond.
- Added stream retry when `BlobURL.download` response stream unexcepted ends.

2018.09 10.1.0-preview

- Fixed sharedkey authentication error when blob names have spaces.
- Updated samples in readme and sample folder to fix undefined headers.
- Updated readme samples to make it runnable as copy/paste.
- More documentation around ACCOUNT_SAS and CORS in readme.md and contributing.md.
- Size of browser bundle is reduced from 229KB to 175KB (minified version). Thanks Brian Terlson & Rikki Gibson!
- Set `sideEffects` option to `true` in package.json, which helps webpack4 for tree shaking.
- Updated `browser` and `module` option in package.json, webpack will try to load ES6 module.
- Added prettier config file.
- Fixed typos and unused imports.
- [Breaking] Dropped built-in polyfills for `String`, and following polyfills need to be loaded external for IE11 now:
  - `Promise`
  - `String.prototype.startsWith`
  - `String.prototype.endsWith`
  - `String.prototype.repeat`
  - `String.prototype.includes`
- [Breaking] `Aborter.None` is renamed to `Aborter.none` for JavaScript naming conventions.

2018.09 Version 10.0.0-preview

- Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
