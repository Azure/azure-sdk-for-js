// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { TransferProgressEvent } from "@azure/ms-rest-js";

import { FileHTTPHeaders, Metadata } from "./models";
import { Aborter } from "./Aborter";

/**
 * Option interface for FileClient.uploadFile() and FileClient.uploadSeekableStream().
 *
 * @export
 * @interface UploadToAzureFileOptions
 */
export interface UploadToAzureFileOptions {
  abortSignal?: Aborter;
  /**
   * RangeSize specifies the range size to use in each parallel upload,
   * the default (and maximum size) is FILE_RANGE_MAX_SIZE_BYTES.
   *
   * @type {number}
   * @memberof UploadToAzureFileOptions
   */
  rangeSize?: number;

  /**
   * Progress updater.
   *
   * @memberof UploadToAzureFileOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * File HTTP Headers.
   *
   * @type {FileHTTPHeaders}
   * @memberof UploadToAzureFileOptions
   */
  fileHTTPHeaders?: FileHTTPHeaders;

  /**
   * Metadata of an Azure file.
   *
   * @type {Metadata}
   * @memberof UploadToAzureFileOptions
   */
  metadata?: Metadata;

  /**
   * Parallelism indicates the maximum number of ranges to upload in parallel.
   * If not provided, 5 parallelism will be used by default.
   *
   * @type {number}
   * @memberof UploadToAzureFileOptions
   */
  parallelism?: number;
}

/**
 * Option interface for DownloadAzurefileToBuffer.
 *
 * @export
 * @interface DownloadFromAzureFileOptions
 */
export interface DownloadFromAzureFileOptions {
  abortSignal?: Aborter;
  /**
   * When downloading Azure files, download method will try to split large file into small ranges.
   * Every small range will be downloaded via a separte request.
   * This option defines size data every small request trying to download.
   * Must be > 0, will use the default value if undefined,
   *
   * @type {number}
   * @memberof DownloadFromAzureFileOptions
   */
  rangeSize?: number;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original range download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileClient.download() request will be made
   * from the broken point, until the requested range has been successfully downloaded or
   * maxRetryRequestsPerRange is reached.
   *
   * Default value is 5, please set a larger value when in poor network.
   *
   * @type {number}
   * @memberof DownloadFromAzureFileOptions
   */
  maxRetryRequestsPerRange?: number;

  /**
   * Progress updater.
   *
   * @memberof DownloadFromAzureFileOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Parallelism indicates the maximum number of ranges to download in parallel.
   * If not provided, 5 parallelism will be used by default.
   *
   * @type {number}
   * @memberof DownloadFromAzureFileOptions
   */
  parallelism?: number;
}
