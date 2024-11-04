// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
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
    const stream = agents.createRunStreaming(thread.id, { assistant_id: agent.id });
    let buffer = "";
    for await (const data of stream) {
      buffer += data;
    }
    assert.isNotNull(buffer);
    assert.isNotNull(stream);
  });

  // eslint-disable-next-line no-only-tests/no-only-tests
  it("should create thread and run streaming", async function () {
    const agent = await agents.createAgent({
      model: "gpt-4-1106-preview",
      name: "My Friendly Test Assistant",
      instructions: "You are helpful agent",
    });
    const stream = agents.createThreadAndRunStreaming({
      assistant_id: agent.id,
      thread: { messages: [{ role: "user", content: "Hello, tell me a joke" }] },
    });
    let buffer = "";
    for await (const data of stream) {
      buffer += data;
    }
    assert.isNotNull(buffer);
    assert.isNotNull(stream);
  });
});
