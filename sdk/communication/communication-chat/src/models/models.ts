// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationUserIdentifier } from "@azure/communication-common";
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
  CommunicationError
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
  ChatMessageType,
  CommunicationError
};

/**
 * An interface representing a chat message.
 */
export interface ChatMessage extends Omit<RestChatMessage, "senderId" | "content"> {
  /**
   * The CommunicationUserIdentifier that identifies this chat message sender.
   */
  sender?: CommunicationUserIdentifier;
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
   * The CommunicationUserIdentifier that identifies this chat thread owner.
   */
  readonly createdBy?: CommunicationUserIdentifier;
}

/**
 * A participant of the chat thread.
 */
export interface ChatParticipant extends Omit<RestChatParticipant, "id"> {
  /**
   * The CommunicationUserIdentifier that identifies this chat participant.
   */
  user: CommunicationUserIdentifier;
}

/**
 * A read receipt indicates the time a chat message was read by a recipient.
 */
export interface ChatMessageReadReceipt extends Omit<RestChatMessageReadReceipt, "senderId"> {
  /**
   * The CommunicationUserIdentifier that identifies this Read receipt sender.
   */
  readonly sender: CommunicationUserIdentifier;
}

/**
 * Arguments for retrieving the next page of search results.
 */
export interface ListPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
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
