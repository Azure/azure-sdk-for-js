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

export interface ServiceBusRuleManager {
  createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    sqlRuleAction?: SqlRuleAction,
    options?: OperationOptionsBase): Promise<void>;
  getRules(
    options?: OperationOptionsBase): Promise<RuleProperties[]>;
  removeRule(ruleName: string, options?: OperationOptionsBase): Promise<void>;
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

  async createRule(
    ruleName: string,
    filter: SqlRuleFilter | CorrelationRuleFilter,
    sqlRuleAction?: SqlRuleAction,
    options?: OperationOptionsBase): Promise<void> {
    const addRuleOperationPromise = async (): Promise<void> => {
      return this._context
        .getManagementClient(this._entityPath)
        .addRule(ruleName, filter, sqlRuleAction?.sqlExpression, {
          ...options,
          associatedLinkName: this.name,
          requestName: "addRule",
          timeoutInMs: this._retryOptions.timeoutInMs
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

  async getRules(
    options?: OperationOptionsBase): Promise<RuleProperties[]> {
    const getRulesOperationPromise = async (): Promise<RuleProperties[]> => {
      return this._context
        .getManagementClient(this._entityPath)
        .getRules({
          ...options,
          associatedLinkName: this.name,
          requestName: "getRules",
          timeoutInMs: this._retryOptions.timeoutInMs
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

  async removeRule(
    ruleName: string,
    options?: OperationOptionsBase): Promise<void> {
    const removeRuleOperationPromise = async (): Promise<void> => {
      return this._context
        .getManagementClient(this._entityPath)
        .removeRule(ruleName, {
          ...options,
          associatedLinkName: this.name,
          requestName: "removeRule",
          timeoutInMs: this._retryOptions.timeoutInMs
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
