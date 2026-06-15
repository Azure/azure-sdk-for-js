// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns an AML file system.
 *
 * @summary returns an AML file system.
 * x-ms-original-file: 2026-01-01/amlFilesystems_Get.json
 */
async function amlFilesystemsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.amlFilesystems.get("scgroup", "fs1");
  console.log(result);
}

async function main() {
  await amlFilesystemsGet();
}

main().catch(console.error);
