# Changelog

## 2019.10 12.0.0-preview.5

- [Breaking] `IPRange` is renamed to `SasIPRange`. [PR #5551](https://github.com/Azure/azure-sdk-for-js/pull/5551)
- Created new interface `CommonOptions`. This interface is for standard options that apply to all methods that invoke remote operations. This interface currently contains options that enable client-side tracing of the SDK. [PR #5550](https://github.com/Azure/azure-sdk-for-js/pull/5550)
- `offset` parameter is optional in `downloadToBuffer` method of `FileClient`. [PR #5592](https://github.com/Azure/azure-sdk-for-js/pull/5592)
- Async iterator with pagination support is added to list Handles - `listHandles` [PR #5536](https://github.com/Azure/azure-sdk-for-js/pull/5536)
- [Breaking] `Models` is no longer exported in public API surface. Instead generated model types required by the public API are explicitly re-exported. [PR #5532](https://github.com/Azure/azure-sdk-for-js/pull/5532)
- [Breaking] Cancelling an operation now throws a standardized error with the name `AbortError`. [PR #5633](https://github.com/Azure/azure-sdk-for-js/pull/5663)
- [Breaking] `filePath` is on `FileClient` is renamed to `path`. `dirPath` is added to `DirectoryClient` is renamed to `path`. [PR #5613](https://github.com/Azure/azure-sdk-for-js/pull/5613)
- [Breaking] `body` field from `RestError` Object in core-http Library is removed, the `response` property on the error will now have the `parsedBody` & `headers` along with raw body & headers that are already present. PRs [#5670](https://github.com/Azure/azure-sdk-for-js/pull/5670), [#5437](https://github.com/Azure/azure-sdk-for-js/pull/5437)
  - Errors from the storage service can be seen in an extra field `details` with the expected error code. [#5688](https://github.com/Azure/azure-sdk-for-js/pull/5688)
- [Breaking] `progress` callback in the option bags of all the helper methods is renamed to `onProgress`. [PR #5676](https://github.com/Azure/azure-sdk-for-js/pull/5676)
- [Breaking] Type of the `permissions` attribute in the options bag `FileSASSignatureValues` to be passed into `generateFileSASQueryParameters` is changed to `FileSASPermissions` from type `string`. [PR #5626](https://github.com/Azure/azure-sdk-for-js/pull/5626)
  - Similarly, `AccountSASPermissions` for `generateAccountSASQueryParameters` instead of type `string`.
  - Example - permissions attribute in `generateFileSASQueryParameters`
    - `permissions: FileSASPermissions.parse("racwd").toString()` changes to `FileSASPermissions.parse("racwd")`
- [Breaking] `sourceModifiedAccessConditions` attribute in `FileUploadRangeFromURLOptions` is renamed to `sourceConditions`. [PR #5682](https://github.com/Azure/azure-sdk-for-js/pull/5682)
- Renames for following Options interfaces. [PR #5650](https://github.com/Azure/azure-sdk-for-js/pull/5650)
  - `UploadStreamToAzureFileOptions` -> `FileUploadStreamOptions`,
  - `UploadToAzureFileOptions` -> `FileParallelUploadOptions`,
  - `DownloadFromAzureFileOptions` -> `FileDownloadToBufferOptions`
- [Breaking] Appropriate attribute renames in all the interfaces [PR #5610](https://github.com/Azure/azure-sdk-for-js/pull/5610)
  - Example - `nextMarker` -> `continuationToken`, `HTTPClient` -> `HttpClient`, `permission` -> `permissions`, `parallelism` -> `concurrency`
- [Breaking] `forceCloseHandlesSegment` is not exposed from the library in favour of the new method `forceCloseAllHandles` on `FileClient` and `DirectoryClient`. [PR #5620](https://github.com/Azure/azure-sdk-for-js/pull/5620)
- [Breaking] IE11 needs `Object.assign` polyfill loaded. [PR #5727](https://github.com/Azure/azure-sdk-for-js/pull/5727)

## 2019.10 12.0.0-preview.4

- Library tries to load the proxy settings from the environment variables like HTTP_PROXY if the proxy settings are not provided when clients like `FileServiceClient` or `FileClient` are instantiated.
- Added name properties on all the clients for convenience.
  - `accountName` is added for `DirectoryClient`, `FileClient`, `FileServiceClient` and `ShareClient`.
  - `shareName` is added to `DirectoryClient`, `FileClient` and `ShareClient`.
  - `filePath` is added to `FileClient`.
  - `dirPath` is added to `DirectoryClient`.
- [Breaking] `Models.StorageServiceProperties` is renamed into `Models.FileServiceProperties`.
- [Breaking] Replace string array with boolean flags to specify dataset to include when listing shares.
  Before this change the option is specified as
  ```js
  fileServiceClient.listShares({
    include: ["metadata", "snapshots"]
  });
  ```
  After this change:
  ```js
  fileServiceClient.listShares({
    includeMetadata: true,
    includeSnapshots: true
  });
  ```

## 2019.08 12.0.0-preview.3

- Updated Azure Storage Service API version to 2019-02-02.
- Added a new API `ShareClient.createPermission()` which allows for the creation of a security descriptor at the Azure File share level. This descriptor can be used for files and directories in the share.
- Added a new API `ShareClient.getPermission()` which allows for the retrieval of the security descriptor set on a share.
- Added APIs `DirectoryClient.setProperties()` and `FileClient.setProperties()`, and updated APIs `DirectoryClient.create()` and `FileClient.create()` for setting file permission, attributes, creation time, and last write time.
- Added a new API `FileClient.uploadRangeFromURL()` which allows range in a file to be written using a range of another file as a source. This permits synchronous server-side copies to be orchestrated for files of any size.
- Fixed a bug of `FileClient.downloadToBuffer()` when provided offset is not 0.
- Fixed a bug that `Aborter` cannot work during retry interval.
- Fixed a bug that `Aborter` throws timeout error even though it succeeds of `FileClient.download()`.
- Fixed a bug that "err.code.toUpperCase is not a function" when retries in browser.
- `Aborter` doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.
- Export `RetryPolicyType`.
- Updated HTTP client from axios to node-fetch in Node.js runtime.
- A new option `keepAliveOptions` added to parameter of `newPipeline()` which controls keep-alive configurations. Keep-alive is enabled by default.
- The `ShareClient.getStatistics()` now returns the approximate size in bytes with `shareUsageBytes`.
- Added `DirectoryClient.listHandlesSegment()` and `FileClient.listHandlesSegment()` to returns a list of open handles on a directory or a file.
- Added `DirectoryClient.forceCloseHandlesSegment()`, `FileClient.forceCloseHandlesSegment()`, `DirectoryClient.forceCloseHandle()` and `FileClient.forceCloseHandle()` to close handles.
- Pass through `options.abortSignal` to the optional `abortSignal` attribute in option bags instead of using `AbortSignal.none` as the default value when `options.abortSignal` is not specified.
- Basic HTTP proxy authentication support is added. Proxy settings can be passed in the options while creating a new client. Example - [typescript/proxyAuth.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-file/samples/typescript/proxyAuth.ts)
- Connection strings for explicit storage endpoints are supported. - [Configure Azure Storage connection strings](https://docs.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#create-a-connection-string-for-an-explicit-storage-endpoint)

## 2019.08 12.0.0-preview.2

- [Breaking] Aborter class is no longer exposed from the package. Use the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.
  `AbortController.timeout(<milliseconds>)` can be utitlized as an abort signal.
- Storage service allows SAS connection string with SAS string and endpoints along with the Account connection string(account name, key and endpoint).
  In this preview, SAS connection string support is added to the existing connection string client constructors and static methods.
  - Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
  - SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
  - SAS connection string is supported in both NodeJS and browser runtimes unlike the Account Connection String which is supported only in the NodeJS runtime.

## 2019.07 12.0.0-preview.1

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

## 2019.09 10.3.0

- Updated Azure Storage Service API version to 2019-02-02.
- Added a new API `ShareURL.createPermission()` which allows for the creation of a security descriptor at the Azure File share level. This descriptor can be used for files and directories in the share.
- Added a new API `ShareURL.getPermission()` which allows for the retrieval of the security descriptor set on a share.
- Added APIs `DirectoryURL.setProperties()` and `FileURL.setProperties()`, and updated APIs `DirectoryURL.create()` and `FileURL.create()` for setting file permission, attributes, creation time, and last write time.
- Added a new API `FileURL.uploadRangeFromURL()` which allows range in a file to be written using a range of another file as a source. This permits synchronous server-side copies to be orchestrated for files of any size.

## 2019.06 10.2.0

- Fixed a bug of `downloadBlobToBuffer()` and `downloadAzureFileToBuffer()` when provided offset is not 0.
- Fixed a bug that `Aborter` cannot work during retry interval.
- Fixed a bug that `Aborter` throws timeout error even though it succeeds of `FileURL.download()`.
- Fixed a bug that "err.code.toUpperCase is not a function" when retries in browser.
- `Aborter` doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.
- Export `RetryPolicyType`.
- Updated HTTP client from axios to node-fetch in Node.js runtime.
- A new option `keepAliveOptions` added to parameter of `StorageURL.newPipeline()` which controls keep-alive configurations. Keep-alive is enabled by default.
- Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/en-us/rest/api/storageservices/version-2018-11-09).
- The `ShareURL.getStatistics()` now returns the approximate size in bytes with `shareUsageBytes`.
- Added `DirectoryURL.listHandlesSegment()` and `FileURL.listHandlesSegment()` to returns a list of open handles on a directory or a file.
- Added `DirectoryURL.forceCloseHandlesSegment()`, `FileURL.forceCloseHandlesSegment()`, `DirectoryURL.forceCloseHandle()` and `FileURL.forceCloseHandle()` to close handles.
- Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/en-us/rest/api/storageservices/version-2018-11-09).

## 2019.01 10.1.0

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

## 2018.12 10.0.0-preview

- Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
