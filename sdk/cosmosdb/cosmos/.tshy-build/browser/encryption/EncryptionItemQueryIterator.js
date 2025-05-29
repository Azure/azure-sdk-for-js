// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncDelegator, __asyncGenerator, __asyncValues, __await } from "tslib";
import { Constants, ResourceType } from "../common/constants.js";
import { DiagnosticNodeInternal, DiagnosticNodeType, } from "../diagnostics/DiagnosticNodeInternal.js";
import { QueryIterator } from "../queryIterator.js";
import { withDiagnostics } from "../utils/diagnostics.js";
/**
 * @internal
 * Provides the iterator for handling encrypted items in the Azure Cosmos DB database service.
 * extends @see {@link QueryIterator}
 */
export class EncryptionItemQueryIterator extends QueryIterator {
    constructor(clientContext, query, options, fetchFunctions, container) {
        super(clientContext, query, options, fetchFunctions, container.url, ResourceType.item);
        this.container = container;
        this.encryptionClientContext = clientContext;
        this.encryptionOptions = options;
    }
    /**
     * Gets an async iterator that will yield results until completion.
     */
    getAsyncIterator() {
        return __asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            var _a;
            let response;
            const diagnosticNode = new DiagnosticNodeInternal(this.encryptionClientContext.diagnosticLevel, DiagnosticNodeType.CLIENT_REQUEST_NODE, null);
            try {
                response = yield __await(yield* __asyncDelegator(__asyncValues(QueryIterator.prototype.getAsyncIteratorInternal.call(this, diagnosticNode))));
            }
            catch (error) {
                yield __await(this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error));
            }
            if (((_a = response === null || response === void 0 ? void 0 : response.resources) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                let count = 0;
                diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation);
                for (let resource of response.resources) {
                    const { body, propertiesDecryptedCount } = yield __await(this.container.encryptionProcessor.decrypt(resource));
                    resource = body;
                    count += propertiesDecryptedCount;
                }
                diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation, count);
            }
            yield yield __await(response);
        });
    }
    /**
     * Fetch all pages for the query and return a single FeedResponse.
     */
    async fetchAll() {
        return withDiagnostics(async (diagnosticNode) => {
            var _a;
            let response;
            try {
                response = await QueryIterator.prototype.fetchAllInternal.call(this, diagnosticNode);
            }
            catch (error) {
                await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
            }
            if (((_a = response === null || response === void 0 ? void 0 : response.resources) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                let count = 0;
                diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation);
                for (let resource of response.resources) {
                    const { body, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(resource);
                    resource = body;
                    count += propertiesDecryptedCount;
                }
                diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation, count);
            }
            return response;
        }, this.encryptionClientContext);
    }
    /**
     * Retrieve the next batch from the feed.
     */
    async fetchNext() {
        return withDiagnostics(async (diagnosticNode) => {
            var _a;
            let response;
            try {
                response = await QueryIterator.prototype.fetchNextInternal.call(this, diagnosticNode);
            }
            catch (error) {
                await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
            }
            if (((_a = response === null || response === void 0 ? void 0 : response.resources) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                let count = 0;
                diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation);
                for (let resource of response.resources) {
                    const { body, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(resource);
                    resource = body;
                    count += propertiesDecryptedCount;
                }
                diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation, count);
            }
            return response;
        }, this.encryptionClientContext);
    }
    /**
     * @internal
     */
    async init(diagnosticNode) {
        // Ensure encryption is initialized and set rid in options
        await this.container.checkAndInitializeEncryption();
        this.encryptionOptions.containerRid = this.container._rid;
        await QueryIterator.prototype.init.call(this, diagnosticNode);
    }
}
//# sourceMappingURL=EncryptionItemQueryIterator.js.map