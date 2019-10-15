// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AbortSignal } from "@azure/abort-controller";
import { AbortSignalLike, isNode, isTokenCredential, TokenCredential } from "@azure/core-http";

import { Models } from ".";
import { ContextAborter } from "./ContextAborter";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { Directory } from "./generated/src/operations/directory";
import {
  AppendBlobClient,
  BlobClient,
  BlockBlobClient,
  PageBlobClient,
  StorageClient
} from "./internal";
import { DirectoryAccessConditions } from "./models";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { DfsContext } from "./policies/DfsPolicy";
import {
  appendToURLPath,
  base64encode,
  extractConnectionStringParts,
  getURLHost,
  getURLPath,
  objectEntries
} from "./utils/utils.common";

type DirectoryProperties = { [key: string]: string };

export function directoryPropertiesToString(prop: DirectoryProperties): string {
  return objectEntries(prop)
    .map((value) => {
      return `${value[0]}=${base64encode(value[1])}`;
    })
    .join(",");
}

export interface DirectoryCreateOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use &commat;azure/abort-controller create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryCreateOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Optional. User-defined properties to be stored with the file or directory.
   *
   * @type {DirectoryProperties}
   * @memberof DirectoryCreateOptions
   */
  directoryProperties?: DirectoryProperties;

  /**
   * Optional and only valid if Hierarchical Namespace is enabled for the account. Sets POSIX
   * access permissions for the file owner, the file owning group, and others. Each class may be
   * granted read, write, or execute permission.  The sticky bit is also supported. Both symbolic
   * (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported.
   *
   * @type {string}
   * @memberof DirectoryCreateOptions
   */
  posixPermissions?: string;

  /**
   * Only valid if Hierarchical Namespace is enabled for the account. This umask restricts
   * permission settings for file and directory, and will only be applied when default Acl does not
   * exist in parent directory. If the umask bit has set, it means that the corresponding
   * permission will be disabled. Otherwise the corresponding permission will be determined by the
   * permission. A 4-digit octal notation (e.g. 0022) is supported here. If no umask was specified,
   * a default umask - 0027 will be used.
   *
   * @type {string}
   * @memberof DirectoryCreateOptions
   */
  posixUmask?: string;

  /**
   * Additional parameters for the operation.
   *
   * @type {Models.DirectoryHttpHeaders}
   * @memberof DirectoryCreateOptions
   */
  directoryHttpHeaders?: Models.DirectoryHttpHeaders;

  /**
   * Conditions to meet for directory.
   *
   * @type {DirectoryAccessConditions}
   * @memberof DirectoryCreateOptions
   */
  directoryAccessConditions?: DirectoryAccessConditions;
}

export interface DirectoryDeleteOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use &commat;azure/abort-controller create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryDeleteOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Default true, all paths beneath the directory will be deleted.
   * If false and the directory is non-empty, an error occurs.
   *
   * @type {boolean}
   * @memberof DirectoryDeleteOptions
   */
  recursive?: boolean;

  /**
   * Conditions to meet for directory.
   *
   * @type {DirectoryAccessConditions}
   * @memberof DirectoryDeleteOptions
   */
  directoryAccessConditions?: DirectoryAccessConditions;
}

export interface DirectorySetAccessControlOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use &commat;azure/abort-controller create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectorySetAccessControlOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Optional. The owner of the blob or directory.
   *
   * @type {string}
   * @memberof DirectorySetAccessControlOptions
   */
  owner?: string;

  /**
   * Optional. The owning group of the blob or directory.
   *
   * @type {string}
   * @memberof DirectorySetAccessControlOptions
   */
  group?: string;

  /**
   * Conditions to meet for directory.
   *
   * @type {DirectoryAccessConditions}
   * @memberof DirectorySetAccessControlOptions
   */
  directoryAccessConditions?: DirectoryAccessConditions;
}

export interface DirectorySetPermissionsOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use &commat;azure/abort-controller create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectorySetPermissionsOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Optional. The owner of the blob or directory.
   *
   * @type {string}
   * @memberof DirectorySetPermissionsOptions
   */
  owner?: string;

  /**
   * Optional. The owning group of the blob or directory.
   *
   * @type {string}
   * @memberof DirectorySetPermissionsOptions
   */
  group?: string;

  /**
   * Conditions to meet for directory.
   *
   * @type {DirectoryAccessConditions}
   * @memberof DirectorySetPermissionsOptions
   */
  directoryAccessConditions?: DirectoryAccessConditions;
}

export interface DirectoryGetAccessControlOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use &commat;azure/abort-controller create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryGetAccessControlOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Conditions to meet for directory.
   *
   * @type {DirectoryAccessConditions}
   * @memberof DirectoryGetAccessControlOptions
   */
  directoryAccessConditions?: DirectoryAccessConditions;
}

export interface DirectoryMoveOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use &commat;azure/abort-controller create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DirectoryMoveOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Optional. Valid only when namespace is enabled.
   * This parameter determines the behavior of the rename or move operation.
   * The value must be "legacy" or "posix", and the default value will be "posix".
   *
   * Legacy: if the destination of the move is an existing directory and that directory is empty,
   * the source will overwrite the destination. If the directory is not empty, the move will fail.
   *
   * Posix: if the destination of the move is an existing empty directory,
   * destination will be overwritten. Otherwise, the source will be moved into the destination directory.
   * If the destination is an existing file, the file will be overwritten.
   *
   * @type {Models.PathRenameMode}
   * @memberof DirectoryMoveOptions
   */
  mode?: Models.PathRenameMode;

  /**
   * Source directory access conditions.
   *
   * @type {DirectoryAccessConditions}
   * @memberof DirectoryMoveOptions
   */
  sourceAccessConditions?: DirectoryAccessConditions;

  /**
   * Destination directory access conditions.
   *
   * @type {DirectoryAccessConditions}
   * @memberof DirectoryMoveOptions
   */
  destAccessConditions?: DirectoryAccessConditions;

  /**
   * Override default source path for move operations.
   *
   * By default, SDK will use path of DirectoryClient.url as move source.
   * For example, "/mycontainer/mydirectory" will be used as move source path regarding url
   * "https://myaccount.blob.core.windows.net/mycontainer/mydirectory".
   *
   * However, the default path in url may not correct.
   * For example, "/devstoreaccount1/mycontainer/mydirectory" will be parsed from emulator url "http://localhost:10000/devstoreaccount1/mycontainer/mydirectory".
   * In this case, use this option to force override the move source path.
   *
   * @type {string}
   * @memberof DirectoryMoveOptions
   */
  sourcePath?: string;
}

/**
 * A DirectoryClient represents a URL to an Azure Storage Directory.
 *
 * @export
 * @class DirectoryClient
 */
export class DirectoryClient extends StorageClient {
  private directoryContext: Directory;

  /**
   * Creates an instance of DirectoryClient from connection string.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} containerName Container name.
   * @param {string} directoryName Directory name.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof DirectoryClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    directoryName: string,
    options?: NewPipelineOptions
  );

  /**
   * Creates an instance of DirectoryClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a directory.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a directory name includes ? or %, directory name must be encoded in the URL.
   *
   * @param {string} url A Client string pointing to Azure Storage directory, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/mydirectory". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net/mycontainer/mydirectory?sasString".
   * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential, RawTokenCredential,
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof DirectoryClient
   */
  constructor(
    url: string,
    credential?: SharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: NewPipelineOptions
  );

  /**
   * Creates an instance of DirectoryClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage directory, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/mydirectory".
   *                     You can append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/mydirectory?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a directory.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a directory name includes ? or %, directory name must be encoded in the URL.
   *                     Such as a directory named "my?directory%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fdirectory%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof DirectoryClient
   */
  constructor(url: string, pipeline: Pipeline);

  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName?:
      | string
      | SharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    directoryNameOrOptions?: string | NewPipelineOptions,
    options?: NewPipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNode && credentialOrPipelineOrContainerName instanceof SharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      options = directoryNameOrOptions as NewPipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string" &&
      directoryNameOrOptions &&
      typeof directoryNameOrOptions === "string"
    ) {
      const containerName = credentialOrPipelineOrContainerName;
      const directoryName = directoryNameOrOptions;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const sharedKeyCredential = new SharedKeyCredential(
            extractedCreds.accountName,
            extractedCreds.accountKey
          );
          urlOrConnectionString = extractedCreds.url + "/" + containerName + "/" + directoryName;
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        urlOrConnectionString =
          extractedCreds.url +
          "/" +
          containerName +
          "/" +
          directoryName +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }

    const url = urlOrConnectionString;
    super(url, pipeline);
    this.directoryContext = new Directory(this.storageClientContext);
  }

  /**
   * Creates a BlobClient object.
   *
   * @param {string} [blobName] Optional. If not provide, will return blob client mapped to current directory.
   *                                      Otherwise, a sub-blob under current directory will be returned.
   * @returns {BlobClient} A new BlobClient object for the given blob name.
   * @memberof DirectoryClient
   */
  public getBlobClient(blobName?: string): BlobClient {
    if (blobName) {
      return new BlobClient(appendToURLPath(this.url, encodeURIComponent(blobName)), this.pipeline);
    } else {
      return new BlobClient(this.url, this.pipeline);
    }
  }

  /**
   * Creates a DirectoryClient object under current directory.
   *
   * @param {string} directoryName An directory name
   * @returns {DirectoryClient}
   * @memberof DirectoryClient
   */
  public getDirectoryClient(directoryName: string): DirectoryClient {
    return new DirectoryClient(
      appendToURLPath(this.url, encodeURIComponent(directoryName)),
      this.pipeline
    );
  }

  /**
   * Creates a AppendBlobClient object under current directory.
   *
   * @param {string} blobName An append blob name
   * @returns {AppendBlobClient}
   * @memberof DirectoryClient
   */
  public getAppendBlobClient(blobName: string): AppendBlobClient {
    return new AppendBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Creates a BlockBlobClient object under current directory..
   *
   * @param {string} blobName A block blob name
   * @returns {BlockBlobClient}
   * @memberof DirectoryClient
   */
  public getBlockBlobClient(blobName: string): BlockBlobClient {
    return new BlockBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Creates a PageBlobClient object under current directory..
   *
   * @param {string} blobName A page blob name
   * @returns {PageBlobClient}
   * @memberof DirectoryClient
   */
  public getPageBlobClient(blobName: string): PageBlobClient {
    return new PageBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Create a directory. By default, the destination is overwritten and if the destination already
   * exists and has a lease the lease is broken. This operation supports conditional HTTP requests.
   * For more information, see [Specifying Conditional Headers for Blob Service
   * Operations](https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations).
   * To fail if the destination already exists, use a conditional request with If-None-Match: "*".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param {DirectoryCreateOptions} [options={}]
   * @returns {Promise<Models.DirectoryCreateResponse>}
   * @memberof DirectoryClient
   */
  public async create(
    options: DirectoryCreateOptions = {}
  ): Promise<Models.DirectoryCreateResponse> {
    options.directoryAccessConditions = options.directoryAccessConditions || {};
    const aborter = new ContextAborter(options.abortSignal || AbortSignal.none, DfsContext);
    return this.directoryContext.create({
      abortSignal: aborter,
      directoryProperties: options.directoryProperties
        ? directoryPropertiesToString(options.directoryProperties)
        : undefined,
      posixPermissions: options.posixPermissions,
      posixUmask: options.posixUmask,
      directoryHttpHeaders: options.directoryHttpHeaders,
      leaseAccessConditions: options.directoryAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.directoryAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Deletes directory segmentally.
   *
   * @example
   * // Delete directory and all paths beneath the directory.
   * let marker;
   * do {
   *   marker = (await directoryClient.delete(marker)).marker;
   * } while (marker);
   *
   * @example
   * // Delete directory with recursive false. Will throw error when directory not empty
   * await directoryClient.delete(undefined, {recursive: false});
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/delete
   *
   * @param {string} [marker]  When deleting a directory, the number of paths that are deleted with each invocation is limited.
   *                           If the number of paths to be deleted exceeds this limit, a continuation token is returned in this response header.
   *                           When a continuation token is returned in the response,
   *                           it must be specified in a subsequent invocation of the delete operation to continue deleting the directory.
   * @param {DirectoryDeleteOptions} [options={}]
   * @returns {Promise<Models.DirectoryDeleteResponse>}
   * @memberof DirectoryClient
   */
  public async deleteSegment(
    marker?: string,
    options: DirectoryDeleteOptions = {}
  ): Promise<Models.DirectoryDeleteResponse> {
    options.directoryAccessConditions = options.directoryAccessConditions || {};

    // Default recursive is true
    if (options.recursive === undefined || options.recursive === null) {
      options.recursive = true;
    }

    const aborter = new ContextAborter(options.abortSignal || AbortSignal.none, DfsContext);
    return this.directoryContext.deleteMethod(options.recursive, {
      abortSignal: aborter,
      marker,
      leaseAccessConditions: options.directoryAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.directoryAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Delete directory and all paths beneath the directory.
   *
   * @example
   * for await (const response of directoryClient.delete()) {
   *   console.log(`Deleting directory...`);
   * }
   *
   * @example
   * const iterator = directoryClient.delete();
   * let response = await iterator.next();
   * while (!response.done) {
   *   response = await iterator.next();
   * }
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/delete
   *
   * @param {string} [marker]
   * @param {DirectoryDeleteOptions} [options={}]
   * @returns {AsyncIterableIterator<Models.DirectoryDeleteResponse>}
   * @memberof DirectoryClient
   */
  public async *delete(
    marker?: string,
    options: DirectoryDeleteOptions = {}
  ): AsyncIterableIterator<Models.DirectoryDeleteResponse> {
    do {
      const response = await this.deleteSegment(marker, options);
      marker = response.marker;
      yield response;
    } while (marker);
  }

  /**
   * Rename current directory to another directory. By default, the destination is overwritten and if the destination already
   * exists and has a lease the lease is broken. This operation supports conditional HTTP requests.
   * For more information, see [Specifying Conditional Headers for Blob Service
   * Operations](https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations).
   * To fail if the destination already exists, use a conditional request with If-None-Match: "*".
   *
   * @example
   * // Move directory and all paths beneath the directory.
   * let marker;
   * do {
   *   marker = (await directoryClient.move(destDirectoryClient, marker)).marker;
   * } while (marker);
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param {DirectoryClient} destination Destination DirectoryClient object. Must be same storage account with source.
   * @param {string} [marker]  When renaming a directory, the number of paths that are renamed with each invocation is limited.
   *                           If the number of paths to be renamed exceeds this limit, a continuation token is returned in this response header.
   *                           When a continuation token is returned in the response, it must be specified in
   *                           a subsequent invocation of the rename operation to continue renaming the directory.
   * @param {DirectoryMoveOptions} [options={}]
   * @returns {Promise<Models.DirectoryRenameResponse>}
   * @memberof DirectoryClient
   */
  public async moveSegment(
    destination: DirectoryClient,
    marker?: string,
    options: DirectoryMoveOptions = {}
  ): Promise<Models.DirectoryRenameResponse> {
    options.sourceAccessConditions = options.sourceAccessConditions || {};
    options.sourceAccessConditions.leaseAccessConditions =
      options.sourceAccessConditions.leaseAccessConditions || {};
    options.sourceAccessConditions.modifiedAccessConditions =
      options.sourceAccessConditions.modifiedAccessConditions || {};
    options.destAccessConditions = options.destAccessConditions || {};

    if (getURLHost(this.url) !== getURLHost(destination.url)) {
      throw RangeError(
        `Destination DirectoryClient must be in the same storage account with source.`
      );
    }

    const source = options.sourcePath || getURLPath(this.url);
    if (source === undefined) {
      throw RangeError(`Invalid move source path ${source}`);
    }

    const aborter = new ContextAborter(options.abortSignal || AbortSignal.none, DfsContext);
    return destination.directoryContext.rename(source, {
      abortSignal: aborter,
      pathRenameMode: options.mode,
      marker,
      sourceLeaseId: options.sourceAccessConditions.leaseAccessConditions.leaseId,
      sourceModifiedAccessConditions: {
        sourceIfModifiedSince:
          options.sourceAccessConditions.modifiedAccessConditions.ifModifiedSince,
        sourceIfUnmodifiedSince:
          options.sourceAccessConditions.modifiedAccessConditions.ifUnmodifiedSince,
        sourceIfMatch: options.sourceAccessConditions.modifiedAccessConditions.ifMatch,
        sourceIfNoneMatch: options.sourceAccessConditions.modifiedAccessConditions.ifNoneMatch
      },
      leaseAccessConditions: options.destAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.destAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Rename current directory to another directory. By default, the destination is overwritten and if the destination already
   * exists and has a lease the lease is broken. This operation supports conditional HTTP requests.
   * For more information, see [Specifying Conditional Headers for Blob Service
   * Operations](https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations).
   * To fail if the destination already exists, use a conditional request with If-None-Match: "*".
   *
   * @example
   * for await (const response of directoryClient.move(destDirectoryClient)) {
   *   console.log(`Moving directory...`);
   * }
   *
   * @example
   * const iterator = directoryClient.move(destDirectoryClient);
   * let response = await iterator.next();
   * while (!response.done) {
   *   response = await iterator.next();
   * }
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/create
   *
   * @param {DirectoryClient} destination Destination DirectoryClient object. Must be same storage account with source.
   * @param {string} [marker]  When renaming a directory, the number of paths that are renamed with each invocation is limited.
   *                           If the number of paths to be renamed exceeds this limit, a continuation token is returned in this response header.
   *                           When a continuation token is returned in the response, it must be specified in
   *                           a subsequent invocation of the rename operation to continue renaming the directory.
   * @param {DirectoryMoveOptions} [options={}]
   * @returns {AsyncIterableIterator<Models.DirectoryRenameResponse>}
   * @memberof DirectoryClient
   */
  public async *move(
    destination: DirectoryClient,
    marker?: string,
    options: DirectoryMoveOptions = {}
  ): AsyncIterableIterator<Models.DirectoryRenameResponse> {
    do {
      const response = await this.moveSegment(destination, marker, options);
      marker = response.marker;
      yield response;
    } while (marker);
  }

  /**
   * Set the owner, owner group or access control list for a directory.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/update
   *
   * @param {string} accessControl Sets POSIX access control rights on files and directories. The value is a comma-separated list
   *                               of access control entries. Each access control entry (ACE) consists of a scope, a type, a user
   *                               or group identifier, and permissions in the format "[scope:][type]:[id]:[permissions]".
   * @param {DirectorySetAccessControlOptions} [options={}]
   * @returns {Promise<Models.DirectorySetAccessControlResponse>}
   * @memberof DirectoryClient
   */
  public async setAccessControl(
    accessControl: string,
    options: DirectorySetAccessControlOptions = {}
  ): Promise<Models.DirectorySetAccessControlResponse> {
    options.directoryAccessConditions = options.directoryAccessConditions || {};
    const aborter = new ContextAborter(options.abortSignal || AbortSignal.none, DfsContext);
    return this.directoryContext.setAccessControl({
      abortSignal: aborter,
      owner: options.owner,
      group: options.group,
      posixAcl: accessControl,
      leaseAccessConditions: options.directoryAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.directoryAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Set the owner, owner group and their permissions for a directory.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/update
   *
   * @param {string} [permissions] Optional only when `options.owner` or `options.group` is provided.
   *                               Valid if Hierarchical Namespace is enabled for the account. Sets POSIX
   *                               access permissions for the file owner, the file owning group, and others. Each class may be
   *                               granted read, write, or execute permission.  The sticky bit is also supported.  Both symbolic
   *                               (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported.
   * @param {DirectorySetPermissionsOptions} [options={}]
   * @returns {Promise<Models.DirectorySetAccessControlResponse>}
   * @memberof DirectoryClient
   */
  public async setPermissions(
    permissions?: string,
    options: DirectorySetPermissionsOptions = {}
  ): Promise<Models.DirectorySetAccessControlResponse> {
    if (!permissions && !options.owner && !options.group) {
      throw TypeError(
        "options.owner or options.group must be provided when permissions parameter is empty."
      );
    }
    options.directoryAccessConditions = options.directoryAccessConditions || {};
    const aborter = new ContextAborter(options.abortSignal || AbortSignal.none, DfsContext);
    return this.directoryContext.setAccessControl({
      abortSignal: aborter,
      owner: options.owner,
      group: options.group,
      posixPermissions: permissions,
      leaseAccessConditions: options.directoryAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.directoryAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Get the owner, group, permissions, or access control list for a directory.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/datalakestoragegen2/path/getproperties
   *
   * @param {boolean} [upn] Optional. Valid only when Hierarchical Namespace is enabled for the account. If "true", the
   *                        identity values returned in the x-ms-owner, x-ms-group, and x-ms-acl response headers will be
   *                        transformed from Azure Active Directory Object IDs to User Principal Names.  If "false", the
   *                        values will be returned as Azure Active Directory Object IDs. The default value is false.
   * @param {DirectoryGetAccessControlOptions} [options={}]
   * @returns {Promise<Models.DirectoryGetAccessControlResponse>}
   * @memberof DirectoryClient
   */
  public async getAccessControl(
    upn?: boolean,
    options: DirectoryGetAccessControlOptions = {}
  ): Promise<Models.DirectoryGetAccessControlResponse> {
    options.directoryAccessConditions = options.directoryAccessConditions || {};
    const aborter = new ContextAborter(options.abortSignal || AbortSignal.none, DfsContext);
    return this.directoryContext.getAccessControl({
      abortSignal: aborter,
      upn,
      leaseAccessConditions: options.directoryAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.directoryAccessConditions.modifiedAccessConditions
    });
  }
}
