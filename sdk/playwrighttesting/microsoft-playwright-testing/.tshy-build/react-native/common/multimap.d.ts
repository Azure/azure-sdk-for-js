export declare class MultiMap<K, V> {
    private _map;
    constructor();
    set(key: K, value: V): void;
    get(key: K): V[];
    has(key: K): boolean;
    delete(key: K, value: V): void;
    deleteAll(key: K): void;
    hasValue(key: K, value: V): boolean;
    get size(): number;
    [Symbol.iterator](): Iterator<[K, V[]]>;
    keys(): IterableIterator<K>;
    values(): Iterable<V>;
    clear(): void;
}
//# sourceMappingURL=multimap.d.ts.map