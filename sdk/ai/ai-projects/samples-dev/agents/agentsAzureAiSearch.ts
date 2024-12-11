// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Azure AI Search tool from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Azure AI Search tool.
 *
 */

import { AIProjectsClient, MessageContentOutput, isOutputOfType, MessageTextContentOutput, ToolUtility } from "@azure/ai-projects"
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
  // Create an Azure AI Client from a connection string, copied from your AI Studio project.
  // At the moment, it should be in the format "<HostName>;<AzureSubscriptionId>;<ResourceGroup>;<HubName>"
  // Customer needs to login to Azure subscription via Azure CLI and set the environment variables
  const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());
  const connectionName = process.env["AZURE_AI_SEARCH_CONNECTION_NAME"] || "<connection-name>";
  const connection = await client.connections.getConnection(connectionName);

  // Initialize Azure AI Search tool
  const azureAISearchTool = ToolUtility.createAzureAISearchTool(connection.id, connection.name)

  // Create agent with the Azure AI search tool
  const agent  = await client.agents.createAgent(
    "gpt-4-0125-preview", {
      name: "my-agent", 
      instructions: "You are a helpful agent",
      tools: [azureAISearchTool.definition],
      tool_resources: azureAISearchTool.resources
    }, {
      headers: {"x-ms-enable-preview": "true"}
    });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.agents.createThread()
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.agents.createMessage(thread.id, {role: "user", content: "Hello, send an email with the datetime and weather information in New York"});
  console.log(`Created message, message ID: ${message.id}`);

  // Create and process agent run in thread with tools
  let run = await client.agents.createRun(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.agents.getRun(thread.id, run.id);
  }
  if (run.status === "failed") {
      console.log(`Run failed: ${run.last_error}`);
  }
  console.log(`Run finished with status: ${run.status}`);

  // Delete the assistant when done
  client.agents.deleteAgent(agent.id)
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Fetch and log all messages
  const messages = await client.agents.listMessages(thread.id)
  console.log(`Messages:`);
  const agentMessage: MessageContentOutput = messages.data[0].content[0];
  if (isOutputOfType<MessageTextContentOutput>(agentMessage, "text")) {
    const textContent = agentMessage as MessageTextContentOutput;
    console.log(`Text Message Content - ${textContent.text.value}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
