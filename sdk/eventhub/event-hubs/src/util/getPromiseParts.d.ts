/**
 * @internal
 * Returns a promise and the promise's resolve and reject methods.
 */
export declare function getPromiseParts<T = unknown>(): {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason: Error) => void;
};
//# sourceMappingURL=getPromiseParts.d.ts.map