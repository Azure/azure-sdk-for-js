// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic agent operations.
 *
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  const agent = await client.agents.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are helpful agent",
  });

  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create a thread
  const thread = await client.agents.createThread();
  console.log(`Created thread, thread ID : ${thread.id}`);

  // List all threads for the agent
  const threads = client.agents.listThreads();
  console.log(`Threads for agent ${agent.id}:`);
  for await (const t of (await threads).data) {
    console.log(`Thread ID: ${t.id}`);
    console.log(`Created at: ${t.createdAt}`);
    console.log(`Metadata: ${t.metadata}`);
    console.log(`---- `);
  }

  // Create a message
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: "Hello, tell me a joke",
  });
  console.log(`Created message, message ID : ${message.id}`);

  // Create and poll a run
  console.log("Creating run...");
  let run = await client.agents.createRun(thread.id, agent.id);

  // Poll the run as long as run status is queued or in progress
  while (
    run.status === "queued" ||
    run.status === "in_progress" ||
    run.status === "requires_action"
  ) {
    // Wait for a second
    console.log(`Run status: ${run.status}, waiting...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.agents.getRun(thread.id, run.id);
  }
  console.log(`Run status: ${run.status}`);

  await client.agents.deleteAgent(agent.id);

  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
