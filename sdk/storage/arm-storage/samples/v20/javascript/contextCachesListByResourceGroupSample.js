// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Context Caches by resource group.
 *
 * @summary list Context Caches by resource group.
 * x-ms-original-file: 2026-06-01/StorageContextCacheCRUD/ContextCaches_ListByResourceGroup.json
 */
async function listContextCachesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.contextCaches.listByResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContextCachesByResourceGroup();
}

main().catch(console.error);
