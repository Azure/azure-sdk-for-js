import { generateUuid, TransferProgressEvent } from "@azure/ms-rest-js";
import * as fs from "fs";
import { Readable } from "stream";

import { Aborter } from "./Aborter";
import { BlobURL } from "./BlobURL";
import { BlockBlobURL } from "./BlockBlobURL";
import { BlobHTTPHeaders } from "./generated/src/models";
import { BlobUploadCommonResponse, IDownloadFromBlobOptions, IUploadToBlockBlobOptions } from "./highlevel.common";
import { IBlobAccessConditions } from "./models";
import { Batch } from "./utils/Batch";
import { BufferScheduler } from "./utils/BufferScheduler";
import {
  BLOCK_BLOB_MAX_BLOCKS,
  BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
  BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES,
  DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES,
} from "./utils/constants";
import { generateBlockID } from "./utils/utils.common";
import { streamToBuffer } from "./utils/utils.node";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Uploads a local file in blocks to a block blob.
 *
 * When file size <= 256MB, this method will use 1 upload call to finish the upload.
 * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
 * to commit the block list.
 *
 * @export
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {string} filePath Full path of local file
 * @param {BlockBlobURL} blockBlobURL BlockBlobURL
 * @param {IUploadToBlockBlobOptions} [options] IUploadToBlockBlobOptions
 * @returns {(Promise<BlobUploadCommonResponse>)} ICommonResponse
 */
export async function uploadFileToBlockBlob(
  aborter: Aborter,
  filePath: string,
  blockBlobURL: BlockBlobURL,
  options?: IUploadToBlockBlobOptions
): Promise<BlobUploadCommonResponse> {
  const size = fs.statSync(filePath).size;
  return uploadResetableStreamToBlockBlob(
    aborter,
    (offset, count) =>
      fs.createReadStream(filePath, {
        autoClose: true,
        end: count ? offset + count - 1 : Infinity,
        start: offset
      }),
    size,
    blockBlobURL,
    options
  );
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
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {(offset: number) => NodeJS.ReadableStream} streamFactory Returns a Node.js Readable stream starting
 *                                                                  from the offset defined
 * @param {number} size Size of the block blob
 * @param {BlockBlobURL} blockBlobURL BlockBlobURL
 * @param {IUploadToBlockBlobOptions} [options] IUploadToBlockBlobOptions
 * @returns {(Promise<BlobUploadCommonResponse>)} ICommonResponse
 */
async function uploadResetableStreamToBlockBlob(
  aborter: Aborter,
  streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream,
  size: number,
  blockBlobURL: BlockBlobURL,
  options: IUploadToBlockBlobOptions = {}
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
    return blockBlobURL.upload(aborter, () => streamFactory(0), size, options);
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
          aborter,
          blockID,
          () => streamFactory(start, contentLength),
          contentLength,
          {
            leaseAccessConditions: options.blobAccessConditions!.leaseAccessConditions
          }
        );
        // Update progress after block is successfully uploaded to server, in case of block trying
        transferProgress += contentLength;
        if (options.progress) {
          options.progress({ loadedBytes: transferProgress });
        }
      }
    );
  }
  await batch.do();

  return blockBlobURL.commitBlockList(aborter, blockList, options);
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Downloads an Azure Blob in parallel to a buffer.
 * Offset and count are optional, pass 0 for both to download the entire blob.
 *
 * @export
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {Buffer} buffer Buffer to be fill, must have length larger than count
 * @param {BlobURL} blobURL A BlobURL object
 * @param {number} offset From which position of the block blob to download, in bytes
 * @param {number} [count] How much data in bytes to be downloaded. Will download to the end when passing undefined
 * @param {IDownloadFromBlobOptions} [options] IDownloadFromBlobOptions
 * @returns {Promise<void>}
 */
export async function downloadBlobToBuffer(
  aborter: Aborter,
  buffer: Buffer,
  blobURL: BlobURL,
  offset: number,
  count?: number,
  options: IDownloadFromBlobOptions = {}
): Promise<void> {
  if (!options.blockSize) {
    options.blockSize = 0;
  }
  if (options.blockSize < 0) {
    throw new RangeError("blockSize option must be >= 0");
  }
  if (options.blockSize === 0) {
    options.blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
  }

  if (offset < 0) {
    throw new RangeError("offset option must be >= 0");
  }

  if (count && count <= 0) {
    throw new RangeError("count option must be > 0");
  }

  if (!options.blobAccessConditions) {
    options.blobAccessConditions = {};
  }

  // Customer doesn't specify length, get it
  if (!count) {
    const response = await blobURL.getProperties(aborter, options);
    count = response.contentLength! - offset;
    if (count < 0) {
      throw new RangeError(
        `offset ${offset} shouldn't be larger than blob size ${response.contentLength!}`
      );
    }
  }

  if (buffer.length < count) {
    throw new RangeError(
      `The buffer's size should be equal to or larger than the request count of bytes: ${count}`
    );
  }

  let transferProgress: number = 0;
  const batch = new Batch(options.parallelism);
  for (let off = offset; off < offset + count; off = off + options.blockSize) {
    batch.addOperation(async () => {
      // Exclusive chunk end position
      let chunkEnd = offset + count!;
      if (off + options.blockSize! < chunkEnd) {
        chunkEnd = off + options.blockSize!;
      }

      const response = await blobURL.download(aborter, off, chunkEnd - off, {
        blobAccessConditions: options.blobAccessConditions,
        maxRetryRequests: options.maxRetryRequestsPerBlock
      });
      const stream = response.readableStreamBody!;
      await streamToBuffer(stream, buffer, off - offset, chunkEnd - offset);
      // Update progress after block is downloaded, in case of block trying
      // Could provide finer grained progress updating inside HTTP requests,
      // only if convenience layer download try is enabled
      transferProgress += chunkEnd - off;
      if (options.progress) {
        options.progress({ loadedBytes: transferProgress });
      }
    });
  }
  await batch.do();
}

/**
 * Option interface for uploadStreamToBlockBlob.
 *
 * @export
 * @interface IUploadStreamToBlockBlobOptions
 */
export interface IUploadStreamToBlockBlobOptions {
  /**
   * Blob HTTP Headers.
   *
   * @type {BlobHTTPHeaders}
   * @memberof IUploadStreamToBlockBlobOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;

  /**
   * Metadata of block blob.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof IUploadStreamToBlockBlobOptions
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Access conditions headers.
   *
   * @type {IBlobAccessConditions}
   * @memberof IUploadStreamToBlockBlobOptions
   */
  accessConditions?: IBlobAccessConditions;

  /**
   * Progress updater.
   *
   * @memberof IUploadStreamToBlockBlobOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
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
 * @export
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {Readable} stream Node.js Readable stream
 * @param {BlockBlobURL} blockBlobURL A BlockBlobURL instance
 * @param {number} bufferSize Size of every buffer allocated, also the block size in the uploaded block blob
 * @param {number} maxBuffers Max buffers will allocate during uploading, positive correlation
 *                            with max uploading concurrency
 * @param {IUploadStreamToBlockBlobOptions} [options]
 * @returns {Promise<BlobUploadCommonResponse>}
 */
export async function uploadStreamToBlockBlob(
  aborter: Aborter,
  stream: Readable,
  blockBlobURL: BlockBlobURL,
  bufferSize: number,
  maxBuffers: number,
  options: IUploadStreamToBlockBlobOptions = {}
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

      await blockBlobURL.stageBlock(aborter, blockID, buffer, buffer.length, {
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

  return blockBlobURL.commitBlockList(aborter, blockList, options);
}
