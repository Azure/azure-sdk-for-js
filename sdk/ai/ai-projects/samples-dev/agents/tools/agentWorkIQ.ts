// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a Prompt Agent that uses the
 * Work IQ preview tool.
 *
 * @summary Create an agent with WorkIQPreviewTool, send a query that leverages
 * Work IQ to search and retrieve Microsoft 365 information, and clean up resources.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient, type WorkIQPreviewTool } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const workIqProjectConnectionId =
  process.env["WORKIQ_CONNECTION_ID"] || "<work iq project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  const tool: WorkIQPreviewTool = {
    type: "work_iq_preview",
    project_connection_id: workIqProjectConnectionId,
  };

  console.log("Creating agent with WorkIQPreviewTool...");
  const agent = await project.agents.createVersion("MyWorkIQAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Use the available Work IQ tools to answer questions and perform tasks.",
    tools: [tool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  const userInput = "What meetings do I have scheduled today?";
  console.log("\nSending request to agent...");

  const response = await openAIClient.responses.create(
    {
      input: userInput,
    },
    {
      body: {
        agent_reference: { name: agent.name, version: agent.version, type: "agent_reference" },
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
