import { HttpResponse } from "ms-rest-js";

import { Aborter } from "./Aborter";
import * as Models from "./generated/models";
import { Share } from "./generated/operations";
import { IMetadata } from "./models";
import { Pipeline } from "./Pipeline";
import { ServiceURL } from "./ServiceURL";
import { StorageURL } from "./StorageURL";
import { URLConstants } from "./utils/constants";
import {
  appendToURLPath,
  setURLParameter,
  truncatedISO8061Date
} from "./utils/utils.common";

export interface IShareCreateOptions {
  /**
   * A name-value pair to associate with a file storage object.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof IShareCreateOptions
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Specifies the maximum size of the share, in
   * gigabytes.
   *
   * @type {number}
   * @memberof IShareCreateOptions
   */
  quota?: number;
}

export interface IShareDeleteMethodOptions {
  /**
   * Specifies the option
   * include to delete the base share and all of its snapshots. Possible values
   * include: 'include'
   *
   * @type {Models.DeleteSnapshotsOptionType}
   * @memberof IShareDeleteMethodOptions
   */
  deleteSnapshots?: Models.DeleteSnapshotsOptionType;
}

export interface ISignedIdentifier {
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
  signedIdentifiers: ISignedIdentifier[];
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

export interface IShareCreateSnapshotOptions {
  /**
   * A name-value pair to associate with a file storage object.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof IShareCreateOptions
   */
  metadata?: { [propertyName: string]: string };
}

/**
 * A ShareURL represents a URL to the Azure Storage share allowing you to manipulate its directories and files.
 *
 * @export
 * @class ShareURL
 * @extends {StorageURL}
 */
export class ShareURL extends StorageURL {
  /**
   * Creates a ShareURL object from ServiceURL
   *
   * @param serviceURL
   * @param shareName
   */
  public static fromServiceURL(
    serviceURL: ServiceURL,
    shareName: string
  ): ShareURL {
    return new ShareURL(
      appendToURLPath(serviceURL.url, shareName),
      serviceURL.pipeline
    );
  }

  /**
   * Share operation context provided by protocol layer.
   *
   * @private
   * @type {Share}
   * @memberof ShareURL
   */
  private context: Share;

  /**
   * Creates an instance of ShareURL.
   *
   * @param {string} url A URL string pointing to Azure Storage file share, such as
   *                     "https://myaccount.file.core.windows.net/share". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/share?sasString".
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ShareURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.context = new Share(this.storageClientContext);
  }

  /**
   * Creates a new ShareURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {ShareURL}
   * @memberof ShareURL
   */
  public withPipeline(pipeline: Pipeline): ShareURL {
    return new ShareURL(this.url, pipeline);
  }

  /**
   * Creates a new ShareURL object identical to the source but with the specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base share.
   *
   * @param {string} snapshot
   * @returns {ShareURL} A new ShareURL object identical to the source but with the specified snapshot timestamp
   * @memberof ShareURL
   */
  public withSnapshot(snapshot: string): ShareURL {
    return new ShareURL(
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IShareCreateOptions} [options]
   * @returns {Promise<Models.ShareCreateResponse>}
   * @memberof ShareURL
   */
  public async create(
    aborter: Aborter,
    options: IShareCreateOptions = {}
  ): Promise<Models.ShareCreateResponse> {
    return this.context.create({
      ...options,
      abortSignal: aborter
    });
  }

  /**
   * Returns all user-defined metadata and system properties for the specified
   * share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-share-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.ShareGetPropertiesResponse>}
   * @memberof ShareURL
   */
  public async getProperties(
    aborter: Aborter
  ): Promise<Models.ShareGetPropertiesResponse> {
    return this.context.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Marks the specified share for deletion. The share and any directories or files
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-share
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {Models.IShareDeleteMethodOptions} [options]
   * @returns {Promise<Models.ShareDeleteResponse>}
   * @memberof ShareURL
   */
  public async delete(
    aborter: Aborter,
    options: IShareDeleteMethodOptions = {}
  ): Promise<Models.ShareDeleteResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IMetadata} [metadata] If no metadata provided, all existing directory metadata will be removed
   * @returns {Promise<Models.ShareSetMetadataResponse>}
   * @memberof ShareURL
   */
  public async setMetadata(
    aborter: Aborter,
    metadata?: IMetadata
  ): Promise<Models.ShareSetMetadataResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<ShareGetAccessPolicyResponse>}
   * @memberof ShareURL
   */
  public async getAccessPolicy(
    aborter: Aborter
  ): Promise<ShareGetAccessPolicyResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {ISignedIdentifier[]} [shareAcl]
   * @returns {Promise<Models.ShareSetAccessPolicyResponse>}
   * @memberof ShareURL
   */
  public async setAccessPolicy(
    aborter: Aborter,
    shareAcl?: ISignedIdentifier[]
  ): Promise<Models.ShareSetAccessPolicyResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IShareCreateSnapshotOptions} [options={}]
   * @returns {Promise<Models.ShareCreateSnapshotResponse>}
   * @memberof ShareURL
   */
  public async createSnapshot(
    aborter: Aborter,
    options: IShareCreateSnapshotOptions = {}
  ): Promise<Models.ShareCreateSnapshotResponse> {
    return this.context.createSnapshot({
      abortSignal: aborter,
      ...options
    });
  }

  /**
   * Sets quota for the specified share.
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} quotaInGB Specifies the maximum size of the share in gigabytes
   * @returns {Promise<Models.ShareSetQuotaResponse>}
   * @memberof ShareURL
   */
  public async setQuota(
    aborter: Aborter,
    quotaInGB: number
  ): Promise<Models.ShareSetQuotaResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.ShareGetStatisticsResponse>}
   * @memberof ShareURL
   */
  public async getStatistics(
    aborter: Aborter
  ): Promise<Models.ShareGetStatisticsResponse> {
    return this.context.getStatistics({
      abortSignal: aborter
    });
  }
}
