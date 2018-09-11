// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { CompleteLeaseInfo, CompleteLease } from "./completeLease";
import { AzureBlob } from "./azureBlob";
import * as log from "./log";

export interface LeaseInfo extends CompleteLeaseInfo {
  /**
   * @property {string} token The lease token that manages concurrency between hosts. You can use
   * this token to guarantee single access to any resource needed by the EPH.
   */
  token: string;
  /**
   * @property {string} sequenceNumber The sequence number of the event to be checked in.
   */
  sequenceNumber: number;
  /**
   * @property {string} offset The offset of the event to be checked in.
   */
  offset?: string;
}

export interface AzureBlobLeaseInfo extends LeaseInfo {
  /**
   * @property {AzureBlob} blob Reference to the azure blob.
   */
  blob: AzureBlob;
}

export class AzureBlobLease extends CompleteLease implements AzureBlobLeaseInfo {
  /**
   * @property {string} offset The offset of the event to be checked in.
   */
  offset: string;
  /**
   * @property {string} sequenceNumber The sequence number of the event to be checked in.
   */
  sequenceNumber: number;
  /**
   * @property {string} token The lease token that manages concurrency between hosts. You can use
   * this token to guarantee single access to any resource needed by the EPH.
   */
  token: string;
  /**
   * @property {AzureBlob} blob Reference to the azure blob.
   */
  blob: AzureBlob;

  constructor(info: AzureBlobLeaseInfo) {
    super(info);
    this.offset = info.offset || "-1";
    this.sequenceNumber = info.sequenceNumber != undefined ? info.sequenceNumber : 0;
    this.token = info.token || "";
    this.blob = info.blob;
  }

  /**
   * Determines whether the lease is expired.
   * @returns {Promise<boolean>} Promise<boolean> `true` - expired. `false` - not expired.
   */
  async isExpired(): Promise<boolean> {
    let expired: boolean = false;
    try {
      const result = await this.blob.getBlobProperties();
      const currentState: string | undefined = result.lease ? result.lease.state : undefined;
      log.azurebloblease("[%s] [%s] Current state for the lease '%s' is: '%s'.",
        this.owner, this.partitionId, this.token, this.partitionId, currentState);
      expired = currentState !== "leased";
      log.azurebloblease("[%s] [%s] lease '%s' expired -> %s.",
        this.owner, this.partitionId, this.token, this.partitionId, expired);
    } catch (err) {
      log.error("[%s] [%s] An error occurred while determining whether the lease '%s' is expired " +
        "for partitionId '%s': %O", this.owner, this.partitionId, this.token, err);
    }
    return expired;
  }

  /**
   * Gets the lease information.
   * @returns {LeaseInfo} LeaseInfo.
   */
  getInfo(): LeaseInfo {
    const info = super.getInfo();
    (info as LeaseInfo).sequenceNumber = this.sequenceNumber;
    (info as LeaseInfo).token = this.token;
    (info as LeaseInfo).offset = this.offset;
    log.azurebloblease("[%s] [%s] Lease info is: %o", this.owner, this.partitionId, info);
    return (info as LeaseInfo);
  }

  /**
   * Serializes the lease information.
   * @returns {string} string The serialized lease info.
   */
  serialize(): string {
    return JSON.stringify(this.getInfo());
  }

  /**
   * Creates a Lease for the given partitionId.
   * @param {string} id The partitionId for which the lease needs to be created.
   * @param {AzureBlob} blob The azure blob reference
   * @returns {CompleteLease} Lease.
   */
  static createFromPartitionId(id: string, blob: AzureBlob): AzureBlobLease {
    return new AzureBlobLease({
      partitionId: id,
      epoch: -1,
      sequenceNumber: 0,
      owner: "",
      token: "",
      blob: blob,
    });
  }
}
