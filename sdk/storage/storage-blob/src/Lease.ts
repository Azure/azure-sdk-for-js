import * as Models from "../src/generated/lib/models";
import { Aborter } from "./Aborter";
import { ContainerClient } from "./ContainerClient";
import { Blob, Container } from "./generated/lib/operations";
import { StorageClientContext } from "./generated/lib/storageClient";
import { BlobClient } from "./internal";

/**
 * Configures lease operations.
 *
 * @export
 * @interface LeaseOperationOptions
 */
export interface LeaseOperationOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof LeaseOperationOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when changing the lease.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof LeaseOperationOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * A client that manages leases for a ContainerClient or a BlobClient.
 *
 * @export
 * @class LeaseClient
 */
export class LeaseClient {

  public get leaseId() {
    return this._leaseId;
  }

  /**
   * To end the lease but ensure that another client cannot acquire a new lease
   * until the current lease period has expired.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @static
   * @param {(ContainerClient | BlobClient)} client
   * @param {number} breakPeriod Break period
   * @param {LeaseOperationOptions} [options={}] Optional options to configure lease management operations.
   * @memberof LeaseClient
   */
  public static async breakAll(
    client: ContainerClient | BlobClient,
    breakPeriod: number,
    options: LeaseOperationOptions = {}) {
    const aborter = options.abortSignal || Aborter.none;
    const operationOptions = {
      abortSignal: aborter,
      breakPeriod,
      modifiedAccessConditions: options.modifiedAccessConditions
    };
    const clientContext = new StorageClientContext(client.url, client.pipeline.toServiceClientOptions());
    if (client instanceof ContainerClient) {
      const container = new Container(clientContext);
      await container.breakLease(operationOptions);
    } else {
      const blob = new Blob(clientContext);
      await blob.breakLease(operationOptions);
    }
  }

  /**
   * Creates an instance of LeaseClient.
   * @param {string} _leaseId Initial proposed lease id.
   * @param {(Container | Blob)} containerOrBlob The object that is used to make the lease operation requests.
   * @memberof LeaseClient
   */
  constructor(private _leaseId: string, private readonly containerOrBlob: Container | Blob) {
  }

  /**
   * Establishes and manages a lock on a container for delete operations, or on a blob
   * for write and delete operations.
   * The lock duration can be 15 to 60 seconds, or can be infinite.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {number} duration Must be between 15 to 60 seconds, or infinite (-1)
   * @param {LeaseOperationOptions} [options={}] Optional option to configure lease management operations.
   * @memberof LeaseClient
   */
  public async acquire(duration: number, options: LeaseOperationOptions = {}) {
    const aborter = options.abortSignal || Aborter.none;
    const proposedLeaseId = this._leaseId;
    const response = await this.containerOrBlob.acquireLease({
      abortSignal: aborter,
      duration,
      modifiedAccessConditions: options.modifiedAccessConditions,
      proposedLeaseId
    });

    if (!response.errorCode && response.leaseId) {
      this._leaseId = response.leaseId!;
    } else {
      throw new Error("Error changing lease Id to " + proposedLeaseId + ", error code: '" + response.errorCode + "'.");
    }
  }

  /**
   * To change the ID of the lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {string} proposedLeaseId
   * @param {LeaseOperationOptions} [options={}] Optional option to configure lease management operations.
   * @memberof LeaseClient
   */
  public async chanageId(proposedLeaseId: string, options: LeaseOperationOptions = {}) {
    const aborter = options.abortSignal || Aborter.none;
    const response = await this.containerOrBlob.changeLease(this._leaseId, proposedLeaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
    if (!response.errorCode && response.leaseId) {
      this._leaseId = response.leaseId!;
    } else {
      throw new Error("Error changing lease Id to " + proposedLeaseId + ", error code: '" + response.errorCode + "'.");
    }
  }

  /**
   * To free the lease if it is no longer needed so that another client may
   * immediately acquire a lease against the container or the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {LeaseOperationOptions} [options={}] Optional option to configure lease management operations.
   * @memberof LeaseClient
   */
  public async release(options: LeaseOperationOptions = {}) {
    const aborter = options.abortSignal || Aborter.none;
    await this.containerOrBlob.releaseLease(this._leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To renew the lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {LeaseOperationOptions} [options={}] Optional option to configure lease management operations.
   * @memberof LeaseClient
   */
  public async renew(options: LeaseOperationOptions = {}) {
    const aborter = options.abortSignal || Aborter.none;
    await this.containerOrBlob.renewLease(this._leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }
}
