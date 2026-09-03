// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  ChatClient,
  ChatThreadClient,
  ThreadCreationDateRetentionPolicy,
} from "../../src/index.js";
import { createChatClient, createRecorder, createTestUser } from "./utils/recordedClient.js";
import type { CommunicationIdentifier } from "@azure/communication-common";
import type { CommunicationUserToken } from "@azure/communication-identity";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

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
});
