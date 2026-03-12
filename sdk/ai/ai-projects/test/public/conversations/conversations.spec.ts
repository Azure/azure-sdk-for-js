// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { assert, afterEach, beforeEach, it, describe } from "vitest";
import type OpenAI from "openai";
import type { AIProjectClient } from "../../../src/index.js";

describe("conversations", () => {
  let projectsClient: AIProjectClient;
  let openAIClient: OpenAI;
  let recorder: Recorder;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create and delete conversation", async function () {
    // Create conversation
    const conversation = await openAIClient.conversations.create();

    assert.isNotNull(conversation);
    assert.isNotNull(conversation.id);
    console.log(`Created conversation, conversation ID: ${conversation.id}`);

    // Delete conversation
    const deleted = await openAIClient.conversations.delete(conversation.id);
    assert.isNotNull(deleted);
    console.log(`Deleted conversation, conversation ID: ${conversation.id}`);
  }, 20000);

  it("should list conversations", async function () {
    // Create conversation
    const conversation = await openAIClient.conversations.create();

    assert.isNotNull(conversation);
    assert.isNotNull(conversation.id);
    console.log(`Created conversation, conversation ID: ${conversation.id}`);

    const long_form_body: any = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "some text" }],
    };
    const conversation2 = await openAIClient.conversations.create({ items: [long_form_body] });
    assert.isNotNull(conversation2);
    assert.isNotNull(conversation2.id);
    console.log(`Created conversation2, conversation ID: ${conversation2.id}`);

    // Delete conversations
    for (const conv of [conversation, conversation2]) {
      const deleted = await openAIClient.conversations.delete(conv.id);
      assert.isNotNull(deleted);

      console.log(`Deleted conversation, conversation ID: ${deleted.id}`);
    }
  }, 30000);

  it("should create, retrieve, and update conversation", async function () {
    // Create conversation
    const conversation = await openAIClient.conversations.create();

    assert.isNotNull(conversation);
    assert.isNotNull(conversation.id);
    console.log(`Created conversation, conversation ID: ${conversation.id}`);

    // Retrieve conversation
    const retrieved = await openAIClient.conversations.retrieve(conversation.id);
    assert.isNotNull(retrieved);
    assert.isNotNull(retrieved.id);
    assert.equal(retrieved.id, conversation.id);
    console.log(`Retrieved conversation, conversation ID: ${retrieved.id}`);

    // Update conversation
    const metadata: Record<string, string> = { key: "value" };
    const updated = await openAIClient.conversations.update(conversation.id, {
      metadata,
    });
    assert.isNotNull(updated);

    const updatedRetrieved = await openAIClient.conversations.retrieve(conversation.id);
    assert.isNotNull(updatedRetrieved);
    assert.equal(updatedRetrieved.id, conversation.id);
    assert.isNotNull(updatedRetrieved.metadata);
    assert.isDefined(updatedRetrieved.metadata);
    console.log(`Updated conversation, conversation ID: ${updatedRetrieved.id}`);

    // Delete conversation
    const deleted = await openAIClient.conversations.delete(conversation.id);
    assert.isNotNull(deleted);
    console.log(`Deleted conversation, conversation ID: ${conversation.id}`);
  }, 20000);
});
