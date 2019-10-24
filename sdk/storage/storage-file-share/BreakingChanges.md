# Breaking Changes

## 2019.10 12.0.0-preview.5

- [Breaking] `IPRange` is renamed to `SasIPRange`. [PR #5551](https://github.com/Azure/azure-sdk-for-js/pull/5551)
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

### 2019.10 12.0.0-preview.4

- `Models.StorageServiceProperties` is renamed into `Models.FileServiceProperties`
- Replace string array with boolean flags to specify dataset to include when listing shares.
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

### 2019.08 Version 12.0.0-preview.2

- Aborter class is no longer exposed from the package. Use the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.
  `AbortController.timeout(<milliseconds>)` can be utitlized as an abort signal.
- `Models.StorageServiceProperties` is renamed into `Models.FileServiceProperties`

### 2019.07 Version 12.0.0-preview.1

- Client types are renamed from *URL to *Client.
  - ServiceURL, ShareURL, DirectoryURL and FileURL to ServiceClient to FileServiceClient, ShareClient, DirectoryClient and FileClient respectively.
- Aborter parameters are now moved into option bags.
  - `abortSignal` attrubute(optional) in the option-bag of respective module has to be utitlized for the `Aborter.timeout(<milliseconds>)` functionality.
  - `Aborter.none` is the default value.
- I- prefixes are removed from interface names.
  - Example- `IDirectoryCreateOptions` is updated to `DirectoryCreateOptions`, the new names have to be used.
- The static methods to create client types are removed. The functionality is moved into new instance methods added to the parent clients.
- The telemetry strings have been updated.
  - `Azure-Storage/${SDK_VERSION}` is updated to `azsdk-js-storageblob/${SDK_VERSION}`.
- `withPipeline()` method is removed.
- Methods that list segments(`listFilesAndDirectoriesSegment()` and `listSharesSegment()`) are no longer exposed in public api.
- High level convenience functions are moved into clients as their instance member function.
  - `uploadFileToAzureFile()`, `uploadStreamToAzureFile()`, `downloadAzureFileToBuffer()` and `uploadBrowserDataToAzureFile()` -> `FileClient.uploadFile()`,
    `FileClient.uploadStream()`, `FileClient.downloadToBuffer()` and `FileClient.uploadBrowserData()` respectively.
- `StorageClient` is no longer exposed. `StorageClient.newPipeline()` static method is moved to the top level exported function `newPipeline()`.

### 2019.01 Version 10.1.0

- Updated convenience layer methods enum type parameters into typescript union types, this will help reducing bundle footprint.
- Updated URL encoding strategy for `url` parameters of `new XXXURL(url, pipeline)` methods, such as `new FileURL(url, pipeline)`.
- URL will accept both encoded or non-encoded URL string. It will escape non-escaped special characters, like Chinese characters. However, if directory/file name includes `%`, `url` must be encoded manually.
- `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
- IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
