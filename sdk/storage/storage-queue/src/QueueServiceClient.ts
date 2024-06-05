// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { isNode } from "@azure/core-util";
import {
  QueueCreateResponse,
  QueueDeleteResponse,
  QueueItem,
  QueueServiceProperties,
  ServiceGetPropertiesResponse,
  ServiceGetPropertiesHeaders,
  ServiceGetStatisticsResponse,
  ServiceListQueuesSegmentResponse,
  ServiceSetPropertiesResponse,
  ServiceListQueuesSegmentHeaders,
  ListQueuesSegmentResponse,
  ServiceSetPropertiesHeaders,
  ServiceGetStatisticsHeaders,
  QueueServiceStatistics,
} from "./generatedModels";
import { AbortSignalLike } from "@azure/abort-controller";
import { Service } from "./generated/src/operationsInterfaces";
import { newPipeline, StoragePipelineOptions, Pipeline, isPipelineLike } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  appendToURLPath,
  appendToURLQuery,
  extractConnectionStringParts,
  assertResponse,
} from "./utils/utils.common";
import { StorageSharedKeyCredential } from "../../storage-blob/src/credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "../../storage-blob/src/credentials/AnonymousCredential";
import { tracingClient } from "./utils/tracing";
import { QueueClient, QueueCreateOptions, QueueDeleteOptions } from "./QueueClient";
import { AccountSASPermissions } from "./AccountSASPermissions";
import { generateAccountSASQueryParameters } from "./AccountSASSignatureValues";
import { AccountSASServices } from "./AccountSASServices";
import { SASProtocol } from "./SASQueryParameters";
import { SasIPRange } from "./SasIPRange";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";

/**
 * Options to configure {@link QueueServiceClient.getProperties} operation
 */
export interface ServiceGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueServiceClient.setProperties} operation
 */
export interface ServiceSetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link QueueServiceClient.getStatistics} operation
 */
export interface ServiceGetStatisticsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
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
 */
interface ServiceListQueuesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
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
  include?: string;
}

/**
 * Options to configure {@link QueueServiceClient.listQueues} operation
 */
export interface ServiceListQueuesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
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
 * Options to configure {@link QueueServiceClient.generateAccountSasUrl} operation.
 */
export interface ServiceGenerateAccountSasUrlOptions {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * Optional. SAS protocols allowed.
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;
  /**
   * Optional. IP range allowed.
   */
  ipRange?: SasIPRange;
}

/**
 * A QueueServiceClient represents a URL to the Azure Storage Queue service allowing you
 * to manipulate queues.
 */
export class QueueServiceClient extends StorageClient {
  /**
   * Creates an instance of QueueServiceClient.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param options - Options to configure the HTTP pipeline.
   * @returns A new QueueServiceClient object from the given connection string.
   */
  public static fromConnectionString(
    connectionString: string,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  ): QueueServiceClient {
    options = options || {};
    const extractedCreds = extractConnectionStringParts(connectionString);
    if (extractedCreds.kind === "AccountConnString") {
      if (isNode) {
        const sharedKeyCredential = new StorageSharedKeyCredential(
          extractedCreds.accountName!,
          extractedCreds.accountKey,
        );
        if (!options.proxyOptions) {
          options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
        }
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
        "Connection string must be either an Account connection string or a SAS connection string",
      );
    }
  }

  /**
   * serviceContext provided by protocol layer.
   */
  private serviceContext: Service;

  /**
   * Creates an instance of QueueServiceClient.
   *
   * @param url - A URL string pointing to Azure Storage queue service, such as
   *                     "https://myaccount.queue.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.queue.core.windows.net?sasString".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Options to configure the HTTP pipeline.
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
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  );
  /**
   * Creates an instance of QueueServiceClient.
   *
   * @param url - A URL string pointing to Azure Storage queue service, such as
   *                     "https://myaccount.queue.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.queue.core.windows.net?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    url: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  ) {
    let pipeline: Pipeline;
    if (isPipelineLike(credentialOrPipeline)) {
      pipeline = credentialOrPipeline;
    } else if (
      (isNode && credentialOrPipeline instanceof StorageSharedKeyCredential) ||
      credentialOrPipeline instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipeline)
    ) {
      pipeline = newPipeline(credentialOrPipeline, options);
    } else {
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    }
    super(url, pipeline);
    this.serviceContext = this.storageClientContext.service;
  }

  /**
   * Creates a {@link QueueClient} object.
   *
   * @param queueName -
   * @returns a new QueueClient
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
   * @param marker - A string value that identifies the portion of
   *                        the list of queues to be returned with the next listing operation. The
   *                        operation returns the continuationToken value within the response body if the
   *                        listing operation did not return all queues remaining to be listed
   *                        with the current page. The continuationToken value can be used as the value for
   *                        the marker parameter in a subsequent call to request the next page of list
   *                        items. The marker value is opaque to the client.
   * @param options - Options to list queues operation.
   * @returns Response data for the list queues segment operation.
   */
  private async listQueuesSegment(
    marker?: string,
    options: ServiceListQueuesSegmentOptions = {},
  ): Promise<ServiceListQueuesSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    return tracingClient.withSpan(
      "QueueServiceClient-listQueuesSegment",
      options,
      async (updatedOptions) => {
        return assertResponse<
          ServiceListQueuesSegmentHeaders & ListQueuesSegmentResponse,
          ServiceListQueuesSegmentHeaders,
          ListQueuesSegmentResponse
        >(
          await this.serviceContext.listQueuesSegment({
            ...updatedOptions,
            marker,
            include: options.include === undefined ? undefined : [options.include],
          }),
        );
      },
    );
  }

  /**
   * Returns an AsyncIterableIterator for {@link ServiceListQueuesSegmentResponse} objects
   *
   * @param marker - A string value that identifies the portion of
   *                        the list of queues to be returned with the next listing operation. The
   *                        operation returns the continuationToken value within the response body if the
   *                        listing operation did not return all queues remaining to be listed
   *                        with the current page. The continuationToken value can be used as the value for
   *                        the marker parameter in a subsequent call to request the next page of list
   *                        items. The marker value is opaque to the client.
   * @param options - Options to list queues operation.
   */
  private async *listSegments(
    marker?: string,
    options: ServiceListQueuesSegmentOptions = {},
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
   * @param options - Options to list queues operation.
   */
  private async *listItems(
    options: ServiceListQueuesSegmentOptions = {},
  ): AsyncIterableIterator<QueueItem> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    let marker: string | undefined;
    for await (const segment of this.listSegments(marker, options)) {
      if (segment.queueItems) {
        yield* segment.queueItems;
      }
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
   *   console.log(`Queue${i}: ${item.value.name}`);
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
   * @param options - Options to list queues operation.
   * @returns An asyncIterableIterator that supports paging.
   */
  public listQueues(
    options: ServiceListQueuesOptions = {},
  ): PagedAsyncIterableIterator<QueueItem, ServiceListQueuesSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    const updatedOptions: ServiceListQueuesSegmentOptions = {
      ...options,
      ...(options.includeMetadata ? { include: "metadata" } : {}),
    };

    // AsyncIterableIterator to iterate over queues
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
          ...updatedOptions,
        });
      },
    };
  }

  /**
   * Gets the properties of a storage account’s Queue service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-service-properties
   *
   * @param options - Options to get properties operation.
   * @returns Response data including the queue service properties.
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {},
  ): Promise<ServiceGetPropertiesResponse> {
    return tracingClient.withSpan(
      "QueueServiceClient-getProperties",
      options,
      async (updatedOptions) => {
        return assertResponse<
          ServiceGetPropertiesHeaders & QueueServiceProperties,
          ServiceGetPropertiesHeaders,
          QueueServiceProperties
        >(await this.serviceContext.getProperties(updatedOptions));
      },
    );
  }

  /**
   * Sets properties for a storage account’s Queue service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-queue-service-properties
   *
   * @param properties -
   * @param options - Options to set properties operation.
   * @returns Response data for the Set Properties operation.
   */
  public async setProperties(
    properties: QueueServiceProperties,
    options: ServiceGetPropertiesOptions = {},
  ): Promise<ServiceSetPropertiesResponse> {
    return tracingClient.withSpan(
      "QueueServiceClient-setProperties",
      options,
      async (updatedOptions) => {
        return assertResponse<ServiceSetPropertiesHeaders, ServiceSetPropertiesHeaders>(
          await this.serviceContext.setProperties(properties, updatedOptions),
        );
      },
    );
  }

  /**
   * Retrieves statistics related to replication for the Queue service. It is only
   * available on the secondary location endpoint when read-access geo-redundant
   * replication is enabled for the storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-queue-service-stats
   *
   * @param options - Options to get statistics operation.
   * @returns Response data for get statistics the operation.
   */
  public async getStatistics(
    options: ServiceGetStatisticsOptions = {},
  ): Promise<ServiceGetStatisticsResponse> {
    return tracingClient.withSpan(
      "QueueServiceClient-getStatistics",
      options,
      async (updatedOptions) => {
        return assertResponse<
          ServiceGetStatisticsHeaders & QueueServiceStatistics,
          ServiceGetStatisticsHeaders,
          QueueServiceStatistics
        >(await this.serviceContext.getStatistics(updatedOptions));
      },
    );
  }

  /**
   * Creates a new queue under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-queue4
   *
   * @param queueName - name of the queue to create
   * @param options - Options to Queue create operation.
   * @returns Response data for the Queue create operation.
   */
  public async createQueue(
    queueName: string,
    options: QueueCreateOptions = {},
  ): Promise<QueueCreateResponse> {
    return tracingClient.withSpan(
      "QueueServiceClient-createQueue",
      options,
      async (updatedOptions) => {
        return this.getQueueClient(queueName).create(updatedOptions);
      },
    );
  }

  /**
   * Deletes the specified queue permanently.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-queue3
   *
   * @param queueName - name of the queue to delete.
   * @param options - Options to Queue delete operation.
   * @returns Response data for the Queue delete operation.
   */
  public async deleteQueue(
    queueName: string,
    options: QueueDeleteOptions = {},
  ): Promise<QueueDeleteResponse> {
    return tracingClient.withSpan(
      "QueueServiceClient-deleteQueue",
      options,
      async (updatedOptions) => {
        return this.getQueueClient(queueName).delete(updatedOptions);
      },
    );
  }

  /**
   * Only available for QueueServiceClient constructed with a shared key credential.
   *
   * Generates an account Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-account-sas
   *
   * @param expiresOn - Optional. The time at which the shared access signature becomes invalid. Default to an hour later if not specified.
   * @param permissions - Specifies the list of permissions to be associated with the SAS.
   * @param resourceTypes - Specifies the resource types associated with the shared access signature.
   * @param options - Optional parameters.
   * @returns An account SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateAccountSasUrl(
    expiresOn?: Date,
    permissions: AccountSASPermissions = AccountSASPermissions.parse("r"),
    resourceTypes: string = "sco",
    options: ServiceGenerateAccountSasUrlOptions = {},
  ): string {
    if (!(this.credential instanceof StorageSharedKeyCredential)) {
      throw RangeError(
        "Can only generate the account SAS when the client is initialized with a shared key credential",
      );
    }

    if (expiresOn === undefined) {
      const now = new Date();
      expiresOn = new Date(now.getTime() + 3600 * 1000);
    }

    const sas = generateAccountSASQueryParameters(
      {
        permissions,
        expiresOn,
        resourceTypes,
        services: AccountSASServices.parse("q").toString(),
        ...options,
      },
      this.credential,
    ).toString();

    return appendToURLQuery(this.url, sas);
  }
}
