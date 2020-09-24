// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChatThreadMember } from "./models";
import {
  CreateChatThreadRequest as RestCreateChatThreadRequest,
  SendChatMessageRequest as RestSendMessageRequest,
  AddChatThreadMembersRequest as RestAddMembersRequest
} from "../generated/src/models";
export { RestCreateChatThreadRequest, RestSendMessageRequest, RestAddMembersRequest };

/**
 * An interface representing CreateMessageRequest.
 */
export interface SendMessageRequest
  extends Omit<RestSendMessageRequest, "priority" | "senderDisplayName"> {}

/**
 * Request payload for creating a chat thread.
 */
export interface CreateChatThreadRequest extends Omit<RestCreateChatThreadRequest, "members"> {
  /**
   * Members to add to a chat thread.
   */
  members: ChatThreadMember[];
}

/**
 * Thread members to be added to the thread.
 */
export interface AddMembersRequest extends Omit<RestAddMembersRequest, "members"> {
  /**
   * Members to add to a chat thread.
   */
  members: ChatThreadMember[];
}
