// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { HttpClient, HttpHeaders, WebResourceLike, HttpOperationResponse } from "@azure/core-http";
import { ChatClient, ChatThreadMember } from "../../src";
import * as RestModel from "../../src/generated/src/models";
import { baseUri, generateToken } from "./connectionUtils";
import { ChatThreadClient } from "../../src/chatThreadClient";

export const mockMember: RestModel.ChatThreadMember = {
  id: "memberId",
  displayName: "displayName",
  shareHistoryTime: new Date("2020-05-26T18:06:06Z")
};

export const mockThread: RestModel.ChatThread = {
  id: "threadid",
  topic: "topic",
  createdBy: "createdBy",
  createdOn: new Date("2020-06-26T18:06:06Z"),
  members: [mockMember]
};

export const mockThreadInfo: RestModel.ChatThreadInfo = {
  id: "threadid",
  topic: "topic",
  isDeleted: true,
  lastMessageReceivedOn: new Date("2020-06-26T18:06:06Z")
};

export const mockRestModelMember: RestModel.ChatThreadMember = {
  id: "memberId",
  displayName: "displayName",
  shareHistoryTime: new Date("2020-05-26T18:06:06Z")
};

export const mockSdkModelMember: ChatThreadMember = {
  user: {
    communicationUserId: mockRestModelMember.id
  },
  displayName: mockRestModelMember.displayName,
  shareHistoryTime: mockRestModelMember.shareHistoryTime
};

export const mockMessage: RestModel.ChatMessage = {
  id: "id",
  type: "Text",
  priority: "Normal",
  version: "version",
  content: "content",
  senderDisplayName: "senderDisplayName",
  senderId: "senderId",
  deletedOn: new Date("2020-06-26T18:06:06Z")
};

export const mockReadReceipt: RestModel.ReadReceipt = {
  senderId: mockRestModelMember.id,
  chatMessageId: mockMessage.id,
  readOn: new Date("2020-06-26T18:06:06Z")
};

export const generateHttpClient = (status: number, parsedBody?: any): HttpClient => {
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status: status,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody: parsedBody
      };
    }
  };
  return mockHttpClient;
};

export const createChatClient = (mockHttpClient: HttpClient): ChatClient => {
  return new ChatClient(baseUri, new AzureCommunicationTokenCredential(generateToken()), {
    httpClient: mockHttpClient
  });
};

export const createChatThreadClient = (
  threadId: string,
  mockHttpClient: HttpClient
): ChatThreadClient => {
  return new ChatThreadClient(
    threadId,
    baseUri,
    new AzureCommunicationTokenCredential(generateToken()),
    {
      httpClient: mockHttpClient
    }
  );
};
