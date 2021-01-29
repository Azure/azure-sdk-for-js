// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert } from "chai";
import { ChatClient, CreateChatThreadRequest } from "../src";
import * as RestModel from "../src/generated/src/models";
import { apiVersion } from "../src/generated/src/models/parameters";
import { baseUri, generateToken } from "./utils/connectionUtils";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import {
  mockThread,
  generateHttpClient,
  createChatClient,
  mockThreadInfo,
  mockCreateThreadResult
} from "./utils/mockClient";

const API_VERSION = apiVersion.mapper.defaultValue;

describe("[Mocked] ChatClient", async () => {
  let chatClient: ChatClient;

  afterEach(() => {
    sinon.restore();
  });

  it("can instantiate", async () => {
    new ChatClient(baseUri, new AzureCommunicationTokenCredential(generateToken()));
  });

  it("makes successful create thread request", async () => {
    const mockHttpClient = generateHttpClient(201, mockCreateThreadResult);

    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: CreateChatThreadRequest = {
      topic: mockThread.topic!,
      participants: []
    };

    const sendOptions = {};

    const createThreadResult = await chatClient.createChatThread(sendRequest, sendOptions);

    sinon.assert.calledOnce(spy);
    assert.isDefined(createThreadResult.chatThread);
    assert.equal(createThreadResult.chatThread?.id, mockThread.id);

    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/chat/threads?api-version=${API_VERSION}`);
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body), sendRequest);
  });

  it("makes successful get thread request", async () => {
    const mockHttpClient = generateHttpClient(200, mockThread);
    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const { createdBy: responseUser, _response, ...response } = await chatClient.getChatThread(
      mockThread.id!
    );
    const { createdBy: expectedId, ...expected } = mockThread;

    sinon.assert.calledOnce(spy);

    assert.deepEqual(response, expected);
    assert.equal(responseUser?.communicationUserId, expectedId);

    const request = spy.getCall(0).args[0];

    assert.equal(
      request.url,
      `${baseUri}/chat/threads/${mockThread.id}?api-version=${API_VERSION}`
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

    assert.equal(request.url, `${baseUri}/chat/threads?api-version=${API_VERSION}`);
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
      `${baseUri}/chat/threads/${mockThread.id}?api-version=${API_VERSION}`
    );
    assert.equal(request.method, "DELETE");
  });
});
