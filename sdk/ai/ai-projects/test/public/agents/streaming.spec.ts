// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient, MessageStreamEvent, RunStreamEvent, ThreadRunOutput } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - streaming", () => {
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

  it("should run streaming", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4-1106-preview", {
      name: "My Friendly Test Assistant",
      instructions: "You are helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Create message
    const message = await agents.createMessage(thread.id, { role: "user", content: "Hello, tell me a joke" });
    console.log(`Created message, message ID: ${message.id}`);

    // Run streaming
    const streamEventMessages = await agents.createRun(thread.id, agent.id).stream();
    let hasEventMessages = false;

    for await (const eventMessage of streamEventMessages) {
      hasEventMessages = true;
      switch (eventMessage.event) {
        case RunStreamEvent.ThreadRunCreated:
          console.log(`Thread Run Created - ${(eventMessage.data as ThreadRunOutput).assistant_id}`)
          break;
        case MessageStreamEvent.ThreadMessageDelta:
          console.log(`Thread Message Delta, thread ID: ${thread.id}`);
          break;
        case RunStreamEvent.ThreadRunCompleted:
          console.log(`Thread Run Completed, thread ID: ${thread.id}`);
          break
      }
    }
    assert.isTrue(hasEventMessages);
    assert.isNotNull(streamEventMessages);

    // Delete agent and thread
    await agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await agents.deleteThread(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  // eslint-disable-next-line no-only-tests/no-only-tests
  it("should create thread and run streaming", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4-1106-preview", {
      name: "My Friendly Test Assistant",
      instructions: "You are helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Create thread and run streaming
    const streamEventMessages = await agents.createThreadAndRun(agent.id, {
      thread: { messages: [{ role: "user", content: "Hello, tell me a joke" }] },
    }).stream();

    let hasEventMessages = false
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
          break
      }
    }
    assert.isTrue(hasEventMessages);
    assert.isNotNull(streamEventMessages);

    // Delete agent
    await agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
  });
});
