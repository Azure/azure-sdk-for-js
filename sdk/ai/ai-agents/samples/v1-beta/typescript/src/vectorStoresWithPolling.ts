// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store using polling operation.
 *
 * @summary demonstrates how to create the vector store using polling operation.
 */

import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create a vector, which will automatically poll until the operation is complete
  const vectorStore1 = await client.vectorStores.create({
    name: "myVectorStore",
    pollingOptions: {
      intervalInMs: 2000,
    },
  });
  console.log(
    `Created vector store with status ${vectorStore1.status}, vector store ID: ${vectorStore1.id}`,
  );

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optional) AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const vectorStorePoller = client.vectorStores.createAndPoll({
    name: "myVectorStore",
    pollingOptions: {
      intervalInMs: 2000,
    },
  });
  vectorStorePoller.onProgress((state) => {
    console.log(`Polling vector store creation, current status: ${state.status}`);
  });
  const vectorStore2 = await vectorStorePoller.pollUntilDone({
    abortSignal: abortController.signal,
  });
  console.log(
    `Created vector store with status ${vectorStore2.status}, vector store ID: ${vectorStore2.id}`,
  );

  // Delete the vector store
  await client.vectorStores.delete(vectorStore1.id);
  await client.vectorStores.delete(vectorStore2.id);
  console.log(`Deleted vector stores, vector store IDs: ${vectorStore1.id} & ${vectorStore2.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
