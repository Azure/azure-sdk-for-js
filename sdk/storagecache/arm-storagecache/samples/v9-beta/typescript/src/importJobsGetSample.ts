// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns an import job.
 *
 * @summary returns an import job.
 * x-ms-original-file: 2026-01-01/importJobs_Get.json
 */
async function importJobsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.importJobs.get("scgroup", "fs1", "job1");
  console.log(result);
}

async function main(): Promise<void> {
  await importJobsGet();
}

main().catch(console.error);
