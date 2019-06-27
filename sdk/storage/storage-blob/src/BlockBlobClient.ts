// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as fs from "fs";

import {
  generateUuid,
  HttpRequestBody,
  HttpResponse,
  TransferProgressEvent,
  TokenCredential,
  isTokenCredential,
  isNode
} from "@azure/core-http";

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { BlobClient } from "./internal";
import { BlockBlob } from "./generated/lib/operations";
import { BlobHTTPHeaders } from "./generated/lib/models";
import { Range, rangeToString } from "./Range";
import { BlobAccessConditions, Metadata } from "./models";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import {
  setURLParameter,
  extractConnectionStringParts,
  generateBlockID
} from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { Credential } from "./credentials/Credential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import {
  URLConstants,
  BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
  BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES,
  BLOCK_BLOB_MAX_BLOCKS,
  DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES
} from "./utils/constants";
import { BufferScheduler } from "./utils/BufferScheduler";
import { Readable } from "stream";
import { Batch } from "./utils/Batch";

/**
 * Options to configure Block Blob - Upload operation.
 *
 * @export
 * @interface BlockBlobUploadOptions
 */
export interface BlockBlobUploadOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof BlockBlobUploadOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when uploading to the block blob.
   *
   * @type {BlobAccessConditions}
   * @memberof BlockBlobUploadOptions
   */
  accessConditions?: BlobAccessConditions;
  /**
   * HTTP headers to set when uploading to a block blob.
   *
   * @type {Models.BlobHTTPHeaders}
   * @memberof BlockBlobUploadOptions
   */
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when uploading to a block blob.
   *
   * @type {Metadata}
   * @memberof BlockBlobUploadOptions
   */
  metadata?: Metadata;
  /**
   * Callback to receive events on the progress of upload operation.
   *
   * @memberof BlockBlobUploadOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
}

/**
 * Options to configure Block Blob - Stage Block operation.
 *
 * @export
 * @interface BlockBlobStageBlockOptions
 */
export interface BlockBlobStageBlockOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof BlockBlobStageBlockOptions
   */
  abortSignal?: Aborter;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {Models.LeaseAccessConditions}
   * @memberof BlockBlobStageBlockOptions
   */
  leaseAccessConditions?: Models.LeaseAccessConditions;
  /**
   * Callback to receive events on the progress of stage block operation.
   *
   * @memberof BlockBlobStageBlockOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
  /**
   * A Uint8Array holding the MD5 hash of the block content.
   * It is only used to verify the integrity of the block during transport.
   * It is not stored in with the blob.
   *
   * @type {Uint8Array}
   * @memberof BlockBlobStageBlockOptions
   */
  transactionalContentMD5?: Uint8Array;
}

/**
 * Options to configure Block Blob - Stage Block from URL operation.
 *
 * @export
 * @interface BlockBlobStageBlockFromURLOptions
 */
export interface BlockBlobStageBlockFromURLOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  abortSignal?: Aborter;
  /**
   * Specifies the bytes of the source Blob/File to upload.
   * If not specified, the entire content is uploaded as a single block.
   *
   * @type {Range}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  range?: Range;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {Models.LeaseAccessConditions}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  leaseAccessConditions?: Models.LeaseAccessConditions;
  /**
   * A Uint8Array holding the MD5 hash of the source block content.
   * It is only used to verify the integrity of the block during transport.
   * It is not stored in with the blob.
   *
   * @type {Uint8Array}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  sourceContentMD5?: Uint8Array;
}

/**
 * Options to configure Block Blob - Commit Block List operation.
 *
 * @export
 * @interface BlockBlobCommitBlockListOptions
 */
export interface BlockBlobCommitBlockListOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof BlockBlobCommitBlockListOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when committing the block list.
   *
   * @type {BlobAccessConditions}
   * @memberof BlockBlobCommitBlockListOptions
   */
  /**
   * Conditions to meet when committing block list.
   *
   * @type {BlobAccessConditions}
   * @memberof BlockBlobCommitBlockListOptions
   */
  accessConditions?: BlobAccessConditions;
  /**
   * HTTP headers to set when committing block list.
   *
   * @type {Models.BlobHTTPHeaders}
   * @memberof BlockBlobCommitBlockListOptions
   */
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when committing block list.
   *
   * @type {Metadata}
   * @memberof BlockBlobCommitBlockListOptions
   */
  metadata?: Metadata;
}

/**
 * Options to configure Block Blob - Get Block List operation.
 *
 * @export
 * @interface BlockBlobGetBlockListOptions
 */
export interface BlockBlobGetBlockListOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof BlockBlobGetBlockListOptions
   */
  abortSignal?: Aborter;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {Models.LeaseAccessConditions}
   * @memberof BlockBlobGetBlockListOptions
   */
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

/**
 * Option interface for uploadStream().
 *
 * @export
 * @interface UploadStreamToBlockBlobOptions
 */
export interface UploadStreamToBlockBlobOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof IUploadToBlockBlobOptions
   */
  abortSignal?: Aborter;

  /**
   * Blob HTTP Headers.
   *
   * @type {BlobHTTPHeaders}
   * @memberof UploadStreamToBlockBlobOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;

  /**
   * Metadata of block blob.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof UploadStreamToBlockBlobOptions
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Access conditions headers.
   *
   * @type {BlobAccessConditions}
   * @memberof UploadStreamToBlockBlobOptions
   */
  accessConditions?: BlobAccessConditions;

  /**
   * Progress updater.
   *
   * @memberof UploadStreamToBlockBlobOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
}
/**
 * Option interface for BlockBlobClient.uploadFile() and BlockBlobClient.uploadSeekableStream().
 *
 * @export
 * @interface UploadToBlockBlobOptions
 */
export interface UploadToBlockBlobOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof IUploadToBlockBlobOptions
   */
  abortSignal?: Aborter;

  /**
   * Destination block blob size in bytes.
   *
   * @type {number}
   * @memberof UploadToBlockBlobOptions
   */
  blockSize?: number;

  /**
   * Blob size threshold in bytes to start concurrency uploading.
   * Default value is 256MB, blob size less than this option will
   * be uploaded via one I/O operation without concurrency.
   * You can customize a value less equal than the default value.
   *
   * @type {number}
   * @memberof UploadToBlockBlobOptions
   */
  maxSingleShotSize?: number;

  /**
   * Progress updater.
   *
   * @memberof UploadToBlockBlobOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Blob HTTP Headers.
   *
   * @type {IBlobHTTPHeaders}
   * @memberof UploadToBlockBlobOptions
   */
  blobHTTPHeaders?: Models.BlobHTTPHeaders;

  /**
   * Metadata of block blob.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof UploadToBlockBlobOptions
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Access conditions headers.
   *
   * @type {BlobAccessConditions}
   * @memberof UploadToBlockBlobOptions
   */
  blobAccessConditions?: BlobAccessConditions;

  /**
   * Concurrency of parallel uploading. Must be >= 0.
   *
   * @type {number}
   * @memberof UploadToBlockBlobOptions
   */
  parallelism?: number;
}

/**
 * Type for BlockBlobClient.uploadFile(), BlockBlobClient.uploadStream() and BlockBlobClient.uploadBrowserDate().
 *
 * @export
 */
export type BlobUploadCommonResponse = Models.BlockBlobUploadHeaders & {
  /**
   * The underlying HTTP response.
   *
   * @type {HttpResponse}
   * @memberof IBlobUploadCommonResponse
   */
  _response: HttpResponse;
};

/**
 * BlockBlobClient defines a set of operations applicable to block blobs.
 *
 * @export
 * @class BlockBlobClient
 * @extends {BlobClient}
 */
export class BlockBlobClient extends BlobClient {
  /**
   * blockBlobContext provided by protocol layer.
   *
   * @private
   * @type {BlockBlobs}
   * @memberof BlockBlobClient
   */
  private blockBlobContext: BlockBlob;

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates an instance of BlockBlobClient.
   *
   * @param {string} connectionString Connection string for an Azure storage account.
   * @param {string} containerName Container name.
   * @param {string} blobName Blob name.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlockBlobClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: NewPipelineOptions
  );
  /**
   * Creates an instance of BlockBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage block blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {Credential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlockBlobClient
   */
  constructor(url: string, credential?: Credential | TokenCredential, options?: NewPipelineOptions);
  /**
   * Creates an instance of BlockBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage block blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlockBlobClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName?: string | Credential | TokenCredential | Pipeline,
    blobNameOrOptions?: string | NewPipelineOptions,
    options?: NewPipelineOptions
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: Pipeline;
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      credentialOrPipelineOrContainerName instanceof Credential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      options = blobNameOrOptions as NewPipelineOptions;
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
      blobNameOrOptions &&
      typeof blobNameOrOptions === "string"
    ) {
      if (isNode) {
        const containerName = credentialOrPipelineOrContainerName;
        const blobName = blobNameOrOptions;

        const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
        const sharedKeyCredential = new SharedKeyCredential(
          extractedCreds.accountName,
          extractedCreds.accountKey
        );
        urlOrConnectionString = extractedCreds.url + "/" + containerName + "/" + blobName;
        pipeline = newPipeline(sharedKeyCredential, options);
      } else {
        throw new Error("Connection string is only supported in Node.js environment");
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(urlOrConnectionString, pipeline);
    this.blockBlobContext = new BlockBlob(this.storageClientContext);
  }

  /**
   * Creates a new BlockBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param {string} snapshot The snapshot timestamp.
   * @returns {BlockBlobClient} A new BlockBlobClient object identical to the source but with the specified snapshot timestamp.
   * @memberof BlockBlobClient
   */
  public withSnapshot(snapshot: string): BlockBlobClient {
    return new BlockBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot
      ),
      this.pipeline
    );
  }

  /**
   * Creates a new block blob, or updates the content of an existing block blob.
   * Updating an existing block blob overwrites any existing metadata on the blob.
   * Partial updates are not supported; the content of the existing blob is
   * overwritten with the new content. To perform a partial update of a block blob's,
   * use stageBlock and commitBlockList.
   *
   * This is a non-parallel uploading method, please use uploadFile(),
   * uploadStream() or uploadBrowserData() for better performance
   * with concurrency uploading.
   *
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param {BlockBlobUploadOptions} [options] Options to the Block Blob Upload operation.
   * @returns {Promise<Models.BlockBlobUploadResponse>} Response data for the Block Blob Upload operation.
   * @memberof BlockBlobClient
   */
  public async upload(
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobUploadOptions = {}
  ): Promise<Models.BlockBlobUploadResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.blockBlobContext.upload(body, contentLength, {
      abortSignal: aborter,
      blobHTTPHeaders: options.blobHTTPHeaders,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      onUploadProgress: options.progress
    });
  }

  /**
   * Uploads the specified block to the block blob's "staging area" to be later
   * committed by a call to commitBlockList.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-block
   *
   * @param {string} blockId A 64-byte value that is base64-encoded
   * @param {HttpRequestBody} body Data to upload to the staging area.
   * @param {number} contentLength Number of bytes to upload.
   * @param {BlockBlobStageBlockOptions} [options] Options to the Block Blob Stage Block operation.
   * @returns {Promise<Models.BlockBlobStageBlockResponse>} Response data for the Block Blob Stage Block operation.
   * @memberof BlockBlobClient
   */
  public async stageBlock(
    blockId: string,
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobStageBlockOptions = {}
  ): Promise<Models.BlockBlobStageBlockResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.blockBlobContext.stageBlock(blockId, contentLength, body, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions,
      onUploadProgress: options.progress,
      transactionalContentMD5: options.transactionalContentMD5
    });
  }

  /**
   * The Stage Block From URL operation creates a new block to be committed as part
   * of a blob where the contents are read from a URL.
   * This API is available starting in version 2018-03-28.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-block-from-url
   *
   * @param {string} blockId A 64-byte value that is base64-encoded
   * @param {string} sourceURL Specifies the URL of the blob. The value
   *                           may be a URL of up to 2 KB in length that specifies a blob.
   *                           The value should be URL-encoded as it would appear
   *                           in a request URI. The source blob must either be public
   *                           or must be authenticated via a shared access signature.
   *                           If the source blob is public, no authentication is required
   *                           to perform the operation. Here are some examples of source object URLs:
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param {number} [offset] From which position of the blob to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {BlockBlobStageBlockFromURLOptions} [options={}] Options to the Block Blob Stage Block From URL operation.
   * @returns {Promise<Models.BlockBlobStageBlockFromURLResponse>} Response data for the Block Blob Stage Block From URL operation.
   * @memberof BlockBlobClient
   */
  public async stageBlockFromURL(
    blockId: string,
    sourceURL: string,
    offset: number = 0,
    count?: number,
    options: BlockBlobStageBlockFromURLOptions = {}
  ): Promise<Models.BlockBlobStageBlockFromURLResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.blockBlobContext.stageBlockFromURL(blockId, 0, sourceURL, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions,
      sourceContentMD5: options.sourceContentMD5,
      sourceRange: offset === 0 && !count ? undefined : rangeToString({ offset, count })
    });
  }

  /**
   * Writes a blob by specifying the list of block IDs that make up the blob.
   * In order to be written as part of a blob, a block must have been successfully written
   * to the server in a prior stageBlock operation. You can call commitBlockList to update a blob
   * by uploading only those blocks that have changed, then committing the new and existing
   * blocks together. Any blocks not specified in the block list and permanently deleted.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-block-list
   *
   * @param {string[]} blocks  Array of 64-byte value that is base64-encoded
   * @param {BlockBlobCommitBlockListOptions} [options] Options to the Block Blob Commit Block List operation.
   * @returns {Promise<Models.BlockBlobCommitBlockListResponse>} Response data for the Block Blob Commit Block List operation.
   * @memberof BlockBlobClient
   */
  public async commitBlockList(
    blocks: string[],
    options: BlockBlobCommitBlockListOptions = {}
  ): Promise<Models.BlockBlobCommitBlockListResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.blockBlobContext.commitBlockList(
      { latest: blocks },
      {
        abortSignal: aborter,
        blobHTTPHeaders: options.blobHTTPHeaders,
        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
        metadata: options.metadata,
        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions
      }
    );
  }

  /**
   * Returns the list of blocks that have been uploaded as part of a block blob
   * using the specified block list filter.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-block-list
   *
   * @param {Models.BlockListType} listType Specifies whether to return the list of committed blocks,
   *                                        the list of uncommitted blocks, or both lists together.
   * @param {BlockBlobGetBlockListOptions} [options] Options to the Block Blob Get Block List operation.
   * @returns {Promise<Models.BlockBlobGetBlockListResponse>} Response data for the Block Blob Get Block List operation.
   * @memberof BlockBlobClient
   */
  public async getBlockList(
    listType: Models.BlockListType,
    options: BlockBlobGetBlockListOptions = {}
  ): Promise<Models.BlockBlobGetBlockListResponse> {
    const aborter = options.abortSignal || Aborter.none;
    const res = await this.blockBlobContext.getBlockList(listType, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions
    });

    if (!res.committedBlocks) {
      res.committedBlocks = [];
    }

    if (!res.uncommittedBlocks) {
      res.uncommittedBlocks = [];
    }

    return res;
  }

  // High level functions

  /**
   * ONLY AVAILABLE IN BROWSERS.
   *
   * Uploads a browser Blob/File/ArrayBuffer/ArrayBufferView object to block blob.
   *
   * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
   * to commit the block list.
   *
   * @export
   * @param {Blob | ArrayBuffer | ArrayBufferView} browserData Blob, File, ArrayBuffer or ArrayBufferView
   * @param {UploadToBlockBlobOptions} [options] Options to upload browser data.
   * @returns {Promise<BlobUploadCommonResponse>} Response data for the Blob Upload operation.
   */
  public async uploadBrowserData(
    browserData: Blob | ArrayBuffer | ArrayBufferView,
    options?: UploadToBlockBlobOptions
  ): Promise<BlobUploadCommonResponse> {
    const browserBlob = new Blob([browserData]);
    return this.UploadSeekableBlob(
      (offset: number, size: number): Blob => {
        return browserBlob.slice(offset, offset + size);
      },
      browserBlob.size,
      options
    );
  }

  /**
   * ONLY AVAILABLE IN BROWSERS.
   *
   * Uploads a browser Blob object to block blob. Requires a blobFactory as the data source,
   * which need to return a Blob object with the offset and size provided.
   *
   * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
   * to commit the block list.
   *
   * @param {(offset: number, size: number) => Blob} blobFactory
   * @param {number} size size of the data to upload.
   * @param {UploadToBlockBlobOptions} [options] Options to Upload to Block Blob operation.
   * @returns {Promise<BlobUploadCommonResponse>} Response data for the Blob Upload operation.
   */
  private async UploadSeekableBlob(
    blobFactory: (offset: number, size: number) => Blob,
    size: number,
    options: UploadToBlockBlobOptions = {}
  ): Promise<BlobUploadCommonResponse> {
    if (!options.blockSize) {
      options.blockSize = 0;
    }
    if (options.blockSize < 0 || options.blockSize > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
      throw new RangeError(
        `blockSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES}`
      );
    }

    if (options.maxSingleShotSize !== 0 && !options.maxSingleShotSize) {
      options.maxSingleShotSize = BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES;
    }
    if (
      options.maxSingleShotSize < 0 ||
      options.maxSingleShotSize > BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES
    ) {
      throw new RangeError(
        `maxSingleShotSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}`
      );
    }

    if (options.blockSize === 0) {
      if (size > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES * BLOCK_BLOB_MAX_BLOCKS) {
        throw new RangeError(`${size} is too larger to upload to a block blob.`);
      }
      if (size > options.maxSingleShotSize) {
        options.blockSize = Math.ceil(size / BLOCK_BLOB_MAX_BLOCKS);
        if (options.blockSize < DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES) {
          options.blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
        }
      }
    }
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.blobAccessConditions) {
      options.blobAccessConditions = {};
    }

    if (size <= options.maxSingleShotSize) {
      return this.upload(blobFactory(0, size), size, options);
    }

    const numBlocks: number = Math.floor((size - 1) / options.blockSize) + 1;
    if (numBlocks > BLOCK_BLOB_MAX_BLOCKS) {
      throw new RangeError(
        `The buffer's size is too big or the BlockSize is too small;` +
          `the number of blocks must be <= ${BLOCK_BLOB_MAX_BLOCKS}`
      );
    }

    const blockList: string[] = [];
    const blockIDPrefix = generateUuid();
    let transferProgress: number = 0;

    const batch = new Batch(options.parallelism);
    for (let i = 0; i < numBlocks; i++) {
      batch.addOperation(
        async (): Promise<any> => {
          const blockID = generateBlockID(blockIDPrefix, i);
          const start = options.blockSize! * i;
          const end = i === numBlocks - 1 ? size : start + options.blockSize!;
          const contentLength = end - start;
          blockList.push(blockID);
          await this.stageBlock(blockID, blobFactory(start, contentLength), contentLength, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.blobAccessConditions!.leaseAccessConditions
          });
          // Update progress after block is successfully uploaded to server, in case of block trying
          // TODO: Hook with convenience layer progress event in finer level
          transferProgress += contentLength;
          if (options.progress) {
            options.progress!({
              loadedBytes: transferProgress
            });
          }
        }
      );
    }
    await batch.do();

    return this.commitBlockList(blockList, options);
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a local file in blocks to a block blob.
   *
   * When file size <= 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
   * to commit the block list.
   *
   * @param {string} filePath Full path of local file
   * @param {UploadToBlockBlobOptions} [options] Options to Upload to Block Blob operation.
   * @returns {(Promise<BlobUploadCommonResponse>)}  Response data for the Blob Upload operation.
   */
  public async uploadFile(
    filePath: string,
    options?: UploadToBlockBlobOptions
  ): Promise<BlobUploadCommonResponse> {
    const size = fs.statSync(filePath).size;
    return this.uploadResetableStream(
      (offset, count) =>
        fs.createReadStream(filePath, {
          autoClose: true,
          end: count ? offset + count - 1 : Infinity,
          start: offset
        }),
      size,
      options
    );
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a Node.js Readable stream into block blob.
   *
   * PERFORMANCE IMPROVEMENT TIPS:
   * * Input stream highWaterMark is better to set a same value with bufferSize
   *    parameter, which will avoid Buffer.concat() operations.
   *
   * @param {Readable} stream Node.js Readable stream
   * @param {BlockBlobClient} blockBlobClient A BlockBlobClient instance
   * @param {number} bufferSize Size of every buffer allocated, also the block size in the uploaded block blob
   * @param {number} maxBuffers Max buffers will allocate during uploading, positive correlation
   *                            with max uploading concurrency
   * @param {UploadStreamToBlockBlobOptions} [options] Options to Upload Stream to Block Blob operation.
   * @returns {Promise<BlobUploadCommonResponse>} Response data for the Blob Upload operation.
   */
  public async uploadStream(
    stream: Readable,
    bufferSize: number,
    maxBuffers: number,
    options: UploadStreamToBlockBlobOptions = {}
  ): Promise<BlobUploadCommonResponse> {
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.accessConditions) {
      options.accessConditions = {};
    }

    let blockNum = 0;
    const blockIDPrefix = generateUuid();
    let transferProgress: number = 0;
    const blockList: string[] = [];

    const scheduler = new BufferScheduler(
      stream,
      bufferSize,
      maxBuffers,
      async (buffer: Buffer) => {
        const blockID = generateBlockID(blockIDPrefix, blockNum);
        blockList.push(blockID);
        blockNum++;

        await this.stageBlock(blockID, buffer, buffer.length, {
          leaseAccessConditions: options.accessConditions!.leaseAccessConditions
        });

        // Update progress after block is successfully uploaded to server, in case of block trying
        transferProgress += buffer.length;
        if (options.progress) {
          options.progress({ loadedBytes: transferProgress });
        }
      },
      // Parallelism should set a smaller value than maxBuffers, which is helpful to
      // reduce the possibility when a outgoing handler waits for stream data, in
      // this situation, outgoing handlers are blocked.
      // Outgoing queue shouldn't be empty.
      Math.ceil((maxBuffers / 4) * 3)
    );
    await scheduler.do();

    return this.commitBlockList(blockList, options);
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Accepts a Node.js Readable stream factory, and uploads in blocks to a block blob.
   * The Readable stream factory must returns a Node.js Readable stream starting from the offset defined. The offset
   * is the offset in the block blob to be uploaded.
   *
   * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
   * to commit the block list.
   *
   * @export
   * @param {(offset: number) => NodeJS.ReadableStream} streamFactory Returns a Node.js Readable stream starting
   *                                                                  from the offset defined
   * @param {number} size Size of the block blob
   * @param {UploadToBlockBlobOptions} [options] Options to Upload to Block Blob operation.
   * @returns {(Promise<BlobUploadCommonResponse>)}  Response data for the Blob Upload operation.
   */
  private async uploadResetableStream(
    streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream,
    size: number,
    options: UploadToBlockBlobOptions = {}
  ): Promise<BlobUploadCommonResponse> {
    if (!options.blockSize) {
      options.blockSize = 0;
    }
    if (options.blockSize < 0 || options.blockSize > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
      throw new RangeError(
        `blockSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES}`
      );
    }

    if (options.maxSingleShotSize !== 0 && !options.maxSingleShotSize) {
      options.maxSingleShotSize = BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES;
    }
    if (
      options.maxSingleShotSize < 0 ||
      options.maxSingleShotSize > BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES
    ) {
      throw new RangeError(
        `maxSingleShotSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}`
      );
    }

    if (options.blockSize === 0) {
      if (size > BLOCK_BLOB_MAX_BLOCKS * BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
        throw new RangeError(`${size} is too larger to upload to a block blob.`);
      }
      if (size > options.maxSingleShotSize) {
        options.blockSize = Math.ceil(size / BLOCK_BLOB_MAX_BLOCKS);
        if (options.blockSize < DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES) {
          options.blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
        }
      }
    }
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.blobAccessConditions) {
      options.blobAccessConditions = {};
    }

    if (size <= options.maxSingleShotSize) {
      return this.upload(() => streamFactory(0), size, options);
    }

    const numBlocks: number = Math.floor((size - 1) / options.blockSize) + 1;
    if (numBlocks > BLOCK_BLOB_MAX_BLOCKS) {
      throw new RangeError(
        `The buffer's size is too big or the BlockSize is too small;` +
          `the number of blocks must be <= ${BLOCK_BLOB_MAX_BLOCKS}`
      );
    }

    const blockList: string[] = [];
    const blockIDPrefix = generateUuid();
    let transferProgress: number = 0;

    const batch = new Batch(options.parallelism);
    for (let i = 0; i < numBlocks; i++) {
      batch.addOperation(
        async (): Promise<any> => {
          const blockID = generateBlockID(blockIDPrefix, i);
          const start = options.blockSize! * i;
          const end = i === numBlocks - 1 ? size : start + options.blockSize!;
          const contentLength = end - start;
          blockList.push(blockID);
          await this.stageBlock(blockID, () => streamFactory(start, contentLength), contentLength, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.blobAccessConditions!.leaseAccessConditions
          });
          // Update progress after block is successfully uploaded to server, in case of block trying
          transferProgress += contentLength;
          if (options.progress) {
            options.progress({ loadedBytes: transferProgress });
          }
        }
      );
    }
    await batch.do();

    return this.commitBlockList(blockList, options);
  }
}
