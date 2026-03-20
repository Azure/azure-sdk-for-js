// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

describe("agents - fabric tool", () => {
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

  it("should create agent with Microsoft Fabric tool and get response", async function () {
    const agent = await agents.createVersion("MyFabricAgent", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions: "You are a helpful assistant.",
      tools: [
        {
          type: "fabric_dataagent_preview",
          fabric_dataagent_preview: {
            project_connections: [
              {
                project_connection_id: assertEnvironmentVariable("FABRIC_PROJECT_CONNECTION_ID"),
              },
            ],
          },
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "MyFabricAgent");
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    const response = await openAIClient.responses.create(
      {
        input: "Tell me about sales records",
      },
      {
        body: {
          agent: { name: agent.name, type: "agent_reference" },
          tool_choice: "required",
        },
      },
    );

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(`Response: ${response.output_text}`);

    // Clean up
    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });
});
