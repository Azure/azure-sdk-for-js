// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationUser } from "@azure/communication-common";
import { HttpResponse } from "@azure/core-http";
import {
  SendChatMessageResult,
  ChatMessage as RestChatMessage,
  ChatThread as RestChatThread,
  ChatParticipant as RestChatParticipant,
  ChatMessageReadReceipt as RestChatMessageReadReceipt,
  ChatMessageContent as RestChatMessageContent,
  ChatMessageType,
  CreateChatThreadResult,
  CreateChatThreadErrors,
  AddChatParticipantsResult,
  AddChatParticipantsErrors,
  ErrorModel
} from "../generated/src/models";

export {
  RestChatMessage,
  RestChatThread,
  RestChatParticipant,
  RestChatMessageContent,
  RestChatMessageReadReceipt,
  CreateChatThreadResult,
  CreateChatThreadErrors,
  SendChatMessageResult,
  AddChatParticipantsResult,
  AddChatParticipantsErrors,
  ErrorModel,
  ChatMessageType
};

/**
 * An interface representing a chat message.
 */
export interface ChatMessage extends Omit<RestChatMessage, "senderId" | "content"> {
  /**
   * The CommunicationUser that identifies this chat message sender.
   */
  sender?: CommunicationUser;
  /**
   * Content of a chat message.
   */
  content?: ChatMessageContent;
}

export interface ChatMessageContent extends Omit<RestChatMessageContent, "participants"> {
  /**
   * Chat message content for type "participantAdded" or "participantRemoved" messages.
   */
  participants?: ChatParticipant[];
}

/**
 * An interface representing a chat thread.
 */
export interface ChatThread extends Omit<RestChatThread, "createdBy"> {
  /**
   * The CommunicationUser that identifies this chat thread owner.
   */
  readonly createdBy?: CommunicationUser;
}

/**
 * A participant of the chat thread.
 */
export interface ChatParticipant extends Omit<RestChatParticipant, "id"> {
  /**
   * The CommunicationUser that identifies this chat participant.
   */
  user: CommunicationUser;
}

/**
 * A read receipt indicates the time a chat message was read by a recipient.
 */
export interface ChatMessageReadReceipt extends Omit<RestChatMessageReadReceipt, "senderId"> {
  /**
   * The CommunicationUser that identifies this Read receipt sender.
   */
  readonly sender?: CommunicationUser;
}

/**
 * Represents the repsonse for operations
 */
export interface OperationResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: HttpResponse;
}

/**
 * Represents an object with a non-enumerable _response property which provides
 */
export type WithResponse<T> = T & { _response: HttpResponse };

/**
 * Represents the response from getting a chat message
 */
export type GetChatMessageResponse = WithResponse<ChatMessage>;

/**
 * Represents the response from getting a chat thread
 */
export type GetChatThreadResponse = WithResponse<ChatThread>;

/**
 * Represents the response from sending a chat message
 */
export type SendChatMessageResponse = WithResponse<SendChatMessageResult>;

/**
 * Represents the response from creating a chat thread
 */
export type CreateChatThreadResponse = WithResponse<CreateChatThreadResult>;

/**
 * Represents the response from adding chat participants
 */
export type AddChatParticipantsResponse = WithResponse<AddChatParticipantsResult>;
