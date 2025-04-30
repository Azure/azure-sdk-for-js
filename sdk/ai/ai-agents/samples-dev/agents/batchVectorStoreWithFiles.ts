// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the batch vector store with the list of files.
 *
 * @summary demonstrates how to create the batch vector store with the list of files.
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

  // Create and upload first file
  const file1Content = "Hello, Vector Store!";
  const readable1 = new Readable();
  await readable1.push(file1Content);
  await readable1.push(null); // end the stream
  const file1 = await client.uploadFile(readable1, "assistants", {
    fileName: "vectorFile1.txt",
  });
  console.log(`Uploaded file1, file ID: ${file1.id}`);

  // Create and upload second file
  const file2Content = "This is another file for the Vector Store!";
  const readable2 = new Readable();
  await readable2.push(file2Content);
  await readable2.push(null); // end the stream
  const file2 = await client.uploadFile(readable2, "assistants", {
    fileName: "vectorFile2.txt",
  });
  console.log(`Uploaded file2, file ID: ${file2.id}`);

  // Create vector store file batch
  const vectorStoreFileBatch = await client.createVectorStoreFileBatch(vectorStore.id, {
    fileIds: [file1.id, file2.id],
  });
  console.log(
    `Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`,
  );

  // Retrieve vector store file batch
  const _vectorStoreFileBatch = await client.getVectorStoreFileBatch(
    vectorStore.id,
    vectorStoreFileBatch.id,
  );
  console.log(
    `Retrieved vector store file batch, vector store file batch ID: ${_vectorStoreFileBatch.id}`,
  );

  // List vector store files in the batch
  const vectorStoreFiles = await client.listVectorStoreFileBatchFiles(
    vectorStore.id,
    vectorStoreFileBatch.id,
  );
  console.log(
    `List of vector store files in the batch: ${vectorStoreFiles.data.map((f) => f.id).join(", ")}`,
  );

  // Delete files
  await client.deleteFile(file1.id);
  console.log(`Deleted file1, file ID: ${file1.id}`);
  await client.deleteFile(file2.id);
  console.log(`Deleted file2, file ID: ${file2.id}`);

  // Delete vector store
  await client.deleteVectorStore(vectorStore.id);
  console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
