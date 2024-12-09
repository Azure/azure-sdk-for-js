// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * FILE: threads.ts
 *
 * @summary This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client.
 *
 * USAGE:
 *  npm node threads.ts
 *
 *  Before running the sample:
 *
 *  npm install @azure/ai-projects @azure/identity dotenv
 *
 *  Set this environment variables with your own values:
 *  AZURE_AI_PROJECTS_CONNECTION_STRING - the Azure AI Project connection string, as found in your AI Studio Project
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] ||
  "<endpoint>>;<subscription>;<resource group>;<project>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  const thread = await client.agents.createThread();

  console.log(`Created thread, thread ID : ${thread.id}`);

  const _thread = await client.agents.getThread(thread.id);

  console.log(`Retrieved thread, thread ID : ${_thread.id}`);

  client.agents.deleteThread(thread.id);

  console.log(`Deleted thread, thread ID : ${_thread.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
