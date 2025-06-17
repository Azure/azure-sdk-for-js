// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic agent operations.
 *
 */

import { createAgentClient } from "./utils/createAgentClient.js";
import { createSimpleAgent } from "./utils/createAgent.js";
import { createThreadWithMessage } from "./utils/createThread.js";
import { createAndPollThreadRun } from "./utils/createAndPollThreadRun.js";
import { deleteAgent } from "./utils/deleteAgent.js";
import "dotenv/config";

export async function main(): Promise<void> {
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
