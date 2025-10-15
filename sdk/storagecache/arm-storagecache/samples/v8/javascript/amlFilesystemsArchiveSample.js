// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Archive data from the AML file system.
 *
 * @summary Archive data from the AML file system.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/amlFilesystems_Archive.json
 */
async function amlFilesystemsArchive() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "sc";
  const archiveInfo = { filesystemPath: "/" };
  const options = { archiveInfo };
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.amlFilesystems.archive(resourceGroupName, amlFilesystemName, options);
  console.log(result);
}

async function main() {
  await amlFilesystemsArchive();
}

main().catch(console.error);
