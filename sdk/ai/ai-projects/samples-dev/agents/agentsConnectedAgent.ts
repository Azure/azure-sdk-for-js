// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use Agent operations with the Connected Agent tool from the Azure Agents service.
 *
 */

import { AIProjectsClient, ToolUtility } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";


// Load environment variables
const connectionString = process.env.AZURE_AI_PROJECTS_CONNECTION_STRING || "<connection-string>";
const modelDeployment = process.env.MODEL_DEPLOYMENT_NAME || "<model-deployment-name>";

export async function main(): Promise<void> {
  // Create the client
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  const connectedAgentName = "stock-price-bot";

  const stockAgent = await client.agents.createAgent(modelDeployment, {
    name: "stock-price-agent",
    instructions: "Your job is to get the stock price of a company. If you don't know the realtime stock price, return the last known stock price.",
  });

  // Initialize Connected Agent tool with the agent id, name, and description
  const connectedAgentTool = ToolUtility.createConnectedAgentTool(stockAgent.id, connectedAgentName, "Gets the stock price of a company");

  // Create agent with the Connected Agent tool and process assistant run
  const agent = await client.agents.createAgent(modelDeployment, {
    name: "my-agent",
    instructions: "You are a helpful assistant, and use the connected agent to get stock prices.",
    tools: [connectedAgentTool.definition],
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create a thread
  const thread = await client.agents.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: "What is the stock price of Microsoft?",
  });
  console.log(`Created message, message ID: ${message.id}`);

   // Create and poll a run
  console.log("Creating run...");
  let run = await client.agents.createRun(thread.id, agent.id);

  // Poll the run as long as run status is queued or in progress
  while (
    run.status === "queued" ||
    run.status === "in_progress" ||
    run.status === "requires_action"
  ) {
    // Wait for a second
    console.log(`Run status: ${run.status}, waiting...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.agents.getRun(thread.id, run.id);
  }
  console.log(`Run complete with status: ${run.status}`);

  // Delete the agent
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Delete connected agent
  await client.agents.deleteAgent(stockAgent.id);
  console.log(`Deleted connected agent, agent ID: ${stockAgent.id}`);
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
