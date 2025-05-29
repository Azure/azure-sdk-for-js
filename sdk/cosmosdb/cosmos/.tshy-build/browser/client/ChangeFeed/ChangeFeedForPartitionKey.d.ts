import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse.js";
import { Resource } from "../../client/index.js";
import { ChangeFeedPullModelIterator } from "./ChangeFeedPullModelIterator.js";
/**
 * @hidden
 * Provides iterator for change feed for one partition key.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
export declare class ChangeFeedForPartitionKey<T> implements ChangeFeedPullModelIterator<T> {
    private clientContext;
    private container;
    private resourceId;
    private resourceLink;
    private partitionKey;
    private changeFeedOptions;
    private continuationToken;
    private startTime;
    private rId;
    private isInstantiated;
    private startFromNow;
    private instantiateIterator;
    private continuationTokenRidMatchContainerRid;
    private setIteratorRid;
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
    /**
     * Read feed and retrieves the next set of results in Azure Cosmos DB.
     */
    private fetchNext;
    private getFeedResponse;
}
//# sourceMappingURL=ChangeFeedForPartitionKey.d.ts.map