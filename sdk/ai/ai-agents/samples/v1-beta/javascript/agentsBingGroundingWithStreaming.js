// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Grounding with Bing Search tool
 * from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Grounding with Bing Search tool using streaming.
 */

require("dotenv/config");
const { createAgentClient } = require("./utils/createAgentClient.js");
const { createAgent } = require("./utils/createAgent.js");
const { createThreadWithMessage } = require("./utils/createThread.js");
const { createThreadRunStream } = require("./utils/createThreadRunStream.js");
const { deleteAgent } = require("./utils/deleteAgent.js");
const { listThreadMessages } = require("./utils/listThreadMessages.js");

async function main() {
  // Create an Azure AI Client
  const client = createAgentClient();

  // Create agent with the bing tool and process assistant run
  const agent = await createAgent(client, ["bing-grounding"]);

  // Create thread for communication
  const { thread } = await createThreadWithMessage(
    client,
    "How does wikipedia explain Euler's Identity?",
  );

  // Create and process agent run with streaming in thread with tools
  await createThreadRunStream(client, agent.id, thread.id);

  // Delete the assistant when done
  await deleteAgent(client, agent.id);

  // Fetch and log all messages
  await listThreadMessages(client, thread.id);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
