// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageHandlers, ProcessErrorArgs } from "../models";
import { ServiceBusReceiver } from "./receiver";
import { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs";
import { receiverLogger, ServiceBusLogger } from "../log";
import { ServiceBusReceivedMessage } from "../serviceBusMessage";
import { translateServiceBusError } from "../serviceBusError";

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
export async function* getMessageIterator(
  receiver: Pick<ServiceBusReceiver, "receiveMessages">,
  options?: OperationOptionsBase
): AsyncIterableIterator<ServiceBusReceivedMessage> {
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
  handlers: Pick<MessageHandlers, "processError">,
  logger: ServiceBusLogger = receiverLogger
): MessageHandlers["processError"] {
  return async (args: ProcessErrorArgs) => {
    try {
      args.error = translateServiceBusError(args.error);
      await handlers.processError(args);
    } catch (err) {
      logger.logError(err, `An error was thrown from the user's processError handler`);
    }
  };
}
