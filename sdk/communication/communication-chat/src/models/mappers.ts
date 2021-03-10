// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  deserializeCommunicationIdentifier,
  serializeCommunicationIdentifier,
  SerializedCommunicationIdentifier
} from "@azure/communication-common";
import * as RestModel from "../generated/src/models";
import { AddChatParticipantsRequest } from "./requests";
import {
  ChatMessage,
  ChatThreadProperties,
  ChatParticipant,
  ChatMessageReadReceipt,
  ChatMessageContent,
  CreateChatThreadResult
} from "./models";

/**
 * @internal
 * Mapping chat participant customer model to chat participant REST model
 */
export const mapToChatParticipantRestModel = (
  chatParticipant: ChatParticipant
): RestModel.ChatParticipant => {
  const { id, ...rest } = chatParticipant;
  return {
    ...rest,
    communicationIdentifier: serializeCommunicationIdentifier(id)
  };
};

/**
 * @internal
 * Mapping add participants request to add chat participants request REST model
 */
export const mapToAddChatParticipantsRequestRestModel = (
  addParticipantsRequest: AddChatParticipantsRequest
): RestModel.AddChatParticipantsRequest => {
  return {
    participants: addParticipantsRequest.participants?.map((participant) =>
      mapToChatParticipantRestModel(participant)
    )
  };
};

/**
 * @internal
 */
export const mapToChatContentSdkModel = (
  content: RestModel.ChatMessageContent
): ChatMessageContent => {
  const { participants, ...otherChatContents } = content;
  return {
    participants: content.participants?.map((participant) =>
      mapToChatParticipantSdkModel(participant)
    ),
    ...otherChatContents
  };
};

/**
 * @internal
 * Mapping chat message REST model to chat message SDK model
 */
export const mapToChatMessageSdkModel = (chatMessage: RestModel.ChatMessage): ChatMessage => {
  const { content, senderCommunicationIdentifier, ...otherChatMessage } = chatMessage;
  const contentSdkModel = content ? mapToChatContentSdkModel(content) : undefined;
  if (senderCommunicationIdentifier) {
    return {
      sender: deserializeCommunicationIdentifier(
        senderCommunicationIdentifier as SerializedCommunicationIdentifier
      ),
      content: contentSdkModel,
      ...otherChatMessage
    };
  } else {
    return {
      content: contentSdkModel,
      ...otherChatMessage
    };
  }
};

/**
 * @internal
 * Mapping chat messages collection REST model to chat message SDK model array
 */
export const mapToChatMessagesSdkModelArray = (
  chatMessagesCollection: RestModel.ChatMessagesCollection
): ChatMessage[] => {
  return chatMessagesCollection.value?.map((chatMessage) => mapToChatMessageSdkModel(chatMessage))!;
};

/**
 * @internal
 * Mapping chat participant REST model to chat participant SDK model
 */
export const mapToChatParticipantSdkModel = (
  chatParticipant: RestModel.ChatParticipant
): ChatParticipant => {
  const { communicationIdentifier, ...rest } = chatParticipant;
  return {
    ...rest,
    id: deserializeCommunicationIdentifier(
      communicationIdentifier as SerializedCommunicationIdentifier
    )
  };
};

/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
export const mapToChatThreadSdkModel = (
  chatThread: RestModel.ChatThreadProperties
): ChatThreadProperties => {
  const { createdByCommunicationIdentifier, ...rest } = chatThread;
  if (createdByCommunicationIdentifier)
    return {
      ...rest,
      createdBy: deserializeCommunicationIdentifier(
        createdByCommunicationIdentifier as SerializedCommunicationIdentifier
      )
    };
  else {
    return { ...rest };
  }
};

/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
export const mapToCreateChatThreadResultSdkModel = (
  result: RestModel.CreateChatThreadResult
): CreateChatThreadResult => {
  const { chatThread, ...rest } = result;
  if (chatThread)
    return {
      ...rest,
      chatThread: mapToChatThreadSdkModel(chatThread)
    };
  else {
    return { ...rest };
  }
};

/**
 * @internal
 * Mapping read receipt REST model to read receipt SDK model
 */
export const mapToReadReceiptSdkModel = (
  readReceipt: RestModel.ChatMessageReadReceipt
): ChatMessageReadReceipt => {
  const { senderCommunicationIdentifier, ...rest } = readReceipt;
  return {
    ...rest,
    sender: deserializeCommunicationIdentifier(
      senderCommunicationIdentifier as SerializedCommunicationIdentifier
    )
  };
};
