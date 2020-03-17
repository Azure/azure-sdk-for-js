// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { throwErrorIfClientOrConnectionClosed } from "../util/errors";
import { ClientEntityContext } from "../clientEntityContext";
import { RuleDescription, CorrelationFilter } from "../core/managementClient";
import { GetMessageIteratorOptions } from "../models";
import { Receiver } from "./receiver";

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

/**
 * @internal
 * @ignore
 */
export async function* getMessageIterator<ReceivedMessageT>(
  receiver: Receiver<ReceivedMessageT>,
  options?: GetMessageIteratorOptions
): AsyncIterableIterator<ReceivedMessageT> {
  while (true) {
    const messages = await receiver.receiveBatch(1, options);

    // In EventHubs we've had a concept of "punctuation" (thanks @jsquire) that
    // allows the user, when working in a model like this, to get a periodic "no message
    // arrived in this window of time" notification.
    //
    // TODO: do we want this same behavior for ServiceBus?
    if (messages.length === 0) {
      continue;
    }

    yield messages[0];
  }
}
