// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to archive data from the AML file system.
 *
 * @summary archive data from the AML file system.
 * x-ms-original-file: 2026-01-01/amlFilesystems_Archive.json
 */
async function amlFilesystemsArchive() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.amlFilesystems.archive("scgroup", "sc", { archiveInfo: { filesystemPath: "/" } });
}

async function main() {
  await amlFilesystemsArchive();
}

main().catch(console.error);
