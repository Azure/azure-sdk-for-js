// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsClient } from "@azure/ai-agents";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - assistants", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and agents operations are accessible", async function () {
    assert.isNotNull(projectsClient);
  });

  it("should delete agent", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Delete agent
    const deleted = await projectsClient.deleteAgent(agent.id);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("should list assistants", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // List agents
    const assistants = await projectsClient.listAgents();
    assert.isNotEmpty(assistants);
    assert.isNotNull((await assistants.next()).value);
    console.log(`Listed agents: ${(await assistants.byPage().next()).value}`);

    // Delete agent
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("should create agent", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);

    // Delete agent
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("should update agent", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Update agent
    const updated = await projectsClient.updateAgent(agent.id, { name: "my-updated-agent" });
    assert.isNotNull(updated);
    assert.equal(updated.name, "my-updated-agent");
    console.log(`Updated agent name to ${updated.name}, agent ID: ${agent.id}`);

    // Delete agent
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });
});
