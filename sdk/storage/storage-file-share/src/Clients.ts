// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  RequestBodyType as HttpRequestBody,
  TransferProgressEvent,
} from "@azure/core-rest-pipeline";
import { isNode } from "@azure/core-util";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  CopyFileSmbInfo,
  DeleteSnapshotsOptionType,
  DirectoryCreateResponse,
  DirectoryDeleteResponse,
  DirectoryGetPropertiesResponse,
  DirectoryItem,
  DirectoryListFilesAndDirectoriesSegmentResponse,
  DirectoryListHandlesResponse,
  DirectorySetMetadataResponse,
  DirectorySetPropertiesResponse,
  DirectoryForceCloseHandlesHeaders,
  FileAbortCopyResponse,
  FileCreateResponse,
  FileDeleteResponse,
  FileDownloadOptionalParams,
  FileDownloadResponseModel,
  FileForceCloseHandlesHeaders,
  FileGetPropertiesResponse,
  FileGetRangeListHeaders,
  FileGetRangeListDiffResponse,
  FileItem,
  FileListHandlesResponse,
  FileSetHTTPHeadersResponse,
  FileSetMetadataResponse,
  FileStartCopyResponse,
  FileUploadRangeFromURLResponse,
  FileUploadRangeResponse,
  HandleItem,
  LeaseAccessConditions,
  RangeModel,
  ShareCreatePermissionResponse,
  ShareCreateResponse,
  ShareCreateSnapshotResponse,
  ShareDeleteResponse,
  ShareGetAccessPolicyHeaders,
  ShareGetPermissionResponse,
  ShareGetPropertiesResponseModel,
  ShareGetStatisticsResponseModel,
  ShareSetAccessPolicyResponse,
  ShareSetMetadataResponse,
  ShareSetQuotaResponse,
  SignedIdentifierModel,
  SourceModifiedAccessConditions,
  ShareAccessTier,
  ShareSetPropertiesResponse,
  ShareRootSquash,
  FileRenameResponse,
  DirectoryRenameResponse,
  FileLastWrittenMode,
  ShareFileRangeList,
  ShareCreateHeaders,
  ShareGetPropertiesHeaders,
  ShareDeleteHeaders,
  ShareSetMetadataHeaders,
  ShareSetAccessPolicyHeaders,
  ShareCreateSnapshotHeaders,
  ShareSetPropertiesHeaders,
  ShareGetStatisticsHeaders,
  ShareStats,
  ShareCreatePermissionHeaders,
  ShareGetPermissionHeaders,
  SharePermission,
  DirectoryCreateHeaders,
  DirectorySetPropertiesHeaders,
  DirectoryGetPropertiesHeaders,
  DirectoryDeleteHeaders,
  DirectorySetMetadataHeaders,
  DirectoryListFilesAndDirectoriesSegmentHeaders,
  DirectoryListHandlesHeaders,
  DirectoryRenameHeaders,
  FileCreateHeaders,
  FileDownloadHeaders,
  FileGetPropertiesHeaders,
  FileDeleteHeaders,
  FileSetMetadataHeaders,
  FileUploadRangeHeaders,
  FileUploadRangeFromURLHeaders,
  FileStartCopyHeaders,
  FileAbortCopyHeaders,
  FileListHandlesHeaders,
  RawFileDownloadResponse,
} from "./generatedModels";
import {
  FileRenameHeaders,
  ListFilesAndDirectoriesSegmentResponse as GeneratedListFilesAndDirectoriesSegmentResponse,
  ListHandlesResponse as GeneratedListHandlesResponse,
} from "./generated/src/models";
import { Share, Directory, File } from "./generated/src/operationsInterfaces";
import { isPipelineLike, newPipeline, Pipeline, PipelineLike } from "./Pipeline";
import {
  DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS,
  DEFAULT_HIGH_LEVEL_CONCURRENCY,
  FILE_MAX_SIZE_BYTES,
  FILE_RANGE_MAX_SIZE_BYTES,
  URLConstants,
  FileAttributesPreserve,
  FileAttributesNone,
} from "./utils/constants";
import {
  appendToURLPath,
  setURLParameter,
  truncatedISO8061Date,
  extractConnectionStringParts,
  getShareNameAndPathFromUrl,
  appendToURLQuery,
  httpAuthorizationToString,
  setURLPath,
  setURLQueries,
  EscapePath,
  ConvertInternalResponseOfListFiles,
  ConvertInternalResponseOfListHandles,
  WithResponse,
  assertResponse,
  removeEmptyString,
} from "./utils/utils.common";
import { Credential } from "../../storage-blob/src/credentials/Credential";
import { StorageSharedKeyCredential } from "../../storage-blob/src/credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "../../storage-blob/src/credentials/AnonymousCredential";
import { tracingClient } from "./utils/tracing";
import { StorageClient, CommonOptions } from "./StorageClient";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { FileSystemAttributes } from "./FileSystemAttributes";
import { FileDownloadResponse } from "./FileDownloadResponse";
import { Range, rangeToString } from "./Range";
import {
  CloseHandlesInfo,
  FileAndDirectoryCreateCommonOptions,
  FileAndDirectorySetPropertiesCommonOptions,
  fileAttributesToString,
  fileCreationTimeToString,
  FileHttpHeaders,
  fileLastWriteTimeToString,
  Metadata,
  validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions,
  validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions,
  ShareProtocols,
  toShareProtocolsString,
  toShareProtocols,
  HttpAuthorization,
  fileChangeTimeToString,
  ShareClientOptions,
  ShareClientConfig,
} from "./models";
import { Batch } from "./utils/Batch";
import { BufferScheduler } from "./utils/BufferScheduler";
import { Readable } from "stream";
import {
  fsStat,
  fsCreateReadStream,
  readStreamToLocalFile,
  streamToBuffer,
} from "./utils/utils.node";
import { FileSetHttpHeadersHeaders, StorageClient as StorageClientContext } from "./generated/src/";
import { randomUUID } from "@azure/core-util";
import { generateFileSASQueryParameters } from "./FileSASSignatureValues";
import { ShareSASPermissions } from "./ShareSASPermissions";
import { SASProtocol } from "./SASQueryParameters";
import { SasIPRange } from "./SasIPRange";
import { FileSASPermissions } from "./FileSASPermissions";
import { ListFilesIncludeType } from "./generated/src";

export { ShareClientOptions, ShareClientConfig } from "./models";

/**
 * Options to configure the {@link ShareClient.create} operation.
 */
export interface ShareCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A name-value pair to associate with a file storage object.
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Specifies the maximum size of the share, in
   * gigabytes.
   */
  quota?: number;

  /**
   * Specifies the access tier of the share. Possible values include: 'TransactionOptimized',
   * 'Hot', 'Cool'
   */
  accessTier?: ShareAccessTier;

  /**
   * Supported in version 2020-02-10 and above. Specifies the enabled protocols on the share. If not specified, the default is SMB.
   */
  protocols?: ShareProtocols;
  /**
   * Root squash to set on the share.  Only valid for NFS shares. Possible values include:
   * 'NoRootSquash', 'RootSquash', 'AllSquash'.
   */
  rootSquash?: ShareRootSquash;
  enableSnapshotVirtualDirectoryAccess?: boolean;
}

/**
 * Options to configure the {@link ShareClient.delete} operation.
 */
export interface ShareDeleteMethodOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the option
   * include to delete the base share and all of its snapshots. Possible values
   * include: 'include'
   */
  deleteSnapshots?: DeleteSnapshotsOptionType;
  /**
   * If specified, the operation only succeeds if the resource's lease is active and matches this ID.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareClient.setMetadata} operation.
 */
export interface ShareSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, the operation only succeeds if the resource's lease is active and matches this ID.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareClient.setAccessPolicy} operation.
 */
export interface ShareSetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, the operation only succeeds if the resource's lease is active and matches this ID.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareClient.getAccessPolicy} operation.
 */
export interface ShareGetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, the operation only succeeds if the resource's lease is active and matches this ID.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareClient.exists} operation.
 */
export interface ShareExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, the operation only succeeds if the resource's lease is active and matches this ID.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareClient.getProperties} operation.
 */
export interface ShareGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, the operation only succeeds if the resource's lease is active and matches this ID.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareClient.setQuota} operation.
 */
export interface ShareSetQuotaOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, the operation only succeeds if the resource's lease is active and matches this ID.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareClient.setProperties} operation.
 */
export interface ShareSetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Specifies the access tier of the share. Possible values include: 'TransactionOptimized',
   * 'Hot', 'Cool'.
   */
  accessTier?: ShareAccessTier;

  /**
   * Specifies the maximum size of the share, in gigabytes.
   */
  quotaInGB?: number;

  /**
   * Root squash to set on the share.  Only valid for NFS shares. Possible values include:
   * 'NoRootSquash', 'RootSquash', 'AllSquash'.
   */
  rootSquash?: ShareRootSquash;
  /**
   * If specified, the operation only succeeds if the resource's lease is active and matches this ID.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareClient.getStatistics} operation.
 */
export interface ShareGetStatisticsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, the operation only succeeds if the resource's lease is active and matches this ID.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Signed Identifier
 */
export interface SignedIdentifier {
  /**
   * a unique id
   */
  id: string;
  /**
   * Access Policy
   */
  accessPolicy: {
    /**
     * the date-time the policy is active.
     */
    startsOn: Date;
    /**
     * the date-time the policy expires.
     */
    expiresOn: Date;
    /**
     * the permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-acl
     */
    permissions: string;
  };
}

export declare type ShareGetAccessPolicyResponse = WithResponse<
  {
    signedIdentifiers: SignedIdentifier[];
  } & ShareGetAccessPolicyHeaders,
  ShareGetAccessPolicyHeaders,
  SignedIdentifierModel[]
>;

/**
 * Options to configure the {@link ShareClient.createSnapshot} operation.
 */
export interface ShareCreateSnapshotOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A name-value pair to associate with a file storage object.
   */
  metadata?: { [propertyName: string]: string };
}

/**
 * Options to configure the {@link ShareClient.createPermission} operation.
 */
export interface ShareCreatePermissionOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}
/**
 * Options to configure the {@link ShareClient.getPermission} operation.
 */
export interface ShareGetPermissionOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Response data for the {@link ShareClient.getStatistics} Operation.
 */
export type ShareGetStatisticsResponse = ShareGetStatisticsResponseModel & {
  /**
   * @deprecated shareUsage is going to be deprecated. Please use ShareUsageBytes instead.
   *
   * The approximate size of the data stored on the share, rounded up to the nearest gigabyte. Note
   * that this value may not include all recently created or recently resized files.
   */
  shareUsage: number;
};

/**
 * Contains response data for the {@link ShareClient.createIfNotExists} operation.
 */
export interface ShareCreateIfNotExistsResponse extends ShareCreateResponse {
  /**
   * Indicate whether the share is successfully created. Is false when the share is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link ShareClient.deleteIfExists} operation.
 */
export interface ShareDeleteIfExistsResponse extends ShareDeleteResponse {
  /**
   * Indicate whether the share is successfully deleted. Is false if the share does not exist in the first place.
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link ShareClient.getProperties} operation.
 */
export type ShareGetPropertiesResponse = ShareGetPropertiesResponseModel & {
  /**
   * The protocols that have been enabled on the share.
   */
  protocols?: ShareProtocols;
};

/**
 * Common options of the {@link ShareGenerateSasUrlOptions} and {@link FileGenerateSasUrlOptions}.
 */
export interface CommonGenerateSasUrlOptions {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   */
  expiresOn?: Date;

  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;

  /**
   * Optional. The name of the access policy on the share this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;

  /**
   * Optional. The cache-control header for the SAS.
   */
  cacheControl?: string;

  /**
   * Optional. The content-disposition header for the SAS.
   */
  contentDisposition?: string;

  /**
   * Optional. The content-encoding header for the SAS.
   */
  contentEncoding?: string;

  /**
   * Optional. The content-language header for the SAS.
   */
  contentLanguage?: string;

  /**
   * Optional. The content-type header for the SAS.
   */
  contentType?: string;
}

/**
 * Options to configure {@link ShareClient.generateSasUrl} operation.
 */
export interface ShareGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
  /**
   * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: ShareSASPermissions;
}

/**
 * A ShareClient represents a URL to the Azure Storage share allowing you to manipulate its directories and files.
 */
export class ShareClient extends StorageClient {
  /**
   * Share operation context provided by protocol layer.
   */
  private context: Share;

  private _name: string;

  private shareClientConfig?: ShareClientConfig;

  /**
   * The name of the share
   */
  public get name(): string {
    return this._name;
  }

  /**
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param name - Share name.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
  constructor(connectionString: string, name: string, options?: ShareClientOptions);
  /**
   * Creates an instance of ShareClient.
   *
   * @param url - A URL string pointing to Azure Storage file share, such as
   *                     "https://myaccount.file.core.windows.net/share". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/share?sasString".
   * @param credential - Such as AnonymousCredential or StorageSharedKeyCredential.
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
   * Creates an instance of ShareClient.
   *
   * @param url - A URL string pointing to Azure Storage file share, such as
   *                     "https://myaccount.file.core.windows.net/share". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/share?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrShareName?: Credential | TokenCredential | PipelineLike | string,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: ShareClientOptions,
  ) {
    let pipeline: Pipeline;
    let url: string;
    if (isPipelineLike(credentialOrPipelineOrShareName)) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrShareName;
    } else if (
      credentialOrPipelineOrShareName instanceof Credential ||
      isTokenCredential(credentialOrPipelineOrShareName)
    ) {
      // (url: string, credential?: Credential, options?: ShareClientOptions)
      url = urlOrConnectionString;
      pipeline = newPipeline(credentialOrPipelineOrShareName, options);
    } else if (
      !credentialOrPipelineOrShareName &&
      typeof credentialOrPipelineOrShareName !== "string"
    ) {
      // (url: string, credential?: Credential, options?: ShareClientOptions)
      // The second parameter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrShareName &&
      typeof credentialOrPipelineOrShareName === "string"
    ) {
      // (connectionString: string, name: string, options?: ShareClientOptions)
      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      const name = credentialOrPipelineOrShareName;
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey,
          );
          url = appendToURLPath(extractedCreds.url, name);
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url = appendToURLPath(extractedCreds.url, name) + "?" + extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string",
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for name parameter");
    }
    super(url, pipeline);
    this._name = getShareNameAndPathFromUrl(this.url).shareName;
    this.shareClientConfig = options;
    this.context = this.storageClientContext.share;
  }

  /**
   * Creates a new ShareClient object identical to the source but with the specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base share.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new ShareClient object identical to the source but with the specified snapshot timestamp
   */
  public withSnapshot(snapshot: string): ShareClient {
    return new ShareClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SHARE_SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot,
      ),
      this.pipeline,
      this.shareClientConfig,
    );
  }

  /**
   * Creates a new share under the specified account. If the share with
   * the same name already exists, the operation fails.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-share
   *
   * @param options - Options to Share Create operation.
   * @returns Response data for the Share Create operation.
   */
  public async create(options: ShareCreateOptions = {}): Promise<ShareCreateResponse> {
    return tracingClient.withSpan("ShareClient-create", options, async (updatedOptions) => {
      return assertResponse<ShareCreateHeaders, ShareCreateHeaders>(
        await this.context.create({
          ...updatedOptions,
          enabledProtocols: toShareProtocolsString(updatedOptions.protocols),
        }),
      );
    });
  }

  /**
   * Creates a new share under the specified account. If the share with
   * the same name already exists, it is not changed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-share
   *
   * @param options -
   */
  public async createIfNotExists(
    options: ShareCreateOptions = {},
  ): Promise<ShareCreateIfNotExistsResponse> {
    return tracingClient.withSpan(
      "ShareClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        try {
          const res = await this.create(updatedOptions);
          return {
            succeeded: true,
            ...res,
          };
        } catch (e: any) {
          if (e.details?.errorCode === "ShareAlreadyExists") {
            return {
              succeeded: false,
              ...e.response?.parsedHeaders,
              _response: e.response,
            };
          }
          throw e;
        }
      },
    );
  }

  /**
   * Creates a {@link ShareDirectoryClient} object.
   *
   * @param directoryName - A directory name
   * @returns The ShareDirectoryClient object for the given directory name.
   */

  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients */
  public getDirectoryClient(directoryName: string): ShareDirectoryClient {
    return new ShareDirectoryClient(
      appendToURLPath(this.url, EscapePath(directoryName)),
      this.pipeline,
      this.shareClientConfig,
    );
  }

  /**
   * Gets the directory client for the root directory of this share.
   * Note that the root directory always exists and cannot be deleted.
   *
   * @readonly A new ShareDirectoryClient object for the root directory.
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients */
  public get rootDirectoryClient(): ShareDirectoryClient {
    return this.getDirectoryClient("");
  }

  /**
   * Creates a new subdirectory under this share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param directoryName -
   * @param options - Options to Directory Create operation.
   * @returns Directory creation response data and the corresponding directory client.
   */
  public async createDirectory(
    directoryName: string,
    options: DirectoryCreateOptions = {},
  ): Promise<{
    directoryClient: ShareDirectoryClient;
    directoryCreateResponse: DirectoryCreateResponse;
  }> {
    return tracingClient.withSpan(
      "ShareClient-createDirectory",
      options,
      async (updatedOptions) => {
        const directoryClient = this.getDirectoryClient(directoryName);
        const directoryCreateResponse = await directoryClient.create(updatedOptions);
        return {
          directoryClient,
          directoryCreateResponse,
        };
      },
    );
  }

  /**
   * Removes the specified empty sub directory under this share.
   * Note that the directory must be empty before it can be deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param directoryName -
   * @param options - Options to Directory Delete operation.
   * @returns Directory deletion response data.
   */
  public async deleteDirectory(
    directoryName: string,
    options: DirectoryDeleteOptions = {},
  ): Promise<DirectoryDeleteResponse> {
    return tracingClient.withSpan(
      "ShareClient-deleteDirectory",
      options,
      async (updatedOptions) => {
        const directoryClient = this.getDirectoryClient(directoryName);
        return directoryClient.delete(updatedOptions);
      },
    );
  }

  /**
   * Creates a new file or replaces a file under the root directory of this share.
   * Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param fileName -
   * @param size - Specifies the maximum size in bytes for the file, up to 4 TB.
   * @param options - Options to File Create operation.
   * @returns File creation response data and the corresponding file client.
   */
  public async createFile(
    fileName: string,
    size: number,
    options: FileCreateOptions = {},
  ): Promise<{ fileClient: ShareFileClient; fileCreateResponse: FileCreateResponse }> {
    return tracingClient.withSpan("ShareClient-createFile", options, async (updatedOptions) => {
      const directoryClient = this.rootDirectoryClient;
      const fileClient = directoryClient.getFileClient(fileName);
      const fileCreateResponse = await fileClient.create(size, updatedOptions);
      return {
        fileClient,
        fileCreateResponse,
      };
    });
  }

  /**
   * Removes a file under the root directory of this share from the storage account.
   * When a file is successfully deleted, it is immediately removed from the storage
   * account's index and is no longer accessible to clients. The file's data is later
   * removed from the service during garbage collection.
   *
   * Delete File will fail with status code 409 (Conflict) and error code `SharingViolation`
   * if the file is open on an SMB client.
   *
   * Delete File is not supported on a share snapshot, which is a read-only copy of
   * a share. An attempt to perform this operation on a share snapshot will fail with 400
   * (`InvalidQueryParameterValue`)
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-file2
   *
   * @param directoryName -
   * @param fileName -
   * @param options - Options to File Delete operation.
   * @returns Promise<FileDeleteResponse> File Delete response data.
   */
  public async deleteFile(
    fileName: string,
    options: FileDeleteOptions = {},
  ): Promise<FileDeleteResponse> {
    return tracingClient.withSpan("ShareClient-deleteFile", options, async (updatedOptions) => {
      const directoryClient = this.rootDirectoryClient;
      const fileClient = directoryClient.getFileClient(fileName);
      return fileClient.delete(updatedOptions);
    });
  }

  /**
   * Returns true if the Azrue share resource represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing share might be deleted by other clients or
   * applications. Vice versa new shares might be added by other clients or applications after this
   * function completes.
   *
   * @param options - options to Exists operation.
   */
  public async exists(options: ShareExistsOptions = {}): Promise<boolean> {
    return tracingClient.withSpan("ShareClient-exists", options, async (updatedOptions) => {
      try {
        await this.getProperties(updatedOptions);
        return true;
      } catch (e: any) {
        if (e.statusCode === 404) {
          return false;
        }
        throw e;
      }
    });
  }

  /**
   * Returns all user-defined metadata and system properties for the specified
   * share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-share-properties
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the `listShares` method of {@link ShareServiceClient} using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @returns Response data for the Share Get Properties operation.
   */
  public async getProperties(
    options: ShareGetPropertiesOptions = {},
  ): Promise<ShareGetPropertiesResponse> {
    return tracingClient.withSpan("ShareClient-getProperties", options, async (updatedOptions) => {
      const res = assertResponse<ShareGetPropertiesHeaders, ShareGetPropertiesHeaders>(
        await this.context.getProperties(updatedOptions),
      );
      return {
        ...res,
        protocols: toShareProtocols(res.enabledProtocols),
      };
    });
  }

  /**
   * Marks the specified share for deletion. The share and any directories or files
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-share
   *
   * @param options - Options to Share Delete operation.
   * @returns Response data for the Share Delete operation.
   */
  public async delete(options: ShareDeleteMethodOptions = {}): Promise<ShareDeleteResponse> {
    return tracingClient.withSpan("ShareClient-delete", options, async (updatedOptions) => {
      return assertResponse<ShareDeleteHeaders, ShareDeleteHeaders>(
        await this.context.delete({
          ...updatedOptions,
        }),
      );
    });
  }

  /**
   * Marks the specified share for deletion if it exists. The share and any directories or files
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-share
   *
   * @param options -
   */
  public async deleteIfExists(
    options: ShareDeleteMethodOptions = {},
  ): Promise<ShareDeleteIfExistsResponse> {
    return tracingClient.withSpan("ShareClient-deleteIfExists", options, async (updatedOptions) => {
      try {
        const res = await this.delete(updatedOptions);
        return {
          succeeded: true,
          ...res,
        };
      } catch (e: any) {
        if (e.details?.errorCode === "ShareNotFound") {
          return {
            succeeded: false,
            ...e.response?.parsedHeaders,
            _response: e.response,
          };
        }
        throw e;
      }
    });
  }

  /**
   * Sets one or more user-defined name-value pairs for the specified share.
   *
   * If no option provided, or no metadata defined in the option parameter, the share
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-metadata
   *
   * @param metadata - If no metadata provided, all existing directory metadata will be removed.
   * @param option - Options to Share Set Metadata operation.
   * @returns Response data for the Share Set Metadata operation.
   */
  public async setMetadata(
    metadata?: Metadata,
    options: ShareSetMetadataOptions = {},
  ): Promise<ShareSetMetadataResponse> {
    return tracingClient.withSpan("ShareClient-setMetadata", options, async (updatedOptions) => {
      return assertResponse<ShareSetMetadataHeaders, ShareSetMetadataHeaders>(
        await this.context.setMetadata({
          ...updatedOptions,
          metadata,
        }),
      );
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
   * @param option - Options to Share Get Access Policy operation.
   * @returns Response data for the Share Get Access Policy operation.
   */
  public async getAccessPolicy(
    options: ShareGetAccessPolicyOptions = {},
  ): Promise<ShareGetAccessPolicyResponse> {
    return tracingClient.withSpan(
      "ShareClient-getAccessPolicy",
      options,
      async (updatedOptions) => {
        const response = assertResponse<
          ShareGetAccessPolicyHeaders & SignedIdentifierModel[],
          ShareGetAccessPolicyHeaders,
          SignedIdentifierModel[]
        >(
          await this.context.getAccessPolicy({
            ...updatedOptions,
          }),
        );

        const res: ShareGetAccessPolicyResponse = {
          _response: response._response,
          date: response.date,
          etag: response.etag,
          lastModified: response.lastModified,
          requestId: response.requestId,
          signedIdentifiers: [],
          version: response.version,
        };

        for (const identifier of response) {
          let accessPolicy: any = undefined;
          if (identifier.accessPolicy) {
            accessPolicy = {
              permissions: identifier.accessPolicy.permissions,
            };

            if (identifier.accessPolicy.expiresOn) {
              accessPolicy.expiresOn = new Date(identifier.accessPolicy.expiresOn);
            }

            if (identifier.accessPolicy.startsOn) {
              accessPolicy.startsOn = new Date(identifier.accessPolicy.startsOn);
            }
          }

          res.signedIdentifiers.push({
            accessPolicy,
            id: identifier.id,
          });
        }

        return res;
      },
    );
  }

  /**
   * Sets the permissions for the specified share. The permissions indicate
   * whether directories or files in a share may be accessed publicly.
   *
   * When you set permissions for a share, the existing permissions are replaced.
   * If no shareAcl provided, the existing share ACL will be
   * removed.
   *
   * When you establish a stored access policy on a share, it may take up to 30 seconds to take effect.
   * During this interval, a shared access signature that is associated with the stored access policy will
   * fail with status code 403 (Forbidden), until the access policy becomes active.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-share-acl
   *
   * @param shareAcl - Array of signed identifiers, each having a unique Id and details of access policy.
   * @param option - Options to Share Set Access Policy operation.
   * @returns Response data for the Share Set Access Policy operation.
   */
  public async setAccessPolicy(
    shareAcl?: SignedIdentifier[],
    options: ShareSetAccessPolicyOptions = {},
  ): Promise<ShareSetAccessPolicyResponse> {
    return tracingClient.withSpan(
      "ShareClient-setAccessPolicy",
      options,
      async (updatedOptions) => {
        const acl: SignedIdentifierModel[] = [];
        for (const identifier of shareAcl || []) {
          acl.push({
            accessPolicy: {
              expiresOn: identifier.accessPolicy?.expiresOn
                ? truncatedISO8061Date(identifier.accessPolicy.expiresOn)
                : undefined,
              permissions: identifier.accessPolicy?.permissions,
              startsOn: identifier.accessPolicy?.startsOn
                ? truncatedISO8061Date(identifier.accessPolicy.startsOn)
                : undefined,
            },
            id: identifier.id,
          });
        }

        return assertResponse<ShareSetAccessPolicyHeaders, ShareSetAccessPolicyHeaders>(
          await this.context.setAccessPolicy({
            ...updatedOptions,
            shareAcl: acl,
          }),
        );
      },
    );
  }

  /**
   * Creates a read-only snapshot of a share.
   *
   * @param options - Options to Share Create Snapshot operation.
   * @returns Response data for the Share Create Snapshot operation.
   */
  public async createSnapshot(
    options: ShareCreateSnapshotOptions = {},
  ): Promise<ShareCreateSnapshotResponse> {
    return tracingClient.withSpan("ShareClient-createSnapshot", options, async (updatedOptions) => {
      return assertResponse<ShareCreateSnapshotHeaders, ShareCreateSnapshotHeaders>(
        await this.context.createSnapshot(updatedOptions),
      );
    });
  }

  /**
   * Sets quota for the specified share.
   *
   * @deprecated Use {@link ShareClient.setProperties} instead.
   *
   * @param quotaInGB - Specifies the maximum size of the share in gigabytes
   * @param option - Options to Share Set Quota operation.
   * @returns Response data for the Share Get Quota operation.
   */
  public async setQuota(
    quotaInGB: number,
    options: ShareSetQuotaOptions = {},
  ): Promise<ShareSetQuotaResponse> {
    return tracingClient.withSpan("ShareClient-setQuota", options, async (updatedOptions) => {
      return assertResponse<ShareSetPropertiesHeaders, ShareSetPropertiesHeaders>(
        await this.context.setProperties({
          ...updatedOptions,
          quota: quotaInGB,
        }),
      );
    });
  }

  /**
   * Sets properties of the share.
   *
   * @param option - Options to Share Set Properties operation.
   * @returns Response data for the Share Set Properties operation.
   */
  public async setProperties(
    options: ShareSetPropertiesOptions = {},
  ): Promise<ShareSetPropertiesResponse> {
    return tracingClient.withSpan("ShareClient-setProperties", options, async (updatedOptions) => {
      return assertResponse<ShareSetPropertiesHeaders, ShareSetPropertiesHeaders>(
        await this.context.setProperties({
          ...options,
          quota: options.quotaInGB,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Retrieves statistics related to the share.
   *
   * @param option - Options to Share Get Statistics operation.
   * @returns Response data for the Share Get Statistics operation.
   */
  public async getStatistics(
    options: ShareGetStatisticsOptions = {},
  ): Promise<ShareGetStatisticsResponse> {
    return tracingClient.withSpan("ShareClient-getStatistics", options, async (updatedOptions) => {
      const response = assertResponse<
        ShareGetStatisticsHeaders & ShareStats,
        ShareGetStatisticsHeaders,
        ShareStats
      >(await this.context.getStatistics(updatedOptions));

      const GBBytes = 1024 * 1024 * 1024;
      return { ...response, shareUsage: Math.ceil(response.shareUsageBytes / GBBytes) };
    });
  }

  /**
   * Creates a file permission (a security descriptor) at the share level.
   * The created security descriptor can be used for the files/directories in the share.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-permission
   *
   * @param options - Options to Share Create Permission operation.
   * @param filePermission - File permission described in the SDDL
   */
  public async createPermission(
    filePermission: string,
    options: ShareCreatePermissionOptions = {},
  ): Promise<ShareCreatePermissionResponse> {
    return tracingClient.withSpan(
      "ShareClient-createPermission",
      options,
      async (updatedOptions) => {
        return assertResponse<ShareCreatePermissionHeaders, ShareCreatePermissionHeaders>(
          await this.context.createPermission(
            {
              permission: filePermission,
            },
            {
              ...updatedOptions,
              ...this.shareClientConfig,
            },
          ),
        );
      },
    );
  }

  /**
   * Gets the Security Descriptor Definition Language (SDDL) for a given file permission key
   * which indicates a security descriptor.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-permission
   *
   * @param options - Options to Share Create Permission operation.
   * @param filePermissionKey - File permission key which indicates the security descriptor of the permission.
   */
  public async getPermission(
    filePermissionKey: string,
    options: ShareGetPermissionOptions = {},
  ): Promise<ShareGetPermissionResponse> {
    return tracingClient.withSpan("ShareClient-getPermission", options, async (updatedOptions) => {
      return assertResponse<
        ShareGetPermissionHeaders & SharePermission,
        ShareGetPermissionHeaders,
        SharePermission
      >(
        await this.context.getPermission(filePermissionKey, {
          ...updatedOptions,
          ...this.shareClientConfig,
        }),
      );
    });
  }

  /**
   * Only available for ShareClient constructed with a shared key credential.
   *
   * Generates a Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateSasUrl(options: ShareGenerateSasUrlOptions): string {
    if (!(this.credential instanceof StorageSharedKeyCredential)) {
      throw RangeError(
        "Can only generate the SAS when the client is initialized with a shared key credential",
      );
    }

    const sas = generateFileSASQueryParameters(
      {
        shareName: this.name,
        ...options,
      },
      this.credential,
    ).toString();

    return appendToURLQuery(this.url, sas);
  }
}

/**
 * Options to configure {@link ShareDirectoryClient.create} operation.
 */
export interface DirectoryCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the file storage object.
   */
  metadata?: Metadata;
}

export interface DirectoryProperties
  extends FileAndDirectorySetPropertiesCommonOptions,
    CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Directory - List Files and Directories Segment operations.
 *
 * See:
 * - {@link ShareDirectoryClient.iterateFilesAndDirectoriesSegments}
 * - {@link ShareDirectoryClient.listFilesAndDirectoriesItems}
 * - {@link ShareDirectoryClient.listFilesAndDirectoriesSegment}
 */
interface DirectoryListFilesAndDirectoriesSegmentOptions extends CommonOptions {
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
  /** Include this parameter to specify one or more datasets to include in the response. */
  include?: ListFilesIncludeType[];
  /**
   * Optional. Specified that extended info should be included in the returned {@link FileItem} or {@link DirectoryItem}.
   * If true, the Content-Length property will be up-to-date, FileId will be returned in response.
   */
  includeExtendedInfo?: boolean;
}

/**
 * Options to configure {@link ShareDirectoryClient.listFilesAndDirectories} operation.
 */
export interface DirectoryListFilesAndDirectoriesOptions extends CommonOptions {
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
  /*
   * Optional. Specified that time stamps should be included in the response.
   */
  includeTimestamps?: boolean;
  /*
   * Optional. Specified that ETag should be included in the response.
   */
  includeEtag?: boolean;
  /*
   * Optional. Specified that file attributes should be included in the response.
   */
  includeAttributes?: boolean;
  /*
   * Optional. Specified that permission key should be included in the response.
   */
  includePermissionKey?: boolean;
  /**
   * Optional. Specified that extended info should be included in the returned {@link FileItem} or {@link DirectoryItem}.
   * If true, the Content-Length property will be up-to-date, FileId will be returned in response.
   */
  includeExtendedInfo?: boolean;
}

/**
 * Options to configure the {@link ShareDirectoryClient.delete} operation.
 */
export interface DirectoryDeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareDirectoryClient.exists} operation.
 */
export interface DirectoryExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareDirectoryClient.getProperties} operation.
 */
export interface DirectoryGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareDirectoryClient.setMetadata} operation.
 */
export interface DirectorySetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Directory - List Handles Segment operations.
 *
 * See:
 * - {@link ShareDirectoryClient.listHandlesSegment}
 * - {@link ShareDirectoryClient.iterateHandleSegments}
 * - {@link ShareDirectoryClient.listHandleItems}
 *
 */
export interface DirectoryListHandlesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the maximum number of entries to return. If the request does not specify maxResults,
   * or specifies a value greater than 5,000, the server will return up to 5,000 items.
   */
  maxResults?: number;
  /**
   * Specifies operation should apply to the directory specified in the URI, its files, its
   * subdirectories and their files.
   */
  recursive?: boolean;
}

/**
 * Options to configure the {@link ShareDirectoryClient.listHandles} operation.
 */
export interface DirectoryListHandlesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies whether operation should apply to the directory specified in the URI, its files, its
   * subdirectories and their files.
   */
  recursive?: boolean;
}

/**
 * Options to configure Directory - Force Close Handles Segment operations.
 *
 * See:
 * - {@link ShareDirectoryClient.forceCloseHandlesSegment}
 * - {@link ShareDirectoryClient.forceCloseAllHandles}
 */
export interface DirectoryForceCloseHandlesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies operation should apply to the directory specified in the URI, its files, its
   * subdirectories and their files.
   */
  recursive?: boolean;
}

/**
 * Additional response header values for close handles request.
 */
export interface DirectoryCloseHandlesHeaders {
  /**
   * This header uniquely identifies the request that was made and can be used for troubleshooting
   * the request.
   */
  requestId?: string;
  /**
   * Indicates the version of the File service used to execute the request.
   */
  version?: string;
  /**
   * A UTC date/time value generated by the service that indicates the time at which the response
   * was initiated.
   */
  date?: Date;
  /**
   * A string describing next handle to be closed. It is returned when more handles need to be
   * closed to complete the request.
   */
  marker?: string;
}

/**
 * Response type for {@link ShareDirectoryClient.forceCloseHandle}.
 */
export type DirectoryForceCloseHandlesResponse = WithResponse<
  CloseHandlesInfo & DirectoryCloseHandlesHeaders,
  DirectoryForceCloseHandlesHeaders
>;

/**
 * Options to configure {@link ShareDirectoryClient.forceCloseHandle}.
 */
export interface DirectoryForceCloseHandlesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the {@link DirectoryClient.createIfNotExists} operation.
 */
export interface DirectoryCreateIfNotExistsResponse extends DirectoryCreateResponse {
  /**
   * Indicate whether the directory is successfully created. Is false when the directory is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link DirectoryClient.deleteIfExists} operation.
 */
export interface DirectoryDeleteIfExistsResponse extends DirectoryDeleteResponse {
  /**
   * Indicate whether the directory is successfully deleted. Is false if the directory does not exist in the first place.
   */
  succeeded: boolean;
}

/**
 * A ShareDirectoryClient represents a URL to the Azure Storage directory allowing you to manipulate its files and directories.
 */
export class ShareDirectoryClient extends StorageClient {
  /**
   * context provided by protocol layer.
   */
  private context: Directory;

  private _shareName: string;
  private _path: string;
  private _name: string;

  private shareClientConfig?: ShareClientConfig;

  /**
   * The share name corresponding to this directory client
   */
  public get shareName(): string {
    return this._shareName;
  }

  /**
   * The full path of the directory
   */
  public get path(): string {
    return this._path;
  }

  /**
   * The name of the directory
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Creates an instance of DirectoryClient.
   *
   * @param url - A URL string pointing to Azure Storage file directory, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a directory.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a directory name includes %, directory name must be encoded in the URL.
   *                     Such as a directory named "mydir%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydir%25".
   * @param credential - Such as AnonymousCredential or StorageSharedKeyCredential.
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
   * Creates an instance of DirectoryClient.
   *
   * @param url - A URL string pointing to Azure Storage file directory, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a directory.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a directory name includes %, directory name must be encoded in the URL.
   *                     Such as a directory named "mydir%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydir%25".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
  constructor(
    url: string,
    credentialOrPipeline?: Credential | TokenCredential | Pipeline,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options: ShareClientOptions = {},
  ) {
    let pipeline: Pipeline;
    if (isPipelineLike(credentialOrPipeline)) {
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
    ({
      baseName: this._name,
      shareName: this._shareName,
      path: this._path,
    } = getShareNameAndPathFromUrl(this.url));
    this.shareClientConfig = options;
    this.context = this.storageClientContext.directory;
  }

  /**
   * Creates a new directory under the specified share or parent directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param options - Options to Directory Create operation.
   * @returns Response data for the Directory  operation.
   */
  public async create(options: DirectoryCreateOptions = {}): Promise<DirectoryCreateResponse> {
    if (!options.fileAttributes) {
      options = validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions(options);
      // By default set it as a directory.
      const attributes: FileSystemAttributes = new FileSystemAttributes();
      attributes.directory = true;
      options.fileAttributes = attributes;
    }
    return tracingClient.withSpan(
      "ShareDirectoryClient-create",
      options,
      async (updatedOptions) => {
        return assertResponse<DirectoryCreateHeaders, DirectoryCreateHeaders>(
          await this.context.create(
            updatedOptions.fileAttributes
              ? fileAttributesToString(updatedOptions.fileAttributes!)
              : FileAttributesNone,
            {
              ...updatedOptions,
              fileChangeOn: fileChangeTimeToString(updatedOptions.changeTime),
              fileCreatedOn: fileCreationTimeToString(updatedOptions.creationTime),
              fileLastWriteOn: fileLastWriteTimeToString(updatedOptions.lastWriteTime),
              ...this.shareClientConfig,
            },
          ),
        );
      },
    );
  }

  /**
   * Creates a new directory under the specified share or parent directory if it does not already exists.
   * If the directory already exists, it is not modified.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param options -
   */
  public async createIfNotExists(
    options: DirectoryCreateOptions = {},
  ): Promise<DirectoryCreateIfNotExistsResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        try {
          const res = await this.create(updatedOptions);
          return {
            succeeded: true,
            ...res,
          };
        } catch (e: any) {
          if (e.details?.errorCode === "ResourceAlreadyExists") {
            return {
              succeeded: false,
              ...e.response?.parsedHeaders,
              _response: e.response,
            };
          }
          throw e;
        }
      },
    );
  }

  /**
   * Sets properties on the directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-properties
   *
   * @param DirectoryProperties - Directory properties. If no values are provided,
   *                                            existing values will be preserved.
   */
  public async setProperties(
    properties: DirectoryProperties = {},
  ): Promise<DirectorySetPropertiesResponse> {
    properties = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(properties);
    return tracingClient.withSpan(
      "ShareDirectoryClient-setProperties",
      properties,
      async (updatedOptions) => {
        return assertResponse<DirectorySetPropertiesHeaders, DirectorySetPropertiesHeaders>(
          await this.context.setProperties(
            updatedOptions.fileAttributes
              ? fileAttributesToString(updatedOptions.fileAttributes!)
              : FileAttributesPreserve,
            {
              ...updatedOptions,
              fileChangeOn: fileChangeTimeToString(updatedOptions.changeTime),
              fileCreatedOn: fileCreationTimeToString(updatedOptions.creationTime),
              fileLastWriteOn: fileLastWriteTimeToString(updatedOptions.lastWriteTime),
              ...this.shareClientConfig,
            },
          ),
        );
      },
    );
  }

  /**
   * Creates a ShareDirectoryClient object for a sub directory.
   *
   * @param subDirectoryName - A subdirectory name
   * @returns The ShareDirectoryClient object for the given subdirectory name.
   *
   * Example usage:
   *
   * ```js
   * const directoryClient = shareClient.getDirectoryClient("<directory name>");
   * await directoryClient.create();
   * console.log("Created directory successfully");
   * ```
   */
  public getDirectoryClient(subDirectoryName: string): ShareDirectoryClient {
    return new ShareDirectoryClient(
      appendToURLPath(this.url, EscapePath(subDirectoryName)),
      this.pipeline,
      this.shareClientConfig,
    );
  }

  /**
   * Creates a new subdirectory under this directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param directoryName -
   * @param options - Options to Directory Create operation.
   * @returns Directory create response data and the corresponding DirectoryClient instance.
   */
  public async createSubdirectory(
    directoryName: string,
    options: DirectoryCreateOptions = {},
  ): Promise<{
    directoryClient: ShareDirectoryClient;
    directoryCreateResponse: DirectoryCreateResponse;
  }> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-createSubdirectory",
      options,
      async (updatedOptions) => {
        const directoryClient = this.getDirectoryClient(directoryName);
        const directoryCreateResponse = await directoryClient.create(updatedOptions);
        return {
          directoryClient,
          directoryCreateResponse,
        };
      },
    );
  }

  /**
   * Removes the specified empty sub directory under this directory.
   * Note that the directory must be empty before it can be deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param directoryName -
   * @param options - Options to Directory Delete operation.
   * @returns Directory deletion response data.
   */
  public async deleteSubdirectory(
    directoryName: string,
    options: DirectoryDeleteOptions = {},
  ): Promise<DirectoryDeleteResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-deleteSubdirectory",
      options,
      async (updatedOptions) => {
        const directoryClient = this.getDirectoryClient(directoryName);
        return directoryClient.delete(updatedOptions);
      },
    );
  }

  /**
   * Creates a new file or replaces a file under this directory. Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param fileName -
   * @param size - Specifies the maximum size in bytes for the file, up to 4 TB.
   * @param options - Options to File Create operation.
   * @returns File creation response data and the corresponding file client.
   */
  public async createFile(
    fileName: string,
    size: number,
    options: FileCreateOptions = {},
  ): Promise<{ fileClient: ShareFileClient; fileCreateResponse: FileCreateResponse }> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-createFile",
      options,
      async (updatedOptions) => {
        const fileClient = this.getFileClient(fileName);
        const fileCreateResponse = await fileClient.create(size, updatedOptions);
        return {
          fileClient,
          fileCreateResponse,
        };
      },
    );
  }

  /**
   * Removes the specified file under this directory from the storage account.
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
   * @param fileName - Name of the file to delete
   * @param options - Options to File Delete operation.
   * @returns File deletion response data.
   */
  public async deleteFile(
    fileName: string,
    options: FileDeleteOptions = {},
  ): Promise<FileDeleteResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-deleteFile",
      options,
      async (updatedOptions) => {
        const fileClient = this.getFileClient(fileName);
        return fileClient.delete(updatedOptions);
      },
    );
  }

  /**
   * Creates a {@link ShareFileClient} object.
   *
   * @param fileName - A file name.
   * @returns A new ShareFileClient object for the given file name.
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello world!"
   *
   * const fileClient = directoryClient.getFileClient("<file name>");
   *
   * await fileClient.create(content.length);
   * console.log("Created file successfully!");
   *
   * await fileClient.uploadRange(content, 0, content.length);
   * console.log("Updated file successfully!")
   * ```
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients */
  public getFileClient(fileName: string): ShareFileClient {
    return new ShareFileClient(
      appendToURLPath(this.url, EscapePath(fileName)),
      this.pipeline,
      this.shareClientConfig,
    );
  }

  /**
   * Returns true if the specified directory exists; false otherwise.
   *
   * NOTE: use this function with care since an existing directory might be deleted by other clients or
   * applications. Vice versa new directories might be added by other clients or applications after this
   * function completes.
   *
   * @param options - options to Exists operation.
   */
  public async exists(options: DirectoryExistsOptions = {}): Promise<boolean> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-exists",
      options,
      async (updatedOptions) => {
        try {
          await this.getProperties({ ...updatedOptions, ...this.shareClientConfig });
          return true;
        } catch (e: any) {
          if (e.statusCode === 404) {
            return false;
          }
          throw e;
        }
      },
    );
  }

  /**
   * Returns all system properties for the specified directory, and can also be used to check the
   * existence of a directory. The data returned does not include the files in the directory or any
   * subdirectories.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-directory-properties
   *
   * @param options - Options to Directory Get Properties operation.
   * @returns Response data for the Directory Get Properties operation.
   */
  public async getProperties(
    options: DirectoryGetPropertiesOptions = {},
  ): Promise<DirectoryGetPropertiesResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-getProperties",
      options,
      async (updatedOptions) => {
        return assertResponse<DirectoryGetPropertiesHeaders, DirectoryGetPropertiesHeaders>(
          await this.context.getProperties({ ...updatedOptions, ...this.shareClientConfig }),
        );
      },
    );
  }

  /**
   * Removes the specified empty directory. Note that the directory must be empty before it can be
   * deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param options - Options to Directory Delete operation.
   * @returns Response data for the Directory Delete operation.
   */
  public async delete(options: DirectoryDeleteOptions = {}): Promise<DirectoryDeleteResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-delete",
      options,
      async (updatedOptions) => {
        return assertResponse<DirectoryDeleteHeaders, DirectoryDeleteHeaders>(
          await this.context.delete({ ...updatedOptions, ...this.shareClientConfig }),
        );
      },
    );
  }

  /**
   * Removes the specified empty directory if it exists. Note that the directory must be empty before it can be
   * deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param options -
   */
  public async deleteIfExists(
    options: DirectoryDeleteOptions = {},
  ): Promise<DirectoryDeleteIfExistsResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-deleteIfExists",
      options,
      async (updatedOptions) => {
        try {
          const res = await this.delete(updatedOptions);
          return {
            succeeded: true,
            ...res,
          };
        } catch (e: any) {
          if (
            e.details?.errorCode === "ResourceNotFound" ||
            e.details?.errorCode === "ParentNotFound"
          ) {
            return {
              succeeded: false,
              ...e.response?.parsedHeaders,
              _response: e.response,
            };
          }
          throw e;
        }
      },
    );
  }

  /**
   * Updates user defined metadata for the specified directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-metadata
   *
   * @param metadata - If no metadata provided, all existing directory metadata will be removed
   * @param options - Options to Directory Set Metadata operation.
   * @returns Response data for the Directory Set Metadata operation.
   */
  public async setMetadata(
    metadata?: Metadata,
    options: DirectorySetMetadataOptions = {},
  ): Promise<DirectorySetMetadataResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-setMetadata",
      options,
      async (updatedOptions) => {
        return assertResponse<DirectorySetMetadataHeaders, DirectorySetMetadataHeaders>(
          await this.context.setMetadata({
            ...updatedOptions,
            metadata,
            ...this.shareClientConfig,
          }),
        );
      },
    );
  }

  /**
   * Returns an AsyncIterableIterator for {@link DirectoryListFilesAndDirectoriesSegmentResponse} objects
   *
   * @param marker - A string value that identifies the portion of
   *                          the list of files and directories to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all files and directories remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to list files and directories operation.
   */
  private async *iterateFilesAndDirectoriesSegments(
    marker?: string,
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {},
  ): AsyncIterableIterator<DirectoryListFilesAndDirectoriesSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    let listFilesAndDirectoriesResponse;
    do {
      listFilesAndDirectoriesResponse = await this.listFilesAndDirectoriesSegment(marker, options);
      marker = listFilesAndDirectoriesResponse.continuationToken;
      yield await listFilesAndDirectoriesResponse;
    } while (marker);
  }

  /**
   * Returns an AsyncIterableIterator for file and directory items
   *
   * @param options - Options to list files and directories operation.
   */
  private async *listFilesAndDirectoriesItems(
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {},
  ): AsyncIterableIterator<
    ({ kind: "file" } & FileItem) | ({ kind: "directory" } & DirectoryItem)
  > {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    let marker: string | undefined;
    for await (const listFilesAndDirectoriesResponse of this.iterateFilesAndDirectoriesSegments(
      marker,
      options,
    )) {
      for (const file of listFilesAndDirectoriesResponse.segment.fileItems) {
        yield { kind: "file", ...file };
      }
      for (const directory of listFilesAndDirectoriesResponse.segment.directoryItems) {
        yield { kind: "directory", ...directory };
      }
    }
  }

  /**
   * Returns an async iterable iterator to list all the files and directories
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the files and directories in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * for await (const entity of directoryClient.listFilesAndDirectories()) {
   *   if (entity.kind === "directory") {
   *     console.log(`${i++} - directory\t: ${entity.name}`);
   *   } else {
   *     console.log(`${i++} - file\t: ${entity.name}`);
   *   }
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = directoryClient.listFilesAndDirectories();
   * let entity = await iter.next();
   * while (!entity.done) {
   *   if (entity.value.kind === "directory") {
   *     console.log(`${i++} - directory\t: ${entity.value.name}`);
   *   } else {
   *     console.log(`${i++} - file\t: ${entity.value.name}`);
   *   }
   *   entity = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of directoryClient
   *   .listFilesAndDirectories()
   *   .byPage({ maxPageSize: 20 })) {
   *   for (const fileItem of response.segment.fileItems) {
   *     console.log(`${i++} - file\t: ${fileItem.name}`);
   *   }
   *   for (const dirItem of response.segment.directoryItems) {
   *     console.log(`${i++} - directory\t: ${dirItem.name}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = directoryClient.listFilesAndDirectories().byPage({ maxPageSize: 3 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 3 file and directory names
   * for (const fileItem of response.segment.fileItems) {
   *   console.log(`${i++} - file\t: ${fileItem.name}`);
   * }
   *
   * for (const dirItem of response.segment.directoryItems) {
   *   console.log(`${i++} - directory\t: ${dirItem.name}`);
   * }
   *
   * // Gets next marker
   * let dirMarker = response.continuationToken;
   *
   * // Passing next marker as continuationToken
   * iterator = directoryClient
   *   .listFilesAndDirectories()
   *   .byPage({ continuationToken: dirMarker, maxPageSize: 4 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 file and directory names
   * for (const fileItem of response.segment.fileItems) {
   *   console.log(`${i++} - file\t: ${fileItem.name}`);
   * }
   *
   * for (const dirItem of response.segment.directoryItems) {
   *   console.log(`${i++} - directory\t: ${dirItem.name}`);
   * }
   * ```
   *
   * @param options - Options to list files and directories operation.
   * @returns An asyncIterableIterator that supports paging.
   */
  public listFilesAndDirectories(
    options: DirectoryListFilesAndDirectoriesOptions = {},
  ): PagedAsyncIterableIterator<
    ({ kind: "file" } & FileItem) | ({ kind: "directory" } & DirectoryItem),
    DirectoryListFilesAndDirectoriesSegmentResponse
  > {
    const include: ListFilesIncludeType[] = [];
    if (options.includeTimestamps) {
      include.push("Timestamps");
    }
    if (options.includeEtag) {
      include.push("Etag");
    }
    if (options.includeAttributes) {
      include.push("Attributes");
    }
    if (options.includePermissionKey) {
      include.push("PermissionKey");
    }
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    const updatedOptions: DirectoryListFilesAndDirectoriesSegmentOptions = {
      ...options,
      ...(include.length > 0 ? { include: include } : {}),
    };

    // AsyncIterableIterator to iterate over files and directories
    const iter = this.listFilesAndDirectoriesItems(updatedOptions);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      async next() {
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
        return this.iterateFilesAndDirectoriesSegments(
          removeEmptyString(settings.continuationToken),
          {
            maxResults: settings.maxPageSize,
            ...updatedOptions,
          },
        );
      },
    };
  }

  /**
   * Returns a list of files or directories under the specified share or directory. It lists the
   * contents only for a single level of the directory hierarchy.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-directories-and-files
   *
   * @param marker - A string value that identifies the portion of the list to be returned with the next list operation.
   * @param options - Options to Directory List Files and Directories Segment operation.
   * @returns Response data for the Directory List Files and Directories operation.
   */
  private async listFilesAndDirectoriesSegment(
    marker?: string,
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {},
  ): Promise<DirectoryListFilesAndDirectoriesSegmentResponse> {
    if (options.prefix === "") {
      options.prefix = undefined;
    }
    return tracingClient.withSpan(
      "ShareDirectoryClient-listFilesAndDirectoriesSegment",
      options,
      async (updatedOptions) => {
        const rawResponse = assertResponse<
          DirectoryListFilesAndDirectoriesSegmentHeaders &
            GeneratedListFilesAndDirectoriesSegmentResponse,
          DirectoryListFilesAndDirectoriesSegmentHeaders,
          GeneratedListFilesAndDirectoriesSegmentResponse
        >(
          await this.context.listFilesAndDirectoriesSegment({
            ...updatedOptions,
            marker,
            ...this.shareClientConfig,
          }),
        );
        const wrappedResponse: DirectoryListFilesAndDirectoriesSegmentResponse = {
          ...ConvertInternalResponseOfListFiles(rawResponse),
          _response: {
            ...rawResponse._response,
            parsedBody: ConvertInternalResponseOfListFiles(rawResponse._response.parsedBody),
          }, // _response is made non-enumerable
        };
        return wrappedResponse;
      },
    );
  }

  /**
   * Returns an AsyncIterableIterator for {@link DirectoryListHandlesResponse}
   *
   * @param marker - A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param options - Options to list handles operation.
   */
  private async *iterateHandleSegments(
    marker?: string,
    options: DirectoryListHandlesSegmentOptions = {},
  ): AsyncIterableIterator<DirectoryListHandlesResponse> {
    let listHandlesResponse;
    if (!!marker || marker === undefined) {
      do {
        listHandlesResponse = await this.listHandlesSegment(marker, options);
        marker = listHandlesResponse.continuationToken;
        yield await listHandlesResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator for handles
   *
   * @param options - Options to list handles operation.
   */
  private async *listHandleItems(
    options: DirectoryListHandlesSegmentOptions = {},
  ): AsyncIterableIterator<HandleItem> {
    let marker: string | undefined;
    for await (const listHandlesResponse of this.iterateHandleSegments(marker, options)) {
      if (listHandlesResponse.handleList) {
        for (const handle of listHandlesResponse.handleList) {
          yield handle;
        }
      }
    }
  }

  /**
   * Returns an async iterable iterator to list all the handles.
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the handles in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * let iter = dirClient.listHandles();
   * for await (const handle of iter) {
   *   console.log(`Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = dirClient.listHandles();
   * let handleItem = await iter.next();
   * while (!handleItem.done) {
   *   console.log(`Handle ${i++}: ${handleItem.value.path}, opened time ${handleItem.value.openTime}, clientIp ${handleItem.value.clientIp}`);
   *   handleItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of dirClient.listHandles({ recursive: true }).byPage({ maxPageSize: 20 })) {
   *   if (response.handleList) {
   *     for (const handle of response.handleList) {
   *       console.log(`Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = dirClient.listHandles().byPage({ maxPageSize: 2 });
   * let response = await iterator.next();
   *
   * // Prints 2 handles
   * if (response.value.handleList) {
   *   for (const handle of response.value.handleList) {
   *     console.log(`Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`);
   *   }
   * }
   *
   * // Gets next marker
   * let marker = response.value.continuationToken;
   *
   * // Passing next marker as continuationToken
   * console.log(`    continuation`);
   * iterator = dirClient.listHandles().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = await iterator.next();
   *
   * // Prints 2 more handles assuming you have more than four directory/files opened
   * if (!response.done && response.value.handleList) {
   *   for (const handle of response.value.handleList) {
   *     console.log(`Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`);
   *   }
   * }
   * ```
   *
   * @param options - Options to list handles operation.
   *
   * An asyncIterableIterator that supports paging.
   */
  public listHandles(
    options: DirectoryListHandlesOptions = {},
  ): PagedAsyncIterableIterator<HandleItem, DirectoryListHandlesResponse> {
    // an AsyncIterableIterator to iterate over handles
    const iter = this.listHandleItems(options);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      async next() {
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
        return this.iterateHandleSegments(removeEmptyString(settings.continuationToken), {
          maxResults: settings.maxPageSize,
          ...options,
        });
      },
    };
  }

  /**
   * Lists handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-handles
   *
   * @param marker - Optional. A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param options -
   */
  private async listHandlesSegment(
    marker?: string,
    options: DirectoryListHandlesSegmentOptions = {},
  ): Promise<DirectoryListHandlesResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-listHandlesSegment",
      options,
      async (updatedOptions) => {
        marker = marker === "" ? undefined : marker;
        const response = assertResponse<
          DirectoryListHandlesHeaders & GeneratedListHandlesResponse,
          DirectoryListHandlesHeaders,
          GeneratedListHandlesResponse
        >(
          await this.context.listHandles({
            ...updatedOptions,
            marker,
            ...this.shareClientConfig,
          }),
        );

        // TODO: Protocol layer issue that when handle list is in returned XML
        // response.handleList is an empty string
        if ((response.handleList as any) === "") {
          response.handleList = undefined;
        }
        const wrappedResponse: DirectoryListHandlesResponse = {
          ...ConvertInternalResponseOfListHandles(response),
          _response: {
            ...response._response,
            parsedBody: ConvertInternalResponseOfListHandles(response._response.parsedBody),
          },
        };

        return wrappedResponse;
      },
    );
  }

  /**
   * Force close all handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param marker - Optional. A string value that identifies the position of handles that will
   *                          be closed with the next force close handles operation.
   *                          The operation returns a marker value within the response
   *                          body if there are more handles to close. The marker value
   *                          may then be used in a subsequent call to close the next set of handles.
   * @param options -
   */
  private async forceCloseHandlesSegment(
    marker?: string,
    options: DirectoryForceCloseHandlesSegmentOptions = {},
  ): Promise<DirectoryForceCloseHandlesResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-forceCloseHandlesSegment",
      options,
      async (updatedOptions) => {
        if (marker === "") {
          marker = undefined;
        }
        const rawResponse = assertResponse<
          DirectoryForceCloseHandlesHeaders,
          DirectoryForceCloseHandlesHeaders
        >(
          await this.context.forceCloseHandles("*", {
            ...updatedOptions,
            marker,
            ...this.shareClientConfig,
          }),
        );
        return {
          ...rawResponse,
          closedHandlesCount: rawResponse.numberOfHandlesClosed ?? 0,
          closeFailureCount: rawResponse.numberOfHandlesFailedToClose ?? 0,
        };
      },
    );
  }

  /**
   * Force close all handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param options -
   */
  public async forceCloseAllHandles(
    options: DirectoryForceCloseHandlesSegmentOptions = {},
  ): Promise<CloseHandlesInfo> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-forceCloseAllHandles",
      options,
      async (updatedOptions) => {
        let handlesClosed = 0;
        let numberOfHandlesFailedToClose = 0;
        let marker: string | undefined = "";

        do {
          const response = await this.forceCloseHandlesSegment(marker, updatedOptions);
          marker = response.marker;
          if (response.closedHandlesCount) {
            handlesClosed += response.closedHandlesCount;
          }
          if (response.closeFailureCount) {
            numberOfHandlesFailedToClose += response.closeFailureCount;
          }
        } while (marker);

        return {
          closedHandlesCount: handlesClosed,
          closeFailureCount: numberOfHandlesFailedToClose,
        };
      },
    );
  }

  /**
   * Force close a specific handle for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param aborter - Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param handleId - Specific handle ID, cannot be asterisk "*".
   *                          Use forceCloseHandlesSegment() to close all handles.
   * @param options -
   */
  public async forceCloseHandle(
    handleId: string,
    options: DirectoryForceCloseHandlesOptions = {},
  ): Promise<DirectoryForceCloseHandlesResponse> {
    return tracingClient.withSpan(
      "ShareDirectoryClient-forceCloseHandle",
      options,
      async (updatedOptions) => {
        if (handleId === "*") {
          throw new RangeError(
            `Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.`,
          );
        }

        const rawResponse = await this.context.forceCloseHandles(handleId, {
          ...updatedOptions,
          ...this.shareClientConfig,
        });
        const response = rawResponse as DirectoryForceCloseHandlesResponse;
        response.closedHandlesCount = rawResponse.numberOfHandlesClosed || 0;
        response.closeFailureCount = rawResponse.numberOfHandlesFailedToClose || 0;
        return response;
      },
    );
  }

  /**
   * Renames a directory.
   * This API only supports renaming a directory in the same share.
   *
   * @param destinationPath - Specifies the destination path to rename to. The path will be encoded to put into a URL to specify the destination.
   * @param options - Options for the renaming operation.
   * @returns Response data for the file renaming operation.
   *
   * Example usage:
   *
   * ```js
   *
   * // Rename the directory
   * await diretoryClient.rename(destinationPath);
   * console.log("Renamed directory successfully!");
   * ```
   */
  public async rename(
    destinationPath: string,
    options: DirectoryRenameOptions = {},
  ): Promise<{
    destinationDirectoryClient: ShareDirectoryClient;
    directoryRenameResponse: DirectoryRenameResponse;
  }> {
    const split: string[] = destinationPath.split("?");
    let destinationUrl: string;
    if (split.length === 2) {
      const pathOnly = EscapePath(split[0]);
      const renameDestination = `/${this.shareName}/${pathOnly}`;
      destinationUrl = setURLPath(this.url, renameDestination);
      destinationUrl = setURLQueries(destinationUrl, split[1]);
    } else if (split.length === 1) {
      const pathOnly = EscapePath(destinationPath);
      const renameDestination = `/${this.shareName}/${pathOnly}`;
      destinationUrl = setURLPath(this.url, renameDestination);
    } else {
      throw new RangeError("Destination path should not contain more than one query string");
    }

    const destDirectory = new ShareDirectoryClient(
      destinationUrl,
      this.pipeline,
      this.shareClientConfig,
    );

    return tracingClient.withSpan(
      "ShareDirectoryClient-rename",
      options,
      async (updatedOptions) => {
        const response = assertResponse<DirectoryRenameHeaders, DirectoryRenameHeaders>(
          await destDirectory.context.rename(this.url, {
            ...updatedOptions,
            sourceLeaseAccessConditions: updatedOptions.sourceLeaseAccessConditions
              ? {
                  sourceLeaseId: updatedOptions.sourceLeaseAccessConditions.leaseId,
                }
              : undefined,
            destinationLeaseAccessConditions: updatedOptions.destinationLeaseAccessConditions
              ? {
                  destinationLeaseId: updatedOptions.destinationLeaseAccessConditions.leaseId,
                }
              : undefined,
            ...this.shareClientConfig,
          }),
        );

        return {
          destinationDirectoryClient: destDirectory,
          directoryRenameResponse: response,
        };
      },
    );
  }
}

/**
 * Options to configure the {@link ShareFileClient.create} operation.
 */
export interface FileCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * File HTTP headers like Content-Type.
   */
  fileHttpHeaders?: FileHttpHeaders;

  /**
   * A collection of key-value string pair to associate with the file storage object.
   */
  metadata?: Metadata;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

export interface FileProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * File HTTP headers like Content-Type.
   */
  fileHttpHeaders?: FileHttpHeaders;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

export interface SetPropertiesResponse extends FileSetHTTPHeadersResponse {}

/**
 * Options to configure the {@link ShareFileClient.delete} operation.
 */
export interface FileDeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure File - Download operations.
 *
 * See:
 * - {@link ShareFileClient.download}
 * - {@link ShareFileClient.downloadToFile}
 */
export interface FileDownloadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional ShareFileClient.download() request will be made
   * from the broken point, until the requested range has been successfully downloaded or maxRetryRequests is reached.
   *
   * Default value is 5, please set a larger value when loading large files in poor network.
   */
  maxRetryRequests?: number;

  /**
   * When this header is set to true and
   * specified together with the Range header, the service returns the MD5 hash
   * for the range, as long as the range is less than or equal to 4 MB in size.
   */
  rangeGetContentMD5?: boolean;

  /**
   * Download progress updating event handler.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.uploadRange} operation.
 */
export interface FileUploadRangeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * An MD5 hash of the content. This hash is
   * used to verify the integrity of the data during transport. When the
   * Content-MD5 header is specified, the File service compares the hash of the
   * content that has arrived with the header value that was sent. If the two
   * hashes do not match, the operation will fail with error code 400 (Bad
   * Request).
   */
  contentMD5?: Uint8Array;

  /**
   * Progress updating event handler.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;

  /**
   * The last write time for the file.
   * A value of Preserve may be passed to keep an existing value unchanged.
   * A value of Now may be used to indicate the time of the request.
   * By default, the value will be set as Now.
   */
  fileLastWrittenMode?: FileLastWrittenMode;
}

/**
 * Options to configure the {@link ShareFileClient.uploadRangeFromURL} operation.
 */
export interface FileUploadRangeFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * The timeout parameter is expressed in seconds. For more information, see <a
   * href="https://docs.microsoft.com/en-us/rest/api/storageservices/Setting-Timeouts-for-File-Service-Operations?redirectedfrom=MSDN">Setting
   * Timeouts for File Service Operations.</a>
   */
  timeoutInSeconds?: number;
  /**
   * Specify the crc64 calculated for the range of bytes that must be read from the copy source.
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Additional parameters for the operation
   */
  sourceConditions?: SourceModifiedAccessConditions;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
  /**
   * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
   */
  sourceAuthorization?: HttpAuthorization;
  /**
   * The last write time for the file.
   * A value of preserve may be passed to keep an existing value unchanged.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set as now.
   */
  fileLastWrittenMode?: FileLastWrittenMode;
}

/**
 * The option is defined as parity to REST definition.
 * While it's not ready to be used now, considering Crc64 of source content is
 * not accessible.
 */
// export interface IFileUploadRangeFromURLOptions extends CommonOptions {
//   /**
//    * Crc64 of the source content.
//    *
//    * @type {Uint8Array}
//    * @memberof IFileUploadRangeFromURLOptions
//    */
//   sourceContentCrc64?: Uint8Array;

//   /**
//    * Source modified access condition.
//    *
//    * @type {SourceModifiedAccessConditions}
//    * @memberof IFileUploadRangeFromURLOptions
//    */
//   sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
// }

/**
 * Options to configure the {@link ShareFileClient.getRangeList} operation.
 */
export interface FileGetRangeListOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Optional. Specifies the range of bytes over which to list ranges, inclusively.
   */
  range?: Range;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
  /**
   * This header is allowed only when prevShareSnapshot parameter is set.
   * Determines whether the changed ranges for a file that has been renamed or moved between the target snapshot (or the live file) and the previous snapshot should be listed.
   * If the value is true, the valid changed ranges for the file will be returned. If the value is false, the operation will result in a failure with 409 (Conflict) response.
   * The default value is false.
   */
  includeRenames?: boolean;
}

/**
 * Options to configure the {@link ShareFileClient.exists} operation.
 */
export interface FileExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareFileClient.getProperties} operation.
 */
export interface FileGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Contains response data for the {@link ShareFileClient.getRangeList} operation.
 */
export type FileGetRangeListResponse = WithResponse<
  FileGetRangeListHeaders & {
    /**
     * Range list for an Azure file.
     */
    rangeList: RangeModel[];
  },
  FileGetRangeListHeaders,
  RangeModel[]
>;

/**
 * Options to configure the {@link ShareFileClient.startCopyFromURL} operation.
 */
export interface FileStartCopyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the file storage object.
   */
  metadata?: Metadata;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
  /**
   * If specified the permission (security descriptor) shall be set for the directory/file. This
   * header can be used if Permission size is lesser than or equal to 8KB, else x-ms-file-permission-key header shall be
   * used. Default value: Inherit. If SDDL is specified as input, it must have owner, group and
   * dacl. Note: Only one of the x-ms-file-permission or x-ms-file-permission-key should be
   * specified.
   */
  filePermission?: string;
  /**
   * Key of the permission to be set for the directory/file. Note: Only one of the
   * x-ms-file-permission or x-ms-file-permission-key should be specified.
   */
  filePermissionKey?: string;
  /**
   * SMB info.
   */
  copyFileSmbInfo?: CopyFileSmbInfo;
}

/**
 * Options to configure the {@link ShareFileClient.setMetadata} operation.
 */
export interface FileSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.setHttpHeaders} operation.
 */
export interface FileSetHttpHeadersOptions
  extends FileAndDirectorySetPropertiesCommonOptions,
    CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.abortCopyFromURL} operation.
 */
export interface FileAbortCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.resize} operation.
 */
export interface FileResizeOptions
  extends FileAndDirectorySetPropertiesCommonOptions,
    CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link ShareFileClient.clearRange} operation.
 */
export interface FileClearRangeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
  /**
   * The last write time for the file.
   * A value of preserve may be passed to keep an existing value unchanged.
   * A value of now may be used to indicate the time of the request.
   * By default, the value will be set as now.
   */
  fileLastWrittenMode?: FileLastWrittenMode;
}

/**
 * Options to configure File - List Handles Segment operations.
 *
 * See:
 * - {@link ShareFileClient.listHandlesSegment}
 * - {@link ShareFileClient.iterateHandleSegments}
 * - {@link ShareFileClient.listHandleItems}
 */
export interface FileListHandlesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the maximum number of entries to return. If the request does not specify maxResults,
   * or specifies a value greater than 5,000, the server will return up to 5,000 items.
   */
  maxPageSize?: number;
}

export interface FileListHandlesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure File - Force Close Handles operations.
 *
 * See:
 * - {@link ShareFileClient.forceCloseHandlesSegment}
 * - {@link ShareFileClient.forceCloseAllHandles}
 * - {@link ShareFileClient.forceCloseHandle}
 */
export interface FileForceCloseHandlesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Additional response header values for close handles request.
 */
export interface FileCloseHandlesHeaders {
  /**
   * This header uniquely identifies the request that was made and can be used for troubleshooting
   * the request.
   */
  requestId?: string;
  /**
   * Indicates the version of the File service used to execute the request.
   */
  version?: string;
  /**
   * A UTC date/time value generated by the service that indicates the time at which the response
   * was initiated.
   */
  date?: Date;
  /**
   * A string describing next handle to be closed. It is returned when more handles need to be
   * closed to complete the request.
   */
  marker?: string;
}

/**
 * Response type for {@link ShareFileClient.forceCloseHandle}.
 */
export type FileForceCloseHandlesResponse = WithResponse<
  CloseHandlesInfo & FileCloseHandlesHeaders,
  FileForceCloseHandlesHeaders
>;

/**
 * Option interface for ShareFileClient.uploadStream().
 */
export interface FileUploadStreamOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Azure File HTTP Headers.
   */
  fileHttpHeaders?: FileHttpHeaders;

  /**
   * Metadata of the Azure file.
   */
  metadata?: Metadata;

  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Option interface for File - Upload operations
 *
 * See:
 * - {@link ShareFileClient.uploadFile}
 * - {@link ShareFileClient.uploadSeekableStream}
 */
export interface FileParallelUploadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * RangeSize specifies the range size to use in each parallel upload,
   * the default (and maximum size) is FILE_RANGE_MAX_SIZE_BYTES.
   */
  rangeSize?: number;

  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * File HTTP Headers.
   */
  fileHttpHeaders?: FileHttpHeaders;

  /**
   * Metadata of an Azure file.
   */
  metadata?: Metadata;

  /**
   * Concurrency indicates the maximum number of ranges to upload in parallel.
   * If not provided, 5 concurrency will be used by default.
   */
  concurrency?: number;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Option interface for the {@link ShareFileClient.downloadToBuffer} operation.
 */
export interface FileDownloadToBufferOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * When downloading Azure files, download method will try to split large file into small ranges.
   * Every small range will be downloaded via a separate request.
   * This option defines size data every small request trying to download.
   * Must be greater than 0, will use the default value if undefined,
   */
  rangeSize?: number;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original range download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional ShareFileClient.download() request will be made
   * from the broken point, until the requested range has been successfully downloaded or
   * maxRetryRequestsPerRange is reached.
   *
   * Default value is 5, please set a larger value when in poor network.
   */
  maxRetryRequestsPerRange?: number;

  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Concurrency indicates the maximum number of ranges to download in parallel.
   * If not provided, 5 concurrency will be used by default.
   */
  concurrency?: number;
  /**
   * Lease access conditions.
   */
  leaseAccessConditions?: LeaseAccessConditions;
}

/**
 * Contains response data for the {@link ShareFileClient.deleteIfExists} operation.
 */
export interface FileDeleteIfExistsResponse extends FileDeleteResponse {
  /**
   * Indicate whether the file is successfully deleted. Is false if the file does not exist in the first place.
   */
  succeeded: boolean;
}

/**
 * Options to configure {@link ShareFileClient.generateSasUrl} operation.
 */
export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
  /**
   * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: FileSASPermissions;
}

/**
 * Options to configure the {@link ShareFileClient.rename} operation.
 */
export interface FileRenameOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Lease access condition for source file. Required if the source file has an active infinite lease.
   */
  sourceLeaseAccessConditions?: LeaseAccessConditions;

  /**
   * Lease access condition for destination file. Required if the destination file has an active infinite lease.
   */
  destinationLeaseAccessConditions?: LeaseAccessConditions;

  /**
   * Optional.
   * Specifies the option to copy file security descriptor from source file or to set it using the value which is defined by the header value of x-ms-file-permission or x-ms-file-permission-key.
   */
  copyFileSmbInfo?: CopyFileSmbInfo;

  /**
   * A name-value pair to associate with a file storage object.
   */
  metadata?: Metadata;

  /**
   * Optional.
   * The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/Setting-Timeouts-for-File-Service-Operations?redirectedfrom=MSDN">Setting Timeouts for File Service Operations.</a>
   */
  timeoutInSeconds?: number;

  /**
   * Optional.
   * If specified the permission (security descriptor) shall be set for the directory/file.
   */
  filePermission?: string;

  /**
   * Optional.
   * Key of the permission to be set for the directory/file. Note: Only one of the filePermission or filePermissionKey should be specified.
   */
  filePermissionKey?: string;

  /**
   * Optional.
   * A boolean value for if the destination file already exists, whether this request will overwrite the file or not. If true, the rename will succeed and will overwrite the destination file. If not provided or if false and the destination file does exist, the request will not overwrite the destination file. If provided and the destination file doesn’t exist, the rename will succeed. Note: This value does not override the x-ms-file-copy-ignore-read-only header value.
   */
  replaceIfExists?: boolean;

  /**
   * Optional.
   * A boolean value that specifies whether the ReadOnly attribute on a preexisting destination file should be respected. If true, the rename will succeed, otherwise, a previous file at the destination with the ReadOnly attribute set will cause the rename to fail.
   */
  ignoreReadOnly?: boolean;

  /**
   * Optional.
   * Content type to set on the File.
   */
  contentType?: string;
}

/**
 * Options to configure the {@link ShareDirectoryClient.rename} operation.
 */
export interface DirectoryRenameOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Lease access condition for source file. Required if the source file has an active infinite lease.
   */
  sourceLeaseAccessConditions?: LeaseAccessConditions;

  /**
   * Lease access condition for destination file. Required if the destination file has an active infinite lease.
   */
  destinationLeaseAccessConditions?: LeaseAccessConditions;

  /**
   * Optional.
   * Specifies the option to copy file security descriptor from source file or to set it using the value which is defined by the header value of x-ms-file-permission or x-ms-file-permission-key.
   */
  copyFileSmbInfo?: CopyFileSmbInfo;

  /**
   * Optional.
   * The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/Setting-Timeouts-for-File-Service-Operations?redirectedfrom=MSDN">Setting Timeouts for File Service Operations.</a>
   */
  timeoutInSeconds?: number;

  /**
   * Optional.
   * A name-value pair to associate with a file storage object.
   */
  metadata?: Metadata;

  /**
   * Optional.
   * If specified the permission (security descriptor) shall be set for the directory/file.
   */
  filePermission?: string;

  /**
   * Optional.
   * Key of the permission to be set for the directory/file. Note: Only one of the filePermission or filePermissionKey should be specified.
   */
  filePermissionKey?: string;
  /**
   * Optional.
   * A boolean value for if the destination file already exists, whether this request will overwrite the file or not. If true, the rename will succeed and will overwrite the destination file. If not provided or if false and the destination file does exist, the request will not overwrite the destination file. If provided and the destination file doesn’t exist, the rename will succeed. Note: This value does not override the x-ms-file-copy-ignore-read-only header value.
   */
  replaceIfExists?: boolean;

  /**
   * Optional.
   * A boolean value that specifies whether the ReadOnly attribute on a preexisting destination file should be respected. If true, the rename will succeed, otherwise, a previous file at the destination with the ReadOnly attribute set will cause the rename to fail.
   */
  ignoreReadOnly?: boolean;
}

/**
 * A ShareFileClient represents a URL to an Azure Storage file.
 */
export class ShareFileClient extends StorageClient {
  /**
   * context provided by protocol layer.
   */
  private context: File;

  private _shareName: string;
  private _path: string;
  private _name: string;

  private shareClientConfig?: ShareClientConfig;

  /**
   * The share name corresponding to this file client
   */
  public get shareName(): string {
    return this._shareName;
  }

  /**
   * The full path of the file
   */
  public get path(): string {
    return this._path;
  }

  /**
   * The name of the file
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Creates an instance of ShareFileClient.
   *
   * @param url - A URL string pointing to Azure Storage file, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a file.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a file or directory name includes %, file or directory name must be encoded in the URL.
   *                     Such as a file named "myfile%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydirectory/myfile%25".
   * @param credential - Such as , StorageSharedKeyCredential or TokenCredential,
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
   * Creates an instance of ShareFileClient.
   *
   * @param url - A URL string pointing to Azure Storage file, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory/file?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a file.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a file or directory name includes %, file or directory name must be encoded in the URL.
   *                     Such as a file named "myfile%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydirectory/myfile%25".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
  constructor(
    url: string,
    credentialOrPipeline?: Credential | TokenCredential | Pipeline,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: ShareClientOptions,
  ) {
    let pipeline: Pipeline;
    if (isPipelineLike(credentialOrPipeline)) {
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
    ({
      baseName: this._name,
      shareName: this._shareName,
      path: this._path,
    } = getShareNameAndPathFromUrl(this.url));
    this.shareClientConfig = options;
    this.context = this.storageClientContext.file;
  }

  /**
   * Creates a new ShareFileClient object identical to the source but with the specified share snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base ShareFileClient.
   *
   * @param shareSnapshot - The share snapshot timestamp.
   * @returns A new ShareFileClient object identical to the source but with the specified share snapshot timestamp.
   */
  public withShareSnapshot(shareSnapshot: string): ShareFileClient {
    return new ShareFileClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SHARE_SNAPSHOT,
        shareSnapshot.length === 0 ? undefined : shareSnapshot,
      ),
      this.pipeline,
      this.shareClientConfig,
    );
  }

  /**
   * Creates a new file or replaces a file. Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param size - Specifies the maximum size in bytes for the file, up to 4 TB.
   * @param options - Options to File Create operation.
   * @returns Response data for the File Create  operation.
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello world!";
   *
   * // Create the file
   * await fileClient.create(content.length);
   * console.log("Created file successfully!");
   *
   * // Then upload data to the file
   * await fileClient.uploadRange(content, 0, content.length);
   * console.log("Updated file successfully!")
   * ```
   */
  public async create(size: number, options: FileCreateOptions = {}): Promise<FileCreateResponse> {
    if (size < 0 || size > FILE_MAX_SIZE_BYTES) {
      throw new RangeError(`File size must >= 0 and < ${FILE_MAX_SIZE_BYTES}.`);
    }
    options = validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions(options);

    options.fileHttpHeaders = options.fileHttpHeaders || {};
    return tracingClient.withSpan("ShareFileClient-create", options, async (updatedOptions) => {
      return assertResponse<FileCreateHeaders, FileCreateHeaders>(
        await this.context.create(
          size,
          updatedOptions.fileAttributes
            ? fileAttributesToString(updatedOptions.fileAttributes!)
            : FileAttributesNone,
          {
            ...updatedOptions,
            fileChangeOn: fileChangeTimeToString(updatedOptions.changeTime),
            fileCreatedOn: fileCreationTimeToString(updatedOptions.creationTime),
            fileLastWriteOn: fileLastWriteTimeToString(updatedOptions.lastWriteTime),
            ...this.shareClientConfig,
          },
        ),
      );
    });
  }

  /**
   * Reads or downloads a file from the system, including its metadata and properties.
   *
   * * In Node.js, data returns in a Readable stream `readableStreamBody`
   * * In browsers, data returns in a promise `contentAsBlob`
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file
   *
   * @param offset - From which position of the file to download, greater than or equal to 0
   * @param count - How much data to be downloaded, greater than 0. Will download to the end when undefined
   * @param options - Options to File Download operation.
   * @returns Response data for the File Download operation.
   *
   * Example usage (Node.js):
   *
   * ```js
   * // Download a file to a string
   * const downloadFileResponse = await fileClient.download();
   * console.log(
   *   "Downloaded file content:",
   *   (await streamToBuffer(downloadFileResponse.readableStreamBody)).toString()}
   * );
   *
   * // A helper method used to read a Node.js readable stream into string
   * async function streamToBuffer(readableStream) {
   *   return new Promise((resolve, reject) => {
   *     const chunks = [];
   *     readableStream.on("data", (data) => {
   *       chunks.push(data instanceof Buffer ? data : Buffer.from(data));
   *     });
   *     readableStream.on("end", () => {
   *       resolve(Buffer.concat(chunks));
   *     });
   *     readableStream.on("error", reject);
   *   });
   * }
   * ```
   *
   * Example usage (browsers):
   *
   * ```js
   * // Download a file to a string
   * const downloadFileResponse = await fileClient.download(0);
   * console.log(
   *   "Downloaded file content:",
   *   await blobToString(await downloadFileResponse.blobBody)}
   * );
   *
   * // A helper method used to convert a browser Blob into string.
   * export async function blobToString(blob: Blob): Promise<string> {
   *   const fileReader = new FileReader();
   *   return new Promise<string>((resolve, reject) => {
   *     fileReader.onloadend = (ev: any) => {
   *       resolve(ev.target!.result);
   *     };
   *     fileReader.onerror = reject;
   *     fileReader.readAsText(blob);
   *   });
   * }
   * ```
   */
  public async download(
    offset: number = 0,
    count?: number,
    options: FileDownloadOptions = {},
  ): Promise<FileDownloadResponseModel> {
    return tracingClient.withSpan("ShareFileClient-download", options, async (updatedOptions) => {
      if (updatedOptions.rangeGetContentMD5 && offset === 0 && count === undefined) {
        throw new RangeError(`rangeGetContentMD5 only works with partial data downloading`);
      }

      const downloadFullFile = offset === 0 && !count;
      const res = assertResponse<RawFileDownloadResponse, FileDownloadHeaders>(
        await this.context.download({
          ...updatedOptions,
          requestOptions: {
            onDownloadProgress: isNode ? undefined : updatedOptions.onProgress, // for Node.js, progress is reported by RetriableReadableStream
          },
          range: downloadFullFile ? undefined : rangeToString({ offset, count }),
          ...this.shareClientConfig,
        }),
      );

      // Return browser response immediately
      if (!isNode) {
        return res;
      }

      // We support retrying when download stream unexpected ends in Node.js runtime
      // Following code shouldn't be bundled into browser build, however some
      // bundlers may try to bundle following code and "FileReadResponse.ts".
      // In this case, "FileDownloadResponse.browser.ts" will be used as a shim of "FileDownloadResponse.ts"
      // The config is in package.json "browser" field
      if (updatedOptions.maxRetryRequests === undefined || updatedOptions.maxRetryRequests < 0) {
        // TODO: Default value or make it a required parameter?
        updatedOptions.maxRetryRequests = DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS;
      }

      if (res.contentLength === undefined) {
        throw new RangeError(`File download response doesn't contain valid content length header`);
      }

      return new FileDownloadResponse(
        res,
        async (start: number): Promise<NodeJS.ReadableStream> => {
          const updatedDownloadOptions: FileDownloadOptionalParams = {
            range: rangeToString({
              count: offset + res.contentLength! - start,
              offset: start,
            }),
          };

          // Debug purpose only
          // console.log(
          //   `Read from internal stream, range: ${
          //     chunkDownloadOptions.range
          //   }, options: ${JSON.stringify(chunkDownloadOptions)}`
          // );

          const downloadRes = await this.context.download({
            ...updatedOptions,
            ...updatedDownloadOptions,
            ...this.shareClientConfig, // TODO: confirm whether this is needed
          });

          if (!(downloadRes.etag === res.etag)) {
            throw new Error("File has been modified concurrently");
          }
          return downloadRes.readableStreamBody!;
        },
        offset,
        res.contentLength!,
        {
          maxRetryRequests: updatedOptions.maxRetryRequests,
          onProgress: updatedOptions.onProgress,
        },
      );
    });
  }

  /**
   * Returns true if the specified file exists; false otherwise.
   *
   * NOTE: use this function with care since an existing file might be deleted by other clients or
   * applications. Vice versa new files might be added by other clients or applications after this
   * function completes.
   *
   * @param options - options to Exists operation.
   */
  public async exists(options: FileExistsOptions = {}): Promise<boolean> {
    return tracingClient.withSpan("ShareFileClient-exists", options, async (updatedOptions) => {
      try {
        await this.getProperties(updatedOptions);
        return true;
      } catch (e: any) {
        if (e.statusCode === 404) {
          return false;
        }
        throw e;
      }
    });
  }

  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the file. It does not return the content of the file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-file-properties
   *
   * @param options - Options to File Get Properties operation.
   * @returns Response data for the File Get Properties operation.
   */
  public async getProperties(
    options: FileGetPropertiesOptions = {},
  ): Promise<FileGetPropertiesResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-getProperties",
      options,
      async (updatedOptions) => {
        return assertResponse<FileGetPropertiesHeaders, FileGetPropertiesHeaders>(
          await this.context.getProperties({ ...updatedOptions, ...this.shareClientConfig }),
        );
      },
    );
  }

  /**
   * Sets properties on the file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param properties - File properties. For file HTTP headers(e.g. Content-Type),
   *                                       if no values are provided, existing HTTP headers will be removed.
   *                                       For other file properties(e.g. fileAttributes), if no values are provided,
   *                                       existing values will be preserved.
   */
  public async setProperties(properties: FileProperties = {}): Promise<SetPropertiesResponse> {
    properties = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(properties);
    properties.fileHttpHeaders = properties.fileHttpHeaders || {};
    return tracingClient.withSpan(
      "ShareFileClient-setProperties",
      properties,
      async (updatedOptions) => {
        return assertResponse<FileSetHttpHeadersHeaders, FileSetHttpHeadersHeaders>(
          await this.context.setHttpHeaders(
            updatedOptions.fileAttributes
              ? fileAttributesToString(updatedOptions.fileAttributes!)
              : FileAttributesPreserve,
            {
              ...updatedOptions,
              fileChangeOn: fileChangeTimeToString(updatedOptions.changeTime),
              fileCreatedOn: fileCreationTimeToString(updatedOptions.creationTime),
              fileLastWriteOn: fileLastWriteTimeToString(updatedOptions.lastWriteTime),
              ...this.shareClientConfig,
            },
          ),
        );
      },
    );
  }

  /**
   * Removes the file from the storage account.
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
   * @param options - Options to File Delete operation.
   * @returns Response data for the File Delete operation.
   */
  public async delete(options: FileDeleteOptions = {}): Promise<FileDeleteResponse> {
    return tracingClient.withSpan("ShareFileClient-delete", options, async (updatedOptions) => {
      return assertResponse<FileDeleteHeaders, FileDeleteHeaders>(
        await this.context.delete({ ...updatedOptions, ...this.shareClientConfig }),
      );
    });
  }

  /**
   * Removes the file from the storage account if it exists.
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
   * @param options -
   */
  public async deleteIfExists(
    options: FileDeleteOptions = {},
  ): Promise<FileDeleteIfExistsResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-deleteIfExists",
      options,
      async (updatedOptions) => {
        try {
          const res = await this.delete(updatedOptions);
          return {
            succeeded: true,
            ...res,
          };
        } catch (e: any) {
          if (
            e.details?.errorCode === "ResourceNotFound" ||
            e.details?.errorCode === "ParentNotFound"
          ) {
            return {
              succeeded: false,
              ...e.response?.parsedHeaders,
              _response: e.response,
            };
          }
          throw e;
        }
      },
    );
  }

  /**
   * Sets HTTP headers on the file.
   *
   * If no option provided, or no value provided for the file HTTP headers in the options,
   * these file HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param FileHttpHeaders - File HTTP headers like Content-Type.
   *                                             Provide undefined will remove existing HTTP headers.
   * @param options - Options to File Set HTTP Headers operation.
   * @returns Response data for the File Set HTTP Headers operation.
   */
  public async setHttpHeaders(
    fileHttpHeaders: FileHttpHeaders = {},
    options: FileSetHttpHeadersOptions = {},
  ): Promise<FileSetHTTPHeadersResponse> {
    // FileAttributes, filePermission, createTime, lastWriteTime will all be preserved
    options = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(options);
    return tracingClient.withSpan(
      "ShareFileClient-setHTTPHeaders",
      options,
      async (updatedOptions) => {
        return assertResponse<FileSetHttpHeadersHeaders, FileSetHttpHeadersHeaders>(
          await this.context.setHttpHeaders(
            updatedOptions.fileAttributes
              ? fileAttributesToString(updatedOptions.fileAttributes!)
              : FileAttributesPreserve,
            {
              ...updatedOptions,
              fileHttpHeaders,
              fileCreatedOn: fileCreationTimeToString(updatedOptions.creationTime),
              fileLastWriteOn: fileLastWriteTimeToString(updatedOptions.lastWriteTime),
              fileChangeOn: fileChangeTimeToString(updatedOptions.changeTime),
              ...this.shareClientConfig,
            },
          ),
        );
      },
    );
  }

  /**
   * Resize file.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-properties
   *
   * @param length - Resizes a file to the specified size in bytes.
   *                        If the specified byte value is less than the current size of the file,
   *                        then all ranges above the specified byte value are cleared.
   * @param options - Options to File Resize operation.
   * @returns Response data for the File Set HTTP Headers operation.
   */
  public async resize(
    length: number,
    options: FileResizeOptions = {},
  ): Promise<FileSetHTTPHeadersResponse> {
    if (length < 0) {
      throw new RangeError(`Size cannot less than 0 when resizing file.`);
    }
    // FileAttributes, filePermission, createTime, lastWriteTime will all be preserved.
    options = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(options);
    return tracingClient.withSpan("ShareFileClient-resize", options, async (updatedOptions) => {
      return assertResponse<FileSetHttpHeadersHeaders, FileSetHttpHeadersHeaders>(
        await this.context.setHttpHeaders(fileAttributesToString(updatedOptions.fileAttributes!), {
          ...updatedOptions,
          fileContentLength: length,
          fileChangeOn: fileChangeTimeToString(options.changeTime),
          fileCreatedOn: fileCreationTimeToString(options.creationTime),
          fileLastWriteOn: fileLastWriteTimeToString(options.lastWriteTime),
          ...this.shareClientConfig,
        }),
      );
    });
  }

  /**
   * Updates user-defined metadata for the specified file.
   *
   * If no metadata defined in the option parameter, the file
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-file-metadata
   *
   * @param metadata - If no metadata provided, all existing directory metadata will be removed
   * @param options - Options to File Set Metadata operation.
   * @returns Response data for the File Set Metadata operation.
   */
  public async setMetadata(
    metadata: Metadata = {},
    options: FileSetMetadataOptions = {},
  ): Promise<FileSetMetadataResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-setMetadata",
      options,
      async (updatedOptions) => {
        return assertResponse<FileSetMetadataHeaders, FileSetMetadataHeaders>(
          await this.context.setMetadata({
            ...updatedOptions,
            metadata,
            ...this.shareClientConfig,
          }),
        );
      },
    );
  }

  /**
   * Upload a range of bytes to a file. This operation can only be called on an existing file.
   * It won't change the size, properties or metadata of the file.
   * Both the start and count of the range must be specified. The range can be up to 4 MB in size.
   *
   * @param body - Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param offset - Offset position of the destination Azure File to upload.
   * @param contentLength - Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param options - Options to File Upload Range operation.
   * @returns Response data for the File Upload Range operation.
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello world!";
   *
   * // Create the file
   * await fileClient.create(content.length);
   * console.log("Created file successfully!");
   *
   * // Then upload data to the file
   * await fileClient.uploadRange(content, 0, content.length);
   * console.log("Updated file successfully!")
   * ```
   */
  public async uploadRange(
    body: HttpRequestBody,
    offset: number,
    contentLength: number,
    options: FileUploadRangeOptions = {},
  ): Promise<FileUploadRangeResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-uploadRange",
      options,
      async (updatedOptions) => {
        if (offset < 0) {
          throw new RangeError(`offset must be >= 0`);
        }

        if (contentLength <= 0 || contentLength > FILE_RANGE_MAX_SIZE_BYTES) {
          throw new RangeError(
            `contentLength must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES} bytes`,
          );
        }

        if (contentLength > FILE_RANGE_MAX_SIZE_BYTES) {
          throw new RangeError(`offset must be < ${FILE_RANGE_MAX_SIZE_BYTES} bytes`);
        }

        return assertResponse<FileUploadRangeHeaders, FileUploadRangeHeaders>(
          await this.context.uploadRange(
            rangeToString({ count: contentLength, offset }),
            "update",
            contentLength,
            {
              ...updatedOptions,
              requestOptions: {
                onUploadProgress: updatedOptions.onProgress,
              },
              body,
              ...this.shareClientConfig,
            },
          ),
        );
      },
    );
  }

  /**
   * Upload a range of bytes to a file where the contents are read from a another file's URL.
   * The range can be up to 4 MB in size.
   *
   * @param sourceURL - Specify a URL to the copy source, Shared Access Signature(SAS) maybe needed for authentication.
   * @param sourceOffset - The source offset to copy from. Pass 0 to copy from the beginning of source file.
   * @param destOffset - Offset of destination file.
   * @param count - Number of bytes to be uploaded from source file.
   * @param options - Options to configure File - Upload Range from URL operation.
   */
  public async uploadRangeFromURL(
    sourceURL: string,
    sourceOffset: number,
    destOffset: number,
    count: number,
    options: FileUploadRangeFromURLOptions = {},
  ): Promise<FileUploadRangeFromURLResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-uploadRangeFromURL",
      options,
      async (updatedOptions) => {
        if (sourceOffset < 0 || destOffset < 0) {
          throw new RangeError(`sourceOffset and destOffset must be >= 0`);
        }

        if (count <= 0 || count > FILE_RANGE_MAX_SIZE_BYTES) {
          throw new RangeError(`count must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES} bytes`);
        }

        return assertResponse<FileUploadRangeFromURLHeaders, FileUploadRangeFromURLHeaders>(
          await this.context.uploadRangeFromURL(
            rangeToString({ offset: destOffset, count }),
            sourceURL,
            0,
            {
              ...updatedOptions,
              sourceRange: rangeToString({ offset: sourceOffset, count }),
              sourceModifiedAccessConditions: updatedOptions.sourceConditions,
              copySourceAuthorization: httpAuthorizationToString(
                updatedOptions.sourceAuthorization,
              ),
              ...this.shareClientConfig,
            },
          ),
        );
      },
    );
  }
  /**
   * Clears the specified range and
   * releases the space used in storage for that range.
   *
   * @param offset -
   * @param contentLength -
   * @param options - Options to File Clear Range operation.
   */
  public async clearRange(
    offset: number,
    contentLength: number,
    options: FileClearRangeOptions = {},
  ): Promise<FileUploadRangeResponse> {
    return tracingClient.withSpan("ShareFileClient-clearRange", options, async (updatedOptions) => {
      if (offset < 0 || contentLength <= 0) {
        throw new RangeError(`offset must >= 0 and contentLength must be > 0`);
      }

      return assertResponse<FileUploadRangeHeaders, FileUploadRangeHeaders>(
        await this.context.uploadRange(
          rangeToString({ count: contentLength, offset }),
          "clear",
          0,
          { ...updatedOptions, ...this.shareClientConfig },
        ),
      );
    });
  }

  /**
   * Returns the list of valid ranges for a file.
   *
   * @param options - Options to File Get range List operation.
   */
  public async getRangeList(
    options: FileGetRangeListOptions = {},
  ): Promise<FileGetRangeListResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-getRangeList",
      options,
      async (updatedOptions) => {
        const originalResponse = assertResponse<
          FileGetRangeListHeaders & ShareFileRangeList,
          FileGetRangeListHeaders,
          ShareFileRangeList
        >(
          await this.context.getRangeList({
            ...updatedOptions,
            range: updatedOptions.range ? rangeToString(updatedOptions.range) : undefined,
            ...this.shareClientConfig,
          }),
        );

        // Only returns ranges, ignoring clearRanges.
        const parsedBody = originalResponse._response.parsedBody.ranges
          ? originalResponse._response.parsedBody.ranges
          : [];
        return {
          ...originalResponse,
          _response: { ...originalResponse._response, parsedBody },
          rangeList: originalResponse.ranges ? originalResponse.ranges : [],
        };
      },
    );
  }

  /**
   * Returns the list of ranges that differ between a previous share snapshot and this file.
   *
   * @param prevShareSnapshot - The previous snapshot parameter is an opaque DateTime value that specifies the previous share snapshot to compare with.
   * @param options -
   */
  public async getRangeListDiff(
    prevShareSnapshot: string,
    options: FileGetRangeListOptions = {},
  ): Promise<FileGetRangeListDiffResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-getRangeListDiff",
      options,
      async (updatedOptions) => {
        return assertResponse<
          FileGetRangeListHeaders & ShareFileRangeList,
          FileGetRangeListHeaders,
          ShareFileRangeList
        >(
          await this.context.getRangeList({
            ...updatedOptions,
            prevsharesnapshot: prevShareSnapshot,
            supportRename: options.includeRenames,
            range: updatedOptions.range ? rangeToString(updatedOptions.range) : undefined,
            ...this.shareClientConfig,
          }),
        );
      },
    );
  }

  /**
   * Copies a blob or file to a destination file within the storage account.
   *
   * @param copySource - Specifies the URL of the source file or blob, up to 2 KB in length.
   * To copy a file to another file within the same storage account, you may use Shared Key to
   * authenticate the source file. If you are copying a file from another storage account, or if you
   * are copying a blob from the same storage account or another storage account, then you must
   * authenticate the source file or blob using a shared access signature. If the source is a public
   * blob, no authentication is required to perform the copy operation. A file in a share snapshot
   * can also be specified as a copy source.
   * @param options - Options to File Start Copy operation.
   */
  public async startCopyFromURL(
    copySource: string,
    options: FileStartCopyOptions = {},
  ): Promise<FileStartCopyResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-startCopyFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<FileStartCopyHeaders, FileStartCopyHeaders>(
          await this.context.startCopy(copySource, {
            ...updatedOptions,
            ...this.shareClientConfig,
          }),
        );
      },
    );
  }

  /**
   * Aborts a pending Copy File operation, and leaves a destination file with zero length and full
   * metadata.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/abort-copy-file
   *
   * @param copyId - Id of the Copy File operation to abort.
   * @param options - Options to File Abort Copy From URL operation.
   */
  public async abortCopyFromURL(
    copyId: string,
    options: FileAbortCopyFromURLOptions = {},
  ): Promise<FileAbortCopyResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-abortCopyFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<FileAbortCopyHeaders, FileAbortCopyHeaders>(
          await this.context.abortCopy(copyId, { ...updatedOptions, ...this.shareClientConfig }),
        );
      },
    );
  }

  // High Level functions

  /**
   * Creates a new Azure File or replaces an existing Azure File, and then uploads a Buffer(Node)/Blob/ArrayBuffer/ArrayBufferView to it.
   *
   * @param data - Buffer(Node), Blob, ArrayBuffer or ArrayBufferView
   * @param options -
   */
  public async uploadData(
    data: Buffer | Blob | ArrayBuffer | ArrayBufferView,
    options: FileParallelUploadOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan("ShareFileClient-uploadData", options, async (updatedOptions) => {
      if (isNode) {
        let buffer: Buffer;
        if (data instanceof Buffer) {
          buffer = data;
        } else if (data instanceof ArrayBuffer) {
          buffer = Buffer.from(data);
        } else {
          data = data as ArrayBufferView;
          buffer = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
        }

        return this.uploadSeekableInternal(
          (offset: number, size: number): Buffer => buffer.slice(offset, offset + size),
          buffer.byteLength,
          updatedOptions,
        );
      } else {
        const browserBlob = new Blob([data]);
        return this.uploadSeekableInternal(
          (offset: number, size: number): Blob => browserBlob.slice(offset, offset + size),
          browserBlob.size,
          updatedOptions,
        );
      }
    });
  }

  /**
   * ONLY AVAILABLE IN BROWSERS.
   *
   * Uploads a browser Blob object to an Azure file. Requires a blobFactory as the data source,
   * which need to return a Blob object with the offset and size provided.
   *
   * @param blobFactory -
   * @param size -
   * @param options -
   */
  async uploadSeekableBlob(
    blobFactory: (offset: number, size: number) => Blob,
    size: number,
    options: FileParallelUploadOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "ShareFileClient-UploadSeekableBlob",
      options,
      async (updatedOptions) => {
        return this.uploadSeekableInternal(blobFactory, size, updatedOptions);
      },
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates a new Azure File or replaces an existing Azure File, and then uploads a local file to it.
   *
   * @param filePath - Full path of local file
   * @param fileClient - ShareFileClient
   * @param options -
   */
  public async uploadFile(
    filePath: string,
    options: FileParallelUploadOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan("ShareFileClient-uploadFile", options, async (updatedOptions) => {
      const size = (await fsStat(filePath)).size;
      return this.uploadSeekableInternal(
        (offset, count) => {
          return () =>
            fsCreateReadStream(filePath, {
              autoClose: true,
              end: count ? offset + count - 1 : Infinity,
              start: offset,
            });
        },
        size,
        updatedOptions,
      );
    });
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Accepts a Node.js Readable stream factory, and uploads in blocks to an Azure File.
   * The Readable stream factory must returns a Node.js Readable stream starting from the offset defined. The offset
   * is the offset in the Azure file to be uploaded.
   *
   * @param streamFactory - Returns a Node.js Readable stream starting
   *                                                                  from the offset defined
   * @param size - Size of the Azure file
   * @param fileClient - ShareFileClient
   * @param options -
   */
  async uploadResetableStream(
    streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream,
    size: number,
    options: FileParallelUploadOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "ShareFileClient-uploadResetableStream",
      options,
      async (updatedOptions) => {
        return this.uploadSeekableInternal(
          (offset: number, count?: number) => {
            return () => streamFactory(offset, count);
          },
          size,
          updatedOptions,
        );
      },
    );
  }

  /**
   *
   * @param bodyFactory -
   * @param size - Size of the Azure file
   * @param fileClient - ShareFileClient
   * @param options -
   */
  private async uploadSeekableInternal(
    bodyFactory: (offset: number, count: number) => HttpRequestBody,
    size: number,
    options: FileParallelUploadOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "ShareFileClient-uploadSeekableInternal",
      options,
      async (updatedOptions) => {
        if (!options.rangeSize) {
          options.rangeSize = FILE_RANGE_MAX_SIZE_BYTES;
        }
        if (options.rangeSize < 0 || options.rangeSize > FILE_RANGE_MAX_SIZE_BYTES) {
          throw new RangeError(`options.rangeSize must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES}`);
        }

        if (!options.fileHttpHeaders) {
          options.fileHttpHeaders = {};
        }

        if (!options.concurrency) {
          options.concurrency = DEFAULT_HIGH_LEVEL_CONCURRENCY;
        }
        if (options.concurrency < 0) {
          throw new RangeError(`options.concurrency cannot less than 0.`);
        }

        // Create the file
        await this.create(size, {
          abortSignal: options.abortSignal,
          fileHttpHeaders: options.fileHttpHeaders,
          metadata: options.metadata,
          leaseAccessConditions: options.leaseAccessConditions,
          tracingOptions: updatedOptions.tracingOptions,
        });

        const numBlocks: number = Math.floor((size - 1) / options.rangeSize) + 1;
        let transferProgress: number = 0;
        const batch = new Batch(options.concurrency);

        for (let i = 0; i < numBlocks; i++) {
          batch.addOperation(async (): Promise<any> => {
            const start = options.rangeSize! * i;
            const end = i === numBlocks - 1 ? size : start + options.rangeSize!;
            const contentLength = end - start;
            await this.uploadRange(bodyFactory(start, contentLength), start, contentLength, {
              abortSignal: options.abortSignal,
              leaseAccessConditions: options.leaseAccessConditions,
              tracingOptions: updatedOptions.tracingOptions,
            });
            // Update progress after block is successfully uploaded to server, in case of block trying
            transferProgress += contentLength;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          });
        }
        return batch.do();
      },
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure file in parallel to a buffer.
   * Offset and count are optional, pass 0 for both to download the entire file.
   *
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For files larger than this size,
   * consider {@link downloadToFile}.
   *
   * @param buffer - Buffer to be fill, must have length larger than count
   * @param offset - From which position of the Azure File to download
   * @param count - How much data to be downloaded. Will download to the end when passing undefined
   * @param options -
   */
  public async downloadToBuffer(
    buffer: Buffer,
    offset?: number,
    count?: number,
    options?: FileDownloadToBufferOptions,
  ): Promise<Buffer>;

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME
   *
   * Downloads an Azure file in parallel to a buffer.
   * Offset and count are optional, pass 0 for both to download the entire file
   *
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For files larger than this size,
   * consider {@link downloadToFile}.
   *
   * @param offset - From which position of the Azure file to download
   * @param count - How much data to be downloaded. Will download to the end when passing undefined
   * @param options -
   */
  public async downloadToBuffer(
    offset?: number,
    count?: number,
    options?: FileDownloadToBufferOptions,
  ): Promise<Buffer>;

  public async downloadToBuffer(
    bufferOrOffset?: Buffer | number,
    offsetOrCount?: number,
    countOrOptions?: FileDownloadToBufferOptions | number,
    optOptions: FileDownloadToBufferOptions = {},
  ): Promise<Buffer> {
    let buffer: Buffer | undefined = undefined;
    let offset: number;
    let count: number;
    let options: FileDownloadToBufferOptions = optOptions;

    if (bufferOrOffset instanceof Buffer) {
      buffer = bufferOrOffset;
      offset = offsetOrCount || 0;
      count = typeof countOrOptions === "number" ? countOrOptions : 0;
    } else {
      offset = typeof bufferOrOffset === "number" ? bufferOrOffset : 0;
      count = typeof offsetOrCount === "number" ? offsetOrCount : 0;
      options = (countOrOptions as FileDownloadToBufferOptions) || {};
    }

    return tracingClient.withSpan(
      "ShareFileClient-downloadToBuffer",
      options,
      async (updatedOptions) => {
        if (!options.rangeSize) {
          options.rangeSize = FILE_RANGE_MAX_SIZE_BYTES;
        }
        if (options.rangeSize < 0) {
          throw new RangeError("rangeSize option must be > 0");
        }

        if (offset < 0) {
          throw new RangeError("offset option must be >= 0");
        }

        if (count && count <= 0) {
          throw new RangeError("count option must be > 0");
        }

        if (!options.concurrency) {
          options.concurrency = DEFAULT_HIGH_LEVEL_CONCURRENCY;
        }
        if (options.concurrency < 0) {
          throw new RangeError(`options.concurrency cannot less than 0.`);
        }

        // Customer doesn't specify length, get it
        if (!count) {
          const response = await this.getProperties({
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.leaseAccessConditions,
            tracingOptions: updatedOptions.tracingOptions,
          });
          count = response.contentLength! - offset;
          if (count < 0) {
            throw new RangeError(
              `offset ${offset} shouldn't be larger than file size ${response.contentLength!}`,
            );
          }
        }

        if (!buffer) {
          try {
            buffer = Buffer.alloc(count);
          } catch (error: any) {
            throw new Error(
              `Unable to allocate a buffer of size: ${count} bytes. Please try passing your own Buffer to ` +
                'the "downloadToBuffer method or try using other methods like "download" or "downloadToFile".' +
                `\t ${error.message}`,
            );
          }
        }

        if (buffer.length < count) {
          throw new RangeError(
            `The buffer's size should be equal to or larger than the request count of bytes: ${count}`,
          );
        }

        let transferProgress: number = 0;
        const batch = new Batch(options.concurrency);
        for (let off = offset; off < offset + count; off = off + options.rangeSize) {
          batch.addOperation(async () => {
            // Exclusive chunk end position
            let chunkEnd = offset + count!;
            if (off + options.rangeSize! < chunkEnd) {
              chunkEnd = off + options.rangeSize!;
            }
            const response = await this.download(off, chunkEnd - off, {
              abortSignal: options.abortSignal,
              maxRetryRequests: options.maxRetryRequestsPerRange,
              leaseAccessConditions: options.leaseAccessConditions,
              tracingOptions: updatedOptions.tracingOptions,
            });
            const stream = response.readableStreamBody!;
            await streamToBuffer(stream, buffer!, off - offset, chunkEnd - offset);
            // Update progress after block is downloaded, in case of block trying
            // Could provide finer grained progress updating inside HTTP requests,
            // only if convenience layer download try is enabled
            transferProgress += chunkEnd - off;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          });
        }
        await batch.do();
        return buffer;
      },
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates a new Azure File or replaces an existing Azure File, and then uploads a Node.js Readable stream into it.
   * This method will try to create an Azure File, then starts uploading chunk by chunk.
   * Size of chunk is defined by `bufferSize` parameter.
   * Please make sure potential size of stream doesn't exceed file size.
   *
   * PERFORMANCE IMPROVEMENT TIPS:
   * * Input stream highWaterMark is better to set a same value with bufferSize
   *   parameter, which will avoid Buffer.concat() operations.
   *
   * @param stream - Node.js Readable stream. Must be less or equal than file size.
   * @param size - Size of file to be created. Maximum size allowed is 4 TB.
   *                      If this value is larger than stream size, there will be empty bytes in file tail.
   * @param bufferSize - Size of every buffer allocated in bytes, also the chunk/range size during
   *                            the uploaded file. Size must be greater than 0 and lesser than or equal to 4 * 1024 * 1024 (4MB)
   * @param maxBuffers - Max buffers will allocate during uploading, positive correlation
   *                            with max uploading concurrency
   * @param options -
   */
  public async uploadStream(
    stream: Readable,
    size: number,
    bufferSize: number,
    maxBuffers: number,
    options: FileUploadStreamOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "ShareFileClient-uploadStream",
      options,
      async (updatedOptions) => {
        if (!options.fileHttpHeaders) {
          options.fileHttpHeaders = {};
        }

        if (bufferSize <= 0 || bufferSize > FILE_RANGE_MAX_SIZE_BYTES) {
          throw new RangeError(`bufferSize must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES}`);
        }

        if (maxBuffers < 0) {
          throw new RangeError(`maxBuffers must be > 0.`);
        }

        // Create the file
        await this.create(size, {
          abortSignal: options.abortSignal,
          fileHttpHeaders: options.fileHttpHeaders,
          metadata: options.metadata,
          leaseAccessConditions: options.leaseAccessConditions,
          tracingOptions: updatedOptions.tracingOptions,
        });

        let transferProgress: number = 0;
        const scheduler = new BufferScheduler(
          stream,
          bufferSize,
          maxBuffers,
          async (buffer: Buffer, offset?: number) => {
            if (transferProgress + buffer.length > size) {
              throw new RangeError(
                `Stream size is larger than file size ${size} bytes, uploading failed. ` +
                  `Please make sure stream length is less or equal than file size.`,
              );
            }

            await this.uploadRange(buffer, offset!, buffer.length, {
              abortSignal: options.abortSignal,
              leaseAccessConditions: options.leaseAccessConditions,
              tracingOptions: updatedOptions.tracingOptions,
            });

            // Update progress after block is successfully uploaded to server, in case of block trying
            transferProgress += buffer.length;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          },
          // Concurrency should set a smaller value than maxBuffers, which is helpful to
          // reduce the possibility when a outgoing handler waits for stream data, in
          // this situation, outgoing handlers are blocked.
          // Outgoing queue shouldn't be empty.
          Math.ceil((maxBuffers / 4) * 3),
        );
        return scheduler.do();
      },
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob to a local file.
   * Fails if the the given file path already exits.
   * Offset and count are optional, pass 0 and undefined respectively to download the entire blob.
   *
   * @param filePath -
   * @param offset - From which position of the block blob to download.
   * @param count - How much data to be downloaded. Will download to the end when passing undefined.
   * @param options - Options to Blob download options.
   * @returns The response data for blob download operation,
   *                                                 but with readableStreamBody set to undefined since its
   *                                                 content is already read and written into a local file
   *                                                 at the specified path.
   */
  public async downloadToFile(
    filePath: string,
    offset: number = 0,
    count?: number,
    options: FileDownloadOptions = {},
  ): Promise<FileDownloadResponseModel> {
    return tracingClient.withSpan(
      "ShareFileClient-downloadToFile",
      options,
      async (updatedOptions) => {
        const response = await this.download(offset, count, updatedOptions);
        if (response.readableStreamBody) {
          await readStreamToLocalFile(response.readableStreamBody, filePath);
        }

        // The stream is no longer accessible so setting it to undefined.
        (response as any).fileDownloadStream = undefined;
        return response;
      },
    );
  }

  /**
   * Lists handles for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-handles
   *
   * @param marker - Optional. A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param options -
   */
  private async listHandlesSegment(
    marker?: string,
    options: FileListHandlesSegmentOptions = {},
  ): Promise<FileListHandlesResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-listHandlesSegment",
      options,
      async (updatedOptions) => {
        marker = marker === "" ? undefined : marker;
        const response = assertResponse<
          FileListHandlesHeaders & GeneratedListHandlesResponse,
          FileListHandlesHeaders,
          GeneratedListHandlesResponse
        >(
          await this.context.listHandles({
            ...updatedOptions,
            ...this.shareClientConfig,
            marker,
          }),
        );

        // TODO: Protocol layer issue that when handle list is in returned XML
        // response.handleList is an empty string
        if ((response.handleList as any) === "") {
          response.handleList = undefined;
        }

        const wrappedResponse: DirectoryListHandlesResponse = {
          ...ConvertInternalResponseOfListHandles(response),
          _response: {
            ...response._response,
            parsedBody: ConvertInternalResponseOfListHandles(response._response.parsedBody),
          },
        };

        return wrappedResponse;
      },
    );
  }

  /**
   * Returns an AsyncIterableIterator for FileListHandlesResponse
   *
   * @param marker - A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param options - Options to list handles operation.
   */
  private async *iterateHandleSegments(
    marker?: string,
    options: FileListHandlesSegmentOptions = {},
  ): AsyncIterableIterator<FileListHandlesResponse> {
    let listHandlesResponse;
    if (!!marker || marker === undefined) {
      do {
        listHandlesResponse = await this.listHandlesSegment(marker, options);
        marker = listHandlesResponse.continuationToken;
        yield listHandlesResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator for handles
   *
   * @param options - Options to list handles operation.
   */
  private async *listHandleItems(
    options: FileListHandlesSegmentOptions = {},
  ): AsyncIterableIterator<HandleItem> {
    let marker: string | undefined;
    for await (const listHandlesResponse of this.iterateHandleSegments(marker, options)) {
      if (listHandlesResponse.handleList) {
        for (const handle of listHandlesResponse.handleList) {
          yield handle;
        }
      }
    }
  }

  /**
   * Returns an async iterable iterator to list all the handles.
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the handles in pages.
   *
   * @param options - Options to list handles operation.
   *
   * An asyncIterableIterator that supports paging.
   */
  public listHandles(
    options: FileListHandlesOptions = {},
  ): PagedAsyncIterableIterator<HandleItem, FileListHandlesResponse> {
    // an AsyncIterableIterator to iterate over handles
    const iter = this.listHandleItems(options);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      async next() {
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
        return this.iterateHandleSegments(removeEmptyString(settings.continuationToken), {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
      },
    };
  }

  /**
   * Force close all handles for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param marker - Optional. A string value that identifies the position of handles that will
   *                          be closed with the next force close handles operation.
   *                          The operation returns a marker value within the response
   *                          body if there are more handles to close. The marker value
   *                          may then be used in a subsequent call to close the next set of handles.
   * @param options - Options to force close handles operation.
   */
  private async forceCloseHandlesSegment(
    marker?: string,
    options: FileForceCloseHandlesOptions = {},
  ): Promise<FileForceCloseHandlesResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-forceCloseHandlesSegment",
      options,
      async (updatedOptions) => {
        marker = marker === "" ? undefined : marker;
        const rawResponse = await this.context.forceCloseHandles("*", {
          ...updatedOptions,
          ...this.shareClientConfig,
          marker,
        });
        const response = rawResponse as FileForceCloseHandlesResponse;
        response.closedHandlesCount = rawResponse.numberOfHandlesClosed || 0;
        response.closeFailureCount = rawResponse.numberOfHandlesFailedToClose || 0;
        return response;
      },
    );
  }

  /**
   * Force close all handles for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param options - Options to force close handles operation.
   */
  public async forceCloseAllHandles(
    options: FileForceCloseHandlesOptions = {},
  ): Promise<CloseHandlesInfo> {
    return tracingClient.withSpan(
      "ShareFileClient-forceCloseAllHandles",
      options,
      async (updatedOptions) => {
        let handlesClosed = 0;
        let numberOfHandlesFailedToClose = 0;
        let marker: string | undefined = "";

        do {
          const response: FileForceCloseHandlesResponse = await this.forceCloseHandlesSegment(
            marker,
            { tracingOptions: updatedOptions.tracingOptions },
          );
          marker = response.marker;
          if (response.closedHandlesCount) {
            handlesClosed += response.closedHandlesCount;
          }
          if (response.closeFailureCount) {
            numberOfHandlesFailedToClose += response.closeFailureCount;
          }
        } while (marker);

        return {
          closedHandlesCount: handlesClosed,
          closeFailureCount: numberOfHandlesFailedToClose,
        };
      },
    );
  }

  /**
   * Force close a specific handle for a file.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param handleId - Specific handle ID, cannot be asterisk "*".
   *                          Use forceCloseAllHandles() to close all handles.
   * @param FileForceCloseHandlesOptions - Options to force close handles operation.
   */
  public async forceCloseHandle(
    handleId: string,
    options: FileForceCloseHandlesOptions = {},
  ): Promise<FileForceCloseHandlesResponse> {
    return tracingClient.withSpan(
      "ShareFileClient-forceCloseHandle",
      options,
      async (updatedOptions) => {
        if (handleId === "*") {
          throw new RangeError(
            `Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.`,
          );
        }

        const rawResponse = await this.context.forceCloseHandles(handleId, {
          ...updatedOptions,
          ...this.shareClientConfig,
        });
        const response = rawResponse as FileForceCloseHandlesResponse;
        response.closedHandlesCount = rawResponse.numberOfHandlesClosed || 0;
        response.closeFailureCount = rawResponse.numberOfHandlesFailedToClose || 0;
        return response;
      },
    );
  }

  /**
   * Get a {@link ShareLeaseClient} that manages leases on the file.
   *
   * @param proposeLeaseId - Initial proposed lease Id.
   * @returns A new ShareLeaseClient object for managing leases on the file.
   */
  public getShareLeaseClient(proposeLeaseId?: string): ShareLeaseClient {
    return new ShareLeaseClient(this, proposeLeaseId);
  }

  /**
   * Only available for clients constructed with a shared key credential.
   *
   * Generates a Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateSasUrl(options: FileGenerateSasUrlOptions): string {
    if (!(this.credential instanceof StorageSharedKeyCredential)) {
      throw RangeError(
        "Can only generate the SAS when the client is initialized with a shared key credential",
      );
    }

    const sas = generateFileSASQueryParameters(
      {
        shareName: this.shareName,
        filePath: this.path,
        ...options,
      },
      this.credential,
    ).toString();

    return appendToURLQuery(this.url, sas);
  }

  /**
   * Renames a file.
   * This API only supports renaming a file in the same share.
   *
   * @param destinationPath - Specifies the destination path to rename to. The path will be encoded to put into a URL to specify the destination.
   * @param options - Options for the renaming operation.
   * @returns Response data for the file renaming operation.
   *
   * Example usage:
   *
   * ```js
   *
   * // Rename the file
   * await fileClient.rename(destinationPath);
   * console.log("Renamed file successfully!");
   * ```
   */
  public async rename(
    destinationPath: string,
    options: FileRenameOptions = {},
  ): Promise<{
    destinationFileClient: ShareFileClient;
    fileRenameResponse: FileRenameResponse;
  }> {
    const split: string[] = destinationPath.split("?");
    let destinationUrl: string;
    if (split.length === 2) {
      const pathOnly = EscapePath(split[0]);
      const renameDestination = `/${this.shareName}/${pathOnly}`;
      destinationUrl = setURLPath(this.url, renameDestination);
      destinationUrl = setURLQueries(destinationUrl, split[1]);
    } else if (split.length === 1) {
      const pathOnly = EscapePath(destinationPath);
      const renameDestination = `/${this.shareName}/${pathOnly}`;
      destinationUrl = setURLPath(this.url, renameDestination);
    } else {
      throw new RangeError("Destination path should not contain more than one query string");
    }

    const destFile = new ShareFileClient(destinationUrl, this.pipeline, this.shareClientConfig);
    return tracingClient.withSpan("ShareFileClient-rename", options, async (updatedOptions) => {
      const response = assertResponse<FileRenameHeaders, FileRenameHeaders>(
        await destFile.context.rename(this.url, {
          ...updatedOptions,
          sourceLeaseAccessConditions: updatedOptions.sourceLeaseAccessConditions
            ? {
                sourceLeaseId: updatedOptions.sourceLeaseAccessConditions.leaseId,
              }
            : undefined,
          destinationLeaseAccessConditions: updatedOptions.destinationLeaseAccessConditions
            ? {
                destinationLeaseId: updatedOptions.destinationLeaseAccessConditions.leaseId,
              }
            : undefined,
          fileHttpHeaders: options.contentType
            ? {
                fileContentType: options.contentType,
              }
            : undefined,
          ...this.shareClientConfig,
        }),
      );

      return {
        destinationFileClient: destFile,
        fileRenameResponse: response,
      };
    });
  }
}

/**
 * The details of the response for a specific lease operation.
 */
export interface LeaseOperationResponseHeaders {
  /**
   * The ETag contains a value that you can use to perform operations conditionally. If the request
   * version is 2011-08-18 or newer, the ETag value will be in quotes.
   */
  etag?: string;
  /**
   * Returns the date and time the file was last modified. Any operation that modifies the file,
   * including an update of the file's metadata or properties, changes the last-modified time of
   * the file.
   */
  lastModified?: Date;
  /**
   * Approximate time remaining in the lease period, in seconds. Only availabe for {@link ShareLeaseClient.breakLease} for share lease.
   */
  leaseTimeInSeconds?: number;
  /**
   * Uniquely identifies a file's lease, won't be set when returned by releaseLease.
   */
  leaseId?: string;
  /**
   * This header uniquely identifies the request that was made and can be used for troubleshooting
   * the request.
   */
  requestId?: string;
  /**
   * Indicates the version of the Blob service used to execute the request. This header is returned
   * for requests made against version 2009-09-19 and above.
   */
  version?: string;
  /**
   * UTC date/time value generated by the service that indicates the time at which the response was
   * initiated
   */
  date?: Date;
  errorCode?: string;
}

/**
 * Contains the response data for operations that acquire, change, break or release a lease.
 *
 * See {@link ShareLeaseClient}.
 */
export type LeaseOperationResponse = WithResponse<
  LeaseOperationResponseHeaders,
  LeaseOperationResponseHeaders
>;

/**
 * lease operations options.
 */
export interface LeaseOperationOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * A client that manages leases for a {@link ShareFileClient} or {@link ShareClient}.
 * @see https://docs.microsoft.com/rest/api/storageservices/lease-file
 * and
 * @see https://docs.microsoft.com/rest/api/storageservices/lease-share
 */
export class ShareLeaseClient {
  private _leaseId: string;
  private _url: string;
  private fileOrShare: File | Share;
  /**
   * Gets the lease Id.
   *
   * @readonly
   */
  public get leaseId(): string {
    return this._leaseId;
  }

  /**
   * Gets the url.
   *
   * @readonly
   */
  public get url(): string {
    return this._url;
  }

  /**
   * Creates an instance of ShareLeaseClient.
   * @param client - The client to make the lease operation requests.
   * @param leaseId - Initial proposed lease id.
   */
  constructor(client: ShareFileClient, leaseId?: string) {
    const clientContext: StorageClientContext = client["storageClientContext"];

    if (client instanceof ShareClient) {
      this.fileOrShare = clientContext.share;
    } else {
      this.fileOrShare = clientContext.file;
    }
    this._url = client.url;

    if (!leaseId) {
      leaseId = randomUUID();
    }
    this._leaseId = leaseId;
  }

  /**
   * Establishes and manages a lock on a file, share or share snapshot for write and delete operations.
   *
   * @param duration - Specifies the duration of lease in seconds. For file, the only allowed value is -1 for a lease that never expires. For share, must be -1 or between 15 to 60.
   * @param options - Options for the lease management operation.
   * @returns Response data for acquire lease operation.
   */
  public async acquireLease(
    duration: number = -1,
    options: LeaseOperationOptions = {},
  ): Promise<LeaseOperationResponse> {
    return tracingClient.withSpan(
      "ShareLeaseClient-acquireLease",
      options,
      async (updatedOptions) => {
        return assertResponse<LeaseOperationResponseHeaders, LeaseOperationResponseHeaders>(
          await this.fileOrShare.acquireLease({
            ...updatedOptions,
            duration,
            proposedLeaseId: this._leaseId,
          }),
        );
      },
    );
  }

  /**
   * To change the ID of an existing lease.
   *
   * @param proposedLeaseId - the proposed new lease Id.
   * @param options - Options for the lease management operation.
   * @returns Response data for change lease operation.
   */
  public async changeLease(
    proposedLeaseId: string,
    options: LeaseOperationOptions = {},
  ): Promise<LeaseOperationResponse> {
    return tracingClient.withSpan(
      "ShareLeaseClient-changeLease",
      options,
      async (updatedOptions) => {
        const response = assertResponse<
          LeaseOperationResponseHeaders,
          LeaseOperationResponseHeaders
        >(
          await this.fileOrShare.changeLease(this._leaseId, {
            ...updatedOptions,
            proposedLeaseId,
          }),
        );
        this._leaseId = proposedLeaseId;
        return response;
      },
    );
  }

  /**
   * To free the lease if it is no longer needed so that another client may
   * immediately acquire a lease.
   *
   * @param options - Options for the lease management operation.
   * @returns Response data for release lease operation.
   */
  public async releaseLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    return tracingClient.withSpan(
      "ShareLeaseClient-releaseLease",
      options,
      async (updatedOptions) => {
        return assertResponse<LeaseOperationResponseHeaders, LeaseOperationResponseHeaders>(
          await this.fileOrShare.releaseLease(this._leaseId, updatedOptions),
        );
      },
    );
  }

  /**
   * To force end the lease.
   *
   * @param options - Options for the lease management operation.
   * @returns Response data for break lease operation.
   */
  public async breakLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    return tracingClient.withSpan(
      "ShareLeaseClient-breakLease",
      options,
      async (updatedOptions) => {
        return assertResponse<LeaseOperationResponseHeaders, LeaseOperationResponseHeaders>(
          await this.fileOrShare.breakLease(updatedOptions),
        );
      },
    );
  }

  /**
   * To renew the lease. Only available for lease on share or share snapshot.
   * Note that the lease may be renewed even if it has expired as long as the share has not been leased again since the expiration of that lease.
   * When you renew a lease, the lease duration clock resets.
   *
   * @param options - Options for the lease management operation.
   * @returns Response data for renew lease operation.
   */
  public async renewLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    return tracingClient.withSpan(
      "ShareLeaseClient-renewLease",
      options,
      async (updatedOptions) => {
        if (isFile(this.fileOrShare)) {
          throw new RangeError("The renewLease operation is not available for lease on file.");
        }
        return assertResponse<LeaseOperationResponseHeaders, LeaseOperationResponseHeaders>(
          await this.fileOrShare.renewLease(this._leaseId, updatedOptions),
        );
      },
    );
  }
}

/**
 * @internal
 */
function isFile(fileOrShare: File | Share): fileOrShare is File {
  return "renewLease" in fileOrShare;
}
