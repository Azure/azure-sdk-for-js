import { HttpResponse } from "@azure/ms-rest-js";

import { Aborter } from "./Aborter";
import * as Models from "./generated/src/models";
import { Container } from "./generated/src/operations";
import { IContainerAccessConditions, IMetadata } from "./models";
import { Pipeline } from "./Pipeline";
import { ServiceURL } from "./ServiceURL";
import { StorageURL } from "./StorageURL";
import { ETagNone } from "./utils/constants";
import { appendToURLPath, truncatedISO8061Date } from "./utils/utils.common";

export interface IContainerCreateOptions {
  metadata?: IMetadata;
  access?: Models.PublicAccessType;
}

export interface IContainerGetPropertiesOptions {
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface IContainerDeleteMethodOptions {
  containerAccessConditions?: IContainerAccessConditions;
}

export interface IContainerSetMetadataOptions {
  containerAccessConditions?: IContainerAccessConditions;
}

export interface IContainerGetAccessPolicyOptions {
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface ISignedIdentifier {
  /**
   * @member {string} id a unique id
   */
  id: string;
  /**
   * @member {AccessPolicy} accessPolicy
   */
  accessPolicy: {
    /**
     * @member {Date} start Optional. The date-time the policy is active
     */
    start?: Date;
    /**
     * @member {string} expiry Optional. The date-time the policy expires
     */
    expiry?: Date;
    /**
     * @member {string} permission The permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     */
    permission: string;
  };
}

export declare type ContainerGetAccessPolicyResponse = {
  signedIdentifiers: ISignedIdentifier[];
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

export interface IContainerSetAccessPolicyOptions {
  containerAccessConditions?: IContainerAccessConditions;
}

export interface IContainerAcquireLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IContainerReleaseLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IContainerRenewLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IContainerBreakLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IContainerChangeLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IContainerListBlobsSegmentOptions {
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
 * A ContainerURL represents a URL to the Azure Storage container allowing you to manipulate its blobs.
 *
 * @export
 * @class ContainerURL
 * @extends {StorageURL}
 */
export class ContainerURL extends StorageURL {
  /**
   * Creates a ContainerURL object from ServiceURL
   *
   * @param serviceURL A ServiceURL object
   * @param containerName A container name
   */
  public static fromServiceURL(serviceURL: ServiceURL, containerName: string): ContainerURL {
    return new ContainerURL(
      appendToURLPath(serviceURL.url, encodeURIComponent(containerName)),
      serviceURL.pipeline
    );
  }

  /**
   * containerContext provided by protocol layer.
   *
   * @private
   * @type {Containers}
   * @memberof ContainerURL
   */
  private containerContext: Container;

  /**
   * Creates an instance of ContainerURL.
   * @param {string} url A URL string pointing to Azure Storage blob container, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer?sasString".
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ContainerURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.containerContext = new Container(this.storageClientContext);
  }

  /**
   * Creates a new ContainerURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {ContainerURL}
   * @memberof ContainerURL
   */
  public withPipeline(pipeline: Pipeline): ContainerURL {
    return new ContainerURL(this.url, pipeline);
  }

  /**
   * Creates a new container under the specified account. If the container with
   * the same name already exists, the operation fails.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IContainerCreateOptions} [options]
   * @returns {Promise<Models.ContainerCreateResponse>}
   * @memberof ContainerURL
   */
  public async create(
    aborter: Aborter,
    options: IContainerCreateOptions = {}
  ): Promise<Models.ContainerCreateResponse> {
    // Spread operator in destructuring assignments,
    // this will filter out unwanted properties from the response object into result object
    return this.containerContext.create({
      ...options,
      abortSignal: aborter
    });
  }

  /**
   * Returns all user-defined metadata and system properties for the specified
   * container. The data returned does not include the container's list of blobs.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IContainersGetPropertiesOptions} [options]
   * @returns {Promise<Models.ContainerGetPropertiesResponse>}
   * @memberof ContainerURL
   */
  public async getProperties(
    aborter: Aborter,
    options: IContainerGetPropertiesOptions = {}
  ): Promise<Models.ContainerGetPropertiesResponse> {
    if (!options.leaseAccessConditions) {
      options.leaseAccessConditions = {};
    }

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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {Models.ContainersDeleteMethodOptionalParams} [options]
   * @returns {Promise<Models.ContainerDeleteResponse>}
   * @memberof ContainerURL
   */
  public async delete(
    aborter: Aborter,
    options: IContainerDeleteMethodOptions = {}
  ): Promise<Models.ContainerDeleteResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IMetadata} [metadata] Replace existing metadata with this value.
   *                               If no value provided the existing metadata will be removed.
   * @param {IContainerSetMetadataOptions} [options]
   * @returns {Promise<Models.ContainerSetMetadataResponse>}
   * @memberof ContainerURL
   */
  public async setMetadata(
    aborter: Aborter,
    metadata?: IMetadata,
    options: IContainerSetMetadataOptions = {}
  ): Promise<Models.ContainerSetMetadataResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IContainerGetAccessPolicyOptions} [options]
   * @returns {Promise<ContainerGetAccessPolicyResponse>}
   * @memberof ContainerURL
   */
  public async getAccessPolicy(
    aborter: Aborter,
    options: IContainerGetAccessPolicyOptions = {}
  ): Promise<ContainerGetAccessPolicyResponse> {
    if (!options.leaseAccessConditions) {
      options.leaseAccessConditions = {};
    }

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
      clientRequestId: response.clientRequestId,
      signedIdentifiers: [],
      version: response.version
    };

    for (const identifier of response) {
      const accessPolicy: any = {
        permission: identifier.accessPolicy.permission,
      };

      if (identifier.accessPolicy.expiry) {
        accessPolicy.expiry = new Date(identifier.accessPolicy.expiry);
      }

      if (identifier.accessPolicy.start) {
        accessPolicy.start = new Date(identifier.accessPolicy.start);
      }

      res.signedIdentifiers.push({
        accessPolicy,
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {PublicAccessType} [access]
   * @param {ISignedIdentifier[]} [containerAcl]
   * @param {IContainerSetAccessPolicyOptions} [options]
   * @returns {Promise<Models.ContainerSetAccessPolicyResponse>}
   * @memberof ContainerURL
   */
  public async setAccessPolicy(
    aborter: Aborter,
    access?: Models.PublicAccessType,
    containerAcl?: ISignedIdentifier[],
    options: IContainerSetAccessPolicyOptions = {}
  ): Promise<Models.ContainerSetAccessPolicyResponse> {
    options.containerAccessConditions = options.containerAccessConditions || {};
    const acl: Models.SignedIdentifier[] = [];
    for (const identifier of containerAcl || []) {
      acl.push({
        accessPolicy: {
          expiry: identifier.accessPolicy.expiry ? truncatedISO8061Date(identifier.accessPolicy.expiry) : "",
          permission: identifier.accessPolicy.permission,
          start: identifier.accessPolicy.start? truncatedISO8061Date(identifier.accessPolicy.start) : ""
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} proposedLeaseId Can be specified in any valid GUID string format
   * @param {number} duration Must be between 15 to 60 seconds, or infinite (-1)
   * @param {IContainerAcquireLeaseOptions} [options]
   * @returns {Promise<Models.ContainerAcquireLeaseResponse>}
   * @memberof ContainerURL
   */
  public async acquireLease(
    aborter: Aborter,
    proposedLeaseId: string,
    duration: number,
    options: IContainerAcquireLeaseOptions = {}
  ): Promise<Models.ContainerAcquireLeaseResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} leaseId
   * @param {IContainerReleaseLeaseOptions} [options]
   * @returns {Promise<Models.ContainerReleaseLeaseResponse>}
   * @memberof ContainerURL
   */
  public async releaseLease(
    aborter: Aborter,
    leaseId: string,
    options: IContainerReleaseLeaseOptions = {}
  ): Promise<Models.ContainerReleaseLeaseResponse> {
    return this.containerContext.releaseLease(leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To renew an existing lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} leaseId
   * @param {IContainerRenewLeaseOptions} [options]
   * @returns {Promise<Models.ContainerRenewLeaseResponse>}
   * @memberof ContainerURL
   */
  public async renewLease(
    aborter: Aborter,
    leaseId: string,
    options: IContainerRenewLeaseOptions = {}
  ): Promise<Models.ContainerRenewLeaseResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} period break period
   * @param {IContainerBreakLeaseOptions} [options]
   * @returns {Promise<Models.ContainerBreakLeaseResponse>}
   * @memberof ContainerURL
   */
  public async breakLease(
    aborter: Aborter,
    period: number,
    options: IContainerBreakLeaseOptions = {}
  ): Promise<Models.ContainerBreakLeaseResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} leaseId
   * @param {string} proposedLeaseId
   * @param {IContainerChangeLeaseOptions} [options]
   * @returns {Promise<Models.ContainerChangeLeaseResponse>}
   * @memberof ContainerURL
   */
  public async changeLease(
    aborter: Aborter,
    leaseId: string,
    proposedLeaseId: string,
    options: IContainerChangeLeaseOptions = {}
  ): Promise<Models.ContainerChangeLeaseResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker]
   * @param {IContainerListBlobsSegmentOptions} [options]
   * @returns {Promise<Models.ContainerListBlobFlatSegmentResponse>}
   * @memberof ContainerURL
   */
  public async listBlobFlatSegment(
    aborter: Aborter,
    marker?: string,
    options: IContainerListBlobsSegmentOptions = {}
  ): Promise<Models.ContainerListBlobFlatSegmentResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} delimiter
   * @param {IContainerListBlobsSegmentOptions} [options]
   * @returns {Promise<Models.ContainerListBlobHierarchySegmentResponse>}
   * @memberof ContainerURL
   */
  public async listBlobHierarchySegment(
    aborter: Aborter,
    delimiter: string,
    marker?: string,
    options: IContainerListBlobsSegmentOptions = {}
  ): Promise<Models.ContainerListBlobHierarchySegmentResponse> {
    return this.containerContext.listBlobHierarchySegment(delimiter, {
      abortSignal: aborter,
      marker,
      ...options
    });
  }
}
