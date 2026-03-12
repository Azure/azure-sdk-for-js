// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { isNodeLike } from "@azure/core-util";
import type {
  ChatClient,
  ChatThreadClient,
  ThreadCreationDateRetentionPolicy,
} from "../../src/index.js";
import { createChatClient, createRecorder, createTestUser } from "./utils/recordedClient.js";
import type { CommunicationIdentifier } from "@azure/communication-common";
import type { CommunicationUserToken } from "@azure/communication-identity";
import { describe, it, assert, expect, vi, beforeEach, afterEach, beforeAll } from "vitest";

describe("ChatClient", () => {
  let threadId: string | undefined;
  let recorder: Recorder;
  let chatClient: ChatClient;
  let chatThreadClient: ChatThreadClient;
  let communicationUserToken: CommunicationUserToken;
  let testUser: CommunicationIdentifier;
  let testUser2: CommunicationIdentifier;

  describe("Chat Operations", () => {
    beforeEach(async (ctx) => {
      recorder = await createRecorder(ctx);
      await recorder.setMatcher("HeaderlessMatcher");
      if (!communicationUserToken) {
        communicationUserToken = await createTestUser(recorder);
      }
      chatClient = createChatClient(communicationUserToken.token, recorder);
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("successfully creates a thread", { timeout: 8000 }, async () => {
      testUser = communicationUserToken.user;
      testUser2 = (await createTestUser(recorder)).user;

      const request = { topic: "test topic" };
      const retentionPolicy: ThreadCreationDateRetentionPolicy = {
        kind: "threadCreationDate",
        deleteThreadAfterDays: 90,
      };
      const options = {
        participants: [
          {
            id: testUser,
          },
          {
            id: testUser2,
          },
        ],
        metadata: {
          threadType: "primary",
          secondaryThread: "test-id",
        },
        retentionPolicy: retentionPolicy,
      };

      const chatThreadResult = await chatClient.createChatThread(request, options);

      const chatThread = chatThreadResult.chatThread;
      if (chatThread) {
        threadId = chatThread.id!;
      }

      assert.isDefined(chatThread);
      assert.isDefined(chatThread?.id);
      assert.equal(chatThread?.topic, request.topic);
      assert.deepEqual(chatThread?.metadata, options.metadata);
      assert.deepEqual(chatThread?.retentionPolicy, retentionPolicy);
    });

    it("successfully retrieves a thread client", async () => {
      chatThreadClient = chatClient.getChatThreadClient(threadId!);
      assert.isNotNull(chatThreadClient);
      assert.equal(chatThreadClient.threadId, threadId);
    });

    it("successfully deletes a thread", async () => {
      await chatClient.deleteChatThread(threadId!);
    });
  });

  describe("Realtime Notifications", { skip: isNodeLike || !isLiveMode() }, () => {
    beforeAll(async () => {
      // Create a thread
      const request = {
        topic: "notification tests",
        participants: [{ id: testUser }],
      };
      const chatThreadResult = await chatClient.createChatThread(request);
      threadId = chatThreadResult.chatThread?.id;

      // Create ChatThreadClient
      chatThreadClient = chatClient.getChatThreadClient(threadId!);
    });

    beforeEach(async () => {
      // Start notifications
      await chatClient.startRealtimeNotifications();
    });

    it("successfully stops realtime notifications", async () => {
      const listener = vi.fn();

      chatClient.on("typingIndicatorReceived", listener);
      await chatClient.stopRealtimeNotifications();
      await chatThreadClient.sendTypingNotification();

      // Allow time to see if notification comes in
      await new Promise((resolve) => setTimeout(resolve, 5000));

      expect(listener).not.toHaveBeenCalled();
    });

    it(
      "successfully unsubscribes a listener",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            assert.fail();
          }

          chatClient.on("typingIndicatorReceived", listener);
          chatClient.off("typingIndicatorReceived", listener);

          // Send typing notification
          chatThreadClient.sendTypingNotification();

          // Wait a bit and fail if the notification comes in
          setTimeout(resolve, 5000);
        }),
    );

    it(
      "successfully listens to typingIndicatorReceivedEvents",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
          }

          chatClient.on("typingIndicatorReceived", listener);

          // Send typing notification
          chatThreadClient.sendTypingNotification();
        }),
    );

    it(
      "successfully listens to chatMessageEditedEvents",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
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
        }),
    );

    it(
      "successfully listens to chatMessageReceivedEvents",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
          }

          chatClient.on("chatMessageReceived", listener);

          // Send message
          const message = { content: `content` };
          chatThreadClient.sendMessage(message);
        }),
    );

    it(
      "successfully listens to chatMessageDeletedEvents",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
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
        }),
    );

    it(
      "successfully listens to chatThreadCreatedEvents",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
          }

          chatClient.on("chatThreadCreated", listener);

          // Create thread
          const request = {
            topic: "test create thread event",
            participants: [{ id: testUser }],
          };
          chatClient.createChatThread(request);
        }),
    );

    it(
      "successfully listens to chatThreadDeletedEvents",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
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
        }),
    );

    it(
      "successfully listens to chatThreadPropertiesUpdatedEvents",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
          }

          chatClient.on("chatThreadPropertiesUpdated", listener);

          // Update thread
          chatThreadClient.updateTopic("updated topic");
        }),
    );

    it(
      "successfully listens to participantsAddedEvents",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
          }

          chatClient.on("participantsAdded", listener);

          // Add participant
          const request = {
            participants: [{ id: testUser2 }],
          };
          chatThreadClient.addParticipants(request);
        }),
    );

    it(
      "successfully listens to participantsRemovedEvents",
      { timeout: 8000 },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
          }

          chatClient.on("participantsRemoved", listener);

          // Remove participant
          chatThreadClient.removeParticipant(testUser2);
        }),
    );

    // TODO: Read receipt notification is timing out even with increased timeout
    it(
      "successfully listens to readReceiptReceivedEvents",
      { timeout: 8000, skip: true },
      () =>
        new Promise<void>((resolve) => {
          function listener(): void {
            resolve();
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
        }),
    );
  });
});
