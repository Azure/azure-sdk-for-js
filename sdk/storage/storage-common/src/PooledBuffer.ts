// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BuffersStream } from "./BuffersStream";
import { Readable } from "stream";

/**
 * maxBufferLength is max size of each buffer in the pooled buffers.
 */
// Can't use import as Typescript doesn't recognize "buffer".
const maxBufferLength = require("buffer").constants.MAX_LENGTH;

/**
 * This class provides a buffer container which conceptually has no hard size limit.
 * It accepts a capacity, an array of input buffers and the total length of input data.
 * It will allocate an internal "buffer" of the capacity and fill the data in the input buffers
 * into the internal "buffer" serially with respect to the total length.
 * Then by calling PooledBuffer.getReadableStream(), you can get a readable stream
 * assembled from all the data in the internal "buffer".
 *
 * @export
 * @class BufferScheduler
 */
export class PooledBuffer {
  /**
   * Internal buffers used to keep the data.
   * Each buffer has a length of the maxBufferLength except last one.
   *
   * @private
   * @type {Buffer[]}
   * @memberof PooledBuffer
   */
  private buffers: Buffer[] = [];

  /**
   * The total size of internal buffers.
   *
   * @private
   * @type {number}
   * @memberof PooledBuffer
   */
  private readonly capacity: number;

  /**
   * The total size of data contained in internal buffers.
   *
   * @private
   * @type {number}
   * @memberof PooledBuffer
   */
  private _size: number;

  /**
   * The size of the data contained in the pooled buffers.
   */
  public get size(): number {
    return this._size;
  }

  /**
   * Creates an instance of PooledBuffer with given capacity.
   * Internal buffers are allocated but contains no data.
   * Users may call the {@link PooledBuffer.fill} method to fill this
   * pooled buffer with data.
   *
   * @param capacity - Total capacity of the internal buffers
   * @memberof PooledBuffer
   */
  constructor(capacity: number);

  /**
   * Creates an instance of PooledBuffer with given capacity.
   * Internal buffers are allocated and filled with data in the input buffers serially
   * with respect to the total length.
   *
   * @param capacity - Total capacity of the internal buffers
   * @param buffers - Input buffers containing the data to be filled in the pooled buffer
   * @param totalLength - Total length of the data to be filled in.
   * @memberof PooledBuffer
   */
  constructor(capacity: number, buffers: Buffer[], totalLength: number);
  constructor(capacity: number, buffers?: Buffer[], totalLength?: number) {
    this.capacity = capacity;
    this._size = 0;

    // allocate
    const bufferNum = Math.ceil(capacity / maxBufferLength);
    for (let i = 0; i < bufferNum; i++) {
      let len = i === bufferNum - 1 ? capacity % maxBufferLength : maxBufferLength;
      if (len === 0) {
        len = maxBufferLength;
      }
      this.buffers.push(Buffer.allocUnsafe(len));
    }

    if (buffers) {
      this.fill(buffers, totalLength!);
    }
  }

  /**
   * Fill the internal buffers with data in the input buffers serially
   * with respect to the total length and the total capacity of the internal buffers.
   * Data copied will be shift out of the input buffers.
   *
   * @param buffers - Input buffers containing the data to be filled in the pooled buffer
   * @param totalLength - Total length of the data to be filled in.
   *
   *
   * @memberof PooledBuffer
   */
  public fill(buffers: Buffer[], totalLength: number) {
    this._size = Math.min(this.capacity, totalLength);

    let i = 0,
      j = 0,
      targetOffset = 0,
      sourceOffset = 0,
      totalCopiedNum = 0;
    while (totalCopiedNum < this._size) {
      const source = buffers[i];
      const target = this.buffers[j];
      const copiedNum = source.copy(target, targetOffset, sourceOffset);

      totalCopiedNum += copiedNum;
      sourceOffset += copiedNum;
      targetOffset += copiedNum;
      if (sourceOffset === source.length) {
        i++;
        sourceOffset = 0;
      }
      if (targetOffset === target.length) {
        j++;
        targetOffset = 0;
      }
    }

    // clear copied from source buffers
    buffers.splice(0, i);
    if (buffers.length > 0) {
      buffers[0] = buffers[0].slice(sourceOffset);
    }
  }

  /**
   * Get the readable stream assembled from all the data in the internal buffers.
   *
   *
   * @memberof PooledBuffer
   */
  public getReadableStream(): Readable {
    return new BuffersStream(this.buffers, this.size);
  }
}
