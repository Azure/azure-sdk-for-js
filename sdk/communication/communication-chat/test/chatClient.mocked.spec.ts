// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert } from "chai";
import { ChatClient, CreateChatThreadRequest } from "../src";
import * as RestModel from "../src/generated/src/models";
import { SDK_VERSION } from "../src/constants";
import { baseUri, generateToken } from "./utils/connectionUtils";
import { AzureCommunicationUserCredential } from "@azure/communication-common";
import {
  mockThread,
  generateHttpClient,
  createChatClient,
  mockThreadInfo
} from "./utils/mockClient";

describe("[Mocked] ChatClient", async () => {
  let chatClient: ChatClient;

  afterEach(() => {
    sinon.restore();
  });

  it("can instantiate", async () => {
    new ChatClient(baseUri, new AzureCommunicationUserCredential(generateToken()));
  });

  it("makes successful create thread request", async () => {
    const mockHttpClient = generateHttpClient(207, {
      multipleStatus: [
        {
          id: mockThread.id,
          statusCode: 201,
          type: "Thread"
        }
      ]
    });

    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: CreateChatThreadRequest = {
      topic: mockThread.topic!,
      members: []
    };

    const sendOptions = {};

    const chatThreadClient = await chatClient.createChatThread(sendRequest, sendOptions);

    sinon.assert.calledOnce(spy);
    assert.equal(chatThreadClient.threadId, mockThread.id);

    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/chat/threads?api-version=${SDK_VERSION}`);
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body), sendRequest);
  });

  it("makes successful get thread request", async () => {
    const mockHttpClient = generateHttpClient(200, mockThread);
    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const {
      createdBy: responseUser,
      _response,
      members: responseMembers,
      ...response
    } = await chatClient.getChatThread(mockThread.id!);
    const { createdBy: expectedId, members: expectedMembers, ...expected } = mockThread;

    sinon.assert.calledOnce(spy);

    assert.deepEqual(response, expected);
    assert.equal(responseUser?.communicationUserId, expectedId);
    assert.equal(responseMembers?.length, expectedMembers?.length);
    const { user, ...responseMember } = responseMembers![0];
    const { id, ...expectedMember } = expectedMembers![0];
    assert.equal(user.communicationUserId, id);
    assert.deepEqual(responseMember, expectedMember);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${mockThread.id}?api-version=${SDK_VERSION}`
    );
    assert.equal(request.method, "GET");
  });

  it("makes successful list threads request", async () => {
    const mockResponse: RestModel.ChatThreadsInfoCollection = {
      value: [mockThreadInfo, mockThreadInfo]
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const info of chatClient.listChatThreads()) {
      ++count;
      assert.isNotNull(info);
      assert.deepEqual(info, mockThreadInfo);
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, mockResponse.value?.length);
    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/chat/threads?api-version=${SDK_VERSION}`);
    assert.equal(request.method, "GET");
  });

  it("makes successful delete thread request", async () => {
    const mockHttpClient = generateHttpClient(204);
    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    await chatClient.deleteChatThread(mockThread.id!);

    sinon.assert.calledOnce(spy);
    const request = spy.getCall(0).args[0];
    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${mockThread.id}?api-version=${SDK_VERSION}`
    );
    assert.equal(request.method, "DELETE");
  });
});
