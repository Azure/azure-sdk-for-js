// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * 
 * FILE: sample_agents_bing_grounding.ts
 *
 * DESCRIPTION:
 *  This sample demonstrates how to use agent operations with the Grounding with Bing Search tool from
 *  the Azure Agents service using a asynchronous (do we need/have synchronous??) client.
 *
 * USAGE:
 *  TODO (python: sample_agents_bing_grounding.py)
 *
 *  Before running the sample:
 *
 *  TODO (python: pip install azure.ai.projects azure-identity)
 *
 *  Set this environment variables with your own values:
 *  PROJECT_CONNECTION_STRING - the Azure AI Project connection string, as found in your AI Studio Project.
 *  BING_CONNECTION_NAME - the name of the connection of Grounding with Bing Search
 */

import { AIProjectsClient, BingGroundingToolDefinition } from "@azure/ai-projects"
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
  const bingConnection = await client.connections.getConnection(process.env["BING_CONNECTION_NAME"] || "<connection-name>");
  const connectionId = bingConnection.id;

  // Initialize agent bing tool and add the connection id
  // const bing = BingGroundingTool(connection_id=conn_id)

  // Create agent with the bing tool and process assistant run
  const agent  = await client.agents.createAgent(
    "gpt-4-0125-preview", {
      name: "my-agent", 
      instructions: "You are a helpful agent",
      tools: [{type: "bing_grounding", bing_grounding: {connections: [{connection_id: connectionId}]}} as BingGroundingToolDefinition],
      // headers: {"x-ms-enable-preview": "true"} // TODO: Request options for agents CRUD ops?
    });
  console.log(connectionId)
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.agents.createThread()
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.agents.createMessage(thread.id, {role: "user", content: "How does wikipedia explain Euler's Identity?"});
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
  console.log(`Deleted agent`);

  // Fetch and log all messages
  const messages = await client.agents.listMessages(thread.id)
  console.log(`Messages: ${messages.data.forEach((m) => console.log(m.content))}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
