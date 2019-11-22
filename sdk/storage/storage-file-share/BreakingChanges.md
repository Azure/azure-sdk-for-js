# Breaking Changes

## 2019.12 12.0.0-preview.7

- [Breaking] The default browser bundle has been removed from the npm package. Bundling your application with a bundler such as Webpack is the recommended approach to building a browser bundle. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).
- [Breaking] The `expiryTime` and `startTime` members of the `AccountSASSignatureValues` and `FileSASSignatureValues` types, as well as the `expiry` and `start` members of the `accessPolicy` field of the `SignedIdentifier` type, have all been renamed to `expiresOn` and `startsOn` respectively for consistency with `@azure/storage-blob` and `@azure/storage-queue`.
- [Breaking] `shareName` on `ShareClient` has been renamed to `name`. [PR 6135](https://github.com/Azure/azure-sdk-for-js/pull/6135)
- [Breaking] In browsers, `blobBody` on `FileDownloadResponse` has been renamed to `contentAsBlob` in order to avoid naming confusion between browser `Blob` objects and `Blob`s from `@azure/storage-blob`. [PR 6183](https://github.com/Azure/azure-sdk-for-js/pull/6183) 

## 2019.11 12.0.0-preview.6

- `@azure/storage-file` package is renamed to `@azure/storage-file-share` to better align with the upcoming new package for Azure Storage Files DataLake. As a consequence,
  - `FileServiceClient` becomes `ShareServiceClient`
  - `DirectoryClient` becomes `ShareDirectoryClient`
  - `FileClient` becomes `ShareFileClient`
- [Breaking] The custom browser and retry policies that are specific to the Storage libraries have been
renamed to have the `Storage` prefix. [PR 5862](https://github.com/Azure/azure-sdk-for-js/pull/5862). 
Below are the entities that now have the Storage prefix
   - BrowserPolicy
   - BrowserPolicyFactory
   - RetryPolicy
   - RetryPolicyType
   - RetryOptions
   - RetryPolicyFactory
- The properties in the StoragePipelineOptions interface have been updated as below:
   - The `proxy` property of type `ProxySettings | string` has been renamed to `proxyOptions` and
 will be of type `ProxyOptions`. If you have been passing url directly, split the value into `host`
 and `port` then pass it as a json object.
   - The `telemetry` property of type `TelemetryOptions` has been renamed to `userAgentOptions` of
 type `UserAgentOptions`.
    - The `logger` is no longer a property available to configure. To enable logging, please see the
[Troubleshooting](https://github.com/Azure/azure-sdk-for-js/blob/0ddc2f3c3d4658b20d96910acc37a77e5209e5e3/sdk/storage/storage-queue/README.md#troubleshooting) section of our readme.
- [Breaking] The `UniqueRequestIdPolicy` and `KeepAlivePolicy` are no longer exported from this library. The
 corresponding policies from the `@azure/core-http` library are meant to be used instead.
 
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
