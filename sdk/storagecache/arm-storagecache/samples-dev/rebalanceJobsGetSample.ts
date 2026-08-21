// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a rebalance job.
 *
 * @summary returns a rebalance job.
 * x-ms-original-file: 2026-08-01/RebalanceJobs_Get.json
 */
async function rebalanceJobsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.rebalanceJobs.get("scgroup", "fs1", "expansionjob1-rebalance");
  console.log(result);
}

async function main(): Promise<void> {
  await rebalanceJobsGet();
}

main().catch(console.error);
