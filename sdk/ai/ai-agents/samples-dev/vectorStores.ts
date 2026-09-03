// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store.
 *
 * @summary demonstrates how to create the vector store.
 *
 */

import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());
  // Create a vector store
  const vectorStore = await client.vectorStores.create({ name: "myVectorStore" });
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // List vector stores
  const vectorStores = client.vectorStores.list();
  console.log("List of vector stores:");
  for await (const store of vectorStores) {
    console.log(`Vector Store ID: ${store.id}, Name: ${store.name}`);
  }

  // Modify the vector store
  const updatedVectorStore = await client.vectorStores.update(vectorStore.id, {
    name: "updatedVectorStore",
  });
  console.log(`Updated vector store, vector store ID: ${updatedVectorStore.id}`);

  // Get a specific vector store
  const retrievedVectorStore = await client.vectorStores.get(vectorStore.id);
  console.log(`Retrieved vector store, vector store ID: ${retrievedVectorStore.id}`);

  // Delete the vector store
  await client.vectorStores.delete(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
