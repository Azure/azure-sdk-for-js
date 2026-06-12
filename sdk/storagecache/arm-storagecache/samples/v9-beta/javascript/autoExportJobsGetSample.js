// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns an auto export job.
 *
 * @summary returns an auto export job.
 * x-ms-original-file: 2026-01-01/autoExportJobs_Get.json
 */
async function autoExportJobsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.autoExportJobs.get("scgroup", "fs1", "job1");
  console.log(result);
}

async function main() {
  await autoExportJobsGet();
}

main().catch(console.error);
