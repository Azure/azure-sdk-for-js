import { TransferProgressEvent } from "ms-rest-js";

import { IFileHTTPHeaders, IMetadata } from "./models";

/**
 * Option interface for uploadFileToAzureFile and uploadSeekableStreamToAzureFile.
 *
 * @export
 * @interface IUploadToAzureFileOptions
 */
export interface IUploadToAzureFileOptions {
  /**
   * RangeSize specifies the range size to use in each parallel upload,
   * the default (and maximum size) is FILE_RANGE_MAX_SIZE_BYTES.
   *
   * @type {number}
   * @memberof IUploadToAzureFileOptions
   */
  rangeSize?: number;

  /**
   * Progress updater.
   *
   * @memberof IUploadToAzureFileOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * File HTTP Headers.
   *
   * @type {IFileHTTPHeaders}
   * @memberof IUploadToAzureFileOptions
   */
  fileHTTPHeaders?: IFileHTTPHeaders;

  /**
   * Metadata of an Azure file.
   *
   * @type {IMetadata}
   * @memberof IUploadToAzureFileOptions
   */
  metadata?: IMetadata;

  /**
   * Parallelism indicates the maximum number of ranges to upload in parallel.
   * If not provided, 5 parallelism will be used by default.
   *
   * @type {number}
   * @memberof IUploadToAzureFileOptions
   */
  parallelism?: number;
}

/**
 * Option interface for DownloadAzurefileToBuffer.
 *
 * @export
 * @interface IDownloadFromAzureFileOptions
 */
export interface IDownloadFromAzureFileOptions {
  /**
   * When downloading Azure files, download method will try to split large file into small ranges.
   * Every small range will be downloaded via a separte request.
   * This option defines size data every small request trying to download.
   * Must be > 0, will use the default value if undefined,
   *
   * @type {number}
   * @memberof IDownloadFromAzureFileOptions
   */
  rangeSize?: number;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original range download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileURL.download() request will be made
   * from the broken point, until the requested range has been successfully downloaded or
   * maxRetryRequestsPerRange is reached.
   *
   * Default value is 5, please set a larger value when in poor network.
   *
   * @type {number}
   * @memberof IDownloadFromAzureFileOptions
   */
  maxRetryRequestsPerRange?: number;

  /**
   * Progress updater.
   *
   * @memberof IDownloadFromAzureFileOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Parallelism indicates the maximum number of ranges to download in parallel.
   * If not provided, 5 parallelism will be used by default.
   *
   * @type {number}
   * @memberof IDownloadFromAzureFileOptions
   */
  parallelism?: number;
}
