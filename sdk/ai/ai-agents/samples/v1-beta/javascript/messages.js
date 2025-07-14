// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic message agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic message agent operations.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are helpful agent",
  });
  const thread = await client.threads.create();

  const message = await client.messages.create(thread.id, "user", "hello, world!");
  console.log(`Created message, message ID: ${message.id}`);

  const messages = client.messages.list(thread.id);
  const firstMessage = (await messages.next()).value;
  console.log(
    `Message ${message.id} contents: ${firstMessage && firstMessage.content[0].text.value}`,
  );

  const updatedMessage = await client.messages.update(thread.id, message.id, {
    metadata: { introduction: "true" },
  });
  console.log(`Updated message metadata - introduction: ${updatedMessage.metadata?.introduction}`);

  await client.threads.delete(thread.id);
  console.log(`Deleted thread, thread ID : ${thread.id}`);

  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID : ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
