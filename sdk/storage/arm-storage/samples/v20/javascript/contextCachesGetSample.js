// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Context Cache.
 *
 * @summary get a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheCRUD/ContextCaches_Get.json
 */
async function getAContextCache() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.contextCaches.get("testrg", "testaccount");
  console.log(result);
}

async function main() {
  await getAContextCache();
}

main().catch(console.error);
