// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageConsumer, MessageFactory } from "./message";
import { MessageWithMetadata } from "./models";

export const defaultMessageFactory: MessageFactory<MessageWithMetadata> = {
  createMessage: (body: Uint8Array, contentType: string) => ({
    body,
    contentType,
  }),
};

export const defaultMessageConsumer: MessageConsumer<MessageWithMetadata> = {
  getContentType: (message: MessageWithMetadata) => message.contentType,
  getPayload: (message: MessageWithMetadata) => message.body,
};
