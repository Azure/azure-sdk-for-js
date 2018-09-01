// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as log from "./log";
import { BaseLease, BaseLeaseInfo } from "./baseLease";

/**
 * Represents an error that occurs when the service lease has been lost.
 * @class LeaseLostError
 */
export class LeaseLostError extends Error {
  /**
   * @property {string} partitionId The partitionId where the error occurred.
   * @readonly
   */
  readonly partitionId: string;
  /**
   * @property {Error} innerError The inner error from Azure Storage.
   * @readonly
   */
  readonly innerError: Error;

  constructor(id: string, message: string, error: Error) {
    super(message);
    this.partitionId = id;
    this.name = "LeaseLostError";
    this.innerError = error;
  }
}


/**
 * Describes the properties of a Complete Lease.
 * @interface CompleteLeaseInfo
 */
export interface CompleteLeaseInfo extends BaseLeaseInfo {
  /**
   * @property {number} epoch The epoch(time) of the lease, which is a value you can use to
   * determine the most recent owner of a partition between competing nodes.
   */
  epoch: number;
}

/**
 * Describes a Complete Lease.
 * @class CompleteLease.
 */
export class CompleteLease extends BaseLease {
  /**
   * @property {number} epoch The epoch(time) of the lease, which is a value you can use to
   * determine the most recent owner of a partition between competing nodes.
   */
  epoch: number;

  /**
   * Creates an instance of the Lease.
   * @constructor
   * @param {CompleteLeaseInfo} info The Lease info.
   */
  constructor(info: CompleteLeaseInfo) {
    super(info);
    this.epoch = info.epoch || -1;
  }

  /**
   * Increments the value of epoch by 1.
   * @returns {number} The incremented value of the epoch.
   */
  incrementEpoch(): number {
    const result = ++this.epoch;
    log.completeLease("[%s] New epoch for lease with partitionId '%s' is %s.", this.owner,
      this.partitionId, result);
    return result;
  }
}
