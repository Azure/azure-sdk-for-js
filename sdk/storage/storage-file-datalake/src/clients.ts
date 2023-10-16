// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import { RequestBodyType as HttpRequestBody } from "@azure/core-rest-pipeline";
import { isNode } from "@azure/core-util";
import {
  isPipelineLike,
  newPipeline,
  Pipeline,
  StoragePipelineOptions,
} from "./Pipeline";
import {
  BlobClient,
  BlockBlobClient,
} from "@azure/storage-blob"
import { AnonymousCredential } from "@azure/storage-blob";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { Readable } from "stream";

import { BufferScheduler } from "../../storage-common/src";
import { DataLakeLeaseClient } from "./DataLakeLeaseClient";
import { PathOperationsImpl as Path } from "./generated/src/operations";
import {
  AccessControlChanges,
  DirectoryCreateIfNotExistsOptions,
  DirectoryCreateIfNotExistsResponse,
  DirectoryCreateOptions,
  DirectoryCreateResponse,
  DirectoryGenerateSasUrlOptions,
  FileAppendOptions,
  FileAppendResponse,
  FileCreateIfNotExistsOptions,
  FileCreateIfNotExistsResponse,
  FileCreateOptions,
  FileCreateResponse,
  FileExpiryMode,
  FileFlushOptions,
  FileFlushResponse,
  FileGenerateSasUrlOptions,
  FileParallelUploadOptions,
  FileQueryOptions,
  FileReadOptions,
  FileReadResponse,
  FileReadToBufferOptions,
  FileSetExpiryOptions,
  FileSetExpiryResponse,
  FileUploadResponse,
  Metadata,
  PathAccessControlItem,
  PathChangeAccessControlRecursiveOptions,
  PathChangeAccessControlRecursiveResponse,
  PathCreateIfNotExistsOptions,
  PathCreateIfNotExistsResponse,
  PathCreateOptions,
  PathCreateResponse,
  PathDeleteIfExistsResponse,
  PathDeleteOptions,
  PathDeleteResponse,
  PathExistsOptions,
  PathGetAccessControlOptions,
  PathGetAccessControlResponse,
  PathGetPropertiesOptions,
  PathGetPropertiesResponse,
  PathHttpHeaders,
  PathMoveOptions,
  PathMoveResponse,
  PathPermissions,
  PathResourceTypeModel,
  PathSetAccessControlOptions,
  PathSetAccessControlResponse,
  PathSetHttpHeadersOptions,
  PathSetHttpHeadersResponse,
  PathSetMetadataOptions,
  PathSetMetadataResponse,
  PathSetPermissionsOptions,
  PathSetPermissionsResponse,
  RemovePathAccessControlItem,
} from "./models";
import { PathSetAccessControlRecursiveMode } from "./models.internal";
import { generateDataLakeSASQueryParameters } from "./sas/DataLakeSASSignatureValues";
import { StorageClient } from "./StorageClient";
import {
  toAccessControlChangeFailureArray,
  toAcl,
  toAclString,
  toBlobCpkInfo,
  toPermissions,
  toPermissionsString,
  toProperties,
} from "./transforms";
import { Batch } from "./utils/Batch";
import {
  BLOCK_BLOB_MAX_BLOCKS,
  DEFAULT_HIGH_LEVEL_CONCURRENCY,
  ETagAny,
  FILE_MAX_SINGLE_UPLOAD_THRESHOLD,
  FILE_MAX_SIZE_BYTES,
  FILE_UPLOAD_DEFAULT_CHUNK_SIZE,
  FILE_UPLOAD_MAX_CHUNK_SIZE,
} from "./utils/constants";
import { DataLakeAclChangeFailedError } from "./utils/DataLakeAclChangeFailedError";
import { tracingClient } from "./utils/tracing";
import {
  appendToURLPath,
  appendToURLQuery,
  assertResponse,
  ensureCpkIfSpecified,
  getURLPathAndQuery,
  ParsePathGetPropertiesExtraHeaderValues,
  setURLPath,
  setURLQueries,
} from "./utils/utils.common";
import { fsCreateReadStream, fsStat } from "./utils/utils.node";
import {
  PathAppendDataHeaders,
  PathCreateHeaders,
  PathDeleteHeaders,
  PathFlushDataHeaders,
  PathGetPropertiesHeaders,
  PathSetAccessControlHeaders,
  PathSetExpiryHeaders,
} from "./generated/src";

/**
 * A DataLakePathClient represents a URL to the Azure Storage path (directory or file).
 */
export class DataLakePathClient extends StorageClient {
  /**
   * pathContext provided by protocol layer.
   */
  private pathContext: Path;

  /**
   * blobClient provided by `@azure/storage-blob` package.
   */
  private blobClient: BlobClient;

  private isTokenCredential?: boolean;

  /**
   * SetAccessControlRecursiveInternal operation sets the Access Control on a path and sub paths.
   *
   * @param mode - Mode \"set\" sets POSIX access control rights on files and directories,
   *                                                 Mode \"modify\" modifies one or more POSIX access control rights that pre-exist on files and directories,
   *                                                 Mode \"remove\" removes one or more POSIX access control rights that were present earlier on files and directories.
   * @param acl - The POSIX access control list for the file or directory.
   * @param options - Optional. Options
   */
  private async setAccessControlRecursiveInternal(
    mode: PathSetAccessControlRecursiveMode,
    acl: PathAccessControlItem[] | RemovePathAccessControlItem[],
    options: PathChangeAccessControlRecursiveOptions = {},
  ): Promise<PathChangeAccessControlRecursiveResponse> {
    if (options.maxBatches !== undefined && options.maxBatches < 1) {
      throw RangeError(`Options maxBatches must be larger than 0.`);
    }

    if (options.batchSize !== undefined && options.batchSize < 1) {
      throw RangeError(`Options batchSize must be larger than 0.`);
    }

    const result: PathChangeAccessControlRecursiveResponse = {
      counters: {
        failedChangesCount: 0,
        changedDirectoriesCount: 0,
        changedFilesCount: 0,
      },
      continuationToken: undefined,
    };

    return tracingClient.withSpan(
      "DataLakePathClient-setAccessControlRecursiveInternal",
      options,
      async (updatedOptions) => {
        let continuationToken = options.continuationToken;
        let batchCounter = 0;
        let reachMaxBatches = false;
        do {
          let response;
          try {
            response = await this.pathContext.setAccessControlRecursive(mode, {
              ...updatedOptions,
              acl: toAclString(acl as PathAccessControlItem[]),
              maxRecords: options.batchSize,
              continuation: continuationToken,
              forceFlag: options.continueOnFailure,
            });
          } catch (e: any) {
            throw new DataLakeAclChangeFailedError(e, continuationToken);
          }

          batchCounter++;
          continuationToken = response.continuation;

          // Update result
          result.continuationToken = continuationToken;
          result.counters.failedChangesCount += response.failureCount ?? 0;
          result.counters.changedDirectoriesCount += response.directoriesSuccessful ?? 0;
          result.counters.changedFilesCount += response.filesSuccessful ?? 0;

          // Progress event call back
          if (options.onProgress) {
            const progress: AccessControlChanges = {
              batchFailures: toAccessControlChangeFailureArray(response.failedEntries),
              batchCounters: {
                failedChangesCount: response.failureCount ?? 0,
                changedDirectoriesCount: response.directoriesSuccessful ?? 0,
                changedFilesCount: response.filesSuccessful ?? 0,
              },
              aggregateCounters: result.counters,
              continuationToken: continuationToken,
            };
            options.onProgress(progress);
          }

          reachMaxBatches =
            options.maxBatches === undefined ? false : batchCounter >= options.maxBatches;
        } while (continuationToken && !reachMaxBatches);

        return result;
      },
    );
  }

  /**
   * Creates an instance of DataLakePathClient from url and credential.
   *
   * @param url - A Client string pointing to Azure Storage data lake path (directory or file), such as
   *                     "https://myaccount.dfs.core.windows.net/filesystem/directory" or "https://myaccount.dfs.core.windows.net/filesystem/file".
   *                     You can append a SAS if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net/filesystem/directory?sasString".
   * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  );

  /**
   * Creates an instance of DataLakePathClient from url and pipeline.
   *
   * @param url - A Client string pointing to Azure Storage data lake path (directory or file), such as
   *                     "https://myaccount.dfs.core.windows.net/filesystem/directory" or "https://myaccount.dfs.core.windows.net/filesystem/file".
   *                     You can append a SAS if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net/filesystem/directory?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  public constructor(url: string, pipeline: Pipeline);

  public constructor(
    url: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  ) {
    if (isPipelineLike(credentialOrPipeline)) {
      super(url, credentialOrPipeline);
    } else {
      let credential;
      if (credentialOrPipeline === undefined) {
        credential = new AnonymousCredential();
      } else {
        credential = credentialOrPipeline;
      }

      const pipeline = newPipeline(credential, options);
      super(url, pipeline);
    }

    this.pathContext = new Path(this.storageClientContext);
    this.blobClient = new BlobClient(this.blobEndpointUrl, this.pipeline);
  }

  /**
   * Name of current file system.
   *
   * @readonly
   */
  public get fileSystemName(): string {
    return this.blobClient.containerName;
  }

  /**
   * Name of current path (directory or file).
   *
   * @readonly
   */
  public get name(): string {
    return this.blobClient.name;
  }

  /**
   * Convert current DataLakePathClient to DataLakeDirectoryClient if current path is a directory.
   *
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients */
  public toDirectoryClient(): DataLakeDirectoryClient {
    return new DataLakeDirectoryClient(this.dfsEndpointUrl, this.pipeline);
  }

  /**
   * Convert current DataLakePathClient to DataLakeFileClient if current path is a file.
   *
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients */
  public toFileClient(): DataLakeFileClient {
    return new DataLakeFileClient(this.dfsEndpointUrl, this.pipeline);
  }

  /**
   * Get a {@link DataLakeLeaseClient} that manages leases on the path (directory or file).
   *
   * @param proposeLeaseId - Optional. Initial proposed lease Id.
   */
  public getDataLakeLeaseClient(proposeLeaseId?: string): DataLakeLeaseClient {
    return new DataLakeLeaseClient(this.blobClient.getBlobLeaseClient(proposeLeaseId));
  }

  /**
   * Create a directory or path.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param resourceType - Resource type, "directory" or "file".
   * @param options - Optional. Options when creating path.
   */
  public async create(
    resourceType: PathResourceTypeModel,
    options: PathCreateOptions = {},
  ): Promise<PathCreateResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("DataLakePathClient-create", options, async (updatedOptions) => {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      let expiryOptions: FileExpiryMode | undefined;
      let expiresOn: string | undefined;
      if (typeof options.expiresOn === "number" && Number.isFinite(options.expiresOn)) {
        expiryOptions = "RelativeToNow";
        expiresOn = String(Math.round(options.expiresOn));
      } else if (options.expiresOn instanceof Date) {
        expiryOptions = "Absolute";
        expiresOn = options.expiresOn.toUTCString();
      } else if (options.expiresOn) {
        throw new Error(`Value for expiresOn is invalid: ${options.expiresOn}`);
      }

      return assertResponse<PathCreateHeaders, PathCreateHeaders>(
        await this.pathContext.create({
          ...updatedOptions,
          resource: resourceType,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: options.conditions,
          properties: toProperties(options.metadata),
          cpkInfo: options.customerProvidedKey,
          acl: options.acl ? toAclString(options.acl) : undefined,
          expiryOptions,
          expiresOn,
        }),
      );
    });
  }

  /**
   * Create a directory or file. If the resource already exists, it is not changed.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param resourceType - Resource type, "directory" or "file".
   * @param options -
   */
  public async createIfNotExists(
    resourceType: PathResourceTypeModel,
    options: PathCreateIfNotExistsOptions = {},
  ): Promise<PathCreateIfNotExistsResponse> {
    return tracingClient.withSpan(
      "DataLakePathClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        try {
          const conditions = { ifNoneMatch: ETagAny };
          const res = await this.create(resourceType, {
            ...options,
            conditions,
            tracingOptions: updatedOptions.tracingOptions,
          });
          return {
            succeeded: true,
            ...res,
          };
        } catch (e: any) {
          if (e.details?.errorCode === "PathAlreadyExists") {
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
   * Returns true if the Data Lake file represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing file might be deleted by other clients or
   * applications. Vice versa new files might be added by other clients or applications after this
   * function completes.
   *
   * @param options - options to Exists operation.
   */
  public async exists(options: PathExistsOptions = {}): Promise<boolean> {
    return tracingClient.withSpan("DataLakeFileClient-exists", options, async (updatedOptions) => {
      return this.blobClient.exists({
        ...updatedOptions,
        customerProvidedKey: toBlobCpkInfo(updatedOptions.customerProvidedKey),
      });
    });
  }

  /**
   * Delete current path (directory or file).
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/delete
   *
   * @param recursive - Required and valid only when the resource is a directory. If "true", all paths beneath the directory will be deleted.
   * @param options - Optional. Options when deleting path.
   */
  public async delete(
    recursive?: boolean,
    options: PathDeleteOptions = {},
  ): Promise<PathDeleteResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("DataLakePathClient-delete", options, async (updatedOptions) => {
      if (this.isTokenCredential === undefined) {
        this.isTokenCredential = false;
        this.pipeline.factories.forEach((factory) => {
          if (isTokenCredential((factory as any).credential)) {
            this.isTokenCredential = true;
          }
        });

        if (isTokenCredential((this.pipeline as any)._credential)) {
          this.isTokenCredential = true;
        }
      }
      const paginated = recursive === true && this.isTokenCredential === true;
      let continuation: string | undefined;
      let response: PathDeleteResponse;

      // How to handle long delete loop?
      do {
        response = assertResponse<PathDeleteHeaders, PathDeleteHeaders>(
          await this.pathContext.delete({
            ...updatedOptions,
            continuation,
            recursive,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: options.conditions,
            abortSignal: options.abortSignal,
            paginated,
          }),
        );
        continuation = response.continuation;
      } while (continuation);

      return response;
    });
  }

  /**
   * Delete current path (directory or file) if it exists.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/delete
   *
   * @param recursive - Required and valid only when the resource is a directory. If "true", all paths beneath the directory will be deleted.
   * @param options -
   */
  public async deleteIfExists(
    recursive?: boolean,
    options: PathDeleteOptions = {},
  ): Promise<PathDeleteIfExistsResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "DataLakePathClient-deleteIfExists",
      options,
      async (updatedOptions) => {
        try {
          const res = await this.delete(recursive, updatedOptions);
          return {
            succeeded: true,
            ...res,
          };
        } catch (e: any) {
          if (e.details?.errorCode === "PathNotFound") {
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
   * Returns the access control data for a path (directory of file).
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/getproperties
   *
   * @param options - Optional. Options when getting file access control.
   */
  public async getAccessControl(
    options: PathGetAccessControlOptions = {},
  ): Promise<PathGetAccessControlResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "DataLakePathClient-getAccessControl",
      options,
      async (updatedOptions) => {
        const response = assertResponse<PathGetPropertiesHeaders, PathGetPropertiesHeaders>(
          await this.pathContext.getProperties({
            ...updatedOptions,
            action: "getAccessControl",
            upn: options.userPrincipalName,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: options.conditions,
            abortSignal: options.abortSignal,
          }),
        );
        return {
          ...response,
          _response: response._response,
          permissions: toPermissions(response.permissions),
          acl: toAcl(response.acl),
        };
      },
    );
  }

  /**
   * Set the access control data for a path (directory of file).
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/update
   *
   * @param acl - The POSIX access control list for the file or directory.
   * @param options - Optional. Options when setting path access control.
   */
  public async setAccessControl(
    acl: PathAccessControlItem[],
    options: PathSetAccessControlOptions = {},
  ): Promise<PathSetAccessControlResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "DataLakePathClient-setAccessControl",
      options,
      async (updatedOptions) => {
        return assertResponse<PathSetAccessControlHeaders, PathSetAccessControlHeaders>(
          await this.pathContext.setAccessControl({
            ...updatedOptions,
            acl: toAclString(acl),
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: options.conditions,
          }),
        );
      },
    );
  }

  /**
   * Sets the Access Control on a path and sub paths.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/update
   *
   * @param acl - The POSIX access control list for the file or directory.
   * @param options - Optional. Options
   */
  public async setAccessControlRecursive(
    acl: PathAccessControlItem[],
    options: PathChangeAccessControlRecursiveOptions = {},
  ): Promise<PathChangeAccessControlRecursiveResponse> {
    return tracingClient.withSpan(
      "DataLakePathClient-setAccessControlRecursive",
      options,
      async (updatedOptions) => {
        return this.setAccessControlRecursiveInternal("set", acl, updatedOptions);
      },
    );
  }

  /**
   * Modifies the Access Control on a path and sub paths.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/update
   *
   * @param acl - The POSIX access control list for the file or directory.
   * @param options - Optional. Options
   */
  public async updateAccessControlRecursive(
    acl: PathAccessControlItem[],
    options: PathChangeAccessControlRecursiveOptions = {},
  ): Promise<PathChangeAccessControlRecursiveResponse> {
    return tracingClient.withSpan(
      "DataLakePathClient-updateAccessControlRecursive",
      options,
      async (updatedOptions) => {
        return this.setAccessControlRecursiveInternal("modify", acl, updatedOptions);
      },
    );
  }

  /**
   * Removes the Access Control on a path and sub paths.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/update
   *
   * @param acl - The POSIX access control list for the file or directory.
   * @param options - Optional. Options
   */
  public async removeAccessControlRecursive(
    acl: RemovePathAccessControlItem[],
    options: PathChangeAccessControlRecursiveOptions = {},
  ): Promise<PathChangeAccessControlRecursiveResponse> {
    return tracingClient.withSpan(
      "DataLakePathClient-removeAccessControlRecursive",
      options,
      async (updatedOptions) => {
        return this.setAccessControlRecursiveInternal("remove", acl, updatedOptions);
      },
    );
  }

  /**
   * Sets the file permissions on a path.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/update
   *
   * @param permissions - The POSIX access permissions for the file owner, the file owning group, and others.
   * @param options - Optional. Options when setting path permissions.
   */
  public async setPermissions(
    permissions: PathPermissions,
    options: PathSetPermissionsOptions = {},
  ): Promise<PathSetPermissionsResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "DataLakePathClient-setPermissions",
      options,
      async (updatedOptions) => {
        return assertResponse<PathSetAccessControlHeaders, PathSetAccessControlHeaders>(
          await this.pathContext.setAccessControl({
            ...updatedOptions,
            permissions: toPermissionsString(permissions),
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: options.conditions,
          }),
        );
      },
    );
  }

  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the path (directory or file).
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the methods of {@link DataLakeFileSystemClient} that list paths using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-properties
   *
   * @param options - Optional. Options when getting path properties.
   */
  public async getProperties(
    options: PathGetPropertiesOptions = {},
  ): Promise<PathGetPropertiesResponse> {
    return tracingClient.withSpan(
      "DataLakePathClient-getProperties",
      options,
      async (updatedOptions) => {
        const response = await this.blobClient.getProperties({
          ...options,
          customerProvidedKey: toBlobCpkInfo(options.customerProvidedKey),
          tracingOptions: updatedOptions.tracingOptions,
        });
        return ParsePathGetPropertiesExtraHeaderValues(response as PathGetPropertiesResponse);
      },
    );
  }

  /**
   * Sets system properties on the path (directory or file).
   *
   * If no value provided, or no value provided for the specified blob HTTP headers,
   * these blob HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param httpHeaders -
   * @param options -
   */
  public async setHttpHeaders(
    httpHeaders: PathHttpHeaders,
    options: PathSetHttpHeadersOptions = {},
  ): Promise<PathSetHttpHeadersResponse> {
    return tracingClient.withSpan(
      "DataLakePathClient-setHttpHeaders",
      options,
      async (updatedOptions) => {
        return this.blobClient.setHTTPHeaders(
          {
            blobCacheControl: httpHeaders.cacheControl,
            blobContentType: httpHeaders.contentType,
            blobContentMD5: httpHeaders.contentMD5,
            blobContentEncoding: httpHeaders.contentEncoding,
            blobContentLanguage: httpHeaders.contentLanguage,
            blobContentDisposition: httpHeaders.contentDisposition,
          },
          updatedOptions,
        );
      },
    );
  }

  /**
   * Sets user-defined metadata for the specified path (directory of file) as one or more name-value pairs.
   *
   * If no option provided, or no metadata defined in the parameter, the path
   * metadata will be removed.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-metadata
   *
   * @param metadata - Optional. Replace existing metadata with this value.
   *                              If no value provided the existing metadata will be removed.
   * @param options - Optional. Options when setting path metadata.
   */
  public async setMetadata(
    metadata?: Metadata,
    options: PathSetMetadataOptions = {},
  ): Promise<PathSetMetadataResponse> {
    return tracingClient.withSpan(
      "DataLakePathClient-setMetadata",
      options,
      async (updatedOptions) => {
        return this.blobClient.setMetadata(metadata, {
          ...options,
          customerProvidedKey: toBlobCpkInfo(options.customerProvidedKey),
          tracingOptions: updatedOptions.tracingOptions,
        });
      },
    );
  }

  /**
   * Move directory or file within same file system.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param destinationPath - Destination directory path like "directory" or file path "directory/file".
   *                                 If the destinationPath is authenticated with SAS, add the SAS to the destination path like "directory/file?sasToken".
   * @param options - Optional. Options when moving directory or file.
   */
  public async move(destinationPath: string, options?: PathMoveOptions): Promise<PathMoveResponse>;

  /**
   * Move directory or file to another file system.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param destinationFileSystem - Destination file system like "filesystem".
   * @param destinationPath - Destination directory path like "directory" or file path "directory/file"
   *                                 If the destinationPath is authenticated with SAS, add the SAS to the destination path like "directory/file?sasToken".
   * @param options - Optional. Options when moving directory or file.
   */
  public async move(
    destinationFileSystem: string,
    destinationPath: string,
    options?: PathMoveOptions,
  ): Promise<PathMoveResponse>;

  public async move(
    destinationPathOrFileSystem: string,
    destinationPathOrOptions?: string | PathMoveOptions,
    options?: PathMoveOptions,
  ): Promise<PathMoveResponse> {
    let destinationFileSystem = this.fileSystemName;
    let destinationPath = destinationPathOrFileSystem;
    let pathMoveOptions: PathMoveOptions;

    if (typeof destinationPathOrOptions === "string") {
      destinationFileSystem = destinationPathOrFileSystem;
      destinationPath = destinationPathOrOptions;
      pathMoveOptions = options ?? {};
    } else {
      pathMoveOptions = destinationPathOrOptions ?? {};
    }

    const renameSource = getURLPathAndQuery(this.dfsEndpointUrl);

    const split: string[] = destinationPath.split("?");
    let destinationUrl: string;
    if (split.length === 2) {
      const renameDestination = `/${destinationFileSystem}/${split[0]}`;
      destinationUrl = setURLPath(this.dfsEndpointUrl, renameDestination);
      destinationUrl = setURLQueries(destinationUrl, split[1]);
    } else if (split.length === 1) {
      const renameDestination = `/${destinationFileSystem}/${destinationPath}`;
      destinationUrl = setURLPath(this.dfsEndpointUrl, renameDestination);
    } else {
      throw new RangeError("Destination path should not contain more than one query string");
    }

    const destPathClient = new DataLakePathClient(destinationUrl, this.pipeline);

    return tracingClient.withSpan(
      "DataLakePathClient-move",
      pathMoveOptions,
      async (updatedOptions) => {
        return assertResponse<PathCreateHeaders, PathCreateHeaders>(
          await destPathClient.pathContext.create({
            ...updatedOptions,
            mode: "legacy", // By default
            renameSource,
            sourceLeaseId: pathMoveOptions.conditions?.leaseId,
            leaseAccessConditions: pathMoveOptions.destinationConditions,
            sourceModifiedAccessConditions: {
              sourceIfMatch: pathMoveOptions.conditions?.ifMatch,
              sourceIfNoneMatch: pathMoveOptions.conditions?.ifNoneMatch,
              sourceIfModifiedSince: pathMoveOptions.conditions?.ifModifiedSince,
              sourceIfUnmodifiedSince: pathMoveOptions.conditions?.ifUnmodifiedSince,
            },
            modifiedAccessConditions: pathMoveOptions.destinationConditions,
            abortSignal: pathMoveOptions.abortSignal,
          }),
        );
      },
    );
  }
}

/**
 * A DataLakeDirectoryClient represents a URL to the Azure Storage directory.
 */
export class DataLakeDirectoryClient extends DataLakePathClient {
  // https://stackoverflow.com/questions/50729485/override-method-with-different-argument-types-in-extended-class-typescript
  /**
   * Create a directory.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param resourceType - Resource type, must be "directory" for DataLakeDirectoryClient.
   * @param options - Optional. Options when creating directory.
   */
  public async create(
    resourceType: PathResourceTypeModel,
    options?: PathCreateOptions,
  ): Promise<PathCreateResponse>;

  /**
   * Create a directory.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param options - Optional. Options when creating directory.
   */
  public async create(options?: DirectoryCreateOptions): Promise<DirectoryCreateResponse>;

  public async create(
    resourceTypeOrOptions?: PathResourceTypeModel | PathCreateOptions,
    options: PathCreateOptions = {},
  ): Promise<PathCreateResponse> {
    if (resourceTypeOrOptions === "file") {
      throw TypeError(
        `DataLakeDirectoryClient:create() resourceType cannot be ${resourceTypeOrOptions}. Refer to DataLakeFileClient for file creation.`,
      );
    }

    let pathCreateOptions: PathCreateOptions;

    if (resourceTypeOrOptions === "directory") {
      pathCreateOptions = options;
    } else {
      pathCreateOptions = resourceTypeOrOptions ?? {};
    }
    return tracingClient.withSpan(
      "DataLakeDirectoryClient-create",
      pathCreateOptions,
      async (updatedOptions) => {
        return super.create("directory", updatedOptions);
      },
    );
  }

  /**
   * Create a directory if it doesn't already exists.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param resourceType - Resource type, must be "directory" for DataLakeDirectoryClient.
   * @param options -
   */
  public async createIfNotExists(
    resourceType: PathResourceTypeModel,
    options?: PathCreateIfNotExistsOptions,
  ): Promise<PathCreateIfNotExistsResponse>;

  /**
   * Create a directory if it doesn't already exists.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param options -
   */
  public async createIfNotExists(
    options?: DirectoryCreateIfNotExistsOptions,
  ): Promise<DirectoryCreateIfNotExistsResponse>;

  public async createIfNotExists(
    resourceTypeOrOptions?: PathResourceTypeModel | PathCreateIfNotExistsOptions,
    options: PathCreateIfNotExistsOptions = {},
  ): Promise<PathCreateIfNotExistsResponse> {
    if (resourceTypeOrOptions === "file") {
      throw TypeError(
        `DataLakeDirectoryClient:createIfNotExists() resourceType cannot be ${resourceTypeOrOptions}. Refer to DataLakeFileClient for file creation.`,
      );
    }

    if (resourceTypeOrOptions !== "directory") {
      options = resourceTypeOrOptions || {};
    }

    return tracingClient.withSpan(
      "DataLakeDirectoryClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        return super.createIfNotExists("directory", {
          ...updatedOptions,
        });
      },
    );
  }

  /**
   * Creates a {@link DataLakeDirectoryClient} object under current directory.
   *
   * @param subdirectoryName - Subdirectory name.
   */
  public getSubdirectoryClient(subdirectoryName: string): DataLakeDirectoryClient {
    return new DataLakeDirectoryClient(
      appendToURLPath(this.url, encodeURIComponent(subdirectoryName)),
      this.pipeline,
    );
  }

  /**
   * Creates a {@link DataLakeFileClient} object under current directory.
   *
   * @param fileName -
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients */
  public getFileClient(fileName: string): DataLakeFileClient {
    return new DataLakeFileClient(
      appendToURLPath(this.url, encodeURIComponent(fileName)),
      this.pipeline,
    );
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
  public generateSasUrl(options: DirectoryGenerateSasUrlOptions): Promise<string> {
    return new Promise((resolve) => {
      if (!(this.credential instanceof StorageSharedKeyCredential)) {
        throw RangeError(
          "Can only generate the SAS when the client is initialized with a shared key credential",
        );
      }

      const sas = generateDataLakeSASQueryParameters(
        {
          fileSystemName: this.fileSystemName,
          pathName: this.name,
          isDirectory: true,
          ...options,
        },
        this.credential,
      ).toString();

      resolve(appendToURLQuery(this.url, sas));
    });
  }
}

/**
 * A DataLakeFileClient represents a URL to the Azure Storage file.
 */
export class DataLakeFileClient extends DataLakePathClient {
  /**
   * pathContextInternal provided by protocol layer.
   */
  private pathContextInternal: Path;

  /**
   * pathContextInternal provided by protocol layer, with its url pointing to the Blob endpoint.
   */
  private pathContextInternalToBlobEndpoint: Path;

  /**
   * blockBlobClientInternal provided by `@azure/storage-blob` package.
   */
  private blockBlobClientInternal: BlockBlobClient;

  /**
   * Creates an instance of DataLakeFileClient from url and credential.
   *
   * @param url - A Client string pointing to Azure Storage data lake file, such as
   *                     "https://myaccount.dfs.core.windows.net/filesystem/file".
   *                     You can append a SAS if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net/filesystem/directory/file?sasString".
   * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  public constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  );

  /**
   * Creates an instance of DataLakeFileClient from url and pipeline.
   *
   * @param url - A Client string pointing to Azure Storage data lake file, such as
   *                     "https://myaccount.dfs.core.windows.net/filesystem/file".
   *                     You can append a SAS if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net/filesystem/directory/file?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  public constructor(url: string, pipeline: Pipeline);

  public constructor(
    url: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  ) {
    if (isPipelineLike(credentialOrPipeline)) {
      super(url, credentialOrPipeline);
    } else {
      let credential;
      if (credentialOrPipeline === undefined) {
        credential = new AnonymousCredential();
      } else {
        credential = credentialOrPipeline;
      }

      const pipeline = newPipeline(credential, options);
      super(url, pipeline);
    }

    this.pathContextInternal = new Path(this.storageClientContext);
    this.blockBlobClientInternal = new BlockBlobClient(this.blobEndpointUrl, this.pipeline);
    this.pathContextInternalToBlobEndpoint = new Path(this.storageClientContextToBlobEndpoint);
  }

  /**
   * Create a file.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param resourceType - Resource type, must be "file" for DataLakeFileClient.
   * @param options - Optional. Options when creating file.
   */
  public async create(
    resourceType: PathResourceTypeModel,
    options?: PathCreateOptions,
  ): Promise<PathCreateResponse>;

  /**
   * Create a file.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param options - Optional. Options when creating file.
   */
  public async create(options?: FileCreateOptions): Promise<FileCreateResponse>;

  public async create(
    resourceTypeOrOptions?: PathResourceTypeModel | PathCreateOptions,
    options: PathCreateOptions = {},
  ): Promise<PathCreateResponse> {
    if (resourceTypeOrOptions === "directory") {
      throw TypeError(
        `DataLakeFileClient:create() resourceType cannot be ${resourceTypeOrOptions}. Refer to DataLakeDirectoryClient for directory creation.`,
      );
    }

    let pathCreateOptions: PathCreateOptions;
    if (resourceTypeOrOptions === "file") {
      pathCreateOptions = options;
    } else {
      pathCreateOptions = resourceTypeOrOptions ?? {};
    }

    return tracingClient.withSpan(
      "DataLakeFileClient-create",
      pathCreateOptions,
      async (updatedOptions) => {
        return super.create("file", updatedOptions);
      },
    );
  }

  /**
   * Create a file if it doesn't already exists.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param resourceType - Resource type, must be "file" for DataLakeFileClient.
   * @param options -
   */
  public async createIfNotExists(
    resourceType: PathResourceTypeModel,
    options?: PathCreateIfNotExistsOptions,
  ): Promise<PathCreateIfNotExistsResponse>;

  /**
   * Create a file if it doesn't already exists.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param options - Optional. Options when creating file.
   */
  public async createIfNotExists(
    options?: FileCreateIfNotExistsOptions,
  ): Promise<FileCreateIfNotExistsResponse>;

  public async createIfNotExists(
    resourceTypeOrOptions?: PathResourceTypeModel | PathCreateOptions,
    options: PathCreateIfNotExistsOptions = {},
  ): Promise<PathCreateIfNotExistsResponse> {
    if (resourceTypeOrOptions === "directory") {
      throw TypeError(
        `DataLakeFileClient:createIfNotExists() resourceType cannot be ${resourceTypeOrOptions}. Refer to DataLakeDirectoryClient for directory creation.`,
      );
    }

    if (resourceTypeOrOptions !== "file") {
      options = resourceTypeOrOptions || {};
    }

    return tracingClient.withSpan(
      "DataLakeFileClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        return super.createIfNotExists("file", updatedOptions);
      },
    );
  }

  /**
   * Downloads a file from the service, including its metadata and properties.
   *
   * * In Node.js, data returns in a Readable stream readableStreamBody
   * * In browsers, data returns in a promise contentAsBlob
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob
   *
   * * Example usage (Node.js):
   *
   * ```js
   * // Download and convert a file to a string
   * const downloadResponse = await fileClient.read();
   * const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);
   * console.log("Downloaded file content:", downloaded.toString());
   *
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
   * Example usage (browser):
   *
   * ```js
   * // Download and convert a file to a string
   * const downloadResponse = await fileClient.read();
   * const downloaded = await blobToString(await downloadResponse.contentAsBlob);
   * console.log("Downloaded file content", downloaded);
   *
   * async function blobToString(blob: Blob): Promise<string> {
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
   *
   * @param offset - Optional. Offset to read file, default value is 0.
   * @param count - Optional. How many bytes to read, default will read from offset to the end.
   * @param options - Optional. Options when reading file.
   */
  public async read(
    offset: number = 0,
    count?: number,
    options: FileReadOptions = {},
  ): Promise<FileReadResponse> {
    return tracingClient.withSpan("DataLakeFileClient-read", options, async (updatedOptions) => {
      const rawResponse = await this.blockBlobClientInternal.download(offset, count, {
        ...updatedOptions,
        customerProvidedKey: toBlobCpkInfo(updatedOptions.customerProvidedKey),
      });

      const response = ParsePathGetPropertiesExtraHeaderValues(
        rawResponse as FileReadResponse,
      ) as FileReadResponse;
      if (!isNode && !response.contentAsBlob) {
        response.contentAsBlob = rawResponse.blobBody;
      }
      response.fileContentMD5 = rawResponse.blobContentMD5;
      response._response.parsedHeaders.fileContentMD5 =
        rawResponse._response.parsedHeaders.blobContentMD5;
      delete rawResponse.blobContentMD5;
      delete rawResponse._response.parsedHeaders.blobContentMD5;

      return response;
    });
  }

  /**
   * Uploads data to be appended to a file. Data can only be appended to a file.
   * To apply perviously uploaded data to a file, call flush.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/update
   *
   * @param body - Content to be uploaded.
   * @param offset - Append offset in bytes.
   * @param length - Length of content to append in bytes.
   * @param options - Optional. Options when appending data.
   */
  public async append(
    body: HttpRequestBody,
    offset: number,
    length: number,
    options: FileAppendOptions = {},
  ): Promise<FileAppendResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("DataLakeFileClient-append", options, async (updatedOptions) => {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return assertResponse<PathAppendDataHeaders, PathAppendDataHeaders>(
        await this.pathContextInternal.appendData(body, {
          ...updatedOptions,
          pathHttpHeaders: {
            contentMD5: options.transactionalContentMD5,
          },
          abortSignal: options.abortSignal,
          position: offset,
          contentLength: length,
          leaseAccessConditions: options.conditions,
          requestOptions: {
            onUploadProgress: options.onProgress,
          },
          cpkInfo: options.customerProvidedKey,
          flush: options.flush,
          proposedLeaseId: options.proposedLeaseId,
          leaseDuration: options.leaseDurationInSeconds,
          leaseAction: options.leaseAction,
        }),
      );
    });
  }

  /**
   * Flushes (writes) previously appended data to a file.
   *
   * @param position - File position to flush.
   *                          This parameter allows the caller to upload data in parallel and control the order in which it is appended to the file.
   *                          It is required when uploading data to be appended to the file and when flushing previously uploaded data to the file.
   *                          The value must be the position where the data is to be appended. Uploaded data is not immediately flushed, or written,
   *                          to the file. To flush, the previously uploaded data must be contiguous, the position parameter must be specified and
   *                          equal to the length of the file after all data has been written, and there must not be a request entity body included
   *                          with the request.
   * @param options - Optional. Options when flushing data.
   */
  public async flush(position: number, options: FileFlushOptions = {}): Promise<FileFlushResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("DataLakeFileClient-flush", options, async (updatedOptions) => {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return assertResponse<PathFlushDataHeaders, PathFlushDataHeaders>(
        await this.pathContextInternal.flushData({
          ...updatedOptions,
          position,
          contentLength: 0,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: options.conditions,
          cpkInfo: options.customerProvidedKey,
          proposedLeaseId: options.proposedLeaseId,
          leaseDuration: options.leaseDurationInSeconds,
          leaseAction: options.leaseAction,
        }),
      );
    });
  }

  // high level functions

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a local file to a Data Lake file.
   *
   * @param filePath - Full path of the local file
   * @param options -
   */
  public async uploadFile(
    filePath: string,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options: FileParallelUploadOptions = {},
  ): Promise<FileUploadResponse> {
    return tracingClient.withSpan(
      "DataLakeFileClient-uploadFile",
      options,
      async (updatedOptions) => {
        const size = (await fsStat(filePath)).size;
        return this.uploadSeekableInternal(
          (offset: number, contentSize: number) => {
            return () =>
              fsCreateReadStream(filePath, {
                autoClose: true,
                end: offset + contentSize - 1,
                start: offset,
              });
          },
          size,
          updatedOptions,
        );
      },
    );
  }

  /**
   * Uploads a Buffer(Node.js)/Blob/ArrayBuffer/ArrayBufferView to a File.
   *
   * @param data - Buffer(Node), Blob, ArrayBuffer or ArrayBufferView
   * @param options -
   */
  public async upload(
    data: Buffer | Blob | ArrayBuffer | ArrayBufferView,
    options: FileParallelUploadOptions = {},
  ): Promise<FileUploadResponse> {
    return tracingClient.withSpan("DataLakeFileClient-upload", options, async (updatedOptions) => {
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
          buffer.length,
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

  private async uploadSeekableInternal(
    bodyFactory: (offset: number, count: number) => HttpRequestBody,
    size: number,
    options: FileParallelUploadOptions = {},
  ): Promise<FileUploadResponse> {
    return tracingClient.withSpan(
      "DataLakeFileClient-uploadData",
      options,
      async (updatedOptions) => {
        if (size > FILE_MAX_SIZE_BYTES) {
          throw new RangeError(`size must be <= ${FILE_MAX_SIZE_BYTES}.`);
        }

        // Create the file.
        const createRes = this.create({
          abortSignal: options.abortSignal,
          metadata: options.metadata,
          permissions: options.permissions,
          umask: options.umask,
          conditions: options.conditions,
          pathHttpHeaders: options.pathHttpHeaders,
          customerProvidedKey: updatedOptions.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
          encryptionContext: updatedOptions.encryptionContext,
        });
        // append() with empty data would return error, so do not continue
        if (size === 0) {
          return createRes;
        } else {
          await createRes;
        }

        // After the File is Create, Lease ID is the only valid request parameter.
        options.conditions = { leaseId: options.conditions?.leaseId };

        if (!options.chunkSize) {
          options.chunkSize = Math.ceil(size / BLOCK_BLOB_MAX_BLOCKS);
          if (options.chunkSize < FILE_UPLOAD_DEFAULT_CHUNK_SIZE) {
            options.chunkSize = FILE_UPLOAD_DEFAULT_CHUNK_SIZE;
          }
        }
        if (options.chunkSize < 1 || options.chunkSize > FILE_UPLOAD_MAX_CHUNK_SIZE) {
          throw new RangeError(
            `chunkSize option must be >= 1 and <= ${FILE_UPLOAD_MAX_CHUNK_SIZE}`,
          );
        }

        if (!options.maxConcurrency) {
          options.maxConcurrency = DEFAULT_HIGH_LEVEL_CONCURRENCY;
        }
        if (options.maxConcurrency <= 0) {
          throw new RangeError(`maxConcurrency must be > 0.`);
        }

        if (!options.singleUploadThreshold) {
          options.singleUploadThreshold = FILE_MAX_SINGLE_UPLOAD_THRESHOLD;
        }
        if (
          options.singleUploadThreshold < 1 ||
          options.singleUploadThreshold > FILE_MAX_SINGLE_UPLOAD_THRESHOLD
        ) {
          throw new RangeError(
            `singleUploadThreshold option must be >= 1 and <= ${FILE_MAX_SINGLE_UPLOAD_THRESHOLD}`,
          );
        }

        // When buffer length <= singleUploadThreshold, this method will use one append/flush call to finish the upload.
        if (size <= options.singleUploadThreshold) {
          await this.append(bodyFactory(0, size), 0, size, {
            abortSignal: options.abortSignal,
            conditions: options.conditions,
            customerProvidedKey: updatedOptions.customerProvidedKey,
            onProgress: options.onProgress,
            tracingOptions: updatedOptions.tracingOptions,
          });

          return this.flush(size, {
            abortSignal: options.abortSignal,
            conditions: options.conditions,
            close: options.close,
            pathHttpHeaders: options.pathHttpHeaders,
            customerProvidedKey: updatedOptions.customerProvidedKey,
            tracingOptions: updatedOptions.tracingOptions,
          });
        }

        const numBlocks: number = Math.floor((size - 1) / options.chunkSize) + 1;
        if (numBlocks > BLOCK_BLOB_MAX_BLOCKS) {
          throw new RangeError(
            `The data's size is too big or the chunkSize is too small;` +
              `the number of chunks must be <= ${BLOCK_BLOB_MAX_BLOCKS}`,
          );
        }

        let transferProgress: number = 0;
        const batch = new Batch(options.maxConcurrency);

        for (let i = 0; i < numBlocks; i++) {
          batch.addOperation(async (): Promise<any> => {
            const start = options.chunkSize! * i;
            const end = i === numBlocks - 1 ? size : start + options.chunkSize!;
            const contentLength = end - start;
            await this.append(bodyFactory(start, contentLength), start, contentLength, {
              abortSignal: options.abortSignal,
              conditions: options.conditions,
              customerProvidedKey: updatedOptions.customerProvidedKey,
              tracingOptions: updatedOptions.tracingOptions,
            });

            transferProgress += contentLength;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          });
        }
        await batch.do();

        return this.flush(size, {
          abortSignal: options.abortSignal,
          conditions: options.conditions,
          close: options.close,
          pathHttpHeaders: options.pathHttpHeaders,
          customerProvidedKey: updatedOptions.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
        });
      },
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a Node.js Readable stream into a Data Lake file.
   * This method will try to create a file, then starts uploading chunk by chunk.
   * Please make sure potential size of stream doesn't exceed FILE_MAX_SIZE_BYTES and
   * potential number of chunks doesn't exceed BLOCK_BLOB_MAX_BLOCKS.
   *
   * PERFORMANCE IMPROVEMENT TIPS:
   * * Input stream highWaterMark is better to set a same value with options.chunkSize
   *   parameter, which will avoid Buffer.concat() operations.
   *
   * @param stream - Node.js Readable stream.
   * @param options -
   */
  public async uploadStream(
    stream: Readable,
    options: FileParallelUploadOptions = {},
  ): Promise<FileUploadResponse> {
    return tracingClient.withSpan(
      "DataLakeFileClient-uploadStream",
      options,
      async (updatedOptions) => {
        // Create the file
        await this.create({
          abortSignal: options.abortSignal,
          metadata: options.metadata,
          permissions: options.permissions,
          umask: options.umask,
          conditions: options.conditions,
          pathHttpHeaders: options.pathHttpHeaders,
          customerProvidedKey: options.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
          encryptionContext: updatedOptions.encryptionContext,
        });

        // After the File is Create, Lease ID is the only valid request parameter.
        options.conditions = { leaseId: options.conditions?.leaseId };

        if (!options.chunkSize) {
          options.chunkSize = FILE_UPLOAD_DEFAULT_CHUNK_SIZE;
        }
        if (options.chunkSize < 1 || options.chunkSize > FILE_UPLOAD_MAX_CHUNK_SIZE) {
          throw new RangeError(
            `chunkSize option must be >= 1 and <= ${FILE_UPLOAD_MAX_CHUNK_SIZE}`,
          );
        }
        if (!options.maxConcurrency) {
          options.maxConcurrency = DEFAULT_HIGH_LEVEL_CONCURRENCY;
        }
        if (options.maxConcurrency <= 0) {
          throw new RangeError(`maxConcurrency must be > 0.`);
        }

        let transferProgress: number = 0;
        const scheduler = new BufferScheduler(
          stream,
          options.chunkSize,
          options.maxConcurrency,
          async (body, length, offset) => {
            await this.append(body, offset!, length, {
              abortSignal: options.abortSignal,
              conditions: options.conditions,
              customerProvidedKey: options.customerProvidedKey,
              tracingOptions: updatedOptions.tracingOptions,
            });

            // Update progress after block is successfully uploaded to server, in case of block trying
            transferProgress += length;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          },
          // concurrency should set a smaller value than maxConcurrency, which is helpful to
          // reduce the possibility when a outgoing handler waits for stream data, in
          // this situation, outgoing handlers are blocked.
          // Outgoing queue shouldn't be empty.
          Math.ceil((options.maxConcurrency / 4) * 3),
        );
        await scheduler.do();

        return this.flush(transferProgress, {
          abortSignal: options.abortSignal,
          conditions: options.conditions,
          close: options.close,
          pathHttpHeaders: options.pathHttpHeaders,
          customerProvidedKey: options.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
        });
      },
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Reads a Data Lake file in parallel to a buffer.
   * Offset and count are optional, pass 0 for both to read the entire file.
   *
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For files larger than this size,
   * consider {@link readToFile}.
   *
   * @param buffer - Buffer to be fill, must have length larger than count
   * @param offset - From which position of the Data Lake file to read
   * @param count - How much data to be read. Will read to the end when passing undefined
   * @param options -
   */
  public async readToBuffer(
    buffer: Buffer,
    offset?: number,
    count?: number,
    options?: FileReadToBufferOptions,
  ): Promise<Buffer>;

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME
   *
   * Reads a Data Lake file in parallel to a buffer.
   * Offset and count are optional, pass 0 for both to read the entire file
   *
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For files larger than this size,
   * consider {@link readToFile}.
   *
   * @param offset - From which position of the Data Lake file to read(in bytes)
   * @param count - How much data(in bytes) to be read. Will read to the end when passing undefined
   * @param options -
   */
  public async readToBuffer(
    offset?: number,
    count?: number,
    options?: FileReadToBufferOptions,
  ): Promise<Buffer>;

  public async readToBuffer(
    bufferOrOffset?: Buffer | number,
    offsetOrCount?: number,
    countOrOptions?: FileReadToBufferOptions | number,
    optOptions: FileReadToBufferOptions = {},
  ): Promise<Buffer> {
    let buffer: Buffer | undefined = undefined;
    let offset = 0;
    let count = 0;
    let options = optOptions;
    if (bufferOrOffset instanceof Buffer) {
      buffer = bufferOrOffset;
      offset = offsetOrCount || 0;
      count = typeof countOrOptions === "number" ? countOrOptions : 0;
    } else {
      offset = typeof bufferOrOffset === "number" ? bufferOrOffset : 0;
      count = typeof offsetOrCount === "number" ? offsetOrCount : 0;
      options = (countOrOptions as FileReadToBufferOptions) || {};
    }
    return tracingClient.withSpan(
      "DataLakeFileClient-readToBuffer",
      options,
      async (updatedOptions) => {
        if (buffer) {
          return this.blockBlobClientInternal.downloadToBuffer(buffer, offset, count, {
            ...options,
            maxRetryRequestsPerBlock: options.maxRetryRequestsPerChunk,
            blockSize: options.chunkSize,
            customerProvidedKey: toBlobCpkInfo(options.customerProvidedKey),
            tracingOptions: updatedOptions.tracingOptions,
          });
        } else {
          return this.blockBlobClientInternal.downloadToBuffer(offset, count, {
            ...options,
            maxRetryRequestsPerBlock: options.maxRetryRequestsPerChunk,
            blockSize: options.chunkSize,
            customerProvidedKey: toBlobCpkInfo(options.customerProvidedKey),
            tracingOptions: updatedOptions.tracingOptions,
          });
        }
      },
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads a Data Lake file to a local file.
   * Fails if the the given file path already exits.
   * Offset and count are optional, pass 0 and undefined respectively to download the entire file.
   *
   * @param filePath -
   * @param offset - From which position of the file to download.
   * @param count - How much data to be downloaded. Will download to the end when passing undefined.
   * @param options - Options to read Data Lake file.
   * @returns The response data for file read operation,
   *                                      but with readableStreamBody set to undefined since its
   *                                      content is already read and written into a local file
   *                                      at the specified path.
   */
  public async readToFile(
    filePath: string,
    offset: number = 0,
    count?: number,
    options: FileReadOptions = {},
  ): Promise<FileReadResponse> {
    return tracingClient.withSpan(
      "DataLakeFileClient-readToFile",
      options,
      async (updatedOptions) => {
        return this.blockBlobClientInternal.downloadToFile(filePath, offset, count, {
          ...updatedOptions,
          customerProvidedKey: toBlobCpkInfo(options.customerProvidedKey),
        });
      },
    );
  }

  /**
   * Quick query for a JSON or CSV formatted file.
   *
   * Example usage (Node.js):
   *
   * ```js
   * // Query and convert a file to a string
   * const queryResponse = await fileClient.query("select * from BlobStorage");
   * const downloaded = (await streamToBuffer(queryResponse.readableStreamBody)).toString();
   * console.log("Query file content:", downloaded);
   *
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
   * @param query -
   * @param options -
   */
  public async query(query: string, options: FileQueryOptions = {}): Promise<FileReadResponse> {
    return tracingClient.withSpan("DataLakeFileClient-query", options, async (updatedOptions) => {
      const rawResponse = await this.blockBlobClientInternal.query(query, {
        ...updatedOptions,
        customerProvidedKey: toBlobCpkInfo(options.customerProvidedKey),
      });
      const response = rawResponse as FileReadResponse;
      if (!isNode && !response.contentAsBlob) {
        response.contentAsBlob = rawResponse.blobBody;
      }
      response.fileContentMD5 = rawResponse.blobContentMD5;
      response._response.parsedHeaders.fileContentMD5 =
        rawResponse._response.parsedHeaders.blobContentMD5;
      delete rawResponse.blobContentMD5;
      delete rawResponse._response.parsedHeaders.blobContentMD5;
      return response;
    });
  }

  /**
   * Sets an expiry time on a file, once that time is met the file is deleted.
   *
   * @param mode -
   * @param options -
   */
  public async setExpiry(
    mode: FileExpiryMode,
    options: FileSetExpiryOptions = {},
  ): Promise<FileSetExpiryResponse> {
    return tracingClient.withSpan(
      "DataLakeFileClient-setExpiry",
      options,
      async (updatedOptions) => {
        let expiresOn: string | undefined = undefined;
        if (mode === "RelativeToNow" || mode === "RelativeToCreation") {
          if (!options.timeToExpireInMs) {
            throw new Error(`Should specify options.timeToExpireInMs when using mode ${mode}.`);
          }
          // MINOR: need check against <= 2**64, but JS number has the precision problem.
          expiresOn = Math.round(options.timeToExpireInMs).toString();
        }

        if (mode === "Absolute") {
          if (!options.expiresOn) {
            throw new Error(`Should specify options.expiresOn when using mode ${mode}.`);
          }
          const now = new Date();
          if (!(options.expiresOn!.getTime() > now.getTime())) {
            throw new Error(
              `options.expiresOn should be later than now: ${now.toUTCString()} when using mode ${mode}, but is ${options.expiresOn?.toUTCString()}`,
            );
          }
          expiresOn = options.expiresOn!.toUTCString();
        }

        const adaptedOptions = { ...options, expiresOn };
        return assertResponse<PathSetExpiryHeaders, PathSetExpiryHeaders>(
          await this.pathContextInternalToBlobEndpoint.setExpiry(mode, {
            ...adaptedOptions,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
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
  public generateSasUrl(options: FileGenerateSasUrlOptions): Promise<string> {
    return new Promise((resolve) => {
      if (!(this.credential instanceof StorageSharedKeyCredential)) {
        throw RangeError(
          "Can only generate the SAS when the client is initialized with a shared key credential",
        );
      }

      const sas = generateDataLakeSASQueryParameters(
        {
          fileSystemName: this.fileSystemName,
          pathName: this.name,
          ...options,
        },
        this.credential,
      ).toString();

      resolve(appendToURLQuery(this.url, sas));
    });
  }
}
