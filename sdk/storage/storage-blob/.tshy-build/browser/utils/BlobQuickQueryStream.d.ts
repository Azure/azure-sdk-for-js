import { Readable } from "node:stream";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { TransferProgressEvent } from "@azure/core-rest-pipeline";
import type { BlobQueryError } from "../Clients.js";
export interface BlobQuickQueryStreamOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Read progress event handler
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Callback to receive error events during the query operaiton.
     */
    onError?: (error: BlobQueryError) => void;
}
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js BlobQuickQueryStream will internally parse avro data stream for blob query.
 */
export declare class BlobQuickQueryStream extends Readable {
    private source;
    private avroReader;
    private avroIter;
    private avroPaused;
    private onProgress?;
    private onError?;
    /**
     * Creates an instance of BlobQuickQueryStream.
     *
     * @param source - The current ReadableStream returned from getter
     * @param options -
     */
    constructor(source: NodeJS.ReadableStream, options?: BlobQuickQueryStreamOptions);
    _read(): void;
    private readInternal;
}
//# sourceMappingURL=BlobQuickQueryStream.d.ts.map