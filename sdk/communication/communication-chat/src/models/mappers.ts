// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as RestModel from "../generated/src/models";
import { HttpResponse } from "@azure/core-http";
import { AddMembersRequest } from "./requests";
import { ChatMessage, ChatThread, ChatThreadMember, ReadReceipt, WithResponse } from "./models";

/**
 * Mapping chat thread member customer model to chat thread member REST model
 */
export const mapToChatThreadMemberRestModel = (
  chatThreadMember: ChatThreadMember
): RestModel.ChatThreadMember => {
  const model = { ...chatThreadMember, id: chatThreadMember.user.communicationUserId };
  delete (model as any).user;
  return model;
};

/**
 * Mapping add members request to add chat thread members request REST model
 */
export const mapToAddChatThreadMembersRequestRestModel = (
  addMembersRequest: AddMembersRequest
): RestModel.AddChatThreadMembersRequest => {
  return {
    members: addMembersRequest.members?.map((member) => mapToChatThreadMemberRestModel(member))
  };
};

/**
 * Mapping chat message REST model to chat message SDK model
 */
export const mapToChatMessageSdkModel = (chatMessage: RestModel.ChatMessage): ChatMessage => {
  const model = { ...chatMessage, sender: { communicationUserId: chatMessage.senderId! } };
  delete (model as any).senderId;
  return model;
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
 * Mapping chat thread member REST model to chat thread member SDK model
 */
export const mapToChatThreadMemberSdkModel = (
  chatThreadMember: RestModel.ChatThreadMember
): ChatThreadMember => {
  const model = { ...chatThreadMember, user: { communicationUserId: chatThreadMember.id! } };
  delete (model as any).id;
  return model;
};

/**
 * Mapping chat thread members collection REST model to chat thread member SDK model array
 */
export const mapToChatThreadMembersSdkModelArray = (
  chatThreadMembersCollection: RestModel.ChatThreadMembersCollection
): ChatThreadMember[] => {
  return chatThreadMembersCollection.value?.map((chatThreadMember) =>
    mapToChatThreadMemberSdkModel(chatThreadMember)
  )!;
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
    },
    members: chatThread.members?.map((member) => mapToChatThreadMemberSdkModel(member))!
  };
};

/**
 * Mapping read receipt REST model to read receipt SDK model
 */
export const mapToReadReceiptSdkModel = (readReceipt: RestModel.ReadReceipt): ReadReceipt => {
  const model = { ...readReceipt, sender: { communicationUserId: readReceipt.senderId! } };
  delete (model as any).senderId;
  return model;
};

/**
 * Mapping read receipts collection REST model to read receipt SDK model array
 */
export const mapToReadReceiptsSdkModelArray = (
  readReceiptsCollection: RestModel.ReadReceiptsCollection
): ReadReceipt[] => {
  return readReceiptsCollection.value?.map((readReceipt) => mapToReadReceiptSdkModel(readReceipt))!;
};

/**
 * Attach http response to a model
 */
export const attachHttpResponse = <T>(
  model: T,
  httpResponse: HttpResponse & { bodyAsText: string; parsedBody: any }
): WithResponse<T> => {
  const { parsedBody, bodyAsText, ...r } = httpResponse;
  return Object.defineProperty(model, "_response", {
    value: r
  });
};
