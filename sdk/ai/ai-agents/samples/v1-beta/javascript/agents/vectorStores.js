// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store.
 *
 * @summary demonstrates how to create the vector store.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const connectionString = process.env["PROJECT_ENDPOINT"] || "<project connection string>";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());
  // Create a vector store
  const vectorStore = await client.createVectorStore({ name: "myVectorStore" });
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // List vector stores
  const vectorStores = await client.listVectorStores();
  console.log("List of vector stores:", vectorStores);

  // Modify the vector store
  const updatedVectorStore = await client.modifyVectorStore(vectorStore.id, {
    name: "updatedVectorStore",
  });
  console.log(`Updated vector store, vector store ID: ${updatedVectorStore.id}`);

  // Get a specific vector store
  const retrievedVectorStore = await client.getVectorStore(vectorStore.id);
  console.log(`Retrieved vector store, vector store ID: ${retrievedVectorStore.id}`);

  // Delete the vector store
  await client.deleteVectorStore(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
