// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { AbortError } from "@azure/abort-controller";
import { getErrorMessage } from "@azure/core-util";
import { EventEmitter } from "events";
import { logger } from "../log.js";

/**
 * OutgoingHandler is an async function triggered by BufferScheduler.
 */
export declare type OutgoingHandler = (buffer: Buffer, offset?: number) => Promise<any>;

/**
 * This class accepts a Node.js Readable stream as input, and keeps reading data
 * from the stream into the internal buffer structure, until it reaches maxBuffers.
 * Every available buffer will try to trigger outgoingHandler.
 *
 * The internal buffer structure includes an incoming buffer array, and a outgoing
 * buffer array. The incoming buffer array includes the "empty" buffers can be filled
 * with new incoming data. The outgoing array includes the filled buffers to be
 * handled by outgoingHandler. Every above buffer size is defined by parameter bufferSize.
 *
 * NUM_OF_ALL_BUFFERS = BUFFERS_IN_INCOMING + BUFFERS_IN_OUTGOING + BUFFERS_UNDER_HANDLING
 *
 * NUM_OF_ALL_BUFFERS lesser than or equal to maxBuffers
 *
 * PERFORMANCE IMPROVEMENT TIPS:
 * 1. Input stream highWaterMark is better to set a same value with bufferSize
 *    parameter, which will avoid Buffer.concat() operations.
 * 2. Concurrency should set a smaller value than maxBuffers, which is helpful to
 *    reduce the possibility when a outgoing handler waits for the stream data.
 *    in this situation, outgoing handlers are blocked.
 *    Outgoing queue shouldn't be empty.
 */
export class BufferScheduler {
  /**
   * Size of buffers in incoming and outgoing queues. This class will try to align
   * data read from Readable stream into buffer chunks with bufferSize defined.
   */
  private readonly bufferSize: number;

  /**
   * How many buffers can be created or maintained.
   */
  private readonly maxBuffers: number;

  /**
   * A Node.js Readable stream.
   */
  private readonly readable: NodeJS.ReadableStream;

  /**
   * OutgoingHandler is an async function triggered by BufferScheduler when there
   * are available buffers in outgoing array.
   */
  private readonly outgoingHandler: OutgoingHandler;

  /**
   * An internal event emitter.
   */
  private readonly emitter: EventEmitter = new EventEmitter();

  /**
   * Concurrency of executing outgoingHandlers. (0 lesser than concurrency lesser than or equal to maxBuffers)
   */
  private readonly concurrency: number;

  /**
   * An internal offset marker to track data offset in bytes of next outgoingHandler.
   */
  private offset: number = 0;

  /**
   * An internal marker to track whether stream is end.
   */
  private isStreamEnd: boolean = false;

  /**
   * An internal marker to track whether stream or outgoingHandler returns error.
   */
  private isError: boolean = false;

  /**
   * How many handlers are executing.
   */
  private executingOutgoingHandlers: number = 0;

  /**
   * Encoding of the input Readable stream which has string data type instead of Buffer.
   */
  private encoding?: BufferEncoding;

  /**
   * How many buffers have been allocated.
   */
  private numBuffers: number = 0;

  /**
   * Because this class doesn't know how much data every time stream pops, which
   * is defined by highWaterMarker of the stream. So BufferScheduler will cache
   * data received from the stream, when data in unresolvedDataArray exceeds the
   * blockSize defined, it will try to concat a blockSize of buffer, fill into available
   * buffers from incoming and push to outgoing array.
   */
  private unresolvedDataArray: Buffer[] = [];

  /**
   * How much data consisted in unresolvedDataArray.
   */
  private unresolvedLength: number = 0;

  /**
   * The array includes all the available buffers can be used to fill data from stream.
   */
  private incoming: Buffer[] = [];

  /**
   * The array (queue) includes all the buffers filled from stream data.
   */
  private outgoing: Buffer[] = [];

  /**
   * Creates an instance of BufferScheduler.
   *
   * @param readable - A Node.js Readable stream
   * @param bufferSize - Buffer size of every maintained buffer
   * @param maxBuffers - How many buffers can be allocated
   * @param outgoingHandler - An async function scheduled to be
   *                                          triggered when a buffer fully filled
   *                                          with stream data
   * @param concurrency - Concurrency of executing outgoingHandlers (greater than 0)
   * @param encoding - [Optional] Encoding of Readable stream when it's a string stream
   */
  constructor(
    readable: NodeJS.ReadableStream,
    bufferSize: number,
    maxBuffers: number,
    outgoingHandler: OutgoingHandler,
    concurrency: number,
    encoding?: BufferEncoding,
  ) {
    if (bufferSize <= 0) {
      throw new RangeError(`bufferSize must be larger than 0, current is ${bufferSize}`);
    }

    if (maxBuffers <= 0) {
      throw new RangeError(`maxBuffers must be larger than 0, current is ${maxBuffers}`);
    }

    if (concurrency <= 0) {
      throw new RangeError(`concurrency must be larger than 0, current is ${concurrency}`);
    }

    this.bufferSize = bufferSize;
    this.maxBuffers = maxBuffers;
    this.readable = readable;
    this.outgoingHandler = outgoingHandler;
    this.concurrency = concurrency;
    this.encoding = encoding;
  }

  /**
   * Start the scheduler, will return error when stream of any of the outgoingHandlers
   * returns error.
   *
   * @param options - `abortSignal`: when it's aborted, `do()` rejects with an `AbortError` and
   *                  pauses the stream. No more data is handed to the outgoing handler after
   *                  `do()` rejects. Pass the same signal to the requests the handler sends.
   *                  If the signal is already aborted, `do()` rejects without reading the stream
   *                  and leaves a logging `error` listener on it, so an error the stream raises
   *                  later doesn't end the process.
   */
  public async do(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    const { abortSignal } = options;
    if (abortSignal?.aborted) {
      // The stream isn't read, but it can still emit "error" (a file stream does when its file
      // can't be opened), and an "error" event with no listener ends the process.
      this.readable.on("error", logIgnoredStreamError);
      throw new AbortError("The operation was aborted.");
    }
    const onAbort = (): void => {
      this.emitter.emit("error", new AbortError("The operation was aborted."));
    };
    abortSignal?.addEventListener("abort", onAbort);

    return new Promise<void>((resolve, reject) => {
      this.readable.on("data", (data) => {
        // Once do() has rejected, leave the stream to the caller, who may drain or reuse it.
        if (this.isError) {
          return;
        }
        data = typeof data === "string" ? Buffer.from(data, this.encoding) : data;
        this.appendUnresolvedData(data);

        if (!this.resolveData()) {
          this.readable.pause();
        }
      });

      this.readable.on("error", (err) => {
        this.emitter.emit("error", err);
      });

      this.readable.on("end", () => {
        this.isStreamEnd = true;
        this.emitter.emit("checkEnd");
      });

      this.emitter.on("error", (err) => {
        // Only the first error rejects and pauses: later ones come from handlers that were still
        // running, and the stream already belongs to the caller again.
        if (this.isError) {
          return;
        }
        this.isError = true;
        this.readable.pause();
        reject(err);
      });

      this.emitter.on("checkEnd", () => {
        // Handlers still running when do() rejected emit "checkEnd" when they finish;
        // queued buffers must not be uploaded then.
        if (this.isError) {
          return;
        }

        if (this.outgoing.length > 0) {
          this.triggerOutgoingHandlers();
          return;
        }

        if (this.isStreamEnd && this.executingOutgoingHandlers === 0) {
          if (this.unresolvedLength > 0 && this.unresolvedLength < this.bufferSize) {
            this.outgoingHandler(this.shiftBufferFromUnresolvedDataArray(), this.offset)
              .then(resolve)
              .catch(reject);
          } else if (this.unresolvedLength >= this.bufferSize) {
            return;
          } else {
            resolve();
          }
        }
      });
    }).finally(() => abortSignal?.removeEventListener("abort", onAbort));
  }

  /**
   * Insert a new data into unresolved array.
   *
   * @param data -
   */
  private appendUnresolvedData(data: Buffer): void {
    this.unresolvedDataArray.push(data);
    this.unresolvedLength += data.length;
  }

  /**
   * Try to shift a buffer with size in blockSize. The buffer returned may be less
   * than blockSize when data in unresolvedDataArray is less than bufferSize.
   *
   */
  private shiftBufferFromUnresolvedDataArray(): Buffer {
    if (this.unresolvedLength >= this.bufferSize) {
      if (this.bufferSize === this.unresolvedDataArray[0].length) {
        this.unresolvedLength -= this.bufferSize;
        return this.unresolvedDataArray.shift()!;
      }

      // Lazy concat because Buffer.concat highly drops performance
      let merged = Buffer.concat(this.unresolvedDataArray, this.unresolvedLength);
      const buffer = merged.slice(0, this.bufferSize);
      merged = merged.slice(this.bufferSize);
      this.unresolvedDataArray = [merged];
      this.unresolvedLength -= buffer.length;
      return buffer;
    } else if (this.unresolvedLength > 0) {
      const merged = Buffer.concat(this.unresolvedDataArray, this.unresolvedLength);
      this.unresolvedDataArray = [];
      this.unresolvedLength = 0;
      return merged;
    } else {
      return Buffer.allocUnsafe(0);
    }
  }

  /**
   * Resolve data in unresolvedDataArray. For every buffer with size in blockSize
   * shifted, it will try to get (or allocate a buffer) from incoming, and fill it,
   * then push it into outgoing to be handled by outgoing handler.
   *
   * Return false when available buffers in incoming are not enough, else true.
   *
   * @returns Return false when buffers in incoming are not enough, else true.
   */
  private resolveData(): boolean {
    // A handler can abort, or throw before it returns its promise, while this loop hands out
    // buffers: stop handing them out then.
    while (!this.isError && this.unresolvedLength >= this.bufferSize) {
      let buffer: Buffer;

      if (this.incoming.length > 0) {
        buffer = this.incoming.shift()!;
      } else {
        if (this.numBuffers < this.maxBuffers) {
          buffer = Buffer.allocUnsafe(this.bufferSize);
          this.numBuffers++;
        } else {
          // No available buffer, wait for buffer returned
          return false;
        }
      }

      buffer.fill(this.shiftBufferFromUnresolvedDataArray());
      this.outgoing.push(buffer);
      this.triggerOutgoingHandlers();
    }
    return true;
  }

  /**
   * Try to trigger a outgoing handler for every buffer in outgoing. Stop when
   * concurrency reaches.
   */
  private async triggerOutgoingHandlers(): Promise<void> {
    let buffer: Buffer | undefined;
    do {
      if (this.executingOutgoingHandlers >= this.concurrency) {
        return;
      }

      buffer = this.outgoing.shift();
      if (buffer) {
        this.triggerOutgoingHandler(buffer);
      }
    } while (buffer);
  }

  /**
   * Trigger a outgoing handler for a buffer shifted from outgoing.
   *
   * @param buffer -
   */
  private async triggerOutgoingHandler(buffer: Buffer): Promise<any> {
    const bufferLength = buffer.length;

    this.executingOutgoingHandlers++;
    this.offset += bufferLength;

    try {
      await this.outgoingHandler(buffer, this.offset - bufferLength);
    } catch (err: any) {
      this.emitter.emit("error", err);
      return;
    }

    this.executingOutgoingHandlers--;
    this.reuseBuffer(buffer);
    this.emitter.emit("checkEnd");
  }

  /**
   * Return buffer used by outgoing handler into incoming.
   *
   * @param buffer -
   */
  private reuseBuffer(buffer: Buffer): void {
    this.incoming.push(buffer);
    // resolveData() starts nothing after a failure, and an upload it starts can abort at once:
    // resume only if nothing failed.
    if (this.resolveData() && !this.isError && !this.isStreamEnd) {
      this.readable.resume();
    }
  }
}

function logIgnoredStreamError(error: unknown): void {
  logger.info(
    `BufferScheduler: the operation was aborted before the stream was read, and the stream then emitted an error: ${getErrorMessage(error)}`,
  );
}
