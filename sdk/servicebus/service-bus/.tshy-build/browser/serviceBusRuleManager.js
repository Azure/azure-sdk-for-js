// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RetryOperationType, retry } from "@azure/core-amqp";
import { ruleManagerLogger as logger } from "./log.js";
import { isSqlRuleAction } from "./serializers/ruleResourceSerializer.js";
import { getUniqueName } from "./util/utils.js";
import { throwErrorIfConnectionClosed } from "./util/errors.js";
import { tracingClient } from "./diagnostics/tracing.js";
import { getPagedAsyncIterator } from "@azure/core-paging";
/**
 * @internal
 */
export class ServiceBusRuleManagerImpl {
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
        throwErrorIfConnectionClosed(_context);
        this.entityPath = _entityPath;
        this.name = getUniqueName("ruleManager");
    }
    get isClosed() {
        return this._isClosed || this._context.wasConnectionCloseCalled;
    }
    async createRule(ruleName, filter, ruleActionOrOperationOptions, options = {}) {
        let sqlRuleAction = undefined;
        let operOptions;
        if (ruleActionOrOperationOptions) {
            if (isSqlRuleAction(ruleActionOrOperationOptions)) {
                // Overload#2 - where the sqlExpression in the ruleAction is defined
                sqlRuleAction = ruleActionOrOperationOptions;
                operOptions = options;
            }
            else {
                // Overload#1 - where the sqlExpression in the ruleAction is undefined
                operOptions = Object.assign(Object.assign({}, ruleActionOrOperationOptions), options);
            }
        }
        return tracingClient.withSpan("ServiceBusRuleManager.createRule", operOptions !== null && operOptions !== void 0 ? operOptions : {}, async (updatedOptions) => {
            const addRuleOperationPromise = async () => {
                return this._context
                    .getManagementClient(this._entityPath)
                    .addRule(ruleName, filter, sqlRuleAction === null || sqlRuleAction === void 0 ? void 0 : sqlRuleAction.sqlExpression, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this.name, requestName: "addRule", timeoutInMs: this._retryOptions.timeoutInMs }));
            };
            const config = {
                operation: addRuleOperationPromise,
                connectionId: this._context.connectionId,
                operationType: RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.abortSignal,
            };
            return retry(config);
        });
    }
    /**
     * Get all rules associated with the subscription.
     */
    async getRules(options) {
        return tracingClient.withSpan("ServiceBusRuleManager.getRules", options !== null && options !== void 0 ? options : {}, async (updatedOptions) => {
            const getRulesOperationPromise = async () => {
                return this._context.getManagementClient(this._entityPath).getRules(Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this.name, requestName: "getRules", timeoutInMs: this._retryOptions.timeoutInMs }));
            };
            const config = {
                operation: getRulesOperationPromise,
                connectionId: this._context.connectionId,
                operationType: RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.abortSignal,
            };
            return retry(config);
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
        logger.verbose(`Performing operation - listRules() with options: %j`, options);
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
        return getPagedAsyncIterator(pagedResult);
    }
    /**
     * Deletes a rule.
     */
    async deleteRule(ruleName, options = {}) {
        return tracingClient.withSpan("ServiceBusRuleManager.deleteRule", options, async (updatedOptions) => {
            const removeRuleOperationPromise = async () => {
                return this._context.getManagementClient(this._entityPath).removeRule(ruleName, Object.assign(Object.assign({}, updatedOptions), { associatedLinkName: this.name, requestName: "removeRule", timeoutInMs: this._retryOptions.timeoutInMs }));
            };
            const config = {
                operation: removeRuleOperationPromise,
                connectionId: this._context.connectionId,
                operationType: RetryOperationType.management,
                retryOptions: this._retryOptions,
                abortSignal: updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.abortSignal,
            };
            return retry(config);
        });
    }
}
//# sourceMappingURL=serviceBusRuleManager.js.map