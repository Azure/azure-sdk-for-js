// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Microsoft Fabric capabilities
 * using the MicrosoftFabricPreviewTool and synchronous Azure AI Projects client. The agent can query
 * Fabric data sources and provide responses based on data analysis.
 *
 * @summary This sample demonstrates how to create an agent with Microsoft Fabric tool capabilities,
 * send queries to Fabric data sources, and clean up resources.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as readline from "readline";
import "dotenv/config";
import { withAgentVersionEndpoint } from "../agentEndpointUtils.js";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";
const fabricProjectConnectionId =
  process.env["FABRIC_PROJECT_CONNECTION_ID"] || "<fabric project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating agent with Microsoft Fabric tool...");

  // Define Microsoft Fabric tool that connects to Fabric data sources
  await withAgentVersionEndpoint(
    project,
    agentName,
    {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant.",
      tools: [
        {
          type: "fabric_dataagent_preview",
          fabric_dataagent_preview: {
            project_connections: [
              {
                project_connection_id: fabricProjectConnectionId,
              },
            ],
          },
        },
      ],
    },
    async (agent) => {
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );
      const openAIClient = project.getOpenAIClient({
        azureConfig: { allowPreview: true, agentName },
      });

      // Prompt user for input
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const userInput = await new Promise<string>((resolve) => {
        rl.question(
          "Enter your question for Fabric (Default: 'Tell me about sales records'): \n",
          (answer) => {
            rl.close();
            resolve(answer);
          },
        );
      });

      console.log("\nSending request to Fabric agent...");
      const response = await openAIClient.responses.create(
        {
          input: userInput || "Tell me about sales records",
        },
        {
          body: {
            tool_choice: "required",
          },
        },
      );

      console.log(`\nResponse output: ${response.output_text}`);
    },
  );
  console.log("\nMicrosoft Fabric agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
