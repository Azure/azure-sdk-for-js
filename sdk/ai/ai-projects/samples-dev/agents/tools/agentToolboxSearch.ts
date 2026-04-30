// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with the ToolboxSearchPreviewTool
 * using the Azure AI Projects client. When this tool is present, deferred tools in the
 * agent's toolbox are hidden from the standard tools list and are only discoverable via
 * search_tools queries at runtime, allowing the model to selectively activate tools.
 *
 * @summary Create an agent with ToolboxSearchPreviewTool, run a conversation, and
 * clean up resources.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import type { ToolboxSearchPreviewTool } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Configure the ToolboxSearchPreviewTool to enable runtime toolbox discovery.
  const toolboxSearchTool: ToolboxSearchPreviewTool = {
    type: "toolbox_search_preview",
  };

  console.log("Creating agent with ToolboxSearchPreviewTool...");
  const agent = await project.agents.createVersion("ToolboxSearchAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful assistant. Use the toolbox search tool to discover and invoke relevant tools for the user's request.",
    tools: [toolboxSearchTool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  console.log("\nSending a request to the agent...");
  const response = await openAIClient.responses.create(
    {
      input: "What tools are available in this agent's toolbox?",
    },
    {
      body: {
        agent_reference: { name: agent.name, type: "agent_reference" },
      },
    },
  );
  console.log(`\nAgent response: ${response.output_text}`);

  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nToolbox Search agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
