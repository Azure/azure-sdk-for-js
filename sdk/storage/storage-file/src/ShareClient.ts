// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpResponse, isNode } from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  DeleteSnapshotsOptionType,
  DirectoryCreateResponse,
  DirectoryDeleteResponse,
  FileCreateResponse,
  FileDeleteResponse,
  ShareCreatePermissionResponse,
  ShareCreateResponse,
  ShareCreateSnapshotResponse,
  ShareDeleteResponse,
  ShareGetAccessPolicyHeaders,
  ShareGetPermissionResponse,
  ShareGetPropertiesResponse,
  ShareSetAccessPolicyResponse,
  ShareSetMetadataResponse,
  ShareSetQuotaResponse,
  SignedIdentifierModel,
  ShareGetStatisticsResponseModel
} from "./generatedModels";
import { Share } from "./generated/src/operations";
import { Metadata } from "./models";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient, CommonOptions } from "./StorageClient";
import { URLConstants } from "./utils/constants";
import {
  appendToURLPath,
  setURLParameter,
  truncatedISO8061Date,
  extractConnectionStringParts,
  getShareNameAndPathFromUrl
} from "./utils/utils.common";
import { DirectoryClient, DirectoryCreateOptions, DirectoryDeleteOptions } from "./DirectoryClient";
import { FileCreateOptions, FileDeleteOptions, FileClient } from "./FileClient";
import { Credential } from "./credentials/Credential";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { createSpan } from "./utils/tracing";

/**
 * Options to configure Share - Create operation.
 *
 * @export
 * @interface ShareCreateOptions
 */
export interface ShareCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareCreateOptions
   */
  abortSignal?: AbortSignalLike;
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
export interface ShareDeleteMethodOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareDeleteMethodOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the option
   * include to delete the base share and all of its snapshots. Possible values
   * include: 'include'
   *
   * @type {DeleteSnapshotsOptionType}
   * @memberof ShareDeleteMethodOptions
   */
  deleteSnapshots?: DeleteSnapshotsOptionType;
}

/**
 * Options to configure Share - Set Metadata operation.
 *
 * @export
 * @interface ShareSetMetadataOptions
 */
export interface ShareSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareSetMetadataOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Share - Set Access Policy operation.
 *
 * @export
 * @interface ShareSetAccessPolicyOptions
 */
export interface ShareSetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareSetAccessPolicyOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Share - Get Access Policy operation.
 *
 * @export
 * @interface ShareGetAccessPolicyOptions
 */
export interface ShareGetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareGetAccessPolicyOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Share - Get Properties operation.
 *
 * @export
 * @interface ShareGetPropertiesOptions
 */
export interface ShareGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareGetPropertiesOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Share - Set Quota operation.
 *
 * @export
 * @interface ShareSetQuotaOptions
 */
export interface ShareSetQuotaOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareSetQuotaOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Share - Get Statistics operation.
 *
 * @export
 * @interface ShareGetStatisticsOptions
 */
export interface ShareGetStatisticsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareGetStatisticsOptions
   */
  abortSignal?: AbortSignalLike;
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
     * @member {string} permissions the permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-acl
     */
    permissions: string;
  };
}

export declare type ShareGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
} & ShareGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ShareGetAccessPolicyHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: SignedIdentifierModel[];
    };
  };

/**
 * Options to configure Share - Create Snapshot operation.
 *
 * @export
 * @interface ShareCreateSnapshotOptions
 */
export interface ShareCreateSnapshotOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareCreateSnapshotOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * A name-value pair to associate with a file storage object.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof ShareCreateOptions
   */
  metadata?: { [propertyName: string]: string };
}

/**
 * Options to configure Share - Create Permission operation.
 *
 * @export
 * @interface ShareCreatePermissionOptions
 */
export interface ShareCreatePermissionOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareCreatePermissionOptions
   */
  abortSignal?: AbortSignalLike;
}
/**
 * Options to configure Share - Get Permission operation.
 *
 * @export
 * @interface ShareGetPermissionOptions
 */
export interface ShareGetPermissionOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ShareGetPermissionOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Response - Share Get Statistics Operation.
 *
 * @export
 * @interface ShareGetStatisticsResponse
 */
export type ShareGetStatisticsResponse = ShareGetStatisticsResponseModel & {
  /**
   * @deprecated shareUsage is going to be deprecated. Please use ShareUsageBytes instead.
   *
   * The approximate size of the data stored on the share, rounded up to the nearest gigabyte. Note
   * that this value may not include all recently created or recently resized files.
   *
   * @type {number}
   * @memberof ShareGetStatisticsResponse
   */
  shareUsage: number;
};

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
  private _shareName: string;
  public get shareName(): string {
    return this._shareName;
  }

  /**
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} shareName Share name.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ShareClient
   */
  constructor(connectionString: string, shareName: string, options?: StoragePipelineOptions);
  /**
   * Creates an instance of ShareClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file share, such as
   *                     "https://myaccount.file.core.windows.net/share". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/share?sasString".
   * @param {Credential} [credential] Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
   *                                  If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ShareClient
   */
  constructor(url: string, credential?: Credential, options?: StoragePipelineOptions);
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
    credentialOrPipelineOrShareName?: Credential | Pipeline | string,
    options?: StoragePipelineOptions
  ) {
    let pipeline: Pipeline;
    let url: string;
    if (credentialOrPipelineOrShareName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrShareName;
    } else if (credentialOrPipelineOrShareName instanceof Credential) {
      // (url: string, credential?: Credential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
      pipeline = newPipeline(credentialOrPipelineOrShareName, options);
    } else if (
      !credentialOrPipelineOrShareName &&
      typeof credentialOrPipelineOrShareName !== "string"
    ) {
      // (url: string, credential?: Credential, options?: StoragePipelineOptions)
      // The second parameter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrShareName &&
      typeof credentialOrPipelineOrShareName === "string"
    ) {
      // (connectionString: string, shareName: string, options?: StoragePipelineOptions)
      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      const shareName = credentialOrPipelineOrShareName;
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const sharedKeyCredential = new SharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey
          );
          url = appendToURLPath(extractedCreds.url, shareName);
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url = appendToURLPath(extractedCreds.url, shareName) + "?" + extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for shareName parameter");
    }
    super(url, pipeline);
    this._shareName = getShareNameAndPathFromUrl(this.url).shareName;
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
   * @returns {Promise<ShareCreateResponse>} Response data for the Share Create operation.
   * @memberof ShareClient
   */
  public async create(options: ShareCreateOptions = {}): Promise<ShareCreateResponse> {
    const { span, spanOptions } = createSpan("ShareClient-create", options.spanOptions);
    try {
      return this.context.create({
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

  /**
   * Creates a DirectoryClient object.
   *
   * @param directoryName A directory name
   * @returns {DirectoryClient} The DirectoryClient object for the given directory name.
   * @memberof ShareClient
   */
  public getDirectoryClient(directoryName: string): DirectoryClient {
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
    return this.getDirectoryClient("");
  }

  /**
   * Creates a new subdirectory under this share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param {string} directoryName
   * @param {DirectoryCreateOptions} [options] Options to Directory Create operation.
   * @returns {Promise<{ directoryClient: DirectoryClient, directoryCreateResponse: DirectoryCreateResponse }>} Directory creation response data and the corresponding directory client.
   * @memberof ShareClient
   */
  public async createDirectory(
    directoryName: string,
    options: DirectoryCreateOptions = {}
  ): Promise<{
    directoryClient: DirectoryClient;
    directoryCreateResponse: DirectoryCreateResponse;
  }> {
    const { span, spanOptions } = createSpan("ShareClient-createDirectory", options.spanOptions);
    try {
      const directoryClient = this.getDirectoryClient(directoryName);
      const directoryCreateResponse = await directoryClient.create({ ...options, spanOptions });
      return {
        directoryClient,
        directoryCreateResponse
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
   * Removes the specified empty sub directory under this share.
   * Note that the directory must be empty before it can be deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {string} directoryName
   * @param {DirectoryDeleteOptions} [options] Options to Directory Delete operation.
   * @returns {Promise<DirectoryDeleteResponse>} Directory deletion response data.
   * @memberof ShareClient
   */
  public async deleteDirectory(
    directoryName: string,
    options: DirectoryDeleteOptions = {}
  ): Promise<DirectoryDeleteResponse> {
    const { span, spanOptions } = createSpan("ShareClient-deleteDirectory", options.spanOptions);
    try {
      const directoryClient = this.getDirectoryClient(directoryName);
      return await directoryClient.delete({ ...options, spanOptions });
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
   * Creates a new file or replaces a file under the root directory of this share.
   * Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param {string} fileName
   * @param {number} size Specifies the maximum size in bytes for the file, up to 1 TB.
   * @param {FileCreateOptions} [options] Options to File Create operation.
   * @returns {Promise<{ fileClient: FileClient, fileCreateResponse: FileCreateResponse }>} File creation response data and the corresponding file client.
   * @memberof ShareClient
   */
  public async createFile(
    fileName: string,
    size: number,
    options: FileCreateOptions = {}
  ): Promise<{ fileClient: FileClient; fileCreateResponse: FileCreateResponse }> {
    const { span, spanOptions } = createSpan("ShareClient-createFile", options.spanOptions);
    try {
      const directoryClient = this.rootDirectoryClient;
      const fileClient = directoryClient.getFileClient(fileName);
      const fileCreateResponse = await fileClient.create(size, { ...options, spanOptions });
      return {
        fileClient,
        fileCreateResponse
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
   * @returns Promise<FileDeleteResponse> File Delete response data.
   * @memberof ShareClient
   */
  public async deleteFile(
    fileName: string,
    options: FileDeleteOptions = {}
  ): Promise<FileDeleteResponse> {
    const { span, spanOptions } = createSpan("ShareClient-deleteFile", options.spanOptions);
    try {
      const directoryClient = this.rootDirectoryClient;
      const fileClient = directoryClient.getFileClient(fileName);
      return await fileClient.delete({ ...options, spanOptions });
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
   * Returns all user-defined metadata and system properties for the specified
   * share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-share-properties
   *
   * @returns {Promise<ShareGetPropertiesResponse>} Response data for the Share Get Properties operation.
   * @memberof ShareClient
   */
  public async getProperties(
    options: ShareGetPropertiesOptions = {}
  ): Promise<ShareGetPropertiesResponse> {
    const { span, spanOptions } = createSpan("ShareClient-getProperties", options.spanOptions);
    try {
      return this.context.getProperties({
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
   * Marks the specified share for deletion. The share and any directories or files
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-share
   *
   * @param {ShareDeleteMethodOptions} [options] Options to Share Delete operation.
   * @returns {Promise<ShareDeleteResponse>} Response data for the Share Delete operation.
   * @memberof ShareClient
   */
  public async delete(options: ShareDeleteMethodOptions = {}): Promise<ShareDeleteResponse> {
    const { span, spanOptions } = createSpan("ShareClient-delete", options.spanOptions);
    try {
      return this.context.deleteMethod({
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

  /**
   * Sets one or more user-defined name-value pairs for the specified share.
   *
   * If no option provided, or no metadata defined in the option parameter, the share
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing directory metadata will be removed.
   * @param {ShareSetMetadataOptions} [option] Options to Share Set Metadata operation.
   * @returns {Promise<ShareSetMetadataResponse>} Response data for the Share Set Metadata operation.
   * @memberof ShareClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: ShareSetMetadataOptions = {}
  ): Promise<ShareSetMetadataResponse> {
    const { span, spanOptions } = createSpan("ShareClient-setMetadata", options.spanOptions);
    try {
      return this.context.setMetadata({
        abortSignal: options.abortSignal,
        metadata,
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
    const { span, spanOptions } = createSpan("ShareClient-getAccessPolicy", options.spanOptions);
    try {
      const response = await this.context.getAccessPolicy({
        abortSignal: options.abortSignal,
        spanOptions
      });

      const res: ShareGetAccessPolicyResponse = {
        _response: response._response,
        date: response.date,
        etag: response.etag,
        lastModified: response.lastModified,
        requestId: response.requestId,
        signedIdentifiers: [],
        version: response.version
      };

      for (const identifier of response) {
        res.signedIdentifiers.push({
          accessPolicy: {
            expiry: new Date(identifier.accessPolicy!.expiry!),
            permissions: identifier.accessPolicy!.permissions!,
            start: new Date(identifier.accessPolicy!.start!)
          },
          id: identifier.id
        });
      }

      return res;
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
   * @returns {Promise<ShareSetAccessPolicyResponse>} Response data for the Share Set Access Policy operation.
   * @memberof ShareClient
   */
  public async setAccessPolicy(
    shareAcl?: SignedIdentifier[],
    options: ShareSetAccessPolicyOptions = {}
  ): Promise<ShareSetAccessPolicyResponse> {
    const { span, spanOptions } = createSpan("ShareClient-setAccessPolicy", options.spanOptions);
    try {
      const acl: SignedIdentifierModel[] = [];
      for (const identifier of shareAcl || []) {
        acl.push({
          accessPolicy: {
            expiry: truncatedISO8061Date(identifier.accessPolicy.expiry),
            permissions: identifier.accessPolicy.permissions,
            start: truncatedISO8061Date(identifier.accessPolicy.start)
          },
          id: identifier.id
        });
      }

      return this.context.setAccessPolicy({
        abortSignal: options.abortSignal,
        shareAcl: acl,
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
   * Creates a read-only snapshot of a share.
   *
   * @param {ShareCreateSnapshotOptions} [options={}] Options to Share Create Snapshot operation.
   * @returns {Promise<ShareCreateSnapshotResponse>} Response data for the Share Create Snapshot operation.
   * @memberof ShareClient
   */
  public async createSnapshot(
    options: ShareCreateSnapshotOptions = {}
  ): Promise<ShareCreateSnapshotResponse> {
    const { span, spanOptions } = createSpan("ShareClient-createSnapshot", options.spanOptions);
    try {
      return this.context.createSnapshot({
        abortSignal: options.abortSignal,
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

  /**
   * Sets quota for the specified share.
   *
   * @param {number} quotaInGB Specifies the maximum size of the share in gigabytes
   * @param {ShareSetQuotaOptions} [option] Options to Share Set Quota operation.
   * @returns {Promise<ShareSetQuotaResponse>} Response data for the Share Get Quota operation.
   * @memberof ShareClient
   */
  public async setQuota(
    quotaInGB: number,
    options: ShareSetQuotaOptions = {}
  ): Promise<ShareSetQuotaResponse> {
    const { span, spanOptions } = createSpan("ShareClient-setQuota", options.spanOptions);
    try {
      if (quotaInGB <= 0 || quotaInGB > 5120) {
        throw new RangeError(
          `Share quota must be greater than 0, and less than or equal to 5Tib (5120GB)`
        );
      }
      return this.context.setQuota({
        abortSignal: options.abortSignal,
        quota: quotaInGB,
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
   * Retrieves statistics related to the share.
   *
   * @param {ShareGetStatisticsOptions} [option] Options to Share Get Statistics operation.
   * @returns {Promise<ShareGetStatisticsResponse>} Response data for the Share Get Statistics operation.
   * @memberof ShareClient
   */
  public async getStatistics(
    options: ShareGetStatisticsOptions = {}
  ): Promise<ShareGetStatisticsResponse> {
    const { span, spanOptions } = createSpan("ShareClient-getStatistics", options.spanOptions);
    try {
      const response = await this.context.getStatistics({
        abortSignal: options.abortSignal,
        spanOptions
      });

      const GBBytes = 1024 * 1024 * 1024;
      return { ...response, shareUsage: Math.ceil(response.shareUsageBytes / GBBytes) };
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
   * Creates a file permission (a security descriptor) at the share level.
   * The created security descriptor can be used for the files/directories in the share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-permission
   *
   * @param {ShareCreatePermissionOptions} [options] Options to Share Create Permission operation.
   * @param filePermission File permission described in the SDDL
   */
  public async createPermission(
    filePermission: string,
    options: ShareCreatePermissionOptions = {}
  ): Promise<ShareCreatePermissionResponse> {
    const { span, spanOptions } = createSpan("ShareClient-createPermission", options.spanOptions);
    try {
      return this.context.createPermission(
        {
          permission: filePermission
        },
        {
          abortSignal: options.abortSignal,
          spanOptions
        }
      );
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
   * Gets the Security Descriptor Definition Language (SDDL) for a given file permission key
   * which indicates a security descriptor.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-permission
   *
   * @param {ShareGetPermissionOptions} [options] Options to Share Create Permission operation.
   * @param filePermissionKey File permission key which indicates the security descriptor of the permission.
   */
  public async getPermission(
    filePermissionKey: string,
    options: ShareGetPermissionOptions = {}
  ): Promise<ShareGetPermissionResponse> {
    const { span, spanOptions } = createSpan("ShareClient-getPermission", options.spanOptions);
    try {
      return this.context.getPermission(filePermissionKey, {
        aborterSignal: options.abortSignal,
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
