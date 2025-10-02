// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient.js";
import { createAgentsClient } from "./utils/createClient.js";
import type { AgentsClient, PromptAgentDefinition } from "../../src/index.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

const firstAgentName = "firstAgent";
const agentInstructions = "You are a helpful agent";
describe("My test", () => {
  let recorder: Recorder;
  let agentsClient: AgentsClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    agentsClient = createAgentsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and agents operations are accessible", async function () {
    assert.isNotNull(agentsClient);
  });

  it("should create and delete agent", async function () {
    // Create agent
    const agent = await agentsClient.createAgentVersion(firstAgentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Delete agent
    const deleted = await agentsClient.deleteAgent(agent.id);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("should get agent", async function () {
    // Create agent
    const agent = await agentsClient.createAgentVersion(firstAgentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    const retrievedAgent = (await agentsClient.getAgent(firstAgentName)).versions.latest;
    assert.isNotNull(retrievedAgent);
    assert.equal(retrievedAgent.name, agent.name);
    assert.equal(retrievedAgent.version, agent.version);
    assert.equal(retrievedAgent.id, agent.id);
    console.log(`Retrieved agent, agent name: ${retrievedAgent.name}`);

    const retrievedAgentVersion = await agentsClient.getAgentVersion(firstAgentName, agent.version);
    assert.equal(retrievedAgentVersion.id, agent.id);
    console.log(`Retrieved agent, agent ID: ${retrievedAgentVersion.id}`);

    // Delete agent
    const deleted = await agentsClient.deleteAgent(agent.id);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  /* Update not working yet*/
  it.skip("should update agent", async function () {
    // Create agent
    const agent = await agentsClient.createAgentVersion(firstAgentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    const newInstructions = "These are new instructions for this agent";
    const updatedAgent = await agentsClient.updateAgent(firstAgentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: newInstructions,
    });
    assert.isNotNull(updatedAgent);

    const retrievedAgent = (await agentsClient.getAgent(firstAgentName)).versions.latest;
    assert.isNotNull(retrievedAgent);
    assert.equal((retrievedAgent.definition as PromptAgentDefinition).instructions, newInstructions);

    // Delete agent
    const deleted = await agentsClient.deleteAgent(agent.id);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  }, 20000);

  it("should list agents", async function () {
    // Create agent
    const agent = await agentsClient.createAgentVersion(firstAgentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // List agents
    const agents = await agentsClient.listAgents();
    assert.isNotEmpty(agents);
    assert.isNotNull((await agents.next()).value);
    console.log(`Listed agents: ${(await agents.byPage().next()).value}`);

    // List agents
    const agentVersions = await agentsClient.listAgentVersions(firstAgentName);
    assert.isNotEmpty(agentVersions);
    assert.isNotNull((await agentVersions.next()).value);
    console.log(`Listed agent versions: ${(await agentVersions.byPage().next()).value}`);

    // Delete agent
    await agentsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

});
