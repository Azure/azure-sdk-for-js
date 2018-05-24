// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:eph:partition");
import * as uuid from "uuid/v4";
import { EventData } from "azure-event-hubs";
import * as Constants from "./util/constants";
import { BlobLease } from "./blobLease";
import { CheckpointInfo } from "./checkpointInfo";

/**
 * Describes the Partition Context.
 * @class PartitionContext
 */
export class PartitionContext {
  /**
   * @property {string} partitionId The eventhub partition id.
   */
  partitionId: string;
  /**
   * @property {string} owner The name of the owner.
   */
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
      epoch: -1,
      sequenceNumber: 0
    };
  }

  /**
   * Stores the checkpoint data into the appropriate blob, assuming the lease is held (otherwise, rejects).
   *
   * The checkpoint data is structured as a JSON payload (example):
   * `{ "PartitionId":"0","Owner":"ephtest","Token":"48e209e3-55f0-41b8-a8dd-d9c09ff6c35a",
   * "Epoch":1,"Offset":"","SequenceNumber":0}`. The format and the casing of keys in the object
   * is in sync with the .net sdk of EventHubs.
   *
   * @return {Promise<CheckpointInfo | void>}
   */
  async checkpoint(): Promise<CheckpointInfo | void> {
    let leaseId: string = "";
    try {
      if (this.lease.isHeld) {
        if (this._checkpointDetails.epoch > -1) {
          leaseId = this.lease.leaseId!;
          this._checkpointDetails.owner = this._owner; // We"re setting it, ensure we are the owner.
          let checkpointDetailsAsString: string = "{}";
          checkpointDetailsAsString = CheckpointInfo.serialize(this._checkpointDetails);
          await this.lease.updateContent(checkpointDetailsAsString);
          return this._checkpointDetails;
        }
      } else {
        throw new Error("Lease is not held.");
      }
    } catch (err) {
      debug("An error occurred while checkpointing info with lease id '%s' in the blob: %O",
        leaseId, err);
      throw err;
    }
  }

  /**
   * Sets the checkpoint info.
   * @param {string} owner Name of the owner.
   * @param {string} token The token string.
   * @param {number} epoch The epoch value.
   * @param {string} offset The offset of the message in the event stream.
   * @param {number} sequenceNumber The sequnce number of the message in the event stream
   */
  setCheckpointInfo(owner: string, token: string, epoch: number, offset: string, sequenceNumber: number): void {
    this._checkpointDetails.owner = owner;
    this._checkpointDetails.token = token;
    this._checkpointDetails.epoch = epoch;
    this._checkpointDetails.offset = offset;
    this._checkpointDetails.sequenceNumber = sequenceNumber;
  }

  /**
   * Updates the checkpoint data from the owned lease.
   * @return {Promise<CheckpointInfo>}
   */
  async updateCheckpointInfoFromLease(): Promise<CheckpointInfo> {
    try {
      const contents: string = await this.lease.getContent();
      if (contents) {
        debug("Lease '%s' with content: %s", this.lease.fullUri, contents);
        try {
          const payload = CheckpointInfo.deserialize(contents);
          if (payload) this._checkpointDetails = payload;
        } catch (err) {
          const msg = `Invalid payload "${contents}": ${JSON.stringify(err)}`;
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
   * @param {EventData} eventData The event data received from the EventHubReceiver.
   */
  updateCheckpointDataFromEventData(eventData: EventData): void {
    if (eventData && eventData.annotations) {
      const anno = eventData.annotations;
      if (anno[Constants.enqueuedTime]) {
        this._checkpointDetails.epoch = anno[Constants.enqueuedTime] as number;
      }
      if (anno[Constants.offset]) {
        this._checkpointDetails.offset = anno[Constants.offset] as string;
      }
      if (anno[Constants.sequenceNumber]) {
        this._checkpointDetails.sequenceNumber = anno[Constants.sequenceNumber] as number;
      }
      debug("Updated checkpoint data from event data is: %O", this._checkpointDetails);
    }
  }
}
