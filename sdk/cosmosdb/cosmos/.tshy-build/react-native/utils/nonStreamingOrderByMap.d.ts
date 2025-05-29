/**
 * Stores the most favourable distinct result from a set of nonStreamingOrderBy results.
 */
export declare class NonStreamingOrderByMap<T> {
    private map;
    private compareFn;
    constructor(compareFn: (a: T | undefined, b: T | undefined) => number);
    set(key: string, value: T): void;
    get(key: string): T | undefined;
    /**
     * Returns all the values in the map and resets the map.
     */
    getAllValuesAndReset(): T[];
    private replaceResults;
    size(): number;
}
//# sourceMappingURL=nonStreamingOrderByMap.d.ts.map