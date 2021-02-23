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
import { mockParticipant } from "./utils/mockClient";
import {
  generateHttpClient,
  createChatThreadClient,
  mockMessage,
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

    const message = await chatThreadClient.getMessage(mockMessage.id!);

    sinon.assert.calledOnce(spy);
    assert.deepEqual(message, mockMessage);

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
      assert.deepEqual(message, mockMessage);
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
      participants: [mockParticipant]
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
      sendRequest.participants[0].communicationIdentifier.rawId,
      requestJson.participants[0].communicationIdentifier.rawId
    );
    assert.equal(sendRequest.participants[0].displayName, requestJson.participants[0].displayName);
    assert.equal(
      sendRequest.participants[0].shareHistoryTime?.toDateString(),
      new Date(requestJson.participants[0].shareHistoryTime).toDateString()
    );
  });

  it("makes successful list chat participants request", async () => {
    const mockHttpClient = generateHttpClient(200, {
      value: [mockParticipant]
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const participant of chatThreadClient.listParticipants()) {
      ++count;

      assert.deepEqual(participant, mockParticipant);
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

    await chatThreadClient.removeParticipant(mockParticipant.communicationIdentifier);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/participants/:remove?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
    const requestJson = JSON.parse(request.body);
    assert.equal(mockParticipant.communicationIdentifier.rawId, requestJson.rawId);
    assert.deepEqual(mockParticipant.communicationIdentifier, requestJson);
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
      assert.deepEqual(readReceipt, mockChatMessageReadReceipt);
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
