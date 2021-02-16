// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Readable, ReadableOptions } from "stream";

/**
 * Options to configure the BuffersStream.
 */
export interface BuffersStreamOptions extends ReadableOptions {}

/**
 * This class generates a readable stream from the data in an array of buffers.
 *
 * @export
 * @class BuffersStream
 */
export class BuffersStream extends Readable {
  /**
   * The offset of data to be read in the current buffer.
   *
   * @private
   * @type {number}
   * @memberof BuffersStream
   */
  private byteOffsetInCurrentBuffer: number;

  /**
   * The index of buffer to be read in the array of buffers.
   *
   * @private
   * @type {number}
   * @memberof BuffersStream
   */
  private bufferIndex: number;

  /**
   * The total length of data already read.
   *
   * @private
   * @type {number}
   * @memberof BuffersStream
   */
  private pushedBytesLength: number;

  /**
   * Creates an instance of BuffersStream that will emit the data
   * contained in the array of buffers.
   *
   * @param {Buffer[]} buffers Array of buffers containing the data
   * @param {number} byteLength The total length of data contained in the buffers
   * @memberof BuffersStream
   */
  constructor(
    private buffers: Buffer[],
    private byteLength: number,
    options?: BuffersStreamOptions
  ) {
    super(options);
    this.byteOffsetInCurrentBuffer = 0;
    this.bufferIndex = 0;
    this.pushedBytesLength = 0;

    // check byteLength is no larger than buffers[] total length
    let buffersLength = 0;
    for (const buf of this.buffers) {
      buffersLength += buf.byteLength;
    }
    if (buffersLength < this.byteLength) {
      throw new Error("Data size shouldn't be larger than the total length of buffers.");
    }
  }

  /**
   * Internal _read() that will be called when the stream wants to pull more data in.
   *
   * @param {number} size Optional. The size of data to be read
   * @memberof BuffersStream
   */
  public _read(size?: number) {
    if (this.pushedBytesLength >= this.byteLength) {
      this.push(null);
    }

    if (!size) {
      size = this.readableHighWaterMark;
    }

    const outBuffers: Buffer[] = [];
    let i = 0;
    while (i < size && this.pushedBytesLength < this.byteLength) {
      // The last buffer may be longer than the data it contains.
      const remainingDataInAllBuffers = this.byteLength - this.pushedBytesLength;
      const remainingCapacityInThisBuffer =
        this.buffers[this.bufferIndex].byteLength - this.byteOffsetInCurrentBuffer;
      const remaining = Math.min(remainingCapacityInThisBuffer, remainingDataInAllBuffers);
      if (remaining > size - i) {
        // chunkSize = size - i
        const end = this.byteOffsetInCurrentBuffer + size - i;
        outBuffers.push(this.buffers[this.bufferIndex].slice(this.byteOffsetInCurrentBuffer, end));
        this.pushedBytesLength += size - i;
        this.byteOffsetInCurrentBuffer = end;
        i = size;
        break;
      } else {
        // chunkSize = remaining
        const end = this.byteOffsetInCurrentBuffer + remaining;
        outBuffers.push(this.buffers[this.bufferIndex].slice(this.byteOffsetInCurrentBuffer, end));
        if (remaining === remainingCapacityInThisBuffer) {
          // this.buffers[this.bufferIndex] used up, shift to next one
          this.byteOffsetInCurrentBuffer = 0;
          this.bufferIndex++;
        } else {
          this.byteOffsetInCurrentBuffer = end;
        }
        this.pushedBytesLength += remaining;
        i += remaining;
      }
    }

    if (outBuffers.length > 1) {
      this.push(Buffer.concat(outBuffers));
    } else if (outBuffers.length === 1) {
      this.push(outBuffers[0]);
    }
  }
}
