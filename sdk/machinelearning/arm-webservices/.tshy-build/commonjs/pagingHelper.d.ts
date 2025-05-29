export interface PageInfo {
    continuationToken?: string;
}
/**
 * Given a result page from a pageable operation, returns a
 * continuation token that can be used to begin paging from
 * that point later.
 * @param page A result object from calling .byPage() on a paged operation.
 * @returns The continuation token that can be passed into byPage().
 */
export declare function getContinuationToken(page: unknown): string | undefined;
export declare function setContinuationToken(page: unknown, continuationToken: string | undefined): void;
//# sourceMappingURL=pagingHelper.d.ts.map