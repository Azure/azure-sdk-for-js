// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptionsBase } from "./modelsToBeSharedWithEventHubs";
import { ConnectionContext } from "./connectionContext";
import { RetryConfig, RetryOperationType, RetryOptions, retry } from "@azure/core-amqp";
import { CorrelationRuleFilter } from "./core/managementClient";
import { RuleProperties, SqlRuleAction } from "./serializers/ruleResourceSerializer";
import { getUniqueName } from "./util/utils";
import { throwErrorIfConnectionClosed } from "./util/errors";
import { SqlRuleFilter } from "./serializers/ruleResourceSerializer";

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
   * @param ruleAction - The SQL like expression that can be executed on the message should the associated filter apply.
   */
  createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    ruleAction?: SqlRuleAction,
    options?: OperationOptionsBase
  ): Promise<void>;
  /**
   * Get all rules associated with the subscription.
   */
  getRules(options?: OperationOptionsBase): Promise<RuleProperties[]>;
  /**
   * Deletes a rule.
   *
   * @param ruleName - the name of the rule
   */
  deleteRule(ruleName: string, options?: OperationOptionsBase): Promise<void>;
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
   * @param ruleAction - The SQL like expression that can be executed on the message should the associated filter apply.
   */
  async createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    sqlRuleAction?: SqlRuleAction,
    options?: OperationOptionsBase
  ): Promise<void> {
    const addRuleOperationPromise = async (): Promise<void> => {
      return this._context
        .getManagementClient(this._entityPath)
        .addRule(ruleName, filter, sqlRuleAction?.sqlExpression, {
          ...options,
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
      abortSignal: options?.abortSignal,
    };
    return retry<void>(config);
  }

  /**
   * Get all rules associated with the subscription.
   */
  async getRules(options?: OperationOptionsBase): Promise<RuleProperties[]> {
    const getRulesOperationPromise = async (): Promise<RuleProperties[]> => {
      return this._context.getManagementClient(this._entityPath).getRules({
        ...options,
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
      abortSignal: options?.abortSignal,
    };
    return retry<RuleProperties[]>(config);
  }

  /**
   * Deletes a rule.
   */
  async deleteRule(ruleName: string, options?: OperationOptionsBase): Promise<void> {
    const removeRuleOperationPromise = async (): Promise<void> => {
      return this._context.getManagementClient(this._entityPath).removeRule(ruleName, {
        ...options,
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
      abortSignal: options?.abortSignal,
    };
    return retry<void>(config);
  }
}
