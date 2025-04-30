// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to track the token usage of an Agent in the Azure Agents service.
 *
 * @summary demonstrates how to track the token usage of an Agent.
 */
import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const connectionString = process.env["PROJECT_ENDPOINT"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

  // Create an Agent
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
  });

  // Create a thread
  const thread = await client.createThread();
  // Create a message
  const message = await client.createMessage(thread.id, "user", "hello, world!");

  console.log(`Created message, message ID: ${message.id}`);

  // Create run
  let run = await client.createRun(thread.id, agent.id);
  console.log(`Created run, run ID: ${run.id}`);
  // the usage should be null at this point
  console.log(`usage for run ${run.id}:`, JSON.stringify(run.usage, null, 2));
  // Wait for run to complete
  while (["queued", "in_progress", "requires_action"].includes(run.status)) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.getRun(thread.id, run.id);
    console.log(`Run status: ${run.status}`);
  }

  // token usage should be like this:
  // {
  //   "completionTokens": 16,
  //   "promptTokens": 56,
  //   "totalTokens": 72
  // }
  console.log(`usage for run ${run.id}:`, JSON.stringify(run.usage, null, 2));

  // Delete the Agent once done
  await client.deleteAgent(agent.id);
  console.log(`Deleted Agent, Agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
