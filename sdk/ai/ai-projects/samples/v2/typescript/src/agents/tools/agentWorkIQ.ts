// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a Prompt Agent that uses the
 * Work IQ preview tool.
 *
 * @summary Create an agent with WorkIQPreviewTool, send a query that leverages
 * Work IQ to search and retrieve Microsoft 365 information, and clean up resources.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient, type WorkIQPreviewTool } from "@azure/ai-projects";
import "dotenv/config";
import { withAgentVersionEndpoint } from "../agentEndpointUtils.js";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";
const workIqProjectConnectionId =
  process.env["WORKIQ_CONNECTION_ID"] || "<work iq project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const tool: WorkIQPreviewTool = {
    type: "work_iq_preview",
    project_connection_id: workIqProjectConnectionId,
  };

  console.log("Creating agent with WorkIQPreviewTool...");
  await withAgentVersionEndpoint(
    project,
    agentName,
    {
      kind: "prompt",
      model: deploymentName,
      instructions: "Use the available Work IQ tools to answer questions and perform tasks.",
      tools: [tool],
    },
    async (agent) => {
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );
      const openAIClient = project.getOpenAIClient({
        azureConfig: { allowPreview: true, agentName },
      });

      const userInput = "What meetings do I have scheduled today?";
      console.log("\nSending request to agent...");

      const response = await openAIClient.responses.create({
        input: userInput,
      });

      console.log(`Agent response: ${response.output_text}`);
    },
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
