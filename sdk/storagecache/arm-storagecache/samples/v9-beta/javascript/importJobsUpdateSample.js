// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an import job instance.
 *
 * @summary update an import job instance.
 * x-ms-original-file: 2026-01-01/importJob_Update.json
 */
async function importJobsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.importJobs.update("scgroup", "fs1", "job1", {
    tags: { Dept: "ContosoAds" },
  });
  console.log(result);
}

async function main() {
  await importJobsUpdate();
}

main().catch(console.error);
