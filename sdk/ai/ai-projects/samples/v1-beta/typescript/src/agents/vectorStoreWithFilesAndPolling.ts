// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store with the list of files using polling operation.
 *
 * @summary demonstrates how to create the vector store with the list of files using polling operation.
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());

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

  // Set up abort controller (optional)
  // Polling can then be stopped using abortController.abort()
  const abortController = new AbortController();

  // Create vector store file
  const vectorStoreFileOptions = { fileId: file.id };
  const pollingOptions = { sleepIntervalInMs: 2000, abortSignal: abortController.signal };
  const vectorStoreFile = await client.agents.createVectorStoreFileAndPoll(vectorStore.id, vectorStoreFileOptions, pollingOptions);
  console.log(`Created vector store file with status ${vectorStoreFile.status}, vector store file ID: ${vectorStoreFile.id}`);

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
