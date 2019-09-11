# Changelog

## 2019.09 12.0.0-preview.3

- [Breaking] `RawTokenCredential` is dropped. TokenCredential implementations can be found in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library for authentication.
- Updated Azure Storage Service API version to 2019-02-02.
- A new API `BlobServiceClient.submitBatch()` supports Blob Batch operation which allows multiple requests to be sent within a single request body.
- Added support for customer provided encryption key.
- Added support for rehydrate priority with additional option to methods `BlobClient.startCopyFromURL()` and `BlobClient.setTier()`.
- APIs `BlobClient.startCopyFromURL()`, `BlockBlobClient.upload()`, `BlockBlobClient.commitBlockList()` and `PageBlobClient.create()` now support set the blob tier within the API call.
- Responses for all APIs now return x-ms-client-request-id through `clientRequestId` that was passed in on the request from client-side.
- Exposed options to accept CRC64 as a transactional data integrity mechanism for data transfer APIs.
- Added overloads of `generateBlobSASQueryParameters` functions to generate user delegation SAS.
- `expiry` and `start` in `AccessPolicy` are now optional in `ContainerClient.setAccessPolicy` and `ContainerClient.getAccessPolicy`.
- Exported `HttpRequestBody` type for who wants to implement a customized HTTP client.
- Fixed a bug of `BlobClient.downloadToBuffer()` when provided offset is not 0.
- Fixed a bug that `Aborter` cannot work during retry interval.
- Fixed a bug that `Aborter` throws timeout error even though it succeeds of `BlockBlobClient.download()`.
- Fixed a bug that "err.code.toUpperCase is not a function" when retries in browser.
- Export `RetryPolicyType`.
- `Aborter` doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.
- Service SAS generation now supports snapshot access control from 2018-11-09 in `generateBlobSASQueryParameters()`.
- Service SAS generation now supports snapshot access control from API version 2018-11-09 in `generateBlobSASQueryParameters()`.
- A new API `PageBlobClient.uploadPagesFromURL()` allows pages in a page blob to be written using a range of another blob as a source. This permits synchronous server-side copies to be orchestrated for page blobs of any size.
- A new API `AppendBlobClient.appendBlockFromURL()` commits a new block of data to the end of an append blob. Method uses a range of another blob as a source. This permits synchronous server-side copies to be orchestrated for append blobs of any size.
- A new API `BlobClient.syncCopyFromURL()` allows a block blob to be copied synchronously using a URL as a source. This API has a maximum size of 256 MB and preserves metadata and block list.
- A new API `BlobServiceClient.getUserDelegationKey()` added to get a key that can be used to generate a user delegation SAS (shared access signature).
- Updated HTTP client from axios to node-fetch in Node.js runtime.
- A new option `keepAliveOptions` added to parameter of `newPipeline()` which controls keep-alive configurations. Keep-alive is enabled by default.
- Pass through `options.abortSignal` to the optional `abortSignal` attribute in option bags instead of using `AbortSignal.none` as the default value when `options.abortSignal` is not specified.
- Basic HTTP proxy authentication support is added. Proxy settings can be passed in the options while creating a new client. Example - [typescript/proxyAuth.ts](https://github.com/Azure/azure-sdk-for-js/blob/feature/storage/sdk/storage/storage-blob/samples/typescript/proxyAuth.ts)
- Connection strings for explicit storage endpoints are supported. - [Configure Azure Storage connection strings](https://docs.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#create-a-connection-string-for-an-explicit-storage-endpoint)

## 2019.08 12.0.0-preview.2

- [Breaking] Aborter class is no longer exposed from the package. Use the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.
  `AbortController.timeout(<milliseconds>)` can be utitlized as an abort signal.
- Generalized the credential parameter in client constructors to support `{SharedKeyCredential | AnonymousCredential | TokenCredential}` credentials as a union type.
- Storage service allows SAS connection string with SAS string and endpoints along with the Account connection string(account name, key and endpoint).
  In this preview, SAS connection string support is added to the existing connection string client constructors and static methods.
  - Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
  - SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
  - SAS connection string is supported in both NodeJS and browser runtimes unlike the Account Connection String which is supported only in the NodeJS runtime.

## 2019.07 12.0.0-preview.1

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
  - `uploadFileToBlockBlob()`, `uploadStreamToBlockBlob()` and `uploadBrowserDataToBlockBlob()` -> `BlockBlobClient.uploadFile()`, `BlockBlobClient.uploadStream()` and `BlockBlobClient.uploadBrowserData()` respectively
  - `downloadBlobToBuffer()` -> `BlobClient.downloadToBuffer()`
- [Breaking] `StorageClient` is no longer exposed. `StorageClient.newPipeline()` static method is moved to the top level exported function `newPipeline()`.
- [Breaking] `TokenCredential` has been renamed to `RawTokenCredential` to make way for the new `@azure/identity` library's `TokenCredential` interface.
- [Breaking] Blob/Container member methods that manage leases are removed. A new type `LeaseClient` is added to manage leases.
- Updated dependency `@azure/ms-rest-js` to `@azure/core-http`.
- Constructor overloads added into client types so they can be constructed from a url and a pipeline/credential and connection string.
  - Constructors with overloads - `AppendBlobClient`, `BlobClient`, `BlobServiceClient`, `BlockBlobClient`, `ContainerClient` and `PageBlobClient`
  - Connection string method is supported only in Node.js (not browsers).
- Creation/Deletion of child resources are duplicated to parent client type.
- HTTP proxy support is added (Node.js only).
  - Please refer to the `proxyAuth.ts` sample in the `samples/typescript` folder.
- Request and response headers are now logged at INFO level, with sensitive data redacted.
- `downloadToFile()` is added to `BlobClient`.
- Exported `HttpRequestBody` type to allow implementation of a customized HTTP client.

For release notes and more information please visit https://aka.ms/azure-sdk-preview1-js

## 2019.09 10.5.0

- Updated Azure Storage Service API version to 2019-02-02.
- A new API `ServiceURL.submitBatch()` supports Blob Batch operation which allows multiple requests to be sent within a single request body.
- Added support for customer provided encryption key.
- Added support for rehydrate priority with additional option to methods `BlobURL.startCopyFromURL()` and `BlobURL.setTier()`.
- APIs `BlobURL.startCopyFromURL()`, `BlockBlobURL.upload()`, `BlockBlobURL.commitBlockList()` and `PageBlobURL.create()` now support set the blob tier within the API call.
- Responses for all APIs now return x-ms-client-request-id through `clientRequestId` that was passed in on the request from client-side.
- Exposed options to accept CRC64 as a transactional data integrity mechanism for data transfer APIs.

## 2019.08 10.4.1

- Added overloads of `generateBlobSASQueryParameters` functions to generate user delegation SAS.
- `expiry` and `start` in `AccessPolicy` are now optional in `ContainerURL.setAccessPolicy` and `ContainerURL.getAccessPolicy`.

## 2019.07 10.4.0

- Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/en-us/rest/api/storageservices/version-2018-11-09).
- Improved comments for `BlockBlobURL.upload()`.
- Exported `HttpRequestBody` type for who wants to implement a customized HTTP client.
- Fixed a bug of `downloadBlobToBuffer()` and `downloadAzureFileToBuffer()` when provided offset is not 0.
- Fixed a bug that `Aborter` cannot work during retry interval.
- Fixed a bug that `Aborter` throws timeout error even though it succeeds of `BlockBlobUrl.download()`.
- Fixed a bug that "err.code.toUpperCase is not a function" when retries in browser.
- Export `RetryPolicyType`.
- `Aborter` doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.
- Service SAS generation now supports snapshot access control from 2018-11-09 in `generateBlobSASQueryParameters()`.
- Service SAS generation now supports snapshot access control from API version 2018-11-09 in `generateBlobSASQueryParameters()`.
- A new API `PageBlobURL.uploadPagesFromURL()` allows pages in a page blob to be written using a range of another blob as a source. This permits synchronous server-side copies to be orchestrated for page blobs of any size.
- A new API `AppendBlobURL.appendBlockFromURL()` commits a new block of data to the end of an append blob. Method uses a range of another blob as a source. This permits synchronous server-side copies to be orchestrated for append blobs of any size.
- A new API `BlobURL.syncCopyFromURL()` allows a block blob to be copied synchronously using a URL as a source. This API has a maximum size of 256 MB and preserves metadata and block list.
- A new API `ServiceURL.getUserDelegationKey()` added to get a key that can be used to generate a user delegation SAS (shared access signature).
- Updated HTTP client from axios to node-fetch in Node.js runtime.
- A new option `keepAliveOptions` added to parameter of `StorageURL.newPipeline()` which controls keep-alive configurations. Keep-alive is enabled by default.

## 2018.12 10.3.0

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

## 2018.11 10.2.0-preview

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

## 2018.09 10.1.0-preview

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

## 2018.09 10.0.0-preview

- Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
