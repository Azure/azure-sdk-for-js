import type { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs.js";
import type { ConnectionContext } from "./connectionContext.js";
import type { RetryOptions } from "@azure/core-amqp";
import type { CorrelationRuleFilter } from "./core/managementClient.js";
import type { RuleProperties, SqlRuleAction } from "./serializers/ruleResourceSerializer.js";
import type { SqlRuleFilter } from "./serializers/ruleResourceSerializer.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { OperationOptions } from "@azure/core-client";
/**
 * Allows rules for a subscription to be managed. This rule manager requires only Listen claims, whereas the
 * {@link ServiceBusAdministrationClient} requires Manage claims.
 */
export interface ServiceBusRuleManager {
    /**
     * Adds a rule to the current subscription to filter the messages reaching from topic to the subscription.
     *
     * @param ruleName - the name of the rule
     * @param filter - the filter expression that the rule evaluates.
     * @param options - The options that can be used to abort, trace and control other configurations on the request.
     */
    createRule(ruleName: string, filter: SqlRuleFilter | CorrelationRuleFilter, options?: OperationOptionsBase): Promise<void>;
    /**
     * Adds a rule to the current subscription to filter the messages reaching from topic to the subscription.
     *
     * @param ruleName - the name of the rule
     * @param filter - the filter expression that the rule evaluates.
     * @param ruleAction - The SQL like expression that can be executed on the message should the associated filter apply.
     * @param options - The options that can be used to abort, trace and control other configurations on the request.
     */
    createRule(ruleName: string, filter: SqlRuleFilter | CorrelationRuleFilter, ruleAction?: SqlRuleAction, options?: OperationOptionsBase): Promise<void>;
    /**
     * Deletes a rule.
     *
     * @param ruleName - the name of the rule
     */
    deleteRule(ruleName: string, options?: OperationOptionsBase): Promise<void>;
    /**
     * Returns an async iterable iterator to list all the rules
     * under the specified subscription.
     *
     * .byPage() returns an async iterable iterator to list the rules in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listRules(options?: OperationOptions): PagedAsyncIterableIterator<RuleProperties>;
}
/**
 * @internal
 */
export declare class ServiceBusRuleManagerImpl implements ServiceBusRuleManager {
    private _context;
    private _entityPath;
    private _retryOptions;
    /**
     * Denotes if close() was called on this sender
     */
    private _isClosed;
    private name;
    entityPath: string;
    /**
     * @internal
     * @throws Error if the underlying connection is closed.
     */
    constructor(_context: ConnectionContext, _entityPath: string, _retryOptions?: RetryOptions);
    get isClosed(): boolean;
    /**
     * Adds a rule to the current subscription to filter the messages reaching from topic to the subscription.
     *
     * @param ruleName - the name of the rule
     * @param filter - the filter expression that the rule evaluates.
     * @param options - The options that can be used to abort, trace and control other configurations on the request.
     */
    createRule(ruleName: string, filter: SqlRuleFilter | CorrelationRuleFilter, options?: OperationOptions): Promise<void>;
    /**
     * Adds a rule to the current subscription to filter the messages reaching from topic to the subscription.
     *
     * @param ruleName - the name of the rule
     * @param filter - the filter expression that the rule evaluates.
     * @param ruleAction - The SQL like expression that can be executed on the message should the associated filter apply.
     * @param options - The options that can be used to abort, trace and control other configurations on the request.
     */
    createRule(ruleName: string, filter: SqlRuleFilter | CorrelationRuleFilter, ruleAction?: SqlRuleAction, options?: OperationOptions): Promise<void>;
    /**
     * Get all rules associated with the subscription.
     */
    private getRules;
    /**
     * Returns an async iterable iterator to list all the rules
     * under the specified subscription.
     *
     * .byPage() returns an async iterable iterator to list the rules in pages.
     *
     * @returns An asyncIterableIterator that supports paging.
     */
    listRules(options?: OperationOptions): PagedAsyncIterableIterator<RuleProperties, RuleProperties[], {
        maxPageSize?: number;
    }>;
    /**
     * Deletes a rule.
     */
    deleteRule(ruleName: string, options?: OperationOptions): Promise<void>;
}
//# sourceMappingURL=serviceBusRuleManager.d.ts.map