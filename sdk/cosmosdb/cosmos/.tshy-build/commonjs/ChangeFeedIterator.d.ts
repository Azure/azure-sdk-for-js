import { ChangeFeedResponse } from "./ChangeFeedResponse.js";
import type { Resource } from "./client/index.js";
/**
 * Provides iterator for change feed.
 *
 * Use `Items.changeFeed()` to get an instance of the iterator.
 */
export declare class ChangeFeedIterator<T> {
    private clientContext;
    private resourceId;
    private resourceLink;
    private partitionKey;
    private changeFeedOptions;
    private static readonly IfNoneMatchAllHeaderValue;
    private nextIfNoneMatch;
    private ifModifiedSince;
    private lastStatusCode;
    private isPartitionSpecified;
    /**
     * Gets a value indicating whether there are potentially additional results that can be retrieved.
     *
     * Initially returns true. This value is set based on whether the last execution returned a continuation token.
     *
     * @returns Boolean value representing if whether there are potentially additional results that can be retrieved.
     */
    get hasMoreResults(): boolean;
    /**
     * Gets an async iterator which will yield pages of results from Azure Cosmos DB.
     */
    getAsyncIterator(): AsyncIterable<ChangeFeedResponse<Array<T & Resource>>>;
    /**
     * Read feed and retrieves the next page of results in Azure Cosmos DB.
     */
    fetchNext(): Promise<ChangeFeedResponse<Array<T & Resource>>>;
    private getFeedResponse;
}
//# sourceMappingURL=ChangeFeedIterator.d.ts.map