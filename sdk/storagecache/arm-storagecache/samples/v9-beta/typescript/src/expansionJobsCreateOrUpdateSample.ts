// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an expansion job.
 *
 * @summary create or update an expansion job.
 * x-ms-original-file: 2026-01-01/expansionJobs_CreateOrUpdate.json
 */
async function expansionJobsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.expansionJobs.createOrUpdate("scgroup", "fs1", "expansionjob1", {
    location: "eastus",
    newStorageCapacityTiB: 16,
    tags: { Dept: "ContosoAds" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await expansionJobsCreateOrUpdate();
}

main().catch(console.error);
