// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to schedules an import job for deletion.
 *
 * @summary schedules an import job for deletion.
 * x-ms-original-file: 2026-01-01/importJobs_Delete.json
 */
async function importJobsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.importJobs.delete("scgroup", "fs1", "job1");
}

async function main() {
  await importJobsDelete();
}

main().catch(console.error);
