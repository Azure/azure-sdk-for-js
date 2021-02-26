// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as RestModel from "../generated/src/models";
import { AddChatParticipantsRequest } from "./requests";
import {
  ChatMessage,
  ChatThread,
  ChatParticipant,
  ChatMessageReadReceipt,
  ChatMessageContent
} from "./models";

/**
 * Mapping chat participant customer model to chat participant REST model
 */
export const mapToChatParticipantRestModel = (
  chatParticipant: ChatParticipant
): RestModel.ChatParticipant => {
  const model = { ...chatParticipant, id: chatParticipant.user.communicationUserId };
  delete (model as any).user;
  return model;
};

/**
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
 * Mapping chat message REST model to chat message SDK model
 */
export const mapToChatMessageSdkModel = (chatMessage: RestModel.ChatMessage): ChatMessage => {
  const { content, senderId, ...otherChatMessage } = chatMessage;
  const contentSdkModel = content ? mapToChatContentSdkModel(content) : undefined;
  if (senderId) {
    return {
      sender: { communicationUserId: senderId! },
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
 * Mapping chat messages collection REST model to chat message SDK model array
 */
export const mapToChatMessagesSdkModelArray = (
  chatMessagesCollection: RestModel.ChatMessagesCollection
): ChatMessage[] => {
  return chatMessagesCollection.value?.map((chatMessage) => mapToChatMessageSdkModel(chatMessage))!;
};

/**
 * Mapping chat participant REST model to chat participant SDK model
 */
export const mapToChatParticipantSdkModel = (
  chatParticipant: RestModel.ChatParticipant
): ChatParticipant => {
  const model = { ...chatParticipant, user: { communicationUserId: chatParticipant.id } };
  delete (model as any).id;
  return model;
};

/**
 * Mapping chat thread REST model to chat thread SDK model
 */
export const mapToChatThreadSdkModel = (chatThread: RestModel.ChatThread): ChatThread => {
  return {
    id: chatThread.id,
    topic: chatThread.topic,
    createdOn: chatThread.createdOn,
    createdBy: {
      communicationUserId: chatThread.createdBy!
    }
  };
};

/**
 * Mapping read receipt REST model to read receipt SDK model
 */
export const mapToReadReceiptSdkModel = (
  readReceipt: RestModel.ChatMessageReadReceipt
): ChatMessageReadReceipt => {
  const model = { ...readReceipt, sender: { communicationUserId: readReceipt.senderId } };
  delete (model as any).senderId;
  return model;
};
