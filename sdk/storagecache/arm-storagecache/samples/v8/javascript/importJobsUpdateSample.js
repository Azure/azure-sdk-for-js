// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update an import job instance.
 *
 * @summary Update an import job instance.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/importJob_Update.json
 */
async function importJobsUpdate() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "fs1";
  const importJobName = "job1";
  const importJob = { tags: { dept: "ContosoAds" } };
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.importJobs.beginUpdateAndWait(
    resourceGroupName,
    amlFilesystemName,
    importJobName,
    importJob,
  );
  console.log(result);
}

async function main() {
  await importJobsUpdate();
}

main().catch(console.error);
