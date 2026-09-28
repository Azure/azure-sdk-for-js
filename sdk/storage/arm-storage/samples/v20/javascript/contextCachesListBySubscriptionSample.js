// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Context Caches by subscription.
 *
 * @summary list Context Caches by subscription.
 * x-ms-original-file: 2026-06-01/StorageContextCacheCRUD/ContextCaches_ListBySubscription.json
 */
async function listContextCachesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.contextCaches.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContextCachesBySubscription();
}

main().catch(console.error);
