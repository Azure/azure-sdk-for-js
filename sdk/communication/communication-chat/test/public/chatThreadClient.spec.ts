// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  ChatClient,
  ChatMessage,
  ChatThreadClient,
  NoneRetentionPolicy,
  ThreadCreationDateRetentionPolicy,
} from "../../src/index.js";
import { createChatClient, createRecorder, createTestUser } from "./utils/recordedClient.js";
import type { CommunicationIdentifier } from "@azure/communication-common";
import { getIdentifierKind } from "@azure/communication-common";
import type { CommunicationUserToken } from "@azure/communication-identity";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { isNodeLike } from "@azure/core-util";

// TODO: Re-record the tests with the new recorder
describe("ChatThreadClient", { skip: !isNodeLike }, () => {
  let messageId: string;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;
  let threadId: string;
  let communicationUserToken: CommunicationUserToken;
  let testUser: CommunicationIdentifier;
  let testUser2: CommunicationIdentifier;
  let testUser3: CommunicationIdentifier;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    if (!communicationUserToken) {
      communicationUserToken = await createTestUser(recorder);
      await recorder.setMatcher("HeaderlessMatcher");
    }
    chatClient = createChatClient(communicationUserToken.token, recorder);
    // Create ChatThreadClient
    chatThreadClient = chatClient.getChatThreadClient(threadId);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  /**
   * This test intialized chatThreadClient for other tests with recorder enabled
   */
  it("successfully initializes chatThreadClient", { timeout: 8000 }, async () => {
    // Create ChatClient
    testUser = communicationUserToken.user;
    testUser2 = (await createTestUser(recorder)).user;

    // Create a thread
    const request = { topic: "test topic" };
    const retentionPolicy: ThreadCreationDateRetentionPolicy = {
      kind: "threadCreationDate",
      deleteThreadAfterDays: 60,
    };
    const options = {
      participants: [{ id: testUser }, { id: testUser2 }],
      metadata: {
        threadType: "primary",
        secondaryThread: "test-id",
      },
      retentionPolicy: retentionPolicy,
    };

    const chatThreadResult = await chatClient.createChatThread(request, options);
    threadId = chatThreadResult.chatThread?.id as string;
  });

  it("successfully gets the thread properties", async () => {
    const thread = await chatThreadClient.getProperties();

    assert.equal(threadId, thread.id);
  });

  it("successfully updates the thread topic", async () => {
    const topic = "new topic";
    await chatThreadClient.updateTopic(topic);

    const thread = await chatThreadClient.getProperties();
    assert.equal(topic, thread.topic);
  });

  it("successfully updates the thread retention policy to none retention policy", async function () {
    const retentionPolicy: NoneRetentionPolicy = { kind: "none" };

    await chatThreadClient.updateProperties({ retentionPolicy: retentionPolicy });

    const thread = await chatThreadClient.getProperties();
    assert.deepEqual(thread.retentionPolicy, { kind: "none" });
  });

  it("successfully updates the thread metadata", async function () {
    const metadata = { threadType: "secondary" };
    await chatThreadClient.updateProperties({ metadata: metadata });

    const thread = await chatThreadClient.getProperties();
    assert.equal(metadata.threadType, thread.metadata?.threadType);
    assert.deepEqual(thread.retentionPolicy, { kind: "none" });
  });

  it("successfully updates the thread retention policy", async function () {
    const retentionPolicy: ThreadCreationDateRetentionPolicy = {
      kind: "threadCreationDate",
      deleteThreadAfterDays: 90,
    };
    await chatThreadClient.updateProperties({ retentionPolicy: retentionPolicy });

    const thread = await chatThreadClient.getProperties();
    assert.equal(retentionPolicy.kind, thread.retentionPolicy?.kind);
    if (thread.retentionPolicy?.kind === "threadCreationDate") {
      assert.equal(
        retentionPolicy.deleteThreadAfterDays,
        thread.retentionPolicy.deleteThreadAfterDays,
      );
    } else {
      assert.fail("Expected a threadCreationDate retention policy");
    }
  });

  it("successfully updates the thread retention policy to none retention plicy by setting null", async function () {
    const request = { topic: "test topic" };
    const retentionPolicy: ThreadCreationDateRetentionPolicy = {
      kind: "threadCreationDate",
      deleteThreadAfterDays: 90,
    };

    const chatThreadResult = await chatClient.createChatThread(request, { retentionPolicy });
    threadId = chatThreadResult.chatThread?.id as string;

    assert.equal(retentionPolicy.kind, chatThreadResult.chatThread?.retentionPolicy?.kind);

    await chatThreadClient.updateProperties({ retentionPolicy: null as any });

    const thread = await chatThreadClient.getProperties();
    assert.deepEqual(thread.retentionPolicy, { kind: "none" });
  });

  it("successfully sends a message", async () => {
    const request = { content: `content` };
    const options = { metadata: { tags: "sometag" } };
    const result = await chatThreadClient.sendMessage(request, options);

    assert.isNotNull(result.id);
    messageId = result.id!;
  });

  it("successfully sends typing notification", async () => {
    const result = await chatThreadClient.sendTypingNotification();

    assert.isTrue(result);
  });

  it("successfully sends read receipt", async () => {
    await chatThreadClient.sendReadReceipt({ chatMessageId: messageId });
  });

  it("successfully retrieves a message", async () => {
    const message = await chatThreadClient.getMessage(messageId);

    assert.isNotNull(message);
    assert.equal(message.id, messageId);
    assert.isDefined(message.metadata?.tags);
  });

  it("successfully lists messages one by one and by page", async () => {
    const receivedItems: ChatMessage[] = [];
    for await (const message of chatThreadClient.listMessages()) {
      receivedItems.push(message);
    }

    let pagesCount = 0;
    const maxPageSize = 2;
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

  it("successfully deletes a message", async () => {
    await chatThreadClient.deleteMessage(messageId);
  });

  it("successfully adds participants", async () => {
    testUser3 = (await createTestUser(recorder)).user;

    const request = { participants: [{ id: testUser3 }] };
    await chatThreadClient.addParticipants(request);
  });

  it("successfully lists participants", async () => {
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

  it("successfully remove a participant", async () => {
    await chatThreadClient.removeParticipant(testUser2);
  });

  it("successfully lists read receipts", async () => {
    const list: string[] = [];
    for await (const receipt of chatThreadClient.listReadReceipts()) {
      list.push(receipt.chatMessageId!);
    }
  });
});
