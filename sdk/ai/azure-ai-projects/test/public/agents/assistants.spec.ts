// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - assistants", () => {
  let recorder: Recorder;
  let projectsClient : AIProjectsClient;
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
    const agent = await agents.createAgent({model:"gpt-4o", name:"my-agent", instructions:"You are helpful agent"})
    const deleted = await agents.deleteAgent(agent.id);
    assert.isNotNull(deleted);
  });

  it("should list assistants", async function () {
    const agent = await agents.createAgent({model:"gpt-4o", name:"my-agent", instructions:"You are helpful agent"})
    const assistants = await agents.listAgents();
    agents.deleteAgent(agent.id);
    assert.isNotEmpty(assistants);
    assert.isAtLeast(assistants.data.length , 1)
  });

  it("should create agent", async function () {  
    const agent = await agents.createAgent({model:"gpt-4o", name:"my-agent", instructions:"You are helpful agent"})
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    agents.deleteAgent(agent.id);
  })
  
  it("should update agent", async function () {  
    const agent = await agents.createAgent({model:"gpt-4o", name:"my-agent", instructions:"You are helpful agent"})
    const updated = await agents.updateAgent(agent.id, {name:"my-updated-agent"});
    assert.isNotNull(updated);
    assert.equal(updated.name, "my-updated-agent");
    agents.deleteAgent(agent.id);
  });

});
