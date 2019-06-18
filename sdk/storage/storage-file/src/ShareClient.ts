// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  HttpResponse,
  TokenCredential as CoreHttpTokenCredential,
  isTokenCredential as isCoreHttpTokenCredential
} from "@azure/core-http";

import { Aborter } from "./Aborter";
import * as Models from "./generated/lib/models";
import { Share } from "./generated/lib/operations";
import { Metadata } from "./models";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { URLConstants } from "./utils/constants";
import {
  appendToURLPath,
  setURLParameter,
  truncatedISO8061Date,
  extractConnectionStringParts
} from "./utils/utils.common";
import { DirectoryClient, DirectoryCreateOptions, DirectoryDeleteOptions } from "./DirectoryClient";
import { FileCreateOptions, FileDeleteOptions, FileClient } from "./FileClient";
import { Credential } from "./credentials/Credential";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";

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
   * @memberof ShareCreateOptions
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
   * @memberof ShareDeleteMethodOptions
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
   * @memberof ShareSetMetadataOptions
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
   * @memberof ShareSetAccessPolicyOptions
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
   * @memberof ShareGetAccessPolicyOptions
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
   * @memberof ShareGetPropertiesOptions
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
   * @memberof ShareSetQuotaOptions
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
   * @memberof ShareGetStatisticsOptions
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
   * @memberof ShareCreateSnapshotOptions
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
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates an instance of ShareClient.
   *
   * @param {string} connectionString Connection string for an Azure storage account.
   * @param {string} shareName Share name.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ShareClient
   */
  constructor(connectionString: string, shareName: string, options?: NewPipelineOptions);
  /**
   * Creates an instance of ShareClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file share, such as
   *                     "https://myaccount.file.core.windows.net/share". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/share?sasString".
   * @param {Credential | CoreHttpTokenCredential} [credential] Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
   *                                If not specified, AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ShareClient
   */
  constructor(url: string, credential?: Credential | CoreHttpTokenCredential, options?: NewPipelineOptions);
  /**
   * Creates an instance of ShareClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file share, such as
   *                     "https://myaccount.file.core.windows.net/share". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/share?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ShareClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrShareName?: Credential | CoreHttpTokenCredential | Pipeline | string,
    options?: NewPipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipelineOrShareName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrShareName;
    } else if (
      credentialOrPipelineOrShareName instanceof Credential ||
      isCoreHttpTokenCredential(credentialOrPipelineOrShareName)
    ) {
      pipeline = newPipeline(credentialOrPipelineOrShareName, options);
    } else if (
      !credentialOrPipelineOrShareName &&
      typeof credentialOrPipelineOrShareName !== "string"
    ) {
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrShareName &&
      typeof credentialOrPipelineOrShareName === "string"
    ) {
      const shareName = credentialOrPipelineOrShareName;
      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      const sharedKeyCredential = new SharedKeyCredential(
        extractedCreds.accountName,
        extractedCreds.accountKey
      );
      urlOrConnectionString = extractedCreds.url + "/" + shareName;
      pipeline = newPipeline(sharedKeyCredential, options);
    } else {
      throw new Error("Expecting non-empty strings for shareName parameter");
    }
    super(urlOrConnectionString, pipeline);
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
   * @param {ShareCreateOptions} [options] Options to Share Create operation.
   * @returns {Promise<Models.ShareCreateResponse>} Response data for the Share Create operation.
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
   * @returns {DirectoryClient} The DirectoryClient object for the given directory name.
   * @memberof ShareClient
   */
  public createDirectoryClient(directoryName: string): DirectoryClient {
    return new DirectoryClient(
      appendToURLPath(this.url, encodeURIComponent(directoryName)),
      this.pipeline
    );
  }

  /**
   * Gets the directory client for the root directory of this share.
   * Note that the root directory always exists and cannot be deleted.
   *
   * @readonly
   * @type {DirectoryClient} A new DirectoryClient object for the root directory.
   * @memberof ShareClient
   */
  public get rootDirectoryClient(): DirectoryClient {
    return this.createDirectoryClient("");
  }

  /**
   * Creates a new subdirectory under this share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param {string} directoryName
   * @param {DirectoryCreateOptions} [options] Options to Directory Create operation.
   * @returns {Promise<{ directoryClient: DirectoryClient, directoryCreateResponse: Models.DirectoryCreateResponse }>} Directory creation response data and the corresponding directory client.
   * @memberof ShareClient
   */
  public async createDirectory(
    directoryName: string,
    options?: DirectoryCreateOptions
  ): Promise<{
    directoryClient: DirectoryClient;
    directoryCreateResponse: Models.DirectoryCreateResponse;
  }> {
    const directoryClient = this.createDirectoryClient(directoryName);
    const directoryCreateResponse = await directoryClient.create(options);
    return {
      directoryClient,
      directoryCreateResponse
    };
  }

  /**
   * Removes the specified empty sub directory under this share.
   * Note that the directory must be empty before it can be deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {string} directoryName
   * @param {DirectoryDeleteOptions} [options] Options to Directory Delete operation.
   * @returns {Promise<Models.DirectoryDeleteResponse>} Directory deletion response data.
   * @memberof ShareClient
   */
  public async deleteDirectory(
    directoryName: string,
    options?: DirectoryDeleteOptions
  ): Promise<Models.DirectoryDeleteResponse> {
    const directoryClient = this.createDirectoryClient(directoryName);
    return await directoryClient.delete(options);
  }

  /**
   * Creates a new file or replaces a file under the root directory of this share.
   * Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param {string} fileName
   * @param {number} size Specifies the maximum size in bytes for the file, up to 1 TB.
   * @param {FileCreateOptions} [options] Options to File Create operation.
   * @returns {Promise<{ fileClient: FileClient, fileCreateResponse: Models.FileCreateResponse }>} File creation response data and the corresponding file client.
   * @memberof ShareClient
   */
  public async createFile(
    fileName: string,
    size: number,
    options?: FileCreateOptions
  ): Promise<{ fileClient: FileClient; fileCreateResponse: Models.FileCreateResponse }> {
    const directoryClient = this.rootDirectoryClient;
    const fileClient = directoryClient.createFileClient(fileName);
    const fileCreateResponse = await fileClient.create(size, options);
    return {
      fileClient,
      fileCreateResponse
    };
  }

  /**
   * Removes a file under the root directory of this share from the storage account.
   * When a file is successfully deleted, it is immediately removed from the storage
   * account's index and is no longer accessible to clients. The file's data is later
   * removed from the service during garbage collection.
   *
   * Delete File will fail with status code 409 (Conflict) and error code SharingViolation
   * if the file is open on an SMB client.
   *
   * Delete File is not supported on a share snapshot, which is a read-only copy of
   * a share. An attempt to perform this operation on a share snapshot will fail with 400 (InvalidQueryParameterValue)
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-file2
   *
   * @param {string} directoryName
   * @param {string} fileName
   * @param {FileDeleteOptions} [options] Options to File Delete operation.
   * @returns Promise<Models.FileDeleteResponse> File Delete response data.
   * @memberof ShareClient
   */
  public async deleteFile(
    fileName: string,
    options?: FileDeleteOptions
  ): Promise<Models.FileDeleteResponse> {
    const directoryClient = this.rootDirectoryClient;
    const fileClient = directoryClient.createFileClient(fileName);
    return await fileClient.delete(options);
  }

  /**
   * Returns all user-defined metadata and system properties for the specified
   * share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-share-properties
   *
   * @returns {Promise<Models.ShareGetPropertiesResponse>} Response data for the Share Get Properties operation.
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
   * @param {Models.ShareDeleteMethodOptions} [options] Options to Share Delete operation.
   * @returns {Promise<Models.ShareDeleteResponse>} Response data for the Share Delete operation.
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
   * @param {ShareSetMetadataOptions} [option] Options to Share Set Metadata operation.
   * @returns {Promise<Models.ShareSetMetadataResponse>} Response data for the Share Set Metadata operation.
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
   * @param {ShareGetAccessPolicyOptions} [option] Options to Share Get Access Policy operation.
   * @returns {Promise<ShareGetAccessPolicyResponse>} Response data for the Share Get Access Policy operation.
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
   * @param {ShareSetAccessPolicyOptions} [option] Options to Share Set Access Policy operation.
   * @returns {Promise<Models.ShareSetAccessPolicyResponse>} Response data for the Share Set Access Policy operation.
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
   * @param {ShareCreateSnapshotOptions} [options={}] Options to Share Create Snapshot operation.
   * @returns {Promise<Models.ShareCreateSnapshotResponse>} Response data for the Share Create Snapshot operation.
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
   * @param {ShareSetQuotaOptions} [option] Options to Share Set Quota operation.
   * @returns {Promise<Models.ShareSetQuotaResponse>} Response data for the Share Get Quota operation.
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
   * @param {ShareGetStatisticsOptions} [option] Options to Share Get Statistics operation.
   * @returns {Promise<Models.ShareGetStatisticsResponse>} Response data for the Share Get Statistics operation.
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
