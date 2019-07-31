// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionContext } from "./partitionContext";
import { ReceivedEventData } from "./eventData";
import { PartitionManager } from "./eventProcessor";
import { generate_uuid } from "rhea-promise";

/**
 * Used by createCheckpoint in PartitionManager
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
   * @property The unique instance identifier
   */
  instanceId: string;
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
 * CheckPointManager is created by the library & passed to user's code to let them create a checkpoint
 */
export class CheckpointManager {
  private _partitionContext: PartitionContext; 
  private _partitionManager: PartitionManager;
  private _instanceId: string;
  private _eTag: string;

  constructor(partitionContext: PartitionContext, partitionManager: PartitionManager) {
    this._partitionContext = partitionContext;
    this._partitionManager = partitionManager;
    this._eTag = "";
    this._instanceId = generate_uuid();
  }
  /**
   * Updates a checkpoint using the event data.
   *
   * @param eventData The event data to use for updating the checkpoint.
   * @return Promise<void>
   */
  public async updateCheckpoint(eventData: ReceivedEventData): Promise<void>;
  /**
   * Updates a checkpoint using the given offset and sequence number.
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
      instanceId: this._instanceId,
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
