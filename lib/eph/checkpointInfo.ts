// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:eph:checkpointInfo");

/**
 * Describes the checkoint information.
 * @interface CheckpointInfo
 */
export interface CheckpointInfo {
  partitionId: string;
  owner: string;
  token: string;
  epoch: number;
  offset?: string;
  sequenceNumber: number;
}

/**
 * Describes the .net sdk's way of checkpointing information. If someone has previously used .net
 * sdk then we should be able to use that information.
 */
export interface CheckpointInfoUpperCase {
  PartitionId: string;
  Owner: string;
  Token: string;
  Epoch: number;
  Offset?: string;
  SequenceNumber: number;
}

export namespace CheckpointInfo {
  /**
   * Serializes the checkpoint info before writing it to the blobl
   * @param {CheckpointInfo} data The checkpoint data that needs to be serialized.
   * @return {serializedString} serializedString
   */
  export function serialize(data: CheckpointInfo): string {
    const result: CheckpointInfoUpperCase = {
      Epoch: data.epoch,
      Owner: data.owner,
      PartitionId: data.partitionId,
      Token: data.token,
      SequenceNumber: data.sequenceNumber,
      Offset: data.offset
    };
    let resultAsString = "{}";
    try {
      resultAsString = JSON.stringify(result);
    } catch (err) {
      debug("An error occurred while executing JSON.stringify() on checkpoint details %o: %O",
        data, err);
    }
    return resultAsString;
  }
  /**
   * Deserializes the checkpoint data received from the blob.
   * @param {string} response The content received from the storage blob.
   * @return {CheckpointInfo} CheckpointInfo.
   */
  export function deserialize(response: string): CheckpointInfo | undefined {
    let payload: any;
    let result: CheckpointInfo | undefined;
    try {
      payload = JSON.parse(response);
      if (payload) {
        result = {
          offset: payload.offset || payload.Offset,
          owner: payload.owner || payload.Owner,
          partitionId: payload.partitionId || payload.PartitionId,
          epoch: payload.epoch || payload.Epoch,
          token: payload.token || payload.Token,
          sequenceNumber: payload.sequenceNumber || payload.SequenceNumber
        };
      }
    } catch (err) {
      debug("An error occurred while executing JSON.parse() on checkpoint response '%s': %O",
        response, err);
    }
    return result;
  }
}
