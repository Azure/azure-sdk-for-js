# Breaking Changes

## 2019.11 12.0.0

- [Breaking] The custom browser and retry policies that are specific to the Storage libraries have been
  renamed to have the `Storage` prefix. [PR 5862](https://github.com/Azure/azure-sdk-for-js/pull/5862).
  Below are the entities that now have the Storage prefix
  - BrowserPolicy
  - BrowserPolicyFactory
  - RetryPolicy
  - RetryPolicyType
  - RetryOptions
  - RetryPolicyFactory
- [Breaking] The interface `NewPipelineOptions` has been renamed to `StoragePipelineOptions` and its
  properties have been updated as below: - The `proxy` property of type `ProxySettings | string` has been renamed to `proxyOptions` and
  will be of type `ProxyOptions`. If you have been passing url directly, split the value into `host`
  and `port` then pass it as a json object. - The `telemetry` property of type `TelemetryOptions` has been renamed to `userAgentOptions` of
  type `UserAgentOptions`. - The `logger` is no longer a property available to configure. To enable logging, please see the
  [Troubleshooting](https://github.com/Azure/azure-sdk-for-js/blob/0ddc2f3c3d4658b20d96910acc37a77e5209e5e3/sdk/storage/storage-queue/README.md#troubleshooting) section of our readme.
- [Breaking]
  - The `UniqueRequestIdPolicy` and `KeepAlivePolicy` are no longer exported from this library. The
    corresponding policies from the `@azure/core-http` library are meant to be used instead.
- [Breaking] The default browser bundle has been removed from the npm package. Bundling your application with a bundler such as Webpack is the recommended approach to building a browser bundle. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## 2019.10 12.0.0-preview.5

- [Breaking] Major API changes for the `@azure/storage-queue` package.
  - Flattened Client Hierarchy - `QueueClient` is flattened into `QueueServiceClient`, `MesagesClient` is renamed to `QueueClient`, `MessageIdClient` is flattened into the new `QueueClient`. [PR #5579](https://github.com/Azure/azure-sdk-for-js/pull/5579)
    - `enqueueMessage` is renamed as `sendMessage`, `dequeueMessages` is renamed to `receiveMessages`
    - The new `QueueServiceClient` has `createQueue` and `deleteQueue` helper methods.
    - Names of `Options` and `Responses` as per the new hierarchy of clients. [PR #5617](https://github.com/Azure/azure-sdk-for-js/pull/5617)
      - Example - `MessagesClearOptions` is renamed to `QueueClearMessagesOptions`, `MessagesEnqueueResponse` is renamed to `QueueSendMessageResponse`.
    - `DequeuedMessageItem` is renamed to `ReceivedMessageItem` [PR #5661](https://github.com/Azure/azure-sdk-for-js/pull/5661)
- [Breaking] `IPRange` is renamed to `SasIPRange`. [PR #5551](https://github.com/Azure/azure-sdk-for-js/pull/5551)
- [Breaking] `Models` is no longer exported in public API surface. Instead generated model types required by the public API are explicitly re-exported and aliased with `Model` suffix.
  For example, after this change, `Models.QueueItem` becomes `QueueItemModel`. [PR #5534](https://github.com/Azure/azure-sdk-for-js/pull/5534)
- [Breaking] Cancelling an operation now throws a standardized error with the name `AbortError`. [PR #5633](https://github.com/Azure/azure-sdk-for-js/pull/5663)
- [Breaking] `queueName` on `QueueClient` is renamed to `name`. [PR #5613](https://github.com/Azure/azure-sdk-for-js/pull/5613)
- [Breaking] `body` field from `RestError` Object in core-http Library is removed, the `response` property on the error will now have the `parsedBody` & `headers` along with raw body & headers that are already present. PRs [#5670](https://github.com/Azure/azure-sdk-for-js/pull/5670), [#5437](https://github.com/Azure/azure-sdk-for-js/pull/5437)
  - Errors from the storage service can be seen in an extra field `details` with the expected error code. [#5688](https://github.com/Azure/azure-sdk-for-js/pull/5688)
- [Breaking] Type of the `permissions` attribute in the options bag `FileSASSignatureValues` to be passed into `generateQueueSASQueryParameters` is changed to `QueueSASPermissions` from type `string`. [PR #5626](https://github.com/Azure/azure-sdk-for-js/pull/5626)
  - Similarly, `AccountSASPermissions` for `generateAccountSASQueryParameters` instead of type `string`.
  - Example - permissions attribute in `generateQueueSASQueryParameters`
    - `permissions: QueueSASPermissions.parse("racwd").toString()` changes to `QueueSASPermissions.parse("racwd")`
- [Breaking] Appropriate attribute renames in all the interfaces [PR #5629](https://github.com/Azure/azure-sdk-for-js/pull/5629)
  - Example - `nextMarker` -> `continuationToken`, `HTTPClient` -> `HttpClient`, `permission` -> `permissions`
- [Breaking] IE11 needs `Object.assign` polyfill loaded. [PR #5727](https://github.com/Azure/azure-sdk-for-js/pull/5727)

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
