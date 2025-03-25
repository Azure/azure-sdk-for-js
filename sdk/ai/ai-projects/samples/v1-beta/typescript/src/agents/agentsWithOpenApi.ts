// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with an OpenApi tool.
 *
 * @summary demonstrates how to use agent operations with an OpenApi tool.
 */

import type { MessageTextContentOutput } from "@azure/ai-projects";
import { AIProjectsClient, isOutputOfType, ToolUtility } from "@azure/ai-projects";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";
import * as fs from "fs";
import  "dotenv/config";

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Read in OpenApi spec
  const filePath = "./data/weatherOpenApi.json";
  const openApiSpec = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Define OpenApi function
  const openApiFunction = {
    name: "getWeather",
    spec: openApiSpec,
    description: "Retrieve weather information for a location",
    auth: {
      type: "anonymous",
    },
  };

  // Create OpenApi tool
  const openApiTool = ToolUtility.createOpenApiTool(openApiFunction);

  // Create agent with OpenApi tool
  const agent = await client.agents.createAgent("gpt-4o-mini", {
    name: "myAgent",
    instructions: "You are a helpful agent",
    tools: [openApiTool.definition],
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create a thread
  const thread = await client.agents.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create a message
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: "What's the weather in Seattle?",
  });
  console.log(`Created message, message ID: ${message.id}`);

  // Create and execute a run
  let run = await client.agents.createRun(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.agents.getRun(thread.id, run.id);
  }
  if (run.status === "failed") {
    // Check if you got "Rate limit is exceeded.", then you want to get more quota
    console.log(`Run failed: ${run.lastError}`);
  }
  console.log(`Run finished with status: ${run.status}`);

  // Get most recent message from the assistant
  const messages = await client.agents.listMessages(thread.id);
  const assistantMessage = messages.data.find((msg) => msg.role === "assistant");
  if (assistantMessage) {
    const textContent = assistantMessage.content.find((content) =>
      isOutputOfType<MessageTextContentOutput>(content, "text"),
    ) as MessageTextContentOutput;
    if (textContent) {
      console.log(`Last message: ${textContent.text.value}`);
    }
  }
  // Delete the agent once done
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
