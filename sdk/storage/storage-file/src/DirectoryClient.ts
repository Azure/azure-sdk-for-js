// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import * as Models from "./generated/src/models";
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
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { appendToURLPath } from "./utils/utils.common";
import "@azure/core-paging";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { FileClient, FileCreateOptions, FileDeleteOptions } from "./FileClient";
import { Credential } from "./credentials/Credential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { FileSystemAttributes } from "./FileSystemAttributes";

/**
 * Options to configure Directory - Create operation.
 *
 * @export
 * @interface DirectoryCreateOptions
 */
export interface DirectoryCreateOptions extends FileAndDirectoryCreateCommonOptions {
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

export interface DirectoryProperties extends FileAndDirectorySetPropertiesCommonOptions {
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
interface DirectoryListFilesAndDirectoriesSegmentOptions {
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
   * return. If the request does not specify maxresults, or specifies a value
   * greater than 5,000, the server will return up to 5,000 items.
   *
   * @type {number}
   * @memberof DirectoryListFilesAndDirectoriesSegmentOptions
   */
  maxresults?: number;
}

/**
 * Options to configure Directory - List Files and Directories operation.
 *
 * @export
 * @interface DirectoryListFilesAndDirectoriesOptions
 */
export interface DirectoryListFilesAndDirectoriesOptions {
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
export interface DirectoryDeleteOptions {
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
export interface DirectoryGetPropertiesOptions {
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
export interface DirectorySetMetadataOptions {
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
export interface DirectoryListHandlesSegmentOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryListHandlesSegmentOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the maximum number of entries to return. If the request does not specify maxresults,
   * or specifies a value greater than 5,000, the server will return up to 5,000 items.
   *
   * @type {number}
   * @memberof DirectoryListHandlesSegmentOptions
   */
  maxresults?: number;
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
export interface DirectoryListHandlesOptions {
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
export interface DirectoryForceCloseHandlesSegmentOptions {
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
export interface DirectoryForceCloseHandlesOptions {
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
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof DirectoryClient
   */
  constructor(url: string, credential?: Credential, options?: NewPipelineOptions);
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
    options: NewPipelineOptions = {}
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
    this.context = new Directory(this.storageClientContext);
  }

  /**
   * Creates a new directory under the specified share or parent directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param {DirectoryCreateOptions} [options] Options to Directory Create operation.
   * @returns {Promise<Models.DirectoryCreateResponse>} Response data for the Directory  operation.
   * @memberof DirectoryClient
   */
  public async create(
    options: DirectoryCreateOptions = {}
  ): Promise<Models.DirectoryCreateResponse> {
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
        filePermissionKey: options.filePermissionKey
      }
    );
  }

  /**
   * Sets properties on the directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-properties
   *
   * @param {properties} [DirectoryProperties] Directory properties. If no values are provided,
   *                                            existing values will be preserved.
   * @returns {Promise<Models.DirectorySetPropertiesResponse>}
   * @memberof DirectoryClient
   */
  public async setProperties(
    properties: DirectoryProperties = {}
  ): Promise<Models.DirectorySetPropertiesResponse> {
    properties = validateAndSetDefaultsForFileAndDirectorySetPropertiesCommonOptions(properties);

    return this.context.setProperties(
      fileAttributesToString(properties.fileAttributes!),
      fileCreationTimeToString(properties.creationTime!),
      fileLastWriteTimeToString(properties.lastWriteTime!),
      {
        abortSignal: properties.abortSignal,
        filePermission: properties.filePermission,
        filePermissionKey: properties.filePermissionKey
      }
    );
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
   * @returns {Promise<{ directoryClient: DirectoryClient; directoryCreateResponse: Models.DirectoryCreateResponse; }>} Directory create response data and the corresponding DirectoryClient instance.
   * @memberof DirectoryClient
   */
  public async createSubdirectory(
    directoryName: string,
    options?: DirectoryCreateOptions
  ): Promise<{
    directoryClient: DirectoryClient;
    directoryCreateResponse: Models.DirectoryCreateResponse;
  }> {
    const directoryClient = this.getDirectoryClient(directoryName);
    const directoryCreateResponse = await directoryClient.create(options);
    return {
      directoryClient,
      directoryCreateResponse
    };
  }

  /**
   * Removes the specified empty sub directory under this directory.
   * Note that the directory must be empty before it can be deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {string} directoryName
   * @param {DirectoryDeleteOptions} [options] Options to Directory Delete operation.
   * @returns {Models.DirectoryDeleteResponse} Directory deletion response data.
   * @memberof DirectoryClient
   */
  public async deleteSubdirectory(
    directoryName: string,
    options?: DirectoryDeleteOptions
  ): Promise<Models.DirectoryDeleteResponse> {
    const directoryClient = this.getDirectoryClient(directoryName);
    return await directoryClient.delete(options);
  }

  /**
   * Creates a new file or replaces a file under this directory. Note it only initializes the file with no content.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-file
   *
   * @param {string} fileName
   * @param {number} size Specifies the maximum size in bytes for the file, up to 1 TB.
   * @param {FileCreateOptions} [options] Options to File Create operation.
   * @returns {Promise<{ fileClient: FileClient, fileCreateResponse: Models.FileCreateResponse }>} File creation response data and the corresponding file client.
   * @memberof DirectoryClient
   */
  public async createFile(
    fileName: string,
    size: number,
    options?: FileCreateOptions
  ): Promise<{ fileClient: FileClient; fileCreateResponse: Models.FileCreateResponse }> {
    const fileClient = this.getFileClient(fileName);
    const fileCreateResponse = await fileClient.create(size, options);
    return {
      fileClient,
      fileCreateResponse
    };
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
   * @returns {Promise<Models.FileDeleteResponse>} File deletion response data.
   * @memberof DirectoryClient
   */
  public async deleteFile(
    fileName: string,
    options?: FileDeleteOptions
  ): Promise<Models.FileDeleteResponse> {
    const fileClient = this.getFileClient(fileName);
    return await fileClient.delete(options);
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
   * @returns {Promise<Models.DirectoryGetPropertiesResponse>} Response data for the Directory Get Properties operation.
   * @memberof DirectoryClient
   */
  public async getProperties(
    options: DirectoryGetPropertiesOptions = {}
  ): Promise<Models.DirectoryGetPropertiesResponse> {
    return this.context.getProperties({
      abortSignal: options.abortSignal
    });
  }

  /**
   * Removes the specified empty directory. Note that the directory must be empty before it can be
   * deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @param {DirectoryDeleteOptions} [options] Options to Directory Delete operation.
   * @returns {Promise<Models.DirectoryDeleteResponse>} Response data for the Directory Delete operation.
   * @memberof DirectoryClient
   */
  public async delete(
    options: DirectoryDeleteOptions = {}
  ): Promise<Models.DirectoryDeleteResponse> {
    return this.context.deleteMethod({
      abortSignal: options.abortSignal
    });
  }

  /**
   * Updates user defined metadata for the specified directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing directory metadata will be removed
   * @param {DirectorySetMetadataOptions} [options] Options to Directory Set Metadata operation.
   * @returns {Promise<Models.DirectorySetMetadataResponse>} Response data for the Directory Set Metadata operation.
   * @memberof DirectoryClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: DirectorySetMetadataOptions = {}
  ): Promise<Models.DirectorySetMetadataResponse> {
    return this.context.setMetadata({
      abortSignal: options.abortSignal,
      metadata
    });
  }

  /**
   * Returns an AsyncIterableIterator for DirectoryListFilesAndDirectoriesSegmentResponses
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of files and directories to be returned with the next listing operation. The
   *                          operation returns the NextMarker value within the response body if the
   *                          listing operation did not return all files and directories remaining to be listed
   *                          with the current page. The NextMarker value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {DirectoryListFilesAndDirectoriesSegmentOptions} [options] Options to list files and directories operation.
   * @returns {AsyncIterableIterator<Models.DirectoryListFilesAndDirectoriesSegmentResponse>}
   * @memberof DirectoryClient
   */
  private async *iterateFilesAndDirectoriesSegments(
    marker?: string,
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): AsyncIterableIterator<Models.DirectoryListFilesAndDirectoriesSegmentResponse> {
    let listFilesAndDirectoriesResponse;
    do {
      listFilesAndDirectoriesResponse = await this.listFilesAndDirectoriesSegment(marker, options);
      marker = listFilesAndDirectoriesResponse.nextMarker;
      yield await listFilesAndDirectoriesResponse;
    } while (marker);
  }

  /**
   * Returns an AsyncIterableIterator for file and directory items
   *
   * @private
   * @param {DirectoryListFilesAndDirectoriesSegmentOptions} [options] Options to list files and directories operation.
   * @returns {AsyncIterableIterator<{ kind: "file" } & Models.FileItem | { kind: "directory" } & Models.DirectoryItem>}
   * @memberof DirectoryClient
   */
  private async *listFilesAndDirectoriesItems(
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): AsyncIterableIterator<
    { kind: "file" } & Models.FileItem | { kind: "directory" } & Models.DirectoryItem
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
   *   let i = 1;
   *   for await (const entity of directoryClient.listFilesAndDirectories()) {
   *     if (entity.kind === "directory") {
   *       console.log(`${i++} - directory\t: ${entity.name}`);
   *     } else {
   *       console.log(`${i++} - file\t: ${entity.name}`);
   *     }
   *   }
   *
   * @example
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
   *
   * @example
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
   *
   * @example
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
   *   let dirMarker = response.nextMarker;
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
   *
   * @param {DirectoryListFilesAndDirectoriesOptions} [options] Options to list files and directories operation.
   * @memberof DirectoryClient
   * @returns {PagedAsyncIterableIterator<{ kind: "file" } & Models.FileItem | { kind: "directory" } , Models.DirectoryListFilesAndDirectoriesSegmentResponse>}
   * An asyncIterableIterator that supports paging.
   */
  public listFilesAndDirectories(
    options: DirectoryListFilesAndDirectoriesOptions = {}
  ): PagedAsyncIterableIterator<
    { kind: "file" } & Models.FileItem | { kind: "directory" } & Models.DirectoryItem,
    Models.DirectoryListFilesAndDirectoriesSegmentResponse
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
          maxresults: settings.maxPageSize,
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
   * @returns {Promise<Models.DirectoryListFilesAndDirectoriesSegmentResponse>} Response data for the Directory List Files and Directories operation.
   * @memberof DirectoryClient
   */
  private async listFilesAndDirectoriesSegment(
    marker?: string,
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): Promise<Models.DirectoryListFilesAndDirectoriesSegmentResponse> {
    return this.context.listFilesAndDirectoriesSegment({
      marker,
      ...options
    });
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
   * @returns {AsyncIterableIterator<Models.DirectoryListHandlesResponse>}
   * @memberof DirectoryClient
   */
  private async *iterateHandleSegments(
    marker?: string,
    options: DirectoryListHandlesSegmentOptions = {}
  ): AsyncIterableIterator<Models.DirectoryListHandlesResponse> {
    let listHandlesResponse;
    if (!!marker || marker === undefined) {
      do {
        listHandlesResponse = await this.listHandlesSegment(marker, options);
        marker = listHandlesResponse.nextMarker;
        yield await listHandlesResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator for handles
   *
   * @private
   * @param {DirectoryListHandlesSegmentOptions} [options] Options to list handles operation.
   * @returns {AsyncIterableIterator<Models.HandleItem>}
   * @memberof DirectoryClient
   */
  private async *listHandleItems(
    options: DirectoryListHandlesSegmentOptions = {}
  ): AsyncIterableIterator<Models.HandleItem> {
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
   *   let i = 1;
   *   let iter = dirClient.listHandles();
   *   for await (const handle of iter) {
   *     console.log(`Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`);
   *   }
   * @example
   *   // Generator syntax .next()
   *   let i = 1;
   *   iter = await dirClient.listHandles();
   *   let handleItem = await iter.next();
   *   while (!handleItem.done) {
   *     console.log(`Handle ${i++}: ${handleItem.value.path}, opened time ${handleItem.value.openTime}, clientIp ${handleItem.value.clientIp}`);
   *     handleItem = await iter.next();
   *   }
   *
   * @example
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
   *
   * @example
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
   *   let marker = response.value.nextMarker;
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
   *
   * @param {DirectoryListHandlesOptions} [options] Options to list handles operation.
   * @memberof DirectoryClient
   * @returns {PagedAsyncIterableIterator<Models.HandleItem, Models.DirectoryListHandlesResponse>}
   * An asyncIterableIterator that supports paging.
   */
  public listHandles(
    options: DirectoryListHandlesOptions = {}
  ): PagedAsyncIterableIterator<Models.HandleItem, Models.DirectoryListHandlesResponse> {
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
          maxresults: settings.maxPageSize,
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
   * @returns {Promise<Models.DirectoryListHandlesResponse>}
   * @memberof DirectoryClient
   */
  private async listHandlesSegment(
    marker?: string,
    options: DirectoryListHandlesSegmentOptions = {}
  ): Promise<Models.DirectoryListHandlesResponse> {
    marker = marker === "" ? undefined : marker;
    const response = await this.context.listHandles({
      marker,
      ...options
    });

    // TODO: Protocol layer issue that when handle list is in returned XML
    // response.handleList is an empty string
    if ((response.handleList as any) === "") {
      response.handleList = undefined;
    }
    return response;
  }
  /**
   * Force close all handles for a directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/force-close-handles
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} [marker] Optional. A string value that identifies the position of handles that will
   *                          be closed with the next force close handles operation.
   *                          The operation returns a marker value within the response
   *                          body if there are more handles to close. The marker value
   *                          may then be used in a subsequent call to close the next set of handles.
   * @param {DirectoryForceCloseHandlesSegmentOptions} [options={}]
   * @returns {Promise<Models.DirectoryForceCloseHandlesResponse>}
   * @memberof DirectoryClient
   */
  public async forceCloseHandlesSegment(
    marker?: string,
    options: DirectoryForceCloseHandlesSegmentOptions = {}
  ): Promise<Models.DirectoryForceCloseHandlesResponse> {
    marker = marker === "" ? undefined : marker;
    return this.context.forceCloseHandles("*", {
      marker,
      ...options
    });
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
   * @returns {Promise<Models.DirectoryForceCloseHandlesResponse>}
   * @memberof DirectoryClient
   */
  public async forceCloseHandle(
    handleId: string,
    options: DirectoryForceCloseHandlesOptions = {}
  ): Promise<Models.DirectoryForceCloseHandlesResponse> {
    if (handleId === "*") {
      throw new RangeError(
        `Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.`
      );
    }

    return this.context.forceCloseHandles(handleId, {
      abortSignal: options.abortSignal
    });
  }
}
