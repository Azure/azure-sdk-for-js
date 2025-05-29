import { ChangeFeedRange } from "./ChangeFeedRange.js";
/**
 * @hidden
 * A queue for iterating over specified Epk ranges and fetch change feed for the given epk ranges.
 */
export declare class FeedRangeQueue<T> {
    private elements;
    constructor();
    modifyFirstElement(newItem: ChangeFeedRange): void;
    enqueue(item: ChangeFeedRange): void;
    dequeue(): ChangeFeedRange;
    peek(): T | ChangeFeedRange;
    isEmpty(): boolean;
    moveFirstElementToTheEnd(): void;
    /**
     * Returns a snapshot of the queue as an array to be used as Continuation token.
     */
    returnSnapshot(): ChangeFeedRange[];
}
//# sourceMappingURL=FeedRangeQueue.d.ts.map