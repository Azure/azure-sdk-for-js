// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { delay } from "@azure-tools/test-recorder";
import type { AgentsClient } from "@azure/ai-agents";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("Agents - Run", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create agent and run agent", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create thread
    const thread = await projectsClient.threads.create();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create run
    const run = await projectsClient.runs.create(thread.id, agent.id);
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);

    // Delete agent and thread
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  it("should create json response format run and get run details", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create thread
    const thread = await projectsClient.threads.create();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create message
    const message = await projectsClient.messages.create(
      thread.id,
      "user",
      "Please introduce banana to me",
    );
    assert.isNotNull(message.id);
    console.log(`Created message, message ID ${message.id}`);

    const jsonSchema = {
      description: "Response from the agent",
      name: "AgentResponse",
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the fruit",
          },
          color: {
            type: "string",
            description: "Color of the fruit",
          },
          taste: {
            type: "string",
            description: "Taste of the fruit",
          },
        },
        required: ["name", "color", "taste"],
      },
    };

    // Create run
    const run = await projectsClient.runs.createAndPoll(thread.id, agent.id, {
      responseFormat: {
        type: "json_schema",
        jsonSchema: jsonSchema,
      },
    });
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);
    assert.deepEqual(run.responseFormat, {
      type: "json_schema",
      jsonSchema: jsonSchema,
    });

    // Get run
    const runDetails = await projectsClient.runs.get(thread.id, run.id);
    assert.isNotNull(runDetails);
    assert.isNotNull(runDetails.id);
    assert.equal(run.id, runDetails.id);
    console.log(`Retrieved run, Run ID:  ${runDetails.id}`);

    // Delete agent and thread
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  it("should create and get run status", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create thread
    const thread = await projectsClient.threads.create();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create message
    const message = await projectsClient.messages.create(
      thread.id,
      "user",
      "Hello, tell me a joke",
    );
    assert.isNotNull(message.id);
    console.log(`Created message, message ID ${message.id}`);

    // Create run
    const run = await projectsClient.runs.create(thread.id, agent.id);
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);

    // Get run status
    let runDetails = await projectsClient.runs.get(thread.id, run.id);
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
      runDetails = await projectsClient.runs.get(thread.id, run.id);
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
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  it("should create and list runs", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create thread
    const thread = await projectsClient.threads.create();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create message
    const message = await projectsClient.messages.create(
      thread.id,
      "user",
      "Hello, tell me a joke",
    );
    assert.isNotNull(message.id);
    console.log(`Created message, message ID ${message.id}`);

    // Create run
    const run = await projectsClient.runs.create(thread.id, agent.id);
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);

    // Get run status
    const runsIterator = projectsClient.runs.list(thread.id);
    assert.isNotNull(runsIterator);

    // Collect all runs into an array
    const runsArray: Array<any> = [];
    for await (const r of runsIterator) {
      runsArray.push(r);
    }

    assert.isArray(runsArray);
    console.log(`List  - found no of runs: ${runsArray.length}, first run ID: ${runsArray[0]?.id}`);
    const runDetails = runsArray.find((threadRun) => threadRun.id === run.id);
    assert.isNotNull(runDetails);
    if (runDetails) {
      console.log(`Run status - ${runDetails.status}, run ID: ${runDetails.id}`);
    } else {
      console.log("Run details are undefined.");
    }

    // Delete agent and thread
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted Thread, thread ID:  ${thread.id}`);
  });

  it("should create and run in single call", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are helpful agent",
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    console.log(`Created agent, agent ID:  ${agent.id}`);

    // Create run
    const run = await projectsClient.runs.createThreadAndRun(agent.id, {
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
    const runDetails = await projectsClient.runs.get(run.threadId, run.id);
    assert.isNotNull(runDetails);
    assert.isNotNull(runDetails.id);
    assert.equal(run.id, runDetails.id);
    console.log(`Retrieved run, Run ID:  ${runDetails.id}`);

    // Delete agent and thread
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID:  ${agent.id}`);
    await projectsClient.threads.delete(run.threadId);
    console.log(`Deleted Thread, thread ID:  ${run.threadId}`);
  });
});
