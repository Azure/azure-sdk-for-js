import { Aborter } from "./Aborter";
import { FileURL } from "./FileURL";
import { IUploadToAzureFileOptions } from "./highlevel.common";
import { Batch } from "./utils/Batch";
import { FILE_RANGE_MAX_SIZE_BYTES, HIGH_LEVEL_DEFAULT_PARALLELISM } from "./utils/constants";

/**
 * ONLY AVAILABLE IN BROWSERS.
 *
 * Uploads a browser Blob/File/ArrayBuffer/ArrayBufferView object to an Azure File.
 *
 * @export
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {Blob | ArrayBuffer | ArrayBufferView} browserData Blob, File, ArrayBuffer or ArrayBufferView
 * @param {FileURL} fileURL
 * @param {IUploadToAzureFileOptions} [options]
 * @returns {Promise<void>}
 */
export async function uploadBrowserDataToAzureFile(
  aborter: Aborter,
  browserData: Blob | ArrayBuffer | ArrayBufferView,
  fileURL: FileURL,
  options?: IUploadToAzureFileOptions
): Promise<void> {
  const browserBlob = new Blob([browserData]);
  return UploadSeekableBlobToAzureFile(
    aborter,
    (offset: number, size: number): Blob => {
      return browserBlob.slice(offset, offset + size);
    },
    browserBlob.size,
    fileURL,
    options
  );
}

/**
 * ONLY AVAILABLE IN BROWSERS.
 *
 * Uploads a browser Blob object to an Azure file. Requires a blobFactory as the data source,
 * which need to return a Blob object with the offset and size provided.
 *
 * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
 *                          goto documents of Aborter for more examples about request cancellation
 * @param {(offset: number, size: number) => Blob} blobFactory
 * @param {number} size
 * @param {FileURL} fileURL
 * @param {IUploadToAzureFileOptions} [options]
 * @returns {Promise<void>}
 */
async function UploadSeekableBlobToAzureFile(
  aborter: Aborter,
  blobFactory: (offset: number, size: number) => Blob,
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
    options.parallelism = HIGH_LEVEL_DEFAULT_PARALLELISM;
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
          blobFactory(start, contentLength),
          start,
          contentLength
        );
        // Update progress after block is successfully uploaded to server, in case of block trying
        // TODO: Hook with convenience layer progress event in finer level
        transferProgress += contentLength;
        if (options.progress) {
          options.progress({ loadedBytes: transferProgress });
        }
      }
    );
  }
  return batch.do();
}
