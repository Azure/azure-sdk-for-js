// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { LeaseInfo, Lease } from "./lease";
import { AzureBlob } from "./azureBlob";
import * as log from "./log";

export interface AzureBlobLeaseInfo extends LeaseInfo {
  /**
   * @property {AzureBlob} blob Reference to the azure blob.
   */
  blob: AzureBlob;
}

export class AzureBlobLease extends Lease implements AzureBlobLeaseInfo {
  /**
   * @property {AzureBlob} blob Reference to the azure blob.
   */
  blob: AzureBlob;

  constructor(info: AzureBlobLeaseInfo) {
    super(info);
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
      log.azurebloblease("[%s] Current state for the lease '%s' for partitionId: '%s' is: '%s'.",
        this.owner, this.token, this.partitionId, currentState);
      expired = currentState !== "leased";
      log.azurebloblease("[%s] lease '%s' for partitionId: '%s' expired -> %s.",
        this.owner, this.token, this.partitionId, expired);
    } catch (err) {
      log.error("[%s] An error occurred while determining whether the blob " +
        "is expired for lease '%s' for partitionId '%s': %O", this.owner, this.token,
        this.partitionId, err);
    }
    return expired;
  }

  /**
   * Creates a Lease for the given partitionId.
   * @param {string} id The partitionId for which the lease needs to be created.
   * @param {AzureBlob} blob The azure blob reference
   * @returns {Lease} Lease.
   */
  static createFromPartitionId(id: string, blob: AzureBlob): AzureBlobLease {
    return new AzureBlobLease({
      partitionId: id,
      epoch: 0,
      sequenceNumber: 0,
      owner: "",
      token: "",
      blob: blob
    });
  }
}
