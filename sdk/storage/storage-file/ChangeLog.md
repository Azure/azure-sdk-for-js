# Changelog

### 2019.08

- [Breaking] Aborter class is no longer exposed from the package. You are expected to use
  the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.
  [`AbortController.timeout(<milliseconds>)` can be utitlized as an abort signal.]

### 2019.07 Version 12.0.0-preview.1

- [Breaking] Client types are renamed from *URL to *Client.
  - ServiceURL, ShareURL, DirectoryURL and FileURL to FileServiceClient, ShareClient, DirectoryClient and FileClient respectively.
- [Breaking] Aborter parameters are now moved into option bags.
  - `abortSignal` attrubute(optional) in the option-bag of respective module has to be utitlized for the `Aborter.timeout(<milliseconds>)` functionality.
  - `Aborter.none` is the default value.
- [Breaking] I- prefixes are removed from interface names.
  - Example- `IDirectoryCreateOptions` is updated to `DirectoryCreateOptions`, the new names must to be used.
- [Breaking] The static methods to create client types are removed. The functionality is moved into new instance methods added to the parent clients.
- [Breaking] The telemetry strings have been updated.
  - `Azure-Storage/${SDK_VERSION}` is updated to `azsdk-js-storageblob/${SDK_VERSION}`.
- [Breaking] `withPipeline()` method is removed.
- Async iterators with pagination support are added for listing methods
  - `listFilesAndDirectories()` and `listShares()`
  - Please refer to the samples for async iterators in the `samples` folder.
- [Breaking] Methods that list segments(`listFilesAndDirectoriesSegment()` and `listSharesSegment()`) are no longer exposed in public api.
- [Breaking] High level convenience functions are moved into clients as their instance member function.
  - `uploadFileToAzureFile()`, `uploadStreamToAzureFile()`, `downloadAzureFileToBuffer()` and `uploadBrowserDataToAzureFile()` -> `FileClient.uploadFile()`,
    `FileClient.uploadStream()`, `FileClient.downloadToBuffer()` and `FileClient.uploadBrowserData()` respectively.
- [Breaking] `StorageClient` is no longer exposed. `StorageClient.newPipeline()` static method is moved to the top level exported function `newPipeline()`.
- Updated dependency `@azure/ms-rest-js` to `@azure/core-http`.
- Constructor overloads added into client types so they can be constructed from a url and a pipeline/credential and connection string.
  - Constructors with overloads - `FileServiceClient` and `ShareClient`
  - Connection string method is supported only in Node.js (not browsers).
- Creation/Deletion of child resources are duplicated to parent client type.
- HTTP proxy support is added (Node.js only).

  - Please refer to the `proxyAuth.ts` sample in the `samples/typescript` folder.

- Request and response headers are now logged at INFO level, with sensitive data redacted.
- `downloadToFile()` is added to `FileClient`.

For release notes and more information please visit https://aka.ms/azure-sdk-preview1-js

### 2019.01 Version 10.1.0

- [Breaking] Updated convenience layer methods enum type parameters into typescript union types, this will help reducing bundle footprint.
- [Breaking] Updated URL encoding strategy for `url` parameters of `new XXXURL(url, pipeline)` methods, such as `new FileURL(url, pipeline)`.
  - URL will accept both encoded or non-encoded URL string. It will escape non-escaped special characters, like Chinese characters. However, if directory/file name includes `%`, `url` must be encoded manually.
- [Breaking] `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
- [Breaking] IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
- Updated dependency `ms-rest-js` to `@azure/ms-rest-js`.
- Fixed `Aborter.timeout()` misleading scale description.
- Removed default 60s server timeout value for retry options `tryTimeoutInMs` to avoid large blob download stream unexpected ending.
- Fixed an issue that when body is string with special characters, `FileURL.uploadRange` will fail to upload.
- Exported `HttpRequestBody` type for who wants to implement a customized HTTP client.

### 2018.12 Version 10.0.0-preview

- Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
