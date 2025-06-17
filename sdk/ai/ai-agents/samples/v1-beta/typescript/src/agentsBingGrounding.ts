// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Grounding with Bing Search tool
 * from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Grounding with Bing Search tool.
 */

import { createAgentClient } from "./utils/createAgentClient.js";
import { createAgent } from "./utils/createAgent.js";
import { createThreadWithMessage } from "./utils/createThread.js";
import { createAndPollThreadRun } from "./utils/createAndPollThreadRun.js";
import { deleteAgent } from "./utils/deleteAgent.js";
import { listThreadMessages } from "./utils/listThreadMessages.js";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = createAgentClient();

  // Create agent with the bing tool and process assistant run
  const agent = await createAgent(client, ["bing-grounding"]);

  // Create thread for communication
  const { thread } = await createThreadWithMessage(
    client,
    "How does wikipedia explain Euler's Identity?",
  );

  // Create and poll a run
  console.log("Creating run...");
  await createAndPollThreadRun(client, agent.id, thread.id);

  // Delete the assistant when done
  await deleteAgent(client, agent.id);

  // Fetch and log all messages
  await listThreadMessages(client, thread.id);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
