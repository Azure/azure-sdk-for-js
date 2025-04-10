// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic thread agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic thread agent operations.
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

  const thread = await client.agents.createThread();

  console.log(`Created thread, thread ID : ${thread.id}`);

  const _thread = await client.agents.getThread(thread.id);

  console.log(`Retrieved thread, thread ID : ${_thread.id}`);

  await client.agents.deleteThread(thread.id);

  console.log(`Deleted thread, thread ID : ${_thread.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
