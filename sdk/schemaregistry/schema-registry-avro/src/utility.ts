// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageWithMetadata } from "./models";

export function isMessageWithMetadata(message: unknown): message is MessageWithMetadata {
  const castMessage = message as MessageWithMetadata;
  return castMessage.body !== undefined && castMessage.contentType !== undefined;
}
