// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { TokenCredential, isTokenCredential, isNode, HttpResponse } from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import * as Models from "./generated/src/models";
import { AbortSignalLike } from "@azure/abort-controller";
import { ListQueuesIncludeType } from "./generated/src/models";
import { Service, Queue } from "./generated/src/operations";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  appendToURLPath,
  extractConnectionStringParts,
  truncatedISO8061Date
} from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { createSpan } from "./utils/tracing";
import { Metadata } from "./models";
import { QueueClient } from "./QueueClient";

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
   * @member {ListQueuesIncludeType} [include] Specifies whether the queue's metadata be returned as part of the response
   * body.
   */
  includeMetadata?: boolean;
}

/**
 * Options to configure Queue - Create operation
 *
 * @export
 * @interface QueueCreateOptions
 */
export interface QueueCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the queue object.
   * The keys need to be lower-case.
   *
   * @type {Metadata}
   * @memberof QueueCreateOptions
   */
  metadata?: Metadata;
}

/**
 * Options to configure Queue - Get Properties operation
 *
 * @export
 * @interface QueueGetPropertiesOptions
 */
export interface QueueGetPropertiesOptions extends CommonOptions {
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
 * Options to configure Queue - Delete operation
 *
 * @export
 * @interface QueueDeleteOptions
 */
export interface QueueDeleteOptions extends CommonOptions {
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
 * Options to configure Queue - Get Access Policy operation
 *
 * @export
 * @interface QueueGetAccessPolicyOptions
 */
export interface QueueGetAccessPolicyOptions extends CommonOptions {
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
 * Options to configure Queue - Set Access Policy operation
 *
 * @export
 * @interface QueueSetAccessPolicyOptions
 */
export interface QueueSetAccessPolicyOptions extends CommonOptions {
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
 * Options to configure Queue - Set Metadata operation
 *
 * @export
 * @interface QueueSetMetadataOptions
 */
export interface QueueSetMetadataOptions extends CommonOptions {
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
     * @member {Date} start the date-time the policy is active.
     */
    start: Date;
    /**
     * @member {string} expiry the date-time the policy expires.
     */
    expiry: Date;
    /**
     * @member {string} permission the permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
     */
    permission: string;
  };
}

export declare type QueueGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
} & Models.QueueGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: Models.QueueGetAccessPolicyHeaders;
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
 * A QueueServiceClient represents a URL to the Azure Storage Queue service allowing you
 * to manipulate queues.
 *
 * @export
 * @class QueueServiceClient
 */
export class QueueServiceClient extends StorageClient {
  /**
   * serviceContext provided by protocol layer.
   *
   * @private
   * @type {Service}
   * @memberof QueueServiceClient
   */
  private serviceContext: Service;
  /**
   * queueContext provided by protocol layer.
   *
   * @private
   * @type {Queue}
   * @memberof QueueServiceClient
   */
  private queueContext: Queue;
  private _queueName: string;
  public get queueName(): string {
    return this._queueName;
  }

  /**
   * Creates an instance of QueueServiceClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} queueName Queue name.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @memberof QueueServiceClient
   */
  constructor(connectionString: string, queueName: string, options?: NewPipelineOptions);
  /**
   * Creates an instance of QueueServiceClient.
   *
   * @param {string} url A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
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
   * @param {string} url A URL string pointing to Azure Storage queue, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.queue.core.windows.net/myqueue?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof QueueServiceClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrQueueName?:
      | SharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline
      | string,
    options?: NewPipelineOptions
  ) {
    options = options || {};
    let pipeline: Pipeline;
    let url: string;
    if (credentialOrPipelineOrQueueName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrQueueName;
    } else if (
      (isNode && credentialOrPipelineOrQueueName instanceof SharedKeyCredential) ||
      credentialOrPipelineOrQueueName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrQueueName)
    ) {
      // (url: string, credential?: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: NewPipelineOptions)
      url = urlOrConnectionString;
      pipeline = newPipeline(credentialOrPipelineOrQueueName, options);
    } else if (
      !credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName !== "string"
    ) {
      // (url: string, credential?: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: NewPipelineOptions)
      // The second paramter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrQueueName &&
      typeof credentialOrPipelineOrQueueName === "string"
    ) {
      // (connectionString: string, containerName: string, queueName: string, options?: NewPipelineOptions)
      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const queueName = credentialOrPipelineOrQueueName;
          const sharedKeyCredential = new SharedKeyCredential(
            extractedCreds.accountName,
            extractedCreds.accountKey
          );
          url = appendToURLPath(extractedCreds.url, queueName);
          options.proxy = extractedCreds.proxyUri;
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        const queueName = credentialOrPipelineOrQueueName;
        url = appendToURLPath(extractedCreds.url, queueName) + "?" + extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for queueName parameter");
    }
    super(url, pipeline);
    this._queueName = this.getQueueNameFromUrl();
    this.serviceContext = new Service(this.storageClientContext);
    this.queueContext = new Queue(this.storageClientContext);
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
  public async getServiceProperties(
    options: ServiceGetPropertiesOptions = {}
  ): Promise<Models.ServiceGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-getServiceProperties",
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
   * @param {Models.QueueServiceProperties} properties
   * @param {ServiceGetPropertiesOptions} [options] Options to set properties operation.
   * @returns {Promise<Models.ServiceSetPropertiesResponse>} Response data for the Set Properties operation.
   * @memberof QueueServiceClient
   */
  public async setServiceProperties(
    properties: Models.QueueServiceProperties,
    options: ServiceGetPropertiesOptions = {}
  ): Promise<Models.ServiceSetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-setServiceProperties",
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
  public async getServiceStatistics(
    options: ServiceGetStatisticsOptions = {}
  ): Promise<Models.ServiceGetStatisticsResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-getServiceStatistics",
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
          maxresults: settings.maxPageSize,
          ...updatedOptions
        });
      }
    };
  }

  /**
   * Creates a new queue under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param {QueueCreateOptions} [options] Options to Queue create operation.
   * @returns {Promise<Models.QueueCreateResponse>} Response data for the Queue create operation.
   * @memberof QueueServiceClient
   */
  public async create(options: QueueCreateOptions = {}): Promise<Models.QueueCreateResponse> {
    const { span, spanOptions } = createSpan("QueueServiceClient-create", options.spanOptions);
    try {
      return this.queueContext.create({
        ...options,
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
   * Creates a QueueClient object.
   * @param queueName
   */
  public getQueueClient(): QueueClient {
    return new QueueClient(appendToURLPath(this.url, "messages"), this.pipeline);
  }

  /**
   * Gets all user-defined metadata and system properties for the specified
   * queue. Metadata is associated with the queue as name-values pairs.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-metadata
   *
   * @param {QueueGetPropertiesOptions} [options] Options to Queue get properties operation.
   * @returns {Promise<Models.QueueGetPropertiesResponse>} Response data for the Queue get properties operation.
   * @memberof QueueServiceClient
   */
  public async getProperties(
    options: QueueGetPropertiesOptions = {}
  ): Promise<Models.QueueGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-getProperties",
      options.spanOptions
    );
    try {
      return this.queueContext.getProperties({
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
   * Deletes the specified queue permanently.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param {QueueDeleteOptions} [options] Options to Queue delete operation.
   * @returns {Promise<Models.QueueDeleteResponse>} Response data for the Queue delete operation.
   * @memberof QueueServiceClient
   */
  public async delete(options: QueueDeleteOptions = {}): Promise<Models.QueueDeleteResponse> {
    const { span, spanOptions } = createSpan("QueueServiceClient-delete", options.spanOptions);
    try {
      return this.queueContext.deleteMethod({
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
   * Sets one or more user-defined name-value pairs for the specified queue.
   *
   * If no option provided, or no metadata defined in the option parameter, the queue
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing metadata will be removed.
   * @param {QueueSetMetadataOptions} [options] Options to Queue set metadata operation.
   * @returns {Promise<Models.QueueSetMetadataResponse>} Response data for the Queue set metadata operation.
   * @memberof QueueServiceClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: QueueSetMetadataOptions = {}
  ): Promise<Models.QueueSetMetadataResponse> {
    const { span, spanOptions } = createSpan("QueueServiceClient-setMetadata", options.spanOptions);
    try {
      return this.queueContext.setMetadata({
        abortSignal: options.abortSignal,
        metadata,
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
   * Gets details about any stored access policies specified on the queue that may be used with Shared Access Signatures.
   *
   * WARNING: JavaScript Date will potential lost precision when parsing start and expiry string.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-acl
   *
   * @param {QueueGetAccessPolicyOptions} [options] Options to Queue get access policy operation.
   * @returns {Promise<QueueGetAccessPolicyResponse>} Response data for the Queue get access policy operation.
   * @memberof QueueServiceClient
   */
  public async getAccessPolicy(
    options: QueueGetAccessPolicyOptions = {}
  ): Promise<QueueGetAccessPolicyResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-getAccessPolicy",
      options.spanOptions
    );
    try {
      const response = await this.queueContext.getAccessPolicy({
        abortSignal: options.abortSignal,
        spanOptions
      });

      const res: QueueGetAccessPolicyResponse = {
        _response: response._response,
        date: response.date,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        signedIdentifiers: [],
        version: response.version,
        errorCode: response.errorCode
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
   * Sets stored access policies for the queue that may be used with Shared Access Signatures.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-acl
   *
   * @param {PublicAccessType} [access]
   * @param {SignedIdentifier[]} [queueAcl]
   * @param {QueueSetAccessPolicyOptions} [options] Options to Queue set access policy operation.
   * @returns {Promise<Models.QueueSetAccessPolicyResponse>} Response data for the Queue set access policy operation.
   * @memberof QueueServiceClient
   */
  public async setAccessPolicy(
    queueAcl?: SignedIdentifier[],
    options: QueueSetAccessPolicyOptions = {}
  ): Promise<Models.QueueSetAccessPolicyResponse> {
    const { span, spanOptions } = createSpan(
      "QueueServiceClient-setAccessPolicy",
      options.spanOptions
    );
    try {
      const acl: Models.SignedIdentifier[] = [];
      for (const identifier of queueAcl || []) {
        acl.push({
          accessPolicy: {
            expiry: truncatedISO8061Date(identifier.accessPolicy.expiry),
            permission: identifier.accessPolicy.permission,
            start: truncatedISO8061Date(identifier.accessPolicy.start)
          },
          id: identifier.id
        });
      }

      return this.queueContext.setAccessPolicy({
        abortSignal: options.abortSignal,
        queueAcl: acl,
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

  private getQueueNameFromUrl(): string {
    //  URL may look like the following
    // "https://myaccount.queue.core.windows.net/myqueue?sasString".
    // "https://myaccount.queue.core.windows.net/myqueue".
    try {
      let urlWithoutSAS = this.url.split("?")[0]; // removing the sas part of url if present
      urlWithoutSAS = urlWithoutSAS.endsWith("/") ? urlWithoutSAS.slice(0, -1) : urlWithoutSAS; // Slicing off '/' at the end if exists

      const queueName = urlWithoutSAS.match("([^/]*)://([^/]*)/([^/]*)")![3];
      if (!queueName) {
        throw new Error("Provided queueName is invalid.");
      } else {
        return queueName;
      }
    } catch (error) {
      throw new Error("Unable to extract queueName with provided information.");
    }
  }
}
