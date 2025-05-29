"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwaitableQueue = void 0;
const core_util_1 = require("@azure/core-util");
/**
 * `AwaitableQueue` stores items in the order that they are received.
 *
 * This differs from ordinary Queues in that `shift` returns a Promise for a value.
 * This allows a consumer of the queue to request an item that the queue does not yet have.
 *
 * @internal
 */
class AwaitableQueue {
    constructor() {
        this._resolvers = [];
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
        return (0, core_util_1.createAbortablePromise)((resolve) => this._resolvers.push(resolve), Object.assign(Object.assign({}, options), { cleanupBeforeAbort: () => this._resolvers.pop() }));
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
exports.AwaitableQueue = AwaitableQueue;
//# sourceMappingURL=awaitableQueue.js.map