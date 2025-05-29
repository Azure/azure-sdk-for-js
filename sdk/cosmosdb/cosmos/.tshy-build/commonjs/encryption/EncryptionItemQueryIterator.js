"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionItemQueryIterator = void 0;
const tslib_1 = require("tslib");
const constants_js_1 = require("../common/constants.js");
const DiagnosticNodeInternal_js_1 = require("../diagnostics/DiagnosticNodeInternal.js");
const queryIterator_js_1 = require("../queryIterator.js");
const diagnostics_js_1 = require("../utils/diagnostics.js");
/**
 * @internal
 * Provides the iterator for handling encrypted items in the Azure Cosmos DB database service.
 * extends @see {@link QueryIterator}
 */
class EncryptionItemQueryIterator extends queryIterator_js_1.QueryIterator {
    constructor(clientContext, query, options, fetchFunctions, container) {
        super(clientContext, query, options, fetchFunctions, container.url, constants_js_1.ResourceType.item);
        this.container = container;
        this.encryptionClientContext = clientContext;
        this.encryptionOptions = options;
    }
    /**
     * Gets an async iterator that will yield results until completion.
     */
    getAsyncIterator() {
        return tslib_1.__asyncGenerator(this, arguments, function* getAsyncIterator_1() {
            var _a;
            let response;
            const diagnosticNode = new DiagnosticNodeInternal_js_1.DiagnosticNodeInternal(this.encryptionClientContext.diagnosticLevel, DiagnosticNodeInternal_js_1.DiagnosticNodeType.CLIENT_REQUEST_NODE, null);
            try {
                response = yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(queryIterator_js_1.QueryIterator.prototype.getAsyncIteratorInternal.call(this, diagnosticNode))));
            }
            catch (error) {
                yield tslib_1.__await(this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error));
            }
            if (((_a = response === null || response === void 0 ? void 0 : response.resources) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                let count = 0;
                diagnosticNode.beginEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                for (let resource of response.resources) {
                    const { body, propertiesDecryptedCount } = yield tslib_1.__await(this.container.encryptionProcessor.decrypt(resource));
                    resource = body;
                    count += propertiesDecryptedCount;
                }
                diagnosticNode.endEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsDecryptOperation, count);
            }
            yield yield tslib_1.__await(response);
        });
    }
    /**
     * Fetch all pages for the query and return a single FeedResponse.
     */
    async fetchAll() {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            var _a;
            let response;
            try {
                response = await queryIterator_js_1.QueryIterator.prototype.fetchAllInternal.call(this, diagnosticNode);
            }
            catch (error) {
                await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
            }
            if (((_a = response === null || response === void 0 ? void 0 : response.resources) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                let count = 0;
                diagnosticNode.beginEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                for (let resource of response.resources) {
                    const { body, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(resource);
                    resource = body;
                    count += propertiesDecryptedCount;
                }
                diagnosticNode.endEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsDecryptOperation, count);
            }
            return response;
        }, this.encryptionClientContext);
    }
    /**
     * Retrieve the next batch from the feed.
     */
    async fetchNext() {
        return (0, diagnostics_js_1.withDiagnostics)(async (diagnosticNode) => {
            var _a;
            let response;
            try {
                response = await queryIterator_js_1.QueryIterator.prototype.fetchNextInternal.call(this, diagnosticNode);
            }
            catch (error) {
                await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
            }
            if (((_a = response === null || response === void 0 ? void 0 : response.resources) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                let count = 0;
                diagnosticNode.beginEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsDecryptOperation);
                for (let resource of response.resources) {
                    const { body, propertiesDecryptedCount } = await this.container.encryptionProcessor.decrypt(resource);
                    resource = body;
                    count += propertiesDecryptedCount;
                }
                diagnosticNode.endEncryptionDiagnostics(constants_js_1.Constants.Encryption.DiagnosticsDecryptOperation, count);
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
        await queryIterator_js_1.QueryIterator.prototype.init.call(this, diagnosticNode);
    }
}
exports.EncryptionItemQueryIterator = EncryptionItemQueryIterator;
//# sourceMappingURL=EncryptionItemQueryIterator.js.map