// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { delay } from "@azure-tools/test-recorder";
import type { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - run steps", () => {
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

  it("should list run steps", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Create message
    const message = await agents.createMessage(thread.id, {
      role: "user",
      content: "hello, world!",
    });
    console.log(`Created message, message ID: ${message.id}`);

    // Create run
    let run = await agents.createRun(thread.id, agent.id);
    console.log(`Created run, run ID: ${run.id}`);

    // Wait for run to complete
    assert.oneOf(run.status, ["queued", "in_progress", "requires_action", "completed"]);
    while (["queued", "in_progress", "requires_action"].includes(run.status)) {
      await delay(1000);
      run = await agents.getRun(thread.id, run.id);
      console.log(`Run status: ${run.status}`);
      assert.include(["queued", "in_progress", "requires_action", "completed"], run.status);
    }

    // List run steps
    const runSteps = await agents.listRunSteps(thread.id, run.id);
    assert.isNotNull(runSteps.data);

    // Clean up
    await agents.deleteThread(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
    await agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("should get steps", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Create message
    const message = await agents.createMessage(thread.id, {
      role: "user",
      content: "hello, world!",
    });
    console.log(`Created message, message ID: ${message.id}`);

    // Create run
    let run = await agents.createRun(thread.id, agent.id);
    console.log(`Created run, run ID: ${run.id}`);

    // Wait for run to complete
    assert.oneOf(run.status, ["queued", "in_progress", "requires_action", "completed"]);
    console.log(`Run status - ${run.status}, run ID: ${run.id}`);
    while (["queued", "in_progress", "requires_action"].includes(run.status)) {
      await delay(1000);
      run = await agents.getRun(thread.id, run.id);
      console.log(`Run status - ${run.status}, run ID: ${run.id}`);
      assert.include(["queued", "in_progress", "requires_action", "completed"], run.status);
    }

    // List run steps
    const runSteps = await agents.listRunSteps(thread.id, run.id);
    assert.isNotNull(runSteps.data);
    assert.isTrue(runSteps.data.length > 0);
    console.log(`Listed run steps, run ID: ${run.id}`);

    // Get specific run step
    const stepId = runSteps.data[0].id;
    const step = await agents.getRunStep(thread.id, run.id, stepId);
    console.log(`Retrieved run, step ID: ${stepId}`);
    assert.isNotNull(step);
    assert.equal(step.id, stepId);

    // Clean up
    await agents.deleteThread(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
    await agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });
});
