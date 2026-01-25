// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to apply Update
 *
 * @summary apply Update
 * x-ms-original-file: 2025-12-01-preview/PostUpdates.json
 */
async function listAvailableUpdates(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.updates.post("testrg", "testcluster", "Microsoft4.2203.2.32");
}

async function main(): Promise<void> {
  await listAvailableUpdates();
}

main().catch(console.error);
