// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests for Conversations operations (WorkspaceClient).
 *
 * Mirrors the Python suite (test_conversations.py) in the SAME order. `create`
 * seeds a conversation whose server-assigned name later tests reuse; the shared
 * `createdConversationName` captures it. vitest runs `it` blocks top-to-bottom
 * within this file, preserving that ordering.
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
    const conversation = await client.conversations
      .create(projectName, {
        displayName: "Test conversation",
        investigationName: investigationPath(projectName, investigationName),
      })
      .catch((e: any) => {
        // eslint-disable-next-line no-console
        console.error(
          "CREATE_ERR_BODY>>>" +
            JSON.stringify({
              status: e?.statusCode ?? e?.response?.status,
              body: e?.response?.bodyAsText,
              headers: e?.response?.headers?.toJSON?.() ?? e?.response?.headers,
              mismatch: e?.response?.headers?.get?.("x-request-mismatch-error"),
            }) +
            "<<<",
        );
        throw e;
      });
    assert.isDefined(conversation);
    assert.equal(conversation.projectName, projectName);
    assert.isDefined(conversation.name);
    assert.isDefined(conversation.createdAt);
    createdConversationName = conversation.name;
  });

  it("list returns conversations including the one just created", async () => {
    const page = await client.conversations.list({ projectName });
    assert.isDefined(page.value);
    assert.isAtLeast(page.value.length, 1);
    let found = false;
    for (const conv of page.value) {
      assert.equal(conv.projectName, projectName);
      assert.isDefined(conv.createdAt);
      assert.isDefined(conv.investigationName);
      if (conv.name === createdConversationName) {
        found = true;
      }
    }
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
    const updated = await client.conversations.stableUpdate(createdConversationName, {
      displayName: "Updated conversation",
    } as Conversation);
    assert.isDefined(updated);
    assert.equal(updated.displayName, "Updated conversation");
    assert.isDefined(updated.lastModifiedAt);
  });

  it("delete removes a conversation", async () => {
    const result = await client.conversations.delete(createdConversationName);
    assert.isUndefined(result);
  });
});
