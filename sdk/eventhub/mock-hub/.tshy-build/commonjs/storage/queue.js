"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
/**
 * `Queue` stores items in the order that they are received.
 *
 * This differs from ordinary Queues in that `shift` returns a Promise for a value.
 * This allows a consumer of the queue to request an item that the queue does not yet have.
 */
class Queue {
    constructor(items) {
        this._items = items !== null && items !== void 0 ? items : [];
    }
    size() {
        return this._items.length;
    }
    /**
     * Returns a Promise that will resolve with the first item in the queue.
     */
    shift() {
        if (this._nextItemPromise) {
            return this._nextItemPromise;
        }
        const item = this._items.shift();
        if (typeof item !== "undefined") {
            return Promise.resolve(item);
        }
        this._nextItemPromise = new Promise((resolve) => (this._nextItemResolve = resolve));
        return this._nextItemPromise;
    }
    /**
     * Appends new item to the queue.
     * @param item - the item to append
     */
    push(item) {
        if (!this._resolveNextItem(item)) {
            this._items.push(item);
        }
    }
    _resolveNextItem(item) {
        if (!this._nextItemResolve) {
            return false;
        }
        const resolve = this._nextItemResolve;
        this._nextItemResolve = undefined;
        this._nextItemPromise = undefined;
        resolve(item);
        return true;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map