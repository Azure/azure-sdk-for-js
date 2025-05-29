import { __asyncGenerator, __await } from "tslib";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse.js";
import { Constants, copyObject, ResourceType, StatusCodes } from "../../common/index.js";
import { ErrorResponse } from "../../request/index.js";
import { ContinuationTokenForPartitionKey } from "./ContinuationTokenForPartitionKey.js";
import { convertToInternalPartitionKey } from "../../documents/index.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
import { ChangeFeedMode } from "./ChangeFeedMode.js";
import { decryptChangeFeedResponse } from "./changeFeedUtils.js";
/**
 * @hidden
 * Provides iterator for change feed for one partition key.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
export class ChangeFeedForPartitionKey {
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
            this.partitionKey = copyObject(this.partitionKey);
            diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsEncryptOperation);
            const { partitionKeyList, encryptedCount } = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(convertToInternalPartitionKey(this.partitionKey));
            this.partitionKey = partitionKeyList;
            diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsEncryptOperation, encryptedCount);
        }
        if (this.continuationToken) {
            if (!this.continuationTokenRidMatchContainerRid()) {
                throw new ErrorResponse("The continuation is not for the current container definition.");
            }
        }
        else {
            this.continuationToken = new ContinuationTokenForPartitionKey(this.rId, this.partitionKey, "");
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
        return __asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            do {
                const result = yield __await(this.readNext());
                yield yield __await(result);
            } while (this.hasMoreResults);
        });
    }
    /**
     * Returns the result of change feed from Azure Cosmos DB.
     */
    async readNext() {
        return withDiagnostics(async (diagnosticNode) => {
            if (!this.isInstantiated) {
                await this.instantiateIterator(diagnosticNode);
            }
            const result = await this.fetchNext(diagnosticNode);
            if (result.statusCode === StatusCodes.Ok) {
                if (this.clientContext.enableEncryption) {
                    await decryptChangeFeedResponse(result, diagnosticNode, this.changeFeedOptions.changeFeedMode, this.container.encryptionProcessor);
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
        this.continuationToken.Continuation = response.headers[Constants.HttpHeaders.ETag];
        response.headers[Constants.HttpHeaders.ContinuationToken] = JSON.stringify(this.continuationToken);
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
                type: Constants.HttpHeaders.IfNoneMatch,
                condition: continuation,
            };
        }
        else if (this.startFromNow) {
            feedOptions.initialHeaders[Constants.HttpHeaders.IfNoneMatch] =
                Constants.ChangeFeedIfNoneMatchStartFromNowHeader;
        }
        if (this.startTime) {
            feedOptions.initialHeaders[Constants.HttpHeaders.IfModifiedSince] = this.startTime;
        }
        if (this.changeFeedOptions.changeFeedMode &&
            this.changeFeedOptions.changeFeedMode === ChangeFeedMode.AllVersionsAndDeletes) {
            feedOptions.useAllVersionsAndDeletesFeed = true;
            feedOptions.useLatestVersionFeed = false;
        }
        if (this.clientContext.enableEncryption) {
            feedOptions.containerRid = this.container._rid;
        }
        try {
            const response = await this.clientContext.queryFeed({
                path: this.resourceLink,
                resourceType: ResourceType.item,
                resourceId: this.resourceId,
                resultFn: (result) => (result ? result.Documents : []),
                diagnosticNode,
                query: undefined,
                options: feedOptions,
                partitionKey: this.partitionKey,
            });
            return new ChangeFeedIteratorResponse(response.result, response.result ? response.result.length : 0, response.code, response.headers, getEmptyCosmosDiagnostics());
        }
        catch (err) {
            // If any errors are encountered, throw the error.
            const errorResponse = new ErrorResponse(err.message);
            errorResponse.code = err.code;
            errorResponse.headers = err.headers;
            throw errorResponse;
        }
    }
}
//# sourceMappingURL=ChangeFeedForPartitionKey.js.map