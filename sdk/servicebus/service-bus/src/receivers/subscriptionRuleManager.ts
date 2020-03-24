// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { RuleDescription, CorrelationFilter } from "../core/managementClient";
import { throwErrorIfClientOrConnectionClosed } from "../util/errors";
import { ClientEntityContext } from "../clientEntityContext";

/**
 * Manages rules for subscriptions.
 * More information about subscription rules can be found here: https://docs.microsoft.com/en-us/azure/service-bus-messaging/topic-filters
 */
export interface SubscriptionRuleManager {
  /**
   * Gets all rules associated with the subscription
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while retrieving rules.
   */
  getRules(): Promise<RuleDescription[]>;

  /**
   * Removes the rule on the subscription identified by the given rule name.
   *
   * **Caution**: If all rules on a subscription are removed, then the subscription will not receive
   * any more messages.
   * @param ruleName
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while removing rules.
   */

  removeRule(ruleName: string): Promise<void>;
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
   * @throws Error if the SubscriptionClient or the underlying connection is closed.
   * @throws MessagingError if the service returns an error while adding rules.
   */
  addRule(
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
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
  constructor(private _context: ClientEntityContext) {}

  // #region topic-filters
  getRules(): Promise<RuleDescription[]> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );
    return this._context.managementClient!.getRules();
  }

  removeRule(ruleName: string): Promise<void> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );
    return this._context.managementClient!.removeRule(ruleName);
  }

  addRule(
    ruleName: string,
    filter: boolean | string | CorrelationFilter,
    sqlRuleActionExpression?: string
  ): Promise<void> {
    throwErrorIfClientOrConnectionClosed(
      this._context.namespace,
      this._context.entityPath,
      this._context.isClosed
    );
    return this._context.managementClient!.addRule(ruleName, filter, sqlRuleActionExpression);
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
