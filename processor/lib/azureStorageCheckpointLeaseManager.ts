// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as uuid from "uuid/v4";
import { CheckpointInfo } from "./checkpointInfo";
import { CheckpointManager } from "./checkpointManager";
import { LeaseManager } from "./leaseManager";
import { BaseHostContext, HostContext } from "./hostContext";
import { AzureBlob } from "./azureBlob";
import { validateType, getStorageError, retry, RetryConfig, EPHActionStrings } from "./util/utils";
import { Lease, LeaseInfo, LeaseLostError } from "./lease";
import { AzureBlobLease, AzureBlobLeaseInfo } from "./azureBlobLease";
import { BlobService as StorageBlobService, StorageError } from "azure-storage";
import * as log from "./log";
import { maximumExecutionTimeInMsForLeaseRenewal } from "./util/constants";


/**
 * @ignore
 */
export class AzureStorageCheckpointLeaseManager implements CheckpointManager, LeaseManager {
  leaseRenewInterval: number;
  leaseDuration: number;
  private _context: BaseHostContext;

  constructor(context: BaseHostContext) {
    this._context = context;
    this.leaseDuration = this._context.leaseDuration;
    this.leaseRenewInterval = this._context.leaseRenewInterval;
  }

  getAzureBlob(partitionId: string): AzureBlob {
    validateType("partitionId", partitionId, true, "string");
    let result = this._context.blobReferenceByPartition[partitionId];
    if (!result) {
      const blobPath = `${this._context.composedBlobPrefix}${partitionId}`;
      result = new AzureBlob(this._context.hostName, this._context.storageConnectionString!,
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
      };
      return new AzureBlobLease(blobLeaseInfo);
    } catch (err) {
      const msg = `An error occurred while downloading the lease for blobPath ` +
        `"${this._context.composedBlobPrefix}${partitionId}". It is: \n` +
        `${err ? err.stack : JSON.stringify(err)}`;
      log.error(msg);
      throw new Error(msg);
    }
  }

  async leaseStoreExists(): Promise<boolean> {
    return await this._context.blobService!.doesContainerExist(this._context.leasecontainerName);
  }

  async createLeaseStoreIfNotExists(): Promise<boolean> {
    const result = await this._context.blobService!.ensureContainerExists(this._context.leasecontainerName);
    return result.created != undefined;
  }

  async deleteLeaseStore(): Promise<boolean> {
    return true;
  }

  async getLease(partitionId: string): Promise<Lease | undefined> {
    validateType("partitionId", partitionId, true, "string");
    let result: Lease | undefined;
    const blob = this.getAzureBlob(partitionId);
    log.checkpointLeaseMgr("[%s] Getting lease for partitionId '%s'.", this._context.hostName,
      partitionId);
    if (await blob.doesBlobExist()) {
      result = await this.downloadLease(partitionId, blob);
    }
    return result;
  }

  async getAllLeases(): Promise<Array<Promise<Lease | undefined>>> {
    const result: Array<Promise<Lease | undefined>> = [];
    try {
      let ids: string[] = this._context.partitionIds || [];

      if (!ids.length) {
        const config: RetryConfig<string[]> = {
          operation: () => (this._context as HostContext).getPartitionIds(),
          hostName: this._context.hostName,
          action: EPHActionStrings.gettingAllLeases,
          maxRetries: 5,
          finalFailureMessage: "Failure getting all the partitions while getting all leases, retrying.",
          retryMessage: "Out of retries for getting all the partitions while getting all leases."
        };
        ids = await retry<string[]>(config);
        this._context.partitionIds = ids;
      }
      for (const id of ids) {
        result.push(this.getLease(id));
      }
    } catch (err) {
      this._context.onEphError(err);
    }
    log.checkpointLeaseMgr("[%s] Promises of number of leases to get: %d", this._context.hostName,
      result.length);
    return result;
  }

  async createLeaseIfNotExists(partitionId: string): Promise<Lease> {
    validateType("partitionId", partitionId, true, "string");
    log.checkpointLeaseMgr("[%s] createLeaseIfNotExists for partitionId '%s'.",
      this._context.hostName, partitionId);
    let returnLease: AzureBlobLease;
    try {
      const blob = this.getAzureBlob(partitionId);
      returnLease = AzureBlobLease.createFromPartitionId(partitionId, blob);
      const jsonLease: string = returnLease.serialize();
      const options: StorageBlobService.CreateBlobRequestOptions = {
        accessConditions: {
          EtagNonMatch: "*"
        }
      };
      await blob.updateContent(jsonLease, options);
    } catch (error) {
      const statusCode = (error as StorageError).statusCode;
      const code = (error as StorageError).code;
      // https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes
      // LeaseIdMissing || BlobAlreadyExists
      if ((statusCode === 412 && code && code.toLowerCase() === "leaseidmissing") ||
        (statusCode === 409 && code && code.toLowerCase() === "blobalreadyexists")) {
        returnLease = <AzureBlobLease>await this.getLease(partitionId);
      } else {
        log.error("[%s] An error occurred while creating lease if it does not exist: %O.",
          this._context.hostName, error);
        throw error;
      }
    }
    return returnLease;
  }

  async createAllLeasesIfNotExists(partitionIds: string[]): Promise<void> {

  }

  async deleteLease(lease: Lease): Promise<boolean> {
    return await (<AzureBlobLease>lease).blob.deleteBlobIfExists();
  }

  async acquireLease(lease: Lease): Promise<boolean> {
    const blobLease: AzureBlobLease = lease as AzureBlobLease;
    const result: boolean = true;
    const newLeaseId: string = uuid();
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
        log.checkpointLeaseMgr("[%s] Need to change lease '%s' -> '%s' for partitionId '%s'.",
          this._context.hostName, blobLease.token, newLeaseId, blobLease.partitionId);
        const changeLeaseResult = await blobLease.blob.changeLease(blobLease.token, newLeaseId);
        newToken = changeLeaseResult.id;
      } else {
        try {
          const options: StorageBlobService.AcquireLeaseRequestOptions = {
            leaseDuration: this.leaseDuration,
            proposedLeaseId: newLeaseId
          };
          const acquireResult = await blobLease.blob.acquireLease(options);
          newToken = acquireResult.id;
        } catch (err) {
          const statusCode = err && (err as StorageError).statusCode;
          const code = err && (err as StorageError).code;
          if (statusCode === 409 && code && code.toLowerCase() === "leasealreadypresent") {
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
      throw this._handleStorageError(lease.partitionId, err);
    }
    return result;
  }

  async renewLease(lease: Lease): Promise<boolean> {
    const blobLease: AzureBlobLease = lease as AzureBlobLease;
    try {
      const options: StorageBlobService.LeaseRequestOptions = {
        timeoutIntervalInMs: this.leaseRenewInterval * 1000,
        maximumExecutionTimeInMs: maximumExecutionTimeInMsForLeaseRenewal
      };
      await blobLease.blob.renewLease(lease.token, options);
    } catch (err) {
      throw this._handleStorageError(lease.partitionId, err);
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
      throw this._handleStorageError(lease.partitionId, err);
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

    log.checkpointLeaseMgr("[%s] Let us renew the lease to make sure the update with offset '%s'" +
      "and sequence number %d will go through.", this._context.hostName, lease.offset,
      lease.sequenceNumber);
    await this.renewLease(lease);
    try {
      const jsonToUpload = lease.serialize();
      const options: StorageBlobService.CreateBlobRequestOptions = {
        leaseId: lease.token
      };
      await (<AzureBlobLease>lease).blob.updateContent(jsonToUpload, options);
    } catch (err) {
      throw this._handleStorageError(lease.partitionId, err);
    }
    return true;
  }

  async checkpointStoreExists(): Promise<boolean> {
    log.checkpointLeaseMgr("[%s] Checking whether the checkpoint store exists.", this._context.hostName);
    return await this.leaseStoreExists();
  }

  async createCheckpointStoreIfNotExists(): Promise<boolean> {
    log.checkpointLeaseMgr("[%s] Creating checkpointstore if not exist.", this._context.hostName);
    return this.createLeaseStoreIfNotExists();
  }

  async createCheckpointIfNotExists(partitionId: string): Promise<CheckpointInfo> {
    validateType("partitionId", partitionId, true, "string");
    log.checkpointLeaseMgr("[%s] Creating checkpoint if not exist for partitionId '%s'.",
      this._context.hostName, partitionId);
    const lease: AzureBlobLease = <AzureBlobLease>await this.createLeaseIfNotExists(partitionId);
    const checkpoint: CheckpointInfo = CheckpointInfo.createFromLease(lease.getInfo());
    return checkpoint;
  }

  async createAllCheckpointsIfNotExists(partitionIds: string[]): Promise<void> {
    validateType("partitionIds", partitionIds, true, "Array");
    // Because we control the caller, we know that this method will only be called after createAllLeasesIfNotExists.
    // In this implementation checkpoints are in the same blobs as leases, so the blobs will already exist if execution reaches here.
    return;
  }

  async getCheckpoint(partitionId: string): Promise<CheckpointInfo | undefined> {
    validateType("partitionId", partitionId, true, "string");
    let result: CheckpointInfo | undefined;
    log.checkpointLeaseMgr("[%s] Getting checkpoint for partitionId '%s'.", this._context.hostName,
      partitionId);
    const lease: Lease | undefined = await this.getLease(partitionId);
    if (lease != undefined && lease.offset != undefined) {
      result = CheckpointInfo.createFromLease(lease.getInfo());
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

  private _handleStorageError(partitionId: string, err: StorageError): Error {
    log.error("[%s] HandleStorageError -> partitionId: '%s', err: %O", this._context.hostName,
      partitionId, getStorageError(err));
    const statusCode = err.statusCode;
    const code = err.code;
    // conflict OR precondition failed.
    if (statusCode && statusCode === 409 || statusCode === 412) {
      if (!code || (code &&
        (code.toLowerCase() === "leaselost" ||
          code.toLowerCase() === "leaseidmismatchwithleaseoperation" ||
          code.toLowerCase() === "leaseidmismatchwithbloboperation"))) {
        return new LeaseLostError(partitionId, `Lease for partitionId "${partitionId}" lost.`, err);
      }
    }
    return err;
  }
}
