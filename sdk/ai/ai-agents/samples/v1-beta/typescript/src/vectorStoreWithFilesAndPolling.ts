// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store with the list of files using polling operation.
 *
 * @summary demonstrates how to create the vector store with the list of files using polling operation.
 */

import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import { Readable } from "stream";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
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

  // Create vector store file, which will automatically poll until the operation is complete
  const vectorStoreFile1 = await client.vectorStoreFiles.create(vectorStore.id, {
    fileId: file.id,
    pollingOptions: {
      intervalInMs: 2000,
    },
  });
  console.log(
    `Created vector store file with status ${vectorStoreFile1.status}, vector store file ID: ${vectorStoreFile1.id}`,
  );

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optional) AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const vectorStoreFilePoller = client.vectorStoreFiles.createAndPoll(vectorStore.id, {
    fileId: file.id,
    pollingOptions: {
      intervalInMs: 2000,
    },
  });
  vectorStoreFilePoller.onProgress((state) => {
    console.log(`Received response with status: ${state.status}`);
  });
  const vectorStoreFile2 = await vectorStoreFilePoller.pollUntilDone({
    abortSignal: abortController.signal,
  });
  console.log(
    `Created vector store file with status ${vectorStoreFile2.status}, vector store file ID: ${vectorStoreFile2.id}`,
  );

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
