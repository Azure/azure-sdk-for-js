// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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
  private byteOffset: number;

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
    this.byteOffset = 0;
    this.bufferIndex = 0;
    this.pushedBytesLength = 0;
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
      const remaining = this.buffers[this.bufferIndex].byteLength - this.byteOffset;
      if (remaining > size - i) {
        const end = this.byteOffset + size - i;
        outBuffers.push(this.buffers[this.bufferIndex].slice(this.byteOffset, end));
        this.pushedBytesLength += size - i;
        this.byteOffset = end;
        i = size;
        break;
      } else {
        outBuffers.push(this.buffers[this.bufferIndex].slice(this.byteOffset));
        this.byteOffset = 0;
        this.bufferIndex++;
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
