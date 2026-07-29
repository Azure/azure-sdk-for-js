// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns all AML file systems the user has access to under a subscription.
 *
 * @summary returns all AML file systems the user has access to under a subscription.
 * x-ms-original-file: 2026-01-01/amlFilesystems_List.json
 */
async function amlFilesystemsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.amlFilesystems.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await amlFilesystemsList();
}

main().catch(console.error);
