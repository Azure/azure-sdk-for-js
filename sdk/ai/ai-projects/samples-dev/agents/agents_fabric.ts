// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * 
 * FILE: agents_fabric.ts
 *
 * DESCRIPTION:
 *  This sample demonstrates how to use agent operations with the Microsoft Fabric tool from
 *  the Azure Agents service using a asynchronous client.
 *
 * USAGE:
 *  npx ts-node agents_fabric.ts
 *
 *  Before running the sample:
 *
 *  npm install @azure/ai-projects @azure/identity @azure/core-util dotenv
 *
 *  Set this environment variables with your own values:
 *  AZURE_AI_PROJECTS_CONNECTION_STRING - the Azure AI Project connection string, as found in your AI Studio Project
 *  FABRIC_CONNECTION_NAME
 */

import { AIProjectsClient, fromConnectionId, connectionToolType, MessageContentOutput, isOutputOfType, MessageTextContentOutput } from "@azure/ai-projects";
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
  const fabricConnection = await client.connections.getConnection(process.env["FABRIC_CONNECTION_NAME"] || "<connection-name>");
  const connectionId = fabricConnection.id;

  // Initialize agent Microsoft Fabric tool with the connection id
  const fabricTool = fromConnectionId(connectionToolType.MicrosoftFabric, [connectionId]);

  // Create agent with the Microsoft Fabric tool and process assistant run
  const agent  = await client.agents.createAgent(
    "gpt-4-0125-preview", {
      name: "my-agent", 
      instructions: "You are a helpful agent",
      tools: [fabricTool]
    }, {
      headers: {"x-ms-enable-preview": "true"}
    });
  console.log(connectionId)
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.agents.createThread()
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.agents.createMessage(thread.id, {role: "user", content: "What inventory is currently available?"});
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
