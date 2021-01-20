// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert } from "chai";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import {
  ChatThreadClient,
  UpdateThreadOptions,
  SendMessageRequest,
  SendMessageOptions,
  UpdateMessageOptions,
  AddMembersRequest
} from "../src";
import * as RestModel from "../src/generated/src/models";
import { apiVersion } from "../src/generated/src/models/parameters";
import { baseUri, generateToken } from "./utils/connectionUtils";
import {
  generateHttpClient,
  createChatThreadClient,
  mockMessage,
  mockRestModelMember,
  mockSdkModelMember,
  mockReadReceipt
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

  it("makes successful update thread request", async () => {
    const mockHttpClient = generateHttpClient(200);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);

    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendOptions: UpdateThreadOptions = {
      topic: "mockTopic"
    };

    await chatThreadClient.updateThread(sendOptions);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/chat/threads/${threadId}?api-version=${API_VERSION}`);
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body), { topic: sendOptions.topic });
  });

  it("makes successful send message request", async () => {
    const mockHttpClient = generateHttpClient(201, {
      id: mockMessage.id
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: SendMessageRequest = {
      content: mockMessage.content!
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
      _response,
      ...responseMessage
    } = await chatThreadClient.getMessage(mockMessage.id!);
    const { senderId: expectedId, ...expectedMessage } = mockMessage;

    sinon.assert.calledOnce(spy);
    assert.deepEqual(responseMessage, expectedMessage);
    assert.equal(responseUser?.communicationUserId, expectedId);

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
      const { sender: responseUser, ...responseMessage } = message;
      const { senderId: expectedId, ...expectedMessage } = mockMessage;

      assert.deepEqual(responseMessage, expectedMessage);
      assert.equal(responseUser?.communicationUserId, expectedId);
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
    const mockHttpClient = generateHttpClient(200);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendOptions: UpdateMessageOptions = {
      content: mockMessage.content
    };

    await chatThreadClient.updateMessage(mockMessage.id!, sendOptions);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/messages/${mockMessage.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "PATCH");
    assert.deepEqual(JSON.parse(request.body), { content: mockMessage.content });
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

  it("makes successful add thread members request", async () => {
    const mockHttpClient = generateHttpClient(207);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: AddMembersRequest = {
      members: [mockSdkModelMember]
    };

    await chatThreadClient.addMembers(sendRequest);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/members?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
    const requestJson = JSON.parse(request.body);
    assert.equal(sendRequest.members[0].user.communicationUserId, requestJson.members[0].id);
    assert.equal(sendRequest.members[0].displayName, requestJson.members[0].displayName);
    assert.equal(
      sendRequest.members[0].shareHistoryTime?.toDateString(),
      new Date(requestJson.members[0].shareHistoryTime).toDateString()
    );
  });

  it("makes successful list thread members request", async () => {
    const mockHttpClient = generateHttpClient(200, {
      value: [mockRestModelMember]
    });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const member of chatThreadClient.listMembers()) {
      ++count;
      const { user, ...requestMember } = member;
      const { id, ...expectedMember } = mockRestModelMember;

      assert.equal(user.communicationUserId, id);
      assert.deepEqual(requestMember, expectedMember);
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, 1);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/members?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful remove thread member request", async () => {
    const mockHttpClient = generateHttpClient(204);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.removeMember(mockSdkModelMember.user);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/members/${mockSdkModelMember.user.communicationUserId}?api-version=${API_VERSION}`
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
    const mockHttpClient = generateHttpClient(201);
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatThreadClient.sendReadReceipt({ chatMessageId: mockMessage.id! });

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/readreceipts?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "POST");
  });

  it("makes successful list read receipts request", async () => {
    const mockHttpClient = generateHttpClient(200, { value: [mockReadReceipt, mockReadReceipt] });
    chatThreadClient = createChatThreadClient(threadId, mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const readReceipt of chatThreadClient.listReadReceipts()) {
      ++count;
      const { sender, ...requestReceipt } = readReceipt;
      const { senderId, ...expectedReceipt } = mockReadReceipt;

      assert.equal(sender?.communicationUserId, senderId);
      assert.deepEqual(requestReceipt, expectedReceipt);
    }

    assert.equal(count, 2);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${threadId}/readreceipts?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "GET");
  });
});
