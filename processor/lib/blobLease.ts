// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as debugModule from "debug";
import { createBlobService, BlobService, ServiceResponse } from "azure-storage";
import * as Constants from "./util/constants";
import { defaultLock } from "./util/utils";

const debug = debugModule("azure:event-hubs:eph:lease");

export interface CreateContainerResult {
  created: BlobService.ContainerResult;
  details: ServiceResponse;
}

/**
 * Describes the lease used to checkpoint the offset of data received by a receiver for a given
 * partition in a consumer group for an EventHub.
 */
export interface Lease {
  /**
   * @property {string} [partitionId] The associated partitionId for which the lease is held.
   */
  partitionId?: string;
  /**
   * @property {string} [leaseId] The unqiue identifier for the lease. In the BlobLease this
   * property will be set after getting a lease from the Azure Blob storage.
   */
  leaseId?: string;
  /**
   * @property {boolean} isHeld Determines whether the lease is held. Default: false.
   */
  isHeld: boolean;
  /**
   * Acquires the lease.
   * @param {*} options Any options that need to be passed to acquire the lease.
   * @returns {Promise<Lease>} Promise<Lease>
   */
  acquire(options: any): Promise<Lease>;
  /**
   * Renews the lease.
   * @param {*} options Any options that need to be passed to renew the lease.
   * @returns {Promise<Lease>} Promise<Lease>
   */
  renew(options: any): Promise<Lease>;
  /**
   * Releases the lease.
   * @param {*} options Any options that need to be passed to release the lease.
   * @returns {Promise<Lease>} Promise<Lease>
   */
  release(options: any): Promise<Lease>;
  /**
   * Updates the content
   * @param {*} options Any options that need to be passed to update the blob content.
   * @returns {Promise<Lease>} Promise<Lease>
   */
  updateContent(text: string, options?: any): Promise<Lease>;
  /**
   * Gets the content.
   * @param {*} [options] Any options that need to be passed to get the blob content.
   * @returns {Promise<string>} Promise<string>
   */
  getContent(options?: any): Promise<string>;
}

export class BlobLease implements Lease {

  static notHeldError: string = "Lease not held";

  partitionId?: string;
  leaseId?: string;
  storageAccount: string;
  blobService: BlobService;
  containerName: string;
  blob: string;
  fullUri: string;
  hostName: string;
  /**
   * @property {boolean} isHeld Provides the best-guess as to whether the lease is still held.
   * May not be accurate if the lease has expired. Default value: false.
   */
  isHeld: boolean = false;

  private _beginningOfTime: string = new Date(1990, 0, 1).toUTCString();
  private _containerAndBlobExist: boolean = false;

  constructor(hostName: string, storageConnectionString: string, containerName: string, blob: string) {
    this.hostName = hostName;
    this.blobService = createBlobService(storageConnectionString);
    this.storageAccount = (storageConnectionString.match("AccountName=([^;]*);") || [])[1];
    this.containerName = containerName;
    this.blob = blob;
    this.fullUri = `https://${this.storageAccount}.blob.core.windows.net/${containerName}/${blob}`;
    this._containerAndBlobExist = false;
    debug("[%s] Full lease path: '%s'.", this.hostName, this.fullUri);
  }

  /**
   * Ensures that the container and blob exist.
   */
  async ensureContainerAndBlobExist(): Promise<void> {
    try {
      if (!this._containerAndBlobExist) {
        await this._ensureContainerExists();
        await this._ensureBlobExists();
        this._containerAndBlobExist = true;
      }
    } catch (err) {
      const msg = `An error occurred while ensuring that the container and blob exists. ` +
        `It is: \n${err ? err.stack : JSON.stringify(err)}`;
      throw new Error(msg);
    }
  }

  async acquire(options: BlobService.AcquireLeaseRequestOptions): Promise<BlobLease> {
    await defaultLock.acquire(Constants.ensureContainerAndBlob, () => this.ensureContainerAndBlobExist());
    return await this._acquireLease(options);
  }

  renew(options: BlobService.AcquireLeaseRequestOptions): Promise<BlobLease> {
    if (!this.leaseId) {
      throw new Error(BlobLease.notHeldError);
    }
    return new Promise((resolve, reject) => {
      this.blobService.renewLease(this.containerName, this.blob, this.leaseId!, options, (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Renewed lease with leaseId: '%s' and the result is: %O.",
            this.hostName, this.leaseId, result);
          this.isHeld = true;
          resolve(this);
        }
      });
    });
  }

  release(options?: BlobService.LeaseRequestOptions): Promise<BlobLease> {
    if (!this.leaseId) {
      throw new Error(BlobLease.notHeldError);
    }
    return new Promise((resolve, reject) => {
      if (!options) options = {};
      this.blobService.releaseLease(this.containerName, this.blob, this.leaseId!, options, (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Released lease with leaseId: '%s' and the result is: %O.",
            this.hostName, this.leaseId, result);
          delete this.leaseId;
          this.isHeld = false;
          resolve(this);
        }
      });
    });
  }

  /**
   * Updates content from the Azure Storage Blob.
   * @param {string} text The text to be written
   * @param {BlobService.CreateBlobRequestOptions} options The options that can be provided
   * while writing content to the blob.
   */
  updateContent(text: string, options?: BlobService.CreateBlobRequestOptions): Promise<BlobLease> {
    if (!this.leaseId) {
      throw new Error(BlobLease.notHeldError);
    }
    return new Promise((resolve, reject) => {
      if (!options) options = {};
      if (!options.leaseId) options.leaseId = this.leaseId;
      debug("[%s] Updating with leaseId '%s' in the container '%s' of the blob '%s' .",
        this.hostName, this.leaseId, this.containerName, this.blob);
      this.blobService.createBlockBlobFromText(this.containerName, this.blob, text, options, (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Updated blob contents with leaseId '%s' and the result is %O.",
            this.hostName, this.leaseId, result);
          resolve(this);
        }
      });
    });
  }

  /**
   * Gets content from the Azure Storage Blob.
   * @param {BlobService.GetBlobRequestOptions} options Options to be passed while getting
   * content from the blob.
   */
  getContent(options?: BlobService.GetBlobRequestOptions): Promise<string> {
    if (!this.leaseId) {
      throw new Error(BlobLease.notHeldError);
    }
    return new Promise((resolve, reject) => {
      if (!options) options = {};
      // if (!options.leaseId) options.leaseId = this.leaseId;
      this.blobService.getBlobToText(this.containerName, this.blob, options, (error, text, result) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Fetched blob contents with leaseId '%s', text '%s' and the result is %O.",
            this.hostName, this.leaseId, text, result);
          resolve(text);
        }
      });
    });
  }

  changeLease(proposedLeaseId: string): Promise<BlobLease> {
    return new Promise<BlobLease>((resolve, reject) => {
      this.blobService.changeLease(this.containerName, this.blob, this.leaseId!, proposedLeaseId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          this.leaseId = result.id;
          debug("[%s] Changed lease with leaseId: '%s' and the result is: %O.",
            this.hostName, this.leaseId, result);
          resolve(this);
        }
      });
    });
  }

  getBlobProperties(): Promise<BlobService.BlobResult> {
    return new Promise<BlobService.BlobResult>((resolve, reject) => {
      this.blobService.getBlobProperties(this.containerName, this.blob, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  private _acquireLease(options: BlobService.AcquireLeaseRequestOptions): Promise<BlobLease> {
    return new Promise<BlobLease>((resolve, reject) => {
      this.blobService.acquireLease(this.containerName, this.blob, options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          this.leaseId = result.id;
          debug("[%s] Acquired lease with leaseId: '%s' and the result is: %O.",
            this.hostName, this.leaseId, result);
          this.isHeld = true;
          resolve(this);
        }
      });
    });
  }

  private _ensureContainerExists(): Promise<CreateContainerResult> {
    return new Promise<CreateContainerResult>((resolve, reject) => {
      debug("[%s] Ensuring that the container '%s' exists.", this.containerName);
      this.blobService.createContainerIfNotExists(this.containerName, (error, result, response) => {
        if (error) {
          debug("[%s] An error occurred while ensuring that the container '%s' exists: %O",
            this.hostName, this.containerName, error);
          reject(error);
        } else {
          const containerInfo = { created: result, details: response };
          debug("[%s] Result for Container '%s': %O",
            this.hostName, this.containerName, containerInfo);
          resolve(containerInfo);
        }
      });
    });
  }

  private _ensureBlobExists(): Promise<void> {
    return new Promise((resolve, reject) => {
      const options: BlobService.CreateBlobRequestOptions = {
        accessConditions: {
          DateUnModifiedSince: this._beginningOfTime
        }
      };
      debug("[%s] Ensuring that blob '%s' exists in container '%s'.",
        this.hostName, this.blob, this.containerName);
      this.blobService.createBlockBlobFromText(this.containerName, this.blob, "", options, (error) => {
        if (error) {
          if ((error as any).statusCode === 412) {
            // Blob already exists.
            resolve();
          } else {
            debug("[%s] An error occurred while ensuring that blob '%s' exists in container '%s': %O",
              this.hostName, this.blob, this.containerName, error);
            reject(error);
          }
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Creates a lease from storage account name and key
   * @param {string} hostName The EPH host name to which the lease belongs.
   * @param {string} storageAccount The name of the storage account.
   * @param {string} storageKey The storage key value.
   * @param {string} containerName The Azure storage blob container name.
   * @param {string} blob The Azure storage blob.
   */
  static createFromNameAndKey(hostName: string, storageAccount: string, storageKey: string, containerName: string, blob: string): BlobLease {
    const connectionString = `DefaultEndpointsProtocol=https;AccountName=${storageAccount};AccountKey=${storageKey}`;
    return new BlobLease(hostName, connectionString, containerName, blob);
  }
}
