// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageHandlers } from "../models";
import { ServiceBusReceiver } from "./receiver";
import * as log from "../log";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";

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
  receiver: ServiceBusReceiver<ReceivedMessageT>,
  options?: OperationOptionsBase
): AsyncIterableIterator<ReceivedMessageT> {
  while (true) {
    const messages = await receiver.receiveMessages(1, options);

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

/**
 * @internal
 * @ignore
 */
export function wrapProcessErrorHandler(
  handlers: Pick<MessageHandlers<unknown>, "processError">,
  logError: (formatter: any, ...args: any[]) => void = log.error
): MessageHandlers<unknown>["processError"] {
  return async (err: Error) => {
    try {
      await handlers.processError(err);
    } catch (err) {
      logError(`An error was thrown from the user's processError handler: ${err}`);
    }
  };
}
