// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import { assert, expect } from "chai";
import {
  ChatClient,
  ChatClientOptions,
  CreateChatThreadOptions,
  CreateChatThreadRequest,
} from "../../src";
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
  mockThreadItemWithRetentionPolicy,
} from "./utils/mockClient";
import { isNode } from "@azure/core-util";

const API_VERSION = apiVersion.mapper.defaultValue;

describe("[Mocked] ChatClient", async function () {
  let chatClient: ChatClient;
  let listener: () => {
    // Intentionally empty listener for testing purposes
  };

  afterEach(function () {
    sinon.restore();
  });

  it("can instantiate", async function () {
    new ChatClient(baseUri, new AzureCommunicationTokenCredential(generateToken()));
  });

  it("can instantiate with custom api version policy", async function () {
    const customizedVersion = `2021-03-07`;
    const mockHttpClient = generateHttpClient(201, mockCreateThreadResult);
    const options = { apiVersion: customizedVersion, httpClient: mockHttpClient };
    chatClient = new ChatClient(
      baseUri,
      new AzureCommunicationTokenCredential(generateToken()),
      options as ChatClientOptions,
    );

    const spy = sinon.spy(mockHttpClient, "sendRequest");
    await chatClient.createChatThread({ topic: mockThread.topic });
    const request = spy.getCall(0).args[0];
    assert.equal(request.url, `${baseUri}/chat/threads?api-version=${customizedVersion}`);
  });

  it("makes successful create thread request", async function () {
    const mockHttpClient = generateHttpClient(201, mockCreateThreadResult);

    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: CreateChatThreadRequest = {
      topic: mockThread.topic!,
    };

    const sendOptions = {
      metadata: mockThread.metadata,
    };

    const createThreadResult = await chatClient.createChatThread(sendRequest, sendOptions);

    sinon.assert.calledOnce(spy);
    assert.isDefined(createThreadResult.chatThread);
    assert.equal(createThreadResult.chatThread?.id, mockThread.id);
    assert.equal(createThreadResult.chatThread?.createdBy?.kind, "communicationUser");
    assert.deepEqual(
      (createThreadResult.chatThread?.createdBy as CommunicationUserIdentifier).communicationUserId,
      mockCreateThreadResult.chatThread?.createdByCommunicationIdentifier.communicationUser?.id,
    );
    assert.deepEqual(createThreadResult.chatThread?.metadata, mockThread.metadata);
    assert.deepEqual(createThreadResult.chatThread?.retentionPolicy, mockThread.retentionPolicy);

    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/chat/threads?api-version=${API_VERSION}`);
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body as string), { ...sendRequest, ...sendOptions });
    assert.isNotEmpty(request.headers.get("repeatability-request-id"));
  });

  it("makes successful create thread request with retention policy", async function () {
    const mockHttpClient = generateHttpClient(201, {
      chatThread: mockThreadItemWithRetentionPolicy,
    });

    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const sendRequest: CreateChatThreadRequest = {
      topic: mockThread.topic!,
    };

    const sendOptions: CreateChatThreadOptions = {
      retentionPolicy: { kind: "threadCreationDate", deleteThreadAfterDays: 90 },
    };

    const createThreadResult = await chatClient.createChatThread(sendRequest, sendOptions);

    sinon.assert.calledOnce(spy);
    assert.isDefined(createThreadResult.chatThread);
    assert.equal(createThreadResult.chatThread?.id, mockThreadItemWithRetentionPolicy.id);
    assert.equal(createThreadResult.chatThread?.createdBy?.kind, "communicationUser");
    assert.deepEqual(createThreadResult.chatThread?.retentionPolicy, sendOptions.retentionPolicy);

    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/chat/threads?api-version=${API_VERSION}`);
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body as string), { ...sendRequest, ...sendOptions });
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

  it("makes successful list threads request by page", async function () {
    const mockResponse: RestModel.ChatThreadsItemCollection = {
      value: [mockThreadItem, mockThreadItem, mockThreadItem, mockThreadItem, mockThreadItem],
    };

    const mockHttpClient = generateHttpClient(200, mockResponse);
    chatClient = createChatClient(mockHttpClient);
    const spy = sinon.spy(mockHttpClient, "sendRequest");

    const chatThreadsIterator = chatClient.listChatThreads({ maxPageSize: 2 });
    let count = 0;
    // loop over each page
    for await (const page of chatThreadsIterator.byPage()) {
      // loop over each item in the page
      for (const info of page) {
        ++count;
        assert.isNotNull(info);
        assert.deepEqual(info, mockThreadItem);
      }
    }

    sinon.assert.calledOnce(spy);
    assert.equal(count, mockResponse.value?.length);
    const request = spy.getCall(0).args[0];

    assert.equal(request.url, `${baseUri}/chat/threads?maxPageSize=2&api-version=${API_VERSION}`);
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
      `${baseUri}/chat/threads/${mockThread.id}?api-version=${API_VERSION}`,
    );
    assert.equal(request.method, "DELETE");
  });

  it("should throw an error to start real time notifications in node", async function () {
    if (!isNode) {
      this.skip();
    }

    try {
      await chatClient.startRealtimeNotifications();
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are not supported in node js.",
      );
    }
  });

  it("should throw an error to stop real time notifications in node", async function () {
    if (!isNode) {
      this.skip();
    }

    try {
      await chatClient.stopRealtimeNotifications();
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are not supported in node js.",
      );
    }
  });

  it("should throw an error to unsubscribe an event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.off("chatMessageReceived", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe chatMessageReceived event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("chatMessageReceived", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe chatMessageEdited event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("chatMessageEdited", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe chatMessageDeleted event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("chatMessageDeleted", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe typingIndicatorReceived event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("typingIndicatorReceived", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe readReceiptReceived event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("readReceiptReceived", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe chatThreadCreated event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("chatThreadCreated", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe chatThreadDeleted event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("chatThreadDeleted", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe chatThreadPropertiesUpdated event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("chatThreadPropertiesUpdated", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe participantsAdded event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("participantsAdded", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });

  it("should throw an error to subscribe participantsRemoved event in node", function () {
    if (!isNode) {
      this.skip();
    }

    try {
      chatClient.on("participantsRemoved", listener);
      throw new Error("Error is expected.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect((error as Error).message).to.equal(
        "Realtime notifications are only supported in the browser.",
      );
    }
  });
});
