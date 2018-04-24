// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:processor:partition");
import * as uuid from "uuid/v4";
import { EventData } from "../eventData";
import * as Constants from "../util/constants";
import { BlobLease } from "./blobLease";

export interface CheckpointInfo {
  partitionId: string;
  owner: string;
  token: string;
  epoch: number;
  offset?: string;
  sequenceNumber: number;
}
/**
 * Describes the Partition Context.
 * @class PartitionContext
 */
export default class PartitionContext {
  partitionId: string;
  lease: BlobLease;
  private _token: string;
  private _owner: string;
  private _checkpointDetails: CheckpointInfo;

  /**
   * Creates a new PartitionContext.
   * @param {string} partitionId The eventhub partition id.
   * @param {string} owner The name of the owner.
   * @param {BlobLease} lease The lease object.
   */
  constructor(partitionId: string, owner: string, lease: BlobLease) {
    this.partitionId = partitionId;
    this._owner = owner;
    this.lease = lease;
    this._token = uuid();
    this._checkpointDetails = {
      partitionId: this.partitionId,
      owner: this._owner,
      token: this._token,
      epoch: 1,
      sequenceNumber: 0
    };
  }

  /**
   * Stores the checkpoint data into the appropriate blob, assuming the lease is held (otherwise, rejects).
   *
   * The checkpoint data is structured as a JSON payload (example):
   * {"partitionId":"0","owner":"ephtest","token":"48e209e3-55f0-41b8-a8dd-d9c09ff6c35a",
   * "epoch":1,"offset":"","sequenceNumber":0}
   *
   * @method checkpoint
   *
   * @return {Promise<CheckpointInfo>}
   */
  async checkpoint(): Promise<CheckpointInfo> {
    try {
      if (this.lease.isHeld) {
        this._checkpointDetails.owner = this._owner; // We"re setting it, ensure we"re the owner.
        let checkpointDetailsAsString: string = "{}";
        try {
          checkpointDetailsAsString = JSON.stringify(this._checkpointDetails);
        } catch (err) {
          debug("An error occurred while executing JSON.stringify() on checkpoint details: %O", err);
        }
        await this.lease.updateContent(checkpointDetailsAsString);
        return this._checkpointDetails;
      } else {
        throw new Error("Lease not held.");
      }
    } catch (err) {
      const msg = `An error occurred while storing the checkpoint data in the blob: ${JSON.stringify(err)}.`;
      debug(msg);
      throw new Error(msg);
    }
  }

  setCheckpointData(owner: string, token: string, epoch: number, offset: string, sequenceNumber: number): void {
    this._checkpointDetails.owner = owner;
    this._checkpointDetails.token = token;
    this._checkpointDetails.epoch = epoch;
    this._checkpointDetails.offset = offset;
    this._checkpointDetails.sequenceNumber = sequenceNumber;
  }

  setCheckpointDataFromPayload(payload: CheckpointInfo): void {
    this._checkpointDetails = payload;
  }

  /**
   * Updates the checkpoint data from the owned lease.
   * @return {Promise<CheckpointInfo>}
   */
  async updateCheckpointDataFromLease(): Promise<CheckpointInfo> {
    try {
      const contents: string = await this.lease.getContent();
      if (contents) {
        debug("Lease '%s' with content: %s", this.lease.fullUri, contents);
        try {
          const payload = JSON.parse(contents);
          this.setCheckpointDataFromPayload(payload);
        } catch (err) {
          const msg = `Invalid payload "${contents}": ${JSON.stringify(err)}`
          debug(msg);
          throw new Error(msg);
        }
      }
      return this._checkpointDetails;
    } catch (err) {
      const msg = `An error occurred while updating the checkpoint data from lease: ${JSON.stringify(err)}.`;
      debug(msg);
      throw new Error(msg);
    }
  }

  /**
   * Updates data from the message, which should have an annotations field containing something like:
   *   "x-opt-sequence-number":6,"x-opt-offset":"480","x-opt-enqueued-time":"2015-12-18T17:26:49.331Z"
   *
   * @method updateCheckpointDataFromMessage
   * @param {EventData} eventData The event data received from the EventHubReceiver.
   */
  updateCheckpointDataFromEventData(eventData: EventData): void {
    if (eventData && eventData.annotations) {
      const anno = eventData.annotations;
      if (anno[Constants.enqueuedTime])
        this._checkpointDetails.epoch = anno[Constants.enqueuedTime] as number;
      if (anno[Constants.offset])
        this._checkpointDetails.offset = anno[Constants.offset] as string;
      if (anno[Constants.sequenceNumber])
        this._checkpointDetails.sequenceNumber = anno[Constants.sequenceNumber] as number;
      debug("Updated checkpoint data from event data is: %o", this._checkpointDetails);
    }
  }
}
