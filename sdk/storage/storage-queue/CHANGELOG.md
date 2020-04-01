# Release History

## 12.0.5 (Unreleased)


## 12.0.4 (2020.03)

- Buf fix - Fixed typings support for TypeScript 3.1. [PR #7350](https://github.com/Azure/azure-sdk-for-js/pull/7350)

## 12.0.3 (2020.02)

- Updated Azure Storage Service API version to 2019-07-07.

## 12.0.2 (2020.01)

- Bug fix - Name properties on clients now support more kinds of endpoints(IPv4/v6 hosts, single word domains). [PR #6694](https://github.com/Azure/azure-sdk-for-js/pull/6694)
- Service clients now share a single http client instance by default. [PR #6657](https://github.com/Azure/azure-sdk-for-js/pull/6657)

  Previously, a new http client was created for each service client if none was provided by the user. This could result in TCP port exhaustion under heavy usage with the keepAlive option enabled because each http client has its own persistent TCP connection. This change creates a single http client instance which is shared among all service clients by default.

## 12.0.1 (2019-12-04)

- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`
- Bug Fix - Convert empty prefixes (`""`) to `undefined` when passed as options to the `listQueues` method to avoid sending an invalid request to the service. Fixes bug [5817](https://github.com/Azure/azure-sdk-for-js/issues/5817).
- Documented the behavior of `getProperties` methods with respect to metadata keys and their casing inconsistency when compared to the metadata keys returned through corresponding "list" methods with the `includeMetadata` option.

## 12.0.0 (2019.11)

- This release marks the general availability of the `@azure/storage-queue` package.
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
  properties have been updated as below:
  - The `proxy` property of type `ProxySettings | string` has been renamed to `proxyOptions` and
    will be of type `ProxyOptions`. If you have been passing url directly, split the value into `host`
    and `port` then pass it as a json object.
  - The `telemetry` property of type `TelemetryOptions` has been renamed to `userAgentOptions` of
    type `UserAgentOptions`.
  - The `logger` is no longer a property available to configure. To enable logging, please see the
    [Troubleshooting](https://github.com/Azure/azure-sdk-for-js/blob/0ddc2f3c3d4658b20d96910acc37a77e5209e5e3/sdk/storage/storage-queue/README.md#troubleshooting) section of our readme.
- [Breaking]
  - The `UniqueRequestIdPolicy` and `KeepAlivePolicy` are no longer exported from this library. The
    corresponding policies from the `@azure/core-http` library are meant to be used instead.
- [Breaking] The default browser bundle has been removed from the npm package. Bundling your application with a bundler such as Webpack is the recommended approach to building a browser bundle. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## 12.0.0-preview.5 (2019.10)

- [Breaking] Major API changes for the `@azure/storage-queue` package.
  - Flattened Client Hierarchy - `QueueClient` is flattened into `QueueServiceClient`, `MesagesClient` is renamed to `QueueClient`, `MessageIdClient` is flattened into the new `QueueClient`. [PR #5579](https://github.com/Azure/azure-sdk-for-js/pull/5579)
    - `enqueueMessage` is renamed as `sendMessage`, `dequeueMessages` is renamed to `receiveMessages`
    - The new `QueueServiceClient` has `createQueue` and `deleteQueue` helper methods.
    - Names of `Options` and `Responses` as per the new hierarchy of clients. [PR #5617](https://github.com/Azure/azure-sdk-for-js/pull/5617)
      - Example - `MessagesClearOptions` is renamed to `QueueClearMessagesOptions`, `MessagesEnqueueResponse` is renamed to `QueueSendMessageResponse`.
    - `DequeuedMessageItem` is renamed to `ReceivedMessageItem` [PR #5661](https://github.com/Azure/azure-sdk-for-js/pull/5661)
- Created new interface `CommonOptions`. This interface is for standard options that apply to all methods that invoke remote operations. This interface currently contains options that enable client-side tracing of the SDK. [PR #5550](https://github.com/Azure/azure-sdk-for-js/pull/5550)
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
- Bug fix - Name properties on clients now support the Emulator. [PR #5557](https://github.com/Azure/azure-sdk-for-js/pull/5557)
  - emulator url when the queueEndpoint is `http://127.0.0.1:10001/devstoreaccount1` supported
  - emulator connection string shorthands are supported
    - `UseDevelopmentStorage=true`
    - (with proxyURI) `UseDevelopmentStorage=true;DevelopmentStorageProxyUri=proxyURI`
- [Breaking] IE11 needs `Object.assign` polyfill loaded. [PR #5727](https://github.com/Azure/azure-sdk-for-js/pull/5727)

## 12.0.0-preview.4 (2019.10)

- Library tries to load the proxy settings from the environment variables like HTTP_PROXY if the proxy settings are not provided when clients like `QueueServiceClient` or `QueueClient` are instantiated.
- Added development connection string support to connect to the storage emulator [Azurite - Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Azurite.azurite)
  - Development Connection String
    - `DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==; QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;`
  - Shorthand notation is also supported
    - `UseDevelopmentStorage=true` (or `UseDevelopmentStorage=true;DevelopmentStorageProxyUri=http://myProxyUri`)
- Added name properties on all the clients for convenience.
  - `accountName` is added to `MessageIdClient`, `MessagesClient`, `QueueClient` and `QueueServiceClient`.
  - `queueName` is added to `MessageIdClient`, `MessagesClient` and `QueueClient`.
  - `messageId` is added to `MessageIdClient`.
- [Breaking] `Models.StorageServiceProperties` is renamed to `Models.QueueServiceProperties`.
- [Breaking] `Models.StorageServiceStats` is renamed to `Models.QueueServiceStatistics`.
- [Breaking] Replace string with boolean flag to specify dataset to include when listing queues.
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

## 12.0.0-preview.3 (2019.08)

- [Breaking] `RawTokenCredential` is dropped. TokenCredential implementations can be found in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library for authentication.
- Updated Azure Storage Service API version to 2019-02-02.
- Responses for all APIs now return x-ms-client-request-id through `clientRequestId` that was passed in on the request from client-side.
- Fixed a bug that `Aborter` cannot work during retry interval.
- Fixed a bug that "err.code.toUpperCase is not a function" when retries in browser.
- Export `RetryPolicyType`.
- `Aborter` doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.
- Updated HTTP client from axios to node-fetch in Node.js runtime.
- A new option `keepAliveOptions` added to parameter of `newPipeline()` which controls keep-alive configurations. Keep-alive is enabled by default.
- Pass through `options.abortSignal` to the optional `abortSignal` attribute in option bags instead of using `AbortSignal.none` as the default value when `options.abortSignal` is not specified.
- Basic HTTP proxy authentication support is added. Proxy settings can be passed in the options while creating a new client. Example - [typescript/proxyAuth.ts](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-queue/samples/typescript/proxyAuth.ts)
- Connection strings for explicit storage endpoints are supported. - [Configure Azure Storage connection strings](https://docs.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#create-a-connection-string-for-an-explicit-storage-endpoint)

## 12.0.0-preview.2 (2019.08)

- [Breaking] Aborter class is no longer exposed from the package. Use the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to pass an abort signal to any of the async operations.
  `AbortController.timeout(<milliseconds>)` can be utitlized as an abort signal.
- Generalized the credential parameter in client constructors to support `{SharedKeyCredential | AnonymousCredential | TokenCredential}` credentials as a union type.
- Storage service allows SAS connection string with SAS string and endpoints along with the Account connection string(account name, key and endpoint).
  In this preview, SAS connection string support is added to the existing connection string client constructors and static methods.
  - Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
  - SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
  - SAS connection string is supported in both NodeJS and browser runtimes unlike the Account Connection String which is supported only in the NodeJS runtime.
- Fixed a bug where `MessageIdClient` constructor throws an error `URL is undefined` when the client is created with a valid connection string.

## 12.0.0-preview.1 (2019.07)

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

## 10.3.0 (2019.09)

- Updated Azure Storage Service API version to 2019-02-02.
- Responses for all APIs now return x-ms-client-request-id through `clientRequestId` that was passed in on the request from client-side.

## 10.2.0 (2019.07)

- Fixed a bug that `Aborter` cannot work during retry interval.
- Fixed a bug that "err.code.toUpperCase is not a function" when retries in browser.
- Export `RetryPolicyType`.
- `Aborter` doesn't require `dom` as tsconfig lib requirement anymore for `Event` type.
- Updated API version to 2018-11-09.
- Updated HTTP client from axios to node-fetch in Node.js runtime.
- A new option `keepAliveOptions` added to parameter of `StorageURL.newPipeline()` which controls keep-alive configurations. Keep-alive is enabled by default.
- Updated Azure Storage Service API version to [2018-11-09](https://docs.microsoft.com/en-us/rest/api/storageservices/version-2018-11-09).

## 10.1.0 (2019.01)

- [Breaking] Updated convenience layer methods enum type parameters into typescript union types, this will help to reduce bundle footprint.
- [Breaking] `SASQueryParameters` is not going to be exported in browser bundle, and will be exported in Node.js runtime.
- [Breaking] IE11 needs `Array.prototype.includes` and `Object.keys` polyfills loaded.
- Updated dependency `ms-rest-js` to `@azure/ms-rest-js`.
- Updated server timeout value for retry options `tryTimeoutInMs` to 30 seconds.
- Fixed `Aborter.timeout()` misleading scale description.
- Fixed an issue that enqueue/dequeue/peek fail to work with some utf8 characters.
- Exported HttpRequestBody type for who wants to implement a customized HTTP client.

## 10.0.0-preview (2018.12)

- Initial Release. API version 2018-03-28 supported. Please see the README for information on the new design.
