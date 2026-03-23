// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update an expansion job.
 *
 * @summary Create or update an expansion job.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/StorageCache/stable/2026-01-01/examples/expansionJobs_CreateOrUpdate.json
 */
async function expansionJobsCreateOrUpdate() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "fs1";
  const expansionJobName = "expansionjob1";
  const expansionJob = {
    location: "eastus",
    newStorageCapacityTiB: 16,
    tags: { dept: "ContosoAds" },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.expansionJobs.beginCreateOrUpdateAndWait(
    resourceGroupName,
    amlFilesystemName,
    expansionJobName,
    expansionJob,
  );
  console.log(result);
}

async function main() {
  await expansionJobsCreateOrUpdate();
}

main().catch(console.error);
