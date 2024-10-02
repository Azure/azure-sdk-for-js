// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import rhea from "rhea";

/**
 * Converts `Buffer`s received from `onMessage` events to an array of messages.
 */
export function convertBufferToMessages(buf: Buffer): rhea.Message[] {
  const amqpMessage = rhea.message.decode(buf);
  if (!amqpMessage.body?.content) {
    return [amqpMessage as unknown as rhea.Message];
  }

  if (Array.isArray(amqpMessage.body.content)) {
    return amqpMessage.body.content.map((content: Buffer) => {
      return rhea.message.decode(content);
    });
  }

  return [rhea.message.decode(amqpMessage.body.content) as unknown as rhea.Message];
}
