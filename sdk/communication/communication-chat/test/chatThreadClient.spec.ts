// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { ChatClient, ChatThreadClient } from "../src";
import { createTestUser, createRecorder, createChatClient, getCommunicationIdentifier } from './utils/recordedClient';
import { CreateChatThreadRequest, CommunicationIdentifierModel } from '../src/generated/src/models/index';

describe("ChatThreadClient", function() {
  let messageId: string;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;
  let threadId: string;

  let testUser: CommunicationIdentifierModel;
  let testUser2: CommunicationIdentifierModel;
  let testUser3: CommunicationIdentifierModel;

  beforeEach(async function() {
    recorder = createRecorder(this);
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  /**
   * This test intialized chatThreadClient for other tests with recorder enabled
   */
  it("successfully intializes chatThreadClient", async function() {
    // Create ChatClient
    const communicationUserToken = await createTestUser();
    chatClient = createChatClient(communicationUserToken.token);

    testUser = getCommunicationIdentifier(communicationUserToken.user);
    testUser2 = getCommunicationIdentifier((await createTestUser()).user);

    // Create a thread
    const threadRequest: CreateChatThreadRequest = {
      topic: "test topic",
      participants: [{communicationIdentifier: testUser}, { communicationIdentifier: testUser2}]
    };

    const chatThreadResult = await chatClient.createChatThread(threadRequest);
    threadId = chatThreadResult.chatThread?.id!;

    // Create ChatThreadClient
    chatThreadClient = await chatClient.getChatThreadClient(threadId);
  });

  it("successfully updates the thread topic", async function() {
    const topic = "new topic";
    await chatThreadClient.updateTopic(topic);

    const thread = await chatClient.getChatThread(threadId);
    assert.equal(topic, thread.topic);
  });

  it("successfully sends a message", async function() {
    const request = { content: `content` };
    const result = await chatThreadClient.sendMessage(request);

    assert.isNotNull(result.id);
    messageId = result.id!;
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
    testUser3 = getCommunicationIdentifier((await createTestUser()).user);

    const request = { participants: [{ communicationIdentifier: testUser3 }] };
    await chatThreadClient.addParticipants(request);
  });

  it("successfully lists participants", async function() {
    const list: string[] = [];
    for await (const participant of chatThreadClient.listParticipants()) {
      list.push(participant.communicationIdentifier.communicationUser?.id!);
    }
  });

  it("successfully remove a participant", async function() {
    await chatThreadClient.removeParticipant(testUser2);
  });

  it("successfully lists read receipts", async function() {
    const list: string[] = [];
    for await (const receipt of chatThreadClient.listReadReceipts()) {
      list.push(receipt.chatMessageId!);
    }
  });
});
