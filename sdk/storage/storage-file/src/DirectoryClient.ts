// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Aborter } from "./Aborter";
import * as Models from "./generated/lib/models";
import { Directory } from "./generated/lib/operations";
import { Metadata } from "./models";
import { Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { appendToURLPath } from "./utils/utils.common";
import { FileClient } from "./FileClient";

export interface DirectoryCreateOptions {
  abortSignal?: Aborter;
  /**
   * A name-value pair
   * to associate with a file storage object.
   *
   * @type {Metadata}
   * @memberof DirectoryCreateOptions
   */
  metadata?: Metadata;
}

export interface DirectoryListFilesAndDirectoriesSegmentOptions {
  abortSignal?: Aborter;
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

export interface DirectoryDeleteOptions {
  abortSignal?: Aborter;
}

export interface DirectoryGetPropertiesOptions {
  abortSignal?: Aborter;
}

export interface DirectorySetMetadataOptions {
  abortSignal?: Aborter;
}

export interface AzureDirectoryItem {
  kind: "directory";
  name: string;
}

export interface AzureFileItem {
  kind: "file";
  name: string;
  properties: Models.FileProperty;
}

/**
 * A DirectoryClient represents a URL to the Azure Storage directory allowing you to manipulate its files and directories.
 *
 * @export
 * @class DirectoryClient
 * @extends {StorageClient}
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
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof DirectoryClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.context = new Directory(this.storageClientContext);
  }

  /**
   * Creates a new DirectoryClient object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {DirectoryClient}
   * @memberof DirectoryClient
   */
  public withPipeline(pipeline: Pipeline): DirectoryClient {
    return new DirectoryClient(this.url, pipeline);
  }

  /**
   * Creates a new directory under the specified share or parent directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-directory
   *
   * @param {DirectoryCreateOptions} [options]
   * @returns {Promise<Models.DirectoryCreateResponse>}
   * @memberof DirectoryClient
   */
  public async create(
    options: DirectoryCreateOptions = {}
  ): Promise<Models.DirectoryCreateResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.create({
      ...options,
      abortSignal: aborter
    });
  }

  /**
   * Creates a DirectoryClient object for a sub directory.
   *
   * @param subDirectoryName A subdirectory name
   * @returns {DirectoryClient}
   * @memberof DirectoryClient
   */
  public createDirectoryClient(subDirectoryName: string): DirectoryClient {
    return new DirectoryClient(
      appendToURLPath(this.url, encodeURIComponent(subDirectoryName)),
      this.pipeline
    );
  }

  /**
   * Creates a FileClient object.
   *
   * @param {string} fileName A file name
   * @returns
   * @memberof FileClient
   */
  public createFileClient(fileName: string) {
    return new FileClient(appendToURLPath(this.url, encodeURIComponent(fileName)), this.pipeline);
  }

  /**
   * Returns all system properties for the specified directory, and can also be used to check the
   * existence of a directory. The data returned does not include the files in the directory or any
   * subdirectories.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-directory-properties
   *
   * @returns {Promise<Models.DirectoryGetPropertiesResponse>}
   * @memberof DirectoryClient
   */
  public async getProperties(
    options: DirectoryGetPropertiesOptions = {}
  ): Promise<Models.DirectoryGetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.getProperties({
      abortSignal: aborter
    });
  }

  /**
   * Removes the specified empty directory. Note that the directory must be empty before it can be
   * deleted.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-directory
   *
   * @returns {Promise<Models.DirectoryDeleteResponse>}
   * @memberof DirectoryClient
   */
  public async delete(
    options: DirectoryDeleteOptions = {}
  ): Promise<Models.DirectoryDeleteResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.deleteMethod({
      abortSignal: aborter
    });
  }

  /**
   * Updates user defined metadata for the specified directory.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-directory-metadata
   *
   * @param {Metadata} [metadata] If no metadata provided, all existing directory metadata will be removed
   * @returns {Promise<Models.DirectorySetMetadataResponse>}
   * @memberof DirectoryClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: DirectorySetMetadataOptions = {}
  ): Promise<Models.DirectorySetMetadataResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.setMetadata({
      abortSignal: aborter,
      metadata
    });
  }

  /**
   * Iterates over containers under the specified account.
   *
   * @param {DirectoryListFilesAndDirectoriesSegmentOptions} [options={}] Options to list files and directories(optional)
   * @returns {AsyncIterableIterator<Models.FileItem | Models.DirectoryItem>}
   * @memberof DirectoryClient
   *
   * @example
   * let i = 1;
   * for await (const item of directoryClient.listFilesAndDirectories()) {
   *   console.log(`${i}: ${item.name}`);
   *   i++;
   * }
   *
   * @example
   * let iter1 = directoryClient.listFilesAndDirectories();
   * let i = 1;
   * for await (const item of iter1) {
   *   console.log(`${i}: ${item.name}`);
   *   i++;
   * }
   *
   * @example
   * let iter2 = await directoryClient.listFilesAndDirectories();
   * i = 1;
   * let item = await iter2.next();
   * do {
   *   console.log(`${i++}: ${item.value.name}`);
   *   item = await iter2.next();
   * } while (item.value);
   *
   */
  public async *listFilesAndDirectories(
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): AsyncIterableIterator<AzureFileItem | AzureDirectoryItem> {
    let marker = undefined;
    const directoryClient = this;
    const aborter = !options.abortSignal ? Aborter.none : options.abortSignal;
    let listFilesAndDirectoriesResponse;
    do {
      listFilesAndDirectoriesResponse = await directoryClient.listFilesAndDirectoriesSegment(
        marker,
        {
          ...options,
          abortSignal: aborter
        }
      );
      marker = listFilesAndDirectoriesResponse.nextMarker;

      for (const file of listFilesAndDirectoriesResponse.segment.fileItems) {
        yield { kind: "file", name: file.name, properties: file.properties };
      }
      for (const directory of listFilesAndDirectoriesResponse.segment.directoryItems) {
        yield { kind: "directory", name: directory.name };
      }
    } while (marker);
  }

  /**
   * Returns a list of files or directories under the specified share or directory. It lists the
   * contents only for a single level of the directory hierarchy.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-directories-and-files
   *
   * @param {string} [marker]
   * @param {DirectoryListFilesAndDirectoriesSegmentOptions} [options]
   * @returns {Promise<Models.DirectoryListFilesAndDirectoriesSegmentResponse>}
   * @memberof DirectoryClient
   */
  public async listFilesAndDirectoriesSegment(
    marker?: string,
    options: DirectoryListFilesAndDirectoriesSegmentOptions = {}
  ): Promise<Models.DirectoryListFilesAndDirectoriesSegmentResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.context.listFilesAndDirectoriesSegment({
      abortSignal: aborter,
      marker,
      ...options
    });
  }
}
