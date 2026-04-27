// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with the FabricIQPreviewTool and
 * the Azure AI Projects client. The agent uses Fabric IQ to ground responses in Fabric
 * data and metadata exposed through the configured project connection.
 *
 * @summary This sample demonstrates how to create an agent with the FabricIQPreviewTool,
 * send queries against the connected Fabric IQ resource, and clean up resources.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as readline from "readline";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const fabricIqProjectConnectionId =
  process.env["FABRIC_IQ_PROJECT_CONNECTION_ID"] || "<fabric iq project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with FabricIQPreviewTool...");

  const agent = await project.agents.createVersion("MyFabricIQAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful assistant. Use the Fabric IQ tool to answer questions grounded in Fabric data.",
    tools: [
      {
        type: "fabric_iq_preview",
        fabric_iq_preview: {
          project_connection_id: fabricIqProjectConnectionId,
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await new Promise<string>((resolve) => {
    rl.question(
      "Enter your question for Fabric IQ (Default: 'Summarize the available datasets'): \n",
      (answer) => {
        rl.close();
        resolve(answer);
      },
    );
  });

  console.log("\nSending request to Fabric IQ agent...");
  const response = await openAIClient.responses.create(
    {
      input: userInput || "Summarize the available datasets",
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

  console.log("\nFabric IQ agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
