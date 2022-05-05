// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable @typescript-eslint/no-invalid-this */

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { ChatClient, ChatMessage, ChatThreadClient } from "../../src";
import { createChatClient, createRecorder, createTestUser } from "./utils/recordedClient";
import { CommunicationIdentifier, getIdentifierKind } from "@azure/communication-common";
import { Context } from "mocha";
import { CommunicationUserToken } from "@azure/communication-identity";

describe("ChatThreadClient", function () {
  let messageId: string;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;
  let threadId: string;
  let communicationUserToken: CommunicationUserToken;
  let testUser: CommunicationIdentifier;
  let testUser2: CommunicationIdentifier;
  let testUser3: CommunicationIdentifier;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this.currentTest);
    if (!communicationUserToken) {
      communicationUserToken = await createTestUser(recorder);
      await recorder.setMatcher("HeaderlessMatcher");
    }
    chatClient = createChatClient(communicationUserToken.token, recorder);
    // Create ChatThreadClient
    chatThreadClient = chatClient.getChatThreadClient(threadId);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  /**
   * This test intialized chatThreadClient for other tests with recorder enabled
   */
  it("successfully initializes chatThreadClient", async function () {
    // Create ChatClient
    testUser = communicationUserToken.user;
    testUser2 = (await createTestUser(recorder)).user;

    // Create a thread
    const request = { topic: "test topic" };
    const options = {
      participants: [{ id: testUser }, { id: testUser2 }],
    };

    const chatThreadResult = await chatClient.createChatThread(request, options);
    threadId = chatThreadResult.chatThread?.id as string;
  }).timeout(8000);

  it("successfully gets the thread properties", async function () {
    const thread = await chatThreadClient.getProperties();

    assert.equal(threadId, thread.id);
  });

  it("successfully updates the thread topic", async function () {
    const topic = "new topic";
    await chatThreadClient.updateTopic(topic);

    const thread = await chatThreadClient.getProperties();
    assert.equal(topic, thread.topic);
  });

  it("successfully sends a message", async function () {
    const request = { content: `content` };
    const options = { metadata: { tags: "sometag" } };
    const result = await chatThreadClient.sendMessage(request, options);

    assert.isNotNull(result.id);
    messageId = result.id!;
  });

  it("successfully sends typing notification", async function () {
    const result = await chatThreadClient.sendTypingNotification();

    assert.isTrue(result);
  });

  it("successfully sends read receipt", async function () {
    await chatThreadClient.sendReadReceipt({ chatMessageId: messageId });
  });

  it("successfully retrieves a message", async function () {
    const message = await chatThreadClient.getMessage(messageId);

    assert.isNotNull(message);
    assert.equal(message.id, messageId);
    assert.isDefined(message.metadata?.tags);
  });

  it("successfully lists messages one by one and by page", async function () {
    const receivedItems: ChatMessage[] = [];
    for await (const message of chatThreadClient.listMessages()) {
      receivedItems.push(message);
    }

    let pagesCount = 0;
    const maxPageSize = 3;
    const receivedPagedItems: ChatMessage[] = [];
    for await (const page of chatThreadClient.listMessages({ maxPageSize: maxPageSize }).byPage()) {
      ++pagesCount;
      let pageSize = 0;
      for (const message of page) {
        ++pageSize;
        receivedPagedItems.push(message);
      }
      assert.isAtMost(pageSize, maxPageSize);
    }

    assert.equal(pagesCount, Math.ceil(receivedItems.length / maxPageSize));
    assert.deepEqual(receivedPagedItems, receivedItems);
  });

  it("successfully deletes a message", async function () {
    await chatThreadClient.deleteMessage(messageId);
  });

  it("successfully adds participants", async function () {
    testUser3 = (await createTestUser(recorder)).user;

    const request = { participants: [{ id: testUser3 }] };
    await chatThreadClient.addParticipants(request);
  });

  it("successfully lists participants", async function () {
    const list: string[] = [];
    for await (const participant of chatThreadClient.listParticipants()) {
      const id = getIdentifierKind(participant.id);
      switch (id.kind) {
        case "communicationUser":
          list.push(id.communicationUserId);
          break;
        case "microsoftTeamsUser":
          list.push(id.microsoftTeamsUserId);
          break;
        case "phoneNumber":
          list.push(id.phoneNumber);
          break;
        case "unknown":
          list.push(id.id);
          break;
      }
    }
  });

  it("successfully remove a participant", async function () {
    await chatThreadClient.removeParticipant(testUser2);
  });

  it("successfully lists read receipts", async function () {
    const list: string[] = [];
    for await (const receipt of chatThreadClient.listReadReceipts()) {
      list.push(receipt.chatMessageId!);
    }
  });
});
