// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SerializedCommunicationIdentifier,
  deserializeCommunicationIdentifier,
  serializeCommunicationIdentifier,
} from "@azure/communication-common";
import * as RestModel from "../generated/src/models";
import { AddParticipantsRequest, SendMessageRequest } from "./requests";
import { CreateChatThreadOptions, SendMessageOptions, UpdateMessageOptions } from "./options";
import {
  ChatAttachment,
  ChatMessage,
  ChatMessageContent,
  ChatMessageReadReceipt,
  ChatParticipant,
  ChatRetentionPolicy,
  ChatThreadProperties,
  CreateChatThreadResult,
} from "./models";

export const mapToCreateChatThreadOptionsRestModel = (
  options: CreateChatThreadOptions,
): RestModel.ChatCreateChatThreadOptionalParams => {
  const { participants, idempotencyToken, ...rest } = options;
  return {
    repeatabilityRequestId: idempotencyToken,
    ...rest,
  };
};

/**
 * @internal
 * Mapping chat participant customer model to chat participant REST model
 */
export const mapToChatParticipantRestModel = (
  chatParticipant: ChatParticipant,
): RestModel.ChatParticipant => {
  const { id, ...rest } = chatParticipant;
  return {
    ...rest,
    communicationIdentifier: serializeCommunicationIdentifier(id),
  };
};

/**
 * @internal
 * Mapping add participants request to add chat participants request REST model
 */
export const mapToAddChatParticipantsRequestRestModel = (
  addParticipantsRequest: AddParticipantsRequest,
): RestModel.AddChatParticipantsRequest => {
  return {
    participants: addParticipantsRequest.participants?.map((participant) =>
      mapToChatParticipantRestModel(participant),
    ),
  };
};

/**
 * @internal
 * Mapping chat attachment SDK model to chat attachment REST model
 */
export const mapToChatAttachmentRestModel = (
  chatAttachment: ChatAttachment,
): RestModel.ChatAttachment => {
  const { attachmentType, ...rest } = chatAttachment;
  if (attachmentType === "unknown") {
    throw new Error("'unknown' attachmentType not supported");
  }
  return {
    ...rest,
    attachmentType: attachmentType,
  };
};

/**
 * @internal
 * Mapping send message request and options to send chat message request REST model
 */
export const mapToSendChatMessageRequestRestModel = (
  sendMessageRequest: SendMessageRequest,
  sendMessageOptions: SendMessageOptions,
): RestModel.SendChatMessageRequest => {
  const { attachments, ...restOptions } = sendMessageOptions;
  let request: RestModel.SendChatMessageRequest = { ...sendMessageRequest, ...restOptions };
  if (attachments) {
    request = {
      ...request,
      attachments: attachments?.map((attachment) => mapToChatAttachmentRestModel(attachment)),
    };
  }
  return request;
};

/**
 * @internal
 * Mapping update message options to update chat message request REST model
 */
export const mapToUpdateChatMessageRequestRestModel = (
  updateMessageOptions: UpdateMessageOptions,
): RestModel.UpdateChatMessageRequest => {
  const { attachments, ...restOptions } = updateMessageOptions;
  let request: RestModel.UpdateChatMessageRequest = { ...restOptions };
  if (attachments) {
    request = {
      ...request,
      attachments: attachments?.map((attachment) => mapToChatAttachmentRestModel(attachment)),
    };
  }
  return request;
};

/**
 * @internal
 * Mapping chat participant REST model to chat participant SDK model
 */
export const mapToChatParticipantSdkModel = (
  chatParticipant: RestModel.ChatParticipant,
): ChatParticipant => {
  const { communicationIdentifier, ...rest } = chatParticipant;
  return {
    ...rest,
    id: deserializeCommunicationIdentifier(
      communicationIdentifier as SerializedCommunicationIdentifier,
    ),
  };
};

/**
 * @internal
 * Mapping chat attachment REST model to chat attachment SDK model
 */
export const mapToChatAttachmentSdkModel = (
  chatAttachment: RestModel.ChatAttachment,
): ChatAttachment => {
  const { attachmentType, ...rest } = chatAttachment;
  return {
    ...rest,
    attachmentType: attachmentType,
  };
};

/**
 * @internal
 */
export const mapToChatContentSdkModel = (
  content: RestModel.ChatMessageContent,
): ChatMessageContent => {
  const { participants, attachments, initiatorCommunicationIdentifier, ...otherChatContents } =
    content;
  let result: ChatMessageContent = { ...otherChatContents };
  if (initiatorCommunicationIdentifier) {
    const initiator = deserializeCommunicationIdentifier(
      initiatorCommunicationIdentifier as SerializedCommunicationIdentifier,
    );
    result = { ...result, initiator };
  }
  if (participants) {
    result = {
      ...result,
      participants: participants?.map((participant) => mapToChatParticipantSdkModel(participant)),
    };
  }
  if (attachments) {
    result = {
      ...result,
      attachments: attachments?.map((attachment) => mapToChatAttachmentSdkModel(attachment)),
    };
  }
  return result;
};

/**
 * @internal
 * Mapping chat message REST model to chat message SDK model
 */
export const mapToChatMessageSdkModel = (chatMessage: RestModel.ChatMessage): ChatMessage => {
  const { content, senderCommunicationIdentifier, ...otherChatMessage } = chatMessage;
  let result: ChatMessage = { ...otherChatMessage };
  if (content) {
    result = {
      ...result,
      content: mapToChatContentSdkModel(content),
    };
  }
  if (senderCommunicationIdentifier) {
    const sender = deserializeCommunicationIdentifier(
      senderCommunicationIdentifier as SerializedCommunicationIdentifier,
    );
    result = { ...result, sender };
  }
  return result;
};

/**
 * @internal
 * Mapping chat messages collection REST model to chat message SDK model array
 */
export const mapToChatMessagesSdkModelArray = (
  chatMessagesCollection: RestModel.ChatMessagesCollection,
): ChatMessage[] => {
  return chatMessagesCollection.value?.map((chatMessage) => mapToChatMessageSdkModel(chatMessage));
};

/**
 * @internal
 * Mapping chat retention policy REST model to chat retention policy SDK model
 */
export const mapToRetentionPolicySdkModel = (
  retentionPolicy: RestModel.ChatRetentionPolicyUnion,
): ChatRetentionPolicy => {
  if (retentionPolicy.kind === "threadCreationDate") {
    return retentionPolicy as RestModel.ThreadCreationDateRetentionPolicy;
  }
  if (retentionPolicy.kind === "none") {
    return retentionPolicy as RestModel.NoneRetentionPolicy;
  } else {
    throw new Error(`Retention Policy ${retentionPolicy.kind} is not supported`);
  }
};

/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
export const mapToChatThreadPropertiesSdkModel = (
  chatThread: RestModel.ChatThreadProperties,
): ChatThreadProperties => {
  const { createdByCommunicationIdentifier, retentionPolicy, ...rest } = chatThread;
  let result: ChatThreadProperties = { ...rest };
  if (createdByCommunicationIdentifier) {
    result = {
      ...result,
      createdBy: deserializeCommunicationIdentifier(
        createdByCommunicationIdentifier as SerializedCommunicationIdentifier,
      ),
    };
  }

  if (retentionPolicy) {
    result = {
      ...result,
      retentionPolicy: mapToRetentionPolicySdkModel(retentionPolicy),
    };
  }

  return result;
};

/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
export const mapToCreateChatThreadResultSdkModel = (
  result: RestModel.CreateChatThreadResult,
): CreateChatThreadResult => {
  const { chatThread, ...rest } = result;
  if (chatThread) {
    return {
      ...rest,
      chatThread: mapToChatThreadPropertiesSdkModel(chatThread),
    };
  } else {
    return { ...rest };
  }
};

/**
 * @internal
 * Mapping read receipt REST model to read receipt SDK model
 */
export const mapToReadReceiptSdkModel = (
  readReceipt: RestModel.ChatMessageReadReceipt,
): ChatMessageReadReceipt => {
  const { senderCommunicationIdentifier, ...rest } = readReceipt;
  return {
    ...rest,
    sender: deserializeCommunicationIdentifier(
      senderCommunicationIdentifier as SerializedCommunicationIdentifier,
    ),
  };
};
