// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  TokenCredential,
  isTokenCredential,
  isNode,
  getDefaultProxySettings
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/types";
import {
  ListQueuesIncludeType,
  QueueCreateResponse,
  QueueDeleteResponse,
  QueueItem,
  QueueServiceProperties,
  ServiceGetPropertiesResponse,
  ServiceGetStatisticsResponse,
  ServiceListQueuesSegmentResponse,
  ServiceSetPropertiesResponse
} from "./generatedModels";
import { AbortSignalLike } from "@azure/abort-controller";
import { Service } from "./generated/src/operations";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { appendToURLPath, extractConnectionStringParts } from "./utils/utils.common";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { createSpan } from "./utils/tracing";
import { QueueClient, QueueCreateOptions, QueueDeleteOptions } from "./QueueClient";

/**
 * Options to configure {@link QueueServiceClient.getProperties} operation
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
 * Options to configure {@link QueueServiceClient.setProperties} operation
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
 * Options to configure {@link QueueServiceClient.getStatistics} operation
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
 * Options to configure Queue Service - List Queues Segment operation
 *
 * See:
 * - {@link QueueServiceClient.listSegments}
 * - {@link QueueServiceClient.listQueuesSegment}
 * - {@link QueueServiceClient.listItems}
 *
 * @interface ServiceListQueuesSegmentOptions
 */
interface ServiceListQueuesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceListQueuesSegmentOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only queues
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * Specifies the maximum number of queues
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
   * specify that the queue's metadata be returned as part of the response
   * body. Possible values include: 'metadata'
   */
  include?: ListQueuesIncludeType;
}

/**
 * Options to configure {@link QueueServiceClient.listQueues} operation
 *
 * @export
 * @interface ServiceListQueuesOptions
 */
export interface ServiceListQueuesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceListQueuesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only queues
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * Specifies whether the queue's metadata be returned as part of the response
   * body.
   */
  includeMetadata?: boolean;
}

/**
 * A QueueServiceClient represents a URL to the Azure Storage Queue service allowing you
 * to manipulate queues.
 *
 * @export
 * @class QueueServiceClient
 */
export class QueueServiceClient extends StorageClient {
  /**
   * Creates an instance of QueueServiceClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {StoragePipelineOptions} [options] Options to configure the HTTP pipeline.
   * @returns {QueueServiceClient} A new QueueServiceClient object from the given connection string.
   * @memberof QueueServiceClient
   */
  public static fromConnectionString(
    connectionString: string,
    options?: StoragePipelineOptions
  ): QueueServiceClient {
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
        return new QueueServiceClient(extractedCreds.url, pipeline);
      } else {
        throw new Error("Account connection string is only supported in Node.js environment");
      }
    } else if (extractedCreds.kind === "SASConnString") {
      const pipeline = newPipeline(new AnonymousCredential(), options);
      return new QueueServiceClient(extractedCreds.url + "?" + extractedCreds.accountSas, pipeline);
    } else {
      throw new Error(
        "Connection string must be either an Account connection string or a SAS connection string"
      );
    }
  }

  /**
   * serviceContext provided by protocol layer.
   *
   * @private
   * @type {Service}
   * @memberof QueueServiceClient
   */
  private serviceContext: Service;

  /**
   * Creates an instance of QueueServiceClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue service, such as
   *                     "https://myaccount.queue.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.queue.core.windows.net?sasString".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof QueueServiceClient
   *
   * Example using DefaultAzureCredential from `@azure/identity`:
   *
   * ```js
   * const account = "<account>";
   *
   * const credential = new DefaultAzureCredential();
   *
   * const queueServiceClient = new QueueServiceClient(
   *   `https://${account}.queue.core.windows.net`,
   *   credential
   * }
   * ```
   *
   * Example using an account name/key:
   *
   * ```js
   * const account = "<account>";
   *
   * const sharedKeyCredential = new StorageSharedKeyCredential(account, "<account key>");
   *
   * const queueServiceClient = new QueueServiceClient(
   *   `https://${account}.queue.core.windows.net`,
   *   sharedKeyCredential,
   *   {
   *     retryOptions: { maxTries: 4 }, // Retry options
   *     telemetry: { value: "BasicSample/V11.0.0" } // Customized telemetry string
   *   }
   * );
   * ```
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of QueueServiceClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue service, such as
   *                     "https://myaccount.queue.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.queue.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof QueueServiceClient
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
      // The second paramter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    }
    super(url, pipeline);
    this.serviceContext = new Service(this.storageClientContext);
  }

  /**
   * Creates a {@link QueueClient} object.
   *
   * @param {string} queueName
   * @returns {QueueClient} a new QueueClient
   * @memberof QueueServiceClient
   *
   * Example usage:
   *
   * ```js
   * const queueClient = queueServiceClient.getQueueClient("<new queue name>");
   * const createQueueResponse = await queueClient.create();
   * ```
   */
  public getQueueClient(queueName: string): QueueClient {
    return new QueueClient(appendToURLPath(this.url, queueName), this.pipeline);
  }

  /**
   * Returns a list of the queues under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-queues1
   *
   * @param {string} [marker] A string value that identifies the portion of
   *                        the list of queues to be returned with the next listing operation. The
   *                        operation returns the NextMarker value within the response body if the
   *                        listing operation did not return all queues remaining to be listed
   *                        with the current page. The NextMarker value can be used as the value for
   *                        the marker parameter in a subsequent call to request the next page of list
   *                        items. The marker value is opaque to the client.
   * @param {ServiceListQueuesSegmentOptions} [options] Options to list queues operation.
   * @returns {Promise<ServiceListQueuesSegmentResponse>} Response data for the list queues segment operation.
   * @memberof QueueServiceClient
   */
  private async listQueuesSegment(
    marker?: string,
    options: ServiceListQueuesSegmentOptions = {}
  ): Promise<ServiceListQueuesSegmentResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-listQueuesSegment",
      options.tracingOptions
    );

    if (options.prefix === "") {
      options.prefix = undefined;
    }

    try {
      return await this.serviceContext.listQueuesSegment({
        abortSignal: options.abortSignal,
        marker: marker,
        maxPageSize: options.maxPageSize,
        prefix: options.prefix,
        include: options.include === undefined ? undefined : [options.include],
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
   * Returns an AsyncIterableIterator for {@link ServiceListQueuesSegmentResponse} objects
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                        the list of queues to be returned with the next listing operation. The
   *                        operation returns the NextMarker value within the response body if the
   *                        listing operation did not return all queues remaining to be listed
   *                        with the current page. The NextMarker value can be used as the value for
   *                        the marker parameter in a subsequent call to request the next page of list
   *                        items. The marker value is opaque to the client.
   * @param {ServiceListQueuesSegmentOptions} [options] Options to list queues operation.
   * @returns {AsyncIterableIterator<ServiceListQueuesSegmentResponse>}
   * @memberof QueueServiceClient
   */
  private async *listSegments(
    marker?: string,
    options: ServiceListQueuesSegmentOptions = {}
  ): AsyncIterableIterator<ServiceListQueuesSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    let listQueuesResponse;
    do {
      listQueuesResponse = await this.listQueuesSegment(marker, options);
      marker = listQueuesResponse.continuationToken;
      yield await listQueuesResponse;
    } while (marker);
  }

  /**
   * Returns an AsyncIterableIterator for {@link QueueItem} objects
   *
   * @private
   * @param {ServiceListQueuesSegmentOptions} [options] Options to list queues operation.
   * @returns {AsyncIterableIterator<QueueItem>}
   * @memberof QueueServiceClient
   */
  private async *listItems(
    options: ServiceListQueuesSegmentOptions = {}
  ): AsyncIterableIterator<QueueItem> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    let marker: string | undefined;
    for await (const segment of this.listSegments(marker, options)) {
      yield* segment.queueItems;
    }
  }

  /**
   * Returns an async iterable iterator to list all the queues
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the queues in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * for await (const item of queueServiceClient.listQueues()) {
   *   console.log(`Queue${i}: ${item.name}`);
   *   i++;
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iterator = queueServiceClient.listQueues();
   * let item = await iterator.next();
   * while (!item.done) {
   *   console.log(`Queue${i}: ${iterator.value.name}`);
   *   i++;
   *   item = await iterator.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const item2 of queueServiceClient.listQueues().byPage({ maxPageSize: 20 })) {
   *   if (item2.queueItems) {
   *     for (const queueItem of item2.queueItems) {
   *       console.log(`Queue${i}: ${queueItem.name}`);
   *       i++;
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = queueServiceClient.listQueues().byPage({ maxPageSize: 2 });
   * let item = (await iterator.next()).value;
   *
   * // Prints 2 queue names
   * if (item.queueItems) {
   *   for (const queueItem of item.queueItems) {
   *     console.log(`Queue${i}: ${queueItem.name}`);
   *     i++;
   *   }
   * }
   * // Gets next marker
   * let marker = item.continuationToken;
   *
   * // Passing next marker as continuationToken
   * iterator = queueServiceClient.listQueues().byPage({ continuationToken: marker, maxPageSize: 10 });
   * item = (await iterator.next()).value;
   *
   * // Prints 10 queue names
   * if (item.queueItems) {
   *   for (const queueItem of item.queueItems) {
   *     console.log(`Queue${i}: ${queueItem.name}`);
   *     i++;
   *   }
   * }
   * ```
   *
   * @param {ServiceListQueuesOptions} [options] Options to list queues operation.
   * @memberof QueueServiceClient
   * @returns {PagedAsyncIterableIterator<QueueItem, ServiceListQueuesSegmentResponse>} An asyncIterableIterator that supports paging.
   */
  public listQueues(
    options: ServiceListQueuesOptions = {}
  ): PagedAsyncIterableIterator<QueueItem, ServiceListQueuesSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    const updatedOptions: ServiceListQueuesSegmentOptions = {
      ...options,
      ...(options.includeMetadata ? { include: "metadata" } : {})
    };

    // AsyncIterableIterator to iterate over queues
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
   * Gets the properties of a storage account’s Queue service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-service-properties
   *
   * @param {ServiceGetPropertiesOptions} [options] Options to get properties operation.
   * @returns {Promise<ServiceGetPropertiesResponse>} Response data including the queue service properties.
   * @memberof QueueServiceClient
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {}
  ): Promise<ServiceGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-getProperties",
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
   * Sets properties for a storage account’s Queue service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-service-properties
   *
   * @param {QueueServiceProperties} properties
   * @param {ServiceGetPropertiesOptions} [options] Options to set properties operation.
   * @returns {Promise<ServiceSetPropertiesResponse>} Response data for the Set Properties operation.
   * @memberof QueueServiceClient
   */
  public async setProperties(
    properties: QueueServiceProperties,
    options: ServiceGetPropertiesOptions = {}
  ): Promise<ServiceSetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-setProperties",
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
   * Retrieves statistics related to replication for the Queue service. It is only
   * available on the secondary location endpoint when read-access geo-redundant
   * replication is enabled for the storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-service-stats
   *
   * @param {ServiceGetStatisticsOptions} [options] Options to get statistics operation.
   * @returns {Promise<ServiceGetStatisticsResponse>} Response data for get statistics the operation.
   * @memberof QueueServiceClient
   */
  public async getStatistics(
    options: ServiceGetStatisticsOptions = {}
  ): Promise<ServiceGetStatisticsResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-getStatistics",
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
   * Creates a new queue under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param {string} queueName name of the queue to create
   * @param {QueueCreateOptions} [options] Options to Queue create operation.
   * @returns {Promise<QueueCreateResponse>} Response data for the Queue create operation.
   * @memberof QueueServiceClient
   */
  public async createQueue(
    queueName: string,
    options: QueueCreateOptions = {}
  ): Promise<QueueCreateResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-createQueue",
      options.tracingOptions
    );
    try {
      return await this.getQueueClient(queueName).create({
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
   * Deletes the specified queue permanently.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param {string} queueName name of the queue to delete.
   * @param {QueueDeleteOptions} [options] Options to Queue delete operation.
   * @returns {Promise<QueueDeleteResponse>} Response data for the Queue delete operation.
   * @memberof QueueServiceClient
   */
  public async deleteQueue(
    queueName: string,
    options: QueueDeleteOptions = {}
  ): Promise<QueueDeleteResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-deleteQueue",
      options.tracingOptions
    );
    try {
      return await this.getQueueClient(queueName).delete({
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
}
