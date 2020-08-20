import { BuffersStream } from "./BuffersStream";
import { Readable } from "stream";
import { BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES } from "./constants";

const maxBufferLength = Math.min(
  require("buffer").constants.MAX_LENGTH,
  BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES
);

export class PooledBuffer {
  private buffers: Buffer[] = [];

  private readonly capacity: number;

  private _size: number;
  public get size(): number {
    return this._size;
  }

  constructor(capacity: number);
  constructor(capacity: number, buffers: Buffer[], totalLength: number);
  constructor(capacity: number, buffers?: Buffer[], totalLength?: number) {
    this.capacity = capacity;
    this._size = capacity;

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

  public getReadableStream(): Readable {
    return new BuffersStream(this.buffers, this.size);
  }
}
