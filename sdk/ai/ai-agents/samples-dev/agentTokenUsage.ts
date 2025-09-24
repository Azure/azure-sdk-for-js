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

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create an Agent
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
  });

  // Create a thread
  const thread = await client.threads.create();
  // Create a message
  const message = await client.messages.create(thread.id, "user", "hello, world!");

  console.log(`Created message, message ID: ${message.id}`);

  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
  });
  console.log(`Run finished with status: ${run.status}`);

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
