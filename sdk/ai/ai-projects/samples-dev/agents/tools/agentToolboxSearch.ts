// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with tool_search and a deferred MCP tool.
 * The agent uses tool search to discover deferred tools at runtime.
 *
 * @summary Create an agent with tool_search to dynamically discover deferred MCP tools.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient, type MCPTool, type ToolSearchToolParam } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with tool_search and deferred MCP tool...");
  const agent = await project.agents.createVersion("MyToolboxSearchAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful assistant. Use toolbox search when you need to discover tools available in this project.",
    tools: [
      {
        type: "mcp",
        server_label: "api-specs",
        server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
        require_approval: "never",
        defer_loading: true,
      } as MCPTool,
      {
        type: "tool_search",
      } as ToolSearchToolParam,
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  console.log("\nSending request to the toolbox-search-enabled agent...");
  const response = await openAIClient.responses.create(
    {
      input: "Find a tool that can help inspect Azure REST API specifications.",
    },
    {
      body: {
        agent_reference: { name: agent.name, type: "agent_reference" },
      },
    },
  );

  console.log(`\nResponse output: ${response.output_text}`);

  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
