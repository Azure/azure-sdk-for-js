// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic thread agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic thread agent operations.
 */

import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const connectionString = process.env["PROJECT_ENDPOINT"] || "<project connection string>";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(connectionString, new DefaultAzureCredential());

  const thread = await client.createThread();

  console.log(`Created thread, thread ID : ${thread.id}`);

  const _thread = await client.getThread(thread.id);

  console.log(`Retrieved thread, thread ID : ${_thread.id}`);

  await client.deleteThread(thread.id);

  console.log(`Deleted thread, thread ID : ${_thread.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
