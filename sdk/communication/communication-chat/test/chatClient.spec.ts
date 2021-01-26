// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isLiveMode, Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { ChatClient, ChatThreadClient } from "../src";
import { createTestUser, createRecorder, createChatClient } from "./utils/recordedClient";
import { CommunicationUserIdentifier } from "@azure/communication-common";
import sinon from "sinon";
import { isNode } from "@azure/core-http";

describe("ChatClient", function() {
  let threadId: string;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;

  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;

  this.afterAll(async function() {
    // await deleteTestUser(testUser);
    // await deleteTestUser(testUser2);
    // await deleteTestUser(testUser3);
  });

  describe("Chat Operations", function() {
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

    it("successfully retrieves a thread client", async function() {
      chatThreadClient = await chatClient.getChatThreadClient(threadId);
      assert.isNotNull(chatThreadClient);
      assert.equal(chatThreadClient.threadId, threadId);
    });

    it("successfully deletes a thread", async function() {
      await chatClient.deleteChatThread(threadId);
    });
  });

  describe("Realtime Notifications", function() {
    before(async function() {
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

    after(async function() {
      if (isNode || !isLiveMode()) {
        return;
      }
      await chatClient.stopRealtimeNotifications();
      await chatClient.deleteChatThread(threadId);
    });

    it("successfully unsubscribes to an event", function(done) {
      let listener = sinon.spy();

      chatClient
        .startRealtimeNotifications()
        .then(function() {
          // Subscribe and unsubscribe
          chatClient.on("chatMessageReceived", listener);
          chatClient.off("chatMessageReceived", listener);
          // Send a message
          const message = { content: `content` };
          return chatThreadClient.sendMessage(message);
        })
        .then(function() {
          // Allow for the notification to come in
          setTimeout(() => {
            sinon.assert.notCalled(listener);
            done();
          }, 5000);
        });
    });

    it("successfully listens to chatMessageReceivedEvents", function(done) {
      let listener = sinon.spy();

      chatClient
        .startRealtimeNotifications()
        .then(function() {
          chatClient.on("chatMessageReceived", listener);
          // Send a message
          const message = { content: `content` };
          return chatThreadClient.sendMessage(message);
        })
        .then(function() {
          // Allow for the notification to come in
          setTimeout(() => {
            sinon.assert.called(listener);
            chatClient.off("chatMessageReceived", listener);
            done();
          }, 5000);
        });
    });

    it("successfully listens to typingIndicatorReceivedEvents", function(done) {
      let listener = sinon.spy();

      chatClient
        .startRealtimeNotifications()
        .then(function() {
          chatClient.on("typingIndicatorReceived", listener);

          // Send a typing notification
          return chatThreadClient.sendTypingNotification();
        })
        .then(function() {
          // Allow for notification to come in
          setTimeout(() => {
            sinon.assert.called(listener);
            chatClient.off("typingIndicatorReceived", listener);
            done();
          }, 5000);
        });
    });

    it("successfully listens to chatMessageEditedEvents", function(done) {
      let listener = sinon.spy();

      chatClient
        .startRealtimeNotifications()
        .then(function() {
          chatClient.on("chatMessageEdited", listener);
          // Send a message
          const message = { content: `content` };
          return chatThreadClient.sendMessage(message);
        })
        .then(function(sendMessageResult) {
          // Update the message
          const updatedMessage = { content: `some new content` };
          return chatThreadClient.updateMessage(sendMessageResult.id!, updatedMessage);
        })
        .then(function() {
          // Allow for the notification to come in
          setTimeout(() => {
            sinon.assert.called(listener);
            chatClient.off("chatMessageEdited", listener);
            done();
          }, 5000);
        });
    });

    it("successfully listens to chatMessageDeletedEvents", function(done) {
      let listener = sinon.spy();

      chatClient
        .startRealtimeNotifications()
        .then(function() {
          chatClient.on("chatMessageDeleted", listener);

          // Send a message
          const message = { content: `content` };
          return chatThreadClient.sendMessage(message);
        })
        .then(function(sendMessageResult) {
          // Delete the message
          return chatThreadClient.deleteMessage(sendMessageResult.id!);
        })
        .then(function() {
          // Allow for the notification to come in
          setTimeout(() => {
            sinon.assert.called(listener);
            chatClient.off("chatMessageDeleted", listener);
            done();
          }, 5000);
        });
    });

    it("successfully starts and stops notifications", function(done) {
      let listener = sinon.spy();
      chatClient.on("chatMessageReceived", listener);

      chatClient
        .startRealtimeNotifications()
        .then(function() {
          return chatClient.stopRealtimeNotifications();
        })
        .then(function() {
          // Send a typing notification
          return chatThreadClient.sendTypingNotification();
        })
        .then(function() {
          // Allow for the notification to come in
          setTimeout(() => {
            sinon.assert.notCalled(listener);
            chatClient.off("chatMessageReceived", listener);
            done();
          }, 5000);
        });
    });
  });
});
