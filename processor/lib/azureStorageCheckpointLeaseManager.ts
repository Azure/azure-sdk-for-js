// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as debugModule from "debug";
import * as uuid from "uuid/v4";
import { CheckpointInfo } from "./checkpointInfo";
import { CheckpointManager } from "./checkpointManager";
import { LeaseManager } from "./leaseManager";
import { ProcessorContext } from "./processorContext";
import { AzureBlob } from "./azureBlob";
import { validateType } from "./util/utils";
import { Lease, LeaseInfo } from "./lease";
import { AzureBlobLease, AzureBlobLeaseInfo } from "./azureBlobLease";
import { BlobService as StorageBlobService } from "azure-storage";

const debug = debugModule("azure:event-hubs:eph:checkpointLeaseManager");

export class AzureStorageCheckpointLeaseManager implements CheckpointManager, LeaseManager {
  leaseRenewInterval: number = 10;
  leaseDuration: number = 30;
  private _context: ProcessorContext;

  constructor(context: ProcessorContext) {
    this._context = context;
  }

  getAzureBlob(partitionId: string): AzureBlob {
    validateType("partitionId", partitionId, true, "string");
    let result = this._context.blobReferenceByPartition[partitionId];
    if (!result) {
      const blobPath = `${this._context.composedBlobPrefix}${partitionId}`;
      result = new AzureBlob(this._context.hostName, this._context.storageConnectionString,
        this._context.leasecontainerName, blobPath, this._context.blobService);
      this._context.blobReferenceByPartition[partitionId] = result;
    }
    return result;
  }

  async downloadLease(partitionId: string, blob: AzureBlob): Promise<AzureBlobLease> {
    try {
      const text: string = await blob.getContent();
      const jsonLease: LeaseInfo = JSON.parse(text);
      const blobLeaseInfo: AzureBlobLeaseInfo = {
        ...jsonLease,
        blob: blob
      }
      return new AzureBlobLease(blobLeaseInfo);
    } catch (err) {
      const msg = `An error occurred while getting the content of blob ` +
        `"${this._context.composedBlobPrefix}${partitionId}". It is: \n` +
        `${err ? err.stack : JSON.stringify(err)}`;
      debug(msg);
      throw new Error(msg)
    }
  }

  async leaseStoreExists(): Promise<boolean> {
    return await this._context.blobService.doesContainerExist(this._context.leasecontainerName);
  }

  async createLeaseStoreIfNotExists(): Promise<boolean> {
    const result = await this._context.blobService.ensureContainerExists(this._context.leasecontainerName);
    return result.created != undefined;
  }

  async deleteLeaseStore(): Promise<boolean> {
    return true;
  }

  async getLease(partitionId: string): Promise<Lease | undefined> {
    validateType("partitionId", partitionId, true, "string");
    let result: Lease | undefined;
    const blob = this.getAzureBlob(partitionId);
    if (await blob.doesBlobExist()) {
      result = await this.downloadLease(partitionId, blob);
    }
    return result;
  }

  async getAllLeases(): Promise<Array<Lease | undefined>> {
    let ids = await this._context.eventHubClient.getPartitionIds();
    let result: Array<Promise<Lease | undefined>> = [];
    for (let id of ids) {
      result.push(this.getLease(id));
    }
    return await Promise.all<Lease | undefined>(result);
  }

  async createLeaseIfNotExists(partitionId: string): Promise<Lease> {
    validateType("partitionId", partitionId, true, "string");
    let returnLease: AzureBlobLease;
    try {
      const blob = this.getAzureBlob(partitionId);
      returnLease = AzureBlobLease.createFromPartitionId(partitionId, blob);
      const jsonLease: string = returnLease.serialize();
      const options: StorageBlobService.CreateBlobRequestOptions = {
        accessConditions: {
          EtagNonMatch: "*"
        }
      }
      await blob.updateContent(jsonLease, options);
    } catch (error) {
      const statusCode = (error as any).statusCode;
      // https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes
      // LeaseIdMissing || BlobAlreadyExists
      if (statusCode === 412 || statusCode === 409) {
        returnLease = <AzureBlobLease>await this.getLease(partitionId);
      } else {
        throw error;
      }
    }
    return returnLease;
  }

  async deleteLease(lease: Lease): Promise<boolean> {
    return await (<AzureBlobLease>lease).blob.deleteBlobIfExists();
  }

  async acquireLease(lease: Lease): Promise<boolean> {
    const blobLease: AzureBlobLease = lease as AzureBlobLease;
    let result: boolean = true;
    const newLeaseId: string = uuid();
    const partitionId: string = lease.partitionId;
    try {
      // TODO: We are initializing newToken to empty string.
      let newToken: string = "";
      const blobResult = await blobLease.blob.getBlobProperties();
      if (blobResult.lease && blobResult.lease.state && blobResult.lease.state === "leased") {
        if (!blobLease.token) {
          // We reach here in a race condition: when this instance of EventProcessorHost scanned the
          // lease blobs, this partition was unowned (token is empty) but between then and now, another
          // instance of EPH has established a lease (getLeaseState() is LEASED). We normally enforce
          // that we only steal the lease if it is still owned by the instance which owned it when we
          // scanned, but we can't do that when we don't know who owns it. The safest thing to do is just
          // fail the acquisition. If that means that one EPH instance gets more partitions than it should,
          // rebalancing will take care of that quickly enough.
          return false;
        }
        const changeLeaseResult = await blobLease.blob.changeLease(blobLease.token, newLeaseId);
        newToken = changeLeaseResult.id;
      } else {
        try {
          const options: StorageBlobService.AcquireLeaseRequestOptions = {
            leaseDuration: this.leaseDuration,
            proposedLeaseId: newLeaseId
          }
          const acquireResult = await blobLease.blob.acquireLease(options);
          newToken = acquireResult.id;
        } catch (err) {
          const statusCode = err && (err as any).statusCode;
          const code = err && (err as any).code;
          if (statusCode === 409 && code === "LeaseAlreadyPresent") {
            // Either some other host grabbed the lease or checkpoint call renewed it.
            return false;
          }
        }
      }
      blobLease.token = newToken;
      blobLease.owner = this._context.hostName;
      // Increment epoch each time lease is acquired or stolen by a new host
      lease.incrementEpoch();
      const options: StorageBlobService.CreateBlobRequestOptions = {
        leaseId: lease.token
      };
      await blobLease.blob.updateContent(blobLease.serialize(), options);
    } catch (err) {
      // TODO: HandleStorageError
    }
    return result;
  }

  async renewLease(lease: Lease): Promise<boolean> {
    const blobLease: AzureBlobLease = lease as AzureBlobLease;
    try {
      const options: StorageBlobService.LeaseRequestOptions = {
        timeoutIntervalInMs: this.leaseRenewInterval,
        maximumExecutionTimeInMs: 60000
      };
      await blobLease.blob.renewLease(lease.token, options);
    } catch (err) {
      // TODO: HandleStorageError
    }
    return true;
  }

  async releaseLease(lease: Lease): Promise<boolean> {
    const blobLease: AzureBlobLease = lease as AzureBlobLease;
    try {
      const leaseId: string = blobLease.token;
      const releasedCopy = new AzureBlobLease({ ...blobLease.getInfo(), blob: blobLease.blob });
      releasedCopy.owner = "";
      releasedCopy.token = "";
      const options: StorageBlobService.CreateBlobRequestOptions = {
        leaseId: leaseId
      };
      await blobLease.blob.updateContent(releasedCopy.serialize(), options);
      await blobLease.blob.releaseLease(leaseId);
    } catch (err) {
      // TODO: HandleStorageError
    }
    return true;
  }

  async updateLease(lease: Lease): Promise<boolean> {
    if (lease == undefined) {
      return false;
    }

    if (!lease.token) {
      return false;
    }

    // First, renew the lease to make sure the update will go through.
    await this.renewLease(lease);
    try {
      const jsonToUpload = lease.serialize();
      const options: StorageBlobService.CreateBlobRequestOptions = {
        leaseId: lease.token
      };
      await (<AzureBlobLease>lease).blob.updateContent(jsonToUpload, options);
    } catch (err) {
      // TODO: HandleStorageError
    }
    return true;
  }

  async checkpointStoreExists(): Promise<boolean> {
    return await this.leaseStoreExists();
  }

  async createCheckpointStoreIfNotExists(): Promise<boolean> {
    return this.createLeaseStoreIfNotExists();
  }

  async getCheckpoint(partitionId: string): Promise<CheckpointInfo | undefined> {
    validateType("partitionId", partitionId, true, "string");
    let result: CheckpointInfo | undefined;
    const lease: Lease | undefined = await this.getLease(partitionId);
    if (lease != undefined && lease.offset != undefined) {
      // TODO: Currently leaseinfo and checkpointinfo are identical in structure.
      result = lease.getInfo();
    }
    return result;
  }
  async updateCheckpoint(lease: Lease, checkpoint: CheckpointInfo): Promise<boolean> {
    // TODO: check if owner, epoch, token also get updated properly.
    lease.offset = checkpoint.offset;
    lease.sequenceNumber = checkpoint.sequenceNumber;
    return await this.updateLease(lease);
  }

  async deleteCheckpoint(partitionId: string): Promise<void> {
    validateType("partitionId", partitionId, true, "string");
    // This is a no-op to avoid deleting leases accidentally.
  }
}