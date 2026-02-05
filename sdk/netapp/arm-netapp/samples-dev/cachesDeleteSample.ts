// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified cache
 *
 * @summary delete the specified cache
 * x-ms-original-file: 2025-09-01-preview/Caches_Delete.json
 */
async function cachesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.caches.delete("myRG", "account1", "pool1", "cache1");
}

async function main(): Promise<void> {
  await cachesDelete();
}

main().catch(console.error);
