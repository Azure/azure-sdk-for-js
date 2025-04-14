// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to track the token usage of an Agent in the Azure Agents service.
 *
 * @summary demonstrates how to track the token usage of an Agent.
 */
import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";
const agentModelName = process.env["AGENT_MODAL_NAME"] || "gpt-4o";
export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create an Agent
  const agent = await client.agents.createAgent(agentModelName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
  });

  // Create a thread
  const thread = await client.agents.createThread();
  // Create a message
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: "hello, world!",
  });

  console.log(`Created message, message ID: ${message.id}`);

  // Create run
  let run = await client.agents.createRun(thread.id, agent.id);
  console.log(`Created run, run ID: ${run.id}`);
  // the usage should be null at this point
  console.log(`usage for run ${run.id}:`, JSON.stringify(run.usage, null, 2));
  // Wait for run to complete
  while (["queued", "in_progress", "requires_action"].includes(run.status)) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.agents.getRun(thread.id, run.id);
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
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted Agent, Agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
