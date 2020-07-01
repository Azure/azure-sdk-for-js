// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  DirectoryCreateResponse,
  DirectoryDeleteResponse,
  DirectoryGetPropertiesResponse,
  DirectoryItem,
  DirectoryListFilesAndDirectoriesSegmentResponse,
  DirectoryListHandlesResponse,
  DirectorySetMetadataResponse,
  DirectorySetPropertiesResponse,
  FileCreateResponse,
  FileDeleteResponse,
  FileItem,
  HandleItem,
  DirectoryForceCloseHandlesHeaders
} from "./generatedModels";
import { Directory } from "./generated/src/operations";
import {
  Metadata,
  FileAndDirectoryCreateCommonOptions,
  FileAndDirectorySetPropertiesCommonOptions,
  validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions,
  fileAttributesToString,
  fileCreationTimeToString,
  fileLastWriteTimeToString,
  validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions,
  CloseHandlesInfo
} from "./models";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import { appendToURLPath, getShareNameAndPathFromUrl } from "./utils/utils.common";
import { StorageClient, CommonOptions } from "./StorageClient";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { ShareFileClient, FileCreateOptions, FileDeleteOptions } from "./ShareFileClient";
import { Credential } from "./credentials/Credential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { FileSystemAttributes } from "./FileSystemAttributes";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@opentelemetry/api";
import { HttpResponse } from "@azure/core-http";

/**
 * Options to configure {@link ShareDirectoryClient.create} operation.
 *
 * @export
 * @interface DirectoryCreateOptions
 */
export interface DirectoryCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryCreateOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the file storage object.
   *
   * @type {Metadata}
   * @memberof DirectoryCreateOptions
   */
  metadata?: Metadata;
}

export interface DirectoryProperties
  extends FileAndDirectorySetPropertiesCommonOptions,
    CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryProperties
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
 *
 * @interface DirectoryListFilesAndDirectoriesSegmentOptions
 */
interface DirectoryListFilesAndDirectoriesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryListFilesAndDirectoriesSegmentOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only entries whose
   * name begins with the specified prefix.
   *
   * @type {string}
   * @memberof DirectoryListFilesAndDirectoriesSegmentOptions
   */
  prefix?: string;

  /**
   * Specifies the maximum number of entries to
   * return. If the request does not specify maxResults, or specifies a value
   * greater than 5,000, the server will return up to 5,000 items.
   *
   * @type {number}
   * @memberof DirectoryListFilesAndDirectoriesSegmentOptions
   */
  maxResults?: number;
}

/**
 * Options to configure {@link ShareDirectoryClient.listFilesAndDirectories} operation.
 *
 * @export
 * @interface DirectoryListFilesAndDirectoriesOptions
 */
export interface DirectoryListFilesAndDirectoriesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryListFilesAndDirectoriesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only entries whose
   * name begins with the specified prefix.
   *
   * @type {string}
   * @memberof DirectoryListFilesAndDirectoriesOptions
   */
  prefix?: string;
}

/**
 * Options to configure the {@link ShareDirectoryClient.delete} operation.
 *
 * @export
 * @interface DirectoryDeleteOptions
 */
export interface DirectoryDeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryDeleteOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareDirectoryClient.exists} operation.
 *
 * @export
 * @interface DirectoryExistsOptions
 */
export interface DirectoryExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryExistsOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareDirectoryClient.getProperties} operation.
 *
 * @export
 * @interface DirectoryGetPropertiesOptions
 */
export interface DirectoryGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryGetPropertiesOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link ShareDirectoryClient.setMetadata} operation.
 *
 * @export
 * @interface DirectorySetMetadataOptions
 */
export interface DirectorySetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectorySetMetadataOptions
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
 *
 * @export
 * @interface DirectoryListHandlesSegmentOptions
 */
export interface DirectoryListHandlesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryListHandlesSegmentOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the maximum number of entries to return. If the request does not specify maxResults,
   * or specifies a value greater than 5,000, the server will return up to 5,000 items.
   *
   * @type {number}
   * @memberof DirectoryListHandlesSegmentOptions
   */
  maxResults?: number;
  /**
   * Specifies operation should apply to the directory specified in the URI, its files, its
   * subdirectories and their files.
   *
   * @type {boolean}
   * @memberof DirectoryListHandlesSegmentOptions
   */
  recursive?: boolean;
}

/**
 * Options to configure the {@link ShareDirectoryClient.listHandles} operation.
 *
 * @export
 * @interface DirectoryListHandlesOptions
 */
export interface DirectoryListHandlesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryListHandlesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies whether operation should apply to the directory specified in the URI, its files, its
   * subdirectories and their files.
   *
   * @type {boolean}
   * @memberof DirectoryListHandlesOptions
   */
  recursive?: boolean;
}

/**
 * Options to configure Directory - Force Close Handles Segment operations.
 *
 * See:
 * - {@link ShareDirectoryClient.forceCloseHandlesSegment}
 * - {@link ShareDirectoryClient.forceCloseAllHandles}
 *
 * @export
 * @interface DirectoryForceCloseHandlesSegmentOptions
 */
export interface DirectoryForceCloseHandlesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryForceCloseHandlesSegmentOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies operation should apply to the directory specified in the URI, its files, its
   * subdirectories and their files.
   *
   * @type {boolean}
   * @memberof DirectoryForceCloseHandlesSegmentOptions
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
export type DirectoryForceCloseHandlesResponse = CloseHandlesInfo &
  DirectoryCloseHandlesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: DirectoryForceCloseHandlesHeaders;
    };
  };

/**
 * Options to configure {@link ShareDirectoryClient.forceCloseHandle}.
 *
 * @export
 * @interface DirectoryForceCloseHandlesOptions
 */
export interface DirectoryForceCloseHandlesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryForceCloseHandlesOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the {@link DirectoryClient.createIfNotExists} operation.
 *
 * @export
 * @interface DirectoryCreateIfNotExistsResponse
 */
export interface DirectoryCreateIfNotExistsResponse extends DirectoryCreateResponse {
  /**
   * Indicate whether the directory is successfully created. Is false when the directory is not changed as it already exists.
   *
   * @type {boolean}
   * @memberof DirectoryCreateIfNotExistsResponse
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link DirectoryClient.deleteIfExists} operation.
 *
 * @export
 * @interface DirectoryDeleteIfExistsResponse
 */
export interface DirectoryDeleteIfExistsResponse extends DirectoryDeleteResponse {
  /**
   * Indicate whether the directory is successfully deleted. Is false if the directory does not exist in the first place.
   *
   * @type {boolean}
   * @memberof DirectoryDeleteIfExistsResponse
   */
  succeeded: boolean;
}

/**
 * A ShareDirectoryClient represents a URL to the Azure Storage directory allowing you to manipulate its files and directories.
 *
 * @export
 * @class ShareDirectoryClient
 */
export class ShareDirectoryClient extends StorageClient {
  /**
   * context provided by protocol layer.
   *
   * @private
   * @type {Directory}
   * @memberof ShareDirectoryClient
   */
  private context: Directory;

  private _shareName: string;
  private _path: string;
  private _name: string;

  /**
   * The share name corresponding to this directory client
   *
   * @type {string}
   * @memberof ShareDirectoryClient
   */
  public get shareName(): string {
    return this._shareName;
  }

  /**
   * The full path of the directory
   *
   * @type {string}
   * @memberof ShareDirectoryClient
   */
  public get path(): string {
    return this._path;
  }

  /**
   * The name of the directory
   *
   * @type {string}
   * @memberof ShareDirectoryClient
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Creates an instance of DirectoryClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file directory, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a directory.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a directory name includes %, directory name must be encoded in the URL.
   *                     Such as a directory named "mydir%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydir%25".
   * @param {Credential} [credential] Such as AnonymousCredential or StorageSharedKeyCredential.
   *                                  If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ShareDirectoryClient
   */
  constructor(url: string, credential?: Credential, options?: StoragePipelineOptions);
  /**
   * Creates an instance of DirectoryClient.
   *
   * @param {string} url A URL string pointing to Azure Storage file directory, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.file.core.windows.net/myshare/mydirectory?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a directory.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a directory name includes %, directory name must be encoded in the URL.
   *                     Such as a directory named "mydir%", the URL should be "https://myaccount.file.core.windows.net/myshare/mydir%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ShareDirectoryClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    url: string,
    credentialOrPipeline?: Credential | Pipeline,
    options: StoragePipelineOptions = {}
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
    ({
      baseName: this._name,
      shareName: this._shareName,
      path: this._path
    } = getShareNameAndPathFromUrl(this.url));
    this.context = new Directory(this.storageClientContext);
  }

  /**
   * Creates a new directory under the specified share or parent directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param {DirectoryCreateOptions} [options] Options to Directory Create operation.
   * @returns {Promise<DirectoryCreateResponse>} Response data for the Directory  operation.
   * @memberof ShareDirectoryClient
   */
  public async create(options: DirectoryCreateOptions = {}): Promise<DirectoryCreateResponse> {
    const { span, spanOptions } = createSpan("ShareDirectoryClient-create", options.tracingOptions);
    try {
      if (!options.fileAttributes) {
        options = validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions(options);
        // By default set it as a directory.
        const attributes: FileSystemAttributes = new FileSystemAttributes();
        attributes.directory = true;
        options.fileAttributes = attributes;
      }

      return await this.context.create(
        fileAttributesToString(options.fileAttributes!),
        fileCreationTimeToString(options.creationTime!),
        fileLastWriteTimeToString(options.lastWriteTime!),
        {
          abortSignal: options.abortSignal,
          metadata: options.metadata,
          filePermission: options.filePermission,
          filePermissionKey: options.filePermissionKey,
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
   * Creates a new directory under the specified share or parent directory if it does not already exists.
   * If the directory already exists, it is not modified.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param {DirectoryCreateOptions} [options]
   * @returns {Promise<DirectoryCreateIfNotExistsResponse>}
   * @memberof ShareDirectoryClient
   */
  public async createIfNotExists(
    options: DirectoryCreateOptions = {}
  ): Promise<DirectoryCreateIfNotExistsResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-createIfNotExists",
      options.tracingOptions
    );
    try {
      const res = await this.create({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        succeeded: true,
        ...res
      };
    } catch (e) {
      if (e.details?.errorCode === "ResourceAlreadyExists") {
        span.setStatus({
          code: CanonicalCode.ALREADY_EXISTS,
          message: "Expected exception when creating a directory only if it does not already exist."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }
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
   * Sets properties on the directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-properties
   *
   * @param {properties} [DirectoryProperties] Directory properties. If no values are provided,
   *                                            existing values will be preserved.
   * @returns {Promise<DirectorySetPropertiesResponse>}
   * @memberof ShareDirectoryClient
   */
  public async setProperties(
    properties: DirectoryProperties = {}
  ): Promise<DirectorySetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-setProperties",
      properties.tracingOptions
    );
    try {
      properties = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(properties);

      return await this.context.setProperties(
        fileAttributesToString(properties.fileAttributes!),
        fileCreationTimeToString(properties.creationTime!),
        fileLastWriteTimeToString(properties.lastWriteTime!),
        {
          abortSignal: properties.abortSignal,
          filePermission: properties.filePermission,
          filePermissionKey: properties.filePermissionKey,
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
   * Creates a ShareDirectoryClient object for a sub directory.
   *
   * @param subDirectoryName A subdirectory name
   * @returns {ShareDirectoryClient} The ShareDirectoryClient object for the given subdirectory name.
   * @memberof ShareDirectoryClient
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
      appendToURLPath(this.url, encodeURIComponent(subDirectoryName)),
      this.pipeline
    );
  }

  /**
   * Creates a new subdirectory under this directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param {string} directoryName
   * @param {DirectoryCreateOptions} [options] Options to Directory Create operation.
   * @returns {Promise<{ directoryClient: ShareDirectoryClient; directoryCreateResponse: DirectoryCreateResponse; }>} Directory create response data and the corresponding DirectoryClient instance.
   * @memberof ShareDirectoryClient
   */
  public async createSubdirectory(
    directoryName: string,
    options: DirectoryCreateOptions = {}
  ): Promise<{
    directoryClient: ShareDirectoryClient;
    directoryCreateResponse: DirectoryCreateResponse;
  }> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-createSubdirectory",
      options.tracingOptions
    );
    try {
      const directoryClient = this.getDirectoryClient(directoryName);
      const directoryCreateResponse = await directoryClient.create({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
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
   * Removes the specified empty sub directory under this directory.
   * Note that the directory must be empty before it can be deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {string} directoryName
   * @param {DirectoryDeleteOptions} [options] Options to Directory Delete operation.
   * @returns {DirectoryDeleteResponse} Directory deletion response data.
   * @memberof ShareDirectoryClient
   */
  public async deleteSubdirectory(
    directoryName: string,
    options: DirectoryDeleteOptions = {}
  ): Promise<DirectoryDeleteResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-deleteSubdirectory",
      options.tracingOptions
    );
    try {
      const directoryClient = this.getDirectoryClient(directoryName);
      return await directoryClient.delete({
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
   * Creates a new file or replaces a file under this directory. Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param {string} fileName
   * @param {number} size Specifies the maximum size in bytes for the file, up to 1 TB.
   * @param {FileCreateOptions} [options] Options to File Create operation.
   * @returns {Promise<{ fileClient: ShareFileClient, fileCreateResponse: FileCreateResponse }>} File creation response data and the corresponding file client.
   * @memberof ShareDirectoryClient
   */
  public async createFile(
    fileName: string,
    size: number,
    options: FileCreateOptions = {}
  ): Promise<{ fileClient: ShareFileClient; fileCreateResponse: FileCreateResponse }> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-createFile",
      options.tracingOptions
    );
    try {
      const fileClient = this.getFileClient(fileName);
      const fileCreateResponse = await fileClient.create(size, {
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
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
   * @param {string} fileName Name of the file to delete
   * @param {FileDeleteOptions} [options] Options to File Delete operation.
   * @returns {Promise<FileDeleteResponse>} File deletion response data.
   * @memberof ShareDirectoryClient
   */
  public async deleteFile(
    fileName: string,
    options: FileDeleteOptions = {}
  ): Promise<FileDeleteResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-deleteFile",
      options.tracingOptions
    );
    try {
      const fileClient = this.getFileClient(fileName);
      return await fileClient.delete({
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
   * Creates a {@link ShareFileClient} object.
   *
   * @param {string} fileName A file name.
   * @returns {ShareFileClient} A new ShareFileClient object for the given file name.
   * @memberof ShareFileClient
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
  public getFileClient(fileName: string): ShareFileClient {
    return new ShareFileClient(
      appendToURLPath(this.url, encodeURIComponent(fileName)),
      this.pipeline
    );
  }

  /**
   * Returns true if the specified directory exists; false otherwise.
   *
   * NOTE: use this function with care since an existing directory might be deleted by other clients or
   * applications. Vice versa new directories might be added by other clients or applications after this
   * function completes.
   *
   * @param {DirectoryExistsOptions} [options] options to Exists operation.
   * @returns {Promise<boolean>}
   * @memberof ShareDirectoryClient
   */
  public async exists(options: DirectoryExistsOptions = {}): Promise<boolean> {
    const { span, spanOptions } = createSpan("ShareDirectoryClient-exists", options.tracingOptions);
    try {
      await this.getProperties({
        abortSignal: options.abortSignal,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
      return true;
    } catch (e) {
      if (e.statusCode === 404) {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when checking directory existence"
        });
        return false;
      }
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
   * Returns all system properties for the specified directory, and can also be used to check the
   * existence of a directory. The data returned does not include the files in the directory or any
   * subdirectories.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-directory-properties
   *
   * @param {DirectoryGetPropertiesOptions} [options] Options to Directory Get Properties operation.
   * @returns {Promise<DirectoryGetPropertiesResponse>} Response data for the Directory Get Properties operation.
   * @memberof ShareDirectoryClient
   */
  public async getProperties(
    options: DirectoryGetPropertiesOptions = {}
  ): Promise<DirectoryGetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-getProperties",
      options.tracingOptions
    );
    try {
      return await this.context.getProperties({
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
   * Removes the specified empty directory. Note that the directory must be empty before it can be
   * deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {DirectoryDeleteOptions} [options] Options to Directory Delete operation.
   * @returns {Promise<DirectoryDeleteResponse>} Response data for the Directory Delete operation.
   * @memberof ShareDirectoryClient
   */
  public async delete(options: DirectoryDeleteOptions = {}): Promise<DirectoryDeleteResponse> {
    const { span, spanOptions } = createSpan("ShareDirectoryClient-delete", options.tracingOptions);
    try {
      return await this.context.deleteMethod({
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
   * Removes the specified empty directory if it exists. Note that the directory must be empty before it can be
   * deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {DirectoryDeleteOptions} [options]
   * @returns {Promise<DirectoryDeleteIfExistsResponse>}
   * @memberof ShareDirectoryClient
   */
  public async deleteIfExists(
    options: DirectoryDeleteOptions = {}
  ): Promise<DirectoryDeleteIfExistsResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-deleteIfExists",
      options.tracingOptions
    );
    try {
      const res = await this.delete({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        succeeded: true,
        ...res
      };
    } catch (e) {
      if (e.details?.errorCode === "ResourceNotFound") {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when deleting a directory only if it exists."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }
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
   * Updates user defined metadata for the specified directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing directory metadata will be removed
   * @param {DirectorySetMetadataOptions} [options] Options to Directory Set Metadata operation.
   * @returns {Promise<DirectorySetMetadataResponse>} Response data for the Directory Set Metadata operation.
   * @memberof ShareDirectoryClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: DirectorySetMetadataOptions = {}
  ): Promise<DirectorySetMetadataResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-setMetadata",
      options.tracingOptions
    );
    try {
      return await this.context.setMetadata({
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
   * Returns an AsyncIterableIterator for {@link DirectoryListFilesAndDirectoriesSegmentResponse} objects
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of files and directories to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all files and directories remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {DirectoryListFilesAndDirectoriesSegmentOptions} [options] Options to list files and directories operation.
   * @returns {AsyncIterableIterator<DirectoryListFilesAndDirectoriesSegmentResponse>}
   * @memberof ShareDirectoryClient
   */
  private async *iterateFilesAndDirectoriesSegments(
    marker?: string,
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
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
   * @private
   * @param {DirectoryListFilesAndDirectoriesSegmentOptions} [options] Options to list files and directories operation.
   * @returns {AsyncIterableIterator<{ kind: "file" } & FileItem | { kind: "directory" } & DirectoryItem>}
   * @memberof ShareDirectoryClient
   */
  private async *listFilesAndDirectoriesItems(
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): AsyncIterableIterator<
    ({ kind: "file" } & FileItem) | ({ kind: "directory" } & DirectoryItem)
  > {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    let marker: string | undefined;
    for await (const listFilesAndDirectoriesResponse of this.iterateFilesAndDirectoriesSegments(
      marker,
      options
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
   * @param {DirectoryListFilesAndDirectoriesOptions} [options] Options to list files and directories operation.
   * @memberof ShareDirectoryClient
   * @returns {PagedAsyncIterableIterator<{ kind: "file" } & FileItem | { kind: "directory" } , DirectoryListFilesAndDirectoriesSegmentResponse>}
   * An asyncIterableIterator that supports paging.
   */
  public listFilesAndDirectories(
    options: DirectoryListFilesAndDirectoriesOptions = {}
  ): PagedAsyncIterableIterator<
    ({ kind: "file" } & FileItem) | ({ kind: "directory" } & DirectoryItem),
    DirectoryListFilesAndDirectoriesSegmentResponse
  > {
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    // AsyncIterableIterator to iterate over files and directories
    const iter = this.listFilesAndDirectoriesItems(options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      async next() {
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
        return this.iterateFilesAndDirectoriesSegments(settings.continuationToken, {
          maxResults: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Returns a list of files or directories under the specified share or directory. It lists the
   * contents only for a single level of the directory hierarchy.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-directories-and-files
   *
   * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
   * @param {DirectoryListFilesAndDirectoriesSegmentOptions} [options] Options to Directory List Files and Directories Segment operation.
   * @returns {Promise<DirectoryListFilesAndDirectoriesSegmentResponse>} Response data for the Directory List Files and Directories operation.
   * @memberof ShareDirectoryClient
   */
  private async listFilesAndDirectoriesSegment(
    marker?: string,
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): Promise<DirectoryListFilesAndDirectoriesSegmentResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-listFilesAndDirectoriesSegment",
      options.tracingOptions
    );

    if (options.prefix === "") {
      options.prefix = undefined;
    }

    try {
      return await this.context.listFilesAndDirectoriesSegment({
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

  /**
   * Returns an AsyncIterableIterator for {@link DirectoryListHandlesResponse}
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param {DirectoryListHandlesSegmentOptions} [options] Options to list handles operation.
   * @returns {AsyncIterableIterator<DirectoryListHandlesResponse>}
   * @memberof ShareDirectoryClient
   */
  private async *iterateHandleSegments(
    marker?: string,
    options: DirectoryListHandlesSegmentOptions = {}
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
   * @private
   * @param {DirectoryListHandlesSegmentOptions} [options] Options to list handles operation.
   * @returns {AsyncIterableIterator<HandleItem>}
   * @memberof ShareDirectoryClient
   */
  private async *listHandleItems(
    options: DirectoryListHandlesSegmentOptions = {}
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
   * @param {DirectoryListHandlesOptions} [options] Options to list handles operation.
   * @memberof ShareDirectoryClient
   * @returns {PagedAsyncIterableIterator<HandleItem, DirectoryListHandlesResponse>}
   * An asyncIterableIterator that supports paging.
   */
  public listHandles(
    options: DirectoryListHandlesOptions = {}
  ): PagedAsyncIterableIterator<HandleItem, DirectoryListHandlesResponse> {
    // an AsyncIterableIterator to iterate over handles
    const iter = this.listHandleItems(options);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      async next() {
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
        return this.iterateHandleSegments(settings.continuationToken, {
          maxResults: settings.maxPageSize,
          ...options
        });
      }
    };
  }

  /**
   * Lists handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-handles
   *
   * @param {string} [marker] Optional. A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param {DirectoryListHandlesSegmentOptions} [options={}]
   * @returns {Promise<DirectoryListHandlesResponse>}
   * @memberof ShareDirectoryClient
   */
  private async listHandlesSegment(
    marker?: string,
    options: DirectoryListHandlesSegmentOptions = {}
  ): Promise<DirectoryListHandlesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-listHandlesSegment",
      options.tracingOptions
    );
    try {
      marker = marker === "" ? undefined : marker;
      const response = await this.context.listHandles({
        marker,
        ...options,
        spanOptions
      });

      // TODO: Protocol layer issue that when handle list is in returned XML
      // response.handleList is an empty string
      if ((response.handleList as any) === "") {
        response.handleList = undefined;
      }
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
   * Force close all handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {string} [marker] Optional. A string value that identifies the position of handles that will
   *                          be closed with the next force close handles operation.
   *                          The operation returns a marker value within the response
   *                          body if there are more handles to close. The marker value
   *                          may then be used in a subsequent call to close the next set of handles.
   * @param {DirectoryForceCloseHandlesSegmentOptions} [options={}]
   * @returns {Promise<DirectoryForceCloseHandlesResponse>}
   * @memberof ShareDirectoryClient
   */
  private async forceCloseHandlesSegment(
    marker?: string,
    options: DirectoryForceCloseHandlesSegmentOptions = {}
  ): Promise<DirectoryForceCloseHandlesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-forceCloseHandlesSegment",
      options.tracingOptions
    );
    try {
      marker = marker === "" ? undefined : marker;
      const rawResponse = await this.context.forceCloseHandles("*", {
        marker,
        ...options,
        spanOptions
      });
      const response = rawResponse as DirectoryForceCloseHandlesResponse;
      response.closedHandlesCount = rawResponse.numberOfHandlesClosed || 0;
      response.closeFailureCount = rawResponse.numberOfHandlesFailedToClose || 0;
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
   * Force close all handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {DirectoryForceCloseHandlesSegmentOptions} [options={}]
   * @returns {Promise<CloseHandlesInfo>}
   * @memberof ShareDirectoryClient
   */
  public async forceCloseAllHandles(
    options: DirectoryForceCloseHandlesSegmentOptions = {}
  ): Promise<CloseHandlesInfo> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-forceCloseAllHandles",
      options.tracingOptions
    );
    try {
      let handlesClosed = 0;
      let numberOfHandlesFailedToClose = 0;
      let marker: string | undefined = "";

      do {
        const response: DirectoryForceCloseHandlesResponse = await this.forceCloseHandlesSegment(
          marker,
          { ...options, tracingOptions: { ...options!.tracingOptions, spanOptions } }
        );
        marker = response.marker;
        response.closedHandlesCount && (handlesClosed += response.closedHandlesCount);
        response.closeFailureCount && (numberOfHandlesFailedToClose += response.closeFailureCount);
      } while (marker);

      return { closedHandlesCount: handlesClosed, closeFailureCount: numberOfHandlesFailedToClose };
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
   * Force close a specific handle for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} handleId Specific handle ID, cannot be asterisk "*".
   *                          Use forceCloseHandlesSegment() to close all handles.
   * @param {DirectoryForceCloseHandlesOptions} [options={}]
   * @returns {Promise<DirectoryForceCloseHandlesResponse>}
   * @memberof ShareDirectoryClient
   */
  public async forceCloseHandle(
    handleId: string,
    options: DirectoryForceCloseHandlesOptions = {}
  ): Promise<DirectoryForceCloseHandlesResponse> {
    const { span, spanOptions } = createSpan(
      "ShareDirectoryClient-forceCloseHandle",
      options.tracingOptions
    );
    try {
      if (handleId === "*") {
        throw new RangeError(
          `Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.`
        );
      }

      const rawResponse = await this.context.forceCloseHandles(handleId, {
        abortSignal: options.abortSignal,
        spanOptions
      });
      const response = rawResponse as DirectoryForceCloseHandlesResponse;
      response.closedHandlesCount = rawResponse.numberOfHandlesClosed || 0;
      response.closeFailureCount = rawResponse.numberOfHandlesFailedToClose || 0;
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
