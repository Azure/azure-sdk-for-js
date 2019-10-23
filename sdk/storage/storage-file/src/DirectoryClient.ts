// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  DirectoryCreateResponse,
  DirectoryDeleteResponse,
  DirectoryForceCloseHandlesResponse,
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
  validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions
} from "./models";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import { appendToURLPath, getShareNameAndPathFromUrl } from "./utils/utils.common";
import { StorageClient, CommonOptions } from "./StorageClient";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { FileClient, FileCreateOptions, FileDeleteOptions } from "./FileClient";
import { Credential } from "./credentials/Credential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { FileSystemAttributes } from "./FileSystemAttributes";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@azure/core-tracing";

/**
 * Options to configure Directory - Create operation.
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
   * @memberof AppendBlobCreateOptions
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
 * Options to configure Directory - List Files and Directories Segment operation.
 *
 * @interface DirectoryListFilesAndDirectoriesSegmentOptions
 */
interface DirectoryListFilesAndDirectoriesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
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
 * Options to configure Directory - List Files and Directories operation.
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
 * Options to configure Directory - Delete operation.
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
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Directory - Get Properties operation.
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
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Directory - Set Metadata operation.
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
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure Directory - List Handles Segment.
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
 * Options to configure Directory - List Handles.
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
 * Options to configure Directory - Force Close Handles Segment.
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
 * Options to configure Directory - Force Close Handles.
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
 * A DirectoryClient represents a URL to the Azure Storage directory allowing you to manipulate its files and directories.
 *
 * @export
 * @class DirectoryClient
 */
export class DirectoryClient extends StorageClient {
  /**
   * context provided by protocol layer.
   *
   * @private
   * @type {Directory}
   * @memberof DirectoryClient
   */
  private context: Directory;
  private _shareName: string;
  private _path: string;

  public get shareName(): string {
    return this._shareName;
  }

  public get path(): string {
    return this._path;
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
   * @param {Credential} [credential] Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
   *                                  If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof DirectoryClient
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
   * @memberof DirectoryClient
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
      shareName: this._shareName,
      filePathOrDirectoryPath: this._path
    } = getShareNameAndPathFromUrl(this.url));
    this.context = new Directory(this.storageClientContext);
  }

  /**
   * Creates a new directory under the specified share or parent directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param {DirectoryCreateOptions} [options] Options to Directory Create operation.
   * @returns {Promise<DirectoryCreateResponse>} Response data for the Directory  operation.
   * @memberof DirectoryClient
   */
  public async create(
    options: DirectoryCreateOptions = {}
  ): Promise<DirectoryCreateResponse> {
    const { span, spanOptions } = createSpan("DirectoryClient-create", options.spanOptions);
    try {
      if (!options.fileAttributes) {
        options = validateAndSetDefaultsForFileAndDirectoryCreateCommonOptions(options);
        // By default set it as a directory.
        const attributes: FileSystemAttributes = new FileSystemAttributes();
        attributes.directory = true;
        options.fileAttributes = attributes;
      }

      return this.context.create(
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
   * Sets properties on the directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-properties
   *
   * @param {properties} [DirectoryProperties] Directory properties. If no values are provided,
   *                                            existing values will be preserved.
   * @returns {Promise<DirectorySetPropertiesResponse>}
   * @memberof DirectoryClient
   */
  public async setProperties(
    properties: DirectoryProperties = {}
  ): Promise<DirectorySetPropertiesResponse> {
    const { span, spanOptions } = createSpan(
      "DirectoryClient-setProperties",
      properties.spanOptions
    );
    try {
      properties = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(properties);

      return this.context.setProperties(
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
   * Creates a DirectoryClient object for a sub directory.
   *
   * @param subDirectoryName A subdirectory name
   * @returns {DirectoryClient} The DirectoryClient object for the given subdirectory name.
   * @memberof DirectoryClient
   */
  public getDirectoryClient(subDirectoryName: string): DirectoryClient {
    return new DirectoryClient(
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
   * @returns {Promise<{ directoryClient: DirectoryClient; directoryCreateResponse: DirectoryCreateResponse; }>} Directory create response data and the corresponding DirectoryClient instance.
   * @memberof DirectoryClient
   */
  public async createSubdirectory(
    directoryName: string,
    options: DirectoryCreateOptions = {}
  ): Promise<{
    directoryClient: DirectoryClient;
    directoryCreateResponse: DirectoryCreateResponse;
  }> {
    const { span, spanOptions } = createSpan(
      "DirectoryClient-createSubdirectory",
      options.spanOptions
    );
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
   * Removes the specified empty sub directory under this directory.
   * Note that the directory must be empty before it can be deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {string} directoryName
   * @param {DirectoryDeleteOptions} [options] Options to Directory Delete operation.
   * @returns {DirectoryDeleteResponse} Directory deletion response data.
   * @memberof DirectoryClient
   */
  public async deleteSubdirectory(
    directoryName: string,
    options: DirectoryDeleteOptions = {}
  ): Promise<DirectoryDeleteResponse> {
    const { span, spanOptions } = createSpan(
      "DirectoryClient-deleteSubdirectory",
      options.spanOptions
    );
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
   * Creates a new file or replaces a file under this directory. Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param {string} fileName
   * @param {number} size Specifies the maximum size in bytes for the file, up to 1 TB.
   * @param {FileCreateOptions} [options] Options to File Create operation.
   * @returns {Promise<{ fileClient: FileClient, fileCreateResponse: FileCreateResponse }>} File creation response data and the corresponding file client.
   * @memberof DirectoryClient
   */
  public async createFile(
    fileName: string,
    size: number,
    options: FileCreateOptions = {}
  ): Promise<{ fileClient: FileClient; fileCreateResponse: FileCreateResponse }> {
    const { span, spanOptions } = createSpan("DirectoryClient-createFile", options.spanOptions);
    try {
      const fileClient = this.getFileClient(fileName);
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
   * @memberof DirectoryClient
   */
  public async deleteFile(
    fileName: string,
    options: FileDeleteOptions = {}
  ): Promise<FileDeleteResponse> {
    const { span, spanOptions } = createSpan("DirectoryClient-deleteFile", options.spanOptions);
    try {
      const fileClient = this.getFileClient(fileName);
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
   * Creates a FileClient object.
   *
   * @param {string} fileName A file name.
   * @returns {FileClient} A new FileClient object for the given file name.
   * @memberof FileClient
   */
  public getFileClient(fileName: string): FileClient {
    return new FileClient(appendToURLPath(this.url, encodeURIComponent(fileName)), this.pipeline);
  }

  /**
   * Returns all system properties for the specified directory, and can also be used to check the
   * existence of a directory. The data returned does not include the files in the directory or any
   * subdirectories.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-directory-properties
   *
   * @param {DirectoryGetPropertiesOptions} [options] Options to Directory Get Properties operation.
   * @returns {Promise<DirectoryGetPropertiesResponse>} Response data for the Directory Get Properties operation.
   * @memberof DirectoryClient
   */
  public async getProperties(
    options: DirectoryGetPropertiesOptions = {}
  ): Promise<DirectoryGetPropertiesResponse> {
    const { span, spanOptions } = createSpan("DirectoryClient-getProperties", options.spanOptions);
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
   * Removes the specified empty directory. Note that the directory must be empty before it can be
   * deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {DirectoryDeleteOptions} [options] Options to Directory Delete operation.
   * @returns {Promise<DirectoryDeleteResponse>} Response data for the Directory Delete operation.
   * @memberof DirectoryClient
   */
  public async delete(
    options: DirectoryDeleteOptions = {}
  ): Promise<DirectoryDeleteResponse> {
    const { span, spanOptions } = createSpan("DirectoryClient-delete", options.spanOptions);
    try {
      return this.context.deleteMethod({
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
   * Updates user defined metadata for the specified directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing directory metadata will be removed
   * @param {DirectorySetMetadataOptions} [options] Options to Directory Set Metadata operation.
   * @returns {Promise<DirectorySetMetadataResponse>} Response data for the Directory Set Metadata operation.
   * @memberof DirectoryClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: DirectorySetMetadataOptions = {}
  ): Promise<DirectorySetMetadataResponse> {
    const { span, spanOptions } = createSpan("DirectoryClient-setMetadata", options.spanOptions);
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
   * Returns an AsyncIterableIterator for DirectoryListFilesAndDirectoriesSegmentResponses
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
   * @memberof DirectoryClient
   */
  private async *iterateFilesAndDirectoriesSegments(
    marker?: string,
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): AsyncIterableIterator<DirectoryListFilesAndDirectoriesSegmentResponse> {
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
   * @memberof DirectoryClient
   */
  private async *listFilesAndDirectoriesItems(
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): AsyncIterableIterator<
    { kind: "file" } & FileItem | { kind: "directory" } & DirectoryItem
  > {
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
   * @example
   * ```js
   *   let i = 1;
   *   for await (const entity of directoryClient.listFilesAndDirectories()) {
   *     if (entity.kind === "directory") {
   *       console.log(`${i++} - directory\t: ${entity.name}`);
   *     } else {
   *       console.log(`${i++} - file\t: ${entity.name}`);
   *     }
   *   }
   * ```
   *
   * @example
   * ```js
   *   // Generator syntax .next()
   *   let i = 1;
   *   let iter = await directoryClient.listFilesAndDirectories();
   *   let entity = await iter.next();
   *   while (!entity.done) {
   *     if (entity.value.kind === "directory") {
   *       console.log(`${i++} - directory\t: ${entity.value.name}`);
   *     } else {
   *       console.log(`${i++} - file\t: ${entity.value.name}`);
   *     }
   *     entity = await iter.next();
   *   }
   * ```
   *
   * @example
   * ```js
   *   // Example for .byPage()
   *   // passing optional maxPageSize in the page settings
   *   let i = 1;
   *   for await (const response of directoryClient
   *     .listFilesAndDirectories()
   *     .byPage({ maxPageSize: 20 })) {
   *     for (const fileItem of response.segment.fileItems) {
   *       console.log(`${i++} - file\t: ${fileItem.name}`);
   *     }
   *     for (const dirItem of response.segment.directoryItems) {
   *       console.log(`${i++} - directory\t: ${dirItem.name}`);
   *     }
   *   }
   * ```
   *
   * @example
   * ```js
   *   // Passing marker as an argument (similar to the previous example)
   *   let i = 1;
   *   let iterator = directoryClient.listFilesAndDirectories().byPage({ maxPageSize: 3 });
   *   let response = (await iterator.next()).value;
   *   // Prints 3 file and directory names
   *   for (const fileItem of response.segment.fileItems) {
   *     console.log(`${i++} - file\t: ${fileItem.name}`);
   *   }
   *   for (const dirItem of response.segment.directoryItems) {
   *     console.log(`${i++} - directory\t: ${dirItem.name}`);
   *   }
   *   // Gets next marker
   *   let dirMarker = response.continuationToken;
   *   // Passing next marker as continuationToken
   *   iterator = directoryClient
   *     .listFilesAndDirectories()
   *     .byPage({ continuationToken: dirMarker, maxPageSize: 4 });
   *   response = (await iterator.next()).value;
   *   // Prints 10 file and directory names
   *   for (const fileItem of response.segment.fileItems) {
   *     console.log(`${i++} - file\t: ${fileItem.name}`);
   *   }
   *   for (const dirItem of response.segment.directoryItems) {
   *     console.log(`${i++} - directory\t: ${dirItem.name}`);
   *   }
   * ```
   *
   * @param {DirectoryListFilesAndDirectoriesOptions} [options] Options to list files and directories operation.
   * @memberof DirectoryClient
   * @returns {PagedAsyncIterableIterator<{ kind: "file" } & FileItem | { kind: "directory" } , DirectoryListFilesAndDirectoriesSegmentResponse>}
   * An asyncIterableIterator that supports paging.
   */
  public listFilesAndDirectories(
    options: DirectoryListFilesAndDirectoriesOptions = {}
  ): PagedAsyncIterableIterator<
    { kind: "file" } & FileItem | { kind: "directory" } & DirectoryItem,
    DirectoryListFilesAndDirectoriesSegmentResponse
  > {
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
   * @memberof DirectoryClient
   */
  private async listFilesAndDirectoriesSegment(
    marker?: string,
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): Promise<DirectoryListFilesAndDirectoriesSegmentResponse> {
    const { span, spanOptions } = createSpan(
      "DirectoryClient-listFilesAndDirectoriesSegment",
      options.spanOptions
    );
    try {
      return this.context.listFilesAndDirectoriesSegment({
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
   * Returns an AsyncIterableIterator for DirectoryListHandlesResponse
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of the list to be
   *                          returned with the next list handles operation. The operation returns a
   *                          marker value within the response body if the list returned was not complete.
   *                          The marker value may then be used in a subsequent call to request the next
   *                          set of list items.
   * @param {DirectoryListHandlesSegmentOptions} [options] Options to list handles operation.
   * @returns {AsyncIterableIterator<DirectoryListHandlesResponse>}
   * @memberof DirectoryClient
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
   * @memberof DirectoryClient
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
   * @example
   * ```js
   *   let i = 1;
   *   let iter = dirClient.listHandles();
   *   for await (const handle of iter) {
   *     console.log(`Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`);
   *   }
   * ```
   *
   * @example
   * ```js
   *   // Generator syntax .next()
   *   let i = 1;
   *   iter = await dirClient.listHandles();
   *   let handleItem = await iter.next();
   *   while (!handleItem.done) {
   *     console.log(`Handle ${i++}: ${handleItem.value.path}, opened time ${handleItem.value.openTime}, clientIp ${handleItem.value.clientIp}`);
   *     handleItem = await iter.next();
   *   }
   * ```
   *
   * @example
   * ```js
   *   // Example for .byPage()
   *   // passing optional maxPageSize in the page settings
   *   let i = 1;
   *   for await (const response of dirClient.listHandles({ recursive: true }).byPage({ maxPageSize: 20 })) {
   *     if (response.handleList) {
   *       for (const handle of response.handleList) {
   *         console.log(`Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`);
   *       }
   *     }
   *   }
   * ```
   *
   * @example
   * ```js
   *   // Passing marker as an argument (similar to the previous example)
   *   let i = 1;
   *   iterator = dirClient.listHandles().byPage({ maxPageSize: 2 });
   *   response = await iterator.next();
   *   // Prints 2 handles
   *   if (response.value.handleList) {
   *     for (const handle of response.value.handleList) {
   *       console.log(`Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`);
   *     }
   *   }
   *   // Gets next marker
   *   let marker = response.value.continuationToken;
   *   // Passing next marker as continuationToken
   *   console.log(`    continuation`);
   *   iterator = dirClient.listHandles().byPage({ continuationToken: marker, maxPageSize: 10 });
   *   response = await iterator.next();
   *   // Prints 2 more handles assuming you have more than four directory/files opened
   *   if (!response.done && response.value.handleList) {
   *     for (const handle of response.value.handleList) {
   *       console.log(`Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`);
   *     }
   *   }
   * ```
   *
   * @param {DirectoryListHandlesOptions} [options] Options to list handles operation.
   * @memberof DirectoryClient
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
   * @memberof DirectoryClient
   */
  private async listHandlesSegment(
    marker?: string,
    options: DirectoryListHandlesSegmentOptions = {}
  ): Promise<DirectoryListHandlesResponse> {
    const { span, spanOptions } = createSpan(
      "DirectoryClient-listHandlesSegment",
      options.spanOptions
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
   * @memberof DirectoryClient
   */
  private async forceCloseHandlesSegment(
    marker?: string,
    options: DirectoryForceCloseHandlesSegmentOptions = {}
  ): Promise<DirectoryForceCloseHandlesResponse> {
    const { span, spanOptions } = createSpan(
      "DirectoryClient-forceCloseHandlesSegment",
      options.spanOptions
    );
    try {
      marker = marker === "" ? undefined : marker;
      return this.context.forceCloseHandles("*", {
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
   * Force close all handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {DirectoryForceCloseHandlesSegmentOptions} [options={}]
   * @returns {Promise<number>}
   * @memberof DirectoryClient
   */
  public async forceCloseAllHandles(
    options: DirectoryForceCloseHandlesSegmentOptions = {}
  ): Promise<number> {
    const { span, spanOptions } = createSpan(
      "DirectoryClient-forceCloseAllHandles",
      options.spanOptions
    );
    try {
      let handlesClosed = 0;
      let marker: string | undefined = "";

      do {
        const response: DirectoryForceCloseHandlesResponse = await this.forceCloseHandlesSegment(
          marker,
          { spanOptions }
        );
        marker = response.marker;
        response.numberOfHandlesClosed && (handlesClosed += response.numberOfHandlesClosed);
      } while (marker);

      return handlesClosed;
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
   * @memberof DirectoryClient
   */
  public async forceCloseHandle(
    handleId: string,
    options: DirectoryForceCloseHandlesOptions = {}
  ): Promise<DirectoryForceCloseHandlesResponse> {
    const { span, spanOptions } = createSpan(
      "DirectoryClient-forceCloseHandle",
      options.spanOptions
    );
    try {
      if (handleId === "*") {
        throw new RangeError(
          `Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.`
        );
      }

      return this.context.forceCloseHandles(handleId, {
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
}
