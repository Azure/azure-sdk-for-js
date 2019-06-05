// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse } from "@azure/ms-rest-js";
import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { ListQueuesIncludeType } from "./generated/lib/models/index";
import { Service } from "./generated/lib/operations";
import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { QueueClient } from "./QueueClient";
import { appendToURLPath } from "./utils/utils.common";

/**
 * Options to configure Queue Service - Get Properties operation
 *
 * @export
 * @interface ServiceGetPropertiesOptions
 */
export interface ServiceGetPropertiesOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ServiceGetPropertiesOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure Queue Service - Set Properties operation
 *
 * @export
 * @interface ServiceSetPropertiesOptions
 */
export interface ServiceSetPropertiesOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ServiceSetPropertiesOptions
   */
  abortSignal?: Aborter;
}

export type QueueServiceProperties = Models.StorageServiceProperties;

/**
 * Contains response data for the getProperties operation.
 */
export type ServiceGetPropertiesResponse = QueueServiceProperties & Models.ServiceGetPropertiesHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: Models.ServiceGetPropertiesHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: QueueServiceProperties;
    };
};

/**
 * Options to configure Queue Service - Get Statistics operation
 *
 * @export
 * @interface ServiceGetStatisticsOptions
 */
export interface ServiceGetStatisticsOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ServiceGetStatisticsOptions
   */
  abortSignal?: Aborter;
}

/**
 * An interface representing QueueServiceStatistics.
 * Stats for the queue service.
 *
 */
export type QueueServiceStatistics = Models.StorageServiceStats;

/**
 * Contains response data for the getStatistics operation.
 */

 export type ServiceGetStatisticsResponse = QueueServiceStatistics & Models.ServiceGetStatisticsHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: Models.ServiceGetStatisticsHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: QueueServiceStatistics;
    };
};

/**
 * Options to configure Queue Service - List Queues Segment operation
 *
 * @export
 * @interface ServiceListQueuesSegmentOptions
 */
export interface ServiceListQueuesSegmentOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ServiceListQueuesSegmentOptions
   */
  abortSignal?: Aborter;
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
 * A QueueServiceClient represents a URL to the Azure Storage Queue service allowing you
 * to manipulate queues.
 *
 * @export
 * @class QueueServiceClient
 * @extends {StorageClient}
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
   * Creates an instance of QueueServiceClient.
   * @param {string} url A URL string pointing to Azure Storage queue service, such as
   *                     "https://myaccount.queue.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.queue.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof QueueServiceClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.serviceContext = new Service(this.storageClientContext);
  }

  /**
   * Creates a QueueClient object.
   * @param queueName
   */
  public createQueueClient(queueName: string): QueueClient {
    return new QueueClient(appendToURLPath(this.url, queueName), this.pipeline);
  }

  /**
   * Gets the properties of a storage account’s Queue service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-service-properties
   *
   * @param {ServiceGetPropertiesOptions} [options] Optional options to get properties operation.
   * @returns {Promise<Models.ServiceGetPropertiesResponse>}
   * @memberof QueueServiceClient
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {}
  ): Promise<ServiceGetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Sets properties for a storage account’s Queue service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-service-properties
   *
   * @param {QueueServiceProperties} properties Properties to set.
   * @param {ServiceGetPropertiesOptions} [options] Optional options to set properties operation.
   * @returns {Promise<Models.ServiceSetPropertiesResponse>}
   * @memberof QueueServiceClient
   */
  public async setProperties(
    properties: QueueServiceProperties,
    options: ServiceGetPropertiesOptions = {}
  ): Promise<Models.ServiceSetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.setProperties(properties, {
      abortSignal: aborter
    });
  }

  /**
   * Retrieves statistics related to replication for the Queue service. It is only
   * available on the secondary location endpoint when read-access geo-redundant
   * replication is enabled for the storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-service-stats
   *
   * @param {ServiceGetStatisticsOptions} [options] Optional options to get statistics operation.
   * @returns {Promise<Models.ServiceGetStatisticsResponse>}
   * @memberof QueueServiceClient
   */
  public async getStatistics(
    options: ServiceGetStatisticsOptions = {}
  ): Promise<ServiceGetStatisticsResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.getStatistics({
      abortSignal: aborter
    });
  }

  /**
   * Iterates over queues under the specified account.
   *
   * @param {ServiceListQueuesSegmentOptions} [options={}] Options to list queues (optional)
   * @returns {AsyncIterableIterator<Models.QueueItem>}
   * @memberof QueueServiceClient
   *
   * @example
   * let i = 1;
   * for await (const item of queueServiceClient.listQueues()) {
   *   console.log(`Queue${i}: ${item.name}`);
   *   i++;
   * }
   *
   * @example
   * let iter1 = queueServiceClient.listQueues();
   * let i = 1;
   * for await (const item of iter1) {
   *   console.log(`Queue${i}: ${item.name}`);
   *   i++;
   * }
   *
   * @example
   * let iter2 = await queueServiceClient.listQueues();
   * i = 1;
   * let item = await iter2.next();
   * do {
   *   console.log(`Queue${i++}: ${item.value.name}`);
   *   item = await iter2.next();
   * } while (item.value);
   *
   */
  public async *listQueues(
    options: ServiceListQueuesSegmentOptions = {}
  ): AsyncIterableIterator<Models.QueueItem> {
    let marker = undefined;
    const queueServiceClient = this;
    const aborter = !options.abortSignal ? Aborter.none : options.abortSignal;
    let listQueuesResponse;
    do {
      listQueuesResponse = await queueServiceClient.listQueuesSegment(marker, {
        ...options,
        abortSignal: aborter
      });

      marker = listQueuesResponse.nextMarker;
      yield* listQueuesResponse.queueItems;
    } while (marker);
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
   * @param {ServiceListQueuesSegmentOptions} [options] Optional options to list queues operation.
   * @returns {Promise<Models.ServiceListQueuesSegmentResponse>}
   * @memberof QueueServiceClient
   */
  public async listQueuesSegment(
    marker?: string,
    options: ServiceListQueuesSegmentOptions = {}
  ): Promise<Models.ServiceListQueuesSegmentResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.listQueuesSegment({
      abortSignal: aborter,
      marker,
      ...options
    });
  }
}
