# Release History

## 12.23.0-beta.2 (Unreleased)

### Other Changes

- Allow HTTP connections

## 12.23.0-beta.1 (2023-11-01)


- Migrated dependency on `@azure/core-http` to `@azure/core-rest-pipeline`.

## 12.17.1-beta.1 (2024-04-18)

### Features Added

- Added support for service version 2024-05-04.
- Added ability to call ShareFileClient.getRangeListDiff() on a file that has been renamed.
- Added support OAuth for interface ShareFileClient.uploadRangeFromURL().
- Added support to return clientName property in file/directory handle properties in ShareFileClient.listHandles() and ShareDirectoryClient.listHandles().

## 12.17.0 (2023-11-09)

### Features Added

- Includes all features released in 12.17.0-beta.1.

## 12.17.0-beta.1 (2023-10-18)

### Features Added

- Added support for service version 2023-11-03.
- Added support for indicating audience in StoragePipelineOptions.

## 12.16.1 (Unreleased)

### Features Added

- Added support for service version 2023-11-03.
- Added support for indicating audience in StoragePipelineOptions.

## 12.16.0 (2023-09-14)

## 12.15.0 (2023-07-12)

### Features Added

- Includes all features released in 12.15.0.

## 12.15.0-beta.1 (2023-05-31)

### Features Added

- Added support for service version 2023-01-03.
- Added access rights in each handles returned by ShareDirectoryClient.listHandles()/ShareFileClient.listHandles().

## 12.14.0 (2023-04-13)

### Features Added

- Includes all features released in 12.14.0-beta.1.

## 12.14.0-beta.1 (2023-03-29)

### Features Added

- Added support for service version 2022-11-02.
- Added support OAuth.
- Added support for Trailing Dot.

## 12.13.0 (2023-02-23)

### Features Added

- Includes all features released in 12.13.0-beta.1.

### Bugs Fixed

- Fixed an issue of getting 403 error for blob name with './' or '../'

## 12.13.0-beta.1 (2023-02-09)

### Features Added

- Added support for service version 2021-12-02.
- Added support for invalid XML characters in file and directory names for ShareDirectoryClient.listFilesAndDirectories(), .listHandles(), and ShareFileClient.listHandles().

### Other Changes

- Update dependency `@azure/core-http` version to `^3.0.0`.

## 12.12.0 (2022-10-14)

### Features Added

- Added support for service version 2021-10-04.

### Bugs Fixed

- Fixed a hang issue in ShareFileClient.downloadToBuffer when encountering transient network failure.
- Refined URL parsing method to let it be able to correctly parse URLs with account name in path.
- Fixed an issue of escaping slashes in file or directory path unnecessarily.

## 12.11.0 (2022-07-08)

### Features Added

- Added support for service version 2021-08-06.

## 12.10.0 (2022-05-12)

### Features Added

- Includes all features released in 12.10.0-beta.1.

### Bugs Fixed

- Refined user-agent value to avoid failure when os information is not available on some platforms.

## 12.10.0-beta.1 (2022-04-19)

### Features Added

- Added support for service version 2021-06-08.
- Added ability to maintain a file's current last write time when calling ShareFileClient.uploadRange() and ShareFileClient.uploadRangeFromURL().
- Added ability to specify a file or directory's change time when calling ShareFileClient.create(), ShareDirectoryClient.create(), ShareFileClient.setProperties(), ShareDirectoryClient.setProperties(), ShareFileClient.resize(), ShareFileClient.rename() and ShareDirectoryClient.rename().
- Added ability to specify content-type on a file when calling ShareFileClient.rename().

### Bugs Fixed

- Add `react-native` mapping to ESM entry point

## 12.9.0 (2022-03-11)

### Features Added

- Includes all features released in 12.9.0-beta.1, 12.9.0-beta.2, 12.9.0-beta.3 and 12.9.0-beta.4.

## 12.9.0-beta.4 (2022-03-04)

### Bugs Fixed

- Fixed bug where ShareFileClient.startCopyFromURL() was not sending the ignoreReadonly parameter correctly.
- Set correct content length in requests for uploading operations to avoid unexpected failure if customized content length is incorrect.

## 12.9.0-beta.3 (2022-02-11)

### Features Added

- Added support for service version 2021-04-10.
- Added support for renaming a file or a directory.

## 12.9.0-beta.2 (2021-12-03)

### Features Added

- Added support for service version 2021-02-12.
- Added support for premium file share `provisionedBandwidthMiBps` property.

## 12.9.0-beta.1 (2021-11-09)

### Features Added

- Added support for service version 2020-12-06.

## 12.8.0 (2021-09-10)

### Features Added

- Includes all features released in 12.8.0-beta.1.

## 12.7.0 (2021-08-02)

- Support for Node.js 8 and IE 11 has been dropped. Please see our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.

## 12.8.0-beta.1 (2021-07-28)

### Features Added

- Added support for service version 2020-10-02.
- Added support for including additional information in `ShareDirectoryClient.listFilesAndDirectories()`.
- Added support for OAuth in copying source in `ShareFileClient.uploadRangeFromURL()` when source is a Blob.
- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

## 12.6.0 (2021-06-09)

- Updated Azure Storage Service API version to 2020-08-04.
- Fixed bug where ShareFileClient.download, ShareFileClient.downloadToBuffer or ShareFileClient.downloadToFile could corrupt data if source is modified when retrying.

## 12.5.0 (2021-03-10)

- Updated Azure Storage Service API version to 2020-06-12.

## 12.4.1 (2021-02-03)

- Fixed a bug where `generateFileSASQueryParameters()` won't correctly set the resource type if `FileSASSignatureValues.permissions` is not specified. Fixed issue [13223](https://github.com/Azure/azure-sdk-for-js/issues/13223).
- The `"Unclosed root tag"` XML parser error is now retriable. [PR #13076](https://github.com/Azure/azure-sdk-for-js/pull/13076).

## 12.4.0 (2021-01-12)

- This release contains bug fixes to improve quality.

## 12.4.0-beta.1 (2020-12-09)

- Updated Azure Storage Service API version to 2020-04-08.
- Share now supports for NFS. User can specify the `protocols` when creating a Share via `ShareClient.create()`. Also added an `rootSquash` option for NFS shares.
- Added `generateSasUrl` to `ShareClient` and `ShareFileClient` to generate a service-level SAS URI for the client.
- Added `generateAccountSasUrl` to `ShareServiceClient` to generate an account-level SAS URI for the client.
- Won't remove the first space in the `userAgentOptions.userAgentPrefix` passed to the `newPipeline()` now. Fixed bug [7536](https://github.com/Azure/azure-sdk-for-js/issues/7536).

## 12.3.0 (2020-11-10)

- Removed ability to create a ShareLeaseClient for a Share or Share Snapshot. This feature has been rescheduled for future release.
- Replaced `ShareClient.setAccessTier()` with `ShareClient.setProperties()`, which can be used to set both Share Tier and Share Quota.
- Fixed a bug where `ShareDirectoryClient.deleteIfExists()` and `ShareFileClient.deleteIfExists()` would throw an exception if the directory or file's parent directory doesn't exist.

## 12.3.0-beta.1 (2020-10-13)

- Updated Azure Storage Service API version to 2020-02-10.
- Added support for SMB Multichannel.
- Added support for Share and Share Snapshot Leases. Now can initialize a `ShareLeaseClient` with a `ShareClient` to manage leases for a share or share snapshot. Most operations on share now also support lease conditions.
- Added support for Get File Range Diff. Added `ShareFileClient.getRangeListDiff()` for getting the list of ranges that differ between a previous share snapshot and the file.
- Added support for Set Share Tier. Added `ShareClient.setAccessTier()` for setting the access tier of the share.

## 12.2.0 (2020-09-08)

- Added share soft delete support. Added `undeleteShare` to `ShareServiceClient`. `listShares` now can return deleted shares. Note: share soft delete only take effect on accounts with share soft delete feature enabled.
- Bug fix - `credential` parameter of `newPipeline()` function is now optional. If not specified, `AnonymousCredential` is used. Fixes bug [9628](https://github.com/Azure/azure-sdk-for-js/issues/9628).
- Bug fix - Content-Length header is no more ignored. Fixes bugs [8903](https://github.com/Azure/azure-sdk-for-js/issues/8903), [9300](https://github.com/Azure/azure-sdk-for-js/issues/9300) and [10614](https://github.com/Azure/azure-sdk-for-js/issues/10614).

## 12.2.0-preview.1 (2020-07-03)

- Updated Azure Storage Service API version to 2019-12-12.
- Support 4 TB files.
- Added `exists` and `deleteIfExists()` to `ShareClient`, `ShareDirectoryClient`, and `ShareFileClient`.
- Added `createIfNotExists()` to `ShareClient` and `ShareDirectoryClient`.

## 12.1.2 (2020-05-20)

- Fix data corruption failure error [issue #6411](https://github.com/Azure/azure-sdk-for-js/issues/6411) when downloading compressed files. [PR #7993](https://github.com/Azure/azure-sdk-for-js/pull/7993)
- Fix un-handled TypeError [issue #8499](https://github.com/Azure/azure-sdk-for-js/issues/8499) in Electron applications. [PR #8568](https://github.com/Azure/azure-sdk-for-js/pull/8568)
- Updated to use `@opentelemetry/api` 0.6.1 via `@azure/core-tracing`. [PR #7998](https://github.com/Azure/azure-sdk-for-js/pull/7998)
- Updated to use `typescript` 3.8.3. [PR #8659](https://github.com/Azure/azure-sdk-for-js/pull/8659)

## 12.1.1 (2020-03-10)

- Fixed unexpected hang issue when uploading empty body. Fixed bug [6904](https://github.com/Azure/azure-sdk-for-js/issues/6904).

## 12.1.0 (2020-02-11)

- Updated Azure Storage Service API version to 2019-07-07.
- A new type `ShareLeaseClient` is added to manage leases.
- New SMB parameters for file copy.
- Force Close Handles Response now includes the number of handles that failed to close.
- `ShareProperties` now has 4 additional properties for premium file shares.
- Fixed a bug where the package didn't work as expected when bundling web applications. [PR #7298](https://github.com/Azure/azure-sdk-for-js/pull/7298)

## 12.0.1 (2020-01-09)

- Bug fix - Name properties on clients now support more kinds of endpoints(IPv4/v6 hosts, single word domains). [PR #6755](https://github.com/Azure/azure-sdk-for-js/pull/6755)
- Service clients now share a single http client instance by default. [PR #6657](https://github.com/Azure/azure-sdk-for-js/pull/6657)

  Previously, a new http client was created for each service client if none was provided by the user. This could result in TCP port exhaustion under heavy usage with the keepAlive option enabled because each http client has its own persistent TCP connection. This change creates a single http client instance which is shared among all service clients by default.

## 12.0.0 (2019-12-04)

- [Breaking] The default browser bundle has been removed from the npm package. Bundling your application with a bundler such as Webpack is the recommended approach to building a browser bundle. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).
- [Breaking] The `expiryTime` and `startTime` members of the `AccountSASSignatureValues` and `FileSASSignatureValues` types, as well as the `expiry` and `start` members of the `accessPolicy` field of the `SignedIdentifier` type, have all been renamed to `expiresOn` and `startsOn` respectively for consistency with `@azure/storage-blob` and `@azure/storage-queue`.
- [Breaking] `forceCloseAllHandles` will return `CloseHandlesInfo` type instead of number.
- [Breaking] `forceCloseHandle` will return `closedHandlesCount` property instead of `numberOfHandlesClosed` to be compatible with `CloseHandlesInfo`.
- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`
- Bug Fix - Convert empty prefixes (`""`) to `undefined` when passed as options to the `listFiles` or `listShares` methods to avoid sending an invalid request to the service. Fixes bug [5817](https://github.com/Azure/azure-sdk-for-js/issues/5817).
- The `ShareFileClient.downloadToBuffer()` helper method has a new overload where it is not required to pass a `Buffer`. The attributes `offset` and `count` are optional, and it downloads the entire file if they are not provided.
- [Breaking] `shareName` on `ShareClient` has been renamed to `name`. [PR 6135](https://github.com/Azure/azure-sdk-for-js/pull/6135)
- `ShareFileClient` and `ShareDirectoryClient` now have a `name` property that returns the file or directory name respectively. [PR 6135](https://github.com/Azure/azure-sdk-for-js/pull/6135)
- [Breaking] In browsers, `blobBody` on `FileDownloadResponse` has been renamed to `contentAsBlob` in order to avoid naming confusion between browser `Blob` objects and `Blob`s from `@azure/storage-blob`. [PR 6183](https://github.com/Azure/azure-sdk-for-js/pull/6183)
- [Breaking] Removed `uploadBrowserData` from `ShareFileClient` in favor of a unified method `uploadData` that accepts both browser `Blob` objects as well as Node.js `Buffer` objects.
- Added a warning to the documentation of `downloadToBuffer` that explains the limitations of Node.js `Buffer` sizes to around 2GB on 64-bit architectures and 1GB on 32-bit architectures.
- Documented the behavior of `getProperties` methods with respect to metadata keys and their casing inconsistency when compared to the metadata keys returned through corresponding "list" methods with the `includeMetadata` option.

## 12.0.0-preview.6 (2019-10-30)

- [Breaking] `@azure/storage-file` package is renamed to `@azure/storage-file-share` to better align with the upcoming new package for Azure Storage Files DataLake. As a consequence,
  - `FileServiceClient` becomes `ShareServiceClient`
  - `DirectoryClient` becomes `ShareDirectoryClient`
  - `FileClient` becomes `ShareFileClient`
- Bug Fix - Previous versions of `@azure/storage-file` library failed for the react-apps because of the usage of `fs.stat` method which is not available in browsers. The issue is fixed in this new release.
- [Breaking] The custom browser and retry policies that are specific to the Storage libraries have been
  renamed to have the `Storage` prefix. [PR 5862](https://github.com/Azure/azure-sdk-for-js/pull/5862).
  Below are the entities that now have the Storage prefix
  - BrowserPolicy
  - BrowserPolicyFactory
  - RetryPolicy
  - RetryPolicyType
  - RetryOptions
  - RetryPolicyFactory
- [Breaking] The properties in the StoragePipelineOptions interface have been updated as below:
  - The `proxy` property of type `ProxySettings | string` has been renamed to `proxyOptions` and
    will be of type `ProxyOptions`. If you have been passing url directly, split the value into `host`
    and `port` then pass it as a json object.
  - The `telemetry` property of type `TelemetryOptions` has been renamed to `userAgentOptions` of
    type `UserAgentOptions`. - The `logger` is no longer a property available to configure. To enable logging, please see the
    [Troubleshooting](https://github.com/Azure/azure-sdk-for-js/blob/0ddc2f3c3d4658b20d96910acc37a77e5209e5e3/sdk/storage/storage-queue/README.md#troubleshooting) section of our readme.
- [Breaking] The `UniqueRequestIdPolicy` and `KeepAlivePolicy` are no longer exported from this library. The
  corresponding policies from the `@azure/core-http` library are meant to be used instead.
- Bug Fix - Previous versions of `@azure/storage-file` library failed for the react-apps because of the usage of `fs.stat` method which is not available in browsers. The issue is fixed in this new release.

## 12.0.0-preview.5 (2019-10-22)

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

## 12.0.0-preview.4 (2019-10-09)

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
    include: ["metadata", "snapshots"],
  });
  ```
  After this change:
  ```js
  fileServiceClient.listShares({
    includeMetadata: true,
    includeSnapshots: true,
  });
  ```

## 10.3.0 (2019-09-01)

- Updated Azure Storage Service API version to 2019-02-02.
- Added a new API `ShareURL.createPermission()` which allows for the creation of a security descriptor at the Azure File share level. This descriptor can be used for files and directories in the share.
- Added a new API `ShareURL.getPermission()` which allows for the retrieval of the security descriptor set on a share.
- Added APIs `DirectoryURL.setProperties()` and `FileURL.setProperties()`, and updated APIs `DirectoryURL.create()` and `FileURL.create()` for setting file permission, attributes, creation time, and last write time.
- Added a new API `FileURL.uploadRangeFromURL()` which allows range in a file to be written using a range of another file as a source. This permits synchronous server-side copies to be orchestrated for files of any size.

## 12.0.0-preview.3 (2019-08-01)

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
- Basic HTTP proxy authentication support is added. Proxy settings can be passed in the options while creating a new client. Example - [proxyAuth.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-share/samples-dev/proxyAuth.ts)
- Connection strings for explicit storage endpoints are supported. - [Configure Azure Storage connection strings](https://docs.microsoft.com/azure/storage/common/storage-configure-connection-string#create-a-connection-string-for-an-explicit-storage-endpoint)

## 12.0.0-preview.2 (2019-08-01)

- [Breaking] Aborter class is no longer exposed from the package. Use the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.
  `AbortController.timeout(<milliseconds>)` can be utitlized as an abort signal.
- Storage service allows SAS connection string with SAS string and endpoints along with the Account connection string(account name, key and endpoint).
  In this preview, SAS connection string support is added to the existing connection string client constructors and static methods.
  - Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
  - SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
  - SAS connection string is supported in both NodeJS and browser runtimes unlike the Account Connection String which is supported only in the NodeJS runtime.

## 12.0.0-preview.1 (2019-07-01)

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
- [Breaking] Methods that list segments(`listFilesAndDirectoriesSegment()` and `listSharesSegment()`) are no longer exposed in public api.
- [Breaking] High level convenience functions are moved into clients as their instance member function.
  - `uploadFileToAzureFile()`, `uploadStreamToAzureFile()`, `downloadAzureFileToBuffer()` and `uploadBrowserDataToAzureFile()` -> `FileClient.uploadFile()`,
    `FileClient.uploadStream()`, `FileClient.downloadToBuffer()` and `FileClient.uploadBrowserData()` respectively.
- [Breaking] `StorageClient` is no longer exposed. `StorageClient.newPipeline()` static method is moved to the top level exported function `newPipeline()`.
- Updated dependency `@azure/ms-rest-js` to `@azure/core-http`.
- Constructor overloads added into client types so they can be constructed from a url and a pipeline/credential and connection string.
  - Constructors with overloads - `FileServiceClient` and `ShareClient`
  - Connection string method is supported only in Node.js (not browsers).
- Creation/Deletion of child resources are duplicated to parent client type.
- HTTP proxy support is added (Node.js only).

  - Please refer to the `proxyAuth.ts` sample in the `samples/v12/typescript` folder.

- Request and response headers are now logged at INFO level, with sensitive data redacted.
- `downloadToFile()` is added to `FileClient`.

For release notes and more information please visit https://aka.ms/azsdk/releases/july2019preview

## 10.2.0 (2019-06-01)

- Fixed a bug of `downloadBlobToBuffer()` and `downloadAzureFileToBuffer()` when provided offset is not 0.
- Fixed a bug that `Aborter` cannot work during retry interval.
- Fixed a bug that `Aborter` throws timeout error even though it succeeds of `FileURL.download()`.
- Fixed a bug that "err.code.toUpperCase is not a function" when retries in browser.
- `Aborter` doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.
- Export `RetryPolicyType`.
- Updated HTTP client from axios to node-fetch in Node.js runtime.
- A new option `keepAliveOptions` added to parameter of `StorageURL.newPipeline()` which controls keep-alive configurations. Keep-alive is enabled by default.
- Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/rest/api/storageservices/version-2018-11-09).
- The `ShareURL.getStatistics()` now returns the approximate size in bytes with `shareUsageBytes`.
- Added `DirectoryURL.listHandlesSegment()` and `FileURL.listHandlesSegment()` to returns a list of open handles on a directory or a file.
- Added `DirectoryURL.forceCloseHandlesSegment()`, `FileURL.forceCloseHandlesSegment()`, `DirectoryURL.forceCloseHandle()` and `FileURL.forceCloseHandle()` to close handles.
- Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/rest/api/storageservices/version-2018-11-09).

## 10.1.0 (2019-01-01)

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

## 10.0.0-preview (2018-12-01)

- Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
