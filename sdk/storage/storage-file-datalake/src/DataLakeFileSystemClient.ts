// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { TokenCredential } from "@azure/core-http";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { ContainerClient } from "@azure/storage-blob";
import { CanonicalCode } from "@opentelemetry/api";

import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { DataLakeLeaseClient } from "./DataLakeLeaseClient";
import { FileSystemOperations } from "./generated/src/operations";
import {
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
  FileSystemDeleteIfExistsResponse
} from "./models";
import { newPipeline, Pipeline, StoragePipelineOptions } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { toContainerPublicAccessType, toPublicAccessType, toPermissions } from "./transforms";
import { createSpan } from "./utils/tracing";
import { appendToURLPath } from "./utils/utils.common";
import { DataLakeFileClient, DataLakeDirectoryClient } from "./clients";

/**
 * A DataLakeFileSystemClient represents a URL to the Azure Storage file system
 * allowing you to manipulate its directories and files.
 *
 * @export
 * @class DataLakeFileSystemClient
 * @extends {StorageClient}
 */
export class DataLakeFileSystemClient extends StorageClient {
  /**
   * fileSystemContext provided by protocol layer.
   *
   * @private
   * @type {FileSystemOperations}
   * @memberof DataLakeFileSystemClient
   */
  private fileSystemContext: FileSystemOperations;

  /**
   * blobContainerClient provided by @azure/storage-blob package.
   *
   * @private
   * @type {ContainerClient}
   * @memberof DataLakeFileSystemClient
   */
  private blobContainerClient: ContainerClient;

  /**
   * Creates an instance of DataLakeFileSystemClient from url and credential.
   *
   * @param {string} url A Client string pointing to Azure Storage data lake file system, such as
   *                     "https://myaccount.dfs.core.windows.net/filesystem". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net/filesystem?sasString".
   * @param {(StorageSharedKeyCredential | AnonymousCredential | TokenCredential)} [credential] Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof DataLakeFileSystemClient
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );

  /**
   * Creates an instance of DataLakeFileSystemClient from url and pipeline.
   *
   * @param {string} url A Client string pointing to Azure Storage data lake file system, such as
   *                     "https://myaccount.dfs.core.windows.net/filesystem". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.dfs.core.windows.net/filesystem?sasString".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof DataLakeFileSystemClient
   */
  constructor(url: string, pipeline: Pipeline);

  constructor(
    url: string,
    credentialOrPipeline?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    options?: StoragePipelineOptions
  ) {
    if (credentialOrPipeline instanceof Pipeline) {
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

    this.fileSystemContext = new FileSystemOperations(this.storageClientContext);
    this.blobContainerClient = new ContainerClient(this.blobEndpointUrl, this.pipeline);
  }

  /**
   * Name of current file system.
   *
   * @readonly
   * @type {string}
   * @memberof DataLakeFileSystemClient
   */
  public get name(): string {
    return this.blobContainerClient.containerName;
  }

  /**
   * Creates a {@link DataLakeDirectoryClient} object under current file system.
   *
   * @param {string} directoryName
   * @returns {DataLakeDirectoryClient}
   * @memberof DataLakeFileSystemClient
   */
  public getDirectoryClient(directoryName: string): DataLakeDirectoryClient {
    return new DataLakeDirectoryClient(
      appendToURLPath(this.url, encodeURIComponent(directoryName)),
      this.pipeline
    );
  }

  /**
   * Creates a {@link DataLakeFileClient} object under current file system.
   *
   * @param {string} fileName
   * @returns {DataLakeFileClient}
   * @memberof DataLakeFileSystemClient
   */
  public getFileClient(fileName: string): DataLakeFileClient {
    return new DataLakeFileClient(
      appendToURLPath(this.url, encodeURIComponent(fileName)),
      this.pipeline
    );
  }

  /**
   * Get a {@link DataLakeLeaseClient} that manages leases on the file system.
   *
   * @param {string} [proposeLeaseId] Optional. Initial proposed lease Id.
   * @returns {DataLakeLeaseClient}
   * @memberof DataLakeFileSystemClient
   */
  public getDataLakeLeaseClient(proposeLeaseId?: string): DataLakeLeaseClient {
    return new DataLakeLeaseClient(this.blobContainerClient.getBlobLeaseClient(proposeLeaseId));
  }

  /**
   * Creates a new file system under the specified account. If the file system with
   * the same name already exists, the operation fails.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param {FileSystemCreateOptions} [options={}] Optional. Options when creating file system.
   * @returns {Promise<FileSystemCreateResponse>}
   * @memberof DataLakeFileSystemClient
   */
  public async create(options: FileSystemCreateOptions = {}): Promise<FileSystemCreateResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-create",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.create({
        ...options,
        access: toContainerPublicAccessType(options.access),
        tracingOptions: { ...options.tracingOptions, spanOptions }
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
   * Creates a new file system under the specified account. If the file system with
   * the same name already exists, it is not changed.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param {FileSystemCreateOptions} [options={}]
   * @returns {Promise<FileSystemCreateIfNotExistsResponse>}
   * @memberof DataLakeFileSystemClient
   */
  public async createIfNotExists(
    options: FileSystemCreateOptions = {}
  ): Promise<FileSystemCreateIfNotExistsResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-createIfNotExists",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.createIfNotExists({
        ...options,
        access: toContainerPublicAccessType(options.access),
        tracingOptions: { ...options.tracingOptions, spanOptions }
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
   * Returns true if the File system represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing file system might be deleted by other clients or
   * applications. Vice versa new file system with the same name might be added by other clients or
   * applications after this function completes.
   *
   * @param {FileSystemExistsOptions} [options={}]
   * @returns {Promise<boolean>}
   * @memberof DataLakeFileSystemClient
   */
  public async exists(options: FileSystemExistsOptions = {}): Promise<boolean> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-exists",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.exists({
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
   * Delete current file system.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
   *
   * @param {FileSystemDeleteOptions} [options={}] Optional. Options when deleting file system.
   * @returns {Promise<FileSystemDeleteResponse>}
   * @memberof DataLakeFileSystemClient
   */
  public async delete(options: FileSystemDeleteOptions = {}): Promise<FileSystemDeleteResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-delete",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.delete({
        ...options,
        tracingOptions: { ...options.tracingOptions, spanOptions }
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
   * Delete current file system if it exists.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
   *
   * @param {FileSystemDeleteOptions} [options={}]
   * @returns {Promise<FileSystemDeleteIfExistsResponse>}
   * @memberof DataLakeFileSystemClient
   */
  public async deleteIfExists(
    options: FileSystemDeleteOptions = {}
  ): Promise<FileSystemDeleteIfExistsResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-deleteIfExists",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.deleteIfExists({
        ...options,
        tracingOptions: { ...options.tracingOptions, spanOptions }
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
   * Returns all user-defined metadata and system properties for the specified
   * file system.
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the `listFileSystems` method of {@link DataLakeServiceClient} using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-properties
   *
   * @param {FileSystemGetPropertiesOptions} [options={}] Optional. Options when getting file system properties.
   * @returns {Promise<FileSystemGetPropertiesResponse>}
   * @memberof DataLakeFileSystemClient
   */
  public async getProperties(
    options: FileSystemGetPropertiesOptions = {}
  ): Promise<FileSystemGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-getProperties",
      options.tracingOptions
    );
    try {
      const rawResponse = await this.blobContainerClient.getProperties({
        ...options,
        tracingOptions: { ...options.tracingOptions, spanOptions }
      });

      // Transfer and rename blobPublicAccess to publicAccess
      const response = rawResponse as FileSystemGetPropertiesResponse;

      response.publicAccess = toPublicAccessType(rawResponse.blobPublicAccess);
      response._response.parsedHeaders.publicAccess = response.publicAccess;

      delete rawResponse.blobPublicAccess;
      delete rawResponse._response.parsedHeaders.blobPublicAccess;

      return response;
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
   * Sets one or more user-defined name-value pairs for the specified file system.
   *
   * If no option provided, or no metadata defined in the parameter, the file system
   * metadata will be removed.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-metadata
   *
   * @param {Metadata} [metadata] Replace existing metadata with this value.
   *                              If no value provided the existing metadata will be removed.
   * @param {FileSystemSetMetadataOptions} [options={}] Optional. Options when setting file system metadata.
   * @returns {Promise<FileSystemSetMetadataResponse>}
   * @memberof DataLakeFileSystemClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: FileSystemSetMetadataOptions = {}
  ): Promise<FileSystemSetMetadataResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-setMetadata",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.setMetadata(metadata, {
        ...options,
        tracingOptions: { ...options.tracingOptions, spanOptions }
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
   * Gets the permissions for the specified file system. The permissions indicate
   * whether file system data may be accessed publicly.
   *
   * WARNING: JavaScript Date will potentially lose precision when parsing startsOn and expiresOn strings.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-acl
   *
   * @param {FileSystemGetAccessPolicyOptions} [options={}] Optional. Options when getting file system access policy.
   * @returns {Promise<FileSystemGetAccessPolicyResponse>}
   * @memberof DataLakeFileSystemClient
   */
  public async getAccessPolicy(
    options: FileSystemGetAccessPolicyOptions = {}
  ): Promise<FileSystemGetAccessPolicyResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-getAccessPolicy",
      options.tracingOptions
    );
    try {
      const rawResponse = await this.blobContainerClient.getAccessPolicy({
        ...options,
        tracingOptions: { ...options.tracingOptions, spanOptions }
      });

      // Transfer and rename blobPublicAccess to publicAccess
      const response = (rawResponse as unknown) as FileSystemGetAccessPolicyResponse;

      response.publicAccess = toPublicAccessType(rawResponse.blobPublicAccess);
      response._response.parsedHeaders.publicAccess = response.publicAccess;

      delete rawResponse.blobPublicAccess;
      delete rawResponse._response.parsedHeaders.blobPublicAccess;

      return response;
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
   * Sets the permissions for the specified file system. The permissions indicate
   * whether directories or files in a file system may be accessed publicly.
   *
   * When you set permissions for a file system, the existing permissions are replaced.
   * If no access or containerAcl provided, the existing file system ACL will be
   * removed.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
   *
   * @param {PublicAccessType} [access] Optional. The level of public access to data in the file system.
   * @param {SignedIdentifier<AccessPolicy>[]} [fileSystemAcl] Optional. Array of elements each having a unique Id and details of the access policy.
   * @param {FileSystemSetAccessPolicyOptions} [options={}] Optional. Options when setting file system access policy.
   * @returns {Promise<FileSystemSetAccessPolicyResponse>}
   * @memberof DataLakeFileSystemClient
   */
  public async setAccessPolicy(
    access?: PublicAccessType,
    fileSystemAcl?: SignedIdentifier<AccessPolicy>[],
    options: FileSystemSetAccessPolicyOptions = {}
  ): Promise<FileSystemSetAccessPolicyResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-setAccessPolicy",
      options.tracingOptions
    );
    try {
      return await this.blobContainerClient.setAccessPolicy(
        toContainerPublicAccessType(access),
        fileSystemAcl,
        {
          ...options,
          tracingOptions: { ...options.tracingOptions, spanOptions }
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
   * Returns an async iterable iterator to list all the paths (directories and files)
   * under the specified file system.
   *
   * .byPage() returns an async iterable iterator to list the paths in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * // Get the fileSystemClient before you run these snippets,
   * // Can be obtained from `serviceClient.getFileSystemClient("<your-filesystem-name>");`
   * let i = 1;
   * for await (const path of fileSystemClient.listPaths()) {
   *   console.log(`Path ${i++}: ${path.name}, isDirectory?: ${path.isDirectory}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = fileSystemClient.listPaths();
   * let pathItem = await iter.next();
   * while (!pathItem.done) {
   *   console.log(`Path ${i++}: ${pathItem.value.name}, isDirectory?: ${pathItem.value.isDirectory}`);
   *   pathItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of fileSystemClient.listPaths().byPage({ maxPageSize: 20 })) {
   *   for (const path of response.pathItems) {
   *     console.log(`Path ${i++}: ${path.name}, isDirectory?: ${path.isDirectory}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = fileSystemClient.listPaths().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 path names
   * for (const path of response.pathItems) {
   *   console.log(`Path ${i++}: ${path.name}, isDirectory?: ${path.isDirectory}`);
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   *
   * // Passing next marker as continuationToken
   *
   * iterator = fileSystemClient.listPaths().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 path names
   * for (const path of response.pathItems) {
   *   console.log(`Path ${i++}: ${path.name}, isDirectory?: ${path.isDirectory}`);
   * }
   * ```
   *
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param {ListPathsOptions} [options={}] Optional. Options when listing paths.
   * @returns {PagedAsyncIterableIterator<Path, FileSystemListPathsResponse>}
   * @memberof DataLakeFileSystemClient
   */
  public listPaths(
    options: ListPathsOptions = {}
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
          ...options
        });
      }
    };
  }

  private async *listItems(options: ListPathsSegmentOptions = {}): AsyncIterableIterator<Path> {
    for await (const response of this.listSegments(undefined, options)) {
      yield* response.pathItems || [];
    }
  }

  private async *listSegments(
    continuation?: string,
    options: ListPathsSegmentOptions = {}
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
    options: ListPathsSegmentOptions = {}
  ): Promise<FileSystemListPathsResponse> {
    const { span, spanOptions } = createSpan(
      "DataLakeFileSystemClient-listPathsSegment",
      options.tracingOptions
    );
    try {
      const rawResponse = await this.fileSystemContext.listPaths(options.recursive || false, {
        continuation,
        ...options,
        upn: options.userPrincipalName,
        spanOptions
      });

      const response = rawResponse as FileSystemListPathsResponse;
      response.pathItems = [];
      for (const path of rawResponse.paths || []) {
        response.pathItems.push({
          ...path,
          permissions: toPermissions(path.permissions)
        });
      }
      delete rawResponse.paths;

      return response;
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
