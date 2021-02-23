// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure/core-http";
import {
  AddChatParticipantsResult,
  ChatMessage,
  ChatThread,
  CreateChatThreadResult,
  SendChatMessageResult
} from "../generated/src/models";

export {
  AddChatParticipantsResult,
  ChatMessage,
  ChatThread,
  CreateChatThreadResult,
  ChatMessageContent,
  ChatMessageType,
  CommunicationError,
  CommunicationCloudEnvironmentModel,
  SendChatMessageResult,
  AddChatParticipantsErrors,
  CommunicationUserIdentifierModel,
  MicrosoftTeamsUserIdentifierModel,
  PhoneNumberIdentifierModel,
  CreateChatThreadErrors
} from "../generated/src/models";

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
