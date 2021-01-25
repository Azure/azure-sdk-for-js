// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChatParticipant } from "./models";
import {
  CreateChatThreadRequest as RestCreateChatThreadRequest,
  SendChatMessageRequest as RestSendMessageRequest,
  AddChatParticipantsRequest as RestAddChatParticipantsRequest
} from "../generated/src/models";
export { RestCreateChatThreadRequest, RestSendMessageRequest, RestAddChatParticipantsRequest };

/**
 * An interface representing CreateMessageRequest.
 */
export interface SendMessageRequest
  extends Omit<RestSendMessageRequest, "priority" | "senderDisplayName"> {}

/**
 * Request payload for creating a chat thread.
 */
export interface CreateChatThreadRequest extends Omit<RestCreateChatThreadRequest, "participants"> {
  /**
   * Participants to add to a chat thread.
   */
  participants: ChatParticipant[];
}

/**
 * Thread participants to be added to the thread.
 */
export interface AddChatParticipantsRequest
  extends Omit<RestAddChatParticipantsRequest, "participants"> {
  /**
   * Participants to add to a chat thread.
   */
  participants: ChatParticipant[];
}