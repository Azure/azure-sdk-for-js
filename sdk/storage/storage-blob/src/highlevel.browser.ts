// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { generateUuid } from "@azure/ms-rest-js";

import { BlockBlobClient } from "./BlockBlobClient";
import { BlobUploadCommonResponse, UploadToBlockBlobOptions } from "./highlevel.common";
import { Batch } from "./utils/Batch";
import {
  BLOCK_BLOB_MAX_BLOCKS,
  BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
  BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES,
  DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES
} from "./utils/constants";
import { generateBlockID } from "./utils/utils.common";

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
 * @param {BlockBlobClient} blockBlobClient
 * @param {UploadToBlockBlobOptions} [options]
 * @returns {Promise<BlobUploadCommonResponse>}
 */
export async function uploadBrowserDataToBlockBlob(
  browserData: Blob | ArrayBuffer | ArrayBufferView,
  blockBlobClient: BlockBlobClient,
  options?: UploadToBlockBlobOptions
): Promise<BlobUploadCommonResponse> {
  const browserBlob = new Blob([browserData]);
  return UploadSeekableBlobToBlockBlob(
    (offset: number, size: number): Blob => {
      return browserBlob.slice(offset, offset + size);
    },
    browserBlob.size,
    blockBlobClient,
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
 * @param {number} size
 * @param {BlockBlobClient} blockBlobClient
 * @param {UploadToBlockBlobOptions} [options]
 * @returns {Promise<BlobUploadCommonResponse>}
 */
async function UploadSeekableBlobToBlockBlob(
  blobFactory: (offset: number, size: number) => Blob,
  size: number,
  blockBlobClient: BlockBlobClient,
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
    return blockBlobClient.upload(blobFactory(0, size), size, options);
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
        await blockBlobClient.stageBlock(
          blockID,
          blobFactory(start, contentLength),
          contentLength,
          {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.blobAccessConditions!
              .leaseAccessConditions
          }
        );
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

  return blockBlobClient.commitBlockList(blockList, options);
}
