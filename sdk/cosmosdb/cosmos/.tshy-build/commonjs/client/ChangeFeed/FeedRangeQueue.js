"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedRangeQueue = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const ChangeFeedRange_js_1 = require("./ChangeFeedRange.js");
/**
 * @hidden
 * A queue for iterating over specified Epk ranges and fetch change feed for the given epk ranges.
 */
class FeedRangeQueue {
    constructor() {
        this.elements = [];
    }
    modifyFirstElement(newItem) {
        if (!this.isEmpty()) {
            this.elements[0] = newItem;
        }
    }
    enqueue(item) {
        this.elements.push(item);
    }
    dequeue() {
        return this.elements.shift();
    }
    peek() {
        return !this.isEmpty() ? this.elements[0] : undefined;
    }
    isEmpty() {
        return this.elements.length === 0;
    }
    moveFirstElementToTheEnd() {
        if (!this.isEmpty()) {
            this.elements.push(this.dequeue());
        }
    }
    /**
     * Returns a snapshot of the queue as an array to be used as Continuation token.
     */
    returnSnapshot() {
        const allFeedRanges = [];
        this.elements.map((element) => {
            const minInclusive = element.epkMinHeader ? element.epkMinHeader : element.minInclusive;
            const maxExclusive = element.epkMaxHeader ? element.epkMaxHeader : element.maxExclusive;
            const feedRangeElement = new ChangeFeedRange_js_1.ChangeFeedRange(minInclusive, maxExclusive, element.continuationToken);
            allFeedRanges.push(feedRangeElement);
        });
        return allFeedRanges;
    }
}
exports.FeedRangeQueue = FeedRangeQueue;
//# sourceMappingURL=FeedRangeQueue.js.map