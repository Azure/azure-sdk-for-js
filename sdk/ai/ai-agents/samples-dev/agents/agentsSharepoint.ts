// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *  This sample demonstrates how to use agent operations with the Sharepoint tool from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Sharepoint tool.
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

import * as dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env["PROJECT_ENDPOINT"] || "<project connection string>";
  const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

  const connectionId = process.env["SHAREPOINT_CONNECTION_ID"] || "<connection-id>";

  // Initialize agent Sharepoint tool with the connection id
  const sharepointTool = ToolUtility.createConnectionTool(connectionToolType.SharepointGrounding, [
    connectionId,
  ]);

  // Create agent with the Sharepoint tool and process assistant run
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [sharepointTool.definition],
  });
  console.log(connectionId);
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.createMessage(thread.id,  "user","Hello, tell me about my health insurance options");
  console.log(`Created message, message ID: ${message.id}`);

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
  client.deleteAgent(agent.id);
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
