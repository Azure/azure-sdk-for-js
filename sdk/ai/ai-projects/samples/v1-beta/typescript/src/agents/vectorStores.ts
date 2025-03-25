// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store.
 *
 * @summary demonstrates how to create the vector store.
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import  "dotenv/config";

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create a vector store
  const vectorStore = await client.agents.createVectorStore({ name: "myVectorStore" });
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // List vector stores
  const vectorStores = await client.agents.listVectorStores();
  console.log("List of vector stores:", vectorStores);

  // Modify the vector store
  const updatedVectorStore = await client.agents.modifyVectorStore(vectorStore.id, {
    name: "updatedVectorStore",
  });
  console.log(`Updated vector store, vector store ID: ${updatedVectorStore.id}`);

  // Get a specific vector store
  const retrievedVectorStore = await client.agents.getVectorStore(vectorStore.id);
  console.log(`Retrieved vector store, vector store ID: ${retrievedVectorStore.id}`);

  // Delete the vector store
  await client.agents.deleteVectorStore(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
