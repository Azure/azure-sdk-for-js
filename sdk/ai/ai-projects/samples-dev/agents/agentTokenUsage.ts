// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to track the token usage of an agent in the Azure Agents service.
 * 
 * @summary demonstrates how to track the token usage of an agent.
 */
import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create an agent
  const agent = await client.agents.createAgent("gpt-4o", {
    name: "my-agent",
    instructions: "You are a helpful agent",
  });

  const thread = await client.agents.createThread();
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: "hello, world!",
  });

  console.log(`Created message, message ID: ${message.id}`);

  // Create run
  let run = await client.agents.createRun(thread.id, agent.id);
  console.log(`Created run, run ID: ${run.id}`);
  console.log(`usage for run ${run.id}:`, JSON.stringify(run.usage, null, 2));
  // Wait for run to complete
  while (["queued", "in_progress", "requires_action"].includes(run.status)) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.agents.getRun(thread.id, run.id);
    console.log(`Run status: ${run.status}`);
  }

  console.log(`usage for run ${run.id}:`, JSON.stringify(run.usage, null, 2));

  // Delete the agent once done
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
