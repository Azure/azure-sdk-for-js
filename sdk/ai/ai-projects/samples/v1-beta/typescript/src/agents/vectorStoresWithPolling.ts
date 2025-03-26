// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create the vector store using polling operation.
 *
 * @summary demonstrates how to create the vector store using polling operation.
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import  "dotenv/config";

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // (Optional) Define an onResponse callback to monitor the progress of polling
  function onResponse(response: any): void {
    console.log(`Received response with status: ${response.parsedBody?.status}`);
  }

  // Create a vector, which will automatically poll until the operation is complete
  const vectorStore1 = await client.agents.createVectorStore({
    name: "myVectorStore",
    pollingOptions: {
      sleepIntervalInMs: 2000,
    },
    onResponse: onResponse,
  });
  console.log(
    `Created vector store with status ${vectorStore1.status}, vector store ID: ${vectorStore1.id}`,
  );

  // Alternatively, polling can be done using .poll() and .pollUntilDone() methods.
  // This approach allows for more control over the polling process.
  // (Optional) AbortController can be used to stop polling if needed.
  const abortController = new AbortController();
  const vectorStorePoller = client.agents.createVectorStore({
    name: "myVectorStore",
    pollingOptions: {
      sleepIntervalInMs: 2000,
    },
    onResponse: onResponse,
  });
  const vectorStore2 = await vectorStorePoller.pollUntilDone({
    abortSignal: abortController.signal,
  });
  console.log(
    `Created vector store with status ${vectorStore2.status}, vector store ID: ${vectorStore2.id}`,
  );

  // Delete the vector store
  await client.agents.deleteVectorStore(vectorStore1.id);
  await client.agents.deleteVectorStore(vectorStore2.id);
  console.log(`Deleted vector stores, vector store IDs: ${vectorStore1.id} & ${vectorStore2.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
