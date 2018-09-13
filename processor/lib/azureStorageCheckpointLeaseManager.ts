// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as uuid from "uuid/v4";
import { CheckpointInfo } from "./checkpointInfo";
import { CheckpointManager } from "./checkpointManager";
import { LeaseManager } from "./leaseManager";
import { BaseHostContext } from "./hostContext";
import { AzureBlob } from "./azureBlob";
import { validateType, getStorageError, EPHActionStrings } from "./util/utils";
import { CompleteLease } from "./completeLease";
import { AzureBlobLease, AzureBlobLeaseInfo, LeaseInfo } from "./azureBlobLease";
import { BlobService as StorageBlobService, StorageError } from "azure-storage";
import { LeaseState } from "./blobService";
import { BaseLease, BaseLeaseInfo } from "./baseLease";
import { EPHDiagnosticInfo } from "./modelTypes";
import {
  maximumExecutionTimeInMsForLeaseRenewal, metadataOwnerName, leaseLost,
  leaseIdMismatchWithLeaseOperation, leaseIdMismatchWithBlobOperation
} from "./util/constants";
import * as log from "./log";
const path = require("path-browserify");

/**
 * @ignore
 */
enum UploadActivity {
  create = "create",
  acquire = "acquire",
  release = "release",
  update = "update"
}

/**
 * @ignore
 */
export class AzureStorageCheckpointLeaseManager implements CheckpointManager, LeaseManager {
  leaseRenewInterval: number;
  leaseDuration: number;
  private _context: BaseHostContext;
  private _latestCheckpoint: Map<string, CheckpointInfo> = new Map<string, CheckpointInfo>();

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
        this._context.storageContainerName!, blobPath, this._context.blobService);
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
      log.error(this._context.withHost(msg));
      throw new Error(msg);
    }
  }

  async leaseStoreExists(): Promise<boolean> {
    return await this._context.blobService!.doesContainerExist(this._context.storageContainerName!);
  }

  async createLeaseStoreIfNotExists(): Promise<void> {
    await this._context.blobService!.ensureContainerExists(this._context.storageContainerName!);
    return;
  }

  async deleteLeaseStore(): Promise<void> {
    const blobService = this._context.blobService;
    const storageContainerName = this._context.storageContainerName!;
    try {
      if (blobService) {
        const listResult = await blobService.listBlobsSegmented(storageContainerName);
        const deleteBlobs: Promise<void>[] = [];
        for (const blob of listResult.entries) {
          deleteBlobs.push(blobService.deleteBlobIfExists(storageContainerName, blob.name));
        }
        await Promise.all(deleteBlobs);
        await blobService.deleteContainerIfExists(storageContainerName);
      } else {
        throw new Error("'blobService' is not defined in the 'hostContext', hence cannot " +
          "list all the blobs.");
      }
    } catch (err) {
      const msg = `An error occurred while deleting the lease store '${storageContainerName}': %O` +
        `${err ? err.stack : JSON.stringify(err)}`;
      log.error(this._context.withHost(msg));
      const info: EPHDiagnosticInfo = {
        error: new Error(msg),
        hostName: this._context.hostName,
        partitionId: "N/A",
        action: EPHActionStrings.deletingLeaseStore
      };
      this._context.onEphError(info);
    }
  }

  async getLease(partitionId: string): Promise<AzureBlobLease | undefined> {
    validateType("partitionId", partitionId, true, "string");
    let result: AzureBlobLease | undefined;
    const blob = this.getAzureBlob(partitionId);
    const withHostAndPartition = this._context.withHostAndPartition;
    log.checkpointLeaseMgr(withHostAndPartition(partitionId, "Getting lease."));
    try {
      if (await blob.doesBlobExist()) {
        result = await this.downloadLease(partitionId, blob);
      }
    } catch (err) {
      const msg = `An error occurred while getting lease for partitionId '${partitionId}': \n` +
        `${err ? err.stack : JSON.stringify(err)}`;
      log.error(withHostAndPartition(partitionId, msg));
      throw new Error(msg);
    }
    return result;
  }

  async getAllLeases(): Promise<BaseLease[]> {
    const result: BaseLease[] = [];
    const withHost = this._context.withHost;
    const withHostAndPartition = this._context.withHostAndPartition;
    try {
      const leaseBlobs: StorageBlobService.BlobResult[] = await this._listBlobs();
      for (const lbi of leaseBlobs) {
        const name = lbi.name;
        const partitionId = path.basename(name);
        const leaseInfo: BaseLeaseInfo = {
          partitionId: partitionId,
          owner: lbi.metadata![metadataOwnerName]
        };
        const lease = new BaseLease(leaseInfo);
        lease.isOwned = (lbi.lease && lbi.lease.state === LeaseState.leased) || false;
        result.push(lease);
        log.checkpointLeaseMgr(withHostAndPartition(partitionId, "BlobResult item from the list " +
          "of blobs is: name: %s, lease: %o, metadata: %o."), lbi.name, lbi.lease, lbi.metadata);
      }
    } catch (err) {
      const info: EPHDiagnosticInfo = {
        error: err,
        action: EPHActionStrings.gettingAllLeases,
        hostName: this._context.hostName,
        partitionId: "N/A"
      };
      this._context.onEphError(info);
    }
    log.checkpointLeaseMgr(withHost("Number of leases: %d"), result.length);
    return result;
  }

  async createAllLeasesIfNotExists(partitionIds: string[]): Promise<void> {
    try {
      const withHost = this._context.withHost;
      const leaseBlobs = await this._listBlobs();
      if (leaseBlobs.length === partitionIds.length) {
        log.checkpointLeaseMgr(withHost("Number of blobs %d === Number of partitionIds %d. " +
          "Hence no need to create leases."), leaseBlobs.length, partitionIds.length);
        return;
      } else {
        const createPromises: Promise<CompleteLease>[] = [];
        for (const id of partitionIds) {
          const createPromise: Promise<CompleteLease> = this.createLeaseIfNotExists(id);
          createPromises.push(createPromise);
        }
        await Promise.all(createPromises);
      }
    } catch (err) {
      const info: EPHDiagnosticInfo = {
        error: err,
        action: EPHActionStrings.creatingAllLeases,
        hostName: this._context.hostName,
        partitionId: "N/A"
      };
      this._context.onEphError(info);
      throw err;
    }
  }

  async createLeaseIfNotExists(partitionId: string): Promise<CompleteLease> {
    validateType("partitionId", partitionId, true, "string");
    const withHostAndPartition = this._context.withHostAndPartition;
    log.checkpointLeaseMgr(withHostAndPartition(partitionId, "createLeaseIfNotExists."));
    let returnLease: AzureBlobLease;
    try {
      const blob = this.getAzureBlob(partitionId);
      returnLease = AzureBlobLease.createFromPartitionId(partitionId, blob);
      await this._uploadLease(returnLease, UploadActivity.create);
    } catch (error) {
      const statusCode = (error as StorageError).statusCode;
      const code = (error as StorageError).code;
      // https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-error-codes
      // LeaseIdMissing || BlobAlreadyExists
      if ((statusCode === 412 && code && code.toLowerCase() === "leaseidmissing") ||
        (statusCode === 409 && code && code.toLowerCase() === "blobalreadyexists")) {
        returnLease = <AzureBlobLease>await this.getLease(partitionId);
      } else {
        log.error(withHostAndPartition(partitionId, "An error occurred while creating lease if " +
          "it does not exist: %O."), error);
        throw error;
      }
    }
    return returnLease;
  }

  async deleteLease(lease: AzureBlobLease): Promise<void> {
    try {
      return await (lease).blob.deleteBlobIfExists();
    } catch (err) {
      const msg = `An error occurred while deleting the lease for blobPath ` +
        `"${this._context.composedBlobPrefix}${lease.partitionId}". It is: \n` +
        `${err ? err.stack : JSON.stringify(err)}`;
      log.error(this._context.withHostAndPartition(lease, msg));
      throw new Error(msg);
    }
  }

  async acquireLease(lease: AzureBlobLease): Promise<boolean> {
    let result: boolean = true;
    const newLeaseId: string = uuid();
    const withHostAndPartition = this._context.withHostAndPartition;
    try {
      // TODO: We are initializing newToken to empty string.
      let newToken: string = "";
      const blobResult = await lease.blob.getBlobProperties();
      if (blobResult.lease && blobResult.lease.state && blobResult.lease.state === "leased") {
        if (!lease.token) {
          // We reach here in a race condition: when this instance of EventProcessorHost scanned the
          // lease blobs, this partition was unowned (token is empty) but between then and now, another
          // instance of EPH has established a lease (getLeaseState() is LEASED). We normally enforce
          // that we only steal the lease if it is still owned by the instance which owned it when we
          // scanned, but we can't do that when we don't know who owns it. The safest thing to do is just
          // fail the acquisition. If that means that one EPH instance gets more partitions than it should,
          // rebalancing will take care of that quickly enough.
          return false;
        }
        log.checkpointLeaseMgr(withHostAndPartition(lease, "Need to change lease '%s' -> '%s' " +
          "for partitionId '%s'."), lease.token, newLeaseId, lease.partitionId);
        const changeLeaseResult = await lease.blob.changeLease(lease.token, newLeaseId);
        newToken = changeLeaseResult.id;
      } else {
        try {
          const options: StorageBlobService.AcquireLeaseRequestOptions = {
            leaseDuration: this.leaseDuration,
            proposedLeaseId: newLeaseId
          };
          const acquireResult = await lease.blob.acquireLease(options);
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
      lease.token = newToken;
      lease.owner = this._context.hostName;
      // Increment epoch each time lease is acquired or stolen by a new host
      lease.incrementEpoch();
      await this._uploadLease(lease, UploadActivity.acquire);
    } catch (err) {
      if (this._wasLeaseLost(lease.partitionId, err)) {
        result = false;
      } else {
        throw err;
      }
    }
    return result;
  }

  async renewLease(lease: AzureBlobLease): Promise<boolean> {
    let result: boolean = false;
    try {
      const options: StorageBlobService.LeaseRequestOptions = {
        timeoutIntervalInMs: this.leaseRenewInterval * 1000,
        maximumExecutionTimeInMs: maximumExecutionTimeInMsForLeaseRenewal
      };
      await lease.blob.renewLease(lease.token, options);
      result = true;
    } catch (err) {
      if (!this._wasLeaseLost(lease.partitionId, err)) {
        throw err;
      }
    }
    return result;
  }

  async releaseLease(lease: AzureBlobLease): Promise<void> {
    const withHostAndPartition = this._context.withHostAndPartition;
    try {
      const leaseId: string = lease.token;
      log.checkpointLeaseMgr(withHostAndPartition(lease, "Trying to release the lease."));
      const releasedCopy = new AzureBlobLease({ ...lease.getInfo(), blob: lease.blob });
      releasedCopy.owner = "";
      releasedCopy.token = "";
      await this._uploadLease(lease, UploadActivity.release);
      await lease.blob.releaseLease(leaseId);
    } catch (err) {
      if (!this._wasLeaseLost(lease.partitionId, err)) {
        throw err;
      }
    }
    return;
  }

  async updateLease(lease: AzureBlobLease): Promise<boolean> {
    const withHostAndPartition = this._context.withHostAndPartition;
    if (lease == undefined) {
      return false;
    }

    if (!lease.token) {
      return false;
    }

    log.checkpointLeaseMgr(withHostAndPartition(lease, "Let us renew the lease to make sure the " +
      "update with offset '%s' and sequence number %d will go through."), lease.offset,
      lease.sequenceNumber);
    let result = await this.renewLease(lease);
    if (result) {
      try {
        await this._uploadLease(lease, UploadActivity.update);
      } catch (err) {
        if (this._wasLeaseLost(lease.partitionId, err)) {
          result = false;
        } else {
          throw err;
        }
      }
    }
    // else could not renew lease due to lease loss. Result is already false, so pass it unchanged
    return result;
  }

  async checkpointStoreExists(): Promise<boolean> {
    log.checkpointLeaseMgr(this._context.withHost("Checking whether the checkpoint store exists."));
    return await this.leaseStoreExists();
  }

  async deleteCheckpointStore(): Promise<void> {
    return this.deleteLeaseStore();
  }

  async createCheckpointStoreIfNotExists(): Promise<void> {
    // This is a no-op since this method will be called only creating the lease store.
    // The lease store and the checkpoint store are the same thing.
    return;
  }

  async createAllCheckpointsIfNotExists(partitionIds: string[]): Promise<void> {
    validateType("partitionIds", partitionIds, true, "Array");
    // Because we control the caller, we know that this method will only be called after
    // createAllLeasesIfNotExists. In this implementation checkpoints are in the same
    // blobs as leases, so the blobs will already exist if execution reaches here.
    return;
  }

  async getCheckpoint(partitionId: string): Promise<CheckpointInfo | undefined> {
    validateType("partitionId", partitionId, true, "string");
    const withHostAndPartition = this._context.withHostAndPartition;
    let result: CheckpointInfo | undefined;
    log.checkpointLeaseMgr(withHostAndPartition(partitionId, "Getting checkpoint."));
    const lease: AzureBlobLease | undefined = await this.getLease(partitionId);
    if (lease != undefined && lease.offset) {
      result = CheckpointInfo.createFromLease(lease.getInfo());
    }
    return result;
  }

  async updateCheckpoint(lease: AzureBlobLease, checkpoint: CheckpointInfo): Promise<void> {
    const withHostAndPartition = this._context.withHostAndPartition;
    log.checkpointLeaseMgr(withHostAndPartition(checkpoint, "Checkpoint at offset '%s' and seqno %d."),
      checkpoint.offset, checkpoint.sequenceNumber);
    lease.offset = checkpoint.offset;
    lease.sequenceNumber = checkpoint.sequenceNumber;
    try {
      if (await this.updateLease(lease)) {
        return;
      } else {
        const msg = `Lease lost while updating the checkpoint for partitionId ` +
          `'${checkpoint.partitionId}'.Hence could not update it.`;
        log.error(withHostAndPartition(lease, msg));
        throw new Error(msg);
      }
    } catch (err) {
      const info: EPHDiagnosticInfo = {
        action: EPHActionStrings.updatingCheckpoint,
        error: err,
        hostName: this._context.hostName,
        partitionId: checkpoint.partitionId
      };
      this._context.onEphError(info);
    }
  }

  async deleteCheckpoint(partitionId: string): Promise<void> {
    validateType("partitionId", partitionId, true, "string");
    // This is a no-op to avoid deleting leases accidentally.
  }

  private async _listBlobs(): Promise<StorageBlobService.BlobResult[]> {
    const blobService = this._context.blobService;
    const withHost = this._context.withHost;
    if (blobService) {
      const listResult = await blobService.listBlobsSegmented(this._context.storageContainerName!);
      log.checkpointLeaseMgr(withHost("Number of blobs: %d"), listResult.entries.length);
      return listResult.entries;
    } else {
      throw new Error("'blobService' is not defined in the 'hostContext', hence cannot " +
        "list all the blobs.");
    }
  }

  private async _uploadLease(lease: AzureBlobLease, activity: UploadActivity,
    options?: StorageBlobService.CreateBlobRequestOptions): Promise<void> {
    const partitionId = lease.partitionId;
    const blob = lease.blob;
    const withHostAndPartition = this._context.withHostAndPartition;
    if (activity !== UploadActivity.create) {
      // It is possible for AzureBlobLease objects in memory to have stale offset/sequence number
      // fields if a checkpoint was written but PartitionManager hasn't done its ten-second sweep
      // which downloads new copies of all the leases. This can happen because we're trying to
      // maintain the fiction that checkpoints and leases are separate -- which they can be in
      // other implementations -- even though they are completely intertwined in this
      // implementation. To prevent writing stale checkpoint data to the store, merge the
      // checkpoint data from the most recently written checkpoint into this write, if needed.
      if (this._latestCheckpoint.has(partitionId)) {
        const cached: CheckpointInfo = this._latestCheckpoint.get(partitionId)!;
        if (cached.sequenceNumber > lease.sequenceNumber || lease.offset == undefined) {
          lease.offset = cached.offset,
            lease.sequenceNumber = cached.sequenceNumber;
          log.checkpointLeaseMgr(withHostAndPartition(lease, "Updating stale offset/seqno with " +
            "new values %s/%d while uploading lease."), lease.offset, lease.sequenceNumber);
        } else if (lease.offset != undefined) {
          this._latestCheckpoint.set(partitionId, CheckpointInfo.createFromLease(lease.getInfo()));
        }
      }
    }
    const jsonToUpload = lease.serialize();
    if (!options) {
      options = {
        leaseId: lease.token,
      };
    }
    if (!options.metadata) options.metadata = {};
    // - For "acquire" and "update" activities, the metadata must be set, since that is the time
    // when the host actually owns the lease. If metadata is not set for update activity
    // (i.e. while checkpointing), then the metadata is wiped off (over-written).
    // This causes problems for the partition scanner while trying to determine the lease owner.
    // - For "release" activity the metadata needs to be deleted/unset, since the intention is to
    // not own the lease anymore (due to lease being lost or the receiver shutting down). Hence,
    // setting the metadata as an empty object.
    // - For "create" activity, the intention is to create a lease if it does not exist, but not own
    // it. The lease state will be available and the status will be unlocked. Hence setting the
    // metadata as an empty object.
    if (activity === UploadActivity.acquire || activity === UploadActivity.update) {
      options.metadata[metadataOwnerName] = lease.owner || this._context.hostName;
    }
    log.checkpointLeaseMgr(withHostAndPartition(lease, "Trying to upload raw JSON for activity " +
      "'%s': %s, with options: %o"), activity, jsonToUpload, options);
    await blob.updateContent(jsonToUpload, options);
  }

  private _wasLeaseLost(partitionId: string, err: StorageError): boolean {
    let result: boolean = false;
    const statusCode = err.statusCode;
    const code = err.code;
    const withHostAndPartition = this._context.withHostAndPartition;
    // conflict OR precondition failed.
    if (statusCode && statusCode === 409 || statusCode === 412) {
      if (!code || (code &&
        (code.toLowerCase() === leaseLost ||
          code.toLowerCase() === leaseIdMismatchWithLeaseOperation ||
          code.toLowerCase() === leaseIdMismatchWithBlobOperation))) {
        result = true;
      }
    }
    log.error(withHostAndPartition(partitionId, "Was lease lost -> %s, err: %O."),
      result, getStorageError(err));
    return result;
  }
}
