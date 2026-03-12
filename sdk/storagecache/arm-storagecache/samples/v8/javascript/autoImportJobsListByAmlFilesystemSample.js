// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns all the auto import jobs the user has access to under an AML File System.
 *
 * @summary Returns all the auto import jobs the user has access to under an AML File System.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/autoImportJobs_ListByAmlFilesystem.json
 */
async function autoImportJobsListByAmlFilesystem() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "fs1";
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoImportJobs.listByAmlFilesystem(
    resourceGroupName,
    amlFilesystemName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await autoImportJobsListByAmlFilesystem();
}

main().catch(console.error);
