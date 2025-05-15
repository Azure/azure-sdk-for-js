// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the batch vector store with the list of files.
 *
 * @summary demonstrates how to create the batch vector store with the list of files.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
const { Readable } = require("stream");
require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project connection string>";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create vector store
  const vectorStore = await client.vectorStores.create();
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // Create and upload first file
  const file1Content = "Hello, Vector Store!";
  const readable1 = new Readable();
  await readable1.push(file1Content);
  await readable1.push(null); // end the stream
  const file1 = await client.files.upload(readable1, "assistants", {
    fileName: "vectorFile1.txt",
  });
  console.log(`Uploaded file1, file ID: ${file1.id}`);

  // Create and upload second file
  const file2Content = "This is another file for the Vector Store!";
  const readable2 = new Readable();
  await readable2.push(file2Content);
  await readable2.push(null); // end the stream
  const file2 = await client.files.upload(readable2, "assistants", {
    fileName: "vectorFile2.txt",
  });
  console.log(`Uploaded file2, file ID: ${file2.id}`);

  // Create vector store file batch
  const vectorStoreFileBatch = await client.vectorStoreFileBatches.createAndPoll(vectorStore.id, {
    fileIds: [file1.id, file2.id],
  });
  console.log(
    `Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`,
  );

  // Retrieve vector store file batch
  const _vectorStoreFileBatch = await client.vectorStoreFileBatches.get(
    vectorStore.id,
    vectorStoreFileBatch.id,
  );
  console.log(
    `Retrieved vector store file batch, vector store file batch ID: ${_vectorStoreFileBatch.id}`,
  );
  const vectorStoreFilesIterator = client.vectorStoreFileBatches.list(
    vectorStore.id,
    vectorStoreFileBatch.id,
  );

  // Iterate through all files in the batch
  console.log("List of vector store files in the batch:");
  for await (const file of vectorStoreFilesIterator) {
    console.log(`- File ID: ${file.id}`);
  }

  // Delete files
  await client.files.delete(file1.id);
  console.log(`Deleted file1, file ID: ${file1.id}`);
  await client.files.delete(file2.id);
  console.log(`Deleted file2, file ID: ${file2.id}`);

  // Delete vector store
  await client.vectorStores.delete(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
