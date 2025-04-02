// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Azure AI Search tool from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Azure AI Search tool.
 */

import type {
  MessageContentOutput,
  MessageTextContentOutput,
  RunStepToolCallDetailsOutput,
  RunStepAzureAISearchToolCallOutput,
} from "@azure/ai-projects";
import {
  AIProjectsClient,
  isOutputOfType,
  ToolUtility,
  AzureAISearchQueryTypeEnum,
} from "@azure/ai-projects";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

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

  // Initialize Azure AI Search tool
  const azureAISearchTool = ToolUtility.createAzureAISearchTool(
    connection.id,
    "ai-search-sample",
    {
      queryType: AzureAISearchQueryTypeEnum.Simple,
      topK: 3,
      filter: "",
    },
  );

  // Create agent with the Azure AI search tool
  const agent = await client.agents.createAgent("gpt-4o", {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [azureAISearchTool.definition],
    toolResources: azureAISearchTool.resources,
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.agents.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: "What is the temperature rating of the cozynights sleeping bag?",
  });
  console.log(`Created message, message ID: ${message.id}`);

  // Create and process agent run in thread with tools
  let run = await client.agents.createRun(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.agents.getRun(thread.id, run.id);
  }
  if (run.status === "failed") {
    console.log(`Run failed:`, JSON.stringify(run, null, 2));
  }
  console.log(`Run finished with status: ${run.status}`);

  // Fetch run steps to get the details of agent run
  const { data: runSteps } = await client.agents.listRunSteps(thread.id, run.id);

  for (const step of runSteps) {
    console.log(`Step ID: ${step.id}, Status: ${step.status}`);
    const stepDetails = step.stepDetails;
    if (isOutputOfType<RunStepToolCallDetailsOutput>(stepDetails, "tool_calls")) {
      const toolCalls = stepDetails.toolCalls;
      for (const toolCall of toolCalls) {
        console.log(`Tool Call ID: ${toolCall.id}, Tool type: ${toolCall.type}`);
        if (isOutputOfType<RunStepAzureAISearchToolCallOutput>(toolCall, "azure_ai_search")) {
          {
            const azureAISearch = toolCall.azureAISearch;
            if (azureAISearch) {
              console.log(`Azure AI Search Tool Call input: ${azureAISearch.input}`);
              console.log(`Azure AI Search Tool Call output: ${azureAISearch.output}`);
            }
          }
        }
      }
    }
  }
  // Delete the assistant when done
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Fetch and log all messages
  const messages = await client.agents.listMessages(thread.id);
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
