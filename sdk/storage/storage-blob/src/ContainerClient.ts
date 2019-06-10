// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse } from "@azure/ms-rest-js";
import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { Container } from "./generated/lib/operations";
import { ContainerAccessConditions, Metadata } from "./models";
import { Pipeline } from "./Pipeline";
import { ETagNone } from "./utils/constants";
import { appendToURLPath, truncatedISO8061Date } from "./utils/utils.common";
import { BlobClient, StorageClient } from "./internal";
import { AppendBlobClient } from "./internal";
import { BlockBlobClient } from "./internal";
import { PageBlobClient } from "./internal";
import { LeaseClient } from "./LeaseClient";

/**
 * Options to configure Container - Create operation.
 *
 * @export
 * @interface ContainerCreateOptions
 */
export interface ContainerCreateOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * A collection of key-value string pair to associate with the container.
   *
   * @type {Metadata}
   * @memberof ContainerCreateOptions
   */
  metadata?: Metadata;
  /**
   * Specifies whether data in the container may be accessed publicly and the level of access. Possible values include:
   * - `container`: Specifies full public read access for container and blob data. Clients can enumerate blobs within the container via anonymous request, but cannot enumerate containers within the storage account.
   * - `blob`: Specifies public read access for blobs. Blob data within this container can be read via anonymous request, but container data is not available. Clients cannot enumerate blobs within the container via anonymous request.
   *
   * @type {Models.PublicAccessType}
   * @memberof ContainerCreateOptions
   */
  access?: Models.PublicAccessType;
}

/**
 * Options to configure Container - Get Properties operation.
 *
 * @export
 * @interface ContainerGetPropertiesOptions
 */
export interface ContainerGetPropertiesOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerGetPropertiesOptions
   */
  abortSignal?: Aborter;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {Models.LeaseAccessConditions}
   * @memberof ContainerGetPropertiesOptions
   */
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

/**
 * Options to configure Container - Delete operation.
 *
 * @export
 * @interface ContainerDeleteMethodOptions
 */
export interface ContainerDeleteMethodOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerDeleteMethodOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when deleting the container.
   *
   * @type {ContainerAccessConditions}
   * @memberof ContainerDeleteMethodOptions
   */
  containerAccessConditions?: ContainerAccessConditions;
}

/**
 * Options to configure Container - Set Metadata operation.
 *
 * @export
 * @interface ContainerSetMetadataOptions
 */
export interface ContainerSetMetadataOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerSetMetadataOptions
   */
  abortSignal?: Aborter;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {ContainerAccessConditions}
   * @memberof ContainerSetMetadataOptions
   */
  containerAccessConditions?: ContainerAccessConditions;
}

/**
 * Options to configure Container - Get Access Policy operation.
 *
 * @export
 * @interface ContainerGetAccessPolicyOptions
 */
export interface ContainerGetAccessPolicyOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerGetAccessPolicyOptions
   */
  abortSignal?: Aborter;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {Models.LeaseAccessConditions}
   * @memberof ContainerGetAccessPolicyOptions
   */
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

/**
 * Signed identifier.
 *
 * @export
 * @interface SignedIdentifier
 */
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

/**
 * Options to configure Container - Set Access Policy operation.
 *
 * @export
 * @interface ContainerSetAccessPolicyOptions
 */
export interface ContainerSetAccessPolicyOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerSetAccessPolicyOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when setting the access policy.
   *
   * @type {ContainerAccessConditions}
   * @memberof ContainerSetAccessPolicyOptions
   */
  containerAccessConditions?: ContainerAccessConditions;
}

/**
 * Options to configure Container - Acquire Lease operation.
 *
 * @export
 * @interface ContainerAcquireLeaseOptions
 */
export interface ContainerAcquireLeaseOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerAcquireLeaseOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when acquiring the lease.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof ContainerAcquireLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Container - Release Lease operation.
 *
 * @export
 * @interface ContainerReleaseLeaseOptions
 */
export interface ContainerReleaseLeaseOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerReleaseLeaseOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when releasing the lease.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof ContainerReleaseLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Container - Renew Lease operation.
 *
 * @export
 * @interface ContainerRenewLeaseOptions
 */
export interface ContainerRenewLeaseOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerRenewLeaseOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when renewing the lease.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof ContainerRenewLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Container - Break Lease operation.
 *
 * @export
 * @interface ContainerBreakLeaseOptions
 */
export interface ContainerBreakLeaseOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerBreakLeaseOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when breaking the lease.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof ContainerBreakLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Container - Change Lease operation.
 *
 * @export
 * @interface ContainerChangeLeaseOptions
 */
export interface ContainerChangeLeaseOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerChangeLeaseOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when changing the lease.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof ContainerChangeLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Container - List Blobs Segment operation.
 *
 * @export
 * @interface ContainerListBlobsSegmentOptions
 */
export interface ContainerListBlobsSegmentOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ContainerListBlobsSegmentOptions
   */
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
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ContainerClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.containerContext = new Container(this.storageClientContext);
  }

  /**
   * Creates a new container under the specified account. If the container with
   * the same name already exists, the operation fails.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param {ContainerCreateOptions} [options] Optional options to Container Create operation.
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
   * @param {ContainersGetPropertiesOptions} [options] Optional options to Container Get Properties operation.
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
   * @param {ContainerDeleteMethodOptions} [options] Optional options to Container Delete operation.
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
   * @param {ContainerSetMetadataOptions} [options] Optional options to Container Set Metadata operation.
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
   * @param {ContainerGetAccessPolicyOptions} [options] Optional options to Container Get Access Policy operation.
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
   * @param {Models.PublicAccessType} [access] The level of public access to data in the container.
   * @param {SignedIdentifier[]} [containerAcl] Array of elements each having a unique Id and details of the access policy.
   * @param {ContainerSetAccessPolicyOptions} [options] Optional options to Container Set Access Policy operation.
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
   * Get a LeaseClient that manages leases on the container.
   *
   * @param {string} [proposeLeaseId] Initial proposed lease Id.
   * @returns
   * @memberof ContainerClient
   */
  public getLeaseClient(proposeLeaseId?: string) {
    return new LeaseClient(this, proposeLeaseId);
  }

  /**
   * Iterates over blobs under the specified container.
   *
   * @param {ContainerListBlobsSegmentOptions} [options={}] Options to list blobs(optional)
   * @returns {AsyncIterableIterator<Models.BlobItem>}
   * @memberof ContainerClient
   *
   * @example
   * for await (const blob of containerClient.listBlobs()) {
   *   console.log(`Container: ${blob.name}`);
   * }
   *
   * @example
   * let iter1 = containerClient.listBlobs();
   * let i = 1;
   * for await (const blob of iter1) {
   *   console.log(`${i}: ${blob.name}`);
   *   i++;
   * }
   *
   * @example
   * let iter2 = await containerClient.listBlobs();
   * i = 1;
   * let blobItem = await iter2.next();
   * do {
   *  console.log(`Blob ${i++}: ${blobItem.value.name}`);
   *  blobItem = await iter2.next();
   * } while (blobItem.value);
   *
   */
  public async *listBlobsFlat(
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<Models.BlobItem> {
    let marker = undefined;
    const containerClient = this;
    const aborter = !options.abortSignal ? Aborter.none : options.abortSignal;
    let listBlobsResponse;
    do {
      listBlobsResponse = await containerClient.listBlobFlatSegment(marker, {
        ...options,
        abortSignal: aborter
      });
      marker = listBlobsResponse.nextMarker;
      yield* listBlobsResponse.segment.blobItems;
    } while (marker);
  }

  /**
   * listBlobFlatSegment returns a single segment of blobs starting from the
   * specified Marker. Use an empty Marker to start enumeration from the beginning.
   * After getting a segment, process it, and then call ListBlobsFlatSegment again
   * (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
   * @param {ContainerListBlobsSegmentOptions} [options] Optional options to Container List Blob Flat Segment operation.
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
   * @param {string} delimiter The charactor or string used to define the virtual hierarchy
   * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
   * @param {ContainerListBlobsSegmentOptions} [options] Optional options to Container List Blob Hierarchy Segment operation.
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
