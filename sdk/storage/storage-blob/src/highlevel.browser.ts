import { generateUuid } from "@azure/ms-rest-js";

import { BlockBlobURL } from "./BlockBlobURL";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import {
  BlobUploadCommonResponse,
  IUploadToBlockBlobOptions,
  CredentialOptions
} from "./highlevel.common";
import { INewPipelineOptions, StorageURL } from "./StorageURL";
import { Batch } from "./utils/Batch";
import {
  BLOCK_BLOB_MAX_BLOCKS,
  BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
  BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES,
  DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES
} from "./utils/constants";
import { generateBlockID } from "./utils/utils.common";
import { CancellationOptions } from './CancellationOptions';

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
 * @param {BlockBlobURL} blockBlobURL
 * @param {IUploadToBlockBlobOptions & CancellationOptions} [options]
 * @returns {Promise<BlobUploadCommonResponse>}
 */
export async function uploadBrowserDataToBlockBlob(
  browserData: Blob | ArrayBuffer | ArrayBufferView,
  blockBlobURL: BlockBlobURL,
  options: IUploadToBlockBlobOptions & CancellationOptions = {}
): Promise<BlobUploadCommonResponse> {
  const browserBlob = new Blob([browserData]);
  return UploadSeekableBlobToBlockBlob(
    (offset: number, size: number): Blob => {
      return browserBlob.slice(offset, offset + size);
    },
    browserBlob.size,
    blockBlobURL,
    options
  );
}

// /**
//  * Intersection type that is {@link IUploadToBlockBlobOptions}, {@link CredentialOptions}, and
//  * {@link INewPipelineOptions} at the same time. It contains all members of these types.
//  */
// export type UploadBrowserDataToBlockBlobUrlOptions = IUploadToBlockBlobOptions & CredentialOptions & INewPipelineOptions;

/**
 * ONLY AVAILABLE IN BROWSERS.
 *
 * Uploads a browser Blob/File/ArrayBuffer/ArrayBufferView object to block blob given a url to that blob.
 * This method assumes container already exists.
 *
 * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
 * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
 * to commit the block list.
 *
 * @export
 * @param {Blob | ArrayBuffer | ArrayBufferView} browserData Blob, File, ArrayBuffer or ArrayBufferView
 * @param {BlockBlobURL} blockBlobURL
 * @param {IUploadToBlockBlobOptions & CancellationOptions & CredentialOptions & INewPipelineOptions} options Options for Uploading browser data, credential, and new pipeline.
 *                                                           If credential options is not specified {@link AnonymousCredential} is used.
 * @returns {Promise<BlobUploadCommonResponse>}
 */
export async function uploadBrowserDataToBlockBlobUrl(
  browserData: Blob | ArrayBuffer | ArrayBufferView,
  url: string,
  options: IUploadToBlockBlobOptions & CancellationOptions & CredentialOptions & INewPipelineOptions = {},
): Promise<BlobUploadCommonResponse> {

  const pipeline = StorageURL.newPipeline(options.credential || new AnonymousCredential(), options);
  const blockBlobURL = new BlockBlobURL(url, pipeline);
  return uploadBrowserDataToBlockBlob(browserData, blockBlobURL, options);
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
 * @param {BlockBlobURL} blockBlobURL
 * @param {IUploadToBlockBlobOptions & CancellationOptions} [options]
 * @returns {Promise<BlobUploadCommonResponse>}
 */
async function UploadSeekableBlobToBlockBlob(
  blobFactory: (offset: number, size: number) => Blob,
  size: number,
  blockBlobURL: BlockBlobURL,
  options: IUploadToBlockBlobOptions & CancellationOptions = {}
): Promise<BlobUploadCommonResponse> {
  if (!options.blockSize) {
    options.blockSize = 0;
  }
  if (
    options.blockSize < 0 ||
    options.blockSize > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES
  ) {
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
    return blockBlobURL.upload(blobFactory(0, size), size, options);
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
        await blockBlobURL.stageBlock(
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

  return blockBlobURL.commitBlockList(blockList, options);
}
