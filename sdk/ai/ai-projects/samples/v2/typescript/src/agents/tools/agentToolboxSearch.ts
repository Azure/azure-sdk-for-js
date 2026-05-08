// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with the ToolboxSearchPreviewTool and
 * the Azure AI Projects client. The agent can use toolbox search to discover tools configured
 * in the project.
 *
 * @summary This sample demonstrates how to create an agent with the ToolboxSearchPreviewTool,
 * send a request that requires tool discovery, and clean up resources.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with ToolboxSearchPreviewTool...");
  const agent = await project.agents.createVersion("MyToolboxSearchAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful assistant. Use toolbox search when you need to discover tools available in this project.",
    tools: [
      {
        type: "toolbox_search_preview",
        name: "project-toolbox-search",
        description:
          "Search toolboxes configured in this project for tools that can help answer a user request.",
      },
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
        tool_choice: "required",
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
