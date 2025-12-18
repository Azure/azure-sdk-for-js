// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get specified Update
 *
 * @summary get specified Update
 * x-ms-original-file: 2025-12-01-preview/GetUpdates.json
 */
async function getASpecificUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.updates.get("testrg", "testcluster", "Microsoft4.2203.2.32");
  console.log(result);
}

async function main(): Promise<void> {
  await getASpecificUpdate();
}

main().catch(console.error);
