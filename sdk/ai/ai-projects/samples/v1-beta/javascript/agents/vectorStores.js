// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * FILE: vectorStores.ts
 *
 * @summary This sample demonstrates how to create the vector store.
 *
 * USAGE:
 *  npm node vectorStores.ts
 *
 *  Before running the sample:
 *
 *  npm install @azure/ai-projects @azure/identity dotenv
 *
 *  Set this environment variables with your own values:
 *  AZURE_AI_PROJECTS_CONNECTION_STRING - the Azure AI Project connection string, as found in your AI Studio Project
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] ||
  "<endpoint>;<subscription>;<resource group>;<project>";

async function main() {
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

module.exports = { main };
