# Release History

## 2.1.1 (2019-12-12)

- Updates minimum version of `@azure/event-hubs` from version 2.1.1 to version 2.1.4.
  This update brings in improvements when attempting to reconnect after a transient failure.
  See the [changelog](https://github.com/Azure/azure-sdk-for-js/blob/%40azure/event-hubs_2.1.4/sdk/eventhub/event-hubs/changelog.md#2019-12-11-214)
  for `@azure/event-hubs` for a full list of the improvements since version 2.1.1.

## 2.1.0 (2019-08-06)

- Added support for WebSockets. WebSockets enable Event processor Host to work over an HTTP proxy and in environments where the standard AMQP port 5671 is blocked.
  Refer to the [websockets](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-processor-host/samples/websockets.ts) sample to see how to use WebSockets.
- Fixed [bug 4363](https://github.com/Azure/azure-sdk-for-js/issues/4363) which stopped users from providing their own LeaseManager. If both a lease manager and the options for leaseDuration/leaseRenewInterval are provided, then the latter will be ignored in favor of the leaseDuration/leaseRenewInterval properties on the lease manager.

## 2.0.0 (2019-07-16)

- Use the latest version of the dependency on [@azure/event-hubs](https://www.npmjs.com/package/@azure/event-hubs/v/2.1.1) that has the following bug fixes
  - Added event handlers for `error` and `protocolError` events on the connection object to avoid the case of unhandled exceptions. This is related to the [bug 4136](https://github.com/Azure/azure-sdk-for-js/issues/4136)
  - A network connection lost error is now treated as retryable error. A new error with name `ConnectionLostError`
    is introduced for this scenario which you can see if you enable the [logs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-processor-host#debug-logs).
  - When recovering from an error that caused the underlying AMQP connection to get disconnected,
    [rhea](https://github.com/amqp/rhea/issues/205) reconnects all the older AMQP links on the connection
    resulting in the below 2 errors in the logs. We now clear rhea's internal map to avoid such reconnections.
    We already have code in place to create new AMQP links to resume send/receive operations.
    - InvalidOperationError: A link to connection '.....' \$cbs node has already been opened.
    - UnauthorizedError: Unauthorized access. 'Listen' claim(s) are required to perform this operation.

### Breaking Changes

- If you have been using the `createFromAadTokenCredentials` function or the `createFromAadTokenCredentialsWithCustomCheckpointAndLeaseManager` function to create an instance of the
  `EventProcessorHost`, you will now need to use the [@azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth)
  library instead of [ms-rest-azure](https://www.npmjs.com/package/ms-rest-azure) library to create
  the credentials that are needed by these functions. - Typescript: Replace `import * from "ms-rest-azure";` with `import * from "@azure/ms-rest-nodeauth";` - Javascript: Replace `require("ms-rest-azure")` with `require("@azure/ms-rest-nodeauth")`

## 1.0.6 (2018-10-05)

- Remove `@azure/amqp-common` and `rhea-promise` as dependencies, since we use very little from
  those libraries and there is a risk of having two instances of rhea in the dependency chain which
  can cause problems while encoding types for filters.
- `HostContext.connectionConfig` is now of type `EventHubConnectionConfig`.
- Minimum dependency on `@azure/event-hubs: "^1.0.6"`.

## 1.0.5 (2018-10-01)

- Bumping minimum version of @azure/event-hubs to "1.0.5".
- Taking a dependency on "@azure/amqp-common" for reusing the common parts.

## 1.0.4 (2018-09-25)

- Bumping minimum version of @azure/event-hubs to "1.0.4".

## 1.0.3 (2018-09-25)

- Ensures that amqp:link-stolen errors are not notified to the customer, since they are expected errors that
  happen during lease stealing or expiration as a part of load balancing.

## 1.0.2 (2018-09-15)

- Ensures that messages are checkpointed in order.

## 1.0.1 (2018-09-14)

- `eph.getPartitionInformation()` should works as expected when partitionId is of type `number | string`.
- updated documentation for `eventHubPath` optional property in the `FromConnectionStringOptions` object.

## 1.0.0 (2018-09-12)

- Stable version of the library.

## 0.2.0 (2018-09-12)

- Added support to automatically balance the load of receiving messages across multiple partitions.
- Added static method to create an EPH from an `IotHubConnectionString`
- Added user-agent to the underlying amqp-connection. This would help in tracking usage of EPH.
- Changed the overall design of EPH.
- Instead of attaching handlers on `eph:message` and `eph:error`, now the handlers need to be passed
  as arguments to the `start()` method on EPH.
- Apart from that an additional handler/method can be passed as an optional property `onEphError`
  to EPH. This handler will receive notifications from EPH regarding any errors that occur during
  partition management.
- Removed optional property `leasecontainerName` and replaced it with a required parameter `storageContainerName` wherever applicable in all the static methods on `EventProcessorHost`.
- Removed optional property `autoCheckpoint` and added optional properties
  - `checkpointManager`
  - `onEphError`
  - `leaseRenewInterval`
  - `leaseDuration`
- Please take a look at the [examples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-processor-host/samples) for more details.

## 0.1.4 (2018-07-16)

- Added an option `autoCheckpoint: false` to not checkpoint the received messages by default.

## 0.1.3 (2018-06-13)

- `_storageBlobPrefix` is set if provided in the options, [#91](https://github.com/Azure/azure-event-hubs-node/pull/91).

## 0.1.2 (2018-06-13)

- Fixed an issue reported in [#80](https://github.com/Azure/azure-event-hubs-node/issues/80).

## 0.1.1 (2018-05-02)

- Fix dependency version.

## 0.1.0 (2018-05-02)

- First version of `azure-event-processor-host` based on the new `azure-event-hubs` sdk.
- This client library makes it easier to manage receivers for an EventHub.
- You can checkpoint the received data to an Azure Storage Blob. The processor does checkpointing
  on your behalf at regular intervals. This makes it easy to start receiving events from the point you
  left at a later time.
