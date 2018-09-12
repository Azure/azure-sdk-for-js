// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as log from "./log";
import { BaseLease, BaseLeaseInfo } from "./baseLease";


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
    this.epoch = info.epoch != undefined ? info.epoch : -1;
  }

  /**
   * Increments the value of epoch by 1.
   * @returns {number} The incremented value of the epoch.
   */
  incrementEpoch(): number {
    const result = ++this.epoch;
    log.completeLease("[%s] [%s] New epoch for lease is %s.", this.owner, this.partitionId, result);
    return result;
  }

  /**
   * Gets the lease information.
   * @returns {CompleteLeaseInfo} CompleteLeaseInfo.
   */
  getInfo(): CompleteLeaseInfo {
    const info = super.getInfo();
    (info as CompleteLeaseInfo).epoch = this.epoch;
    log.completeLease("[%s] [%s] Lease info is: %o", this.owner, this.partitionId, info);
    return (info as CompleteLeaseInfo);
  }
}
