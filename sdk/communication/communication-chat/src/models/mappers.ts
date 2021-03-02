// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier, getIdentifierKind } from "@azure/communication-common";
import * as RestModel from "../generated/src/models";
import { AddChatParticipantsRequest } from "./requests";
import {
  ChatMessage,
  ChatThread,
  ChatParticipant,
  ChatMessageReadReceipt,
  ChatMessageContent
} from "./models";

const addRawIdIfExisting = <T>(
  identifier: T,
  rawId: string | undefined
): T & { rawId?: string } => {
  return rawId === undefined ? identifier : { ...identifier, rawId: rawId };
};

/**
 * @internal
 * Translates a CommunicationIdentifier to its serialized format for sending a request.
 * @param identifier - The CommunicationIdentifier to be serialized.
 */
export const _serializeCommunicationIdentifier = (
  identifier: CommunicationIdentifier
): RestModel.CommunicationIdentifierModel => {
  const identifierKind = getIdentifierKind(identifier);
  switch (identifierKind.kind) {
    case "communicationUser":
      return { communicationUser: { id: identifierKind.communicationUserId } };
    case "phoneNumber":
      return addRawIdIfExisting(
        { phoneNumber: { value: identifierKind.phoneNumber } },
        identifierKind.rawId
      );
    case "microsoftTeamsUser":
      return addRawIdIfExisting(
        {
          microsoftTeamsUser: {
            userId: identifierKind.microsoftTeamsUserId,
            isAnonymous: identifierKind.isAnonymous ?? false,
            cloud: identifierKind.cloud ?? "public"
          }
        },
        identifierKind.rawId
      );
    case "unknown":
      return { rawId: identifierKind.id };
    default:
      throw new Error(`Can't serialize an identifier with kind ${(identifierKind as any).kind}`);
  }
};

/**
 * @internal
 * Translates the serialized format of a communication identifier to CommunicationIdentifier.
 * @param serializedIdentifier - The SerializedCommunicationIdentifier to be deserialized.
 */
export const _deserializeCommunicationIdentifier = (
  serializedIdentifier: RestModel.CommunicationIdentifierModel
): CommunicationIdentifier => {
  const { communicationUser, microsoftTeamsUser, phoneNumber } = serializedIdentifier;
  if (communicationUser) {
    return {
      communicationUserId: communicationUser.id
    };
  }
  if (phoneNumber) {
    return {
      phoneNumber: phoneNumber.value,
      rawId: serializedIdentifier.rawId
    };
  }
  if (microsoftTeamsUser) {
    return {
      microsoftTeamsUserId: microsoftTeamsUser.userId,
      isAnonymous: microsoftTeamsUser.isAnonymous,
      cloud: microsoftTeamsUser.cloud as "public" | "dod" | "gcch" | undefined,
      rawId: serializedIdentifier.rawId
    };
  }
  return {
    id: serializedIdentifier.rawId ?? "Unknown"
  };
};

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
    communicationIdentifier: _serializeCommunicationIdentifier(id)
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
      sender: _deserializeCommunicationIdentifier(senderCommunicationIdentifier),
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
    id: _deserializeCommunicationIdentifier(communicationIdentifier)
  };
};

/**
 * @internal
 * Mapping chat thread REST model to chat thread SDK model
 */
export const mapToChatThreadSdkModel = (chatThread: RestModel.ChatThread): ChatThread => {
  const { createdByCommunicationIdentifier, ...rest } = chatThread;
  if (createdByCommunicationIdentifier)
    return {
      ...rest,
      createdBy: _deserializeCommunicationIdentifier(createdByCommunicationIdentifier)
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
    sender: _deserializeCommunicationIdentifier(senderCommunicationIdentifier)
  };
};
