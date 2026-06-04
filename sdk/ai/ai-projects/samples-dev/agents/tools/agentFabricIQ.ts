// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a Prompt Agent that uses the
 * Fabric IQ preview tool.
 *
 * @summary Create an agent with FabricIQPreviewTool, send a query that leverages
 * Fabric IQ to search and retrieve information, and clean up resources.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient, type FabricIQPreviewTool } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const fabricIqProjectConnectionId =
  process.env["FABRIC_IQ_PROJECT_CONNECTION_ID"] || "<fabric iq project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  const tool: FabricIQPreviewTool = {
    type: "fabric_iq_preview",
    project_connection_id: fabricIqProjectConnectionId,
    require_approval: "never",
  };

  console.log("Creating agent with FabricIQPreviewTool...");
  const agent = await project.agents.createVersion("MyAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Use the available Fabric IQ tools to answer questions and perform tasks.",
    tools: [tool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  const userInput = process.env["FABRIC_IQ_USER_INPUT"] || "Summarize the available datasets";
  console.log("\nSending request to agent...");

  const response = await openAIClient.responses.create(
    {
      input: userInput,
    },
    {
      body: {
        agent_reference: { name: agent.name, type: "agent_reference" },
      },
    },
  );

  console.log(`Agent response: ${response.output_text}`);

  // Clean up the agent version so unused versions don't accumulate in the project.
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
