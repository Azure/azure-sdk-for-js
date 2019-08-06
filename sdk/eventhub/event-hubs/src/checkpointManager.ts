// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionContext } from "./partitionContext";
import { ReceivedEventData } from "./eventData";
import { PartitionManager } from "./eventProcessor";

/**
 * A checkpoint represents the last successfully processed event by a `PartitionProcessor` for a particular partition of an Event Hub.
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
 * The checkpoint manager is used to update checkpoints to track progress of events processed. Each
 * instance of a `PartitionProcessor` will be provided with it's own instance of a `CheckpointManager`.
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
   * Updates the checkpoint for this partition using the event data. This will serve as the last known successfully
   * processed event in this partition if the update is successful.
   *
   * @param eventData The event data to use for updating the checkpoint.
   * @return Promise<void>
   */
  public async updateCheckpoint(eventData: ReceivedEventData): Promise<void>;
  /**
   * Updates a checkpoint using the given offset and sequence number. This will serve as the last known successfully
   * processed event in this partition if the update is successful.
   *
   * @param sequenceNumber The sequence number to update the checkpoint.
   * @param offset The offset to update the checkpoint.
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
