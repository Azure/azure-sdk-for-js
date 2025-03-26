// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store with the list of files using polling operation.
 *
 * @summary demonstrates how to create the vector store with the list of files using polling operation.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

async function main() {
  const client = AIProjectClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create vector store
  const vectorStore = await client.agents.createVectorStore();
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // Create and upload file
  const fileContent = "Hello, Vector Store!";
  const fileBuffer = Buffer.from(fileContent);
  const file = await client.agents.uploadFile(fileBuffer, "assistants", {
    filename: "vectorFile.txt",
  });
  console.log(`Uploaded file, file ID: ${file.id}`);

  // Set up abort controller (optional)
  // Polling can then be stopped using abortController.abort()
  const abortController = new AbortController();

  // Create vector store file
  const vectorStoreFileOptions = {
    fileId: file.id,
    pollingOptions: { sleepIntervalInMs: 2000, abortSignal: abortController.signal },
  };
  const poller = client.agents.createVectorStoreFileAndPoll(vectorStore.id, vectorStoreFileOptions);
  const vectorStoreFile = await poller.pollUntilDone();
  console.log(
    `Created vector store file with status ${vectorStoreFile.status}, vector store file ID: ${vectorStoreFile.id}`,
  );

  // Delete file
  await client.agents.deleteFile(file.id);
  console.log(`Deleted file, file ID: ${file.id}`);

  // Delete vector store
  await client.agents.deleteVectorStore(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
