// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Schedules an expansion job for deletion.
 *
 * @summary Schedules an expansion job for deletion.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/StorageCache/stable/2026-01-01/examples/expansionJobs_Delete.json
 */
async function expansionJobsDelete(): Promise<void> {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "fs1";
  const expansionJobName = "expansionjob1";
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.expansionJobs.beginDeleteAndWait(
    resourceGroupName,
    amlFilesystemName,
    expansionJobName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await expansionJobsDelete();
}

main().catch(console.error);
