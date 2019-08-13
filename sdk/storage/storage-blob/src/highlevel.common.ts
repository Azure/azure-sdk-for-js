import { HttpResponse, TransferProgressEvent } from "@azure/ms-rest-js";

import * as Models from "./generated/src/models";
import { IBlobAccessConditions } from "./models";

/**
 * Option interface for uploadFileToBlockBlob and uploadSeekableStreamToBlockBlob.
 *
 * @export
 * @interface IUploadToBlockBlobOptions
 */
export interface IUploadToBlockBlobOptions {
  /**
   * Destination block blob size in bytes.
   *
   * @type {number}
   * @memberof IUploadToBlockBlobOptions
   */
  blockSize?: number;

  /**
   * Blob size threshold in bytes to start concurrency uploading.
   * Default value is 256MB, blob size less than this option will
   * be uploaded via one I/O operation without concurrency.
   * You can customize a value less equal than the default value.
   *
   * @type {number}
   * @memberof IUploadToBlockBlobOptions
   */
  maxSingleShotSize?: number;

  /**
   * Progress updater.
   *
   * @memberof IUploadToBlockBlobOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Blob HTTP Headers.
   *
   * @type {IBlobHTTPHeaders}
   * @memberof IUploadToBlockBlobOptions
   */
  blobHTTPHeaders?: Models.BlobHTTPHeaders;

  /**
   * Metadata of block blob.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof IUploadToBlockBlobOptions
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Access conditions headers.
   *
   * @type {IBlobAccessConditions}
   * @memberof IUploadToBlockBlobOptions
   */
  blobAccessConditions?: IBlobAccessConditions;

  /**
   * Concurrency of parallel uploading. Must be >= 0.
   *
   * @type {number}
   * @memberof IUploadToBlockBlobOptions
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
 * @interface IDownloadFromBlobOptions
 */
export interface IDownloadFromBlobOptions {
  /**
   * blockSize is the data every request trying to download.
   * Must be >= 0, if set to 0 or undefined, blockSize will automatically calculated according
   * to the blob size.
   *
   * @type {number}
   * @memberof IDownloadFromBlobOptions
   */
  blockSize?: number;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original block download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileURL.download() request will be made
   * from the broken point, until the requested block has been successfully downloaded or
   * maxRetryRequestsPerBlock is reached.
   *
   * Default value is 5, please set a larger value when in poor network.
   *
   * @type {number}
   * @memberof IDownloadFromAzureFileOptions
   */
  maxRetryRequestsPerBlock?: number;

  /**
   * Progress updater.
   *
   * @memberof IDownloadFromBlobOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Access conditions headers.
   *
   * @type {IBlobAccessConditions}
   * @memberof IDownloadFromBlobOptions
   */
  blobAccessConditions?: IBlobAccessConditions;

  /**
   * Concurrency of parallel download.
   *
   * @type {number}
   * @memberof IDownloadFromBlobOptions
   */
  parallelism?: number;
}
