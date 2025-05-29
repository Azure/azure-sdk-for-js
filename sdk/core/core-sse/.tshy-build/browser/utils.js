// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncGenerator, __await } from "tslib";
export function createStream(asyncIter, cancel) {
    const stream = iteratorToStream(asyncIter, cancel);
    /** TODO: remove these polyfills once all supported runtimes support them */
    return polyfillStream(stream, cancel);
}
function polyfillStream(stream, dispose) {
    makeAsyncIterable(stream);
    makeAsyncDisposable(stream, dispose);
    return stream;
}
function makeAsyncDisposable(webStream, dispose) {
    var _a;
    (_a = Symbol.asyncDispose) !== null && _a !== void 0 ? _a : (Symbol.asyncDispose = Symbol("Symbol.asyncDispose"));
    if (!webStream[Symbol.asyncDispose]) {
        webStream[Symbol.asyncDispose] = () => dispose();
    }
}
function makeAsyncIterable(webStream) {
    if (!webStream[Symbol.asyncIterator]) {
        webStream[Symbol.asyncIterator] = () => toAsyncIterable(webStream);
    }
    if (!webStream.values) {
        webStream.values = () => toAsyncIterable(webStream);
    }
}
function iteratorToStream(iterator, cancel) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next();
            if (done) {
                controller.close();
            }
            else {
                controller.enqueue(value);
            }
        },
        cancel,
    });
}
export function ensureAsyncIterable(stream) {
    if (isReadableStream(stream)) {
        makeAsyncIterable(stream);
        return {
            cancel: () => stream.cancel(),
            iterable: stream,
        };
    }
    else {
        return {
            cancel: async () => {
                // socket could be null if the connection is already closed
                if ("socket" in stream && stream.socket) {
                    stream.socket.end();
                }
                else {
                    stream.destroy();
                }
            },
            iterable: stream,
        };
    }
}
function isReadableStream(body) {
    return Boolean(body &&
        typeof body.getReader === "function" &&
        typeof body.tee === "function");
}
function toAsyncIterable(stream) {
    return __asyncGenerator(this, arguments, function* toAsyncIterable_1() {
        const reader = stream.getReader();
        try {
            while (true) {
                const { value, done } = yield __await(reader.read());
                if (done) {
                    return yield __await(void 0);
                }
                yield yield __await(value);
            }
        }
        finally {
            const cancelPromise = reader.cancel();
            reader.releaseLock();
            yield __await(cancelPromise);
        }
    });
}
//# sourceMappingURL=utils.js.map