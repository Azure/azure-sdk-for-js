// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { ChatClient, ChatThreadClient } from "../src";
import { createTestUser, createRecorder, createChatClient } from "./utils/recordedClient";
import { CommunicationUserIdentifier } from "@azure/communication-common";

describe("ChatClient", function() {
  let threadId: string;
  let messageId: string;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;

  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let testUser3: CommunicationUserIdentifier;

  this.afterAll(async function() {
    // await deleteTestUser(testUser);
    // await deleteTestUser(testUser2);
    // await deleteTestUser(testUser3);
  });

  beforeEach(function() {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  /**
   * Make sure this the FIRST test!
   */
  it("successfully creates a thread", async function() {
    const communicationUserToken = await createTestUser();

    testUser = communicationUserToken.user;
    chatClient = createChatClient(communicationUserToken.token);

    testUser2 = (await createTestUser()).user;

    const request = {
      topic: "test topic",
      participants: [
        { user: testUser, shareHistoryTime: new Date("2020-05-26T18:06:06Z") },
        { user: testUser2, shareHistoryTime: new Date("2020-05-26T18:06:06Z") }
      ]
    };

    const chatThreadResult = await chatClient.createChatThread(request);

    const chatThread = chatThreadResult.chatThread;
    if (chatThread) {
      threadId = chatThread.id!;
    }

    assert.isDefined(chatThread);
    assert.isDefined(chatThread?.id);
  }).timeout(8000);

  /**
   * Make sure this is the SECOND test!
   * This creates the chatThreadClient used by other tests.
   */
  it("successfully retrieves a thread client", async function() {
    chatThreadClient = await chatClient.getChatThreadClient(threadId);
    assert.isNotNull(chatThreadClient);
    assert.equal(chatThreadClient.threadId, threadId);
  });

  it("successfully retrieves a thread", async function() {
    const thread = await chatClient.getChatThread(threadId);
    assert.isNotNull(thread);
    assert.equal(thread.id, threadId);
  });

  it("successfully lists threads", async function() {
    const list: string[] = [];
    for await (const thread of chatClient.listChatThreads()) {
      list.push(thread.id!);
    }
  });

  it("successfully sends a message", async function() {
    const request = { content: `content` };
    const result = await chatThreadClient.sendMessage(request);

    assert.isNotNull(result.id);
    messageId = result.id!!;
  });

  it("successfully sends typing notification", async function() {
    const result = await chatThreadClient.sendTypingNotification();

    assert.isTrue(result);
  });

  it("successfully sends read receipt", async function() {
    await chatThreadClient.sendReadReceipt({ chatMessageId: messageId });
  });

  it("successfully retrieves a message", async function() {
    const message = await chatThreadClient.getMessage(messageId);

    assert.isNotNull(message);
    assert.equal(message.id, messageId);
  });

  it("successfully lists messages", async function() {
    const list: string[] = [];
    for await (const message of chatThreadClient.listMessages()) {
      list.push(message.id!);
    }
  });

  it("successfully deletes a message", async function() {
    await chatThreadClient.deleteMessage(messageId);
  });

  it("successfully adds participants", async function() {
    testUser3 = (await createTestUser()).user;

    const request = {
      participants: [{ user: testUser3, shareHistoryTime: new Date("2020-05-26T18:06:06Z") }]
    };
    await chatThreadClient.addParticipants(request);
  });

  it("successfully lists participants", async function() {
    const list: string[] = [];
    for await (const participant of chatThreadClient.listParticipants()) {
      list.push(participant.user.communicationUserId!);
    }
  });

  it("successfully remove a participant", async function() {
    await chatThreadClient.removeParticipant({
      communicationUserId: testUser2.communicationUserId
    });
  });

  it("successfully lists read receipts", async function() {
    const list: string[] = [];
    for await (const receipt of chatThreadClient.listReadReceipts()) {
      list.push(receipt.chatMessageId!);
    }
  });

  it("successfully deletes a thread", async function() {
    await chatClient.deleteChatThread(threadId);
  });
});
