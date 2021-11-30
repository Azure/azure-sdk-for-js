// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { ChatClient, ChatThreadClient } from "../../src";
import { createTestUser, createRecorder, createChatClient } from "./utils/recordedClient";
import { CommunicationIdentifier, getIdentifierKind } from "@azure/communication-common";
import { Context } from "mocha";

describe("ChatThreadClient", function() {
  let messageId: string;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;
  let threadId: string;

  let testUser: CommunicationIdentifier;
  let testUser2: CommunicationIdentifier;
  let testUser3: CommunicationIdentifier;

  beforeEach(async function(this: Context) {
    recorder = createRecorder(this);
  });

  afterEach(async function(this: Context) {
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

    testUser = communicationUserToken.user;
    testUser2 = (await createTestUser()).user;

    // Create a thread
    const request = { topic: "test topic" };
    const options = {
      participants: [{ id: testUser }, { id: testUser2 }]
    };

    const chatThreadResult = await chatClient.createChatThread(request, options);
    threadId = chatThreadResult.chatThread?.id as string;

    // Create ChatThreadClient
    chatThreadClient = await chatClient.getChatThreadClient(threadId);
  }).timeout(8000);

  it("successfully gets the thread properties", async function() {
    const thread = await chatThreadClient.getProperties();

    assert.equal(threadId, thread.id);
  });

  it("successfully updates the thread topic", async function() {
    const topic = "new topic";
    await chatThreadClient.updateTopic(topic);

    const thread = await chatThreadClient.getProperties();
    assert.equal(topic, thread.topic);
  });

  it("successfully sends a message", async function() {
    const request = { content: `content` };
    const options = { metadata: { tags: "sometag" } };
    const result = await chatThreadClient.sendMessage(request, options);

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
    assert.isDefined(message.metadata?.tags);
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

    const request = { participants: [{ id: testUser3 }] };
    await chatThreadClient.addParticipants(request);
  });

  it("successfully lists participants", async function() {
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
