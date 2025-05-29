export interface PageInfo {
    continuationToken?: string;
}
/**
 * Given the last `.value` produced by the `byPage` iterator,
 * returns a continuation token that can be used to begin paging from
 * that point later.
 * @param page An object from accessing `value` on the IteratorResult from a `byPage` iterator.
 * @returns The continuation token that can be passed into byPage() during future calls.
 */
export declare function getContinuationToken(page: unknown): string | undefined;
export declare function setContinuationToken(page: unknown, continuationToken: string | undefined): void;
//# sourceMappingURL=pagingHelper.d.ts.map