// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AbortSignalLike } from "@azure/abort-controller";
import {
  getDefaultProxySettings,
  HttpRequestBody,
  HttpResponse,
  isNode,
  isTokenCredential,
  TokenCredential,
  URLBuilder
} from "@azure/core-http";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { SpanStatusCode } from "@azure/core-tracing";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { Container } from "./generated/src/operations";
import {
  BlobDeleteResponse,
  BlobPrefix,
  BlobProperties,
  BlockBlobUploadResponse,
  ContainerCreateResponse,
  ContainerDeleteResponse,
  ContainerEncryptionScope,
  ContainerGetAccessPolicyHeaders,
  ContainerGetPropertiesResponse,
  ContainerListBlobFlatSegmentHeaders,
  ContainerListBlobHierarchySegmentHeaders,
  ContainerSetAccessPolicyResponse,
  ContainerSetMetadataResponse,
  LeaseAccessConditions,
  ListBlobsFlatSegmentResponseModel,
  ListBlobsHierarchySegmentResponseModel,
  ListBlobsIncludeItem,
  PublicAccessType,
  SignedIdentifierModel
} from "./generatedModels";
import {
  Metadata,
  ObjectReplicationPolicy,
  Tags,
  ContainerRequestConditions,
  ModifiedAccessConditions
} from "./models";
import { newPipeline, PipelineLike, isPipelineLike, StoragePipelineOptions } from "./Pipeline";
import { CommonOptions, StorageClient } from "./StorageClient";
import { convertTracingToRequestOptionsBase, createSpan } from "./utils/tracing";
import {
  appendToURLPath,
  appendToURLQuery,
  extractConnectionStringParts,
  isIpEndpointStyle,
  parseObjectReplicationRecord,
  toTags,
  truncatedISO8061Date
} from "./utils/utils.common";
import { ContainerSASPermissions } from "./sas/ContainerSASPermissions";
import { generateBlobSASQueryParameters } from "./sas/BlobSASSignatureValues";
import { BlobLeaseClient } from "./BlobLeaseClient";
import {
  AppendBlobClient,
  BlobClient,
  BlobDeleteOptions,
  BlockBlobClient,
  BlockBlobUploadOptions,
  CommonGenerateSasUrlOptions,
  PageBlobClient
} from "./Clients";
import { BlobBatchClient } from "./BlobBatchClient";

/**
 * Options to configure {@link ContainerClient.create} operation.
 */
export interface ContainerCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the container.
   */
  metadata?: Metadata;
  /**
   * Specifies whether data in the container may be accessed publicly and the level of access. Possible values include:
   * - `container`: Specifies full public read access for container and blob data. Clients can enumerate blobs within the container via anonymous request, but cannot enumerate containers within the storage account.
   * - `blob`: Specifies public read access for blobs. Blob data within this container can be read via anonymous request, but container data is not available. Clients cannot enumerate blobs within the container via anonymous request.
   */
  access?: PublicAccessType;
  /**
   * Container encryption scope info.
   */
  containerEncryptionScope?: ContainerEncryptionScope;
}

/**
 * Options to configure {@link ContainerClient.getProperties} operation.
 */
export interface ContainerGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions;
}

/**
 * Options to configure {@link ContainerClient.delete} operation.
 */
export interface ContainerDeleteMethodOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when deleting the container.
   */
  conditions?: ContainerRequestConditions;
}

/**
 * Options to configure {@link ContainerClient.exists} operation.
 */
export interface ContainerExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link ContainerClient.setMetadata} operation.
 */
export interface ContainerSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: ContainerRequestConditions;
}

/**
 * Options to configure {@link ContainerClient.getAccessPolicy} operation.
 */
export interface ContainerGetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions;
}

/**
 * Signed identifier.
 */
export interface SignedIdentifier {
  /**
   * a unique id
   */
  id: string;
  /**
   * Access Policy
   */
  accessPolicy: {
    /**
     * Optional. The date-time the policy is active
     */
    startsOn?: Date;
    /**
     * Optional. The date-time the policy expires
     */
    expiresOn?: Date;
    /**
     * The permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     */
    permissions?: string;
  };
}

/**
 * Contains response data for the {@link ContainerClient.getAccessPolicy} operation.
 */
export declare type ContainerGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
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
 */
export interface ContainerSetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting the access policy.
   */
  conditions?: ContainerRequestConditions;
}

/**
 * Options to configure Container - Acquire Lease operation.
 */
export interface ContainerAcquireLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when acquiring the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Release Lease operation.
 */
export interface ContainerReleaseLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when releasing the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Renew Lease operation.
 */
export interface ContainerRenewLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when renewing the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Break Lease operation.
 */
export interface ContainerBreakLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when breaking the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Change Lease operation.
 */
export interface ContainerChangeLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure the {@link ContainerClient.deleteBlob} operation.
 */
export interface ContainerDeleteBlobOptions extends BlobDeleteOptions {
  /**
   * An opaque DateTime value that, when present, specifies the version
   * of the blob to delete. It's for service version 2019-10-10 and newer.
   */
  versionId?: string;
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
 */
interface ContainerListBlobsSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
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
 * An interface representing BlobHierarchyListSegment.
 */
export interface BlobHierarchyListSegment {
  blobPrefixes?: BlobPrefix[];
  blobItems: BlobItem[];
}

/**
 * An enumeration of blobs
 */
export interface ListBlobsHierarchySegmentResponse {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  delimiter?: string;
  segment: BlobHierarchyListSegment;
  continuationToken?: string;
}

/**
 * Contains response data for the listBlobHierarchySegment operation.
 */
export type ContainerListBlobHierarchySegmentResponse = ListBlobsHierarchySegmentResponse &
  ContainerListBlobHierarchySegmentHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ContainerListBlobHierarchySegmentHeaders;

      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ListBlobsHierarchySegmentResponseModel;
    };
  };

/**
 * An Azure Storage blob
 */
export interface BlobItem {
  name: string;
  deleted: boolean;
  snapshot: string;
  versionId?: string;
  isCurrentVersion?: boolean;
  properties: BlobProperties;
  metadata?: { [propertyName: string]: string };
  tags?: Tags;
  objectReplicationSourceProperties?: ObjectReplicationPolicy[];
  hasVersionsOnly?: boolean;
}

/**
 * An interface representing BlobFlatListSegment.
 */
export interface BlobFlatListSegment {
  blobItems: BlobItem[];
}

/**
 * An enumeration of blobs
 */
export interface ListBlobsFlatSegmentResponse {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  segment: BlobFlatListSegment;
  continuationToken?: string;
}

/**
 * Contains response data for the listBlobFlatSegment operation.
 */
export type ContainerListBlobFlatSegmentResponse = ListBlobsFlatSegmentResponse &
  ContainerListBlobFlatSegmentHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ContainerListBlobFlatSegmentHeaders;

      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ListBlobsFlatSegmentResponseModel;
    };
  };

/**
 * Options to configure Container - List Blobs operations.
 *
 * See:
 * - {@link ContainerClient.listBlobsFlat}
 * - {@link ContainerClient.listBlobsByHierarchy}
 */
export interface ContainerListBlobsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
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
   * Specifies whether snapshots should be included in the enumeration. Snapshots are listed from oldest to newest in the response.
   */
  includeSnapshots?: boolean;
  /**
   * Specifies whether versions should be included in the enumeration. Versions are listed from oldest to newest in the response.
   */
  includeVersions?: boolean;
  /**
   * Specifies whether blobs for which blocks have been uploaded, but which have not been committed using Put Block List, be included in the response.
   */
  includeUncommitedBlobs?: boolean;
  /**
   * Specifies whether blob tags be returned in the response.
   */
  includeTags?: boolean;
  /**
   * Specifies whether deleted blob with versions be returned in the response.
   */
  includeDeletedWithVersions?: boolean;
  /**
   * Specifies whether blob immutability policy be returned in the response.
   */
  includeImmutabilityPolicy?: boolean;
  /**
   * Specifies whether blob legal hold be returned in the response.
   */
  includeLegalHold?: boolean;
}

/**
 * Contains response data for the {@link ContainerClient.createIfNotExists} operation.
 */
export interface ContainerCreateIfNotExistsResponse extends ContainerCreateResponse {
  /**
   * Indicate whether the container is successfully created. Is false when the container is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link ContainerClient.deleteIfExists} operation.
 */
export interface ContainerDeleteIfExistsResponse extends ContainerDeleteResponse {
  /**
   * Indicate whether the container is successfully deleted. Is false if the container does not exist in the first place.
   */
  succeeded: boolean;
}

/**
 * Options to configure {@link ContainerClient.generateSasUrl} operation.
 */
export interface ContainerGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
  /**
   * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: ContainerSASPermissions;
}

/**
 * A ContainerClient represents a URL to the Azure Storage container allowing you to manipulate its blobs.
 */
export class ContainerClient extends StorageClient {
  /**
   * containerContext provided by protocol layer.
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
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param containerName - Container name.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  // Legacy, no fix for eslint error without breaking. Disable it for this interface.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
  constructor(connectionString: string, containerName: string, options?: StoragePipelineOptions);
  /**
   * Creates an instance of ContainerClient.
   * This method accepts an URL pointing to a container.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage container, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer?sasString".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of ContainerClient.
   * This method accepts an URL pointing to a container.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage container, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: PipelineLike);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName?:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | PipelineLike,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions
  ) {
    let pipeline: PipelineLike;
    let url: string;
    options = options || {};
    if (isPipelineLike(credentialOrPipelineOrContainerName)) {
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
   * @param options - Options to Container Create operation.
   *
   *
   * Example usage:
   *
   * ```js
   * const containerClient = blobServiceClient.getContainerClient("<container name>");
   * const createContainerResponse = await containerClient.create();
   * console.log("Container was created successfully", createContainerResponse.requestId);
   * ```
   */
  public async create(options: ContainerCreateOptions = {}): Promise<ContainerCreateResponse> {
    const { span, updatedOptions } = createSpan("ContainerClient-create", options);
    try {
      // Spread operator in destructuring assignments,
      // this will filter out unwanted properties from the response object into result object
      return await this.containerContext.create({
        ...options,
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new container under the specified account. If the container with
   * the same name already exists, it is not changed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param options -
   */
  public async createIfNotExists(
    options: ContainerCreateOptions = {}
  ): Promise<ContainerCreateIfNotExistsResponse> {
    const { span, updatedOptions } = createSpan("ContainerClient-createIfNotExists", options);
    try {
      const res = await this.create(updatedOptions);
      return {
        succeeded: true,
        ...res,
        _response: res._response // _response is made non-enumerable
      };
    } catch (e) {
      if (e.details?.errorCode === "ContainerAlreadyExists") {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: "Expected exception when creating a container only if it does not already exist."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }

      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns true if the Azure container resource represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing container might be deleted by other clients or
   * applications. Vice versa new containers with the same name might be added by other clients or
   * applications after this function completes.
   *
   * @param options -
   */
  public async exists(options: ContainerExistsOptions = {}): Promise<boolean> {
    const { span, updatedOptions } = createSpan("ContainerClient-exists", options);
    try {
      await this.getProperties({
        abortSignal: options.abortSignal,
        tracingOptions: updatedOptions.tracingOptions
      });
      return true;
    } catch (e) {
      if (e.statusCode === 404) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: "Expected exception when checking container existence"
        });
        return false;
      }
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param blobName - A blob name
   * @returns A new BlobClient object for the given blob name.
   */
  public getBlobClient(blobName: string): BlobClient {
    return new BlobClient(appendToURLPath(this.url, encodeURIComponent(blobName)), this.pipeline);
  }

  /**
   * Creates an {@link AppendBlobClient}
   *
   * @param blobName - An append blob name
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
   * @param blobName - A block blob name
   *
   *
   * Example usage:
   *
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
   * @param blobName - A page blob name
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
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the `listContainers` method of {@link BlobServiceClient} using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @param options - Options to Container Get Properties operation.
   */
  public async getProperties(
    options: ContainerGetPropertiesOptions = {}
  ): Promise<ContainerGetPropertiesResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, updatedOptions } = createSpan("ContainerClient-getProperties", options);
    try {
      return await this.containerContext.getProperties({
        abortSignal: options.abortSignal,
        ...options.conditions,
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param options - Options to Container Delete operation.
   */
  public async delete(
    options: ContainerDeleteMethodOptions = {}
  ): Promise<ContainerDeleteResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, updatedOptions } = createSpan("ContainerClient-delete", options);
    try {
      return await this.containerContext.delete({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Marks the specified container for deletion if it exists. The container and any blobs
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
   *
   * @param options - Options to Container Delete operation.
   */
  public async deleteIfExists(
    options: ContainerDeleteMethodOptions = {}
  ): Promise<ContainerDeleteIfExistsResponse> {
    const { span, updatedOptions } = createSpan("ContainerClient-deleteIfExists", options);

    try {
      const res = await this.delete(updatedOptions);
      return {
        succeeded: true,
        ...res,
        _response: res._response // _response is made non-enumerable
      };
    } catch (e) {
      if (e.details?.errorCode === "ContainerNotFound") {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: "Expected exception when deleting a container only if it exists."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param metadata - Replace existing metadata with this value.
   *                            If no value provided the existing metadata will be removed.
   * @param options - Options to Container Set Metadata operation.
   */
  public async setMetadata(
    metadata?: Metadata,
    options: ContainerSetMetadataOptions = {}
  ): Promise<ContainerSetMetadataResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    if (options.conditions.ifUnmodifiedSince) {
      throw new RangeError(
        "the IfUnmodifiedSince must have their default values because they are ignored by the blob service"
      );
    }

    const { span, updatedOptions } = createSpan("ContainerClient-setMetadata", options);

    try {
      return await this.containerContext.setMetadata({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        metadata,
        modifiedAccessConditions: options.conditions,
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param options - Options to Container Get Access Policy operation.
   */
  public async getAccessPolicy(
    options: ContainerGetAccessPolicyOptions = {}
  ): Promise<ContainerGetAccessPolicyResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, updatedOptions } = createSpan("ContainerClient-getAccessPolicy", options);

    try {
      const response = await this.containerContext.getAccessPolicy({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        ...convertTracingToRequestOptionsBase(updatedOptions)
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
        let accessPolicy: any = undefined;
        if (identifier.accessPolicy) {
          accessPolicy = {
            permissions: identifier.accessPolicy.permissions
          };

          if (identifier.accessPolicy.expiresOn) {
            accessPolicy.expiresOn = new Date(identifier.accessPolicy.expiresOn);
          }

          if (identifier.accessPolicy.startsOn) {
            accessPolicy.startsOn = new Date(identifier.accessPolicy.startsOn);
          }
        }

        res.signedIdentifiers.push({
          accessPolicy,
          id: identifier.id
        });
      }

      return res;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   *
   * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
   * During this interval, a shared access signature that is associated with the stored access policy will
   * fail with status code 403 (Forbidden), until the access policy becomes active.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
   *
   * @param access - The level of public access to data in the container.
   * @param containerAcl - Array of elements each having a unique Id and details of the access policy.
   * @param options - Options to Container Set Access Policy operation.
   */
  public async setAccessPolicy(
    access?: PublicAccessType,
    containerAcl?: SignedIdentifier[],
    options: ContainerSetAccessPolicyOptions = {}
  ): Promise<ContainerSetAccessPolicyResponse> {
    options.conditions = options.conditions || {};
    const { span, updatedOptions } = createSpan("ContainerClient-setAccessPolicy", options);
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

      return await this.containerContext.setAccessPolicy({
        abortSignal: options.abortSignal,
        access,
        containerAcl: acl,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param proposeLeaseId - Initial proposed lease Id.
   * @returns A new BlobLeaseClient object for managing leases on the container.
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
   * @param blobName - Name of the block blob to create or update.
   * @param body - Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param contentLength - Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param options - Options to configure the Block Blob Upload operation.
   * @returns Block Blob upload response data and the corresponding BlockBlobClient instance.
   */
  public async uploadBlockBlob(
    blobName: string,
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobUploadOptions = {}
  ): Promise<{ blockBlobClient: BlockBlobClient; response: BlockBlobUploadResponse }> {
    const { span, updatedOptions } = createSpan("ContainerClient-uploadBlockBlob", options);
    try {
      const blockBlobClient = this.getBlockBlobClient(blobName);
      const response = await blockBlobClient.upload(body, contentLength, updatedOptions);
      return {
        blockBlobClient,
        response
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param blobName -
   * @param options - Options to Blob Delete operation.
   * @returns Block blob deletion response data.
   */
  public async deleteBlob(
    blobName: string,
    options: ContainerDeleteBlobOptions = {}
  ): Promise<BlobDeleteResponse> {
    const { span, updatedOptions } = createSpan("ContainerClient-deleteBlob", options);
    try {
      let blobClient = this.getBlobClient(blobName);
      if (options.versionId) {
        blobClient = blobClient.withVersion(options.versionId);
      }
      return await blobClient.delete(updatedOptions);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param marker - A string value that identifies the portion of the list to be returned with the next list operation.
   * @param options - Options to Container List Blob Flat Segment operation.
   */
  private async listBlobFlatSegment(
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): Promise<ContainerListBlobFlatSegmentResponse> {
    const { span, updatedOptions } = createSpan("ContainerClient-listBlobFlatSegment", options);
    try {
      const response = await this.containerContext.listBlobFlatSegment({
        marker,
        ...options,
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });

      const wrappedResponse: ContainerListBlobFlatSegmentResponse = {
        ...response,
        _response: response._response, // _response is made non-enumerable
        segment: {
          ...response.segment,
          blobItems: response.segment.blobItems.map((blobItemInteral) => {
            const blobItem: BlobItem = {
              ...blobItemInteral,
              tags: toTags(blobItemInteral.blobTags),
              objectReplicationSourceProperties: parseObjectReplicationRecord(
                blobItemInteral.objectReplicationMetadata
              )
            };
            return blobItem;
          })
        }
      };
      return wrappedResponse;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param delimiter - The character or string used to define the virtual hierarchy
   * @param marker - A string value that identifies the portion of the list to be returned with the next list operation.
   * @param options - Options to Container List Blob Hierarchy Segment operation.
   */
  private async listBlobHierarchySegment(
    delimiter: string,
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): Promise<ContainerListBlobHierarchySegmentResponse> {
    const { span, updatedOptions } = createSpan(
      "ContainerClient-listBlobHierarchySegment",
      options
    );
    try {
      const response = await this.containerContext.listBlobHierarchySegment(delimiter, {
        marker,
        ...options,
        ...convertTracingToRequestOptionsBase(updatedOptions)
      });
      const wrappedResponse: ContainerListBlobHierarchySegmentResponse = {
        ...response,
        _response: response._response, // _response is made non-enumerable
        segment: {
          ...response.segment,
          blobItems: response.segment.blobItems.map((blobItemInteral) => {
            const blobItem: BlobItem = {
              ...blobItemInteral,
              tags: toTags(blobItemInteral.blobTags),
              objectReplicationSourceProperties: parseObjectReplicationRecord(
                blobItemInteral.objectReplicationMetadata
              )
            };
            return blobItem;
          })
        }
      };
      return wrappedResponse;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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
   * @param marker - A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to list blobs operation.
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
   * @param options - Options to list blobs operation.
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
   * Example using `for await` syntax:
   *
   * ```js
   * // Get the containerClient before you run these snippets,
   * // Can be obtained from `blobServiceClient.getContainerClient("<your-container-name>");`
   * let i = 1;
   * for await (const blob of containerClient.listBlobsFlat()) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = containerClient.listBlobsFlat();
   * let blobItem = await iter.next();
   * while (!blobItem.done) {
   *   console.log(`Blob ${i++}: ${blobItem.value.name}`);
   *   blobItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of containerClient.listBlobsFlat().byPage({ maxPageSize: 20 })) {
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`Blob ${i++}: ${blob.name}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 blob names
   * for (const blob of response.segment.blobItems) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   *
   * // Passing next marker as continuationToken
   *
   * iterator = containerClient.listBlobsFlat().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 blob names
   * for (const blob of response.segment.blobItems) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   * ```
   *
   * @param options - Options to list blobs.
   * @returns An asyncIterableIterator that supports paging.
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
    if (options.includeVersions) {
      include.push("versions");
    }
    if (options.includeUncommitedBlobs) {
      include.push("uncommittedblobs");
    }
    if (options.includeTags) {
      include.push("tags");
    }
    if (options.includeDeletedWithVersions) {
      include.push("deletedwithversions");
    }
    if (options.includeImmutabilityPolicy) {
      include.push("immutabilitypolicy");
    }
    if (options.includeLegalHold) {
      include.push("legalhold");
    }
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    const updatedOptions: ContainerListBlobsSegmentOptions = {
      ...options,
      ...(include.length > 0 ? { include: include } : {})
    };

    // AsyncIterableIterator to iterate over blobs
    const iter = this.listItems(updatedOptions);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * Return an AsyncIterableIterator that works a page at a time
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
   * @param delimiter - The character or string used to define the virtual hierarchy
   * @param marker - A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to list blobs operation.
   */
  private async *listHierarchySegments(
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
   * @param delimiter - The character or string used to define the virtual hierarchy
   * @param options - Options to list blobs operation.
   */
  private async *listItemsByHierarchy(
    delimiter: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<({ kind: "prefix" } & BlobPrefix) | ({ kind: "blob" } & BlobItem)> {
    let marker: string | undefined;
    for await (const listBlobsHierarchySegmentResponse of this.listHierarchySegments(
      delimiter,
      marker,
      options
    )) {
      const segment = listBlobsHierarchySegmentResponse.segment;
      if (segment.blobPrefixes) {
        for (const prefix of segment.blobPrefixes) {
          yield {
            kind: "prefix",
            ...prefix
          };
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
   * Example using `for await` syntax:
   *
   * ```js
   * for await (const item of containerClient.listBlobsByHierarchy("/")) {
   *   if (item.kind === "prefix") {
   *     console.log(`\tBlobPrefix: ${item.name}`);
   *   } else {
   *     console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
   *   }
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = containerClient.listBlobsByHierarchy("/", { prefix: "prefix1/" });
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
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * console.log("Listing blobs by hierarchy by page");
   * for await (const response of containerClient.listBlobsByHierarchy("/").byPage()) {
   *   const segment = response.segment;
   *   if (segment.blobPrefixes) {
   *     for (const prefix of segment.blobPrefixes) {
   *       console.log(`\tBlobPrefix: ${prefix.name}`);
   *     }
   *   }
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a max page size:
   *
   * ```js
   * console.log("Listing blobs by hierarchy by page, specifying a prefix and a max page size");
   *
   * let i = 1;
   * for await (const response of containerClient.listBlobsByHierarchy("/", { prefix: "prefix2/sub1/"}).byPage({ maxPageSize: 2 })) {
   *   console.log(`Page ${i++}`);
   *   const segment = response.segment;
   *
   *   if (segment.blobPrefixes) {
   *     for (const prefix of segment.blobPrefixes) {
   *       console.log(`\tBlobPrefix: ${prefix.name}`);
   *     }
   *   }
   *
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`);
   *   }
   * }
   * ```
   *
   * @param delimiter - The character or string used to define the virtual hierarchy
   * @param options - Options to list blobs operation.
   */
  public listBlobsByHierarchy(
    delimiter: string,
    options: ContainerListBlobsOptions = {}
  ): PagedAsyncIterableIterator<
    ({ kind: "prefix" } & BlobPrefix) | ({ kind: "blob" } & BlobItem),
    ContainerListBlobHierarchySegmentResponse
  > {
    if (delimiter === "") {
      throw new RangeError("delimiter should contain one or more characters");
    }

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
    if (options.includeVersions) {
      include.push("versions");
    }
    if (options.includeUncommitedBlobs) {
      include.push("uncommittedblobs");
    }
    if (options.includeTags) {
      include.push("tags");
    }
    if (options.includeDeletedWithVersions) {
      include.push("deletedwithversions");
    }
    if (options.includeImmutabilityPolicy) {
      include.push("immutabilitypolicy");
    }
    if (options.includeLegalHold) {
      include.push("legalhold");
    }
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    const updatedOptions: ContainerListBlobsSegmentOptions = {
      ...options,
      ...(include.length > 0 ? { include: include } : {})
    };
    // AsyncIterableIterator to iterate over blob prefixes and blobs
    const iter = this.listItemsByHierarchy(delimiter, updatedOptions);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      async next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * Return an AsyncIterableIterator that works a page at a time
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
      // IPv4/IPv6 address hosts, Endpoints - `http://127.0.0.1:10000/devstoreaccount1/containername`
      // http://localhost:10001/devstoreaccount1/containername

      const parsedUrl = URLBuilder.parse(this.url);

      if (parsedUrl.getHost()!.split(".")[1] === "blob") {
        // "https://myaccount.blob.core.windows.net/containername".
        // "https://customdomain.com/containername".
        // .getPath() -> /containername
        containerName = parsedUrl.getPath()!.split("/")[1];
      } else if (isIpEndpointStyle(parsedUrl)) {
        // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/containername
        // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/containername
        // .getPath() -> /devstoreaccount1/containername
        containerName = parsedUrl.getPath()!.split("/")[2];
      } else {
        // "https://customdomain.com/containername".
        // .getPath() -> /containername
        containerName = parsedUrl.getPath()!.split("/")[1];
      }

      // decode the encoded containerName - to get all the special characters that might be present in it
      containerName = decodeURIComponent(containerName);

      if (!containerName) {
        throw new Error("Provided containerName is invalid.");
      }

      return containerName;
    } catch (error) {
      throw new Error("Unable to extract containerName with provided information.");
    }
  }

  /**
   * Only available for ContainerClient constructed with a shared key credential.
   *
   * Generates a Blob Container Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateSasUrl(options: ContainerGenerateSasUrlOptions): Promise<string> {
    return new Promise((resolve) => {
      if (!(this.credential instanceof StorageSharedKeyCredential)) {
        throw new RangeError(
          "Can only generate the SAS when the client is initialized with a shared key credential"
        );
      }

      const sas = generateBlobSASQueryParameters(
        {
          containerName: this._containerName,
          ...options
        },
        this.credential
      ).toString();

      resolve(appendToURLQuery(this.url, sas));
    });
  }

  /**
   * Creates a BlobBatchClient object to conduct batch operations.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
   *
   * @returns A new BlobBatchClient object for this container.
   */
  public getBlobBatchClient(): BlobBatchClient {
    return new BlobBatchClient(this.url, this.pipeline);
  }
}
