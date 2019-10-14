# Breaking Changes

### 2019.10 12.0.0-preview.5

- `IPRange` is renamed to `SasIPRange`.

### 2019.10 Version 12.0.0-preview.3

- `RawTokenCredential` is dropped. TokenCredential implementations can be found in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library for authentication.
- `Models.StorageServiceProperties` is renamed into `Models.QueueServiceProperties`.
- `Models.StorageServiceStats` is renamed into `Models.QueueServiceStatistics`.
- Replace string with boolean flag to specify dataset to include when listing queues.
  Before this change the option is specified as
  ```js
  queueServiceClient.listShares({
    include: "metadata"
  });
  ```
  After this change:
  ```js
  queueServiceClient.listShares({
    includeMetadata: true
  });
  ```

### 2019.08 Version 12.0.0-preview.2

- Aborter class is no longer exposed from the package. Use the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.
  `AbortController.timeout(<milliseconds>)` can be utitlized as an abort signal.

### 2019.07 Version 12.0.0-preview.1

- Client types are renamed from *URL to *Client.
  - QueueURL, MessagesURL, MessageIdURL, ServiceURL, StorageURL to QueueClient, MessagesClient, MessageIdClient, QueueServiceClient, StorageClient respectively.
- Aborter parameters are now moved into option bags.
  - `abortSignal` attrubute(optional) in the option-bag of respective module has to be utitlized for the `Aborter.timeout(<milliseconds>)` functionality.
  - `Aborter.none` is the default value.
- I- prefixes are removed from interface names
  - Example- `IQueueCreateOptions` is updated to `QueueCreateOptions`, the new names must to be used.
- The static methods to create client types are removed. The functionality is moved into new instance methods added to the parent clients.
- The telemetry strings have been updated.
  - `Azure-Storage/${SDK_VERSION}` is updated to `azsdk-js-storagequeue/${SDK_VERSION}`.
- withPipeline method is removed.
- Methods that list segments(`listQueuesSegment()`) is no longer exposed in public api.
- `StorageClient` is no longer exposed. `StorageClient.newPipeline()` static method is moved to the top level exported function `newPipeline()`.
- The type of the `include` field of both `ServiceListQueuesOptions` and `ServiceListQueuesSegmentOptions` has changed from `ListQueuesIncludeType` to `ListQueuesIncludeType[]` due to changes in the underlying OpenAPI specification.
- `TokenCredential` has been renamed to `RawTokenCredential` to make way for the new `@azure/identity` library's `TokenCredential` interface.
- Blob/Container member methods that manage leases are removed. A new type `LeaseClient` is added to manage leases.

### 2019.1 Version 10.1.0

- Updated convenience layer methods enum type parameters into typescript union types, this will help to reduce bundle footprint.
- `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
- IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
