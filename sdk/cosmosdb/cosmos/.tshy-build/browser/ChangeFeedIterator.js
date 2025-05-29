import { __asyncGenerator, __await } from "tslib";
import { ChangeFeedResponse } from "./ChangeFeedResponse.js";
import { Constants, ResourceType, StatusCodes } from "./common/index.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "./utils/diagnostics.js";
/**
 * Provides iterator for change feed.
 *
 * Use `Items.changeFeed()` to get an instance of the iterator.
 */
export class ChangeFeedIterator {
    /**
     * @internal
     */
    constructor(clientContext, resourceId, resourceLink, partitionKey, changeFeedOptions) {
        this.clientContext = clientContext;
        this.resourceId = resourceId;
        this.resourceLink = resourceLink;
        this.partitionKey = partitionKey;
        this.changeFeedOptions = changeFeedOptions;
        // partition key XOR partition key range id
        const partitionKeyValid = partitionKey !== undefined;
        this.isPartitionSpecified = partitionKeyValid;
        let canUseStartFromBeginning = true;
        if (changeFeedOptions.continuation) {
            this.nextIfNoneMatch = changeFeedOptions.continuation;
            canUseStartFromBeginning = false;
        }
        if (changeFeedOptions.startTime) {
            // .toUTCString() is platform specific, but most platforms use RFC 1123.
            // In ECMAScript 2018, this was standardized to RFC 1123.
            // See for more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
            this.ifModifiedSince = changeFeedOptions.startTime.toUTCString();
            canUseStartFromBeginning = false;
        }
        if (canUseStartFromBeginning && !changeFeedOptions.startFromBeginning) {
            this.nextIfNoneMatch = ChangeFeedIterator.IfNoneMatchAllHeaderValue;
        }
    }
    /**
     * Gets a value indicating whether there are potentially additional results that can be retrieved.
     *
     * Initially returns true. This value is set based on whether the last execution returned a continuation token.
     *
     * @returns Boolean value representing if whether there are potentially additional results that can be retrieved.
     */
    get hasMoreResults() {
        return this.lastStatusCode !== StatusCodes.NotModified;
    }
    /**
     * Gets an async iterator which will yield pages of results from Azure Cosmos DB.
     */
    getAsyncIterator() {
        return __asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            do {
                const result = yield __await(this.fetchNext());
                if (result.count > 0) {
                    yield yield __await(result);
                }
            } while (this.hasMoreResults);
        });
    }
    /**
     * Read feed and retrieves the next page of results in Azure Cosmos DB.
     */
    async fetchNext() {
        return withDiagnostics(async (diagnosticNode) => {
            const response = await this.getFeedResponse(diagnosticNode);
            this.lastStatusCode = response.statusCode;
            this.nextIfNoneMatch = response.headers[Constants.HttpHeaders.ETag];
            return response;
        }, this.clientContext);
    }
    async getFeedResponse(diagnosticNode) {
        if (!this.isPartitionSpecified) {
            throw new Error("Container is partitioned, but no partition key or partition key range id was specified.");
        }
        const feedOptions = { initialHeaders: {}, useIncrementalFeed: true };
        if (typeof this.changeFeedOptions.maxItemCount === "number") {
            feedOptions.maxItemCount = this.changeFeedOptions.maxItemCount;
        }
        if (this.changeFeedOptions.sessionToken) {
            feedOptions.sessionToken = this.changeFeedOptions.sessionToken;
        }
        if (this.nextIfNoneMatch) {
            feedOptions.accessCondition = {
                type: Constants.HttpHeaders.IfNoneMatch,
                condition: this.nextIfNoneMatch,
            };
        }
        if (this.ifModifiedSince) {
            feedOptions.initialHeaders[Constants.HttpHeaders.IfModifiedSince] = this.ifModifiedSince;
        }
        const response = await this.clientContext.queryFeed({
            path: this.resourceLink,
            resourceType: ResourceType.item,
            resourceId: this.resourceId,
            resultFn: (result) => (result ? result.Documents : []),
            query: undefined,
            options: feedOptions,
            partitionKey: this.partitionKey,
            diagnosticNode: diagnosticNode,
        }); // TODO: some funky issues with query feed. Probably need to change it up.
        return new ChangeFeedResponse(response.result, response.result ? response.result.length : 0, response.code, response.headers, getEmptyCosmosDiagnostics());
    }
}
ChangeFeedIterator.IfNoneMatchAllHeaderValue = "*";
//# sourceMappingURL=ChangeFeedIterator.js.map