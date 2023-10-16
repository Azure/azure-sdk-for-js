// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageContent } from "./models";

export function isMessageContent(message: unknown): message is MessageContent {
  const castMessage = message as MessageContent;
  return castMessage.data !== undefined && castMessage.contentType !== undefined;
}
