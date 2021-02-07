# Release History

## 12.4.1 (2021-02-03)

- Fixed a compile failure due to "Can't resolve 'crypto'" in Angular. [Issue #13267](https://github.com/Azure/azure-sdk-for-js/issues/13267).
- Fixed an issue that the download stream returned by `BlobClient.download` won't release underlying resources unless it's fully consumed. [Isssue #11850](https://github.com/Azure/azure-sdk-for-js/issues/11850).
- Fixed an error when listing blob with a metadata key of `_` [issue #9197](https://github.com/Azure/azure-sdk-for-js/issues/9171)
- The `"Unclosed root tag"` XML parser error is now retriable. [PR #13076](https://github.com/Azure/azure-sdk-for-js/pull/13076).

## 12.4.0 (2021-01-12)

- Added a new `from(permissionLike)` function to `AccountSASPermissions`, `BlobSASPermissions` and `ContainerSASPermissions` for creating such a permission from a raw permission-like object. Addressed issue [9714](https://github.com/Azure/azure-sdk-for-js/issues/9714).

## 12.4.0-beta.1 (2020-12-09)

- Updated Azure Storage Service API version to 2020-04-08.
- Added a new interface `BlockBlobClient.syncUploadFromURL()` to support creating a new Block Blob where the contents of the blob are read from a given URL.
- Blob Tags updates: `BlobClient.setTags()` and `BlobClient.getTags()` now support the `LeaseAccessConditions` and `BlobServiceClient.findBlobsByTags()` will return all matching tags for each blob.
- Added `generateSasUrl` to `BlobClient` and `ContainerClient` to generate a service-level SAS URI for the client.
- Added `generateAccountSasUrl` to `BlobServiceClient` to generate an account-level SAS URI for the client.
- Fixed a bug where the `credential` property of the `StorageClient` is not set correctly when using a Token credential. Fixed bug [12219](https://github.com/Azure/azure-sdk-for-js/issues/12219).
- Blob Batch operations now reorder the subresponses in the client side to perserve the original input order. See `BlobBatchClient.submitBatch()` and [12335](https://github.com/Azure/azure-sdk-for-js/issues/12335).
- Won't remove the first space in the `userAgentOptions.userAgentPrefix` passed to the `newPipeline()` now. Fixed bug [7536](https://github.com/Azure/azure-sdk-for-js/issues/7536).
- Added `isHierarchicalNamespaceEnabled` to the response of `BlobServiceClient.getAccountInfo()`.

## 12.3.0 (2020-11-10)

- Added `BlockBlobClient.uploadData(data: Buffer | Blob | ArrayBuffer | ArrayBufferView, options)` for parallel uploading. It's avaiable in both Node.js and browsers.
- Added new SAS permissions Move(m) and Execute(e) for Blob and Container. Also supports specifying an authorized object ID via `saoid` and a correlation ID via `scid` for user delegation SAS.

## 12.3.0-beta.1 (2020-10-13)

- Updated Azure Storage Service API version to 2020-02-10.
- Added support for Blob Last Access Time tracking.
- Added support for Blob Query Arrow output format.
- Added support for Container Soft Delete.

## 12.2.1 (2020-09-17)

- Bug fix - Fixes an issue where`BlockBlobClient.uploadStream()` will give an "Invalid Verb" error when keep-alive is enabled. Fixed bug [11187](https://github.com/Azure/azure-sdk-for-js/issues/11187).

## 12.2.0 (2020-09-08)

- Added RehydratePriority to BlobProperties and BlobItemProperties.
- Fixed `BlockBlobClient.uploadStream()` to support `bufferSize` larger than `buffer.constants.MAX_LENGTH`.
- Added support for Object Replication Service.
- Added custom domain support.
- Supported Append Blob Seal.
- Supported tags conditional operations.
- The Static Website Service now supports a DefaultIndexDocumentPath for a global HTTP 200 route within the static website. You can get it by `BlobServiceClient.getProperties()` and set it via `blobServiceClient.setProperties()`.
- Bug fix - `credential` parameter of `newPipeline()` function is now optional. If not specified, `AnonymousCredential` is used. Fixes bug [9628](https://github.com/Azure/azure-sdk-for-js/issues/9628).
- Bug fix - high level upload functions `BlockBlobClient.uploadFile()`, `BlockBlobClient.uploadStream()` and `BlockBlobClient.uploadBrowserData()` now support setting tier. Fixes bug [9062](https://github.com/Azure/azure-sdk-for-js/issues/9062).
- Optimized error semantic for `listBlobsByHierarchy()`. Using `listBlobsByHierarchy()` with empty `delimiter` will now fail-fast.
- Bug fix - Content-Length header is no more ignored. Fixes bugs [8903](https://github.com/Azure/azure-sdk-for-js/issues/8903), [9300](https://github.com/Azure/azure-sdk-for-js/issues/9300) and [10614](https://github.com/Azure/azure-sdk-for-js/issues/10614).

## 12.2.0-preview.1 (2020.07)

- Updated Azure Storage Service API version to 2019-12-12.
- Supported quick query. Added a new API `BlockBlobClient.query()`.
- Supported blob versioning.
- Supported blob tags.
- Increased the maximum block size for Block Blob from 100MiB to 4000MiB(~4GB). And thereby supporting ~200TB maximum size for Block Blob.
- Added convenience method `createIfNotExists` for `ContainerClient`, `AppendBlobClient` and `PageBlobClient`.
- Added convenience method `deleteIfExists` for `ContainerClient` and `BlobClients`.

## 12.1.2 (2020.05)

- Fix data corruption failure error [issue #6411](https://github.com/Azure/azure-sdk-for-js/issues/6411) when downloading compressed files. [PR #7993](https://github.com/Azure/azure-sdk-for-js/pull/7993)
- Fix un-handled TypeError [issue #8499](https://github.com/Azure/azure-sdk-for-js/issues/8499) in Electron applications. [PR #8568](https://github.com/Azure/azure-sdk-for-js/pull/8568)
- Updated to use `@opentelemetry/api` 0.6.1 via `@azure/core-tracing`. [PR #7998](https://github.com/Azure/azure-sdk-for-js/pull/7998)
- Updated to use `typescript` 3.8.3. [PR #8659](https://github.com/Azure/azure-sdk-for-js/pull/8659)

## 12.1.1 (2020.03)

- Bug fix - Blob SAS's `sr` field is now properly set when generating SAS for a blob using a stored policy with `signedpermissions`. For more details about Service SAS, please refer to [link](https://docs.microsoft.com/rest/api/storageservices/create-service-sas).
- Fixed unexpected hang issue when uploading empty body. Fixed bug [6904](https://github.com/Azure/azure-sdk-for-js/issues/6904).

## 12.1.0 (2020.02)

- Updated Azure Storage Service API version to 2019-07-07.
- Add support for Encryption Scope, which is similar to regular CPK, except the encryption key is provided by name.
- MD5 and CRC headers for Blob Copy: add `contentMD5`and `xMsContentCrc64` to `BlobCopyFromURLHeaders` and `sourceContentMD5` to `BlobSyncCopyFromURLOptions`.
- Add `getPageRangesDiffForManagedDisks` to `PageBlobClient`.
- Fixed a bug where the package didn't work as expected when bundling web applications. [PR #7298](https://github.com/Azure/azure-sdk-for-js/pull/7298)

## 12.0.2 (2020.01)

- Bug fix - Name properties on clients now support more kinds of endpoints(IPv4/v6 hosts, single word domains). [PR #6753](https://github.com/Azure/azure-sdk-for-js/pull/6753)
- Service clients now share a single http client instance by default. [PR #6657](https://github.com/Azure/azure-sdk-for-js/pull/6657)

  Previously, a new http client was created for each service client if none was provided by the user. This could result in TCP port exhaustion under heavy usage with the keepAlive option enabled because each http client has its own persistent TCP connection. This change creates a single http client instance which is shared among all service clients by default.

## 12.0.1 (2019-12-04)

- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`
- Bug Fix - Convert empty prefixes (`""`) to `undefined` when passed as options to the `listContainers`, `listBlobsFlat`, and `listBlobsByHierarchy` methods to avoid sending an invalid request to the service. Fixes bug [5817](https://github.com/Azure/azure-sdk-for-js/issues/5817).
- Added a warning to the documentation of `downloadToBuffer` that explains the limitations of Node.js `Buffer` sizes to around 2GB on 64-bit architectures and 1GB on 32-bit architectures.
- Documented the behavior of `getProperties` methods with respect to metadata keys and their casing inconsistency when compared to the metadata keys returned through corresponding "list" methods with the `includeMetadata` option.

## 12.0.0 (2019.11)

- This release marks the general availability of the `@azure/storage-blob` package.
- Bug Fix - Previous versions of `@azure/storage-blob` preview library failed for React apps because of the usage of `fs.stat` method which is not available in browsers and due to the presence of some circular dependencies. Both of these issues are fixed in this new release.
- [Breaking] The custom browser and retry policies that are specific to the Storage libraries have been
  renamed to have the `Storage` prefix. [PR 5862](https://github.com/Azure/azure-sdk-for-js/pull/5862).
  Below are the entities that now have the Storage prefix
  - BrowserPolicy
  - BrowserPolicyFactory
  - RetryPolicy
  - RetryPolicyType
  - RetryOptions
  - RetryPolicyFactory
- [Breaking] `LeaseClient` is renamed to `BlobLeaseClient`. The helper method `getLeaseClient` on both `BlobClient` and `ContainerClient` is renamed to `getBlobLeaseClient`.
- [Breaking] The properties in the `StoragePipelineOptions` interface have been updated as below:
  - The `proxy` property of type `ProxySettings | string` has been renamed to `proxyOptions` and
    will be of type `ProxyOptions`. If you have been passing url directly, split the value into `host`
    and `port` then pass it as a json object.
  - The `telemetry` property of type `TelemetryOptions` has been renamed to `userAgentOptions` of
    type `UserAgentOptions`.
  - The `logger` is no longer a property available to configure. To enable logging, please see the
    [Troubleshooting](https://github.com/Azure/azure-sdk-for-js/blob/0ddc2f3c3d4658b20d96910acc37a77e5209e5e3/sdk/storage/storage-blob/README.md#troubleshooting) section of our readme.
  - The `UniqueRequestIdPolicy` and `KeepAlivePolicy` are no longer exported from this library. The
    corresponding policies from the `@azure/core-http` library are meant to be used instead.
- `beginCopyFromURL` is added to the `BlobClient`, it returns a poller that can be used to watch the status of a copy operation. It also supports cancelling a pending copy.
- Updates to `BlockBlobClient.uploadStream`
  - [Breaking] `maxBuffers` attribute of is renamed to `maxConcurrency`
  - Added default values for parameters, bufferSize = `8MB` and maxConcurrency = `5`
- [Breaking] Bug Fix - The page object returned from `ContainerClient.listContainers` had its `containerItems` property set to an empty string instead of an empty array if the storage account has no blob containers. The issue is fixed in this new release.
- `BlobClient.downloadToBuffer()` helper method has a new overload where it is not required to pass the `Buffer`. Attributes `offset` and `count` are optional, downloads the entire blob if they are not provided.
- [Breaking] The default browser bundle has been removed from the npm package. Bundling your application with a bundler such as Webpack is the recommended approach to building a browser bundle. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## 12.0.0-preview.5 (2019.10)

- [Breaking] `IPRange` is renamed to `SasIPRange`. [PR #5551](https://github.com/Azure/azure-sdk-for-js/pull/5551)
- Created new interface `CommonOptions`. This interface is for standard options that apply to all methods that invoke remote operations. This interface currently contains options that enable client-side tracing of the SDK. [PR #5550](https://github.com/Azure/azure-sdk-for-js/pull/5550)
- [Breaking] `Models` is no longer exported in public API surface. Instead generated model types required by the public API are explicitly re-exported. In the case where convenience layer already defined a type with conflicting name, the model type is aliased with `Model` suffix. [PR #5567](https://github.com/Azure/azure-sdk-for-js/pull/5567)
- [Breaking] Cancelling an operation now throws a standardized error with the name `AbortError`. [PR #5633](https://github.com/Azure/azure-sdk-for-js/pull/5663)
- [Breaking] `blobName` on `AppendBlobClient`, `BlobClient`, `BlockBlobClient` and `PageBlobClient` is renamed to `name`. [PR #5613](https://github.com/Azure/azure-sdk-for-js/pull/5613)
- [Breaking] New `BlobBatchClient` allowing batched requests to the Azure Storage Blob service. [PR #5634](https://github.com/Azure/azure-sdk-for-js/pull/5634)
  - Renamed `BatchRequest` to `BlobBatch`, flattened `BatchDeleteRequest` and `BatchSetTierRequest` into `BlobBatch`
  - Moved `submitBatch` code from `BlobServiceClient` into new `BlobBatchClient`, created new `deleteBlobs` and `setBlobsAccessTier` helpers on `BlobBatchClient`
    `BlobBatchClient` contains `setBlobsAccessTier`, `submitBatch` and `deleteBlobs` helper methods. `BlobBatch` represents an aggregated set of operations on blobs, `delete` and `setAccessTier` functionalities are supported currently.
- [Breaking] Flattened the conditions type `BlobRequestConditions` instead of current nested one. It replaces `ContainerAccessConditions` and `BlobAccessConditions`.
  In addition, various conditions fields are renamed into simply `conditions` except `sourceModifiedAccessConditions` which is renamed to `sourceConditions`.
  This makes it more convenient to pass in conditional request options. [PR #5672](https://github.com/Azure/azure-sdk-for-js/pull/5672).

  An example:

  ```js
  {
    blobAccessConditions: {
      modifiedAccessConditions: {
        ifMatch: uploadResponse.eTag
    }
  }
  ```

  turns into

  ```js
  {
    conditions: {
      ifMatch: uploadResponse.eTag
  }
  ```

- [Breaking] `eTag` attribute is renamed to `etag`. [PR #5674](https://github.com/Azure/azure-sdk-for-js/pull/5674)
- [Breaking] `body` field from `RestError` Object in core-http Library is removed, the `response` property on the error will now have the `parsedBody` & `headers` along with raw body & headers that are already present. PRs [#5670](https://github.com/Azure/azure-sdk-for-js/pull/5670), [#5437](https://github.com/Azure/azure-sdk-for-js/pull/5437)
  - Errors from the storage service can be seen in an extra field `details` with the expected error code. [#5688](https://github.com/Azure/azure-sdk-for-js/pull/5688)
- [Breaking] `progress` callback in the option bags of all the helper methods is renamed to `onProgress`. [PR #5676](https://github.com/Azure/azure-sdk-for-js/pull/5676)
- [Breaking] Consolidated `PageRange` and `ClearRange` types. They now have `offset` and `count` attributes as opposed to the older `start` and `end` attributes.
  [PR #5632](https://github.com/Azure/azure-sdk-for-js/pull/5632)
- [Breaking] Type of the `permissions` attribute in the options bag `BlobSASSignatureValues` to be passed into `generateBlobSASQueryParameters` is changed to `BlobSASPermissions` from type `string`. [PR #5626](https://github.com/Azure/azure-sdk-for-js/pull/5626)
  - Similarly, `AccountSASPermissions` for `generateAccountSASQueryParameters` instead of type `string`.
  - Example - permissions attribute in `generateBlobSASQueryParameters`
    - `permissions: BlobSASPermissions.parse("racwd").toString()` changes to `BlobSASPermissions.parse("racwd")`
- Renames for following Options interfaces. [PR #5650](https://github.com/Azure/azure-sdk-for-js/pull/5650)
  - `DownloadFromBlobOptions` -> `BlobDownloadToBufferOptions`,
  - `UploadStreamToBlockBlobOptions` -> `BlockBlobUploadStreamOptions`,
  - `UploadToBlockBlobOptions` -> `BlockBlobParallelUploadOptions`
- [Breaking] Appropriate attribute renames in all the interfaces. PRs [#5580](https://github.com/Azure/azure-sdk-for-js/pull/5580),[#5630](https://github.com/Azure/azure-sdk-for-js/pull/5630)
  - Example - `nextMarker` -> `continuationToken`, `HTTPClient` -> `HttpClient`, `permission` -> `permissions`, `parallelism` -> `concurrency`
- Bug fix - Name properties on clients now support the Emulator. [PR #5557](https://github.com/Azure/azure-sdk-for-js/pull/5557)
  - emulator url when the blobEndpoint is `http://127.0.0.1:10000/devstoreaccount1` supported
  - emulator connection string shorthands are supported
    - `UseDevelopmentStorage=true`
    - (with proxyURI) `UseDevelopmentStorage=true;DevelopmentStorageProxyUri=proxyURI`
- [Breaking] `encrypted` attribute is removed from `BlobMetadata` interface. [PR #5612](https://github.com/Azure/azure-sdk-for-js/pull/5612)
- [Breaking] Return type of `downloadToBuffer` helper method on `BlobClient` is changed to `Promise<Buffer>` from `Promise<void>` [PR #5624](https://github.com/Azure/azure-sdk-for-js/pull/5624)
- [Breaking] IE11 needs `Object.assign` polyfill loaded. [PR #5727](https://github.com/Azure/azure-sdk-for-js/pull/5727)

## 12.0.0-preview.4 (2019.10)

- [Breaking] Replace string array with boolean flags to specify dataset to include when listing containers or blobs.
  - For listing containers
    Before this change the option is specified as
    ```js
    blobServiceClient.listContainers({
      include: "metadata"
    });
    ```
    After this change:
    ```js
    blobServiceClient.listContainers({
      includeMetadata: true
    });
    ```
  - For listing blobs
    Before this change the option is specified as
    ```js
    containerClient.listBlobsFlat({
      include: ["snapshots", "metadata", "uncommittedblobs", "copy", "deleted"]
    });
    ```
    After this change:
    ```js
    containerClient.listBlobsFlat({
      includeCopy: true,
      includeDeleted: true,
      includeMetadata: true,
      includeSnapshots: true,
      includeUncommitedBlobs: true
    });
    ```
- [Breaking] `BlobClient.setTier()` is renamed to `BlobClient.setAccessTier()`.
- [Breaking] Fixed typo - `chanageLease` -> `changeLease`, a method on `LeaseClient`.
- Library tries to load the proxy settings from the environment variables like HTTP_PROXY if the proxy settings are not provided when clients like `BlobServiceClient` or `BlobClient` are instantiated.
- Added development connection string support to connect to the storage emulator [Azurite - Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Azurite.azurite)
  - Development Connection String
    - `DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;`
  - Shorthand notation is also supported
    - `UseDevelopmentStorage=true` (or `UseDevelopmentStorage=true;DevelopmentStorageProxyUri=http://myProxyUri`)
- Added name properties on all the clients for convenience.
  - `accountName` is added to `AppendBlobClient`, `BlobClient`, `BlobServiceClient`, `BlockBlobClient`, `ContainerClient` and `PageBlobClient`.
  - `containerName` is added to `AppendBlobClient`, `BlobClient`, `BlockBlobClient`, `ContainerClient` and `PageBlobClient`.
  - `blobName` is added to `AppendBlobClient`, `BlobClient`, `BlockBlobClient` and `PageBlobClient`.
- [Breaking] `Models.StorageServiceProperties` is renamed to `Models.BlobServiceProperties`
- [Breaking] `Models.StorageServiceStats` is renamed to `Models.BlobServiceStatistics`
- [Breaking] `UserDelegationKey.signedOid` is renamed to `UserDelegationKey.signedObjectId`. `UserDelegationKey.signedTid` is renamed to `UserDelegationKey.signedTenantId`.

## 12.0.0-preview.3 (2019.09)

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
- Basic HTTP proxy authentication support is added. Proxy settings can be passed in the options while creating a new client. Example - [typescript/proxyAuth.ts](https://github.com/Azure/azure-sdk-for-js/blob/@azure/storage-blob_12.0.0-preview.3/sdk/storage/storage-blob/samples/typescript/proxyAuth.ts)
- Connection strings for explicit storage endpoints are supported. - [Configure Azure Storage connection strings](https://docs.microsoft.com/azure/storage/common/storage-configure-connection-string#create-a-connection-string-for-an-explicit-storage-endpoint)

## 12.0.0-preview.2 (2019.08)

- [Breaking] Aborter class is no longer exposed from the package. Use the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.
  `AbortController.timeout(<milliseconds>)` can be utitlized as an abort signal.
- Generalized the credential parameter in client constructors to support `{SharedKeyCredential | AnonymousCredential | TokenCredential}` credentials as a union type.
- Storage service allows SAS connection string with SAS string and endpoints along with the Account connection string(account name, key and endpoint).
  In this preview, SAS connection string support is added to the existing connection string client constructors and static methods.
  - Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
  - SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
  - SAS connection string is supported in both NodeJS and browser runtimes unlike the Account Connection String which is supported only in the NodeJS runtime.

## 12.0.0-preview.1 (2019.07)

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

For release notes and more information please visit https://aka.ms/azsdk/releases/july2019preview

## 10.5.0 (2019.09)

- Updated Azure Storage Service API version to 2019-02-02.
- A new API `ServiceURL.submitBatch()` supports Blob Batch operation which allows multiple requests to be sent within a single request body.
- Added support for customer provided encryption key.
- Added support for rehydrate priority with additional option to methods `BlobURL.startCopyFromURL()` and `BlobURL.setTier()`.
- APIs `BlobURL.startCopyFromURL()`, `BlockBlobURL.upload()`, `BlockBlobURL.commitBlockList()` and `PageBlobURL.create()` now support set the blob tier within the API call.
- Responses for all APIs now return x-ms-client-request-id through `clientRequestId` that was passed in on the request from client-side.
- Exposed options to accept CRC64 as a transactional data integrity mechanism for data transfer APIs.

## 10.4.1 (2019.08)

- Added overloads of `generateBlobSASQueryParameters` functions to generate user delegation SAS.
- `expiry` and `start` in `AccessPolicy` are now optional in `ContainerURL.setAccessPolicy` and `ContainerURL.getAccessPolicy`.

## 10.4.0 (2019.07)

- Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/rest/api/storageservices/version-2018-11-09).
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

## 10.3.0 (2018.12)

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

## 10.2.0-preview (2018.11)

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

## 10.1.0-preview (2018.09)

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

## 10.0.0-preview (2018.09)

- Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
