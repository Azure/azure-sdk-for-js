// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to interact with the memory store to add and retrieve memory
 * using some additional operations compared to the basic memory sample.
 *
 * It shows how to:
 * - Create a memory store with advanced options (user profile with custom details, chat summary)
 * - Search memories with context from a previous search using previousSearchId
 * - Clean up scoped memories and the memory store
 *
 * @summary Create a memory store with advanced options, chain memory updates, perform contextual
 * memory searches, and clean up resources using the Memory Store APIs in the Azure AI Projects client.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const chatModelDeployment =
  process.env["MEMORY_STORE_CHAT_MODEL_DEPLOYMENT_NAME"] || "<chat model deployment name>";
const embeddingModelDeployment =
  process.env["MEMORY_STORE_EMBEDDING_MODEL_DEPLOYMENT_NAME"] ||
  "<embedding model deployment name>";

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

  // Create a memory store with advanced options
  const memoryOptions = {
    user_profile_enabled: true,
    user_profile_details: "Preferences and interests relevant to coffee expert agent",
    chat_summary_enabled: true,
  };

  const definition = {
    kind: "default",
    chat_model: chatModelDeployment,
    embedding_model: embeddingModelDeployment,
    options: memoryOptions,
  };

  console.log("Creating memory store with advanced options...");
  const memoryStore = await project.beta.memoryStores.create(memoryStoreName, definition, {
    description: "Example memory store for conversations",
  });
  console.log(
    `Created memory store: ${memoryStore.name} (${memoryStore.id}): ${memoryStore.description ?? "no description"}`,
  );

  // Add an initial set of memories and wait for completion
  const coffeeMessage = {
    type: "message",
    role: "user",
    content: [
      {
        type: "input_text",
        text: "I prefer dark roast coffee and usually drink it in the morning",
      },
    ],
  };

  console.log("\nSubmitting first memory update...");
  const firstUpdateResult = await project.beta.memoryStores
    .updateMemories(memoryStore.name, scope, {
      items: [coffeeMessage],
      updateDelayInSecs: 0, // Trigger update immediately without waiting for inactivity
    })
    .pollUntilDone();
  console.log(
    `First update completed with ${firstUpdateResult.memory_operations.length} memory operation(s)`,
  );
  for (const operation of firstUpdateResult.memory_operations) {
    console.log(
      `  - Operation: ${operation.kind}, Memory ID: ${operation.memory_item.memory_id}, Content: ${operation.memory_item.content}`,
    );
  }

  const cappuccinoMessage = {
    type: "message",
    role: "user",
    content: [
      {
        type: "input_text",
        text: "I also like cappuccinos in the afternoon",
      },
    ],
  };

  // Submit a follow-up update.
  console.log("\nSubmitting follow-up memory update...");
  const secondUpdateResult = await project.beta.memoryStores
    .updateMemories(memoryStore.name, scope, {
      items: [cappuccinoMessage],
      updateDelayInSecs: 0,
    })
    .pollUntilDone();
  console.log(
    `Second update completed with ${secondUpdateResult.memory_operations.length} memory operation(s)`,
  );
  for (const operation of secondUpdateResult.memory_operations) {
    console.log(
      `  - Operation: ${operation.kind}, Memory ID: ${operation.memory_item.memory_id}, Content: ${operation.memory_item.content}`,
    );
  }

  // Search for stored memories
  const queryMessage = {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "What are my morning coffee preferences?" }],
  };

  console.log("\nSearching memories for morning coffee preferences...");
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

  // Perform a follow-up search using the previous search as context.
  // Passing previousSearchId lets the service use prior search results to resolve ambiguous
  // or follow-up queries.
  const agentMessage = {
    type: "message",
    role: "assistant",
    content: [
      {
        type: "output_text",
        text: "You previously indicated a preference for dark roast coffee in the morning.",
      },
    ],
  };

  const followUpMessage = {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "What about afternoon?" }],
  };

  console.log("\nSearching memories with previous search context (previousSearchId)...");
  const followUpSearchResponse = await project.beta.memoryStores.searchMemories(
    memoryStore.name,
    scope,
    {
      items: [agentMessage, followUpMessage],
      previousSearchId: searchResponse.search_id, // Provide context from the previous search
      options: { max_memories: 5 },
    },
  );
  console.log(`Found ${followUpSearchResponse.memories.length} memory item(s)`);
  for (const memory of followUpSearchResponse.memories) {
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

  console.log("\nMemory advanced sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
