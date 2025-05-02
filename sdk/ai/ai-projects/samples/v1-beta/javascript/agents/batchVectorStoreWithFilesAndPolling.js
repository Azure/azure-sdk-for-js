// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the batch vector store with the list of files using polling operation.
 *
 * @summary demonstrates how to create the batch vector store with the list of files using polling operation.
 */

const { AIProjectsClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const { Readable } = require("stream");
require("dotenv/config");

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create vector store
  const vectorStore = await client.agents.createVectorStore();
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // Create and upload first file
  const file1Content = "Hello, Vector Store!";
  const readable1 = new Readable();
  await readable1.push(file1Content);
  await readable1.push(null); // end the stream
  const file1 = await client.agents.uploadFile(readable1, "assistants", {
    fileName: "vectorFile1.txt",
  });
  console.log(`Uploaded file1, file ID: ${file1.id}`);

  // Create and upload second file
  const file2Content = "This is another file for the Vector Store!";
  const readable2 = new Readable();
  await readable2.push(file2Content);
  await readable2.push(null); // end the stream
  const file2 = await client.agents.uploadFile(readable2, "assistants", {
    fileName: "vectorFile2.txt",
  });
  console.log(`Uploaded file2, file ID: ${file2.id}`);

  // (Optional) Define an onResponse callback to monitor the progress of polling
  function onResponse(response) {
    console.log(`Received response with status: ${response.parsedBody?.status}`);
  }

  // Create vector store file batch, which will automatically poll until the operation is complete
  const vectorStoreFileBatch1 = await client.agents.createVectorStoreFileBatch(vectorStore.id, {
    fileIds: [file1.id, file2.id],
    onResponse: onResponse,
  });
  console.log(
    `Created vector store file batch with status ${vectorStoreFileBatch1.status}, vector store file batch ID: ${vectorStoreFileBatch1.id}`,
  );

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optional) AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const vectorStoreFileBatchPoller = client.agents.createVectorStoreFileBatch(vectorStore.id, {
    fileIds: [file1.id, file2.id],
    onResponse: onResponse,
  });
  const vectorStoreFileBatch2 = await vectorStoreFileBatchPoller.pollUntilDone({
    abortSignal: abortController.signal,
  });
  console.log(
    `Created vector store file batch with status ${vectorStoreFileBatch2.status}, vector store file batch ID: ${vectorStoreFileBatch2.id}`,
  );

  // Delete files
  await client.agents.deleteFile(file1.id);
  await client.agents.deleteFile(file2.id);
  console.log(`Deleted files, file IDs: ${file1.id} & ${file2.id}`);

  // Delete vector store
  await client.agents.deleteVectorStore(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
