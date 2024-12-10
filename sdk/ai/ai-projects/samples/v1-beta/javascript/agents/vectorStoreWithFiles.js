// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store with the list of files.
 *
 * @summary demonstrates how to create the vector store with the list of files.
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
const { Readable } = require("stream");
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] ||
  "<endpoint>>;<subscription>;<resource group>;<project>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create vector store
  const vectorStore = await client.agents.createVectorStore();
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // Create and upload file
  const fileContent = "Hello, Vector Store!";
  const readable = new Readable();
  readable.push(fileContent);
  readable.push(null); // end the stream
  const file = await client.agents.uploadFile(readable, "assistants", "vectorFile.txt");
  console.log(`Uploaded file, file ID: ${file.id}`);

  // Create vector store file
  const vectorStoreFile = await client.agents.createVectorStoreFile(vectorStore.id, {
    fileId: file.id,
  });
  console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

  // Retrieve vector store file
  const _vectorStoreFile = await client.agents.getVectorStoreFile(
    vectorStore.id,
    vectorStoreFile.id,
  );
  console.log(`Retrieved vector store file, vector store file ID: ${_vectorStoreFile.id}`);

  // List vector store files
  const vectorStoreFiles = await client.agents.listVectorStoreFiles(vectorStore.id);
  console.log(`List of vector store files: ${vectorStoreFiles.data.map((f) => f.id).join(", ")}`);

  // Delete vector store file
  await client.agents.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
  console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);

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
