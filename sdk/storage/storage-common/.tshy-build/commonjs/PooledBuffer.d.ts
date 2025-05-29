import type { Readable } from "node:stream";
/**
 * This class provides a buffer container which conceptually has no hard size limit.
 * It accepts a capacity, an array of input buffers and the total length of input data.
 * It will allocate an internal "buffer" of the capacity and fill the data in the input buffers
 * into the internal "buffer" serially with respect to the total length.
 * Then by calling PooledBuffer.getReadableStream(), you can get a readable stream
 * assembled from all the data in the internal "buffer".
 */
export declare class PooledBuffer {
    /**
     * Internal buffers used to keep the data.
     * Each buffer has a length of the maxBufferLength except last one.
     */
    private buffers;
    /**
     * The total size of internal buffers.
     */
    private readonly capacity;
    /**
     * The total size of data contained in internal buffers.
     */
    private _size;
    /**
     * The size of the data contained in the pooled buffers.
     */
    get size(): number;
    /**
     * Creates an instance of PooledBuffer with given capacity.
     * Internal buffers are allocated but contains no data.
     * Users may call the {@link PooledBuffer.fill} method to fill this
     * pooled buffer with data.
     *
     * @param capacity - Total capacity of the internal buffers
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
     */
    constructor(capacity: number, buffers: Buffer[], totalLength: number);
    /**
     * Fill the internal buffers with data in the input buffers serially
     * with respect to the total length and the total capacity of the internal buffers.
     * Data copied will be shift out of the input buffers.
     *
     * @param buffers - Input buffers containing the data to be filled in the pooled buffer
     * @param totalLength - Total length of the data to be filled in.
     *
     */
    fill(buffers: Buffer[], totalLength: number): void;
    /**
     * Get the readable stream assembled from all the data in the internal buffers.
     *
     */
    getReadableStream(): Readable;
}
//# sourceMappingURL=PooledBuffer.d.ts.map