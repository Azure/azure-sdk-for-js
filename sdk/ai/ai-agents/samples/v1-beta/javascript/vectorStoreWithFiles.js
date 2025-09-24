// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store with the list of files.
 *
 * @summary demonstrates how to create the vector store with the list of files.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
const { Readable } = require("stream");
require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create vector store
  const vectorStore = await client.vectorStores.create();
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // Create and upload file
  const fileContent = "Hello, Vector Store!";
  const readable = new Readable();
  readable.push(fileContent);
  readable.push(null); // end the stream
  const file = await client.files.upload(readable, "assistants", {
    fileName: "vectorFile.txt",
  });
  console.log(`Uploaded file, file ID: ${file.id}`);

  // Create vector store file
  const vectorStoreFile = await client.vectorStoreFiles.create(vectorStore.id, {
    fileId: file.id,
  });
  console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

  // Retrieve vector store file
  const _vectorStoreFile = await client.vectorStoreFiles.get(vectorStore.id, vectorStoreFile.id);
  console.log(`Retrieved vector store file, vector store file ID: ${_vectorStoreFile.id}`);

  // List vector store files
  const vectorStoreFiles = client.vectorStoreFiles.list(vectorStore.id);
  for await (const f of vectorStoreFiles) {
    console.log(`Vector Store File ID: ${f.id}`);
  }

  // Delete vector store file
  await client.vectorStoreFiles.delete(vectorStore.id, vectorStoreFile.id);
  console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);

  // Delete file
  await client.files.delete(file.id);
  console.log(`Deleted file, file ID: ${file.id}`);

  // Delete vector store
  await client.vectorStores.delete(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
