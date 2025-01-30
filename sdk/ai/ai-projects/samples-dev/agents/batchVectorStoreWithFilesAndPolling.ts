// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the batch vector store with the list of files using polling operation.
 *
 * @summary demonstrates how to create the batch vector store with the list of files using polling operation.
 *
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
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
  readable1.push(file1Content);
  readable1.push(null); // end the stream
  const file1 = await client.agents.uploadFile(readable1, "assistants", {
    fileName: "vectorFile1.txt",
  });
  console.log(`Uploaded file1, file ID: ${file1.id}`);

  // Create and upload second file
  const file2Content = "This is another file for the Vector Store!";
  const readable2 = new Readable();
  readable2.push(file2Content);
  readable2.push(null); // end the stream
  const file2 = await client.agents.uploadFile(readable2, "assistants", {
    fileName: "vectorFile2.txt",
  });
  console.log(`Uploaded file2, file ID: ${file2.id}`);

  // Create vector store file batch and poll
  const vectorStoreFileBatch = await client.agents.createVectorStoreFileBatch(vectorStore.id, {
    fileIds: [file1.id, file2.id],
  }).poller;
  console.log(
    `Created vector store file batch with status ${vectorStoreFileBatch.status}, vector store file batch ID: ${vectorStoreFileBatch.id}`,
  );

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optionally) an AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const vectorStoreFileBatchPoller = client.agents.createVectorStoreFileBatch(vectorStore.id, {
    fileIds: [file1.id, file2.id],
  }).poller;
  const _vectorStoreFileBatch = await vectorStoreFileBatchPoller.pollUntilDone({
    abortSignal: abortController.signal,
  });
  console.log(
    `Created vector store file batch with status ${_vectorStoreFileBatch.status}, vector store file batch ID: ${_vectorStoreFileBatch.id}`,
  );

  // Delete files
  await client.agents.deleteFile(file1.id);
  console.log(`Deleted file1, file ID: ${file1.id}`);
  await client.agents.deleteFile(file2.id);
  console.log(`Deleted file2, file ID: ${file2.id}`);

  // Delete vector store
  await client.agents.deleteVectorStore(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
