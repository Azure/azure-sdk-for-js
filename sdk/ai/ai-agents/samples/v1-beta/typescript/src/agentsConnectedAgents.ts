// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use Agent operations with the Connected Agent tool from the Azure Agents service.
 */

import "dotenv/config";
import { createAgentClient } from "./utils/createAgentClient.js";
import { createThreadWithMessage } from "./utils/createThread.js";
import { createAndPollThreadRun } from "./utils/createAndPollThreadRun.js";
import { deleteAgent } from "./utils/deleteAgent.js";
import { createAgent, createSimpleAgent } from "./utils/createAgent.js";
import { listThreadMessages } from "./utils/listThreadMessages.js";
const stockAgentName = "stock-price-agent";
const stockAgentDescription = "Gets the stock price of a company";
const stockInstructions =
  "Your job is to get the stock price of a company. If you don't know the realtime stock price, return the last known stock price.";
const assistantInstructions =
  "You are a helpful assistant, and use the connected agent to get stock prices.";
const messageContent = "Get the stock price of Microsoft.";
export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = createAgentClient();

  const connectedAgentName = "stock_price_bot";

  const stockAgent = await createSimpleAgent(client, stockAgentName, stockInstructions);

  // Create agent with the Connected Agent tool and process assistant run
  const agent = await createAgent(
    client,
    [
      {
        "connected-agent": {
          id: stockAgent.id,
          name: connectedAgentName,
          description: stockAgentDescription,
        },
      },
    ],
    undefined,
    assistantInstructions,
  );

  // Create a thread
  const { thread } = await createThreadWithMessage(client, messageContent);

  // Create and poll a run
  await createAndPollThreadRun(client, agent.id, thread.id);

  // list all messages in the thread
  await listThreadMessages(client, thread.id);

  // Delete the agents
  await deleteAgent(client, [agent.id, stockAgent.id]);
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
