// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BlobService, CreateContainerResult } from "./blobService";
import { BlobService as StorageBlobService } from "azure-storage";
import { Dictionary } from "@azure/amqp-common";

/**
 * @ignore
 */
export class AzureBlob {
  private _blobService: BlobService;
  private _containerName: string;
  private _blobPath: string;
  private _containerAndBlobExist: boolean = false;

  constructor(hostName: string, connectionString: string, containerName: string,
    blob: string, blobService?: BlobService) {
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
      const msg = `An error occurred while ensuring that the container and blob exists. ` +
        `It is: \n${err ? err.stack : JSON.stringify(err)}`;
      throw new Error(msg);
    }
  }

  async ensureContainerExists(): Promise<CreateContainerResult> {
    return await this._blobService.ensureContainerExists(this._containerName);
  }

  async doesContainerExist(): Promise<boolean> {
    return await this._blobService.doesContainerExist(this._containerName);
  }

  async doesBlobExist(): Promise<boolean> {
    return await this._blobService.doesBlobExist(this._containerName, this._blobPath);
  }

  async ensureBlobExists(text: string): Promise<void> {
    return await this._blobService.ensureBlobExists(this._containerName, this._blobPath, text);
  }

  async renewLease(leaseId: string,
    options: StorageBlobService.LeaseRequestOptions): Promise<StorageBlobService.LeaseResult> {
    return await this._blobService.renewLease(this._containerName, this._blobPath, leaseId, options);
  }

  async releaseLease(leaseId: string,
    options?: StorageBlobService.LeaseRequestOptions): Promise<StorageBlobService.LeaseResult> {
    return await this._blobService.releaseLease(this._containerName, this._blobPath, leaseId, options);
  }

  async updateContent(text: string,
    options?: StorageBlobService.CreateBlobRequestOptions): Promise<StorageBlobService.BlobResult> {
    return await this._blobService.updateContent(this._containerName, this._blobPath, text, options);
  }

  async getContent(options?: StorageBlobService.GetBlobRequestOptions): Promise<string> {
    return await this._blobService.getContent(this._containerName, this._blobPath, options);
  }

  async changeLease(currentLeaseId: string,
    proposedLeaseId: string): Promise<StorageBlobService.LeaseResult> {
    return await this._blobService.changeLease(this._containerName,
      this._blobPath, currentLeaseId, proposedLeaseId);
  }

  async getBlobProperties(): Promise<StorageBlobService.BlobResult> {
    return await this._blobService.getBlobProperties(this._containerName, this._blobPath);
  }

  async getBlobMetadata(): Promise<StorageBlobService.BlobResult> {
    return await this._blobService.getBlobMetadata(this._containerName, this._blobPath);
  }

  async setBlobMetadata(metadata: Dictionary<string>,
    options?: StorageBlobService.BlobRequestOptions): Promise<StorageBlobService.BlobResult> {
    return await this._blobService.setBlobMetadata(this._containerName, this._blobPath,
      metadata, options);
  }

  async listBlobsSegmented(options?: StorageBlobService.ListBlobsSegmentedRequestOptions):
    Promise<StorageBlobService.ListBlobsResult> {
    return await this._blobService.listBlobsSegmented(this._containerName, options);
  }

  async acquireLease(options: StorageBlobService.AcquireLeaseRequestOptions):
    Promise<StorageBlobService.LeaseResult> {
    return await this._blobService.acquireLease(this._containerName, this._blobPath, options);
  }

  async deleteBlobIfExists(): Promise<void> {
    return await this._blobService.deleteBlobIfExists(this._containerName, this._blobPath);
  }
}
