import { HttpResponse } from "@azure/ms-rest-js";
import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { Container } from "./generated/lib/operations";
import { ContainerAccessConditions, Metadata } from "./models";
import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { ETagNone } from "./utils/constants";
import { appendToURLPath, truncatedISO8061Date } from "./utils/utils.common";
import { AppendBlobClient } from "./AppendBlobClient";
import { BlockBlobClient } from "./BlockBlobClient";
import { PageBlobClient } from "./PageBlobClient";
import { BlobClient } from './BlobClient';

export interface ContainerCreateOptions {
  abortSignal?: Aborter;
  metadata?: Metadata;
  access?: Models.PublicAccessType;
}

export interface ContainerGetPropertiesOptions {
  abortSignal?: Aborter;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface ContainerDeleteMethodOptions {
  abortSignal?: Aborter;
  containerAccessConditions?: ContainerAccessConditions;
}

export interface ContainerSetMetadataOptions {
  abortSignal?: Aborter;
  containerAccessConditions?: ContainerAccessConditions;
}

export interface ContainerGetAccessPolicyOptions {
  abortSignal?: Aborter;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface SignedIdentifier {
  /**
   * @member {string} id a unique id
   */
  id: string;
  /**
   * @member {AccessPolicy} accessPolicy
   */
  accessPolicy: {
    /**
     * @member {Date} start the date-time the policy is active. A validate ISO string format, or Date
     */
    start: Date;
    /**
     * @member {string} expiry the date-time the policy expires. A validate ISO string format, or Date
     */
    expiry: Date;
    /**
     * @member {string} permission the permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     */
    permission: string;
  };
}

export declare type ContainerGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
} & Models.ContainerGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: Models.ContainerGetAccessPolicyHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Models.SignedIdentifier[];
    };
  };

export interface ContainerSetAccessPolicyOptions {
  abortSignal?: Aborter;
  containerAccessConditions?: ContainerAccessConditions;
}

export interface ContainerAcquireLeaseOptions {
  abortSignal?: Aborter;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface ContainerReleaseLeaseOptions {
  abortSignal?: Aborter;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface ContainerRenewLeaseOptions {
  abortSignal?: Aborter;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface ContainerBreakLeaseOptions {
  abortSignal?: Aborter;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface ContainerChangeLeaseOptions {
  abortSignal?: Aborter;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface ContainerListBlobsSegmentOptions {
  abortSignal?: Aborter;
  /**
   * @member {string} [prefix] Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * @member {number} [maxresults] Specifies the maximum number of containers
   * to return. If the request does not specify maxresults, or specifies a
   * value greater than 5000, the server will return up to 5000 items. Note
   * that if the listing operation crosses a partition boundary, then the
   * service will return a continuation token for retrieving the remainder of
   * the results. For this reason, it is possible that the service will return
   * fewer results than specified by maxresults, or than the default of 5000.
   */
  maxresults?: number;
  /**
   * @member {ListBlobsIncludeItem[]} [include] Include this parameter to
   * specify one or more datasets to include in the response.
   */
  include?: Models.ListBlobsIncludeItem[];
}

/**
 * A ContainerClient represents a URL to the Azure Storage container allowing you to manipulate its blobs.
 *
 * @export
 * @class ContainerClient
 * @extends {StorageClient}
 */
export class ContainerClient extends StorageClient {
  /**
   * containerContext provided by protocol layer.
   *
   * @private
   * @type {Containers}
   * @memberof ContainerClient
   */
  private containerContext: Container;

  /**
   * Creates an instance of ContainerClient.
   * @param {string} url A URL string pointing to Azure Storage blob container, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer?sasString".
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ContainerClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.containerContext = new Container(this.storageClientContext);
  }

  /**
   * Creates a new ContainerClient object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {ContainerClient}
   * @memberof ContainerClient
   */
  public withPipeline(pipeline: Pipeline): ContainerClient {
    return new ContainerClient(this.url, pipeline);
  }

  /**
   * Creates a new container under the specified account. If the container with
   * the same name already exists, the operation fails.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param {ContainerCreateOptions} [options]
   * @returns {Promise<Models.ContainerCreateResponse>}
   * @memberof ContainerClient
   */
  public async create(
    options: ContainerCreateOptions = {}
  ): Promise<Models.ContainerCreateResponse> {
    if (!options.abortSignal) {
      options.abortSignal = Aborter.none;
    }
    // Spread operator in destructuring assignments,
    // this will filter out unwanted properties from the response object into result object
    return this.containerContext.create({
      ...options
    });
  }

  /**
   * Creates a BlobClient object.
   *
   * @param {string} blobName A blob name
   * @returns
   * @memberof BlobClient
   */
  public createBlobClient(blobName: string) {
    return new BlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Creates a AppendBlobClient object.
   *
   * @param {string} blobName An append blob name
   * @returns {AppendBlobClient}
   * @memberof ContainerClient
   */
  public createAppendBlobClient(
    blobName: string
  ): AppendBlobClient {
    return new AppendBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Creates a BlockBlobClient object.
   *
   * @param {string} blobName A block blob name
   * @returns {BlockBlobClient}
   * @memberof ContainerClient
   */
  public createBlockBlobClient(
    blobName: string
  ): BlockBlobClient {
    return new BlockBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Creates a PageBlobClient object.
   *
   * @param {string} blobName A page blob name
   * @returns {PageBlobClient}
   * @memberof ContainerClient
   */
  public createPageBlobClient(
    blobName: string
  ): PageBlobClient {
    return new PageBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Returns all user-defined metadata and system properties for the specified
   * container. The data returned does not include the container's list of blobs.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-properties
   *
   * @param {ContainersGetPropertiesOptions} [options]
   * @returns {Promise<Models.ContainerGetPropertiesResponse>}
   * @memberof ContainerClient
   */
  public async getProperties(
    options: ContainerGetPropertiesOptions = {}
  ): Promise<Models.ContainerGetPropertiesResponse> {
    if (!options.leaseAccessConditions) {
      options.leaseAccessConditions = {};
    }

    const aborter = options.abortSignal || Aborter.none;

    return this.containerContext.getProperties({
      abortSignal: aborter,
      ...options.leaseAccessConditions
    });
  }

  /**
   * Marks the specified container for deletion. The container and any blobs
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
   *
   * @param {Models.ContainersDeleteMethodOptionalParams} [options]
   * @returns {Promise<Models.ContainerDeleteResponse>}
   * @memberof ContainerClient
   */
  public async delete(
    options: ContainerDeleteMethodOptions = {}
  ): Promise<Models.ContainerDeleteResponse> {
    const aborter = options.abortSignal || Aborter.none;

    if (!options.containerAccessConditions) {
      options.containerAccessConditions = {};
    }

    if (!options.containerAccessConditions.modifiedAccessConditions) {
      options.containerAccessConditions.modifiedAccessConditions = {};
    }

    if (!options.containerAccessConditions.leaseAccessConditions) {
      options.containerAccessConditions.leaseAccessConditions = {};
    }

    if (
      (options.containerAccessConditions.modifiedAccessConditions.ifMatch &&
        options.containerAccessConditions.modifiedAccessConditions.ifMatch !== ETagNone) ||
      (options.containerAccessConditions.modifiedAccessConditions.ifNoneMatch &&
        options.containerAccessConditions.modifiedAccessConditions.ifNoneMatch !== ETagNone)
    ) {
      throw new RangeError(
        "the IfMatch and IfNoneMatch access conditions must have their default\
        values because they are ignored by the service"
      );
    }

    return this.containerContext.deleteMethod({
      abortSignal: aborter,
      leaseAccessConditions: options.containerAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.containerAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Sets one or more user-defined name-value pairs for the specified container.
   *
   * If no option provided, or no metadata defined in the parameter, the container
   * metadata will be removed.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-metadata
   *
   * @param {Metadata} [metadata] Replace existing metadata with this value.
   *                               If no value provided the existing metadata will be removed.
   * @param {ContainerSetMetadataOptions} [options]
   * @returns {Promise<Models.ContainerSetMetadataResponse>}
   * @memberof ContainerClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: ContainerSetMetadataOptions = {}
  ): Promise<Models.ContainerSetMetadataResponse> {
    const aborter = options.abortSignal || Aborter.none;

    if (!options.containerAccessConditions) {
      options.containerAccessConditions = {};
    }

    if (!options.containerAccessConditions.modifiedAccessConditions) {
      options.containerAccessConditions.modifiedAccessConditions = {};
    }

    if (!options.containerAccessConditions.leaseAccessConditions) {
      options.containerAccessConditions.leaseAccessConditions = {};
    }

    if (
      options.containerAccessConditions.modifiedAccessConditions.ifUnmodifiedSince ||
      (options.containerAccessConditions.modifiedAccessConditions.ifMatch &&
        options.containerAccessConditions.modifiedAccessConditions.ifMatch !== ETagNone) ||
      (options.containerAccessConditions.modifiedAccessConditions.ifNoneMatch &&
        options.containerAccessConditions.modifiedAccessConditions.ifNoneMatch !== ETagNone)
    ) {
      throw new RangeError(
        "the IfUnmodifiedSince, IfMatch, and IfNoneMatch must have their default values\
        because they are ignored by the blob service"
      );
    }

    return this.containerContext.setMetadata({
      abortSignal: aborter,
      leaseAccessConditions: options.containerAccessConditions.leaseAccessConditions,
      metadata,
      modifiedAccessConditions: options.containerAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Gets the permissions for the specified container. The permissions indicate
   * whether container data may be accessed publicly.
   *
   * WARNING: JavaScript Date will potential lost precision when parsing start and expiry string.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-acl
   *
   * @param {ContainerGetAccessPolicyOptions} [options]
   * @returns {Promise<ContainerGetAccessPolicyResponse>}
   * @memberof ContainerClient
   */
  public async getAccessPolicy(
    options: ContainerGetAccessPolicyOptions = {}
  ): Promise<ContainerGetAccessPolicyResponse> {
    if (!options.leaseAccessConditions) {
      options.leaseAccessConditions = {};
    }
    const aborter = options.abortSignal || Aborter.none;

    const response = await this.containerContext.getAccessPolicy({
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions
    });

    const res: ContainerGetAccessPolicyResponse = {
      _response: response._response,
      blobPublicAccess: response.blobPublicAccess,
      date: response.date,
      eTag: response.eTag,
      errorCode: response.errorCode,
      lastModified: response.lastModified,
      requestId: response.requestId,
      signedIdentifiers: [],
      version: response.version
    };

    for (const identifier of response) {
      res.signedIdentifiers.push({
        accessPolicy: {
          expiry: new Date(identifier.accessPolicy.expiry),
          permission: identifier.accessPolicy.permission,
          start: new Date(identifier.accessPolicy.start)
        },
        id: identifier.id
      });
    }

    return res;
  }

  /**
   * Sets the permissions for the specified container. The permissions indicate
   * whether blobs in a container may be accessed publicly.
   *
   * When you set permissions for a container, the existing permissions are replaced.
   * If no access or containerAcl provided, the existing container ACL will be
   * removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
   *
   * @param {PublicAccessType} [access]
   * @param {SignedIdentifier[]} [containerAcl]
   * @param {ContainerSetAccessPolicyOptions} [options]
   * @returns {Promise<Models.ContainerSetAccessPolicyResponse>}
   * @memberof ContainerClient
   */
  public async setAccessPolicy(
    access?: Models.PublicAccessType,
    containerAcl?: SignedIdentifier[],
    options: ContainerSetAccessPolicyOptions = {}
  ): Promise<Models.ContainerSetAccessPolicyResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.containerAccessConditions = options.containerAccessConditions || {};
    const acl: Models.SignedIdentifier[] = [];
    for (const identifier of containerAcl || []) {
      acl.push({
        accessPolicy: {
          expiry: truncatedISO8061Date(identifier.accessPolicy.expiry),
          permission: identifier.accessPolicy.permission,
          start: truncatedISO8061Date(identifier.accessPolicy.start)
        },
        id: identifier.id
      });
    }

    return this.containerContext.setAccessPolicy({
      abortSignal: aborter,
      access,
      containerAcl: acl,
      leaseAccessConditions: options.containerAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.containerAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Establishes and manages a lock on a container for delete operations.
   * The lock duration can be 15 to 60 seconds, or can be infinite.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   *
   * @param {string} proposedLeaseId Can be specified in any valid GUID string format
   * @param {number} duration Must be between 15 to 60 seconds, or infinite (-1)
   * @param {ContainerAcquireLeaseOptions} [options]
   * @returns {Promise<Models.ContainerAcquireLeaseResponse>}
   * @memberof ContainerClient
   */
  public async acquireLease(
    proposedLeaseId: string,
    duration: number,
    options: ContainerAcquireLeaseOptions = {}
  ): Promise<Models.ContainerAcquireLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.containerContext.acquireLease({
      abortSignal: aborter,
      duration,
      modifiedAccessConditions: options.modifiedAccessConditions,
      proposedLeaseId
    });
  }

  /**
   * To free the lease if it is no longer needed so that another client may
   * immediately acquire a lease against the container.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   *
   * @param {string} leaseId
   * @param {ContainerReleaseLeaseOptions} [options]
   * @returns {Promise<Models.ContainerReleaseLeaseResponse>}
   * @memberof ContainerClient
   */
  public async releaseLease(
    leaseId: string,
    options: ContainerReleaseLeaseOptions = {}
  ): Promise<Models.ContainerReleaseLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.containerContext.releaseLease(leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To renew an existing lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   *
   * @param {string} leaseId
   * @param {ContainerRenewLeaseOptions} [options]
   * @returns {Promise<Models.ContainerRenewLeaseResponse>}
   * @memberof ContainerClient
   */
  public async renewLease(
    leaseId: string,
    options: ContainerRenewLeaseOptions = {}
  ): Promise<Models.ContainerRenewLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.containerContext.renewLease(leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To end the lease but ensure that another client cannot acquire a new lease
   * until the current lease period has expired.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   *
   * @param {number} period break period
   * @param {ContainerBreakLeaseOptions} [options]
   * @returns {Promise<Models.ContainerBreakLeaseResponse>}
   * @memberof ContainerClient
   */
  public async breakLease(
    period: number,
    options: ContainerBreakLeaseOptions = {}
  ): Promise<Models.ContainerBreakLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.containerContext.breakLease({
      abortSignal: aborter,
      breakPeriod: period,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To change the ID of an existing lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   *
   * @param {string} leaseId
   * @param {string} proposedLeaseId
   * @param {ContainerChangeLeaseOptions} [options]
   * @returns {Promise<Models.ContainerChangeLeaseResponse>}
   * @memberof ContainerClient
   */
  public async changeLease(
    leaseId: string,
    proposedLeaseId: string,
    options: ContainerChangeLeaseOptions = {}
  ): Promise<Models.ContainerChangeLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.containerContext.changeLease(leaseId, proposedLeaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * listBlobFlatSegment returns a single segment of blobs starting from the
   * specified Marker. Use an empty Marker to start enumeration from the beginning.
   * After getting a segment, process it, and then call ListBlobsFlatSegment again
   * (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param {string} [marker]
   * @param {ContainerListBlobsSegmentOptions} [options]
   * @returns {Promise<Models.ContainerListBlobFlatSegmentResponse>}
   * @memberof ContainerClient
   */
  public async listBlobFlatSegment(
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): Promise<Models.ContainerListBlobFlatSegmentResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.containerContext.listBlobFlatSegment({
      abortSignal: aborter,
      marker,
      ...options
    });
  }

  /**
   * listBlobHierarchySegment returns a single segment of blobs starting from
   * the specified Marker. Use an empty Marker to start enumeration from the
   * beginning. After getting a segment, process it, and then call ListBlobsHierarchicalSegment
   * again (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param {string} delimiter
   * @param {ContainerListBlobsSegmentOptions} [options]
   * @returns {Promise<Models.ContainerListBlobHierarchySegmentResponse>}
   * @memberof ContainerClient
   */
  public async listBlobHierarchySegment(
    delimiter: string,
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): Promise<Models.ContainerListBlobHierarchySegmentResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.containerContext.listBlobHierarchySegment(delimiter, {
      abortSignal: aborter,
      marker,
      ...options
    });
  }
}
