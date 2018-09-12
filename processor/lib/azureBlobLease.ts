// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { CompleteLeaseInfo, CompleteLease } from "./completeLease";
import { AzureBlob } from "./azureBlob";
import * as log from "./log";

/**
 * Describes the properties of a lease.
 * @interface LeaseInfo
 */
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

/**
 * Describes the properties of a lease representing an Azure Blob.
 * @interface AzureBlobLeaseInfo
 */
export interface AzureBlobLeaseInfo extends LeaseInfo {
  /**
   * @property {AzureBlob} blob Reference to the azure blob.
   */
  blob: AzureBlob;
}

/**
 * Describes the lease used with an Azure Blob for storing the checkpoint information.
 */
export class AzureBlobLease extends CompleteLease implements AzureBlobLeaseInfo {

  // It is important to keep the offset optional. While getting the startingCheckpoint in
  // PartitionContext.getInitialOffset(), we internally call leaseManager.getCheckpoint() which will
  // return undefined, if the offset is undefined. At that time, if the user had provided
  // initialOffset using the EPHOptions then that will be used. Thus not initializing the offset
  // with default value of "-1" is crucial to ensure that user provided initial offset is honored
  // when a new lease container is used.
  /**
   * @property {string} offset The offset of the event to be checked in.
   */
  offset?: string;
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
    this.offset = info.offset;
    this.sequenceNumber = info.sequenceNumber != undefined ? info.sequenceNumber : 0;
    this.token = info.token || "";
    this.blob = info.blob;
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
