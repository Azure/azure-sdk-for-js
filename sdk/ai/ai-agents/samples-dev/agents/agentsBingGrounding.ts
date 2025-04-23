// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Grounding with Bing Search tool
 * from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Grounding with Bing Search tool.
 *
 */

import type { MessageContent, MessageTextContent } from "@azure/ai-agents";
import {
  AgentsClient,
  ToolUtility,
  connectionToolType,
  isOutputOfType,
} from "@azure/ai-agents";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const connectionString =
  process.env["PROJECT_ENDPOINT"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

  const connectionId = process.env["AZURE_BING_CONNECTION_ID"] || "<connection-name>";

  // Initialize agent bing tool with the connection id
  const bingTool = ToolUtility.createConnectionTool(connectionToolType.BingGrounding, [
    connectionId,
  ]);

  // Create agent with the bing tool and process assistant run
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [bingTool.definition],
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.createMessage(thread.id, "user", "How does wikipedia explain Euler's Identity?");
  console.log(`Created message, message ID : ${message.id}`);

  // Create and process agent run in thread with tools
  let run = await client.createRun(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.getRun(thread.id, run.id);
  }
  if (run.status === "failed") {
    console.log(`Run failed: ${run.lastError}`);
  }
  console.log(`Run finished with status: ${run.status}`);

  // Delete the assistant when done
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Fetch and log all messages
  const messages = await client.listMessages(thread.id);
  console.log(`Messages:`);
  const agentMessage: MessageContent = messages.data[0].content[0];
  if (isOutputOfType<MessageTextContent>(agentMessage, "text")) {
    const textContent = agentMessage as MessageTextContent;
    console.log(`Text Message Content - ${textContent.text.value}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
