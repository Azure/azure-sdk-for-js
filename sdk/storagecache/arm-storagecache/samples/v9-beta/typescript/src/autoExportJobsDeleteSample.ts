// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to schedules an auto export job for deletion.
 *
 * @summary schedules an auto export job for deletion.
 * x-ms-original-file: 2026-01-01/autoExportJobs_Delete.json
 */
async function autoExportJobsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.autoExportJobs.delete("scgroup", "fs1", "job1");
}

async function main(): Promise<void> {
  await autoExportJobsDelete();
}

main().catch(console.error);
