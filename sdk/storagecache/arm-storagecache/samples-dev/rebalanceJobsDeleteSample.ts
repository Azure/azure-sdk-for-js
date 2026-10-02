// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to schedules a rebalance job for deletion.
 *
 * @summary schedules a rebalance job for deletion.
 * x-ms-original-file: 2026-08-01/RebalanceJobs_Delete.json
 */
async function rebalanceJobsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.rebalanceJobs.delete("scgroup", "fs1", "expansionjob1-rebalance");
}

async function main(): Promise<void> {
  await rebalanceJobsDelete();
}

main().catch(console.error);
