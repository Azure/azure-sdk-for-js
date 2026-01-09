// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified capacity pool
 *
 * @summary delete the specified capacity pool
 * x-ms-original-file: 2025-09-01-preview/Pools_Delete.json
 */
async function poolsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.pools.delete("myRG", "account1", "pool1");
}

async function main(): Promise<void> {
  await poolsDelete();
}

main().catch(console.error);
