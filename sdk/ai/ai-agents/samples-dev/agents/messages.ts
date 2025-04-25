// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic message agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic message agent operations.
 *
 */

import type { MessageTextContent } from "@azure/ai-agents";
import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const connectionString =
  process.env["PROJECT_ENDPOINT"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are helpful agent",
  });
  const thread = await client.createThread();

  const message = await client.createMessage(thread.id,  "user", "hello, world!");
  console.log(`Created message, message ID: ${message.id}`);

  const messages = await client.listMessages(thread.id);
  console.log(
    `Message ${message.id} contents: ${(messages.data[0].content[0] as MessageTextContent).text.value}`,
  );

  const updatedMessage = await client.updateMessage(thread.id, message.id, {
    metadata: { introduction: "true" },
  });
  console.log(`Updated message metadata - introduction: ${updatedMessage.metadata?.introduction}`);

  await client.deleteThread(thread.id);
  console.log(`Deleted thread, thread ID : ${thread.id}`);

  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID : ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
