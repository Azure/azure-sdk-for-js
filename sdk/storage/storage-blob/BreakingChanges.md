# Breaking Changes

## 2019.11 12.0.0

- The custom browser and retry policies that are specific to the Storage libraries have been
  renamed to have the `Storage` prefix. [PR 5862](https://github.com/Azure/azure-sdk-for-js/pull/5862).
  Below are the entities that now have the Storage prefix
  - BrowserPolicy
  - BrowserPolicyFactory
  - RetryPolicy
  - RetryPolicyType
  - RetryOptions
  - RetryPolicyFactory
- `LeaseClient` is renamed to `BlobLeaseClient`. The helper method `getLeaseClient` on both `BlobClient` and `ContainerClient` is renamed to `getBlobLeaseClient`.
- The properties in the StoragePipelineOptions interface have been updated as below
  - The `proxy` property of type `ProxySettings | string` has been renamed to `proxyOptions` and
    will be of type `ProxyOptions`. If you have been passing url directly, split the value into `host`
    and `port` then pass it as a json object.
  - The `telemetry` property of type `TelemetryOptions` has been renamed to `userAgentOptions` of
    type `UserAgentOptions`.
  - The `logger` is no longer a property available to configure. To enable logging, please see the
    [Troubleshooting](https://github.com/Azure/azure-sdk-for-js/blob/0ddc2f3c3d4658b20d96910acc37a77e5209e5e3/sdk/storage/storage-blob/README.md#troubleshooting) section of our readme.
  - The `UniqueRequestIdPolicy` and `KeepAlivePolicy` are no longer exported from this library. The
    corresponding policies from the `@azure/core-http` library are meant to be used instead.
- Updates to `BlockBlobClient.uploadStream`
  - `maxBuffers` attribute of is renamed to `maxConcurrency`
- Bug Fix - The page object returned from `ContainerClient.listContainers` had its `containerItems` property set to an empty string instead of an empty array if the storage account has no blob containers. The issue is fixed in this new release.
- The default browser bundle has been removed from the npm package. Bundling your application with a bundler such as Webpack is the recommended approach to building a browser bundle. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## 2019.10 12.0.0-preview.5

- [Breaking] `IPRange` is renamed to `SasIPRange`. [PR #5551](https://github.com/Azure/azure-sdk-for-js/pull/5551)
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
- [Breaking] Appropriate attribute renames in all the interfaces. PRs [#5580](https://github.com/Azure/azure-sdk-for-js/pull/5580),[#5630](https://github.com/Azure/azure-sdk-for-js/pull/5630)
  - Example - `nextMarker` -> `continuationToken`, `HTTPClient` -> `HttpClient`, `permission` -> `permissions`, `parallelism` -> `concurrency`
- [Breaking] `encrypted` attribute is removed from `BlobMetadata` interface. [PR #5612](https://github.com/Azure/azure-sdk-for-js/pull/5612)
- [Breaking] Return type of `downloadToBuffer` helper method on `BlobClient` is changed to `Promise<Buffer>` from `Promise<void>` [PR #5624](https://github.com/Azure/azure-sdk-for-js/pull/5624)
- [Breaking] IE11 needs `Object.assign` polyfill loaded. [PR #5727](https://github.com/Azure/azure-sdk-for-js/pull/5727)

### 2019.10 Version 12.0.0-preview.4

- Replace string array with boolean flags to specify dataset to include when list containers or blobs.
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
- Fixed typo - `chanageLease` -> `changeLease`, a method on `LeaseClient`.
- `BlobClient.setTier()` is renamed to `BlobClient.setAccessTier()`.
- `Models.StorageServiceProperties` is renamed to `Models.BlobServiceProperties`
- `UserDelegationKey.signedOid` is renamed to `UserDelegationKey.signedObjectId`. `UserDelegationKey.signedTid` is renamed to `UserDelegationKey.signedTenantId`.

### 2019.09 Version 12.0.0-preview.3

- `RawTokenCredential` is dropped. TokenCredential implementations can be found in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library for authentication.

### 2019.08 Version 12.0.0-preview.2

- Aborter class is no longer exposed from the package. Use the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.
  `AbortController.timeout(<milliseconds>)` can be utitlized as an abort signal.

### 2019.07 Version 12.0.0-preview.1

- Client types are renamed from *URL to *Client.
  BlobURL, BlockBlobURL, ContainerURL, ServiceURL, StorageURL to BlobClient, BlockBlobClient, ContainerClient, BlobServiceClient, StorageClient respectively.
- Aborter parameters are now moved into option bags.
  - `abortSignal` attrubute(optional) in the option-bag of respective module has to be utitlized for the `Aborter.timeout(<milliseconds>)` functionality.
  - `Aborter.none` is the default value.
- I- prefixes are removed from interface names
  - Example- `IBlobDownloadOptions` is updated to `BlobDownloadOptions`, the new names must to be used.
- The static methods to create client types are removed. The functionality is moved into new instance methods added to the parent clients.
- The telemetry strings have been updated.
  - `Azure-Storage/${SDK_VERSION}` is updated to `azsdk-js-storagefile/${SDK_VERSION}`.
- withPipeline method is removed.
- Methods that list segments(`listBlobFlatSegment()` and `listContainersSegment()`) are no longer exposed in public api.
- High level convenience functions are moved into clients as their instance member function.
  - `uploadFileToBlockBlob()`, `uploadStreamToBlockBlob()` and `uploadBrowserDataToBlockBlob()` -> `BlockBlobClient.uploadFile()`, `BlockBlobClient.uploadStream()` and `BlockBlobClient.uploadBrowserData()` respectively
  - `downloadBlobToBuffer()` -> `BlobClient.downloadToBuffer()`
- `StorageClient` is no longer exposed. `StorageClient.newPipeline()` static method is moved to the top level exported function `newPipeline()`.
- `TokenCredential` has been renamed to `RawTokenCredential` to make way for the new `@azure/identity` library's `TokenCredential` interface.
- Blob/Container member methods that manage leases are removed. A new type `LeaseClient` is added to manage leases.

### 2018.12 10.3.0

- Updated convenience layer methods enum type parameters into typescript union types, this will help reducing bundle footprint.
- Updated URL encoding strategy for `url` parameters of `new XXXURL(url, pipeline)` methods, such as `new BlobURL(url, pipeline)`.
  - URL will accept both encoded or non-encoded URL string. It will escape non-escaped special characters, like Chinese characters. However, if blob name includes `?` or `%`, `url` must be encoded manually.
- `SASQueryParameters` is not going to be exported in browser bundle, and exported in Node.js runtime.
- IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.

### 2018.11 10.2.0-preview

- Updated names of exported interfaces `IHTTPPipelineLogger` & `IHTTPClient` to `IHttpPipelineLogger` & `IHttpClient`.
- For `setMetadata()` and `setHTTPHeaders()`, `metadata` and `blobHTTPHeaders` are moved from `options` into top level parameter list.

### 2018.09 10.1.0-preview

- `Aborter.None` is renamed to `Aborter.none` for JavaScript naming conventions.
- Dropped built-in polyfills for `String`, and following polyfills need to be loaded external for IE11 now:
  - `Promise`
  - `String.prototype.startsWith`
  - `String.prototype.endsWith`
  - `String.prototype.repeat`
  - `String.prototype.includes`
