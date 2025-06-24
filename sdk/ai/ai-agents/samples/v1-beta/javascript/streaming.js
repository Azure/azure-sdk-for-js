// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations in streaming from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations in streaming.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
const { streamRunEventsProcessor } = require("./utils/streamRunEventsProcessor.js"); // Adjust the import path as necessary

require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-assistant",
    instructions: "You are helpful agent",
  });

  console.log(`Created agent, agent ID : ${agent.id}`);

  const thread = await client.threads.create();

  console.log(`Created thread, thread ID : ${thread.id}`);

  await client.messages.create(thread.id, "user", "Hello, tell me a joke");

  console.log(`Created message, thread ID : ${thread.id}`);

  const streamEventMessages = await client.runs.create(thread.id, agent.id).stream();
  console.log("Streaming run events...");
  await streamRunEventsProcessor(streamEventMessages);

  await client.deleteAgent(agent.id);
  console.log(`Delete agent, agent ID : ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
