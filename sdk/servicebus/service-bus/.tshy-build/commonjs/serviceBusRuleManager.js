"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBusRuleManagerImpl = void 0;
const core_amqp_1 = require("@azure/core-amqp");
const log_js_1 = require("./log.js");
const ruleResourceSerializer_js_1 = require("./serializers/ruleResourceSerializer.js");
const utils_js_1 = require("./util/utils.js");
const errors_js_1 = require("./util/errors.js");
const tracing_js_1 = require("./diagnostics/tracing.js");
const core_paging_1 = require("@azure/core-paging");
/**
 * @internal
 */
class ServiceBusRuleManagerImpl {
    /**
     * @internal
     * @throws Error if the underlying connection is closed.
     */
    constructor(_context, _entityPath, _retryOptions = {}) {
        this._context = _context;
        this._entityPath = _entityPath;
        this._retryOptions = _retryOptions;
        /**
         * Denotes if close() was called on this sender
         */
        this._isClosed = false;
        (0, errors_js_1.throwErrorIfConnectionClosed)(_context);
        this.entityPath = _entityPath;
        this.name = (0, utils_js_1.getUniqueName)("ruleManager");
    }
    get isClosed() {
        return this._isClosed || this._context.wasConnectionCloseCalled;
    }
    async createRule(ruleName, filter, ruleActionOrOperationOptions, options = {}) {
        let sqlRuleAction = undefined;
        let operOptions;
        if (ruleActionOrOperationOptions) {
            if ((0, ruleResourceSerializer_js_1.isSqlRuleAction)(ruleActionOrOperationOptions)) {
                // Overload#2 - where the sqlExpression in the ruleAction is defined
                sqlRuleAction = ruleActionOrOperationOptions;
                operOptions = options;
            }
            else {
                // Overload#1 - where the sqlExpression in the ruleAction is undefined
                operOptions = Object.assign(Object.assign({}, ruleActionOrOperationOptions), options);
            }
        }
        return tracing_js_1.tracingClient.withSpan("ServiceBusRuleManager.createRule", operOptions !== null && operOptions !== void 0 ? operOptions : {}, async (updatedOptions) => {
            const addRuleOperationPromise = async () => {
                return this._context
                    .getManagementClient(this._entityPath)
                    .addRule(ruleName, filter, sqlRuleAction === null || sqlRuleAction === void 0 ? void 0 : sqlRuleAction.sqlExpression, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this.name, requestName: "addRule", timeoutInMs: this._retryOptions.timeoutInMs }));
            };
            const config = {
                operation: addRuleOperationPromise,
                connectionId: this._context.connectionId,
                operationType: core_amqp_1.RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.abortSignal,
            };
            return (0, core_amqp_1.retry)(config);
        });
    }
    /**
     * Get all rules associated with the subscription.
     */
    async getRules(options) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusRuleManager.getRules", options !== null && options !== void 0 ? options : {}, async (updatedOptions) => {
            const getRulesOperationPromise = async () => {
                return this._context.getManagementClient(this._entityPath).getRules(Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this.name, requestName: "getRules", timeoutInMs: this._retryOptions.timeoutInMs }));
            };
            const config = {
                operation: getRulesOperationPromise,
                connectionId: this._context.connectionId,
                operationType: core_amqp_1.RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.abortSignal,
            };
            return (0, core_amqp_1.retry)(config);
        });
    }
    /**
     * Returns an async iterable iterator to list all the rules
     * under the specified subscription.
     *
     * .byPage() returns an async iterable iterator to list the rules in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listRules(options) {
        log_js_1.ruleManagerLogger.verbose(`Performing operation - listRules() with options: %j`, options);
        const pagedResult = {
            firstPageLink: 0,
            getPage: async (pageLink, maxPageSize) => {
                const top = maxPageSize !== null && maxPageSize !== void 0 ? maxPageSize : 100;
                const rules = await this.getRules(Object.assign({ skip: pageLink, maxCount: top }, options));
                return rules.length
                    ? {
                        page: rules,
                        nextPageLink: rules.length > 0 ? pageLink + rules.length : undefined,
                    }
                    : undefined;
            },
        };
        return (0, core_paging_1.getPagedAsyncIterator)(pagedResult);
    }
    /**
     * Deletes a rule.
     */
    async deleteRule(ruleName, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ServiceBusRuleManager.deleteRule", options, async (updatedOptions) => {
            const removeRuleOperationPromise = async () => {
                return this._context.getManagementClient(this._entityPath).removeRule(ruleName, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this.name, requestName: "removeRule", timeoutInMs: this._retryOptions.timeoutInMs }));
            };
            const config = {
                operation: removeRuleOperationPromise,
                connectionId: this._context.connectionId,
                operationType: core_amqp_1.RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.abortSignal,
            };
            return (0, core_amqp_1.retry)(config);
        });
    }
}
exports.ServiceBusRuleManagerImpl = ServiceBusRuleManagerImpl;
//# sourceMappingURL=serviceBusRuleManager.js.map