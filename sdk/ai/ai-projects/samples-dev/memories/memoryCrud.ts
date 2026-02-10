// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to perform CRUD operations on a memory store
 * using the AIProjectClient.
 *
 * @summary Create, get, update, list, and delete a memory store using the Memory Store APIs
 * in the Azure AI Projects client.
 *
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type { MemoryStoreDefaultDefinition } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const chatModelDeployment =
  process.env["MEMORY_STORE_CHAT_MODEL_DEPLOYMENT_NAME"] || "<chat model deployment name>";
const embeddingModelDeployment =
  process.env["MEMORY_STORE_EMBEDDING_MODEL_DEPLOYMENT_NAME"] ||
  "<embedding model deployment name>";

const memoryStoreName = "my_memory_store";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Delete memory store, if it already exists
  try {
    await project.beta.memoryStores.delete(memoryStoreName);
    console.log(`Memory store \`${memoryStoreName}\` deleted`);
  } catch (error: any) {
    console.log(JSON.stringify(error, null, 2));
    if (error?.statusCode !== 404) {
      throw error;
    }
  }

  // Create Memory Store
  const definition: MemoryStoreDefaultDefinition = {
    kind: "default",
    chat_model: chatModelDeployment,
    embedding_model: embeddingModelDeployment,
  };
  const memoryStore = await project.beta.memoryStores.create(memoryStoreName, definition, {
    description: "Example memory store for conversations",
  });
  console.log(
    `Created memory store: ${memoryStore.name} (${memoryStore.id}): ${memoryStore.description}`,
  );

  // Get Memory Store
  const getStore = await project.beta.memoryStores.get(memoryStore.name);
  console.log(`Retrieved: ${getStore.name} (${getStore.id}): ${getStore.description}`);

  // Update Memory Store
  const updatedStore = await project.beta.memoryStores.update(memoryStore.name, {
    description: "Updated description",
  });
  console.log(`Updated: ${updatedStore.name} (${updatedStore.id}): ${updatedStore.description}`);

  // List Memory Stores
  const memoryStores: (typeof memoryStore)[] = [];
  for await (const store of project.beta.memoryStores.list({
    limit: 10,
  })) {
    memoryStores.push(store);
  }
  console.log(`Found ${memoryStores.length} memory stores`);
  for (const store of memoryStores) {
    console.log(`  - ${store.name} (${store.id}): ${store.description}`);
  }

  // Delete Memory Store
  const deleteResponse = await project.beta.memoryStores.delete(memoryStore.name);
  console.log(`Deleted: ${deleteResponse.deleted}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
