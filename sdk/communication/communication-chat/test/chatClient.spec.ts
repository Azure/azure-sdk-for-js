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
      members: [{ user: testUser }, { user: testUser2 }]
    };

    chatThreadClient = await chatClient.createChatThread(request);
    threadId = chatThreadClient.threadId;

    assert.isNotNull(threadId);
  }).timeout(8000);

  it("successfully retrieves a thread client", async function() {
    const chatThreadClient = await chatClient.getChatThreadClient(threadId);
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

  it("successfully adds members", async function() {
    testUser3 = (await createTestUser()).user;

    const request = { members: [{ user: testUser3 }] };
    await chatThreadClient.addMembers(request);
  });

  it("successfully lists members", async function() {
    const list: string[] = [];
    for await (const member of chatThreadClient.listMembers()) {
      list.push(member.user.communicationUserId!);
    }
  });

  it("successfully remove a member", async function() {
    await chatThreadClient.removeMember({ communicationUserId: testUser2.communicationUserId });
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
