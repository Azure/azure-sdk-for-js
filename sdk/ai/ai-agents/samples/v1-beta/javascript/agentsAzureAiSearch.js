// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Azure AI Search tool from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Azure AI Search tool.
 */

require("dotenv/config");
const { createAgentClient } = require("./utils/createAgentClient.js");
const { createAgent } = require("./utils/createAgent.js");
const { createThreadWithMessage } = require("./utils/createThread.js");
const { createAndPollThreadRun } = require("./utils/createAndPollThreadRun.js");
const { deleteAgent } = require("./utils/deleteAgent.js");
const { listThreadMessages } = require("./utils/listThreadMessages.js");

async function main() {
  // Create an Azure AI Client
  const client = createAgentClient();

  // Create agent with the Azure AI search tool
  const agent = await createAgent(client, ["azure-ai-search"]);

  const { thread } = await createThreadWithMessage(client, "TrekMaster Camping Chair price?");

  // Create and poll a run
  await createAndPollThreadRun(client, agent.id, thread.id, true);

  // Delete the assistant when done
  await deleteAgent(client, agent.id);

  // Fetch and log all messages
  await listThreadMessages(client, thread.id);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
