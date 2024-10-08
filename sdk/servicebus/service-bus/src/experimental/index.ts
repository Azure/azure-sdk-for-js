// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeekMessagesOptions } from "../models.js";
import { ServiceBusReceiver } from "../receivers/receiver.js";
import { ServiceBusReceivedMessage } from "../serviceBusMessage.js";

export interface PeekMessagesExOptions extends PeekMessagesOptions {
  /**
   * (Experimental for diagnostic purpose) Specifies whether to omit the body when peeking messages. Default  value `false`.
   */
  omitMessageBody?: boolean;
}

export function peekMessages(
  receiver: ServiceBusReceiver,
  maxMessageCount: number,
  options: PeekMessagesExOptions,
): Promise<ServiceBusReceivedMessage[]> {
  return receiver.peekMessages(maxMessageCount, options);
}
