// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import { isNodeLike } from "@azure/core-util";
import type {
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
  ServiceGetUserDelegationKeyResponse,
  ServiceGetUserDelegationKeyResponseModel,
  ServiceGetUserDelegationKeyHeaders,
  UserDelegationKeyModel,
} from "./generatedModels.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { Service } from "./generated/src/operationsInterfaces/index.js";
import type { StoragePipelineOptions, Pipeline } from "./Pipeline.js";
import { newPipeline, isPipelineLike } from "./Pipeline.js";
import type { CommonOptions } from "./StorageClient.js";
import { StorageClient } from "./StorageClient.js";
import type { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  appendToURLPath,
  appendToURLQuery,
  extractConnectionStringParts,
  assertResponse,
  truncatedISO8061Date,
} from "./utils/utils.common.js";
import { StorageSharedKeyCredential } from "@azure/storage-common";
import { AnonymousCredential } from "@azure/storage-common";
import { tracingClient } from "./utils/tracing.js";
import type { QueueCreateOptions, QueueDeleteOptions } from "./QueueClient.js";
import { QueueClient } from "./QueueClient.js";
import { AccountSASPermissions } from "./AccountSASPermissions.js";
import {
  generateAccountSASQueryParameters,
  generateAccountSASQueryParametersInternal,
} from "./AccountSASSignatureValues.js";
import { AccountSASServices } from "./AccountSASServices.js";
import type { SASProtocol } from "./SASQueryParameters.js";
import type { SasIPRange } from "./SasIPRange.js";
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
 * Options to configure the Service - Get User Delegation Key.
 */
export interface ServiceGetUserDelegationKeyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
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
      if (isNodeLike) {
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
   * ```ts snippet:ReadmeSampleCreateClient_DefaultAzureCredential
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { QueueServiceClient } from "@azure/storage-queue";
   *
   * const account = "<account>";
   * const credential = new DefaultAzureCredential();
   *
   * const queueServiceClient = new QueueServiceClient(
   *   `https://${account}.queue.core.windows.net`,
   *   credential,
   * );
   * ```
   *
   * Example using an account name/key:
   *
   * ```ts snippet:ReadmeSampleCreateClient_StorageSharedKeyCredential
   * import { StorageSharedKeyCredential, QueueServiceClient } from "@azure/storage-queue";
   *
   * // Enter your storage account name and shared key
   * const account = "<account>";
   * const accountKey = "<accountkey>";
   *
   * // Use StorageSharedKeyCredential with storage account and account key
   * // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
   * const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
   *
   * const queueServiceClient = new QueueServiceClient(
   *   `https://${account}.queue.core.windows.net`,
   *   sharedKeyCredential,
   *   {
   *     retryOptions: { maxTries: 4 }, // Retry options
   *     userAgentOptions: {
   *       userAgentPrefix: "BasicSample V10.0.0",
   *     }, // Customized telemetry string
   *   },
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
      (isNodeLike && credentialOrPipeline instanceof StorageSharedKeyCredential) ||
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
   * ```ts snippet:ReadmeSampleCreateQueue
   * import { QueueServiceClient } from "@azure/storage-queue";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const queueServiceClient = new QueueServiceClient(
   *   `https://${account}.queue.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const queueName = "<valid queue name>";
   * const queueClient = queueServiceClient.getQueueClient(queueName);
   * const createQueueResponse = await queueClient.create();
   * console.log(
   *   `Created queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`,
   * );
   * ```
   */
  public getQueueClient(queueName: string): QueueClient {
    return new QueueClient(appendToURLPath(this.url, queueName), this.pipeline);
  }

  /**
   * Returns a list of the queues under the specified account.
   * @see https://learn.microsoft.com/rest/api/storageservices/list-queues1
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
   * ```ts snippet:ReadmeSampleListQueues
   * import { QueueServiceClient } from "@azure/storage-queue";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const queueServiceClient = new QueueServiceClient(
   *   `https://${account}.queue.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * let i = 1;
   * for await (const item of queueServiceClient.listQueues()) {
   *   console.log(`Queue${i++}: ${item.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```ts snippet:ReadmeSampleListQueues_Iterator
   * import { QueueServiceClient } from "@azure/storage-queue";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const queueServiceClient = new QueueServiceClient(
   *   `https://${account}.queue.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * let i = 1;
   * const iterator = queueServiceClient.listQueues();
   * let { done, value } = await iterator.next();
   * while (!done) {
   *   console.log(`Queue${i++}: ${value.name}`);
   *   ({ done, value } = await iterator.next());
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```ts snippet:ReadmeSampleListQueues_ByPage
   * import { QueueServiceClient } from "@azure/storage-queue";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const queueServiceClient = new QueueServiceClient(
   *   `https://${account}.queue.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * let i = 1;
   * for await (const page of queueServiceClient.listQueues().byPage({ maxPageSize: 20 })) {
   *   for (const item of page.queueItems || []) {
   *     console.log(`Queue${i++}: ${item.name}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```ts snippet:ReadmeSampleListQueues_Continuation
   * import { QueueServiceClient } from "@azure/storage-queue";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const queueServiceClient = new QueueServiceClient(
   *   `https://${account}.queue.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * let i = 1;
   * let iterator = queueServiceClient.listQueues().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   * // Prints 2 queues
   * if (response.queueItems) {
   *   for (const item of response.queueItems) {
   *     console.log(`Queue${i++}: ${item.name}`);
   *   }
   * }
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * iterator = queueServiceClient.listQueues().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   * // Prints 10 queues
   * if (response.queueItems) {
   *   for (const item of response.queueItems) {
   *     console.log(`Queue${i++}: ${item.name}`);
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
   * @see https://learn.microsoft.com/rest/api/storageservices/get-queue-service-properties
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
   * @see https://learn.microsoft.com/rest/api/storageservices/set-queue-service-properties
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
   * @see https://learn.microsoft.com/rest/api/storageservices/get-queue-service-stats
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
   * @see https://learn.microsoft.com/rest/api/storageservices/create-queue4
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
   * @see https://learn.microsoft.com/rest/api/storageservices/delete-queue3
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
   * @see https://learn.microsoft.com/rest/api/storageservices/create-account-sas
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

  /**
   * Only available for QueueServiceClient constructed with a shared key credential.
   *
   * Generates string to sign for an account Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/create-account-sas
   *
   * @param expiresOn - Optional. The time at which the shared access signature becomes invalid. Default to an hour later if not specified.
   * @param permissions - Specifies the list of permissions to be associated with the SAS.
   * @param resourceTypes - Specifies the resource types associated with the shared access signature.
   * @param options - Optional parameters.
   * @returns An account SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateSasStringToSign(
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

    return generateAccountSASQueryParametersInternal(
      {
        permissions,
        expiresOn,
        resourceTypes,
        services: AccountSASServices.parse("q").toString(),
        ...options,
      },
      this.credential,
    ).stringToSign;
  }  

  /**
   * ONLY AVAILABLE WHEN USING BEARER TOKEN AUTHENTICATION (TokenCredential).
   *
   * Retrieves a user delegation key for the Blob service. This is only a valid operation when using
   * bearer token authentication.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/get-user-delegation-key
   *
   * @param startsOn -      The start time for the user delegation SAS. Must be within 7 days of the current time
   * @param expiresOn -     The end time for the user delegation SAS. Must be within 7 days of the current time
   */
  public async getUserDelegationKey(
    startsOn: Date,
    expiresOn: Date,
    options: ServiceGetUserDelegationKeyOptions = {},
  ): Promise<ServiceGetUserDelegationKeyResponse> {
    return tracingClient.withSpan(
      "ShareServiceClient-getUserDelegationKey",
      options,
      async (updatedOptions) => {
        const response = assertResponse<
          ServiceGetUserDelegationKeyResponseModel,
          ServiceGetUserDelegationKeyHeaders,
          UserDelegationKeyModel
        >(
          await this.serviceContext.getUserDelegationKey(
            {
              start: truncatedISO8061Date(startsOn, false),
              expiry: truncatedISO8061Date(expiresOn, false),
            },
            {
              abortSignal: options.abortSignal,
              tracingOptions: updatedOptions.tracingOptions,
            },
          ),
        );

        const userDelegationKey = {
          signedObjectId: response.signedOid,
          signedTenantId: response.signedOid,
          signedStartsOn: new Date(response.signedStart),
          signedExpiresOn: new Date(response.signedExpiry),
          signedService: response.signedService,
          signedVersion: response.signedVersion,
          value: response.value,
        };

        const res: ServiceGetUserDelegationKeyResponse = {
          _response: response._response,
          requestId: response.requestId,
          clientRequestId: response.clientRequestId,
          version: response.version,
          date: response.date,
          //errorCode: response.errorCode,
          ...userDelegationKey,
        };

        return res;
      },
    );
  }
}
