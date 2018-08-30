// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as log from "./log";

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
 * Describes the properties of a generic Lease.
 * @interface LeaseInfo
 */
export interface LeaseInfo {
  /**
   * @property {string} partitionId The associated partitionId for which the lease is held.
   */
  partitionId: string;
  /**
   * @property {string} owner The host owner for the partition.
   */
  owner: string;
  /**
   * @property {string} token The lease token that manages concurrency between hosts. You can use
   * this token to guarantee single access to any resource needed by the EPH.
   */
  token: string;
  /**
   * @property {number} epoch The epoch(time) of the lease, which is a value you can use to
   * determine the most recent owner of a partition between competing nodes.
   */
  epoch: number;
  /**
   * @property {string} sequenceNumber The sequence number of the event to be checked in.
   */
  sequenceNumber: number;
  /**
   * @property {string} offset The offset of the event to be checked in.
   */
  offset: string;
}

/**
 * Describes the generic lease.
 * @interface BaseLease.
 */
export interface BaseLease extends LeaseInfo {
  /**
   * Determines whether the lease is expired.
   * @returns {Promise<boolean>} Promise<boolean> `true` - expired. `false` - not expired.
   */
  isExpired(): Promise<boolean>;
  /**
   * Increments the value of epoch by 1.
   * @returns {number} The incremented value of the epoch.
   */
  incrementEpoch(): number;
}

/**
 * Describes a Lease.
 * @class Lease.
 */
export class Lease implements BaseLease {
  /**
   * @property {string} partitionId The associated partitionId for which the lease is held.
   */
  partitionId: string;
  /**
   * @property {string} owner The host owner for the partition.
   */
  owner: string;
  /**
   * @property {string} token The lease token that manages concurrency between hosts. You can use
   * this token to guarantee single access to any resource needed by the EPH.
   */
  token: string;
  /**
   * @property {number} epoch The epoch(time) of the lease, which is a value you can use to
   * determine the most recent owner of a partition between competing nodes.
   */
  epoch: number;
  /**
   * @property {string} sequenceNumber The sequence number of the event to be checked in.
   */
  sequenceNumber: number;
  /**
   * @property {string} offset The offset of the event to be checked in.
   */
  offset: string;

  /**
   * Creates an instance of the Lease.
   * @constructor
   * @param {LeaseInfo} info The Lease info.
   */
  constructor(info: LeaseInfo) {
    this.partitionId = info.partitionId;
    this.owner = info.owner;
    this.epoch = info.epoch;
    this.token = info.token;
    this.sequenceNumber = info.sequenceNumber;
    this.offset = info.offset || "-1";
  }

  /**
   * Determines whether the lease is expired.
   * @returns {Promise<boolean>} Promise<boolean> `true` - expired. `false` - not expired.
   */
  async isExpired(): Promise<boolean> {
    const result = false;
    log.lease("[%s] Lease '%s' with partitionId '%s' has expired -> %s.", this.owner,
      this.token, this.partitionId, result);
    return result;
  }

  /**
   * Increments the value of epoch by 1.
   * @returns {number} The incremented value of the epoch.
   */
  incrementEpoch(): number {
    const result = ++this.epoch;
    log.lease("[%s] Lease '%s' with partitionId '%s' new epoch is %s.", this.owner,
      this.token, this.partitionId, result);
    return result;
  }

  /**
   * Serializes the lease information.
   * @returns {string} string The serialized lease info.
   */
  serialize(): string {
    return JSON.stringify(this.getInfo());
  }

  /**
   * Gets the lease information.
   * @returns {LeaseInfo} LeaseInfo.
   */
  getInfo(): LeaseInfo {
    const info: LeaseInfo = {
      partitionId: this.partitionId,
      owner: this.owner,
      epoch: this.epoch,
      sequenceNumber: this.sequenceNumber,
      token: this.token,
      offset: this.offset
    };
    log.lease("[%s] Lease info is: %o", this.owner, info);
    return info;
  }
}
