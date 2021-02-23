// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { HttpClient, HttpHeaders, WebResourceLike, HttpOperationResponse } from "@azure/core-http";
import { ChatClient, ChatParticipant, ChatThread, ChatThreadInfo, CommunicationIdentifierModel, CreateChatThreadResult, ChatMessage, ChatMessageReadReceipt, ChatThreadClient } from "../../src";
import { baseUri, generateToken } from "./connectionUtils";

export const mockCommunicationIdentifier: CommunicationIdentifierModel = {
  rawId: "rawId"
};

export const mockParticipant: ChatParticipant = {
  communicationIdentifier: mockCommunicationIdentifier,
  displayName: "displayName",
  shareHistoryTime: new Date("2020-05-26T18:06:06Z")
};

export const mockThread: ChatThread = {
  id: "threadid",
  topic: "topic",
  createdByCommunicationIdentifier: mockCommunicationIdentifier,
  createdOn: new Date("2020-06-26T18:06:06Z")
};

export const mockCreateThreadResult: CreateChatThreadResult = {
  chatThread: mockThread,
  errors: undefined
};

export const mockThreadInfo:ChatThreadInfo = {
  id: "threadid",
  topic: "topic",
  lastMessageReceivedOn: new Date("2020-06-26T18:06:06Z")
};

export const mockMessage: ChatMessage = {
  id: "id",
  type: "text",
  version: "version",
  sequenceId: "sequenceId",
  content: {
    message: "content",
    topic: "topic"
  },
  createdOn: new Date("2020-06-26T18:06:06Z"),
  senderDisplayName: "senderDisplayName",
  senderCommunicationIdentifier: mockCommunicationIdentifier,
  deletedOn: new Date("2020-06-26T18:06:06Z")
};

export const mockChatMessageReadReceipt: ChatMessageReadReceipt = {
  senderCommunicationIdentifier: mockCommunicationIdentifier,
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
    baseUri,
    threadId,
    new AzureCommunicationTokenCredential(generateToken()),
    {
      httpClient: mockHttpClient
    }
  );
};
