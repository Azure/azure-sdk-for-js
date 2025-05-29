import type { AbortOptions } from "@azure/core-util";
/**
 * `AwaitableQueue` stores items in the order that they are received.
 *
 * This differs from ordinary Queues in that `shift` returns a Promise for a value.
 * This allows a consumer of the queue to request an item that the queue does not yet have.
 *
 * @internal
 */
export declare class AwaitableQueue<T> {
    private readonly _items;
    private readonly _resolvers;
    constructor();
    size(): number;
    /**
     * Returns a Promise that will resolve with the next item in the queue.
     */
    shift(options?: AbortOptions): Promise<T>;
    /**
     * Appends new item to the queue.
     */
    push(item: T): void;
    private _resolveNextItem;
}
//# sourceMappingURL=awaitableQueue.d.ts.map