// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Describes the basic information required in a lease.
 */
export interface BaseLeaseInfo {
  /**
   * @property {string} partitionId The associated partitionId for which the lease is held.
   */
  partitionId: string;
  /**
   * @property {string} owner The host owner for the partition.
   */
  owner: string;
}

/**
 * Describes the base lease.
 */
export class BaseLease implements BaseLeaseInfo {
  /**
   * @property {string} partitionId The associated partitionId for which the lease is held.
   * @readonly
   */
  readonly partitionId: string;
  /**
   * @property {string} owner The host owner for the partition.
   */
  owner: string;
  /**
   * @property {boolean} isOwned Indicates wether the lease is owned. `true` if it is owned by
   * someone; `false` otherwise.
   */
  isOwned: boolean = false;

  /**
   * @constructor
   * @param info The information required to create a base lease.
   */
  constructor(info: BaseLeaseInfo) {
    this.partitionId = info.partitionId;
    this.owner = info.owner;
  }

  /**
   * Compares possibleOwner against this.owner
   * @param {string} possibleOwner The owner name to check.
   * @returns {boolean} boolean - true if possibleOwner is the same as this.owner, false otherwise.
   */
  isOwnedBy(possibleOwner: string): boolean {
    return this.owner === possibleOwner;
  }

  /**
   * Gets the lease information.
   * @returns {CompleteLeaseInfo} CompleteLeaseInfo.
   */
  getInfo(): BaseLeaseInfo {
    const info: BaseLeaseInfo = {
      partitionId: this.partitionId,
      owner: this.owner,
    };
    return info;
  }
}
