// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventData, EventPosition } from "azure-event-hubs";
import { Lease } from "./lease";
import { CheckpointInfo } from "./checkpointInfo";
import * as log from "./log";
import { ProcessorContext } from './processorContext';
import { validateType } from "./util/utils";

/**
 * Describes the Partition Context.
 * @class PartitionContext
 */
export class PartitionContext {
  /**
   * @property {Lease} lease The most recdent checkpointed lease with the partitionId.
   */
  lease: Lease;
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
    return this._context.eventHubClient.eventhubName;
  }
  /**
   * @property {string} consumerGroup The name of the consumer group.
   * @readonly
   */
  get consumerGroup(): string {
    return this._context.consumerGroup;
  }

  private _context: ProcessorContext;
  private _offset: string = "-1";
  private _sequenceNumber: number = 0;

  /**
   * Creates a new PartitionContext.
   * @param {string} partitionId The eventhub partition id.
   * @param {string} owner The name of the owner.
   * @param {Lease} lease The lease object.
   */
  constructor(context: ProcessorContext, partitionId: string, lease: Lease) {
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
    await this._persistCheckpoint(CheckpointInfo.createFromEventData(this.partitionId, eventData));
  }

  /**
   * @ignore
   */
  async getInitialOffset(): Promise<EventPosition> {
    const startingCheckpoint = await this._context.checkpointManager.getCheckpoint(this.partitionId);
    let result: EventPosition;
    if (!startingCheckpoint) {
      log.partitionContext("[%s] User provided initial offset: %s",
        this._context.hostName, this._context.initialOffset);
      result = this._context.initialOffset || EventPosition.fromOffset(this._offset);
    } else {
      if (startingCheckpoint.offset != undefined) this._offset = startingCheckpoint.offset;
      if (startingCheckpoint.sequenceNumber != undefined) this._sequenceNumber = startingCheckpoint.sequenceNumber;
      result = EventPosition.fromOffset(this._offset);
      log.partitionContext("[%s] Retrieved starting offset/sequence number: %s/%d",
        this._context.hostName, this._offset, this._sequenceNumber);
    }
    log.partitionContext("[%s] Initial position provider offset: %s, sequenceNumber: %d, enqueuedTime: %d",
      this._context.hostName, result.offset, result.sequenceNumber, result.enqueuedTime);
    return result;
  }

  /**
   * @ignore
   */
  private async _persistCheckpoint(checkpoint: CheckpointInfo): Promise<void> {
    try {
      const inStoreCheckpoint = await this._context.checkpointManager.getCheckpoint(checkpoint.partitionId);
      if (inStoreCheckpoint == undefined || checkpoint.sequenceNumber >= inStoreCheckpoint.sequenceNumber) {
        if (inStoreCheckpoint == undefined) {
          await this._context.checkpointManager.createCheckpointIfNotExists(checkpoint.partitionId);
        }
        await this._context.checkpointManager.updateCheckpoint(this.lease, checkpoint);
        this.lease.offset = checkpoint.offset;
        this.lease.sequenceNumber = checkpoint.sequenceNumber;
      } else {
        const msg = `Ignoring out of date checkpoint with offset: '${checkpoint.offset}', ` +
          `sequenceNumber: ${checkpoint.sequenceNumber} because currently persisted checkpoint ` +
          ` has higher offset '${inStoreCheckpoint.offset}', sequenceNumber ` +
          `${inStoreCheckpoint.sequenceNumber}.`;
        log.error("[%s] %s", this._context.hostName, msg);
        throw new Error(msg);
      }
    } catch (err) {
      const msg = `An error occurred while checkpointing info for partition ` +
        `"${checkpoint.partitionId}": ${err ? err.stack : JSON.stringify(err)}.`;
      log.error("[%s] %s", this._context.hostName, msg);
      throw err;
    }
  }
}
