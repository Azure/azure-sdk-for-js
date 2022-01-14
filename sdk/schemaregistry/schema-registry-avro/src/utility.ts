// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageWithMetadata } from "./models";

export function isMessageWithMetadata(message: any): message is MessageWithMetadata {
  return message.body !== undefined && message.contentType !== undefined;
}