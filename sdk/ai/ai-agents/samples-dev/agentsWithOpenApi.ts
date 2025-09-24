// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with an OpenApi tool.
 *
 * @summary demonstrates how to use agent operations with an OpenApi tool.
 *
 */

import type {
  MessageTextContent,
  RunStepToolCallDetails,
  RunStepFunctionToolCall,
} from "@azure/ai-agents";
import { AgentsClient, isOutputOfType, OpenApiTool } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import * as fs from "fs";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Read in OpenApi spec
  const filePath = "./data/weatherOpenApi.json";
  const openApiSpec = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const countriesApiSpec = JSON.parse(fs.readFileSync("./data/countriesApi.json", "utf-8"));

  // Create OpenApi tool
  const openApiTool = new OpenApiTool({
    name: "getWeather",
    spec: openApiSpec,
    description: "Retrieve weather information for a location",
    auth: {
      type: "anonymous",
    },
    defaultParams: ["format"], // optional
  });

  openApiTool.addDefinition({
    name: "getCountries",
    description: "Get country information",
    spec: countriesApiSpec,
    auth: {
      type: "anonymous",
    },
  });

  // Create agent with OpenApi tool
  const agent = await client.createAgent(modelDeploymentName, {
    name: "myAgent",
    instructions: "You are a helpful agent",
    tools: openApiTool.definitions,
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create a thread
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create a message
  const message = await client.messages.create(
    thread.id,
    "user",
    "What's the weather in Seattle and What is the name and population of the country that uses currency with abbreviation THB?",
  );
  console.log(`Created message, message ID: ${message.id}`);

  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
  });
  console.log(`Run finished with status: ${run.status}`);

  const runSteps = client.runSteps.list(thread.id, run.id);
  for await (const step of runSteps) {
    console.log(`Step ${step.id} status: ${step.status}`);
    if (isOutputOfType<RunStepToolCallDetails>(step.stepDetails, "tool_calls")) {
      const toolCalls = step.stepDetails.toolCalls;
      for (const toolCall of toolCalls) {
        console.log(`Tool call: ${toolCall.id}, tool type: ${toolCall.type}`);
        if (isOutputOfType<RunStepFunctionToolCall>(toolCall, "function")) {
          console.log(`Function tool call name: ${toolCall.function.name}`);
        }
      }
    }
  }
  // Get most recent message from the assistant
  const messagesIterator = client.messages.list(thread.id);
  for await (const m of messagesIterator) {
    if (m.role === "assistant") {
      const textContent = m.content?.find((content) =>
        isOutputOfType<MessageTextContent>(content, "text"),
      );
      if (textContent) {
        console.log(`Last message: ${textContent.text.value}`);
      }
      break;
    }
  }
  // Delete the agent once done
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
