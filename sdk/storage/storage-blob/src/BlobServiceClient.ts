// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import {
  TokenCredential,
  isTokenCredential,
  isNode,
  HttpResponse,
  getDefaultProxySettings
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/types";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  ServiceGetUserDelegationKeyHeaders,
  ContainerCreateResponse,
  ContainerDeleteResponse,
  ServiceGetPropertiesResponse,
  BlobServiceProperties,
  ServiceSetPropertiesResponse,
  ServiceGetStatisticsResponse,
  ServiceGetAccountInfoResponse,
  ServiceListContainersSegmentResponse,
  ContainerItem,
  ListContainersIncludeType,
  UserDelegationKeyModel
} from "./generatedModels";
import { Service } from "./generated/src/operations";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import { ContainerClient, ContainerCreateOptions, ContainerDeleteMethodOptions } from "./Clients";
import { appendToURLPath, extractConnectionStringParts } from "./utils/utils.common";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { truncatedISO8061Date } from "./utils/utils.common";
import { createSpan } from "./utils/tracing";
import { BlobBatchClient } from "./BlobBatchClient";
import { CommonOptions, StorageClient } from "./StorageClient";

/**
 * Options to configure the {@link BlobServiceClient.getProperties} operation.
 *
 * @export
 * @interface ServiceGetPropertiesOptions
 */
export interface ServiceGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceGetPropertiesOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link BlobServiceClient.setProperties} operation.
 *
 * @export
 * @interface ServiceSetPropertiesOptions
 */
export interface ServiceSetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceSetPropertiesOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link BlobServiceClient.getAccountInfo} operation.
 *
 * @export
 * @interface ServiceGetAccountInfoOptions
 */
export interface ServiceGetAccountInfoOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceGetAccountInfoOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link BlobServiceClient.getStatistics} operation.
 *
 * @export
 * @interface ServiceGetStatisticsOptions
 */
export interface ServiceGetStatisticsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceGetStatisticsOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the Service - Get User Delegation Key.
 *
 * @export
 * @interface ServiceGetUserDelegationKeyOptions
 */
export interface ServiceGetUserDelegationKeyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceGetStatisticsOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link BlobServiceClient.listContainerSegment} operation.
 *
 * @interface ServiceListContainersSegmentOptions
 */
interface ServiceListContainersSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceListContainersSegmentOptions
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
   * specify that the container's metadata be returned as part of the response
   * body. Possible values include: 'metadata'
   */
  include?: ListContainersIncludeType;
}

/**
 * Options to configure the {@link BlobServiceClient.listContainers} operation.
 *
 * @export
 * @interface ServiceListContainersOptions
 */
export interface ServiceListContainersOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceListContainersOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * Specifies whether the container's metadata
   *                                   should be returned as part of the response body.
   */
  includeMetadata?: boolean;
}

/**
 * A user delegation key.
 */
export interface UserDelegationKey {
  /**
   * The Azure Active Directory object ID in GUID format.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  signedObjectId: string;
  /**
   * The Azure Active Directory tenant ID in GUID format.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  signedTenantId: string;
  /**
   * The date-time the key is active.
   *
   * @type {Date}
   * @memberof UserDelegationKey
   */
  signedStartsOn: Date;
  /**
   * The date-time the key expires.
   *
   * @type {Date}
   * @memberof UserDelegationKey
   */
  signedExpiresOn: Date;
  /**
   * Abbreviation of the Azure Storage service that accepts the key.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  signedService: string;
  /**
   * The service version that created the key.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  signedVersion: string;
  /**
   * The key as a base64 string.
   *
   * @type {string}
   * @memberof UserDelegationKey
   */
  value: string;
}

/**
 * Contains response data for the {@link getUserDelegationKey} operation.
 */
export declare type ServiceGetUserDelegationKeyResponse = UserDelegationKey &
  ServiceGetUserDelegationKeyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ServiceGetUserDelegationKeyHeaders;

      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: UserDelegationKeyModel;
    };
  };

/**
 * A BlobServiceClient represents a Client to the Azure Storage Blob service allowing you
 * to manipulate blob containers.
 *
 * @export
 * @class BlobServiceClient
 */
export class BlobServiceClient extends StorageClient {
  /**
   * serviceContext provided by protocol layer.
   *
   * @private
   * @type {Service}
   * @memberof BlobServiceClient
   */
  private serviceContext: Service;

  /**
   *
   * Creates an instance of BlobServiceClient from connection string.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobServiceClient
   */
  public static fromConnectionString(connectionString: string, options?: StoragePipelineOptions) {
    options = options || {};
    const extractedCreds = extractConnectionStringParts(connectionString);
    if (extractedCreds.kind === "AccountConnString") {
      if (isNode) {
        const sharedKeyCredential = new StorageSharedKeyCredential(
          extractedCreds.accountName!,
          extractedCreds.accountKey
        );
        options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
        const pipeline = newPipeline(sharedKeyCredential, options);
        return new BlobServiceClient(extractedCreds.url, pipeline);
      } else {
        throw new Error("Account connection string is only supported in Node.js environment");
      }
    } else if (extractedCreds.kind === "SASConnString") {
      const pipeline = newPipeline(new AnonymousCredential(), options);
      return new BlobServiceClient(extractedCreds.url + "?" + extractedCreds.accountSas, pipeline);
    } else {
      throw new Error(
        "Connection string must be either an Account connection string or a SAS connection string"
      );
    }
  }

  /**
   * Creates an instance of BlobServiceClient.
   *
   * @param {string} url A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobServiceClient
   *
   * Example using DefaultAzureCredential from `@azure/identity`:
   *
   * ```js
   * const account = "<storage account name>";
   *
   * const defaultAzureCredential = new DefaultAzureCredential();
   *
   * const blobServiceClient = new BlobServiceClient(
   *   `https://${account}.blob.core.windows.net`,
   *   defaultAzureCredential
   * );
   * ```
   *
   * Example using an account name/key:
   *
   * ```js
   * const account = "<storage account name>"
   * const sharedKeyCredential = new StorageSharedKeyCredential(account, "<account key>");
   *
   * const blobServiceClient = new BlobServiceClient(
   *   `https://${account}.blob.core.windows.net`,
   *   sharedKeyCredential
   * );
   * ```
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlobServiceClient.
   *
   * @param {string} url A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlobServiceClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    url: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    options?: StoragePipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipeline instanceof Pipeline) {
      pipeline = credentialOrPipeline;
    } else if (
      (isNode && credentialOrPipeline instanceof StorageSharedKeyCredential) ||
      credentialOrPipeline instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipeline)
    ) {
      pipeline = newPipeline(credentialOrPipeline, options);
    } else {
      // The second parameter is undefined. Use anonymous credential
      pipeline = newPipeline(new AnonymousCredential(), options);
    }
    super(url, pipeline);
    this.serviceContext = new Service(this.storageClientContext);
  }

  /**
   * Creates a {@link ContainerClient} object
   *
   * @param {string} containerName A container name
   * @returns {ContainerClient} A new ContainerClient object for the given container name.
   * @memberof BlobServiceClient
   *
   * Example usage:
   *
   * ```js
   * const containerClient = blobServiceClient.getContainerClient("<container name>");
   * ```
   */
  public getContainerClient(containerName: string): ContainerClient {
    return new ContainerClient(
      appendToURLPath(this.url, encodeURIComponent(containerName)),
      this.pipeline
    );
  }

  /**
   * Create a Blob container.
   *
   * @param {string} containerName Name of the container to create.
   * @param {ContainerCreateOptions} [options] Options to configure Container Create operation.
   * @returns {Promise<{ containerClient: ContainerClient; containerCreateResponse: ContainerCreateResponse }>} Container creation response and the corresponding container client.
   * @memberof BlobServiceClient
   */
  public async createContainer(
    containerName: string,
    options: ContainerCreateOptions = {}
  ): Promise<{
    containerClient: ContainerClient;
    containerCreateResponse: ContainerCreateResponse;
  }> {
    const { span, spanOptions } = createSpan(
      "BlobServiceClient-createContainer",
      options.tracingOptions
    );
    try {
      const containerClient = this.getContainerClient(containerName);
      const containerCreateResponse = await containerClient.create({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        containerClient,
        containerCreateResponse
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
   * Deletes a Blob container.
   *
   * @param {string} containerName Name of the container to delete.
   * @param {ContainerDeleteMethodOptions} [options] Options to configure Container Delete operation.
   * @returns {Promise<ContainerDeleteResponse>} Container deletion response.
   * @memberof BlobServiceClient
   */
  public async deleteContainer(
    containerName: string,
    options: ContainerDeleteMethodOptions = {}
  ): Promise<ContainerDeleteResponse> {
    const { span, spanOptions } = createSpan(
      "BlobServiceClient-deleteContainer",
      options.tracingOptions
    );
    try {
      const containerClient = this.getContainerClient(containerName);
      return await containerClient.delete({
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
   * Gets the properties of a storage account’s Blob service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties
   *
   * @param {ServiceGetPropertiesOptions} [options] Options to the Service Get Properties operation.
   * @returns {Promise<ServiceGetPropertiesResponse>} Response data for the Service Get Properties operation.
   * @memberof BlobServiceClient
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {}
  ): Promise<ServiceGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "BlobServiceClient-getProperties",
      options.tracingOptions
    );
    try {
      return await this.serviceContext.getProperties({
        abortSignal: options.abortSignal,
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
   * Sets properties for a storage account’s Blob service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-service-properties}
   *
   * @param {BlobServiceProperties} properties
   * @param {ServiceSetPropertiesOptions} [options] Options to the Service Set Properties operation.
   * @returns {Promise<ServiceSetPropertiesResponse>} Response data for the Service Set Properties operation.
   * @memberof BlobServiceClient
   */
  public async setProperties(
    properties: BlobServiceProperties,
    options: ServiceSetPropertiesOptions = {}
  ): Promise<ServiceSetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "BlobServiceClient-setProperties",
      options.tracingOptions
    );
    try {
      return await this.serviceContext.setProperties(properties, {
        abortSignal: options.abortSignal,
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
   * Retrieves statistics related to replication for the Blob service. It is only
   * available on the secondary location endpoint when read-access geo-redundant
   * replication is enabled for the storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-stats}
   *
   * @param {ServiceGetStatisticsOptions} [options] Options to the Service Get Statistics operation.
   * @returns {Promise<ServiceGetStatisticsResponse>} Response data for the Service Get Statistics operation.
   * @memberof BlobServiceClient
   */
  public async getStatistics(
    options: ServiceGetStatisticsOptions = {}
  ): Promise<ServiceGetStatisticsResponse> {
    const { span, spanOptions } = createSpan(
      "BlobServiceClient-getStatistics",
      options.tracingOptions
    );
    try {
      return await this.serviceContext.getStatistics({
        abortSignal: options.abortSignal,
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
   * The Get Account Information operation returns the sku name and account kind
   * for the specified account.
   * The Get Account Information operation is available on service versions beginning
   * with version 2018-03-28.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-account-information
   *
   * @param {ServiceGetAccountInfoOptions} [options] Options to the Service Get Account Info operation.
   * @returns {Promise<ServiceGetAccountInfoResponse>} Response data for the Service Get Account Info operation.
   * @memberof BlobServiceClient
   */
  public async getAccountInfo(
    options: ServiceGetAccountInfoOptions = {}
  ): Promise<ServiceGetAccountInfoResponse> {
    const { span, spanOptions } = createSpan(
      "BlobServiceClient-getAccountInfo",
      options.tracingOptions
    );
    try {
      return await this.serviceContext.getAccountInfo({
        abortSignal: options.abortSignal,
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
   * Returns a list of the containers under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-containers2
   *
   * @param {string} [marker] A string value that identifies the portion of
   *                        the list of containers to be returned with the next listing operation. The
   *                        operation returns the NextMarker value within the response body if the
   *                        listing operation did not return all containers remaining to be listed
   *                        with the current page. The NextMarker value can be used as the value for
   *                        the marker parameter in a subsequent call to request the next page of list
   *                        items. The marker value is opaque to the client.
   * @param {ServiceListContainersSegmentOptions} [options] Options to the Service List Container Segment operation.
   * @returns {Promise<ServiceListContainersSegmentResponse>} Response data for the Service List Container Segment operation.
   * @memberof BlobServiceClient
   */
  private async listContainersSegment(
    marker?: string,
    options: ServiceListContainersSegmentOptions = {}
  ): Promise<ServiceListContainersSegmentResponse> {
    const { span, spanOptions } = createSpan(
      "BlobServiceClient-listContainersSegment",
      options.tracingOptions
    );
    try {
      return await this.serviceContext.listContainersSegment({
        abortSignal: options.abortSignal,
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
   * Returns an AsyncIterableIterator for ServiceListContainersSegmentResponses
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                        the list of containers to be returned with the next listing operation. The
   *                        operation returns the NextMarker value within the response body if the
   *                        listing operation did not return all containers remaining to be listed
   *                        with the current page. The NextMarker value can be used as the value for
   *                        the marker parameter in a subsequent call to request the next page of list
   *                        items. The marker value is opaque to the client.
   * @param {ServiceListContainersSegmentOptions} [options] Options to list containers operation.
   * @returns {AsyncIterableIterator<ServiceListContainersSegmentResponse>}
   * @memberof BlobServiceClient
   */
  private async *listSegments(
    marker?: string,
    options: ServiceListContainersSegmentOptions = {}
  ): AsyncIterableIterator<ServiceListContainersSegmentResponse> {
    let listContainersSegmentResponse;
    if (!!marker || marker === undefined) {
      do {
        listContainersSegmentResponse = await this.listContainersSegment(marker, options);
        listContainersSegmentResponse.containerItems =
          listContainersSegmentResponse.containerItems || [];
        marker = listContainersSegmentResponse.continuationToken;
        yield await listContainersSegmentResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator for Container Items
   *
   * @private
   * @param {ServiceListContainersSegmentOptions} [options] Options to list containers operation.
   * @returns {AsyncIterableIterator<ContainerItem>}
   * @memberof BlobServiceClient
   */
  private async *listItems(
    options: ServiceListContainersSegmentOptions = {}
  ): AsyncIterableIterator<ContainerItem> {
    let marker: string | undefined;
    for await (const segment of this.listSegments(marker, options)) {
      yield* segment.containerItems;
    }
  }

  /**
   * Returns an async iterable iterator to list all the containers
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the containers in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * for await (const container of blobServiceClient.listContainers()) {
   *   console.log(`Container ${i++}: ${container.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * const iter = blobServiceClient.listContainers();
   * let containerItem = await iter.next();
   * while (!containerItem.done) {
   *   console.log(`Container ${i++}: ${containerItem.value.name}`);
   *   containerItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of blobServiceClient.listContainers().byPage({ maxPageSize: 20 })) {
   *   if (response.containerItems) {
   *     for (const container of response.containerItems) {
   *       console.log(`Container ${i++}: ${container.name}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 container names
   * if (response.containerItems) {
   *   for (const container of response.containerItems) {
   *     console.log(`Container ${i++}: ${container.name}`);
   *   }
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * iterator = blobServiceClient
   *   .listContainers()
   *   .byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 container names
   * if (response.containerItems) {
   *   for (const container of response.containerItems) {
   *      console.log(`Container ${i++}: ${container.name}`);
   *   }
   * }
   * ```
   *
   * @param {ServiceListContainersOptions} [options={}] Options to list containers.
   * @returns {PagedAsyncIterableIterator<ContainerItem, ServiceListContainersSegmentResponse>} An asyncIterableIterator that supports paging.
   * @memberof BlobServiceClient
   */
  public listContainers(
    options: ServiceListContainersOptions = {}
  ): PagedAsyncIterableIterator<ContainerItem, ServiceListContainersSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }
    // AsyncIterableIterator to iterate over containers
    const listSegmentOptions: ServiceListContainersSegmentOptions = {
      ...options,
      ...(options.includeMetadata ? { include: "metadata" } : {})
    };

    const iter = this.listItems(listSegmentOptions);
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
          ...listSegmentOptions
        });
      }
    };
  }

  /**
   * ONLY AVAILABLE WHEN USING BEARER TOKEN AUTHENTICATION (TokenCredential).
   *
   * Retrieves a user delegation key for the Blob service. This is only a valid operation when using
   * bearer token authentication.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-user-delegation-key
   *
   * @param {Date} startsOn      The start time for the user delegation SAS. Must be within 7 days of the current time
   * @param {Date} expiresOn     The end time for the user delegation SAS. Must be within 7 days of the current time
   * @returns {Promise<ServiceGetUserDelegationKeyResponse>}
   * @memberof BlobServiceClient
   */
  public async getUserDelegationKey(
    startsOn: Date,
    expiresOn: Date,
    options: ServiceGetUserDelegationKeyOptions = {}
  ): Promise<ServiceGetUserDelegationKeyResponse> {
    const { span, spanOptions } = createSpan(
      "BlobServiceClient-getUserDelegationKey",
      options.tracingOptions
    );
    try {
      const response = await this.serviceContext.getUserDelegationKey(
        {
          startsOn: truncatedISO8061Date(startsOn, false),
          expiresOn: truncatedISO8061Date(expiresOn, false)
        },
        {
          abortSignal: options.abortSignal,
          spanOptions
        }
      );

      const userDelegationKey = {
        signedObjectId: response.signedObjectId,
        signedTenantId: response.signedTenantId,
        signedStartsOn: new Date(response.signedStartsOn),
        signedExpiresOn: new Date(response.signedExpiresOn),
        signedService: response.signedService,
        signedVersion: response.signedVersion,
        value: response.value
      };

      const res: ServiceGetUserDelegationKeyResponse = {
        _response: response._response,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        version: response.version,
        date: response.date,
        errorCode: response.errorCode,
        ...userDelegationKey
      };

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
   * Creates a BlobBatchClient object to conduct batch operations.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
   *
   * @returns {BlobBatchClient} A new BlobBatchClient object for this service.
   * @memberof BlobServiceClient
   */
  public getBlobBatchClient(): BlobBatchClient {
    return new BlobBatchClient(this.url, this.pipeline);
  }
}
