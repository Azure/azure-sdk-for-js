// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to interact with the memory store to add and retrieve memory
 * using the AIProjectClient. It uses some additional operations compared to the basic memory sample.
 *
 * @summary Create a memory store with advanced options, update memories incrementally, search memories
 * with context, and clean up resources using the Memory Store APIs in the Azure AI Projects client.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type {
  MemoryStoreDefaultDefinition,
  MemoryStoreDefaultOptions,
  EasyInputMessage,
  MemoryStoreUpdateMemoriesPoller,
} from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const chatModelDeployment =
  process.env["MEMORY_STORE_CHAT_MODEL_DEPLOYMENT_NAME"] || "<chat model deployment name>";
const embeddingModelDeployment =
  process.env["MEMORY_STORE_EMBEDDING_MODEL_DEPLOYMENT_NAME"] ||
  "<embedding model deployment name>";

const memoryStoreName = "my_memory_store";
// You can also use {{$userId}} to take the oid of the request authentication header.
const scope = "user_123";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Delete memory store, if it already exists
  try {
    await project.memoryStores.delete(memoryStoreName, "MemoryStores=v1");
    console.log(`Memory store \`${memoryStoreName}\` deleted`);
  } catch (error: any) {
    if (error?.statusCode !== 404) {
      throw error;
    }
  }

  // Create memory store with advanced options
  const memoryOptions: MemoryStoreDefaultOptions = {
    user_profile_enabled: true,
    user_profile_details: "Preferences and interests relevant to coffee expert agent",
    chat_summary_enabled: true,
  };

  const definition: MemoryStoreDefaultDefinition = {
    kind: "default",
    chat_model: chatModelDeployment,
    embedding_model: embeddingModelDeployment,
    options: memoryOptions,
  };

  const memoryStore = await project.memoryStores.create(
    memoryStoreName,
    definition,
    "MemoryStores=v1",
    {
      description: "Example memory store for conversations",
    },
  );
  console.log(
    `Created memory store: ${memoryStore.name} (${memoryStore.id}): ${memoryStore.description ?? "no description"}`,
  );

  // Extract memories from messages and add them to the memory store
  const userMessage: EasyInputMessage = {
    type: "message",
    role: "user",
    content: [
      {
        type: "input_text",
        text: "I prefer dark roast coffee and usually drink it in the morning",
      },
    ],
  };

  const updatePoller = project.memoryStores.updateMemories(
    memoryStore.name,
    scope,
    "MemoryStores=v1",
    {
      items: [userMessage],
      updateDelay: 300, // Keep default inactivity delay before starting update
    },
  ) as MemoryStoreUpdateMemoriesPoller;
  console.log(
    `Scheduled memory update operation (Update ID: ${updatePoller.updateId}, Status: ${updatePoller.updateStatus})`,
  );

  // As first update has not started yet, the new update will cancel the first update and cover both sets of messages
  // Poll to refresh the status of the first poller
  await updatePoller.poll();
  console.log(
    `Superseded first memory update operation (Update ID: ${updatePoller.updateId}, Status: ${updatePoller.updateStatus})`,
  );

  // Extend the previous update with another update and more messages
  const newMessage: EasyInputMessage = {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "I also like cappuccinos in the afternoon" }],
  };

  const newUpdatePoller = project.memoryStores.updateMemories(
    memoryStore.name,
    scope,
    "MemoryStores=v1",
    {
      items: [newMessage],
      previousUpdateId: updatePoller.updateId, // Extend from previous update ID
      updateDelay: 0, // Trigger update immediately without waiting for inactivity
    },
  ) as MemoryStoreUpdateMemoriesPoller;
  console.log(
    `Scheduled memory update operation (Update ID: ${newUpdatePoller.updateId}, Status: ${newUpdatePoller.updateStatus})`,
  );

  const newUpdateResult = await newUpdatePoller.pollUntilDone();
  console.log(
    `Second update ${newUpdatePoller.updateId} completed with ${newUpdateResult.memory_operations.length} memory operations`,
  );

  for (const operation of newUpdateResult.memory_operations) {
    console.log(
      `  - Operation: ${operation.kind}, Memory ID: ${operation.memory_item.memory_id}, Content: ${operation.memory_item.content}`,
    );
  }

  // Retrieve memories from the memory store
  const queryMessage: EasyInputMessage = {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "What are my morning coffee preferences?" }],
  };

  const searchResponse = await project.memoryStores.searchMemories(
    memoryStore.name,
    scope,
    "MemoryStores=v1",
    {
      items: [queryMessage],
      options: { max_memories: 5 },
    },
  );
  console.log(`Found ${searchResponse.memories.length} memories`);
  for (const memory of searchResponse.memories) {
    console.log(
      `  - Memory ID: ${memory.memory_item.memory_id}, Content: ${memory.memory_item.content}`,
    );
  }

  // Perform another search using the previous search as context
  const agentMessage: EasyInputMessage = {
    type: "message",
    role: "assistant",
    content: [
      {
        type: "input_text",
        text: "You previously indicated a preference for dark roast coffee in the morning.",
      },
    ],
  };

  const followupQuery: EasyInputMessage = {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "What about afternoon?" }], // Follow-up assuming context from previous messages
  };

  const followupSearchResponse = await project.memoryStores.searchMemories(
    memoryStore.name,
    scope,
    "MemoryStores=v1",
    {
      items: [agentMessage, followupQuery],
      previousSearchId: searchResponse.search_id,
      options: { max_memories: 5 },
    },
  );
  console.log(`Found ${followupSearchResponse.memories.length} memories`);
  for (const memory of followupSearchResponse.memories) {
    console.log(
      `  - Memory ID: ${memory.memory_item.memory_id}, Content: ${memory.memory_item.content}`,
    );
  }

  // Delete memories for the current scope
  await project.memoryStores.deleteScope(memoryStore.name, scope, "MemoryStores=v1");
  console.log(`Deleted memories for scope '${scope}'`);

  // Delete memory store
  await project.memoryStores.delete(memoryStore.name, "MemoryStores=v1");
  console.log(`Deleted memory store \`${memoryStore.name}\``);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
