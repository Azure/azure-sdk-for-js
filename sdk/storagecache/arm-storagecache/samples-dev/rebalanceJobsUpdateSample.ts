// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a rebalance job instance.
 *
 * @summary update a rebalance job instance.
 * x-ms-original-file: 2026-08-01/RebalanceJobs_Update.json
 */
async function rebalanceJobsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.rebalanceJobs.update("scgroup", "fs1", "expansionjob1-rebalance", {
    properties: { adminStatus: "Cancel" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await rebalanceJobsUpdate();
}

main().catch(console.error);
