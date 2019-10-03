// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { TokenCredential, isTokenCredential, isNode } from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import * as Models from "./generated/src/models";
import { AbortSignalLike } from "@azure/abort-controller";
import { ListQueuesIncludeType } from "./generated/src/models";
import { Service } from "./generated/src/operations";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import { QueueClient } from "./QueueClient";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { appendToURLPath, extractConnectionStringParts } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { createSpan } from "./utils/tracing";

/**
 * Options to configure Queue Service - Get Properties operation
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
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Queue Service - Set Properties operation
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
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Queue Service - Get Statistics operation
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
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Queue Service - List Queues Segment operation
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
   * @member {string} [prefix] Filters the results to return only queues
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * @member {number} [maxresults] Specifies the maximum number of queues
   * to return. If the request does not specify maxresults, or specifies a
   * value greater than 5000, the server will return up to 5000 items. Note
   * that if the listing operation crosses a partition boundary, then the
   * service will return a continuation token for retrieving the remainder of
   * the results. For this reason, it is possible that the service will return
   * fewer results than specified by maxresults, or than the default of 5000.
   */
  maxresults?: number;
  /**
   * @member {ListQueuesIncludeType} [include] Include this parameter to
   * specify that the queue's metadata be returned as part of the response
   * body. Possible values include: 'metadata'
   */
  include?: ListQueuesIncludeType;
}

/**
 * Options to configure Queue Service - List Queues operation
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
   * @member {string} [prefix] Filters the results to return only queues
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * @member {ListQueuesIncludeType} [include] Include this parameter to
   * specify that the queue's metadata be returned as part of the response
   * body. Possible values include: 'metadata'
   */
  include?: ListQueuesIncludeType;
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
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @returns {QueueServiceClient} A new QueueServiceClient object from the given connection string.
   * @memberof QueueServiceClient
   */
  public static fromConnectionString(
    connectionString: string,
    options?: NewPipelineOptions
  ): QueueServiceClient {
    options = options || {};
    const extractedCreds = extractConnectionStringParts(connectionString);
    if (extractedCreds.kind === "AccountConnString") {
      if (isNode) {
        const sharedKeyCredential = new SharedKeyCredential(
          extractedCreds.accountName!,
          extractedCreds.accountKey
        );
        options.proxy = extractedCreds.proxyUri;
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
   * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof QueueServiceClient
   */
  constructor(
    url: string,
    credential?: SharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: NewPipelineOptions
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
    credentialOrPipeline?: SharedKeyCredential | AnonymousCredential | TokenCredential | Pipeline,
    options?: NewPipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipeline instanceof Pipeline) {
      pipeline = credentialOrPipeline;
    } else if (
      (isNode && credentialOrPipeline instanceof SharedKeyCredential) ||
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
   * Creates a QueueClient object.
   * @param queueName
   */
  public getQueueClient(queueName: string): QueueClient {
    return new QueueClient(appendToURLPath(this.url, queueName), this.pipeline);
  }

  /**
   * Gets the properties of a storage account’s Queue service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-service-properties
   *
   * @param {ServiceGetPropertiesOptions} [options] Options to get properties operation.
   * @returns {Promise<Models.ServiceGetPropertiesResponse>} Response data including the queue service properties.
   * @memberof QueueServiceClient
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {}
  ): Promise<Models.ServiceGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-getProperties",
      options.spanOptions
    );
    try {
      return this.serviceContext.getProperties({
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
   * @param {Models.StorageServiceProperties} properties
   * @param {ServiceGetPropertiesOptions} [options] Options to set properties operation.
   * @returns {Promise<Models.ServiceSetPropertiesResponse>} Response data for the Set Properties operation.
   * @memberof QueueServiceClient
   */
  public async setProperties(
    properties: Models.StorageServiceProperties,
    options: ServiceGetPropertiesOptions = {}
  ): Promise<Models.ServiceSetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-setProperties",
      options.spanOptions
    );
    try {
      return this.serviceContext.setProperties(properties, {
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
   * @returns {Promise<Models.ServiceGetStatisticsResponse>} Response data for get statistics the operation.
   * @memberof QueueServiceClient
   */
  public async getStatistics(
    options: ServiceGetStatisticsOptions = {}
  ): Promise<Models.ServiceGetStatisticsResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-getStatistics",
      options.spanOptions
    );
    try {
      return this.serviceContext.getStatistics({
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
   * Returns a list of the queues under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-queues1
   *
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of queues to be returned with the next listing operation. The
   *                          operation returns the NextMarker value within the response body if the
   *                          listing operation did not return all queues remaining to be listed
   *                          with the current page. The NextMarker value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ServiceListQueuesSegmentOptions} [options] Options to list queues operation.
   * @returns {Promise<Models.ServiceListQueuesSegmentResponse>} Response data for the list queues segment operation.
   * @memberof QueueServiceClient
   */
  private async listQueuesSegment(
    marker?: string,
    options: ServiceListQueuesSegmentOptions = {}
  ): Promise<Models.ServiceListQueuesSegmentResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-listQueuesSegment",
      options.spanOptions
    );
    try {
      return this.serviceContext.listQueuesSegment({
        abortSignal: options.abortSignal,
        marker: marker,
        maxresults: options.maxresults,
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
   * Returns an AsyncIterableIterator for ServiceListQueuesSegmentResponses
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of queues to be returned with the next listing operation. The
   *                          operation returns the NextMarker value within the response body if the
   *                          listing operation did not return all queues remaining to be listed
   *                          with the current page. The NextMarker value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ServiceListQueuesSegmentOptions} [options] Options to list queues operation.
   * @returns {AsyncIterableIterator<Models.ServiceListQueuesSegmentResponse>}
   * @memberof QueueServiceClient
   */
  private async *listSegments(
    marker?: string,
    options: ServiceListQueuesSegmentOptions = {}
  ): AsyncIterableIterator<Models.ServiceListQueuesSegmentResponse> {
    let listQueuesResponse;
    do {
      listQueuesResponse = await this.listQueuesSegment(marker, options);
      marker = listQueuesResponse.nextMarker;
      yield await listQueuesResponse;
    } while (marker);
  }

  /**
   * Returns an AsyncIterableIterator for Queue Items
   *
   * @private
   * @param {ServiceListQueuesSegmentOptions} [options] Options to list queues operation.
   * @returns {AsyncIterableIterator<Models.ServiceListQueuesSegmentResponse>}
   * @memberof QueueServiceClient
   */
  private async *listItems(
    options: ServiceListQueuesSegmentOptions = {}
  ): AsyncIterableIterator<Models.QueueItem> {
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
   * @example
   * ```js
   *    let i = 1;
   *    for await (const item of queueServiceClient.listQueues()) {
   *      console.log(`Queue${i}: ${item.name}`);
   *      i++;
   *    }
   * ```
   *
   * @example
   * ```js
   *    // Generator syntax .next()
   *    let i = 1;
   *    let iterator = queueServiceClient.listQueues();
   *    let item = await iterator.next();
   *    while (!item.done) {
   *      console.log(`Queue${i}: ${iterator.value.name}`);
   *      i++;
   *      item = await iterator.next();
   *    }
   * ```
   *
   * @example
   * ```js
   *    // Example for .byPage()
   *    // passing optional maxPageSize in the page settings
   *    let i = 1;
   *    for await (const item2 of queueServiceClient.listQueues().byPage({ maxPageSize: 20 })) {
   *      if (item2.queueItems) {
   *        for (const queueItem of item2.queueItems) {
   *          console.log(`Queue${i}: ${queueItem.name}`);
   *          i++;
   *        }
   *      }
   *    }
   * ```
   *
   * @example
   * ```js
   *    let i = 1;
   *    let iterator = queueServiceClient.listQueues().byPage({ maxPageSize: 2 });
   *    let item = (await iterator.next()).value;
   *    // Prints 2 queue names
   *    if (item.queueItems) {
   *      for (const queueItem of item.queueItems) {
   *        console.log(`Queue${i}: ${queueItem.name}`);
   *        i++;
   *      }
   *    }
   *    // Gets next marker
   *    let marker = item.nextMarker;
   *    // Passing next marker as continuationToken
   *    iterator = queueServiceClient.listQueues().byPage({ continuationToken: marker, maxPageSize: 10 });
   *    item = (await iterator.next()).value;
   *    // Prints 10 queue names
   *    if (item.queueItems) {
   *      for (const queueItem of item.queueItems) {
   *        console.log(`Queue${i}: ${queueItem.name}`);
   *        i++;
   *      }
   *    }
   * ```
   *
   * @param {ServiceListQueuesOptions} [options] Options to list queues operation.
   * @memberof QueueServiceClient
   * @returns {PagedAsyncIterableIterator<Models.QueueItem, Models.ServiceListQueuesSegmentResponse>} An asyncIterableIterator that supports paging.
   */
  public listQueues(
    options: ServiceListQueuesOptions = {}
  ): PagedAsyncIterableIterator<Models.QueueItem, Models.ServiceListQueuesSegmentResponse> {
    // AsyncIterableIterator to iterate over queues
    const iter = this.listItems(options);
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
          maxresults: settings.maxPageSize,
          ...options
        });
      }
    };
  }
}
