// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { ChatClient, ChatThreadClient, CommunicationIdentifierModel } from "../src";
import { createTestUser, createRecorder, createChatClient, getCommunicationIdentifier } from "./utils/recordedClient";

describe("ChatClient", function() {
  let threadId: string;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;

  let testUser: CommunicationIdentifierModel;
  let testUser2: CommunicationIdentifierModel;

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

  it("successfully creates a thread", async function() {
    const communicationUserToken = await createTestUser();
    chatClient = createChatClient(communicationUserToken.token);

    testUser = getCommunicationIdentifier(communicationUserToken.user);
    testUser2 = getCommunicationIdentifier((await createTestUser()).user);

    // Create a thread
    const request = {
      topic: "test topic",
      participants: [{communicationIdentifier: testUser}, { communicationIdentifier: testUser2}]
    };

    const chatThreadResult = await chatClient.createChatThread(request);

    const chatThread = chatThreadResult.chatThread;
    if (chatThread) {
      threadId = chatThread.id!;
    }

    assert.isDefined(chatThread);
    assert.isDefined(chatThread?.id);
  }).timeout(8000);

  it("successfully retrieves a thread client", async function() {
    chatThreadClient = await chatClient.getChatThreadClient(threadId);
    assert.isNotNull(chatThreadClient);
    assert.equal(chatThreadClient.threadId, threadId);
  });

  it("successfully deletes a thread", async function() {
    await chatClient.deleteChatThread(threadId);
  });
});
