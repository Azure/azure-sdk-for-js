// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

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

export class BaseLease implements BaseLeaseInfo {
  readonly partitionId: string;
  owner: string;
  isOwned: boolean = false;

  constructor(info: BaseLeaseInfo) {
    this.partitionId = info.partitionId;
    this.owner = info.owner;
  }

  /**
   * Compares possibleOwner against this.owner
   * 
   * @param {string} possibleOwner The owner name to check.
   * @returns {boolean} boolean - true if possibleOwner is the same as this.owner, false otherwise.
   */
  isOwnedBy(possibleOwner: string): boolean {
    return this.owner === possibleOwner;
  }
}
