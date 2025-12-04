// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get details of the specified capacity pool
 *
 * @summary get details of the specified capacity pool
 * x-ms-original-file: 2025-09-01-preview/Pools_Get.json
 */
async function poolsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.pools.get("myRG", "account1", "pool1");
  console.log(result);
}

/**
 * This sample demonstrates how to get details of the specified capacity pool
 *
 * @summary get details of the specified capacity pool
 * x-ms-original-file: 2025-09-01-preview/Pools_Get_CustomThroughput.json
 */
async function poolsGetCustomThroughput(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.pools.get("myRG", "account1", "customPool1");
  console.log(result);
}

async function main(): Promise<void> {
  await poolsGet();
  await poolsGetCustomThroughput();
}

main().catch(console.error);
