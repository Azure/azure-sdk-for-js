// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  FileServiceProperties,
  ListSharesIncludeType,
  ShareCreateResponse,
  ShareDeleteResponse,
  ServiceGetPropertiesResponse,
  ServiceSetPropertiesResponse,
  ServiceListSharesSegmentResponse,
  ShareItem
} from "./generatedModels";
import { Service } from "./generated/src/operations";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import { ShareClient, ShareCreateOptions, ShareDeleteMethodOptions } from "./ShareClient";
import { appendToURLPath, extractConnectionStringParts } from "./utils/utils.common";
import { Credential } from "./credentials/Credential";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import "@azure/core-paging";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { isNode } from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "./utils/tracing";

/**
 * Options to configure Share - List Shares Segment operations.
 *
 * See:
 * - {@link ShareServiceClient.listSegments}
 * - {@link ShareServiceClient.listItems}
 * - {@link ShareServiceClient.listSharesSegment}
 *
 * @interface ServiceListSharesSegmentOptions
 */
interface ServiceListSharesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceListSharesSegmentOptions
   */
  abortSignal?: AbortSignalLike;
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
   * return. If the request does not specify maxResults, or specifies a value
   * greater than 5,000, the server will return up to 5,000 items.
   *
   * @type {number}
   * @memberof ServiceListSharesSegmentOptions
   */
  maxResults?: number;

  /**
   * Include this parameter to
   * specify one or more datasets to include in the response.
   *
   * @type {ListSharesIncludeType[]}
   * @memberof ServiceListSharesSegmentOptions
   */
  include?: ListSharesIncludeType[];
}

/**
 * Options to configure the {@link ShareServiceClient.listShares} operation.
 *
 * @export
 * @interface ServiceListSharesOptions
 */
export interface ServiceListSharesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ServiceListSharesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only entries whose
   * name begins with the specified prefix.
   *
   * @type {string}
   * @memberof ServiceListSharesOptions
   */
  prefix?: string;

  /**
   * Specifies that share snapshots should be included in the enumeration. Share Snapshots are listed from oldest to newest in the response.
   *
   * @type {boolean}
   * @memberof ServiceListSharesOptions
   */
  includeMetadata?: boolean;

  /**
   * Specifies that share metadata should be returned in the response.
   *
   * @type {boolean}
   * @memberof ServiceListSharesOptions
   */
  includeSnapshots?: boolean;
}

/**
 * Options to configure the {@link ShareServiceClient.getProperties} operation.
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
 * Options to configure the {@link ShareServiceClient.setProperties} operation.
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
 * A ShareServiceClient represents a URL to the Azure Storage File service allowing you
 * to manipulate file shares.
 *
 * @export
 * @class ShareServiceClient
 */
export class ShareServiceClient extends StorageClient {
  /**
   * serviceContext provided by protocol layer.
   *
   * @private
   * @type {Service}
   * @memberof ShareServiceClient
   */
  private serviceContext: Service;

  /**
   *
   * Creates an instance of ShareServiceClient from connection string.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {StoragePipelineOptions} [options] Options to configure the HTTP pipeline.
   * @returns {ShareServiceClient} A new ShareServiceClient from the given connection string.
   * @memberof ShareServiceClient
   */
  public static fromConnectionString(
    connectionString: string,
    options?: StoragePipelineOptions
  ): ShareServiceClient {
    const extractedCreds = extractConnectionStringParts(connectionString);
    if (extractedCreds.kind === "AccountConnString") {
      if (isNode) {
        const sharedKeyCredential = new StorageSharedKeyCredential(
          extractedCreds.accountName!,
          extractedCreds.accountKey
        );
        const pipeline = newPipeline(sharedKeyCredential, options);
        return new ShareServiceClient(extractedCreds.url, pipeline);
      } else {
        throw new Error("Account connection string is only supported in Node.js environment");
      }
    } else if (extractedCreds.kind === "SASConnString") {
      const pipeline = newPipeline(new AnonymousCredential(), options);
      return new ShareServiceClient(extractedCreds.url + "?" + extractedCreds.accountSas, pipeline);
    } else {
      throw new Error(
        "Connection string must be either an Account connection string or a SAS connection string"
      );
    }
  }

  /**
   * Creates an instance of ShareServiceClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file service, such as
   *                     "https://myaccount.file.core.windows.net". You can Append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.file.core.windows.net?sasString".
   * @param {Credential} [credential] Such as AnonymousCredential or StorageSharedKeyCredential.
   *                                  If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ShareServiceClient
   */
  constructor(url: string, credential?: Credential, options?: StoragePipelineOptions);
  /**
   * Creates an instance of ShareServiceClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file service, such as
   *                     "https://myaccount.file.core.windows.net". You can Append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.file.core.windows.net?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ShareServiceClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    url: string,
    credentialOrPipeline?: Credential | Pipeline,
    options?: StoragePipelineOptions
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
   * @memberof ShareServiceClient
   *
   * Example usage:
   *
   * ```js
   * const shareClient = serviceClient.getShareClient("<share name>");
   * await shareClient.create();
   * console.log("Created share successfully!");
   * ```
   */
  public getShareClient(shareName: string): ShareClient {
    return new ShareClient(appendToURLPath(this.url, shareName), this.pipeline);
  }

  /**
   * Creates a Share.
   *
   * @param {string} shareName
   * @param {ShareCreateOptions} [options]
   * @returns {Promise<{ shareCreateResponse: ShareCreateResponse, shareClient: ShareClient }>} Share creation response and the corresponding share client.
   * @memberof ShareServiceClient
   */
  public async createShare(
    shareName: string,
    options: ShareCreateOptions = {}
  ): Promise<{ shareCreateResponse: ShareCreateResponse; shareClient: ShareClient }> {
    const { span, spanOptions } = createSpan(
      "ShareServiceClient-createShare",
      options.tracingOptions
    );
    try {
      const shareClient = this.getShareClient(shareName);
      const shareCreateResponse = await shareClient.create({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        shareCreateResponse,
        shareClient
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
   * Deletes a Share.
   *
   * @param {string} shareName
   * @param {ShareDeleteMethodOptions} [options]
   * @returns {Promise<ShareDeleteResponse>} Share deletion response and the corresponding share client.
   * @memberof ShareServiceClient
   */
  public async deleteShare(
    shareName: string,
    options: ShareDeleteMethodOptions = {}
  ): Promise<ShareDeleteResponse> {
    const { span, spanOptions } = createSpan(
      "ShareServiceClient-deleteShare",
      options.tracingOptions
    );
    try {
      const shareClient = this.getShareClient(shareName);
      return await shareClient.delete({
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
   * Gets the properties of a storage account’s file service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file-service-properties}
   *
   * @param {ServiceGetPropertiesOptions} [options={}] Options to Get Properties operation.
   * @returns {Promise<ServiceGetPropertiesResponse>} Response data for the Get Properties operation.
   * @memberof ShareServiceClient
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {}
  ): Promise<ServiceGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareServiceClient-getProperties",
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
   * Sets properties for a storage account’s file service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-service-properties}
   *
   * @param {FileServiceProperties} properties
   * @param {ServiceSetPropertiesOptions} [options={}] Options to Set Properties operation.
   * @returns {Promise<ServiceSetPropertiesResponse>} Response data for the Set Properties operation.
   * @memberof ShareServiceClient
   */
  public async setProperties(
    properties: FileServiceProperties,
    options: ServiceSetPropertiesOptions = {}
  ): Promise<ServiceSetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareServiceClient-setProperties",
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
   * Returns an AsyncIterableIterator for {@link ServiceListSharesSegmentResponse} objects
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of shares to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all shares remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ServiceListSharesSegmentOptions} [options] Options to list shares operation.
   * @returns {AsyncIterableIterator<ServiceListSharesSegmentResponse>}
   * @memberof ShareServiceClient
   */
  private async *listSegments(
    marker?: string,
    options: ServiceListSharesSegmentOptions = {}
  ): AsyncIterableIterator<ServiceListSharesSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    let listSharesSegmentResponse;
    do {
      listSharesSegmentResponse = await this.listSharesSegment(marker, options);
      marker = listSharesSegmentResponse.continuationToken;
      yield await listSharesSegmentResponse;
    } while (marker);
  }

  /**
   * Returns an AsyncIterableIterator for share items
   *
   * @private
   * @param {ServiceListSharesSegmentOptions} [options] Options to list shares operation.
   * @returns {AsyncIterableIterator<ServiceListSharesSegmentResponse>}
   * @memberof ShareServiceClient
   */
  private async *listItems(
    options: ServiceListSharesSegmentOptions = {}
  ): AsyncIterableIterator<ShareItem> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

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
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * for await (const share of serviceClient.listShares()) {
   *   console.log(`Share ${i++}: ${share.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = serviceClient.listShares();
   * let shareItem = await iter.next();
   * while (!shareItem.done) {
   *   console.log(`Share ${i++}: ${shareItem.value.name}`);
   *   shareItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of serviceClient.listShares().byPage({ maxPageSize: 20 })) {
   *   if (response.shareItems) {
   *    for (const share of response.shareItems) {
   *        console.log(`Share ${i++}: ${share.name}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = serviceClient.listShares().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 share names
   * if (response.shareItems) {
   *   for (const share of response.shareItems) {
   *     console.log(`Share ${i++}: ${share.name}`);
   *   }
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   *
   * // Passing next marker as continuationToken
   * iterator = serviceClient.listShares().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 share names
   * if (response.shareItems) {
   *   for (const share of response.shareItems) {
   *     console.log(`Share ${i++}: ${share.name}`);
   *   }
   * }
   * ```
   *
   * @param {ServiceListSharesOptions} [options] Options to list shares operation.
   * @memberof ShareServiceClient
   * @returns {PagedAsyncIterableIterator<ShareItem, ServiceListSharesSegmentResponse>}
   * An asyncIterableIterator that supports paging.
   */
  public listShares(
    options: ServiceListSharesOptions = {}
  ): PagedAsyncIterableIterator<ShareItem, ServiceListSharesSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    const include: ListSharesIncludeType[] = [];
    if (options.includeMetadata) {
      include.push("metadata");
    }
    if (options.includeSnapshots) {
      include.push("snapshots");
    }

    const updatedOptions: ServiceListSharesSegmentOptions = {
      ...options,
      ...(include.length > 0 ? { include: include } : {})
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
          maxResults: settings.maxPageSize,
          ...updatedOptions
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
   * @returns {Promise<ServiceListSharesSegmentResponse>} Response data for the List Shares Segment operation.
   * @memberof ShareServiceClient
   */
  private async listSharesSegment(
    marker?: string,
    options: ServiceListSharesSegmentOptions = {}
  ): Promise<ServiceListSharesSegmentResponse> {
    const { span, spanOptions } = createSpan(
      "ShareServiceClient-listSharesSegment",
      options.tracingOptions
    );

    if (options.prefix === "") {
      options.prefix = undefined;
    }

    try {
      return await this.serviceContext.listSharesSegment({
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
}
