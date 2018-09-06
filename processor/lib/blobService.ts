// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { createBlobService, BlobService as StorageBlobService, ServiceResponse } from "azure-storage";
import * as log from "./log";
import { validateType, getStorageError, Dictionary } from "./util/utils";
import { defaultMaximumExecutionTimeInMs } from "./util/constants";

export interface CreateContainerResult {
  created: StorageBlobService.ContainerResult;
  details: ServiceResponse;
}

export enum LeaseState {
  /**
   * The lease state is not specified.
   */
  unspecified = "unspecified",

  /**
   * The lease is in the "available" state.
   */
  available = "available",

  /**
   * The lease is in the "leased" state.
   */
  leased = "leased",

  /**
   * The lease is in the "expired" state.
   */
  expired = "expired",

  /**
   * The lease is in the "breaking" state.
   */
  breaking = "breaking",

  /**
   * The lease is in the "broken" state.
   */
  broken = "broken"
}

export class BlobService {
  private _hostName: string;
  private _connectionString: string;
  private _storageBlobService: StorageBlobService;

  private _beginningOfTime: string = new Date(1990, 0, 1).toUTCString();

  constructor(hostName: string, connectionString: string) {
    this._hostName = hostName;
    this._connectionString = connectionString;
    this._storageBlobService = createBlobService(this._connectionString);
    this._storageBlobService.defaultMaximumExecutionTimeInMs = defaultMaximumExecutionTimeInMs;
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
      log.error(msg);
      throw new Error(msg);
    }
  }

  ensureContainerExists(containerName: string): Promise<CreateContainerResult> {
    validateType("containerName", containerName, true, "string");

    return new Promise<CreateContainerResult>((resolve, reject) => {
      log.blobService("[%s] Ensuring that the container '%s' exists.", this._hostName, containerName);
      this._storageBlobService.createContainerIfNotExists(containerName, (error, result, response) => {
        if (error) {
          log.error("[%s] An error occurred while ensuring that the container '%s' exists: %O",
            this._hostName, containerName, getStorageError(error));
          reject(error);
        } else {
          const containerInfo = { created: result, details: response };
          log.blobService("[%s] Result for Container '%s': %O",
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
          log.error("[%s] An error occurred while determining whether the container " +
            "'%s' exists: % O.", this._hostName, containerName, getStorageError(error));
          reject(error);
        } else {
          log.blobService("[%s] Does container '%s' exist -> %s.", this._hostName,
            containerName, result.exists);
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
          log.error("[%s] An error occurred while determining whether the blob '%s' exists in " +
            "container '%s': %O", this._hostName, blobPath, containerName, getStorageError(error));
          reject(error);
        } else {
          log.blobService("[%s] Does blob '%s' exist in container '%s' -> %s.", this._hostName,
            blobPath, containerName, result.exists);
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
      log.blobService("[%s] Ensuring that blob '%s' exists in container '%s'.",
        this._hostName, blobPath, containerName);
      this._storageBlobService.createBlockBlobFromText(containerName, blobPath, text, options, (error) => {
        if (error) {
          if ((error as any).statusCode === 412) {
            // Blob already exists.
            resolve();
          } else {
            log.error("[%s] An error occurred while ensuring that blob '%s' exists in " +
              "container '%s': %O", this._hostName, blobPath, containerName, getStorageError(error));
            reject(error);
          }
        } else {
          resolve();
        }
      });
    });
  }

  renewLease(containerName: string, blobPath: string, leaseId: string,
    options: StorageBlobService.LeaseRequestOptions): Promise<StorageBlobService.LeaseResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("leaseId", leaseId, true, "string");
    validateType("options", options, false, "object");

    return new Promise<StorageBlobService.LeaseResult>((resolve, reject) => {
      if (!options) options = {};
      log.blobService("[%s] Attempting to renew lease '%s' for blobPath '%s'.", this._hostName,
        leaseId, blobPath);
      this._storageBlobService.renewLease(containerName, blobPath, leaseId, options, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while renewing lease '%s' for blobPath '%s': %O.",
            this._hostName, leaseId, blobPath, getStorageError(error));
          reject(error);
        } else {
          log.blobService("[%s] Renewed lease with leaseId: '%s' for blobPath '%s'.",
            this._hostName, leaseId, blobPath);
          resolve(result);
        }
      });
    });
  }

  releaseLease(containerName: string, blobPath: string, leaseId: string,
    options?: StorageBlobService.LeaseRequestOptions): Promise<StorageBlobService.LeaseResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("leaseId", leaseId, true, "string");
    validateType("options", options, false, "object");

    return new Promise<StorageBlobService.LeaseResult>((resolve, reject) => {
      if (!options) options = {};
      log.blobService("[%s] Attempting to release lease '%s' for blobPath '%s'.", this._hostName,
        leaseId, blobPath);
      this._storageBlobService.releaseLease(containerName, blobPath, leaseId, options, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while releasing lease '%s' for blobPath '%s': %O.",
            this._hostName, leaseId, blobPath, getStorageError(error));
          reject(error);
        } else {
          log.blobService("[%s] Released lease with leaseId: '%s' for blobPath '%s'.",
            this._hostName, leaseId, blobPath);
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
  updateContent(containerName: string, blobPath: string, text: string,
    options?: StorageBlobService.CreateBlobRequestOptions): Promise<StorageBlobService.BlobResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("text", text, true, "string");
    validateType("options", options, false, "object");

    return new Promise<StorageBlobService.BlobResult>((resolve, reject) => {
      if (!options) options = {};
      log.blobService("[%s] Updating content '%s' in the container '%s' of the blob '%s' .",
        this._hostName, text, containerName, blobPath);
      this._storageBlobService.createBlockBlobFromText(containerName, blobPath, text, options, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while updating content '%s' to blobPath '%s': %O.",
            this._hostName, text, blobPath, getStorageError(error));
          reject(error);
        } else {
          log.blobService("[%s] Updated blob content '%s' for blobPath '%s'.", this._hostName,
            text, blobPath);
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
  getContent(containerName: string, blobPath: string,
    options?: StorageBlobService.GetBlobRequestOptions): Promise<string> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("options", options, false, "object");

    return new Promise((resolve, reject) => {
      if (!options) options = {};
      log.blobService("[%s] Attempting to getcontent from blobPath '%s'.", this._hostName,
        blobPath);
      this._storageBlobService.getBlobToText(containerName, blobPath, options, (error, text, result) => {
        if (error) {
          log.error("[%s] An error occurred while getting content from blobPath '%s': %O.",
            this._hostName, blobPath, getStorageError(error));
          reject(error);
        } else {
          log.blobService("[%s] Fetched blob content '%s' for blobPath '%s'.",
            this._hostName, text, blobPath);
          resolve(text);
        }
      });
    });
  }

  changeLease(containerName: string, blobPath: string, currentLeaseId: string,
    proposedLeaseId: string): Promise<StorageBlobService.LeaseResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("currentLeaseId", currentLeaseId, true, "string");
    validateType("proposedLeaseId", proposedLeaseId, true, "string");

    return new Promise<StorageBlobService.LeaseResult>((resolve, reject) => {
      log.blobService("[%s] Attempting to change lease '%s' for blobPath '%s' with new lease '%s'.",
        this._hostName, currentLeaseId, blobPath, proposedLeaseId);
      this._storageBlobService.changeLease(containerName, blobPath, currentLeaseId,
        proposedLeaseId, (error, result) => {
          if (error) {
            log.error("[%s] An error occurred while changing lease '%s' to '%s' for blobPath " +
              "'%s': %O.", this._hostName, currentLeaseId, proposedLeaseId, blobPath, error);
            reject(error);
          } else {
            log.blobService("[%s] Changed current lease '%s' with proposed lease '%s' for blobPath '%s'.",
              this._hostName, currentLeaseId, proposedLeaseId, blobPath);
            resolve(result);
          }
        });
    });
  }

  getBlobProperties(containerName: string, blobPath: string): Promise<StorageBlobService.BlobResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");

    return new Promise<StorageBlobService.BlobResult>((resolve, reject) => {
      log.blobService("[%s] Attempting to get blob props for blobPath '%s'.", this._hostName,
        blobPath);
      this._storageBlobService.getBlobProperties(containerName, blobPath, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while getting blob props for blobPath '%s': %O.",
            this._hostName, blobPath, getStorageError(error));
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  listBlobsSegmented(containerName: string,
    options?: StorageBlobService.ListBlobsSegmentedRequestOptions): Promise<StorageBlobService.ListBlobsResult> {
    validateType("containerName", containerName, true, "string");
    if (!options) {
      options = {
        maxResults: 5000,
        include: "metadata"
      };
    }
    return new Promise<StorageBlobService.ListBlobsResult>((resolve, reject) => {
      log.blobService("[%s] Attempting to list blobs for container '%s'.", this._hostName,
        containerName);
      this._storageBlobService.listBlobsSegmented(containerName, undefined as any, options!, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while listing blobs for container '%s': %O.",
            this._hostName, containerName, getStorageError(error));
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  getBlobMetadata(containerName: string, blobPath: string): Promise<StorageBlobService.BlobResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");

    return new Promise<StorageBlobService.BlobResult>((resolve, reject) => {
      log.blobService("[%s] Attempting to get blob props for blobPath '%s'.", this._hostName,
        blobPath);
      this._storageBlobService.getBlobMetadata(containerName, blobPath, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while getting blob props for blobPath '%s': %O.",
            this._hostName, blobPath, getStorageError(error));
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  setBlobMetadata(containerName: string, blobPath: string, metadata: Dictionary<string>): Promise<StorageBlobService.BlobResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("metadata", metadata, true, "object");

    return new Promise<StorageBlobService.BlobResult>((resolve, reject) => {
      log.blobService("[%s] Attempting to get blob props for blobPath '%s'.", this._hostName,
        blobPath);
      this._storageBlobService.setBlobMetadata(containerName, blobPath, metadata, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while getting blob props for blobPath '%s': %O.",
            this._hostName, blobPath, getStorageError(error));
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  acquireLease(containerName: string, blobPath: string,
    options: StorageBlobService.AcquireLeaseRequestOptions): Promise<StorageBlobService.LeaseResult> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");
    validateType("options", options, false, "object");

    return new Promise<StorageBlobService.LeaseResult>((resolve, reject) => {
      if (!options) options = {};
      log.blobService("[%s] Attempting to acquire lease for blobPath '%s'.", this._hostName,
        blobPath);
      this._storageBlobService.acquireLease(containerName, blobPath, options, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while acquiring lease for blobPath '%s': %O.",
            this._hostName, blobPath, getStorageError(error));
          reject(error);
        } else {
          log.blobService("[%s] Acquired lease '%s' for blobPath '%s.",
            this._hostName, result.id, blobPath);
          resolve(result);
        }
      });
    });
  }

  async deleteBlobIfExists(containerName: string, blobPath: string): Promise<void> {
    validateType("containerName", containerName, true, "string");
    validateType("blobPath", blobPath, true, "string");

    return new Promise<void>((resolve, reject) => {
      log.blobService("[%s] Attempting to delete blob for blobPath '%s'.", this._hostName,
        blobPath);
      this._storageBlobService.deleteBlobIfExists(containerName, blobPath, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while deleting blob for blobPath '%s': %O.",
            this._hostName, blobPath, getStorageError(error));
          reject(error);
        } else {
          log.blobService("[%s] Deleted blob '%s' ->  %s.", this._hostName, blobPath, result);
          resolve();
        }
      });
    });
  }

  async deleteContainerIfExists(containerName: string): Promise<void> {
    validateType("containerName", containerName, true, "string");

    return new Promise<void>((resolve, reject) => {
      log.blobService("[%s] Attempting to delete container '%s'.", this._hostName, containerName);
      this._storageBlobService.deleteContainerIfExists(containerName, (error, result) => {
        if (error) {
          log.error("[%s] An error occurred while deleting container '%s': %O.",
            this._hostName, containerName, getStorageError(error));
          reject(error);
        } else {
          log.blobService("[%s] Deleted container '%s' ->  %s.", this._hostName, containerName, result);
          resolve();
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
