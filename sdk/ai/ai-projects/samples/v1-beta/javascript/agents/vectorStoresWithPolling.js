// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store using polling operation.
 *
 * @summary demonstrates how to create the vector store using polling operation.
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Set up abort controller (optional)
  // Polling can then be stopped using abortController.abort()
  const abortController = new AbortController();

  // Create a vector store
  const vectorStoreOptions = {
    name: "myVectorStore",
    pollingOptions: { sleepIntervalInMs: 2000, abortSignal: abortController.signal },
  };
  const poller = client.agents.createVectorStoreAndPoll(vectorStoreOptions);
  const vectorStore = await poller.pollUntilDone();
  console.log(
    `Created vector store with status ${vectorStore.status}, vector store ID: ${vectorStore.id}`,
  );

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
