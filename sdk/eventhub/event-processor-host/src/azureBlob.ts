// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { BlobService, CreateContainerResult } from "./blobService";
import { BlobService as StorageBlobService } from "azure-storage";
import { Dictionary } from "@azure/event-hubs";

/**
 * @ignore
 */
export class AzureBlob {
  private _blobService: BlobService;
  private _containerName: string;
  private _blobPath: string;
  private _containerAndBlobExist: boolean = false;

  constructor(
    hostName: string,
    connectionString: string,
    containerName: string,
    blob: string,
    blobService?: BlobService
  ) {
    this._blobPath = blob;
    this._containerName = containerName;
    this._blobService = blobService || BlobService.create(hostName, connectionString);
  }

  async ensureContainerAndBlobExist(): Promise<void> {
    try {
      if (!this._containerAndBlobExist) {
        await this._blobService.ensureContainerAndBlobExist(this._containerName, this._blobPath);
        this._containerAndBlobExist = true;
      }
    } catch (err) {
      const msg =
        `An error occurred while ensuring that the container and blob exists. ` +
        `It is: \n${err ? err.stack : JSON.stringify(err)}`;
      throw new Error(msg);
    }
  }

  ensureContainerExists(): Promise<CreateContainerResult> {
    return this._blobService.ensureContainerExists(this._containerName);
  }

  doesContainerExist(): Promise<boolean> {
    return this._blobService.doesContainerExist(this._containerName);
  }

  doesBlobExist(): Promise<boolean> {
    return this._blobService.doesBlobExist(this._containerName, this._blobPath);
  }

  ensureBlobExists(text: string): Promise<void> {
    return this._blobService.ensureBlobExists(this._containerName, this._blobPath, text);
  }

  renewLease(
    leaseId: string,
    options: StorageBlobService.LeaseRequestOptions
  ): Promise<StorageBlobService.LeaseResult> {
    return this._blobService.renewLease(this._containerName, this._blobPath, leaseId, options);
  }

  releaseLease(
    leaseId: string,
    options?: StorageBlobService.LeaseRequestOptions
  ): Promise<StorageBlobService.LeaseResult> {
    return this._blobService.releaseLease(this._containerName, this._blobPath, leaseId, options);
  }

  updateContent(
    text: string,
    options?: StorageBlobService.CreateBlobRequestOptions
  ): Promise<StorageBlobService.BlobResult> {
    return this._blobService.updateContent(this._containerName, this._blobPath, text, options);
  }

  getContent(options?: StorageBlobService.GetBlobRequestOptions): Promise<string> {
    return this._blobService.getContent(this._containerName, this._blobPath, options);
  }

  changeLease(
    currentLeaseId: string,
    proposedLeaseId: string
  ): Promise<StorageBlobService.LeaseResult> {
    return this._blobService.changeLease(
      this._containerName,
      this._blobPath,
      currentLeaseId,
      proposedLeaseId
    );
  }

  getBlobProperties(): Promise<StorageBlobService.BlobResult> {
    return this._blobService.getBlobProperties(this._containerName, this._blobPath);
  }

  getBlobMetadata(): Promise<StorageBlobService.BlobResult> {
    return this._blobService.getBlobMetadata(this._containerName, this._blobPath);
  }

  setBlobMetadata(
    metadata: Dictionary<string>,
    options?: StorageBlobService.BlobRequestOptions
  ): Promise<StorageBlobService.BlobResult> {
    return this._blobService.setBlobMetadata(
      this._containerName,
      this._blobPath,
      metadata,
      options
    );
  }

  listBlobsSegmented(
    options?: StorageBlobService.ListBlobsSegmentedRequestOptions
  ): Promise<StorageBlobService.ListBlobsResult> {
    return this._blobService.listBlobsSegmented(this._containerName, options);
  }

  acquireLease(
    options: StorageBlobService.AcquireLeaseRequestOptions
  ): Promise<StorageBlobService.LeaseResult> {
    return this._blobService.acquireLease(this._containerName, this._blobPath, options);
  }

  deleteBlobIfExists(): Promise<void> {
    return this._blobService.deleteBlobIfExists(this._containerName, this._blobPath);
  }
}
