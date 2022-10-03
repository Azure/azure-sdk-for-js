// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { ChatClient, ChatThreadClient } from "../../src";
import { createChatClient, createRecorder, createTestUser } from "./utils/recordedClient";
import { isNode } from "@azure/core-util";
import sinon from "sinon";
import { CommunicationIdentifier } from "@azure/communication-common";
import { Context } from "mocha";
import { CommunicationUserToken } from "@azure/communication-identity";

describe("ChatClient", function () {
  let threadId: string | undefined;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;
  let communicationUserToken: CommunicationUserToken;
  let testUser: CommunicationIdentifier;
  let testUser2: CommunicationIdentifier;

  after(async function () {
    // await deleteTestUser(testUser);
    // await deleteTestUser(testUser2);
    // await deleteTestUser(testUser3);
  });

  describe("Chat Operations", function () {
    beforeEach(async function (this: Context) {
      recorder = await createRecorder(this.currentTest);
      await recorder.setMatcher("HeaderlessMatcher");
      if (!communicationUserToken) {
        communicationUserToken = await createTestUser(recorder);
      }
      chatClient = createChatClient(communicationUserToken.token, recorder);
    });

    afterEach(async function () {
      await recorder.stop();
    });

    it("successfully creates a thread", async function () {
      testUser = communicationUserToken.user;
      testUser2 = (await createTestUser(recorder)).user;

      const request = { topic: "test topic" };
      const options = {
        participants: [{ id: testUser }, { id: testUser2 }],
      };

      const chatThreadResult = await chatClient.createChatThread(request, options);

      const chatThread = chatThreadResult.chatThread;
      if (chatThread) {
        threadId = chatThread.id!;
      }

      assert.isDefined(chatThread);
      assert.isDefined(chatThread?.id);
    }).timeout(8000);

    it("successfully retrieves a thread client", async function () {
      chatThreadClient = chatClient.getChatThreadClient(threadId!);
      assert.isNotNull(chatThreadClient);
      assert.equal(chatThreadClient.threadId, threadId);
    });

    it("successfully deletes a thread", async function () {
      await chatClient.deleteChatThread(threadId!);
    });
  });

  describe("Realtime Notifications", function () {
    before(async function (this: Context) {
      // Realtime notifications are browser only
      if (isNode || !isLiveMode()) {
        this.skip();
      }

      // Create a thread
      const request = {
        topic: "notifcation tests",
        participants: [{ id: testUser }],
      };
      const chatThreadResult = await chatClient.createChatThread(request);
      threadId = chatThreadResult.chatThread?.id;

      // Create ChatThreadClient
      chatThreadClient = chatClient.getChatThreadClient(threadId!);
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
      function listener(): void {
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
      function listener(): void {
        done();
      }

      chatClient.on("typingIndicatorReceived", listener);

      // Send typing notification
      chatThreadClient.sendTypingNotification();
    }).timeout(8000);

    it("successfully listens to chatMessageEditedEvents", function (done) {
      function listener(): void {
        done();
      }

      chatClient.on("chatMessageEdited", listener);

      // Edit message
      const message = { content: "content" };
      chatThreadClient
        .sendMessage(message)
        .then((result) => {
          return chatThreadClient.updateMessage(result.id, {
            content: "new content",
          });
        })
        .catch((error) => console.error(error));
    }).timeout(8000);

    it("successfully listens to chatMessageReceivedEvents", function (done) {
      function listener(): void {
        done();
      }

      chatClient.on("chatMessageReceived", listener);

      // Send message
      const message = { content: `content` };
      chatThreadClient.sendMessage(message);
    }).timeout(8000);

    it("successfully listens to chatMessageDeletedEvents", function (done) {
      function listener(): void {
        done();
      }

      chatClient.on("chatMessageDeleted", listener);

      // Delete message
      const message = { content: `content` };
      chatThreadClient
        .sendMessage(message)
        .then((result) => {
          return chatThreadClient.deleteMessage(result.id);
        })
        .catch((error) => console.error(error));
    }).timeout(8000);

    it("successfully listens to chatThreadCreatedEvents", function (done) {
      function listener(): void {
        done();
      }

      chatClient.on("chatThreadCreated", listener);

      // Create thread
      const request = {
        topic: "test create thread event",
        participants: [{ id: testUser }],
      };
      chatClient.createChatThread(request);
    }).timeout(8000);

    it("successfully listens to chatThreadDeletedEvents", function (done) {
      function listener(): void {
        done();
      }

      chatClient.on("chatThreadDeleted", listener);

      // Delete thread
      const request = {
        topic: "test delete thread event",
        participants: [{ id: testUser }],
      };
      chatClient
        .createChatThread(request)
        .then((result) => {
          return chatClient.deleteChatThread(result.chatThread?.id as string);
        })
        .catch((error) => console.error(error));
    }).timeout(8000);

    it("successfully listens to chatThreadPropertiesUpdatedEvents", function (done) {
      function listener(): void {
        done();
      }

      chatClient.on("chatThreadPropertiesUpdated", listener);

      // Update thread
      chatThreadClient.updateTopic("updated topic");
    }).timeout(8000);

    it("successfully listens to participantsAddedEvents", function (done) {
      function listener(): void {
        done();
      }

      chatClient.on("participantsAdded", listener);

      // Add participant
      const request = {
        participants: [{ id: testUser2 }],
      };
      chatThreadClient.addParticipants(request);
    }).timeout(8000);

    it("successfully listens to participantsRemovedEvents", function (done) {
      function listener(): void {
        done();
      }

      chatClient.on("participantsRemoved", listener);

      // Remove participant
      chatThreadClient.removeParticipant(testUser2);
    }).timeout(8000);

    it("successfully listens to readReceiptReceivedEvents", function (this: Context, done) {
      // TODO: Read receipt notification is timing out even with increased timeout
      this.skip();
      function listener(): void {
        done();
      }

      chatClient.on("readReceiptReceived", listener);

      // Send read receipt
      const message = { content: "content" };
      chatThreadClient
        .sendMessage(message)
        .then((result) => {
          return chatThreadClient.sendReadReceipt({
            chatMessageId: result.id,
          });
        })
        .catch((error) => console.error(error));
    }).timeout(8000);
  });
});
