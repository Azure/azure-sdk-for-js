import type { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse.js";
import type { Resource } from "../../client/index.js";
import type { ChangeFeedPullModelIterator } from "./ChangeFeedPullModelIterator.js";
/**
 * @hidden
 * Provides iterator for change feed.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
export declare class ChangeFeedIteratorBuilder<T> implements ChangeFeedPullModelIterator<T> {
    private cfOptions;
    private clientContext;
    private container;
    private partitionKeyRangeCache;
    private iterator;
    private isInitialized;
    /**
     * Change feed is an infinite feed. hasMoreResults is always true.
     */
    get hasMoreResults(): boolean;
    /**
     * Gets an async iterator which will yield change feed results.
     */
    getAsyncIterator(): AsyncIterable<ChangeFeedIteratorResponse<Array<T & Resource>>>;
    /**
     * Returns the result of change feed from Azure Cosmos DB.
     */
    readNext(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>>;
    private initializeIterator;
}
//# sourceMappingURL=ChangeFeedIteratorBuilder.d.ts.map