// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store with the list of files using polling operation.
 *
 * @summary demonstrates how to create the vector store with the list of files using polling operation.
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

  // Create and upload file
  const fileContent = "Hello, Vector Store!";
  const readable = new Readable();
  readable.push(fileContent);
  readable.push(null); // end the stream
  const file = await client.agents.uploadFile(readable, "assistants", {
    fileName: "vectorFile.txt",
  });
  console.log(`Uploaded file, file ID: ${file.id}`);

  // Create vector store file and poll
  const vectorStoreFileOptions = {
    fileId: file.id,
    pollingOptions: { sleepIntervalInMs: 2000 },
  };
  const vectorStoreFile = await client.agents.createVectorStoreFile(
    vectorStore.id,
    vectorStoreFileOptions,
  ).poller;
  console.log(
    `Created vector store file with status ${vectorStoreFile.status}, vector store file ID: ${vectorStoreFile.id}`,
  );

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optionally) an AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const vectorStoreFilePoller = client.agents.createVectorStoreFile(
    vectorStore.id,
    vectorStoreFileOptions,
  ).poller;
  const _vectorStoreFile = await vectorStoreFilePoller.pollUntilDone({
    abortSignal: abortController.signal,
  });
  console.log(
    `Created vector store file with status ${_vectorStoreFile.status}, vector store file ID: ${_vectorStoreFile.id}`,
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
