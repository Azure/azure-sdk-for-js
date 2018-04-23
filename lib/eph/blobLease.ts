// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as debugModule from "debug";
import { createBlobService, BlobService, ServiceResponse } from "azure-storage";
import * as Constants from "../util/constants";
import { defaultLock } from "../util/utils";

const debug = debugModule("cerulean:lease");

export interface CreateContainerResult {
  created: BlobService.ContainerResult;
  details: ServiceResponse;
}

export interface Lease {
  partitionId?: string;
  leaseId?: string;
  isHeld: boolean;
  acquire(options: any): Promise<Lease>;
  renew(options: any): Promise<Lease>;
  release(options: any): Promise<Lease>;
  updateContent(text: string, options?: any): Promise<Lease>;
  getContent(options?: any): Promise<string>;
}

export default class BlobLease implements Lease {

  static notHeldError: string = "Lease not held";
  static _beginningOfTime: string = new Date(1990, 1, 1).toUTCString();

  partitionId?: string;
  leaseId?: string;
  storageAccount: any;
  blobService: BlobService;
  container: any;
  blob: any;
  fullUri: string;

  private _isHeld: boolean = false;
  private _containerAndBlobExist: boolean = false;

  constructor(storageConnectionString: string, container: any, blob: any) {
    this.blobService = createBlobService(storageConnectionString);
    this.storageAccount = (storageConnectionString.match("AccountName=([^;]*);") || [])[1];
    this.container = container;
    this.blob = blob;
    this.fullUri = `https://${this.storageAccount}.blob.core.windows.net/${container}/${blob}`;
    this._isHeld = false;
    this._containerAndBlobExist = false;
    debug(`Full lease path: ${this.fullUri}`);
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
      let msg = `An error occurred while ensuring that the container and blob exists. ` +
        `It is: \n${JSON.stringify(err)}`;
      return Promise.reject(msg);
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
    try {
      await defaultLock.acquire(Constants.ensureContainerAndBlob, () => { return this.ensureContainerAndBlobExist(); });
      return new Promise<BlobLease>((resolve, reject) => {
        this.blobService.acquireLease(this.container, this.blob, options, (error, result, response) => {
          if (error) {
            reject(error);
          } else {
            this.leaseId = result.id;
            debug(`Acquired lease: ${this.leaseId}`, result);
            this._isHeld = true;
            resolve(this);
          }
        });
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  renew(options: BlobService.AcquireLeaseRequestOptions): Promise<BlobLease> {
    return new Promise((resolve, reject) => {
      if (!this.leaseId) {
        reject(new Error(BlobLease.notHeldError));
      } else {
        this.blobService.renewLease(this.container, this.blob, this.leaseId, options, (error, result, response) => {
          if (error) {
            reject(error);
          } else {
            debug(`Renewed lease: ${this.leaseId}`, result);
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
        this.blobService.releaseLease(this.container, this.blob, this.leaseId, options, (error, result, response) => {
          if (error) {
            reject(error);
          } else {
            debug(`Released lease: ${this.leaseId}`, result);
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
        this.blobService.createBlockBlobFromText(this.container, this.blob, text, options, (error, result, response) => {
          if (error) {
            reject(error);
          } else {
            debug(`Updated blob contents with: ${this.leaseId}`, result);
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
        this.blobService.getBlobToText(this.container, this.blob, options, (error, text, result, response) => {
          if (error) {
            reject(error);
          } else {
            debug(`Fetched blob contents with: ${this.leaseId}`, text, result);
            resolve(text);
          }
        });
      }
    });
  }

  private _ensureContainerExists(): Promise<CreateContainerResult> {
    const self = this;
    return new Promise<CreateContainerResult>((resolve, reject) => {
      self.blobService.createContainerIfNotExists(self.container, (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve({ created: result, details: response });
        }
      });
    });
  }

  private _ensureBlobExists(): Promise<void> {
    const self = this;
    return new Promise((resolve, reject) => {
      // Honestly, there"s no better way to say "hey, make sure this thing exists?"
      const options: BlobService.CreateBlobRequestOptions = {
        accessConditions: {
          DateUnModifiedSince: BlobLease._beginningOfTime
        }
      };
      self.blobService.createBlockBlobFromText(self.container, self.blob, "", options, (error, result, response) => {
        if (error) {
          if ((error as any).statusCode === 412) {
            // Blob already exists.
            resolve();
          } else {
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
   * @param {string} storageAccount The name of the storage account.
   * @param {string} storageKey The storage key value.
   * @param {BlobService.ContainerResult} container The Azure storage blob container.
   * @param {BlobService.BlobResult} blob The Azure storage blob.
   */
  static createFromNameAndKey(storageAccount: string, storageKey: string, container: BlobService.ContainerResult, blob: BlobService.BlobResult): BlobLease {
    const connectionString = `DefaultEndpointsProtocol=https;AccountName=${storageAccount};AccountKey=${storageKey}`;
    return new BlobLease(connectionString, container, blob);
  }
}

