// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Microsoft Fabric capabilities
 * using the MicrosoftFabricAgentTool and synchronous Azure AI Projects client. The agent can query
 * Fabric data sources and provide responses based on data analysis.
 *
 * @summary This sample demonstrates how to create an agent with Microsoft Fabric tool capabilities,
 * send queries to Fabric data sources, and clean up resources.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { PromptAgentDefinition, AIProjectClient } from "@azure/ai-projects";
import * as readline from "readline";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["AZURE_AI_MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const fabricProjectConnectionId =
  process.env["FABRIC_PROJECT_CONNECTION_ID"] || "<fabric project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential(), {
    additionalPolicies: [
      {
        policy: {
          name: "CustomHeaderPolicy",
          sendRequest: async (request, next) => {
            request.headers.set("x-ms-oai-response-testenv", "tip2-preview1"); // TODO: remove this line when the feature goes to production
            return next(request);
          },
        },
        position: "perCall",
      },
    ],
  });
  const openAIClient = await project.getOpenAIClient();

  console.log("Creating agent with Microsoft Fabric tool...");

  const agentDefintion = {
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
  } as any;

  const agent = await project.agents.createVersion("MyFabricAgent", agentDefintion);
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Prompt user for input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await new Promise<string>((resolve) => {
    rl.question(
      "Enter your question for Fabric (e.g., 'Tell me about sales records'): \n",
      (answer) => {
        rl.close();
        resolve(answer);
      },
    );
  });

  console.log("\nSending request to Fabric agent...");
  const response = await openAIClient.responses.create(
    {
      input: userInput,
    },
    {
      body: {
        agent: { name: agent.name, type: "agent_reference" },
        tool_choice: "required",
      },
    },
  );

  console.log(`\nResponse output: ${response.output_text}`);

  // Clean up resources by deleting the agent version
  // This prevents accumulation of unused resources in your project
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nMicrosoft Fabric agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
