// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { HttpRequestBody, TransferProgressEvent } from "@azure/ms-rest-js";

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { BlobClient } from "./internal";
import { BlockBlob } from "./generated/lib/operations";
import { Range, rangeToString } from "./Range";
import { BlobAccessConditions, Metadata } from "./models";
import { Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { setURLParameter } from "./utils/utils.common";

export interface BlockBlobUploadOptions {
  abortSignal?: Aborter;
  accessConditions?: BlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  metadata?: Metadata;
  progress?: (progress: TransferProgressEvent) => void;
}

export interface BlockBlobStageBlockOptions {
  abortSignal?: Aborter;
  leaseAccessConditions?: Models.LeaseAccessConditions;
  progress?: (progress: TransferProgressEvent) => void;
  transactionalContentMD5?: Uint8Array;
}

export interface BlockBlobStageBlockFromURLOptions {
  abortSignal?: Aborter;
  range?: Range;
  leaseAccessConditions?: Models.LeaseAccessConditions;
  sourceContentMD5?: Uint8Array;
}

export interface BlockBlobCommitBlockListOptions {
  abortSignal?: Aborter;
  accessConditions?: BlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  metadata?: Metadata;
}

export interface BlockBlobGetBlockListOptions {
  abortSignal?: Aborter;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

/**
 * BlockBlobClient defines a set of operations applicable to block blobs.
 *
 * @export
 * @class BlockBlobClient
 * @extends {StorageClient}
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
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlockBlobClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.blockBlobContext = new BlockBlob(this.storageClientContext);
  }

  /**
   * Creates a new BlockBlobClient object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {BlockBlobClient}
   * @memberof BlockBlobClient
   */
  public withPipeline(pipeline: Pipeline): BlockBlobClient {
    return new BlockBlobClient(this.url, pipeline);
  }

  /**
   * Creates a new BlockBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param {string} snapshot
   * @returns {BlockBlobClient}
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
   * This is a non-parallel uploading method, please use uploadFileToBlockBlob(),
   * uploadStreamToBlockBlob() or uploadBrowserDataToBlockBlob() for better performance
   * with concurrency uploading.
   *
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param {BlockBlobUploadOptions} [options]
   * @returns {Promise<Models.BlockBlobUploadResponse>}
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
   * @param {HttpRequestBody} body
   * @param {number} contentLength
   * @param {BlockBlobStageBlockOptions} [options]
   * @returns {Promise<Models.BlockBlobStageBlockResponse>}
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
   * @param {number} offset From which position of the blob to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {BlockBlobStageBlockFromURLOptions} [options={}]
   * @returns {Promise<Models.BlockBlobStageBlockFromURLResponse>}
   * @memberof BlockBlobClient
   */
  public async stageBlockFromURL(
    blockId: string,
    sourceURL: string,
    offset: number,
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
   * @param {BlockBlobCommitBlockListOptions} [options]
   * @returns {Promise<Models.BlockBlobCommitBlockListResponse>}
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
   * @param {Models.BlockListType} listType
   * @param {BlockBlobGetBlockListOptions} [options]
   * @returns {Promise<Models.BlockBlobGetBlockListResponse>}
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
}
