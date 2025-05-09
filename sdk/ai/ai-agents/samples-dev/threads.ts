// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic thread agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic thread agent operations.
 *
 */

import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  const thread = await client.threads.create();

  console.log(`Created thread, thread ID : ${thread.id}`);

  const _thread = await client.threads.get(thread.id);

  console.log(`Retrieved thread, thread ID : ${_thread.id}`);

  await client.threads.delete(thread.id);

  console.log(`Deleted thread, thread ID : ${_thread.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
