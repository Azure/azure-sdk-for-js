// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChatParticipant } from "./models";

export { SendReadReceiptRequest } from "../generated/src/models";

/** Participants to be added to the thread. */
export interface AddChatParticipantsRequest {
  /** Participants to add to a chat thread. */
  participants: ChatParticipant[];
}

/** Request payload for creating a chat thread. */
export interface CreateChatThreadRequest {
  /** The chat thread topic. */
  topic: string;
  /** Participants to be added to the chat thread. */
  participants: ChatParticipant[];
}

/** Details of the message to send. */
export interface SendMessageRequest {
  /** Chat message content. */
  content: string;
}
