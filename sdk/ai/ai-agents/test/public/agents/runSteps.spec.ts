// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { delay } from "@azure-tools/test-recorder";
import type { AgentsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - run steps", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list run steps", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Create thread
    const thread = await projectsClient.threads.create();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Create message
    const message = await projectsClient.messages.create(thread.id, "user", "hello, world!");
    console.log(`Created message, message ID: ${message.id}`);

    // Create run
    let run = await projectsClient.runs.create(thread.id, agent.id);
    console.log(`Created run, run ID: ${run.id}`);

    // Wait for run to complete
    assert.oneOf(run.status, ["queued", "in_progress", "requires_action", "completed"]);
    while (["queued", "in_progress", "requires_action"].includes(run.status)) {
      await delay(1000);
      run = await projectsClient.runs.get(thread.id, run.id);
      console.log(`Run status: ${run.status}`);
      assert.include(["queued", "in_progress", "requires_action", "completed"], run.status);
    }

    // List run steps
    const runSteps = projectsClient.runSteps.list(thread.id, run.id);
    const runStepsArray = await runSteps.byPage().next();
    assert.isNotNull(runStepsArray.value);

    // Clean up
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("should get steps", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    // Create thread
    const thread = await projectsClient.threads.create();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Create message
    const message = await projectsClient.messages.create(thread.id, "user", "hello, world!");
    console.log(`Created message, message ID: ${message.id}`);

    // Create run
    let run = await projectsClient.runs.create(thread.id, agent.id);
    console.log(`Created run, run ID: ${run.id}`);

    // Wait for run to complete
    assert.oneOf(run.status, ["queued", "in_progress", "requires_action", "completed"]);
    console.log(`Run status - ${run.status}, run ID: ${run.id}`);
    while (["queued", "in_progress", "requires_action"].includes(run.status)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await projectsClient.runs.get(thread.id, run.id);
      console.log(`Run status - ${run.status}, run ID: ${run.id}`);
      assert.include(["queued", "in_progress", "requires_action", "completed"], run.status);
    }
    // List run steps
    const runSteps = projectsClient.runSteps.list(thread.id, run.id);
    const runStepsArray = [];
    for await (const item of runSteps) {
      runStepsArray.push(item);
    }
    assert.isNotNull(runStepsArray);
    assert.isTrue(runStepsArray.length > 0);
    console.log(`Listed run steps, run ID: ${run.id}`);

    // Get specific run step
    const stepId = runStepsArray[0].id;
    const step = await projectsClient.runSteps.get(thread.id, run.id, stepId);
    console.log(`Retrieved run, step ID: ${stepId}`);
    assert.isNotNull(step);
    assert.equal(step.id, stepId);

    // Clean up
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });
});
