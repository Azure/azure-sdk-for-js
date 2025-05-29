/** @hidden */
export declare enum FetchResultType {
    "Done" = 0,
    "Exception" = 1,
    "Result" = 2
}
/** @hidden */
export declare class FetchResult {
    feedResponse: any;
    headers: any;
    fetchResultType: FetchResultType;
    error: any;
    /**
     * Wraps fetch results for the document producer.
     * This allows the document producer to buffer exceptions so that actual results don't get flushed during splits.
     *
     * @param feedReponse - The response the document producer got back on a successful fetch
     * @param error - The exception meant to be buffered on an unsuccessful fetch
     * @hidden
     */
    constructor(feedResponse: unknown, error: unknown, headers?: unknown);
}
//# sourceMappingURL=FetchResult.d.ts.map