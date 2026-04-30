// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

describe("agents - sharepoint tool", () => {
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

  it("should create agent with SharePoint tool and stream response", async function () {
    const agent = await agents.createVersion("MyAgent", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions:
        "You are a helpful agent that can use SharePoint tools to assist users. Use the available SharePoint tools to answer questions and perform tasks.",
      tools: [
        {
          type: "sharepoint_grounding_preview",
          sharepoint_grounding_preview: {
            project_connections: [
              {
                project_connection_id: assertEnvironmentVariable(
                  "SHAREPOINT_PROJECT_CONNECTION_ID",
                ),
              },
            ],
          },
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "MyAgent");
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    const streamResponse = await openAIClient.responses.create(
      {
        input: "Please summarize the last meeting notes stored in SharePoint.",
        stream: true,
      },
      {
        body: {
          agent: { name: agent.name, type: "agent_reference" },
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
