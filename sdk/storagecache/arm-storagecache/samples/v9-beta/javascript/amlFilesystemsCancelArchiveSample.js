// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel archiving data from the AML file system.
 *
 * @summary cancel archiving data from the AML file system.
 * x-ms-original-file: 2026-01-01/amlFilesystems_CancelArchive.json
 */
async function amlFilesystemsCancelArchive() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.amlFilesystems.cancelArchive("scgroup", "sc");
}

async function main() {
  await amlFilesystemsCancelArchive();
}

main().catch(console.error);
