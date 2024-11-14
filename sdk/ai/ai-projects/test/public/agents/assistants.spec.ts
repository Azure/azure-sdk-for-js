// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - assistants", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectsClient;
  let agents: AgentsOperations

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and agents operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(agents);
  });

  it("should delete agent", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", { name: "my-agent", instructions: "You are a helpful agent" })
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Delete agent
    const deleted = await agents.deleteAgent(agent.id);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("should list assistants", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", { name: "my-agent", instructions: "You are a helpful agent" })
    console.log(`Created agent, agent ID: ${agent.id}`);

    // List agents
    const assistants = await agents.listAgents();
    assert.isNotEmpty(assistants);
    assert.isAtLeast(assistants.data.length, 1)
    console.log(`Listed agents, agents count: ${assistants.data.length}`);

    // Delete agent
    agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("should create agent", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", { name: "my-agent", instructions: "You are a helpful agent" })
    console.log(`Created agent, agent ID: ${agent.id}`);
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    
    // Delete agent
    agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  })

  it("should update agent", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", { name: "my-agent", instructions: "You are a helpful agent" })
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Update agent
    const updated = await agents.updateAgent(agent.id, { name: "my-updated-agent" });
    assert.isNotNull(updated);
    assert.equal(updated.name, "my-updated-agent");
    console.log(`Updated agent name to ${updated.name}, agent ID: ${agent.id}`);
    
    // Delete agent
    agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

});
