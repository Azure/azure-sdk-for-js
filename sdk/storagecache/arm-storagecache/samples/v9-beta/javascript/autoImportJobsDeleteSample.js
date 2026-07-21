// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to schedules an auto import job for deletion.
 *
 * @summary schedules an auto import job for deletion.
 * x-ms-original-file: 2026-01-01/autoImportJobs_Delete.json
 */
async function autoImportJobsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.autoImportJobs.delete("scgroup", "fs1", "autojob1");
}

async function main() {
  await autoImportJobsDelete();
}

main().catch(console.error);
