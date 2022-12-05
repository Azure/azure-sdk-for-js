// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert } from "chai";
import { ChatClient, CreateChatThreadRequest } from "../../src";
import * as RestModel from "../../src/generated/src/models";
import { apiVersion } from "../../src/generated/src/models/parameters";
import { baseUri, generateToken } from "../public/utils/connectionUtils";
import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import {
  createChatClient,
  generateHttpClient,
  mockCreateThreadResult,
  mockThread,
  mockThreadItem,
} from "./utils/mockClient";

const API_VERSION = apiVersion.mapper.defaultValue;

describe("[Mocked] ChatClient", async function () {
  let chatClient: ChatClient;

  afterEach(function () {
    sinon.restore();
  });

  it("can instantiate", async function () {
    new ChatClient(baseUri, new AzureCommunicationTokenCredential(generateToken()));
  });

  it("makes successful create thread request", async function () {
    const mockHttpClient = generateHttpClient(201, mockCreateThreadResult);

    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: CreateChatThreadRequest = {
      topic: mockThread.topic!,
    };

    const sendOptions = {};

    const createThreadResult = await chatClient.createChatThread(sendRequest, sendOptions);

    sinon.assert.calledOnce(spy);
    assert.isDefined(createThreadResult.chatThread);
    assert.equal(createThreadResult.chatThread?.id, mockThread.id);
    assert.equal(createThreadResult.chatThread?.createdBy?.kind, "communicationUser");
    assert.deepEqual(
      (createThreadResult.chatThread?.createdBy as CommunicationUserIdentifier).communicationUserId,
      mockCreateThreadResult.chatThread?.createdByCommunicationIdentifier.communicationUser?.id
    );

    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/chat/threads?api-version=${API_VERSION}`);
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body as string), sendRequest);
    assert.isNotEmpty(request.headers.get("repeatability-request-id"));
  });

  it("makes successful list threads request", async function () {
    const mockResponse: RestModel.ChatThreadsItemCollection = {
      value: [mockThreadItem, mockThreadItem],
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    let count = 0;
    for await (const info of chatClient.listChatThreads()) {
      ++count;
      assert.isNotNull(info);
      assert.deepEqual(info, mockThreadItem);
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, mockResponse.value?.length);
    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/chat/threads?api-version=${API_VERSION}`);
    assert.equal(request.method, "GET");
  });

  it("makes successful delete thread request", async function () {
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
