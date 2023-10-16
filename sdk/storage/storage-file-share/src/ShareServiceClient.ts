// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  FileServiceProperties,
  ListSharesIncludeType,
  ShareCreateResponse,
  ShareDeleteResponse,
  ServiceGetPropertiesResponse,
  ServiceSetPropertiesResponse,
  ServiceListSharesSegmentHeaders,
  ListSharesResponseModel,
  SharePropertiesInternal,
  ServiceSetPropertiesHeaders,
  ServiceGetPropertiesHeaders,
} from "./generatedModels";
import { Service } from "./generated/src/operationsInterfaces";
import { newPipeline, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import { ShareClientInternal } from "./ShareClientInternal";
import { ShareClient, ShareCreateOptions, ShareDeleteMethodOptions } from "./Clients";
import {
  WithResponse,
  appendToURLPath,
  extractConnectionStringParts,
  assertResponse,
  removeEmptyString,
} from "./utils/utils.common";
import { Credential } from "../../storage-blob/src/credentials/Credential";
import { StorageSharedKeyCredential } from "../../storage-blob/src/credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "../../storage-blob/src/credentials/AnonymousCredential";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { isNode } from "@azure/core-util";
import { tracingClient } from "./utils/tracing";
import { ShareClientConfig, ShareClientOptions, ShareProtocols, toShareProtocols } from "./models";
import { AccountSASPermissions } from "./AccountSASPermissions";
import { generateAccountSASQueryParameters } from "./AccountSASSignatureValues";
import { AccountSASServices } from "./AccountSASServices";
import { SASProtocol } from "./SASQueryParameters";
import { SasIPRange } from "./SasIPRange";
import { appendToURLQuery } from "./utils/utils.common";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";

/**
 * Options to configure Share - List Shares Segment operations.
 *
 * See:
 * - {@link ShareServiceClient.listSegments}
 * - {@link ShareServiceClient.listItems}
 * - {@link ShareServiceClient.listSharesSegment}
 */
interface ServiceListSharesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only entries whose
   * name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * Specifies the maximum number of entries to
   * return. If the request does not specify maxResults, or specifies a value
   * greater than 5,000, the server will return up to 5,000 items.
   */
  maxResults?: number;

  /**
   * Include this parameter to
   * specify one or more datasets to include in the response.
   */
  include?: ListSharesIncludeType[];
}

/**
 * Options to configure the {@link ShareServiceClient.listShares} operation.
 */
export interface ServiceListSharesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only entries whose
   * name begins with the specified prefix.
   */
  prefix?: string;

  /**
   * Specifies that share snapshots should be included in the enumeration. Share Snapshots are listed from oldest to newest in the response.
   */
  includeMetadata?: boolean;

  /**
   * Specifies that share snapshot should be returned in the response.
   */
  includeSnapshots?: boolean;

  /**
   * Specifies that share soft deleted should be returned in the response.
   */
  includeDeleted?: boolean;
}

/**
 * Options to configure the {@link ShareServiceClient.getProperties} operation.
 */
export interface ServiceGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareServiceClient.setProperties} operation.
 */
export interface ServiceSetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareServiceClient.undelete} operation.
 */
export interface ServiceUndeleteShareOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Properties of a share.
 */
export type ShareProperties = SharePropertiesInternal & {
  /**
   * The protocols that have been enabled on the share.
   */
  protocols?: ShareProtocols;
};

/**
 * A listed Azure Storage share item.
 */
export interface ShareItem {
  name: string;
  snapshot?: string;
  deleted?: boolean;
  version?: string;
  properties: ShareProperties;
  metadata?: { [propertyName: string]: string };
}

/**
 * An enumeration of shares.
 */
export interface ListSharesResponse {
  serviceEndpoint: string;
  prefix?: string;
  marker?: string;
  maxResults?: number;
  shareItems?: ShareItem[];
  continuationToken: string;
}

/**
 * Contains response data for the {@link ShareServiceClient.listShares} operation.
 */
export type ServiceListSharesSegmentResponse = WithResponse<
  ListSharesResponse & ServiceListSharesSegmentHeaders,
  ServiceListSharesSegmentHeaders,
  ListSharesResponseModel
>;

/**
 * Options to configure {@link ShareServiceClient.generateAccountSasUrl} operation.
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
 * A ShareServiceClient represents a URL to the Azure Storage File service allowing you
 * to manipulate file shares.
 */
export class ShareServiceClient extends StorageClient {
  /**
   * serviceContext provided by protocol layer.
   */
  private serviceContext: Service;

  private shareClientConfig?: ShareClientConfig;

  /**
   *
   * Creates an instance of ShareServiceClient from connection string.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param options - Options to configure the HTTP pipeline.
   * @returns A new ShareServiceClient from the given connection string.
   */
  public static fromConnectionString(
    connectionString: string,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: ShareClientOptions,
  ): ShareServiceClient {
    const extractedCreds = extractConnectionStringParts(connectionString);
    if (extractedCreds.kind === "AccountConnString") {
      if (isNode) {
        const sharedKeyCredential = new StorageSharedKeyCredential(
          extractedCreds.accountName!,
          extractedCreds.accountKey,
        );
        const pipeline = newPipeline(sharedKeyCredential, options);
        return new ShareServiceClient(extractedCreds.url, pipeline, options);
      } else {
        throw new Error("Account connection string is only supported in Node.js environment");
      }
    } else if (extractedCreds.kind === "SASConnString") {
      const pipeline = newPipeline(new AnonymousCredential(), options);
      return new ShareServiceClient(
        extractedCreds.url + "?" + extractedCreds.accountSas,
        pipeline,
        options,
      );
    } else {
      throw new Error(
        "Connection string must be either an Account connection string or a SAS connection string",
      );
    }
  }

  /**
   * Creates an instance of ShareServiceClient.
   *
   * @param url - A URL string pointing to Azure Storage file service, such as
   *                     "https://myaccount.file.core.windows.net". You can Append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.file.core.windows.net?sasString".
   * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential, or TokenCredential,
   *                                  If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */

  constructor(
    url: string,
    credential?: Credential | TokenCredential,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: ShareClientOptions,
  );
  /**
   * Creates an instance of ShareServiceClient.
   *
   * @param url - A URL string pointing to Azure Storage file service, such as
   *                     "https://myaccount.file.core.windows.net". You can Append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.file.core.windows.net?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
  constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
  constructor(
    url: string,
    credentialOrPipeline?:
      | Credential
      | TokenCredential
      | Pipeline,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: ShareClientOptions,
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
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    }

    super(url, pipeline);
    this.shareClientConfig = options;
    this.serviceContext = this.storageClientContext.service;
  }

  /**
   * Creates a ShareClient object.
   *
   * @param shareName - Name of a share.
   * @returns The ShareClient object for the given share name.
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
    return new ShareClient(
      appendToURLPath(this.url, shareName),
      this.pipeline,
      this.shareClientConfig,
    );
  }

  /**
   * Creates a Share.
   *
   * @param shareName -
   * @param options -
   * @returns Share creation response and the corresponding share client.
   */
  public async createShare(
    shareName: string,
    options: ShareCreateOptions = {},
  ): Promise<{ shareCreateResponse: ShareCreateResponse; shareClient: ShareClient }> {
    return tracingClient.withSpan(
      "ShareServiceClient-createShare",
      options,
      async (updatedOptions) => {
        const shareClient = this.getShareClient(shareName);
        const shareCreateResponse = await shareClient.create(updatedOptions);
        return {
          shareCreateResponse,
          shareClient,
        };
      },
    );
  }

  /**
   * Deletes a Share.
   *
   * @param shareName -
   * @param options -
   * @returns Share deletion response and the corresponding share client.
   */
  public async deleteShare(
    shareName: string,
    options: ShareDeleteMethodOptions = {},
  ): Promise<ShareDeleteResponse> {
    return tracingClient.withSpan(
      "ShareServiceClient-deleteShare",
      options,
      async (updatedOptions) => {
        const shareClient = this.getShareClient(shareName);
        return shareClient.delete(updatedOptions);
      },
    );
  }

  /**
   * Gets the properties of a storage account’s file service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file-service-properties
   *
   * @param options - Options to Get Properties operation.
   * @returns Response data for the Get Properties operation.
   */
  public async getProperties(
    options: ServiceGetPropertiesOptions = {},
  ): Promise<ServiceGetPropertiesResponse> {
    return tracingClient.withSpan(
      "ShareServiceClient-getProperties",
      options,
      async (updatedOptions) => {
        return assertResponse<
          ServiceGetPropertiesHeaders & FileServiceProperties,
          ServiceGetPropertiesHeaders,
          FileServiceProperties
        >(await this.serviceContext.getProperties(updatedOptions));
      },
    );
  }

  /**
   * Sets properties for a storage account’s file service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-service-properties
   *
   * @param properties -
   * @param options - Options to Set Properties operation.
   * @returns Response data for the Set Properties operation.
   */
  public async setProperties(
    properties: FileServiceProperties,
    options: ServiceSetPropertiesOptions = {},
  ): Promise<ServiceSetPropertiesResponse> {
    return tracingClient.withSpan(
      "ShareServiceClient-setProperties",
      options,
      async (updatedOptions) => {
        return assertResponse<ServiceSetPropertiesHeaders, ServiceSetPropertiesHeaders>(
          await this.serviceContext.setProperties(properties, updatedOptions),
        );
      },
    );
  }

  /**
   * Returns an AsyncIterableIterator for {@link ServiceListSharesSegmentResponse} objects
   *
   * @param marker - A string value that identifies the portion of
   *                          the list of shares to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all shares remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to list shares operation.
   */
  private async *listSegments(
    marker?: string,
    options: ServiceListSharesSegmentOptions = {},
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
   * @param options - Options to list shares operation.
   */
  private async *listItems(
    options: ServiceListSharesSegmentOptions = {},
  ): AsyncIterableIterator<ShareItem> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    let marker: string | undefined;
    for await (const segment of this.listSegments(marker, options)) {
      if (segment.shareItems) {
        yield* segment.shareItems;
      }
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
   * @param options - Options to list shares operation.
   *
   * An asyncIterableIterator that supports paging.
   */
  public listShares(
    options: ServiceListSharesOptions = {},
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
    if (options.includeDeleted) {
      include.push("deleted");
    }

    const updatedOptions: ServiceListSharesSegmentOptions = {
      ...options,
      ...(include.length > 0 ? { include: include } : {}),
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
        return this.listSegments(removeEmptyString(settings.continuationToken), {
          maxResults: settings.maxPageSize,
          ...updatedOptions,
        });
      },
    };
  }

  /**
   * Gets the properties of a storage account's File service, including properties for Storage
   * Analytics metrics and CORS (Cross-Origin Resource Sharing) rules.
   *
   * @param marker - A string value that identifies the portion of
   *                          the list to be returned with the next list operation. The operation
   *                          returns a marker value within the response body if the list returned was
   *                          not complete. The marker value may then be used in a subsequent call to
   *                          request the next set of list items. The marker value is opaque to the
   *                          client.
   * @param options - Options to List Shares Segment operation.
   * @returns Response data for the List Shares Segment operation.
   */
  private async listSharesSegment(
    marker?: string,
    options: ServiceListSharesSegmentOptions = {},
  ): Promise<ServiceListSharesSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }
    return tracingClient.withSpan(
      "ShareServiceClient-listSharesSegment",
      options,
      async (updatedOptions) => {
        const res = assertResponse<
          ServiceListSharesSegmentHeaders & ListSharesResponseModel,
          ServiceListSharesSegmentHeaders,
          ListSharesResponseModel
        >(
          await this.serviceContext.listSharesSegment({
            ...updatedOptions,
            marker,
          }),
        );

        // parse protocols
        if (res.shareItems) {
          for (let i = 0; i < res.shareItems.length; i++) {
            const protocolsStr = res.shareItems[i].properties.enabledProtocols;
            (res.shareItems[i].properties as any).protocols = toShareProtocols(protocolsStr);
          }
        }

        return res;
      },
    );
  }

  /**
   * Restores a previously deleted share.
   * This API is only functional if Share Soft Delete is enabled
   * for the storage account associated with the share.
   *
   * @param deletedShareName - The name of the previously deleted share.
   * @param deletedShareVersion - The version of the previously deleted share.
   * @param options - Options to Share undelete operation.
   * @returns Restored share.
   */
  public async undeleteShare(
    deletedShareName: string,
    deletedShareVersion: string,
    options: ServiceUndeleteShareOptions = {},
  ): Promise<ShareClient> {
    return tracingClient.withSpan(
      "ShareServiceClient-undeleteShare",
      options,
      async (updatedOptions) => {
        const shareClient = this.getShareClient(deletedShareName);
        await new ShareClientInternal(shareClient.url, this.pipeline).restore({
          ...updatedOptions,
          deletedShareName: deletedShareName,
          deletedShareVersion: deletedShareVersion,
        });
        return shareClient;
      },
    );
  }

  /**
   * Only available for ShareServiceClient constructed with a shared key credential.
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
        services: AccountSASServices.parse("f").toString(),
        ...options,
      },
      this.credential,
    ).toString();

    return appendToURLQuery(this.url, sas);
  }
}
