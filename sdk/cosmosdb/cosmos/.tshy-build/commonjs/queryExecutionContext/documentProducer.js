"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentProducer = void 0;
const index_js_1 = require("../common/index.js");
const defaultQueryExecutionContext_js_1 = require("./defaultQueryExecutionContext.js");
const FetchResult_js_1 = require("./FetchResult.js");
const headerUtils_js_1 = require("./headerUtils.js");
/** @hidden */
class DocumentProducer {
    /**
     * Provides the Target Partition Range Query Execution Context.
     * @param clientContext  - The service endpoint to use to create the client.
     * @param collectionLink - Represents collection link
     * @param query          - A SQL query.
     * @param targetPartitionKeyRange - Query Target Partition key Range
     * @hidden
     */
    constructor(clientContext, collectionLink, query, targetPartitionKeyRange, options, correlatedActivityId, startEpk, endEpk, populateEpkRangeHeaders = false) {
        this.clientContext = clientContext;
        this.generation = 0;
        this.fetchFunction = async (diagnosticNode, options, correlatedActivityId) => {
            const path = (0, index_js_1.getPathFromLink)(this.collectionLink, index_js_1.ResourceType.item);
            diagnosticNode.addData({ partitionKeyRangeId: this.targetPartitionKeyRange.id });
            const id = (0, index_js_1.getIdFromLink)(this.collectionLink);
            const startEpk = this.populateEpkRangeHeaders ? this.startEpk : undefined;
            const endEpk = this.populateEpkRangeHeaders ? this.endEpk : undefined;
            return this.clientContext.queryFeed({
                path,
                resourceType: index_js_1.ResourceType.item,
                resourceId: id,
                resultFn: (result) => result.Documents,
                query: this.query,
                options,
                diagnosticNode,
                partitionKeyRangeId: this.targetPartitionKeyRange["id"],
                correlatedActivityId: correlatedActivityId,
                startEpk: startEpk,
                endEpk: endEpk,
            });
        };
        // TODO: any options
        this.collectionLink = collectionLink;
        this.query = query;
        this.targetPartitionKeyRange = targetPartitionKeyRange;
        this.fetchResults = [];
        this.allFetched = false;
        this.err = undefined;
        this.previousContinuationToken = undefined;
        this.continuationToken = undefined;
        this.respHeaders = (0, headerUtils_js_1.getInitialHeader)();
        this.internalExecutionContext = new defaultQueryExecutionContext_js_1.DefaultQueryExecutionContext(options, this.fetchFunction, correlatedActivityId);
        this.startEpk = startEpk;
        this.endEpk = endEpk;
        this.populateEpkRangeHeaders = populateEpkRangeHeaders;
    }
    peekBufferedItems() {
        const bufferedResults = [];
        for (let i = 0, done = false; i < this.fetchResults.length && !done; i++) {
            const fetchResult = this.fetchResults[i];
            switch (fetchResult.fetchResultType) {
                case FetchResult_js_1.FetchResultType.Done:
                    done = true;
                    break;
                case FetchResult_js_1.FetchResultType.Exception:
                    done = true;
                    break;
                case FetchResult_js_1.FetchResultType.Result:
                    bufferedResults.push(fetchResult.feedResponse);
                    break;
            }
        }
        return bufferedResults;
    }
    hasMoreResults() {
        return this.internalExecutionContext.hasMoreResults() || this.fetchResults.length !== 0;
    }
    gotSplit() {
        if (this.fetchResults.length !== 0) {
            const fetchResult = this.fetchResults[0];
            if (fetchResult.fetchResultType === FetchResult_js_1.FetchResultType.Exception) {
                if (DocumentProducer._needPartitionKeyRangeCacheRefresh(fetchResult.error)) {
                    return true;
                }
            }
        }
        return false;
    }
    _getAndResetActiveResponseHeaders() {
        const ret = this.respHeaders;
        this.respHeaders = (0, headerUtils_js_1.getInitialHeader)();
        return ret;
    }
    _updateStates(err, allFetched) {
        if (err) {
            this.err = err;
            return;
        }
        if (allFetched) {
            this.allFetched = true;
        }
        if (this.internalExecutionContext.continuationToken === this.continuationToken) {
            // nothing changed
            return;
        }
        this.previousContinuationToken = this.continuationToken;
        this.continuationToken = this.internalExecutionContext.continuationToken;
    }
    static _needPartitionKeyRangeCacheRefresh(error) {
        // TODO: error
        return (error.code === index_js_1.StatusCodes.Gone &&
            "substatus" in error &&
            error["substatus"] === index_js_1.SubStatusCodes.PartitionKeyRangeGone);
    }
    /**
     * Fetches and bufferes the next page of results in internal buffer
     */
    async bufferMore(diagnosticNode) {
        if (this.err) {
            throw this.err;
        }
        try {
            const { result: resources, headers: headerResponse } = await this.internalExecutionContext.fetchMore(diagnosticNode);
            ++this.generation;
            this._updateStates(undefined, resources === undefined);
            if (resources !== undefined) {
                // add fetched header to the 1st element in the buffer
                let addHeaderToFetchResult = true;
                resources.forEach((element) => {
                    this.fetchResults.push(new FetchResult_js_1.FetchResult(element, undefined, addHeaderToFetchResult ? headerResponse : (0, headerUtils_js_1.getInitialHeader)()));
                    addHeaderToFetchResult = false;
                });
            }
            // need to modify the header response so that the query metrics are per partition
            if (headerResponse != null && index_js_1.Constants.HttpHeaders.QueryMetrics in headerResponse) {
                // "0" is the default partition before one is actually assigned.
                const queryMetrics = headerResponse[index_js_1.Constants.HttpHeaders.QueryMetrics]["0"];
                // Wraping query metrics in a object where the keys are the partition key range.
                headerResponse[index_js_1.Constants.HttpHeaders.QueryMetrics] = {};
                headerResponse[index_js_1.Constants.HttpHeaders.QueryMetrics][this.targetPartitionKeyRange.id] =
                    queryMetrics;
            }
            (0, headerUtils_js_1.mergeHeaders)(this.respHeaders, headerResponse);
        }
        catch (err) {
            if (DocumentProducer._needPartitionKeyRangeCacheRefresh(err)) {
                // Split just happend
                // Buffer the error so the execution context can still get the feedResponses in the itemBuffer
                const bufferedError = new FetchResult_js_1.FetchResult(undefined, err);
                this.fetchResults.push(bufferedError);
                (0, headerUtils_js_1.mergeHeaders)(this.respHeaders, err.headers);
            }
            else {
                this._updateStates(err, err.resources === undefined);
                throw err;
            }
        }
    }
    getTargetParitionKeyRange() {
        return this.targetPartitionKeyRange;
    }
    /**
     * Peak the next item in the buffer
     */
    peakNextItem() {
        if (this.err) {
            throw this.err;
        }
        if (this.allFetched || this.fetchResults.length === 0) {
            return undefined;
        }
        const fetchResult = this.fetchResults[0];
        switch (fetchResult.fetchResultType) {
            case FetchResult_js_1.FetchResultType.Done:
                return undefined;
            case FetchResult_js_1.FetchResultType.Exception: // do not throw this error
                return undefined;
            case FetchResult_js_1.FetchResultType.Result:
                return fetchResult.feedResponse;
        }
    }
    /**
     * Returns the first item in the buffered results if any, or [] otherwise.
     */
    async fetchNextItem() {
        if (this.err) {
            this._updateStates(this.err, undefined);
            throw this.err;
        }
        if (this.allFetched) {
            return { result: undefined, headers: this._getAndResetActiveResponseHeaders() };
        }
        try {
            const { result, headers } = this.current();
            this._updateStates(undefined, result === undefined);
            if (result === undefined || result.length === 0) {
                return { result: undefined, headers };
            }
            return { result, headers }; //
        }
        catch (err) {
            this._updateStates(err, err.item === undefined);
            throw err;
        }
    }
    /**
     * Fetches all the buffered results
     */
    async fetchBufferedItems() {
        if (this.err) {
            this._updateStates(this.err, undefined);
            throw this.err;
        }
        if (this.allFetched) {
            return { result: undefined, headers: this._getAndResetActiveResponseHeaders() };
        }
        const resources = [];
        const resHeaders = (0, headerUtils_js_1.getInitialHeader)();
        try {
            while (this.fetchResults.length > 0) {
                const { result, headers } = this.current();
                this._updateStates(undefined, result === undefined);
                (0, headerUtils_js_1.mergeHeaders)(resHeaders, headers);
                if (result === undefined) {
                    return { result: resources.length > 0 ? resources : undefined, headers: resHeaders };
                }
                else {
                    resources.push(result);
                }
            }
            return { result: resources, headers: resHeaders };
        }
        catch (err) {
            this._updateStates(err, err.item === undefined);
            throw err;
        }
    }
    /**
     * Retrieve the current element on the DocumentProducer.
     */
    current() {
        // If something is buffered just give that
        if (this.fetchResults.length > 0) {
            const fetchResult = this.fetchResults.shift();
            // Need to unwrap fetch results
            switch (fetchResult.fetchResultType) {
                case FetchResult_js_1.FetchResultType.Done:
                    return {
                        result: undefined,
                        headers: this._getAndResetActiveResponseHeaders(),
                    };
                case FetchResult_js_1.FetchResultType.Exception:
                    fetchResult.error.headers = this._getAndResetActiveResponseHeaders();
                    throw fetchResult.error;
                case FetchResult_js_1.FetchResultType.Result:
                    return {
                        result: fetchResult.feedResponse,
                        headers: this._getAndResetActiveResponseHeaders(),
                    };
            }
        }
        // If there isn't anymore items left to fetch then let the user know.
        if (this.allFetched) {
            return {
                result: undefined,
                headers: this._getAndResetActiveResponseHeaders(),
            };
        }
        // If the internal buffer is empty, return empty result
        return { result: [], headers: this._getAndResetActiveResponseHeaders() };
    }
}
exports.DocumentProducer = DocumentProducer;
//# sourceMappingURL=documentProducer.js.map