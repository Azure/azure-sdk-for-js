// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an auto export job.
 *
 * @summary create or update an auto export job.
 * x-ms-original-file: 2026-01-01/autoExportJobs_CreateOrUpdate.json
 */
async function autoExportJobsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.autoExportJobs.createOrUpdate("scgroup", "fs1", "job1", {
    location: "eastus",
    autoExportPrefixes: ["/"],
    tags: { Dept: "ContosoAds" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await autoExportJobsCreateOrUpdate();
}

main().catch(console.error);
