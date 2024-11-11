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
    const agent = await agents.createAgent({
      model: "gpt-4-1106-preview",
      name: "My Friendly Test Assistant",
      instructions: "You are helpful agent",
    });
    const thread = await agents.createThread();
    await agents.createMessage(thread.id, { role: "user", content: "Hello, tell me a joke" });
    const streamEventMessages = agents.createRunStreaming(thread.id, agent.id );
    let hasEventMessages = false;

    for await (const eventMessage of streamEventMessages) {
      hasEventMessages = true;
      switch (eventMessage.event) {
        case RunStreamEvent.ThreadRunCreated:
         console.log(( eventMessage.data as ThreadRunOutput).assistant_id)
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
  });

  // eslint-disable-next-line no-only-tests/no-only-tests
  it("should create thread and run streaming", async function () {
    const agent = await agents.createAgent({
      model: "gpt-4-1106-preview",
      name: "My Friendly Test Assistant",
      instructions: "You are helpful agent",
    });
    const streamEventMessages = agents.createThreadAndRunStreaming(agent.id,{
      thread: { messages: [{ role: "user", content: "Hello, tell me a joke" }] },
    });

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
  });
});
