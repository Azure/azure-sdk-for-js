import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse.js";
import type { Resource } from "../../client/index.js";
import type { ChangeFeedPullModelIterator } from "./ChangeFeedPullModelIterator.js";
/**
 * @hidden
 * Provides iterator for change feed for entire container or an epk range.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
export declare class ChangeFeedForEpkRange<T> implements ChangeFeedPullModelIterator<T> {
    private clientContext;
    private container;
    private partitionKeyRangeCache;
    private resourceId;
    private resourceLink;
    private url;
    private changeFeedOptions;
    private epkRange;
    private continuationToken?;
    private queue;
    private startTime;
    private isInstantiated;
    private rId;
    private startFromNow;
    private setIteratorRid;
    private continuationTokenRidMatchContainerRid;
    private fillChangeFeedQueue;
    /**
     * Fill the queue with the feed ranges overlapping with the given epk range.
     */
    private fetchOverLappingFeedRanges;
    /**
     * Fill the queue with feed ranges from continuation token
     */
    private fetchContinuationTokenFeedRanges;
    /**
     * Change feed is an infinite feed. hasMoreResults is always true.
     */
    get hasMoreResults(): boolean;
    /**
     * Gets an async iterator which will yield change feed results.
     */
    getAsyncIterator(): AsyncIterable<ChangeFeedIteratorResponse<Array<T & Resource>>>;
    /**
     * Gets an async iterator which will yield pages of results from Azure Cosmos DB.
     *
     * Keeps iterating over the feedranges and checks if any feed range has new result. Keeps note of the last feed range which returned non 304 result.
     *
     * When same feed range is reached and no new changes are found, a 304 (not Modified) is returned to the end user. Then starts process all over again.
     */
    readNext(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>>;
    private generateContinuationToken;
    /**
     * Read feed and retrieves the next page of results in Azure Cosmos DB.
     */
    private fetchNext;
    private checkedAllFeedRanges;
    /**
     * Checks whether the current EpkRange is split into multiple ranges or not.
     *
     * If yes, it force refreshes the partitionKeyRange cache and enqueue children epk ranges.
     */
    private shouldRetryOnFailure;
    private handleSplitOrMerge;
    /**
     * Fetch the partitionKeyRangeId for the given feed range.
     *
     * This partitionKeyRangeId is passed to queryFeed to fetch the results.
     */
    private getPartitionRangeId;
    private getFeedResponse;
    private fetchFinalFeedRange;
}
//# sourceMappingURL=ChangeFeedForEpkRange.d.ts.map