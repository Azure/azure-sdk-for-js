import type { TransferProgressEvent } from "@azure/core-rest-pipeline";
import { Readable } from "node:stream";
export type ReadableStreamGetter = (offset: number) => Promise<NodeJS.ReadableStream>;
export interface RetriableReadableStreamOptions {
    /**
     * Max retry count (greater than or equal to 0), undefined or invalid value means no retry
     */
    maxRetryRequests?: number;
    /**
     * Read progress event handler
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Debug purpose only. Used to inject an unexpected end to existing internal stream,
     * to test stream retry works well or not.
     *
     * When assign it to true, for next incoming "data" event of internal stream,
     * RetriableReadableStream will try to emit an "end" event to existing internal
     * stream to force it end and start retry from the breaking point.
     * The value will then update to "undefined", once the injection works.
     */
    doInjectErrorOnce?: boolean;
    /**
     * A threshold, not a limit. Dictates the amount of data that a stream buffers before it stops asking for more data.
     */
    highWaterMark?: number;
}
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js ReadableStream will internally retry when internal ReadableStream unexpected ends.
 */
export declare class RetriableReadableStream extends Readable {
    private start;
    private offset;
    private end;
    private getter;
    private source;
    private retries;
    private maxRetryRequests;
    private onProgress?;
    private options;
    /**
     * Creates an instance of RetriableReadableStream.
     *
     * @param source - The current ReadableStream returned from getter
     * @param getter - A method calling downloading request returning
     *                                      a new ReadableStream from specified offset
     * @param offset - Offset position in original data source to read
     * @param count - How much data in original data source to read
     * @param options -
     */
    constructor(source: NodeJS.ReadableStream, getter: ReadableStreamGetter, offset: number, count: number, options?: RetriableReadableStreamOptions);
    _read(): void;
    private setSourceEventHandlers;
    private removeSourceEventHandlers;
    private sourceDataHandler;
    private sourceAbortedHandler;
    private sourceErrorOrEndHandler;
    _destroy(error: Error | null, callback: (error?: Error) => void): void;
}
//# sourceMappingURL=RetriableReadableStream.d.ts.map