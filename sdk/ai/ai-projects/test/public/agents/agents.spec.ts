// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsClient } from "@azure/ai-agents";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "@azure/ai-projects";

describe("agents - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create and delete an agent", async () => {
    const agent = await agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
    });

    assert.isNotNull(agent);
    assert.equal(agent.name, "my-agent");
    assert.equal(agent.instructions, "You are a helpful agent");

    await agents.deleteAgent(agent.id);
  });
});
