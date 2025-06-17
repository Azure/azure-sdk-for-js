// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Azure AI Search tool from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Azure AI Search tool.
 *
 */

import "dotenv/config";
import { createAgentClient } from "./utils/createAgentClient.js";
import { createAgent } from "./utils/createAgent.js";
import { createThreadWithMessage } from "./utils/createThread.js";
import { createAndPollThreadRun } from "./utils/createAndPollThreadRun.js";
import { deleteAgent } from "./utils/deleteAgent.js";
import { listThreadMessages } from "./utils/listThreadMessages.js";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = createAgentClient();

  // Create agent with the Azure AI search tool
  const agent = await createAgent(client, ["azure-ai-search"]);

  const { thread } = await createThreadWithMessage(client, "TrekMaster Camping Chair price?");

  // Create and poll a run
  await createAndPollThreadRun(
    client,
    agent.id,
    thread.id,
    true, // Use the Azure AI Search tool
  );

  // Delete the assistant when done
  await deleteAgent(client, agent.id);

  // Fetch and log all messages
  await listThreadMessages(client, thread.id);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
