// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import * as RestModel from "../../../src/generated/src/models";
import { ChatClient, ChatParticipant, ChatThreadClient } from "../../../src";
import { CommunicationIdentifierModel } from "../../../src/generated/src";
import { baseUri, generateToken } from "../../public/utils/connectionUtils";

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
  retentionPolicy: { kind: "none" },
  createdByCommunicationIdentifier: mockCommunicationIdentifier,
  createdOn: new Date("2020-06-26T18:06:06Z"),
};

export const mockCreateThreadResult: RestModel.CreateChatThreadResult = {
  chatThread: mockThread,
  invalidParticipants: undefined,
};

export const mockThreadItemWithRetentionPolicy: RestModel.ChatThreadProperties = {
  id: "threadid",
  topic: "topic",
  createdByCommunicationIdentifier: mockCommunicationIdentifier,
  createdOn: new Date("2020-06-26T18:06:06Z"),
  retentionPolicy: { kind: "threadCreationDate", deleteThreadAfterDays: 90 },
};

export const mockThreadItem: RestModel.ChatThreadItem = {
  id: "threadid",
  topic: "topic",
  lastMessageReceivedOn: new Date("2020-06-26T18:06:06Z"),
};

export const mockMessage: RestModel.ChatMessage = {
  id: "id",
  type: "text",
  version: "version",
  sequenceId: "sequenceId",
  content: {
    message: "content",
    topic: "topic",
    attachments: [
      {
        id: "id1",
        attachmentType: "image",
        name: "picture1.png",
        url: "url1",
        previewUrl: "previewUrl1",
      },
    ],
  },
  createdOn: new Date("2020-06-26T18:06:06Z"),
  senderDisplayName: "senderDisplayName",
  senderCommunicationIdentifier: mockCommunicationIdentifier,
  deletedOn: new Date("2020-06-26T18:06:06Z"),
  metadata: { tags: "tag" },
};

export const mockMessageContent: RestModel.ChatMessageContent = {
  message: "content",
  topic: "topic",
  participants: [mockParticipant],
  attachments: [
    {
      id: "id",
      attachmentType: "image",
      name: "images",
      url: "url",
      previewUrl: "previewUrl",
    },
    {
      id: "id1",
      attachmentType: "image",
      name: "picture1.png",
      url: "url1",
      previewUrl: "previewUrl1",
    },
    {
      id: "id2",
      attachmentType: "file",
      name: "report.docx",
      url: "url2",
      previewUrl: "previewUrl2",
    },
  ],
  initiatorCommunicationIdentifier: mockCommunicationIdentifier,
};

export const mockMessageWithAttachment: RestModel.ChatMessage = {
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
        name: "images",
        url: "url",
        previewUrl: "previewUrl",
      },
      {
        id: "id1",
        attachmentType: "image",
        name: "picture1.png",
        url: "url1",
        previewUrl: "previewUrl1",
      },
      {
        id: "id2",
        attachmentType: "file",
        name: "report.docx",
        url: "url2",
        previewUrl: "previewUrl2",
      },
    ],
  },
  createdOn: new Date("2020-06-26T18:06:06Z"),
  senderDisplayName: "senderDisplayName",
  senderCommunicationIdentifier: mockCommunicationIdentifier,
  deletedOn: new Date("2020-06-26T18:06:06Z"),
  metadata: { tags: "tag" },
};

export const mockImageAttachment: RestModel.ChatAttachment = {
  id: "id1",
  attachmentType: "image",
  name: "picture1.png",
};

export const mockChatMessageReadReceipt: RestModel.ChatMessageReadReceipt = {
  senderCommunicationIdentifier: mockCommunicationIdentifier,
  chatMessageId: mockMessage.id,
  readOn: new Date("2020-06-26T18:06:06Z"),
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
