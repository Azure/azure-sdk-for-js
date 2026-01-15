// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createAbortablePromise } from "@azure/core-util";
/**
 * `AwaitableQueue` stores items in the order that they are received.
 *
 * This differs from ordinary Queues in that `shift` returns a Promise for a value.
 * This allows a consumer of the queue to request an item that the queue does not yet have.
 *
 * @internal
 */
export class AwaitableQueue {
    _items;
    _resolvers = [];
    constructor() {
        this._items = [];
    }
    size() {
        return this._items.length;
    }
    /**
     * Returns a Promise that will resolve with the next item in the queue.
     */
    shift(options) {
        const item = this._items.shift();
        if (typeof item !== "undefined") {
            return Promise.resolve(item);
        }
        return createAbortablePromise((resolve) => this._resolvers.push(resolve), {
            ...options,
            cleanupBeforeAbort: () => this._resolvers.pop(),
        });
    }
    /**
     * Appends new item to the queue.
     */
    push(item) {
        if (!this._resolveNextItem(item)) {
            this._items.push(item);
        }
    }
    _resolveNextItem(item) {
        const resolver = this._resolvers.shift();
        if (!resolver) {
            return false;
        }
        resolver(item);
        return true;
    }
}
//# sourceMappingURL=awaitableQueue.js.map