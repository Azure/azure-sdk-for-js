// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ContextWithSettlement } from "../models";
import { ServiceBusMessage } from "../serviceBusMessage";
import { throwErrorIfClientOrConnectionClosed } from "../util/errors";
import { ClientEntityContext } from "../clientEntityContext";
import { RuleDescription, CorrelationFilter } from "../core/managementClient";

/**
 * @internal
 * @ignore
 */
export function getSubscriptionRules(context: ClientEntityContext): Promise<RuleDescription[]> {
  if (context.entityPath.includes("/Subscriptions/")) {
    throwErrorIfClientOrConnectionClosed(context.namespace, context.entityPath, context.isClosed);
    return context.managementClient!.getRules();
  } else {
    throw new Error("Only for a subscription");
  }
}

/**
 * @internal
 * @ignore
 */
export function removeSubscriptionRule(
  context: ClientEntityContext,
  ruleName: string
): Promise<void> {
  if (context.entityPath.includes("/Subscriptions/")) {
    throwErrorIfClientOrConnectionClosed(context.namespace, context.entityPath, context.isClosed);
    return context.managementClient!.removeRule(ruleName);
  } else {
    throw new Error("Only for a subscription");
  }
}

/**
 * @internal
 * @ignore
 */
export function addSubscriptionRule(
  context: ClientEntityContext,
  ruleName: string,
  filter: boolean | string | CorrelationFilter,
  sqlRuleActionExpression?: string
): Promise<void> {
  if (context.entityPath.includes("/Subscriptions/")) {
    throwErrorIfClientOrConnectionClosed(context.namespace, context.entityPath, context.isClosed);
    return context.managementClient!.addRule(ruleName, filter, sqlRuleActionExpression);
  } else {
    throw new Error("Only for a subscription");
  }
}

// #endregion

/**
 * @internal
 * @ignore
 */
export const settlementContext: ContextWithSettlement = {
  // TODO: need to move the settlement methods out of sb message -
  // we don't need to have this runtime dependency.
  abandon: (message, propertiesToModify) =>
    ((message as unknown) as ServiceBusMessage).abandon(propertiesToModify),
  complete: (message) => ((message as unknown) as ServiceBusMessage).complete(),
  defer: (message, propertiesToModify) =>
    ((message as unknown) as ServiceBusMessage).defer(propertiesToModify),
  deadLetter: (message, options) => ((message as unknown) as ServiceBusMessage).deadLetter(options)
};

/**
 * @internal
 * @ignore
 */
export function assertValidMessageHandlers(handlers: any) {
  if (
    handlers &&
    handlers.processMessage instanceof Function &&
    handlers.processError instanceof Function
  ) {
    return;
  }

  throw new TypeError('Invalid "MessageHandlers" provided.');
}
