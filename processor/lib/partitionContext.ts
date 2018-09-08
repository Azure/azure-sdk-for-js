// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventData, EventPosition } from "azure-event-hubs";
import { CompleteLease } from "./completeLease";
import { CheckpointInfo } from "./checkpointInfo";
import * as log from "./log";
import { HostContextWithCheckpointLeaseManager } from './hostContext';
import { validateType } from "./util/utils";

/**
 * Describes the Partition Context.
 * @class PartitionContext
 */
export class PartitionContext {
  /**
   * @property {Lease} lease The most recdent checkpointed lease with the partitionId.
   */
  lease: CompleteLease;
  /**
   * @property {string} partitionId The eventhub partition id.
   * @readonly
   */
  readonly partitionId: string;
  /**
   * @property {string} owner The host/owner of the partition.
   * @readonly
   */
  get owner(): string {
    return this.lease.owner;
  }
  /**
   * @property {string} eventhubPath The path of the eventhub
   * @readonly
   */
  get eventhubPath(): string {
    return this._context.eventHubPath;
  }
  /**
   * @property {string} consumerGroup The name of the consumer group.
   * @readonly
   */
  get consumerGroup(): string {
    return this._context.consumerGroup;
  }

  private _context: HostContextWithCheckpointLeaseManager;
  private _offset: string = EventPosition.startOfStream;
  private _sequenceNumber: number = 0;

  /**
   * Creates a new PartitionContext.
   * @param {string} partitionId The eventhub partition id.
   * @param {string} owner The name of the owner.
   * @param {CompleteLease} lease The lease object.
   */
  constructor(context: HostContextWithCheckpointLeaseManager, partitionId: string, lease: CompleteLease) {
    this._context = context;
    this.partitionId = partitionId;
    this.lease = lease;
  }

  /**
   * Sets the offset and sequence number of the partition context from the provided EventData.
   * @param {EventData} eventData The event data `received` from the EventHubReceiver.
   */
  setOffsetAndSequenceNumber(eventData: EventData): void {
    validateType("eventData", eventData, true, "object");
    validateType("eventData.offset", eventData.offset, true, "string");
    validateType("eventData.sequenceNumber", eventData.sequenceNumber, true, "number");
    this._offset = eventData.offset!;
    this._sequenceNumber = eventData.sequenceNumber!;
  }

  /**
   * Writes the current offset and sequenceNumber to the checkpoint store via the checkpoint manager.
   *
   * The checkpoint data is structured as a JSON payload (example):
   * `{ "partitionId":"0","owner":"ephtest","token":"48e209e3-55f0-41b8-a8dd-d9c09ff6c35a",
   * "epoch":1,"offset":"","SequenceNumber":0 }`.
   *
   * @return {Promise<void>}
   */
  async checkpoint(): Promise<void> {
    const capturedCheckpoint: CheckpointInfo = {
      offset: this._offset,
      partitionId: this.partitionId,
      sequenceNumber: this._sequenceNumber
    };
    const withHostAndPartiton = this._context.withHostAndPartition;
    log.partitionContext(withHostAndPartiton(this, "Checkpointing: %O"), capturedCheckpoint);
    await this._persistCheckpoint(capturedCheckpoint);
  }

  /**
   * Writes the current offset and sequenceNumber to the checkpoint store via the checkpoint manager.
   *
   * The checkpoint data is structured as a JSON payload (example):
   * `{ "partitionId":"0","owner":"ephtest","token":"48e209e3-55f0-41b8-a8dd-d9c09ff6c35a",
   * "epoch":1,"offset":"","SequenceNumber":0 }`.
   *
   * @param {EventData} eventData The event data received from the EventHubReceiver.
   * @return {Promise<void>}
   */
  async checkpointFromEventData(eventData: EventData): Promise<void> {
    const data = CheckpointInfo.createFromEventData(this.partitionId, eventData);
    const withHostAndPartiton = this._context.withHostAndPartition;
    log.partitionContext(withHostAndPartiton(this, "Checkpointing from ED: %O"), data);
    await this._persistCheckpoint(data);
  }

  /**
   * @ignore
   */
  async getInitialOffset(): Promise<EventPosition> {
    const startingCheckpoint = await this._context.checkpointManager.getCheckpoint(this.partitionId);
    const withHostAndPartiton = this._context.withHostAndPartition;
    let result: EventPosition;
    if (!startingCheckpoint) {
      if (this._context.initialOffset) {
        log.partitionContext(withHostAndPartiton(this, "User provided initial offset: %s"),
          this._context.initialOffset.getExpression());
      }
      result = this._context.initialOffset || EventPosition.fromOffset(this._offset);
    } else {
      if (startingCheckpoint.offset != undefined) this._offset = startingCheckpoint.offset;
      if (startingCheckpoint.sequenceNumber != undefined) this._sequenceNumber = startingCheckpoint.sequenceNumber;
      result = EventPosition.fromOffset(this._offset);
      log.partitionContext(withHostAndPartiton(this, "Retrieved starting offset/sequence " +
        "number: %s/%d"),
        this._offset, this._sequenceNumber);
    }
    log.partitionContext(withHostAndPartiton(this, "Initial position provider offset: %s, " +
      "sequenceNumber: %d, enqueuedTime: %d"), result.offset, result.sequenceNumber, result.enqueuedTime);
    return result;
  }

  /**
   * @ignore
   */
  private async _persistCheckpoint(checkpoint: CheckpointInfo): Promise<void> {
    const withHostAndPartiton = this._context.withHostAndPartition;
    try {
      const inStoreCheckpoint = await this._context.checkpointManager.getCheckpoint(checkpoint.partitionId);
      if (inStoreCheckpoint == undefined || checkpoint.sequenceNumber >= inStoreCheckpoint.sequenceNumber) {
        if (inStoreCheckpoint == undefined) {
          await this._context.checkpointManager.createCheckpointIfNotExists(checkpoint.partitionId);
        }
        log.partitionContext(withHostAndPartiton(this, "Persisting the checkpoint: %O."), checkpoint);
        await this._context.checkpointManager.updateCheckpoint(this.lease, checkpoint);
      } else {
        const msg = `Ignoring out of date checkpoint with offset: '${checkpoint.offset}', ` +
          `sequenceNumber: ${checkpoint.sequenceNumber} because currently persisted checkpoint ` +
          ` has higher offset '${inStoreCheckpoint.offset}', sequenceNumber ` +
          `${inStoreCheckpoint.sequenceNumber}.`;
        log.error(withHostAndPartiton(this, "%s"), msg);
        throw new Error(msg);
      }
    } catch (err) {
      const msg = `An error occurred while checkpointing info for partition ` +
        `'${checkpoint.partitionId}': ${err ? err.stack : JSON.stringify(err)}.`;
      log.error(withHostAndPartiton(this, "%s"), msg);
      throw err;
    }
  }
}
