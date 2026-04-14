// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns an expansion job.
 *
 * @summary Returns an expansion job.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/StorageCache/stable/2026-01-01/examples/expansionJobs_Get.json
 */
async function expansionJobsGet(): Promise<void> {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "fs1";
  const expansionJobName = "expansionjob1";
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.expansionJobs.get(
    resourceGroupName,
    amlFilesystemName,
    expansionJobName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expansionJobsGet();
}

main().catch(console.error);
