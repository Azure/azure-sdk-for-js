// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageHandlers, ProcessErrorContext } from "../models";
import { ServiceBusReceiver } from "./receiver";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { receiverLogger, ServiceBusLogger } from "../log";

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
  receiver: Pick<ServiceBusReceiver<ReceivedMessageT>, "receiveMessages">,
  options?: OperationOptionsBase
): AsyncIterableIterator<ReceivedMessageT> {
  while (true) {
    const messages = await receiver.receiveMessages(1, options);

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
  logger: ServiceBusLogger = receiverLogger
): MessageHandlers<unknown>["processError"] {
  return async (err: Error, context: ProcessErrorContext) => {
    try {
      await handlers.processError(err, context);
    } catch (err) {
      logger.logError(err, `An error was thrown from the user's processError handler`);
    }
  };
}
