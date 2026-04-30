// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type { MCPTool, ToolboxSearchPreviewTool, ToolUnion } from "../../../src/index.js";
import type OpenAI from "openai";

const toolboxName = "toolbox-search-test";

describe("agents - toolbox search tool", () => {
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

  // TODO(ToolboxSearchPreviewTool): unskip after recording added
  it.skip("should create agent with ToolboxSearchPreviewTool and get response", async function () {
    // Ensure clean state
    try {
      await projectsClient.beta.toolboxes.delete(toolboxName);
    } catch (error: any) {
      if (error?.statusCode !== 404) {
        throw error;
      }
    }

    // Create a toolbox for the agent to search over
    const tools: ToolUnion[] = [
      {
        type: "mcp",
        server_label: "azure_api_specs",
        server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
        require_approval: "never",
      } satisfies MCPTool,
    ];

    const toolbox = await projectsClient.beta.toolboxes.createVersion(toolboxName, tools, {
      description: "Test toolbox for toolbox-search agent.",
    });
    assert.isNotNull(toolbox);
    assert.equal(toolbox.name, toolboxName);

    let agentVersion: { name: string; version: string } | undefined;
    let conversationId: string | undefined;

    try {
      // Configure ToolboxSearchPreviewTool
      const toolboxSearchTool: ToolboxSearchPreviewTool = {
        type: "toolbox_search_preview",
      };

      const agent = await agents.createVersion("ToolboxSearchAgent", {
        kind: "prompt",
        model: process.env["FOUNDRY_MODEL_NAME"] ?? "gpt-4o",
        instructions:
          "You are a helpful assistant. Search your toolbox to discover available tools.",
        tools: [toolboxSearchTool],
      });
      assert.isNotNull(agent);
      assert.equal(agent.name, "ToolboxSearchAgent");
      agentVersion = { name: agent.name, version: agent.version };

      const conversation = await openAIClient.conversations.create();
      assert.isNotNull(conversation.id);
      conversationId = conversation.id;

      const response = await openAIClient.responses.create(
        {
          input: "What tools are available to you?",
          conversation: conversation.id,
        },
        {
          body: { agent: { name: agent.name, type: "agent_reference" } },
        },
      );
      assert.isNotNull(response);
      assert.isNotNull(response.output_text);
    } finally {
      if (conversationId) {
        await openAIClient.conversations.delete(conversationId);
      }
      if (agentVersion) {
        await agents.deleteVersion(agentVersion.name, agentVersion.version);
      }
      try {
        await projectsClient.beta.toolboxes.delete(toolboxName);
      } catch (error: any) {
        if (error?.statusCode !== 404) {
          throw error;
        }
      }
    }
  });
});
