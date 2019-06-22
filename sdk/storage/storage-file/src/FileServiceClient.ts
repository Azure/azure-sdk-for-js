// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { Service } from "./generated/lib/operations";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { ShareClient, ShareCreateOptions, ShareDeleteMethodOptions } from "./ShareClient";
import { appendToURLPath, extractConnectionStringParts } from "./utils/utils.common";
import { Credential } from "./credentials/Credential";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";

/**
 * Options to configure List Shares Segment operation.
 *
 * @export
 * @interface ServiceListSharesSegmentOptions
 */
export interface ServiceListSharesSegmentOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ServiceListSharesSegmentOptions
   */
  abortSignal?: Aborter;
  /**
   * Filters the results to return only entries whose
   * name begins with the specified prefix.
   *
   * @type {string}
   * @memberof ServiceListSharesSegmentOptions
   */
  prefix?: string;

  /**
   * Specifies the maximum number of entries to
   * return. If the request does not specify maxresults, or specifies a value
   * greater than 5,000, the server will return up to 5,000 items.
   *
   * @type {number}
   * @memberof ServiceListSharesSegmentOptions
   */
  maxresults?: number;

  /**
   * Include this parameter to
   * specify one or more datasets to include in the response.
   *
   * @type {Models.ListSharesIncludeType[]}
   * @memberof ServiceListSharesSegmentOptions
   */
  include?: Models.ListSharesIncludeType[];
}

/**
 * Options to configure List Shares operation.
 *
 * @export
 * @interface ServiceListSharesOptions
 */
export interface ServiceListSharesOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof ServiceListSharesOptions
   */
  abortSignal?: Aborter;
  /**
   * Filters the results to return only entries whose
   * name begins with the specified prefix.
   *
   * @type {string}
   * @memberof ServiceListSharesOptions
   */
  prefix?: string;
  /**
   * Include this parameter to
   * specify one or more datasets to include in the response.
   *
   * @type {Models.ListSharesIncludeType[]}
   * @memberof ServiceListSharesSegmentOptions
   */
  include?: Models.ListSharesIncludeType[];
}

/**
 * Options to configure File Service - Get Properties operation.
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
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure File Service - Set Properties operation.
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
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * A FileServiceClient represents a URL to the Azure Storage File service allowing you
 * to manipulate file shares.
 *
 * @export
 * @class FileServiceClient
 */
export class FileServiceClient extends StorageClient {
  /**
   * serviceContext provided by protocol layer.
   *
   * @private
   * @type {Service}
   * @memberof FileServiceClient
   */
  private serviceContext: Service;

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates an instance of FileServiceClient from connection string.
   *
   * @param {string} connectionString Connection string for an Azure storage account.
   * @param {NewPipelineOptions} [options] Options to configure the HTTP pipeline.
   * @returns {FileServiceClient} A new FileServiceClient from the given connection string.
   * @memberof FileServiceClient
   */
  public static fromConnectionString(
    connectionString: string,
    options?: NewPipelineOptions
  ): FileServiceClient {
    const extractedCreds = extractConnectionStringParts(connectionString);
    const sharedKeyCredential = new SharedKeyCredential(
      extractedCreds.accountName,
      extractedCreds.accountKey
    );
    const pipeline = newPipeline(sharedKeyCredential, options);
    return new FileServiceClient(extractedCreds.url, pipeline);
  }

  /**
   * Creates an instance of FileServiceClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file service, such as
   *                     "https://myaccount.file.core.windows.net". You can Append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.file.core.windows.net?sasString".
   * @param {Credential } [credential] Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
   *                                   If not specified, AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof FileServiceClient
   */
  constructor(url: string, credential?: Credential, options?: NewPipelineOptions);
  /**
   * Creates an instance of FileServiceClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file service, such as
   *                     "https://myaccount.file.core.windows.net". You can Append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.file.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof FileServiceClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    url: string,
    credentialOrPipeline?: Credential | Pipeline,
    options?: NewPipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipeline instanceof Pipeline) {
      pipeline = credentialOrPipeline;
    } else if (credentialOrPipeline instanceof Credential) {
      pipeline = newPipeline(credentialOrPipeline, options);
    } else {
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    }

    super(url, pipeline);
    this.serviceContext = new Service(this.storageClientContext);
  }

  /**
   * Creates a ShareClient object.
   *
   * @param shareName Name of a share.
   * @returns {ShareClient} The ShareClient object for the given share name.
   * @memberof FileServiceClient
   */
  public createShareClient(shareName: string): ShareClient {
    return new ShareClient(appendToURLPath(this.url, shareName), this.pipeline);
  }

  /**
   * Creates a Share.
   *
   * @param {string} shareName
   * @param {ShareCreateOptions} [options]
   * @returns {Promise<{ shareCreateResponse: Models.ShareCreateResponse, shareClient: ShareClient }>} Share creation response and the corresponding share client.
   * @memberof FileServiceClient
   */
  public async createShare(
    shareName: string,
    options?: ShareCreateOptions
  ): Promise<{ shareCreateResponse: Models.ShareCreateResponse; shareClient: ShareClient }> {
    const shareClient = this.createShareClient(shareName);
    const shareCreateResponse = await shareClient.create(options);
    return {
      shareCreateResponse,
      shareClient
    };
  }

  /**
   * Deletes a Share.
   *
   * @param {string} shareName
   * @param {ShareDeleteMethodOptions} [options]
   * @returns {Promise<Models.ShareDeleteResponse>} Share deletion response and the corresponding share client.
   * @memberof FileServiceClient
   */
  public async deleteShare(
    shareName: string,
    options?: ShareDeleteMethodOptions
  ): Promise<Models.ShareDeleteResponse> {
    const shareClient = this.createShareClient(shareName);
    return await shareClient.delete(options);
  }

  /**
   * Gets the properties of a storage account’s file service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file-service-properties}
   *
   * @param {ServiceGetPropertiesOptions} [options={}] Options to Get Properties operation.
   * @returns {Promise<Models.ServiceGetPropertiesResponse>} Response data for the Get Properties operation.
   * @memberof FileServiceClient
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {}
  ): Promise<Models.ServiceGetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Sets properties for a storage account’s file service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-service-properties}
   *
   * @param {Models.StorageServiceProperties} properties
   * @param {ServiceSetPropertiesOptions} [options={}] Options to Set Properties operation.
   * @returns {Promise<Models.ServiceSetPropertiesResponse>} Response data for the Set Properties operation.
   * @memberof FileServiceClient
   */
  public async setProperties(
    properties: Models.StorageServiceProperties,
    options: ServiceSetPropertiesOptions = {}
  ): Promise<Models.ServiceSetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.setProperties(properties, {
      abortSignal: aborter
    });
  }

  /**
   * Returns an AsyncIterableIterator for ServiceListSharesSegmentResponses
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of shares to be returned with the next listing operation. The
   *                          operation returns the NextMarker value within the response body if the
   *                          listing operation did not return all shares remaining to be listed
   *                          with the current page. The NextMarker value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ServiceListSharesSegmentOptions} [options] Options to list shares operation.
   * @returns {AsyncIterableIterator<Models.ServiceListSharesSegmentResponse>}
   * @memberof FileServiceClient
   */
  private async *listSegments(
    marker?: string,
    options: ServiceListSharesSegmentOptions = {}
  ): AsyncIterableIterator<Models.ServiceListSharesSegmentResponse> {
    let listSharesSegmentResponse;
    do {
      listSharesSegmentResponse = await this.listSharesSegment(marker, options);
      marker = listSharesSegmentResponse.nextMarker;
      yield await listSharesSegmentResponse;
    } while (marker);
  }

  /**
   * Returns an AsyncIterableIterator for share items
   *
   * @private
   * @param {ServiceListSharesSegmentOptions} [options] Options to list shares operation.
   * @returns {AsyncIterableIterator<Models.ServiceListSharesSegmentResponse>}
   * @memberof FileServiceClient
   */
  private async *listItems(
    options: ServiceListSharesSegmentOptions = {}
  ): AsyncIterableIterator<Models.ShareItem> {
    let marker: string | undefined;
    for await (const segment of this.listSegments(marker, options)) {
      yield* segment.shareItems;
    }
  }

  /**
   * Returns an async iterable iterator to list all the shares
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the shares in pages.
   *
   * @example
   *   let i = 1;
   *   for await (const share of serviceClient.listShares()) {
   *     console.log(`Share ${i++}: ${share.name}`);
   *   }
   *
   * @example
   *   // Generator syntax .next()
   *   let i = 1;
   *   let iter = await serviceClient.listShares();
   *   let shareItem = await iter.next();
   *   while (!shareItem.done) {
   *     console.log(`Share ${i++}: ${shareItem.value.name}`);
   *     shareItem = await iter.next();
   *   }
   *
   * @example
   *   // Example for .byPage()
   *   // passing optional maxPageSize in the page settings
   *   let i = 1;
   *   for await (const response of serviceClient.listShares().byPage({ maxPageSize: 20 })) {
   *     if (response.shareItems) {
   *       for (const share of response.shareItems) {
   *         console.log(`Share ${i++}: ${share.name}`);
   *       }
   *     }
   *   }
   *
   * @example
   *   // Passing marker as an argument (similar to the previous example)
   *   let i = 1;
   *   let iterator = serviceClient.listShares().byPage({ maxPageSize: 2 });
   *   let response = (await iterator.next()).value;
   *   // Prints 2 share names
   *   if (response.shareItems) {
   *     for (const share of response.shareItems) {
   *       console.log(`Share ${i++}: ${share.name}`);
   *     }
   *   }
   *   // Gets next marker
   *   let marker = response.nextMarker;
   *   // Passing next marker as continuationToken
   *   iterator = serviceClient.listShares().byPage({ continuationToken: marker, maxPageSize: 10 });
   *   response = (await iterator.next()).value;
   *   // Prints 10 share names
   *   if (response.shareItems) {
   *     for (const share of response.shareItems) {
   *       console.log(`Share ${i++}: ${share.name}`);
   *     }
   *   }
   *
   * @param {ServiceListSharesOptions} [options] Options to list shares operation.
   * @memberof FileServiceClient
   * @returns {PagedAsyncIterableIterator<Models.ShareItem, Models.ServiceListSharesSegmentResponse>}
   * An asyncIterableIterator that supports paging.
   */
  public listShares(
    options: ServiceListSharesOptions = {}
  ): PagedAsyncIterableIterator<Models.ShareItem, Models.ServiceListSharesSegmentResponse> {
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

  /**
   * Gets the properties of a storage account's File service, including properties for Storage
   * Analytics metrics and CORS (Cross-Origin Resource Sharing) rules.
   *
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list to be returned with the next list operation. The operation
   *                          returns a marker value within the response body if the list returned was
   *                          not complete. The marker value may then be used in a subsequent call to
   *                          request the next set of list items. The marker value is opaque to the
   *                          client.
   * @param {ServiceListSharesSegmentOptions} [options={}] Options to List Shares Segment operation.
   * @returns {Promise<Models.ServiceListSharesSegmentResponse>} Response data for the List Shares Segment operation.
   * @memberof FileServiceClient
   */
  public async listSharesSegment(
    marker?: string,
    options: ServiceListSharesSegmentOptions = {}
  ): Promise<Models.ServiceListSharesSegmentResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.serviceContext.listSharesSegment({
      abortSignal: aborter,
      marker,
      ...options
    });
  }
}
