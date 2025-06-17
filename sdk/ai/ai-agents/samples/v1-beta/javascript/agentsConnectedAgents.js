// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use Agent operations with the Connected Agent tool from the Azure Agents service.
 */

require("dotenv/config");
const { createAgentClient } = require("./utils/createAgentClient.js");
const { createThreadWithMessage } = require("./utils/createThread.js");
const { createAndPollThreadRun } = require("./utils/createAndPollThreadRun.js");
const { deleteAgent } = require("./utils/deleteAgent.js");
const { createAgent, createSimpleAgent } = require("./utils/createAgent.js");
const { listThreadMessages } = require("./utils/listThreadMessages.js");
const stockAgentName = "stock-price-agent";
const stockAgentDescription = "Gets the stock price of a company";
const stockInstructions =
  "Your job is to get the stock price of a company. If you don't know the realtime stock price, return the last known stock price.";
const assistantInstructions =
  "You are a helpful assistant, and use the connected agent to get stock prices.";
const messageContent = "Get the stock price of Microsoft.";
async function main() {
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

module.exports = { main };
