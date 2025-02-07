// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { delay } from "@azure-tools/test-recorder";
import type { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - Run", () => {
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

  it("should create agent and run agent", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create thread
    const thread = await agents.createThread();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create run
    const run = await agents.createRun(thread.id, agent.id);
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);

    // Delete agent and thread
    await agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await agents.deleteThread(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  it("should create and get run", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create thread
    const thread = await agents.createThread();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create run
    const run = await agents.createRun(thread.id, agent.id);
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);

    // Get run
    const runDetails = await agents.getRun(thread.id, run.id);
    assert.isNotNull(runDetails);
    assert.isNotNull(runDetails.id);
    assert.equal(run.id, runDetails.id);
    console.log(`Retrieved run, Run ID:  ${runDetails.id}`);

    // Delete agent and thread
    await agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await agents.deleteThread(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  it("should create and get run status", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create thread
    const thread = await agents.createThread();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create message
    const message = await agents.createMessage(thread.id, {
      role: "user",
      content: "Hello, tell me a joke",
    });
    assert.isNotNull(message.id);
    console.log(`Created message, message ID ${message.id}`);

    // Create run
    const run = await agents.createRun(thread.id, agent.id);
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);

    // Get run status
    let runDetails = await agents.getRun(thread.id, run.id);
    assert.isNotNull(runDetails);
    assert.isNotNull(runDetails.id);
    assert.equal(run.id, runDetails.id);
    console.log(`Retrieved run status -  ${runDetails.status}, run ID:  ${runDetails.id}`);

    // Wait for status to update
    assert.oneOf(runDetails.status, [
      "queued",
      "in_progress",
      "requires_action",
      "cancelling",
      "cancelled",
      "failed",
      "completed",
      "expired",
    ]);
    while (["queued", "in_progress", "requires_action"].includes(runDetails.status)) {
      await delay(1000);
      runDetails = await agents.getRun(thread.id, run.id);
      if (runDetails.lastError) {
        console.log(
          `Run status ${runDetails.status} - ${runDetails.lastError.code} - ${runDetails.lastError.message}`,
          "color:red",
        );
      }
      if (runDetails) {
        console.log(`Run status - ${runDetails.status}, run ID: ${runDetails.id}`);
      } else {
        console.log("Run details are undefined.");
      }
    }
    assert.oneOf(runDetails.status, ["cancelled", "failed", "completed", "expired"]);
    console.log(`Run status - ${runDetails.status}, run ID: ${runDetails.id}`);

    // Delete agent and thread
    await agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await agents.deleteThread(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  it("should create and list runs", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create thread
    const thread = await agents.createThread();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create message
    const message = await agents.createMessage(thread.id, {
      role: "user",
      content: "Hello, tell me a joke",
    });
    assert.isNotNull(message.id);
    console.log(`Created message, message ID ${message.id}`);

    // Create run
    const run = await agents.createRun(thread.id, agent.id);
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);

    // Get run status
    const runs = await agents.listRuns(thread.id);
    assert.isNotNull(runs);
    assert.isArray(runs.data);
    console.log(`List  - found no of runs: ${runs.data.length}, first run ID: ${runs.firstId}`);
    const runDetails = runs.data.find((threadRun) => threadRun.id === run.id);
    assert.isNotNull(runDetails);
    if (runDetails) {
      console.log(`Run status - ${runDetails.status}, run ID: ${runDetails.id}`);
    } else {
      console.log("Run details are undefined.");
    }

    // Delete agent and thread
    await agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await agents.deleteThread(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  it("should create and run in single call", async function () {
    // Create agent
    const agent = await agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create run
    const run = await agents.createThreadAndRun(agent.id, {
      thread: {
        messages: [
          {
            role: "user",
            content: "Hello, tell me a joke",
          },
        ],
      },
    });
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    assert.isNotNull(run.threadId);
    console.log(`Created Run, Run ID:  ${run.id}, Thread ID: ${run.threadId}`);
    console.log(`Started : ${run.createdAt}`);

    // Get run
    const runDetails = await agents.getRun(run.threadId, run.id);
    assert.isNotNull(runDetails);
    assert.isNotNull(runDetails.id);
    assert.equal(run.id, runDetails.id);
    console.log(`Retrieved run, Run ID:  ${runDetails.id}`);

    // Delete agent and thread
    await agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await agents.deleteThread(run.threadId);
    console.log(`Deleted Thread, thread ID:  ${run.threadId}`);
  });
});
