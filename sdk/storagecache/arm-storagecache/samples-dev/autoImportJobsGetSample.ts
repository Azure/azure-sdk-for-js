// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns an auto import job.
 *
 * @summary returns an auto import job.
 * x-ms-original-file: 2026-01-01/autoImportJobs_Get.json
 */
async function autoImportJobsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.autoImportJobs.get("scgroup", "fs1", "autojob1");
  console.log(result);
}

async function main(): Promise<void> {
  await autoImportJobsGet();
}

main().catch(console.error);
