// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { ListContainersIncludeType } from "./generated/lib/models/index";
import { Service } from "./generated/lib/operations";
import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";

export interface ServiceGetPropertiesOptions {
  abortSignal?: Aborter;
}

export interface ServiceSetPropertiesOptions {
  abortSignal?: Aborter;
}

export interface ServiceGetAccountInfoOptions {
  abortSignal?: Aborter;
}

export interface ServiceGetStatisticsOptions {
  abortSignal?: Aborter;
}

export interface ServiceListContainersSegmentOptions {
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
 * A BlobServiceClient represents a Client to the Azure Storage Blob service allowing you
 * to manipulate blob containers.
 *
 * @export
 * @class BlobServiceClient
 * @extends {StorageClient}
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
   * Creates an instance of BlobServiceClient.
   *
   * @param {string} url A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlobServiceClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.serviceContext = new Service(this.storageClientContext);
  }

  /**
   * Creates a new BlobServiceClient object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {BlobServiceClient}
   * @memberof BlobServiceClient
   */
  public withPipeline(pipeline: Pipeline): BlobServiceClient {
    return new BlobServiceClient(this.url, pipeline);
  }

  /**
   * Gets the properties of a storage account’s Blob service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties}
   *
   * @returns {Promise<Models.ServiceGetPropertiesResponse>}
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.ServiceSetPropertiesResponse>}
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
   *  @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.ServiceGetStatisticsResponse>}
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.ServiceGetAccountInfoResponse>}
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
   * Iterates over containers under the specified account.
   *
   * @example
   * for await (const container of blobServiceClient.listContainers()) {
   *   console.log(`Container: ${container.name}`);
   * }
   *
   * @example
   * let iter1 = blobServiceClient.listContainers();
   * let i = 1;
   * for await (const container of iter1) {
   *   console.log(`${i}: ${container.name}`);
   *   i++;
   * }
   *
   * @example
   *  let iter2 = await blobServiceClient.listContainers();
   *  i = 1;
   *  let containerItem = await iter2.next();
   *  do {
   *    console.log(`Container ${i++}: ${containerItem.value.name}`);
   *   containerItem = await iter2.next();
   * } while (containerItem.value);
   *
   * @param {ServiceListContainersSegmentOptions} [options]
   * @returns {AsyncIterableIterator<Models.ContainerItem>}
   * @memberof BlobServiceClient
   */
  public async *listContainers(
    options: ServiceListContainersSegmentOptions = {}
  ): AsyncIterableIterator<Models.ContainerItem> {
    let marker = undefined;
    const blobServiceClient = this;
    const aborter = !options || !options.abortSignal ? Aborter.none : options.abortSignal;
    do {
      const listContainersResponse: Models.ServiceListContainersSegmentResponse = await blobServiceClient.listContainersSegment(
        marker,
        {
          ...options,
          abortSignal: aborter
        }
      );
      marker = listContainersResponse.nextMarker;
      yield* listContainersResponse.containerItems;
    } while (marker);
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
   * @param {ServiceListContainersSegmentOptions} [options]
   * @returns {Promise<Models.ServiceListContainersSegmentResponse>}
   * @memberof BlobServiceClient
   */
  public async listContainersSegment(
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
}
