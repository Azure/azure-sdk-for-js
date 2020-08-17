import { Readable, ReadableOptions } from "stream";

export interface BuffersStreamOptions extends ReadableOptions {}

export class BuffersStream extends Readable {
  private byteOffset: number;
  private bufferIndex: number;
  private pushedBytesLength: number;

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
