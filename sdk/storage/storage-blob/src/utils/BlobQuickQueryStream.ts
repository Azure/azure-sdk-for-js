// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Readable } from "stream";

import { AbortError, AbortSignal, AbortSignalLike } from "@azure/abort-controller";
import { TransferProgressEvent } from "@azure/core-http";

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

const ABORT_ERROR = new AbortError("The operation was aborted.");

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js BlobQuickQueryStream will internally parse avor data stream for blob query.
 *
 * @class BlobQuickQueryStream
 * @extends {Readable}
 */
export class BlobQuickQueryStream extends Readable {
  private aborter: AbortSignalLike;
  private source: NodeJS.ReadableStream;
  private avroReader: AvroReader;
  private avroIter: AsyncIterableIterator<Object | null>;
  private onProgress?: (progress: TransferProgressEvent) => void;
  private onError?: (error: BlobQueryError) => void;
  private abortHandler = () => {
    // Workaround before avor reader doesn't support aborter
    this.source.pause();
    this.source.removeAllListeners();
    // TODO: Avor reader supports aborter
    this.emit("error", ABORT_ERROR);
  };

  /**
   * Creates an instance of BlobQuickQueryStream.
   *
   * @param {NodeJS.ReadableStream} source The current ReadableStream returned from getter
   * @param {BlobQuickQueryStreamOptions} [options={}]
   * @memberof BlobQuickQueryStream
   */
  public constructor(source: NodeJS.ReadableStream, options: BlobQuickQueryStreamOptions = {}) {
    super();
    this.aborter = options.abortSignal || AbortSignal.none;
    this.source = source;
    this.onProgress = options.onProgress;
    this.onError = options.onError;
    this.avroReader = new AvroReader(new AvroReadableFromStream(this.source));
    this.avroIter = this.avroReader.parseObjects();

    this.aborter.addEventListener("abort", this.abortHandler);
  }

  public _read() {
    if (!this.aborter.aborted) {
      this.readInternal().catch((err) => {
        this.emit("error", err);
      });
    }
  }

  private async readInternal() {
    for await (const obj of this.avroIter) {
      if (this.aborter.aborted) {
        break;
      }

      const schema = (obj as any).$schema;
      if (typeof schema !== "string") {
        throw Error("Missing schema in avor record.");
      }

      let exit = false;
      switch (schema) {
        case "com.microsoft.azure.storage.queryBlobContents.resultData":
          const data = (obj as any).data;
          if (data instanceof Uint8Array === false) {
            throw Error("Invalid data in avor result record.");
          }
          if (!this.push(Buffer.from(data))) {
            exit = true;
          }
          break;
        case "com.microsoft.azure.storage.queryBlobContents.progress":
          const bytesScanned = (obj as any).bytesScanned;
          if (typeof bytesScanned !== "number") {
            throw Error("Invalid bytesScanned in avor progress record.");
          }
          if (this.onProgress) {
            this.onProgress({ loadedBytes: bytesScanned });
          }
          break;
        case "com.microsoft.azure.storage.queryBlobContents.end":
          if (this.onProgress) {
            const totalBytes = (obj as any).totalBytes;
            if (typeof totalBytes !== "number") {
              throw Error("Invalid totalBytes in avor end record.");
            }
            this.onProgress({ loadedBytes: totalBytes });
          }
          this.push(null);
          break;
        case "com.microsoft.azure.storage.queryBlobContents.error":
          if (this.onError) {
            const fatal = (obj as any).fatal;
            if (typeof fatal !== "boolean") {
              throw Error("Invalid fatal in avor error record.");
            }
            const name = (obj as any).name;
            if (typeof name !== "string") {
              throw Error("Invalid name in avor error record.");
            }
            const description = (obj as any).description;
            if (typeof description !== "string") {
              throw Error("Invalid description in avor error record.");
            }
            const position = (obj as any).position;
            if (typeof position !== "number") {
              throw Error("Invalid position in avor error record.");
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
          throw Error(`Unknown schema ${schema} in avor progress record.`);
      }

      if (exit) {
        break;
      }
    }
  }
}
