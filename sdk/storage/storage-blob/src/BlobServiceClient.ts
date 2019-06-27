// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { TokenCredential, isTokenCredential } from "@azure/core-http";
import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { ListContainersIncludeType } from "./generated/lib/models/index";
import { Service } from "./generated/lib/operations";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import {
  ContainerClient,
  ContainerCreateOptions,
  ContainerDeleteMethodOptions
} from "./ContainerClient";
import { appendToURLPath, extractConnectionStringParts } from "./utils/utils.common";
import { Credential } from "./credentials/Credential";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageClient } from "./internal";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";

/**
 * Options to configure the Service - Get Properties operation.
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
 * Options to configure the Service - Set Properties operation.
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

/**
 * Options to configure the Service - Get Account Info operation.
 *
 * @export
 * @interface ServiceGetAccountInfoOptions
 */
export interface ServiceGetAccountInfoOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ServiceGetAccountInfoOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure the Service - Get Statistics operation.
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
 * Options to configure the Service - List Container Segment operation.
 *
 * @interface ServiceListContainersSegmentOptions
 */
interface ServiceListContainersSegmentOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ServiceListContainersSegmentOptions
   */
  abortSignal?: Aborter;
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
   * @member {ListContainersIncludeType} [include] Include this parameter to
   * specify that the container's metadata be returned as part of the response
   * body. Possible values include: 'metadata'
   */
  include?: ListContainersIncludeType;
}

/**
 * Options to configure the Service - List Containers operation.
 *
 * @export
 * @interface ServiceListContainersOptions
 */
export interface ServiceListContainersOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ServiceListContainersOptions
   */
  abortSignal?: Aborter;
  /**
   * @member {string} [prefix] Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * @member {ListContainersIncludeType} [include] Include this parameter to
   * specify that the container's metadata be returned as part of the response
   * body. Possible values include: 'metadata'
   */
  include?: ListContainersIncludeType;
}

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
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates an instance of BlobServiceClient from connection string.
   *
   * @param {string} connectionString Connection string for an Azure storage account.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobServiceClient
   */
  public static fromConnectionString(connectionString: string, options?: NewPipelineOptions) {
    const extractedCreds = extractConnectionStringParts(connectionString);
    const sharedKeyCredential = new SharedKeyCredential(
      extractedCreds.accountName,
      extractedCreds.accountKey
    );
    const pipeline = newPipeline(sharedKeyCredential, options);
    return new BlobServiceClient(extractedCreds.url, pipeline);
  }

  /**
   * Creates an instance of BlobServiceClient.
   *
   * @param {string} url A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {Credential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential, RawTokenCredential,
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobServiceClient
   */
  constructor(url: string, credential?: Credential | TokenCredential, options?: NewPipelineOptions);
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
    credentialOrPipeline?: Credential | TokenCredential | Pipeline,
    options?: NewPipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipeline instanceof Pipeline) {
      pipeline = credentialOrPipeline;
    } else if (
      credentialOrPipeline instanceof Credential ||
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
   * Creates a ContainerClient object
   *
   * @param containerName A container name
   * @returns {ContainerClient} A new ContainerClient object for the given container name.
   * @memberof BlobServiceClient
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
   * @returns {Promise<{ containerClient: ContainerClient; containerCreateResponse: Models.ContainerCreateResponse }>} Container creation response and the corresponding container client.
   * @memberof BlobServiceClient
   */
  public async createContainer(
    containerName: string,
    options?: ContainerCreateOptions
  ): Promise<{
    containerClient: ContainerClient;
    containerCreateResponse: Models.ContainerCreateResponse;
  }> {
    const containerClient = this.getContainerClient(containerName);
    const containerCreateResponse = await containerClient.create(options);
    return {
      containerClient,
      containerCreateResponse
    };
  }

  /**
   * Deletes a Blob container.
   *
   * @param {string} containerName Name of the container to delete.
   * @param {ContainerDeleteMethodOptions} [options] Options to configure Container Delete operation.
   * @returns {Promise<Models.ContainerDeleteResponse>} Container deletion response.
   * @memberof BlobServiceClient
   */
  public async deleteContainer(
    containerName: string,
    options?: ContainerDeleteMethodOptions
  ): Promise<Models.ContainerDeleteResponse> {
    const containerClient = this.getContainerClient(containerName);
    return await containerClient.delete(options);
  }

  /**
   * Gets the properties of a storage account’s Blob service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties}
   *
   * @param {ServiceGetPropertiesOptions} [options] Options to the Service Get Properties operation.
   * @returns {Promise<Models.ServiceGetPropertiesResponse>} Response data for the Service Get Properties operation.
   * @memberof BlobServiceClient
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {}
  ): Promise<Models.ServiceGetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.getProperties({
      abortSignal: aborter || Aborter.none
    });
  }

  /**
   * Sets properties for a storage account’s Blob service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-service-properties}
   *
   * @param {Models.StorageServiceProperties} properties
   * @param {ServiceSetPropertiesOptions} [options] Options to the Service Set Properties operation.
   * @returns {Promise<Models.ServiceSetPropertiesResponse>} Response data for the Service Set Properties operation.
   * @memberof BlobServiceClient
   */
  public async setProperties(
    properties: Models.StorageServiceProperties,
    options: ServiceSetPropertiesOptions = {}
  ): Promise<Models.ServiceSetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.setProperties(properties, {
      abortSignal: aborter || Aborter.none
    });
  }

  /**
   * Retrieves statistics related to replication for the Blob service. It is only
   * available on the secondary location endpoint when read-access geo-redundant
   * replication is enabled for the storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-stats}
   *
   * @param {ServiceGetStatisticsOptions} [options] Options to the Service Get Statistics operation.
   * @returns {Promise<Models.ServiceGetStatisticsResponse>} Response data for the Service Get Statistics operation.
   * @memberof BlobServiceClient
   */
  public async getStatistics(
    options: ServiceGetStatisticsOptions = {}
  ): Promise<Models.ServiceGetStatisticsResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.getStatistics({
      abortSignal: aborter || Aborter.none
    });
  }

  /**
   * The Get Account Information operation returns the sku name and account kind
   * for the specified account.
   * The Get Account Information operation is available on service versions beginning
   * with version 2018-03-28.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-account-information
   *
   * @param {ServiceGetAccountInfoOptions} [options] Options to the Service Get Account Info operation.
   * @returns {Promise<Models.ServiceGetAccountInfoResponse>} Response data for the Service Get Account Info operation.
   * @memberof BlobServiceClient
   */
  public async getAccountInfo(
    options: ServiceGetAccountInfoOptions = {}
  ): Promise<Models.ServiceGetAccountInfoResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.getAccountInfo({
      abortSignal: aborter || Aborter.none
    });
  }

  /**
   * Returns a list of the containers under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-containers2
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of containers to be returned with the next listing operation. The
   *                          operation returns the NextMarker value within the response body if the
   *                          listing operation did not return all containers remaining to be listed
   *                          with the current page. The NextMarker value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ServiceListContainersSegmentOptions} [options] Options to the Service List Container Segment operation.
   * @returns {Promise<Models.ServiceListContainersSegmentResponse>} Response data for the Service List Container Segment operation.
   * @memberof BlobServiceClient
   */
  private async listContainersSegment(
    marker?: string,
    options: ServiceListContainersSegmentOptions = {}
  ): Promise<Models.ServiceListContainersSegmentResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.listContainersSegment({
      abortSignal: aborter,
      marker,
      ...options
    });
  }

  /**
   * Returns an AsyncIterableIterator for ServiceListContainersSegmentResponses
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of containers to be returned with the next listing operation. The
   *                          operation returns the NextMarker value within the response body if the
   *                          listing operation did not return all containers remaining to be listed
   *                          with the current page. The NextMarker value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ServiceListContainersSegmentOptions} [options] Options to list containers operation.
   * @returns {AsyncIterableIterator<Models.ServiceListContainersSegmentResponse>}
   * @memberof BlobServiceClient
   */
  private async *listSegments(
    marker?: string,
    options: ServiceListContainersSegmentOptions = {}
  ): AsyncIterableIterator<Models.ServiceListContainersSegmentResponse> {
    let listContainersSegmentResponse;
    do {
      listContainersSegmentResponse = await this.listContainersSegment(marker, options);
      marker = listContainersSegmentResponse.nextMarker;
      yield await listContainersSegmentResponse;
    } while (marker);
  }

  /**
   * Returns an AsyncIterableIterator for Container Items
   *
   * @private
   * @param {ServiceListContainersSegmentOptions} [options] Options to list containers operation.
   * @returns {AsyncIterableIterator<Models.ServiceListcontainersSegmentResponse>}
   * @memberof BlobServiceClient
   */
  private async *listItems(
    options: ServiceListContainersSegmentOptions = {}
  ): AsyncIterableIterator<Models.ContainerItem> {
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
   * @example
   *   let i = 1;
   *   for await (const container of blobServiceClient.listContainers()) {
   *     console.log(`Container ${i++}: ${container.name}`);
   *   }
   *
   * @example
   *   // Generator syntax .next()
   *   let i = 1;
   *   iter = blobServiceClient.listContainers();
   *   let containerItem = await iter.next();
   *   while (!containerItem.done) {
   *     console.log(`Container ${i++}: ${containerItem.value.name}`);
   *     containerItem = await iter.next();
   *   }
   *
   * @example
   *   // Example for .byPage()
   *   // passing optional maxPageSize in the page settings
   *   let i = 1;
   *   for await (const response of blobServiceClient.listContainers().byPage({ maxPageSize: 20 })) {
   *     if (response.containerItems) {
   *       for (const container of response.containerItems) {
   *         console.log(`Container ${i++}: ${container.name}`);
   *       }
   *     }
   *   }
   *
   * @example
   *   // Passing marker as an argument (similar to the previous example)
   *   let i = 1;
   *   let iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 2 });
   *   let response = (await iterator.next()).value;
   *   // Prints 2 container names
   *   if (response.containerItems) {
   *     for (const container of response.containerItems) {
   *       console.log(`Container ${i++}: ${container.name}`);
   *     }
   *   }
   *   // Gets next marker
   *   let marker = response.nextMarker;
   *   // Passing next marker as continuationToken
   *   iterator = blobServiceClient
   *     .listContainers()
   *     .byPage({ continuationToken: marker, maxPageSize: 10 });
   *   response = (await iterator.next()).value;
   *   // Prints 10 container names
   *   if (response.containerItems) {
   *     for (const container of response.containerItems) {
   *        console.log(`Container ${i++}: ${container.name}`);
   *     }
   *   }
   *
   *
   * @param {ServiceListContainersOptions} [options={}] Options to list containers.
   * @returns {PagedAsyncIterableIterator<Models.ContainerItem, Models.ServiceListContainersSegmentResponse>} An asyncIterableIterator that supports paging.
   * @memberof BlobServiceClient
   */
  public listContainers(
    options: ServiceListContainersOptions = {}
  ): PagedAsyncIterableIterator<Models.ContainerItem, Models.ServiceListContainersSegmentResponse> {
    // AsyncIterableIterator to iterate over containers
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
