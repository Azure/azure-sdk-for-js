# Changelog

2019.08

- [Breaking] Aborter class is no longer exposed from the package. You are expected to use
the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.

2019.07 Version 12.0.0-preview.1

- [Breaking] Client types are renamed from *URL to *Client.
  - QueueURL, MessagesURL, MessageIdURL, ServiceURL, StorageURL to QueueClient, MessagesClient, MessageIdClient, QueueServiceClient, StorageClient respectively.
- [Breaking] Aborter parameters are now moved into option bags.
  - `abortSignal` attrubute(optional) in the option-bag of respective module has to be utitlized for the `Aborter.timeout(<milliseconds>)` functionality.
  - `Aborter.none` is the default value.
- [Breaking] I- prefixes are removed from interface names
  - Example- `IQueueCreateOptions` is updated to `QueueCreateOptions`, the new names must to be used.
- [Breaking] The static methods to create client types are removed. The functionality is moved into new instance methods added to the parent clients.
- [Breaking] The telemetry strings have been updated.
  - `Azure-Storage/${SDK_VERSION}` is updated to `azsdk-js-storagequeue/${SDK_VERSION}`.
- [Breaking] withPipeline method is removed.
- Async iterators with pagination support are added for listing queues `listQueues()`
  - Please refer to the samples for async iterators in the `samples` folder.
- [Breaking] Methods that list segments(`listQueuesSegment()`) is no longer exposed in public api.
- [Breaking] `StorageClient` is no longer exposed. `StorageClient.newPipeline()` static method is moved to the top level exported function `newPipeline()`.
- [Breaking] `TokenCredential` has been renamed to `RawTokenCredential` to make way for the new `@azure/identity` library's `TokenCredential` interface.
- [Breaking] The type of the `include` field of both `ServiceListQueuesOptions` and `ServiceListQueuesSegmentOptions` has changed from `ListQueuesIncludeType` to `ListQueuesIncludeType[]` due to changes in the underlying OpenAPI specification.
- [Breaking] Blob/Container member methods that manage leases are removed. A new type `LeaseClient` is added to manage leases.
- Updated dependency `@azure/ms-rest-js` to `@azure/core-http`.
- Constructor overloads added into client types so they can be constructed from a url and a pipeline/credential and connection string.
  - Constructors with overloads - `MessageIdClient`, `MessagesClient`, `QueueClient` and `QueueServiceClient`.
  - Connection string method is supported only in Node.js (not browsers).
- Creation/Deletion of child resources are duplicated to parent client type.
- HTTP proxy support is added (Node.js only).
  - Please refer to the `proxyAuth.ts` sample in the `samples/typescript` folder.
- Request and response headers are now logged at INFO level, with sensitive data redacted.

For release notes and more information please visit https://aka.ms/azure-sdk-preview1-js

2019.1 Version 10.1.0

- [Breaking] Updated convenience layer methods enum type parameters into typescript union types, this will help to reduce bundle footprint.
- [Breaking] `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
- [Breaking] IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
- Updated dependency `ms-rest-js` to `@azure/ms-rest-js`.
- Updated server timeout value for retry options `tryTimeoutInMs` to 30 seconds.
- Fixed `Aborter.timeout()` misleading scale description.
- Fixed an issue that enqueue/dequeue/peek fail to work with some utf8 characters.
- Exported HttpRequestBody type for who wants to implement a customized HTTP client.

  2018.12 Version 10.0.0-preview

- Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
