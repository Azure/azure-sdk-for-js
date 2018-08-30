// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as log from "./log";
import { EventPosition, EventData } from "azure-event-hubs";
import { LeaseInfo } from "./lease";
import { validateType } from "./util/utils";

/**
 * Describes the checkoint information.
 * @interface CheckpointInfo
 */
export interface CheckpointInfo {
  /**
   * @property {string} partitionId The EventHub partition id.
   */
  partitionId: string;
  /**
   * @property {string} offset The offset of the event to be checked in.
   */
  offset: string;
  /**
   * @property {string} sequenceNumber The sequence number of the event to be checked in.
   */
  sequenceNumber: number;
}

/**
 * Describes the checkoint information.
 * @namespace CheckpointInfo
 */
export namespace CheckpointInfo {
  /**
   * Creates the checkpoint info
   * @param {string} partitionId The partition id for the checkpoint
   * @param {string} [offset] The offset of the event to be checked in.
   * @param {number} [sequenceNumber] The sequence number of the event to be checked in.
   * @return {CheckpointInfo} CheckpointInfo
   */
  export function create(partitionId: string, offset?: string, sequenceNumber?: number): CheckpointInfo {
    validateType("partitionId", partitionId, true, "string");
    validateType("offset", offset, false, "string");
    validateType("sequenceNumber", sequenceNumber, false, "number");
    const checkpoint: CheckpointInfo = {
      partitionId: partitionId,
      offset: offset || EventPosition.startOfStream,
      sequenceNumber: sequenceNumber != undefined ? sequenceNumber : 0
    };
    log.checkpoint("The created CheckpointInfo is: %o", checkpoint);
    return checkpoint;
  }

  /**
   * Creates the checkpoint info
   * @param {LeaseInfo} lease The lease info from which the checkpoint info needs to created.
   * @return {CheckpointInfo} CheckpointInfo
   */
  export function createFromLease(lease: LeaseInfo): CheckpointInfo {
    validateType("lease", lease, true, "object");
    const checkpoint: CheckpointInfo = {
      offset: lease.offset || EventPosition.startOfStream,
      partitionId: lease.partitionId,
      sequenceNumber: lease.sequenceNumber
    };
    log.checkpoint("The created CheckpointInfo from lease %o is: %o", lease, checkpoint);
    return checkpoint;
  }

  /**
   * Creates the checkpoint info.
   * @param {string} partitionId The partition id for the checkpoint
   * @param {EventData} eventData The event data from which the checkpoint info needs to created.
   * @return {CheckpointInfo} CheckpointInfo
   */
  export function createFromEventData(partitionId: string, eventData: EventData): CheckpointInfo {
    validateType("partitionId", partitionId, true, "string");
    validateType("eventData", eventData, true, "object");
    validateType("eventData.offset", eventData.offset, true, "string");
    validateType("eventData.sequenceNumber", eventData.sequenceNumber, true, "number");

    const checkpoint: CheckpointInfo = {
      partitionId: partitionId,
      offset: eventData.offset!,
      sequenceNumber: eventData.sequenceNumber!
    };
    log.checkpoint("The created CheckpointInfo from EventData %o is: %o", eventData, checkpoint);
    return checkpoint;
  }
}
