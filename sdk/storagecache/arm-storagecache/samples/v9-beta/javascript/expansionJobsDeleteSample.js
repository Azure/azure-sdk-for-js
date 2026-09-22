// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to schedules an expansion job for deletion.
 *
 * @summary schedules an expansion job for deletion.
 * x-ms-original-file: 2026-01-01/expansionJobs_Delete.json
 */
async function expansionJobsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.expansionJobs.delete("scgroup", "fs1", "expansionjob1");
}

async function main() {
  await expansionJobsDelete();
}

main().catch(console.error);
