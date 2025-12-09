// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to moves Cache  to another Capacity Pool
 *
 * @summary moves Cache  to another Capacity Pool
 * x-ms-original-file: 2025-09-01-preview/Caches_PoolChange.json
 */
async function cachesPoolChange(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.caches.poolChange("myRG", "account1", "pool1", "cache1", {
    newPoolResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/netAppAccounts/account1/capacityPools/pool2",
  });
}

async function main(): Promise<void> {
  await cachesPoolChange();
}

main().catch(console.error);
