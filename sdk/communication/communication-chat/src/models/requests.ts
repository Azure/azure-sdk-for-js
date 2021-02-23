// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SendChatMessageRequest as RestSendMessageRequest } from "../generated/src/models";

export { RestSendMessageRequest };

/**
 * An interface representing CreateMessageRequest.
 */
export interface SendMessageRequest
  extends Omit<RestSendMessageRequest, "type" | "senderDisplayName"> {}
