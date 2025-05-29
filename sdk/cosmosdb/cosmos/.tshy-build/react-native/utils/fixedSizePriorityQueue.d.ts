export declare class FixedSizePriorityQueue<T> {
    private pq;
    private compareFn;
    private pqMaxSize;
    constructor(compareFn: (a: T, b: T) => number, pqMaxSize: number);
    enqueue(item: T): void;
    dequeue(): T;
    size(): number;
    isEmpty(): boolean;
    peek(): T;
    getTopElements(): T[];
    reverse(): FixedSizePriorityQueue<T>;
}
//# sourceMappingURL=fixedSizePriorityQueue.d.ts.map