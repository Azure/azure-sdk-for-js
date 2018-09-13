## 2018-09-12 1.0.0
- Stable version of the library.

## 2018-09-12 0.2.0
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
- Please take a look at the [examples](https://github.com/Azure/azure-event-hubs-node/tree/master/processor/examples) for more details.

## 2018-07-16 0.1.4
- Added an option `autoCheckpoint: false` to not checkpoint the received messages by default.

## 2018-06-13 0.1.3
- `_storageBlobPrefix` is set if provided in the options, [#91](https://github.com/Azure/azure-event-hubs-node/pull/91).

## 2018-06-13 0.1.2
- Fixed an issue reported in [#80](https://github.com/Azure/azure-event-hubs-node/issues/80).

## 2018-05-02 0.1.1
- Fix dependency version.

## 2018-05-02 0.1.0
- First version of `azure-event-processor-host` based on the new `azure-event-hubs` sdk.
- This client library makes it easier to manage receivers for an EventHub.
- You can checkpoint the received data to an Azure Storage Blob. The processor does checkpointing
on your behalf at regular intervals. This makes it easy to start receiving events from the point you
left at a later time.