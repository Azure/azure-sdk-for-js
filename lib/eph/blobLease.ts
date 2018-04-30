// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as debugModule from "debug";
import { createBlobService, BlobService, ServiceResponse } from "azure-storage";
import * as Constants from "../util/constants";
import { defaultLock } from "../util/utils";

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
  static _beginningOfTime: string = new Date(1990, 1, 1).toUTCString();

  partitionId?: string;
  leaseId?: string;
  storageAccount: string;
  blobService: BlobService;
  containerName: string;
  blob: string;
  fullUri: string;
  hostName: string;

  private _isHeld: boolean = false;
  private _containerAndBlobExist: boolean = false;

  constructor(hostName: string, storageConnectionString: string, containerName: string, blob: string) {
    this.hostName = hostName;
    this.blobService = createBlobService(storageConnectionString);
    this.storageAccount = (storageConnectionString.match("AccountName=([^;]*);") || [])[1];
    this.containerName = containerName;
    this.blob = blob;
    this.fullUri = `https://${this.storageAccount}.blob.core.windows.net/${containerName}/${blob}`;
    this._isHeld = false;
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
        `It is: \n${JSON.stringify(err)}`;
      throw new Error(msg);
    }
  }

  /**
   * Returns the best-guess as to whether the lease is still held. May not be accurate if
   * the lease has expired.
   * @returns {boolean}
   */
  get isHeld(): boolean {
    return this._isHeld;
  }

  /**
   * Since others may manage lease renewal/acquisition, this allows them to tell the lease whether
   * they believe it is held or not. For instance, if the LeaseManager fails to renew the lease
   * once, the lease may still be held, but after multiple times, the hold might expire.
   * The LeaseManager may choose to tell the lease that it has lost the hold before that
   * has actually occurred.
   *
   * The lease is normally pretty good about managing this itself
   * (on acquire/renew/release success), but for special cases (like the above) this method
   * might be required.
   *
   * @param isItHeld
   */
  set isHeld(isItHeld: boolean) {
    this._isHeld = isItHeld;
  }

  async acquire(options: BlobService.AcquireLeaseRequestOptions): Promise<BlobLease> {
    await defaultLock.acquire(Constants.ensureContainerAndBlob, () => { return this.ensureContainerAndBlobExist(); });
    return await this._acquireLease(options);
  }

  renew(options: BlobService.AcquireLeaseRequestOptions): Promise<BlobLease> {
    return new Promise((resolve, reject) => {
      if (!this.leaseId) {
        reject(new Error(BlobLease.notHeldError));
      } else {
        this.blobService.renewLease(this.containerName, this.blob, this.leaseId, options, (error, result, response) => {
          if (error) {
            reject(error);
          } else {
            debug("[%s] Renewed lease with leaseId: '%s' and the result is: %O.",
              this.hostName, this.leaseId, result);
            this._isHeld = true;
            resolve(this);
          }
        });
      }
    });
  }

  release(options?: BlobService.LeaseRequestOptions): Promise<BlobLease> {
    return new Promise((resolve, reject) => {
      if (!this.leaseId) {
        reject(new Error(BlobLease.notHeldError));
      } else {
        if (!options) options = {};
        this.blobService.releaseLease(this.containerName, this.blob, this.leaseId, options, (error, result, response) => {
          if (error) {
            reject(error);
          } else {
            debug("[%s] Released lease with leaseId: '%s' and the result is: %O.",
              this.hostName, this.leaseId, result);
            delete this.leaseId;
            this._isHeld = false;
            resolve(this);
          }
        });
      }
    });
  }

  /**
   * Updates content from the Azure Storage Blob.
   * @param {string} text The text to be written
   * @param {BlobService.CreateBlobRequestOptions} options The options that can be provided
   * while writing content to the blob.
   */
  updateContent(text: string, options?: BlobService.CreateBlobRequestOptions): Promise<BlobLease> {
    return new Promise((resolve, reject) => {
      if (!this.leaseId) {
        reject(new Error(BlobLease.notHeldError));
      } else {
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
      }
    });
  }

  /**
   * Gets content from the Azure Storage Blob.
   * @param {BlobService.GetBlobRequestOptions} options Options to be passed while getting
   * content from the blob.
   */
  getContent(options?: BlobService.GetBlobRequestOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.leaseId) {
        reject(new Error(BlobLease.notHeldError));
      } else {
        if (!options) options = {};
        if (!options.leaseId) options.leaseId = this.leaseId;
        this.blobService.getBlobToText(this.containerName, this.blob, options, (error, text, result, response) => {
          if (error) {
            reject(error);
          } else {
            debug("[%s] Fetched blob contents with leaseId '%s', text '%s' and the result is %O.",
              this.hostName, this.leaseId, text, result);
            resolve(text);
          }
        });
      }
    });
  }

  private _acquireLease(options: BlobService.AcquireLeaseRequestOptions): Promise<BlobLease> {
    return new Promise<BlobLease>((resolve, reject) => {
      this.blobService.acquireLease(this.containerName, this.blob, options, (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          this.leaseId = result.id;
          debug("[%s] Acquired lease with leaseId: '%s' and the result is: %O.",
            this.hostName, this.leaseId, result);
          this._isHeld = true;
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
          DateUnModifiedSince: BlobLease._beginningOfTime
        }
      };
      debug("[%s] Ensuring that blob '%s' exists in container '%s'.",
        this.hostName, this.blob, this.containerName);
      this.blobService.createBlockBlobFromText(this.containerName, this.blob, "", options, (error, result, response) => {
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
