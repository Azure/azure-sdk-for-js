// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CheckpointStore, PartitionOwnership, Checkpoint } from "@azure/event-hubs";

/**
 * An implementation of CheckpointStore that uses Azure Table Storage to persist checkpoint data.
 */

export class TableCheckpointStore implements CheckpointStore {
  

  /**
   * Get the list of all existing partition ownership from the underlying data store. May return empty
   * results if there are is no existing ownership information.
   * Partition Ownership contains the information on which `EventHubConsumerClient` subscribe call is currently processing the partition.
   *
   * @param fullyQualifiedNamespace - The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName - The event hub name.
   * @param consumerGroup - The consumer group name.
   * @param options - A set of options that can be specified to influence the behavior of this method.
   *  - `abortSignal`: A signal used to request operation cancellation.
   *  - `tracingOptions`: Options for configuring tracing.
   * @returns Partition ownership details of all the partitions that have had an owner.
   */
  async listOwnership(): /*
        fullyQualifiedNamespace: string,
        eventHubName: string,
        consumerGroup: string,
        options: OperationOptions = {}
        */
  Promise<PartitionOwnership[]> {
    throw new Error("not implemented");
  }

  /**
   * Claim ownership of a list of partitions. This will return the list of partitions that were
   * successfully claimed.
   *
   * @param partitionOwnership - The list of partition ownership this instance is claiming to own.
   * @param options - A set of options that can be specified to influence the behavior of this method.
   *  - `abortSignal`: A signal used to request operation cancellation.
   *  - `tracingOptions`: Options for configuring tracing.
   * @returns A list partitions this instance successfully claimed ownership.
   */
  async claimOwnership(): /*
    partitionOwnership: PartitionOwnership[],
    options: OperationOptions = {}
    */
  Promise<PartitionOwnership[]> {
    console.log("nothing to claim");
    throw new Error("not implemented");
  }

  /**
   * Lists all the checkpoints in a data store for a given namespace, eventhub and consumer group.
   *
   * @param fullyQualifiedNamespace - The fully qualified Event Hubs namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net.
   * @param eventHubName - The event hub name.
   * @param consumerGroup - The consumer group name.
   * @param options - A set of options that can be specified to influence the behavior of this method.
   *  - `abortSignal`: A signal used to request operation cancellation.
   *  - `tracingOptions`: Options for configuring tracing.
   */
  async listCheckpoints(): /*
    fullyQualifiedNamespace: string,
    eventHubName: string,
    consumerGroup: string,
    options: OperationOptions = {}
    */
  Promise<Checkpoint[]> {
    console.log("no checkpoints to list");
    throw new Error("not implemented");
  }

  /**
   * Updates the checkpoint in the data store for a partition.
   *
   * @param checkpoint - The checkpoint.
   * @param options - A set of options that can be specified to influence the behavior of this method.
   *  - `abortSignal`: A signal used to request operation cancellation.
   *  - `tracingOptions`: Options for configuring tracing.
   * @returns A promise that resolves when the checkpoint has been updated.
   */
  async updateCheckpoint(/* checkpoint: Checkpoint */): Promise<void> {
    console.log("no checkpoint to update");
    throw new Error("not implemented");
  }
}
