// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isLiveMode, Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { ChatClient, ChatThreadClient } from "../src";
import { createTestUser, createRecorder, createChatClient } from "./utils/recordedClient";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import { isNode } from "@azure/core-http";
import sinon from "sinon";

describe("ChatClient", function () {
  let threadId: string;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;

  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;

  this.afterAll(async function () {
    // await deleteTestUser(testUser);
    // await deleteTestUser(testUser2);
    // await deleteTestUser(testUser3);
  });

  describe("Chat Operations", function () {
    beforeEach(function () {
      recorder = createRecorder(this);
    });

    afterEach(async function () {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("successfully creates a thread", async function () {
      const communicationUserToken = await createTestUser();

      testUser = communicationUserToken.user;
      chatClient = createChatClient(communicationUserToken.token);

      testUser2 = (await createTestUser()).user;

      const request = {
        topic: "test topic",
        participants: [{ user: testUser }, { user: testUser2 }]
      };

      const chatThreadResult = await chatClient.createChatThread(request);

      const chatThread = chatThreadResult.chatThread;
      if (chatThread) {
        threadId = chatThread.id!;
      }

      assert.isDefined(chatThread);
      assert.isDefined(chatThread?.id);
    }).timeout(8000);

    it("successfully retrieves a thread client", async function () {
      chatThreadClient = await chatClient.getChatThreadClient(threadId);
      assert.isNotNull(chatThreadClient);
      assert.equal(chatThreadClient.threadId, threadId);
    });

    it("successfully deletes a thread", async function () {
      await chatClient.deleteChatThread(threadId);
    });

    // TODO add list threads test
  });

  describe("Realtime Notifications", function () {
    before(async function () {
      // Realtime notifications are browser only
      if (isNode || !isLiveMode()) {
        this.skip();
      }

      // Create a thread
      const request = {
        topic: "notifcation tests",
        participants: [{ user: testUser }]
      };
      const chatThreadResult = await chatClient.createChatThread(request);
      threadId = chatThreadResult.chatThread?.id!;

      // Create ChatThreadClient
      chatThreadClient = await chatClient.getChatThreadClient(threadId);
    });

    beforeEach(async function () {
      // Start notifications
      await chatClient.startRealtimeNotifications();
    });

    it("successfully stops realtime notifications", async function () {
      const listener = sinon.spy();

      chatClient.on("typingIndicatorReceived", listener);
      await chatClient.stopRealtimeNotifications();
      await chatThreadClient.sendTypingNotification();

      // Allow time to see if notification comes in
      await new Promise((resolve) => setTimeout(resolve, 5000));

      sinon.assert.notCalled(listener);
    });

    it("successfully unsubscribes a listener", function (done) {
      function listener() {
        assert.fail();
      }

      chatClient.on("typingIndicatorReceived", listener);
      chatClient.off("typingIndicatorReceived", listener);

      // Send typing notification
      chatThreadClient.sendTypingNotification();

      // Wait a bit and fail if the notification comes in
      setTimeout(done, 5000);
    }).timeout(8000);

    it("successfully listens to typingIndicatorReceivedEvents", function (done) {
      function listener() {
        done();
      }

      chatClient.on("typingIndicatorReceived", listener);

      // Send typing notification
      chatThreadClient.sendTypingNotification();
    }).timeout(8000);

    it("successfully listens to chatMessageEditedEvents", function (done) {
      function listener() {
        done();
      }

      chatClient.on("chatMessageEdited", listener);

      // Edit message
      const message = { content: "content" };
      chatThreadClient.sendMessage(message).then((result) => {
        chatThreadClient.updateMessage(result.id, {
          content: "new content"
        });
      });
    }).timeout(8000);

    it("successfully listens to chatMessageReceivedEvents", function (done) {
      function listener() {
        done();
      }

      chatClient.on("chatMessageReceived", listener);

      // Send message
      const message = { content: `content` };
      chatThreadClient.sendMessage(message);
    }).timeout(8000);

    it("successfully listens to chatMessageDeletedEvents", function (done) {
      function listener() {
        done();
      }

      chatClient.on("chatMessageDeleted", listener);

      // Delete message
      const message = { content: `content` };
      chatThreadClient.sendMessage(message).then((result) => {
        chatThreadClient.deleteMessage(result.id);
      });
    }).timeout(8000);

    it("successfully listens to readReceiptReceivedEvents", function (done) {
      // TODO: Disabled while investigating read receipt notifications
      this.skip();
      function listener() {
        done();
      }

      chatClient.on("readReceiptReceived", listener);

      // Send read receipt
      const message = { content: `content` };
      chatThreadClient.sendMessage(message).then((result) => {
        chatThreadClient.sendReadReceipt({
          chatMessageId: result.id
        });
      });
    }).timeout(8000);

    it("successfully listens to chatThreadCreatedEvents", function (done) {
      function listener() {
        done();
      }

      chatClient.on("chatThreadCreated", listener);

      // Create thread
      const request = {
        topic: "test create thread event",
        participants: [{ user: testUser }]
      };
      chatClient.createChatThread(request);
    }).timeout(8000);

    it("successfully listens to chatThreadDeletedEvents", function (done) {
      function listener() {
        done();
      }

      chatClient.on("chatThreadDeleted", listener);

      // Delete thread
      const request = {
        topic: "test delete thread event",
        participants: [{ user: testUser }]
      };
      chatClient.createChatThread(request).then((result) => {
        chatClient.deleteChatThread(result.chatThread?.id!);
      });
    }).timeout(8000);

    it("successfully listens to chatThreadPropertiesUpdatedEvents", function (done) {
      function listener() {
        done();
      }

      chatClient.on("chatThreadPropertiesUpdated", listener);

      // Update thread
      chatThreadClient.updateTopic("updated topic");
    }).timeout(8000);

    it("successfully listens to participantsAddedEvents", function (done) {
      function listener() {
        done();
      }

      chatClient.on("participantsAdded", listener);

      // Add participant
      const request = {
        participants: [{ user: testUser2 }]
      };
      chatThreadClient.addParticipants(request);
    }).timeout(8000);

    it("successfully listens to participantsRemovedEvents", function (done) {
      function listener() {
        done();
      }

      chatClient.on("participantsRemoved", listener);

      // Remove participant
      chatThreadClient.removeParticipant(testUser2);
    }).timeout(8000);
  });
});
