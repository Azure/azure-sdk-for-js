// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs";
import { ConnectionContext } from "./connectionContext";
import { RetryConfig, RetryOperationType, RetryOptions, retry } from "@azure/core-amqp";
import { CorrelationRuleFilter } from "./core/managementClient";
import { ruleManagerLogger as logger } from "./log";
import {
  isSqlRuleAction,
  RuleProperties,
  SqlRuleAction,
} from "./serializers/ruleResourceSerializer";
import { getUniqueName } from "./util/utils";
import { throwErrorIfConnectionClosed } from "./util/errors";
import { SqlRuleFilter } from "./serializers/ruleResourceSerializer";
import { tracingClient } from "./diagnostics/tracing";
import { getPagedAsyncIterator, PagedAsyncIterableIterator, PagedResult } from "@azure/core-paging";
import { OperationOptions } from "@azure/core-client";
import { ListRequestOptions } from "./serviceBusAtomManagementClient";

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
  createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    options?: OperationOptionsBase
  ): Promise<void>;
  /**
   * Adds a rule to the current subscription to filter the messages reaching from topic to the subscription.
   *
   * @param ruleName - the name of the rule
   * @param filter - the filter expression that the rule evaluates.
   * @param ruleAction - The SQL like expression that can be executed on the message should the associated filter apply.
   * @param options - The options that can be used to abort, trace and control other configurations on the request.
   */
  createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    ruleAction?: SqlRuleAction,
    options?: OperationOptionsBase
  ): Promise<void>;
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
  listRules(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<RuleProperties>;
}

/**
 * @internal
 */
export class ServiceBusRuleManagerImpl implements ServiceBusRuleManager {
  /**
   * Denotes if close() was called on this sender
   */
  private _isClosed: boolean = false;
  private name: string;
  public entityPath: string;

  /**
   * @internal
   * @throws Error if the underlying connection is closed.
   */
  constructor(
    private _context: ConnectionContext,
    private _entityPath: string,
    private _retryOptions: RetryOptions = {}
  ) {
    throwErrorIfConnectionClosed(_context);
    this.entityPath = _entityPath;
    this.name = getUniqueName("ruleManager");
  }

  public get isClosed(): boolean {
    return this._isClosed || this._context.wasConnectionCloseCalled;
  }

  /**
   * Adds a rule to the current subscription to filter the messages reaching from topic to the subscription.
   *
   * @param ruleName - the name of the rule
   * @param filter - the filter expression that the rule evaluates.
   * @param options - The options that can be used to abort, trace and control other configurations on the request.
   */
  createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    options?: OperationOptions
  ): Promise<void>;
  /**
   * Adds a rule to the current subscription to filter the messages reaching from topic to the subscription.
   *
   * @param ruleName - the name of the rule
   * @param filter - the filter expression that the rule evaluates.
   * @param ruleAction - The SQL like expression that can be executed on the message should the associated filter apply.
   * @param options - The options that can be used to abort, trace and control other configurations on the request.
   */
  createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    ruleAction?: SqlRuleAction,
    options?: OperationOptions
  ): Promise<void>;
  async createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    ruleActionOrOperationOptions?: SqlRuleAction | OperationOptionsBase,
    options: OperationOptions = {}
  ): Promise<void> {
    let sqlRuleAction: SqlRuleAction | undefined = undefined;
    let operOptions: OperationOptions | undefined;
    if (ruleActionOrOperationOptions) {
      if (isSqlRuleAction(ruleActionOrOperationOptions)) {
        // Overload#2 - where the sqlExpression in the ruleAction is defined
        sqlRuleAction = ruleActionOrOperationOptions;
        operOptions = options;
      } else {
        // Overload#1 - where the sqlExpression in the ruleAction is undefined
        operOptions = { ...ruleActionOrOperationOptions, ...options };
      }
    }

    return tracingClient.withSpan(
      "ServiceBusRuleManager.createRule",
      operOptions ?? {},
      async (updatedOptions) => {
        const addRuleOperationPromise = async (): Promise<void> => {
          return this._context
            .getManagementClient(this._entityPath)
            .addRule(ruleName, filter, sqlRuleAction?.sqlExpression, {
              ...updatedOptions,
              associatedLinkName: this.name,
              requestName: "addRule",
              timeoutInMs: this._retryOptions.timeoutInMs,
            });
        };
        const config: RetryConfig<void> = {
          operation: addRuleOperationPromise,
          connectionId: this._context.connectionId,
          operationType: RetryOperationType.management,
          retryOptions: this._retryOptions,
          abortSignal: updatedOptions?.abortSignal,
        };
        return retry<void>(config);
      }
    );
  }

  /**
   * Get all rules associated with the subscription.
   */
  private async getRules(
    options?: ListRequestOptions & OperationOptions
  ): Promise<RuleProperties[]> {
    return tracingClient.withSpan(
      "ServiceBusRuleManager.getRules",
      options ?? {},
      async (updatedOptions) => {
        const getRulesOperationPromise = async (): Promise<RuleProperties[]> => {
          return this._context.getManagementClient(this._entityPath).getRules({
            ...updatedOptions,
            associatedLinkName: this.name,
            requestName: "getRules",
            timeoutInMs: this._retryOptions.timeoutInMs,
          });
        };
        const config: RetryConfig<RuleProperties[]> = {
          operation: getRulesOperationPromise,
          connectionId: this._context.connectionId,
          operationType: RetryOperationType.management,
          retryOptions: this._retryOptions,
          abortSignal: updatedOptions?.abortSignal,
        };
        return retry<RuleProperties[]>(config);
      }
    );
  }

  /**
   * Returns an async iterable iterator to list all the rules
   * under the specified subscription.
   *
   * .byPage() returns an async iterable iterator to list the rules in pages.
   *
   * @returns An asyncIterableIterator that supports paging.
   */
  public listRules(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): PagedAsyncIterableIterator<RuleProperties, RuleProperties[], { maxPageSize?: number }> {
    logger.verbose(`Performing operation - listRules() with options: %j`, options);
    const pagedResult: PagedResult<RuleProperties[], { maxPageSize?: number }, number> = {
      firstPageLink: 0,
      getPage: async (pageLink, maxPageSize) => {
        const top = maxPageSize ?? 100;
        const rules = await this.getRules({
          skip: pageLink,
          maxCount: top,
          ...options,
        });
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
  async deleteRule(ruleName: string, options: OperationOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "ServiceBusRuleManager.deleteRule",
      options,
      async (updatedOptions) => {
        const removeRuleOperationPromise = async (): Promise<void> => {
          return this._context.getManagementClient(this._entityPath).removeRule(ruleName, {
            ...updatedOptions,
            associatedLinkName: this.name,
            requestName: "removeRule",
            timeoutInMs: this._retryOptions.timeoutInMs,
          });
        };
        const config: RetryConfig<void> = {
          operation: removeRuleOperationPromise,
          connectionId: this._context.connectionId,
          operationType: RetryOperationType.management,
          retryOptions: this._retryOptions,
          abortSignal: updatedOptions?.abortSignal,
        };
        return retry<void>(config);
      }
    );
  }
}
