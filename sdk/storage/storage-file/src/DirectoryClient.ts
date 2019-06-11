// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Aborter } from "./Aborter";
import * as Models from "./generated/lib/models";
import { Directory } from "./generated/lib/operations";
import { Metadata } from "./models";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { StorageClient } from "./StorageClient";
import { appendToURLPath } from "./utils/utils.common";
import { FileClient } from "./FileClient";
import { Credential } from "./credentials/Credential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";

/**
 * Options to configure Directory - Create operation.
 *
 * @export
 * @interface DirectoryCreateOptions
 */
export interface DirectoryCreateOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * A collection of key-value string pair to associate with the file storage object.
   *
   * @type {Metadata}
   * @memberof DirectoryCreateOptions
   */
  metadata?: Metadata;
}

/**
 * Options to configure Directory - List Files and Directories Segment operation.
 *
 * @export
 * @interface DirectoryListFilesAndDirectoriesSegmentOptions
 */
export interface DirectoryListFilesAndDirectoriesSegmentOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
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

/**
 * Options to configure Directory - Delete operation.
 *
 * @export
 * @interface DirectoryDeleteOptions
 */
export interface DirectoryDeleteOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure Directory - Get Properties operation.
 *
 * @export
 * @interface DirectoryGetPropertiesOptions
 */
export interface DirectoryGetPropertiesOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
}

/**
 * Options to configure Directory - Set Metadata operation.
 *
 * @export
 * @interface DirectorySetMetadataOptions
 */
export interface DirectorySetMetadataOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: Aborter;
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
   *                                If not specified, AnonymousCredential is used.
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
   * @param {DirectoryCreateOptions} [options] Optional options to Directory Create operation.
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
   * @param {DirectoryGetPropertiesOptions} [options] Optional options to Directory Get Properties operation.
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
   * @param {DirectoryDeleteOptions} [options] Optional options to Directory Delete operation.
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
   * @param {DirectorySetMetadataOptions} [options] Optional options to Directory Set Metadata operation.
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
   * Returns a list of files or directories under the specified share or directory. It lists the
   * contents only for a single level of the directory hierarchy.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-directories-and-files
   *
   * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
   * @param {DirectoryListFilesAndDirectoriesSegmentOptions} [options] Optional options to Directory List Files and Directories Segment operation.
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
