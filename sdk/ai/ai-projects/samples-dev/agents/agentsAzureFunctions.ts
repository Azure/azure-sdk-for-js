
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Azure AI Search tool from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Azure AI Search tool.
 *
 */

import { AIProjectsClient, ToolUtility} from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  // Create an Azure AI Client from a connection string, copied from your AI Foundry project.
  // At the moment, it should be in the format "<HostName>;<AzureSubscriptionId>;<ResourceGroup>;<HubName>"
  // Customer needs to login to Azure subscription via Azure CLI and set the environment variables
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );
  const connectionName = process.env["AZURE_AI_SEARCH_CONNECTION_NAME"] || "<connection-name>";
  const connection = await client.connections.getConnection(connectionName);

const storageServiceEndpoint = process.env["STORAGE_SERVICE_ENDPOINT"] || "<storage-service-endpoint>";

// [START create_agent_with_azure_function_tool]
const azureFunctionTool1 = ToolUtility.createAzureFunctionTool({connectionId: connection.id, functionName: "foo" });
const azureFunctionTool = {
  name: "foo",
  description: "Get answers from the foo bot.",
  parameters: {
    type: "object",
    properties: {
      query: { type: "string", description: "The question to ask." },
      outputqueueuri: { type: "string", description: "The full output queue uri." },
    },
  },
  inputQueue: {
    queueName: "azure-function-foo-input",
    storageServiceEndpoint: storageServiceEndpoint,
  },
  outputQueue: {
    queueName: "azure-function-tool-output",
    storageServiceEndpoint: storageServiceEndpoint,
  },
};

const agent = await client.agents.createAgent({
  model: process.env["MODEL_DEPLOYMENT_NAME"] || "<model-deployment-name>",
  name: "azure-function-agent-foo",
  instructions: `You are a helpful support agent. Use the provided function any time the prompt contains the string 'What would foo say?'. When you invoke the function, ALWAYS specify the output queue uri parameter as '${storageServiceEndpoint}/azure-function-tool-output'. Always responds with "Foo says" and then the response from the tool.`,
  tools: [azureFunctionTool],
});
console.log(`Created agent, agent ID: ${agent.id}`);
// [END create_agent_with_azure_function_tool]

// Create a thread
const thread = await client.agents.createThread();
console.log(`Created thread, thread ID: ${thread.id}`);

// Create a message
const message = await client.agents.createMessage({
  threadId: thread.id,
  role: "user",
  content: "What is the most prevalent element in the universe? What would foo say?",
});
console.log(`Created message, message ID: ${message.id}`);

const run = await client.agents.createAndProcessRun({
  threadId: thread.id,
  assistantId: agent.id,
});
if (run.status === "failed") {
  console.log(`Run failed: ${run.lastError}`);
}

// Get messages from the thread
const messages = await client.agents.listMessages({ threadId: thread.id });
console.log(`Messages: ${messages}`);

// Get the last message from the sender
const lastMsg = messages.find((msg) => msg.role === "assistant");
if (lastMsg) {
  console.log(`Last Message: ${lastMsg.content}`);
}

// Delete the agent once done
const result = await client.agents.deleteAgent(agent.id);
if (result.deleted) {
  console.log(`Deleted agent ${result.id}`);
} else {
  console.log(`Failed to delete agent ${result.id}`);
}

}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
