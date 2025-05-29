/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from a saved point.
 */
export declare class ChangeFeedStartFromContinuation {
    private continuationToken;
    constructor(continuation: string);
    getCfResource(): string;
    getCfResourceJson(): any;
    getResourceType(): any;
}
//# sourceMappingURL=ChangeFeedStartFromContinuation.d.ts.map