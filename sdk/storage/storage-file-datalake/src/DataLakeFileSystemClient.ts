// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { TokenCredential } from "@azure/core-auth";
import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { ContainerClient } from "@azure/storage-blob";
import type { Pipeline, StoragePipelineOptions } from "./Pipeline.js";
import { isPipelineLike, newPipeline } from "./Pipeline.js";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential.js";
import { AnonymousCredential } from "@azure/storage-blob";
import { DataLakeLeaseClient } from "./DataLakeLeaseClient.js";
import { FileSystemOperationsImpl as FileSystem } from "./generated/src/operations/index.js";
import type {
  AccessPolicy,
  FileSystemCreateOptions,
  FileSystemCreateResponse,
  FileSystemDeleteOptions,
  FileSystemDeleteResponse,
  FileSystemExistsOptions,
  FileSystemGetAccessPolicyOptions,
  FileSystemGetAccessPolicyResponse,
  FileSystemGetPropertiesOptions,
  FileSystemGetPropertiesResponse,
  FileSystemSetAccessPolicyOptions,
  FileSystemSetAccessPolicyResponse,
  FileSystemSetMetadataOptions,
  FileSystemSetMetadataResponse,
  ListPathsOptions,
  ListPathsSegmentOptions,
  Metadata,
  Path,
  PublicAccessType,
  SignedIdentifier,
  FileSystemListPathsResponse,
  FileSystemCreateIfNotExistsResponse,
  FileSystemDeleteIfExistsResponse,
  FileSystemGenerateSasUrlOptions,
  FileSystemListDeletedPathsResponse,
  ListDeletedPathsOptions,
  DeletedPath,
  FileSystemUndeletePathResponse,
  FileSystemUndeletePathOption,
  ListDeletedPathsSegmentOptions,
  PathUndeleteHeaders,
} from "./models.js";
import { StorageClient } from "./StorageClient.js";
import { toContainerPublicAccessType, toPublicAccessType, toPermissions } from "./transforms.js";
import { tracingClient } from "./utils/tracing.js";
import {
  appendToURLPath,
  appendToURLQuery,
  assertResponse,
  EscapePath,
  windowsFileTimeTicksToTime,
} from "./utils/utils.common.js";
import { DataLakeFileClient, DataLakeDirectoryClient } from "./clients.js";
import {
  generateDataLakeSASQueryParameters,
  generateDataLakeSASQueryParametersInternal,
} from "./sas/DataLakeSASSignatureValues.js";
import { DeletionIdKey, PathResultTypeConstants } from "./utils/constants.js";
import { PathClientInternal } from "./utils/PathClientInternal.js";
import { UserDelegationKey } from "@azure/storage-common";

/**
 * A DataLakeFileSystemClient represents a URL to the Azure Storage file system
 * allowing you to manipulate its directories and files.
 */
export class DataLakeFileSystemClient extends StorageClient {
  /**
   * fileSystemContext provided by protocol layer.
   */
  private fileSystemContext: FileSystem;

  /**
   * fileSystemContext provided by protocol layer.
   */
  private fileSystemContextToBlobEndpoint: FileSystem;

  /**
   * blobContainerClient provided by `@azure/storage-blob` package.
   */
  private blobContainerClient: ContainerClient;

  /**
   * Creates an instance of DataLakeFileSystemClient from url and credential.
   *
   * @param url - A Client string pointing to Azure Storage data lake file system, such as
   *                     "https://myaccount.dfs.core.windows.net/filesystem". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net/filesystem?sasString".
   * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: StoragePipelineOptions,
  );

  /**
   * Creates an instance of DataLakeFileSystemClient from url and pipeline.
   *
   * @param url - A Client string pointing to Azure Storage data lake file system, such as
   *                     "https://myaccount.dfs.core.windows.net/filesystem". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net/filesystem?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: Pipeline);

  constructor(
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

    this.fileSystemContext = new FileSystem(this.storageClientContext);
    this.fileSystemContextToBlobEndpoint = new FileSystem(this.storageClientContextToBlobEndpoint);
    this.blobContainerClient = new ContainerClient(this.blobEndpointUrl, this.pipeline);
  }

  /**
   * Name of current file system.
   *
   * @readonly
   */
  public get name(): string {
    return this.blobContainerClient.containerName;
  }

  /**
   * Creates a {@link DataLakeDirectoryClient} object under current file system.
   *
   * @param directoryName -
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients */
  public getDirectoryClient(directoryName: string): DataLakeDirectoryClient {
    return new DataLakeDirectoryClient(
      appendToURLPath(this.url, EscapePath(directoryName)),
      this.pipeline,
    );
  }

  /**
   * Creates a {@link DataLakeFileClient} object under current file system.
   *
   * @param fileName -
   */
  // Legacy, no way to fix the eslint error without breaking. Disable the rule for this line.
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients */
  public getFileClient(fileName: string): DataLakeFileClient {
    return new DataLakeFileClient(appendToURLPath(this.url, EscapePath(fileName)), this.pipeline);
  }

  /**
   * Get a {@link DataLakeLeaseClient} that manages leases on the file system.
   *
   * @param proposeLeaseId - Optional. Initial proposed lease Id.
   */
  public getDataLakeLeaseClient(proposeLeaseId?: string): DataLakeLeaseClient {
    return new DataLakeLeaseClient(this.blobContainerClient.getBlobLeaseClient(proposeLeaseId));
  }

  /**
   * Creates a new file system under the specified account. If the file system with
   * the same name already exists, the operation fails.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/create-container
   *
   * @param options - Optional. Options when creating file system.
   */
  public async create(options: FileSystemCreateOptions = {}): Promise<FileSystemCreateResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-create",
      options,
      async (updatedOptions) => {
        return this.blobContainerClient.create({
          ...options,
          access: toContainerPublicAccessType(options.access),
          tracingOptions: updatedOptions.tracingOptions,
          containerEncryptionScope: options.fileSystemEncryptionScope,
        });
      },
    );
  }

  /**
   * Creates a new file system under the specified account. If the file system with
   * the same name already exists, it is not changed.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/create-container
   *
   * @param options -
   */
  public async createIfNotExists(
    options: FileSystemCreateOptions = {},
  ): Promise<FileSystemCreateIfNotExistsResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        return this.blobContainerClient.createIfNotExists({
          ...options,
          access: toContainerPublicAccessType(options.access),
          containerEncryptionScope: options.fileSystemEncryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        });
      },
    );
  }

  /**
   * Returns true if the File system represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing file system might be deleted by other clients or
   * applications. Vice versa new file system with the same name might be added by other clients or
   * applications after this function completes.
   *
   * @param options -
   */
  public async exists(options: FileSystemExistsOptions = {}): Promise<boolean> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-exists",
      options,
      async (updatedOptions) => {
        return this.blobContainerClient.exists(updatedOptions);
      },
    );
  }

  /**
   * Delete current file system.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/delete-container
   *
   * @param options - Optional. Options when deleting file system.
   */
  public async delete(options: FileSystemDeleteOptions = {}): Promise<FileSystemDeleteResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-delete",
      options,
      async (updatedOptions) => {
        return this.blobContainerClient.delete({
          ...options,
          tracingOptions: updatedOptions.tracingOptions,
        });
      },
    );
  }

  /**
   * Delete current file system if it exists.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/delete-container
   *
   * @param options -
   */
  public async deleteIfExists(
    options: FileSystemDeleteOptions = {},
  ): Promise<FileSystemDeleteIfExistsResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-deleteIfExists",
      options,
      async (updatedOptions) => {
        return this.blobContainerClient.deleteIfExists(updatedOptions);
      },
    );
  }

  /**
   * Returns all user-defined metadata and system properties for the specified
   * file system.
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the `listFileSystems` method of {@link DataLakeServiceClient} using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/get-container-properties
   *
   * @param options - Optional. Options when getting file system properties.
   */
  public async getProperties(
    options: FileSystemGetPropertiesOptions = {},
  ): Promise<FileSystemGetPropertiesResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-getProperties",
      options,
      async (updatedOptions) => {
        const rawResponse = await this.blobContainerClient.getProperties({
          ...options,
          tracingOptions: updatedOptions.tracingOptions,
        });

        // Transfer and rename blobPublicAccess to publicAccess
        const response = rawResponse as FileSystemGetPropertiesResponse;

        response.publicAccess = toPublicAccessType(rawResponse.blobPublicAccess);
        response._response.parsedHeaders.publicAccess = response.publicAccess;

        delete rawResponse.blobPublicAccess;
        delete rawResponse._response.parsedHeaders.blobPublicAccess;

        return response;
      },
    );
  }

  /**
   * Sets one or more user-defined name-value pairs for the specified file system.
   *
   * If no option provided, or no metadata defined in the parameter, the file system
   * metadata will be removed.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/set-container-metadata
   *
   * @param metadata - Replace existing metadata with this value.
   *                              If no value provided the existing metadata will be removed.
   * @param options - Optional. Options when setting file system metadata.
   */
  public async setMetadata(
    metadata?: Metadata,
    options: FileSystemSetMetadataOptions = {},
  ): Promise<FileSystemSetMetadataResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-setMetadata",
      options,
      async (updatedOptions) => {
        return this.blobContainerClient.setMetadata(metadata, {
          ...options,
          tracingOptions: updatedOptions.tracingOptions,
        });
      },
    );
  }

  /**
   * Gets the permissions for the specified file system. The permissions indicate
   * whether file system data may be accessed publicly.
   *
   * WARNING: JavaScript Date will potentially lose precision when parsing startsOn and expiresOn strings.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/get-container-acl
   *
   * @param options - Optional. Options when getting file system access policy.
   */
  public async getAccessPolicy(
    options: FileSystemGetAccessPolicyOptions = {},
  ): Promise<FileSystemGetAccessPolicyResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-getAccessPolicy",
      options,
      async (updatedOptions) => {
        const rawResponse = await this.blobContainerClient.getAccessPolicy({
          ...options,
          tracingOptions: updatedOptions.tracingOptions,
        });

        // Transfer and rename blobPublicAccess to publicAccess
        const response = rawResponse as unknown as FileSystemGetAccessPolicyResponse;

        response.publicAccess = toPublicAccessType(rawResponse.blobPublicAccess);
        response._response.parsedHeaders.publicAccess = response.publicAccess;

        delete rawResponse.blobPublicAccess;
        delete rawResponse._response.parsedHeaders.blobPublicAccess;

        return response;
      },
    );
  }

  /**
   * Sets the permissions for the specified file system. The permissions indicate
   * whether directories or files in a file system may be accessed publicly.
   *
   * When you set permissions for a file system, the existing permissions are replaced.
   * If no access or containerAcl provided, the existing file system ACL will be
   * removed.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/set-container-acl
   *
   * @param access - Optional. The level of public access to data in the file system.
   * @param fileSystemAcl - Optional. Array of elements each having a unique Id and details of the access policy.
   * @param options - Optional. Options when setting file system access policy.
   */
  public async setAccessPolicy(
    access?: PublicAccessType,
    fileSystemAcl?: SignedIdentifier<AccessPolicy>[],
    options: FileSystemSetAccessPolicyOptions = {},
  ): Promise<FileSystemSetAccessPolicyResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-setAccessPolicy",
      options,
      async (updatedOptions) => {
        return this.blobContainerClient.setAccessPolicy(
          toContainerPublicAccessType(access),
          fileSystemAcl,
          {
            ...options,
            tracingOptions: updatedOptions.tracingOptions,
          },
        );
      },
    );
  }

  /**
   * Returns an async iterable iterator to list all the paths (directories and files)
   * under the specified file system.
   *
   * .byPage() returns an async iterable iterator to list the paths in pages.
   *
   * Example using `for await` syntax:
   *
   * ```ts snippet:ReadmeSampleListPaths
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const fileSystemName = "<file system name>";
   * const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
   *
   * let i = 1;
   * const paths = fileSystemClient.listPaths();
   * for await (const path of paths) {
   *   console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```ts snippet:ReadmeSampleListPaths_Iterator
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const fileSystemName = "<file system name>";
   * const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
   *
   * let i = 1;
   * const paths = fileSystemClient.listPaths();
   * let { value, done } = await paths.next();
   * while (!done) {
   *   console.log(`Path ${i++}: ${value.name}, is directory: ${value.isDirectory}`);
   *   ({ value, done } = await paths.next());
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```ts snippet:ReadmeSampleListPaths_ByPage
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const fileSystemName = "<file system name>";
   * const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
   *
   * let i = 1;
   * for await (const response of fileSystemClient.listPaths().byPage({ maxPageSize: 20 })) {
   *   if (response.pathItems) {
   *     for (const path of response.pathItems) {
   *       console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```ts snippet:ReadmeSampleListPaths_Continuation
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const fileSystemName = "<file system name>";
   * const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
   *
   * let i = 1;
   * let paths = fileSystemClient.listPaths().byPage({ maxPageSize: 2 });
   * let response = (await paths.next()).value;
   * // Prints 2 paths
   * if (response.pathItems) {
   *   for (const path of response.pathItems) {
   *     console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
   *   }
   * }
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * paths = fileSystemClient.listPaths().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await paths.next()).value;
   * // Prints 10 paths
   * if (response.pathItems) {
   *   for (const path of response.pathItems) {
   *     console.log(`Path ${i++}: ${path.name}, is directory: ${path.isDirectory}`);
   *   }
   * }
   * ```
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param options - Optional. Options when listing paths.
   */
  public listPaths(
    options: ListPathsOptions = {},
  ): PagedAsyncIterableIterator<Path, FileSystemListPathsResponse> {
    options.path = options.path === "" ? undefined : options.path;

    const iter = this.listItems(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => {
        return this.listSegments(settings.continuationToken, {
          maxResults: settings.maxPageSize,
          ...options,
        });
      },
    };
  }

  private async *listItems(options: ListPathsSegmentOptions = {}): AsyncIterableIterator<Path> {
    for await (const response of this.listSegments(undefined, options)) {
      yield* response.pathItems || [];
    }
  }

  private async *listSegments(
    continuation?: string,
    options: ListPathsSegmentOptions = {},
  ): AsyncIterableIterator<FileSystemListPathsResponse> {
    let response;
    if (!!continuation || continuation === undefined) {
      do {
        response = await this.listPathsSegment(continuation, options);
        continuation = response.continuation;
        yield response;
      } while (continuation);
    }
  }

  private async listPathsSegment(
    continuation?: string,
    options: ListPathsSegmentOptions = {},
  ): Promise<FileSystemListPathsResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-listPathsSegment",
      options,
      async (updatedOptions) => {
        const rawResponse = await this.fileSystemContext.listPaths(options.recursive || false, {
          continuation,
          ...updatedOptions,
          upn: options.userPrincipalName,
          beginFrom: options.startFrom,
        });

        const response = rawResponse as FileSystemListPathsResponse;
        response.pathItems = [];
        for (const path of rawResponse.paths || []) {
          response.pathItems.push({
            ...path,
            permissions: toPermissions(path.permissions),
            createdOn: windowsFileTimeTicksToTime(path.creationTime),
            expiresOn: windowsFileTimeTicksToTime(path.expiryTime),
          });
        }
        delete rawResponse.paths;

        return response;
      },
    );
  }

  /**
   * Returns an async iterable iterator to list all the paths (directories and files)
   * under the specified file system.
   *
   * .byPage() returns an async iterable iterator to list the paths in pages.
   *
   * Example using `for await` syntax:
   *
   * ```ts snippet:ReadmeSampleListDeletedPaths
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const fileSystemName = "<file system name>";
   * const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
   *
   * let i = 1;
   * const deletedPaths = fileSystemClient.listDeletedPaths();
   * for await (const deletedPath of deletedPaths) {
   *   console.log(`Deleted path ${i++}: ${deletedPath.name}, deleted on: ${deletedPath.deletedOn}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```ts snippet:ReadmeSampleListDeletedPaths_Iterator
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const fileSystemName = "<file system name>";
   * const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
   *
   * let i = 1;
   * const deletedPaths = fileSystemClient.listDeletedPaths();
   * let { value, done } = await deletedPaths.next();
   * while (!done) {
   *   console.log(`Deleted path ${i++}: ${value.name}, deleted on: ${value.deletedOn}`);
   *   ({ value, done } = await deletedPaths.next());
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```ts snippet:ReadmeSampleListDeletedPaths_ByPage
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const fileSystemName = "<file system name>";
   * const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
   *
   * let i = 1;
   * for await (const response of fileSystemClient.listDeletedPaths().byPage({ maxPageSize: 20 })) {
   *   if (response.pathItems) {
   *     for (const deletedPath of response.pathItems) {
   *       console.log(`Deleted path ${i++}: ${deletedPath.name}, deleted on: ${deletedPath.deletedOn}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```ts snippet:ReadmeSampleListDeletedPaths_Continuation
   * import { DataLakeServiceClient } from "@azure/storage-file-datalake";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const account = "<account>";
   * const datalakeServiceClient = new DataLakeServiceClient(
   *   `https://${account}.dfs.core.windows.net`,
   *   new DefaultAzureCredential(),
   * );
   *
   * const fileSystemName = "<file system name>";
   * const fileSystemClient = datalakeServiceClient.getFileSystemClient(fileSystemName);
   *
   * let i = 1;
   * let deletedPaths = fileSystemClient.listDeletedPaths().byPage({ maxPageSize: 2 });
   * let response = (await deletedPaths.next()).value;
   * // Prints 2 deleted paths
   * if (response.deletedPathItems) {
   *   for (const deletedPath of response.deletedPathItems) {
   *     console.log(`Deleted path ${i++}: ${deletedPath.name}, deleted on: ${deletedPath.deletedOn}`);
   *   }
   * }
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * deletedPaths = fileSystemClient
   *   .listDeletedPaths()
   *   .byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await deletedPaths.next()).value;
   * // Prints 10 deleted paths
   * if (response.deletedPathItems) {
   *   for (const deletedPath of response.deletedPathItems) {
   *     console.log(`Deleted path ${i++}: ${deletedPath.name}, deleted on: ${deletedPath.deletedOn}`);
   *   }
   * }
   * ```
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param options - Optional. Options when listing deleted paths.
   */
  public listDeletedPaths(
    options: ListDeletedPathsOptions = {},
  ): PagedAsyncIterableIterator<DeletedPath, FileSystemListDeletedPathsResponse> {
    const iter = this.listDeletedItems(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => {
        return this.listDeletedSegments(settings.continuationToken, {
          maxResults: settings.maxPageSize,
          ...options,
        });
      },
    };
  }
  private async *listDeletedItems(
    options: ListDeletedPathsOptions = {},
  ): AsyncIterableIterator<DeletedPath> {
    for await (const response of this.listDeletedSegments(undefined, options)) {
      yield* response.pathItems || [];
    }
  }

  private async *listDeletedSegments(
    continuation?: string,
    options: ListDeletedPathsSegmentOptions = {},
  ): AsyncIterableIterator<FileSystemListDeletedPathsResponse> {
    let response;
    if (!!continuation || continuation === undefined) {
      do {
        response = await this.listDeletedPathsSegment(continuation, options);
        continuation = response.continuation;
        yield response;
      } while (continuation);
    }
  }

  private async listDeletedPathsSegment(
    continuation?: string,
    options: ListDeletedPathsSegmentOptions = {},
  ): Promise<FileSystemListDeletedPathsResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-listDeletedPathsSegment",
      options,
      async (updatedOptions) => {
        const rawResponse = await this.fileSystemContextToBlobEndpoint.listBlobHierarchySegment({
          marker: continuation,
          ...updatedOptions,
          prefix: options.prefix === "" ? undefined : options.prefix,
        });

        const response = rawResponse as FileSystemListDeletedPathsResponse;
        response.pathItems = [];
        for (const path of rawResponse.segment.blobItems || []) {
          response.pathItems.push({
            name: path.name,
            deletionId: path.deletionId,
            deletedOn: path.properties.deletedTime,
            remainingRetentionDays: path.properties.remainingRetentionDays,
          });
        }

        if (response.nextMarker) {
          response.continuation = response.nextMarker;
        }

        return response;
      },
    );
  }

  /**
   * Restores a soft deleted path.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/undelete-blob
   *
   * @param deletedPath - Required.  The path of the deleted path.
   *
   * @param deletionId - Required.  The deletion ID associated with the soft deleted path.
   *
   */

  public async undeletePath(
    deletedPath: string,
    deletionId: string,
    options: FileSystemUndeletePathOption = {},
  ): Promise<FileSystemUndeletePathResponse> {
    return tracingClient.withSpan(
      "DataLakeFileSystemClient-undeletePath",
      options,
      async (updatedOptions) => {
        const pathClient = new PathClientInternal(
          appendToURLPath(this.blobEndpointUrl, EscapePath(deletedPath)),
          this.pipeline,
        );

        const rawResponse = assertResponse<PathUndeleteHeaders, PathUndeleteHeaders>(
          await pathClient.blobPathContext.undelete({
            undeleteSource: "?" + DeletionIdKey + "=" + deletionId,
            ...options,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );

        if (rawResponse.resourceType === PathResultTypeConstants.DirectoryResourceType) {
          return {
            pathClient: this.getDirectoryClient(deletedPath),
            ...rawResponse,
          };
        } else {
          return {
            pathClient: this.getFileClient(deletedPath),
            ...rawResponse,
          };
        }
      },
    );
  }

  /**
   * Only available for DataLakeFileSystemClient constructed with a shared key credential.
   *
   * Generates a Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateSasUrl(options: FileSystemGenerateSasUrlOptions): Promise<string> {
    return new Promise((resolve) => {
      if (!(this.credential instanceof StorageSharedKeyCredential)) {
        throw RangeError(
          "Can only generate the SAS when the client is initialized with a shared key credential",
        );
      }

      const sas = generateDataLakeSASQueryParameters(
        {
          fileSystemName: this.name,
          ...options,
        },
        this.credential,
      ).toString();

      resolve(appendToURLQuery(this.url, sas));
    });
  }

  /**
   * Only available for DataLakeFileSystemClient constructed with a shared key credential.
   *
   * Generates string to sign for a Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
  public generateSasStringToSign(options: FileSystemGenerateSasUrlOptions): string {
    if (!(this.credential instanceof StorageSharedKeyCredential)) {
      throw RangeError(
        "Can only generate the SAS when the client is initialized with a shared key credential",
      );
    }

    return generateDataLakeSASQueryParametersInternal(
      {
        fileSystemName: this.name,
        ...options,
      },
      this.credential,
    ).stringToSign;
  }

  /**
   * Generates a Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the input user delegation key.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @param userDelegationKey - Return value of `blobServiceClient.getUserDelegationKey()`
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateUserDelegationSasUrl(
    options: FileSystemGenerateSasUrlOptions,
    userDelegationKey: UserDelegationKey,
  ): Promise<string> {
    return new Promise((resolve) => {
      const sas = generateDataLakeSASQueryParameters(
        {
          fileSystemName: this.name,
          ...options,
        },
        userDelegationKey,
        this.accountName,
      ).toString();

      resolve(appendToURLQuery(this.url, sas));
    });
  }

  /**
   * Generates string to sign for a Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the input user delegation key.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @param userDelegationKey - Return value of `blobServiceClient.getUserDelegationKey()`
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */

  public generateUserDelegationSasStringToSign(
    options: FileSystemGenerateSasUrlOptions,
    userDelegationKey: UserDelegationKey,
  ): string {
    return generateDataLakeSASQueryParametersInternal(
      {
        fileSystemName: this.name,
        ...options,
      },
      userDelegationKey,
      this.accountName,
    ).stringToSign;
  }
}
