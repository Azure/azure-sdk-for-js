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
import { AgentsClient, ToolUtility, isOutputOfType } from "@azure/ai-agents";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  const connectionId = process.env["AZURE_BING_CONNECTION_ID"] || "<connection-name>";

  // Initialize agent bing tool with the connection id
  const bingTool = ToolUtility.createBingGroundingTool([{ connectionId: connectionId }]);

  // Create agent with the bing tool and process assistant run
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [bingTool.definition],
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.messages.create(
    thread.id,
    "user",
    "How does wikipedia explain Euler's Identity?",
  );
  console.log(`Created message, message ID : ${message.id}`);

  // Create and process agent run in thread with tools
  let run = await client.runs.create(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.runs.get(thread.id, run.id);
  }
  if (run.status === "failed") {
    console.log(`Run failed: ${run.lastError?.message}`);
  }
  console.log(`Run finished with status: ${run.status}`);

  // Delete the assistant when done
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Fetch and log all messages
  const messagesIterator = client.messages.list(thread.id);
  console.log(`Messages:`);

  // Get the first message
  const firstMessage = await messagesIterator.next();
  if (!firstMessage.done && firstMessage.value) {
    const agentMessage: MessageContent = firstMessage.value.content[0];
    if (isOutputOfType<MessageTextContent>(agentMessage, "text")) {
      const textContent = agentMessage as MessageTextContent;
      console.log(`Text Message Content - ${textContent.text.value}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
