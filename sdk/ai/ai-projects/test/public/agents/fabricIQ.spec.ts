// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

describe("agents - fabric IQ tool", () => {
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

  // TODO(FabricIQPreviewTool): unskip after recording added
  it.skip("should create agent with FabricIQPreviewTool and get response", async function () {
    const agent = await agents.createVersion("MyFabricIQAgent", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions:
        "You are a helpful assistant. Use the Fabric IQ tool to answer questions grounded in Fabric data.",
      tools: [
        {
          type: "fabric_iq_preview",
          fabric_iq_preview: {
            project_connection_id: assertEnvironmentVariable("FABRIC_IQ_PROJECT_CONNECTION_ID"),
          },
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "MyFabricIQAgent");

    const response = await openAIClient.responses.create(
      {
        input: "Summarize the available datasets",
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

    await agents.deleteVersion(agent.name, agent.version);
  });
});
