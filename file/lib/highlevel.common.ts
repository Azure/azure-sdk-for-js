import { HttpResponse, TransferProgressEvent } from "ms-rest-js";

import * as Models from "./generated/models";
import { IBlobAccessConditions } from "./models";

/**
 * Option interface for uploadFileToBlockBlob and uploadSeekableStreamToBlockBlob.
 *
 * @export
 * @interface IUploadToBlockBlobOptions
 */
export interface IUploadToBlockBlobOptions {
  /**
   * Destination block blob size.
   *
   * @type {number}
   * @memberof IUploadToBlockBlobOptions
   */
  blockSize?: number;

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
