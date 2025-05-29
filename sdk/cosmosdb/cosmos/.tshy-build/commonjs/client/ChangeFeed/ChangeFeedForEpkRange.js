"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedForEpkRange = void 0;
const tslib_1 = require("tslib");
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const ChangeFeedRange_js_1 = require("./ChangeFeedRange.js");
const ChangeFeedIteratorResponse_js_1 = require("./ChangeFeedIteratorResponse.js");
const index_js_1 = require("../../routing/index.js");
const FeedRangeQueue_js_1 = require("./FeedRangeQueue.js");
const index_js_2 = require("../../common/index.js");
const index_js_3 = require("../../request/index.js");
const CompositeContinuationToken_js_1 = require("./CompositeContinuationToken.js");
const changeFeedUtils_js_1 = require("./changeFeedUtils.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
const ChangeFeedMode_js_1 = require("./ChangeFeedMode.js");
/**
 * @hidden
 * Provides iterator for change feed for entire container or an epk range.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
class ChangeFeedForEpkRange {
    /**
     * @internal
     */
    constructor(clientContext, container, partitionKeyRangeCache, resourceId, resourceLink, url, changeFeedOptions, epkRange) {
        this.clientContext = clientContext;
        this.container = container;
        this.partitionKeyRangeCache = partitionKeyRangeCache;
        this.resourceId = resourceId;
        this.resourceLink = resourceLink;
        this.url = url;
        this.changeFeedOptions = changeFeedOptions;
        this.epkRange = epkRange;
        this.generateContinuationToken = () => {
            return JSON.stringify(new CompositeContinuationToken_js_1.CompositeContinuationToken(this.rId, this.queue.returnSnapshot()));
        };
        this.queue = new FeedRangeQueue_js_1.FeedRangeQueue();
        this.continuationToken = changeFeedOptions.continuationToken
            ? JSON.parse(changeFeedOptions.continuationToken)
            : undefined;
        this.isInstantiated = false;
        // startTime is used to store and specify time from which change feed should start reading new changes. StartFromNow flag is used to indicate fetching changes from now.
        if (changeFeedOptions.startFromNow) {
            this.startFromNow = true;
        }
        else if (changeFeedOptions.startTime) {
            this.startTime = changeFeedOptions.startTime.toUTCString();
        }
    }
    async setIteratorRid(diagnosticNode) {
        const { resource } = await this.container.readInternal(diagnosticNode);
        this.rId = resource._rid;
    }
    continuationTokenRidMatchContainerRid() {
        if (this.continuationToken.rid !== this.rId) {
            return false;
        }
        return true;
    }
    async fillChangeFeedQueue(diagnosticNode) {
        if (this.continuationToken) {
            // fill the queue with feed ranges in continuation token.
            await this.fetchContinuationTokenFeedRanges(diagnosticNode);
        }
        else {
            // fill the queue with feed ranges overlapping the given epk range.
            await this.fetchOverLappingFeedRanges(diagnosticNode);
        }
        this.isInstantiated = true;
    }
    /**
     * Fill the queue with the feed ranges overlapping with the given epk range.
     */
    async fetchOverLappingFeedRanges(diagnosticNode) {
        try {
            const overLappingRanges = await this.partitionKeyRangeCache.getOverlappingRanges(this.url, this.epkRange, diagnosticNode);
            for (const overLappingRange of overLappingRanges) {
                const [epkMinHeader, epkMaxHeader] = await (0, changeFeedUtils_js_1.extractOverlappingRanges)(this.epkRange, overLappingRange);
                const feedRange = new ChangeFeedRange_js_1.ChangeFeedRange(overLappingRange.minInclusive, overLappingRange.maxExclusive, "", epkMinHeader, epkMaxHeader);
                this.queue.enqueue(feedRange);
            }
        }
        catch (err) {
            throw new index_js_3.ErrorResponse(err.message);
        }
    }
    /**
     * Fill the queue with feed ranges from continuation token
     */
    async fetchContinuationTokenFeedRanges(diagnosticNode) {
        const contToken = this.continuationToken;
        if (!this.continuationTokenRidMatchContainerRid()) {
            throw new index_js_3.ErrorResponse("The continuation token is not for the current container definition");
        }
        else {
            for (const cToken of contToken.Continuation) {
                const queryRange = new index_js_1.QueryRange(cToken.minInclusive, cToken.maxExclusive, true, false);
                try {
                    const overLappingRanges = await this.partitionKeyRangeCache.getOverlappingRanges(this.url, queryRange, diagnosticNode);
                    for (const overLappingRange of overLappingRanges) {
                        // check if the epk range present in continuation token entirely covers the overlapping range.
                        // If yes, minInclusive and maxExclusive of the overlapping range will be set.
                        // If no, i.e. there is only partial overlap, epkMinHeader and epkMaxHeader are set as min and max of overlap.
                        // This will be used when we make a call to fetch change feed.
                        const [epkMinHeader, epkMaxHeader] = await (0, changeFeedUtils_js_1.extractOverlappingRanges)(queryRange, overLappingRange);
                        const feedRange = new ChangeFeedRange_js_1.ChangeFeedRange(overLappingRange.minInclusive, overLappingRange.maxExclusive, cToken.continuationToken, epkMinHeader, epkMaxHeader);
                        this.queue.enqueue(feedRange);
                    }
                }
                catch (err) {
                    throw new index_js_3.ErrorResponse(err.message);
                }
            }
        }
    }
    /**
     * Change feed is an infinite feed. hasMoreResults is always true.
     */
    get hasMoreResults() {
        return true;
    }
    /**
     * Gets an async iterator which will yield change feed results.
     */
    getAsyncIterator() {
        return tslib_1.__asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            do {
                const result = yield tslib_1.__await(this.readNext());
                yield yield tslib_1.__await(result);
            } while (this.hasMoreResults);
        });
    }
    /**
     * Gets an async iterator which will yield pages of results from Azure Cosmos DB.
     *
     * Keeps iterating over the feedranges and checks if any feed range has new result. Keeps note of the last feed range which returned non 304 result.
     *
     * When same feed range is reached and no new changes are found, a 304 (not Modified) is returned to the end user. Then starts process all over again.
     */
    async readNext() {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            // validate if the internal queue is filled up with feed ranges.
            if (!this.isInstantiated) {
                await this.setIteratorRid(diagnosticNode);
                await this.fillChangeFeedQueue(diagnosticNode);
            }
            // stores the last feedRange for which statusCode is not 304 i.e. there were new changes in that feed range.
            let firstNotModifiedFeedRange = undefined;
            let result;
            do {
                const [processedFeedRange, response] = await this.fetchNext(diagnosticNode);
                result = response;
                if (result !== undefined) {
                    {
                        if (firstNotModifiedFeedRange === undefined) {
                            firstNotModifiedFeedRange = processedFeedRange;
                        }
                        // move current feed range to end of queue to fetch result of next feed range.
                        // This is done to fetch changes in breadth first manner and avoid starvation.
                        this.queue.moveFirstElementToTheEnd();
                        // check if there are new results for the given feed range.
                        if (result.statusCode === index_js_2.StatusCodes.Ok) {
                            result.headers[index_js_2.Constants.HttpHeaders.ContinuationToken] =
                                this.generateContinuationToken();
                            if (this.clientContext.enableEncryption) {
                                await (0, changeFeedUtils_js_1.decryptChangeFeedResponse)(result, diagnosticNode, this.changeFeedOptions.changeFeedMode, this.container.encryptionProcessor);
                            }
                            return result;
                        }
                    }
                }
            } while (!this.checkedAllFeedRanges(firstNotModifiedFeedRange));
            // set the continuation token after processing.
            result.headers[index_js_2.Constants.HttpHeaders.ContinuationToken] = this.generateContinuationToken();
            return result;
        }, this.clientContext);
    }
    /**
     * Read feed and retrieves the next page of results in Azure Cosmos DB.
     */
    async fetchNext(diagnosticNode) {
        const feedRange = this.queue.peek();
        if (feedRange) {
            // fetch results for feed range at the beginning of the queue.
            const result = await this.getFeedResponse(feedRange, diagnosticNode);
            // check if results need to be fetched again depending on status code returned.
            // Eg. in case of paritionSplit, results need to be fetched for the child partitions.
            const shouldRetry = await this.shouldRetryOnFailure(feedRange, result, diagnosticNode);
            if (shouldRetry) {
                this.queue.dequeue();
                return this.fetchNext(diagnosticNode);
            }
            else {
                // update the continuation value for the current feed range.
                const continuationValueForFeedRange = result.headers[index_js_2.Constants.HttpHeaders.ETag];
                const newFeedRange = this.queue.peek();
                newFeedRange.continuationToken = continuationValueForFeedRange;
                return [newFeedRange, result];
            }
        }
        else {
            return [undefined, undefined];
        }
    }
    checkedAllFeedRanges(firstNotModifiedFeedRange) {
        if (firstNotModifiedFeedRange === undefined) {
            return false;
        }
        const feedRangeQueueFirstElement = this.queue.peek();
        return (firstNotModifiedFeedRange.minInclusive === (feedRangeQueueFirstElement === null || feedRangeQueueFirstElement === void 0 ? void 0 : feedRangeQueueFirstElement.minInclusive) &&
            firstNotModifiedFeedRange.maxExclusive === (feedRangeQueueFirstElement === null || feedRangeQueueFirstElement === void 0 ? void 0 : feedRangeQueueFirstElement.maxExclusive) &&
            firstNotModifiedFeedRange.epkMinHeader === (feedRangeQueueFirstElement === null || feedRangeQueueFirstElement === void 0 ? void 0 : feedRangeQueueFirstElement.epkMinHeader) &&
            firstNotModifiedFeedRange.epkMaxHeader === (feedRangeQueueFirstElement === null || feedRangeQueueFirstElement === void 0 ? void 0 : feedRangeQueueFirstElement.epkMaxHeader));
    }
    /**
     * Checks whether the current EpkRange is split into multiple ranges or not.
     *
     * If yes, it force refreshes the partitionKeyRange cache and enqueue children epk ranges.
     */
    async shouldRetryOnFailure(feedRange, response, diagnosticNode) {
        if (response.statusCode === index_js_2.StatusCodes.Ok || response.statusCode === index_js_2.StatusCodes.NotModified) {
            return false;
        }
        const partitionSplit = response.statusCode === index_js_2.StatusCodes.Gone &&
            (response.subStatusCode === index_js_2.SubStatusCodes.PartitionKeyRangeGone ||
                response.subStatusCode === index_js_2.SubStatusCodes.CompletingSplit);
        if (partitionSplit) {
            const queryRange = new index_js_1.QueryRange(feedRange.epkMinHeader ? feedRange.epkMinHeader : feedRange.minInclusive, feedRange.epkMaxHeader ? feedRange.epkMaxHeader : feedRange.maxExclusive, true, false);
            const resolvedRanges = await this.partitionKeyRangeCache.getOverlappingRanges(this.url, queryRange, diagnosticNode, true);
            if (resolvedRanges.length < 1) {
                throw new index_js_3.ErrorResponse("Partition split/merge detected but no overlapping ranges found.");
            }
            // This covers both cases of merge and split.
            // resolvedRanges.length > 1 in case of split.
            // resolvedRanges.length === 1 in case of merge. EpkRange headers will be added in this case.
            if (resolvedRanges.length >= 1) {
                await this.handleSplitOrMerge(false, resolvedRanges, queryRange, feedRange.continuationToken);
            }
            return true;
        }
        return false;
    }
    /*
     * Enqueues all the children feed ranges for the given feed range.
     */
    async handleSplitOrMerge(shiftLeft, resolvedRanges, oldFeedRange, continuationToken) {
        let flag = 0;
        if (shiftLeft) {
            // This section is only applicable when handleSplitOrMerge is called by getPartitionRangeId().
            // used only when existing partition key range cache is used to check for any overlapping ranges.
            // Modifies the first element with the first overlapping range.
            const [epkMinHeader, epkMaxHeader] = await (0, changeFeedUtils_js_1.extractOverlappingRanges)(oldFeedRange, resolvedRanges[0]);
            const newFeedRange = new ChangeFeedRange_js_1.ChangeFeedRange(resolvedRanges[0].minInclusive, resolvedRanges[0].maxExclusive, continuationToken, epkMinHeader, epkMaxHeader);
            this.queue.modifyFirstElement(newFeedRange);
            flag = 1;
        }
        // Enqueue the overlapping ranges.
        for (let i = flag; i < resolvedRanges.length; i++) {
            const [epkMinHeader, epkMaxHeader] = await (0, changeFeedUtils_js_1.extractOverlappingRanges)(oldFeedRange, resolvedRanges[i]);
            const newFeedRange = new ChangeFeedRange_js_1.ChangeFeedRange(resolvedRanges[i].minInclusive, resolvedRanges[i].maxExclusive, continuationToken, epkMinHeader, epkMaxHeader);
            this.queue.enqueue(newFeedRange);
        }
    }
    /**
     * Fetch the partitionKeyRangeId for the given feed range.
     *
     * This partitionKeyRangeId is passed to queryFeed to fetch the results.
     */
    async getPartitionRangeId(feedRange, diagnosticNode) {
        const min = feedRange.epkMinHeader ? feedRange.epkMinHeader : feedRange.minInclusive;
        const max = feedRange.epkMaxHeader ? feedRange.epkMaxHeader : feedRange.maxExclusive;
        const queryRange = new index_js_1.QueryRange(min, max, true, false);
        const resolvedRanges = await this.partitionKeyRangeCache.getOverlappingRanges(this.url, queryRange, diagnosticNode, false);
        if (resolvedRanges.length < 1) {
            throw new index_js_3.ErrorResponse("No overlapping ranges found.");
        }
        const firstResolvedRange = resolvedRanges[0];
        const isPartitionRangeChanged = feedRange.minInclusive !== firstResolvedRange.minInclusive ||
            feedRange.maxExclusive !== firstResolvedRange.maxExclusive ||
            resolvedRanges.length > 1;
        // If the partition range is changed, we need to handle split/merge
        if (isPartitionRangeChanged) {
            await this.handleSplitOrMerge(true, resolvedRanges, queryRange, feedRange.continuationToken);
        }
        return firstResolvedRange.id;
    }
    async getFeedResponse(feedRange, diagnosticNode) {
        const feedOptions = {
            initialHeaders: {},
            useLatestVersionFeed: true,
            useAllVersionsAndDeletesFeed: false,
        };
        if (typeof this.changeFeedOptions.maxItemCount === "number") {
            feedOptions.maxItemCount = this.changeFeedOptions.maxItemCount;
        }
        if (this.changeFeedOptions.sessionToken) {
            feedOptions.sessionToken = this.changeFeedOptions.sessionToken;
        }
        if (feedRange.continuationToken) {
            feedOptions.accessCondition = {
                type: index_js_2.Constants.HttpHeaders.IfNoneMatch,
                condition: feedRange.continuationToken,
            };
        }
        else if (this.startFromNow) {
            feedOptions.initialHeaders[index_js_2.Constants.HttpHeaders.IfNoneMatch] =
                index_js_2.Constants.ChangeFeedIfNoneMatchStartFromNowHeader;
        }
        if (this.startTime) {
            feedOptions.initialHeaders[index_js_2.Constants.HttpHeaders.IfModifiedSince] = this.startTime;
        }
        if (this.changeFeedOptions.changeFeedMode &&
            this.changeFeedOptions.changeFeedMode === ChangeFeedMode_js_1.ChangeFeedMode.AllVersionsAndDeletes) {
            feedOptions.useAllVersionsAndDeletesFeed = true;
            feedOptions.useLatestVersionFeed = false;
        }
        const rangeId = await this.getPartitionRangeId(feedRange, diagnosticNode);
        if (this.clientContext.enableEncryption) {
            await this.container.checkAndInitializeEncryption();
            feedOptions.containerRid = this.container._rid;
        }
        try {
            // startEpk and endEpk are only valid in case we want to fetch result for a part of partition and not the entire partition.
            const finalFeedRange = this.fetchFinalFeedRange();
            const response = await this.clientContext.queryFeed({
                path: this.resourceLink,
                resourceType: index_js_2.ResourceType.item,
                resourceId: this.resourceId,
                resultFn: (result) => (result ? result.Documents : []),
                query: undefined,
                options: feedOptions,
                diagnosticNode,
                partitionKey: undefined,
                partitionKeyRangeId: rangeId,
                startEpk: finalFeedRange.epkMinHeader,
                endEpk: finalFeedRange.epkMaxHeader,
            });
            return new ChangeFeedIteratorResponse_js_1.ChangeFeedIteratorResponse(response.result, response.result ? response.result.length : 0, response.code, response.headers, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }
        catch (err) {
            // If partition split/merge is encountered, handle it gracefully and continue fetching results.
            if (err.code === index_js_2.StatusCodes.Gone) {
                return new ChangeFeedIteratorResponse_js_1.ChangeFeedIteratorResponse([], 0, err.code, err.headers, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)(), err.substatus);
            }
            // If any other errors are encountered, throw the error.
            const errorResponse = new index_js_3.ErrorResponse(err.message);
            errorResponse.code = err.code;
            errorResponse.headers = err.headers;
            throw errorResponse;
        }
    }
    fetchFinalFeedRange() {
        // this is used to fetch the final feed range before making a call to fetch the results.
        // In case of merge, the final updated feed range is present in the queue and needs to be returned.
        const feedRange = this.queue.peek();
        if (feedRange) {
            return feedRange;
        }
        else {
            throw new index_js_3.ErrorResponse("No feed range found.");
        }
    }
}
exports.ChangeFeedForEpkRange = ChangeFeedForEpkRange;
//# sourceMappingURL=ChangeFeedForEpkRange.js.map