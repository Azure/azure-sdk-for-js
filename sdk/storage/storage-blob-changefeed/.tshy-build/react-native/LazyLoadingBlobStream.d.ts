import type { ReadableOptions } from "node:stream";
import { Readable } from "node:stream";
import type { BlobClient, CommonOptions } from "@azure/storage-blob";
import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Options to configure the LazyLoadingBlobStream.
 */
export interface LazyLoadingBlobStreamOptions extends ReadableOptions, CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * This class generates a readable stream from a blobClient's data.
 */
export declare class LazyLoadingBlobStream extends Readable {
    /**
     * BlobClient to make download calls with.
     */
    private readonly blobClient;
    /**
     * The offset within the blob of the next block we will download.
     */
    private offset;
    private readonly blockSize;
    private lastDownloadBytes;
    private lastDownloadData?;
    private blobLength;
    private options?;
    /**
     * Creates an instance of LazyLoadingBlobStream.
     *
     * @param byteLength - The total length of data contained in the buffers
     */
    constructor(blobClient: BlobClient, offset: number, blockSize: number, options?: LazyLoadingBlobStreamOptions);
    private downloadBlock;
    /**
     * Internal _read() that will be called when the stream wants to pull more data in.
     *
     * @param size - Optional. The size of data to be read
     */
    _read(size?: number): Promise<void>;
}
//# sourceMappingURL=LazyLoadingBlobStream.d.ts.map