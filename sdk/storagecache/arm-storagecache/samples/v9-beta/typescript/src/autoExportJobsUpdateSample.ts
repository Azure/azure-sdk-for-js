// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an auto export job instance.
 *
 * @summary update an auto export job instance.
 * x-ms-original-file: 2026-01-01/autoExportJobs_Update.json
 */
async function autoExportJobsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.autoExportJobs.update("scgroup", "fs1", "job1", {
    tags: { Dept: "ContosoAds" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await autoExportJobsUpdate();
}

main().catch(console.error);
