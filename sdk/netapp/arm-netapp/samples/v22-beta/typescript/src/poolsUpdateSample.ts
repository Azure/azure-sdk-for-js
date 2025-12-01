// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch the specified capacity pool
 *
 * @summary patch the specified capacity pool
 * x-ms-original-file: 2025-09-01-preview/Pools_Update.json
 */
async function poolsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.pools.update("myRG", "account1", "pool1", {});
  console.log(result);
}

/**
 * This sample demonstrates how to patch the specified capacity pool
 *
 * @summary patch the specified capacity pool
 * x-ms-original-file: 2025-09-01-preview/Pools_Update_CustomThroughput.json
 */
async function poolsUpdateCustomThroughput(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.pools.update("myRG", "account1", "customPool1", {});
  console.log(result);
}

async function main(): Promise<void> {
  await poolsUpdate();
  await poolsUpdateCustomThroughput();
}

main().catch(console.error);
