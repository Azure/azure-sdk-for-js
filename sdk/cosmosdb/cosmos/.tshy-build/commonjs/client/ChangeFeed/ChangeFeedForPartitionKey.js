"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedForPartitionKey = void 0;
const tslib_1 = require("tslib");
const ChangeFeedIteratorResponse_js_1 = require("./ChangeFeedIteratorResponse.js");
const index_js_1 = require("../../common/index.js");
const index_js_2 = require("../../request/index.js");
const ContinuationTokenForPartitionKey_js_1 = require("./ContinuationTokenForPartitionKey.js");
const index_js_3 = require("../../documents/index.js");
const diagnostics_js_1 = require("../../utils/diagnostics.js");
const ChangeFeedMode_js_1 = require("./ChangeFeedMode.js");
const changeFeedUtils_js_1 = require("./changeFeedUtils.js");
/**
 * @hidden
 * Provides iterator for change feed for one partition key.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
class ChangeFeedForPartitionKey {
    /**
     * @internal
     */
    constructor(clientContext, container, resourceId, resourceLink, partitionKey, changeFeedOptions) {
        this.clientContext = clientContext;
        this.container = container;
        this.resourceId = resourceId;
        this.resourceLink = resourceLink;
        this.partitionKey = partitionKey;
        this.changeFeedOptions = changeFeedOptions;
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
    async instantiateIterator(diagnosticNode) {
        await this.setIteratorRid(diagnosticNode);
        if (this.clientContext.enableEncryption) {
            await this.container.checkAndInitializeEncryption();
            // returns copy of object to avoid encryption of original partition key passed
            this.partitionKey = (0, index_js_1.copyObject)(this.partitionKey);
            diagnosticNode.beginEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation);
            const { partitionKeyList, encryptedCount } = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue((0, index_js_3.convertToInternalPartitionKey)(this.partitionKey));
            this.partitionKey = partitionKeyList;
            diagnosticNode.endEncryptionDiagnostics(index_js_1.Constants.Encryption.DiagnosticsEncryptOperation, encryptedCount);
        }
        if (this.continuationToken) {
            if (!this.continuationTokenRidMatchContainerRid()) {
                throw new index_js_2.ErrorResponse("The continuation is not for the current container definition.");
            }
        }
        else {
            this.continuationToken = new ContinuationTokenForPartitionKey_js_1.ContinuationTokenForPartitionKey(this.rId, this.partitionKey, "");
        }
        this.isInstantiated = true;
    }
    continuationTokenRidMatchContainerRid() {
        if (this.continuationToken.rid !== this.rId) {
            return false;
        }
        return true;
    }
    async setIteratorRid(diagnosticNode) {
        const { resource } = await this.container.readInternal(diagnosticNode);
        this.rId = resource._rid;
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
     * Returns the result of change feed from Azure Cosmos DB.
     */
    async readNext() {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            if (!this.isInstantiated) {
                await this.instantiateIterator(diagnosticNode);
            }
            const result = await this.fetchNext(diagnosticNode);
            if (result.statusCode === index_js_1.StatusCodes.Ok) {
                if (this.clientContext.enableEncryption) {
                    await (0, changeFeedUtils_js_1.decryptChangeFeedResponse)(result, diagnosticNode, this.changeFeedOptions.changeFeedMode, this.container.encryptionProcessor);
                }
            }
            return result;
        }, this.clientContext);
    }
    /**
     * Read feed and retrieves the next set of results in Azure Cosmos DB.
     */
    async fetchNext(diagnosticNode) {
        const response = await this.getFeedResponse(diagnosticNode);
        this.continuationToken.Continuation = response.headers[index_js_1.Constants.HttpHeaders.ETag];
        response.headers[index_js_1.Constants.HttpHeaders.ContinuationToken] = JSON.stringify(this.continuationToken);
        return response;
    }
    async getFeedResponse(diagnosticNode) {
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
        const continuation = this.continuationToken.Continuation;
        if (continuation) {
            feedOptions.accessCondition = {
                type: index_js_1.Constants.HttpHeaders.IfNoneMatch,
                condition: continuation,
            };
        }
        else if (this.startFromNow) {
            feedOptions.initialHeaders[index_js_1.Constants.HttpHeaders.IfNoneMatch] =
                index_js_1.Constants.ChangeFeedIfNoneMatchStartFromNowHeader;
        }
        if (this.startTime) {
            feedOptions.initialHeaders[index_js_1.Constants.HttpHeaders.IfModifiedSince] = this.startTime;
        }
        if (this.changeFeedOptions.changeFeedMode &&
            this.changeFeedOptions.changeFeedMode === ChangeFeedMode_js_1.ChangeFeedMode.AllVersionsAndDeletes) {
            feedOptions.useAllVersionsAndDeletesFeed = true;
            feedOptions.useLatestVersionFeed = false;
        }
        if (this.clientContext.enableEncryption) {
            feedOptions.containerRid = this.container._rid;
        }
        try {
            const response = await this.clientContext.queryFeed({
                path: this.resourceLink,
                resourceType: index_js_1.ResourceType.item,
                resourceId: this.resourceId,
                resultFn: (result) => (result ? result.Documents : []),
                diagnosticNode,
                query: undefined,
                options: feedOptions,
                partitionKey: this.partitionKey,
            });
            return new ChangeFeedIteratorResponse_js_1.ChangeFeedIteratorResponse(response.result, response.result ? response.result.length : 0, response.code, response.headers, (0, diagnostics_js_1.getEmptyCosmosDiagnostics)());
        }
        catch (err) {
            // If any errors are encountered, throw the error.
            const errorResponse = new index_js_2.ErrorResponse(err.message);
            errorResponse.code = err.code;
            errorResponse.headers = err.headers;
            throw errorResponse;
        }
    }
}
exports.ChangeFeedForPartitionKey = ChangeFeedForPartitionKey;
//# sourceMappingURL=ChangeFeedForPartitionKey.js.map