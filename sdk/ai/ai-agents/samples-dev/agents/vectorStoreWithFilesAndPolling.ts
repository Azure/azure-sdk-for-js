// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store with the list of files using polling operation.
 *
 * @summary demonstrates how to create the vector store with the list of files using polling operation.
 *
 */

import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import { Readable } from "stream";
import "dotenv/config";

const connectionString = process.env["PROJECT_ENDPOINT"] || "<project connection string>";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

  // Create vector store
  const vectorStore = await client.createVectorStore();
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // Create and upload file
  const fileContent = "Hello, Vector Store!";
  const readable = new Readable();
  await readable.push(fileContent);
  await readable.push(null); // end the stream
  const file = await client.uploadFile(readable, "assistants", {
    fileName: "vectorFile.txt",
  });
  console.log(`Uploaded file, file ID: ${file.id}`);

  // (Optional) Define an onResponse callback to monitor the progress of polling
  function onResponse(response: any): void {
    console.log(`Received response with status: ${response.parsedBody?.status}`);
  }

  // Create vector store file, which will automatically poll until the operation is complete
  const vectorStoreFile1 = await client.createVectorStoreFile(vectorStore.id, {
    fileId: file.id,
    pollingOptions: {
      sleepIntervalInMs: 2000,
    },
    onResponse: onResponse,
  });
  console.log(
    `Created vector store file with status ${vectorStoreFile1.status}, vector store file ID: ${vectorStoreFile1.id}`,
  );

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optional) AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const vectorStoreFilePoller = client.createVectorStoreFileAndPoll(vectorStore.id, {
    fileId: file.id,
    pollingOptions: {
      sleepIntervalInMs: 2000,
    },
    onResponse: onResponse,
  });
  const vectorStoreFile2 = await vectorStoreFilePoller.pollUntilDone({
    abortSignal: abortController.signal,
  });
  console.log(
    `Created vector store file with status ${vectorStoreFile2.status}, vector store file ID: ${vectorStoreFile2.id}`,
  );

  // Delete file
  await client.deleteFile(file.id);
  console.log(`Deleted file, file ID: ${file.id}`);

  // Delete vector store
  await client.deleteVectorStore(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
