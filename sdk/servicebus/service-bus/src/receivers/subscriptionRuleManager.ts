// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { retry, RetryConfig, RetryOperationType, RetryOptions } from "@azure/core-amqp";
import { ClientEntityContext } from "../clientEntityContext";
import { CorrelationRuleFilter, RuleDescription } from "../core/managementClient";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { throwErrorIfClientOrConnectionClosed } from "../util/errors";

/**
 * @internal
 * @ignore
 * Manages rules for subscriptions.
 * More information about subscription rules can be found here: https://docs.microsoft.com/en-us/azure/service-bus-messaging/topic-filters
 */
interface SubscriptionRuleManager {
  /**
   * Gets all rules associated with the subscription
   * @param options - Options bag to pass an abort signal or tracing options.
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while retrieving rules.
   */
  getRules(options?: OperationOptionsBase): Promise<RuleDescription[]>;

  /**
   * Removes the rule on the subscription identified by the given rule name.
   *
   * **Caution**: If all rules on a subscription are removed, then the subscription will not receive
   * any more messages.
   * @param ruleName
   * @param options - Options bag to pass an abort signal or tracing options.
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while removing rules.
   */

  removeRule(ruleName: string, options?: OperationOptionsBase): Promise<void>;
  /**
   * Adds a rule on the subscription as defined by the given rule name, filter and action.
   *
   * **Note**: Remove the default true filter on the subscription before adding a rule.
   * Otherwise, the added rule will have no affect as the true filter will always result in
   * the subscription receiving all messages.
   * @param ruleName Name of the rule
   * @param filter A Boolean, SQL expression or a Correlation filter. For SQL Filter syntax, see
   * {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-sql-filter SQLFilter syntax}.
   * @param sqlRuleActionExpression Action to perform if the message satisfies the filtering expression. For SQL Rule Action syntax,
   * see {@link https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-sql-rule-action SQLRuleAction syntax}.
   * @param options - Options bag to pass an abort signal or tracing options.
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while adding rules.
   */
  addRule(
    ruleName: string,
    filter: boolean | string | CorrelationRuleFilter,
    sqlRuleActionExpression?: string,
    options?: OperationOptionsBase
  ): Promise<void>;

  /**
   * Closes any resources created for the rule manager.
   */
  close(): Promise<void>;

  /**
   * @readonly
   * @property The name of the default rule on the subscription.
   */
  readonly defaultRuleName: string;
}

/**
 * @internal
 * @ignore
 */
export class SubscriptionRuleManagerImpl implements SubscriptionRuleManager {
  private _retryOptions: RetryOptions;
  constructor(private _context: ClientEntityContext, retryOptions: RetryOptions = {}) {
    this._retryOptions = retryOptions;
  }

  // #region topic-filters
  getRules(options: OperationOptionsBase = {}): Promise<RuleDescription[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );

    const getRulesOperationPromise = async () => {
      return this._context.managementClient!.getRules({
        ...options,
        requestName: "getRules",
        timeoutInMs: this._retryOptions.timeoutInMs
      });
    };
    const config: RetryConfig<RuleDescription[]> = {
      operation: getRulesOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<RuleDescription[]>(config);
  }

  removeRule(ruleName: string, options: OperationOptionsBase = {}): Promise<void> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );

    const removeRuleOperationPromise = () => {
      return this._context.managementClient!.removeRule(ruleName, {
        ...options,
        requestName: "removeRule",
        timeoutInMs: this._retryOptions.timeoutInMs
      });
    };
    const config: RetryConfig<void> = {
      operation: removeRuleOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<void>(config);
  }

  addRule(
    ruleName: string,
    filter: boolean | string | CorrelationRuleFilter,
    sqlRuleActionExpression?: string,
    options: OperationOptionsBase = {}
  ): Promise<void> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );

    const addRuleOperationPromise = async () => {
      return this._context.managementClient!.addRule(ruleName, filter, sqlRuleActionExpression, {
        ...options,
        requestName: "addRule",
        timeoutInMs: this._retryOptions.timeoutInMs
      });
    };
    const config: RetryConfig<void> = {
      operation: addRuleOperationPromise,
      connectionId: this._context.namespace.connectionId,
      operationType: RetryOperationType.management,
      retryOptions: this._retryOptions,
      abortSignal: options?.abortSignal
    };
    return retry<void>(config);
  }

  close(): Promise<void> {
    return this._context.close();
  }

  /**
   * @readonly
   * @property The name of the default rule on the subscription.
   */
  readonly defaultRuleName: string = "$Default";

  // #endregion
}
