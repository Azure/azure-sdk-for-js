// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";

const firstAgentName = "firstAgent";
const agentInstructions = "You are a helpful agent";

describe("agents - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create and delete an agent version", async () => {
    const agent = await agents.createAgentVersion(firstAgentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, firstAgentName);
    console.log(`Created agent, agent ID: ${agent.id}`);

    const deleted = await agents.deleteAgent(agent.name);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent name: ${agent.name}`);
  });
});
