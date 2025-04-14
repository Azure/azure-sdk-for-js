// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic run agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic run agent operations.
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create agent
  const agent = await client.agents.createAgent("gpt-4o", {
    name: "my-agent",
    instructions: "You are a helpful agent",
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create thread
  const thread = await client.agents.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: "hello, world!",
  });
  console.log(`Created message, message ID: ${message.id}`);

  // Create run
  let run = await client.agents.createRun(thread.id, agent.id);
  console.log(`Created run, run ID: ${run.id}`);

  // Wait for run to complete
  while (["queued", "in_progress", "requires_action"].includes(run.status)) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.agents.getRun(thread.id, run.id);
    console.log(`Run status: ${run.status}`);
  }

  // List run steps
  const runSteps = await client.agents.listRunSteps(thread.id, run.id);
  console.log(`Listed run steps, run ID: ${run.id}`);

  // Get specific run step
  const stepId = runSteps.data[0].id;
  const step = await client.agents.getRunStep(thread.id, run.id, stepId);
  console.log(`Retrieved run step, step ID: ${step.id}`);

  // Clean up
  await client.agents.deleteThread(thread.id);
  console.log(`Deleted thread, thread ID: ${thread.id}`);
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
