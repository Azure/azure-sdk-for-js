// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Azure Function capabilities
 * using the AzureFunctionTool. The agent can call an Azure Function via Storage Queue
 * input/output bindings.
 *
 * @summary This sample demonstrates how to create an agent with an Azure Function tool
 * that uses Storage Queue bindings for input and output, send a query, and clean up resources.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";
import { withAgentVersionEndpoint } from "../agentEndpointUtils.js";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";
const storageInputQueueName =
  process.env["STORAGE_INPUT_QUEUE_NAME"] || "<storage input queue name>";
const storageOutputQueueName =
  process.env["STORAGE_OUTPUT_QUEUE_NAME"] || "<storage output queue name>";
const storageQueueServiceEndpoint =
  process.env["STORAGE_QUEUE_SERVICE_ENDPOINT"] || "<storage queue service endpoint>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating agent with Azure Function tool...");

  // Create agent with Azure Function tool
  await withAgentVersionEndpoint(
    project,
    agentName,
    {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant.",
      tools: [
        {
          type: "azure_function",
          azure_function: {
            function: {
              name: "queue_trigger",
              description: "Get weather for a given location",
              parameters: {
                type: "object",
                properties: {
                  location: { type: "string", description: "location to determine weather for" },
                },
              },
            },
            input_binding: {
              type: "storage_queue",
              storage_queue: {
                queue_name: storageInputQueueName,
                queue_service_endpoint: storageQueueServiceEndpoint,
              },
            },
            output_binding: {
              type: "storage_queue",
              storage_queue: {
                queue_name: storageOutputQueueName,
                queue_service_endpoint: storageQueueServiceEndpoint,
              },
            },
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

      // Send a query that triggers the Azure Function
      console.log("\nSending query...");
      const response = await openAIClient.responses.create({
        tool_choice: "required",
        input: "What is the weather in Seattle?",
      });
      console.log(`Response output: ${response.output_text}`);
    },
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
