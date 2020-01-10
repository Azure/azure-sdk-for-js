// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventEmitter } from "events";
import { Readable } from "stream";

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
 * NUM_OF_ALL_BUFFERS <= maxBuffers
 *
 * PERFORMANCE IMPROVEMENT TIPS:
 * 1. Input stream highWaterMark is better to set a same value with bufferSize
 *    parameter, which will avoid Buffer.concat() operations.
 * 2. concurrency should set a smaller value than maxBuffers, which is helpful to
 *    reduce the possibility when a outgoing handler waits for the stream data.
 *    in this situation, outgoing handlers are blocked.
 *    Outgoing queue shouldn't be empty.
 * @export
 * @class BufferScheduler
 */
export class BufferScheduler {
  /**
   * Size of buffers in incoming and outgoing queues. This class will try to align
   * data read from Readable stream into buffer chunks with bufferSize defined.
   *
   * @private
   * @type {number}
   * @memberof BufferScheduler
   */
  private readonly bufferSize: number;

  /**
   * How many buffers can be created or maintained.
   *
   * @private
   * @type {number}
   * @memberof BufferScheduler
   */
  private readonly maxBuffers: number;

  /**
   * A Node.js Readable stream.
   *
   * @private
   * @type {Readable}
   * @memberof BufferScheduler
   */
  private readonly readable: Readable;

  /**
   * OutgoingHandler is an async function triggered by BufferScheduler when there
   * are available buffers in outgoing array.
   *
   * @private
   * @type {OutgoingHandler}
   * @memberof BufferScheduler
   */
  private readonly outgoingHandler: OutgoingHandler;

  /**
   * An internal event emitter.
   *
   * @private
   * @type {EventEmitter}
   * @memberof BufferScheduler
   */
  private readonly emitter: EventEmitter = new EventEmitter();

  /**
   * Concurrency of executing outgoingHandlers. (0 < concurrency <= maxBuffers)
   *
   * @private
   * @type {number}
   * @memberof BufferScheduler
   */
  private readonly concurrency: number;

  /**
   * An internal offset marker to track data offset in bytes of next outgoingHandler.
   *
   * @private
   * @type {number}
   * @memberof BufferScheduler
   */
  private offset: number = 0;

  /**
   * An internal marker to track whether stream is end.
   *
   * @private
   * @type {boolean}
   * @memberof BufferScheduler
   */
  private isStreamEnd: boolean = false;

  /**
   * An internal marker to track whether stream or outgoingHandler returns error.
   *
   * @private
   * @type {boolean}
   * @memberof BufferScheduler
   */
  private isError: boolean = false;

  /**
   * How many handlers are executing.
   *
   * @private
   * @type {number}
   * @memberof BufferScheduler
   */
  private executingOutgoingHandlers: number = 0;

  /**
   * Encoding of the input Readable stream which has string data type instead of Buffer.
   *
   * @private
   * @type {string}
   * @memberof BufferScheduler
   */
  private encoding?: string;

  /**
   * How many buffers have been allocated.
   *
   * @private
   * @type {number}
   * @memberof BufferScheduler
   */
  private numBuffers: number = 0;

  /**
   * Because this class doesn't know how much data every time stream pops, which
   * is defined by highWaterMarker of the stream. So BufferScheduler will cache
   * data received from the stream, when data in unresolvedDataArray exceeds the
   * blockSize defined, it will try to concat a blockSize of buffer, fill into available
   * buffers from incoming and push to outgoing array.
   *
   * @private
   * @type {Buffer[]}
   * @memberof BufferScheduler
   */
  private unresolvedDataArray: Buffer[] = [];

  /**
   * How much data consisted in unresolvedDataArray.
   *
   * @private
   * @type {number}
   * @memberof BufferScheduler
   */
  private unresolvedLength: number = 0;

  /**
   * The array includes all the available buffers can be used to fill data from stream.
   *
   * @private
   * @type {Buffer[]}
   * @memberof BufferScheduler
   */
  private incoming: Buffer[] = [];

  /**
   * The array (queue) includes all the buffers filled from stream data.
   *
   * @private
   * @type {Buffer[]}
   * @memberof BufferScheduler
   */
  private outgoing: Buffer[] = [];

  /**
   * Creates an instance of BufferScheduler.
   *
   * @param {Readable} readable A Node.js Readable stream
   * @param {number} bufferSize Buffer size of every maintained buffer
   * @param {number} maxBuffers How many buffers can be allocated
   * @param {OutgoingHandler} outgoingHandler An async function scheduled to be
   *                                          triggered when a buffer fully filled
   *                                          with stream data
   * @param {number} concurrency Concurrency of executing outgoingHandlers (>0)
   * @param {string} [encoding] [Optional] Encoding of Readable stream when it's a string stream
   * @memberof BufferScheduler
   */
  constructor(
    readable: Readable,
    bufferSize: number,
    maxBuffers: number,
    outgoingHandler: OutgoingHandler,
    concurrency: number,
    encoding?: string
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
   * @returns {Promise<void>}
   * @memberof BufferScheduler
   */
  public async do(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.readable.on("data", (data) => {
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
        this.isError = true;
        this.readable.pause();
        reject(err);
      });

      this.emitter.on("checkEnd", () => {
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
    });
  }

  /**
   * Insert a new data into unresolved array.
   *
   * @private
   * @param {Buffer} data
   * @memberof BufferScheduler
   */
  private appendUnresolvedData(data: Buffer) {
    this.unresolvedDataArray.push(data);
    this.unresolvedLength += data.length;
  }

  /**
   * Try to shift a buffer with size in blockSize. The buffer returned may be less
   * than blockSize when data in unresolvedDataArray is less than bufferSize.
   *
   * @private
   * @returns {Buffer}
   * @memberof BufferScheduler
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
   * @private
   * @returns {boolean} Return false when buffers in incoming are not enough, else true.
   * @memberof BufferScheduler
   */
  private resolveData(): boolean {
    while (this.unresolvedLength >= this.bufferSize) {
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
   *
   * @private
   * @memberof BufferScheduler
   */
  private async triggerOutgoingHandlers() {
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
   * @private
   * @param {Buffer} buffer
   * @returns {Promise<any>}
   * @memberof BufferScheduler
   */
  private async triggerOutgoingHandler(buffer: Buffer): Promise<any> {
    const bufferLength = buffer.length;

    this.executingOutgoingHandlers++;
    this.offset += bufferLength;

    try {
      await this.outgoingHandler(buffer, this.offset - bufferLength);
    } catch (err) {
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
   * @private
   * @param {Buffer} buffer
   * @memberof BufferScheduler
   */
  private reuseBuffer(buffer: Buffer) {
    this.incoming.push(buffer);
    if (!this.isError && this.resolveData() && !this.isStreamEnd) {
      this.readable.resume();
    }
  }
}
