// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with the ToolboxSearchPreviewTool,
 * which allows the agent to dynamically discover and invoke tools stored in a toolbox at runtime.
 * When the ToolboxSearchPreviewTool is attached, deferred tools are hidden from `tools/list`
 * and only become discoverable via `search_tools` queries during the conversation.
 *
 * @summary Create an agent with ToolboxSearchPreviewTool for dynamic tool discovery from
 * a toolbox, run a conversation, and clean up resources.
 *
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import type { MCPTool, ToolboxSearchPreviewTool, ToolUnion } from "@azure/ai-projects";
import { AIProjectClient, RestError } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

const toolboxName = "toolbox-search-sample";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Ensure there is no leftover toolbox from a previous run
  try {
    await project.beta.toolboxes.delete(toolboxName);
    console.log(`Pre-existing toolbox '${toolboxName}' deleted`);
  } catch (e) {
    if (!(e instanceof RestError && e.statusCode === 404)) {
      throw e;
    }
  }

  // Create a toolbox that the agent can search over at runtime
  const tools: ToolUnion[] = [
    {
      type: "mcp",
      server_label: "azure_api_specs",
      server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
      require_approval: "never",
    } satisfies MCPTool,
  ];

  const toolbox = await project.beta.toolboxes.createVersion(toolboxName, tools, {
    description: "Sample toolbox for toolbox-search agent demo.",
  });
  console.log(`Toolbox created: ${toolbox.name} (${toolbox.id})`);

  let agentVersion: { name: string; version: string } | undefined;
  let conversationId: string | undefined;

  try {
    // Configure the ToolboxSearchPreviewTool so the agent discovers tools dynamically
    const toolboxSearchTool: ToolboxSearchPreviewTool = {
      type: "toolbox_search_preview",
    };

    // Create an agent equipped with the ToolboxSearchPreviewTool
    const agent = await project.agents.createVersion("ToolboxSearchAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "You are a helpful assistant. Use available tools to answer user questions. " +
        "You can search for tools in your toolbox when you need additional capabilities.",
      tools: [toolboxSearchTool],
    });
    agentVersion = { name: agent.name, version: agent.version };
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Start a conversation and send a question
    const conversation = await openAIClient.conversations.create();
    conversationId = conversation.id;
    console.log(`Conversation started (id: ${conversation.id})`);

    const response = await openAIClient.responses.create(
      {
        input: "What tools are available to you? Please search your toolbox and summarize them.",
        conversation: conversation.id,
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );

    console.log(`\nAgent response: ${response.output_text}`);
  } finally {
    console.log("\nCleaning up resources...");
    if (conversationId) {
      await openAIClient.conversations.delete(conversationId);
      console.log(`Conversation ${conversationId} deleted`);
    }
    if (agentVersion) {
      await project.agents.deleteVersion(agentVersion.name, agentVersion.version);
      console.log("Agent deleted");
    }
    try {
      await project.beta.toolboxes.delete(toolboxName);
      console.log(`Toolbox '${toolboxName}' deleted`);
    } catch (e) {
      if (!(e instanceof RestError && e.statusCode === 404)) {
        throw e;
      }
    }
  }

  console.log("\nToolbox Search agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
