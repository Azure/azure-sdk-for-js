// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use Agent operations with the Connected Agent tool from the Azure Agents service.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
const { ToolUtility } = require("@azure/ai-agents");

require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  const connectedAgentName = "stock_price_bot";

  const stockAgent = await client.createAgent(modelDeploymentName, {
    name: "stock-price-agent",
    instructions:
      "Your job is to get the stock price of a company. If you don't know the realtime stock price, return the last known stock price.",
  });

  // Initialize Connected Agent tool with the agent id, name, and description
  const connectedAgentTool = ToolUtility.createConnectedAgentTool(
    stockAgent.id,
    connectedAgentName,
    "Gets the stock price of a company",
  );

  // Create agent with the Connected Agent tool and process assistant run
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful assistant, and use the connected agent to get stock prices.",
    tools: [connectedAgentTool.definition],
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create a thread
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID : ${thread.id}`);

  // Create message to thread
  const message = await client.messages.create(
    thread.id,
    "user",
    "What is the stock price of Microsoft?",
  );
  console.log(`Created message, message ID : ${message.id}`);

  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
  });
  console.log(`Run finished with status: ${run.status}`);

  // Delete the agent
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Delete connected agent
  await client.deleteAgent(stockAgent.id);
  console.log(`Deleted connected agent, agent ID: ${stockAgent.id}`);
}

main().catch((error) => {
  console.error("An error occurred:", error);
});

module.exports = { main };
