// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  HttpRequestBody,
  HttpResponse,
  TokenCredential,
  isTokenCredential,
  isNode,
  getDefaultProxySettings
} from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  LeaseAccessConditions,
  ContainerGetAccessPolicyHeaders,
  SignedIdentifierModel,
  PublicAccessType,
  ListBlobsIncludeItem,
  ModifiedAccessConditions,
  ContainerCreateResponse,
  ContainerGetPropertiesResponse,
  ContainerDeleteResponse,
  ContainerSetMetadataResponse,
  ContainerSetAccessPolicyResponse,
  BlockBlobUploadResponse,
  BlobDeleteResponse,
  ContainerListBlobFlatSegmentResponse,
  ContainerListBlobHierarchySegmentResponse,
  BlobItem,
  BlobPrefix
} from "./generatedModels";
import { Container } from "./generated/src/operations";
import { BlobRequestConditions, Metadata } from "./models";
import { DevelopmentConnectionString } from "./utils/constants";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import { ETagNone } from "./utils/constants";
import {
  appendToURLPath,
  truncatedISO8061Date,
  extractConnectionStringParts,
  getValueInConnString
} from "./utils/utils.common";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { BlobLeaseClient } from "./BlobLeaseClient";
import "@azure/core-paging";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { createSpan } from "./utils/tracing";
import { CommonOptions, StorageClient } from "./StorageClient";
import {
  BlobClient,
  AppendBlobClient,
  BlockBlobClient,
  PageBlobClient,
  BlockBlobUploadOptions,
  BlobDeleteOptions
} from "./BlobClient";

/**
 * Options to configure {@link ContainerClient.create} operation.
 *
 * @export
 * @interface ContainerCreateOptions
 */
export interface ContainerCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerCreateOptions
   */
  abortSignal?: AbortSignalLike;
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
   * @type {PublicAccessType}
   * @memberof ContainerCreateOptions
   */
  access?: PublicAccessType;
}

/**
 * Options to configure {@link ContainerClient.getProperties} operation.
 *
 * @export
 * @interface ContainerGetPropertiesOptions
 */
export interface ContainerGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerGetPropertiesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {LeaseAccessConditions}
   * @memberof ContainerGetPropertiesOptions
   */
  conditions?: LeaseAccessConditions;
}

/**
 * Options to configure {@link ContainerClient.delete} operation.
 *
 * @export
 * @interface ContainerDeleteMethodOptions
 */
export interface ContainerDeleteMethodOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerDeleteMethodOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when deleting the container.
   *
   * @type {BlobRequestConditions}
   * @memberof ContainerDeleteMethodOptions
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure {@link ContainerClient.exists} operation.
 *
 * @export
 * @interface ContainerExistsOptions
 */
export interface ContainerExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerDeleteMethodOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link ContainerClient.setMetadata} operation.
 *
 * @export
 * @interface ContainerSetMetadataOptions
 */
export interface ContainerSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerSetMetadataOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {BlobRequestConditions}
   * @memberof ContainerSetMetadataOptions
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure {@link ContainerClient.getAccessPolicy} operation.
 *
 * @export
 * @interface ContainerGetAccessPolicyOptions
 */
export interface ContainerGetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerGetAccessPolicyOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {LeaseAccessConditions}
   * @memberof ContainerGetAccessPolicyOptions
   */
  conditions?: LeaseAccessConditions;
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
     * @member {Date} startsOn Optional. The date-time the policy is active
     */
    startsOn?: Date;
    /**
     * @member {Date} expiresOn Optional. The date-time the policy expires
     */
    expiresOn?: Date;
    /**
     * @member {string} permissions The permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     */
    permissions: string;
  };
}

/**
 * Contains response data for the {@link ContainerClient.getAccessPolicy} operation.
 */
export declare type ContainerGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifierModel[];
} & ContainerGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ContainerGetAccessPolicyHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: SignedIdentifierModel[];
    };
  };

/**
 * Options to configure {@link ContainerClient.setAccessPolicy} operation.
 *
 * @export
 * @interface ContainerSetAccessPolicyOptions
 */
export interface ContainerSetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerSetAccessPolicyOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting the access policy.
   *
   * @type {BlobRequestConditions}
   * @memberof ContainerSetAccessPolicyOptions
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure Container - Acquire Lease operation.
 *
 * @export
 * @interface ContainerAcquireLeaseOptions
 */
export interface ContainerAcquireLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerAcquireLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when acquiring the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerAcquireLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Release Lease operation.
 *
 * @export
 * @interface ContainerReleaseLeaseOptions
 */
export interface ContainerReleaseLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerReleaseLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when releasing the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerReleaseLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Renew Lease operation.
 *
 * @export
 * @interface ContainerRenewLeaseOptions
 */
export interface ContainerRenewLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerRenewLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when renewing the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerRenewLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Break Lease operation.
 *
 * @export
 * @interface ContainerBreakLeaseOptions
 */
export interface ContainerBreakLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerBreakLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when breaking the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerBreakLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Change Lease operation.
 *
 * @export
 * @interface ContainerChangeLeaseOptions
 */
export interface ContainerChangeLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerChangeLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerChangeLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - List Segment operations.
 *
 * See:
 * - {@link ContainerClient.listSegments}
 * - {@link ContainerClient.listBlobFlatSegment}
 * - {@link ContainerClient.listBlobHierarchySegment}
 * - {@link ContainerClient.listHierarchySegments}
 * - {@link ContainerClient.listItemsByHierarchy}
 *
 * @interface ContainerListBlobsSegmentOptions
 */
interface ContainerListBlobsSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerListBlobsSegmentOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * Specifies the maximum number of containers
   * to return. If the request does not specify maxPageSize, or specifies a
   * value greater than 5000, the server will return up to 5000 items. Note
   * that if the listing operation crosses a partition boundary, then the
   * service will return a continuation token for retrieving the remainder of
   * the results. For this reason, it is possible that the service will return
   * fewer results than specified by maxPageSize, or than the default of 5000.
   */
  maxPageSize?: number;
  /**
   * Include this parameter to
   * specify one or more datasets to include in the response.
   */
  include?: ListBlobsIncludeItem[];
}

/**
 * Options to configure Container - List Blobs operations.
 *
 * See:
 * - {@link ContainerClient.listBlobsFlat}
 * - {@link ContainerClient.listBlobsByHierarchy}
 *
 * @export
 * @interface ContainerListBlobsOptions
 */
export interface ContainerListBlobsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerListBlobsOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;

  /**
   * Specifies whether metadata related to any current or previous Copy Blob operation should be included in the response.
   */
  includeCopy?: boolean;
  /**
   * Specifies whether soft deleted blobs should be included in the response.
   */
  includeDeleted?: boolean;
  /**
   * Specifies whether blob metadata be returned in the response.
   */
  includeMetadata?: boolean;
  /**
   * Specifies whether snapshots should be included in the enumeration. Snapshots are listed from oldest to newest in the response
   */
  includeSnapshots?: boolean;
  /**
   * Specifies whether blobs for which blocks have been uploaded, but which have not been committed using Put Block List, be included in the response.
   */
  includeUncommitedBlobs?: boolean;
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

  private _containerName: string;

  /**
   * The name of the container.
   */
  public get containerName(): string {
    return this._containerName;
  }
  /**
   *
   * Creates an instance of ContainerClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} containerName Container name.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ContainerClient
   */
  constructor(connectionString: string, containerName: string, options?: StoragePipelineOptions);
  /**
   * Creates an instance of ContainerClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a page blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage page blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ContainerClient
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of ContainerClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a page blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage page blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.

   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ContainerClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName?:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    options?: StoragePipelineOptions
  ) {
    let pipeline: Pipeline;
    let url: string;
    options = options || {};
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNode && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      // The second parameter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string"
    ) {
      // (connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions)
      const containerName = credentialOrPipelineOrContainerName;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey
          );
          url = appendToURLPath(extractedCreds.url, encodeURIComponent(containerName));
          options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName parameter");
    }
    super(url, pipeline);
    this._containerName = this.getContainerNameFromUrl();
    this.containerContext = new Container(this.storageClientContext);
  }

  /**
   * Creates a new container under the specified account. If the container with
   * the same name already exists, the operation fails.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param {ContainerCreateOptions} [options] Options to Container Create operation.
   * @returns {Promise<ContainerCreateResponse>}
   * @memberof ContainerClient
   *
   * @example
   * ```js
   * const containerClient = blobServiceClient.getContainerClient("<container name>");
   * const createContainerResponse = await containerClient.create();
   * console.log("Container was created successfully", createContainerResponse.requestId);
   * ```
   */
  public async create(options: ContainerCreateOptions = {}): Promise<ContainerCreateResponse> {
    const { span, spanOptions } = createSpan("ContainerClient-create", options.tracingOptions);
    try {
      // Spread operator in destructuring assignments,
      // this will filter out unwanted properties from the response object into result object
      return this.containerContext.create({
        ...options,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns true if the Azrue container resource represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing container might be deleted by other clients or
   * applications. Vice versa new containers with the same name might be added by other clients or
   * applications after this function completes.
   *
   * @param {ContainerExistsOptions} [options={}]
   * @returns {Promise<boolean>}
   * @memberof ContainerClient
   */
  public async exists(options: ContainerExistsOptions = {}): Promise<boolean> {
    const { span, spanOptions } = createSpan("ContainerClient-exists", options.tracingOptions);
    try {
      await this.getProperties({
        abortSignal: options.abortSignal,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return true;
    } catch (e) {
      if (e.statusCode === 404) {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when checking container existence"
        });
        return false;
      }
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a {@link BlobClient}
   *
   * @param {string} blobName A blob name
   * @returns {BlobClient} A new BlobClient object for the given blob name.
   * @memberof ContainerClient
   */
  public getBlobClient(blobName: string): BlobClient {
    return new BlobClient(appendToURLPath(this.url, encodeURIComponent(blobName)), this.pipeline);
  }

  /**
   * Creates an {@link AppendBlobClient}
   *
   * @param {string} blobName An append blob name
   * @returns {AppendBlobClient}
   * @memberof ContainerClient
   */
  public getAppendBlobClient(blobName: string): AppendBlobClient {
    return new AppendBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Creates a {@link BlockBlobClient}
   *
   * @param {string} blobName A block blob name
   * @returns {BlockBlobClient}
   * @memberof ContainerClient
   *
   * @example
   * ```js
   * const content = "Hello world!";
   *
   * const blockBlobClient = containerClient.getBlockBlobClient("<blob name>");
   * const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
   * ```
   */
  public getBlockBlobClient(blobName: string): BlockBlobClient {
    return new BlockBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Creates a {@link PageBlobClient}
   *
   * @param {string} blobName A page blob name
   * @returns {PageBlobClient}
   * @memberof ContainerClient
   */
  public getPageBlobClient(blobName: string): PageBlobClient {
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
   * @param {ContainerGetPropertiesOptions} [options] Options to Container Get Properties operation.
   * @returns {Promise<ContainerGetPropertiesResponse>}
   * @memberof ContainerClient
   */
  public async getProperties(
    options: ContainerGetPropertiesOptions = {}
  ): Promise<ContainerGetPropertiesResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, spanOptions } = createSpan(
      "ContainerClient-getProperties",
      options.tracingOptions
    );
    try {
      return this.containerContext.getProperties({
        abortSignal: options.abortSignal,
        ...options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Marks the specified container for deletion. The container and any blobs
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
   *
   * @param {ContainerDeleteMethodOptions} [options] Options to Container Delete operation.
   * @returns {Promise<ContainerDeleteResponse>}
   * @memberof ContainerClient
   */
  public async delete(
    options: ContainerDeleteMethodOptions = {}
  ): Promise<ContainerDeleteResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    if (
      (options.conditions.ifMatch && options.conditions.ifMatch !== ETagNone) ||
      (options.conditions.ifNoneMatch && options.conditions.ifNoneMatch !== ETagNone)
    ) {
      throw new RangeError(
        "the IfMatch and IfNoneMatch access conditions must have their default\
        values because they are ignored by the service"
      );
    }

    const { span, spanOptions } = createSpan("ContainerClient-delete", options.tracingOptions);

    try {
      return this.containerContext.deleteMethod({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
   *                            If no value provided the existing metadata will be removed.
   * @param {ContainerSetMetadataOptions} [options] Options to Container Set Metadata operation.
   * @returns {Promise<ContainerSetMetadataResponse>}
   * @memberof ContainerClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: ContainerSetMetadataOptions = {}
  ): Promise<ContainerSetMetadataResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    if (
      options.conditions.ifUnmodifiedSince ||
      (options.conditions.ifMatch && options.conditions.ifMatch !== ETagNone) ||
      (options.conditions.ifNoneMatch && options.conditions.ifNoneMatch !== ETagNone)
    ) {
      throw new RangeError(
        "the IfUnmodifiedSince, IfMatch, and IfNoneMatch must have their default values\
        because they are ignored by the blob service"
      );
    }

    const { span, spanOptions } = createSpan("ContainerClient-setMetadata", options.tracingOptions);

    try {
      return this.containerContext.setMetadata({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        metadata,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the permissions for the specified container. The permissions indicate
   * whether container data may be accessed publicly.
   *
   * WARNING: JavaScript Date will potentially lose precision when parsing startsOn and expiresOn strings.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-acl
   *
   * @param {ContainerGetAccessPolicyOptions} [options] Options to Container Get Access Policy operation.
   * @returns {Promise<ContainerGetAccessPolicyResponse>}
   * @memberof ContainerClient
   */
  public async getAccessPolicy(
    options: ContainerGetAccessPolicyOptions = {}
  ): Promise<ContainerGetAccessPolicyResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, spanOptions } = createSpan(
      "ContainerClient-getAccessPolicy",
      options.tracingOptions
    );

    try {
      const response = await this.containerContext.getAccessPolicy({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        spanOptions
      });

      const res: ContainerGetAccessPolicyResponse = {
        _response: response._response,
        blobPublicAccess: response.blobPublicAccess,
        date: response.date,
        etag: response.etag,
        errorCode: response.errorCode,
        lastModified: response.lastModified,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        signedIdentifiers: [],
        version: response.version
      };

      for (const identifier of response) {
        const accessPolicy: any = {
          permissions: identifier.accessPolicy.permissions
        };

        if (identifier.accessPolicy.expiresOn) {
          accessPolicy.expiresOn = new Date(identifier.accessPolicy.expiresOn);
        }

        if (identifier.accessPolicy.startsOn) {
          accessPolicy.startsOn = new Date(identifier.accessPolicy.startsOn);
        }

        res.signedIdentifiers.push({
          accessPolicy,
          id: identifier.id
        });
      }

      return res;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
   * @param {PublicAccessType} [access] The level of public access to data in the container.
   * @param {SignedIdentifier[]} [containerAcl] Array of elements each having a unique Id and details of the access policy.
   * @param {ContainerSetAccessPolicyOptions} [options] Options to Container Set Access Policy operation.
   * @returns {Promise<ContainerSetAccessPolicyResponse>}
   * @memberof ContainerClient
   */
  public async setAccessPolicy(
    access?: PublicAccessType,
    containerAcl?: SignedIdentifier[],
    options: ContainerSetAccessPolicyOptions = {}
  ): Promise<ContainerSetAccessPolicyResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "ContainerClient-setAccessPolicy",
      options.tracingOptions
    );
    try {
      const acl: SignedIdentifierModel[] = [];
      for (const identifier of containerAcl || []) {
        acl.push({
          accessPolicy: {
            expiresOn: identifier.accessPolicy.expiresOn
              ? truncatedISO8061Date(identifier.accessPolicy.expiresOn)
              : "",
            permissions: identifier.accessPolicy.permissions,
            startsOn: identifier.accessPolicy.startsOn
              ? truncatedISO8061Date(identifier.accessPolicy.startsOn)
              : ""
          },
          id: identifier.id
        });
      }

      return this.containerContext.setAccessPolicy({
        abortSignal: options.abortSignal,
        access,
        containerAcl: acl,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get a {@link BlobLeaseClient} that manages leases on the container.
   *
   * @param {string} [proposeLeaseId] Initial proposed lease Id.
   * @returns {BlobLeaseClient} A new BlobLeaseClient object for managing leases on the container.
   * @memberof ContainerClient
   */
  public getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient {
    return new BlobLeaseClient(this, proposeLeaseId);
  }

  /**
   * Creates a new block blob, or updates the content of an existing block blob.
   *
   * Updating an existing block blob overwrites any existing metadata on the blob.
   * Partial updates are not supported; the content of the existing blob is
   * overwritten with the new content. To perform a partial update of a block blob's,
   * use {@link BlockBlobClient.stageBlock} and {@link BlockBlobClient.commitBlockList}.
   *
   * This is a non-parallel uploading method, please use {@link BlockBlobClient.uploadFile},
   * {@link BlockBlobClient.uploadStream} or {@link BlockBlobClient.uploadBrowserData} for better
   * performance with concurrency uploading.
   *
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {string} blobName Name of the block blob to create or update.
   * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param {BlockBlobUploadOptions} [options] Options to configure the Block Blob Upload operation.
   * @returns {Promise<{ blockBlobClient: BlockBlobClient; response: BlockBlobUploadResponse }>} Block Blob upload response data and the corresponding BlockBlobClient instance.
   * @memberof ContainerClient
   */
  public async uploadBlockBlob(
    blobName: string,
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobUploadOptions = {}
  ): Promise<{ blockBlobClient: BlockBlobClient; response: BlockBlobUploadResponse }> {
    const { span, spanOptions } = createSpan(
      "ContainerClient-uploadBlockBlob",
      options.tracingOptions
    );
    try {
      const blockBlobClient = this.getBlockBlobClient(blobName);
      const response = await blockBlobClient.upload(body, contentLength, {
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        blockBlobClient,
        response
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param {string} blobName
   * @param {BlobDeleteOptions} [options] Options to Blob Delete operation.
   * @returns {Promise<BlobDeleteResponse>} Block blob deletion response data.
   * @memberof ContainerClient
   */
  public async deleteBlob(
    blobName: string,
    options: BlobDeleteOptions = {}
  ): Promise<BlobDeleteResponse> {
    const { span, spanOptions } = createSpan("ContainerClient-deleteBlob", options.tracingOptions);
    try {
      const blobClient = this.getBlobClient(blobName);
      return await blobClient.delete({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * listBlobFlatSegment returns a single segment of blobs starting from the
   * specified Marker. Use an empty Marker to start enumeration from the beginning.
   * After getting a segment, process it, and then call listBlobsFlatSegment again
   * (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
   * @param {ContainerListBlobsSegmentOptions} [options] Options to Container List Blob Flat Segment operation.
   * @returns {Promise<ContainerListBlobFlatSegmentResponse>}
   * @memberof ContainerClient
   */
  private async listBlobFlatSegment(
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): Promise<ContainerListBlobFlatSegmentResponse> {
    const { span, spanOptions } = createSpan(
      "ContainerClient-listBlobFlatSegment",
      options.tracingOptions
    );
    try {
      return this.containerContext.listBlobFlatSegment({
        marker,
        ...options,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * listBlobHierarchySegment returns a single segment of blobs starting from
   * the specified Marker. Use an empty Marker to start enumeration from the
   * beginning. After getting a segment, process it, and then call listBlobsHierarchicalSegment
   * again (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param {string} delimiter The charactor or string used to define the virtual hierarchy
   * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
   * @param {ContainerListBlobsSegmentOptions} [options] Options to Container List Blob Hierarchy Segment operation.
   * @returns {Promise<ContainerListBlobHierarchySegmentResponse>}
   * @memberof ContainerClient
   */
  private async listBlobHierarchySegment(
    delimiter: string,
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): Promise<ContainerListBlobHierarchySegmentResponse> {
    const { span, spanOptions } = createSpan(
      "ContainerClient-listBlobHierarchySegment",
      options.tracingOptions
    );
    try {
      return this.containerContext.listBlobHierarchySegment(delimiter, {
        marker,
        ...options,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an AsyncIterableIterator for ContainerListBlobFlatSegmentResponse
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
   * @returns {AsyncIterableIterator<ContainerListBlobFlatSegmentResponse>}
   * @memberof ContainerClient
   */
  private async *listSegments(
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<ContainerListBlobFlatSegmentResponse> {
    let listBlobsFlatSegmentResponse;
    if (!!marker || marker === undefined) {
      do {
        listBlobsFlatSegmentResponse = await this.listBlobFlatSegment(marker, options);
        marker = listBlobsFlatSegmentResponse.continuationToken;
        yield await listBlobsFlatSegmentResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator of {@link BlobItem} objects
   *
   * @private
   * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
   * @returns {AsyncIterableIterator<BlobItem>}
   * @memberof ContainerClient
   */
  private async *listItems(
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<BlobItem> {
    let marker: string | undefined;
    for await (const listBlobsFlatSegmentResponse of this.listSegments(marker, options)) {
      yield* listBlobsFlatSegmentResponse.segment.blobItems;
    }
  }

  /**
   * Returns an async iterable iterator to list all the blobs
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the blobs in pages.
   *
   * // Get the containerClient before you run these snippets,
   * // Can be obtained from `blobServiceClient.getContainerClient("<your-container-name>");`
   * @example
   * ```js
   *   let i = 1;
   *   for await (const blob of containerClient.listBlobsFlat()) {
   *     console.log(`Blob ${i++}: ${blob.name}`);
   *   }
   * ```
   *
   * @example
   * ```js
   *   // Generator syntax .next()
   *   let i = 1;
   *   let iter = containerClient.listBlobsFlat();
   *   let blobItem = await iter.next();
   *   while (!blobItem.done) {
   *     console.log(`Blob ${i++}: ${blobItem.value.name}`);
   *     blobItem = await iter.next();
   *   }
   * ```
   *
   * @example
   * ```js
   *   // Example for .byPage()
   *   // passing optional maxPageSize in the page settings
   *   let i = 1;
   *   for await (const response of containerClient.listBlobsFlat().byPage({ maxPageSize: 20 })) {
   *     for (const blob of response.segment.blobItems) {
   *       console.log(`Blob ${i++}: ${blob.name}`);
   *     }
   *   }
   * ```
   *
   * @example
   * ```js
   *   // Passing marker as an argument (similar to the previous example)
   *   let i = 1;
   *   let iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
   *   let response = (await iterator.next()).value;
   *   // Prints 2 blob names
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`Blob ${i++}: ${blob.name}`);
   *    }
   *   // Gets next marker
   *   let marker = response.continuationToken;
   *    // Passing next marker as continuationToken
   *   iterator = containerClient.listBlobsFlat().byPage({ continuationToken: marker, maxPageSize: 10 });
   *   response = (await iterator.next()).value;
   *   // Prints 10 blob names
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`Blob ${i++}: ${blob.name}`);
   *   }
   * ```
   *
   * @param {ContainerListBlobsOptions} [options={}] Options to list blobs.
   * @returns {PagedAsyncIterableIterator<BlobItem, ContainerListBlobFlatSegmentResponse>} An asyncIterableIterator that supports paging.
   * @memberof ContainerClient
   */
  public listBlobsFlat(
    options: ContainerListBlobsOptions = {}
  ): PagedAsyncIterableIterator<BlobItem, ContainerListBlobFlatSegmentResponse> {
    const include: ListBlobsIncludeItem[] = [];
    if (options.includeCopy) {
      include.push("copy");
    }
    if (options.includeDeleted) {
      include.push("deleted");
    }
    if (options.includeMetadata) {
      include.push("metadata");
    }
    if (options.includeSnapshots) {
      include.push("snapshots");
    }
    if (options.includeUncommitedBlobs) {
      include.push("uncommittedblobs");
    }

    const updatedOptions: ContainerListBlobsSegmentOptions = {
      ...options,
      ...(include.length > 0 ? { include: include } : {})
    };

    // AsyncIterableIterator to iterate over blobs
    const iter = this.listItems(updatedOptions);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegments(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...updatedOptions
        });
      }
    };
  }

  /**
   * Returns an AsyncIterableIterator for ContainerListBlobHierarchySegmentResponse
   *
   * @private
   * @param {string} delimiter The charactor or string used to define the virtual hierarchy
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
   * @returns {AsyncIterableIterator<ContainerListBlobHierarchySegmentResponse>}
   * @memberof ContainerClient
   */ private async *listHierarchySegments(
    delimiter: string,
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<ContainerListBlobHierarchySegmentResponse> {
    let listBlobsHierarchySegmentResponse;
    if (!!marker || marker === undefined) {
      do {
        listBlobsHierarchySegmentResponse = await this.listBlobHierarchySegment(
          delimiter,
          marker,
          options
        );
        marker = listBlobsHierarchySegmentResponse.continuationToken;
        yield await listBlobsHierarchySegmentResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator for {@link BlobPrefix} and {@link BlobItem} objects.
   *
   * @private
   * @param {string} delimiter The charactor or string used to define the virtual hierarchy
   * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
   * @returns {AsyncIterableIterator<{ kind: "prefix" } & BlobPrefix | { kind: "blob" } & BlobItem>}
   * @memberof ContainerClient
   */
  private async *listItemsByHierarchy(
    delimiter: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<{ kind: "prefix" } & BlobPrefix | { kind: "blob" } & BlobItem> {
    let marker: string | undefined;
    for await (const listBlobsHierarchySegmentResponse of this.listHierarchySegments(
      delimiter,
      marker,
      options
    )) {
      const segment = listBlobsHierarchySegmentResponse.segment;
      if (segment.blobPrefixes) {
        for (const prefix of segment.blobPrefixes) {
          yield { kind: "prefix", ...prefix };
        }
      }
      for (const blob of segment.blobItems) {
        yield { kind: "blob", ...blob };
      }
    }
  }

  /**
   * Returns an async iterable iterator to list all the blobs by hierarchy.
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the blobs by hierarchy in pages.
   *
   * @example
   * ```js
   *   for await (const item of containerClient.listBlobsByHierarchy("/")) {
   *     if (item.kind === "prefix") {
   *       console.log(`\tBlobPrefix: ${item.name}`);
   *     } else {
   *       console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
   *     }
   *   }
   * ```
   *
   * @example
   * ```js
   * // Generator syntax .next() and passing a prefix
   * let iter = await containerClient.listBlobsByHierarchy("/", { prefix: "prefix1/" });
   * let entity = await iter.next();
   * while (!entity.done) {
   *   let item = entity.value;
   *   if (item.kind === "prefix") {
   *     console.log(`\tBlobPrefix: ${item.name}`);
   *   } else {
   *     console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
   *   }
   *   entity = await iter.next();
   * }
   * ```js
   *
   * @example
   * ```js
   *   // byPage()
   *   console.log("Listing blobs by hierarchy by page");
   *   for await (const response of containerClient.listBlobsByHierarchy("/").byPage()) {
   *     const segment = response.segment;
   *     if (segment.blobPrefixes) {
   *       for (const prefix of segment.blobPrefixes) {
   *         console.log(`\tBlobPrefix: ${prefix.name}`);
   *       }
   *     }
   *     for (const blob of response.segment.blobItems) {
   *       console.log(`\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`);
   *     }
   *   }
   * ```
   *
   * @example
   * ```js
   *   // 4. byPage() and passing a prefix and max page size
   *   console.log("Listing blobs by hierarchy by page, specifying a prefix and a max page size");
   *   let i = 1;
   *   for await (const response of containerClient.listBlobsByHierarchy("/", { prefix: "prefix2/sub1/"}).byPage({ maxPageSize: 2 })) {
   *     console.log(`Page ${i++}`);
   *     const segment = response.segment;
   *     if (segment.blobPrefixes) {
   *       for (const prefix of segment.blobPrefixes) {
   *         console.log(`\tBlobPrefix: ${prefix.name}`);
   *       }
   *     }
   *     for (const blob of response.segment.blobItems) {
   *       console.log(`\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`);
   *     }
   *   }
   * ```
   *
   * @param {string} delimiter The charactor or string used to define the virtual hierarchy
   * @param {ContainerListBlobsOptions} [options={}] Options to list blobs operation.
   * @returns {(PagedAsyncIterableIterator<
   *   { kind: "prefix" } & BlobPrefix | { kind: "blob" } & BlobItem,
   *     ContainerListBlobHierarchySegmentResponse
   *   >)}
   * @memberof ContainerClient
   */
  public listBlobsByHierarchy(
    delimiter: string,
    options: ContainerListBlobsOptions = {}
  ): PagedAsyncIterableIterator<
    { kind: "prefix" } & BlobPrefix | { kind: "blob" } & BlobItem,
    ContainerListBlobHierarchySegmentResponse
  > {
    const include: ListBlobsIncludeItem[] = [];
    if (options.includeCopy) {
      include.push("copy");
    }
    if (options.includeDeleted) {
      include.push("deleted");
    }
    if (options.includeMetadata) {
      include.push("metadata");
    }
    if (options.includeSnapshots) {
      include.push("snapshots");
    }
    if (options.includeUncommitedBlobs) {
      include.push("uncommittedblobs");
    }

    const updatedOptions: ContainerListBlobsSegmentOptions = {
      ...options,
      ...(include.length > 0 ? { include: include } : {})
    };
    // AsyncIterableIterator to iterate over blob prefixes and blobs
    const iter = this.listItemsByHierarchy(delimiter, updatedOptions);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      async next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listHierarchySegments(delimiter, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...updatedOptions
        });
      }
    };
  }

  private getContainerNameFromUrl(): string {
    let containerName;
    try {
      //  URL may look like the following
      // "https://myaccount.blob.core.windows.net/mycontainer?sasString";
      // "https://myaccount.blob.core.windows.net/mycontainer";
      // or an emulator URL that starts with the endpoint `http://127.0.0.1:10000/devstoreaccount1`

      let urlWithoutSAS = this.url.split("?")[0]; // removing the sas part of url if present
      urlWithoutSAS = urlWithoutSAS.endsWith("/") ? urlWithoutSAS.slice(0, -1) : urlWithoutSAS; // Slicing off '/' at the end if exists

      // http://127.0.0.1:10000/devstoreaccount1
      const emulatorBlobEndpoint = getValueInConnString(
        DevelopmentConnectionString,
        "BlobEndpoint"
      );

      if (this.url.startsWith(emulatorBlobEndpoint)) {
        // Emulator URL starts with `http://127.0.0.1:10000/devstoreaccount1`

        const partsOfUrl = urlWithoutSAS.match(emulatorBlobEndpoint + "/([^/]*)");
        containerName = partsOfUrl![1];
      } else {
        const partsOfUrl = urlWithoutSAS.match("([^/]*)://([^/]*)/([^/]*)");

        // decode the encoded containerName - to get all the special characters that might be present in it
        containerName = partsOfUrl![3];
      }
      containerName = decodeURIComponent(containerName);

      if (!containerName) {
        throw new Error("Provided containerName is invalid.");
      }

      return containerName;
    } catch (error) {
      throw new Error("Unable to extract containerName with provided information.");
    }
  }
}
