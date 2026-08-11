// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an auto import job instance.
 *
 * @summary update an auto import job instance.
 * x-ms-original-file: 2026-01-01/autoImportJobs_Update.json
 */
async function autoImportJobsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.autoImportJobs.update("scgroup", "fs1", "autojob1", {
    adminStatus: "Disable",
  });
  console.log(result);
}

async function main() {
  await autoImportJobsUpdate();
}

main().catch(console.error);
