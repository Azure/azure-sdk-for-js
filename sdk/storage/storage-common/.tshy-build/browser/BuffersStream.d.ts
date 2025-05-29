import type { ReadableOptions } from "node:stream";
import { Readable } from "node:stream";
/**
 * Options to configure the BuffersStream.
 */
export interface BuffersStreamOptions extends ReadableOptions {
}
/**
 * This class generates a readable stream from the data in an array of buffers.
 */
export declare class BuffersStream extends Readable {
    private buffers;
    private byteLength;
    /**
     * The offset of data to be read in the current buffer.
     */
    private byteOffsetInCurrentBuffer;
    /**
     * The index of buffer to be read in the array of buffers.
     */
    private bufferIndex;
    /**
     * The total length of data already read.
     */
    private pushedBytesLength;
    /**
     * Creates an instance of BuffersStream that will emit the data
     * contained in the array of buffers.
     *
     * @param buffers - Array of buffers containing the data
     * @param byteLength - The total length of data contained in the buffers
     */
    constructor(buffers: Buffer[], byteLength: number, options?: BuffersStreamOptions);
    /**
     * Internal _read() that will be called when the stream wants to pull more data in.
     *
     * @param size - Optional. The size of data to be read
     */
    _read(size?: number): void;
}
//# sourceMappingURL=BuffersStream.d.ts.map