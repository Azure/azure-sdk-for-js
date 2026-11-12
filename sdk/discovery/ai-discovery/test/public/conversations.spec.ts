// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests for Conversations operations (WorkspaceClient).
 *
 * `create` seeds a conversation whose server-assigned name later tests reuse;
 * the shared `createdConversationName` captures it. vitest runs `it` blocks
 * top-to-bottom within this file, preserving that ordering.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { Conversation, WorkspaceClient } from "../../src/index.js";
import {
  createRecorder,
  createWorkspaceClient,
  investigationPath,
  testEnv,
} from "./utils/recordedClient.js";

describe("Conversations operations (WorkspaceClient)", () => {
  let recorder: Recorder;
  let client: WorkspaceClient;
  const projectName = testEnv("AZURE_DISCOVERY_PROJECT_NAME");
  const investigationName = testEnv("AZURE_DISCOVERY_INVESTIGATION_NAME");
  let createdConversationName: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createWorkspaceClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create creates a conversation", async () => {
    const conversation = await client.conversations.create(projectName, {
      displayName: "Test conversation",
      investigationName: investigationPath(projectName, investigationName),
    });
    assert.isDefined(conversation);
    assert.equal(conversation.projectName, projectName);
    assert.isDefined(conversation.name);
    assert.isDefined(conversation.createdAt);
    createdConversationName = conversation.name;
  });

  it("list returns conversations including the one just created", async () => {
    let found = false;
    let count = 0;
    for await (const conv of client.conversations.list({ projectName })) {
      assert.equal(conv.projectName, projectName);
      assert.isDefined(conv.createdAt);
      assert.isDefined(conv.investigationName);
      count++;
      if (conv.name === createdConversationName) {
        found = true;
        break;
      }
    }
    assert.isAtLeast(count, 1);
    assert.isTrue(found, "conversation created in the create test should appear in list");
  });

  it("get returns a specific conversation", async () => {
    const created = await client.conversations.create(projectName, {
      displayName: "Conversation for get test",
      investigationName: investigationPath(projectName, investigationName),
    });
    const conversation = await client.conversations.get(created.name);
    assert.isDefined(conversation);
    assert.isDefined(conversation.name);
    assert.equal(conversation.projectName, projectName);
    assert.isDefined(conversation.createdAt);
  });

  it("stableUpdate patches a conversation (PATCH)", async () => {
    const updated = await client.conversations.update(createdConversationName, {
      displayName: "Updated conversation",
    });
    assert.isDefined(updated);
    assert.equal(updated.displayName, "Updated conversation");
    assert.isDefined(updated.lastModifiedAt);
  });

  it("delete removes a conversation", async () => {
    const result = await client.conversations.deleteConversation(createdConversationName);
    assert.isUndefined(result);
  });
});
