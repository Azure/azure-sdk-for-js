// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
   * BlobClient to make download calls with.
   *
   * @private
   * @type {BlobClient}
   * @memberof LazyLoadingBlobStream
   */
  private readonly blobClient: BlobClient;

  /**
   * The offset within the blob of the next block we will download.
   *
   * @private
   * @type {number}
   * @memberof LazyLoadingBlobStream
   */
  private offset: number;

  private readonly blockSize: number;

  private lastDownloadBytes: number;

  private lastDownloadData?: Buffer;

  private blobLength: number;

  private options?: LazyLoadingBlobStreamOptions;

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
    this.blobClient = blobClient;
    this.offset = offset;
    this.blockSize = blockSize;
    this.lastDownloadBytes = -1;
    this.blobLength = -1;
    this.options = options;
  }

  private async downloadBlock(options: LazyLoadingBlobStreamDownloadBlockOptions = {}) {
    const { span, spanOptions } = createSpan(
      "LazyLoadingBlobStream-downloadBlock",
      options.tracingOptions
    );
    try {
      const properties = await this.blobClient.getProperties({
        abortSignal: options.abortSignal,
        tracingOptions: { ...options.tracingOptions, spanOptions }
      });
      this.blobLength = properties.contentLength!;

      this.lastDownloadBytes = Math.min(this.blockSize, this.blobLength - this.offset);
      if (this.lastDownloadBytes === 0) {
        this.lastDownloadData = undefined;
        return;
      }

      this.lastDownloadData = await this.blobClient.downloadToBuffer(
        this.offset,
        this.lastDownloadBytes,
        {
          abortSignal: options.abortSignal,
          tracingOptions: { ...options.tracingOptions, spanOptions }
        }
      );
      this.offset += this.lastDownloadBytes;
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
      "LazyLoadingBlobStream-read",
      this.options?.tracingOptions
    );

    try {
      if (!size) {
        size = this.readableHighWaterMark;
      }
      let count = 0;
      let chunkSize = 0;
      let chunksToPush = [];
      do {
        if (this.lastDownloadData === undefined || this.lastDownloadData?.byteLength === 0) {
          await this.downloadBlock({
            abortSignal: this.options?.abortSignal,
            tracingOptions: { ...this.options?.tracingOptions, spanOptions }
          });
        }
        if (this.lastDownloadData?.byteLength) {
          chunkSize = Math.min(size - count, this.lastDownloadData?.byteLength);
          chunksToPush.push(this.lastDownloadData.slice(0, chunkSize));
          this.lastDownloadData = this.lastDownloadData.slice(chunkSize);
          count += chunkSize;
        } else {
          chunkSize = 0;
        }
      } while (chunkSize > 0 && count < size);

      this.push(Buffer.concat(chunksToPush));

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
