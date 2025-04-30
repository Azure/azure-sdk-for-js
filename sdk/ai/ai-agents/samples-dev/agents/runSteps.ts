// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic run agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic run agent operations.
 *
 */

import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const connectionString = process.env["PROJECT_ENDPOINT"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

  // Create agent
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create thread
  const thread = await client.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message
  const message = await client.createMessage(thread.id, "user", "hello, world!");
  console.log(`Created message, message ID: ${message.id}`);

  // Create run
  let run = await client.createRun(thread.id, agent.id);
  console.log(`Created run, run ID: ${run.id}`);

  // Wait for run to complete
  while (["queued", "in_progress", "requires_action"].includes(run.status)) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.getRun(thread.id, run.id);
    console.log(`Run status: ${run.status}`);
  }

  // List run steps
  const runSteps = await client.listRunSteps(thread.id, run.id);
  console.log(`Listed run steps, run ID: ${run.id}`);

  // Get specific run step
  const stepId = runSteps.data[0].id;
  const step = await client.getRunStep(thread.id, run.id, stepId);
  console.log(`Retrieved run step, step ID: ${step.id}`);

  // Clean up
  await client.deleteThread(thread.id);
  console.log(`Deleted thread, thread ID: ${thread.id}`);
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
