// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic agent operations.
 */

const { createAgentClient } = require("./utils/createAgentClient.js");
const { createSimpleAgent } = require("./utils/createAgent.js");
const { createThreadWithMessage } = require("./utils/createThread.js");
const { createAndPollThreadRun } = require("./utils/createAndPollThreadRun.js");
const { deleteAgent } = require("./utils/deleteAgent.js");
require("dotenv/config");

async function main() {
  // Create an Azure AI Client
  const client = createAgentClient();

  // Create an agent
  const agent = await createSimpleAgent(client);

  // Create a thread
  const { thread } = await createThreadWithMessage(client, "Hello, tell me a joke");

  await createAndPollThreadRun(client, agent.id, thread.id);

  // Delete agent
  await deleteAgent(client, agent.id);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
