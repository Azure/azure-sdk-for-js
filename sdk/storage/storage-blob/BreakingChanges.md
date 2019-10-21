# Breaking Changes

### 2019.11 12.0.0-preview.5

- `IPRange` is renamed to `SasIPRange`.

- `Models` is no longer exported in public API surface. Instead generated model types required by the public API are explicitly re-exported. In the case where convenience layer already defined a type with conflicting name, the model type is aliased with `Model` suffix.

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
