// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store using polling operation.
 *
 * @summary demonstrates how to create the vector store using polling operation.
 *
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Create a vector store and poll
  const vectorStoreOptions = {
    name: "myVectorStore",
    pollingOptions: { sleepIntervalInMs: 2000 },
  };
  const vectorStore = await client.agents.createVectorStore(vectorStoreOptions).poller;
  console.log(
    `Created vector store with status ${vectorStore.status}, vector store ID: ${vectorStore.id}`,
  );

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optionally) an AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const vectorStorePoller = client.agents.createVectorStore(vectorStoreOptions).poller;
  const _vectorStore = await vectorStorePoller.pollUntilDone({
    abortSignal: abortController.signal,
  });
  console.log(
    `Created vector store with status ${_vectorStore.status}, vector store ID: ${_vectorStore.id}`,
  );

  // Delete the vector store
  await client.agents.deleteVectorStore(vectorStore.id);
  await client.agents.deleteVectorStore(_vectorStore.id);
  console.log(`Deleted vector stores, vector store IDs: ${vectorStore.id} & ${_vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
