// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to integrate memory stores with Prompt Agents by using the Memory Search tool.
 * It creates a memory store, configures a prompt agent to reference it through the Memory Search tool, and
 * shows how memories captured from one conversation can influence future interactions.
 *
 * @summary Create and use a Memory Store with the Memory Search tool to persist and retrieve user memories
 * across conversations using the Azure AI Projects client.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  AIProjectClient,
  MemoryStoreDefaultDefinition,
  MemoryStoreDefaultOptions,
  MemorySearchTool,
} from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentModelDeployment =
  process.env["AZURE_AI_MODEL_DEPLOYMENT_NAME"] || "<agent model deployment name>";
const chatModelDeployment =
  process.env["AZURE_AI_CHAT_MODEL_DEPLOYMENT_NAME"] || "<chat model deployment name>";
const embeddingModelDeployment =
  process.env["AZURE_AI_EMBEDDING_MODEL_DEPLOYMENT_NAME"] || "<embedding model deployment name>";

const memoryStoreName = "my_memory_store";
const memoryScope = "user_123";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  // Delete memory store if it already exists
  console.log(`Ensuring memory store '${memoryStoreName}' is reset...`);
  try {
    await project.memoryStores.delete(memoryStoreName);
    console.log(`Existing memory store '${memoryStoreName}' deleted`);
  } catch (error: any) {
    if (error?.statusCode === 404) {
      console.log("No existing memory store found, continuing...");
    } else {
      throw error;
    }
  }

  const memoryOptions: MemoryStoreDefaultOptions = {
    user_profile_enabled: true,
    chat_summary_enabled: true,
  };

  const definition: MemoryStoreDefaultDefinition = {
    kind: "default",
    chat_model: chatModelDeployment,
    embedding_model: embeddingModelDeployment,
    options: memoryOptions,
  };

  console.log("Creating memory store...");
  const memoryStore = await project.memoryStores.create(memoryStoreName, definition, {
    description: "Example memory store for conversations",
  });
  console.log(`Memory store created: ${memoryStore.name}`);

  const memoryTool: MemorySearchTool = {
    type: "memory_search",
    memory_store_name: memoryStore.name,
    scope: memoryScope,
    update_delay: 1,
  };

  console.log("Creating agent with Memory Search tool...");
  const agent = await project.agents.createVersion("agent-memory-search", {
    kind: "prompt",
    model: agentModelDeployment,
    instructions: "You are a helpful assistant that answers general questions.",
    tools: [memoryTool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  console.log("\nCreating initial conversation...");
  const conversation = await openAIClient.conversations.create();
  console.log(`Conversation created (id: ${conversation.id})`);

  console.log("\nSending first message so the agent can capture a preference...");
  const initialResponse = await openAIClient.responses.create(
    {
      conversation: conversation.id,
      input: "I prefer dark roast coffee",
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response output: ${initialResponse.output_text}`);

  console.log("\nWaiting for memories to be processed and stored (about 60 seconds)...");
  await delay(60_000);

  console.log("\nCreating a new conversation to test memory retrieval...");
  const newConversation = await openAIClient.conversations.create();
  console.log(`New conversation created (id: ${newConversation.id})`);

  console.log("\nAsking the agent to recall previously stored preference...");
  const followUpResponse = await openAIClient.responses.create(
    {
      conversation: newConversation.id,
      input: "Please order my usual coffee.",
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response output: ${followUpResponse.output_text}`);

  console.log("\nCleaning up conversations, agent, and memory store...");
  await openAIClient.conversations.delete(conversation.id);
  await openAIClient.conversations.delete(newConversation.id);
  await project.agents.deleteVersion(agent.name, agent.version);
  await project.memoryStores.delete(memoryStore.name);
  console.log("Cleanup complete");

  console.log("\nMemory Search agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
