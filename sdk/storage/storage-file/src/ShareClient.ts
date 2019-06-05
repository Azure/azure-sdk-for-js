// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse } from "@azure/ms-rest-js";

import { Aborter } from "./Aborter";
import * as Models from "./generated/lib/models";
import { Share } from "./generated/lib/operations";
import { Metadata } from "./models";
import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { URLConstants } from "./utils/constants";
import { appendToURLPath, setURLParameter, truncatedISO8061Date } from "./utils/utils.common";
import { DirectoryClient } from "./DirectoryClient";

/**
 * Options to configure Share - Create operation.
 *
 * @export
 * @interface ShareCreateOptions
 */
export interface ShareCreateOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * A name-value pair to associate with a file storage object.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof ShareCreateOptions
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Specifies the maximum size of the share, in
   * gigabytes.
   *
   * @type {number}
   * @memberof ShareCreateOptions
   */
  quota?: number;
}

/**
 * Options to configure Share - Delete operation.
 *
 * @export
 * @interface ShareDeleteMethodOptions
 */
export interface ShareDeleteMethodOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * Specifies the option
   * include to delete the base share and all of its snapshots. Possible values
   * include: 'include'
   *
   * @type {Models.DeleteSnapshotsOptionType}
   * @memberof ShareDeleteMethodOptions
   */
  deleteSnapshots?: Models.DeleteSnapshotsOptionType;
}

/**
 * Options to configure Share - Set Metadata operation.
 *
 * @export
 * @interface ShareSetMetadataOptions
 */
export interface ShareSetMetadataOptions {
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
 * Options to configure Share - Set Access Policy operation.
 *
 * @export
 * @interface ShareSetAccessPolicyOptions
 */
export interface ShareSetAccessPolicyOptions {
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
 * Options to configure Share - Get Access Policy operation.
 *
 * @export
 * @interface ShareGetAccessPolicyOptions
 */
export interface ShareGetAccessPolicyOptions {
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
 * Options to configure Share - Get Properties operation.
 *
 * @export
 * @interface ShareGetPropertiesOptions
 */
export interface ShareGetPropertiesOptions {
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
 * Options to configure Share - Set Quota operation.
 *
 * @export
 * @interface ShareSetQuotaOptions
 */
export interface ShareSetQuotaOptions {
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
 * Options to configure Share - Get Statistics operation.
 *
 * @export
 * @interface ShareGetStatisticsOptions
 */
export interface ShareGetStatisticsOptions {
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
 * Signed Identifier
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
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-acl
     */
    permission: string;
  };
}

export declare type ShareGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
} & Models.ShareGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: Models.ShareGetAccessPolicyHeaders;
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
 * Options to configure Share - Create Snapshot operation.
 *
 * @export
 * @interface ShareCreateSnapshotOptions
 */
export interface ShareCreateSnapshotOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * A name-value pair to associate with a file storage object.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof ShareCreateOptions
   */
  metadata?: { [propertyName: string]: string };
}

/**
 * A ShareClient represents a URL to the Azure Storage share allowing you to manipulate its directories and files.
 *
 * @export
 * @class ShareClient
 * @extends {StorageClient}
 */
export class ShareClient extends StorageClient {
  /**
   * Share operation context provided by protocol layer.
   *
   * @private
   * @type {Share}
   * @memberof ShareClient
   */
  private context: Share;

  /**
   * Creates an instance of ShareClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file share, such as
   *                     "https://myaccount.file.core.windows.net/share". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/share?sasString".
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ShareClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.context = new Share(this.storageClientContext);
  }

  /**
   * Creates a new ShareClient object identical to the source but with the specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base share.
   *
   * @param {string} snapshot The snapshot timestamp.
   * @returns {ShareClient} A new ShareClient object identical to the source but with the specified snapshot timestamp
   * @memberof ShareClient
   */
  public withSnapshot(snapshot: string): ShareClient {
    return new ShareClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SHARE_SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot
      ),
      this.pipeline
    );
  }

  /**
   * Creates a new share under the specified account. If the share with
   * the same name already exists, the operation fails.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-share
   *
   * @param {ShareCreateOptions} [options] Optional options to Share Create operation.
   * @returns {Promise<Models.ShareCreateResponse>}
   * @memberof ShareClient
   */
  public async create(options: ShareCreateOptions = {}): Promise<Models.ShareCreateResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.create({
      ...options,
      abortSignal: aborter
    });
  }

  /**
   * Creates a DirectoryClient object.
   *
   * @param directoryName A directory name
   * @returns {DirectoryClient}
   * @memberof ShareClient
   */
  public createDirectoryClient(directoryName: string): DirectoryClient {
    return new DirectoryClient(
      appendToURLPath(this.url, encodeURIComponent(directoryName)),
      this.pipeline
    );
  }

  /**
   * Returns all user-defined metadata and system properties for the specified
   * share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-share-properties
   *
   * @returns {Promise<Models.ShareGetPropertiesResponse>}
   * @memberof ShareClient
   */
  public async getProperties(
    options: ShareGetPropertiesOptions = {}
  ): Promise<Models.ShareGetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Marks the specified share for deletion. The share and any directories or files
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-share
   *
   * @param {Models.ShareDeleteMethodOptions} [options] Optional options to Share Delete operation.
   * @returns {Promise<Models.ShareDeleteResponse>}
   * @memberof ShareClient
   */
  public async delete(options: ShareDeleteMethodOptions = {}): Promise<Models.ShareDeleteResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.deleteMethod({
      abortSignal: aborter,
      ...options
    });
  }

  /**
   * Sets one or more user-defined name-value pairs for the specified share.
   *
   * If no option provided, or no metadata defined in the option parameter, the share
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing directory metadata will be removed.
   * @param {ShareSetMetadataOptions} [option] Optional options to Share Set Metadata operation.
   * @returns {Promise<Models.ShareSetMetadataResponse>}
   * @memberof ShareClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: ShareSetMetadataOptions = {}
  ): Promise<Models.ShareSetMetadataResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.setMetadata({
      abortSignal: aborter,
      metadata
    });
  }

  /**
   * Gets the permissions for the specified share. The permissions indicate
   * whether share data may be accessed publicly.
   *
   * WARNING: JavaScript Date will potential lost precision when parsing start and expiry string.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-share-acl
   *
   * @param {ShareGetAccessPolicyOptions} [option] Optional options to Share Get Access Policy operation.
   * @returns {Promise<ShareGetAccessPolicyResponse>}
   * @memberof ShareClient
   */
  public async getAccessPolicy(
    options: ShareGetAccessPolicyOptions = {}
  ): Promise<ShareGetAccessPolicyResponse> {
    const aborter = options.abortSignal || Aborter.none;
    const response = await this.context.getAccessPolicy({
      abortSignal: aborter
    });

    const res: ShareGetAccessPolicyResponse = {
      _response: response._response,
      date: response.date,
      eTag: response.eTag,
      lastModified: response.lastModified,
      requestId: response.requestId,
      signedIdentifiers: [],
      version: response.version
    };

    for (const identifier of response) {
      res.signedIdentifiers.push({
        accessPolicy: {
          expiry: new Date(identifier.accessPolicy!.expiry!),
          permission: identifier.accessPolicy!.permission!,
          start: new Date(identifier.accessPolicy!.start!)
        },
        id: identifier.id
      });
    }

    return res;
  }

  /**
   * Sets the permissions for the specified share. The permissions indicate
   * whether directories or files in a share may be accessed publicly.
   *
   * When you set permissions for a share, the existing permissions are replaced.
   * If no shareAcl provided, the existing share ACL will be
   * removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-acl
   *
   * @param {SignedIdentifier[]} [shareAcl] Array of signed identifiers, each having a unique Id and details of access policy.
   * @param {ShareSetAccessPolicyOptions} [option] Optional options to Share Set Access Policy operation.
   * @returns {Promise<Models.ShareSetAccessPolicyResponse>}
   * @memberof ShareClient
   */
  public async setAccessPolicy(
    shareAcl?: SignedIdentifier[],
    options: ShareSetAccessPolicyOptions = {}
  ): Promise<Models.ShareSetAccessPolicyResponse> {
    const aborter = options.abortSignal || Aborter.none;
    const acl: Models.SignedIdentifier[] = [];
    for (const identifier of shareAcl || []) {
      acl.push({
        accessPolicy: {
          expiry: truncatedISO8061Date(identifier.accessPolicy.expiry),
          permission: identifier.accessPolicy.permission,
          start: truncatedISO8061Date(identifier.accessPolicy.start)
        },
        id: identifier.id
      });
    }

    return this.context.setAccessPolicy({
      abortSignal: aborter,
      shareAcl: acl
    });
  }

  /**
   * Creates a read-only snapshot of a share.
   *
   * @param {ShareCreateSnapshotOptions} [options={}] Optional options to Share Create Snapshot operation.
   * @returns {Promise<Models.ShareCreateSnapshotResponse>}
   * @memberof ShareClient
   */
  public async createSnapshot(
    options: ShareCreateSnapshotOptions = {}
  ): Promise<Models.ShareCreateSnapshotResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.createSnapshot({
      abortSignal: aborter,
      ...options
    });
  }

  /**
   * Sets quota for the specified share.
   *
   * @param {number} quotaInGB Specifies the maximum size of the share in gigabytes
   * @param {ShareSetQuotaOptions} [option] Optional options to Share Set Quota operation.
   * @returns {Promise<Models.ShareSetQuotaResponse>}
   * @memberof ShareClient
   */
  public async setQuota(
    quotaInGB: number,
    options: ShareSetQuotaOptions = {}
  ): Promise<Models.ShareSetQuotaResponse> {
    const aborter = options.abortSignal || Aborter.none;
    if (quotaInGB <= 0 || quotaInGB > 5120) {
      throw new RangeError(
        `Share quota must be greater than 0, and less than or equal to 5Tib (5120GB)`
      );
    }
    return this.context.setQuota({
      abortSignal: aborter,
      quota: quotaInGB
    });
  }

  /**
   * Retrieves statistics related to the share.
   *
   * @returns {Promise<Models.ShareGetStatisticsResponse>}
   * @param {ShareGetStatisticsOptions} [option] Optional options to Share Get Statistics operation.
   * @memberof ShareClient
   */
  public async getStatistics(
    options: ShareGetStatisticsOptions = {}
  ): Promise<Models.ShareGetStatisticsResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.getStatistics({
      abortSignal: aborter
    });
  }
}
