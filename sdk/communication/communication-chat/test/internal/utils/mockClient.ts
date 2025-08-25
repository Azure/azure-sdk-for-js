// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type * as RestModel from "$internal/generated/src/models/index.js";
import type { ChatParticipant } from "@azure/communication-chat";
import { ChatClient, ChatThreadClient } from "@azure/communication-chat";
import type { CommunicationIdentifierModel } from "$internal/generated/src/index.js";
import { baseUri, generateToken } from "../../public/utils/connectionUtils.js";

export const mockCommunicationIdentifier: CommunicationIdentifierModel = {
  communicationUser: { id: "id" },
  rawId: "id",
};

export const mockParticipant: RestModel.ChatParticipant = {
  communicationIdentifier: mockCommunicationIdentifier,
  displayName: "displayName",
  shareHistoryTime: new Date("2020-05-26T18:06:06Z"),
};

export const mockParticipantWithMetadata: RestModel.ChatParticipant = {
  communicationIdentifier: mockCommunicationIdentifier,
  displayName: "displayName",
  metadata: {
    userType: "C2",
  },
};

export const mockSdkModelParticipant: ChatParticipant = {
  id: {
    communicationUserId: mockParticipant.communicationIdentifier.communicationUser?.id as string,
  },
  displayName: mockParticipant.displayName,
  shareHistoryTime: mockParticipant.shareHistoryTime,
};

export const mockThread: RestModel.ChatThreadProperties = {
  id: "threadid",
  topic: "topic",
  metadata: { threadType: "primary", secondaryThread: "test-id" },
  createdByCommunicationIdentifier: mockCommunicationIdentifier,
  createdOn: new Date("2020-06-26T18:06:06Z"),
};

export const mockCreateThreadResult: RestModel.CreateChatThreadResult = {
  chatThread: mockThread,
  invalidParticipants: undefined,
};

export const mockThreadItem: RestModel.ChatThreadItem = {
  id: "threadid",
  topic: "topic",
  lastMessageReceivedOn: new Date("2020-06-26T18:06:06Z"),
};

export const mockThreadItemWithRetentionPolicy: RestModel.ChatThreadProperties = {
  id: "threadid",
  topic: "topic",
  createdByCommunicationIdentifier: mockCommunicationIdentifier,
  createdOn: new Date("2020-06-26T18:06:06Z"),
  retentionPolicy: { kind: "threadCreationDate", deleteThreadAfterDays: 90 },
};

export const mockMessage: RestModel.ChatMessage = {
  id: "id",
  type: "text",
  version: "version",
  sequenceId: "sequenceId",
  content: {
    message: "content",
    topic: "topic",
  },
  createdOn: new Date("2020-06-26T18:06:06Z"),
  senderDisplayName: "senderDisplayName",
  senderCommunicationIdentifier: mockCommunicationIdentifier,
  deletedOn: new Date("2020-06-26T18:06:06Z"),
  metadata: { tags: "tag" },
};

export const mockChatMessageReadReceipt: RestModel.ChatMessageReadReceipt = {
  senderCommunicationIdentifier: mockCommunicationIdentifier,
  chatMessageId: mockMessage.id,
  readOn: new Date("2020-06-26T18:06:06Z"),
};

export const mockMessageWithImageAttachment: RestModel.ChatMessage = {
  id: "id",
  type: "text",
  version: "version",
  sequenceId: "sequenceId",
  content: {
    message: "content",
    topic: "topic",
    attachments: [
      {
        id: "id",
        attachmentType: "image",
        name: "",
        url: "url",
        previewUrl: "previewUrl",
      },
    ],
  },
  createdOn: new Date("2020-06-26T18:06:06Z"),
  senderDisplayName: "senderDisplayName",
  senderCommunicationIdentifier: mockCommunicationIdentifier,
  deletedOn: new Date("2020-06-26T18:06:06Z"),
  metadata: { tags: "tag" },
};

export const mockMessageWithFileAttachment: RestModel.ChatMessage = {
  id: "id",
  type: "text",
  version: "version",
  sequenceId: "sequenceId",
  content: {
    message: "content",
    topic: "topic",
    attachments: [
      {
        id: "id",
        attachmentType: "file",
        previewUrl: "previewUrl",
      },
    ],
  },
  createdOn: new Date("2020-06-26T18:06:06Z"),
  senderDisplayName: "senderDisplayName",
  senderCommunicationIdentifier: mockCommunicationIdentifier,
  deletedOn: new Date("2020-06-26T18:06:06Z"),
  metadata: { tags: "tag" },
};

export const generateHttpClient = (status: number, parsedBody?: unknown): HttpClient => {
  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: PipelineRequest): Promise<PipelineResponse> {
      return {
        status: status,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify(parsedBody),
      };
    },
  };
  return mockHttpClient;
};

export const createChatClient = (mockHttpClient: HttpClient): ChatClient => {
  return new ChatClient(baseUri, new AzureCommunicationTokenCredential(generateToken()), {
    httpClient: mockHttpClient,
  });
};

export const createChatThreadClient = (
  threadId: string,
  mockHttpClient: HttpClient,
): ChatThreadClient => {
  return new ChatThreadClient(
    baseUri,
    threadId,
    new AzureCommunicationTokenCredential(generateToken()),
    {
      httpClient: mockHttpClient,
    },
  );
};
