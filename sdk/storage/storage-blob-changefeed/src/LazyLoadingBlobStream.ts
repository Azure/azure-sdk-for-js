// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Readable, ReadableOptions } from "stream";
import { BlobClient, CommonOptions } from "@azure/storage-blob";
import { AbortSignalLike } from "@azure/core-http";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@opentelemetry/api";

/**
 * Options to configure the LazyLoadingBlobStream.
 */
export interface LazyLoadingBlobStreamOptions extends ReadableOptions, CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof LazyLoadingBlobStreamOptions
   */
  abortSignal?: AbortSignalLike;
}

interface LazyLoadingBlobStreamDownloadBlockOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof LazyLoadingBlobStreamDownloadBlockOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * This class generates a readable stream from a blobClient's data.
 *
 * @export
 * @class LazyLoadingBlobStream
 */
export class LazyLoadingBlobStream extends Readable {
  /**
   * The index of buffer to be read in the array of buffers.
   *
   * @private
   * @type {BlobClient}
   * @memberof LazyLoadingBlobStream
   */
  private readonly _blobClient: BlobClient;

  /**
   * The offset within the blob of the next block we will download.
   *
   * @private
   * @type {number}
   * @memberof LazyLoadingBlobStream
   */
  private _offset: number;

  private readonly _blockSize: number;

  private _lastDownloadBytes: number;

  private _lastDownloadData?: Buffer;

  private _blobLength: number;

  private _options?: LazyLoadingBlobStreamOptions;

  /**
   * Creates an instance of LazyLoadingBlobStream.
   *
   * @param {number} byteLength The total length of data contained in the buffers
   * @memberof LazyLoadingBlobStream
   */
  constructor(
    blobClient: BlobClient,
    offset: number,
    blockSize: number,
    options?: LazyLoadingBlobStreamOptions
  ) {
    super(options);
    this._blobClient = blobClient;
    this._offset = offset;
    this._blockSize = blockSize;
    this._lastDownloadBytes = -1;
    this._blobLength = -1;
    this._options = options;
  }

  private async downloadBlock(options: LazyLoadingBlobStreamDownloadBlockOptions = {}) {
    const { span, spanOptions } = createSpan(
      "LazyLoadingBlobStream-downloadBlock",
      options.tracingOptions
    );
    try {
      const properties = await this._blobClient.getProperties({
        abortSignal: options.abortSignal,
        tracingOptions: { ...options.tracingOptions, spanOptions }
      });
      this._blobLength = properties.contentLength!;

      this._lastDownloadBytes = Math.min(this._blockSize, this._blobLength - this._offset);
      if (this._lastDownloadBytes === 0) {
        this._lastDownloadData = undefined;
        return;
      }

      this._lastDownloadData = await this._blobClient.downloadToBuffer(
        this._offset,
        this._lastDownloadBytes,
        {
          abortSignal: options.abortSignal,
          tracingOptions: { ...options.tracingOptions, spanOptions }
        }
      );
      this._offset += this._lastDownloadBytes;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Internal _read() that will be called when the stream wants to pull more data in.
   *
   * @param {number} size Optional. The size of data to be read
   * @memberof LazyLoadingBlobStream
   */
  public async _read(size?: number) {
    const { span, spanOptions } = createSpan(
      "LazyLoadingBlobStream-_read",
      this._options?.tracingOptions
    );
    try {
      if (!size) {
        size = this.readableHighWaterMark;
      }

      let count = 0;
      let chunkSize = 0;
      do {
        if (this._lastDownloadData === undefined || this._lastDownloadData?.byteLength === 0) {
          await this.downloadBlock({
            abortSignal: this._options?.abortSignal,
            tracingOptions: { ...this._options?.tracingOptions, spanOptions }
          });
        }
        if (this._lastDownloadData?.byteLength) {
          chunkSize = Math.min(size - count, this._lastDownloadData?.byteLength);
          this.push(this._lastDownloadData.slice(0, chunkSize));
          this._lastDownloadData = this._lastDownloadData.slice(chunkSize);
          count += chunkSize;
        } else {
          chunkSize = 0;
        }
      } while (chunkSize > 0 && count < size);

      if (count < size) {
        this.push(null);
      }
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      this.emit("error", e);
    } finally {
      span.end();
    }
  }
}
