### 2019-11-05 - 1.0.0-preview.4

- Updated to use the latest version of the `@azure/event-hubs` package and `@azure/storabe-blob` packages.

### 2019-10-08 1.0.0-preview.3

- Updated to use the latest version of the `@azure/event-hubs` package.

### 2019-10-07 1.0.0-preview.2

- Current implementation of the Partition Manager takes the event hub name, consumer group name and partition id to ensure uniqueness for the checkpoint and ownership.
  Since the same event hub name and consumer group name can exist in another namespace, we added `fullyQualifiedNamespace` as well to ensure uniqueness.
  ([PR #5153](https://github.com/Azure/azure-sdk-for-js/pull/5153))

### 2019-09-12 1.0.0-preview.1

This is the first preview of the `@azure/eventhubs-checkpointstore-blob` library which provides the implementation for the `PartitionManager` interface from the `@azure/event-hubs` library which is required to store checkpoints & aid in load balancing of multiple instances of an EventProcessor.
