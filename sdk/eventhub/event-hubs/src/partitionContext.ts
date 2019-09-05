// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReceivedEventData } from "./eventData";
import { PartitionManager } from "./eventProcessor";

/**
 * A checkpoint is meant to represent the last successfully processed event by the user from a particular
 * partition of a consumer group in an Event Hub instance.
 *
 * When the `updateCheckpoint()` method on the `CheckpointManager` class is called by the user, a
 * `Checkpoint` is created internally. It is then stored in the storage solution implemented by the
 * `PartitionManager` chosen by the user when creating an `EventProcessor`.
 *
 * Users are never expected to interact with `Checkpoint` directly. This interface exists to support the
 * internal workings of `EventProcessor` and `PartitionManager`.
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
 * `PartitionContext` holds information on the partition, consumer group and event hub
 * being processed by the `EventProcessor`.
 *
 * User is never meant to create `PartitionContext` directly. It is only passed to user code
 * by the `EventProcessor`.
 */
export class PartitionContext {
  private _partitionManager: PartitionManager;
  private _consumerGroupName: string;
  private _eventHubName: string;
  private _eventProcessorId: string;
  private _partitionId: string;
  private _eTag: string = "";

  constructor(
    eventHubName: string,
    consumerGroupName: string,
    partitionId: string,
    partitionManager: PartitionManager,
    eventProcessorId: string
  ) {
    this._eventHubName = eventHubName;
    this._consumerGroupName = consumerGroupName;
    this._partitionId = partitionId;
    this._partitionManager = partitionManager;
    this._eventProcessorId = eventProcessorId;
  }

  /**
   * @property The consumer group name
   * @readonly
   */
  get consumerGroupName() {
    return this._consumerGroupName;
  }

  /**
   * @property The event hub name
   * @readonly
   */
  get eventHubName() {
    return this._eventHubName;
  }

  /**
   * @property The identifier of the Event Hub partition
   * @readonly
   */
  get partitionId() {
    return this._partitionId;
  }

  /**
   * Updates the checkpoint for the partition associated with the `PartitionContext`.
   *
   * A checkpoint is meant to represent the last successfully processed event by the user from a particular
   * partition of a consumer group in an Event Hub instance.
   *
   * @param eventData The event that you want to update the checkpoint with.
   * @return Promise<void>
   */
  public async updateCheckpoint(eventData: ReceivedEventData): Promise<void>;
  /**
   * Updates the checkpoint for the partition associated with the `PartitionContext`.
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
      eventHubName: this._eventHubName,
      consumerGroupName: this._consumerGroupName,
      ownerId: this._eventProcessorId,
      partitionId: this._partitionId,
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
