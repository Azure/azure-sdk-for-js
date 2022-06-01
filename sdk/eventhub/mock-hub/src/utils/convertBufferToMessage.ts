// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Message, message as rheaMessage } from "rhea";

/**
 * Converts `Buffer`s received from `onMessage` events to an array of messages.
 */
export function convertBufferToMessages(buf: Buffer): Message[] {
  const amqpMessage = rheaMessage.decode(buf);
  if (!amqpMessage.body?.content) {
    return [amqpMessage as unknown as Message];
  }

  if (Array.isArray(amqpMessage.body.content)) {
    return amqpMessage.body.content.map((content: Buffer) => {
      return rheaMessage.decode(content);
    });
  }

  return [rheaMessage.decode(amqpMessage.body.content) as unknown as Message];
}
