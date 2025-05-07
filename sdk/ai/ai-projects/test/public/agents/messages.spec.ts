// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - messages", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectsClient;
  let agents: AgentsOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and agents operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(agents);
  });

  it("should create message", async function () {
    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Create message
    const message = await agents.createMessage(thread.id, {
      role: "user",
      content: "hello, world!",
    });
    console.log(`Created message, message ID: ${message.id}`);
    assert.isNotNull(message);
    assert.isNotNull(message.id);

    // Delete thread
    await agents.deleteThread(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });

  it("should list messages", async function () {
    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Create messages
    const firstMessage = await agents.createMessage(thread.id, {
      role: "user",
      content: "knock knock",
    });
    const secondMessage = await agents.createMessage(thread.id, {
      role: "assistant",
      content: "who's there?",
    });
    console.log(`Created messages, message IDs: ${firstMessage.id}, ${secondMessage.id}`);

    // List messages
    const messages = await agents.listMessages(thread.id);
    assert.isNotEmpty(messages);
    assert.equal(messages.data.length, 2);
    assert.equal(messages.data[1].id, firstMessage.id);
    assert.equal(messages.data[0].id, secondMessage.id);
    console.log(`Listed ${messages.data.length} messages, thread ID: ${thread.id}`);

    // Delete thread
    await agents.deleteThread(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });

  it("should update message", async function () {
    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Create message
    const message = await agents.createMessage(thread.id, {
      role: "user",
      content: "hello, world!",
    });
    console.log(`Created message, message ID: ${message.id}`);

    // Update message
    const updatedMessage = await agents.updateMessage(thread.id, message.id, {
      metadata: { key: "value" },
    });
    assert.isNotNull(updatedMessage);
    assert.equal(updatedMessage.id, message.id);
    assert.equal(updatedMessage.metadata?.key, "value");
    console.log(
      `Updated message to have metadata "key":"${updatedMessage.metadata?.key}", message ID: ${updatedMessage.id}`,
    );

    // Delete thread
    await agents.deleteThread(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });
});
