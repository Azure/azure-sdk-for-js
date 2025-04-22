// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Grounding with Bing Customer Search tool
 * from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Bing Customer Search tool.
 */

const { AIProjectsClient, ToolUtility, isOutputOfType } = require("@azure/ai-projects");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv/config");

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";
const bingCustomSearchInstanceName =
  process.env["BING_CUSTOM_SEARCH_INSTANCE_NAME"] || "<instance-name>";

async function main() {
  // Create an Azure AI Client from a connection string, copied from your AI Foundry project.
  // At the moment, it should be in the format "<HostName>;<AzureSubscriptionId>;<ResourceGroup>;<HubName>"
  // Customer needs to login to Azure subscription via Azure CLI and set the environment variables
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );
  const bingCustomSearchConnection = await client.connections.getConnection(
    process.env["BING_CUSTOM_SEARCH"] || "<connection-name>",
  );
  console.log(`Bing custom search connection ID:`, bingCustomSearchConnection.id);

  // Initialize agent bing custom search tool with the connection id
  const bingCustomSearchTool = ToolUtility.createBingCustomSearchTool([
    {
      connectionId: bingCustomSearchConnection.id,
      // please do not use bingCustomSearchConnection.name here
      instanceName: bingCustomSearchInstanceName,
    },
  ]);

  // Create agent with the bing tool and process assistant run
  const agent = await client.agents.createAgent("gpt-4o", {
    name: "my-agent",
    instructions:
      "You are a customer support chatbot. Use the tools provided and your knowledge base to best respond to customer queries",
    tools: [bingCustomSearchTool.definition],
    requestOptions: {
      headers: {
        "x-ms-enable-preview": true,
      },
    },
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.agents.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: "How does wikipedia explain Euler's Identity?",
  });
  console.log(`Created message, message ID: ${message.id}`);

  // Create and process agent run in thread with tools
  let run = await client.agents.createRun(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.agents.getRun(thread.id, run.id);
  }
  if (run.status === "failed") {
    console.log(`Run failed: ${JSON.stringify(run, null, 2)}`);
  }
  console.log(`Run finished with status: ${run.status}`);

  // Delete the assistant when done
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Fetch and log all messages
  const messages = await client.agents.listMessages(thread.id);
  console.log(`Messages:`);
  const agentMessage = messages.data[0].content[0];
  if (isOutputOfType(agentMessage, "text")) {
    const textContent = agentMessage;
    console.log(`Text Message Content - ${textContent.text.value}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
