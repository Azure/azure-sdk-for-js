// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to interact with the memory store to add and retrieve memory entries.
 *
 * @summary Create a memory store, add user memories, search for stored memories, and clean up resources
 * using the Memory Store APIs in the Azure AI Projects client.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const chatModelDeployment =
  process.env["AZURE_AI_CHAT_MODEL_DEPLOYMENT_NAME"] || "<chat model deployment name>";
const embeddingModelDeployment =
  process.env["AZURE_AI_EMBEDDING_MODEL_DEPLOYMENT_NAME"] || "<embedding model deployment name>";

const memoryStoreName = "my_memory_store";
const scope = "user_123"; // You can also use {{$userId}} to scope memories per authenticated user

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Delete the memory store if it already exists
  console.log(`Ensuring memory store '${memoryStoreName}' does not already exist...`);
  try {
    await project.beta.memoryStores.delete(memoryStoreName);
    console.log(`Memory store '${memoryStoreName}' deleted`);
  } catch (error) {
    if (error?.statusCode === 404) {
      console.log("No existing memory store found, continuing...");
    } else {
      throw error;
    }
  }

  // Create a new memory store definition
  const memoryOptions = {
    user_profile_enabled: true,
    chat_summary_enabled: true,
  };

  const definition = {
    kind: "default",
    chat_model: chatModelDeployment,
    embedding_model: embeddingModelDeployment,
    options: memoryOptions,
  };

  console.log("Creating memory store...");
  const memoryStore = await project.beta.memoryStores.create(memoryStoreName, definition, {
    description: "Example memory store for conversations",
  });
  console.log(
    `Created memory store: ${memoryStore.name} (${memoryStore.id}): ${memoryStore.description ?? "no description"}`,
  );

  const memoryDefinition = memoryStore.definition;
  if ("chat_model" in memoryDefinition && "embedding_model" in memoryDefinition) {
    console.log(`  - Chat model: ${memoryDefinition.chat_model}`);
    console.log(`  - Embedding model: ${memoryDefinition.embedding_model}`);
  }

  // Add memories to the store via an update operation
  const userMessage = {
    type: "message",
    role: "user",
    content: [
      {
        type: "input_text",
        text: "I prefer dark roast coffee and usually drink it in the morning",
      },
    ],
  };

  console.log("\nSubmitting memory update request...");
  const updatePoller = project.beta.memoryStores.updateMemories(memoryStore.name, scope, {
    items: [userMessage],
    updateDelayInSecs: 0, // Trigger update immediately without waiting for inactivity
  });

  const updateResult = await updatePoller.pollUntilDone();
  console.log(`Updated with ${updateResult.memory_operations.length} memory operation(s)`);
  for (const operation of updateResult.memory_operations) {
    console.log(
      `  - Operation: ${operation.kind}, Memory ID: ${operation.memory_item.memory_id}, Content: ${operation.memory_item.content}`,
    );
  }

  // Search for stored memories
  const queryMessage = {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "What are my coffee preferences?" }],
  };

  console.log("\nSearching memories for stored preferences...");
  const searchResponse = await project.beta.memoryStores.searchMemories(memoryStore.name, scope, {
    items: [queryMessage],
    options: { max_memories: 5 },
  });

  console.log(`Found ${searchResponse.memories.length} memory item(s)`);
  for (const memory of searchResponse.memories) {
    console.log(
      `  - Memory ID: ${memory.memory_item.memory_id}, Content: ${memory.memory_item.content}`,
    );
  }

  // Delete memories for the specific scope
  console.log("\nDeleting memories for scope...");
  await project.beta.memoryStores.deleteScope(memoryStore.name, scope);
  console.log(`Deleted memories for scope '${scope}'`);

  // Delete the memory store itself
  console.log("Deleting memory store...");
  await project.beta.memoryStores.delete(memoryStore.name);
  console.log(`Deleted memory store '${memoryStore.name}'`);

  console.log("\nMemory basics sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
