// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Schedules an auto import job for deletion.
 *
 * @summary Schedules an auto import job for deletion.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/autoImportJobs_Delete.json
 */
async function autoImportJobsDelete() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "fs1";
  const autoImportJobName = "autojob1";
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.autoImportJobs.beginDeleteAndWait(
    resourceGroupName,
    amlFilesystemName,
    autoImportJobName,
  );
  console.log(result);
}

async function main() {
  await autoImportJobsDelete();
}

main().catch(console.error);
