// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionContext } from "./partitionContext";
import { ReceivedEventData } from "./eventData";
import { PartitionManager } from "./eventProcessor";

/**
 * A checkpoint is meant to represent the last successfully processed event by the user from a particular
 * partition of a consumer group in an Event Hub instance.
 *
 * This is internal to how an `EventProcessor` works and the user of `EventHubClient` or `EventProcessor`
 * never interacts with `Checkpoint` directly.
 *
 * When the `updateCheckpoint()` method on the `CheckpointManager` class is called by the user, a
 * `Checkpoint` is created internally. It is then stored in the storage solution implemented by the
 * `PartitionManager` chosen by the user when creating an `EventProcessor`.
 **/
export interface Checkpoint {
  /**
   * @property The event hub name
   */
  eventHubName: string;
  /**
   * @property The consumer group name
   */
  consumerGroupName: string;
  /**
   * @property The unique identifier of the event processor.
   */
  ownerId: string;
  /**
   * @property The identifier of the Event Hub partition
   */
  partitionId: string;
  /**
   * @property The sequence number of the event.
   */
  sequenceNumber: number;
  /**
   * @property The offset of the event.
   */
  offset: number;
  /**
   * @property The unique identifier for the operation.
   */
  eTag: string;
}

/**
 * Users of the `EventProcessor` class use the `CheckpointManager` to update checkpoints.
 *
 * `EventProcessor` class instantiates this class for each partition it is processing and passes it to
 * the user code. The user never has to instantiate this class directly.
 *
 * A checkpoint is meant to represent the last successfully processed event by the user from a particular
 * partition of a consumer group in an Event Hub instance.
 */
export class CheckpointManager {
  private _partitionContext: PartitionContext;
  private _partitionManager: PartitionManager;
  private _eventProcessorId: string;
  private _eTag: string;

  /**
   * @ignore
   * @internal
   *
   * Creates a new checkpoint manager which is passed to a `PartitionProcessor`  to update checkpoints.
   * @param partitionContext The partition context providing necessary partition and event hub information for updating
   * checkpoints.
   * @param partitionManager The `PartitionManager` implementation that will be used to store the checkpoint information.
   * @param eventProcessorId The event processor identifier that is responsible for updating checkpoints.
   */
  constructor(
    partitionContext: PartitionContext,
    partitionManager: PartitionManager,
    eventProcessorId: string
  ) {
    this._partitionContext = partitionContext;
    this._partitionManager = partitionManager;
    this._eventProcessorId = eventProcessorId;
    this._eTag = "";
  }
  /**
   * Updates the checkpoint for the partition associated with the current `CheckpointManager`.
   *
   * A checkpoint is meant to represent the last successfully processed event by the user from a particular
   * partition of a consumer group in an Event Hub instance.
   *
   * @param eventData The event that you want to update the checkpoint with.
   * @return Promise<void>
   */
  public async updateCheckpoint(eventData: ReceivedEventData): Promise<void>;
  /**
   * Updates the checkpoint for the partition associated with the current `CheckpointManager`.
   *
   * A checkpoint is meant to represent the last successfully processed event by the user from a particular
   * partition of a consumer group in an Event Hub instance.
   *
   * @param sequenceNumber The sequence number of the event that you want to update the checkpoint with.
   * @param offset The offset of the event that you want to update the checkpoint with.
   * @return  Promise<void>.
   */
  public async updateCheckpoint(sequenceNumber: number, offset: number): Promise<void>;

  public async updateCheckpoint(
    eventDataOrSequenceNumber: ReceivedEventData | number,
    offset?: number
  ): Promise<void> {
    const checkpoint: Checkpoint = {
      eventHubName: this._partitionContext.eventHubName,
      consumerGroupName: this._partitionContext.consumerGroupName,
      ownerId: this._eventProcessorId,
      partitionId: this._partitionContext.partitionId,
      sequenceNumber:
        typeof eventDataOrSequenceNumber === "number"
          ? eventDataOrSequenceNumber
          : eventDataOrSequenceNumber.sequenceNumber,
      offset:
        typeof eventDataOrSequenceNumber === "number" ? offset! : eventDataOrSequenceNumber.offset,
      eTag: this._eTag
    };

    this._eTag = await this._partitionManager.updateCheckpoint(checkpoint);
  }
}
