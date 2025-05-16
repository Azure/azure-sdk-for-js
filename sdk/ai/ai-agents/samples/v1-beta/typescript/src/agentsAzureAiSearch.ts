// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the Azure AI Search tool from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with the Azure AI Search tool.
 */

import type {
  MessageContent,
  MessageTextContent,
  RunStepToolCallDetails,
  RunStepAzureAISearchToolCall,
} from "@azure/ai-agents";
import { AgentsClient, isOutputOfType, ToolUtility } from "@azure/ai-agents";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());
  const connectionId = process.env["AZURE_AI_CONNECTION_ID"] || "<connection-name>";

  // Initialize Azure AI Search tool
  const azureAISearchTool = ToolUtility.createAzureAISearchTool(connectionId, "ai-search-sample", {
    queryType: "simple",
    topK: 3,
    filter: "",
    indexConnectionId: "",
    indexName: "",
  });

  // Create agent with the Azure AI search tool
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [azureAISearchTool.definition],
    toolResources: azureAISearchTool.resources,
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.messages.create(
    thread.id,
    "user",
    "What is the temperature rating of the cozynights sleeping bag?",
  );
  console.log(`Created message, message ID : ${message.id}`);

  // Create and process agent run in thread with tools
  let run = await client.runs.create(thread.id, agent.id);
  while (run.status === "queued" || run.status === "in_progress") {
    await delay(1000);
    run = await client.runs.get(thread.id, run.id);
  }
  if (run.status === "failed") {
    console.log(`Run failed:`, JSON.stringify(run, null, 2));
  }
  console.log(`Run finished with status: ${run.status}`);

  // Fetch run steps to get the details of agent run
  const runSteps = await client.runSteps.list(thread.id, run.id);

  for await (const step of runSteps) {
    console.log(`Step ID: ${step.id}, Status: ${step.status}`);
    const stepDetails = step.stepDetails;
    if (isOutputOfType<RunStepToolCallDetails>(stepDetails, "tool_calls")) {
      const toolCalls = stepDetails.toolCalls;
      for (const toolCall of toolCalls) {
        console.log(`Tool Call ID: ${toolCall.id}, Tool type: ${toolCall.type}`);
        if (isOutputOfType<RunStepAzureAISearchToolCall>(toolCall, "azure_ai_search")) {
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
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // Fetch and log all messages
  const messagesIterator = client.messages.list(thread.id);
  console.log(`Messages:`);

  // Get the first message
  for await (const m of messagesIterator) {
    if (m.content.length > 0) {
      const agentMessage: MessageContent = m.content[0];
      if (isOutputOfType<MessageTextContent>(agentMessage, "text")) {
        const textContent = agentMessage as MessageTextContent;
        console.log(`Text Message Content - ${textContent.text.value}`);
      }
    }
    break; // Just process the first message
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
