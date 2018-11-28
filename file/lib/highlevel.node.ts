import * as fs from "fs";
import { TransferProgressEvent } from "ms-rest-js";
import { Readable } from "stream";
import { Aborter } from "./Aborter";
import { FileURL } from "./FileURL";
import {
  IDownloadFromAzureFileOptions,
  IUploadToAzureFileOptions
} from "./highlevel.common";
import { IFileHTTPHeaders, IMetadata } from "./models";
import { Batch } from "./utils/Batch";
import { BufferScheduler } from "./utils/BufferScheduler";
import {
  DEFAULT_HIGH_LEVEL_PARALLELISM,
  FILE_RANGE_MAX_SIZE_BYTES
} from "./utils/constants";
import { streamToBuffer } from "./utils/utils.node";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Uploads a local file to an Azure file.
 *
 * @export
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {string} filePath Full path of local file
 * @param {FileURL} fileURL FileURL
 * @param {IUploadToAzureFileOptions} [options]
 * @returns {(Promise<void>)}
 */
export async function uploadFileToAzureFile(
  aborter: Aborter,
  filePath: string,
  fileURL: FileURL,
  options?: IUploadToAzureFileOptions
): Promise<void> {
  const size = fs.statSync(filePath).size;
  return uploadResetableStreamToAzureFile(
    aborter,
    (offset, count) =>
      fs.createReadStream(filePath, {
        autoClose: true,
        end: count ? offset + count - 1 : Infinity,
        start: offset
      }),
    size,
    fileURL,
    options
  );
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Accepts a Node.js Readable stream factory, and uploads in blocks to an Azure File.
 * The Readable stream factory must returns a Node.js Readable stream starting from the offset defined. The offset
 * is the offset in the Azure file to be uploaded.
 *
 * @export
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {(offset: number) => NodeJS.ReadableStream} streamFactory Returns a Node.js Readable stream starting
 *                                                                  from the offset defined
 * @param {number} size Size of the Azure file
 * @param {FileURL} fileURL FileURL
 * @param {IUploadToAzureFileOptions} [options]
 * @returns {(Promise<void>)}
 */
async function uploadResetableStreamToAzureFile(
  aborter: Aborter,
  streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream,
  size: number,
  fileURL: FileURL,
  options: IUploadToAzureFileOptions = {}
): Promise<void> {
  if (!options.rangeSize) {
    options.rangeSize = FILE_RANGE_MAX_SIZE_BYTES;
  }
  if (options.rangeSize < 0 || options.rangeSize > FILE_RANGE_MAX_SIZE_BYTES) {
    throw new RangeError(
      `options.rangeSize must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES}`
    );
  }

  if (!options.fileHTTPHeaders) {
    options.fileHTTPHeaders = {};
  }

  if (!options.parallelism) {
    options.parallelism = DEFAULT_HIGH_LEVEL_PARALLELISM;
  }
  if (options.parallelism < 0) {
    throw new RangeError(`options.parallelism cannot less than 0.`);
  }

  // Create the file
  await fileURL.create(aborter, size, {
    fileHTTPHeaders: options.fileHTTPHeaders,
    metadata: options.metadata
  });

  const numBlocks: number = Math.floor((size - 1) / options.rangeSize) + 1;
  let transferProgress: number = 0;
  const batch = new Batch(options.parallelism);

  for (let i = 0; i < numBlocks; i++) {
    batch.addOperation(
      async (): Promise<any> => {
        const start = options.rangeSize! * i;
        const end = i === numBlocks - 1 ? size : start + options.rangeSize!;
        const contentLength = end - start;
        await fileURL.uploadRange(
          aborter,
          () => streamFactory(start, contentLength),
          start,
          contentLength
        );
        // Update progress after block is successfully uploaded to server, in case of block trying
        transferProgress += contentLength;
        if (options.progress) {
          options.progress({ loadedBytes: transferProgress });
        }
      }
    );
  }
  return batch.do();
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Downloads an Azure file in parallel to a buffer.
 * Offset and count are optional, pass 0 for both to download the entire file.
 *
 * @export
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {Buffer} buffer Buffer to be fill, must have length larger than count
 * @param {FileURL} fileURL A FileURL object
 * @param {number} offset From which position of the Azure File to download
 * @param {number} [count] How much data to be downloaded. Will download to the end when passing undefined
 * @param {IDownloadFromAzureFileOptions} [options]
 * @returns {Promise<void>}
 */
export async function downloadAzureFileToBuffer(
  aborter: Aborter,
  buffer: Buffer,
  fileURL: FileURL,
  offset: number,
  count?: number,
  options: IDownloadFromAzureFileOptions = {}
): Promise<void> {
  if (!options.rangeSize) {
    options.rangeSize = FILE_RANGE_MAX_SIZE_BYTES;
  }
  if (options.rangeSize < 0) {
    throw new RangeError("rangeSize option must be > 0");
  }

  if (offset < 0) {
    throw new RangeError("offset option must be >= 0");
  }

  if (count && count <= 0) {
    throw new RangeError("count option must be > 0");
  }

  if (!options.parallelism) {
    options.parallelism = DEFAULT_HIGH_LEVEL_PARALLELISM;
  }
  if (options.parallelism < 0) {
    throw new RangeError(`options.parallelism cannot less than 0.`);
  }

  // Customer doesn't specify length, get it
  if (!count) {
    const response = await fileURL.getProperties(aborter);
    count = response.contentLength! - offset;
    if (count < 0) {
      throw new RangeError(
        `offset ${offset} shouldn't be larger than file size ${response.contentLength!}`
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
  for (let off = offset; off < offset + count; off = off + options.rangeSize) {
    batch.addOperation(async () => {
      const chunkEnd =
        off + options.rangeSize! < count! ? off + options.rangeSize! : count!;
      const response = await fileURL.download(
        aborter,
        off,
        chunkEnd - off + 1,
        {
          maxRetryRequests: options.maxRetryRequestsPerRange
        }
      );
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
 * Option interface for uploadStreamToAzureFile.
 *
 * @export
 * @interface IUploadStreamToAzureFileOptions
 */
export interface IUploadStreamToAzureFileOptions {
  /**
   * Azure File HTTP Headers.
   *
   * @type {IFileHTTPHeaders}
   * @memberof IUploadStreamToAzureFileOptions
   */
  fileHTTPHeaders?: IFileHTTPHeaders;

  /**
   * Metadata of the Azure file.
   *
   * @type {IMetadata}
   * @memberof IUploadStreamToAzureFileOptions
   */
  metadata?: IMetadata;

  /**
   * Progress updater.
   *
   * @memberof IUploadStreamToAzureFileOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Uploads a Node.js Readable stream into an Azure file.
 * This method will try to create an Azure, then starts uploading chunk by chunk.
 * Size of chunk is defined by `bufferSize` parameter.
 * Please make sure potential size of stream doesn't exceed file size.
 *
 * PERFORMANCE IMPROVEMENT TIPS:
 * * Input stream highWaterMark is better to set a same value with bufferSize
 *   parameter, which will avoid Buffer.concat() operations.
 *
 * @export
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {Readable} stream Node.js Readable stream. Must be less or equal than file size.
 * @param {number} size Size of file to be created. Maxium size allowed is 1TB.
 *                      If this value is larger than stream size, there will be empty bytes in file tail.
 * @param {FileURL} fileURL A FileURL instance
 * @param {number} bufferSize Size of every buffer allocated in bytes, also the chunk/range size during
 *                            the uploaded file. Size must be > 0 and <= 4 * 1024 * 1024 (4MB)
 * @param {number} maxBuffers Max buffers will allocate during uploading, positive correlation
 *                            with max uploading concurrency
 * @param {IUploadStreamToAzureFileOptions} [options]
 * @returns {Promise<void>}
 */
export async function uploadStreamToAzureFile(
  aborter: Aborter,
  stream: Readable,
  size: number,
  fileURL: FileURL,
  bufferSize: number,
  maxBuffers: number,
  options: IUploadStreamToAzureFileOptions = {}
): Promise<void> {
  if (!options.fileHTTPHeaders) {
    options.fileHTTPHeaders = {};
  }

  if (bufferSize <= 0 || bufferSize > FILE_RANGE_MAX_SIZE_BYTES) {
    throw new RangeError(
      `bufferSize must be > 0 and <= ${FILE_RANGE_MAX_SIZE_BYTES}`
    );
  }

  if (maxBuffers < 0) {
    throw new RangeError(`maxBuffers must be > 0.`);
  }

  // Create the file
  await fileURL.create(aborter, size, {
    fileHTTPHeaders: options.fileHTTPHeaders,
    metadata: options.metadata
  });

  let transferProgress: number = 0;
  const scheduler = new BufferScheduler(
    stream,
    bufferSize,
    maxBuffers,
    async (buffer: Buffer, offset?: number) => {
      if (transferProgress + buffer.length > size) {
        throw new RangeError(
          `Stream size is larger than file size ${size} bytes, uploading failed. ` +
            `Please make sure stream length is less or equal than file size.`
        );
      }

      await fileURL.uploadRange(aborter, buffer, offset!, buffer.length);

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
  return scheduler.do();
}
