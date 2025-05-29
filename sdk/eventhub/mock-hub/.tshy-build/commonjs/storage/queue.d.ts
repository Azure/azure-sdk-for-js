/**
 * `Queue` stores items in the order that they are received.
 *
 * This differs from ordinary Queues in that `shift` returns a Promise for a value.
 * This allows a consumer of the queue to request an item that the queue does not yet have.
 */
export declare class Queue<T> {
    private readonly _items;
    private _nextItemResolve?;
    private _nextItemPromise?;
    constructor(items?: T[]);
    size(): number;
    /**
     * Returns a Promise that will resolve with the first item in the queue.
     */
    shift(): Promise<T>;
    /**
     * Appends new item to the queue.
     * @param item - the item to append
     */
    push(item: T): void;
    private _resolveNextItem;
}
//# sourceMappingURL=queue.d.ts.map