import { HttpResponse, TransferProgressEvent } from "@azure/ms-rest-js";

import { Aborter } from "./Aborter";
import * as Models from "./generated/lib/models";
import { BlobAccessConditions } from "./models";

/**
 * Option interface for uploadFileToBlockBlob and uploadSeekableStreamToBlockBlob.
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
 * Type for uploadFileToBlockBlob, uploadStreamToBlockBlob and uploadBrowserDateToBlockBlob.
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
 * Option interface for DownloadBlockBlobToBuffer.
 *
 * @export
 * @interface DownloadFromBlobOptions
 */
export interface DownloadFromBlobOptions {
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
   * blockSize is the data every request trying to download.
   * Must be >= 0, if set to 0 or undefined, blockSize will automatically calculated according
   * to the blob size.
   *
   * @type {number}
   * @memberof DownloadFromBlobOptions
   */
  blockSize?: number;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original block download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileClient.download() request will be made
   * from the broken point, until the requested block has been successfully downloaded or
   * maxRetryRequestsPerBlock is reached.
   *
   * Default value is 5, please set a larger value when in poor network.
   *
   * @type {number}
   * @memberof DownloadFromAzureFileOptions
   */
  maxRetryRequestsPerBlock?: number;

  /**
   * Progress updater.
   *
   * @memberof DownloadFromBlobOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Access conditions headers.
   *
   * @type {BlobAccessConditions}
   * @memberof DownloadFromBlobOptions
   */
  blobAccessConditions?: BlobAccessConditions;

  /**
   * Concurrency of parallel download.
   *
   * @type {number}
   * @memberof DownloadFromBlobOptions
   */
  parallelism?: number;
}
