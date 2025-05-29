import type { IncomingMessage } from "node:http";
import type { NodeJSReadableStream } from "./models.js";
export declare function createStream<T>(asyncIter: AsyncIterableIterator<T>, cancel: () => PromiseLike<void>): ReadableStream<T> & AsyncDisposable & AsyncIterable<T>;
export declare function ensureAsyncIterable(stream: IncomingMessage | NodeJSReadableStream | ReadableStream<Uint8Array>): {
    cancel(): Promise<void>;
    iterable: AsyncIterable<Uint8Array>;
};
//# sourceMappingURL=utils.d.ts.map