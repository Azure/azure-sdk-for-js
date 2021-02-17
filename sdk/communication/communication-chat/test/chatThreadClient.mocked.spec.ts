// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert } from "chai";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import {
  ChatThreadClient,
  SendMessageRequest,
  SendMessageOptions,
  UpdateMessageOptions,
  AddChatParticipantsRequest
} from "../src";
import * as RestModel from "../src/generated/src/models";
import { apiVersion } from "../src/generated/src/models/parameters";
import { baseUri, generateToken } from "./utils/connectionUtils";
import {
  generateHttpClient,
  createChatThreadClient,
  mockMessage,
  mockRestModelParticipant,
  mockSdkModelParticipant,
  mockChatMessageReadReceipt
} from "./utils/mockClient";

const API_VERSION = apiVersion.mapper.defaultValue;

describe("[Mocked] ChatThreadClient", async () => {
  const threadId: string = "threadId";
  let chatThreadClient: ChatThreadClient;

  afterEach(() => {
    sinon.restore();
  });

  it("can instantiate", async () => {
    new ChatThreadClient(threadId, baseUri, new AzureCommunicationTokenCredential(generateToken()));
  });

  it("makes successful update thread topic", async () => {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const topic = "mockTopic";

    await chatThreadClient.updateTopic(topic);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/chat/threads/${threadId}?api-version=${API_VERSION}`);
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body), { topic: topic });
  });

  it("makes successful send message request", async () => {
    const mockHttpClient = generateHttpClient(201, {
      id: mockMessage.id
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: SendMessageRequest = {
      content: mockMessage.content?.message!
    };

    const sendOptions: SendMessageOptions = {
      senderDisplayName: mockMessage.senderDisplayName
    };

    const response = await chatThreadClient.sendMessage(sendRequest, sendOptions);

    sinon.assert.calledOnce(spy);
    assert.equal(response.id, mockMessage.id);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body), {
      ...sendRequest,
      senderDisplayName: mockMessage.senderDisplayName
    });
  });

  it("makes successful get message request", async () => {
    const mockHttpClient = generateHttpClient(200, mockMessage);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const {
      sender: responseUser,
      content: repsonseContent,
      _response,
      ...responseMessage
    } = await chatThreadClient.getMessage(mockMessage.id!);
    const { senderId: expectedId, content: expectedContent, ...expectedMessage } = mockMessage;
    const { participants: expectedParticipants, ...expectedContents } = expectedContent!;
    const { participants: responseParticipants, ...repsonseContents } = repsonseContent!;

    sinon.assert.calledOnce(spy);
    assert.deepEqual(responseMessage, expectedMessage);
    assert.equal(responseUser?.communicationUserId, expectedId);
    assert.deepEqual(repsonseContents, expectedContents);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages/${mockMessage.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful list messages request", async () => {
    const mockResponse: RestModel.ChatMessagesCollection = {
      value: [mockMessage, mockMessage]
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const message of chatThreadClient.listMessages()) {
      ++count;
      const { sender: responseUser, content: repsonseContent, ...responseMessage } = message;
      const { senderId: expectedId, content: expectedContent, ...expectedMessage } = mockMessage;
      const { participants: expectedParticipants, ...expectedContents } = expectedContent!;
      const { participants: responseParticipants, ...repsonseContents } = repsonseContent!;

      if (!expectedId) {
        assert.isUndefined(responseUser);
      } else {
        assert.equal(responseUser!.communicationUserId, expectedId);
      }
      assert.deepEqual(responseMessage, expectedMessage);
      assert.deepEqual(repsonseContents, expectedContents);
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, mockResponse.value?.length);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful update message request", async () => {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendOptions: UpdateMessageOptions = {
      content: mockMessage.content?.message
    };

    await chatThreadClient.updateMessage(mockMessage.id!, sendOptions);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages/${mockMessage.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body), { content: mockMessage.content?.message });
  });

  it("makes successful delete message request", async () => {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.deleteMessage(mockMessage.id!);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages/${mockMessage.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "DELETE");
  });

  it("makes successful add chat participants request", async () => {
    const mockHttpClient = generateHttpClient(201);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: AddChatParticipantsRequest = {
      participants: [mockSdkModelParticipant]
    };

    await chatThreadClient.addParticipants(sendRequest);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/participants/:add?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
    const requestJson = JSON.parse(request.body);
    assert.equal(
      sendRequest.participants[0].user.communicationUserId,
      requestJson.participants[0].id
    );
    assert.equal(sendRequest.participants[0].displayName, requestJson.participants[0].displayName);
    assert.equal(
      sendRequest.participants[0].shareHistoryTime?.toDateString(),
      new Date(requestJson.participants[0].shareHistoryTime).toDateString()
    );
  });

  it("makes successful list chat participants request", async () => {
    const mockHttpClient = generateHttpClient(200, {
      value: [mockRestModelParticipant]
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const participant of chatThreadClient.listParticipants()) {
      ++count;
      const { user, ...requestParticipant } = participant;
      const { id, ...expectedParticipant } = mockRestModelParticipant;

      assert.equal(user.communicationUserId, id);
      assert.deepEqual(requestParticipant, expectedParticipant);
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, 1);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/participants?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful remove chat participant request", async () => {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.removeParticipant(mockSdkModelParticipant.user);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/participants/${mockSdkModelParticipant.user.communicationUserId}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "DELETE");
  });

  it("makes successful sent typing notification request", async () => {
    const mockHttpClient = generateHttpClient(200);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const result = await chatThreadClient.sendTypingNotification();
    assert.isTrue(result);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/typing?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
  });

  it("makes successful sent read receipt request", async () => {
    const mockHttpClient = generateHttpClient(200);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.sendReadReceipt({ chatMessageId: mockMessage.id! });

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/readReceipts?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
  });

  it("makes successful list read receipts request", async () => {
    const mockHttpClient = generateHttpClient(200, {
      value: [mockChatMessageReadReceipt, mockChatMessageReadReceipt]
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const readReceipt of chatThreadClient.listReadReceipts()) {
      ++count;
      const { sender, ...requestReceipt } = readReceipt;
      const { senderId, ...expectedReceipt } = mockChatMessageReadReceipt;

      assert.equal(sender?.communicationUserId, senderId);
      assert.deepEqual(requestReceipt, expectedReceipt);
    }

    assert.equal(count, 2);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/readReceipts?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });
});
