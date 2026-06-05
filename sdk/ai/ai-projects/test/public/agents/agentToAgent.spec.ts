// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

describe("agents - agent-to-agent (A2A)", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;
  let openAIClient: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create agent with A2A tool and stream response", async function () {
    const agent = await agents.createVersion("MyA2AAgent", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions: "You are a helpful assistant.",
      tools: [
        {
          type: "a2a_preview",
          project_connection_id: assertEnvironmentVariable("A2A_PROJECT_CONNECTION_ID"),
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "MyA2AAgent");
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    const streamResponse = await openAIClient.responses.create(
      {
        input: "What can the secondary agent do?",
        stream: true,
      },
      {
        body: {
          agent: { name: agent.name, type: "agent_reference" },
          tool_choice: "required",
        },
      },
    );

    let responseCreated = false;
    let responseCompleted = false;
    let responseText = "";

    for await (const event of streamResponse) {
      if (event.type === "response.created") {
        responseCreated = true;
        console.log(`Response created with ID: ${event.response.id}`);
      } else if (event.type === "response.output_text.delta") {
        responseText += event.delta;
      } else if (event.type === "response.completed") {
        responseCompleted = true;
        console.log("Response completed");
      }
    }

    assert.isTrue(responseCreated, "Expected response.created event");
    assert.isTrue(responseCompleted, "Expected response.completed event");
    assert.isNotEmpty(responseText, "Expected response text from streaming");
    console.log(`Response text: ${responseText}`);

    // Clean up
    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });
});
