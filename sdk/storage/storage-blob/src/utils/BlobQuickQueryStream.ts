// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Readable } from "stream";

import { AbortSignalLike } from "@azure/abort-controller";
import { TransferProgressEvent } from "@azure/core-https";

import { AvroReadableFromStream, AvroReader } from "../../../storage-internal-avro/src";
import { BlobQueryError } from "../Clients";

export interface BlobQuickQueryStreamOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobQuickQueryStreamOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Read progress event handler
   *
   * @memberof BlobQuickQueryStreamOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Callback to receive error events during the query operaiton.
   *
   * @memberof BlockBlobQueryOptions
   */
  onError?: (error: BlobQueryError) => void;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js BlobQuickQueryStream will internally parse avro data stream for blob query.
 *
 * @class BlobQuickQueryStream
 * @extends {Readable}
 */
export class BlobQuickQueryStream extends Readable {
  private source: NodeJS.ReadableStream;
  private avroReader: AvroReader;
  private avroIter: AsyncIterableIterator<Object | null>;
  private avroPaused: boolean = true;
  private onProgress?: (progress: TransferProgressEvent) => void;
  private onError?: (error: BlobQueryError) => void;

  /**
   * Creates an instance of BlobQuickQueryStream.
   *
   * @param {NodeJS.ReadableStream} source The current ReadableStream returned from getter
   * @param {BlobQuickQueryStreamOptions} [options={}]
   * @memberof BlobQuickQueryStream
   */
  public constructor(source: NodeJS.ReadableStream, options: BlobQuickQueryStreamOptions = {}) {
    super();
    this.source = source;
    this.onProgress = options.onProgress;
    this.onError = options.onError;
    this.avroReader = new AvroReader(new AvroReadableFromStream(this.source));
    this.avroIter = this.avroReader.parseObjects({ abortSignal: options.abortSignal });
  }

  public _read() {
    if (this.avroPaused) {
      this.readInternal().catch((err) => {
        this.emit("error", err);
      });
    }
  }

  private async readInternal() {
    this.avroPaused = false;
    let avroNext;
    do {
      avroNext = await this.avroIter.next();
      if (avroNext.done) {
        break;
      }
      const obj = avroNext.value;
      const schema = (obj as any).$schema;
      if (typeof schema !== "string") {
        throw Error("Missing schema in avro record.");
      }

      switch (schema) {
        case "com.microsoft.azure.storage.queryBlobContents.resultData":
          const data = (obj as any).data;
          if (data instanceof Uint8Array === false) {
            throw Error("Invalid data in avro result record.");
          }
          if (!this.push(Buffer.from(data))) {
            this.avroPaused = true;
          }
          break;
        case "com.microsoft.azure.storage.queryBlobContents.progress":
          const bytesScanned = (obj as any).bytesScanned;
          if (typeof bytesScanned !== "number") {
            throw Error("Invalid bytesScanned in avro progress record.");
          }
          if (this.onProgress) {
            this.onProgress({ loadedBytes: bytesScanned });
          }
          break;
        case "com.microsoft.azure.storage.queryBlobContents.end":
          if (this.onProgress) {
            const totalBytes = (obj as any).totalBytes;
            if (typeof totalBytes !== "number") {
              throw Error("Invalid totalBytes in avro end record.");
            }
            this.onProgress({ loadedBytes: totalBytes });
          }
          this.push(null);
          break;
        case "com.microsoft.azure.storage.queryBlobContents.error":
          if (this.onError) {
            const fatal = (obj as any).fatal;
            if (typeof fatal !== "boolean") {
              throw Error("Invalid fatal in avro error record.");
            }
            const name = (obj as any).name;
            if (typeof name !== "string") {
              throw Error("Invalid name in avro error record.");
            }
            const description = (obj as any).description;
            if (typeof description !== "string") {
              throw Error("Invalid description in avro error record.");
            }
            const position = (obj as any).position;
            if (typeof position !== "number") {
              throw Error("Invalid position in avro error record.");
            }
            this.onError({
              position,
              name,
              isFatal: fatal,
              description
            });
          }
          break;
        default:
          throw Error(`Unknown schema ${schema} in avro progress record.`);
      }
    } while (!avroNext.done && !this.avroPaused);
  }
}
