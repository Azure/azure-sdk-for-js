// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all AML file systems the user has access to under a resource group.
 *
 * @summary returns all AML file systems the user has access to under a resource group.
 * x-ms-original-file: 2026-01-01/amlFilesystems_ListByResourceGroup.json
 */
async function amlFilesystemsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.amlFilesystems.listByResourceGroup("scgroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await amlFilesystemsListByResourceGroup();
}

main().catch(console.error);
