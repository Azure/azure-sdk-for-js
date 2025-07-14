// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic agent operations.
 *
 */

import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create an agent
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are helpful agent",
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create a thread
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID : ${thread.id}`);

  // List all threads for the agent
  const threads = client.threads.list();
  console.log(`Threads for agent ${agent.id}:`);
  for await (const t of threads) {
    console.log(`Thread ID: ${t.id}`);
    console.log(`Created at: ${t.createdAt}`);
    console.log(`Metadata: ${t.metadata}`);
    console.log(`---- `);
  }

  // Create a message
  const message = await client.messages.create(thread.id, "user", "Hello, tell me a joke");
  console.log(`Created message, message ID : ${message.id}`);

  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
    onResponse: (response): void => {
      const parsedBody =
        typeof response.parsedBody === "object" && response.parsedBody !== null
          ? response.parsedBody
          : null;
      const status = parsedBody && "status" in parsedBody ? parsedBody.status : "unknown";
      console.log(`Received response with status: ${status}`);
    },
  });
  console.log(`Run finished with status: ${run.status}`);

  // Delete agent
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
