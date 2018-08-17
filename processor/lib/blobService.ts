// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as debugModule from "debug";
import { createBlobService, BlobService as StorageBlobService, ServiceResponse } from "azure-storage";
import { validateType } from "./util/utils";

const debug = debugModule("azure:event-hubs:eph:blobService");

export interface CreateContainerResult {
  created: StorageBlobService.ContainerResult;
  details: ServiceResponse;
}

export class BlobService {
  private _hostName: string;
  private _connectionString: string;
  _storageBlobService: StorageBlobService;

  private _beginningOfTime: string = new Date(1990, 0, 1).toUTCString();

  constructor(hostName: string, connectionString: string) {
    this._hostName = hostName;
    this._connectionString = connectionString;
    this._storageBlobService = createBlobService(this._connectionString);
  }

  /**
   * Ensures that the container and blob exist.
   */
  async ensureContainerAndBlobExist(containerName: string, blobPath: string): Promise<void> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    try {
      await this.ensureContainerExists(containerName);
      await this.ensureBlobExists(containerName, blobPath, "{}");
    } catch (err) {
      const msg = `An error occurred while ensuring that the container and blob exists. ` +
        `It is: \n${err ? err.stack : JSON.stringify(err)}`;
      throw new Error(msg);
    }
  }

  ensureContainerExists(containerName: string): Promise<CreateContainerResult> {
    validateType("containerName", containerName, true, "string");

    return new Promise<CreateContainerResult>((resolve, reject) => {
      debug("[%s] Ensuring that the container '%s' exists.", containerName);
      this._storageBlobService.createContainerIfNotExists(containerName, (error, result, response) => {
        if (error) {
          debug("[%s] An error occurred while ensuring that the container '%s' exists: %O",
            this._hostName, containerName, error);
          reject(error);
        } else {
          const containerInfo = { created: result, details: response };
          debug("[%s] Result for Container '%s': %O",
            this._hostName, containerName, containerInfo);
          resolve(containerInfo);
        }
      });
    });
  }

  doesContainerExist(containerName: string): Promise<boolean> {
    validateType("containerName", containerName, true, "string");

    return new Promise<boolean>((resolve, reject) => {
      this._storageBlobService.doesContainerExist(containerName, (error, result) => {
        if (error) {
          debug("[%s] An error occurred while determining whether the container '%s' exists: %O." +
            this._hostName, containerName, error);
          reject(error);
        } else {
          debug("[%s] Does container '%s' exist -> %s.", this._hostName, containerName, result.exists);
          resolve(result.exists);
        }
      });
    });
  }

  doesBlobExist(containerName: string, blobPath: string): Promise<boolean> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");

    return new Promise<boolean>((resolve, reject) => {
      this._storageBlobService.doesBlobExist(containerName, blobPath, (error, result) => {
        if (error) {
          debug("[%s] An error occurred while determining whether the blob '%s' exists in " +
            "container '%s': %O", this._hostName, blobPath, containerName, error);
          reject(error);
        } else {
          debug("[%s] Does blob '%s' exist in container '%s' -> %s.", this._hostName, blobPath,
            containerName, result.exists);
          resolve(result.exists);
        }
      });
    });
  }

  ensureBlobExists(containerName: string, blobPath: string, text: string): Promise<void> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("text", text, true, "string");

    return new Promise<void>((resolve, reject) => {
      const options: StorageBlobService.CreateBlobRequestOptions = {
        accessConditions: {
          DateUnModifiedSince: this._beginningOfTime
        }
      };
      debug("[%s] Ensuring that blob '%s' exists in container '%s'.",
        this._hostName, blobPath, containerName);
      this._storageBlobService.createBlockBlobFromText(containerName, blobPath, text, options, (error) => {
        if (error) {
          if ((error as any).statusCode === 412) {
            // Blob already exists.
            resolve();
          } else {
            debug("[%s] An error occurred while ensuring that blob '%s' exists in container '%s': %O",
              this._hostName, blobPath, containerName, error);
            reject(error);
          }
        } else {
          resolve();
        }
      });
    });
  }

  renewLease(containerName: string, blobPath: string, leaseId: string, options: StorageBlobService.LeaseRequestOptions): Promise<StorageBlobService.LeaseResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("leaseId", leaseId, true, "string");
    validateType("options", options, false, "object");

    return new Promise<StorageBlobService.LeaseResult>((resolve, reject) => {
      if (!options) options = {};
      this._storageBlobService.renewLease(containerName, blobPath, leaseId, options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Renewed lease with leaseId: '%s' and the result is: %O.",
            this._hostName, leaseId, result);
          resolve(result);
        }
      });
    });
  }

  releaseLease(containerName: string, blobPath: string, leaseId: string, options?: StorageBlobService.LeaseRequestOptions): Promise<StorageBlobService.LeaseResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("leaseId", leaseId, true, "string");
    validateType("options", options, false, "object");

    return new Promise<StorageBlobService.LeaseResult>((resolve, reject) => {
      if (!options) options = {};
      this._storageBlobService.releaseLease(containerName, blobPath, leaseId, options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Released lease with leaseId: '%s' and the result is: %O.",
            this._hostName, leaseId, result);
          resolve(result);
        }
      });
    });
  }

  /**
   * Updates content from the Azure Storage Blob.
   * @param {string} text The text to be written
   * @param {StorageBlobService.CreateBlobRequestOptions} options The options that can be provided
   * while writing content to the blob.
   */
  updateContent(containerName: string, blobPath: string, text: string, options?: StorageBlobService.CreateBlobRequestOptions): Promise<StorageBlobService.BlobResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("text", text, true, "string");
    validateType("options", options, false, "object");

    return new Promise<StorageBlobService.BlobResult>((resolve, reject) => {
      if (!options) options = {};
      debug("[%s] Updating content '%s' in the container '%s' of the blob '%s' .",
        this._hostName, text, containerName, blobPath);
      this._storageBlobService.createBlockBlobFromText(containerName, blobPath, text, options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Updated blob content '%s' and the result is %O.", this._hostName, text, result);
          resolve(result);
        }
      });
    });
  }

  /**
   * Gets content from the Azure Storage Blob.
   * @param {StorageBlobService.GetBlobRequestOptions} options Options to be passed while getting
   * content from the blob.
   */
  getContent(containerName: string, blobPath: string, options?: StorageBlobService.GetBlobRequestOptions): Promise<string> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("options", options, false, "object");

    return new Promise((resolve, reject) => {
      if (!options) options = {};
      this._storageBlobService.getBlobToText(containerName, blobPath, options, (error, text, result) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Fetched blob content '%s' for blobpath '%s' and the result is %O.",
            this._hostName, text, result, blobPath);
          resolve(text);
        }
      });
    });
  }

  changeLease(containerName: string, blobPath: string, currentLeaseId: string, proposedLeaseId: string): Promise<StorageBlobService.LeaseResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("currentLeaseId", currentLeaseId, true, "string");
    validateType("proposedLeaseId", proposedLeaseId, true, "string");

    return new Promise<StorageBlobService.LeaseResult>((resolve, reject) => {
      this._storageBlobService.changeLease(containerName, blobPath, currentLeaseId, proposedLeaseId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Changed current lease '%s' with proposed lease '%s' and the result is: %O.",
            this._hostName, currentLeaseId, proposedLeaseId, result);
          resolve(result);
        }
      });
    });
  }

  getBlobProperties(containerName: string, blobPath: string): Promise<StorageBlobService.BlobResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");

    return new Promise<StorageBlobService.BlobResult>((resolve, reject) => {
      this._storageBlobService.getBlobProperties(containerName, blobPath, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  acquireLease(containerName: string, blobPath: string, options: StorageBlobService.AcquireLeaseRequestOptions): Promise<StorageBlobService.LeaseResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("options", options, false, "object");

    return new Promise<StorageBlobService.LeaseResult>((resolve, reject) => {
      if (!options) options = {};
      this._storageBlobService.acquireLease(containerName, blobPath, options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Acquired lease and the result is: %O.",
            this._hostName, result);
          resolve(result);
        }
      });
    });
  }

  async deleteBlobIfExists(containerName: string, blobPath: string): Promise<boolean> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");

    return new Promise<boolean>((resolve, reject) => {
      this._storageBlobService.deleteBlobIfExists(containerName, blobPath, (error, result) => {
        if (error) {
          reject(error);
        } else {
          debug("[%s] Deleted blob '%s' ->  %s.", this._hostName, blobPath, result);
          resolve(result);
        }
      });
    });
  }

  static create(hostName: string, connectionString: string): BlobService {
    validateType("hostName", hostName, true, "string");
    validateType("connectionString", connectionString, true, "string");

    return new BlobService(hostName, connectionString);
  }
}