// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsClient, ThreadRun } from "@azure/ai-agents";
import { MessageStreamEvent, RunStreamEvent } from "@azure/ai-agents";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - streaming", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should run streaming", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4-1106-preview", {
      name: "My Friendly Test Assistant",
      instructions: "You are helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Create thread
    const thread = await projectsClient.threads.create();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Create message
    const message = await projectsClient.messages.create(
      thread.id,
      "user",
      "Hello, tell me a joke",
    );
    console.log(`Created message, message ID: ${message.id}`);

    // Run streaming
    const streamEventMessages = await projectsClient.runs.create(thread.id, agent.id).stream();
    let hasEventMessages = false;

    for await (const eventMessage of streamEventMessages) {
      hasEventMessages = true;
      switch (eventMessage.event) {
        case RunStreamEvent.ThreadRunCreated:
          console.log(`Thread Run Created - ${(eventMessage.data as ThreadRun).assistantId}`);
          break;
        case MessageStreamEvent.ThreadMessageDelta:
          console.log(`Thread Message Delta, thread ID: ${thread.id}`);
          break;
        case RunStreamEvent.ThreadRunCompleted:
          console.log(`Thread Run Completed, thread ID: ${thread.id}`);
          break;
      }
    }
    assert.isTrue(hasEventMessages);
    assert.isNotNull(streamEventMessages);

    // Delete agent and thread
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  it("should create thread and run streaming", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4-1106-preview", {
      name: "My Friendly Test Assistant",
      instructions: "You are helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Create thread and run streaming
    const streamEventMessages = await projectsClient.runs
      .createThreadAndRun(agent.id, {
        thread: { messages: [{ role: "user", content: "Hello, tell me a joke" }] },
      })
      .stream();

    let hasEventMessages = false;
    for await (const eventMessage of streamEventMessages) {
      hasEventMessages = true;
      switch (eventMessage.event) {
        case RunStreamEvent.ThreadRunCreated:
          console.log("Thread Run Created");
          break;
        case MessageStreamEvent.ThreadMessageDelta:
          console.log("Thread Message Delta");
          break;
        case RunStreamEvent.ThreadRunCompleted:
          console.log("Thread Run Completed");
          break;
      }
    }
    assert.isTrue(hasEventMessages);
    assert.isNotNull(streamEventMessages);

    // Delete agent
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
  });
});
